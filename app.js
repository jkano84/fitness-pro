// app.js - Navegacion global con delegacion de eventos

document.addEventListener("DOMContentLoaded", () => {
    console.log("[NAV] DOMContentLoaded: inicializando navegacion global");

    const navigationMap = {
        "nav-auth": "auth-section",
        "nav-training": "training-section",
        "nav-planificador": "planificador-section",
        "nav-perfil": "perfil-section"
    };

    const protectedViews = new Set([
        "training-section",
        "planificador-section",
        "perfil-section"
    ]);

    function getViews() {
        return document.querySelectorAll(".view");
    }

    function runViewInit(sectionId) {
        console.log(`[NAV] Ejecutando inicializadores de vista: ${sectionId}`);

        if (sectionId === "training-section" && window.rutinasModule) {
            window.rutinasModule.init();
        }

        if (sectionId === "planificador-section") {
            if (window.nutricionModule) {
                window.nutricionModule.init();
            } else if (window.planificadorModule) {
                window.planificadorModule.initSemana();
            }
        }

        if (sectionId === "perfil-section" && window.perfilModule) {
            window.perfilModule.renderPerfilDashboard();
        }
    }

    function showSection(sectionId) {
        console.log(`[NAV] showSection ejecutado: ${sectionId}`);

        const targetSection = document.getElementById(sectionId);
        if (!targetSection) {
            console.error(`[NAV] No existe una seccion con id="${sectionId}"`);
            return;
        }

        getViews().forEach(view => {
            view.classList.remove("active");
            view.style.display = "none";
        });

        targetSection.classList.add("active");
        targetSection.style.display = "block";

        if (window.auth?.currentUser && sectionId !== "auth-section") {
            localStorage.setItem("fittracker_last_section", sectionId);
        }

        runViewInit(sectionId);
    }

    function navigateTo(sectionId) {
        console.log(`[NAV] navigateTo ejecutado: ${sectionId}`);

        if (protectedViews.has(sectionId) && !window.auth?.currentUser) {
            console.warn(`[NAV] Vista protegida sin sesion: ${sectionId}`);
            alert("Por favor, inicia sesion.");
            showSection("auth-section");
            return;
        }

        showSection(sectionId);
    }

    function logout() {
        console.log("[NAV] logout ejecutado");
        localStorage.clear();

        if (window.auth) {
            window.auth.currentUser = null;
            window.auth.users = {};
        }

        window.location.href = "index.html";
    }

    function initializeApp() {
        console.log("[NAV] initializeApp ejecutado");

        if (window.auth?.currentUser) {
            const lastSectionId = localStorage.getItem("fittracker_last_section");
            const savedSection = lastSectionId ? document.getElementById(lastSectionId) : null;

            if (savedSection && savedSection.classList.contains("view") && lastSectionId !== "auth-section") {
                navigateTo(lastSectionId);
            } else {
                navigateTo("training-section");
            }

            window.auth.updateNavigation();
        } else {
            showSection("auth-section");
        }
    }

    document.addEventListener("click", event => {
        const navButton = event.target.closest("[id^='nav-']");
        if (!navButton) return;

        event.preventDefault();
        console.log(`[NAV] Click detectado en: ${navButton.id}`);

        if (navButton.id === "nav-logout") {
            logout();
            return;
        }

        const sectionId = navButton.dataset.target || navigationMap[navButton.id];
        if (!sectionId) {
            console.warn(`[NAV] No hay seccion configurada para: ${navButton.id}`);
            return;
        }

        navigateTo(sectionId);
    });

    if (window.auth) {
        window.auth.redirectAfterAuth = () => {
            console.log("[NAV] redirectAfterAuth ejecutado");
            initializeApp();
        };
    }

    window.appNavigation = {
        showSection,
        navigateTo,
        logout
    };

    initializeApp();
});
