
document.addEventListener("DOMContentLoaded", () => {

    const botonesFiltro = document.querySelectorAll(".filtro-personajes");
    const tarjetasPersonaje = document.querySelectorAll(".personaje[data-categoria]");
    const estadoFiltro = document.querySelector(".estado-filtro-personajes");

    if (botonesFiltro.length && tarjetasPersonaje.length && estadoFiltro) {
        botonesFiltro.forEach((boton) => {
            boton.addEventListener("click", () => {
                const filtro = boton.dataset.filtro;
                let visibles = 0;

                tarjetasPersonaje.forEach((tarjeta) => {
                    const mostrar = filtro === "todos" || tarjeta.dataset.categoria === filtro;
                    tarjeta.hidden = !mostrar;
                    if (mostrar) {
                        visibles += 1;
                    }
                });

                botonesFiltro.forEach((otroBoton) => {
                    const seleccionado = otroBoton === boton;
                    otroBoton.classList.toggle("activo", seleccionado);
                    otroBoton.setAttribute("aria-pressed", String(seleccionado));
                });

                estadoFiltro.textContent = `Mostrando ${visibles} ${visibles === 1 ? "personaje" : "personajes"}.`;
            });
        });

        estadoFiltro.textContent = `Mostrando ${tarjetasPersonaje.length} personajes.`;
    }



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



    const cat    = document.getElementById('cat');
    const frames = cat.querySelectorAll('img');
    const zzz = document.getElementById('zzz');
    const sound = new Audio('./src/sonidos/meow.mp3');
    sound.preload = 'auto';

    // Índices de los frames "dormido" y duración (ms) de cada uno
    const SLEEP_FRAMES    = [0, 1, 2, 1]; 
    const SLEEP_DURATIONS = [800, 300, 1000, 300];
    const AWAKE_INDEX     = 3;

    let timer     = null;
    let sleeping  = true;
    let holdAwake = null;

    cat.addEventListener('click', () => {
        sound.currentTime = 0;   // reinicia si ya estaba sonando
        sound.play();
        showAwake();
        clearTimeout(holdAwake);
        holdAwake = setTimeout(() => { holdAwake = null; startSleep(); }, 3000);
    });

    function showFrame(index) {
        frames.forEach((img, i) => img.classList.toggle('active', i === index));
    }

    function playSleep(step = 0) {
        if (!sleeping) return;
            showFrame(SLEEP_FRAMES[step]);
            timer = setTimeout(() => {
                    playSleep((step + 1) % SLEEP_FRAMES.length);
        }, SLEEP_DURATIONS[step]);
    }

    function startSleep() {
        if (holdAwake) return;
        sleeping = true;
        clearTimeout(timer);
        zzz.classList.remove('hidden');
        playSleep(0);
    }

    function showAwake() {
        sleeping = false;
        clearTimeout(timer);
        zzz.classList.add('hidden');
        showFrame(AWAKE_INDEX);
    }

    cat.addEventListener('mouseenter', showAwake);
    cat.addEventListener('mouseleave', startSleep);
    // Soporte táctil
    cat.addEventListener('touchstart', showAwake, { passive: true });
    cat.addEventListener('touchend',   startSleep);

    startSleep();

});
