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
          <nav className="flex items-center gap-3 text-sm font-medium">
            {Object.values(BRANDS).slice(0, 2).map((brand) => (
              <Link
                key={brand.id}
                href={brand.slug.startsWith("http") ? brand.slug : brand.slug}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-full transition border border-slate-700"
              >
                {brand.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/20">
          Consorcio Integral de Bienestar Animal · León, Gto.
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Todo el ciclo de cuidado para tu mascota en un solo lugar.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
          Desde estética canina a domicilio y atención clínica, hasta hospedaje de primer nivel y servicios conmemorativos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-left">
          {Object.values(BRANDS).map((brand) => {
            const isExternalLink = brand.slug.startsWith("http");

            return (
              <div
                key={brand.id}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-500 transition flex flex-col justify-between group h-full"
                style={{ boxShadow: `0 20px 30px -20px ${brand.color || "#334155"}` }}
              >
                <div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded mb-3 inline-block border"
                    style={{
                      backgroundColor: `${brand.color || "#334155"}22`,
                      color: brand.color || "#e2e8f0",
                      borderColor: `${brand.color || "#334155"}44`,
                    }}
                  >
                    {brand.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition">
                    {brand.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mb-2">{brand.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{brand.description}</p>
                </div>

                {isExternalLink ? (
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
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Pet Group Bajío. Blvd. Insurgentes 321, León, Guanajuato. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}