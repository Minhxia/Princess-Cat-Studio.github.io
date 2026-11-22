
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
                        tarjeta.classList.remove("aparecer");
                        tarjeta.offsetWidth;   // reinicia la animación
                        tarjeta.style.animationDelay = `${visibles * 0.08}s`;
                        tarjeta.classList.add("aparecer");
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



    const navegacion = document.getElementById("navegacion");

    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu-principal");


    if (!navegacion || !menuBtn || !menu) {
        console.error(
            "Error: no se encuentra la navegación o el menú."
        );
        return;
    }

    const enlaces = menu.querySelectorAll("a");
    const secciones = document.querySelectorAll("main section");

    function marcarSeccionActiva() {

        let seccionActual = "inicio";

        secciones.forEach((seccion) => {
            if (window.scrollY >= seccion.offsetTop - window.innerHeight / 3) {
                seccionActual = seccion.id;
            }
        });

        const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

        if (alFinal) {
            seccionActual = secciones[secciones.length - 1].id;
        }

        enlaces.forEach((enlace) => {
            const activo = enlace.getAttribute("href") === "#" + seccionActual;
            enlace.classList.toggle("activo", activo);
        });
    }


    function abrirMenu() {

        menu.classList.add("show");

        document.body.classList.add("menu-abierto");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Cerrar menú");

        menuBtn.querySelector(".icono-menu").textContent = "✕";
    }


    function cerrarMenu() {

        menu.classList.remove("show");

        document.body.classList.remove("menu-abierto");

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


    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", () => {
            cerrarMenu();
        });

    });

    function scrollSuave(destino) {
        
        const inicio = window.scrollY;
        const recorrido = destino - inicio;
        const duracion = 800;
        let tiempoInicio = null;

        function paso(tiempo) {
            if (!tiempoInicio) {
                tiempoInicio = tiempo;
            }

            const progreso = Math.min((tiempo - tiempoInicio) / duracion, 1);
            const suavizado = 1 - Math.pow(1 - progreso, 3);

            window.scrollTo(0, inicio + recorrido * suavizado);

            if (progreso < 1) {
                requestAnimationFrame(paso);
            }
        }

        requestAnimationFrame(paso);
    }

    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const seccion = document.querySelector(enlace.getAttribute("href"));

            if (!seccion) return;

            evento.preventDefault();

            const destino = seccion.getBoundingClientRect().top + window.scrollY - navegacion.offsetHeight;

            scrollSuave(destino);
        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            cerrarMenu();
        }

        marcarSeccionActiva();

    });


    window.addEventListener(
        "scroll",
        marcarSeccionActiva,
        { passive: true }
    );


    marcarSeccionActiva();



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

    const cajaCarrusel = document.querySelector(".carrusel");
    const carrusel = document.getElementById("mini-gameplays");
    const diapositivas = carrusel.querySelectorAll(".gameplay");
    const flechaIzquierda = document.getElementById("flecha-izquierda");
    const flechaDerecha = document.getElementById("flecha-derecha");
    const contenedorPuntos = document.getElementById("puntos-carrusel");

    const total = diapositivas.length;

    // copias para que no vuelva hacia atrás
    const copiaPrimero = diapositivas[0].cloneNode(true);
    const copiaUltimo = diapositivas[total - 1].cloneNode(true);

    copiaPrimero.setAttribute("aria-hidden", "true");
    copiaUltimo.setAttribute("aria-hidden", "true");

    carrusel.appendChild(copiaPrimero);
    carrusel.prepend(copiaUltimo);

    let posicion = 1;
    let moviendose = false;
    let autoplay = null;

    let arrastrando = false;
    let inicioX = 0;
    let distancia = 0;

    const puntos = [];

    for (let i = 0; i < total; i++) {
        const punto = document.createElement("button");
        punto.className = "punto";
        punto.type = "button";
        punto.setAttribute("aria-label", `Ir al gameplay ${i + 1}`);

        punto.addEventListener("click", () => {
            irA(i + 1);
            iniciarAutoplay();
        });

        contenedorPuntos.appendChild(punto);
        puntos.push(punto);
    }


    function moverCarrusel(desplazamiento = 0) {
        carrusel.style.transform = `translateX(calc(-${posicion * 100}% + ${desplazamiento}px))`;
    }

    function actualizarPuntos() {
        const actual = (posicion - 1 + total) % total;

        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === actual);
        });
    }

    function irA(nuevaPosicion) {
        if (moviendose || nuevaPosicion === posicion) return;

        posicion = nuevaPosicion;
        moviendose = true;
        cajaCarrusel.classList.add("moviendose");
        moverCarrusel();
        actualizarPuntos();
    }

    function siguienteDiapositiva() {
        irA(posicion + 1);
    }

    function anteriorDiapositiva() {
        irA(posicion - 1);
    }

    function saltarSinAnimacion(nuevaPosicion) {
        posicion = nuevaPosicion;

        carrusel.classList.add("sin-transicion");
        moverCarrusel();
        carrusel.offsetHeight;   // aplica el salto antes de quitar la clase
        carrusel.classList.remove("sin-transicion");
    }

    carrusel.addEventListener("transitionend", (evento) => {
        if (evento.target !== carrusel) return;

        moviendose = false;
        cajaCarrusel.classList.remove("moviendose");

        if (posicion === total + 1) {
            saltarSinAnimacion(1);
        } else if (posicion === 0) {
            saltarSinAnimacion(total);
        }
    });

    function iniciarAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(siguienteDiapositiva, 4000);
    }

    
    flechaDerecha.addEventListener("click", () => {
        anteriorDiapositiva();
        iniciarAutoplay();   // reinicia el tiempo
    });

    flechaIzquierda.addEventListener("click", () => {
        siguienteDiapositiva();
        iniciarAutoplay();
    });

    carrusel.addEventListener("pointerdown", (evento) => {
        if (moviendose) return;

        arrastrando = true;
        inicioX = evento.clientX;
        distancia = 0;

        clearInterval(autoplay);
        carrusel.classList.add("arrastrando");
        carrusel.setPointerCapture(evento.pointerId);
    });

    carrusel.addEventListener("pointermove", (evento) => {
        if (!arrastrando) return;

        distancia = evento.clientX - inicioX;
        moverCarrusel(distancia);

        if (Math.abs(distancia) > 5) {
            cajaCarrusel.classList.add("moviendose");
        }
    });

    function soltarCarrusel() {
        if (!arrastrando) return;
        
        arrastrando = false;
        carrusel.classList.remove("arrastrando");

        if (distancia < -50) {
            siguienteDiapositiva();
        } else if (distancia > 50) {
            anteriorDiapositiva();
        } else {
            moverCarrusel();
            cajaCarrusel.classList.remove("moviendose");
        }

        iniciarAutoplay();
    }

    carrusel.addEventListener("pointerup", soltarCarrusel);
    carrusel.addEventListener("pointercancel", soltarCarrusel);

    saltarSinAnimacion(1);
    actualizarPuntos();
    iniciarAutoplay();



    const elementosAnimados = document.querySelectorAll(`
        main section > h1,
        main section > h2,
        main section > p,
        main section > div > p,
        .trailer-presentacion,
        .boton,
        .tarjeta-presentacion,
        .caracteristicas,
        .portada-juego,
        .carrusel,
        .puntos-carrusel,
        .filtros-personajes,
        .info-tarjetas,
        .lista-redes a,
        .cat,
        .formulario-contacto
    `);

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("revelar");
        observador.observe(elemento);
    });

    document.querySelectorAll(".tarjeta-presentacion").forEach((tarjeta, i) => {
        tarjeta.style.animationDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll(".lista-redes a").forEach((red, i) => {
        red.style.animationDelay = `${i * 0.1}s`;
    });
});
