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

    // 1.2.1 Bifurcación: seguimiento de cliente recurrente iniciado desde el chat.
    // Se activa solo con la llave fija "accion":"seguimiento_chat" que se configura
    // como Valor Fijo (no generado por IA) en la herramienta POST del AI Agent, para
    // no depender de nombres de campo autogenerados por Jotform. El flujo normal del
    // formulario web (abajo) no se modifica ni se ve afectado por esta rama.
    if (data && data.accion === "seguimiento_chat") {
      return registrarSeguimientoChat(sheetSolicitudes, sheetClientes, sheetDebug, data);
    }

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
    // conocidos del cliente cuando el formulario/chat no trae datos nuevos).
    // Columnas K-O (Nombre_Mascotas, Importe_Cotizado, Importe_Cobrado,
    // Medio_Pago, Fecha_Pago) quedan vacías: son de captura manual de
    // Karina/Dulce durante y después del servicio.
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
      "Sin Asignar",
      "",
      "",
      "",
      "",
      ""
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
    var sheetSolicitudes = ss.getSheetByName("DW_Solicitudes");
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
        var idClienteMatch = data[i][0];
        var mascotasCliente = data[i][5] || "tus mascotas";
        // Columna I (índice 8) de DW_Directorio_Clientes: Nombre_Mascotas,
        // el nombre real capturado manualmente por Karina/Dulce (ej. "Bella,
        // Algodón y Ruffy"), distinto de Mascotas_Registradas (col F, que es
        // raza/tamaño genérico). Es la fuente preferida para identificar al
        // cliente por nombre de mascota.
        var nombreMascotasDirectorio = (data[i][8] || "").toString().trim();
        var ultimaVisitaCliente = data[i][7] ? Utilities.formatDate(new Date(data[i][7]), "America/Mexico_City", "dd/MM/yyyy") : "N/D";

        // Cruce con DW_Solicitudes: si el Directorio aún no tiene
        // Nombre_Mascotas capturado, usar el de la última solicitud
        // (columna K) como respaldo antes de caer en la descripción
        // genérica de raza/tamaño.
        var nombreMascotasUltimoServicio = "";
        if (!nombreMascotasDirectorio && sheetSolicitudes) {
          var solData = sheetSolicitudes.getDataRange().getValues();
          for (var j = solData.length - 1; j >= 1; j--) {
            var solPhone = solData[j][5] ? solData[j][5].toString().replace(/\D/g, "") : "";
            var solIdCliente = solData[j][3];
            if (solPhone === whatsapp || (idClienteMatch && solIdCliente === idClienteMatch)) {
              nombreMascotasUltimoServicio = (solData[j][10] || "").toString().trim();
              break;
            }
          }
        }

        var detalleMascotas = nombreMascotasDirectorio || nombreMascotasUltimoServicio || mascotasCliente;

        // Timbrar automáticamente la solicitud de seguimiento y notificar a
        // recepción en el mismo momento en que se identifica al cliente, sin
        // esperar una segunda herramienta/turno del chat (que el agente no
        // encadenaba de forma confiable). Servicio queda "Por confirmar en
        // llamada": Karina/Dulce lo precisan al contactar al cliente.
        var tokenSeguimiento = registrarSolicitudSeguimiento(
          ss,
          data[i][0],
          nombreCliente,
          data[i][2],
          data[i][4],
          detalleMascotas
        );

        var mensajePersonalizado = "Claro, eres " + nombreCliente + ". Tu último servicio fue el " + ultimaVisitaCliente +
          " y solicitaste servicio para " + detalleMascotas + ". No es necesario que llenes la solicitud: ya notificamos a recepción y en breve nos pondremos en contacto para confirmar los datos de tu servicio." +
          " Aquí sigo en caso de cualquier duda general sobre nuestros servicios, o ya puedes cerrar esta ventana. En breve nos comunicamos.";

        return ContentService.createTextOutput(JSON.stringify({
          status: "encontrado",
          encontrado: true,
          mensaje: mensajePersonalizado,
          idCliente: data[i][0],
          nombre: data[i][1],
          whatsapp: data[i][2],
          domicilioHabitual: data[i][4],
          mascotasRegistradas: data[i][5],
          nombreMascotas: detalleMascotas,
          totalServicios: data[i][6],
          ultimaVisita: data[i][7],
          tokenSeguimiento: tokenSeguimiento
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

// ==========================================
// 5. SEGUIMIENTO DE CLIENTE RECURRENTE (POST desde el chat)
// ==========================================
// Registra una nueva solicitud para un cliente ya identificado vía doGet,
// sin pedirle de nuevo domicilio ni mascotas. Se dispara únicamente cuando
// doPost recibe la llave fija "accion":"seguimiento_chat" (ver 1.2.1).
function registrarSeguimientoChat(sheetSolicitudes, sheetClientes, sheetDebug, data) {
  try {
    var rawPhone = (data.whatsapp || data.phone || data.telefono || "").toString();
    var whatsapp = rawPhone.replace(/\D/g, "");
    if (whatsapp.length > 10) whatsapp = whatsapp.slice(-10);

    if (!whatsapp || whatsapp.length < 10) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        mensaje: "No se recibió un WhatsApp válido para el seguimiento."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var servicioSolicitado = (data.servicio || "").toString().trim() || "tu servicio habitual";

    var dirData = sheetClientes.getDataRange().getValues();
    var clienteExistente = null;

    for (var i = 1; i < dirData.length; i++) {
      var phoneInSheet = dirData[i][2].toString().replace(/\D/g, "");
      if (phoneInSheet === whatsapp) {
        clienteExistente = {
          id: dirData[i][0],
          nombre: dirData[i][1] || "Cliente por Confirmar",
          domicilio: dirData[i][4] || "No especificado",
          mascotas: dirData[i][5] || "Por confirmar en llamada"
        };
        var totalServicios = Number(dirData[i][6]) || 0;
        sheetClientes.getRange(i + 1, 7).setValue(totalServicios + 1);
        sheetClientes.getRange(i + 1, 8).setValue(Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd"));
        break;
      }
    }

    if (!clienteExistente) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        mensaje: "No se encontró un cliente registrado con ese WhatsApp para dar seguimiento."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var fechaStr = Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    var tokenServicio = "DW-" + Utilities.formatDate(new Date(), "America/Mexico_City", "yyMMdd") + "-" + randomNum;

    sheetSolicitudes.appendRow([
      tokenServicio,
      fechaStr,
      "Pendiente",
      clienteExistente.id,
      clienteExistente.nombre,
      whatsapp,
      clienteExistente.domicilio,
      "Por confirmar",
      clienteExistente.mascotas,
      "Sin Asignar",
      "",
      "",
      "",
      "",
      ""
    ]);

    var mensajeConfirmacion = "¡Listo, " + clienteExistente.nombre + "! Tu solicitud de " + servicioSolicitado + " quedó registrada con el folio " + tokenServicio + ". En breve, Karina o Dulce te contactarán por WhatsApp para confirmar el horario.";

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      mensaje: mensajeConfirmacion,
      token: tokenServicio,
      idCliente: clienteExistente.id
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    sheetDebug.appendRow([Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"), "ERROR SEGUIMIENTO: " + error.toString()]);
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      mensaje: "Ocurrió un error al registrar tu seguimiento. Por favor intenta de nuevo.",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 6. SEGUIMIENTO AUTOMÁTICO AL IDENTIFICAR CLIENTE (dentro de doGet)
// ==========================================
// Se ejecuta en el mismo instante en que un cliente recurrente es
// reconocido por WhatsApp en el chat: timbra la solicitud en
// DW_Solicitudes (Cant_Mascotas y Raza_Tamanio = "Por confirmar", ya que
// aún no se sabe qué quiere el cliente en esta ocasión; Nombre_Mascotas
// (col K) sí lleva el detalle conocido, como referencia para Karina/Dulce)
// y notifica a recepción por correo. No depende de una segunda
// herramienta del AI Agent ni de que el chat continúe la conversación.
//
// Protección anti-duplicados: si el mismo cliente (por ID) ya tiene una
// solicitud "Pendiente" registrada en las últimas VENTANA_ANTIDUP_HORAS
// horas, no se crea una fila nueva — se reutiliza el token existente.
// Evita registros repetidos si el chat vuelve a dispararse (p. ej. el
// cliente repite "ya soy cliente" en la misma conversación). En vez de
// fallar en silencio, se deja rastro en Debug_Logs y se avisa por correo
// a recepción de que el cliente insistió, con el folio ya existente, para
// que confirmen si ya fue atendido o si aún deben contactarlo.
function registrarSolicitudSeguimiento(ss, idCliente, nombre, whatsapp, domicilio, mascotas) {
  var sheetSolicitudes = ss.getSheetByName("DW_Solicitudes") || ss.insertSheet("DW_Solicitudes");
  var sheetDebug = ss.getSheetByName("Debug_Logs") || ss.insertSheet("Debug_Logs");
  var VENTANA_ANTIDUP_HORAS = 6;

  try {
    var solData = sheetSolicitudes.getDataRange().getValues();
    var ahora = new Date();
    for (var i = solData.length - 1; i >= 1; i--) {
      if (solData[i][3] !== idCliente) continue;
      if (solData[i][2] !== "Pendiente") continue;
      var fechaFila = new Date(solData[i][1]);
      if (isNaN(fechaFila.getTime())) continue;
      var horasTranscurridas = (ahora.getTime() - fechaFila.getTime()) / (1000 * 60 * 60);
      if (horasTranscurridas <= VENTANA_ANTIDUP_HORAS) {
        var tokenExistente = solData[i][0];
        sheetDebug.appendRow([
          Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"),
          "DUPLICADO EVITADO: cliente " + idCliente + " (" + nombre + ") ya tiene solicitud Pendiente " + tokenExistente + " (" + horasTranscurridas.toFixed(1) + "h). No se creó fila nueva."
        ]);
        try {
          MailApp.sendEmail({
            to: "contacto@petgroupbajio.com",
            subject: "Doggy Wash — Cliente insiste por chat, ya tiene solicitud pendiente: " + nombre,
            body: "Un cliente existente volvió a contactar por el chat pidiendo seguimiento, pero ya tiene una solicitud registrada como Pendiente en las últimas " + VENTANA_ANTIDUP_HORAS + " horas.\n\n" +
              "Folio existente: " + tokenExistente + "\n" +
              "ID Cliente: " + idCliente + "\n" +
              "Nombre: " + nombre + "\n" +
              "WhatsApp: " + whatsapp + "\n" +
              "Fecha de esta insistencia: " + Utilities.formatDate(ahora, "America/Mexico_City", "yyyy-MM-dd HH:mm:ss") + "\n\n" +
              "No se creó una fila nueva para evitar duplicados. Por favor confirmen en DW_Solicitudes si el folio " + tokenExistente + " ya fue atendido:\n" +
              "- Si NO ha sido atendido, contacten al cliente a la brevedad, puede estar esperando.\n" +
              "- Si YA fue atendido, actualicen su Estatus en la pestaña para que no se vuelva a marcar como pendiente."
          });
        } catch (mailErrorDup) {
          sheetDebug.appendRow([Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"), "ERROR CORREO DUPLICADO: " + mailErrorDup.toString()]);
        }
        return tokenExistente;
      }
      break; // Solo revisa la solicitud más reciente de este cliente
    }

    var fechaStr = Utilities.formatDate(ahora, "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    var tokenServicio = "DW-" + Utilities.formatDate(ahora, "America/Mexico_City", "yyMMdd") + "-" + randomNum;
    var detalleMascotasRef = mascotas || "Por confirmar en llamada";

    sheetSolicitudes.appendRow([
      tokenServicio,
      fechaStr,
      "Pendiente",
      idCliente,
      nombre,
      whatsapp,
      domicilio || "No especificado",
      "Por confirmar",
      "Por confirmar",
      "Sin Asignar",
      detalleMascotasRef,
      "",
      "",
      "",
      ""
    ]);

    try {
      MailApp.sendEmail({
        to: "contacto@petgroupbajio.com",
        subject: "Doggy Wash — Seguimiento de cliente vía chat: " + nombre,
        body: "Un cliente existente se puso en contacto por el chat y espera que le llamen para confirmar su servicio a la brevedad.\n\n" +
          "Folio: " + tokenServicio + "\n" +
          "ID Cliente: " + idCliente + "\n" +
          "Nombre: " + nombre + "\n" +
          "WhatsApp: " + whatsapp + "\n" +
          "Domicilio habitual: " + (domicilio || "No especificado") + "\n" +
          "Mascotas (referencia de su último servicio): " + detalleMascotasRef + "\n" +
          "Fecha de solicitud: " + fechaStr + "\n\n" +
          "Servicio y cantidad de mascotas para esta ocasión: por confirmar en llamada.\n" +
          "Revisar y asignar en la pestaña DW_Solicitudes."
      });
    } catch (mailError) {
      sheetDebug.appendRow([Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"), "ERROR CORREO SEGUIMIENTO: " + mailError.toString()]);
    }

    return tokenServicio;

  } catch (error) {
    sheetDebug.appendRow([Utilities.formatDate(new Date(), "America/Mexico_City", "yyyy-MM-dd HH:mm:ss"), "ERROR REGISTRO SEGUIMIENTO AUTOMÁTICO: " + error.toString()]);
    return "";
  }
}