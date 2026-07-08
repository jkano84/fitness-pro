// planificador.js - Versión Élite Avanzada: Matriz de 12 Meses, Semáforos Inteligentes, Clonación Ocultable y Botones Translúcidos

const planificadorModule = {
    mesActual: "1",
    semanaActual: "1",
    diaSeleccionado: "Lunes", 
    
    planes: JSON.parse(localStorage.getItem('fittracker_planes_v4')) || {},
    compradosTemp: new Set(),

    initSemana() {
        this.verificarYMigrarEstructura();
        this.setupEventListeners();
        this.renderCalendario();
    },

    verificarYMigrarEstructura() {
        let huboCambios = false;
        for (let m = 1; m <= 12; m++) {
            const mStr = m.toString();
            if (!this.planes[mStr]) {
                this.planes[mStr] = {};
                huboCambios = true;
            }
            for (let s = 1; s <= 4; s++) {
                const sStr = s.toString();
                if (!this.planes[mStr][sStr]) {
                    this.planes[mStr][sStr] = { metaManual: 2200 };
                    huboCambios = true;
                }
            }
        }
        if (huboCambios) {
            localStorage.setItem('fittracker_planes_v4', JSON.stringify(this.planes));
        }
    },

    setupEventListeners() {
        const container = document.getElementById('calendario-semanal-container');
        if (!container) return;

        container.removeEventListener('click', this.handleDelegatedClicks);
        this.handleDelegatedClicks = (e) => {
            const target = e.target;

            if (target.classList.contains('mes-tab-btn')) {
                this.mesActual = target.dataset.mes;
                this.compradosTemp.clear();
                this.renderCalendario();
            }
            else if (target.classList.contains('semana-tab-btn')) {
                this.semanaActual = target.dataset.semana;
                this.compradosTemp.clear();
                this.renderCalendario();
            }
            else if (target.classList.contains('dia-selector-btn')) {
                this.diaSeleccionado = target.dataset.dia;
                this.renderCalendario();
            }
        };
        container.addEventListener('click', this.handleDelegatedClicks.bind(this));
    },

    obtenerEstadoColorDia(diaData) {
        if (!diaData || !diaData.comidas) return "rgba(239, 68, 68, 0.15)"; 
        if (diaData.isDiaLibre) return "rgba(59, 130, 246, 0.25)"; 

        const tiempos = ['desayunos', 'comidas', 'meriendas', 'cenas'];
        let programados = 0;
        let consumidos = 0;

        tiempos.forEach(t => {
            if (diaData.comidas[t]) {
                programados++;
                if (diaData.comido && diaData.comido[t]) {
                    consumidos++;
                }
            }
        });

        if (programados === 0) return "rgba(239, 68, 68, 0.15)"; 
        if (consumidos === programados) return "rgba(16, 185, 129, 0.25)"; 
        if (consumidos > 0) return "rgba(245, 158, 11, 0.25)"; 
        return "rgba(239, 68, 68, 0.15)"; 
    },

    obtenerEstadoColorSemana(semanaData) {
        if (!semanaData) return "rgba(239, 68, 68, 0.15)";
        const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        let verdes = 0;
        let amarillos = 0;

        dias.forEach(d => {
            if (semanaData[d]) {
                const color = this.obtenerEstadoColorDia(semanaData[d]);
                if (color.includes('185')) verdes++; 
                if (color.includes('158')) amarillos++; 
                if (color.includes('246')) verdes++; 
            }
        });

        if (verdes === 7) return "rgba(16, 185, 129, 0.25)";
        if (verdes > 0 || amarillos > 0) return "rgba(245, 158, 11, 0.25)";
        return "rgba(239, 68, 68, 0.15)";
    },

    obtenerEstadoColorMes(mesData) {
        if (!mesData) return "rgba(239, 68, 68, 0.15)";
        let verdes = 0;
        let amarillos = 0;

        ["1", "2", "3", "4"].forEach(s => {
            if (mesData[s]) {
                const color = this.obtenerEstadoColorSemana(mesData[s]);
                if (color.includes('185')) verdes++;
                if (color.includes('158')) amarillos++;
            }
        });

        if (verdes === 4) return "rgba(16, 185, 129, 0.25)";
        if (verdes > 0 || amarillos > 0) return "rgba(245, 158, 11, 0.25)";
        return "rgba(239, 68, 68, 0.15)";
    },

    clonarSemanaAnterior() {
        const numSemana = parseInt(this.semanaActual);
        if (numSemana === 1) return; // Salvaguarda lógica por si acaso

        const semanaAntStr = (numSemana - 1).toString();
        const datosAnteriores = this.planes[this.mesActual][semanaAntStr];

        if (!datosAnteriores || Object.keys(datosAnteriores).length <= 1) {
            alert(`La Semana ${semanaAntStr} del Mes ${this.mesActual} se encuentra vacía.`);
            return;
        }

        if (confirm(`¿Clonar todo el menú de la Semana ${semanaAntStr} en la Semana ${this.semanaActual} actual?`)) {
            this.planes[this.mesActual][this.semanaActual] = JSON.parse(JSON.stringify(datosAnteriores));
            this.saveAndRefresh();
            alert("¡Estructura clonada con éxito!");
        }
    },

    renderCalendario() {
        const container = document.getElementById('calendario-semanal-container');
        if (!container) return;

        if (!this.planes[this.mesActual]) this.planes[this.mesActual] = {};
        if (!this.planes[this.mesActual][this.semanaActual]) {
            this.planes[this.mesActual][this.semanaActual] = { metaManual: 2200 };
        }
        
        const semanaData = this.planes[this.mesActual][this.semanaActual];
        const metaSemanal = semanaData.metaManual || 2200;

        // Fila de Meses (1 al 12)
        let htmlHtml = `<div style="margin-bottom: 15px;"><label style="font-weight:bold; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase; display:block; margin-bottom:8px;">📅 Seleccionar Mes de Planificación</label>`;
        htmlHtml += `<div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:space-between;">`;
        for (let m = 1; m <= 12; m++) {
            const mStr = m.toString();
            const colorSemaforoMes = this.obtenerEstadoColorMes(this.planes[mStr]);
            const estaSeleccionado = this.mesActual === mStr;
            const bgEstilo = estaSeleccionado ? "background-color: rgba(255,255,255,0.12); border-color: var(--neon-green);" : `background-color: ${colorSemaforoMes}; border-color: #333;`;
            
            htmlHtml += `<button class="mes-tab-btn" data-mes="${mStr}" style="${bgEstilo} color:white; padding:10px 14px; border:1px solid; border-radius:8px; cursor:pointer; font-weight:bold; flex:1; min-width:80px; transition: var(--transition);">Mes ${m}</button>`;
        }
        htmlHtml += `</div></div>`;

        // Fila de Semanas (1 al 4)
        htmlHtml += `<div style="margin-bottom: 25px;"><label style="font-weight:bold; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase; display:block; margin-bottom:8px;">📋 Semanas del Mes Activo</label>`;
        htmlHtml += `<div style="display:flex; gap:10px;">`;
        for (let s = 1; s <= 4; s++) {
            const sStr = s.toString();
            const colorSemaforoSemana = this.obtenerEstadoColorSemana(this.planes[this.mesActual][sStr]);
            const estaSeleccionado = this.semanaActual === sStr;
            const bgEstilo = estaSeleccionado ? "background-color: rgba(255,255,255,0.12); border-color: var(--neon-green);" : `background-color: ${colorSemaforoSemana}; border-color: #333;`;
            
            htmlHtml += `<button class="semana-tab-btn" data-semana="${sStr}" style="${bgEstilo} color:white; padding:12px; border:1px solid; border-radius:8px; cursor:pointer; font-weight:bold; flex:1; transition: var(--transition);">Semana ${s}</button>`;
        }
        htmlHtml += `</div></div>`;

        // MODIFICACIÓN DINÁMICA: Generación condicional del botón de Clonar e inyección de estilos translúcidos
        let botonClonarHtml = "";
        if (this.semanaActual !== "1") {
            // Se inyecta con un diseño azul translúcido estilizado (rgba) alineado a tus indicaciones
            botonClonarHtml = `
                <button onclick="planificadorModule.clonarSemanaAnterior()" style="background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.25); padding: 6px 14px; font-size: 0.85rem; border-radius: 6px; font-weight: bold; cursor: pointer; height: 32px; transition: var(--transition);">
                    📋 Clonar Semana Anterior
                </button>
            `;
        }

        htmlHtml += `
            <div style="background-color: var(--bg-input); padding: 15px; border-radius: 10px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <div>
                        <span style="font-weight: bold; color: var(--text-main);">Meta Diaria de la Semana:</span>
                        <strong style="color: var(--neon-green); font-size: 1.2rem; margin-left: 5px;">${metaSemanal} kcal</strong>
                    </div>
                    ${botonClonarHtml}
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <input type="number" id="input-meta-semanal" value="${metaSemanal}" style="width: 90px; margin-bottom: 0; padding: 6px; background-color:#111; color:white; border:1px solid #444; border-radius:4px;">
                    <button onclick="planificadorModule.actualizarMetaManualSemana()" style="background-color: rgba(255, 255, 255, 0.05); color: #ffffff; border: 1px solid #444; padding: 6px 14px; font-size: 0.85rem; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.4); cursor: pointer; font-weight: 600; transition: var(--transition);">Ajustar</button>
                </div>
            </div>
        `;

        // Fila de Días
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        htmlHtml += `<div style="margin-bottom: 25px;"><label style="font-weight:bold; color:var(--text-muted); font-size:0.85rem; text-transform:uppercase; display:block; margin-bottom:8px;">📅 Días de la Semana</label>`;
        htmlHtml += `<div style="display:flex; gap:8px; flex-wrap:wrap;">`;
        
        diasSemana.forEach(d => {
            if (!semanaData[d]) {
                semanaData[d] = {
                    comidas: { desayunos: "", comidas: "", meriendas: "", cenas: "" },
                    porciones: { desayunos: 1, comidas: 1, meriendas: 1, cenas: 1 },
                    comido: { desayunos: false, comidas: false, meriendas: false, cenas: false },
                    adicionales: [], isDiaLibre: false
                };
            }
            
            const colorSemaforoDia = this.obtenerEstadoColorDia(semanaData[d]);
            const estaSeleccionado = this.diaSeleccionado === d;
            const bgEstilo = estaSeleccionado ? "background-color: rgba(255,255,255,0.15); border-color: var(--neon-green); transform: scale(1.02);" : `background-color: ${colorSemaforoDia}; border-color: #333;`;
            
            htmlHtml += `<button class="dia-selector-btn" data-dia="${d}" style="${bgEstilo} color:white; padding:12px; border:1px solid; border-radius:8px; cursor:pointer; font-weight:bold; flex:1; min-width:90px; transition: var(--transition); text-align:center;">${d}</button>`;
        });
        htmlHtml += `</div></div>`;

        // Caja Estética Minimalista del Día Seleccionado
        const dData = semanaData[this.diaSeleccionado];
        let caloriasConsumidasDia = 0;

        const tiempos = ['desayunos', 'comidas', 'meriendas', 'cenas'];
        const nombresTiempos = { desayunos: '☀️ Desayuno', comidas: '🥩 Comida', meriendas: '☕ Merienda', cenas: '🌙 Cena' };

        if (!dData.isDiaLibre) {
            tiempos.forEach(t => {
                const platoNombre = dData.comidas[t];
                const mult = parseFloat(dData.porciones?.[t]) || 1;
                if (platoNombre && window.foodDatabaseMaster && dData.comido?.[t]) {
                    const plato = window.foodDatabaseMaster[t].find(p => p.name === platoNombre);
                    if (plato) caloriasConsumidasDia += (plato.calories * mult);
                }
            });
            if (dData.adicionales) {
                dData.adicionales.forEach(extra => { caloriasConsumidasDia += extra.calories; });
            }
        }
        caloriasConsumidasDia = Math.round(caloriasConsumidasDia);

        let bordeCajaColor = "border: 1px solid #333;";
        if (dData.isDiaLibre) bordeCajaColor = "border: 2px solid var(--accent-blue);";
        else if (caloriasConsumidasDia > metaSemanal) bordeCajaColor = "border: 2px solid var(--accent-red);";
        else if (caloriasConsumidasDia === metaSemanal && caloriasConsumidasDia > 0) bordeCajaColor = "border: 2px solid var(--neon-green);";

        htmlHtml += `
            <div class="caja-dia-minimalista" style="background-color: rgba(30, 30, 30, 0.7); padding: 25px; border-radius: 16px; ${bordeCajaColor} box-shadow: 0 8px 32px rgba(0,0,0,0.3); backdrop-filter: blur(4px); transition: var(--transition);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:15px;">
                    <h3 style="margin:0; font-size:1.4rem; color:white;">Configuración de Menú: <span style="color:var(--neon-green);">${this.diaSeleccionado}</span></h3>
                    
                    <label style="display:flex; align-items:center; gap:8px; font-weight:bold; color:var(--accent-blue); cursor:pointer; background: rgba(59,130,246,0.1); padding: 6px 12px; border-radius: 20px;">
                        <input type="checkbox" id="check-dia-libre" ${dData.isDiaLibre ? 'checked' : ''} onchange="planificadorModule.toggleDiaLibre('${this.diaSeleccionado}')" style="transform:scale(1.2); cursor:pointer;">
                        🍔 Día Libre de Comida
                    </label>
                </div>
                
                <div style="color:#ccc; font-weight:bold; margin-bottom:15px; font-size:1.1rem;">
                    Consumo Registrado: <span style="color:white; font-size:1.3rem;">${caloriasConsumidasDia}</span> / ${metaSemanal} kcal
                </div>
                
                <ul style="padding:0; margin:0;">
        `;

        if (dData.isDiaLibre) {
            htmlHtml += `
                <div style="text-align:center; padding:20px 10px; color:var(--accent-blue); font-weight:bold;">
                    <p style="font-size:1.2rem; margin-bottom:5px;">✨ Modo Descanso Activado ✨</p>
                    <p style="font-size:0.9rem; color:#aaa;">Las calorías y macros de este día no penalizan tus semáforos globales.</p>
                </div>
            `;
        } else {
            tiempos.forEach(t => {
                const platilloSeleccionado = dData.comidas[t] || "";
                const factorPorcion = parseFloat(dData.porciones[t]) || 1;
                const labelTiempo = nombresTiempos[t];
                const isComido = dData.comido?.[t] || false;

                let ingredienteDetalleHtml = "";
                let caloriasBasePlato = 0;

                if (platilloSeleccionado && window.foodDatabaseMaster) {
                    const plato = window.foodDatabaseMaster[t].find(p => p.name === platilloSeleccionado);
                    if (plato) {
                        caloriasBasePlato = plato.calories;
                        ingredienteDetalleHtml = `<div style="font-size:0.85rem; color:#aaa; margin-top:5px; background:rgba(0,0,0,0.2); padding:8px; border-radius:4px;">`;
                        plato.ingredients.forEach(i => {
                            ingredienteDetalleHtml += `• <strong>${i.name}:</strong> ${(parseFloat(i.quantity) * factorPorcion).toFixed(0) || i.quantity}<br>`;
                        });
                        ingredienteDetalleHtml += `</div>`;
                    }
                }

                const totalKcal = Math.round(caloriasBasePlato * factorPorcion);

                htmlHtml += `
                    <li style="background:rgba(255,255,255,0.02); border:1px solid #333; padding:15px; border-radius:12px; margin-bottom:12px; display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <button onclick="planificadorModule.togglePlatilloConsumido('${this.diaSeleccionado}', '${t}')" type="button" style="background-color: ${isComido ? 'var(--neon-green)' : '#444'}; color: #121212; padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; font-weight:bold; border:none; cursor:pointer;">
                                    ${isComido ? '✅ Consumido' : '✔️ Marcar'}
                                </button>
                                <span style="font-weight:bold; color:white; min-width:90px;">${labelTiempo}</span>
                            </div>
                            
                            <select onchange="planificadorModule.cambiarPlatilloDinamico('${this.diaSeleccionado}', '${t}', this.value)" style="max-width:240px; margin-bottom:0; padding:6px; background:#111;">
                                <option value="">-- Elige un Platillo --</option>
                                ${window.foodDatabaseMaster && window.foodDatabaseMaster[t] ? window.foodDatabaseMaster[t].map(p => `
                                    <option value="${p.name}" ${p.name === platilloSeleccionado ? 'selected' : ''}>${p.name}</option>
                                `).join('') : ''}
                            </select>

                            <select onchange="planificadorModule.cambiarPorcionDinamica('${this.diaSeleccionado}', '${t}', this.value)" style="width:100px; margin-bottom:0; padding:6px; background:#222; color:#00ff00; border:1px solid #444;" ${!platilloSeleccionado ? 'disabled' : ''}>
                                <option value="1" ${factorPorcion === 1 ? 'selected' : ''}>x1.0 Porción</option>
                                <option value="1.5" ${factorPorcion === 1.5 ? 'selected' : ''}>x1.5 Extra</option>
                                <option value="2" ${factorPorcion === 2 ? 'selected' : ''}>x2.0 Doble</option>
                                <option value="3" ${factorPorcion === 3 ? 'selected' : ''}>x3.0 Triple</option>
                            </select>

                            <span style="font-weight:bold; color:white; font-size:1.1rem; min-width:80px; text-align:right;">${totalKcal > 0 ? `${totalKcal} kcal` : '-'}</span>
                        </div>
                        ${ingredienteDetalleHtml}
                    </li>
                `;
            });

            htmlHtml += `
                <div style="background-color: rgba(255,152,0,0.04); padding: 15px; border-radius: 10px; margin-top: 15px; border: 1px dashed var(--accent-orange);">
                    <h5 style="color:var(--accent-orange); margin:0 0 10px 0; font-size:0.95rem;">🍔 Consumo Adicional Manual (Extras)</h5>
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <input type="text" id="extra-name-input" placeholder="Ej. Aderezo, Snack" style="flex:2; margin-bottom:0; padding:8px;">
                        <input type="number" id="extra-cal-input" placeholder="Calorías" style="flex:1; margin-bottom:0; padding:8px;">
                        <button onclick="planificadorModule.agregarGastoExtraDinamico()" type="button" style="background-color:var(--accent-orange); color:black; padding:8px 16px; font-weight:bold; border:none; border-radius:4px; cursor:pointer;">+ Agregar</button>
                    </div>
                    <div style="margin-top:10px; font-size:0.85rem;">
                        ${dData.adicionales && dData.adicionales.length > 0 ? dData.adicionales.map((ex, idx) => `
                            <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #333;">
                                <span style="color:#ccc;">🔸 ${ex.name}</span>
                                <span style="color:white; font-weight:bold;">${ex.calories} kcal <span onclick="planificadorModule.removerExtraDinamico(${idx})" style="color:var(--accent-red); cursor:pointer; margin-left:8px;">❌</span></span>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
            `;
        }

        htmlHtml += `
                <div style="margin-top:20px; padding-top:15px; border-top:1px solid #444; display:flex; justify-content:space-between; align-items:center; font-weight:bold;">
                    <span style="color:var(--text-muted); font-size:0.95rem;">Hoy: ${caloriasConsumidasDia} / ${metaSemanal} kcal</span>
                </div>
            </div>
            
            <div style="margin-top:30px; text-align:center;">
                <button id="btn-generar-super" type="button" style="background-color: var(--neon-green); color: black; padding: 15px; font-weight: bold; width:100%; border:none; border-radius:8px; font-size:1.1rem; cursor:pointer; transition: var(--transition);">🛒 Generar Lista de Compras de la Semana</button>
                <div id="lista-super-container" style="display:none; margin-top:20px; background-color:var(--bg-card); text-align:left; padding:20px; border-radius:12px; border:1px solid #333;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                        <h3 style="margin:0; font-size:1.1rem; color:var(--neon-green);">📋 Lista de Mandado Organizada</h3>
                        <button id="btn-imprimir-super" type="button" style="background-color:var(--accent-blue); color:white; padding:8px 16px; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">🖨️ Imprimir / Enviar</button>
                    </div>
                    <div id="lista-super-acordeon"></div>
                </div>
            </div>
        `;

        container.innerHTML = htmlHtml;

        const btnS = document.getElementById('btn-generar-super');
        if (btnS) btnS.onclick = () => this.generarListaSuper();
    },

    actualizarMetaManualSemana() {
        const val = parseInt(document.getElementById('input-meta-semanal').value) || 2200;
        this.planes[this.mesActual][this.semanaActual].metaManual = val;
        this.saveAndRefresh();
    },

    toggleDiaLibre(dia) {
        this.planes[this.mesActual][this.semanaActual][dia].isDiaLibre = !this.planes[this.mesActual][this.semanaActual][dia].isDiaLibre;
        this.saveAndRefresh();
    },

    cambiarPlatilloDinamico(dia, tiempo, valor) {
        this.planes[this.mesActual][this.semanaActual][dia].comidas[tiempo] = valor;
        this.planes[this.mesActual][this.semanaActual][dia].porciones[tiempo] = 1;
        this.planes[this.mesActual][this.semanaActual][dia].comido[tiempo] = false;
        this.saveAndRefresh();
    },

    cambiarPorcionDinamica(dia, tiempo, valor) {
        this.planes[this.mesActual][this.semanaActual][dia].porciones[tiempo] = parseFloat(valor) || 1;
        this.saveAndRefresh();
    },

    togglePlatilloConsumido(dia, tiempo) {
        this.planes[this.mesActual][this.semanaActual][dia].comido[tiempo] = !this.planes[this.mesActual][this.semanaActual][dia].comido[tiempo];
        this.saveAndRefresh();
    },

    agregarGastoExtraDinamico() {
        const name = document.getElementById('extra-name-input').value.trim();
        const cal = parseInt(document.getElementById('extra-cal-input').value);
        if (!name || isNaN(cal) || cal <= 0) return;

        this.planes[this.mesActual][this.semanaActual][this.diaSeleccionado].adicionales.push({ name, calories: cal });
        this.saveAndRefresh();
    },

    removerExtraDinamico(idx) {
        this.planes[this.mesActual][this.semanaActual][this.diaSeleccionado].adicionales.splice(idx, 1);
        this.saveAndRefresh();
    },

    obtenerCategoria(alimento) {
        const nombre = alimento.toLowerCase();
        if (nombre.includes('pollo') || nombre.includes('res') || nombre.includes('pescado') || nombre.includes('atún') || nombre.includes('salmón') || nombre.includes('pavo') || nombre.includes('cerdo') || nombre.includes('carne')) return "🥩 Carnes, Aves y Pescados";
        if (nombre.includes('huevo') || nombre.includes('queso') || nombre.includes('panela') || nombre.includes('yogur') || nombre.includes('leche')) return "🥚 Lácteos, Huevos y Cremas";
        if (nombre.includes('manzana') || nombre.includes('plátano') || nombre.includes('fresa') || nombre.includes('espinaca') || nombre.includes('champiñón') || nombre.includes('brócoli') || nombre.includes('zanahoria') || nombre.includes('pepino') || nombre.includes('piña')) return "🥦 Frutas, Verduras y Hojas Verdes";
        return "🥫 Abarrotes, Semillas y Complementos";
    },

    generarListaSuper() {
        const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const tiempos = ['desayunos', 'comidas', 'meriendas', 'cenas'];
        const semData = this.planes[this.mesActual][this.semanaActual];
        
        let acumuladorPiezas = {}, acumuladorLatas = {}, acumuladorGramos = {}, acumuladorMl = {}, acumuladorNotas = {};

        dias.forEach(dia => {
            const dData = semData[dia];
            if (!dData || dData.isDiaLibre) return; 

            tiempos.forEach(tiempo => {
                const nombrePlatillo = dData.comidas[tiempo];
                const factorMultiplicador = parseFloat(dData.porciones[tiempo]) || 1;
                
                if (nombrePlatillo && window.foodDatabaseMaster) {
                    const tClave = tiempo === 'meriendas' ? 'desayunos' : tiempo; 
                    const listaPlatos = window.foodDatabaseMaster[tiempo] || window.foodDatabaseMaster[tClave];
                    
                    if (listaPlatos) {
                        const platilloReal = listaPlatos.find(p => p.name === nombrePlatillo);
                        if (platilloReal && platilloReal.ingredients) {
                            platilloReal.ingredients.forEach(ing => {
                                const nombreLimpio = ing.name.trim();
                                const matchPiezas = ing.quantity.match(/(\d+)\s*pieza/);
                                const matchLatas = ing.quantity.match(/(\d+)\s*lata/);
                                const matchGramos = ing.quantity.match(/(\d+)\s*g/);
                                const matchMl = ing.quantity.match(/(\d+)\s*ml/);

                                if (matchPiezas) acumuladorPiezas[nombreLimpio] = (acumuladorPiezas[nombreLimpio] || 0) + (parseInt(matchPiezas[1]) * factorMultiplicador);
                                else if (matchLatas) acumuladorLatas[nombreLimpio] = (acumuladorLatas[nombreLimpio] || 0) + (parseInt(matchLatas[1]) * factorMultiplicador);
                                else if (matchGramos) acumuladorGramos[nombreLimpio] = (acumuladorGramos[nombreLimpio] || 0) + (parseInt(matchGramos[1]) * factorMultiplicador);
                                else if (matchMl) acumuladorMl[nombreLoptimo] = (acumuladorMl[nombreLimpio] || 0) + (parseInt(matchMl[1]) * factorMultiplicador);
                                else {
                                    if (!acumuladorNotas[nombreLimpio]) acumuladorNotas[nombreLimpio] = new Set();
                                    acumuladorNotas[nombreLimpio].add(`${ing.quantity}`);
                                }
                            });
                        }
                    }
                }
            });
        });

        const todasLasLlaves = new Set([...Object.keys(acumuladorPiezas), ...Object.keys(acumuladorLatas), ...Object.keys(acumuladorGramos), ...Object.keys(acumuladorMl), ...Object.keys(acumuladorNotas)]);
        if (todasLasLlaves.size === 0) { alert("Agrega platillos válidos en los días de la semana primero."); return; }

        let categoriasMapeadas = { "🥩 Carnes, Aves y Pescados": [], "🥚 Lácteos, Huevos y Cremas": [], "🥦 Frutas, Verduras y Hojas Verdes": [], "🥫 Abarrotes, Semillas y Complementos": [] };

        todasLasLlaves.forEach(ingrediente => {
            let cat = this.obtenerCategoria(ingrediente);
            let textoUnidades = [];

            if (acumuladorPiezas[ingrediente]) textoUnidades.push(`${Math.ceil(acumuladorPiezas[ingrediente])} piezas`);
            if (acumuladorLatas[ingrediente]) textoUnidades.push(`${Math.ceil(acumuladorLatas[ingrediente])} lata(s)`);
            if (acumuladorGramos[ingrediente]) {
                const g = acumuladorGramos[ingrediente];
                textoUnidades.push(g >= 1000 ? `${(g / 1000).toFixed(2)} kg` : `${Math.round(g)}g`);
            }
            if (acumuladorMl[ingrediente]) {
                const ml = acumuladorMl[ingrediente];
                textoUnidades.push(ml >= 1000 ? `${(ml / 1000).toFixed(2)} L` : `${Math.round(ml)}ml`);
            }
            if (acumuladorNotas[ingrediente]) textoUnidades.push(Array.from(acumuladorNotas[ingrediente]).join(' + '));

            categoriasMapeadas[cat].push({ nombre: ingrediente, cantidad: textoUnidades.join(' + ') });
        });

        const acordeonContainer = document.getElementById('lista-super-acordeon');
        if (!acordeonContainer) return;
        acordeonContainer.innerHTML = "";

        Object.keys(categoriasMapeadas).forEach((catNombre, idx) => {
            const listaAlimentos = categoriasMapeadas[catNombre];
            if (listaAlimentos.length === 0) return;

            const details = document.createElement('details');
            details.style.marginBottom = "10px"; details.style.backgroundColor = "#111"; details.style.borderRadius = "6px"; details.style.border = "1px solid #444";
            if (idx === 0) details.open = true;

            const summary = document.createElement('summary');
            summary.style.padding = "12px 15px"; summary.style.fontWeight = "bold"; summary.style.color = "var(--neon-green)"; summary.style.cursor = "pointer";
            summary.textContent = `${catNombre} (${listaAlimentos.length})`;
            details.appendChild(summary);

            const ul = document.createElement('ul');
            ul.style.padding = "10px 15px";
            ul.style.margin = "0";
            ul.style.listStyle = "none";

            listaAlimentos.sort((a,b) => a.nombre.localeCompare(b.nombre)).forEach(item => {
                const li = document.createElement('li');
                li.style.display = "flex"; li.style.justifyContent = "space-between"; li.style.background = "none"; li.style.border = "none"; li.style.borderBottom = "1px solid #222"; li.style.marginBottom = "0"; li.style.padding = "6px 0";
                
                const keyUnica = `${this.mesActual}_${this.semanaActual}_${item.nombre}`;
                const yaComprado = this.compradosTemp.has(keyUnica);

                li.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <input type="checkbox" class="check-item-super" data-key="${keyUnica}" ${yaComprado ? 'checked' : ''} style="transform: scale(1.2); cursor: pointer;">
                        <span class="txt-item-nombre" style="${yaComprado ? 'text-decoration: line-through; color: #555;' : 'color: white;'}">${item.nombre}</span>
                    </div>
                    <span class="txt-item-cant" style="color: var(--neon-green); font-weight: bold;">${item.cantidad}</span>
                `;
                ul.appendChild(li);
            });
            details.appendChild(ul);
            acordeonContainer.appendChild(details);
        });

        document.querySelectorAll('.check-item-super').forEach(check => {
            check.onchange = (e) => {
                const key = e.target.dataset.key;
                const p = e.target.closest('li');
                if (e.target.checked) {
                    this.compradosTemp.add(key);
                    p.querySelector('.txt-item-nombre').style.textDecoration = "line-through";
                    p.querySelector('.txt-item-nombre').style.color = "#555";
                } else {
                    this.compradosTemp.delete(key);
                    p.querySelector('.txt-item-nombre').style.textDecoration = "none";
                    p.querySelector('.txt-item-nombre').style.color = "white";
                }
            };
        });

        document.getElementById('btn-imprimir-super').onclick = () => this.abrirVentanaImpresion(categoriasMapeadas);
        document.getElementById('lista-super-container').style.display = 'block';
    },

    abrirVentanaImpresion(categorias) {
        let textoPlano = `========================================\n`;
        textoPlano += `🛒 MANDADO - MES ${this.mesActual} SEMANA ${this.semanaActual}\n`;
        textoPlano += `========================================\n\n`;
        Object.keys(categorias).forEach(cat => {
            if (categorias[cat].length === 0) return;
            textoPlano += `📂 ${cat.toUpperCase()}\n`;
            categorias[cat].forEach(item => { textoPlano += `[ ] ${item.nombre.padEnd(30, ' ')} -> ${item.cantidad}\n`; });
            textoPlano += `\n`;
        });
        const ventanaImpresion = window.open('', '_blank', 'width=600,height=700');
        ventanaImpresion.document.write(`<html><head><title>Imprimir Super</title></head><body style="font-family:monospace; white-space:pre-wrap;">${textoPlano}</body></html>`);
        ventanaImpresion.document.close();
        ventanaImpresion.print();
    },

    saveAndRefresh() {
        localStorage.setItem('fittracker_planes_v4', JSON.stringify(this.planes));
        this.renderCalendario();
    }
};

window.planificadorModule = planificadorModule;