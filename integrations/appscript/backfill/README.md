# Carga masiva de clientes (backfill) — Doggy Wash

**Para:** Ulises y Larissa (Admin) · **Sirve para:** subir de una sola vez a los clientes actuales que Karina y Dulce capturan a mano, antes de arrancar con el sistema nuevo.

**Esta carpeta es una copia de respaldo versionada en el repo.** La versión que realmente se ejecuta vive en una hoja de Google aparte ("Carga masiva de clientes"), **nunca en La Biblia**. No se despliega nada desde aquí — copiar `ImportarClientes.gs` manualmente al editor de Apps Script de esa hoja.

**Diferencia intencional con la copia viva:** este repo es público, así que `ImportarClientes.gs` aquí lleva placeholders en vez de datos reales — `SOT_ID: 'PEGAR_AQUI_EL_ID_DE_LA_BIBLIA'` y `'<CUENTA_DUENA>'` en `CONFIG.ADMINS`. Al pegarlo en el editor de Apps Script de la hoja de carga masiva, sustituye ambos por el ID real de La Biblia y el correo real de la cuenta dueña — la copia que se ejecuta ahí sí necesita los valores reales.

## Quién hace qué

| Quién | Qué hace | Toca La Biblia |
|---|---|---|
| **Karina y Dulce** | Llenan la hoja "Carga masiva de clientes" (una fila por cliente) hasta que la columna *Revision* diga OK | **No** |
| **Ulises o Larissa (Admin)** | Revisan e importan con el menú *Doggy Wash* | Sí (necesitan permiso de edición) |

Así Karina y Dulce nunca tienen acceso a La Biblia, y una importación masiva (que agrega filas al sistema real) siempre la aprueba un Admin.

## Instalación (una sola vez, ~10 minutos)

1. **Sube el archivo** `Carga_Masiva_Clientes_DoggyWash.xlsx` a Drive → ábrelo con *Hojas de cálculo de Google* → **Archivo → Guardar como Hojas de cálculo de Google**. Ponle de nombre "Carga masiva de clientes — Doggy Wash".
2. **Revisa** que la pestaña *Clientes* tenga las validaciones (celdas de WhatsApp que rechazan texto raro) y los colores en *Revision*. Si alguna se perdió en la conversión, no pasa nada: la columna *Revision* sigue avisando los errores.
3. En esa hoja: **Extensiones → Apps Script**. Borra lo que haya y **pega el contenido de `ImportarClientes.gs`** (archivo hermano en esta carpeta). Antes de guardar, reemplaza los tres placeholders: `SOT_ID` (ID real de La Biblia), `'<CUENTA_DUENA>'` en `CONFIG.ADMINS` (correo real de la cuenta dueña) y `'COMPLETAR_CORREO_DE_LARISSA@gmail.com'` (correo real de Larissa). Guarda.
4. Recarga la hoja. Aparece el menú **Doggy Wash**. La primera vez, Google pedirá autorización (el script necesita leer y escribir en La Biblia). Autoriza con tu cuenta Admin.
5. **Protege las celdas de sistema:** menú **Doggy Wash → 3) Proteger celdas de sistema (una sola vez)**. Hazlo **antes** de compartir la hoja.
6. **Comparte solo esta hoja** (nunca La Biblia):
   - *Compartir* → agrega los correos de Google de Karina y Dulce como **Editoras**.
   - Abre el engrane ⚙ de esa ventana y **desmarca** "Los editores pueden cambiar los permisos y compartir".
   - En *Acceso general* deja **Restringido** (no uses "Cualquier persona con el enlace": la hoja tendrá datos personales de clientes).
   - Si la hoja vive en la carpeta privada de IT, comparte el **archivo**, no la carpeta.

## Qué pueden editar Karina y Dulce (y qué no)

| Zona | ¿Pueden editarla? |
|---|---|
| Columnas A a I, filas 2 a 501 (captura) | ✅ Sí |
| Columna **Revision** (fórmulas) | 🔒 No |
| Columna **Resultado_Importacion** | 🔒 No |
| Fila 1 (encabezados: renombrarlos rompería la importación) | 🔒 No |
| Pestañas **Instrucciones** e **Historial_Importaciones** | 🔒 No |

Solo los correos de `CONFIG.ADMINS` pueden tocar lo bloqueado. **Quien ejecute la importación debe estar en esa lista**, porque el script escribe el resultado en la columna bloqueada.

## Trabajar en línea, sin descargas ni copias

- **Sí funciona editar en la nube:** Karina y Dulce abren el mismo link y editan a la vez; no hay que mandarse archivos.
- **Límite de Google:** la opción de impedir descargar, imprimir o copiar **aplica solo a lectores y comentaristas**. Una persona con permiso de **Editor** siempre puede hacer *Archivo → Descargar* o *Hacer una copia*; no hay forma de bloquearlo. Lo que sí se puede:
  - Pedirlo por escrito (ya viene como paso 6 en la pestaña *Instrucciones*).
  - Que guarden un marcador o acceso directo al archivo, para no buscar copias.
  - Si algo se ve raro, revisar *Archivo → Historial de versiones* (se puede restaurar).
- **Riesgo de una copia:** lo que capturen ahí no llega al sistema. Además, la copia lleva el menú y el script, pero sin acceso a La Biblia no puede importar nada.
- **Para no capturar al mismo cliente dos veces:** repartan filas (por ejemplo Karina de la 3 a la 250 y Dulce de la 251 a la 501). Si se repite un WhatsApp, el sistema omite el segundo.

## Uso diario

1. Karina y Dulce capturan clientes en la pestaña *Clientes*. La fila 2 es un EJEMPLO que no se sube.
2. Cuando la columna *Revision* diga OK en sus filas, te avisan.
3. Tú: menú **Doggy Wash → 1) Revisar (no importa nada)**. Marca cada fila como *LISTA*, *ERROR* u *OMITIDA* en *Resultado_Importacion*. Es la revisión oficial (incluye duplicados contra lo que ya está en el sistema).
4. Si hay errores, ellas los corrigen y repites el paso 3.
5. Menú **Doggy Wash → 2) Importar clientes válidos** → confirmas → las filas se agregan a `DW_Directorio_Clientes`.
6. En AppSheet toca **Sincronizar** para verlos en el Directorio.

## Reglas (lo que hace el script)

- **El WhatsApp de 10 dígitos es la llave.** Si ya existe en el sistema o está repetido en la hoja, la fila se **omite**. Nunca sobrescribe a un cliente existente.
- Acepta `+52` o `+521` en el número y lo normaliza a 10 dígitos.
- Cada cliente nuevo recibe un ID con el **mismo formato del backend** (`CLI-####-NN`, últimos 4 del WhatsApp + consecutivo).
- **No repite lo ya importado:** las filas con "IMPORTADO…" se saltan.
- Antes de escribir, verifica que las columnas de `DW_Directorio_Clientes` sean las esperadas (`CONFIG.ENCABEZADOS_SOT`, 9 columnas). Si alguien las cambió, aborta sin importar nada.
- Se importa por tandas de hasta 500 filas por hoja.
- `Total_Servicios` y `Ultima_Visita` se importan tal cual las capturan; si quedan vacías, el backend las actualiza cuando el cliente pida un servicio.
- La columna *Notas* es solo para ellas; **no** se sube.

## Antes de la primera importación grande

- Haz **una copia de La Biblia** (*Archivo → Crear una copia*). La importación agrega filas y no tiene botón de deshacer.
- Empieza con **2 clientes de prueba** para verificar que aparecen bien en el Sheet y en AppSheet. Bórralos a mano si no los quieres.

## Qué se probó y qué no

| Parte | Estado |
|---|---|
| Lógica de validación, duplicados, IDs y armado de filas | ✅ Probada con 30 casos (teléfonos con +52/guiones, fechas inválidas, duplicados contra el sistema y dentro de la hoja, filas vacías y de ejemplo, filas ya importadas) |
| Fórmulas de la columna *Revision* | ✅ Recalculadas: 500 fórmulas, 0 errores; los 10 casos de prueba dieron el mensaje esperado |
| Sintaxis de todo el código, incluida la protección de celdas | ✅ Sin errores |
| Ejecución dentro de Google Apps Script (menú, permisos, protección, escritura a La Biblia) | ⬜ **Aún no se ha corrido** en Google real. Por eso el primer uso debe ser con 2 clientes de prueba, y conviene **comprobar la protección** entrando a la hoja con la cuenta de Karina o Dulce y tratando de editar la columna *Revision* |
| Que las validaciones sobrevivan al convertir el .xlsx a Hojas de Google | ⬜ Por confirmar al abrirlo |

## Código

Ver `ImportarClientes.gs` (archivo hermano en esta carpeta). Se pega tal cual en el editor de Apps Script de la hoja "Carga masiva de clientes" — no se ejecuta ni se despliega desde este repo.
