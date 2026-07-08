// app.js - Lógica principal de la aplicación y enrutamiento con persistencia de pestaña activa

document.addEventListener("DOMContentLoaded", () => {
    const navAuth = document.getElementById("nav-auth");
    const navTraining = document.getElementById("nav-training");
    const navPlanificador = document.getElementById("nav-planificador");
    const navPerfil = document.getElementById("nav-perfil");
    const navLogout = document.getElementById("nav-logout");

    const authSection = document.getElementById("auth-section");
    const trainingSection = document.getElementById("training-section");
    const planificadorSection = document.getElementById("planificador-section");
    const perfilSection = document.getElementById("perfil-section");

    function showSection(sectionToShow) {
        const sections = [authSection, trainingSection, planificadorSection, perfilSection];
        
        sections.forEach(section => {
            if (section === sectionToShow) {
                if (section) {
                    section.classList.add("active");
                    section.style.display = "block";
                    
                    // Guardar pestaña en el LocalStorage si el usuario está logueado
                    if (auth.currentUser && section.id !== "auth-section") {
                        localStorage.setItem("fittracker_last_section", section.id);
                    }

                    // DISPARADORES DE ENTRADA DIRECTA A LOS MÓDULOS
                    if (section === planificadorSection && window.nutricionModule) {
                        window.nutricionModule.init();
                    } else if (section === planificadorSection && window.planificadorModule) {
                        window.planificadorModule.initSemana();
                    }
                    if (section === trainingSection && window.rutinasModule) {
                        window.rutinasModule.init();
                    }
                }
            } else {
                if (section) {
                    section.classList.remove("active");
                    section.style.display = "none";
                }
            }
        });
    }

    function initializeApp() {
        if (auth.currentUser) {
            const lastSectionId = localStorage.getItem("fittracker_last_section");
            const savedSection = document.getElementById(lastSectionId);

            if (savedSection && lastSectionId !== "auth-section") {
                showSection(savedSection);
            } else {
                showSection(trainingSection);
            }
            auth.updateNavigation(); 
        } else {
            showSection(authSection);
        }
    }

    if (navAuth) navAuth.addEventListener("click", (e) => { e.preventDefault(); showSection(authSection); });
    
    if (navTraining) {
        navTraining.addEventListener("click", (e) => {
            e.preventDefault();
            if (auth.currentUser) { showSection(trainingSection); } 
            else { alert("Por favor, inicia sesión."); showSection(authSection); }
        });
    }

    if (navPlanificador) {
        navPlanificador.addEventListener("click", (e) => {
            e.preventDefault();
            if (auth.currentUser) { showSection(planificadorSection); } 
            else { alert("Por favor, inicia sesión."); showSection(authSection); }
        });
    }

    if (navPerfil) {
        navPerfil.addEventListener("click", (e) => {
            e.preventDefault();
            if (auth.currentUser) { showSection(perfilSection); } 
            else { alert("Por favor, inicia sesión."); showSection(authSection); }
        });
    }

    if (navLogout) {
        navLogout.addEventListener("click", (e) => {
            e.preventDefault();
            auth.clearCurrentUser(); 
            localStorage.removeItem("fittracker_last_section");
            alert('Sesión cerrada.');
            showSection(authSection);
        });
    }

    auth.redirectAfterAuth = () => { initializeApp(); };
    initializeApp();
});
