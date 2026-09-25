# Playbook — AppSheet "Agenda Digital Doggy" (artefacto rector)

**Última actualización:** 2026-09-24 · **Reemplaza a:** v1 (Drive 03-sep y `.context/APPSHEET_SETUP_PLAYBOOK.md`)

**Cómo se lee este documento**
- **Config ✅** = ya está configurado y guardado en AppSheet.
- **Verif ✅** = ya se vio funcionar (Preview, app o Sheet). Solo se marca después de probarlo.
- **⬜** = pendiente.
- Una fila está **terminada** cuando tiene Config ✅ y Verif ✅.

---

## 0. Cómo ver y correr la app (guía para Ulises)

**A) En el editor (Preview).** Entra a appsheet.com → *My apps* → "Agenda Digital Doggy". En el borde derecho hay una flechita `▸` que abre el panel **Preview**: ahí se ve la app como en un celular. Arriba del panel puedes cambiar entre celular, tableta y escritorio. El interruptor **Edit** activa o desactiva el modo de edición del editor. Lo que guardes desde el Preview **sí escribe en el Sheet real**.

**B) Como la usaría Karina (recomendado para ensayar la presentación).** Abre en Chrome el link
`<LINK_APP>` (formato `https://www.appsheet.com/start/<APP_ID>`)
con la cuenta `<CUENTA_DUENA>`. También puedes instalar la app **AppSheet** (iOS/Android), iniciar sesión con esa cuenta y abrir "Agenda Digital Doggy" desde la lista.

**C) Cómo moverte.**
- Barra inferior: **Tablero de Citas · Directorio de Clientes · Calendario**.
- Botón azul **+**: nueva cita (en el Directorio, nuevo cliente).
- Toca una cita para abrirla. Los botones (acciones) aparecen según el estatus.
- Ícono **↻** arriba a la derecha (o jalar hacia abajo): **sincronizar**. Úsalo para ver lo que llegó del chat o del formulario de Jotform.

**D) Verla sola, sin el editor.** El link `.../start/<id>` abre la app a pantalla completa. La barra azul "Preview of your app" aparece porque la app está en **prototipo**; se quita al pasar a un plan de pago. Para el celular: app **AppSheet** con `<CUENTA_DUENA>`. La URL lleva `platform=desktop`; probar `platform=mobile` para ver el diseño de teléfono (**sin probar**).

**E) Probar como Karina o Dulce.** En esa barra, **Preview as** → escribir un correo → **Apply**. Vuelve a poner tu correo al terminar.

---

## 1. Estado por área

### 1.0 ⚠️ Pendientes de HOY (2026-09-25) para Ulises en AppSheet

**Léelo primero.** Esta sesión (Claude Code) hizo varios cambios en el repo y en producción (GAS + sitio) que ya funcionan de este lado, pero que **no se van a ver ni aplicar en AppSheet hasta que tú hagas algo ahí** — AppSheet no se toca desde el repo, así que nada de esto pasa solo. Es la lista completa, consolidada, para no perder nada:

| # | Qué | Por qué importa | Dónde está el detalle | Estado |
|---|---|---|---|---|
| 1 | **Valid_If contra duplicados por WhatsApp** en el alta manual de clientes | Sin esto, se puede volver a dar de alta el mismo cliente dos veces a mano (ya pasó una vez, ver D-6) | Sección 1.7, defecto **D-6** | ⬜ |
| 2 | **Editable_If de `Importe_Cotizado`** — cambiar de solo-Admin a abierto (User y Admin) | Con la regla vieja, Karina y Dulce (User) no pueden cotizar — bloquea su trabajo diario | Sección 1.8, fila `Importe_Cotizado` | ⬜ |
| 3 | **Feedback interno** — desactivar el feedback nativo de AppSheet y montar el propio (`Reportes_Feedback` + acción de correo a `bugs@impletech-ai.com`) | El feedback nativo hoy se va a los desarrolladores de AppSheet, no a Ulises — se pierde | Sección 1.13 | ⬜ (nada construido aún) |
| 4 | **Mostrar `Fecha_Llegada_Operador`** (columna R) en alguna vista de AppSheet | El check-in del operador ya funciona y escribe el dato (probado con folio `DW-260906-9934`), pero hoy nadie lo ve sin abrir el Sheet crudo | Sección 1.14 | ⬜ (columna nueva, aún sin vista) |
| 5 | **Regenerate Structure** en `DW_Solicitudes` y correr Deployment Check de nuevo | AppSheet necesita detectar la columna R nueva; confirma que no rompió nada | Sección 1.14, ítem 1 | ⬜ |

**Lo que NO necesita nada de ti en AppSheet** (para que sepas que no se te está pasando algo): el guard de `update_status`/`check_in` en `doPost`, el `GET ?token=` de `/verificar-token`, y el `check_in` con PIN — todo eso vive en el GAS y en el sitio, no en AppSheet, y ya está probado en producción.

### 1.1 Datos (Data > Columns)

| Item | Config | Verif | Nota |
|---|---|---|---|
| Sheet: encabezados `Fecha_Servicio` (P) y `Franja_Horaria` (Q) | ✅ | ✅ | Decisión D1. El dato llegó a P y Q en la prueba |
| `Fecha_Servicio` = Date | ✅ | ✅ | Guardó 28/09/2026 |
| `Franja_Horaria` = Enum: 9:30 am, 11:30 am, 1:30 pm, 3:30 pm, 5:30 pm | ✅ | ✅ | Muestra las 5 opciones; guardó `9:30 am` |
| `Operador_Asignado` = Enum: Sin Asignar, Alan, Guillermo, Juan; permite otros valores y autocompleta | ✅ | ✅ (parcial) | Lista de 4 con campo "Add or search"; guardó `Alan`. Falta probar agregar un operador nuevo. **Ver defecto D-1** | Decisión D2: los tres son ejemplos; para registrar a otro operador se escribe su nombre en el campo |
| `Ultima_Visita` (Directorio) = Date | ✅ | ⬜ | |
| `Operador_Asignado`: valor inicial `"Sin Asignar"` (igual que el GAS) | ✅ | ✅ | Una cita nueva arranca en `Sin Asignar` (verificado como usuario de recepción) |
| WhatsApp: validación 10 dígitos (Directorio y Solicitudes) | ✅ | ✅ | `+524770000000` rechazado con el mensaje; `4770000000` aceptado (probado en Directorio) |
| Autollenado de nombre, WhatsApp y domicilio al elegir cliente | ✅ | ✅ | Probado en Preview con "Juan Pérez" |
| "Reset on edit" no pisa datos al editar otros campos | ✅ | ⬜ | Verif: cambiar Estatus en fila existente |
| **Token corregido** (sin coma de miles) | ✅ | ✅ | Salía `DW-AAMMDD-,XXX` (con coma de miles); ahora `DW-AAMMDD-XXXX` (sin coma) |
| **ID_Cliente corregido** (sin comas) | ✅ | ✅ | Generó `CLI-########` sin comas |
| `Medio_Pago` = Enum: Efectivo, Transferencia, Tarjeta (+ Depósito) | ✅ | ✅ | Ya existía, con "Depósito" de más; el cobro guardó `Transferencia` |
| `Importe_Cotizado` / `Importe_Cobrado` con moneda MXN | ⬜ | ⬜ | |

### 1.2 Vistas (Views)

| Item | Config | Verif | Nota |
|---|---|---|---|
| **Tablero de Citas** (deck, primera, agrupado por Estatus) | ✅ | ✅ (parcial) | Agrupa por estatus y la cita se movió de grupo en cada paso. Falta ver los 5 grupos a la vez para confirmar el orden |
| **Directorio de Clientes** (deck, orden por nombre) | ✅ | ✅ | Muestra los clientes con WhatsApp y nombre de mascota |
| **Calendario** (por `Fecha_Servicio`, color por Estatus) | ✅ | ✅ | La cita de prueba aparece el 28/09 con marca verde |
| Slice **Cobro** (Token, Importe_Cobrado, Medio_Pago; sin altas) | ✅ | ✅ | Evita que el "+" abra el formulario de cobro |
| Vista **Registrar cobro** (form de referencia sobre el slice) | ✅ | ✅ | Abre en modo edición con el folio; guardó importe y medio |
| El "+" de nueva cita abre el formulario completo | ✅ | ✅ | Corregido (antes abría el de cobro) |

### 1.3 Acciones (Behavior > Actions)

| Item | Config | Verif | Nota |
|---|---|---|---|
| **Confirmar cita** (Pendiente → Confirmado; requiere fecha y franja) | ✅ | ✅ | Solo apareció en la cita con fecha y franja |
| `_set_EnRuta` (auxiliar, oculta) | ✅ | ✅ | |
| `_wa_ruta` (auxiliar, oculta; abre WhatsApp con mensaje) | ✅ | ✅ | Abrió `api.whatsapp.com/send?phone=524770000000&text=…` con folio, operador Alan, franja 9:30 am y recordatorio de electricidad. Falta confirmar en un teléfono real |
| **Enviar WhatsApp de Ruta** (requiere Confirmado y operador asignado) | ✅ | ✅ | Dejó `En Ruta`. La condición ya rechaza operador en blanco (D-1 corregido, pendiente de confirmar en la prueba manual) |
| `_marcar_completado` (auxiliar, oculta) | ✅ | ✅ | Dejó `Completado` y `Fecha_Pago` |
| **Registrar cobro y completar** (requiere En Ruta) | ✅ | ✅ | |
| Evento *Form Saved* de "Registrar cobro" → `_marcar_completado` | ✅ | ✅ | Al guardar el cobro la cita pasó sola a `Completado` |
| **Cancelar cita** (pide confirmación: "¿Seguro que quieres cancelar esta cita?") | ✅ | ⬜ | Visible mientras el estatus no sea `Cancelado` ni `Completado`. Falta probarla (incluida en la prueba manual) |

### 1.4 Plan y despliegue

| Item | Config | Verif | Nota |
|---|---|---|---|
| Deployment Check: único ERROR = *Account status* (sin plan de pago) | — | ✅ | Quedan 2 avisos cosméticos (descripción e ícono); el de menú ya pasó |
| "Analyze app features" **antes** de las acciones: Starter, Core y Enterprise permitidos | — | ✅ | |
| Volver a correr "Analyze app features" **con las acciones ya creadas** | — | ✅ | **Starter permitido**; Core y Enterprise también; Publisher Pro no (por el sign-in) |


### 1.7 Defectos abiertos (encontrados en la prueba)

| # | Defecto | Fix propuesto | Estado |
|---|---|---|---|
| D-1 | **Enviar WhatsApp de Ruta aparece sin operador asignado.** Las citas creadas en AppSheet dejan `Operador_Asignado` en blanco (el GAS escribe `Sin Asignar`), y la condición solo excluye `"Sin Asignar"` | Initial value de `Operador_Asignado` = `"Sin Asignar"` y condición de la acción: `AND([Estatus]="Confirmado", ISNOTBLANK([Operador_Asignado]), [Operador_Asignado]<>"Sin Asignar")` | ✅ Valor inicial verificado. ⬜ Falta ver que el botón NO aparezca con `Sin Asignar` (paso A5) |
| D-2 | `Total_Servicios` y `Ultima_Visita` quedan en blanco para clientes creados en AppSheet (ya previsto en la sección 5) | Columnas virtuales desde `DW_Solicitudes` (post-demo) | ⬜ |
| D-3 | **Formatos de fecha mezclados** en el Sheet: el GAS escribe `2026-09-24 2:27:59`; AppSheet escribe `24/09/2026 2:30:26` en `Fecha_Pago` | Antes de hacer reportes, normalizar el formato (no afecta la demo) | ⬜ |
| D-4 | **Error de sincronización tras cobrar como recepción** (*"Value '07/18/1900' in field Importe_Cobrado cannot be converted to type Price"*): el cobro registrado por un usuario no-Admin no llegaba al Sheet y la cita se quedaba en `En Ruta`. **Causa:** el Editable_If de `Importe_Cobrado` y `Medio_Pago` dependía del `Estatus` *actual*; al guardar el cobro la acción `_marcar_completado` cambia el estatus a `Completado` en la misma sincronización, y el servidor rechazaba la edición. | Editable_If ahora usa el estatus **anterior**: `OR(USERROLE()="Admin", [_THISROW_BEFORE].[Estatus]="En Ruta")`. Además se recuperó la cita afectada (folio `DW-AAMMDD-XXXX`) completando su cobro como Admin | ✅ **Resuelto y verificado:** ciclo completo como recepción (crear → confirmar → WhatsApp → cobro); el Sheet quedó `Completado`, importe 250, `Efectivo` y fecha de pago |
| D-6 | **Duplicados por WhatsApp en alta manual desde AppSheet.** `DW_Directorio_Clientes` no tiene ninguna validación que impida dar de alta dos clientes con el mismo `WhatsApp_Principal` (ni cruzando contra `Telefono_Secundario`) cuando el alta es manual desde AppSheet. El GAS sí lo previene (`procesarDirectorioClientes`), pero solo para altas que llegan por Jotform. Hallazgo 2026-09-25: cliente duplicado con mismo WhatsApp (`<WHATSAPP_PLACEHOLDER>`), dos `ID_Cliente` distintos. | **Fix (aplicado por Ulises en el editor de AppSheet, fuera de este repo):** un `Valid_If` en `WhatsApp_Principal` del formulario de alta que use `COUNT(SELECT(DW_Directorio_Clientes[ID_Cliente], [WhatsApp_Principal] = [_THIS])) <= 1`, y el mismo patrón cruzado contra `Telefono_Secundario`. | ⬜ Pendiente de confirmar que Ulises lo aplicó |


### 1.8 Roles y permisos

**Decisiones (Ulises):** Admin = **Larissa y Ulises**. Recepción (Karina y Dulce) **puede cancelar citas**. La restricción de cobros es sobre la **edición posterior**, no sobre la creación: recepción **sí registra cobros**; una vez registrado, **solo el Admin lo corrige**. En la práctica **Dulce** registra en el sistema los ingresos y cobros y **Karina** atiende; no es una regla del sistema (ambas tienen los mismos permisos), es la costumbre del equipo.
El rol se lee con `USERROLE()` (el "In-app role" de la pantalla Compartir); no se guardan correos en las fórmulas.

| Regla | Config | Verif | Cómo |
|---|---|---|---|
| Nadie borra clientes ni citas desde la app | ✅ | ✅ | *Deletes* apagado en ambas tablas (para todos) |
| `Estatus` solo lo edita el Admin a mano; recepción avanza con botones | ✅ | ✅ | Editable_If `USERROLE()="Admin"`. Como recepción, el campo no abre selector y los botones Confirmar, WhatsApp y Cobro sí funcionaron |
| `Importe_Cotizado` abierto a recepción (User y Admin), no exclusivo de Admin | ⬜ | ⬜ | **Corrección de política (2026-09-25)**, ver `.context/BUSINESS_RULES.md`. Editable_If pasa de `USERROLE()="Admin"` a sin restricción (o `TRUE`) — pendiente que Ulises lo aplique en AppSheet |
| `Importe_Cobrado` y `Medio_Pago`: recepción **registra** el cobro (mientras la cita está `En Ruta`); **corregirlo después solo lo hace el Admin** | ✅ | ✅ | Editable_If `OR(USERROLE()="Admin", [_THISROW_BEFORE].[Estatus]="En Ruta")`. Verificado como recepción: captura el cobro y la cita cierra sola; en una cita `Completado` los campos salen bloqueados |
| `Fecha_Pago` solo Admin (la pone el sistema) | ✅ | ✅ (bloqueado como recepción) | Editable_If `USERROLE()="Admin"` |
| Recepción puede cancelar citas, con confirmación | ✅ | ✅ (diálogo) | Falta ejecutar una cancelación real |
| Karina y Dulce **sin acceso directo al Sheet** | ⬜ | ⬜ | **Pendiente de verificar** los permisos de compartición del Sheet. Es el control que de verdad protege |
| Usuarios dados de alta: Larissa como Admin; Karina y Dulce como usuario | ⬜ | ⬜ | P2. Al compartir, elegir el *In-app role* de cada quien |

**Cómo se probó:** con "Preview as" se usó un correo de prueba (`<CORREO_PRUEBA>`) que no es Admin. No hay que compartir la app para ensayar roles.
**Límite:** estas reglas controlan lo que se ve y se edita en pantalla; los datos igual llegan al dispositivo. Filtros de seguridad reales de AppSheet requieren plan Core o superior.


### 1.9 Carga masiva de clientes (backfill)

Guía y código completo: **"Carga masiva de clientes — Doggy Wash (guía + código)"** (artefacto aparte). Archivo: `Carga_Masiva_Clientes_DoggyWash.xlsx`.
**Diseño:** Karina y Dulce llenan una hoja aparte (sin acceso a La Biblia); un **Admin** revisa e importa con el menú *Doggy Wash*. El WhatsApp de 10 dígitos es la llave; los duplicados se omiten, nunca se sobrescriben.

| Item | Config | Verif | Nota |
|---|---|---|---|
| Plantilla .xlsx (instrucciones, ejemplo, validaciones, columna *Revision*) | ✅ | ✅ | 500 fórmulas recalculadas sin errores; 10 casos de prueba con el mensaje esperado |
| Script de importación (revisar / importar / historial) | ✅ | ✅ (lógica) | Lógica probada con 30 casos. **No se ha ejecutado dentro de Google Apps Script real** |
| Instalación: convertir a Hoja de Google, pegar script, autorizar, compartir con Karina y Dulce | ⬜ | ⬜ | Pasos en la guía (~5 min) |
| Primera importación de prueba con 2 clientes | ⬜ | ⬜ | Antes de la importación grande; **hacer copia de La Biblia primero** |
| Captura de los clientes actuales por Karina y Dulce | ⬜ | ⬜ | |
| Importación real y revisión en AppSheet | ⬜ | ⬜ | |

### 1.10 Conexión con el sitio web (`/verificar-token`) y check-in del operador

**Estado (2026-09-25): CONECTADO y probado en producción.** Ya no es modo demo — `NEXT_PUBLIC_GAS_WEBHOOK_URL` está configurada en Vercel y el sitio apunta al despliegue real del GAS.

| Pendiente (histórico) | Dónde | Estado |
|---|---|---|
| `GET /exec?token=...` (consultar una cita por folio) | GAS | ✅ Implementado y probado en producción (folio `DW-260906-9934`) |
| `POST /exec` con `action:"check_in"` (llegada del operador, con PIN) | GAS + sitio | ✅ Implementado y probado en producción — ver 1.14 para lo que falta en AppSheet |
| `POST /exec` con `action:"update_status"` | GAS | Sigue bloqueado a propósito (guard responde error controlado) — no se implementó, ver Fase 3 de `.context/PLAN_VERIFICAR_TOKEN.md` |
| **Seguridad del PIN:** movido a Script Property `PIN_OPERADOR`, validado solo en servidor, con límite de 5 intentos/15 min | GAS | ✅ Resuelto — el PIN ya no vive en el código del sitio |
| Qué datos ve el cliente (colonia, mascotas, operador; nunca WhatsApp/domicilio completo/importes) | GAS | ✅ Implementado (`consultarPorToken`) — ver limitación conocida de `colonia` en `.context/PLAN_VERIFICAR_TOKEN.md` |

**Sobre el "doble check-in":** resuelto a nivel de datos — el check-in real del operador ya se registra en `Fecha_Llegada_Operador` (columna R), separado de `Estatus` (que sigue siendo *En Ruta* = lo marca recepción al mandar el WhatsApp). **Pendiente:** que ese dato se vea en algún lado de AppSheet — ver sección 1.14.


### 1.11 Drive, acceso y mapa de piezas

| Pieza | Dónde vive | Estado |
|---|---|---|
| La Biblia (Sheet "Agenda Digital Doggy") | `<RUTA_CARPETA_PROYECTO>` | ✅ Movida a la carpeta del proyecto |
| Carpeta `appsheet` (archivos de la app; hoy solo un `empty.txt` vacío) | Misma carpeta del proyecto | ✅ Movida y **"Default app folder" de AppSheet actualizado** a la nueva ruta; app sigue sincronizando; no se creó otra carpeta `appsheet` en la raíz |
| Definición de la app (vistas, acciones, roles) | Servidores de AppSheet, ligada a `<CUENTA_DUENA>` (**no está en Drive**) | Respaldo = este playbook |
| Apps Script del backend (`Sample.gs` = `BackendWebhook.gs`) | Dentro de La Biblia | Sin cambios |
| Script de carga masiva (`ImportarClientes.gs`) | Dentro de la hoja **nueva** "Carga masiva de clientes", **no** en La Biblia | ⬜ Por instalar |
| Acceso a La Biblia | Solo el dueño + **⚠️ "cualquier persona con el enlace" (lector)** | ⬜ **Cerrar a "Restringido"** (ver abajo) |
| Carpeta del proyecto | Solo el dueño | ✅ |

**Acceso público de La Biblia.** Hay dos ajustes distintos que dicen "cualquier persona": (1) el **acceso del archivo** (Compartir → Acceso general): debe quedar **Restringido**; (2) el **acceso de la implementación del Apps Script** ("Quién tiene acceso" = Cualquier persona): **se queda así**, es lo que necesita Jotform. Según el repo, Jotform y el sitio web llaman a la URL del script (`/exec`), no leen el Sheet; el script corre con la cuenta dueña (`getActiveSpreadsheet`); AppSheet usa la cuenta dueña. Cerrar el acceso del archivo no debería afectar el ciclo. Es reversible en segundos si algo falla.
**Comprobación tras cerrarlo:** (a) abrir el link de la Biblia en ventana de incógnito: debe pedir permiso; (b) sincronizar AppSheet y abrir una cita; (c) mandar una solicitud por el formulario o el chat con un número nuevo y ver que llegue la fila.

### 1.12 Orden de lo que sigue

| # | Qué | Quién | Cuándo |
|---|---|---|---|
| 1 | Cerrar acceso público de La Biblia + comprobación de 3 puntos | Ulises | Hoy |
| 2 | Prueba manual de punta a punta (sección 3b) | Ulises | Hoy / antes de la presentación |
| 3 | Presentación: **no requiere pegar código nuevo** | Ulises | Mañana |
| 4 | Correos: Larissa (Admin), Karina y Dulce (Google) | Ulises | Ya solicitados |
| 5 | Instalar carga masiva (pegar `ImportarClientes.gs` en la hoja **nueva**, poner el correo de Larissa, menú 3 de proteger, comprobar con la cuenta de Karina/Dulce, compartir, 2 clientes de prueba) | Ulises | Después de la presentación |
| 6 | Captura de clientes actuales → revisar → importar | Karina y Dulce; Ulises/Larissa importan | Después del paso 5 |
| 7 | Handoff a Claude Code (sección 6, ampliada): docs, backfill al repo, parche GAS **solo con diff**, plan de `/verificar-token` | Claude Code | Después de la presentación |
| 8 | Decidir cómo registrar la **llegada del operador** (check-in) | Ulises | Antes de tocar `/verificar-token` |
| 9 | Logo oficial, D-2, D-3, plan de AppSheet, limpiar datos de prueba | Ulises | Después |

**Qué código va dónde**

| Código | Va en | Nota |
|---|---|---|
| `ImportarClientes.gs` | Apps Script de la hoja **"Carga masiva de clientes"** | Nunca en La Biblia |
| `BackendWebhook.gs` / `Sample.gs` | Apps Script de La Biblia | **No tocar** hasta revisar un diff; luego re-implementar (Nueva versión) |
| Parche de teléfono y endpoints de `/verificar-token` | Repo y Apps Script de La Biblia | Los prepara Claude Code; tú pegas y re-implementas |
| Expresiones y reglas de AppSheet | Ya puestas en el editor de AppSheet | Nada que pegar; están documentadas en este playbook |

### 1.13 Feedback interno (diseño, por ejecutar por Ulises en AppSheet)

**Decisión de Ulises (2026-09-25):** AppSheet trae una función nativa de "Feedback for the app creator" (la vista **Feedback** de la barra lateral) — es un buzón de Google hacia los desarrolladores de AppSheet, no hacia Ulises, y no guarda nada consultable en La Biblia. Se reemplaza por una propia hacia `bugs@impletech-ai.com`.

**Nada de esto se toca desde el repo** — es 100% configuración de AppSheet, no requiere Apps Script ni tocar `BackendWebhook.gs`.

1. **Quitar la vista nativa:** en el editor de AppSheet, *Views* → la vista de sistema "Feedback" → desactivarla (o *UX → Options* → apagar "Enable user feedback").
2. **Pestaña nueva en La Biblia:** `Reportes_Feedback`, columnas: `Fecha` (auto, `NOW()`), `Reportado_Por` (`USEREMAIL()`), `Mensaje` (texto largo), `Estatus_Reporte` (Enum: Nuevo / Revisado / Resuelto, inicial "Nuevo").
3. **Tabla + vista nueva en AppSheet:** una vista tipo *form* sobre esa tabla, accesible desde el menú, para que Karina/Dulce/Larissa reporten un bug o sugerencia libremente.
4. **Acción "Send email" (nativa de AppSheet, sin código):** al guardar un registro nuevo en `Reportes_Feedback` (evento *Data Change: Adds*), disparar una acción tipo *"App: send an email"* a `bugs@impletech-ai.com` con el mensaje, quién lo reportó y cuándo.

| Item | Config | Verif |
|---|---|---|
| Vista nativa "Feedback" desactivada | ⬜ | ⬜ |
| Pestaña `Reportes_Feedback` creada | ⬜ | ⬜ |
| Tabla + vista *form* en AppSheet | ⬜ | ⬜ |
| Acción "Send email" a `bugs@impletech-ai.com` en *Data Change: Adds* | ⬜ | ⬜ |

### 1.14 Mostrar la llegada del operador en AppSheet (diseño, por ejecutar por Ulises)

**Estado (2026-09-25):** `Fecha_Llegada_Operador` (columna R) ya se prueba en producción — `/verificar-token` Fase 2 (check-in con PIN) escribe el timestamp correctamente (verificado con el folio `DW-260906-9934`). Pero **hoy ese dato no aparece en ningún lado de la app AppSheet** — se diseñó a propósito como puramente observacional (ver `.context/PLAN_VERIFICAR_TOKEN.md` inciso c), sin vista ni acción asociada, para no tocar el flujo ya verificado. El resultado: Karina/Dulce no tienen forma de ver desde AppSheet si el operador ya llegó, salvo abriendo el Sheet crudo.

**Nada de esto se toca desde el repo** — es 100% configuración de AppSheet.

1. **Confirmar que AppSheet detectó la columna.** *Data → Columns* (tabla `DW_Solicitudes`) → si `Fecha_Llegada_Operador` no aparece, correr "Regenerate Structure".
2. **Tipo de columna:** `DateTime`. **Editable_If:** `FALSE` (o dejarla fuera de cualquier formulario) — es de solo lectura desde AppSheet, la única fuente que la escribe es el `action:"check_in"` del sitio.
3. **Dónde mostrarla (propuesta, misma lógica que `Fecha_Servicio`/`Franja_Horaria` ya visibles hoy):**
   - Agregarla a la vista de **detalle de la cita** (la que se abre al tocar una cita en el Tablero), debajo de `Operador_Asignado`, con una etiqueta clara: "Llegada del operador".
   - Opcional, más visible: una columna virtual tipo `IF(ISNOTBLANK([Fecha_Llegada_Operador]), "✅ Llegó " & TEXT([Fecha_Llegada_Operador], "HH:MM"), "")` para mostrarla como una insignia corta en el Tablero (deck), junto al estatus — sin agregar un estatus nuevo, solo lectura visual.
4. **No condicionar ninguna acción existente a esta columna** (Confirmar cita, WhatsApp de Ruta, Registrar cobro) — sigue siendo un dato de auditoría aparte del flujo de `Estatus`, por diseño.

| Item | Config | Verif |
|---|---|---|
| Columna `Fecha_Llegada_Operador` detectada en AppSheet (Regenerate Structure si hace falta) | ⬜ | ⬜ |
| Editable_If = FALSE | ⬜ | ⬜ |
| Visible en detalle de la cita | ⬜ | ⬜ |
| (Opcional) insignia en el Tablero | ⬜ | ⬜ |

### 1.5 P1 (mismo día si alcanza)

| Item | Config | Verif |
|---|---|---|
| Format rules por Estatus (paleta de Doggy Wash) | ✅ | ✅ (parcial) | 5 reglas. Se ven Pendiente (ámbar) y Completado (pizarra); faltan de ver Confirmado, En Ruta y Cancelado. Ver nota de marca en la sección 2 |
| Tema con color primario `#00A3E0` | ✅ | ✅ | Se ve en pestañas y botones del Preview |
| Descripción de la app (corta y larga, en tono de marca) | ✅ | ⬜ | Volver a correr el Deployment Check para confirmar que desaparece el aviso |
| WhatsApp de **confirmación** (con fecha y franja) | ⬜ | ⬜ | Opcional |
| Logo de la app: hoy un ícono genérico de checklist (antes era una balanza) | ✅ | ⬜ | **Provisional.** Cambiar por el logo oficial de Doggy Wash en P2 |

### 1.6 P2 (después de la presentación)
Compartir con Karina y Dulce (**dispara invitación por correo**, no hacerlo antes de decidir el plan) · elegir plan · decidir dueño de la app y del Sheet (hoy es un Gmail de Sinapsis) · ícono personalizado (`public/images/brand/logo-doggy-wash.png` del repo) · limpiar datos de prueba · Bots o Zapier para avisos automáticos · handoff a Claude Code (sección 6).

---

## 2. Especificaciones (lo que hay configurado)

**Flujo de estatus:** `Pendiente → Confirmado → En Ruta → Completado`; `Cancelado` en cualquier punto.

**Token** (Initial value de `Token_Servicio`):
```
CONCATENATE("DW-", TEXT(TODAY(), "YYMMDD"), "-", SUBSTITUTE(TEXT(RANDBETWEEN(1000, 9999)), ",", ""))
```
**ID_Cliente** (Directorio): `CONCATENATE("CLI-", SUBSTITUTE(TEXT(RANDBETWEEN(10000000, 99999999)), ",", ""))`
*Lección:* `TEXT()` de un número agrega separador de miles; siempre limpiar la coma.

**Valid_If del WhatsApp:** `LEN(TEXT([_THIS]))=10` · Error: `Escribe el WhatsApp a 10 dígitos, sin espacios, guiones ni +52.`

**Reset on edit** (en `Nombre_Contacto`, `WhatsApp_Principal`, `Domicilio_Colonia`):
`[_THISROW_BEFORE].[ID_Cliente] <> [_THISROW_AFTER].[ID_Cliente]`

**Condiciones de las acciones**

| Acción | Se muestra si | Qué hace |
|---|---|---|
| Confirmar cita | `AND([Estatus]="Pendiente", ISNOTBLANK([Fecha_Servicio]), ISNOTBLANK([Franja_Horaria]))` | `Estatus = "Confirmado"` |
| Enviar WhatsApp de Ruta | `AND([Estatus]="Confirmado", ISNOTBLANK([Operador_Asignado]), [Operador_Asignado]<>"Sin Asignar")` | `Estatus = "En Ruta"` y abre WhatsApp |
| Registrar cobro y completar | `[Estatus]="En Ruta"` | Abre el form "Registrar cobro" con `LINKTOROW([Token_Servicio], "Registrar cobro")` |
| `_marcar_completado` (tras guardar el cobro) | `AND(ISNOTBLANK([Importe_Cobrado]), ISNOTBLANK([Medio_Pago]))` | `Estatus = "Completado"`, `Fecha_Pago = NOW()` |

**URL de `_wa_ruta`:** `https://wa.me/52` + WhatsApp + `?text=` + mensaje codificado (`ENCODEURL`). El mensaje incluye nombre, folio, operador, la franja si existe, y el recordatorio de conexión eléctrica y espacio para la van. Si `52` no abre el chat en el teléfono, cambiar a `521` (prefijo que usa el repo).

### Marca aplicada (fuente: `BRAND_SPEC_DOGGY_WASH.md`; el kit maestro manda solo en hub, navegación y footer)

| Rol | Color | Uso en la app |
|---|---|---|
| Primario — Aqua Splash Blue | `#00A3E0` | Color primario del tema; estatus `En Ruta` |
| Secundario — Lime Bubble Green | `#78BE20` | Estatus `Confirmado` (indicado en el brand spec) |
| Sol / Alerta — Tropical Sun | `#FDB813` | Estatus `Pendiente` |
| Acento / CTA — Energy Red | `#E53935` | Estatus `Cancelado` |
| Fondo oscuro — Deep Ocean Slate | `#0F172A` | Estatus `Completado` y color del texto |

- En AppSheet el *Highlight color* de una regla se dibuja como **punto de color** junto al estatus, no como fondo. Por eso el **texto debe quedar oscuro** (`#0F172A`): con texto blanco, los encabezados de grupo se volvían invisibles (defecto ya corregido).
- Tipografía de marca (Poppins / Plus Jakarta Sans): **AppSheet no permite fuentes propias**; se usa la tipografía por defecto de la plataforma.
- Tono de los textos: cálido y directo, como pide el brand spec.

---

## 3. Protocolo de prueba controlada

**Datos de prueba** (todos con prefijo `PRUEBA` para borrarlos después): cliente `PRUEBA Demo`, WhatsApp `4770000000`, domicilio `Calle de Prueba 1`, mascota `Firulais`.

| # | Paso | Resultado esperado | Resultado |
|---|---|---|---|
| 1 | Directorio → **+** → capturar WhatsApp `+524770000000` | La app rechaza con el mensaje de error | ✅ |
| 2 | Corregir a `4770000000` y guardar | Cliente creado, ID `CLI-########` sin comas; aparece en el Sheet | ✅ |
| 3 | Tablero → **+** → elegir `PRUEBA Demo` | Se autollenan nombre, WhatsApp y domicilio | ✅ (verificado con otro cliente) |
| 4 | Capturar fecha y franja; guardar | Cita `Pendiente` con token sin comas; aparece en Sheet cols P y Q | ✅ `DW-AAMMDD-XXXX` |
| 5 | Abrir la cita | Aparece **Confirmar cita**; NO aparece "Enviar WhatsApp de Ruta" | ✅ Confirmar apareció. ❌ Ver defecto D-1 (WhatsApp de Ruta apareció al confirmar, sin operador) |
| 6 | Ejecutar **Confirmar cita** | Estatus `Confirmado` | ✅ |
| 7 | Asignar operador `Alan` (Edit) | Aparece **Enviar WhatsApp de Ruta** | ✅ |
| 8 | Ejecutar **Enviar WhatsApp de Ruta** | Estatus `En Ruta`; abre `wa.me/52…` con el texto correcto | ✅ |
| 9 | Ejecutar **Registrar cobro y completar** con importe y medio | Estatus `Completado` y `Fecha_Pago` llena | ✅ Importe 350, Transferencia |
| 10 | Editar solo el Estatus de una fila existente | Nombre, WhatsApp y domicilio NO cambian | ⬜ |
| 11 | Revisar el Sheet | Datos coinciden en `DW_Solicitudes` y `DW_Directorio_Clientes` | ✅ Verificado leyendo el Sheet |
| 12 | Revisar Calendario y orden de grupos del Tablero | Cita visible en su fecha; grupos en orden de flujo | ✅ Calendario. ⬜ Faltan los 5 grupos del Tablero a la vez |
| 13 | Probar en teléfono real el botón de WhatsApp | Abre el chat con el mensaje | ⬜ (solo Ulises) |

**Datos de prueba creados (la limpieza la hace Ulises):** varias filas de prueba, todas con folio formato `DW-AAMMDD-XXXX` en `DW_Solicitudes` y cliente `CLI-########` (`PRUEBA Demo`) en `DW_Directorio_Clientes`, incluidas las citas creadas como recepción (ver D-4). La app no puede borrar y Claude no borra datos.

### 3b. Prueba manual de Ulises (dos rutas de captura)

**Ruta A — captura directa** (llamada telefónica o cliente en persona): Tablero → **+** → cliente (o **New** si no existe) → fecha y franja → guardar.

**Ruta B — formulario o chat web** (Jotform → GAS → Sheet): enviar una solicitud con un **número nuevo** → en la app tocar **↻**.

| # | Ruta | Qué revisar | Esperado | Resultado |
|---|---|---|---|---|
| A1 | A | Cliente nuevo desde el Directorio con WhatsApp de 10 dígitos | Se crea con ID `CLI-########` | ⬜ |
| A2 | A | Cita nueva para ese cliente | Se autollenan nombre, WhatsApp y domicilio; queda `Pendiente` con `Operador_Asignado = Sin Asignar` | ⬜ |
| A3 | A | Sin fecha ni franja, abrir la cita | **No** aparece "Confirmar cita" | ⬜ |
| A4 | A | Con fecha y franja → Confirmar cita | Pasa a `Confirmado` | ⬜ |
| A5 | A | Con operador en `Sin Asignar` | **No** aparece "Enviar WhatsApp de Ruta" (verifica D-1) | ⬜ |
| A6 | A | Asignar operador (probar también escribir uno nuevo) | Aparece "Enviar WhatsApp de Ruta" | ⬜ |
| A7 | A | Enviar WhatsApp de Ruta desde el teléfono | Abre el chat con el mensaje completo | ⬜ |
| A8 | A | Registrar cobro y completar | Pasa a `Completado` con importe, medio y fecha de pago | ⬜ |
| B1 | B | La solicitud web aparece tras sincronizar | Cita `Pendiente`, token `DW-AAMMDD-XXXX`, `Operador_Asignado = Sin Asignar` | ⬜ |
| B2 | B | Abrir la cita | Datos del formulario completos; fecha y franja vacías | ⬜ |
| B3 | B | Agregar fecha y franja (Edit) y continuar el flujo | Confirmar → operador → WhatsApp → cobro sin errores | ⬜ |
| B4 | B | Cliente nuevo en el Directorio | Existe con su WhatsApp a 10 dígitos | ⬜ |

**Cuidado con la ruta B:** si usas un número que ya existe en el Directorio, el chat crea la solicitud y **manda un correo a `contacto@petgroupbajio.com`**.


---

## 4. Guion de presentación (10 min)

1. **Contexto (1 min):** el cliente pide por chat o formulario → cae al Sheet (fuente de verdad) → Karina y Dulce lo gestionan en la app.
2. **Tablero (2 min):** citas agrupadas por estatus; sincronizar para ver las que llegan del chat.
3. **Ciclo en vivo (5 min):** nueva cita (se autollenan datos) → fecha y franja → **Confirmar** → operador → **WhatsApp de Ruta** → **Cobro** → mostrar el Sheet.
4. **Directorio y Calendario (1 min):** historial por cliente y agenda.
5. **Alcance (1 min):** "Todo esto funciona hoy en modo prueba. Para el uso diario con sus cuentas se contrata un plan de AppSheet (esta app cabe en el más básico, a confirmar), y ahí se pueden sumar los avisos automáticos."

**Cuidado:** si usas el chat de Jotform con un número ya registrado, el sistema manda correo a `contacto@petgroupbajio.com`. Usa un número nuevo.

---

## 5. Notas de integración

- **Tres escritores** sobre el mismo Sheet: GAS, AppSheet y edición manual. Deben coincidir en formato de token, enum de `Estatus` y WhatsApp a 10 dígitos.
- **IDs de cliente:** el GAS genera `CLI-####-NN`; AppSheet `CLI-########`. Distintos, pero no chocan.
- **`Total_Servicios` y `Ultima_Visita`:** el GAS los actualiza solo para citas que entran por Jotform. Solución posterior: columnas virtuales desde `DW_Solicitudes`.
- **El GAS ignora espacios y guiones al comparar teléfonos;** lo que rompe la coincidencia es el prefijo de país (por eso la validación).
- **Al crear un form propio sobre una tabla,** AppSheet lo usa para Add/Edit. Usar siempre un **slice** para formularios de propósito específico.

---

## 6. Handoff a Claude Code (después de la presentación)

Adjuntar: este playbook, `GUIA_CARGA_MASIVA_CLIENTES.md`, `ImportarClientes.gs` y `Carga_Masiva_Clientes_DoggyWash.xlsx`.

```
Contexto: repo petgroupbajio-web. La app AppSheet "Agenda Digital Doggy" ya está configurada
(playbook adjunto). No ejecutes nada contra producción y no despliegues el GAS.
Un commit por tarea, en este orden:

1. Docs: reemplaza .context/APPSHEET_SETUP_PLAYBOOK.md por el playbook adjunto. Corrige en
   README.md, MASTER_PLAN_OPCION_B.md e INTEGRATIONS_JOTFORM_AI.md: DW_Directorio_Clientes = 9
   columnas; DW_Solicitudes = 17 columnas (P=Fecha_Servicio, Q=Franja_Horaria). Actualiza
   "Capa de gestión operativa": AppSheet en Prototype, cabe en Starter, roles Admin/usuario con
   USERROLE(), Bots pendientes de plan.
2. Backfill: agrega integrations/appscript/backfill/ con ImportarClientes.gs, la plantilla xlsx y
   un README corto. NO se despliega desde el repo: vive en una hoja aparte.
3. Docs: en cualquier fórmula de Token o ID_Cliente usa SUBSTITUTE(TEXT(...), ",", "")
   (TEXT() agrega comas de miles y rompe el formato DW-AAMMDD-XXXX).
4. GAS (mostrar diff, NO desplegar): en doGet y procesarDirectorioClientes normaliza el teléfono
   con .replace(/\D/g,"").slice(-10) al comparar. No toques parseJotformPayload.
5. Solo análisis, sin implementar: plan para /verificar-token. (a) El PIN actual (el PIN escrito en page.jsx) hoy está en el
   código del navegador: propón moverlo a Script Properties y validarlo en el servidor.
   (b) Contratos GET ?token= (datos mínimos) y POST action:"update_status".
   (c) Opciones para registrar la LLEGADA del operador con marca de hora en columna nueva, sin
   estatus nuevos (deben coincidir GAS, AppSheet y sitio). Devuelve riesgos y un plan por fases.
```
