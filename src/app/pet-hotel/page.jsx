'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/lib/constants';

const BRAND = BRANDS.petHotel;

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
    id: 'hospedaje-canino',
    name: 'Hospedaje Campestre Canino',
    tagline: 'Vacaciones 5 estrellas 100% libres de jaulas',
    badge: 'Popular',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description:
      'Estancia en suites térmicas individuales con patio privado para el descanso nocturno y acceso libre a 1 hectárea completamente cercada de praderas verdes durante el día. Incluye dinámicas supervisadas, socialización por temperamentos y reportes diarios en video.',
    includes: [
      '1 hectárea completamente cercada de jardines campestres',
      'Suite individual climatizada con camita y patio de noche',
      'Actividades recreativas y chapuzón en splash pool canina',
      'Reporte diario de fotos y videos por WhatsApp al tutor',
      'Supervisión y vigilancia médica veterinaria 24/7',
    ],
  },
  {
    id: 'guarderia-daycare',
    name: 'Guardería de Día (Day Care)',
    tagline: 'Socialización, juego y gasto de energía diario',
    badge: 'Frecuente',
    badgeColor: 'bg-lime-100 text-lime-800 border-lime-200',
    description:
      'Ideal para perritos que pasan muchas horas solos en casa o necesitan socializar. Jornadas de juego matutino, dinámicas de estimulación mental y siestas reparadoras bajo la guía de etólogos y cuidadores.',
    includes: [
      'Horarios flexibles de entrega y recolección en oficina',
      'Paseos y dinámicas grupales con grupos afines',
      'Acceso a zonas de sombra, alberca y áreas de descanso',
      'Monitoreo continuo de conducta y bienestar',
      'Regreso a casa relajado, estimulado y feliz',
    ],
  },
  {
    id: 'cat-resort',
    name: 'Suites Felinas Independientes',
    tagline: 'Entorno zen, silencioso y seguro para gatos',
    badge: 'Especializado',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description:
      'Área completamente aislada del sonido y presencia de perritos. Módulos verticales con rascadores, plataformas de observación en altura, areneros sanitizados diariamente y estimulación sensorial tranquila.',
    includes: [
      'Espacio 100% separado acústicamente del área canina',
      'Torres verticales, repisas de salto y juguetes interactivos',
      'Higienización y cambio de arena dos veces al día',
      'Atención personalizada respetando el ritmo de cada gato',
      'Administración de dietas especiales y cepillado suave',
    ],
  },
  {
    id: 'especies-pequenas',
    name: 'Huéspedes Exóticos & Pequeños',
    tagline: 'Cuidado especializado para especies no tradicionales',
    badge: 'Exclusivo',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    description:
      'Alojamiento acondicionado con temperatura controlada y rutinas específicas para conejos, erizos, cuyos, aves o hurones. Dietas balanceadas y protocolos clínicos avalados por Vet for Pets.',
    includes: [
      'Ambientes con temperatura y fotoperiodo controlado',
      'Aceptamos erizos, cuyos, conejos, hurones y aves',
      'Mantenimiento de sustratos e higiene rigurosa',
      'Respeto estricto del menú y horarios de alimentación',
      'Coordinación directa con médicos veterinarios especialistas',
    ],
  },
];

const COMPARISON_POINTS = [
  {
    feature: 'Espacio & Libertad',
    petHotel: '1 hectárea completamente cercada de áreas verdes abiertas, pasto natural y alberca canina.',
    traditional: 'Patios de concreto reducidos o pasillos interiores cerrados.',
  },
  {
    feature: 'Confinamiento & Jaulas',
    petHotel: '100% libre de jaulas durante el día. Suites individuales amplias de noche.',
    traditional: 'Permanecen encerrados en jaulas metálicas la mayor parte del día.',
  },
  {
    feature: 'Tranquilidad del Tutor',
    petHotel: 'Reporte diario con fotos y videos en tiempo real por WhatsApp.',
    traditional: 'Informes escasos o solo al momento de la entrega final.',
  },
  {
    feature: 'Respaldo Médico',
    petHotel: 'Supervisión 24/7 respaldada directamente por el equipo clínico de Vet for Pets.',
    traditional: 'Pensiones caseras o independientes sin médicos veterinarios en guardia.',
  },
  {
    feature: 'Variedad de Especies',
    petHotel: 'Áreas dedicadas para perros, gatos en zona zen y pequeñas especies / erizos.',
    traditional: 'Atienden únicamente perros o mezclan gatos en el mismo espacio ruidoso.',
  },
];

const ADMISSION_REQUIREMENTS = [
  {
    title: '1. Cartilla de Vacunación Completa & Vigente',
    desc: 'Para perros: Vacuna Múltiple (Puppy/DHPPI), Rabia y refuerzo de Bordetella (Tos de las perreras) aplicada al menos 15 días antes del ingreso. Para gatos: Triple Felina y Rabia.',
  },
  {
    title: '2. Desparasitación Interna y Externa',
    desc: 'Esquema de desparasitación interna reciente (no mayor a 3 meses) y aplicación de pipeta o pastilla antipulgas/garrapatas vigente al momento del check-in para proteger a todos los huéspedes.',
  },
  {
    title: '3. Alimento Habitual del Huésped',
    desc: 'El tutor debe proporcionar la cantidad de croquetas o alimento habitual dosificado por días, evitando cambios bruscos de dieta que provoquen estrés digestivo o gastroenteritis.',
  },
  {
    title: '4. Evaluación de Sociabilidad y Conducta',
    desc: 'No aceptamos mascotas con agresividad severa hacia personas u otros animales. Las mascotas no esterilizadas o en celo requieren notificación previa para asignarles espacios y patios de recreo exclusivos.',
  },
  {
    title: '5. Objetos de Confort y Pertenencias',
    desc: 'Recomendamos traer su mantita, juguete favorito o camita con olor a hogar para facilitar su adaptación inmediata a la suite durante las noches.',
  },
];

const FAQS = [
  {
    q: '¿Dónde se ubican las instalaciones del hotel y cómo entrego a mi mascota?',
    a: 'Nuestra oficina central de logística, atención y recepción se encuentra en Paseo de los Insurgentes 321, Col. Los Paraísos, León, Gto. Puedes llevar a tu mascota a nuestra oficina para su traslado seguro en Pet Van hacia las instalaciones campestres (a solo 15 minutos de León), o bien solicitar el servicio de recolección directo en tu domicilio.',
  },
  {
    q: '¿Qué pasa si mi mascota toma medicamentos especiales o tiene dieta médica?',
    a: 'Contamos con respaldo médico directo de Vet for Pets. Nuestro equipo administra tratamientos orales, inyectables o dietas terapéuticas respetando horarios y dosis exactas sin costo extra.',
  },
  {
    q: '¿Cómo organizan los grupos de juego para evitar peleas o accidentes?',
    a: 'Al ingresar realizamos una evaluación de temperamento. Los huéspedes se integran a grupos reducidos clasificados por tamaño, energía y afinidad (ej. cachorros juguetones, perros senior tranquilos, razas gigantes). Las áreas de juego siempre están supervisadas por cuidadores expertos.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar en temporada vacacional?',
    a: 'Para puentes, Semana Santa, vacaciones de verano y fechas decembrinas sugerimos reservar con 2 a 3 semanas de anticipación, ya que manejamos cupo limitado para garantizar la atención personalizada libre de jaulas.',
  },
  {
    q: '¿Qué garantía de seguridad y transparencia ofrece Pet Group Bajío?',
    a: 'Toda estancia cuenta con un Token QR Único timbrado en la nube (ej. PH-AAMMDD-XXXX) que certifica las fechas de ingreso, requerimientos médicos y tarifas oficiales, respaldado por dirección médica certificada.',
  },
];

export default function PetHotelPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-amber-200/80 bg-white/95 shadow-sm backdrop-blur-md">
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

              <div className="hidden h-6 w-px bg-amber-200 sm:block" />

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src="/images/brand/logo-pet-hotel.png"
                    alt="Pet Hotel - Resort Campestre Libre de Jaulas en León Gto"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold leading-none tracking-tight text-[#F97316]">
                    PET <span className="text-[#84CC16]">HOTEL</span>
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800/70">
                    Resort Campestre · 1 Hectárea de Libertad
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/verificar-token"
                className="hidden items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-amber-50 md:inline-flex"
              >
                <span>Validar Folio QR</span>
              </Link>

              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 sm:px-5 sm:text-sm"
              >
                <span>Reservar Estancia</span>
                <span className="ml-1.5">🐾</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/50 to-transparent pb-16 pt-10 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-orange-200/30 blur-[130px]" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-lime-200/40 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-amber-900">
                <span className="h-2 w-2 rounded-full bg-[#F97316] animate-ping" />
                2 Acres de Áreas Verdes y Alberca Canina · León, Gto.
              </div>

              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Las Verdaderas Vacaciones de tu <span className="text-[#F97316]">Mejor Amigo</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg lg:mx-0">
                Viaja con total tranquilidad. Hospedaje campestre 100% libre de jaulas con 1 hectárea completamente cercada de praderas naturales, suites individuales climatizadas, alberca y reportes diarios en foto y video.
              </p>

              <div className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 sm:w-auto"
                >
                  <span>💬</span>
                  <span>Cotizar Estancia por WhatsApp</span>
                </a>

                <a
                  href="#requisitos"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-300 bg-amber-100 px-6 py-3.5 text-sm font-bold text-amber-950 transition-all hover:bg-amber-200 sm:w-auto"
                >
                  <span>📋</span>
                  <span>Requisitos de Admisión</span>
                </a>
              </div>

              <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left text-white shadow-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-bold text-amber-400">📌</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    Información Clave de Logística y Operación
                  </span>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-400">•</span>
                    <span>
                      <strong>Recepción y Traslado:</strong> Oficina en Paseo de los Insurgentes 321, Los Paraísos. Servicio de Pet Van disponible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-400">•</span>
                    <span>
                      <strong>Horarios de Oficina:</strong> Lun a Vie: 9:00 am - 7:00 pm | Sáb: 9:00 am - 3:00 pm (Hotel opera 24/7/365).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-400">•</span>
                    <span>
                      <strong>Anticipación:</strong> Para puentes y temporada vacacional, sugerimos reservar con 2 a 3 semanas de anticipación.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-orange-400 via-amber-300 to-[#84CC16] p-1.5 shadow-2xl">
                <div className="relative h-80 w-full overflow-hidden rounded-[22px] bg-white sm:h-96">
                  <Image
                    src="/images/hero/hero-pet-hotel.webp"
                    alt="Instalaciones Campestres Pet Hotel León Guanajuato"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-amber-200 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800">Praderas Abiertas Activas</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#F97316]">Respaldo Clínico 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-t border-amber-200/70 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316]">
              Modalidades de Estancia
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Espacios Diseñados para Cada Tipo de Huésped
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Desde perros de todas las razas y gatos en suites independientes, hasta pequeñas especies no convencionales (erizos, conejos y aves).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col justify-between rounded-3xl border border-amber-200/80 bg-amber-50/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">Libre de Jaulas</span>
                  </div>

                  <h3 className="mb-1 text-xl font-extrabold text-slate-900">{srv.name}</h3>
                  <p className="mb-3 text-xs font-semibold text-[#F97316]">{srv.tagline}</p>
                  <p className="mb-5 text-xs leading-relaxed text-slate-600">{srv.description}</p>

                  <div className="mb-6 space-y-2 border-t border-amber-200/60 pt-4">
                    {srv.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="font-bold text-[#84CC16]">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-amber-200/80 pt-4">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#F97316] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-600"
                  >
                    Cotizar Fechas de Estadía →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="requisitos" className="border-y border-slate-800 bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-300">
              Seguridad y Salud Colectiva
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Requisitos Obligatorios de Admisión
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Para garantizar que cada huésped disfrute de un ambiente sano, protegido y libre de contagios.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ADMISSION_REQUIREMENTS.map((req, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <h3 className="mb-2 text-base font-bold text-orange-400">{req.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-300">{req.desc}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-between rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-950 to-slate-800 p-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-lime-400">
                  <span>🛡️ Guardia Médica Permanente</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">Aval Clínico Vet for Pets</h3>
                <p className="mb-4 text-xs leading-relaxed text-slate-300">
                  En caso de cualquier eventualidad médica o requerimiento de salud durante la estancia, el expediente de tu mascota cuenta con atención prioritaria directa en nuestro hospital de especialidades.
                </p>
              </div>
              <Link
                href="/vet-for-pets"
                className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 transition-colors hover:text-orange-300"
              >
                <span>Conocer protocolos de la clínica</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#84CC16]">
              La Diferencia Pet Hotel
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Por qué somos el resort campestre favorito del Bajío?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-amber-200 shadow-sm">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold">Criterio de Bienestar</th>
                  <th className="bg-slate-800 p-4 font-bold text-[#F97316]">Pet Hotel Campestre</th>
                  <th className="p-4 font-bold text-slate-400">Pensión Urbana en Jaula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 bg-white">
                {COMPARISON_POINTS.map((pt, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-amber-50/30' : 'bg-white'}>
                    <td className="p-4 font-bold text-slate-900">{pt.feature}</td>
                    <td className="bg-orange-50/40 p-4 font-semibold text-amber-950">
                      <span className="mr-1.5 inline-block font-bold text-emerald-600">✓</span>
                      {pt.petHotel}
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

      <section className="border-t border-amber-200/70 bg-gradient-to-b from-amber-50/60 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-900">
              Flujo Transparente
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Cómo asegurar la estancia de tu consentido?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Contacto y Fechas',
                desc: 'Envías tus fechas estimadas de viaje, tipo de mascota, raza y necesidades particulares por WhatsApp o formulario.',
              },
              {
                step: '02',
                title: 'Validación de Cartilla',
                desc: 'Recepción verifica el esquema de vacunación vigente y aprueba la disponibilidad de suite para tu mascota.',
              },
              {
                step: '03',
                title: 'Emisión de Token QR',
                desc: 'Recibes tu folio digital oficial con la cotización pactada y confirmación de transporte o entrega en oficina.',
              },
              {
                step: '04',
                title: '¡A Disfrutar!',
                desc: 'Tu consentido goza de 1 hectárea completamente cercada de libertad mientras tú recibes reportes diarios de foto y video en tu celular.',
              },
            ].map((st) => (
              <div key={st.step} className="flex flex-col justify-between rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
                <div>
                  <span className="text-2xl font-black tracking-widest text-[#F97316]">{st.step}</span>
                  <h3 className="mt-2 mb-2 text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-orange-200 bg-white p-8 text-center shadow-md">
            <h3 className="mb-2 text-xl font-extrabold text-slate-900">
              ¿Planeando tu próximo viaje fuera de León?
            </h3>
            <p className="mb-6 text-xs text-slate-600 sm:text-sm">
              Asegura el lugar de tu mascota con tiempo. Cupo limitado para garantizar atención 100% personalizada.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95 sm:w-auto"
              >
                <span>💬</span>
                <span>Contactar a Recepción por WhatsApp</span>
              </a>
              <Link
                href="/verificar-token"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-100 px-6 py-4 text-sm font-bold text-amber-900 transition-all hover:bg-amber-200 sm:w-auto"
              >
                Validar Folio / QR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-amber-200/80 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
              Dudas Comunes
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Preguntas Frecuentes sobre Pet Hotel
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/30 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-slate-900 sm:p-5 sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-extrabold text-[#F97316]">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-amber-200/40 p-4 pt-0 text-xs leading-relaxed text-slate-600 sm:p-5 sm:text-sm">
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
                  PET <span className="text-[#F97316]">HOTEL</span>
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                Resort campestre y guardería libre de jaulas de Pet Group Bajío. 1 hectárea completamente cercada de libertad y supervisión veterinaria 24/7 en León, Guanajuato.
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:border-[#F97316]/50 hover:bg-[#F97316]/10 hover:text-[#F97316]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Modalidades de Estancia
              </h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#servicios" className="transition-colors hover:text-white">Hospedaje Campestre Canino</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Guardería de Día (Day Care)</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Suites Felinas Zen</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Aves, Conejos y Pequeñas Especies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Consorcio Bajío
              </h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/" className="transition-colors hover:text-amber-400">Hub Pet Group Bajío</Link></li>
                <li><Link href="/doggy-wash" className="transition-colors hover:text-sky-400">Doggy Wash (Spa Móvil)</Link></li>
                <li><Link href="/vet-for-pets" className="transition-colors hover:text-cyan-400">Vet for Pets (Clínica)</Link></li>
                <li><Link href="/pets-eternity" className="transition-colors hover:text-slate-200">Pets&apos; Eternity (Funeraria)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Atención y Recepción
              </h4>
              <p className="mb-1 font-semibold text-slate-300">Oficina de Logística:</p>
              <p className="mb-2 leading-relaxed text-slate-400">
                Lun a Vie: 9:00 am - 7:00 pm<br />
                Sáb: 9:00 am - 3:00 pm<br />
                <em>(Hotel opera 24/7 los 365 días)</em>
              </p>
              <p className="text-slate-400">📍 Paseo de los Insurgentes 321, Los Paraísos, León, Gto.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
            <p>© 2026 Pet Hotel · Pet Group Bajío. Todos los derechos reservados.</p>
            <Link href="/" className="text-slate-400 transition-colors hover:text-white">
              Volver al Hub Madre Pet Group Bajío →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
