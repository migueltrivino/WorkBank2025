// Animación al enviar formulario
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita recargar la página

    const btn = document.querySelector(".btn");
    btn.innerText = "Ingresando...";
    btn.style.background = "linear-gradient(90deg, #4B5D67, #1E88E5)";
    btn.style.boxShadow = "0 0 10px rgba(30,136,229,0.7)";

    setTimeout(() => {
    btn.innerText = "Ingresar";
    alert("Inicio de sesión simulado ✅");
    }, 2000);
});