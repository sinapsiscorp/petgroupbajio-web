import Link from "next/link";
import Script from "next/script";
import { BRANDS } from "@/lib/constants";

export default function DoggyWashPage() {
  const dw = BRANDS.doggyWash;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <Script
        src="https://cdn.jotfor.ms/agent/embedjs/019ca04a1f7e7a6a92321eceb3ba72e8ae01/embed.js"
        strategy="afterInteractive"
      />
      <nav className="border-b border-slate-800 bg-slate-900/80 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto w-full sticky top-0 z-50">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          &larr; Volver al Hub Pet Group
        </Link>
        <span className="font-extrabold text-sky-400 tracking-wider">DOGGY WASH LEÓN</span>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/20 mb-4">
          Van Móvil de Estética Canina en tu Colonia
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Grooming Profesional a Domicilio
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Evita el estrés del traslado. Baño profundo, corte estético y deslanado frente a tu hogar con operadores calificados.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href={dw.jotformAgentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/25 transition transform hover:-translate-y-0.5 text-center"
          >
            💬 Solicitar Cita con Asistente Virtual
          </a>
          <a
            href={`https://wa.me/${dw.whatsapp}?text=Hola,%20quisiera%20solicitar%20un%20servicio%20de%20Doggy%20Wash`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition text-center"
          >
            WhatsApp Directo (Recepción)
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left max-w-2xl mx-auto shadow-lg">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">
            📌 Información Importante para tu Solicitud
          </h3>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
            <li><strong>Franjas de ruta:</strong> 9:30 am, 11:30 am, 1:30 pm, 3:30 pm y 5:30 pm.</li>
            <li><strong>Anticipación:</strong> Sugerimos agendar con 48 a 72 horas hábiles de anticipación.</li>
            <li><strong>Validación:</strong> Toda cita enviada por el bot queda registrada como solicitud previa; Karina o Dulce te confirmarán la llegada de la van.</li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Doggy Wash León — Unidad Operativa de Pet Group Bajío
      </footer>
    </div>
  );
}