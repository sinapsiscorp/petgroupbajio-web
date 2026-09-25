# Plan: reporte a finanzas al registrar un cobro (diseño, sin implementar)

**Estado:** propuesta para ejecutar en cuanto Ulises defina el destinatario. Nada de este documento está implementado.

## Decisión de Ulises (2026-09-25)

En vez de un correo por cada cobro ("correitis"), un Sheet aparte recibe cada entrada como fila — entradas, reembolsos, no-cobrados del día — para que la persona de finanzas concilie ahí.

**Pendiente de Ulises:** `<PENDIENTE_ULISES: correo o nombre de la persona de finanzas>` — sin este dato no se puede compartir ninguna hoja ni configurar ningún destinatario.

## Diseño propuesto

**Trigger**, dos variantes según el plan de AppSheet vigente:

1. **Con plan Core ($10/usuario/mes)** — ver nota de plan ya existente en `.context/MASTER_PLAN_OPCION_B.md`: un `Bot` de AppSheet sobre cambio de dato (*Data Change*) en `Importe_Cobrado`/`Medio_Pago`.
2. **Mientras se mantenga en plan Starter/Prototype** (situación actual): una acción manual adicional, en el mismo paso de "Registrar cobro y completar" (ver `.context/APPSHEET_SETUP_PLAYBOOK.md` sección 2, tabla de acciones), que escriba una fila nueva en una hoja `Reporte_Finanzas` con columnas: `Fecha`, `Token`, `Cliente`, `Importe`, `Medio_Pago`, `Registrado_Por` (`USEREMAIL()`).

**Destino de la hoja `Reporte_Finanzas`:** dos opciones, pendientes de que Ulises decida cuál —

- Pestaña nueva dentro de La Biblia (más simple, pero comparte acceso con todo lo demás).
- Sheet aparte, compartido solo con `<PENDIENTE_ULISES: correo o nombre de la persona de finanzas>` (más aislado, protege el resto de La Biblia de un tercero externo al equipo operativo).

## Qué falta para ejecutar esto

1. `<PENDIENTE_ULISES: correo o nombre de la persona de finanzas>`.
2. Decisión: pestaña en La Biblia vs. Sheet aparte.
3. Si es plan Starter: crear la hoja/pestaña `Reporte_Finanzas` y la acción manual en AppSheet (100% configuración de AppSheet, no requiere tocar `BackendWebhook.gs`).
4. Si se autoriza plan Core: configurar el Bot en vez de la acción manual.

No se implementa nada de este documento sin el dato pendiente y la decisión de Ulises.
