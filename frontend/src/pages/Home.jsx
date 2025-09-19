import styles from "../css/Home.module.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Oportunidades from "../components/Oportunidades";
import ConocerMas from "../components/ConocerMas";
import Contactanos from "../components/Contactanos";

function Home() {
    
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      
      <section id="about" className={styles.section}>
        <About />
      </section>

      <section id="oportunidades" className={styles.section}>
        <Oportunidades />
      </section>

      <ConocerMas />

      <section id="contacto" className={styles.section}>
        <Contactanos />
      </section>
    </div>
  );
}

export default Home;