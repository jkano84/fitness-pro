// platillos_db.js - Base de Datos Maestra de Nutrición (80 Platillos del Excel de Expertos)
// Ejemplo recomendado para nuevos platillos compatibles con la lista del super:
window.platillosDbEjemploEstructura = {
    desayunos: [
        {
            name: "Ejemplo: Bowl proteico estructurado",
            calories: 430,
            ingredients: [
                { nombre: "Yogur griego natural", cantidad: 200, unidad: "g", categoria: "Lacteos" },
                { nombre: "Avena en hojuelas", cantidad: 40, unidad: "g", categoria: "Semillas" },
                { nombre: "Fresas", cantidad: 80, unidad: "g", categoria: "Vegetales" },
                { nombre: "Nuez", cantidad: 15, unidad: "g", categoria: "Semillas" }
            ]
        }
    ]
};

window.foodDatabaseMaster = {
    "desayunos": [
        {
            "name": "Opción 1: Huevo con Tortilla y Café",
            "ingredients": [
                { "name": "Huevo entero", "quantity": "2 piezas (100g)", "calories": 140, "carbs": 0.7, "protein": 12.6, "fat": 9.5 },
                { "name": "Tortilla de maíz", "quantity": "2 piezas (50g)", "calories": 104, "carbs": 22, "protein": 2.8, "fat": 1 },
                { "name": "Queso panela", "quantity": "30g", "calories": 74, "carbs": 0.8, "protein": 5.4, "fat": 5.4 },
                { "name": "Café negro", "quantity": "150ml", "calories": 2, "carbs": 0, "protein": 0.3, "fat": 0 }
            ],
            "calories": 320, "carbs": 23.5, "protein": 21.1, "fat": 15.9
        },
        {
            "name": "Opción 2: Omelette de Espinacas y Champiñones",
            "ingredients": [
                { "name": "Claras de huevo", "quantity": "3 piezas (90g)", "calories": 47, "carbs": 0.7, "protein": 10, "fat": 0.1 },
                { "name": "Huevo entero", "quantity": "1 pieza (50g)", "calories": 70, "carbs": 0.4, "protein": 6.3, "fat": 4.8 },
                { "name": "Espinaca cruda", "quantity": "1 taza (30g)", "calories": 7, "carbs": 1.1, "protein": 0.9, "fat": 0.1 },
                { "name": "Champiñones", "quantity": "1/2 taza (50g)", "calories": 11, "carbs": 1.6, "protein": 1.1, "fat": 0.1 },
                { "name": "Aceite de oliva", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 180, "carbs": 4.8, "protein": 18.3, "fat": 10.1
        },
        {
            "name": "Opción 3: Avena Trasnochada (Overnight Oats)",
            "ingredients": [
                { "name": "Avena en hojuelas", "quantity": "40g", "calories": 152, "carbs": 27, "protein": 5.3, "fat": 2.6 },
                { "name": "Leche de almendras s/azúcar", "quantity": "200ml", "calories": 30, "carbs": 1, "protein": 1, "fat": 2.5 },
                { "name": "Semillas de chía", "quantity": "1 cda (10g)", "calories": 49, "carbs": 4.2, "protein": 1.7, "fat": 3.1 },
                { "name": "Fresas fileteadas", "quantity": "50g", "calories": 16, "carbs": 3.9, "protein": 0.3, "fat": 0.1 }
            ],
            "calories": 247, "carbs": 36.1, "protein": 8.3, "fat": 8.3
        },
        {
            "name": "Opción 4: Licuado Proteico de Plátano y Almendra",
            "ingredients": [
                { "name": "Proteína en polvo (Whey)", "quantity": "1 scoop (30g)", "calories": 120, "carbs": 2, "protein": 24, "fat": 1.5 },
                { "name": "Plátano maduro", "quantity": "1/2 pieza (50g)", "calories": 45, "carbs": 11.5, "protein": 0.6, "fat": 0.1 },
                { "name": "Crema de almendras pura", "quantity": "1 cdita (10g)", "calories": 60, "carbs": 2, "protein": 2.1, "fat": 5.3 },
                { "name": "Agua o hielo", "quantity": "250ml", "calories": 0, "carbs": 0, "protein": 0, "fat": 0 }
            ],
            "calories": 225, "carbs": 15.5, "protein": 26.7, "fat": 6.9
        },
        {
            "name": "Opción 5: Tostadas de Aguacate y Huevo Poché",
            "ingredients": [
                { "name": "Pan tostado integral", "quantity": "2 rebanadas", "calories": 138, "carbs": 24.8, "protein": 7.2, "fat": 2.2 },
                { "name": "Aguacate", "quantity": "50g", "calories": 80, "carbs": 4.5, "protein": 1, "fat": 7.5 },
                { "name": "Huevo entero poché", "quantity": "1 pieza", "calories": 70, "carbs": 0.4, "protein": 6.3, "fat": 4.8 }
            ],
            "calories": 288, "carbs": 29.7, "protein": 14.5, "fat": 14.5
        },
        {
            "name": "Opción 6: Yogur Griego con Berries y Nueces",
            "ingredients": [
                { "name": "Yogur Griego sin azúcar", "quantity": "150g", "calories": 89, "carbs": 5.4, "protein": 15, "fat": 0.6 },
                { "name": "Blueberries o moras", "quantity": "50g", "calories": 29, "carbs": 7, "protein": 0.4, "fat": 0.2 },
                { "name": "Nuez pecana picada", "quantity": "3 piezas (15g)", "calories": 103, "carbs": 2.1, "protein": 1.4, "fat": 10.8 }
            ],
            "calories": 221, "carbs": 14.5, "protein": 16.8, "fat": 11.6
        },
        {
            "name": "Opción 7: Molletes Saludables",
            "ingredients": [
                { "name": "Pan birote o bolillo s/migajón", "quantity": "1 pieza (60g)", "calories": 150, "carbs": 31, "protein": 5, "fat": 1 },
                { "name": "Frijoles bayos machacados de la olla", "quantity": "1/2 taza (80g)", "calories": 70, "carbs": 12, "protein": 4.5, "fat": 0.3 },
                { "name": "Queso Oaxaca light rallado", "quantity": "40g", "calories": 100, "carbs": 1, "protein": 9.5, "fat": 6.2 },
                { "name": "Pico de gallo", "quantity": "Al gusto", "calories": 10, "carbs": 2, "protein": 0.3, "fat": 0.1 }
            ],
            "calories": 330, "carbs": 46, "protein": 19.3, "fat": 7.6
        },
        {
            "name": "Opción 8: Sándwich de Pavo y Hummus",
            "ingredients": [
                { "name": "Pan de caja de grano entero", "quantity": "2 rebanadas", "calories": 140, "carbs": 24, "protein": 6, "fat": 2 },
                { "name": "Pechuga de pavo cocida", "quantity": "3 rebanadas (60g)", "calories": 60, "carbs": 1, "protein": 12, "fat": 1 },
                { "name": "Hummus tradicional", "quantity": "1 cda (15g)", "calories": 35, "carbs": 3, "protein": 1.2, "fat": 2.1 },
                { "name": "Espinaca y jitomate", "quantity": "Al gusto", "calories": 8, "carbs": 1.5, "protein": 0.4, "fat": 0.1 }
            ],
            "calories": 243, "carbs": 29.5, "protein": 19.6, "fat": 5.2
        },
        {
            "name": "Opción 9: Chilaquiles Ligeros con Pollo",
            "ingredients": [
                { "name": "Totopos horneados caseros", "quantity": "40g", "calories": 140, "carbs": 28, "protein": 3, "fat": 1.5 },
                { "name": "Salsa verde o roja cocida s/aceite", "quantity": "1/2 taza", "calories": 25, "carbs": 4.5, "protein": 1, "fat": 0.2 },
                { "name": "Pechuga de pollo deshebrada", "quantity": "60g", "calories": 99, "carbs": 0, "protein": 18.6, "fat": 2.2 },
                { "name": "Crema ácida baja en grasa", "quantity": "1 cdita (10g)", "calories": 20, "carbs": 0.5, "protein": 0.3, "fat": 1.8 }
            ],
            "calories": 284, "carbs": 33, "protein": 22.9, "fat": 5.7
        },
        {
            "name": "Opción 10: Requesón Preparado en Tostadas",
            "ingredients": [
                { "name": "Tostadas deshidratadas de maíz", "quantity": "2 piezas", "calories": 60, "carbs": 13, "protein": 1.5, "fat": 0.5 },
                { "name": "Requesón fresco", "quantity": "80g", "calories": 110, "carbs": 2.5, "protein": 9.2, "fat": 6.8 },
                { "name": "Jitomate y cebolla picados", "quantity": "1/2 taza", "calories": 15, "carbs": 3.2, "protein": 0.6, "fat": 0.1 },
                { "name": "Cilantro y chile verde", "quantity": "Al gusto", "calories": 2, "carbs": 0.4, "protein": 0.1, "fat": 0 }
            ],
            "calories": 187, "carbs": 19.1, "protein": 11.4, "fat": 7.9
        },
        {
            "name": "Opción 11: Hot Cakes de Avena y Claras",
            "ingredients": [
                { "name": "Harina de avena integral", "quantity": "40g", "calories": 152, "carbs": 27, "protein": 5.3, "fat": 2.6 },
                { "name": "Claras de huevo", "quantity": "3 piezas (90g)", "calories": 47, "carbs": 0.7, "protein": 10, "fat": 0.1 },
                { "name": "Esencia de vainilla y canela", "quantity": "Al gusto", "calories": 4, "carbs": 0.8, "protein": 0, "fat": 0 },
                { "name": "Miel de abeja pura", "quantity": "1 cdita (7g)", "calories": 21, "carbs": 5.7, "protein": 0, "fat": 0 }
            ],
            "calories": 224, "carbs": 34.2, "protein": 15.3, "fat": 2.7
        },
        {
            "name": "Opción 12: Tofu Revuelto con Cúrcuma (Vegano)",
            "ingredients": [
                { "name": "Tofu firme exprimido", "quantity": "150g", "calories": 120, "carbs": 3.5, "protein": 12, "fat": 6.5 },
                { "name": "Jitomate picado y cebolla", "quantity": "1/2 taza", "calories": 15, "carbs": 3.2, "protein": 0.6, "fat": 0.1 },
                { "name": "Cúrcuma en polvo y sal negra", "quantity": "Al gusto", "calories": 5, "carbs": 1, "protein": 0.2, "fat": 0.1 },
                { "name": "Aceite de aguacate", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 185, "carbs": 7.7, "protein": 12.8, "fat": 11.7
        },
        {
            "name": "Opción 13: Sope Ligero de Nopal",
            "ingredients": [
                { "name": "Nopales medianos asados", "quantity": "2 piezas (150g)", "calories": 24, "carbs": 5, "protein": 2, "fat": 0.2 },
                { "name": "Frijoles negros de la olla machacados", "quantity": "1/3 taza (50g)", "calories": 45, "carbs": 8, "protein": 2.8, "fat": 0.2 },
                { "name": "Pechuga de pollo deshebrada", "quantity": "50g", "calories": 83, "carbs": 0, "protein": 15.5, "fat": 1.8 },
                { "name": "Queso cotija rallado", "quantity": "1 cda (10g)", "calories": 38, "carbs": 0.3, "protein": 2.6, "fat": 3 }
            ],
            "calories": 190, "carbs": 13.3, "protein": 22.9, "fat": 5.2
        },
        {
            "name": "Opción 14: Pan de Centeno con Requesón e Higo",
            "ingredients": [
                { "name": "Pan de centeno artesanal", "quantity": "1 rebanada (40g)", "calories": 100, "carbs": 19, "protein": 3.5, "fat": 1 },
                { "name": "Requesón", "quantity": "50g", "calories": 69, "carbs": 1.5, "protein": 5.7, "fat": 4.2 },
                { "name": "Higo fresco rebanado", "quantity": "1 pieza (40g)", "calories": 30, "carbs": 7.5, "protein": 0.3, "fat": 0.1 }
            ],
            "calories": 199, "carbs": 28, "protein": 9.5, "fat": 5.3
        },
        {
            "name": "Opción 15: Salmón Ahumado en Bagel Integral",
            "ingredients": [
                { "name": "Mini Bagel integral", "quantity": "1 pieza (50g)", "calories": 135, "carbs": 26, "protein": 5.5, "fat": 1 },
                { "name": "Queso crema en su versión light", "quantity": "1 cda (15g)", "calories": 30, "carbs": 1, "protein": 1.5, "fat": 2.3 },
                { "name": "Salmón ahumado", "quantity": "40g", "calories": 47, "carbs": 0, "protein": 7.3, "fat": 1.8 },
                { "name": "Alcaparras y rodajas de pepino", "quantity": "Al gusto", "calories": 5, "carbs": 1, "protein": 0.2, "fat": 0.1 }
            ],
            "calories": 217, "carbs": 28, "protein": 14.5, "fat": 5.2
        },
        {
            "name": "Opción 16: Ensalada de Frutas con Requesón",
            "ingredients": [
                { "name": "Melón en cubos", "quantity": "1 taza (150g)", "calories": 53, "carbs": 12.5, "protein": 1.2, "fat": 0.3 },
                { "name": "Papaya picada", "quantity": "1/2 taza (70g)", "calories": 30, "carbs": 7.6, "protein": 0.4, "fat": 0.1 },
                { "name": "Requesón fresco", "quantity": "80g", "calories": 110, "carbs": 2.5, "protein": 9.2, "fat": 6.8 },
                { "name": "Almendras fileteadas", "quantity": "5 piezas (7g)", "calories": 42, "carbs": 1.5, "protein": 1.5, "fat": 3.6 }
            ],
            "calories": 235, "carbs": 24.1, "protein": 12.3, "fat": 10.8
        },
        {
            "name": "Opción 17: Huevo con Ejotes y Salsa de Tomate",
            "ingredients": [
                { "name": "Huevo entero", "quantity": "2 piezas (100g)", "calories": 140, "carbs": 0.7, "protein": 12.6, "fat": 9.5 },
                { "name": "Ejotes cocidos picados", "quantity": "1 taza (100g)", "calories": 35, "carbs": 7.5, "protein": 1.8, "fat": 0.2 },
                { "name": "Puré de tomate natural casero", "quantity": "1/4 taza", "calories": 15, "carbs": 3.3, "protein": 0.7, "fat": 0.1 },
                { "name": "Aceite de oliva para el sartén", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 235, "carbs": 11.5, "protein": 15.1, "fat": 14.8
        },
        {
            "name": "Opción 18: Porridge de Quinoa y Canela",
            "ingredients": [
                { "name": "Quinoa cocida en agua", "quantity": "1/2 taza (90g)", "calories": 111, "carbs": 20, "protein": 4.1, "fat": 1.8 },
                { "name": "Leche de soya s/azúcar", "quantity": "150ml", "calories": 50, "carbs": 2, "protein": 4.5, "fat": 2.2 },
                { "name": "Extracto de vainilla y canela", "quantity": "Al gusto", "calories": 4, "carbs": 0.8, "protein": 0, "fat": 0 },
                { "name": "Nuez de la India picada", "quantity": "4 piezas (10g)", "calories": 55, "carbs": 3, "protein": 1.8, "fat": 4.4 }
            ],
            "calories": 220, "carbs": 25.8, "protein": 10.4, "fat": 8.4
        },
        {
            "name": "Opción 19: Wrap de Pavo en Hoja de Lechuga",
            "ingredients": [
                { "name": "Hojas de lechuga orejona limpia", "quantity": "3 piezas grandes", "calories": 15, "carbs": 2.8, "protein": 1.2, "fat": 0.2 },
                { "name": "Pechuga de pavo premium", "quantity": "4 rebanadas (80g)", "calories": 80, "carbs": 1.2, "protein": 16, "fat": 1.2 },
                { "name": "Queso panela en tiras", "quantity": "40g", "calories": 98, "carbs": 1, "protein": 7.2, "fat": 7.2 },
                { "name": "Mostaza Dijón", "quantity": "1 cdita (5g)", "calories": 5, "carbs": 0.5, "protein": 0.3, "fat": 0.3 }
            ],
            "calories": 198, "carbs": 5.5, "protein": 24.7, "fat": 8.9
        },
        {
            "name": "Opción 20: Muffins Caseros de Huevo y Verdura",
            "ingredients": [
                { "name": "Huevo entero batido", "quantity": "2 piezas (100g)", "calories": 140, "carbs": 0.7, "protein": 12.6, "fat": 9.5 },
                { "name": "Brócoli y zanahoria picados", "quantity": "1/2 taza", "calories": 22, "carbs": 4.5, "protein": 1.2, "fat": 0.2 },
                { "name": "Pavo picado", "quantity": "2 rebanadas (40g)", "calories": 40, "carbs": 0.6, "protein": 8, "fat": 0.6 }
            ],
            "calories": 202, "carbs": 5.8, "protein": 21.8, "fat": 10.3
        }
    ],
    "comidas": [
        {
            "name": "Opción 1: Pechuga de Pollo con Arroz e Hinojo",
            "ingredients": [
                { "name": "Pechuga de pollo a la plancha", "quantity": "120g", "calories": 198, "carbs": 0, "protein": 37.2, "fat": 4.4 },
                { "name": "Arroz integral cocido", "quantity": "1/2 taza (100g)", "calories": 112, "carbs": 23.5, "protein": 2.6, "fat": 0.9 },
                { "name": "Ensalada de hinojo y lechuga", "quantity": "1.5 tazas", "calories": 25, "carbs": 5.2, "protein": 1.4, "fat": 0.2 },
                { "name": "Aceite de oliva (aderezo)", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 380, "carbs": 28.7, "protein": 41.2, "fat": 10.5
        },
        {
            "name": "Opción 2: Pescado Blanco al Limón con Quinoa",
            "ingredients": [
                { "name": "Filete de pescado blanco (Tilapia o Basa)", "quantity": "150g", "calories": 140, "carbs": 0, "protein": 30, "fat": 1.8 },
                { "name": "Quinoa cocida", "quantity": "1/2 taza (90g)", "calories": 111, "carbs": 20, "protein": 4.1, "fat": 1.8 },
                { "name": "Ejotes y calabacitas al vapor", "quantity": "1 taza", "calories": 35, "carbs": 7.2, "protein": 2, "fat": 0.2 },
                { "name": "Jugo de limón y especias", "quantity": "Al gusto", "calories": 4, "carbs": 1, "protein": 0.1, "fat": 0 }
            ],
            "calories": 290, "carbs": 28.2, "protein": 36.2, "fat": 3.8
        },
        {
            "name": "Opción 3: Fajitas de Res con Pimientos",
            "ingredients": [
                { "name": "Bistec de res magro en tiras", "quantity": "120g", "calories": 180, "carbs": 0, "protein": 26.4, "fat": 7.5 },
                { "name": "Pimiento morrón picado y cebolla", "quantity": "1 taza", "calories": 40, "carbs": 8.8, "protein": 1.5, "fat": 0.3 },
                { "name": "Tortilla de maíz nixtamalizado", "quantity": "2 piezas (50g)", "calories": 104, "carbs": 22, "protein": 2.8, "fat": 1 },
                { "name": "Aceite de aguacate", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 369, "carbs": 30.8, "protein": 30.7, "fat": 13.8
        },
        {
            "name": "Opción 4: Medallón de Atún Sellado con Ensalada de Pasta",
            "ingredients": [
                { "name": "Medallón de atún fresco", "quantity": "130g", "calories": 142, "carbs": 0, "protein": 31.2, "fat": 1.2 },
                { "name": "Pasta integral cocida (Rotini o Penne)", "quantity": "1/2 taza (70g)", "calories": 100, "carbs": 21, "protein": 3.8, "fat": 0.6 },
                { "name": "Tomates cherry y pepino en rodajas", "quantity": "1 taza", "calories": 22, "carbs": 4.6, "protein": 1, "fat": 0.2 },
                { "name": "Aderezo ligero de vinagre balsámico", "quantity": "1 cda", "calories": 15, "carbs": 3, "protein": 0, "fat": 0.1 }
            ],
            "calories": 279, "carbs": 28.6, "protein": 36, "fat": 2.1
        },
        {
            "name": "Opción 5: Salpicón de Pollo Saludable",
            "ingredients": [
                { "name": "Pechuga de pollo deshebrada fina", "quantity": "120g", "calories": 198, "carbs": 0, "protein": 37.2, "fat": 4.4 },
                { "name": "Lechuga picada, jitomate y cebolla morada", "quantity": "2 tazas", "calories": 30, "carbs": 6.5, "protein": 1.8, "fat": 0.3 },
                { "name": "Aguacate en cubos", "quantity": "40g", "calories": 64, "carbs": 3.6, "protein": 0.8, "fat": 6 },
                { "name": "Tostadas horneadas de maíz", "quantity": "2 piezas", "calories": 60, "carbs": 13, "protein": 1.5, "fat": 0.5 }
            ],
            "calories": 352, "carbs": 23.1, "protein": 41.3, "fat": 11.2
        },
        {
            "name": "Opción 6: Salmón Asado con Puré de Camote",
            "ingredients": [
                { "name": "Filete de salmón fresco", "quantity": "110g", "calories": 198, "carbs": 0, "protein": 24, "fat": 11 },
                { "name": "Camote amarillo cocido y machacado", "quantity": "80g", "calories": 72, "carbs": 16.8, "protein": 1.3, "fat": 0.1 },
                { "name": "Brócoli asado al ajo", "quantity": "1 taza (90g)", "calories": 35, "carbs": 6, "protein": 2.6, "fat": 0.4 }
            ],
            "calories": 305, "carbs": 22.8, "protein": 27.9, "fat": 11.5
        },
        {
            "name": "Opción 7: Picadillo de Pavo con Verduras",
            "ingredients": [
                { "name": "Carne molida de pavo magra", "quantity": "120g", "calories": 160, "carbs": 0, "protein": 26.4, "fat": 5.8 },
                { "name": "Zanahoria y calabacita picadas en cubitos", "quantity": "1/2 taza", "calories": 20, "carbs": 4.2, "protein": 0.8, "fat": 0.1 },
                { "name": "Arroz blanco al vapor", "quantity": "1/3 taza (60g)", "calories": 78, "carbs": 17, "protein": 1.6, "fat": 0.2 },
                { "name": "Salsa de tomate natural casera", "quantity": "1/3 taza", "calories": 18, "carbs": 3.8, "protein": 0.8, "fat": 0.1 }
            ],
            "calories": 276, "carbs": 25, "protein": 29.6, "fat": 6.2
        },
        {
            "name": "Opción 8: Tacos de Pescado en Tortilla de Nopal",
            "ingredients": [
                { "name": "Filete de pescado blanco a la plancha", "quantity": "140g", "calories": 130, "carbs": 0, "protein": 28, "fat": 1.6 },
                { "name": "Tortillas de nopal premium", "quantity": "3 piezas", "calories": 60, "carbs": 12, "protein": 2.1, "fat": 0.6 },
                { "name": "Ensalada de col morada y blanca picada", "quantity": "1 taza", "calories": 18, "carbs": 4, "protein": 1, "fat": 0.1 },
                { "name": "Yogur griego con chipotle (aderezo)", "quantity": "2 cdas", "calories": 20, "carbs": 1.2, "protein": 2.5, "fat": 0.1 }
            ],
            "calories": 228, "carbs": 17.2, "protein": 33.6, "fat": 2.3
        },
        {
            "name": "Opción 9: Bowl de Garbanzos con Pollo y Feta",
            "ingredients": [
                { "name": "Garbanzos cocidos drenados", "quantity": "1/2 taza (90g)", "calories": 120, "carbs": 22, "protein": 6, "fat": 2 },
                { "name": "Pechuga de pollo en cubos", "quantity": "90g", "calories": 148, "carbs": 0, "protein": 27.9, "fat": 3.3 },
                { "name": "Queso feta desmoronado", "quantity": "20g", "calories": 53, "carbs": 0.8, "protein": 2.8, "fat": 4.2 },
                { "name": "Pepino, jitomate y hojas de menta", "quantity": "1 taza", "calories": 18, "carbs": 3.8, "protein": 0.8, "fat": 0.1 }
            ],
            "calories": 339, "carbs": 26.6, "protein": 37.5, "fat": 9.6
        },
        {
            "name": "Opción 10: Lentejas Guisadas con Plátano Macho",
            "ingredients": [
                { "name": "Lentejas cocidas espesas", "quantity": "1 taza (180g)", "calories": 190, "carbs": 32, "protein": 14, "fat": 0.8 },
                { "name": "Plátano macho horneado en rodajas", "quantity": "40g", "calories": 48, "carbs": 12.8, "protein": 0.5, "fat": 0.1 },
                { "name": "Jitomate, cebolla y tocino de pavo", "quantity": "1 rebanada picada", "calories": 45, "carbs": 1, "protein": 4, "fat": 2.5 }
            ],
            "calories": 283, "carbs": 45.8, "protein": 18.5, "fat": 3.4
        },
        {
            "name": "Opción 11: Ensalada César Aligerada con Pollo",
            "ingredients": [
                { "name": "Lechuga romana picada fresca", "quantity": "3 tazas", "calories": 24, "carbs": 4.5, "protein": 1.8, "fat": 0.3 },
                { "name": "Pechuga de pollo asada fileteada", "quantity": "130g", "calories": 214, "carbs": 0, "protein": 40.3, "fat": 4.8 },
                { "name": "Queso parmesano rallado fino", "quantity": "1 cda (10g)", "calories": 42, "carbs": 0.4, "protein": 3.8, "fat": 2.8 },
                { "name": "Aderezo César base yogur griego casero", "quantity": "2 cdas", "calories": 30, "carbs": 2, "protein": 3, "fat": 1 }
            ],
            "calories": 310, "carbs": 6.9, "protein": 48.9, "fat": 8.9
        },
        {
            "name": "Opción 12: Carne de Res con Brócoli estilo Oriental",
            "ingredients": [
                { "name": "Pulpa de res magra en tiras delgadas", "quantity": "120g", "calories": 175, "carbs": 0, "protein": 27, "fat": 6.8 },
                { "name": "Arbolitos de brócoli frescos", "quantity": "1.5 tazas (130g)", "calories": 45, "carbs": 8.5, "protein": 3.6, "fat": 0.5 },
                { "name": "Salsa de soya reducida en sodio y jengibre", "quantity": "2 cdas", "calories": 12, "carbs": 2, "protein": 1, "fat": 0 },
                { "name": "Aceite de ajonjolí", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 277, "carbs": 10.5, "protein": 31.6, "fat": 12.3
        },
        {
            "name": "Opción 13: Albóndigas de Pollo en Salsa Chipotle",
            "ingredients": [
                { "name": "Pechuga de pollo molida", "quantity": "120g", "calories": 145, "carbs": 0, "protein": 30, "fat": 2.2 },
                { "name": "Arroz integral cocido", "quantity": "1/3 taza (60g)", "calories": 75, "carbs": 15.6, "protein": 1.7, "fat": 0.6 },
                { "name": "Calabacita criolla picada", "quantity": "1/2 taza", "calories": 12, "carbs": 2.5, "protein": 0.8, "fat": 0.1 },
                { "name": "Salsa de jitomate al chipotle s/aceite", "quantity": "1/2 taza", "calories": 25, "carbs": 5, "protein": 1, "fat": 0.2 }
            ],
            "calories": 257, "carbs": 23.1, "protein": 33.5, "fat": 3.1
        },
        {
            "name": "Opción 14: Tinga de Pollo con Nopales",
            "ingredients": [
                { "name": "Pechuga de pollo deshebrada", "quantity": "120g", "calories": 198, "carbs": 0, "protein": 37.2, "fat": 4.4 },
                { "name": "Cebolla fileteada y jitomate en puré", "quantity": "1 taza", "calories": 35, "carbs": 7.8, "protein": 1.4, "fat": 0.2 },
                { "name": "Nopales cocidos en tiras", "quantity": "1 taza (100g)", "calories": 16, "carbs": 3.3, "protein": 1.3, "fat": 0.1 },
                { "name": "Tostadas de maíz horneadas", "quantity": "2 piezas", "calories": 60, "carbs": 13, "protein": 1.5, "fat": 0.5 }
            ],
            "calories": 309, "carbs": 24.1, "protein": 41.4, "fat": 5.2
        },
        {
            "name": "Opción 15: Cerdo Magro en Salsa Verde con Verdolagas",
            "ingredients": [
                { "name": "Lomo de cerdo limpio de grasa en cubos", "quantity": "120g", "calories": 165, "carbs": 0, "protein": 28.8, "fat": 4.8 },
                { "name": "Verdolagas limpias precocidas", "quantity": "1.5 tazas (120g)", "calories": 20, "carbs": 4, "protein": 1.8, "fat": 0.2 },
                { "name": "Salsa de tomate verde y cilantro s/grasa", "quantity": "1/2 taza", "calories": 22, "carbs": 4.8, "protein": 1, "fat": 0.2 },
                { "name": "Frijoles de la olla enteros", "quantity": "1/3 taza (50g)", "calories": 45, "carbs": 8, "protein": 2.8, "fat": 0.2 }
            ],
            "calories": 252, "carbs": 16.8, "protein": 34.4, "fat": 5.4
        },
        {
            "name": "Opción 16: Pescado Empapelado con Champiñones y Epazote",
            "ingredients": [
                { "name": "Filete de pescado blanco de temporada", "quantity": "150g", "calories": 140, "carbs": 0, "protein": 30, "fat": 1.8 },
                { "name": "Champiñones rebanados frescos", "quantity": "1 taza (100g)", "calories": 22, "carbs": 3.3, "protein": 2.2, "fat": 0.2 },
                { "name": "Rodajas de jitomate, cebolla y hojas de epazote", "quantity": "Al gusto", "calories": 15, "carbs": 3.2, "protein": 0.6, "fat": 0.1 },
                { "name": "Arroz integral de guarnición", "quantity": "1/2 taza (100g)", "calories": 112, "carbs": 23.5, "protein": 2.6, "fat": 0.9 }
            ],
            "calories": 289, "carbs": 30, "protein": 35.4, "fat": 3
        },
        {
            "name": "Opción 17: Ensalada de Quinoa, Aguacate y Atún",
            "ingredients": [
                { "name": "Atún en agua drenado en hojuelas", "quantity": "1 lata (120g)", "calories": 116, "carbs": 0, "protein": 26, "fat": 0.8 },
                { "name": "Quinoa cocida fría", "quantity": "1/2 taza (90g)", "calories": 111, "carbs": 20, "protein": 4.1, "fat": 1.8 },
                { "name": "Aguacate en cuadritos", "quantity": "40g", "calories": 64, "carbs": 3.6, "protein": 0.8, "fat": 6 },
                { "name": "Pimiento y cebolla morada picados", "quantity": "1/2 taza", "calories": 15, "carbs": 3.4, "protein": 0.6, "fat": 0.1 }
            ],
            "calories": 306, "carbs": 27, "protein": 31.5, "fat": 8.7
        },
        {
            "name": "Opción 18: Pechuga Rellena de Espinacas en Salsa Poblana",
            "ingredients": [
                { "name": "Milanesa de pechuga de pollo extendida", "quantity": "120g", "calories": 145, "carbs": 0, "protein": 30, "fat": 2.2 },
                { "name": "Espinacas al vapor para el relleno", "quantity": "1/2 taza", "calories": 6, "carbs": 1, "protein": 0.7, "fat": 0.1 },
                { "name": "Salsa poblana cremosa ligera (leche almendras y chile poblano)", "quantity": "1/2 taza", "calories": 40, "carbs": 4, "protein": 1.5, "fat": 2 },
                { "name": "Elote amarillo en grano", "quantity": "3 cdas (30g)", "calories": 28, "carbs": 6.2, "protein": 0.9, "fat": 0.4 }
            ],
            "calories": 259, "carbs": 11.2, "protein": 33.1, "fat": 4.9
        },
        {
            "name": "Opción 19: Estofado de Res con Champiñones",
            "ingredients": [
                { "name": "Carne de res magra para guisar en cubos", "quantity": "120g", "calories": 185, "carbs": 0, "protein": 27.6, "fat": 7.8 },
                { "name": "Champiñones enteros o a la mitad", "quantity": "1 taza (100g)", "calories": 22, "carbs": 3.3, "protein": 2.2, "fat": 0.2 },
                { "name": "Zanahoria en rodajas y una papa mediana", "quantity": "1/2 pieza (50g)", "calories": 45, "carbs": 10.2, "protein": 1, "fat": 0.1 },
                { "name": "Caldo de res desgrasado natural", "quantity": "1 taza", "calories": 15, "carbs": 1, "protein": 2.5, "fat": 0.2 }
            ],
            "calories": 267, "carbs": 14.5, "protein": 33.3, "fat": 8.3
        },
        {
            "name": "Opción 20: Tacos de Lechuga con Atún Picante",
            "ingredients": [
                { "name": "Atún en agua a la plancha picado", "quantity": "130g", "calories": 125, "carbs": 0, "protein": 28.2, "fat": 0.9 },
                { "name": "Hojas de lechuga francesa entera", "quantity": "4 piezas de base", "calories": 12, "carbs": 2.2, "protein": 1, "fat": 0.2 },
                { "name": "Mayonesa ligera con sriracha", "quantity": "1 cdita (10g)", "calories": 30, "carbs": 1, "protein": 0.1, "fat": 3 },
                { "name": "Cebollín y ajonjolí tostado", "quantity": "1 cdita", "calories": 15, "carbs": 1.2, "protein": 0.5, "fat": 1 }
            ],
            "calories": 182, "carbs": 4.4, "protein": 29.8, "fat": 5.1
        }
    ],
    "meriendas": [
        {
            "name": "Opción 1: Manzana con Crema de Cacahuate",
            "ingredients": [
                { "name": "Manzana mediana en gajos", "quantity": "1 pieza (150g)", "calories": 78, "carbs": 21, "protein": 0.4, "fat": 0.3 },
                { "name": "Crema de cacahuate 100% natural s/azúcar", "quantity": "1 cda (15g)", "calories": 94, "carbs": 3, "protein": 3.8, "fat": 8.1 }
            ],
            "calories": 172, "carbs": 24, "protein": 4.2, "fat": 8.4
        },
        {
            "name": "Opción 2: Arroz Inflado con Crema de Almendras",
            "ingredients": [
                { "name": "Galletas de arroz inflado natural", "quantity": "2 piezas", "calories": 70, "carbs": 15, "protein": 1.4, "fat": 0.6 },
                { "name": "Crema de almendras pura", "quantity": "1 cdita colmada (12g)", "calories": 72, "carbs": 2.4, "protein": 2.5, "fat": 6.4 }
            ],
            "calories": 142, "carbs": 17.4, "protein": 3.9, "fat": 7
        },
        {
            "name": "Opción 3: Fresas con Yogur Griego",
            "ingredients": [
                { "name": "Fresas frescas rebanadas", "quantity": "1 taza (150g)", "calories": 48, "carbs": 11.7, "protein": 1, "fat": 0.4 },
                { "name": "Yogur griego natural sin azúcar", "quantity": "4 cdas (80g)", "calories": 48, "carbs": 2.9, "protein": 8, "fat": 0.3 }
            ],
            "calories": 96, "carbs": 14.6, "protein": 9, "fat": 0.7
        },
        {
            "name": "Opción 4: Bastones de Pepino y Zanahoria con Limón",
            "ingredients": [
                { "name": "Pepino pelado en bastones", "quantity": "1 taza (130g)", "calories": 16, "carbs": 3.7, "protein": 0.8, "fat": 0.1 },
                { "name": "Zanahoria cruda en bastones", "quantity": "1/2 taza (60g)", "calories": 25, "carbs": 5.8, "protein": 0.6, "fat": 0.1 },
                { "name": "Jugo de limón y chile en polvo bajo en sodio", "quantity": "Al gusto", "calories": 5, "carbs": 1.2, "protein": 0.1, "fat": 0 }
            ],
            "calories": 46, "carbs": 10.7, "protein": 1.5, "fat": 0.2
        },
        {
            "name": "Opción 5: Almendras Enteras y Chocolate Amargo",
            "ingredients": [
                { "name": "Almendras naturales enteras", "quantity": "12 piezas (15g)", "calories": 87, "carbs": 3.3, "protein": 3.2, "fat": 7.5 },
                { "name": "Chocolate amargo (70% o más cacao)", "quantity": "1 cuadrito (10g)", "calories": 55, "carbs": 4.6, "protein": 0.8, "fat": 4.2 }
            ],
            "calories": 142, "carbs": 7.9, "protein": 4, "fat": 11.7
        },
        {
            "name": "Opción 6: Plátano con Nueces",
            "ingredients": [
                { "name": "Plátano tabasco o dominico", "quantity": "1/2 pieza (50g)", "calories": 45, "carbs": 11.5, "protein": 0.6, "fat": 0.1 },
                { "name": "Nuez de castilla en mitades", "quantity": "4 piezas (12g)", "calories": 78, "carbs": 1.6, "protein": 1.8, "fat": 7.8 }
            ],
            "calories": 123, "carbs": 13.1, "protein": 2.4, "fat": 7.9
        },
        {
            "name": "Opción 7: Jícama Picada con Chile y Limón",
            "ingredients": [
                { "name": "Jícama natural limpia picada", "quantity": "1.5 tazas (180g)", "calories": 68, "carbs": 16, "protein": 1.3, "fat": 0.2 },
                { "name": "Jugo de limón fresco y salsa picante light", "quantity": "Al gusto", "calories": 6, "carbs": 1.5, "protein": 0.1, "fat": 0 }
            ],
            "calories": 74, "carbs": 17.5, "protein": 1.4, "fat": 0.2
        },
        {
            "name": "Opción 8: Rollitos de Jamón de Pavo con Queso Panela",
            "ingredients": [
                { "name": "Jamón de pechuga de pavo ligh", "quantity": "2 rebanadas (40g)", "calories": 34, "carbs": 0.6, "protein": 6.8, "fat": 0.4 },
                { "name": "Queso panela en bastones", "quantity": "30g", "calories": 74, "carbs": 0.8, "protein": 5.4, "fat": 5.4 }
            ],
            "calories": 108, "carbs": 1.4, "protein": 12.2, "fat": 5.8
        },
        {
            "name": "Opción 9: Gelatina de Leche Light Casera",
            "ingredients": [
                { "name": "Gelatina saborizada preparada con leche descremada y edulcorante", "quantity": "1 taza (200g)", "calories": 90, "carbs": 10, "protein": 8.5, "fat": 0.2 }
            ],
            "calories": 90, "carbs": 10, "protein": 8.5, "fat": 0.2
        },
        {
            "name": "Opción 10: Tostada de Maíz con Hummus",
            "ingredients": [
                { "name": "Tostada de maíz deshidratada plana", "quantity": "1 pieza", "calories": 30, "carbs": 6.5, "protein": 0.7, "fat": 0.2 },
                { "name": "Hummus de garbanzo clásico", "quantity": "1.5 cdas (22g)", "calories": 53, "carbs": 4.5, "protein": 1.8, "fat": 3.1 }
            ],
            "calories": 83, "carbs": 11, "protein": 2.5, "fat": 3.3
        },
        {
            "name": "Opción 11: Semillas de Girasol Horneadas",
            "ingredients": [
                { "name": "Semillas de girasol tostadas sin sal ni aceite añadido", "quantity": "2 cdas (20g)", "calories": 116, "carbs": 4, "protein": 4.2, "fat": 10 }
            ],
            "calories": 116, "carbs": 4, "protein": 4.2, "fat": 10
        },
        {
            "name": "Opción 12: Piña en Cubos con Chía",
            "ingredients": [
                { "name": "Piña natural picada en cubos", "quantity": "1 taza (150g)", "calories": 75, "carbs": 19.5, "protein": 0.8, "fat": 0.2 },
                { "name": "Semillas de chía espolvoreadas", "quantity": "1 cdita (5g)", "calories": 24, "carbs": 2.1, "protein": 0.8, "fat": 1.5 }
            ],
            "calories": 99, "carbs": 21.6, "protein": 1.6, "fat": 1.7
        },
        {
            "name": "Opción 13: Edamames al Vapor",
            "ingredients": [
                { "name": "Vainas de edamame enteras al vapor", "quantity": "1 taza (100g)", "calories": 122, "carbs": 10, "protein": 11, "fat": 5 },
                { "name": "Sal de mar gruesa y jugo de limón", "quantity": "Al gusto", "calories": 2, "carbs": 0.5, "protein": 0, "fat": 0 }
            ],
            "calories": 124, "carbs": 10.5, "protein": 11, "fat": 5
        },
        {
            "name": "Opción 14: Queso Cottage con Berries",
            "ingredients": [
                { "name": "Queso cottage bajo en grasa", "quantity": "80g", "calories": 64, "carbs": 2.4, "protein": 8.8, "fat": 0.8 },
                { "name": "Zarzamoras o frambuesas limpias", "quantity": "1/2 taza (60g)", "calories": 32, "carbs": 7, "protein": 0.7, "fat": 0.3 }
            ],
            "calories": 96, "carbs": 9.4, "protein": 9.5, "fat": 1.1
        },
        {
            "name": "Opción 15: Licuado Verde Ligero",
            "ingredients": [
                { "name": "Apio, pepino y un puño de espinacas", "quantity": "1.5 tazas", "calories": 22, "carbs": 4.5, "protein": 1.2, "fat": 0.2 },
                { "name": "Manzana verde picada", "quantity": "1/2 pieza (75g)", "calories": 40, "carbs": 10.5, "protein": 0.2, "fat": 0.1 },
                { "name": "Agua purificada limpia", "quantity": "200ml", "calories": 0, "carbs": 0, "protein": 0, "fat": 0 }
            ],
            "calories": 62, "carbs": 15, "protein": 1.4, "fat": 0.3
        },
        {
            "name": "Opción 16: Tostada de Arroz con Pavo",
            "ingredients": [
                { "name": "Tostada de arroz inflado redonda", "quantity": "1 pieza", "calories": 35, "carbs": 7.5, "protein": 0.7, "fat": 0.3 },
                { "name": "Pechuga de pavo en rebanada", "quantity": "2 piezas (40g)", "calories": 40, "carbs": 0.6, "protein": 8, "fat": 0.6 }
            ],
            "calories": 75, "carbs": 8.1, "protein": 8.7, "fat": 0.9
        },
        {
            "name": "Opción 17: Pera con Nueces de la India",
            "ingredients": [
                { "name": "Pera d'Anjou firme picada", "quantity": "1/2 pieza (80g)", "calories": 46, "carbs": 12, "protein": 0.3, "fat": 0.1 },
                { "name": "Nuez de la India al natural", "quantity": "5 piezas (12g)", "calories": 66, "carbs": 3.6, "protein": 2.1, "fat": 5.2 }
            ],
            "calories": 112, "carbs": 15.6, "protein": 2.4, "fat": 5.3
        },
        {
            "name": "Opción 18: Proteína en Polvo con Agua",
            "ingredients": [
                { "name": "Suplemento de proteína Whey Isolate", "quantity": "1 scoop (30g)", "calories": 110, "carbs": 1, "protein": 25, "fat": 0.5 },
                { "name": "Agua simple purificada fría", "quantity": "250ml", "calories": 0, "carbs": 0, "protein": 0, "fat": 0 }
            ],
            "calories": 110, "carbs": 1, "protein": 25, "fat": 0.5
        },
        {
            "name": "Opción 19: Ciruela Pasa con Nueces de Castilla",
            "ingredients": [
                { "name": "Ciruela pasa deshuesada deshidratada", "quantity": "3 piezas (25g)", "calories": 60, "carbs": 16, "protein": 0.5, "fat": 0.1 },
                { "name": "Nuez de castilla entera en mitades", "quantity": "3 piezas (9g)", "calories": 58, "carbs": 1.2, "protein": 1.3, "fat": 5.8 }
            ],
            "calories": 118, "carbs": 17.2, "protein": 1.8, "fat": 5.9
        },
        {
            "name": "Opción 20: Sandía en Cubos con Menta",
            "ingredients": [
                { "name": "Sandía roja fresca picada", "quantity": "1.5 tazas (200g)", "calories": 60, "carbs": 15, "protein": 1.2, "fat": 0.3 },
                { "name": "Hojas de menta picadas frescas", "quantity": "Al gusto", "calories": 2, "carbs": 0.4, "protein": 0.1, "fat": 0 }
            ],
            "calories": 62, "carbs": 15.4, "protein": 1.3, "fat": 0.3
        }
    ],
    "cenas": [
        {
            "name": "Opción 1: Ensalada de Atún con Huevo Duro",
            "ingredients": [
                { "name": "Atún en agua drenado de lata", "quantity": "1 lata (120g)", "calories": 116, "carbs": 0, "protein": 26, "fat": 0.8 },
                { "name": "Huevo entero duro picado", "quantity": "1 pieza (50g)", "calories": 70, "carbs": 0.4, "protein": 6.3, "fat": 4.8 },
                { "name": "Mix de hojas de lechuga francesa y espinaca", "quantity": "2 tazas", "calories": 20, "carbs": 3.8, "protein": 1.5, "fat": 0.2 },
                { "name": "Aceite de oliva extra virgen", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 251, "carbs": 4.2, "protein": 33.8, "fat": 10.8
        },
        {
            "name": "Opción 2: Pechuga de Pollo Asada con Calabacitas",
            "ingredients": [
                { "name": "Pechuga de pollo fileteada a la plancha", "quantity": "110g", "calories": 181, "carbs": 0, "protein": 34.1, "fat": 4 },
                { "name": "Calabacitas italianas rebanadas salteadas", "quantity": "1.5 tazas (200g)", "calories": 34, "carbs": 6.8, "protein": 2.4, "fat": 0.4 },
                { "name": "Aceite de aguacate en spray", "quantity": "1 disparo rápido", "calories": 15, "carbs": 0, "protein": 0, "fat": 1.7 }
            ],
            "calories": 230, "carbs": 6.8, "protein": 36.5, "fat": 6.1
        },
        {
            "name": "Opción 3: Quesadillas de Masa Madre Light",
            "ingredients": [
                { "name": "Tortilla de masa madre ligera", "quantity": "2 piezas (50g)", "calories": 110, "carbs": 23, "protein": 3, "fat": 1 },
                { "name": "Queso panela de rancho rebanado", "quantity": "50g", "calories": 123, "carbs": 1.3, "protein": 9, "fat": 9 }
            ],
            "calories": 233, "carbs": 24.3, "protein": 12, "fat": 10
        },
        {
            "name": "Opción 4: Tacos de Huevo en Hoja de Lechuga",
            "ingredients": [
                { "name": "Claras de huevo revueltas", "quantity": "3 piezas (90g)", "calories": 47, "carbs": 0.7, "protein": 10, "fat": 0.1 },
                { "name": "Huevo entero revuelto", "quantity": "1 pieza (50g)", "calories": 70, "carbs": 0.4, "protein": 6.3, "fat": 4.8 },
                { "name": "Hojas de lechuga romana anchas limpias", "quantity": "3 piezas", "calories": 12, "carbs": 2.2, "protein": 1, "fat": 0.2 },
                { "name": "Salsa pico de gallo fresca picante", "quantity": "3 cdas", "calories": 8, "carbs": 1.8, "protein": 0.3, "fat": 0.1 }
            ],
            "calories": 137, "carbs": 5.1, "protein": 17.6, "fat": 5.2
        },
        {
            "name": "Opción 5: Filete de Pescado con Espárragos",
            "ingredients": [
                { "name": "Filete de pescado blanco limpio de espinas", "quantity": "150g", "calories": 140, "carbs": 0, "protein": 30, "fat": 1.8 },
                { "name": "Espárragos trigueros asados", "quantity": "1 taza (100g)", "calories": 20, "carbs": 3.8, "protein": 2.2, "fat": 0.2 },
                { "name": "Aceite de oliva para barnizar", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 205, "carbs": 3.8, "protein": 32.2, "fat": 7
        },
        {
            "name": "Opción 6: Tostadas de Pollo Deshebrado",
            "ingredients": [
                { "name": "Tostadas horneadas de maíz deshidratadas", "quantity": "2 piezas", "calories": 60, "carbs": 13, "protein": 1.5, "fat": 0.5 },
                { "name": "Pechuga de pollo cocida deshebrada de la olla", "quantity": "80g", "calories": 132, "carbs": 0, "protein": 24.8, "fat": 2.9 },
                { "name": "Lechuga picada fina, jitomate y salsa al gusto", "quantity": "1 taza", "calories": 15, "carbs": 3.2, "protein": 0.6, "fat": 0.1 }
            ],
            "calories": 207, "carbs": 16.2, "protein": 26.9, "fat": 3.5
        },
        {
            "name": "Opción 7: Pan Pita con Hummus y Pavo",
            "ingredients": [
                { "name": "Pan pita integral mediano", "quantity": "1 pieza (40g)", "calories": 110, "carbs": 22, "protein": 4, "fat": 1 },
                { "name": "Hummus de garbanzo", "quantity": "1 cda (15g)", "calories": 35, "carbs": 3, "protein": 1.2, "fat": 2.1 },
                { "name": "Pechuga de pavo en rebanadas", "quantity": "2 piezas (40g)", "calories": 40, "carbs": 0.6, "protein": 8, "fat": 0.6 }
            ],
            "calories": 185, "carbs": 25.6, "protein": 13.2, "fat": 3.7
        },
        {
            "name": "Opción 8: Salmón en Papillote con Verduras",
            "ingredients": [
                { "name": "Filete de salmón rosado fresco", "quantity": "110g", "calories": 198, "carbs": 0, "protein": 24, "fat": 11 },
                { "name": "Pimiento, calabacita y cebolla en juliana", "quantity": "1 taza", "calories": 30, "carbs": 6.8, "protein": 1.2, "fat": 0.2 }
            ],
            "calories": 228, "carbs": 6.8, "protein": 25.2, "fat": 11.2
        },
        {
            "name": "Opción 9: Sopa de Verduras con Pollo",
            "ingredients": [
                { "name": "Caldo de pollo natural desgrasado claro", "quantity": "1.5 tazas", "calories": 25, "carbs": 1.5, "protein": 3.5, "fat": 0.5 },
                { "name": "Mix de verduras (zanahoria, calabacita, chayote cocidos)", "quantity": "1 taza", "calories": 35, "carbs": 7.8, "protein": 1.3, "fat": 0.2 },
                { "name": "Pechuga de pollo cocida deshebrada", "quantity": "70g", "calories": 115, "carbs": 0, "protein": 21.7, "fat": 2.5 }
            ],
            "calories": 175, "carbs": 9.3, "protein": 26.5, "fat": 3.2
        },
        {
            "name": "Opción 10: Omelette de Claras con Champiñones",
            "ingredients": [
                { "name": "Claras de huevo naturales líquidas", "quantity": "4 piezas (120g)", "calories": 62, "carbs": 0.9, "protein": 13.2, "fat": 0.1 },
                { "name": "Champiñones rebanados al momento", "quantity": "1/2 taza (50g)", "calories": 11, "carbs": 1.6, "protein": 1.1, "fat": 0.1 },
                { "name": "Aceite de coco para cocinar en sartén", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 118, "carbs": 2.5, "protein": 14.3, "fat": 5.2
        },
        {
            "name": "Opción 11: Ceviche de Champiñones y Panela (Vegetariano)",
            "ingredients": [
                { "name": "Champiñones frescos limpios picados", "quantity": "1 taza (100g)", "calories": 22, "carbs": 3.3, "protein": 2.2, "fat": 0.2 },
                { "name": "Queso panela fresco en cubitos", "quantity": "60g", "calories": 148, "carbs": 1.6, "protein": 10.8, "fat": 10.8 },
                { "name": "Jitomate, cebolla, cilantro, limón y pepino", "quantity": "1/2 taza", "calories": 15, "carbs": 3.2, "protein": 0.6, "fat": 0.1 },
                { "name": "Tostadas deshidratadas de maíz", "quantity": "2 piezas", "calories": 60, "carbs": 13, "protein": 1.5, "fat": 0.5 }
            ],
            "calories": 245, "carbs": 21.1, "protein": 15.1, "fat": 11.6
        },
        {
            "name": "Opción 12: Rollitos de Jamón de Pavo con Espárragos",
            "ingredients": [
                { "name": "Jamón de pechuga de pavo premium", "quantity": "4 rebanadas (80g)", "calories": 68, "carbs": 1.2, "protein": 13.6, "fat": 0.8 },
                { "name": "Espárragos delgados cocidos al vapor", "quantity": "6 piezas (60g)", "calories": 12, "carbs": 2.3, "protein": 1.3, "fat": 0.1 },
                { "name": "Queso crema untable light de adorno", "quantity": "1 cda (15g)", "calories": 30, "carbs": 1, "protein": 1.5, "fat": 2.3 }
            ],
            "calories": 110, "carbs": 4.5, "protein": 16.4, "fat": 3.2
        },
        {
            "name": "Opción 13: Tacos de Res en Tortilla de Nopal",
            "ingredients": [
                { "name": "Bistec de res picado asado", "quantity": "100g", "calories": 150, "carbs": 0, "protein": 22, "fat": 6.2 },
                { "name": "Tortillas con nopal adicionado", "quantity": "2 piezas", "calories": 40, "carbs": 8, "protein": 1.4, "fat": 0.4 },
                { "name": "Cebolla picada, cilantro y salsa verde tatemada", "quantity": "Al gusto", "calories": 10, "carbs": 2.2, "protein": 0.4, "fat": 0.1 }
            ],
            "calories": 200, "carbs": 10.2, "protein": 23.8, "fat": 6.7
        },
        {
            "name": "Opción 14: Ensalada Caprese Aligerada",
            "ingredients": [
                { "name": "Queso mozzarella fresco o panela light", "quantity": "60g", "calories": 150, "carbs": 1.5, "protein": 11, "fat": 11 },
                { "name": "Rodajas de jitomate bola maduro", "quantity": "1 pieza grande (120g)", "calories": 22, "carbs": 4.8, "protein": 1, "fat": 0.2 },
                { "name": "Hojas de albahaca fresca y vinagre balsámico", "quantity": "Al gusto", "calories": 10, "carbs": 2.1, "protein": 0.3, "fat": 0.1 }
            ],
            "calories": 182, "carbs": 8.4, "protein": 12.3, "fat": 11.3
        },
        {
            "name": "Opción 15: Pan Tostado Integral con Requesón y Pavo",
            "ingredients": [
                { "name": "Pan tostado integral horneado de caja", "quantity": "2 rebanadas", "calories": 138, "carbs": 24.8, "protein": 7.2, "fat": 2.2 },
                { "name": "Requesón cremoso bajo en sodio", "quantity": "50g", "calories": 69, "carbs": 1.5, "protein": 5.7, "fat": 4.2 },
                { "name": "Pechuga de pavo en finas rebanadas", "quantity": "2 piezas (40g)", "calories": 40, "carbs": 0.6, "protein": 8, "fat": 0.6 }
            ],
            "calories": 247, "carbs": 26.9, "protein": 20.9, "fat": 7
        },
        {
            "name": "Opción 16: Atún Sellado con Costra de Ajonjolí",
            "ingredients": [
                { "name": "Medallón de atún fresco de aleta amarilla", "quantity": "120g", "calories": 130, "carbs": 0, "protein": 28.8, "fat": 1.1 },
                { "name": "Semillas de ajonjolí blanco y negro", "quantity": "1 cda (10g)", "calories": 57, "carbs": 2.3, "protein": 1.8, "fat": 5 },
                { "name": "Ensalada verde (lechuga y pepino picado)", "quantity": "1.5 tazas", "calories": 18, "carbs": 3.8, "protein": 0.8, "fat": 0.1 }
            ],
            "calories": 205, "carbs": 6.1, "protein": 31.4, "fat": 6.2
        },
        {
            "name": "Opción 17: Pavo Molido con Ejotes Salteados",
            "ingredients": [
                { "name": "Carne molida de pavo premium cocinada", "quantity": "110g", "calories": 148, "carbs": 0, "protein": 24.2, "fat": 5.3 },
                { "name": "Ejotes tiernos cortados cocidos", "quantity": "1.5 tazas (150g)", "calories": 52, "carbs": 11.2, "protein": 2.7, "fat": 0.3 },
                { "name": "Aceite de oliva para saltear el pavo", "quantity": "1 cdita (5g)", "calories": 45, "carbs": 0, "protein": 0, "fat": 5 }
            ],
            "calories": 245, "carbs": 11.2, "protein": 26.9, "fat": 10.6
        },
        {
            "name": "Opción 18: Crema de Calabacitas Saludable (Sin Crema)",
            "ingredients": [
                { "name": "Calabacitas cocidas licuadas con caldo", "quantity": "2 tazas (300g)", "calories": 50, "carbs": 10.2, "protein": 3.6, "fat": 0.6 },
                { "name": "Yogur griego natural (para dar textura cremosa)", "quantity": "3 cdas (60g)", "calories": 36, "carbs": 2.2, "protein": 6, "fat": 0.2 },
                { "name": "Queso panela fresco en cubitos dentro de la crema", "quantity": "40g", "calories": 98, "carbs": 1, "protein": 7.2, "fat": 7.2 }
            ],
            "calories": 184, "carbs": 13.4, "protein": 16.8, "fat": 8
        },
        {
            "name": "Opción 19: Wrap de Atún en Alga Nori",
            "ingredients": [
                { "name": "Hojas de alga nori tradicional", "quantity": "2 piezas cuadradas", "calories": 10, "carbs": 1, "protein": 1.2, "fat": 0.1 },
                { "name": "Atún en agua escurrido de lata", "quantity": "1 lata (120g)", "calories": 116, "carbs": 0, "protein": 26, "fat": 0.8 },
                { "name": "Zanahoria rallada fina y pepino", "quantity": "1 taza", "calories": 31, "carbs": 6.8, "protein": 1, "fat": 0.1 },
                { "name": "Aguacate machacado para untar", "quantity": "30g", "calories": 48, "carbs": 2.7, "protein": 0.5, "fat": 4.5 }
            ],
            "calories": 205, "carbs": 10.5, "protein": 28.7, "fat": 5.5
        },
        {
            "name": "Opción 20: Gelatina Light con Queso Cottage",
            "ingredients": [
                { "name": "Gelatina cero azúcar preparada", "quantity": "1 taza (240g)", "calories": 10, "carbs": 0, "protein": 2, "fat": 0 },
                { "name": "Queso cottage bajo en grasa", "quantity": "100g", "calories": 80, "carbs": 3, "protein": 11, "fat": 1 }
            ],
            "calories": 90, "carbs": 3, "protein": 13, "fat": 1
        }
    ]
};
