# Reflexión de resultados

## 1. Panorama general
Se ejecutó una prueba de carga sobre el servicio de login, con el objetivo de evaluar su comportamiento en términos de throughput, latencia y estabilidad bajo condiciones controladas.

## 2. Resultados de la prueba de carga
La prueba mostró un comportamiento estable y consistente del sistema. Se alcanzó un throughput de aproximadamente 22–25 solicitudes por segundo, superando el mínimo requerido de 20 TPS.

**Señalamientos clave:**

- 0 fallos en validaciones funcionales (checks)
- Tasa de error inferior al 1%
- Tiempo de respuesta promedio cercano a 330 ms
- p95 alrededor de 356 ms, muy por debajo del umbral de 1.5 s

Esto indica que el sistema responde correctamente y mantiene un buen desempeño bajo carga moderada.

## 3. Interpretación de resultados
El sistema es capaz de sostener el throughput requerido con baja latencia y sin degradación significativa en la respuesta. Además, logra mantener estabilidad en las respuestas y consistencia en las validaciones funcionales.

**Lectura técnica:**

- El uso de un escenario `constant-arrival-rate` permitió validar correctamente el TPS objetivo.
- La baja latencia indica que el servicio no presenta cuellos de botella evidentes bajo la carga aplicada.
- La baja tasa de error confirma estabilidad en el procesamiento de solicitudes concurrentes.

## 4. Conclusión
El sistema evaluado cumple con los criterios de rendimiento definidos en la prueba de carga, demostrando capacidad para manejar el volumen de solicitudes requerido con tiempos de respuesta adecuados y una tasa de error mínima.

**Conclusión final:**
El servicio de login presenta un buen nivel de rendimiento y estabilidad bajo las condiciones evaluadas, siendo apto para soportar el nivel de carga definido en el ejercicio.

