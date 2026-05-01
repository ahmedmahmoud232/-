import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, MapPin, Bell, LogOut, Plus, X, 
  Check, X as CloseIcon, Building2, Calendar, 
  User as UserIcon, LogOut as LogOutIcon, 
  Image as ImageIcon
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import { 
  collection, addDoc, query, where, onSnapshot, 
  serverTimestamp, updateDoc, doc, deleteDoc 
} from "firebase/firestore";

interface SupervisorDashboardProps {
  onLogout: () => void;
  isAr: boolean;
}

export default function SupervisorDashboard({ onLogout, isAr }: SupervisorDashboardProps) {
  const user = { uid: 'demo_supervisor', displayName: isAr ? "المشرف العام" : "General Supervisor" };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'groups' | 'map'>('groups');

  // Form state
  const [groupName, setGroupName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Fetch groups
    const groupsQuery = query(collection(db, "groups"), where("supervisorId", "==", user.uid));
    const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
      setGroups(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Groups snap error:", error));

    // Fetch pending requests
    const requestsQuery = query(collection(db, "joinRequests"), where("supervisorId", "==", user.uid), where("status", "==", "pending"));
    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Requests snap error:", error));

    return () => {
      unsubscribeGroups();
      unsubscribeRequests();
    };
  }, [user]);

  const handleAddGroup = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "groups"), {
        name: groupName,
        companyName,
        companyLogo,
        supervisorId: user.uid,
        supervisorName: user.displayName || (isAr ? "مشرف" : "Supervisor"),
        tripDate,
        departureDate,
        pilgrimCount: 0,
        status: "active",
        createdAt: serverTimestamp(),
      });
      setIsAddModalOpen(false);
      setGroupName("");
      setCompanyName("");
      setCompanyLogo("");
      setTripDate("");
      setDepartureDate("");
    } catch (error) {
      console.error("Error adding group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, groupId: string, action: 'accepted' | 'rejected') => {
    try {
      await updateDoc(doc(db, "joinRequests", requestId), {
        status: action,
        updatedAt: serverTimestamp()
      });

      if (action === 'accepted') {
        const groupRef = doc(db, "groups", groupId);
        const group = groups.find(g => g.id === groupId);
        if (group) {
          await updateDoc(groupRef, {
            pilgrimCount: (group.pilgrimCount || 0) + 1
          });
        }
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const stats = [
    { label: isAr ? "المجموعات النشطة" : "Active Groups", value: groups.length.toString(), icon: <Users className="w-6 h-6" /> },
    { label: isAr ? "إجمالي المعتمرين" : "Total Pilgrims", value: groups.reduce((acc, g) => acc + (g.pilgrimCount || 0), 0).toString(), icon: <UserIcon className="w-6 h-6" /> },
    { label: isAr ? "طلبات معلقة" : "Pending Requests", value: requests.length.toString(), icon: <Bell className="w-6 h-6" />, color: requests.length > 0 ? "text-amber-500" : "text-slate-400" },
  ];

  return (
    <div className={`flex h-screen bg-slate-50 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Sidebar */}
      <aside className={`w-80 bg-white border-slate-200 flex flex-col p-8 ${isAr ? 'border-l' : 'border-r'}`}>
        <div className={`flex items-center gap-4 mb-12 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-12 h-12 bg-primary rounded-xl" />
          <span className="text-2xl font-bold text-slate-900 logo-thuluth">{isAr ? "معتمرون" : "Motamiroon"}</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('groups')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'groups' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'} ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <Users className="w-5 h-5" />
            <span>{isAr ? "إدارة المجموعات" : "Manage Groups"}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('map')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'map' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'} ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <MapPin className="w-5 h-5" />
            <span>{isAr ? "خريطة التتبع" : "Tracking Map"}</span>
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
        <header className={`flex justify-between items-center mb-12 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isAr ? "أهلاً بك، " + user?.displayName : "Welcome, " + user?.displayName}
            </h1>
            <p className="text-slate-500 font-medium">
              {isAr ? "إدارة وتنظيم مجموعات المعتمرين" : "Manage and organize pilgrim groups"}
            </p>
          </div>
          
          <div className={`flex items-center gap-4 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(v => !v)}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-slate-500" />
                {requests.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full mt-4 w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 z-50 ${isAr ? 'right-0 text-right' : 'left-0 text-left'}`}
                  >
                    <h4 className="font-bold text-slate-900 mb-4">{isAr ? "طلبات الانضمام" : "Join Requests"}</h4>
                    <div className="max-h-[400px] overflow-y-auto space-y-4">
                      {requests.length === 0 ? (
                        <p className="text-slate-400 text-sm py-4">{isAr ? "لا توجد طلبات جديدة حالياً" : "No new requests currently"}</p>
                      ) : (
                        requests.map((req) => (
                          <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className={`flex items-center justify-between mb-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{req.groupName}</span>
                              <span className="text-xs text-slate-400">{isAr ? "طلب معلق" : "Pending"}</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900 mb-1">{req.pilgrimName}</p>
                            <p className="text-xs text-slate-500 mb-4">{req.pilgrimEmail}</p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleRequestAction(req.id, req.groupId, 'accepted')}
                                className="flex-1 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold"
                              >
                                {isAr ? "قبول" : "Accept"}
                              </button>
                              <button 
                                onClick={() => handleRequestAction(req.id, req.groupId, 'rejected')}
                                className="flex-1 py-2 bg-red-100 text-red-500 rounded-xl text-xs font-bold"
                              >
                                {isAr ? "رفض" : "Reject"}
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <Plus className="w-5 h-5" />
              <span>{isAr ? "إضافة مجموعة" : "Add Group"}</span>
            </button>
          </div>
        </header>

        {activeTab === 'groups' ? (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              {stats.map((stat, i) => (
                <div key={i} className={`bg-white p-8 rounded-card border border-slate-100 shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 ${stat.color || 'text-primary'} ${isAr ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}>
                    {stat.icon}
                  </div>
                  <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <h3 className={`text-xl font-bold text-slate-900 mb-6 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? "المجموعات الحالية" : "Current Groups"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups.map((group) => (
                <motion.div
                  key={group.id}
                  className={`bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group ${isAr ? 'text-right' : 'text-left'}`}
                >
                  <div className={`flex items-center gap-4 mb-6 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                      {group.companyLogo ? (
                        <img src={group.companyLogo} className="w-full h-full object-cover" alt="Logo" />
                      ) : (
                        <Building2 className="w-7 h-7 text-slate-300" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{group.name}</h4>
                      <p className="text-slate-400 text-sm">{group.companyName}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 text-sm">
                    <div className={`flex justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-400">{isAr ? "تاريخ الرحلة" : "Trip Date"}</span>
                      <span className="font-bold">{group.tripDate}</span>
                    </div>
                    <div className={`flex justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-400">{isAr ? "المعتمرين" : "Pilgrims"}</span>
                      <span className="font-bold">{group.pilgrimCount || 0}</span>
                    </div>
                  </div>

                  <div className={`flex gap-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                    <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold">
                      {isAr ? "التفاصيل" : "Details"}
                    </button>
                    <button 
                      onClick={() => deleteDoc(doc(db, "groups", group.id))}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[3rem] p-4 border border-slate-100 shadow-sm overflow-hidden h-[600px] relative">
            <div className="absolute inset-0 grayscale opacity-30">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-primary/10" />
            
            <div className={`absolute top-10 ${isAr ? 'right-10' : 'left-10'} z-10 ${isAr ? 'text-right' : 'text-left'}`}>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{isAr ? "مواقع المعتمرين" : "Pilgrim Locations"}</h3>
              <p className="text-slate-500 font-bold">{isAr ? "تتبع مباشر لـ 24 معتمراً" : "Live tracking of 24 pilgrims"}</p>
            </div>

            {/* Pins Simulation */}
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/4 left-1/3 p-1 bg-primary rounded-full border-2 border-white shadow-xl z-20">
              <div className="w-4 h-4 bg-primary rounded-full" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute top-1/2 left-1/2 p-1 bg-primary rounded-full border-2 border-white shadow-xl z-20">
              <div className="w-4 h-4 bg-primary rounded-full" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="absolute bottom-1/3 right-1/4 p-1 bg-primary rounded-full border-2 border-white shadow-xl z-20">
              <div className="w-4 h-4 bg-primary rounded-full" />
            </motion.div>

            <div className={`absolute bottom-10 ${isAr ? 'left-10' : 'right-10'} bg-white/95 backdrop-blur-md p-8 rounded-[2rem] border border-slate-100 shadow-2xl max-w-sm ${isAr ? 'text-right' : 'text-left'} z-30`}>
              <h4 className="font-bold text-slate-900 mb-4">{isAr ? "ملخص المواقع" : "Location Summary"}</h4>
              <div className="space-y-3">
                <div className={`flex justify-between items-center text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-slate-500">{isAr ? "متواجدون في الحرم" : "In Al-Haram"}</span>
                  <span className="font-black text-emerald-500">18</span>
                </div>
                <div className={`flex justify-between items-center text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-slate-500">{isAr ? "في الطريق" : "En route"}</span>
                  <span className="font-black text-amber-500">6</span>
                </div>
              </div>
              <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-primary transition-all">
                {isAr ? "عرض جميع المعتمرين" : "View All Pilgrims"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 ${isAr ? 'text-right' : 'text-left'}`}
            >
              <h2 className="text-2xl font-black mb-8">{isAr ? "إضافة مجموعة جديدة" : "Add New Group"}</h2>
              <form onSubmit={handleAddGroup} className="space-y-6">
                <input
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder={isAr ? "اسم المجموعة" : "Group Name"}
                  className={`w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
                />
                <input
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isAr ? "اسم وكالة السفر" : "Travel Agency Name"}
                  className={`w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
                />
                <input
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder={isAr ? "رابط شعار الشركة (URL)" : "Company Logo URL"}
                  className={`w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? "تاريخ الرحلة" : "Trip Date"}</label>
                    <input
                      type="date"
                      required
                      value={tripDate}
                      onChange={(e) => setTripDate(e.target.value)}
                      className={`w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? "تاريخ العودة" : "Return Date"}</label>
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className={`w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20">
                  {loading ? (isAr ? "جاري الإضافة..." : "Adding...") : (isAr ? "تأكيد الإضافة" : "Confirm Addition")}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
