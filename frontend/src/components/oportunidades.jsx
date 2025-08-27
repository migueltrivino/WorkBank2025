import { useEffect } from "react";
import fondoOp from "../assets/fondo_op.jpg";
import '../css/Oportunidades.css'

export default function oportunidades() {
    useEffect(() => {
    const section = document.getElementById("oportunidades");
    let timer;

    section.addEventListener("mouseenter", () => {
        timer = setTimeout(() => {
        section.classList.add("animar");
        }, 1000);
    });

    section.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        section.classList.remove("animar");
    });
    }, []);

    return (
    <section id="oportunidades" className="oportunidades">
        <div className="op-col izquierda" style={{ backgroundImage: `url(${fondoOp})` }}>
        <div className="overlay">
            <h2>Oportunidades con <br /> WorkBank.W</h2>
        </div>
        </div>
        <div className="op-col derecha">
        <p>
            <strong>WorkBank.W</strong> ofrece la oportunidad de encontrar y ofrecer 
            trabajos informales de manera rápida, segura y sin necesidad de un contrato laboral. 
            La plataforma conecta a empleadores y trabajadores para acordar tarifas y condiciones 
            de forma directa, permitiendo generar ingresos adicionales, aprovechar habilidades y 
            acceder a una amplia variedad de oportunidades como limpieza, cuidado de niños, 
            paseos de mascotas y más, todo en un solo lugar.
        </p>
        </div>
    </section>
    );
}
