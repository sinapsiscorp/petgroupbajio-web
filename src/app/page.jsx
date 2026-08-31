import Image from "next/image";
import Link from "next/link";
import { BRANDS, CORPORATE_INFO } from "@/lib/constants";

const PILLARS = [
  {
    key: "doggyWash",
    logo: "/images/brand/logo-doggy-wash.png",
    heroPlaceholder: "Foto: unidad móvil / baño de mascota",
    cta: "Solicitar unidad móvil",
  },
  {
    key: "vetForPets",
    logo: "/images/brand/logo-vet-for-pets.png",
    heroPlaceholder: "Foto: consultorio y equipo diagnóstico",
    cta: "Agendar consulta clínica",
  },
  {
    key: "petHotel",
    logo: "/images/brand/logo-pet-hotel.png",
    heroPlaceholder: "Foto: jardines y áreas de socialización",
    cta: "Reservar vacaciones",
  },
  {
    key: "petsEternity",
    logo: "/images/brand/logo-pets-eternity.png",
    heroPlaceholder: "Foto: sala de velación / relicario",
    cta: "Línea de acompañamiento",
  },
];

const TRUST_METRICS = [
  { value: "+15,000", label: "Servicios completados" },
  { value: "4", label: "Unidades especializadas" },
  { value: "100%", label: "Cobertura en León y zona metropolitana" },
];

function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" {...props}>
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconQr(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM17.5 17.5h1v1h-1zM20 20h1v1h-1z" />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" {...props}>
      <path
        d="M6.5 3h3l1.5 4-2 1.5a11 11 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#0B192C] flex flex-col">
      {/* Top navigation */}
      <header className="border-b border-[#E5E7EB] bg-[#FBFBF9]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            {/* Placeholder: /images/brand/pet-group-bajio-logo.png (400x120) */}
            <div className="w-9 h-9 rounded-full bg-[#0B192C] flex items-center justify-center text-[#F59E0B] font-bold text-sm">
              PG
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Pet Group <span className="text-[#F59E0B]">Bajío</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {PILLARS.map(({ key }) => {
              const brand = BRANDS[key];
              const href = brand.slug.startsWith("http") ? brand.slug : brand.slug;
              return (
                <Link
                  key={brand.id}
                  href={href}
                  className="px-3 py-2 rounded-full text-sm font-medium text-[#0B192C]/70 hover:text-[#0B192C] hover:bg-[#0B192C]/5 transition flex items-center gap-2"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  {brand.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/verificar-token"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border border-[#0B192C]/15 text-[#0B192C] hover:border-[#0B192C]/30 transition"
            >
              <IconQr className="w-4 h-4" />
              Verificar folio
            </Link>
            <a
              href={`https://wa.me/${BRANDS.petsEternity.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold bg-[#0B192C] text-white hover:bg-[#0B192C]/90 transition"
            >
              <IconPhone className="w-4 h-4" />
              <span className="hidden sm:inline">Emergencias 24/7</span>
              <span className="sm:hidden">24/7</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-16 text-center sm:pt-20 sm:pb-20">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B45309]">
          <IconShield className="h-3.5 w-3.5" />
          Consorcio Integral de Bienestar Animal · León, Gto.
        </span>

        <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-extrabold leading-[0.96] tracking-[-0.04em] text-[#0B192C] sm:text-6xl lg:text-[5rem]">
          Todo el ciclo de cuidado para tu mascota en un solo lugar.
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-[#0B192C]/65 sm:text-lg">
          Desde su primera consulta veterinaria y spa a domicilio, hasta sus vacaciones
          campestres y el homenaje a su memoria. El consorcio de bienestar animal más
          completo de León y el Bajío.
        </p>

        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[2rem] border border-[#0B192C]/10 bg-white/60 shadow-[0_20px_60px_rgba(11,25,44,0.08)]">
          <Image
            src="/images/hero/hero-lifecycle-wheel.webp"
            alt="Ilustración del ciclo del cuidado de Pet Group Bajío"
            width={1200}
            height={440}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Los 4 pilares */}
      <section className="max-w-6xl mx-auto px-4 pb-20 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B192C] mb-2">
            Los 4 pilares del consorcio
          </h2>
          <p className="text-[#0B192C]/55 max-w-xl mx-auto">
            Cada marca opera con autonomía propia, respaldada por la misma supervisión
            médica y ética del consorcio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PILLARS.map(({ key, logo, heroPlaceholder, cta }) => {
            const brand = BRANDS[key];
            const isExternalLink = brand.slug.startsWith("http");

            return (
              <div
                key={brand.id}
                className="rounded-2xl bg-white border border-[#E5E7EB] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Placeholder hero image */}
                <div className="h-36 border-b border-[#E5E7EB] bg-[radial-gradient(circle_at_top_left,theme(colors.slate.100),white)] flex items-center justify-center px-4">
                  <span className="text-[11px] text-center text-[#0B192C]/35 leading-snug">
                    [ Placeholder — {heroPlaceholder} ]
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <Image
                        src={logo}
                        alt={`Logotipo ${brand.name}`}
                        width={32}
                        height={32}
                        className="rounded-full border border-[#E5E7EB] object-contain bg-white"
                      />
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${brand.color}14`,
                          color: brand.color,
                          borderColor: `${brand.color}33`,
                        }}
                      >
                        {brand.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B192C] mb-1.5">{brand.name}</h3>
                    <p className="text-sm font-medium text-[#0B192C]/70 mb-2">
                      {brand.tagline}
                    </p>
                    <p className="text-xs text-[#0B192C]/50 leading-relaxed mb-6">
                      {brand.description}
                    </p>
                  </div>

                  {isExternalLink ? (
                    <a
                      href={brand.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold flex items-center gap-1.5 group/link"
                      style={{ color: brand.color }}
                    >
                      {cta}
                      <IconArrow className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link
                      href={brand.slug}
                      className="text-sm font-semibold flex items-center gap-1.5 group/link"
                      style={{ color: brand.color }}
                    >
                      {cta}
                      <IconArrow className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Autoridad y respaldo médico */}
      <section className="bg-[#0B192C] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F59E0B]/15 text-[#F59E0B] rounded-full text-xs font-bold uppercase tracking-wider mb-5 border border-[#F59E0B]/25">
              <IconShield className="w-3.5 h-3.5" />
              Garantía profesional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Dirección Médica General: Dr. Eusebio Lozano Bedia
            </h2>
            <p className="text-white/60 leading-relaxed max-w-lg">
              Más de una década respaldando protocolos clínicos, sanitización de unidades
              móviles y certificaciones éticas en las cuatro marcas del consorcio.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {TRUST_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] text-white/55 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparencia / antifraude */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center shrink-0">
            <IconQr className="w-7 h-7 text-[#B45309]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#0B192C] mb-1.5">
              Cada servicio cuenta con un Token QR oficial
            </h3>
            <p className="text-sm text-[#0B192C]/55 leading-relaxed max-w-2xl">
              Verificado en tiempo real contra nuestros registros, garantiza precios
              oficiales y operadores certificados del consorcio.
            </p>
          </div>
          <Link
            href="/verificar-token"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0B192C] text-white hover:bg-[#0B192C]/90 transition"
          >
            Verificar folio / QR
            <IconArrow className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-[#0B192C]">{CORPORATE_INFO.name}</p>
            <p className="text-xs text-[#0B192C]/50 mt-1">{CORPORATE_INFO.address}</p>
          </div>
          <div className="flex items-center gap-5 text-xs text-[#0B192C]/50">
            {/* TODO: enlazar cuando existan las rutas /aviso-privacidad y /terminos */}
            <span className="cursor-not-allowed">Aviso de Privacidad</span>
            <span className="cursor-not-allowed">Términos de Servicio</span>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] py-4 flex flex-col items-center gap-1 text-center text-xs text-[#0B192C]/40">
          <p>{CORPORATE_INFO.copyright}</p>
          <p>
            Powered by{" "}
            <a
              href="https://impletech-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0B192C]/60 hover:text-[#F59E0B] transition"
            >
              IMPLETECH AI&reg;
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
