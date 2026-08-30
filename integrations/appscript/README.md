# Doggy Wash — Backend Google Apps Script (Jotform ↔ Sheets)

Documento de Control: **IMP-2026-PGB-GAS-V6**

Integra el formulario de Jotform (webhook POST) y el chatbot/AI Agent de Jotform (consulta GET) con el Sheet "Agenda Digital Doggy" como fuente única de verdad (SOT), a través de `BackendWebhook.gs`.

Este archivo vive en dos lugares que **deben mantenerse idénticos**:
- `integrations/appscript/BackendWebhook.gs` (repo — fuente de verdad versionada)
- El editor de Apps Script vinculado al Sheet real (`Sample.gs` en el Drive del usuario) — **es el único que Jotform ejecuta**. Cualquier cambio aquí debe copiarse manualmente allá y volver a implementarse (Implementar → Administrar implementaciones → Editar → Versión → Nueva versión → Implementar) para que tome efecto en la URL pública.

## Estado actual (2026-08-30): funcional al 100%, con 1 pendiente menor

### Resuelto — Sincronización de scripts
El documento real (`Sample.gs`) estaba desactualizado respecto al repo: usaba `extractField` con llaves exactas fijas (`q1_phone`, `q2_numero_mascotas`, etc.) que no coincidían con las llaves reales que genera Jotform (`q4_q1_phone`, `q73_q2_numero_mascotas`, `q90_q3_raza_tamano`, `q51_q4_domicilio`). Además no tenía la pestaña `Debug_Logs`, lo que impedía diagnosticar. Se igualó `Sample.gs` al contenido del repo.

### Resuelto — Cruce de llaves en el parser (`parseJotformPayload`)
Los filtros `k.indexOf("q1"/"q2"/"q3"/"q4")` provocaban falsos positivos: p. ej. `q4_q1_phone` contiene el substring `"q4"`, así que la llave de teléfono también entraba al bloque de domicilio y lo pisaba con un valor vacío antes de que la llave real (`q51_q4_domicilio`) pudiera aplicarse. Se eliminaron esos checks por número de pregunta; ahora cada campo se identifica solo por palabra clave semántica (`phone`/`whats`/`tel`, `enano`/`cant`/`numero`/`mascota`, `raza`/`tamano`, `direcc`/`domicilio`/`address`), que sí es específica con las llaves reales del formulario.

### Resuelto — Nombre de contacto devolvía `[object Object]`
Cuando el campo de nombre de Jotform (`q3_q3_fullname1`) llegaba con `first`/`last` vacíos, el código hacía `.toString()` sobre el objeto completo. Ahora, si no hay `first`/`last` con contenido, se conserva el default `"Cliente por Confirmar"`.

### Resuelto — Domicilio no se completaba
Además del cruce de llaves de arriba, se agregó `state` a las partes armadas del objeto de dirección (Jotform Address widget: `addr_line1`, `addr_line2`, `city`, `state`, `postal`), y ya no se sobreescribe el default con un string vacío si el objeto no aporta ninguna parte útil.

### Resuelto — `doGet` (consulta del AI Agent) sin campo `encontrado` ni mensaje dinámico
El prompt del agente de Jotform esperaba un campo `encontrado` (booleano) que el backend nunca devolvía, y el `mensaje` era un texto fijo genérico. Ahora `doGet` siempre incluye `encontrado: true/false`, y cuando hay match arma un `mensaje` dinámico tipo: *"Claro, eres {nombre}. Tu último servicio fue el {fecha} y solicitaste servicio para {mascotas}."*

### Resuelto — Herencia de datos del cliente en solicitudes recurrentes (`doPost` + `procesarDirectorioClientes`)
Antes, si un cliente ya identificado pedía seguimiento vía chat sin repetir domicilio/mascotas, la fila nueva en `DW_Solicitudes` quedaba con los placeholders (`"No especificado"` / `"Por confirmar en llamada"`) en vez de sus datos ya conocidos. `procesarDirectorioClientes` ahora retorna `{id, nombre, domicilio, mascotas}` con los valores efectivos (nuevos si llegaron, heredados del Directorio si no), y `doPost` los usa al timbrar la solicitud.

### ⚠️ Pendiente — El chat no confirma la solicitud al cliente tras el POST
**Síntoma:** al ejecutar la herramienta POST desde el chatbot, la fila se inserta correctamente en `DW_Solicitudes` (confirmado en Sheets) y el `doGet` previo sí devuelve y muestra el `mensaje` de identificación del cliente — pero después de eso el chat se queda estático: no le informa al cliente que su solicitud fue registrada ni que Karina/Dulce lo contactarán en breve.

**Diagnóstico parcial:** en las pruebas manuales con `curl` contra la URL del webhook, la respuesta del POST se recibe como HTML (página intermedia de Google, no el JSON esperado) a pesar de que "Quién tiene acceso" ya está en "Cualquier persona". El acceso desde Sheets confirma que el `doPost` sí se ejecuta y sí escribe la fila, así que no es un bloqueo total — probablemente la respuesta JSON no está llegando de vuelta al agente de Jotform de forma que este la pueda leer y actuar sobre ella (a diferencia del GET, que si funciona end-to-end incluyendo el mensaje de vuelta).

**Próximo paso:** revisar en la herramienta POST de Jotform si tiene configurado un "Mensaje de ejecución de la API" con una variable dinámica del campo de respuesta (igual que se hizo para el GET con `{{mensaje}}`), y agregar una instrucción explícita al agente para que, tras ejecutar el POST exitosamente, le confirme al cliente: *"Listo, tu solicitud quedó registrada. En breve Karina o Dulce te contactarán para confirmar los detalles."* — sin depender de que el chatbot interprete la respuesta cruda del POST.

## Payload real observado desde Jotform (referencia para futuros ajustes de parser)

Ejemplo de llaves reales que manda el formulario (vía `rawRequest`):

```json
{
  "q4_q1_phone": { "full": "(477) 575-6361" },
  "q3_q3_fullname1": { "first": "", "last": "" },
  "q73_q2_numero_mascotas": "3",
  "q90_q3_raza_tamano": "2 doberman y 1 siamés",
  "q51_q4_domicilio": {
    "addr_line1": "Loma del Pedregal 206",
    "addr_line2": "Lomas del Campestre",
    "city": "León de los Aldama",
    "state": "Guanajuato",
    "postal": "37150"
  }
}
```

## Estructura de Sheets

- **DW_Solicitudes**: `Token_Servicio, Fecha_Solicitud, Estatus, ID_Cliente, Nombre_Contacto, WhatsApp_Principal, Domicilio_Colonia, Cant_Mascotas, Raza_Tamanio, Operador_Asignado`
- **DW_Directorio_Clientes**: `ID_Cliente, Nombre_Cliente, WhatsApp_Principal, Telefono_Secundario, Domicilio_Habitual, Mascotas_Registradas, Total_Servicios, Ultima_Visita`
- **Debug_Logs**: `Timestamp, rawPayloadString` — se crea automáticamente en cada `doPost`, clave para diagnosticar qué llaves manda Jotform realmente.

## Configuración en Jotform AI Agent

### Herramienta GET — Identificar cliente existente
- Método: `GET`, URL: la del despliegue activo (`/exec`)
- Parámetro (Valores generados por IA): key `whatsapp`, prompt "Número de WhatsApp a 10 dígitos que el usuario proporcionó durante la conversación, sin espacios ni caracteres especiales"
- "Mensaje de ejecución de la API": variable dinámica `{{mensaje}}` del campo de respuesta (no texto fijo)
- Instrucción del agente:
  > Cuando el usuario indique que ya ha contratado servicios antes, que no es su primera vez, o que ya tiene un registro con nosotros, utiliza esta herramienta para buscar su información.
  >
  > Antes de ejecutar la búsqueda, asegúrate de tener su número de WhatsApp a 10 dígitos sin espacios ni caracteres especiales. Si el usuario lo proporciona con formato diferente, pídele que lo repita solo con números.
  >
  > Una vez que tengas el número, ejecuta la búsqueda inmediatamente y espera la respuesta de la API antes de responder al usuario. No generes ningún mensaje propio mientras esperas. Cuando recibas la respuesta, muestra el campo mensaje exactamente como viene, sin modificarlo ni resumirlo. No agregues texto adicional antes ni después.
  >
  > El campo mensaje ya contiene el nombre del cliente, la fecha de su último servicio y las mascotas registradas — no repitas ni combines esa información con otros campos de la respuesta (nombre, ultimaVisita, mascotasRegistradas, etc.), esos campos son solo de referencia interna.
  >
  > Si el campo encontrado es false, informa amablemente que no encontraste el registro y ofrece continuar como cliente nuevo.

### Herramienta POST — Registrar solicitud de seguimiento (cliente recurrente)
- Método: `POST`, misma URL del webhook
- Parámetro mínimo: key `whatsapp` (mismo prompt que en GET)
- Opcional: keys `cant_mascotas` / `direccion` con prompt "solo si el cliente menciona un cambio para este servicio, si no, deja vacío" — el backend hereda del Directorio si no llegan.
- **Pendiente de completar la confirmación al cliente tras la ejecución** (ver sección de pendientes arriba).
