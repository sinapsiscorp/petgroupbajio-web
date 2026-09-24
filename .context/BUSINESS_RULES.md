# Contexto Corporativo: Pet Group Bajío

## Marcas del Grupo
1. **Doggy Wash:** Servicio de estética canina y felina a domicilio en León, Gto.
   - Horarios: Lunes a Viernes 9:00 - 19:00 | Sábados 9:00 - 15:00.
   - Franjas: 9:30, 11:30, 13:30, 15:30, 17:30.
   - Política clave: Toda cita es una "solicitud sujeta a confirmación" con 72 hrs de anticipación recomendadas.
   - Personal de recepción: Karina y Dulce.
2. **Pets Eternity:** Funeraria y crematorio para mascotas.
3. **Pet Hotel:** Pensión y hospedaje canino / felino campestre.
4. **Vet for Pets:** Clínica veterinaria, cirugías y medicina preventiva.

## Reglas de Captura y UX
- El formulario y el chatbot capturan únicamente:
  1. Nombre y WhatsApp (10 dígitos).
  2. Mascota, Raza y Tamaño aproximado.
  3. Dirección completa y Colonia.
  4. Servicio solicitado (Baño, Baño + Corte).

## Integración y seguimiento

- Jotform AI Agent es la puerta de captura y orientación; Google Apps Script procesa la información y Google Sheets ("La Biblia") es la fuente de verdad.
- Cada nueva solicitud debe conservar su `Token_Servicio` para permitir seguimiento posterior.
- `/verificar-token` es una superficie de consulta para clientes y una zona de operación para personal autorizado; no es la fuente de datos.
- La actualización de estatus debe validarse con autorización del operador y reflejarse en la hoja de solicitudes.
- Los detalles del contrato Jotform/GAS y sus dependencias se mantienen en `.context/INTEGRATIONS_JOTFORM_AI.md`.

## Enum oficial de `Estatus` (DW_Solicitudes, columna C)

Fijado en 2026-09-02 para cerrar el pendiente 3 del Hito 5 (`.context/MASTER_PLAN_OPCION_B.md`) y reemplazar cualquier enum divergente propuesto en drafts externos (ej. briefs generados por IA que no conocían el estado real del Sheet):

`Pendiente` → `Confirmado` → `En Ruta` → `Completado`, con `Cancelado` disponible en cualquier punto. No existe "Listo para Entrega" ni "En Proceso": Doggy Wash es un servicio a domicilio, no hay mostrador de recolección.

- **Pendiente**: automático al crear la solicitud (Jotform/GAS o alta manual).
- **Confirmado**: manual — único paso que requiere juicio humano de recepción (contactó al cliente y acordó horario), conforme a la política "solicitud sujeta a confirmación".
- **En Ruta**: manual, un tap, combinado con el aviso de WhatsApp al cliente.
- **Completado**: manual mientras el plan de AppSheet sea Free/Starter (acción de un tap al capturar el cobro); pasará a ser automático (Bot por cambio de dato en `Importe_Cobrado`) en cuanto se autorice el plan Core — ver `.context/MASTER_PLAN_OPCION_B.md`.
- **Cancelado**: manual, disponible en cualquier punto del flujo.