# **Plan de Implementación Técnica y Operativa: Opción B (Piloto Doggy Wash \+ Hub Corporativo)**

**Cliente:** Pet Group Bajío (*Doggy Wash, Pets Eternity, Pet Hotel, Vet for Pets*)

**Consultor / Desarrollador:** Impletech AI

**Documento de Control:** IMP-2026-PGB-MASTER-V6

**URL de Producción (Vercel):** https://petgroupbajio-web.vercel.app

**Repositorio GitHub:** sinapsiscorp/petgroupbajio-web

## **🧭 Resumen de Navegación por Hitos**

| Hito | Nombre del Hito | Estado | Objetivo Principal |
| :---- | :---- | :---- | :---- |
| **Hito 0** | Configuración Local & Contexto | 🟢 **COMPLETADO** | Next.js inicializado y .context/ creado |
| **Hito 1** | GitHub & Despliegue CI/CD en Vercel | 🟢 **COMPLETADO** | Repo conectado a Vercel con SSL |
| **Hito 2** | Portal Web (Hub 4 Marcas \+ Landing DW) | 🟢 **COMPLETADO** | Hub corporativo y /doggy-wash en producción |
| **Hito 3** | Integración Jotform AI Agent / Formulario | 🟢 **COMPLETADO** | Conexión conversacional, GET de identificación de cliente recurrente con seguimiento automático, y captura simplificada del formulario web |
| **Hito 4** | Backend Ligero: Google Apps Script \+ Sheets SOT | 🟢 **COMPLETADO** | Webhook con deduplicación, ID\_Cliente, parser robusto por palabra clave y depuración activa (`Debug_Logs`) |
| **Hito 5** | Protocolo Post-Reserva (Karina y Dulce) | 🟡 **ACTUAL** | Ver pendientes detallados abajo |

### Pendientes activos del Hito 5 (2026-08-30)

1. **Clientes existentes que solicitan por formulario directo.** El flujo de chat (`doGet`) ya identifica a un cliente recurrente por WhatsApp, registra su solicitud de seguimiento automáticamente y notifica a recepción — pero un cliente existente que llena el formulario web público (`doPost`) no pasa por esa identificación: se procesa igual que un cliente nuevo. Falta decidir y construir cómo el formulario reconoce a un cliente ya existente (cotejo contra `DW_Directorio_Clientes` antes de timbrar) y si eso debe bloquear una segunda solicitud simultánea o solo advertir, en paralelo a la protección anti-duplicados ya implementada en el flujo de chat (ver `.context/INTEGRATIONS_JOTFORM_AI.md`).
2. **Manejo de cotización y confirmación de pagos.** `DW_Solicitudes` ya tiene las columnas `Importe_Cotizado`, `Importe_Cobrado`, `Medio_Pago` y `Fecha_Pago` (L-O), pero **no existe ningún mecanismo que las llene** — hoy se capturan manualmente (o no se capturan) por Karina/Dulce directamente en el Sheet. Esto es vital para el reporte financiero y la trazabilidad de la operación. Falta definir: quién cotiza (¿el operador en campo, vía qué canal?), cómo se registra el cobro real, y si debe generar algún tipo de conciliación o reporte automatizado.
3. **Doble check-in con `Token_Servicio`.** El token se genera correctamente en cada solicitud (`DW-AAMMDD-XXXX`), pero no existe ningún mecanismo operativo que lo use más allá de mostrarlo como folio de referencia. Falta diseñar:
   - **Check-in del operador:** cómo confirma en campo que el servicio fue atendido (¿escaneo de QR, actualización de estatus vía `/verificar-token`, llamada a Karina/Dulce?).
   - **Check-in del cliente:** cómo confirma que el servicio se realizó a su conformidad y por el monto acordado (¿el mismo token sirve para ambos check-ins, o se requiere un PIN/segundo factor?).
   - Esto se conecta directamente con el pendiente de cotización/pago (punto 2): el segundo check-in probablemente debe validar el monto cobrado contra lo cotizado.

### Ruta de verificación operativa

La página `/verificar-token` se integra como herramienta de consulta del servicio con una separación visual clara entre:

- vista orientada al cliente / seguimiento de servicio
- zona operativa interna / actualización de estatus con PIN

Esto evita confundir al visitante con funciones de administración y mantiene la experiencia de marca más limpia y profesional.

## **🏗️ ARQUITECTURA DE DATOS: "La Biblia" (Google Sheets SOT)**

### **Pestaña 1: DW\_Solicitudes (Bandeja de Entrada Operativa)**

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H | Col I | Col J | Col K | Col L | Col M | Col N | Col O |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Token\_Servicio | Fecha\_Solicitud | Estatus | ID\_Cliente | Nombre\_Contacto | WhatsApp\_Principal | Domicilio\_Colonia | Cant\_Mascotas | Raza\_Tamanio | Operador\_Asignado | Nombre\_Mascotas | Importe\_Cotizado | Importe\_Cobrado | Medio\_Pago | Fecha\_Pago |

Las columnas K-O son de captura manual por Karina/Dulce (K se llena automáticamente cuando el seguimiento viene del chat de un cliente recurrente ya identificado; L-O aún no tienen ningún mecanismo automatizado — ver pendiente 2 del Hito 5 arriba).

### **Pestaña 2: DW\_Directorio\_Clientes (CRM y Récord Histórico)**

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ID\_Cliente | Nombre\_Cliente | WhatsApp\_Principal | Telefono\_Secundario | Domicilio\_Habitual | Mascotas\_Registradas | Total\_Servicios | Ultima\_Visita |

### **Pestaña 3: Debug\_Logs (Diagnóstico de Webhooks)**

| Col A | Col B |
| :---- | :---- |
| Timestamp | Raw\_Payload\_JSON |

## **💻 UBICACIÓN DE ARCHIVOS EN EL REPOSITORIO**

Para que GitHub Copilot / Cursor mantengan coherencia, la estructura del proyecto se organiza así:

petgroupbajio-web/  
├── .context/  
│   ├── BUSINESS\_RULES.md          \# Reglas de negocio de las 4 marcas  
│   ├── INTEGRATIONS\_JOTFORM\_AI.md \# Contrato Jotform, GAS y Google Sheets  
│   ├── OPERATIONAL\_FLOW.md        \# Flujo operativo recepción/campo  
│   └── MASTER\_PLAN\_OPCION\_B.md    \# Este documento maestro  
├── docs/  
│   └── branding/                  \# SOT de diseño y marca (ver sección de Branding abajo)  
├── integrations/  
│   └── appscript/  
│       ├── BackendWebhook.gs      \# Código fuente del Google Apps Script (SOT versionada)  
│       └── README.md              \# Bitácora técnica, payloads reales, config de Jotform AI Agent  
├── src/  
│   ├── app/  
│   │   ├── page.jsx               \# Hub Corporativo  
│   │   └── doggy-wash/page.jsx    \# Landing Doggy Wash  
│   └── lib/  
│       └── constants.js           \# Enlaces y configuración  

## **🎨 SOT DE DISEÑO Y BRANDING**

`docs/branding/` es la **biblia de diseño** del consorcio y de sus 4 marcas. Es la fuente única de verdad para cualquier trabajo de diseño, generación de contenido visual o de copy, y debe consultarse **antes** de crear o modificar cualquier componente de UI, landing, material de marketing o pieza de contenido — propia o generada por IA.

* `docs/branding/BRAND_KIT_PET_GROUP_BAJIO.md` — Kit maestro del consorcio: paleta cromática corporativa, tipografías del sistema, arquitectura del hub principal, mapa de assets (`public/images/...`) y jerarquía de marca (Nivel Corporativo vs. Nivel Operativo).
* `docs/branding/BRAND_SPEC_DOGGY_WASH.md` — Identidad, personalidad, tono de voz, paleta y tipografía específicos de Doggy Wash.
* `docs/branding/BRAND_SPEC_VET_FOR_PETS.md` — Ídem para Vet for Pets.
* `docs/branding/BRAND_SPEC_PET_HOTEL.md` — Ídem para Pet Hotel.
* `docs/branding/BRAND_SPEC_PETS_ETERNITY.md` — Ídem para Pets' Eternity.

Cada marca hija tiene su propia paleta y personalidad (documentadas en su `BRAND_SPEC_*`), pero debe operar dentro del marco cromático y tipográfico corporativo definido en `BRAND_KIT_PET_GROUP_BAJIO.md`. Ante cualquier ambigüedad o conflicto entre un `BRAND_SPEC_*` y el kit maestro, el kit maestro (`BRAND_KIT_PET_GROUP_BAJIO.md`) prevalece para elementos de nivel corporativo (hub, navegación, footer), y el `BRAND_SPEC_*` correspondiente prevalece para la página/landing propia de esa marca.