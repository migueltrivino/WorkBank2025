import "../css/Contactanos.css";
import logo from "../assets/logos.png";

export default function Contactanos() {
    return (
    <>
        <section id="contactanos" className="contact-section">
            <div className="contact-header">
                <h2>Contáctanos</h2>
                <p>Cada mensaje tuyo es una oportunidad para mejorar</p>
            <div className="contact-icons">
            {/* Gmail */}
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=WorkBank2025oficial@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <i className="fab fa-google icon-gmail"></i>
                </a>

            {/* WhatsApp */}
                <a
                    href="https://wa.me/573053983192" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <i className="fab fa-whatsapp icon-whatsapp"></i>
                </a>
            </div>
        </div>
        </section>

      {/* FOOTER - fuera del section para ocupar todo el ancho */}
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                <img src={logo} alt="WorkBank Logo" />

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
    </>
    );
}




