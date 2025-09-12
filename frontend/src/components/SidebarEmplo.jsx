import { Home, FileText, Star, History, Bell } from "lucide-react";
import { Link } from "react-router-dom";   // 👈 Importa Link
import "../css/SidebarEmplo.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/employer" className="sidebar-link">
            <Home size={18} /> <span className="item-label">Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/misofertas" className="sidebar-link">
            <FileText size={18} /> <span className="item-label">Mis ofertas</span>
          </Link>
        </li>
        <li>
          <Link to="/postulaciones" className="sidebar-link">
            <Star size={18} /> <span className="item-label">Postulaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/resenas" className="sidebar-link">
            <History size={18} /> <span className="item-label">Reseñas</span>
          </Link>
        </li>
        <li>
          <Link to="/historial" className="sidebar-link">
            <Bell size={18} /> <span className="item-label">Historial</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

