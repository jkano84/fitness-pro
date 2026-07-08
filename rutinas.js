// rutinas.js - Modulo de entrenamiento progresivo por trimestres
const rutinasModule = {
    storageKey: 'fittracker_rutinas_v9',
    dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    planes: {},
    t: '1',
    m: '1',
    s: '1',
    dia: 'Lunes',
    tituloEditando: false,
    formActivo: null,
    grupoSeleccionado: '',

    init() {
        this.planes = this.cargarPlanes();
        this.verificarEstructura();
        this.render();
    },

    cargarPlanes() {
        const nuevo = localStorage.getItem(this.storageKey);
        if (nuevo) return JSON.parse(nuevo);

        const anterior = localStorage.getItem('fittracker_rutinas_v8');
        if (!anterior) return {};

        try {
            return this.migrarEstructuraAnterior(JSON.parse(anterior));
        } catch (error) {
            console.warn('No se pudo migrar la rutina anterior:', error);
            return {};
        }
    },

    migrarEstructuraAnterior(data) {
        Object.keys(data || {}).forEach(t => {
            Object.keys(data[t] || {}).forEach(m => {
                Object.keys(data[t][m] || {}).forEach(s => {
                    Object.keys(data[t][m][s] || {}).forEach(dia => {
                        const diaData = data[t][m][s][dia];
                        if (!diaData || !Array.isArray(diaData.ejercicios)) return;

                        diaData.ejercicios = diaData.ejercicios.map(item => {
                            const info = this.buscarEjercicio(item.id || item.name);
                            return this.normalizarEjercicio({
                                id: info?.id || item.id || this.crearId(),
                                name: info?.name || item.name || 'Ejercicio',
                                grupo: info?.grupo || item.grupo || 'General',
                                calPerRep: Number(info?.calPerRep || item.calPerRep || 0.5),
                                series: Number(item.series || 1),
                                repeticiones: Number(item.repeticiones || 10),
                                cargas: item.cargas || [{ peso: 0, unidad: 'kg', done: false }]
                            });
                        });
                    });
                });
            });
        });
        return data;
    },

    verificarEstructura() {
        for (let t = 1; t <= 4; t++) {
            if (!this.planes[t]) this.planes[t] = {};
            for (let m = 1; m <= 3; m++) {
                if (!this.planes[t][m]) this.planes[t][m] = {};
                for (let s = 1; s <= 4; s++) {
                    if (!this.planes[t][m][s]) this.planes[t][m][s] = {};
                    this.dias.forEach(dia => {
                        if (!this.planes[t][m][s][dia]) {
                            this.planes[t][m][s][dia] = { titulo: '', ejercicios: [] };
                        }
                        if (!Array.isArray(this.planes[t][m][s][dia].ejercicios)) {
                            this.planes[t][m][s][dia].ejercicios = [];
                        }
                    });
                }
            }
        }
        this.save();
    },

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.planes));
    },

    getDiaData() {
        return this.planes[this.t][this.m][this.s][this.dia];
    },

    crearId() {
        return `rut-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },

    buscarEjercicio(valor) {
        return (window.ejerciciosDb || []).find(ej => ej.id === valor || ej.name === valor);
    },

    normalizarEjercicio(data) {
        const series = Math.max(1, Number(data.series) || 1);
        const repeticiones = Math.max(1, Number(data.repeticiones) || 1);
        const cargas = Array.from({ length: series }, (_, index) => {
            const carga = data.cargas?.[index] || {};
            return {
                peso: Math.max(0, Number(carga.peso) || 0),
                unidad: carga.unidad === 'lb' ? 'lb' : 'kg',
                done: Boolean(carga.done)
            };
        });

        return {
            id: data.id || this.crearId(),
            ejercicioId: data.ejercicioId || data.id || '',
            name: data.name || 'Ejercicio',
            grupo: data.grupo || 'General',
            calPerRep: Math.max(0, Number(data.calPerRep) || 0.5),
            series,
            repeticiones,
            cargas
        };
    },

    cambiarNivel(nivel, valor) {
        if (nivel === 't') {
            this.t = valor;
            this.m = '1';
            this.s = '1';
        }
        if (nivel === 'm') {
            this.m = valor;
            this.s = '1';
        }
        if (nivel === 's') this.s = valor;
        if (nivel === 'dia') this.dia = valor;

        this.formActivo = null;
        this.grupoSeleccionado = '';
        this.tituloEditando = false;
        this.render();
    },

    seleccionarGrupoMuscular(grupo) {
        this.grupoSeleccionado = grupo;
        this.formActivo = null;
        this.render();
    },

    editarTitulo() {
        this.tituloEditando = true;
        this.render();
    },

    guardarTitulo() {
        const input = document.getElementById('rutina-titulo-input');
        this.getDiaData().titulo = input ? input.value.trim() : '';
        this.tituloEditando = false;
        this.save();
        this.render();
    },

    cancelarTitulo() {
        this.tituloEditando = false;
        this.render();
    },

    iniciarFormulario(ejercicioId) {
        if (!ejercicioId) {
            this.formActivo = null;
            this.render();
            return;
        }

        const ejercicio = this.buscarEjercicio(ejercicioId);
        if (!ejercicio) return;

        this.formActivo = {
            modo: 'crear',
            index: null,
            ejercicioId: ejercicio.id,
            name: ejercicio.name,
            grupo: ejercicio.grupo,
            calPerRep: ejercicio.calPerRep,
            series: 4,
            repeticiones: 10,
            cargas: Array.from({ length: 4 }, () => ({ peso: 0, unidad: 'kg', done: false }))
        };
        this.render();
    },

    editarEjercicio(index) {
        const ejercicio = this.getDiaData().ejercicios[index];
        if (!ejercicio) return;

        this.formActivo = {
            ...JSON.parse(JSON.stringify(ejercicio)),
            modo: 'editar',
            index
        };
        this.render();
    },

    cancelarFormulario() {
        this.formActivo = null;
        this.render();
    },

    leerFormularioActual() {
        if (!this.formActivo) return null;

        const seriesInput = document.getElementById('rutina-series-input');
        const repsInput = document.getElementById('rutina-reps-input');
        const series = Math.max(1, Number(seriesInput?.value) || 1);
        const repeticiones = Math.max(1, Number(repsInput?.value) || 1);
        const cargas = Array.from({ length: series }, (_, index) => {
            const pesoInput = document.getElementById(`rutina-peso-${index}`);
            const unidadInput = document.getElementById(`rutina-unidad-${index}`);
            const previa = this.formActivo.cargas?.[index] || {};

            return {
                peso: Math.max(0, Number(pesoInput?.value ?? previa.peso) || 0),
                unidad: unidadInput?.value === 'lb' ? 'lb' : (previa.unidad === 'lb' ? 'lb' : 'kg'),
                done: Boolean(previa.done)
            };
        });

        return {
            ...this.formActivo,
            series,
            repeticiones,
            cargas
        };
    },

    actualizarSeriesFormulario() {
        const actual = this.leerFormularioActual();
        if (!actual) return;
        this.formActivo = actual;
        this.render();
        setTimeout(() => {
            const input = document.getElementById('rutina-series-input');
            if (!input) return;
            input.focus();
            const fin = String(input.value).length;
            if (input.setSelectionRange) input.setSelectionRange(fin, fin);
        }, 0);
    },

    guardarEjercicio() {
        const actual = this.leerFormularioActual();
        if (!actual) return;

        const ejercicio = this.normalizarEjercicio(actual);
        const diaData = this.getDiaData();

        if (actual.modo === 'editar' && Number.isInteger(actual.index)) {
            diaData.ejercicios[actual.index] = ejercicio;
        } else {
            diaData.ejercicios.push(ejercicio);
        }

        this.formActivo = null;
        this.save();
        this.render();
    },

    eliminarEjercicio(index) {
        this.getDiaData().ejercicios.splice(index, 1);
        this.formActivo = null;
        this.save();
        this.render();
    },

    toggleSerie(indexEjercicio, indexSerie) {
        const ejercicio = this.getDiaData().ejercicios[indexEjercicio];
        if (!ejercicio || !ejercicio.cargas[indexSerie]) return;

        ejercicio.cargas[indexSerie].done = !ejercicio.cargas[indexSerie].done;
        this.save();
        this.render();
    },

    convertirKg(peso, unidad) {
        return unidad === 'lb' ? peso * 0.45359 : peso;
    },

    calcularCaloriasEjercicio(ejercicio) {
        return ejercicio.cargas.reduce((total, carga) => {
            const kg = this.convertirKg(Number(carga.peso) || 0, carga.unidad);
            const factorCarga = 1 + (kg / 100);
            return total + (ejercicio.repeticiones * ejercicio.calPerRep * factorCarga);
        }, 0);
    },

    calcularCaloriasDia() {
        return this.getDiaData().ejercicios.reduce((total, ejercicio) => {
            return total + this.calcularCaloriasEjercicio(ejercicio);
        }, 0);
    },

    escapeHtml(valor) {
        return String(valor ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    renderBotones(cantidad, actual, tipo, prefijo) {
        return Array.from({ length: cantidad }, (_, index) => {
            const valor = String(index + 1);
            const activo = actual === valor ? 'is-active' : '';
            return `<button class="routine-nav-btn ${activo}" type="button" onclick="rutinasModule.cambiarNivel('${tipo}', '${valor}')">${prefijo}${valor}</button>`;
        }).join('');
    },

    renderDias() {
        return this.dias.map(dia => {
            const activo = this.dia === dia ? 'is-active' : '';
            return `<button class="routine-nav-btn routine-day-btn ${activo}" type="button" onclick="rutinasModule.cambiarNivel('dia', '${dia}')">${dia}</button>`;
        }).join('');
    },

    renderSelectorEjercicios() {
        const ejercicios = window.ejerciciosDb || [];
        const grupos = [...new Set(ejercicios.map(ejercicio => ejercicio.grupo).filter(Boolean))].sort();
        const ejerciciosFiltrados = this.grupoSeleccionado
            ? ejercicios.filter(ejercicio => ejercicio.grupo === this.grupoSeleccionado)
            : [];

        const opcionesGrupo = grupos
            .map(grupo => {
                const selected = grupo === this.grupoSeleccionado ? 'selected' : '';
                return `<option value="${this.escapeHtml(grupo)}" ${selected}>${this.escapeHtml(grupo)}</option>`;
            })
            .join('');

        const opcionesEjercicio = ejerciciosFiltrados
            .map(ejercicio => `<option value="${this.escapeHtml(ejercicio.id)}">${this.escapeHtml(ejercicio.name)}</option>`)
            .join('');

        const ejercicioDisabled = this.grupoSeleccionado ? '' : 'disabled';

        return `
            <div class="routine-selector-grid">
                <label>
                    <span class="routine-label">Grupo Muscular</span>
                    <select id="rutina-grupo-select" class="routine-select" onchange="rutinasModule.seleccionarGrupoMuscular(this.value)">
                        <option value="">-- Seleccionar Grupo Muscular --</option>
                        ${opcionesGrupo}
                    </select>
                </label>
                <label>
                    <span class="routine-label">Ejercicio</span>
                    <select id="rutina-ejercicio-select" class="routine-select" onchange="rutinasModule.iniciarFormulario(this.value)" ${ejercicioDisabled}>
                        <option value="">${this.grupoSeleccionado ? '-- Seleccionar Ejercicio --' : 'Selecciona un grupo primero'}</option>
                        ${opcionesEjercicio}
                    </select>
                </label>
            </div>
        `;
    },

    renderFormulario() {
        if (!this.formActivo) return '';

        const form = this.formActivo;
        const filas = Array.from({ length: form.series }, (_, index) => {
            const carga = form.cargas[index] || { peso: 0, unidad: 'kg' };
            return `
                <div class="routine-set-row">
                    <strong>S${index + 1}</strong>
                    <input id="rutina-peso-${index}" type="number" min="0" step="0.5" value="${this.escapeHtml(carga.peso)}" placeholder="Peso">
                    <select id="rutina-unidad-${index}">
                        <option value="kg" ${carga.unidad !== 'lb' ? 'selected' : ''}>kg</option>
                        <option value="lb" ${carga.unidad === 'lb' ? 'selected' : ''}>lb</option>
                    </select>
                </div>
            `;
        }).join('');

        return `
            <div class="routine-builder">
                <div>
                    <span class="routine-kicker">${form.modo === 'editar' ? 'Editar ejercicio' : 'Configurar ejercicio'}</span>
                    <h4>${this.escapeHtml(form.name)}</h4>
                    <p>${this.escapeHtml(form.grupo)} · ${Number(form.calPerRep).toFixed(2)} cal base por repeticion</p>
                </div>
                <div class="routine-builder-grid">
                    <label>
                        Numero de Series
                        <input id="rutina-series-input" type="number" min="1" step="1" value="${form.series}" oninput="rutinasModule.actualizarSeriesFormulario()">
                    </label>
                    <label>
                        Repeticiones
                        <input id="rutina-reps-input" type="number" min="1" step="1" value="${form.repeticiones}">
                    </label>
                </div>
                <div class="routine-sets">
                    ${filas}
                </div>
                <div class="routine-actions">
                    <button type="button" onclick="rutinasModule.guardarEjercicio()">Guardar Ejercicio</button>
                    <button class="routine-btn-ghost" type="button" onclick="rutinasModule.cancelarFormulario()">Cancelar</button>
                </div>
            </div>
        `;
    },

    renderTitulo(diaData) {
        const titulo = diaData.titulo || 'Titulo del Entrenamiento';
        if (this.tituloEditando || !diaData.titulo) {
            return `
                <div class="routine-title-card">
                    <label class="routine-label" for="rutina-titulo-input">Titulo del Entrenamiento</label>
                    <div class="routine-title-edit">
                        <input id="rutina-titulo-input" type="text" value="${this.escapeHtml(diaData.titulo)}" placeholder="Ej. Dia de Pierna">
                        <button type="button" onclick="rutinasModule.guardarTitulo()">Guardar</button>
                        ${diaData.titulo ? `<button class="routine-btn-ghost" type="button" onclick="rutinasModule.cancelarTitulo()">Cancelar</button>` : ''}
                    </div>
                </div>
            `;
        }

        return `
            <div class="routine-title-card">
                <span class="routine-label">Titulo del Entrenamiento</span>
                <div class="routine-title-view">
                    <h3>${this.escapeHtml(titulo)}</h3>
                    <button class="routine-btn-ghost" type="button" onclick="rutinasModule.editarTitulo()">Editar</button>
                </div>
            </div>
        `;
    },

    renderChecklist(ejercicio, indexEjercicio) {
        return ejercicio.cargas.map((carga, indexSerie) => {
            const checked = carga.done ? 'checked' : '';
            const completada = carga.done ? 'is-done' : '';
            return `
                <label class="routine-check ${completada}">
                    <input type="checkbox" ${checked} onchange="rutinasModule.toggleSerie(${indexEjercicio}, ${indexSerie})">
                    <span>S${indexSerie + 1}: ${this.escapeHtml(carga.peso)}${this.escapeHtml(carga.unidad)}</span>
                </label>
            `;
        }).join('');
    },

    renderEjercicios(diaData) {
        if (!diaData.ejercicios.length) {
            return `<div class="routine-empty">Aun no hay ejercicios para este dia. Selecciona uno para empezar a planificar.</div>`;
        }

        return diaData.ejercicios.map((ejercicio, index) => {
            const calorias = this.calcularCaloriasEjercicio(ejercicio);
            const completadas = ejercicio.cargas.filter(carga => carga.done).length;
            return `
                <article class="routine-exercise-card">
                    <div class="routine-exercise-head">
                        <div>
                            <span class="routine-kicker">${this.escapeHtml(ejercicio.grupo)}</span>
                            <h4>${this.escapeHtml(ejercicio.name)}</h4>
                            <p>${ejercicio.series}x${ejercicio.repeticiones} · ${completadas}/${ejercicio.series} series completadas · ${calorias.toFixed(1)} cal</p>
                        </div>
                        <div class="routine-card-actions">
                            <button class="routine-btn-ghost" type="button" onclick="rutinasModule.editarEjercicio(${index})">Editar</button>
                            <button class="routine-btn-danger" type="button" onclick="rutinasModule.eliminarEjercicio(${index})">Eliminar</button>
                        </div>
                    </div>
                    <div class="routine-checklist">
                        ${this.renderChecklist(ejercicio, index)}
                    </div>
                </article>
            `;
        }).join('');
    },

    render() {
        const container = document.getElementById('rutina-semanal-container');
        if (!container) return;

        this.verificarEstructura();
        const diaData = this.getDiaData();
        const caloriasDia = this.calcularCaloriasDia();

        container.innerHTML = `
            <div class="routine-module">
                <div class="routine-shell">
                    <div class="routine-header">
                        <div>
                            <span class="routine-kicker">Plan progresivo</span>
                            <h3>Trimestre ${this.t} · Mes ${this.m} · Semana ${this.s} · ${this.escapeHtml(this.dia)}</h3>
                        </div>
                        <div class="routine-calories">
                            <span>Gasto estimado del dia</span>
                            <strong>${caloriasDia.toFixed(1)} cal</strong>
                        </div>
                    </div>

                    <div class="routine-nav">
                        <div class="routine-nav-row">${this.renderBotones(4, this.t, 't', 'T')}</div>
                        <div class="routine-nav-row">${this.renderBotones(3, this.m, 'm', 'Mes ')}</div>
                        <div class="routine-nav-row">${this.renderBotones(4, this.s, 's', 'Semana ')}</div>
                        <div class="routine-nav-row routine-days">${this.renderDias()}</div>
                    </div>

                    ${this.renderTitulo(diaData)}

                    <div class="routine-planner">
                        ${this.renderSelectorEjercicios()}
                        ${this.renderFormulario()}
                    </div>

                    <div class="routine-list">
                        ${this.renderEjercicios(diaData)}
                    </div>
                </div>
            </div>
        `;
    }
};

window.rutinasModule = rutinasModule;
