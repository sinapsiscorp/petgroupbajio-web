'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/lib/constants';

const BRAND = BRANDS.vetForPets;

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
    id: 'consulta-diagnostico',
    name: 'Consulta Médica & Diagnóstico',
    tagline: 'Evaluación clínica integral para perros y gatos',
    badge: 'Medicina General',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    description:
      'Diagnóstico clínico preventivo y terapéutico con equipos de análisis de vanguardia. Detección temprana de patologías, planes de salud por etapa de vida y medicina felina amigable.',
    includes: [
      'Examen físico general detallado por médicos titulados',
      'Laboratorio clínico in-situ y pruebas rápidas',
      'Diagnóstico por imagen y monitoreo de signos',
      'Expediente clínico digital integrado en Pet Group',
      'Asesoría personalizada en bienestar y conducta',
    ],
  },
  {
    id: 'cirugia-quirofano',
    name: 'Cirugía & Procedimientos',
    tagline: 'Quirófano estéril con monitoreo anestésico continuo',
    badge: 'Quirúrgico',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description:
      'Instalaciones quirúrgicas completamente equipadas para cirugías de tejidos blandos, esterilizaciones programadas, profilaxis dental ultrasónica y atención de emergencias menores.',
    includes: [
      'Quirófano estéril con anestesia inhalatoria segura',
      'Monitoreo multiparamétrico continuo de signos vitales',
      'Esterilizaciones y castraciones preventivas',
      'Profilaxis y limpieza dental ultrasónica avanzada',
      'Protocolos estrictos de analgesia postoperatoria',
    ],
  },
  {
    id: 'medicina-preventiva',
    name: 'Vacunación & Medicina Preventiva',
    tagline: 'Blindaje inmunológico y control parasitario',
    badge: 'Prevención',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description:
      'Esquemas completos de vacunación para cachorros, adultos y seniors. Desparasitación interna y externa adaptada a la región del Bajío, con expedición de certificados oficiales.',
    includes: [
      'Cuadro de vacunas caninas (Múltiple, Rabia, Bordetella)',
      'Vacunación felina (Triple Felina, Leucemia, Rabia)',
      'Desparasitación interna y externa trimestral',
      'Certificados de salud para viajes y hospedaje en Pet Hotel',
      'Orientación preventiva para evitar enfermedades estacionales',
    ],
  },
  {
    id: 'pet-shop-boutique',
    name: 'Pet Shop & Boutique Nutricional',
    tagline: 'Dietas de prescripción clínica y accesorios premium',
    badge: 'Nutrición & Care',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description:
      'Farmacia veterinaria con medicamentos autorizados, alimentos de prescripción para patologías renales, dérmicas o digestivas, así como accesorios, correas y juguetes estimulantes.',
    includes: [
      'Alimentos de prescripción médica (Royal Canin, Hills, Pro Plan)',
      'Farmacia veterinaria con prescripciones oficiales',
      'Suplementos vitamínicos, condroprotectores y dermatológicos',
      'Accesorios de paseo ergonómicos y juguetes interactivos',
      'Productos de higiene dérmica y cuidado dental',
    ],
  },
];

const CLINICAL_PILLARS = [
  {
    title: '1. Dirección Médica de Alto Nivel',
    desc: 'Bajo dirección médica veterinaria certificada, cada diagnóstico y tratamiento se apega a rigurosos estándares médicos, éticos y científicos consolidados a lo largo de más de una década en León.',
  },
  {
    title: '2. Sinergia Total con Pet Hotel & Doggy Wash',
    desc: 'Somos la base clínica que respalda a los huéspedes de Pet Hotel y coordina los baños medicados de Doggy Wash. Si tu mascota requiere evaluación antes de viajar o cuidados durante su estancia, todo se coordina en el mismo expediente.',
  },
  {
    title: '3. Citas Programadas sin Aglomeraciones',
    desc: 'Optimizamos la atención mediante agenda previa para evitar tiempos de espera prolongados y reducir el estrés de las mascotas en la sala de espera.',
  },
  {
    title: '4. Infraestructura Cómoda & Privada',
    desc: 'Instalaciones con áreas separadas para atención de mostrador/tienda, consultorios médicos privados y quirófano estéril sobre una de las avenidas más accesibles de León.',
  },
];

const COMPARISON_POINTS = [
  {
    feature: 'Respaldo Médico & Trayectoria',
    vetForPets: 'Más de 15 años de liderazgo clínico bajo dirección médica certificada.',
    informal: 'Consultorios improvisados sin dirección médica certificada ni experiencia comprobable.',
  },
  {
    feature: 'Ecosistema de Bienestar',
    vetForPets: 'Clínica, quirófano, spa móvil, hospedaje campestre y servicios funerarios unificados.',
    informal: 'Atención aislada; obligan al tutor a buscar por separado pensión, estética o traslados.',
  },
  {
    feature: 'Nutrición & Farmacia Clínica',
    vetForPets: 'Boutique con dietas de prescripción especializadas y farmacia médica regulada.',
    informal: 'Venta limitada de croquetas comerciales sin asesoría nutricional médica.',
  },
  {
    feature: 'Tiempos de Espera & Citas',
    vetForPets: 'Sistema de citas programadas para atención ágil y sin estrés ambiental.',
    informal: 'Salas de espera saturadas y tiempos prolongados de espera sin confirmación previa.',
  },
  {
    feature: 'Garantía & Trazabilidad',
    vetForPets: 'Folios digitales y Token QR oficial respaldado por Pet Group Bajío.',
    informal: 'Recetas informales sin expediente digital ni seguimiento corporativo.',
  },
];

const FAQS = [
  {
    q: '¿Dónde se ubica la clínica Vet for Pets y cuál es su horario de atención?',
    a: 'Estamos ubicados en Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Gto. Nuestro horario de atención en consulta y boutique es de Lunes a Viernes de 9:00 am a 7:00 pm, y Sábados de 9:00 am a 3:00 pm.',
  },
  {
    q: '¿Cómo funciona la coordinación previa para el ingreso a Pet Hotel?',
    a: 'En Vet for Pets realizamos el examen de salud previo, la actualización de vacunas requeridas (Múltiple, Rabia, Bordetella) y la aplicación de desparasitantes/pipetas para emitir el certificado de admisión de tu mascota antes de su estancia campestre en Pet Hotel.',
  },
  {
    q: '¿Manejan alimentos especializados para mascotas con enfermedades crónicas?',
    a: 'Sí, en nuestra boutique nutricional contamos con líneas de prescripción médica (dietas renales, urinarias, gastrointestinales, hipoalergénicas y de control de peso) avaladas por médicos veterinarios.',
  },
  {
    q: '¿Es necesario agendar cita previa para consulta o vacunación?',
    a: 'Recomendamos ampliamente agendar tu cita vía WhatsApp o mediante nuestro asistente para asignarte un horario preferencial y evitar que tu mascota espere en sala. Atendemos casos prioritarios según disponibilidad médica.',
  },
  {
    q: '¿Cómo garantizan la seguridad de los procedimientos quirúrgicos?',
    a: 'Todos los procedimientos se realizan en quirófano estéril con evaluación preanestésica, anestesia inhalatoria y monitoreo constante de signos vitales (oxigenación, frecuencia cardíaca, temperatura) para garantizar la máxima seguridad de tu compañero.',
  },
];

export default function VetForPetsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-cyan-50 hover:text-cyan-900"
              >
                <span>←</span>
                <span className="hidden sm:inline">Consorcio</span>
                <span>Pet Group Bajío</span>
              </Link>

              <div className="hidden h-6 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src="/images/brand/logo-vet-for-pets.png"
                    alt="Vet for Pets - Clínica Veterinaria & Pet Shop en León Gto"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold leading-none tracking-tight text-[#1E1B4B]">
                    VET FOR <span className="text-[#06B6D4]">PETS</span>
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Clínica Veterinaria y Pet Shop · León, Gto.
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
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#06B6D4] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:bg-cyan-600 active:scale-95 sm:px-5 sm:text-sm"
              >
                <span>Agendar Consulta</span>
                <span className="ml-1.5">🩺</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-transparent pb-16 pt-10 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-[130px]" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/80 bg-cyan-100/80 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-cyan-900">
                <span className="h-2 w-2 rounded-full bg-[#06B6D4] animate-ping" />
                Medicina Avanzada · Cirugía · Boutique Nutricional
              </div>

              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Salud, Ciencia y Calidez para tu <span className="text-[#06B6D4]">Compañero</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
                Diagnóstico clínico certero, quirófano estéril, medicina preventiva y farmacia especializada bajo dirección médica certificada en León, Guanajuato.
              </p>

              <div className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06B6D4] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-600 sm:w-auto"
                >
                  <span>💬</span>
                  <span>Agendar Cita por WhatsApp</span>
                </a>

                <a
                  href="#servicios"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-3.5 text-sm font-bold text-indigo-950 transition-all hover:bg-indigo-100 sm:w-auto"
                >
                  <span>📋</span>
                  <span>Explorar Servicios Médicos</span>
                </a>
              </div>

              <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left text-white shadow-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-bold text-cyan-400">📌</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                    Información de Consulta y Ubicación
                  </span>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-400">•</span>
                    <span>
                      <strong>Dirección Clínica:</strong> Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Gto.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-400">•</span>
                    <span>
                      <strong>Horario de Atención:</strong> Lun a Vie: 9:00 am - 7:00 pm | Sáb: 9:00 am - 3:00 pm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-400">•</span>
                    <span>
                      <strong>Sinergia Hotel:</strong> Punto oficial de información, revisión médica y check-in para Pet Hotel.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-[#1E1B4B] via-cyan-500 to-rose-400 p-1.5 shadow-2xl">
                <div className="relative h-80 w-full overflow-hidden rounded-[22px] bg-white sm:h-96">
                  <Image
                    src="/images/hero/hero-vet-for-pets.webp"
                    alt="Instalaciones Clínicas Vet for Pets León Guanajuato"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-cyan-100 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800">Dirección Médica Titulada</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#06B6D4]">Certificación Vigente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-t border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4]">
              Catálogo Clínico Integral
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Atención Médica Avanzada y Cuidado Especializado
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Combinamos experiencia diagnóstica, tecnología quirúrgica y nutrición clínica en un solo espacio diseñado para la salud de tu mascota.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Sede Clínica</span>
                  </div>

                  <h3 className="mb-1 text-xl font-extrabold text-slate-900">{srv.name}</h3>
                  <p className="mb-3 text-xs font-semibold text-[#06B6D4]">{srv.tagline}</p>
                  <p className="mb-5 text-xs leading-relaxed text-slate-600">{srv.description}</p>

                  <div className="mb-6 space-y-2 border-t border-slate-200 pt-4">
                    {srv.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="font-bold text-[#06B6D4]">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#06B6D4] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-cyan-600"
                  >
                    Agendar por WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-300">
              Excelencia y Gobernanza Médica
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              ¿Por qué confiar en Vet for Pets?
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Un estándar clínico diseñado para ofrecer tranquilidad absoluta a los tutores en cada etapa médica.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CLINICAL_PILLARS.map((pil, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <h3 className="mb-2 text-base font-bold text-cyan-400">{pil.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-300">{pil.desc}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950 to-indigo-950 p-6 md:col-span-2">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span>🐾 Punto de Enlace Logístico Oficial</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">Preparación Médica para Pet Hotel Campestre</h3>
                <p className="mb-4 text-xs leading-relaxed text-slate-300">
                  Si estás planeando salir de viaje, en Vet for Pets puedes realizar la revisión física, actualización de vacunas y desparasitación requeridas para certificar el ingreso seguro de tu mascota al resort libre de jaulas de Pet Hotel.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/pet-hotel"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 transition-colors hover:text-white"
                >
                  <span>Conocer instalaciones de Pet Hotel</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
              El Estándar Vet for Pets
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Diferencias de Atención y Respaldo Clínico
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold">Criterio Médico</th>
                  <th className="bg-slate-800 p-4 font-bold text-cyan-400">Vet for Pets (Clínica Integral)</th>
                  <th className="p-4 font-bold text-slate-400">Consultorio Veterinario Básico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {COMPARISON_POINTS.map((pt, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 font-bold text-slate-900">{pt.feature}</td>
                    <td className="bg-cyan-50/40 p-4 font-semibold text-cyan-950">
                      <span className="mr-1.5 inline-block font-bold text-emerald-600">✓</span>
                      {pt.vetForPets}
                    </td>
                    <td className="p-4 text-slate-500">
                      <span className="mr-1.5 inline-block font-bold text-rose-500">✗</span>
                      {pt.informal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-b from-cyan-50/50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-900">
              Flujo Ágil y Organizado
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Cómo solicitar consulta médica o atención?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Agenda tu Cita',
                desc: 'Escríbenos por WhatsApp para elegir el día y hora que mejor se adapte a tu horario y necesidad médica.',
              },
              {
                step: '02',
                title: 'Evaluación Clínica',
                desc: 'Nuestro equipo médico titulado realiza el examen físico completo y diagnóstico en consultorio privado.',
              },
              {
                step: '03',
                title: 'Plan Terapéutico',
                desc: 'Se determina el tratamiento, vacunación, procedimiento o dieta clínica específica para tu mascota.',
              },
              {
                step: '04',
                title: 'Seguimiento Digital',
                desc: 'Tu mascota cuenta con historial digital integrado y trazabilidad de Token QR para próximas visitas.',
              },
            ].map((st) => (
              <div key={st.step} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <span className="text-2xl font-black tracking-widest text-[#06B6D4]">{st.step}</span>
                  <h3 className="mt-2 mb-2 text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-cyan-200 bg-white p-8 text-center shadow-md">
            <h3 className="mb-2 text-xl font-extrabold text-slate-900">
              ¿Tu mascota necesita revisión o esquema de vacunación?
            </h3>
            <p className="mb-6 text-xs text-slate-600 sm:text-sm">
              Programa tu horario hoy mismo para una atención personalizada y sin esperas.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06B6D4] px-8 py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-cyan-600 active:scale-95 sm:w-auto"
              >
                <span>💬</span>
                <span>Contactar a Recepción Médica</span>
              </a>
              <Link
                href="/verificar-token"
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-50 px-6 py-4 text-sm font-bold text-indigo-950 transition-all hover:bg-indigo-100 sm:w-auto"
              >
                Validar Folio / QR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
              Dudas Médicas y Servicios
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Preguntas Frecuentes sobre Vet for Pets
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
                    <span className="text-lg font-extrabold text-[#06B6D4]">{isOpen ? '−' : '+'}</span>
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
                  VET FOR <span className="text-[#06B6D4]">PETS</span>
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                Clínica veterinaria, especialidades y boutique nutricional de Pet Group Bajío. Dirección médica titulada y atención integral en León, Guanajuato.
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Servicios Médicos
              </h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#servicios" className="transition-colors hover:text-white">Consulta y Diagnóstico</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Cirugía y Quirófano</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Vacunación y Desparasitación</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Boutique y Pet Shop</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Consorcio Bajío
              </h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/" className="transition-colors hover:text-amber-400">Hub Pet Group Bajío</Link></li>
                <li><Link href="/doggy-wash" className="transition-colors hover:text-sky-400">Doggy Wash (Spa Móvil)</Link></li>
                <li><Link href="/pet-hotel" className="transition-colors hover:text-orange-400">Pet Hotel (Pensión)</Link></li>
                <li><Link href="/pets-eternity" className="transition-colors hover:text-slate-200">Pets&apos; Eternity (Funeraria)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Horarios y Contacto
              </h4>
              <p className="mb-1 font-semibold text-slate-300">Atención Clínica y Mostrador:</p>
              <p className="mb-2 leading-relaxed text-slate-400">
                Lun a Vie: 9:00 am - 7:00 pm<br />
                Sáb: 9:00 am - 3:00 pm
              </p>
              <p className="text-slate-400">📍 Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Gto.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
            <p>© 2026 Vet for Pets · Pet Group Bajío. Todos los derechos reservados.</p>
            <Link href="/" className="text-slate-400 transition-colors hover:text-white">
              Volver al Hub Madre Pet Group Bajío →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
