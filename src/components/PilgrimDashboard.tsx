import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Search, Users, Calendar, Building2, 
  User as UserIcon, LogOut as LogOutIcon, 
  Send, CheckCircle2, Clock, MessageSquare, MapPin
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import { 
  collection, query, where, onSnapshot, 
  addDoc, serverTimestamp 
} from "firebase/firestore";

interface PilgrimDashboardProps {
  onLogout: () => void;
  isAr: boolean;
}

export default function PilgrimDashboard({ onLogout, isAr }: PilgrimDashboardProps) {
  const user = { uid: 'demo_pilgrim', displayName: isAr ? "معتمر" : "Pilgrim", email: "pilgrim@demo.com" };
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<any[]>([]);
  const [myRequests, setMyRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'tracking'>('search');

  useEffect(() => {
    // Fetch active groups
    const groupsQuery = query(collection(db, "groups"), where("status", "==", "active"));
    const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
      setGroups(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch my join requests
    if (user) {
      const requestsQuery = query(collection(db, "joinRequests"), where("pilgrimId", "==", user.uid));
      const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
        setMyRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => {
        unsubscribeGroups();
        unsubscribeRequests();
      };
    }
    
    return () => unsubscribeGroups();
  }, [user]);

  const handleJoinRequest = async (group: any) => {
    if (!user) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "joinRequests"), {
        groupId: group.id,
        groupName: group.name,
        pilgrimId: user.uid,
        pilgrimName: user.displayName || (isAr ? "معتمر" : "Pilgrim"),
        pilgrimEmail: user.email,
        supervisorId: group.supervisorId,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      alert(isAr ? "تم إرسال طلب الانضمام" : "Join request sent");
    } catch (error) {
      console.error("Error join request:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex h-screen bg-slate-50 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Sidebar */}
      <aside className={`w-80 bg-white border-slate-200 flex flex-col p-8 ${isAr ? 'border-l' : 'border-r'}`}>
        <div className={`flex items-center gap-4 mb-12 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-10 h-10 bg-primary rounded-xl" />
          <span className="text-xl font-bold logo-thuluth">{isAr ? "بوابة المعتمر" : "Pilgrim Portal"}</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('search')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'search' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'} ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <Search className="w-5 h-5" />
            <span>{isAr ? "البحث عن رحلة" : "Find Trip"}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'tracking' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'} ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <MapPin className="w-5 h-5" />
            <span>{isAr ? "تتبع المجموعة" : "Group Tracking"}</span>
          </button>
        </nav>

        <button 
          onClick={onLogout} 
          className={`mt-auto flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <LogOutIcon className="w-5 h-5" />
          {isAr ? "تسجيل الخروج" : "Logout"}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        {activeTab === 'search' ? (
          <>
            <div className={`max-w-2xl mx-auto mb-16 text-center ${isAr ? 'text-right' : 'text-left'}`}>
              <h1 className="text-4xl font-black mb-6">{isAr ? "جد رحلتك القادمة" : "Find Your Next Trip"}</h1>
              <div className="relative">
                <Search className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-slate-300`} />
                <input 
                  type="text"
                  placeholder={isAr ? "ابحث باسم المجموعة أو الشركة..." : "Search by group or company..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-6 ${isAr ? 'pr-16 text-right' : 'pl-16 text-left'} bg-white rounded-[2rem] border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/20 outline-none`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredGroups.map((group, i) => {
                const request = myRequests.find(r => r.groupId === group.id);
                return (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex justify-between items-start mb-8 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                        {group.companyLogo ? (
                          <img src={group.companyLogo} className="w-full h-full object-cover" alt="Logo" />
                        ) : (
                          <Building2 className="w-8 h-8 text-slate-300" />
                        )}
                      </div>
                      {request && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          request.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                          request.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {isAr ? (request.status === 'pending' ? 'معلق' : 'مقبول') : request.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black mb-2">{group.name}</h3>
                    <p className="text-slate-500 font-bold mb-8 text-sm">{group.companyName}</p>

                    <div className={`space-y-4 mb-8 bg-slate-50 p-6 rounded-3xl text-sm ${isAr ? '' : 'text-left'}`}>
                      <div className={`flex justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="font-bold">{group.supervisorName}</span>
                        <span className="text-slate-400">{isAr ? "المشرف" : "Supervisor"}</span>
                      </div>
                      <div className={`flex justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="font-bold">{group.pilgrimCount || 0}</span>
                        <span className="text-slate-400">{isAr ? "المعتمرين" : "Pilgrims"}</span>
                      </div>
                      <div className={`flex justify-between border-b border-slate-200/50 pb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="font-bold text-slate-800">{group.tripDate}</span>
                        <span className="text-slate-400">{isAr ? "تاريخ الرحلة" : "Trip Date"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleJoinRequest(group)}
                        disabled={loading || !!request}
                        className={`py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        {isAr ? "انضمام" : "Join"} <Send className="w-4 h-4" />
                      </button>
                      <button className={`py-4 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                        {isAr ? "تواصل" : "Contact"} <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden h-full relative">
             <div className="absolute inset-0">
               <img 
                 src="/src/assets/images/regenerated_image_1777719418445.png" 
                 className="w-full h-full object-cover" 
                 alt="Tracking Map"
               />
               <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
             </div>

             {/* Supervisor Pin */}
             <div className="absolute top-[35%] left-[40%] z-20 group">
                <div className="relative cursor-pointer">
                  <div className="absolute inset-[-8px] bg-slate-900/20 rounded-full animate-ping" />
                  <div className="relative w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white border-2 border-white shadow-xl">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  {/* Distance Popup on Hover */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 ${isAr ? 'text-right' : 'text-left'}`}>
                    <p className="font-black text-slate-900 text-xs mb-1">{isAr ? "المشرف: أحمد علي" : "Supervisor: Ahmed Ali"}</p>
                    <div className={`flex justify-between items-center gap-4 text-[10px] font-bold ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-400">{isAr ? "يبعد عنك:" : "Distance:"}</span>
                      <span className="text-primary text-sm">180m</span>
                    </div>
                  </div>
                </div>
             </div>

             {/* My Pin (Pilgrim) */}
             <div className="absolute top-[55%] left-[55%] z-30">
               <div className="relative cursor-pointer group">
                  <div className="absolute inset-0 animate-ping bg-primary rounded-full opacity-50" />
                  <div className="relative w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-xl">
                    <Send className="w-5 h-5 rotate-45" />
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-xl`}>
                    {isAr ? "أنت" : "You"}
                  </div>
               </div>
             </div>

             {/* UI Overlay */}
             <div className={`absolute top-10 ${isAr ? 'right-10' : 'left-10'} z-40 bg-white/95 backdrop-blur-md p-6 rounded-[2rem] border border-slate-100 shadow-2xl max-w-sm ${isAr ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-black text-slate-900 mb-2">{isAr ? "تتبع مباشر" : "Live Tracking"}</h3>
                <p className="text-slate-500 font-bold mb-6 text-sm">{isAr ? "موقعك الحالي ضمن المجموعة" : "Current position in group"}</p>
                <div className="space-y-4">
                  <div className={`flex items-center gap-4 p-4 bg-slate-50 rounded-2xl ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase">{isAr ? "آخر تحديث" : "Last Update"}</p>
                      <p className="text-sm font-bold text-slate-900">{isAr ? "منذ دقيقة واحدة" : "1 min ago"}</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 bg-white p-2 rounded-full shadow-2xl border border-slate-100 flex gap-1`}>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-primary transition-all">
                  {isAr ? "نداء استغاثة" : "SOS Signal"}
                </button>
                <button className="px-6 py-3 text-slate-900 font-bold text-sm hover:bg-slate-100 rounded-full transition-all">
                  {isAr ? "تواصل" : "Message"}
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
