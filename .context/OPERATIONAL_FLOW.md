# Flujo de Datos y Single Source of Truth (SOT)

1. **Frontend:** Usuario visita `petgroupbajio.com/doggy-wash` o hace clic en WhatsApp.
2. **Captura:** Jotform AI Agent recopila los datos mínimos.
3. **Webhook:** Jotform envía un payload JSON al endpoint de Google Apps Script.
4. **Almacenamiento (La Biblia):** Google Apps Script timbra la fila en Google Sheets ("DW_Servicios") con estatus "Pendiente".
5. **Recepción:** Karina o Dulce revisan la hoja, contactan al cliente y confirman la cita.