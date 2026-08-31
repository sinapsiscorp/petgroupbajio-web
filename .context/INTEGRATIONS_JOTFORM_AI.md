# **Especificación de Integración: Jotform AI Agent & Backend Google Apps Script (SOT)**

Este documento describe la arquitectura de comunicación bidireccional entre **Jotform AI Agent (Recepción)**, el formulario de captura y el backend en **Google Apps Script** conectado a Google Sheets ("La Biblia").

## **1\. Diagrama de Flujo de Interacción**

\[ Usuario en Web / WhatsApp \]  
           │  
           ▼  
\[ Jotform AI Agent (Recepción) \]  
   ├── Consulta / Preguntas Frecuentes (Knowledge Base)  
   │  
   ├── Si el usuario dice "Ya soy cliente" / "Ya tengo registro":  
   │      └── GET /exec?whatsapp=477XXXXXXX ──\> \[ GAS: doGet() \]  
   │                                                 │  
   │                                                 ▼  
   │                                    \[ Busca en DW\_Directorio\_Clientes \]  
   │                                                 │  
   │                                    ┌────────────┴────────────┐  
   │                                    ▼                         ▼  
   │                            (status: encontrado)      (status: nuevo)  
   │                                    │                         │  
   │                    ┌───────────────┴───────────────┐  Ofrece formulario  
   │                    ▼                                ▼  
   │         Arma mensaje personalizado        Timbra solicitud de seguimiento  
   │         (nombre, última visita,           en DW\_Solicitudes ("Por confirmar")  
   │         mascotas reales)                  y notifica por correo a  
   │                    │                       contacto@petgroupbajio.com  
   │                    └───────────────┬────────────────┘  
   │                                    ▼  
   │                   (¿ya hay Pendiente < 6h para este cliente?)  
   │                    │                                │  
   │                   Sí: reutiliza token,      No: crea folio nuevo,  
   │                   avisa a recepción por     correo normal a  
   │                   correo que insistió       contacto@petgroupbajio.com  
   │                                    │  
   │                                    ▼  
   │                    Chat muestra el mensaje y cierra:  
   │                    "no es necesario llenar la solicitud..."  
   │  
   └── Solicitud de Cita / Nuevo Servicio (cliente nuevo o vía formulario):  
          └── Despliegue de Formulario de Captura  
                 │  
                 ▼  
          \[ Envío Formulario \] ──\> POST /exec ──\> \[ GAS: doPost() \]  
                                                         │  
                                        ┌────────────────┴────────────────┐  
                                        ▼                                 ▼  
                             \[ DW\_Solicitudes \]              \[ DW\_Directorio\_Clientes \]  
                             (Timbra con Token)              (Actualiza o Crea Récord)  

Nota: el formulario (`doPost`) no coteja si el WhatsApp ya pertenece a un cliente existente — ver pendiente 1 en la sección 5.  

## 2. Utilidad dentro del proyecto

Este documento es la referencia de arquitectura para la integración entre la experiencia pública, Jotform AI Agent (Recepción), Google Apps Script y Google Sheets ("La Biblia"). Se conserva separado de los playbooks operativos porque describe contratos de integración y no instrucciones de atención diaria.

Su función es documentar:

- qué datos captura el agente y el formulario;
- cuándo se consulta el directorio de clientes mediante `doGet()`;
- cómo se registra una nueva solicitud mediante `doPost()`;
- dónde se genera el `Token_Servicio` y qué hojas forman la fuente única de verdad.

## 3. Relación con la verificación de tokens

El token generado al registrar una solicitud alimenta el seguimiento posterior en `/verificar-token`.

- Cliente: consulta el estado de su servicio con el folio recibido.
- Operador: consulta el registro y actualiza el estatus con autorización interna.
- Administrador: verifica la trazabilidad en `DW_Solicitudes`, `DW_Directorio_Clientes` y `Debug_Logs`.

La página de verificación no sustituye a Jotform ni al webhook: es una capa posterior de seguimiento y operación.

## 4. Contratos actuales y dependencia pendiente

El backend (`integrations/appscript/BackendWebhook.gs`) actualmente expone:

- `GET /exec?whatsapp=...` — busca al cliente en `DW_Directorio_Clientes`. Si lo encuentra (`encontrado: true`), en la misma llamada:
  1. Arma un `mensaje` personalizado con nombre, fecha del último servicio y nombre real de mascotas (prioriza `Nombre_Mascotas` del Directorio, luego el de la última solicitud en `DW_Solicitudes`, luego la descripción genérica de raza/tamaño).
  2. Timbra automáticamente una solicitud de seguimiento en `DW_Solicitudes` (Cant_Mascotas y Raza_Tamanio = "Por confirmar"; Nombre_Mascotas = el detalle conocido) — sin depender de una segunda herramienta ni de que el chat continúe la conversación.
  3. Notifica por correo a `contacto@petgroupbajio.com` (vía `MailApp.sendEmail`, requiere el scope `script.send_mail` autorizado manualmente una vez en el editor de Apps Script).
  4. Aplica protección anti-duplicados: si el mismo `ID_Cliente` ya tiene una solicitud `Pendiente` en las últimas 6 horas, no crea fila ni correo nuevo — reutiliza el folio existente, deja rastro en `Debug_Logs`, y envía un correo distinto avisando que el cliente insistió (para que Karina/Dulce confirmen si ya fue atendido).
- `POST /exec` — recibe el webhook del formulario web, parsea el payload con `parseJotformPayload` (búsqueda por palabra clave sobre las llaves reales que Jotform genera, no coincidencia exacta — ver advertencia en `integrations/appscript/README.md`), genera el `Token_Servicio` y registra/actualiza en `DW_Directorio_Clientes` y `DW_Solicitudes`.
- `POST /exec` con `accion: "seguimiento_chat"` — herramienta alterna (no usada actualmente por el agente; el seguimiento automático del punto anterior la reemplazó) que permite registrar una solicitud de seguimiento vía una llamada POST explícita desde el chat.

Para que `/verificar-token` funcione contra datos reales, el despliegue de Google Apps Script debe soportar además:

- `GET /exec?token=...` para consultar una fila de `DW_Solicitudes`.
- `POST /exec` con `action: "update_status"` para actualizar el estatus después de validar la autorización del operador.

Mientras ese contrato no esté disponible en el despliegue activo, la página conserva un modo demo local. La URL se configura mediante `NEXT_PUBLIC_GAS_WEBHOOK_URL`; no se deben colocar secretos en variables `NEXT_PUBLIC_*`.

## 5. Pendientes activos (2026-08-30)

Documentados también en `.context/MASTER_PLAN_OPCION_B.md` (Hito 5):

1. **Clientes existentes vía formulario directo.** El `doPost` del formulario web no coteja contra `DW_Directorio_Clientes` antes de timbrar — un cliente recurrente que llena el formulario en vez de usar el chat se procesa igual que uno nuevo, sin la identificación ni el seguimiento automático que sí tiene el flujo de `doGet`. Falta definir la mecánica (¿bloquear duplicado, solo advertir, o cotejar y heredar datos igual que hace `procesarDirectorioClientes` para el WhatsApp?).
2. **Cotización y confirmación de pagos.** Las columnas `Importe_Cotizado`, `Importe_Cobrado`, `Medio_Pago` y `Fecha_Pago` (K-O de `DW_Solicitudes`, junto con `Nombre_Mascotas`) existen en el Sheet pero no tienen ningún mecanismo de escritura automatizado — es vital para el reporte financiero y la trazabilidad de la operación.
3. **Doble check-in con `Token_Servicio`.** El token se genera y se muestra, pero no hay ningún flujo que lo use para confirmar (a) que el operador atendió el servicio, y (b) que el cliente confirma conformidad y el monto cobrado. Esto se conecta directamente con el pendiente 2 (el segundo check-in debería validar contra `Importe_Cotizado`/`Importe_Cobrado`).

## 5. Documentos relacionados

- Flujo operativo: `.context/OPERATIONAL_FLOW.md`
- Reglas de negocio: `.context/BUSINESS_RULES.md`
- Plan maestro: `.context/MASTER_PLAN_OPCION_B.md`
- Pruebas y variables: `README.md`