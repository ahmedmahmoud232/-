import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Search, Users, Calendar, Building2, 
  User as UserIcon, LogOut as LogOutIcon, 
  Send, CheckCircle2, Clock, MessageSquare
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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl" />
          <span className="text-xl font-bold logo-thuluth">{isAr ? "بوابة المعتمر" : "Pilgrim Portal"}</span>
        </div>
        <button onClick={onLogout} className="p-3 bg-red-50 text-red-500 rounded-xl">
          <LogOutIcon className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-black mb-6">{isAr ? "جد رحلتك القادمة" : "Find Your Next Trip"}</h1>
          <div className="relative">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text"
              placeholder={isAr ? "ابحث باسم المجموعة أو الشركة..." : "Search by group or company..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-6 pr-16 bg-white rounded-[2rem] border border-slate-200 text-right shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map((group, i) => {
            const request = myRequests.find(r => r.groupId === group.id);
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-8">
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

                <h3 className="text-2xl font-black mb-2 text-right">{group.name}</h3>
                <p className="text-slate-500 font-bold mb-8 text-right text-sm">{group.companyName}</p>

                <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-3xl text-right text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold">{group.supervisorName}</span>
                    <span className="text-slate-400">{isAr ? "المشرف" : "Supervisor"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">{group.pilgrimCount || 0}</span>
                    <span className="text-slate-400">{isAr ? "المعتمرين" : "Pilgrims"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-800">{group.tripDate}</span>
                    <span className="text-slate-400">{isAr ? "تاريخ الرحلة" : "Trip Date"}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-800">{group.departureDate}</span>
                    <span className="text-slate-400">{isAr ? "تاريخ المغادرة" : "Departure Date"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleJoinRequest(group)}
                    disabled={loading || !!request}
                    className="py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {isAr ? "طلب انضمام" : "Join"} <Send className="w-4 h-4" />
                  </button>
                  <button className="py-4 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2">
                    {isAr ? "تواصل" : "Contact"} <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
