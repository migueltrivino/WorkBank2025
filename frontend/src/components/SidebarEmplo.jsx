import { Home, FileText, Star, History, Bell } from "lucide-react";
import "../css/SidebarEmplo.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Home size={18} /> <span className="item-label">Inicio</span></li>
        <li><FileText size={18} /> <span className="item-label">Mis ofertas</span></li>
        <li><Star size={18} /> <span className="item-label">Postulaciones</span></li>
        <li><History size={18} /> <span className="item-label">Reseñas</span></li>
        <li><Bell size={18} /> <span className="item-label">Historial</span></li>
      </ul>
    </aside>
  );
}
