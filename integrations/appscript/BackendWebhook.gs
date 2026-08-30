/**
 * ============================================================================
 * PET GROUP BAJÍO — DOGGY WASH BACKEND (Google Apps Script)
 * Documento de Control: IMP-2026-PGB-GAS-V6
 * Integración: Jotform Webhook (POST) + Jotform AI Agent (GET) + CRM Sheets SOT
 * ============================================================================
 */

// ==========================================
// 1. ENDPOINT POST (Recepción de Formularios)
// ==========================================
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetSolicitudes = ss.getSheetByName("DW_Solicitudes") || ss.insertSheet("DW_Solicitudes");
  var sheetClientes = ss.getSheetByName("DW_Directorio_Clientes") || ss.insertSheet("DW_Directorio_Clientes");
  var sheetDebug = ss.getSheetByName("Debug_Logs") || ss.insertSheet("Debug_Logs");

  try {
    var rawPayloadString = "";
    var data = {};

    // 1.1 Extracción de carga útil cruda
    if (e && e.parameter && e.parameter.rawRequest) {
      rawPayloadString = e.parameter.rawRequest;
      try {
        data = JSON.parse(e.parameter.rawRequest);
      } catch (errJson) {
        data = e.parameter;
      }
    } else if (e && e.postData && e.postData.contents) {
      rawPayloadString = e.postData.contents;
      try {
        data = JSON.parse(e.postData.contents);
      } catch (errJson2) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
      rawPayloadString = JSON.stringify(e.parameter);
    }

    // 1.2 Registro en pestaña Debug_Logs (Inspección en tiempo real)
    var timestampLog = Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");
    sheetDebug.appendRow([timestampLog, rawPayloadString]);

    // 1.3 Extracción Universal con Inspección Profunda de Llaves
    var parsed = parseJotformPayload(data);

    var fechaStr = Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");
    var fechaCorta = Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd");

    // 1.4 Generación de Token de Servicio Antifraude
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    var tokenServicio = "DW-" + Utilities.formatDate(new Date(), "America/Mexico_City", "yyMMdd") + "-" + randomNum;

    // 1.5 Procesar en Directorio de Clientes (Deduplicación)
    var clienteInfo = procesarDirectorioClientes(
      sheetClientes,
      parsed.nombre,
      parsed.whatsapp,
      "",
      parsed.domicilio,
      parsed.razaYTamanio,
      fechaCorta
    );

    // 1.6 Timbrar solicitud en DW_Solicitudes (hereda domicilio/mascotas ya
    // conocidos del cliente cuando el formulario/chat no trae datos nuevos)
    sheetSolicitudes.appendRow([
      tokenServicio,
      fechaStr,
      "Pendiente",
      clienteInfo.id,
      clienteInfo.nombre,
      parsed.whatsapp,
      clienteInfo.domicilio,
      parsed.cantMascotas,
      clienteInfo.mascotas,
      "Sin Asignar"
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      token: tokenServicio,
      idCliente: clienteInfo.id,
      dataParsed: parsed
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    sheetDebug.appendRow([Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"), "ERROR: " + error.toString()]);
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 2. ENDPOINT GET (Consulta desde AI Agent)
// ==========================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetClientes = ss.getSheetByName("DW_Directorio_Clientes");
    if (!sheetClientes) throw new Error("Pestaña DW_Directorio_Clientes no encontrada");

    var rawParam = (e && e.parameter) ? (e.parameter.whatsapp || e.parameter.phone || e.parameter.telefono || e.parameter.q1_phone || "") : "";
    var whatsapp = rawParam.toString().replace(/\D/g, "");
    if (whatsapp.length > 10) whatsapp = whatsapp.slice(-10);

    if (!whatsapp) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        encontrado: false,
        mensaje: "Por favor proporciona un número de WhatsApp a 10 dígitos."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = sheetClientes.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      var phoneInSheet = data[i][2].toString().replace(/\D/g, "");
      if (phoneInSheet === whatsapp) {
        var nombreCliente = data[i][1] || "Cliente";
        var mascotasCliente = data[i][5] || "tus mascotas";
        var ultimaVisitaCliente = data[i][7] ? Utilities.formatDate(new Date(data[i][7]), "America/Mexico_City", "dd/MM/yyyy") : "N/D";
        var mensajePersonalizado = "Claro, eres " + nombreCliente + ". Tu último servicio fue el " + ultimaVisitaCliente + " y solicitaste servicio para " + mascotasCliente + ".";

        return ContentService.createTextOutput(JSON.stringify({
          status: "encontrado",
          encontrado: true,
          mensaje: mensajePersonalizado,
          idCliente: data[i][0],
          nombre: data[i][1],
          whatsapp: data[i][2],
          domicilioHabitual: data[i][4],
          mascotasRegistradas: data[i][5],
          totalServicios: data[i][6],
          ultimaVisita: data[i][7]
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "nuevo",
      encontrado: false,
      mensaje: "No se encontró registro previo con este número."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      encontrado: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 3. PARSER UNIVERSAL DE CAMPOS JOTFORM
// ==========================================
function parseJotformPayload(data) {
  var result = {
    whatsapp: "",
    domicilio: "No especificado",
    cantMascotas: "1",
    razaYTamanio: "Por confirmar en llamada",
    nombre: "Cliente por Confirmar"
  };

  if (!data || typeof data !== "object") return result;

  for (var key in data) {
    if (!data.hasOwnProperty(key)) continue;
    var val = data[key];
    if (val === null || val === undefined || val === "") continue;

    var k = key.toLowerCase();

    // 1. WhatsApp
    if (!result.whatsapp && (k.indexOf("phone") !== -1 || k.indexOf("whats") !== -1 || k.indexOf("tel") !== -1)) {
      var cleanPhone = typeof val === "object" ? (val.full || JSON.stringify(val)) : val.toString();
      cleanPhone = cleanPhone.replace(/\D/g, "");
      if (cleanPhone.length >= 10) result.whatsapp = cleanPhone.slice(-10);
    }

    // 2. Cantidad de Mascotas
    if (result.cantMascotas === "1" && (k.indexOf("enano") !== -1 || k.indexOf("cant") !== -1 || k.indexOf("numero") !== -1 || k.indexOf("mascota") !== -1)) {
      var cantStr = val.toString().trim();
      var matchNum = cantStr.match(/\d+/);
      result.cantMascotas = matchNum ? matchNum[0] : cantStr;
    }

    // 3. Raza / Tamaño
    if (result.razaYTamanio === "Por confirmar en llamada" && typeof val !== "object" && (k.indexOf("raza") !== -1 || k.indexOf("tamano") !== -1 || k.indexOf("tamanio") !== -1)) {
      result.razaYTamanio = val.toString().trim();
    }

    // 4. Domicilio / Dirección
    if (result.domicilio === "No especificado" && (k.indexOf("direcc") !== -1 || k.indexOf("domicilio") !== -1 || k.indexOf("address") !== -1)) {
      if (typeof val === "object") {
        var parts = [];
        if (val.addr_line1) parts.push(val.addr_line1);
        if (val.addr_line2) parts.push(val.addr_line2);
        if (val.city) parts.push(val.city);
        if (val.state) parts.push(val.state);
        if (val.postal) parts.push("CP " + val.postal);
        if (parts.length === 0 && Array.isArray(val)) {
          parts = val.filter(function(item) { return item && typeof item === "string"; });
        }
        if (parts.length > 0) result.domicilio = parts.join(", ");
      } else {
        result.domicilio = val.toString().replace(/[\r\n]+/g, ", ").trim();
      }
    }

    // 5. Nombre
    if (result.nombre === "Cliente por Confirmar" && (k.indexOf("nombre") !== -1 || k.indexOf("name") !== -1 || k.indexOf("fullname") !== -1)) {
      if (typeof val === "object") {
        var fullName = ((val.first || "") + " " + (val.last || "")).trim();
        if (fullName) result.nombre = fullName;
      } else {
        result.nombre = val.toString().trim();
      }
    }
  }

  // Respaldo de WhatsApp si venía como número aislado
  if (!result.whatsapp) {
    for (var kFallback in data) {
      var vFallback = (data[kFallback] || "").toString().replace(/\D/g, "");
      if (vFallback.length >= 10) {
        result.whatsapp = vFallback.slice(-10);
        break;
      }
    }
  }

  return result;
}

// ==========================================
// 4. CRM Y CONTROL HISTÓRICO
// ==========================================
function procesarDirectorioClientes(sheet, nombre, whatsapp, telSecundario, domicilio, razaYTamanio, fechaCorta) {
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  var idClienteExistente = "";
  var totalServicios = 0;

  for (var i = 1; i < data.length; i++) {
    var phoneInSheet = data[i][2].toString().replace(/\D/g, "");
    if (whatsapp !== "" && phoneInSheet === whatsapp) {
      rowIndex = i + 1;
      idClienteExistente = data[i][0];
      totalServicios = Number(data[i][6]) || 0;
      break;
    }
  }

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 7).setValue(totalServicios + 1);
    sheet.getRange(rowIndex, 8).setValue(fechaCorta);
    if (domicilio !== "No especificado") {
      sheet.getRange(rowIndex, 5).setValue(domicilio);
    }
    var mascotasPrevias = data[rowIndex - 1][5].toString();
    if (razaYTamanio !== "Por confirmar en llamada" && mascotasPrevias.indexOf(razaYTamanio) === -1) {
      var nuevoHistorial = mascotasPrevias ? mascotasPrevias + " | " + razaYTamanio : razaYTamanio;
      sheet.getRange(rowIndex, 6).setValue(nuevoHistorial);
    }
    return {
      id: idClienteExistente,
      nombre: data[rowIndex - 1][1] || nombre,
      domicilio: domicilio !== "No especificado" ? domicilio : (data[rowIndex - 1][4] || domicilio),
      mascotas: razaYTamanio !== "Por confirmar en llamada" ? razaYTamanio : (mascotasPrevias || razaYTamanio)
    };
  } else {
    var countClientes = data.length;
    var nuevoId = "CLI-" + (whatsapp !== "" ? whatsapp.slice(-4) : "0000") + "-" + (countClientes < 10 ? "0" + countClientes : countClientes);
    sheet.appendRow([
      nuevoId,
      nombre,
      whatsapp,
      telSecundario,
      domicilio,
      razaYTamanio,
      1,
      fechaCorta
    ]);
    return { id: nuevoId, nombre: nombre, domicilio: domicilio, mascotas: razaYTamanio };
  }
}