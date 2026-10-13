
document.addEventListener("DOMContentLoaded", () => {



    const cabecera = document.getElementById("cabecera-principal");
    const navegacion = document.getElementById("navegacion");

    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu-principal");


    if (!cabecera || !navegacion || !menuBtn || !menu) {
        console.error(
            "Error: no se encuentra la cabecera, navegación o menú."
        );
        return;
    }


    function actualizarNavegacion() {

   
        const mostrarNavegacion = window.scrollY > 100;

   
        cabecera.classList.toggle(
            "logo-oculto",
            mostrarNavegacion
        );

   
        navegacion.classList.toggle(
            "visible",
            mostrarNavegacion
        );

        if (!mostrarNavegacion) {
            cerrarMenu();
        }
    }


    function abrirMenu() {

        menu.classList.add("show");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Cerrar menú");

        menuBtn.querySelector(".icono-menu").textContent = "✕";
    }


    function cerrarMenu() {

        menu.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menú");

        const icono = menuBtn.querySelector(".icono-menu");

        if (icono) {
            icono.textContent = "☰";
        }
    }


    menuBtn.addEventListener("click", () => {

        const menuAbierto = menu.classList.contains("show");

        if (menuAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }

    });


    const enlaces = menu.querySelectorAll("a");

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", () => {
            cerrarMenu();
        });

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            cerrarMenu();
        }

        actualizarNavegacion();

    });


    window.addEventListener(
        "scroll",
        actualizarNavegacion,
        { passive: true }
    );


    actualizarNavegacion();

});
