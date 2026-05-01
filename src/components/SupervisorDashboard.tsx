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
  const user = { uid: 'demo_supervisor', displayName: isAr ? "المشرف العام" : "Supervisor" };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
    });

    // Fetch pending requests
    const requestsQuery = query(collection(db, "joinRequests"), where("supervisorId", "==", user.uid), where("status", "==", "pending"));
    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Same as before but with consistent logic */}
      <aside className="w-80 bg-white border-l border-slate-200 flex flex-col p-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-primary rounded-xl" />
          <span className="text-2xl font-bold text-slate-900 logo-thuluth">{isAr ? "معتمرون" : "Motamiroon"}</span>
        </div>
        <nav className="flex-1 space-y-4">
          <button className="w-full flex items-center gap-4 p-4 bg-primary/10 text-primary rounded-2xl font-bold">
            <Users className="w-5 h-5" />
            {isAr ? "إدارة المجموعات" : "Manage Groups"}
          </button>
        </nav>
        <button onClick={onLogout} className="mt-auto flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors">
          <LogOutIcon className="w-5 h-5" />
          {isAr ? "تسجيل الخروج" : "Logout"}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isAr ? "أهلاً بك، " + user?.displayName : "Welcome, " + user?.displayName}
            </h1>
            <p className="text-slate-500 font-medium">
              {isAr ? "إدارة وتنظيم مجموعات المعتمرين" : "Manage and organize pilgrim groups"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
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
                    className="absolute top-full left-0 mt-4 w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 z-50 text-right"
                  >
                    <h4 className="font-bold text-slate-900 mb-4">{isAr ? "طلبات الانضمام" : "Join Requests"}</h4>
                    <div className="max-h-[400px] overflow-y-auto space-y-4">
                      {requests.length === 0 ? (
                        <p className="text-slate-400 text-sm py-4">{isAr ? "لا توجد طلبات جديدة حالياً" : "No new requests currently"}</p>
                      ) : (
                        requests.map((req) => (
                          <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className="flex items-center justify-between mb-2">
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
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold"
            >
              <Plus className="w-5 h-5" />
              {isAr ? "إضافة مجموعة جديدة" : "Add New Group"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-card border border-slate-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 ${stat.color || 'text-primary'}`}>
                {stat.icon}
              </div>
              <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group"
            >
              <div className="flex items-center gap-4 mb-6">
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
                <div className="flex justify-between">
                  <span className="text-slate-400">{isAr ? "تاريخ الرحلة" : "Trip Date"}</span>
                  <span className="font-bold">{group.tripDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isAr ? "المعتمرين" : "Pilgrims"}</span>
                  <span className="font-bold">{group.pilgrimCount || 0}</span>
                </div>
              </div>

              <div className="flex gap-2">
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
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 text-right"
            >
              <h2 className="text-2xl font-black mb-8">{isAr ? "إضافة مجموعة جديدة" : "Add New Group"}</h2>
              <form onSubmit={handleAddGroup} className="space-y-6">
                <input
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder={isAr ? "اسم المجموعة" : "Group Name"}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100"
                />
                <input
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isAr ? "اسم شركة الحج والعمرة" : "Company Name"}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100"
                />
                <input
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder={isAr ? "رابط شعار الشركة (URL)" : "Company Logo URL"}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  />
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-white rounded-2xl font-bold">
                  {loading ? (isAr ? "جاري الإضافة..." : "Adding...") : (isAr ? "إنشاء المجموعة" : "Create Group")}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
