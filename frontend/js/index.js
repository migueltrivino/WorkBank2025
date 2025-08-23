// Animación suave al hacer click en los enlaces del navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
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
});


