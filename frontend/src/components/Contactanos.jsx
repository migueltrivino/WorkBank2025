import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "../css/Contactanos.css";

export default function Contactanos() {
    return (
    <section id="contactanos" className="contact-section">
        <div className="contact-header">
        <h2>Contáctanos</h2>
        <p>Cada mensaje tuyo es una oportunidad para mejorar</p>
        <div className="contact-icons">
            <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="icon whatsapp"
            >
            <FaWhatsapp />
            </a>
            <a
            href="mailto:workbank2025oficial@gmail.com"
            className="icon gmail"
            >
            <SiGmail />
            </a>
        </div>
        </div>

      {/* Pie de página */}
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-logo">
            <img src="../assets/logos.png" alt="WorkBank Logo" />
            </div>

            <div className="footer-column">
            <h4>Servicios</h4>
            <ul>
                <li>Inicio</li>
                <li>Registro</li>
                <li>Crear oferta</li>
            </ul>
            </div>

            <div className="footer-column">
            <h4>Store</h4>
            <ul>
                <li>Cll 75 a #78-09</li>
                <li>Cra 90 #10-09</li>
                <li>Cll 89 #13-80</li>
            </ul>
            </div>

            <div className="footer-column">
            <h4>Contáctanos</h4>
            <ul>
                <li>+57 3289290</li>
                <li>WorkBank2025oficial@gmail.com</li>
            </ul>
            </div>
        </div>
        </footer>
    </section>
    );
}
