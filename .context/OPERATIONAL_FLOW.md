# Flujo de Datos y Single Source of Truth (SOT)

1. **Frontend:** Usuario visita `petgroupbajio.com/doggy-wash` o hace clic en WhatsApp.
2. **Captura:** Jotform AI Agent recopila los datos mínimos.
3. **Webhook:** Jotform envía un payload JSON al endpoint de Google Apps Script.
4. **Almacenamiento (La Biblia):** Google Apps Script timbra la fila en Google Sheets ("DW_Servicios") con estatus "Pendiente".
5. **Recepción:** Karina o Dulce revisan la hoja, contactan al cliente y confirman la cita.

## Separación de la consulta pública y la operación interna

La ruta `/verificar-token` debe presentarse como un punto de seguimiento para clientes y visitantes, pero sin mezclar la experiencia pública con los controles operativos internos.

- La parte visible del cliente debe explicar qué es el folio, cómo se usa y qué puede consultar.
- La zona operativa debe estar claramente marcada como "Área interna" o "Operación".
- El PIN y la edición del estatus deben quedar dentro de la sección interna para dejar claro que requieren autorización del equipo.

## Mapa de uso recomendado

- Cliente / visitante: consulta folio, revisa estatus del servicio y confirma su cita.
- Operador / coordinación: actualiza estados, valida PIN y mantiene control del servicio.
- Administrador: revisa logs, confirma servicio y mantiene la fuente única de verdad en Google Sheets.

## Reglas operativas

- Nunca publicar el PIN o los datos internos en la vista pública.
- Mantener el flujo de consulta de servicio accesible sin volverse una herramienta de administración visible a ojos del cliente.
- Usar un estilo sobrio y diferenciado para la sección interna, con microetiquetas que identifiquen la zona operativa.

## Integración con Jotform AI Agent

La arquitectura completa de captura y consulta está documentada en `.context/INTEGRATIONS_JOTFORM_AI.md`. Ese documento debe consultarse cuando se modifique Jotform, el webhook o la estructura de Google Sheets.

El flujo operativo depende de esta secuencia:

1. Jotform AI Agent recopila los datos mínimos.
2. Google Apps Script registra la solicitud en `DW_Solicitudes` y genera `Token_Servicio`.
3. Recepción confirma la cita y comparte el token con el cliente.
4. El cliente usa `/verificar-token` para consultar el seguimiento.
5. El operador actualiza el estatus únicamente desde el área interna.

Antes de activar la verificación contra producción, validar que el despliegue GAS acepte `GET` por token y el `POST` de actualización descritos en `.context/INTEGRATIONS_JOTFORM_AI.md`.