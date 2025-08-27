import "../css/ConocerMas.css";
export default function ConocerMas() {
    return (
    <section id="conocer-mas" className="conocer-mas">
        <div className="conocer-container">
        <h2>Paso a paso para empezar.</h2>
        <p className="subtitulo">
            Cada gran cambio empieza con un primer paso. Aquí te mostramos cómo iniciar tu camino en WorkBank.W
        </p>

        <div className="pasos-grid">
            <div className="paso">
            <h3>Paso 1</h3>
            <p>Regístrate gratis.</p>
            </div>
            <div className="paso">
            <h3>Paso 2</h3>
            <p>Publica un servicio o busca un trabajo.</p>
            </div>
            <div className="paso">
            <h3>Paso 3</h3>
            <p>Acordar condiciones y pago directamente.</p>
            </div>
            <div className="paso">
            <h3>Paso 4</h3>
            <p>Califica y gana reputación.</p>
            </div>
        </div>
        </div>
    </section>
    );
}