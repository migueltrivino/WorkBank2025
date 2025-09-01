import React from 'react'
import styles from '../css/Container.module.css'
import LoginPanel from '../components/LoginPanel';
import InformacionFormulario from '../components/InformacionFormularios';


function Login() {
    return (   
        
        <div className={styles.container}>
            <LoginPanel/>
            <InformacionFormulario/>
        </div>

    );
}

export default Login;