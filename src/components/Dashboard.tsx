import SupervisorDashboard from "./SupervisorDashboard";
import PilgrimDashboard from "./PilgrimDashboard";

interface DashboardProps {
  onLogout: () => void;
  isAr: boolean;
  role: string | null;
}

export default function Dashboard({ onLogout, isAr, role }: DashboardProps) {
  if (role === 'supervisor') {
    return <SupervisorDashboard onLogout={onLogout} isAr={isAr} />;
  }

  return <PilgrimDashboard onLogout={onLogout} isAr={isAr} />;
}
