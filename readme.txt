Taller K6 Fakestore - Guia de ejecucion

Versiones
- k6 v1.7.1
- Windows PowerShell 5.1

Estructura relevante
- tests/login-load.test.js: script principal del ejercicio 1
- data/credentials.csv: credenciales parametrizadas
- config/config.js: base URL, ruta de login, umbrales y configuracion del escenario
- results/: reportes generados por k6

Ejecucion sugerida
1. Verificar que k6 este disponible con `k6 version`.
2. Ejecutar la prueba con `k6 run tests/login-load.test.js`.
3. Si es necesario ajustar la carga, sobrescribir variables de entorno, por ejemplo:
   - `LOGIN_RATE=25`
   - `LOGIN_DURATION=1m`
   - `LOGIN_PRE_ALLOCATED_VUS=80`
   - `LOGIN_MAX_VUS=150`
4. Revisar `results/login-summary.json` y `results/login-summary.html`.

Notas
- El escenario usa `constant-arrival-rate` para expresar la carga de forma directa.
- El escenario actual corre con margen por encima de 20 TPS y el script valida `http_reqs: rate>=20`.
- El objetivo funcional es autenticar contra `https://fakestoreapi.com/auth/login`.
- En esta version del API, un login exitoso puede responder con `201`, por eso el script acepta cualquier respuesta `2xx` valida con token.
- Los umbrales esperados son p95 menor a 1500 ms, tasa de error menor al 3% y TPS efectivo mayor o igual a 20.

Ejercicio 2
- El analisis de resultados debe documentarse aparte en `InformeResultados.doc`.
- La interpretacion debe diferenciar entre el p95 general y métricas especificas como `expected_response:true` cuando aplique.