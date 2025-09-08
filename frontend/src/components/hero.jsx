import fondoOp from "../assets/Fondo_index.png";
import "../css/Hero.css";

export default function Hero() {
    return (
    <section className="hero">
        <div className="hero-text">
        <h1>Trabajar juntos es el primer paso para lograr grandes cosas.</h1>
        <p>El lugar donde el trabajo y la confianza se encuentran, donde todos tienen una oportunidad.</p>
        <a href="#conocer-mas" className="btn">Conoce mas...</a>
        </div>
    </section>
    );
}