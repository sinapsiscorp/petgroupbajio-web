# **Especificación de Integración: Jotform AI Agent & Backend Google Apps Script (SOT)**

Este documento describe la arquitectura de comunicación bidireccional entre **Jotform AI Agent (Jackie 2.0)**, el formulario de captura y el backend en **Google Apps Script** conectado a Google Sheets ("La Biblia").

## **1\. Diagrama de Flujo de Interacción**

\[ Usuario en Web / WhatsApp \]  
           │  
           ▼  
\[ Jotform AI Agent (Jackie 2.0) \]  
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
   │                        Saluda con nombre y datos      Ofrece formulario  
   │  
   └── Solicitud de Cita / Nuevo Servicio:  
          └── Despliegue de Formulario de Captura  
                 │  
                 ▼  
          \[ Envío Formulario \] ──\> POST /exec ──\> \[ GAS: doPost() \]  
                                                         │  
                                        ┌────────────────┴────────────────┐  
                                        ▼                                 ▼  
                             \[ DW\_Solicitudes \]              \[ DW\_Directorio\_Clientes \]  
                             (Timbra con Token)              (Actualiza o Crea Récord)  

## 2. Utilidad dentro del proyecto

Este documento es la referencia de arquitectura para la integración entre la experiencia pública, Jotform AI Agent (Jackie 2.0), Google Apps Script y Google Sheets ("La Biblia"). Se conserva separado de los playbooks operativos porque describe contratos de integración y no instrucciones de atención diaria.

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

El backend documentado actualmente expone:

- `GET /exec?whatsapp=...` para buscar clientes en `DW_Directorio_Clientes`.
- `POST /exec` para recibir solicitudes, generar tokens y registrar datos.

Para que `/verificar-token` funcione contra datos reales, el despliegue de Google Apps Script debe soportar además:

- `GET /exec?token=...` para consultar una fila de `DW_Solicitudes`.
- `POST /exec` con `action: "update_status"` para actualizar el estatus después de validar la autorización del operador.

Mientras ese contrato no esté disponible en el despliegue activo, la página conserva un modo demo local. La URL se configura mediante `NEXT_PUBLIC_GAS_WEBHOOK_URL`; no se deben colocar secretos en variables `NEXT_PUBLIC_*`.

## 5. Documentos relacionados

- Flujo operativo: `.context/OPERATIONAL_FLOW.md`
- Reglas de negocio: `.context/BUSINESS_RULES.md`
- Plan maestro: `.context/MASTER_PLAN_OPCION_B.md`
- Pruebas y variables: `README.md`