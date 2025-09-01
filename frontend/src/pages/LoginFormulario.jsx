import React from 'react'
import '../css/container.css'
import LoginPanel from '../components/LoginPanel';
import InformacionFormulario from '../components/InformacionFormularios';


function Login() {
    return (   
        
        <div className="container">
            <LoginPanel/>
            <InformacionFormulario/>
        </div>

    );
}

export default Login;