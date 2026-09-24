# Playbook de configuración: AppSheet "Agenda Digital Doggy"

Guía literal, columna por columna, para configurar la app AppSheet sobre el Sheet real "Agenda Digital Doggy". Complementa (no reemplaza) las decisiones de arquitectura en `.context/MASTER_PLAN_OPCION_B.md` y el enum de `Estatus` en `.context/BUSINESS_RULES.md`.

Convención de la tabla: **Show?** = se ve en la ficha/formulario. **Editable?** = se puede modificar después de creada la fila. **Require?** = el formulario no deja guardar si está vacío. Todo lo demás que no se mencione (Label, Key, Type Details) se deja en su valor por default de AppSheet salvo que se indique lo contrario.

## Tabla `DW_Solicitudes`

| # | Columna | Type | Key? | Label? | Show? | Editable? | Require? | Initial value |
|---|---|---|---|---|---|---|---|---|
| — | `_RowNumber` | Number | ❌ | ❌ | ❌ | ❌ | ❌ | (no tocar, es interno de AppSheet) |
| A | `Token_Servicio` | Text | ✅ | ❌ | ✅ | ❌ | ✅ | `CONCATENATE("DW-", TEXT(TODAY(), "YYMMDD"), "-", RIGHT(CONCATENATE("0000", TEXT(RANDBETWEEN(0, 9999))), 4))` |
| B | `Fecha_Solicitud` | DateTime | ❌ | ❌ | ✅ | ✅ | ✅ | `NOW()` |
| C | `Estatus` | Enum | ❌ | ❌ | ✅ | ✅ | ✅ | `"Pendiente"` |
| D | `ID_Cliente` | Ref | ❌ | ❌ | ✅ | ✅ | ✅ | (vacío) |
| E | `Nombre_Contacto` | Text | ❌ | ✅ | ✅ | ✅ | ❌ | `[ID_Cliente].[Nombre_Cliente]` |
| F | `WhatsApp_Principal` | Phone | ❌ | ❌ | ✅ | ✅ | ❌ | `[ID_Cliente].[WhatsApp_Principal]` |
| G | `Domicilio_Colonia` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | `[ID_Cliente].[Domicilio_Habitual]` |
| H | `Cant_Mascotas` | Number | ❌ | ❌ | ✅ | ✅ | ❌ | `1` |
| I | `Raza_Tamanio` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| J | `Operador_Asignado` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| K | `Nombre_Mascotas` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| L | `Importe_Cotizado` | Price | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| M | `Importe_Cobrado` | Price | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| N | `Medio_Pago` | Enum | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| O | `Fecha_Pago` | DateTime | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |

**Detalles adicionales por columna que necesitan un paso extra en "Type Details":**

- **`Estatus`** (Enum) → en Type Details, campo "Values": agregar exactamente estos 5, uno por uno: `Pendiente`, `Confirmado`, `En Ruta`, `Completado`, `Cancelado`. Base type: Text.
- **`ID_Cliente`** (Ref) → Source table: `DW_Directorio_Clientes`. "Is a part of?": **desmarcado** (si lo marcas, borrar un cliente borraría en cascada sus solicitudes — no queremos eso). Input mode: déjalo en `Auto`.
- **`Medio_Pago`** (Enum) → Values: `Efectivo`, `Transferencia`, `Tarjeta`. (Esta lista no está fijada en ningún documento del proyecto — es mi sugerencia; ajústala si Karina/Dulce usan otro medio, ej. "Depósito".)
- **`Importe_Cotizado` / `Importe_Cobrado`** (Price) → Type Details puede pedir moneda: selecciona `MXN` si aparece la opción.

## Tabla `DW_Directorio_Clientes`

| # | Columna | Type | Key? | Label? | Show? | Editable? | Require? | Initial value |
|---|---|---|---|---|---|---|---|---|
| — | `_RowNumber` | Number | ❌ | ❌ | ❌ | ❌ | ❌ | (no tocar) |
| A | `ID_Cliente` | Text | ✅ | ❌ | ✅ | ❌ | ✅ | `CONCATENATE("CLI-", TEXT(RANDBETWEEN(10000000, 99999999)))` |
| B | `Nombre_Cliente` | Text | ❌ | ✅ | ✅ | ✅ | ✅ | (vacío) |
| C | `WhatsApp_Principal` | Phone | ❌ | ❌ | ✅ | ✅ | ✅ | (vacío) |
| D | `Telefono_Secundario` | Phone | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| E | `Domicilio_Habitual` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| F | `Mascotas_Registradas` | Text | ❌ | ❌ | ✅ | ✅ | ❌ | (vacío) |
| G | `Total_Servicios` | Number | ❌ | ❌ | ✅ | ❌ | ❌ | (vacío) |
| H | `Ultima_Visita` | DateTime | ❌ | ❌ | ✅ | ❌ | ❌ | (vacío) |

`Total_Servicios` y `Ultima_Visita` quedan no-editables porque idealmente se calculan solos (contar/mirar las citas del cliente en `DW_Solicitudes`) — por ahora quedarán vacíos hasta implementar ese cálculo; no bloquea la operación.

## Permisos de tabla (Data > Tables, columna "Are updates allowed?")

- `DW_Solicitudes`: **Updates** ✅, **Adds** ✅, **Deletes** ❌.
- `DW_Directorio_Clientes`: **Updates** ✅, **Adds** ✅, **Deletes** ❌.
- `Debug_Logs`: no se agrega a la app.

## Checklist rápido tras terminar Data > Columns

- [ ] Borrar las 2 filas de prueba (`DW-260902-2640`, `DW-260902-5541`) del Sheet real.
- [ ] Confirmar en Data > Tables que Deletes está desactivado en ambas tablas.
- [ ] Ver > Views: crear vista "Tablero de Citas" sobre `DW_Solicitudes` (tipo Deck/Card, Group by `Estatus`, Sort by `Fecha_Solicitud` ascendente).
- [ ] Ver > Views: crear vista "Directorio de Clientes" sobre `DW_Directorio_Clientes` (tipo Table, con búsqueda habilitada).
- [ ] Acciones (Behavior > Actions): "Enviar WhatsApp de Ruta" y "Registrar cobro y completar" — ver detalle en `.context/MASTER_PLAN_OPCION_B.md`.
- [ ] Manage > Users: compartir con Karina y Dulce como rol **User**.
