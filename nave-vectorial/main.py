"""
tarea_nave_vectorial.py
Simulación interactiva 2D: nave espacial vectorial con rotación, avance y disparo.

Controles:
    A / Flecha Izquierda  -> girar a la izquierda
    D / Flecha Derecha    -> girar a la derecha
    W / Flecha Arriba     -> avanzar hacia la proa
    S / Flecha Abajo      -> retroceder (hacia la popa)
    Barra Espaciadora     -> disparar (cooldown 250 ms)
    ESC                   -> salir

Requiere: pip install pygame
Versión web: compilada con pygbag (WebAssembly) para ejecutarse en GitHub Pages.
"""

import asyncio
import math
import pygame

# ---------------------------------------------------------------------------
# 1. CONFIGURACIÓN GENERAL
# ---------------------------------------------------------------------------
ANCHO, ALTO = 800, 600
FPS = 60
COLOR_FONDO = (10, 10, 25)
COLOR_NAVE = (0, 220, 255)
COLOR_PROYECTIL = (255, 230, 80)
COLOR_TEXTO = (0, 220, 255)

VEL_ROTACION = math.radians(200)   # rad/s  (giro suave, independiente de los FPS)
VEL_NAVE = 220                     # px/s
VEL_PROYECTIL = 550                # px/s  (mayor que la nave)
VIDA_PROYECTIL = 1.5               # segundos
COOLDOWN_DISPARO = 250             # ms

# ---------------------------------------------------------------------------
# 2. MODELO LOCAL DE LA NAVE (centrado en el origen)
#    Proa en (0, -25). Las bases se eligieron para que el centroide
#    quede exactamente en (0, 0):  (0 - 18 + 18)/3 = 0,  (-25 + 12.5 + 12.5)/3 = 0
#    Así la rotación ocurre sobre su propio centroide.
# ---------------------------------------------------------------------------
MODELO_LOCAL = [
    (0, -25),     # proa (punta)
    (-18, 12.5),  # esquina trasera izquierda
    (18, 12.5),   # esquina trasera derecha
]


def transformar(modelo, angulo_rot, tx, ty):
    """Rota cada vértice del modelo local y lo traslada al espacio de pantalla.
       x' = x·cos(a) − y·sin(a) + tx
       y' = x·sin(a) + y·cos(a) + ty
    """
    c, s = math.cos(angulo_rot), math.sin(angulo_rot)
    return [(x * c - y * s + tx, x * s + y * c + ty) for x, y in modelo]


async def main():
    pygame.init()
    # Double Buffering: se dibuja en un buffer oculto y se intercambia con flip()
    pantalla = pygame.display.set_mode((ANCHO, ALTO), pygame.DOUBLEBUF)
    pygame.display.set_caption("Nave Vectorial")
    reloj = pygame.time.Clock()
    fuente = pygame.font.SysFont("consolas", 16)

    # Estado de la nave: posición inicial en el centro de la pantalla
    nave_x, nave_y = ANCHO / 2, ALTO / 2       # (400, 300)
    # theta = dirección de la proa en pantalla. -90° = apunta hacia arriba
    theta = -math.pi / 2

    # Lista dinámica de proyectiles: cada uno es un diccionario
    # {"x", "y", "vx", "vy", "vida"}
    proyectiles = []
    ultimo_disparo = -COOLDOWN_DISPARO

    corriendo = True
    while corriendo:
        dt = reloj.tick(FPS) / 1000.0   # segundos transcurridos en este frame

        # ---------------- Eventos ----------------
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                corriendo = False
            elif evento.type == pygame.KEYDOWN and evento.key == pygame.K_ESCAPE:
                corriendo = False

        teclas = pygame.key.get_pressed()

        # ---------------- 3. Rotación geométrica ----------------
        if teclas[pygame.K_a] or teclas[pygame.K_LEFT]:
            theta -= VEL_ROTACION * dt
        if teclas[pygame.K_d] or teclas[pygame.K_RIGHT]:
            theta += VEL_ROTACION * dt

        # ---------------- 4. Avance vectorial continuo ----------------
        if teclas[pygame.K_w] or teclas[pygame.K_UP]:
            nave_x += math.cos(theta) * VEL_NAVE * dt
            nave_y += math.sin(theta) * VEL_NAVE * dt
        if teclas[pygame.K_s] or teclas[pygame.K_DOWN]:
            nave_x -= math.cos(theta) * VEL_NAVE * dt
            nave_y -= math.sin(theta) * VEL_NAVE * dt
        # ---------------- Reto opcional: pantalla envolvente ----------------
        nave_x %= ANCHO
        nave_y %= ALTO

        # El modelo apunta hacia -Y (ángulo -90°), así que para alinear la proa
        # con theta se rota el modelo theta + 90°.
        angulo_modelo = theta + math.pi / 2
        vertices = transformar(MODELO_LOCAL, angulo_modelo, nave_x, nave_y)
        punta_x, punta_y = vertices[0]   # posición exacta de la proa en pantalla

        # ---------------- 5. Generación dinámica de proyectiles ----------------
        ahora = pygame.time.get_ticks()
        if teclas[pygame.K_SPACE] and ahora - ultimo_disparo >= COOLDOWN_DISPARO:
            proyectiles.append({
                "x": punta_x,
                "y": punta_y,
                "vx": math.cos(theta) * VEL_PROYECTIL,
                "vy": math.sin(theta) * VEL_PROYECTIL,
                "vida": VIDA_PROYECTIL,
            })
            ultimo_disparo = ahora

        # ---------------- 6. Ciclo de vida de los proyectiles ----------------
        for p in proyectiles:
            p["x"] += p["vx"] * dt
            p["y"] += p["vy"] * dt
            p["vida"] -= dt
        # Se conservan solo los que siguen dentro de 800x600 y con vida > 0
        proyectiles = [
            p for p in proyectiles
            if 0 <= p["x"] <= ANCHO and 0 <= p["y"] <= ALTO and p["vida"] > 0
        ]

        # ---------------- Dibujo (en el buffer oculto) ----------------
        pantalla.fill(COLOR_FONDO)
        for p in proyectiles:
            pygame.draw.circle(pantalla, COLOR_PROYECTIL, (int(p["x"]), int(p["y"])), 3)
        pygame.draw.polygon(pantalla, COLOR_NAVE, vertices, 2)

        info = (f"FPS: {reloj.get_fps():5.1f}   Proyectiles activos: {len(proyectiles)}   "
                f"Angulo: {math.degrees(theta) % 360:6.1f}°")
        pantalla.blit(fuente.render(info, True, COLOR_TEXTO), (10, 10))

        pygame.display.flip()   # intercambio de buffers
        await asyncio.sleep(0)  # cede el control al navegador (versión web)

    pygame.quit()


if __name__ == "__main__":
    asyncio.run(main())
