"use client";

import { useState } from "react";
import Link from "next/link";

export default function VerificarTokenPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const gasWebhookUrl = process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL || "";

  const handleSearchToken = async (e) => {
    e.preventDefault();

    if (!tokenInput.trim()) {
      setErrorMsg("Por favor ingresa un folio o token válido (ej. DW-260829-2804).");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setServiceData(null);

    try {
      if (!gasWebhookUrl || gasWebhookUrl.includes("TU_DEPLOYMENT_ID")) {
        setTimeout(() => {
          setServiceData({
            token: tokenInput.trim().toUpperCase(),
            fecha: "2026-08-29 19:32",
            estatus: "Confirmado",
            cliente: "Cliente Validado",
            colonia: "Lomas del Campestre",
            mascotas: "2",
            raza: "1 perro mestizo y 1 gato siamés",
            operador: "Alan (Unidad 01)",
          });
          setLoading(false);
        }, 700);
        return;
      }

      const res = await fetch(
        `${gasWebhookUrl}?token=${encodeURIComponent(tokenInput.trim().toUpperCase())}`
      );
      const data = await res.json();

      if (data.status === "encontrado" || data.result === "success") {
        setServiceData(data.servicio || data);
      } else {
        setErrorMsg(data.mensaje || "No se encontró ningún servicio activo con este folio.");
      }
    } catch (err) {
      setErrorMsg("Error de conexión al consultar el token. Verifica tu señal celular.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (nuevoEstatus) => {
    if (pinInput !== "2026") {
      setErrorMsg("PIN de Operador incorrecto. Ingresa el PIN asignado a tu unidad.");
      return;
    }

    if (!serviceData && !tokenInput.trim()) {
      setErrorMsg("Primero consulta un folio válido para poder actualizar su estatus.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!gasWebhookUrl || gasWebhookUrl.includes("TU_DEPLOYMENT_ID")) {
        setTimeout(() => {
          setServiceData((prev) => ({ ...prev, estatus: nuevoEstatus }));
          setSuccessMsg(`¡Servicio actualizado a "${nuevoEstatus}" exitosamente!`);
          setPinInput("");
          setLoading(false);
        }, 600);
        return;
      }

      const payload = {
        action: "update_status",
        token: serviceData?.token || tokenInput.trim().toUpperCase(),
        nuevoEstatus,
        pin: pinInput,
      };

      const res = await fetch(gasWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.result === "success") {
        setServiceData((prev) => ({ ...prev, estatus: nuevoEstatus }));
        setSuccessMsg(`¡Estatus actualizado a "${nuevoEstatus}" correctamente en La Biblia!`);
        setPinInput("");
      } else {
        setErrorMsg(resData.error || "No se pudo actualizar el estatus.");
      }
    } catch (err) {
      setErrorMsg("Error al sincronizar con el servidor central.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/80 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto w-full sticky top-0 z-50">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          &larr; Hub Pet Group
        </Link>
        <span className="font-extrabold text-sky-400 tracking-wider">PORTAL DE VERIFICACIÓN</span>
      </nav>

      <main className="max-w-5xl mx-auto w-full px-4 py-8 flex-grow">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
              Consulta para clientes
            </div>

            <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">Estado de tu servicio</h1>
            <p className="mt-3 max-w-lg text-sm text-slate-300">
              Aquí puedes consultar el avance de tu cita, confirmar la programación y revisar el estatus del servicio asignado.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Ejemplo de folio</p>
              <p className="mt-2 font-mono text-lg font-black text-amber-300">DW-260829-2804</p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2"><span className="mt-1 text-sky-400">•</span>Usa el folio entregado por el equipo de atención.</li>
              <li className="flex items-start gap-2"><span className="mt-1 text-sky-400">•</span>La información mostrada es de seguimiento operativo y no sustituye la atención directa.</li>
              <li className="flex items-start gap-2"><span className="mt-1 text-sky-400">•</span>Si necesitas cambio o apoyo adicional, contacta a tu operador o a la atención del servicio.</li>
            </ul>
          </section>

          <aside className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Área interna</span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-300">
                Operación
              </span>
            </div>

            <form onSubmit={handleSearchToken} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  Folio o Token de Servicio
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Ej. DW-260829-2804"
                    className="flex-grow rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 uppercase focus:border-sky-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-500 disabled:opacity-50"
                  >
                    {loading ? "Buscando..." : "Consultar"}
                  </button>
                </div>
              </div>
            </form>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                ⚠️ {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                ✅ {successMsg}
              </div>
            )}

            {serviceData && (
              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Folio oficial</span>
                    <p className="mt-1 font-mono text-base font-black text-amber-300">
                      {serviceData.token || tokenInput.toUpperCase()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-bold ${
                      serviceData.estatus === "Finalizado"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : serviceData.estatus === "En Ruta"
                          ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {serviceData.estatus || "Pendiente"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <span className="block text-slate-400">Ubicación / Colonia</span>
                    <span className="mt-1 block font-semibold text-white">{serviceData.colonia || "No especificado"}</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <span className="block text-slate-400">Mascotas & Raza</span>
                    <span className="mt-1 block font-semibold text-white">{serviceData.raza || "Por confirmar"}</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <span className="block text-slate-400">Operador Asignado</span>
                    <span className="mt-1 block font-semibold text-white">{serviceData.operador || "Sin Asignar"}</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    PIN de Operador
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="PIN 4 dígitos"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-center text-sm tracking-[0.25em] text-white focus:border-amber-400 focus:outline-none"
                  />

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleStatusUpdate("En Ruta")}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
                    >
                      🚗 En Ruta
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleStatusUpdate("Finalizado")}
                      className="rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-500"
                    >
                      ✅ Finalizar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Pet Group Bajío · Sistema Antifraude y Auditoría Digital
      </footer>
    </div>
  );
}