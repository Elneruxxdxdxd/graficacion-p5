// ==============================================================================
// 1. CONFIGURACIÓN DEL CANVAS Y CENTRO DE PANTALLA
// ==============================================================================
const canvas = document.getElementById('lienzo3D');
const ctx = canvas.getContext('2d');
const CENTRO_X = canvas.width / 2;
const CENTRO_Y = canvas.height / 2;

// ==============================================================================
// 2. TEMAS 3.1 & 3.2: GEOMETRÍA TRIDIMENSIONAL (MODELOS LOCALES)
// ==============================================================================
// Todas las figuras están centradas en el origen (0,0,0).
// Cada primitiva se describe con:
//   - vertices: lista de puntos {x, y, z} en coordenadas locales
//   - aristas : matriz de conectividad (pares de índices de vértices)

// --- CUBO ORIGINAL (8 vértices, 12 aristas) -----------------------------------
const modeloCuboLocal = [
    {x: -80, y: -80, z: -80}, // V0: Inferior Trasero Izq
    {x:  80, y: -80, z: -80}, // V1: Inferior Trasero Der
    {x:  80, y:  80, z: -80}, // V2: Superior Trasero Der
    {x: -80, y:  80, z: -80}, // V3: Superior Trasero Izq
    {x: -80, y: -80, z:  80}, // V4: Inferior Frontal Izq
    {x:  80, y: -80, z:  80}, // V5: Inferior Frontal Der
    {x:  80, y:  80, z:  80}, // V6: Superior Frontal Der
    {x: -80, y:  80, z:  80}  // V7: Superior Frontal Izq
];

const aristasCubo = [
    // Cara Trasera (Z = -80)
    [0, 1], [1, 2], [2, 3], [3, 0],
    // Cara Frontal (Z = +80)
    [4, 5], [5, 6], [6, 7], [7, 4],
    // Aristas Longitudinales
    [0, 4], [1, 5], [2, 6], [3, 7]
];

// --- OPCIÓN A: PIRÁMIDE DE BASE CUADRADA (5 vértices, 8 aristas) --------------
// Base cuadrada en el plano Y = -80 y cúspide en Y = +80.
const modeloPiramideLocal = [
    {x: -80, y: -80, z: -80}, // V0: Base Trasera Izq
    {x:  80, y: -80, z: -80}, // V1: Base Trasera Der
    {x:  80, y: -80, z:  80}, // V2: Base Frontal Der
    {x: -80, y: -80, z:  80}, // V3: Base Frontal Izq
    {x:   0, y:  80, z:   0}  // V4: Cúspide (ápice)
];

const aristasPiramide = [
    // Contorno de la base
    [0, 1], [1, 2], [2, 3], [3, 0],
    // Aristas laterales hacia la cúspide
    [0, 4], [1, 4], [2, 4], [3, 4]
];

// --- OPCIÓN B: PRISMA TRIANGULAR (6 vértices, 9 aristas) ----------------------
// Triángulo equilátero (radio 90) en el plano XY, extruido a lo largo de Z.
const R_TRI = 90;
const SEN60 = Math.sin(Math.PI / 3); // ≈ 0.866
const modeloPrismaLocal = [
    {x: 0,              y:  R_TRI,     z: -80}, // V0: Trasero Superior
    {x: -R_TRI * SEN60, y: -R_TRI / 2, z: -80}, // V1: Trasero Inferior Izq
    {x:  R_TRI * SEN60, y: -R_TRI / 2, z: -80}, // V2: Trasero Inferior Der
    {x: 0,              y:  R_TRI,     z:  80}, // V3: Frontal Superior
    {x: -R_TRI * SEN60, y: -R_TRI / 2, z:  80}, // V4: Frontal Inferior Izq
    {x:  R_TRI * SEN60, y: -R_TRI / 2, z:  80}  // V5: Frontal Inferior Der
];

const aristasPrisma = [
    // Triángulo trasero (Z = -80)
    [0, 1], [1, 2], [2, 0],
    // Triángulo frontal (Z = +80)
    [3, 4], [4, 5], [5, 3],
    // Aristas longitudinales
    [0, 3], [1, 4], [2, 5]
];

// --- OPCIÓN C: OCTAEDRO (6 vértices, 12 aristas) ------------------------------
// Un vértice sobre cada semieje, a 110 unidades del origen.
const modeloOctaedroLocal = [
    {x:  110, y:    0, z:    0}, // V0: +X
    {x: -110, y:    0, z:    0}, // V1: -X
    {x:    0, y:  110, z:    0}, // V2: +Y (polo superior)
    {x:    0, y: -110, z:    0}, // V3: -Y (polo inferior)
    {x:    0, y:    0, z:  110}, // V4: +Z
    {x:    0, y:    0, z: -110}  // V5: -Z
];

const aristasOctaedro = [
    // Anillo ecuatorial (plano XZ)
    [0, 4], [4, 1], [1, 5], [5, 0],
    // Pirámide superior (hacia +Y)
    [2, 0], [2, 1], [2, 4], [2, 5],
    // Pirámide inferior (hacia -Y)
    [3, 0], [3, 1], [3, 4], [3, 5]
];

// --- CATÁLOGO DE PRIMITIVAS (opciones seleccionables) -------------------------
// Cada figura tiene su propio color dentro de la paleta "Atardecer neón".
const primitivas = {
    cubo:      { nombre: 'Cubo',                   vertices: modeloCuboLocal,     aristas: aristasCubo,     color: '#22d3ee' },
    piramide:  { nombre: 'Pirámide base cuadrada', vertices: modeloPiramideLocal, aristas: aristasPiramide, color: '#fb923c' },
    prisma:    { nombre: 'Prisma triangular',      vertices: modeloPrismaLocal,   aristas: aristasPrisma,   color: '#a3e635' },
    octaedro:  { nombre: 'Octaedro',               vertices: modeloOctaedroLocal, aristas: aristasOctaedro, color: '#e879f9' }
};

// Figura activa (se cambia con el selector del panel)
let figuraActual = 'piramide';
let modeloPrimitiva = primitivas[figuraActual].vertices;
let aristasPrimitiva = primitivas[figuraActual].aristas;

// ==============================================================================
// 3. TEMA 3.3: PIPELINE DE TRANSFORMACIONES TRIDIMENSIONALES
// ==============================================================================
// Orden: Escala -> Sesgado -> Rotación X -> Rotación Y -> Rotación Z -> Traslación
function transformarVertice3D(v, params) {
    let { tx, ty, tz, sx, sy, sz, rx, ry, rz, shxy, shxz } = params;

    // Convertir ángulos a radianes
    let radX = rx * Math.PI / 180;
    let radY = ry * Math.PI / 180;
    let radZ = rz * Math.PI / 180;

    // --- 3.3.2 ESCALAMIENTO (S) ---
    let x1 = v.x * sx;
    let y1 = v.y * sy;
    let z1 = v.z * sz;

    // --- 3.3.4 SESGADO / SHEAR (Sh) ---
    let x2 = x1 + (shxy * y1) + (shxz * z1);
    let y2 = y1;
    let z2 = z1;

    // --- 3.3.3 ROTACIÓN EN EJE X (Pitch) ---
    let x3 = x2;
    let y3 = y2 * Math.cos(radX) - z2 * Math.sin(radX);
    let z3 = y2 * Math.sin(radX) + z2 * Math.cos(radX);

    // --- 3.3.3 ROTACIÓN EN EJE Y (Yaw) ---
    let x4 = x3 * Math.cos(radY) + z3 * Math.sin(radY);
    let y4 = y3;
    let z4 = -x3 * Math.sin(radY) + z3 * Math.cos(radY);

    // --- 3.3.3 ROTACIÓN EN EJE Z (Roll) ---
    let x5 = x4 * Math.cos(radZ) - y4 * Math.sin(radZ);
    let y5 = x4 * Math.sin(radZ) + y4 * Math.cos(radZ);
    let z5 = z4;

    // --- 3.3.1 TRASLACIÓN (T) ---
    let xFinal = x5 + tx;
    let yFinal = y5 + ty;
    let zFinal = z5 + tz;

    return { x: xFinal, y: yFinal, z: zFinal };
}

// ==============================================================================
// 4. TEMA 3.1: PROYECCIÓN PERSPECTIVA (3D A PANTALLA 2D)
// ==============================================================================
// distanciaCamara se controla desde el panel (por defecto 500) para poder
// observar el efecto de la perspectiva (pregunta 1 del análisis).
let distanciaCamara = 500;

function proyectar3Da2D(v3d) {
    let zAjustado = v3d.z + distanciaCamara;
    if (zAjustado < 1) zAjustado = 1;

    // Factor de escala por perspectiva (división entre Z)
    let factorProyeccion = distanciaCamara / zAjustado;

    // Mapeo a píxeles en el lienzo
    let x2d = CENTRO_X + (v3d.x * factorProyeccion);
    let y2d = CENTRO_Y - (v3d.y * factorProyeccion); // Inversión en eje Y

    // Se conserva el factor para ajustar el grosor/tamaño según la profundidad
    return { x: x2d, y: y2d, f: factorProyeccion };
}

// ==============================================================================
// 5. BUCLE DE RENDERIZADO EN TIEMPO REAL
// ==============================================================================
function leerParametros() {
    const val = id => parseFloat(document.getElementById(id).value);
    return {
        tx: val('tx'), ty: val('ty'), tz: val('tz'),
        sx: val('sx'), sy: val('sy'), sz: val('sz'),
        rx: val('rx'), ry: val('ry'), rz: val('rz'),
        shxy: val('shxy'), shxz: val('shxz')
    };
}

function actualizarIndicadores(params) {
    document.getElementById('valTx').innerText = params.tx;
    document.getElementById('valTy').innerText = params.ty;
    document.getElementById('valTz').innerText = params.tz;
    document.getElementById('valSx').innerText = params.sx.toFixed(1);
    document.getElementById('valSy').innerText = params.sy.toFixed(1);
    document.getElementById('valSz').innerText = params.sz.toFixed(1);
    document.getElementById('valRx').innerText = params.rx + '°';
    document.getElementById('valRy').innerText = Math.round(params.ry) + '°';
    document.getElementById('valRz').innerText = params.rz + '°';
    document.getElementById('valShXY').innerText = params.shxy.toFixed(1);
    document.getElementById('valShXZ').innerText = params.shxz.toFixed(1);
    document.getElementById('valCam').innerText = distanciaCamara;
}

function dibujarEjes() {
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(CENTRO_X, 0); ctx.lineTo(CENTRO_X, canvas.height);
    ctx.moveTo(0, CENTRO_Y); ctx.lineTo(canvas.width, CENTRO_Y);
    ctx.stroke();
    ctx.setLineDash([]);
}

function renderizar() {
    // 1. Obtener parámetros del panel
    const params = leerParametros();
    distanciaCamara = parseFloat(document.getElementById('cam').value);

    // 2. Actualizar indicadores numéricos
    actualizarIndicadores(params);

    // 3. Limpiar lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 4. Dibujar ejes cartesianos de guía
    dibujarEjes();

    // 5. Aplicar transformaciones 3D a la figura activa
    let verticesTransformados = modeloPrimitiva.map(v => transformarVertice3D(v, params));

    // 6. Proyectar a coordenadas 2D
    let vertices2D = verticesTransformados.map(proyectar3Da2D);

    // 7. Renderizar aristas
    //    PERSONALIZACIÓN: el grosor depende de la escala promedio (Sx,Sy,Sz)
    //    y de la profundidad (factor de perspectiva): lo cercano es más grueso.
    const figura = primitivas[figuraActual];
    const escalaPromedio = (params.sx + params.sy + params.sz) / 3;
    const grosorBase = 2.5 * escalaPromedio;

    ctx.lineCap = 'round';
    ctx.shadowColor = figura.color;
    ctx.shadowBlur = 12;
    for (let arista of aristasPrimitiva) {
        let p1 = vertices2D[arista[0]];
        let p2 = vertices2D[arista[1]];
        let fMedio = (p1.f + p2.f) / 2;

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, figura.color);
        grad.addColorStop(1, '#fde68a');

        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.5, grosorBase * fMedio);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 8. Renderizar vértices (puntos dorados con borde, tamaño según profundidad)
    vertices2D.forEach((p, i) => {
        const r = Math.max(2, (3 + escalaPromedio * 1.5) * p.f);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#1a1033';
        ctx.stroke();

        // Etiqueta del índice del vértice
        ctx.fillStyle = '#f5f3ff';
        ctx.font = '11px Consolas, monospace';
        ctx.fillText('V' + i, p.x + r + 3, p.y - r - 2);
    });

    // 9. Leyenda de la figura
    ctx.fillStyle = figura.color;
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.fillText(figura.nombre, 16, 26);
    ctx.fillStyle = '#c4b5fd';
    ctx.font = '13px "Segoe UI", sans-serif';
    ctx.fillText(modeloPrimitiva.length + ' vértices · ' + aristasPrimitiva.length + ' aristas', 16, 46);
}

// ==============================================================================
// 6. SELECCIÓN DE FIGURA
// ==============================================================================
function seleccionarFigura(clave) {
    figuraActual = clave;
    modeloPrimitiva = primitivas[clave].vertices;
    aristasPrimitiva = primitivas[clave].aristas;

    document.querySelectorAll('.btn-figura').forEach(b => {
        b.classList.toggle('activo', b.dataset.figura === clave);
    });
    renderizar();
}

document.querySelectorAll('.btn-figura').forEach(boton => {
    boton.addEventListener('click', () => seleccionarFigura(boton.dataset.figura));
});

// ==============================================================================
// 7. RETO: AUTO-ROTACIÓN SOBRE EL EJE Y (YAW) CON requestAnimationFrame
// ==============================================================================
let autoRotando = false;
let idAnimacion = null;
let ultimoTiempo = null;
const botonAuto = document.getElementById('btnAutoRotar');
const sliderRy = document.getElementById('ry');

function animarRotacion(tiempo) {
    if (!autoRotando) return;

    if (ultimoTiempo === null) ultimoTiempo = tiempo;
    const dt = (tiempo - ultimoTiempo) / 1000; // segundos desde el último cuadro
    ultimoTiempo = tiempo;

    // Velocidad en grados por segundo (control del panel)
    const velocidad = parseFloat(document.getElementById('vel').value);
    let ry = parseFloat(sliderRy.value) + velocidad * dt;

    // Mantener el ángulo dentro del rango del deslizador [-180, 180]
    if (ry > 180) ry -= 360;
    if (ry < -180) ry += 360;
    sliderRy.value = ry;

    renderizar();
    idAnimacion = requestAnimationFrame(animarRotacion);
}

botonAuto.addEventListener('click', () => {
    autoRotando = !autoRotando;
    botonAuto.textContent = autoRotando ? '⏸ Detener Auto-Rotación' : '▶ Auto-Rotación (Yaw)';
    botonAuto.classList.toggle('activo', autoRotando);

    if (autoRotando) {
        ultimoTiempo = null;
        idAnimacion = requestAnimationFrame(animarRotacion);
    } else {
        cancelAnimationFrame(idAnimacion);
    }
});

document.getElementById('vel').addEventListener('input', e => {
    document.getElementById('valVel').innerText = e.target.value + '°/s';
});

// Escuchar cambios en los deslizadores para refrescar en tiempo real
document.querySelectorAll('input[type=range]').forEach(input => {
    input.addEventListener('input', renderizar);
});

// Ejecución inicial
seleccionarFigura(figuraActual);
