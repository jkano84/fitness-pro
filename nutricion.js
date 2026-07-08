// nutricion.js - Panel nutricional jerarquico por trimestres
const nutricionModule = {
    storagePrefix: 'fittracker_nutricion_v1',
    dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    tiempos: ['desayunos', 'comidas', 'meriendas', 'cenas'],
    nombresTiempo: {
        desayunos: 'Desayuno',
        comidas: 'Comida',
        meriendas: 'Merienda',
        cenas: 'Cena'
    },
    t: '1',
    m: '1',
    s: '1',
    dia: 'Lunes',
    planes: {},

    init() {
        this.planes = this.cargarPlanes();
        this.verificarEstructura();
        this.render();
    },

    get storageKey() {
        const userId = window.auth?.currentUser?.id || 'invitado';
        return `${this.storagePrefix}_${userId}`;
    },

    cargarPlanes() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || {};
        } catch (error) {
            console.warn('No se pudo leer nutricion:', error);
            return {};
        }
    },

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.planes));
    },

    verificarEstructura() {
        for (let t = 1; t <= 4; t++) {
            if (!this.planes[t]) this.planes[t] = {};
            for (let m = 1; m <= 3; m++) {
                if (!this.planes[t][m]) this.planes[t][m] = {};
                for (let s = 1; s <= 4; s++) {
                    if (!this.planes[t][m][s]) {
                        this.planes[t][m][s] = { shopping: { visible: false, checked: {} } };
                    }
                    if (!this.planes[t][m][s].shopping) {
                        this.planes[t][m][s].shopping = { visible: false, checked: {} };
                    }
                    this.dias.forEach(dia => {
                        if (!this.planes[t][m][s][dia]) this.planes[t][m][s][dia] = this.crearDia();
                        const diaData = this.planes[t][m][s][dia];
                        if (!diaData.comidas) diaData.comidas = {};
                        if (!diaData.extras) diaData.extras = [];
                        this.tiempos.forEach(tiempo => {
                            if (!diaData.comidas[tiempo]) {
                                diaData.comidas[tiempo] = {
                                    platillo: '',
                                    porcion: 1,
                                    consumido: false
                                };
                            }
                        });
                    });
                }
            }
        }
        this.save();
    },

    crearDia() {
        return {
            cheatDay: false,
            extras: [],
            comidas: this.tiempos.reduce((acc, tiempo) => {
                acc[tiempo] = { platillo: '', porcion: 1, consumido: false };
                return acc;
            }, {})
        };
    },

    getSemanaData() {
        return this.planes[this.t][this.m][this.s];
    },

    getDiaData() {
        return this.getSemanaData()[this.dia];
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
        this.render();
    },

    getPlatillos(tiempo) {
        return window.foodDatabaseMaster?.[tiempo] || [];
    },

    buscarPlatillo(tiempo, nombre) {
        return this.getPlatillos(tiempo).find(platillo => platillo.name === nombre);
    },

    cambiarPlatillo(tiempo, nombre) {
        const comida = this.getDiaData().comidas[tiempo];
        comida.platillo = nombre;
        comida.consumido = false;
        if (!comida.porcion) comida.porcion = 1;
        this.save();
        this.render();
    },

    cambiarPorcion(tiempo, valor) {
        this.getDiaData().comidas[tiempo].porcion = Math.max(0.5, Number(valor) || 1);
        this.save();
        this.render();
    },

    toggleConsumido(tiempo) {
        const comida = this.getDiaData().comidas[tiempo];
        comida.consumido = !comida.consumido;
        this.save();
        this.render();
    },

    toggleCheatDay() {
        this.getDiaData().cheatDay = !this.getDiaData().cheatDay;
        this.save();
        this.render();
    },

    agregarExtra() {
        const nombreInput = document.getElementById('nutrition-extra-name');
        const kcalInput = document.getElementById('nutrition-extra-kcal');
        const nombre = nombreInput?.value.trim();
        const calories = Math.max(0, Number(kcalInput?.value) || 0);
        if (!nombre || calories <= 0) return;

        this.getDiaData().extras.push({
            id: this.crearId(),
            nombre,
            calories
        });
        this.save();
        this.render();
    },

    eliminarExtra(id) {
        this.getDiaData().extras = this.getDiaData().extras.filter(extra => extra.id !== id);
        this.save();
        this.render();
    },

    crearId() {
        return `nut-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    },

    calcularMetaCalorica() {
        const perfil = window.auth?.currentUser?.personalData || {};
        const weight = Number(perfil.weight) || 75;
        const height = Number(perfil.height) || 172;
        const age = Number(perfil.age) || 30;
        const sex = perfil.sex || 'hombre';
        const activity = Number(perfil.activity) || 1.375;

        const tmb = sex === 'mujer'
            ? 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
            : 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);

        const meta = Math.round(tmb * activity);
        return {
            meta,
            min: Math.max(0, meta - 100),
            max: meta + 100,
            perfilMock: !perfil.weight
        };
    },

    caloriasComida(tiempo, comida) {
        const platillo = this.buscarPlatillo(tiempo, comida.platillo);
        if (!platillo) return 0;
        return Math.round(Number(platillo.calories || 0) * (Number(comida.porcion) || 1));
    },

    calcularTotalesDia(diaData = this.getDiaData()) {
        let planificadas = 0;
        let consumidas = 0;

        this.tiempos.forEach(tiempo => {
            const comida = diaData.comidas[tiempo];
            const kcal = this.caloriasComida(tiempo, comida);
            planificadas += kcal;
            if (comida.consumido) consumidas += kcal;
        });

        const extras = diaData.extras.reduce((sum, extra) => sum + Number(extra.calories || 0), 0);
        return {
            planificadas: Math.round(planificadas + extras),
            consumidas: Math.round(consumidas + extras),
            extras: Math.round(extras)
        };
    },

    estadoSemaforo(total, metaInfo, cheatDay) {
        if (cheatDay) return { clase: 'is-free', texto: 'Dia libre: semaforo apagado' };
        if (total < metaInfo.min) return { clase: 'is-low', texto: 'Bajo la meta' };
        if (total <= metaInfo.max) return { clase: 'is-ok', texto: 'En rango' };
        return { clase: 'is-high', texto: 'Sobre la meta' };
    },

    generarListaSuper() {
        const shopping = this.getSemanaData().shopping;
        shopping.visible = !shopping.visible;
        this.save();
        this.render();
    },

    cerrarListaSuper() {
        this.getSemanaData().shopping.visible = false;
        this.save();
        this.render();
    },

    toggleShoppingItem(token) {
        const key = decodeURIComponent(token);
        const shopping = this.getSemanaData().shopping;
        shopping.checked[key] = !shopping.checked[key];
        this.save();
        this.render();
    },

    generarItemsSuper() {
        const semana = this.getSemanaData();
        const items = {};

        this.dias.forEach(dia => {
            const diaData = semana[dia];
            this.tiempos.forEach(tiempo => {
                const comida = diaData.comidas[tiempo];
                const platillo = this.buscarPlatillo(tiempo, comida.platillo);
                if (!platillo) return;

                (platillo.ingredients || []).forEach(ingrediente => {
                    const normal = this.normalizarIngrediente(ingrediente);
                    const cantidad = normal.cantidad * (Number(comida.porcion) || 1);
                    const key = `${normal.categoria}|${normal.nombre}|${normal.unidad}`;

                    if (!items[key]) {
                        items[key] = {
                            key,
                            nombre: normal.nombre,
                            unidad: normal.unidad,
                            categoria: normal.categoria,
                            cantidad: 0,
                            notas: []
                        };
                    }

                    items[key].cantidad += cantidad;
                    if (normal.nota) items[key].notas.push(normal.nota);
                });
            });
        });

        return Object.values(items).sort((a, b) => {
            if (a.categoria === b.categoria) return a.nombre.localeCompare(b.nombre);
            return a.categoria.localeCompare(b.categoria);
        });
    },

    normalizarIngrediente(ingrediente) {
        const nombre = ingrediente.nombre || ingrediente.name || 'Ingrediente';
        const cantidadDirecta = Number(ingrediente.cantidad);
        const unidadDirecta = ingrediente.unidad;
        const quantity = String(ingrediente.quantity || '');
        const matchPieza = quantity.match(/(\d+(?:\.\d+)?|\d+\/\d+)\s*(pza|pzas|pieza|piezas|unidad|unidades|rebanada|rebanadas|lata|latas|hoja|hojas)\b/i);
        const matchParentesis = quantity.match(/\((\d+(?:\.\d+)?)\s*(g|ml)\)/i);
        const matchSimple = quantity.match(/(\d+(?:\.\d+)?)\s*(g|ml)\b/i);
        const match = matchPieza || matchParentesis || matchSimple;

        const cantidad = Number.isFinite(cantidadDirecta)
            ? cantidadDirecta
            : (match ? this.parseCantidad(match[1]) : 0);
        const unidadRaw = unidadDirecta || (match ? match[2] : 'pza');
        const unidad = this.normalizarUnidad(unidadRaw);

        return {
            nombre,
            cantidad,
            unidad,
            categoria: ingrediente.categoria || this.inferirCategoria(nombre),
            nota: cantidad ? '' : quantity
        };
    },

    parseCantidad(valor) {
        const texto = String(valor || '').trim();
        if (texto.includes('/')) {
            const [numerador, denominador] = texto.split('/').map(Number);
            return denominador ? numerador / denominador : 0;
        }
        return Number(texto) || 0;
    },

    normalizarUnidad(unidad) {
        const value = String(unidad || 'pza').toLowerCase();
        if (value.includes('ml')) return 'ml';
        if (value.includes('g')) return 'g';
        return 'pza';
    },

    formatCantidad(cantidad, unidad) {
        if (!cantidad) return 'Al gusto';
        const valor = unidad === 'pza' && Number.isInteger(cantidad)
            ? String(cantidad)
            : Number(cantidad.toFixed(2)).toString();
        return `${valor} ${unidad}`;
    },

    inferirCategoria(nombre) {
        const n = nombre.toLowerCase();
        if (/pollo|pavo|res|atun|atún|pescado|salmon|salmón|huevo|jamon|jamón|bistec/.test(n)) return 'Carnes';
        if (/yogur|queso|leche|requeson|cottage|crema/.test(n)) return 'Lacteos';
        if (/lechuga|espinaca|jitomate|cebolla|brocoli|brócoli|calab|pepino|zanahoria|nopal|ejote|hinojo|pimiento/.test(n)) return 'Vegetales';
        if (/chia|chía|nuez|almendra|semilla|ajonjoli|ajonjolí|avena|quinoa/.test(n)) return 'Semillas';
        if (/arroz|pasta|tortilla|pan|tostada|camote|platano|plátano|fruta|fresa|mora/.test(n)) return 'Cereales y frutas';
        return 'Otros';
    },

    escapeHtml(valor) {
        return String(valor ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    renderBotones(cantidad, actual, nivel, prefijo) {
        return Array.from({ length: cantidad }, (_, index) => {
            const valor = String(index + 1);
            const activo = actual === valor ? 'is-active' : '';
            return `<button class="nutrition-nav-btn ${activo}" type="button" onclick="nutricionModule.cambiarNivel('${nivel}', '${valor}')">${prefijo}${valor}</button>`;
        }).join('');
    },

    renderDias() {
        return this.dias.map(dia => {
            const activo = this.dia === dia ? 'is-active' : '';
            return `<button class="nutrition-nav-btn ${activo}" type="button" onclick="nutricionModule.cambiarNivel('dia', '${dia}')">${dia}</button>`;
        }).join('');
    },

    renderIngredientesPlatillo(tiempo, comida) {
        const platillo = this.buscarPlatillo(tiempo, comida.platillo);
        if (!platillo) return '';

        const porcion = Number(comida.porcion) || 1;
        const ingredientes = (platillo.ingredients || []).map(ingrediente => {
            const normal = this.normalizarIngrediente(ingrediente);
            const cantidadFinal = normal.cantidad * porcion;
            return `
                <li class="nutrition-ingredient-item">
                    <span>${this.escapeHtml(normal.nombre)}</span>
                    <strong>${this.formatCantidad(cantidadFinal, normal.unidad)}</strong>
                </li>
            `;
        }).join('');

        if (!ingredientes) return '';

        return `
            <div class="nutrition-ingredients">
                <span class="nutrition-kicker">Ingredientes necesarios</span>
                <ul>${ingredientes}</ul>
            </div>
        `;
    },

    renderComida(tiempo, comida) {
        const platillos = this.getPlatillos(tiempo);
        const kcal = this.caloriasComida(tiempo, comida);
        const opciones = platillos.map(platillo => {
            const selected = platillo.name === comida.platillo ? 'selected' : '';
            return `<option value="${this.escapeHtml(platillo.name)}" ${selected}>${this.escapeHtml(platillo.name)}</option>`;
        }).join('');
        const porciones = [1, 1.5, 2, 2.5, 3, 3.5, 4].map(value => {
            const selected = Number(comida.porcion) === value ? 'selected' : '';
            return `<option value="${value}" ${selected}>x${value}</option>`;
        }).join('');

        return `
            <article class="nutrition-meal-card">
                <div class="nutrition-meal-head">
                    <div>
                        <span class="nutrition-kicker">${this.nombresTiempo[tiempo]}</span>
                        <strong>${kcal} kcal</strong>
                    </div>
                    <label class="nutrition-check">
                        <input type="checkbox" ${comida.consumido ? 'checked' : ''} ${comida.platillo ? '' : 'disabled'} onchange="nutricionModule.toggleConsumido('${tiempo}')">
                        Consumido
                    </label>
                </div>
                <div class="nutrition-meal-grid">
                    <select onchange="nutricionModule.cambiarPlatillo('${tiempo}', this.value)">
                        <option value="">-- Seleccionar platillo --</option>
                        ${opciones}
                    </select>
                    <select onchange="nutricionModule.cambiarPorcion('${tiempo}', this.value)" ${comida.platillo ? '' : 'disabled'}>
                        ${porciones}
                    </select>
                </div>
                ${this.renderIngredientesPlatillo(tiempo, comida)}
            </article>
        `;
    },

    renderExtras(diaData) {
        const lista = diaData.extras.map(extra => `
            <li class="nutrition-extra-item">
                <span>${this.escapeHtml(extra.nombre)}</span>
                <strong>${Number(extra.calories)} kcal</strong>
                <button class="nutrition-btn-ghost" type="button" onclick="nutricionModule.eliminarExtra('${extra.id}')">Eliminar</button>
            </li>
        `).join('');

        return `
            <div class="nutrition-extra-card">
                <span class="nutrition-kicker">Ingesta extra</span>
                <div class="nutrition-extra-form">
                    <input id="nutrition-extra-name" type="text" placeholder="Ej. Refresco, papas, postre">
                    <input id="nutrition-extra-kcal" type="number" min="0" step="1" placeholder="kcal">
                    <button type="button" onclick="nutricionModule.agregarExtra()">Agregar</button>
                </div>
                <ul class="nutrition-extra-list">${lista}</ul>
            </div>
        `;
    },

    renderListaSuper() {
        const semana = this.getSemanaData();
        if (!semana.shopping.visible) return '';

        const items = this.generarItemsSuper();
        if (!items.length) {
            return `<div class="nutrition-shopping"><h4>Lista del Super</h4><p>No hay platillos configurados en esta semana.</p></div>`;
        }

        const porCategoria = items.reduce((acc, item) => {
            if (!acc[item.categoria]) acc[item.categoria] = [];
            acc[item.categoria].push(item);
            return acc;
        }, {});

        const htmlCategorias = Object.keys(porCategoria).sort().map(categoria => {
            const itemsHtml = porCategoria[categoria].map(item => {
                const checked = semana.shopping.checked[item.key] ? 'checked' : '';
                const cantidad = this.formatCantidad(item.cantidad, item.unidad);
                const token = encodeURIComponent(item.key);
                return `
                    <label class="nutrition-shopping-item">
                        <input type="checkbox" ${checked} onchange="nutricionModule.toggleShoppingItem('${token}')">
                        <span>${this.escapeHtml(item.nombre)}</span>
                        <strong>${cantidad}</strong>
                    </label>
                `;
            }).join('');

            return `
                <section class="nutrition-shopping-group">
                    <h5>${this.escapeHtml(categoria)}</h5>
                    ${itemsHtml}
                </section>
            `;
        }).join('');

        return `
            <div class="nutrition-shopping">
                <div class="nutrition-shopping-head">
                    <h4>Lista del Super Consolidada</h4>
                    <button class="nutrition-btn-ghost" type="button" onclick="nutricionModule.cerrarListaSuper()">Cerrar Lista</button>
                </div>
                ${htmlCategorias}
            </div>
        `;
    },

    render() {
        const container = document.getElementById('calendario-semanal-container');
        if (!container) return;

        this.verificarEstructura();
        const diaData = this.getDiaData();
        const metaInfo = this.calcularMetaCalorica();
        const totales = this.calcularTotalesDia(diaData);
        const estado = this.estadoSemaforo(totales.planificadas, metaInfo, diaData.cheatDay);

        container.innerHTML = `
            <div class="nutrition-module">
                <div class="nutrition-header">
                    <div>
                        <span class="nutrition-kicker">Panel alimentario trimestral</span>
                        <h3>Trimestre ${this.t} · Mes ${this.m} · Semana ${this.s} · ${this.escapeHtml(this.dia)}</h3>
                        ${metaInfo.perfilMock ? `<p>Usando perfil mock. Actualiza tu perfil para personalizar Harris-Benedict.</p>` : ''}
                    </div>
                    <div class="nutrition-target ${estado.clase}">
                        <span>${estado.texto}</span>
                        <strong>${totales.planificadas} kcal</strong>
                        <small>Meta ${metaInfo.min} - ${metaInfo.max} kcal</small>
                    </div>
                    <div class="nutrition-target is-real">
                        <span>Calorias reales consumidas hoy</span>
                        <strong>${totales.consumidas} kcal</strong>
                        <small>Incluye extras registrados</small>
                    </div>
                </div>

                <div class="nutrition-nav">
                    <div class="nutrition-nav-row">${this.renderBotones(4, this.t, 't', 'T')}</div>
                    <div class="nutrition-nav-row">${this.renderBotones(3, this.m, 'm', 'Mes ')}</div>
                    <div class="nutrition-nav-row">${this.renderBotones(4, this.s, 's', 'Semana ')}</div>
                    <div class="nutrition-nav-row nutrition-days">${this.renderDias()}</div>
                </div>

                <div class="nutrition-week-actions">
                    <button type="button" onclick="nutricionModule.generarListaSuper()">${this.getSemanaData().shopping.visible ? 'Ocultar Lista del Super' : 'Generar Lista del Super'}</button>
                </div>

                <label class="nutrition-free-day">
                    <input type="checkbox" ${diaData.cheatDay ? 'checked' : ''} onchange="nutricionModule.toggleCheatDay()">
                    Dia libre: apagar semaforo de advertencias
                </label>

                <div class="nutrition-meals-grid">
                    ${this.tiempos.map(tiempo => this.renderComida(tiempo, diaData.comidas[tiempo])).join('')}
                </div>

                ${this.renderExtras(diaData)}
                ${this.renderListaSuper()}
            </div>
        `;
    }
};

window.nutricionModule = nutricionModule;
