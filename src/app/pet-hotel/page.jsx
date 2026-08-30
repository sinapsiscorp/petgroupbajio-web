import Link from "next/link";
import { BRANDS, CORPORATE_INFO } from "@/lib/constants";

export default function PetHotelPage() {
  const brand = BRANDS.petHotel;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/80 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto w-full sticky top-0 z-50">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          &larr; Volver al Hub Corporativo
        </Link>
        <span className="font-extrabold text-emerald-400 tracking-wider">PET HOTEL LEÓN</span>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-emerald-500/20 mb-6">
          {brand.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Vacaciones Seguras y Divertidas para tu Mascota
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Instalaciones campestres, áreas verdes de socialización, supervisión veterinaria y reportes continuos vía WhatsApp mientras tú viajas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href={`https://wa.me/${brand.whatsapp}?text=Hola,%20quisiera%20cotizar%20hospedaje%20en%20Pet%20Hotel`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/20 transition transform hover:-translate-y-0.5 text-center"
          >
            🏡 Cotizar y Reservar Fechas (WhatsApp)
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left max-w-2xl mx-auto shadow-lg">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
            📋 Requisitos de Ingreso para Seguridad de Todos
          </h3>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
            <li><strong>Cartilla de vacunación vigente:</strong> Múltiple, Rabia y Bordetella (tos de las perreras).</li>
            <li><strong>Desparasitación interna y externa:</strong> Reciente (pipeta o tableta contra pulgas y garrapatas).</li>
            <li><strong>Alimento habitual:</strong> Proporcionar las porciones necesarias para su estancia.</li>
            <li><strong>Evaluación de temperamento:</strong> Previo al ingreso para asignación de suite y recreo.</li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Pet Hotel León · {CORPORATE_INFO.name}
      </footer>
    </div>
  );
}