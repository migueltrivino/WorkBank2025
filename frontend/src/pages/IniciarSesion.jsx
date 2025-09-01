import React from 'react'
import styles from '../css/Container.module.css'
import LoginPanel from '../components/LoginPanel';
import InformacionFormulario from '../components/InformacionFormularios';


function IniciarSesion() {
    return (   
        
        <div className={styles.container}>
            <InformacionFormulario/>
            <LoginPanel/>
        </div>

    );
}

export default IniciarSesion;