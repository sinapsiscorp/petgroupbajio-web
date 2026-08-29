import Link from "next/link";
import { BRANDS } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-2xl font-black tracking-tight text-white">
            PET GROUP <span className="text-amber-400">BAJÍO</span>
          </span>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/doggy-wash" className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-full transition shadow-lg shadow-sky-500/20 font-bold">
              Estética Doggy Wash
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/20">
          Consorcio Integral de Bienestar Animal · León, Gto.
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Todo el ciclo de cuidado para tu mascota en un solo lugar.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
          Desde estética canina a domicilio y atención clínica, hasta hospedaje de primer nivel y servicios conmemorativos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {Object.values(BRANDS).map((brand) => (
            <div
              key={brand.id}
              className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-500 transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-700 text-slate-300 mb-3 inline-block">
                  {brand.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition">
                  {brand.name}
                </h3>
                <p className="text-sm font-medium text-slate-300 mb-2">{brand.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{brand.description}</p>
              </div>

              {brand.slug.startsWith("http") ? (
                <a
                  href={brand.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  Visitar portal oficial &rarr;
                </a>
              ) : (
                <Link
                  href={brand.slug}
                  className="text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  Conocer servicios &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Pet Group Bajío. Blvd. Insurgentes 321, León, Guanajuato. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}