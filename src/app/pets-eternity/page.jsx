import Link from "next/link";
import { BRANDS, CORPORATE_INFO } from "@/lib/constants";

export default function PetsEternityPage() {
  const brand = BRANDS.petsEternity;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/80 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto w-full sticky top-0 z-50">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          &larr; Volver al Hub Corporativo
        </Link>
        <span className="font-extrabold text-slate-200 tracking-wider">PETS ETERNITY</span>
      </nav>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="inline-block bg-slate-800 text-slate-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-slate-700 mb-6">
          {brand.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Homenajes Dignos y en Paz para tu Compañero
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Comprendemos el dolor de la partida. Te acompañamos con respeto, calidez y transparencia en el último adiós de tu mascota.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href={`https://wa.me/${brand.whatsapp ?? "524000000000"}?text=Hola,%20necesito%20asistencia%20inmediata%20de%20Pets%20Eternity`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-slate-200 hover:bg-white text-slate-950 font-bold rounded-2xl shadow-xl transition transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
          >
            <span>🕊️</span> Contactar Guardia 24/7 (WhatsApp)
          </a>
          <a
            href={brand.externalSite || brand.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-2xl transition text-center"
          >
            Ver Planes en Sitio Oficial &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">🌿</div>
            <h3 className="font-bold text-white mb-1">Cremación Individual</h3>
            <p className="text-xs text-slate-400">Recuperación garantizada de cenizas con certificado y urna conmemorativa.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">🚗</div>
            <h3 className="font-bold text-white mb-1">Recolección a Domicilio</h3>
            <p className="text-xs text-slate-400">Traslado profesional y cuidadoso desde tu hogar o clínica veterinaria.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl mb-2">🕯️</div>
            <h3 className="font-bold text-white mb-1">Sala de Despedida</h3>
            <p className="text-xs text-slate-400">Espacio íntimo y sereno para que la familia dedique sus últimos momentos.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Pets Eternity · {CORPORATE_INFO.address}
      </footer>
    </div>
  );
}