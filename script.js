
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ELEMENTOS
    // ========================================

    const cabecera = document.getElementById("cabecera-principal");
    const navegacion = document.getElementById("navegacion");

    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu-principal");

    // Si falta algún elemento, evitamos errores de JavaScript.
    if (!cabecera || !navegacion || !menuBtn || !menu) {
        console.error(
            "Error: no se encuentra la cabecera, navegación o menú."
        );
        return;
    }


    // ========================================
    // NAVEGACIÓN CON SCROLL
    // ========================================

    function actualizarNavegacion() {

        // La barra aparece al bajar más de 100 píxeles.
        const mostrarNavegacion = window.scrollY > 100;

        // Ocultar el logo grande.
        cabecera.classList.toggle(
            "logo-oculto",
            mostrarNavegacion
        );

        // Mostrar u ocultar la barra fija.
        navegacion.classList.toggle(
            "visible",
            mostrarNavegacion
        );

        // Si volvemos arriba, cerrar también el menú móvil.
        if (!mostrarNavegacion) {
            cerrarMenu();
        }
    }


    // ========================================
    // ABRIR Y CERRAR MENÚ HAMBURGUESA
    // ========================================

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


    // ========================================
    // CERRAR AL PULSAR UN ENLACE
    // ========================================

    const enlaces = menu.querySelectorAll("a");

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", () => {
            cerrarMenu();
        });

    });


    // ========================================
    // CERRAR AL CAMBIAR A ESCRITORIO
    // ========================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            cerrarMenu();
        }

        actualizarNavegacion();

    });


    // ========================================
    // EVENTOS DE SCROLL
    // ========================================

    window.addEventListener(
        "scroll",
        actualizarNavegacion,
        { passive: true }
    );


    // ========================================
    // ESTADO INICIAL
    // ========================================

    actualizarNavegacion();

});
