// perfil.js - Modulo de Perfil con persistencia completa y Harris-Benedict
const perfilModule = {
    init() {
        const form = document.getElementById("update-personal-data-form");
        if (form) form.addEventListener("submit", this.handleUpdatePersonalData.bind(this));
        this.renderPerfilDashboard();
    },

    renderPerfilDashboard() {
        if (auth.currentUser) {
            document.getElementById("perfil-username-display").textContent = auth.currentUser.username;
            this.displayPersonalData();
            this.renderPhysicalChanges();
        }
    },

    displayPersonalData() {
        if (!auth.currentUser) return;
        const userData = auth.currentUser.personalData || {};
        const setText = (id, value, suffix = "") => {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = value !== null && value !== undefined && value !== "" ? `${value}${suffix}` : "N/A";
        };
        const setValue = (id, value) => {
            const el = document.getElementById(id);
            if (!el || value === null || value === undefined || value === "") return;
            el.value = value;
        };

        setText("display-age", userData.age);
        setText("display-weight", userData.weight);
        setText("display-height", userData.height);
        setText("display-bmi", userData.bmi ? Number(userData.bmi).toFixed(2) : null);
        setText("display-waist", userData.waist);
        setText("display-hip", userData.hip);
        setText("display-chest", userData.chest);
        setText("display-arm-left", userData.armLeft);
        setText("display-arm-right", userData.armRight);
        setText("display-neck", userData.neck);

        setValue("input-age", userData.age);
        setValue("input-weight", userData.weight);
        setValue("input-height", userData.height);
        setValue("input-sex", userData.sex);
        setValue("input-activity", userData.activity);
        setValue("input-waist", userData.waist);
        setValue("input-hip", userData.hip);
        setValue("input-chest", userData.chest);
        setValue("input-arm-left", userData.armLeft);
        setValue("input-arm-right", userData.armRight);
        setValue("input-neck", userData.neck);
    },

    calcularMetabolismo({ age, weight, height, sex, activity }) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const tmb = sex === "mujer"
            ? 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
            : 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        const tdee = Math.round(tmb * activity);

        return {
            bmi,
            tmb: Math.round(tmb),
            tdee
        };
    },

    handleUpdatePersonalData(event) {
        event.preventDefault();
        if (!auth.currentUser) {
            alert("Debes iniciar sesión para guardar tu perfil.");
            return;
        }

        const getNumber = (id) => {
            const value = parseFloat(document.getElementById(id)?.value);
            return Number.isFinite(value) ? value : null;
        };

        const age = getNumber("input-age");
        const weight = getNumber("input-weight");
        const height = getNumber("input-height");
        const sex = document.getElementById("input-sex")?.value;
        const activity = getNumber("input-activity");

        if (!age || !weight || !height || !sex || !activity) {
            alert("Completa edad, peso, estatura, sexo y nivel de actividad.");
            return;
        }

        const waist = getNumber("input-waist");
        const hip = getNumber("input-hip");
        const chest = getNumber("input-chest");
        const armLeft = getNumber("input-arm-left");
        const armRight = getNumber("input-arm-right");
        const neck = getNumber("input-neck");
        const metabolismo = this.calcularMetabolismo({ age, weight, height, sex, activity });

        auth.currentUser.personalData = {
            age, weight, height, sex, activity,
            waist, hip, chest, armLeft, armRight, neck,
            bmi: metabolismo.bmi,
            tmb: metabolismo.tmb,
            tdee: metabolismo.tdee,
            caloriasMantenimiento: metabolismo.tdee
        };

        const userId = auth.currentUser.id;
        auth.users[userId] = auth.currentUser;
        auth.saveUsers();

        const historialFisico = JSON.parse(localStorage.getItem(`historialFisico_${userId}`)) || [];
        historialFisico.push({
            timestamp: new Date().toISOString(),
            ...auth.currentUser.personalData
        });
        localStorage.setItem(`historialFisico_${userId}`, JSON.stringify(historialFisico));

        this.displayPersonalData();
        this.renderPhysicalChanges();

        if (typeof window !== "undefined" && window.nutricionModule && document.getElementById("planificador-section")?.style.display !== "none") {
            window.nutricionModule.init();
        }

        const msg = document.getElementById("personal-data-message");
        const texto = `Perfil actualizado. Tu meta calórica diaria es de ${metabolismo.tdee} kcal. Esta meta se ha enviado al Planificador Nutricional.`;
        if (msg) {
            msg.textContent = texto;
            msg.style.color = "var(--neon-green)";
            setTimeout(() => msg.textContent = "", 7000);
        }
        alert(texto);
    },

    renderPhysicalChanges() {
        const physicalChangesList = document.getElementById("physical-changes-list");
        if (!physicalChangesList) return;
        
        physicalChangesList.innerHTML = "";
        const userId = auth.currentUser.id;
        const historialFisico = JSON.parse(localStorage.getItem(`historialFisico_${userId}`)) || [];

        // Ordenamos del más RECIENTE al más ANTIGUO en la lista escrita
        const datosLista = [...historialFisico].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        datosLista.forEach(change => {
            const li = document.createElement("li");
            const dateObj = new Date(change.timestamp);
            const fechaFormateada = dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            li.style.background = "#2a2a2a";
            li.style.margin = "8px 0";
            li.style.padding = "10px";
            li.style.borderRadius = "4px";
            li.style.borderLeft = "3px solid #3b82f6";

            li.innerHTML = `
                <span style="color: #00ff00; font-weight: bold;">📅 ${fechaFormateada}</span> — 
                <strong>Peso:</strong> ${change.weight}kg | <strong>IMC:</strong> ${change.bmi.toFixed(2)} | 
                <strong>Mantenimiento:</strong> ${change.caloriasMantenimiento || "N/A"} kcal<br>
                <small style="color: #aaa;">Medidas — Cintura: ${change.waist || "—"}cm | Cadera: ${change.hip || "—"}cm | Pecho: ${change.chest || "—"}cm | B. Izq: ${change.armLeft || "—"}cm | B. Der: ${change.armRight || "—"}cm | Cuello: ${change.neck || "—"}cm</small>
            `;
            physicalChangesList.appendChild(li);
        });
    }
};

window.perfilModule = perfilModule;

document.addEventListener("DOMContentLoaded", () => {
    perfilModule.init();
});
