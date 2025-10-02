import { Home, FileText, Star, History, Bell } from "lucide-react";
import { Link } from "react-router-dom"; 
import "../css/SidebarEmplo.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/worker" className="sidebar-link">
            <Home size={18} /> 
            <span className="item-label">Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/worker/ofertas" className="sidebar-link">
            <FileText size={18} /> 
            <span className="item-label">Ofertas</span>
          </Link>
        </li>
        <li>
          <Link to="/worker/postulaciones" className="sidebar-link">
            <Star size={18} /> 
            <span className="item-label">Mis Postulaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/worker/resenas" className="sidebar-link">
            <History size={18} /> 
            <span className="item-label">Reseñas</span>
          </Link>
        </li>
        <li>
          <Link to="/worker/historial" className="sidebar-link">
            <Bell size={18} /> 
            <span className="item-label">Historial</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
