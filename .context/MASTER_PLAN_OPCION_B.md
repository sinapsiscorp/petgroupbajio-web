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
| **Hito 3** | Integración Jotform AI Agent / Formulario | 🟡 **ACTUAL** | Conexión conversacional y captura simplificada |
| **Hito 4** | Backend Ligero: Google Apps Script \+ Sheets SOT | 🟡 **ACTUAL** | Webhook con deduplicación, ID\_Cliente y depuración activa |
| **Hito 5** | Protocolo Post-Reserva (Karina y Dulce) | ⚪ Pendiente | Asignación Calendar, Token WhatsApp y cierre de caja |

### Ruta de verificación operativa

La página `/verificar-token` se integra como herramienta de consulta del servicio con una separación visual clara entre:

- vista orientada al cliente / seguimiento de servicio
- zona operativa interna / actualización de estatus con PIN

Esto evita confundir al visitante con funciones de administración y mantiene la experiencia de marca más limpia y profesional.

## **🏗️ ARQUITECTURA DE DATOS: "La Biblia" (Google Sheets SOT)**

### **Pestaña 1: DW\_Solicitudes (Bandeja de Entrada Operativa)**

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H | Col I | Col J |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Token\_Servicio | Fecha\_Solicitud | Estatus | ID\_Cliente | Nombre\_Contacto | WhatsApp\_Principal | Domicilio\_Colonia | Cant\_Mascotas | Raza\_Tamanio | Operador\_Asignado |

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
├── integrations/  
│   └── gas/  
│       └── BackendWebhook.gs      \# Código fuente del Google Apps Script  
├── src/  
│   ├── app/  
│   │   ├── page.jsx               \# Hub Corporativo  
│   │   └── doggy-wash/page.jsx    \# Landing Doggy Wash  
│   └── lib/  
│       └── constants.js           \# Enlaces y configuración  