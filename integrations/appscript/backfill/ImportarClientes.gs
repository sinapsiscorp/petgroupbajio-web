/**
 * DOGGY WASH — CARGA MASIVA DE CLIENTES (backfill)
 * ------------------------------------------------------------------
 * Este script vive en la hoja "Carga masiva de clientes" (la que llenan
 * Karina y Dulce). NO vive en La Biblia.
 *
 * Lo ejecuta un ADMIN (Ulises o Larissa), porque necesita permiso de edición
 * sobre La Biblia. Karina y Dulce solo capturan; no tocan La Biblia.
 *
 * Flujo:  Doggy Wash > 1) Revisar  →  corregir errores  →  2) Importar
 *
 * Reglas:
 *  - El WhatsApp (10 dígitos) es la llave: si ya existe en DW_Directorio_Clientes
 *    o está repetido en la hoja, la fila se OMITE (nunca se sobrescribe a nadie).
 *  - Cada fila importada recibe ID con el mismo formato que usa el backend
 *    (CLI-####-NN: últimos 4 del WhatsApp + consecutivo).
 *  - Filas ya importadas (Resultado_Importacion = "IMPORTADO ...") no se repiten.
 *  - Filas cuyo nombre empieza con "EJEMPLO" se ignoran.
 */

var CONFIG = {
  SOT_ID: 'PEGAR_AQUI_EL_ID_DE_LA_BIBLIA', // La Biblia (Agenda Digital Doggy) — la copia viva de esta hoja SÍ lleva el ID real
  SOT_TAB_CLIENTES: 'DW_Directorio_Clientes',
  TAB_CAPTURA: 'Clientes',
  TAB_HISTORIAL: 'Historial_Importaciones',
  MAX_FILAS: 500,
  // Quiénes pueden editar las celdas de sistema y ejecutar la importación.
  // Escribe aquí el correo REAL de Larissa (y el tuyo si es distinto) antes de usar el menú 3).
  ADMINS: ['<CUENTA_DUENA>', 'COMPLETAR_CORREO_DE_LARISSA@gmail.com']
};

// Orden EXACTO de columnas de DW_Directorio_Clientes (se valida antes de escribir).
var ENCABEZADOS_SOT = [
  'ID_Cliente', 'Nombre_Cliente', 'WhatsApp_Principal', 'Telefono_Secundario',
  'Domicilio_Habitual', 'Mascotas_Registradas', 'Total_Servicios',
  'Ultima_Visita', 'Nombre_Mascotas'
];

/* ===================== MENÚ ===================== */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Doggy Wash')
    .addItem('1) Revisar (no importa nada)', 'revisarClientes')
    .addItem('2) Importar clientes válidos', 'importarClientes')
    .addSeparator()
    .addItem('3) Proteger celdas de sistema (una sola vez)', 'protegerCeldasSistema')
    .addToUi();
}

function revisarClientes() { ejecutar_(false); }
function importarClientes() { ejecutar_(true); }

/* ============ LÓGICA PURA (se prueba fuera de Apps Script) ============ */
// <<PURE_START>>

function esVacio_(v) {
  return v === null || v === undefined || String(v).trim() === '';
}

function limpiarTexto_(v) {
  return esVacio_(v) ? '' : String(v).replace(/\s+/g, ' ').trim();
}

function soloDigitos_(v) {
  return (v === null || v === undefined) ? '' : String(v).replace(/\D/g, '');
}

// Devuelve 10 dígitos o '' si no se puede normalizar. Acepta +52 y +521.
function normalizarTelefono_(v) {
  var d = soloDigitos_(v);
  if (d.length === 13 && d.indexOf('521') === 0) d = d.slice(3);
  else if (d.length === 12 && d.indexOf('52') === 0) d = d.slice(2);
  return d.length === 10 ? d : '';
}

// { ok:true, fecha:Date|null } | { ok:false }
function parseFecha_(v) {
  if (esVacio_(v)) return { ok: true, fecha: null };
  if (Object.prototype.toString.call(v) === '[object Date]') {
    return isNaN(v.getTime()) ? { ok: false } : { ok: true, fecha: v };
  }
  var s = String(v).trim();
  var m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  var d, mo, y;
  if (m) { d = +m[1]; mo = +m[2]; y = +m[3]; }
  else {
    var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!iso) return { ok: false };
    y = +iso[1]; mo = +iso[2]; d = +iso[3];
  }
  var f = new Date(y, mo - 1, d, 12, 0, 0);
  if (f.getFullYear() !== y || f.getMonth() !== mo - 1 || f.getDate() !== d) return { ok: false };
  return { ok: true, fecha: f };
}

function generarIdCliente_(whatsapp10, consecutivo) {
  var n = consecutivo < 10 ? '0' + consecutivo : String(consecutivo);
  return 'CLI-' + whatsapp10.slice(-4) + '-' + n;
}

/**
 * filas: [{fila, nombre, whatsapp, tel2, domicilio, nombreMascotas, razaTamano,
 *          totalServicios, ultimaVisita, resultadoPrevio}]
 * existentes: { whatsapp10: ID_Cliente }  (lo que ya hay en La Biblia)
 * hoy: Date (para rechazar fechas futuras)
 * Estados: VACIA | YA_IMPORTADA | EJEMPLO | ERROR | DUPLICADO_SISTEMA | DUPLICADO_HOJA | LISTA
 */
function clasificarFilas_(filas, existentes, hoy) {
  var vistos = {};
  return filas.map(function (f) {
    var r = { fila: f.fila, estado: '', motivo: '', registro: null };
    var nombre = limpiarTexto_(f.nombre);

    var vacia = !nombre && esVacio_(f.whatsapp) && esVacio_(f.tel2) && esVacio_(f.domicilio) &&
      esVacio_(f.nombreMascotas) && esVacio_(f.razaTamano) && esVacio_(f.totalServicios) &&
      esVacio_(f.ultimaVisita);
    if (vacia) { r.estado = 'VACIA'; return r; }

    if (/^IMPORTADO/i.test(limpiarTexto_(f.resultadoPrevio))) { r.estado = 'YA_IMPORTADA'; return r; }
    if (/^EJEMPLO/i.test(nombre)) { r.estado = 'EJEMPLO'; return r; }

    var errores = [];
    if (!nombre) errores.push('Falta el nombre');

    var wa = normalizarTelefono_(f.whatsapp);
    if (!wa) errores.push('WhatsApp inválido (deben ser 10 dígitos)');

    var tel2 = '';
    if (!esVacio_(f.tel2)) {
      tel2 = normalizarTelefono_(f.tel2);
      if (!tel2) errores.push('Teléfono secundario inválido (10 dígitos)');
    }

    var total = '';
    if (!esVacio_(f.totalServicios)) {
      var n = Number(String(f.totalServicios).trim());
      if (!isFinite(n) || n < 0 || n % 1 !== 0) errores.push('Servicios previos debe ser un número entero');
      else total = n;
    }

    var pf = parseFecha_(f.ultimaVisita);
    if (!pf.ok) errores.push('Fecha inválida (usa dd/mm/aaaa)');
    else if (pf.fecha && hoy && pf.fecha.getTime() > hoy.getTime()) errores.push('La última visita no puede ser futura');

    if (errores.length) { r.estado = 'ERROR'; r.motivo = errores.join('; '); return r; }

    if (existentes[wa]) { r.estado = 'DUPLICADO_SISTEMA'; r.motivo = 'Ya existe en el sistema (' + existentes[wa] + ')'; return r; }
    if (vistos[wa]) { r.estado = 'DUPLICADO_HOJA'; r.motivo = 'Repetido en la fila ' + vistos[wa]; return r; }
    vistos[wa] = f.fila;

    r.estado = 'LISTA';
    r.registro = {
      nombre: nombre, whatsapp: wa, tel2: tel2,
      domicilio: limpiarTexto_(f.domicilio),
      nombreMascotas: limpiarTexto_(f.nombreMascotas),
      razaTamano: limpiarTexto_(f.razaTamano),
      total: total, ultimaVisita: pf.fecha
    };
    return r;
  });
}

// Arma las filas en el orden de ENCABEZADOS_SOT. ultimaFila = getLastRow() de la hoja destino ANTES de escribir.
// El consecutivo replica al backend: lastRow + posición (primer cliente con hoja vacía = 01).
function armarFilasSot_(registros, ultimaFila) {
  var ids = [];
  var filas = registros.map(function (g, i) {
    var id = generarIdCliente_(g.whatsapp, ultimaFila + i);
    ids.push(id);
    return [id, g.nombre, Number(g.whatsapp), g.tel2 ? Number(g.tel2) : '', g.domicilio,
            g.razaTamano, g.total, g.ultimaVisita || '', g.nombreMascotas];
  });
  return { filas: filas, ids: ids };
}

// <<PURE_END>>

/* ===================== HOJA DE CAPTURA ===================== */

function leerCaptura_() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.TAB_CAPTURA);
  if (!hoja) throw new Error('No encuentro la pestaña "' + CONFIG.TAB_CAPTURA + '".');

  var lastCol = hoja.getLastColumn();
  var enc = hoja.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
  var idx = {};
  enc.forEach(function (h, i) { if (h) idx[h] = i; });
  ['Nombre_Cliente', 'WhatsApp_Principal', 'Resultado_Importacion'].forEach(function (h) {
    if (!(h in idx)) throw new Error('Falta la columna "' + h + '" en la fila 1. No la cambies de nombre.');
  });

  var n = Math.min(CONFIG.MAX_FILAS, hoja.getMaxRows() - 1);
  var vals = hoja.getRange(2, 1, n, lastCol).getValues();
  var val = function (row, h) { return (h in idx) ? row[idx[h]] : ''; };

  var filas = vals.map(function (row, i) {
    return {
      fila: i + 2,
      nombre: val(row, 'Nombre_Cliente'),
      whatsapp: val(row, 'WhatsApp_Principal'),
      tel2: val(row, 'Telefono_Secundario'),
      domicilio: val(row, 'Domicilio_Habitual'),
      nombreMascotas: val(row, 'Nombre_Mascotas'),
      razaTamano: val(row, 'Mascotas_Registradas'),
      totalServicios: val(row, 'Total_Servicios'),
      ultimaVisita: val(row, 'Ultima_Visita'),
      resultadoPrevio: val(row, 'Resultado_Importacion')
    };
  });
  return { hoja: hoja, colResultado: idx['Resultado_Importacion'] + 1, filas: filas };
}

function escribirResultados_(captura, clasif, importados) {
  // importados: { fila: ID } para las filas recién importadas
  var n = clasif.length;
  var rango = captura.hoja.getRange(2, captura.colResultado, n, 1);
  var actuales = rango.getValues();
  var fondos = rango.getBackgrounds();
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
  var VERDE = '#E6F4EA', ROJO = '#FCE8E6', AMARILLO = '#FEF7E0', SIN = '#FFFFFF';

  clasif.forEach(function (r, i) {
    if (r.estado === 'LISTA') {
      if (importados && importados[r.fila]) {
        actuales[i][0] = 'IMPORTADO ' + stamp + ' (' + importados[r.fila] + ')'; fondos[i][0] = VERDE;
      } else { actuales[i][0] = 'LISTA para importar'; fondos[i][0] = VERDE; }
    } else if (r.estado === 'ERROR') {
      actuales[i][0] = 'ERROR: ' + r.motivo; fondos[i][0] = ROJO;
    } else if (r.estado === 'DUPLICADO_SISTEMA' || r.estado === 'DUPLICADO_HOJA') {
      actuales[i][0] = 'OMITIDA: ' + r.motivo; fondos[i][0] = AMARILLO;
    } else if (r.estado === 'EJEMPLO') {
      actuales[i][0] = 'Ejemplo (no se importa)'; fondos[i][0] = SIN;
    }
    // VACIA y YA_IMPORTADA: se dejan como están.
  });
  rango.setValues(actuales);
  rango.setBackgrounds(fondos);
}

/* ===================== LA BIBLIA (destino) ===================== */

function abrirSot_() {
  var hoja = SpreadsheetApp.openById(CONFIG.SOT_ID).getSheetByName(CONFIG.SOT_TAB_CLIENTES);
  if (!hoja) throw new Error('No encuentro la pestaña "' + CONFIG.SOT_TAB_CLIENTES + '" en La Biblia.');

  var enc = hoja.getRange(1, 1, 1, ENCABEZADOS_SOT.length).getValues()[0]
    .map(function (h) { return String(h).trim(); });
  if (enc.join('|') !== ENCABEZADOS_SOT.join('|')) {
    throw new Error('Las columnas de ' + CONFIG.SOT_TAB_CLIENTES + ' no coinciden con lo esperado. ' +
      'No se importó nada. Avisa a Ulises.');
  }

  var ultima = hoja.getLastRow();
  var existentes = {};
  if (ultima > 1) {
    hoja.getRange(2, 1, ultima - 1, 3).getValues().forEach(function (r) {
      var d = soloDigitos_(r[2]).slice(-10);
      if (d) existentes[d] = r[0];
    });
  }
  return { hoja: hoja, ultimaFila: ultima, existentes: existentes };
}

/* ===================== PROCESO PRINCIPAL ===================== */

function contar_(clasif) {
  var c = { listas: 0, errores: 0, duplicadas: 0, ejemplo: 0, yaImportadas: 0 };
  clasif.forEach(function (r) {
    if (r.estado === 'LISTA') c.listas++;
    else if (r.estado === 'ERROR') c.errores++;
    else if (r.estado === 'DUPLICADO_SISTEMA' || r.estado === 'DUPLICADO_HOJA') c.duplicadas++;
    else if (r.estado === 'EJEMPLO') c.ejemplo++;
    else if (r.estado === 'YA_IMPORTADA') c.yaImportadas++;
  });
  return c;
}

function resumen_(c) {
  return 'Listas para importar: ' + c.listas + '\n' +
         'Con error (corregir): ' + c.errores + '\n' +
         'Omitidas por duplicado: ' + c.duplicadas + '\n' +
         'Ya importadas antes: ' + c.yaImportadas;
}

function ejecutar_(importar) {
  var ui = SpreadsheetApp.getUi();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) { ui.alert('Hay otra importación en curso. Intenta de nuevo en un minuto.'); return; }

  try {
    var captura = leerCaptura_();
    var sot = abrirSot_();
    var clasif = clasificarFilas_(captura.filas, sot.existentes, new Date());
    var c = contar_(clasif);

    if (!importar) {
      escribirResultados_(captura, clasif, null);
      ui.alert('Revisión terminada (no se importó nada)', resumen_(c) +
        '\n\nRevisa la columna Resultado_Importacion. Corrige las filas en rojo y vuelve a revisar.', ui.ButtonSet.OK);
      return;
    }

    if (c.listas === 0) {
      escribirResultados_(captura, clasif, null);
      ui.alert('No hay clientes válidos por importar', resumen_(c), ui.ButtonSet.OK);
      return;
    }

    var resp = ui.alert('Importar clientes a La Biblia',
      'Se agregarán ' + c.listas + ' cliente(s) a ' + CONFIG.SOT_TAB_CLIENTES + '.\n\n' + resumen_(c) +
      '\n\nEsta acción agrega filas al sistema real. ¿Continuar?', ui.ButtonSet.YES_NO);
    if (resp !== ui.Button.YES) {
      escribirResultados_(captura, clasif, null);
      ui.alert('Cancelado. No se importó nada.');
      return;
    }

    var listas = clasif.filter(function (r) { return r.estado === 'LISTA'; });
    var armado = armarFilasSot_(listas.map(function (r) { return r.registro; }), sot.ultimaFila);

    var n = armado.filas.length;
    var inicio = sot.ultimaFila + 1;
    var falta = inicio + n - 1 - sot.hoja.getMaxRows();
    if (falta > 0) sot.hoja.insertRowsAfter(sot.hoja.getMaxRows(), falta);

    sot.hoja.getRange(inicio, 1, n, ENCABEZADOS_SOT.length).setValues(armado.filas);
    sot.hoja.getRange(inicio, 3, n, 2).setNumberFormat('0');            // WhatsApp y teléfono secundario
    sot.hoja.getRange(inicio, 8, n, 1).setNumberFormat('yyyy-mm-dd');   // Ultima_Visita
    SpreadsheetApp.flush();

    var importados = {};
    listas.forEach(function (r, i) { importados[r.fila] = armado.ids[i]; });
    escribirResultados_(captura, clasif, importados);
    registrarHistorial_(c, n);

    ui.alert('Importación terminada', 'Se importaron ' + n + ' cliente(s).\n\n' + resumen_(c) +
      '\n\nEn AppSheet, toca Sincronizar para verlos.', ui.ButtonSet.OK);
  } catch (e) {
    ui.alert('No se pudo completar', String(e.message || e), ui.ButtonSet.OK);
  } finally {
    lock.releaseLock();
  }
}

function registrarHistorial_(c, importados) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var h = ss.getSheetByName(CONFIG.TAB_HISTORIAL);
  if (!h) {
    h = ss.insertSheet(CONFIG.TAB_HISTORIAL);
    h.appendRow(['Fecha', 'Usuario', 'Importados', 'Con error', 'Omitidos por duplicado']);
    h.setFrozenRows(1);
    var admins = adminsValidos_();
    if (admins) aplicarBloqueo_(h.protect(), 'hoja completa ' + CONFIG.TAB_HISTORIAL, admins);
  }
  h.appendRow([new Date(), Session.getActiveUser().getEmail(), importados, c.errores, c.duplicadas]);
}

/* ===================== PROTECCIÓN DE CELDAS DE SISTEMA ===================== */
// Deja editables solo las celdas de captura (A a I). Bloquea: columnas Revision y
// Resultado_Importacion, la fila de encabezados y las pestañas Instrucciones e Historial.
// Solo pueden editar lo bloqueado los correos de CONFIG.ADMINS (necesario para que la
// importación pueda escribir el resultado en cada fila).

// Devuelve los correos de ADMINS, o null si aún falta completar el de Larissa.
function adminsValidos_() {
  var lista = CONFIG.ADMINS.filter(function (e) { return e && e.indexOf('@') > 0; });
  var pendiente = lista.some(function (e) { return e.toUpperCase().indexOf('COMPLETAR') === 0; });
  return (pendiente || !lista.length) ? null : lista;
}

function aplicarBloqueo_(proteccion, descripcion, admins) {
  proteccion.setDescription('Sistema: ' + descripcion);
  proteccion.removeEditors(proteccion.getEditors());   // el dueño de la hoja nunca se puede quitar
  proteccion.addEditors(admins);
  if (proteccion.canDomainEdit()) proteccion.setDomainEdit(false);
}

function protegerCeldasSistema() {
  var ui = SpreadsheetApp.getUi();
  var admins = adminsValidos_();
  if (!admins) {
    ui.alert('Falta un dato antes de proteger',
      'En el código (CONFIG.ADMINS) escribe el correo real de Larissa en lugar de "COMPLETAR_CORREO_DE_LARISSA@gmail.com", guarda, y vuelve a ejecutar este paso.',
      ui.ButtonSet.OK);
    return;
  }
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var captura = ss.getSheetByName(CONFIG.TAB_CAPTURA);
    if (!captura) throw new Error('No encuentro la pestaña "' + CONFIG.TAB_CAPTURA + '".');

    // Quita protecciones anteriores de este script, para poder ejecutarlo más de una vez.
    ss.getSheets().forEach(function (sh) {
      [SpreadsheetApp.ProtectionType.RANGE, SpreadsheetApp.ProtectionType.SHEET].forEach(function (tipo) {
        sh.getProtections(tipo).forEach(function (p) {
          if (String(p.getDescription()).indexOf('Sistema:') === 0) p.remove();
        });
      });
    });

    var encabezados = captura.getRange(1, 1, 1, captura.getLastColumn()).getValues()[0]
      .map(function (h) { return String(h).trim(); });
    var maxFilas = captura.getMaxRows();
    ['Revision', 'Resultado_Importacion'].forEach(function (nombre) {
      var i = encabezados.indexOf(nombre);
      if (i < 0) throw new Error('No encuentro la columna "' + nombre + '" en la fila 1.');
      aplicarBloqueo_(captura.getRange(1, i + 1, maxFilas, 1).protect(), 'columna ' + nombre, admins);
    });
    aplicarBloqueo_(captura.getRange(1, 1, 1, captura.getMaxColumns()).protect(), 'fila de encabezados', admins);

    [ 'Instrucciones', CONFIG.TAB_HISTORIAL ].forEach(function (nombre) {
      var sh = ss.getSheetByName(nombre);
      if (sh) aplicarBloqueo_(sh.protect(), 'hoja completa ' + nombre, admins);
    });

    ui.alert('Celdas de sistema protegidas',
      'Karina y Dulce solo pueden editar las columnas de captura (A a I).\nQuedó bloqueado: Revision, Resultado_Importacion, la fila de encabezados y las pestañas Instrucciones e Historial.\n\nPueden editarlo: ' + admins.join(', '),
      ui.ButtonSet.OK);
  } catch (e) {
    ui.alert('No se pudo proteger', String(e.message || e), ui.ButtonSet.OK);
  }
}
