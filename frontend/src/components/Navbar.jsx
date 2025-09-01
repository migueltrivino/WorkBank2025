import { Link } from "react-router-dom";
import logo from "../assets/logos.png";
import "../css/NavBar.css";


export default function Navbar() {
    return (
    <header>
        <nav className="navbar">
        <div className="logo">
            <img src={logo} alt="WorkBank Logo" />
            <a href="#" className="brand">WorkBank.W</a>
        </div>
        <ul className="nav-links">
            <li><a href="#about">Quienes somos</a></li>
            <li><a href="#oportunidades">Oportunidades</a></li>
            <li><a href="#contacto">Contáctanos</a></li>
            <li><Link to="/login"><i className="fa-solid fa-key"></i> Iniciar Sesión</Link></li>
            <li><Link to="/registro"><i className="fa-solid fa-user"></i> Registro</Link></li>
        </ul>
        </nav>
    </header>
    );
}
