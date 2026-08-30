import Link from "next/link";
import { BRANDS, CORPORATE_INFO } from "@/lib/constants";

export default function VetForPetsPage() {
  const brand = BRANDS.vetForPets;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/80 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto w-full sticky top-0 z-50">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          &larr; Volver al Hub Corporativo
        </Link>
        <span className="font-extrabold text-rose-400 tracking-wider">VET FOR PETS CLÍNICA</span>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="inline-block bg-rose-500/10 text-rose-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-rose-500/20 mb-6">
          {brand.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Medicina Veterinaria y Cirugía Especializada
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Diagnóstico certero, medicina preventiva, quirófano equipado y laboratorio clínico bajo la dirección de médicos veterinarios titulados.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href={`https://wa.me/${brand.whatsapp}?text=Hola,%20quisiera%20agendar%20una%20consulta%20en%20Vet%20for%20Pets`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-xl shadow-rose-600/20 transition transform hover:-translate-y-0.5 text-center"
          >
            🩺 Agendar Consulta Médica (WhatsApp)
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">💉</div>
            <h3 className="font-bold text-white mb-1">Medicina Preventiva</h3>
            <p className="text-xs text-slate-400">Esquemas de vacunación, desparasitación y chequeos periódicos de salud.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">🔬</div>
            <h3 className="font-bold text-white mb-1">Diagnóstico Clínico</h3>
            <p className="text-xs text-slate-400">Análisis de sangre, ultrasonido y rayos X para detección oportuna.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">🏥</div>
            <h3 className="font-bold text-white mb-1">Cirugía y Quirófano</h3>
            <p className="text-xs text-slate-400">Esterilizaciones, profilaxis dental y procedimientos quirúrgicos de tejidos blandos.</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center max-w-xl mx-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ubicación de la Clínica</p>
          <p className="text-sm text-white font-medium">{CORPORATE_INFO.address}</p>
          <p className="text-xs text-slate-400 mt-1">Horario: {brand.schedule}</p>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Vet for Pets · Clínica Veterinaria de Pet Group Bajío
      </footer>
    </div>
  );
}