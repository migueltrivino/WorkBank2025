import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, User, Settings } from "lucide-react";
import styles from "../../css/Admin/NavbarAdmin.module.css";

export default function NavbarAdmin() {
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/iniciarsesion");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles["navbar-admin"]}>
      <div className={styles["navbar-logo"]}>
        <span>WorkBank Admin</span>
      </div>

      <div className={styles["navbar-actions"]}>
        <div className={styles["notif-area"]} ref={notifRef}>
          <Bell size={25} onClick={() => setNotifOpen(!notifOpen)} />
          {notifOpen && (
            <div className={styles["notif-dropdown"]}>
              <div className={styles["notif-card"]}>Notificación de prueba 1</div>
              <div className={styles["notif-card"]}>Notificación de prueba 2</div>
            </div>
          )}
        </div>

        <div className={styles["profile-area"]} ref={profileRef}>
          <User size={25} onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <div className={styles["profile-dropdown"]}>
              <button onClick={handleLogout}><LogOut size={16} /> Cerrar sesión</button>
              <button><Settings size={16} /> Configuración</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
