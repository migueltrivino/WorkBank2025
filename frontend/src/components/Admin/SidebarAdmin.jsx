import { 
  Home, 
  Users, 
  FileText, 
  ClipboardList, 
  Star, 
  AlertTriangle, 
  Ban 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/admin" className="sidebar-link">
            <Home size={18} /> <span className="item-label">Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/usuarios" className="sidebar-link">
            <Users size={18} /> <span className="item-label">Usuarios</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/ofertas" className="sidebar-link">
            <FileText size={18} /> <span className="item-label">Ofertas</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/postulaciones" className="sidebar-link">
            <ClipboardList size={18} /> <span className="item-label">Postulaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/resenas" className="sidebar-link">
            <Star size={18} /> <span className="item-label">Reseñas</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/mensajes" className="sidebar-link">
            <AlertTriangle size={18} /> <span className="item-label">Mensajes</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/ip-bloqueadas" className="sidebar-link">
            <Ban size={18} /> <span className="item-label">IPs bloqueadas</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
