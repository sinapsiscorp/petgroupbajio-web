# Plan: conectar `/verificar-token` a datos reales

**Estado (2026-09-25):** Fase 1 y Fase 2 ya tienen diff preparado en el repo (`integrations/appscript/BackendWebhook.gs` y `src/app/verificar-token/page.jsx`), **sin desplegar** — Ulises pega el `.gs` a mano y hace "Versión nueva", y configura `NEXT_PUBLIC_GAS_WEBHOOK_URL` en Vercel. Fase 3 sigue siendo propuesta, sin implementar. Corresponde al pendiente 7/8 de `.context/APPSHEET_SETUP_PLAYBOOK.md` sección 1.12.

**Decisión de la junta (2026-09-25):** check-in del operador = **Opción A** — el operador se registra solo desde el sitio con folio + PIN (inciso c, opción 1: columna nueva `Fecha_Llegada_Operador`, ya no es la recomendación "híbrido", es la elección final). No se usa `update_status` para esto — `action:"check_in"` es una acción dedicada, sin tocar `Estatus` ni el enum.

## 0. Punto de partida (lo que ya existe)

`src/app/verificar-token/page.jsx` funciona hoy en **modo demo local** (datos inventados cuando `NEXT_PUBLIC_GAS_WEBHOOK_URL` no está configurada). Dos hallazgos al leer el código actual, relevantes para cualquier implementación futura:

- El PIN actual (el PIN escrito en page.jsx) está comparado **en el cliente** contra un valor fijo en el código fuente, visible en el bundle de JS de cualquiera que abra la página.
- Los botones de estatus dicen **"En Ruta"** y **"Finalizado"** — pero el enum oficial (`.context/BUSINESS_RULES.md`) es `Pendiente / Confirmado / En Ruta / Completado / Cancelado`. `"Finalizado"` **no es un valor válido**; si esta pantalla llegara a escribir ese texto tal cual en `Estatus`, rompería el contrato con GAS y AppSheet. Cualquier implementación debe corregir la etiqueta a `"Completado"` (o a lo que realmente haga, ver inciso (c)).

## a) El PIN: moverlo a Script Properties y validarlo en el servidor

- **Guardar el PIN** en `PropertiesService.getScriptProperties()` del GAS (ej. clave `PIN_OPERADOR`), no en el código del repo ni en el bundle del sitio. Se puede rotar sin volver a implementar una versión del script.
- **Validar solo en el servidor:** el handler de `action:"update_status"` (o el nuevo `"check_in"`, ver inciso c) compara el PIN recibido contra el guardado y responde genérico (`"PIN incorrecto"`) sin filtrar el valor real. El checkeo actual en el cliente puede quedarse como retroalimentación rápida de UX, pero **nunca como el único candado** — hoy lo es.
- **Riesgo no cubierto por "mover el PIN":** un PIN de 4 dígitos son 10,000 combinaciones, triviales de fuerza-bruta contra un endpoint público sin límite de intentos. Recomendación mínima: contar intentos fallidos por token (o por IP, si el runtime lo permite) en una ventana corta y bloquear tras N fallos — puede apoyarse en `Debug_Logs` o una hoja/`CacheService` ligera. No es parte de lo pedido pero es una brecha real que vale la pena señalar antes de activar esto en producción.
- **¿Un PIN compartido o uno por operador?** Hoy `Operador_Asignado` es texto libre en AppSheet sin autenticación real. Para v1, un solo PIN compartido (como ya asume el diseño actual) es consistente con ese nivel de control; migrar a PIN por operador es una mejora posterior, no bloqueante.

## b) Contratos `GET ?token=` y `POST action:"update_status"`

**`GET /exec?token=DW-AAMMDD-XXXX`** (sin PIN — es la vista de cliente):

- Respuesta mínima, pensada para no exponer más de lo que un cliente necesita ver: `status` (`"encontrado" | "no_encontrado" | "error"`), `token`, `estatus`, `fechaServicio`, `franjaHoraria`, `colonia` (no domicilio completo), `mascotas` (descripción, no datos del cliente), `operador` (nombre de pila). **No** incluir WhatsApp, domicilio completo, `Importe_Cotizado`/`Importe_Cobrado` — esos son de uso interno y ya los tiene quien opera en AppSheet; no hace falta duplicarlos aquí. Esto responde el pendiente abierto en el playbook 1.10 ("qué datos ve el cliente y cuáles solo el operador") con una regla simple: el GET siempre devuelve el subconjunto mínimo, sin una variante "operador" adicional — quien necesita más detalle ya lo tiene en AppSheet.

**`POST /exec` con `action:"update_status"`** (requiere PIN):

- Payload: `{ action: "update_status", token, nuevoEstatus, pin }` (ya es lo que manda el front hoy en modo demo).
- El servidor debe validar, en este orden: PIN correcto → el token existe → `nuevoEstatus` es una transición válida desde el `Estatus` actual (reutilizar el enum y el orden de `.context/BUSINESS_RULES.md`, no aceptar cualquier string).
- **Conflicto real a resolver antes de tocar código:** en AppSheet, pasar a `Completado` está atado a capturar `Importe_Cobrado`/`Medio_Pago` (la acción "Registrar cobro y completar", con el fix D-4 ya verificado). Si `/verificar-token` también pudiera escribir `Completado` sin pasar por ese formulario, se rompe la trazabilidad financiera que AppSheet sí protege. **Recomendación:** en esta fase, limitar `nuevoEstatus` desde el sitio a `"En Ruta"` únicamente, y dejar `"Completado"` como responsabilidad exclusiva de AppSheet (donde vive el cobro). Si más adelante se quiere cerrar el ciclo desde el sitio, habría que replicar la captura de cobro ahí también — mejor evaluarlo por separado.

## c) Registrar la llegada real del operador (check-in), sin agregar estatus nuevos

**El hueco de hoy:** `En Ruta` lo marca recepción en AppSheet al mandar el WhatsApp de ruta — no el operador al llegar al domicilio. La llegada real no queda registrada en ningún lado (ver playbook 1.10, "Sobre el doble check-in").

Tres opciones, sin tocar el enum de `Estatus` (que ya es un contrato fijo entre 3 escritores):

1. **Columna nueva `Fecha_Llegada_Operador` (col R, timestamp) en `DW_Solicitudes`, poblada por un `action:"check_in"` separado de `update_status`.** Es un dato puramente observacional/de auditoría, no cambia el flujo verificado. Requiere que `doPost`/`registrarSeguimientoChat`/`registrarSolicitudSeguimiento` sigan escribiendo sus arreglos actuales sin tocarlos (siguen sin llenar la R), y que el nuevo handler escriba con `getRange(fila, 18).setValue(...)` puntual — no ensanchar los `appendRow` existentes.
2. **Reusar `update_status` con `nuevoEstatus:"En Ruta"` como la señal de llegada**, es decir, que sea el operador (no recepción) quien dispare `En Ruta` al llegar. Resuelve el hueco sin columna nueva, pero cambia quién es responsable de ese paso — es una decisión de operación/negocio, no solo técnica, y le quita a recepción el control del aviso de WhatsApp salvo que se separe en un paso aparte.
3. **Híbrido (recomendado):** dejar el flujo de AppSheet tal cual está (ya verificado end-to-end, sección 3 del playbook) y agregar la columna de la opción 1 solo para el check-in físico del operador, desacoplado del `Estatus`. Es lo de menor riesgo: no toca nada que ya funciona y que depende de la demo de mañana.

## Riesgos generales a tener presentes

- **Ventana de desincronización:** el GAS se despliega a mano (copiar a `Sample.gs` y "Nueva versión"); si el sitio (Vercel, deploy automático) sale antes de que el GAS tenga el contrato nuevo, `/verificar-token` fallaría en silencio contra el despliegue viejo.
- **Terminología inconsistente ya presente:** el botón "Finalizado" del código actual no corresponde a ningún valor del enum — hay que corregirlo al implementar, no solo conectar el backend.
- **Brute-force de PIN** contra un endpoint público (ver inciso a).
- **Cambiar cualquier contrato sin volver a probar** rompe algo que hoy nadie notaría (la página vive en modo demo) hasta que alguien lo use en producción real.

## Plan por fases

**Fase 1 — solo lectura, riesgo bajo. ✅ Diff listo (2026-09-25), sin desplegar.** `GET ?token=...` en `doGet` (función `consultarPorToken`) devuelve el subconjunto cliente-seguro (inciso b): `status`, `token`, `estatus`, `fechaServicio`, `franjaHoraria`, `colonia`, `mascotas`, `operador`. No toca `doPost` ni `Estatus`. El front (`page.jsx`) ya usaba la condición correcta (`gasWebhookUrl.includes("TU_DEPLOYMENT_ID")`) para salir de modo demo — no requirió cambio. Se corrigió además la etiqueta de estatus "Finalizado" → "Completado" (no era un valor válido del enum) en el badge y en el botón de `update_status`.

- **Limitación conocida — `colonia`:** `DW_Solicitudes` no tiene columna propia de colonia, solo `Domicilio_Colonia` (G) con la dirección completa en texto libre. `extraerColonia()` asume el formato típico "calle, colonia, ciudad, estado, CP" y toma el segundo segmento; si el domicilio no trae comas, devuelve un genérico en vez de arriesgar exponer la dirección completa. Si esto da resultados pobres en producción, la solución de fondo es una columna `Colonia` dedicada (captura separada en el formulario/AppSheet), no un parseo más agresivo del texto libre.

**Fase 2 — check-in del operador, sin tocar `Estatus`. ✅ Diff listo (2026-09-25), sin desplegar.** Opción A/opción 1 del inciso (c), ya decidida en junta:

- Columna nueva **R (`Fecha_Llegada_Operador`)** en `DW_Solicitudes`, timestamp puramente observacional.
- `POST /exec` con `action:"check_in"` (función `manejarCheckIn`): valida PIN → el token existe → escribe con `getRange(fila, 18).setValue(new Date())` puntual, sin tocar los `appendRow` existentes.
- **PIN movido a Script Properties** (clave `PIN_OPERADOR`, se lee con `PropertiesService.getScriptProperties()`), nunca en el código ni en el bundle — esto también resuelve el punto (a) de este documento. **Ulises debe crear esa Script Property manualmente en el editor de Apps Script antes de que el check-in funcione**; sin ella, el endpoint responde error controlado en vez de fallar.
- **Límite de intentos fallidos:** `CacheService.getScriptCache()`, 5 intentos por token en una ventana de 15 minutos; al agotarse, bloquea con mensaje genérico. Resuelve el riesgo de fuerza-bruta señalado en el inciso (a).
- Front: botón **"Marcar llegada"** separado del badge de estatus y de los botones de `update_status` (que siguen bloqueados por el guard de la Tarea 1 — no se tocaron ni se reutilizaron).
- El guard de la Tarea 1 para `check_in` ya no responde error genérico: ejecuta `manejarCheckIn` directamente. El guard de `update_status` se queda como está.

**Probado en producción (2026-09-25)** contra la implementación real (folio `DW-260906-9934`): `GET ?token=` devuelve el subconjunto correcto; `check_in` con PIN incorrecto bloquea sin escribir; `check_in` con PIN correcto escribe el timestamp completo en columna R (verificado en la barra de fórmulas del Sheet; la celda solo *mostraba* la fecha sin hora por el formato de columna heredado — formatear R como "Fecha y hora" en Sheets si se quiere ver completo).

**Pendiente de verificar en AppSheet (Ulises, después del commit — no tocar desde el repo):**
- Columna `Fecha_Llegada_Operador` (R) no está en ninguna vista, acción ni Bot de AppSheet a propósito — es puramente observacional, así se diseñó (no debería requerir nada). Confirmar en *Data → Columns* que AppSheet la detectó (correr "Regenerate Structure" si no aparece) y volver a correr el "Deployment Check" para confirmar que no salió ningún error nuevo.
- Si se decide mostrarla en alguna vista (p. ej. detalle de una cita, para que Karina/Dulce vean si el operador ya llegó), es una decisión de AppSheet aparte — no estaba en el alcance de este brief.
- Confirmar que `NEXT_PUBLIC_GAS_WEBHOOK_URL` esté configurada en Vercel (Settings → Environment Variables) con la URL de este despliegue, y hacer redeploy si se agrega o cambia (las variables `NEXT_PUBLIC_*` se inyectan en build time).

**Fase 3 — ideas pendientes de decisión (no implementar).** Buenas ideas de Ulises que implican decisiones de producto/costo que no se resuelven en una sesión de código:

- **Notificación automática al cliente al Confirmar** (WhatsApp/correo) con opción de cancelar desde ahí — requiere un proveedor de mensajería (Twilio o similar), no está montado.
- **Que el operador reporte retraso / "voy en camino"** desde el sitio, sin necesitar una cuenta plena de AppSheet — es la evolución natural de la Fase 2 una vez que exista una identidad real del operador en el sistema (hoy `Operador_Asignado` es texto libre, no una cuenta).
- **Aviso al cliente de que su token es la garantía del servicio**, como blindaje contra pagos "por fuera" al operador — depende de que la notificación automática ya exista.
- **Bot automático (plan Core) para mover a `Completado`** sin el tap manual — ya está anotado en `.context/MASTER_PLAN_OPCION_B.md`, sigue pendiente de que Ulises autorice el plan.
- **Habilitar `update_status` limitado a `"En Ruta"`** (dejar `"Completado"` exclusivo de AppSheet, por la trazabilidad financiera que protege el fix D-4) — el guard de la Tarea 1 sigue bloqueando esta acción por completo; no se implementa sin decisión explícita.

No se implementa nada de la Fase 3 sin autorización explícita de Ulises.
