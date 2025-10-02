import { useState } from "react";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import MainAdmin from "../../components/Admin/MainAdmin";
import "../../css/Admin/Admin.module.css"; // Si no existe, puedes comentarlo

export default function AdminInicio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="admin-container">
      <NavbarAdmin
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className="admin-layout">
        <SidebarAdmin />
        <MainAdmin />
      </div>
    </div>
  );
}
