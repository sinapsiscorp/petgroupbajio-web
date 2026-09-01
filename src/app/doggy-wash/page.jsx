'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/lib/constants';

const BRAND = BRANDS.doggyWash;

function IconWebsite(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" strokeLinecap="round" />
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.5c0-.9.3-1.5 1.7-1.5H17V3.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.3V11H8v3h2.5v8h3z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: 'Facebook', href: BRAND.facebook, icon: IconFacebook },
  { name: 'Instagram', href: BRAND.instagram, icon: IconInstagram },
  { name: 'Sitio Web', href: BRAND.website, icon: IconWebsite },
];

const SERVICES = [
  {
    id: 'bano-basico',
    name: 'Baño & Higiene Integral',
    tagline: 'Limpieza profunda en la puerta de tu hogar',
    badge: 'Frecuente',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    description:
      'Servicio en unidad móvil equipada con agua templada y generador autónomo. Incluye baño con shampoo acorde al manto, limpieza de oídos, corte y limado de uñas, vaciado de glándulas anales y secado tibio.',
    includes: [
      'Unidad móvil 100% autónoma (agua templada y energía propia)',
      'Atención 1 a 1 libre de jaulas de espera',
      'Limpieza profunda de oídos y corte de uñas',
      'Vaciado de glándulas anales preventivo',
      'Secado profesional y cepillado general',
    ],
  },
  {
    id: 'bano-corte',
    name: 'Baño + Corte / Estilismo Canino',
    tagline: 'Higiene completa y arreglo estético de raza',
    badge: 'Popular',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description:
      'Todo lo incluido en Baño e Higiene, sumado al corte higiénico (plantar y perianal) y corte de raza o rebajado parejo a máquina/tijera según las necesidades anatómicas de la mascota.',
    includes: [
      'Todo lo incluido en Baño & Higiene Integral',
      'Corte de raza o rebajado estético parejo',
      'Corte higiénico en plantares y zona perianal',
      'Despeje facial y perfilado de patitas',
      'Evaluación previa del manto por el especialista',
    ],
  },
  {
    id: 'deslanado',
    name: 'Deslanado & Retiro de Pelo Muerto',
    tagline: 'Tratamiento especializado para mantos densos',
    badge: 'Especializado',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description:
      'Técnica con turbina de alta potencia y herramientas de deslanado por capas para expulsar hasta el 90% del subpelo muerto sin alterar el manto protector del perro.',
    includes: [
      'Ideal para Husky, Pastor Alemán, Golden, Pomerania, etc.',
      'Soplado técnico para expulsión de pelo retenido',
      'Cepillado profundo con deslanador especializado',
      'Baño desengrasante e hidratación de piel',
      'Alivio térmico sin necesidad de rapar',
    ],
  },
  {
    id: 'medicado',
    name: 'Baño Dermatológico / Terapéutico',
    tagline: 'Cuidado clínico bajo indicación médica',
    badge: 'Clínico',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description:
      'Aplicación estricta de tratamientos y shampoos prescritos para afecciones dérmicas (dermatitis, hongos, control seborreico o ectoparásitos) respetando tiempos de reposo clínicos.',
    includes: [
      'Coordinación directa con el equipo médico de Vet for Pets',
      'Aplicación del producto prescrito por el médico veterinario',
      'Tiempo de pose cronometrado (10 a 15 min en tina)',
      'Secado cuidadoso con temperatura controlada',
      'Desinfección y sanitización estricta de la unidad',
    ],
  },
];

const COMPARISON_POINTS = [
  {
    feature: 'Lugar de Atención',
    doggyWash: 'Directo afuera de tu domicilio o privada en León, Gto.',
    traditional: 'Requiere traslados en auto, lidiar con tráfico y dejar a tu mascota.',
  },
  {
    feature: 'Tiempo & Jaulas',
    doggyWash: '100% libre de jaulas. El servicio inicia al llegar la unidad y termina en tu puerta.',
    traditional: 'Permanecen horas encerrados en jaulas esperando turno entre otros perros.',
  },
  {
    feature: 'Control & Supervisión',
    doggyWash: 'Puedes asomarte a verificar el trato y comodidad de tu consentido.',
    traditional: 'Se realiza en cuartos cerrados sin visibilidad para el tutor.',
  },
  {
    feature: 'Seguridad Antifraude',
    doggyWash: 'Folio y Token QR Oficial registrado en la nube para auditoría y cobro exacto.',
    traditional: 'Cobros informales en efectivo sin folio digital ni respaldo corporativo.',
  },
  {
    feature: 'Respaldo Clínico',
    doggyWash: 'Unidad respaldada por la dirección médica de Vet for Pets y Pet Group Bajío.',
    traditional: 'Estéticas independientes sin protocolos clínicos ni asesoría médica veterinaria.',
  },
];

const POLICIES = [
  {
    title: '1. Anticipación y Agenda de Rutas',
    desc: 'Los servicios se programan con un mínimo de 48 a 72 horas hábiles de anticipación para optimizar las rutas de las unidades móviles en León. No se agendan citas de emergencia el mismo día.',
  },
  {
    title: '2. Cotizaciones Estimadas y Estado del Manto',
    desc: 'Toda cotización inicial es estimada. El precio final se valida al momento de recibir a la mascota. Si el pelaje presenta nudos severos que requieran rapar o tiempo adicional, se notificará previamente al tutor.',
  },
  {
    title: '3. Responsiva por Conducta / Mascotas Agresivas',
    desc: 'Por seguridad del especialista y de la mascota, si el animal presenta agresividad extrema que impida la realización segura del servicio o deba interrumpirse, el servicio se cobrará de manera ordinaria.',
  },
  {
    title: '4. Accesos a Fraccionamientos y Privadas',
    desc: 'Nuestras unidades móviles son 100% autónomas en agua y luz. El tutor es responsable de autorizar el acceso en caseta de vigilancia y asegurar un espacio seguro para estacionar la van frente al domicilio.',
  },
  {
    title: '5. Asignación de Operadores y Rutas',
    desc: 'Para garantizar puntualidad y equidad operativa, las rutas y unidades son asignadas directamente por la Coordinación Central de Agenda según la zona geográfica en León.',
  },
];

const FAQS = [
  {
    q: '¿Cómo funciona el proceso para solicitar un servicio?',
    a: '1) Envías tus datos (WhatsApp, dirección en León, cantidad de mascotas y raza) mediante el Asistente Virtual o formulario web. 2) La Coordinación de Recepción valida la ruta y te confirma la ventana horaria de llegada por WhatsApp. 3) Recibes tu Token QR Oficial con la cotización estimada.',
  },
  {
    q: '¿Qué días y horarios manejan para la atención de agenda?',
    a: 'La coordinación de agenda y confirmación de rutas opera de Lunes a Viernes de 9:00 am a 7:00 pm, y Sábados de 9:00 am a 3:00 pm. Si escribes fuera de horario o en domingo, el Asistente Virtual registrará tu solicitud y recepción te contactará el lunes a primera hora.',
  },
  {
    q: '¿Cuáles son las franjas horarias de llegada de la van?',
    a: 'Manejamos ventanas de llegada en 5 franjas operativas: 9:30 am, 11:30 am, 1:30 pm, 3:30 pm y 5:30 pm, sujetas a la confirmación de ruta de tu zona.',
  },
  {
    q: '¿Necesito proporcionarle electricidad a la camioneta?',
    a: 'Sí. Para el correcto funcionamiento de la van, es necesario que el cliente tenga disponible una conexión eléctrica para la unidad. El resto de los recursos (agua, calentamiento y tratamiento de aguas) ya vienen incorporados en la van móvil; solo requerimos espacio seguro de estacionamiento.',
  },
  {
    q: '¿Cómo se garantiza que el cobro y servicio son oficiales?',
    a: 'Cada cita cuenta con un Token QR Único (ej. DW-AAMMDD-XXXX) emitido por nuestro sistema en la nube. Al llegar la unidad móvil se escanea el código para certificar el inicio del servicio y asegurar que el cobro corresponda a la tarifa autorizada.',
  },
];

export default function DoggyWashPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-amber-100 hover:text-amber-900"
              >
                <span>←</span>
                <span className="hidden sm:inline">Consorcio</span>
                <span>Pet Group Bajío</span>
              </Link>

              <div className="hidden h-6 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src="/images/brand/logo-doggy-wash.png"
                    alt="Doggy Wash - Spa Canino Móvil a Domicilio"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold leading-none tracking-tight text-[#00A3E0]">
                    DOGGY <span className="text-[#78BE20]">WASH</span>
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Baño y Estética en tu Puerta · León, Gto.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/verificar-token"
                className="hidden items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 md:inline-flex"
              >
                <span>Validar Folio QR</span>
              </Link>

              <a
                href="https://agent.jotform.com/019ca04a1f7e7a6a92321eceb3ba72e8ae01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#00A3E0] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-sky-600 active:scale-95 sm:px-5 sm:text-sm"
              >
                <span>Solicitar Visita</span>
                <span className="ml-1.5">🐾</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-transparent pb-16 pt-10 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-lime-200/40 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sky-800">
                <span className="h-2 w-2 rounded-full bg-[#00A3E0] animate-ping" />
                Van Móvil de Estética Canina en tu Colonia
              </div>

              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Grooming Profesional a <span className="text-[#00A3E0]">Domicilio</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
                Evita el estrés del traslado. Baño profundo, corte estético y deslanado frente a tu hogar con especialistas calificados y unidades autónomas con agua templada.
              </p>

              <div className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="https://agent.jotform.com/019ca04a1f7e7a6a92321eceb3ba72e8ae01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00A3E0] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 sm:w-auto"
                >
                  <span>💬</span>
                  <span>Solicitar Cita con Asistente Virtual</span>
                </a>

                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 sm:w-auto"
                >
                  <span>WhatsApp Directo (Recepción)</span>
                </a>
              </div>

              <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left text-white shadow-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-bold text-amber-400">📌</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    Información Importante para tu Solicitud
                  </span>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-400">•</span>
                    <span>
                      <strong>Franjas de ruta:</strong> 9:30 am, 11:30 am, 1:30 pm, 3:30 pm y 5:30 pm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-400">•</span>
                    <span>
                      <strong>Anticipación:</strong> Sugerimos agendar con <strong>48 a 72 horas hábiles</strong> de anticipación.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-400">•</span>
                    <span>
                      <strong>Validación:</strong> Toda cita enviada por el bot queda registrada como solicitud previa; la coordinación de recepción te confirmará la llegada de la van.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-sky-400 to-[#78BE20] p-1.5 shadow-2xl">
                <div className="relative h-80 w-full overflow-hidden rounded-[22px] bg-white sm:h-96">
                  <Image
                    src="/images/hero/hero-doggy-wash.webp"
                    alt="Unidad Móvil Doggy Wash en León Guanajuato"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-sky-100 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800">Rutas activas en León, Gto.</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#00A3E0]">Coordinación Central</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-t border-sky-100 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00A3E0]">
              Catálogo de Servicios Móviles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Cuidados y Estética a la Puerta de tu Hogar
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Cada servicio se realiza de forma individual, con toallas limpias por mascota y equipo esterilizado para garantizar máxima higiene.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Servicio Móvil</span>
                  </div>

                  <h3 className="mb-1 text-xl font-extrabold text-slate-900">{srv.name}</h3>
                  <p className="mb-3 text-xs font-semibold text-[#00A3E0]">{srv.tagline}</p>
                  <p className="mb-5 text-xs leading-relaxed text-slate-600">{srv.description}</p>

                  <div className="mb-6 space-y-2 border-t border-slate-200/60 pt-4">
                    {srv.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="font-bold text-[#78BE20]">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200/80 pt-4">
                  <a
                    href="https://agent.jotform.com/019ca04a1f7e7a6a92321eceb3ba72e8ae01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#00A3E0] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-600"
                  >
                    Cotizar para mi Mascota →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="politicas" className="border-y border-slate-800 bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="rounded-full border border-sky-500/30 bg-sky-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-300">
              Gobernanza & Claridad
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Términos del Servicio y Responsivas
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Para brindar un servicio seguro, puntual y transparente en cada colonia de León.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {POLICIES.map((pol, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <h3 className="mb-2 text-base font-bold text-sky-400">{pol.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-300">{pol.desc}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-between rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-950 to-slate-800 p-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span>🔒 Candado Digital Antifraude</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">Garantía de Folio Oficial</h3>
                <p className="mb-4 text-xs leading-relaxed text-slate-300">
                  Ningún operador puede cobrar tarifas distintas a las registradas en el sistema central. Cada servicio cuenta con un Token QR timbrado en la nube (DW-AAMMDD-XXXX).
                </p>
              </div>
              <Link
                href="/verificar-token"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 transition-colors hover:text-sky-300"
              >
                <span>Validar folio de cita en línea</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#78BE20]">
              La Diferencia Doggy Wash
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Por qué las familias en León prefieren el Spa Móvil?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold">Criterio Operativo</th>
                  <th className="bg-slate-800 p-4 font-bold text-[#00A3E0]">Unidad Móvil Doggy Wash</th>
                  <th className="p-4 font-bold text-slate-400">Estética Tradicional en Local</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {COMPARISON_POINTS.map((pt, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 font-bold text-slate-900">{pt.feature}</td>
                    <td className="bg-sky-50/40 p-4 font-semibold text-sky-950">
                      <span className="mr-1.5 inline-block font-bold text-emerald-600">✓</span>
                      {pt.doggyWash}
                    </td>
                    <td className="p-4 text-slate-500">
                      <span className="mr-1.5 inline-block font-bold text-rose-500">✗</span>
                      {pt.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-100 bg-gradient-to-b from-sky-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
              Flujo Seguro & Trazable
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Cómo solicitar tu visita en 4 sencillos pasos?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Envías tu Solicitud',
                desc: 'A través de nuestro Asistente Virtual 24/7 indicas tu WhatsApp, dirección en León, cantidad de mascotas y raza.',
              },
              {
                step: '02',
                title: 'Confirmación de Agenda',
                desc: 'La coordinación de recepción valida la disponibilidad de la ruta y te confirma la ventana horaria por WhatsApp.',
              },
              {
                step: '03',
                title: 'Folio y Token QR',
                desc: 'Recibes tu folio digital único timbrado en la nube con la cotización estimada de tu servicio.',
              },
              {
                step: '04',
                title: 'Spa en tu Puerta',
                desc: 'La van autónoma llega a tu casa, valida tu Token y tu mascota disfruta de su cuidado sin estrés.',
              },
            ].map((st) => (
              <div key={st.step} className="flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                <div>
                  <span className="text-2xl font-black tracking-widest text-[#00A3E0]">{st.step}</span>
                  <h3 className="mt-2 mb-2 text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-sky-200 bg-white p-8 text-center shadow-md">
            <h3 className="mb-2 text-xl font-extrabold text-slate-900">
              ¿Listo para consentir a tu mascota sin salir de casa?
            </h3>
            <p className="mb-6 text-xs text-slate-500 sm:text-sm">
              Recuerda solicitar tu turno con 48 a 72 horas hábiles de anticipación.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://agent.jotform.com/019ca04a1f7e7a6a92321eceb3ba72e8ae01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A3E0] px-8 py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-sky-600 active:scale-95 sm:w-auto"
              >
                <span>💬</span>
                <span>Solicitar Cita con Asistente Virtual</span>
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-100 px-6 py-4 text-sm font-bold text-emerald-800 transition-all hover:bg-emerald-200 sm:w-auto"
              >
                WhatsApp Recepción
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
              Dudas Frecuentes
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Preguntas Frecuentes sobre Doggy Wash
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-slate-900 sm:p-5 sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-extrabold text-[#00A3E0]">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200/40 p-4 pt-0 text-xs leading-relaxed text-slate-600 sm:p-5 sm:text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#0B192C] py-12 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-extrabold text-white">
                  DOGGY <span className="text-[#00A3E0]">WASH</span>
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                Unidad oficial de Estética y Grooming Canino Móvil de Pet Group Bajío. Cuidado libre de jaulas en León, Guanajuato.
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-800/60 bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                🔒 Trazabilidad por Token QR
              </span>
              <div className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={name}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:border-[#00A3E0]/50 hover:bg-[#00A3E0]/10 hover:text-[#00A3E0]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Servicios Móviles
              </h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#servicios" className="transition-colors hover:text-white">Baño & Higiene Integral</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Baño + Corte de Raza</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Deslanado Anticaída</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Baños Medicados</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Consorcio Bajío
              </h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/" className="transition-colors hover:text-amber-400">Hub Pet Group Bajío</Link></li>
                <li><Link href="/vet-for-pets" className="transition-colors hover:text-cyan-400">Vet for Pets (Clínica)</Link></li>
                <li><Link href="/pet-hotel" className="transition-colors hover:text-orange-400">Pet Hotel (Pensión)</Link></li>
                <li><Link href="/pets-eternity" className="transition-colors hover:text-slate-200">Pets&apos; Eternity (Funeraria)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Horarios & Contacto
              </h4>
              <p className="mb-1 font-semibold text-slate-300">Atención de Agenda:</p>
              <p className="mb-2 leading-relaxed text-slate-400">
                Lun a Vie: 9:00 am - 7:00 pm<br />
                Sáb: 9:00 am - 3:00 pm
              </p>
              <p className="text-slate-400">📍 Paseo de los Insurgentes 321, Los Paraísos, León, Gto.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
            <p>© 2026 Doggy Wash · Pet Group Bajío. Todos los derechos reservados.</p>
            <Link href="/" className="text-slate-400 transition-colors hover:text-white">
              Volver al Hub Madre Pet Group Bajío →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
