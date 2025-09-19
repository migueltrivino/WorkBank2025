    import { FaBriefcase, FaBullhorn, FaTools, FaShieldAlt } from "react-icons/fa";
    import '../css/About.css'

    export default function QuienesSomos() {
        return (
        <section className="quienes-somos" id="quienes-somos">
            <h2>Quienes Somos.</h2>
            <p>Unimos personas para trabajos simples, rápidos y de confianza.</p>
            
            <div className="cards">
            <div className="card">
                <FaBriefcase size={50} color="#00adb5" />
                <h3>Encuentra Trabajo</h3>
                <p>
                Conéctate con oportunidades cercanas y empieza a trabajar hoy mismo.
                </p>
            </div>

            <div className="card">
                <FaBullhorn size={50} color="#00adb5" />
                <h3>Publica tu Oferta</h3>
                <p>
                Encuentra rápidamente a la persona ideal para tu tarea o proyecto.
                </p>
            </div>

            <div className="card">
                <FaTools size={50} color="#00adb5" />
                <h3>Variedad de Oficios</h3>
                <p>
                Desde limpieza y jardinería hasta reparaciones y ayuda por horas.
                </p>
            </div>

            <div className="card">
                <FaShieldAlt size={50} color="#00adb5" />
                <h3>Confianza y Seguridad</h3>
                <p>
                Verificamos perfiles para que contrates o trabajes con tranquilidad.
                </p>
            </div>
            </div>
        </section>
        );
    }
