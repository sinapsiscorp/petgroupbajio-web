'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/lib/constants';

const BRAND = BRANDS.petsEternity;

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
id: 'cremacion-individual',
name: 'Cremación Individual & Exclusiva',
tagline: 'Garantía 100% de cenizas y homenaje personalizado',
badge: 'Más Solicitado',
badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
description: 'Proceso solemne e individualizado donde se garantiza la recuperación exclusiva y total de las cenizas de tu ser amado. Incluye urna de madera noble, placa grabada y detalles conmemorativos.',
includes: [
'Cremación 100% individual y trazable',
'Urna conmemorativa de madera tradicional',
'Placa metálica grabada con nombre y fechas',
'Certificado oficial de cremación emitido por Pet Group',
'Mechón de pelo conmemorativo en relicario de cristal',
'Entrega de cenizas en domicilio o clínica'
]
},
{
id: 'ultimo-adios-casa',
name: 'El Último Adiós en Casa (Eutanasia Compasiva)',
tagline: 'Despedida serena en el calor de su hogar',
badge: 'Atención Médica en Casa',
badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
description: 'Acompañamiento médico veterinario compasivo para evitar el estrés del traslado clínico en sus últimos momentos. Se realiza en un ambiente de absoluta paz, rodeado de su familia.',
includes: [
'Visita médica programada en tu domicilio en León y alrededores',
'Sedación profunda y protocolo clínico libre de dolor',
'Espacio y tiempo privado para la despedida familiar',
'Traslado sensible y respetuoso directo al crematorio',
'Coordinación directa con el equipo médico de Vet for Pets'
]
},
{
id: 'recoleccion-traslado',
name: 'Recolección & Traslado Sensible 24/7',
tagline: 'Respuesta inmediata a domicilio o clínica',
badge: 'Guardia 24 Horas',
badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
description: 'Unidades de transporte especiales acondicionadas con respeto y dignidad para el retiro inmediato de tu mascota en cualquier punto de León, clínicas veterinarias o zona metropolitana.',
includes: [
'Disponibilidad de guardia inmediata las 24 horas, los 365 días',
'Recolección en domicilio particular o cualquier hospital veterinario',
'Manejo amoroso, ético y protocolario del cuerpo',
'Custodia en cámara fría hasta la ceremonia pactada',
'Atención bilingüe (Español / English) para comunidad extranjera'
]
},
{
id: 'urnas-duelo-infantil',
name: 'Urnas de Arte & Apoyo al Duelo Familiar',
tagline: 'Esculturas de memoria y contención tanatológica',
badge: 'Apoyo Tanatológico',
badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
description: 'Líneas exclusivas de urnas artísticas en cerámica (modelos Michi Conmemorativo, Arraw y figuras personalizadas), así como guía tanatológica sensible enfocada en ayudar a los niños a procesar la pérdida.',
includes: [
'Catálogo de urnas de diseño en cerámica y mármol',
'Urnas temáticas especializadas para gatitos y perritos',
'Joyería y relicarios porta-cenizas de acero inoxidable',
'Sesión de orientación tanatológica para duelo infantil (previa cita)',
'Acceso a sala de velación física para ceremonias íntimas'
]
}
];

const SOLEMN_PILLARS = [
{
title: '1. Sinergia Total con Vet for Pets & Pet Hotel',
desc: 'Si tu mascota se encuentra internada en nuestra clínica o bajo resguardo en nuestro hotel y trasciende, la coordinación y traslado hacia Pets’ Eternity se gestionan de forma inmediata e interna entre nuestro mismo personal de confianza, sin trámites dolorosos ni llamadas intermedias.'
},
{
title: '2. Transparencia Absoluta & Trazabilidad',
desc: 'Cada proceso cuenta con un Token QR Único timbrado en la nube (ej. PE-AAMMDD-XXXX) y certificado notariado de cremación individual, brindándote la certeza plena de que las cenizas que recibes pertenecen únicamente a tu compañero.'
},
{
title: '3. Acompañamiento Humano & Bilingüe (Bilingual Care)',
desc: 'Ubicados estratégicamente cerca del corredor del Bajío y Puerto Interior, nuestro personal ofrece atención compasiva tanto en español como en inglés, acompañando a familias locales y extranjeras con empatía.'
},
{
title: '4. Sala de Despedida & Velación Privada',
desc: 'Disponemos de un espacio sereno y cálido fuera del entorno ruidoso de la ciudad para que tu familia pueda compartir los últimos momentos, encender una vela conmemorativa y despedir a su amigo con la solemnidad que merece.'
}
];

const COMPARISON_POINTS = [
{
feature: 'Garantía de Cenizas',
petsEternity: 'Cremación 100% individual verificable con entrega exclusiva y certificado oficial.',
informal: 'Procesos comunitarios opacos donde se mezclan restos sin certeza ni trazabilidad.'
},
{
feature: 'Disponibilidad & Traslado',
petsEternity: 'Línea de guardia 24/7 con recolección a domicilio o veterinaria en unidades dignas.',
informal: 'Horarios limitados de oficina o traslados improvisados en vehículos particulares.'
},
{
feature: 'Detalles Conmemorativos',
petsEternity: 'Incluye urna de madera, placa grabada, mechón de pelo en cristal y certificado.',
informal: 'Cajas de cartón genéricas o cobros extras por placas y constancias básicas.'
},
{
feature: 'Último Adiós en Casa',
petsEternity: 'Eutanasia compasiva a domicilio coordinada con médicos veterinarios titulados.',
informal: 'Obligan a llevar a la mascota sufriendo hasta un quirófano frío y estresante.'
},
{
feature: 'Sinergia Médica Consorcio',
petsEternity: 'Integrado al expediente clínico de Vet for Pets y respaldo de Pet Group Bajío.',
informal: 'Servicios aislados sin coordinación con el médico tratante de la mascota.'
}
];

const FAQS = [
{
q: '¿Cómo garantizan que las cenizas corresponden únicamente a mi mascota?',
a: 'En Pets’ Eternity manejamos un protocolo estricto de identificación con Token QR Único y testigo refractario desde el momento de la recolección. En la modalidad individual, el horno crematorio se carga exclusivamente con tu mascota y se emite un Certificado Oficial de Cremación avalado por la dirección de Pet Group Bajío.'
},
{
q: '¿Qué incluye el paquete de cremación individual?',
a: 'Incluye la recolección en tu domicilio o clínica veterinaria, el proceso de cremación individual, una urna conmemorativa de madera noble, placa metálica personalizada con su nombre y fechas, certificado oficial, un mechón de pelo preservado en un relicario de cristal y la entrega de las cenizas en tu hogar.'
},
{
q: '¿Cómo se determinan las tarifas de cremación?',
a: 'Las tarifas se basan en el peso exacto de la mascota (báscula de precisión) y el tipo de urna seleccionada. Los planes base para mascotas pequeñas de 0 a 10 kg inician en $1,300 MXN en urna de madera tradicional, escalando de manera transparente y proporcional para razas medianas, grandes y gigantes.'
},
{
q: '¿En qué horarios puedo comunicarme en caso de una emergencia?',
a: 'Nuestras oficinas y salas de atención operan de Lunes a Domingo de 8:00 am a 9:30 pm. No obstante, nuestro servicio de recolección, traslado de urgencia y línea de acompañamiento telefónico se encuentra disponible las 24 horas del día, los 365 días del año.'
},
{
q: '¿Cómo funciona el servicio de Último Adiós en Casa?',
a: 'Si tu médico veterinario ha determinado que tu compañero debe descansar para evitarle mayor sufrimiento, coordinamos la visita de un médico titulado a tu hogar. Se aplica una sedación profunda y tranquila para que la mascota se duerma en tus brazos sin dolor ni ansiedad. Posteriormente, nuestro equipo realiza el traslado con total solemnidad.'
}
];

export default function PetsEternityPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-600 transition-all hover:bg-stone-200 hover:text-stone-900"
              >
                <span>←</span>
                <span className="hidden sm:inline">Consorcio</span>
                <span>Pet Group Bajío</span>
              </Link>

              <div className="hidden h-6 w-px bg-stone-200 sm:block" />

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src="/images/brand/logo-pets-eternity.png"
                    alt="Pets' Eternity - Funeraria y Crematorio de Mascotas en León Gto"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold leading-none tracking-tight text-[#5B7B8C]">
                    PETS&apos; <span className="text-[#C5A880]">ETERNITY</span>
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Homenajes &amp; Crematorio 24/7 · León, Gto.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/verificar-token"
                className="hidden items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 transition-all hover:bg-stone-50 md:inline-flex"
              >
                <span>Validar Folio QR</span>
              </Link>

              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#5B7B8C] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-500/20 transition-all hover:bg-[#486372] active:scale-95 sm:px-5 sm:text-sm"
              >
                <span>Línea de Guardia 24/7</span>
                <span className="ml-1.5">🕊️</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAF9F6] to-transparent pb-16 pt-10 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-slate-200/40 blur-[130px]" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-amber-100/40 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-stone-800">
                <span className="h-2 w-2 rounded-full bg-[#5B7B8C] animate-pulse" />
                Cremación Individual · Salas de Velación · Atención Inmediata 24/7
              </div>

              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl">
                Honramos la huella que dejó en tu vida con <span className="text-[#5B7B8C]">Amor y Dignidad</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg lg:mx-0">
                Acompañamiento compasivo, procesos de cremación transparentes, recolección sensible a domicilio y homenajes solemnes respaldados por la solidez de Pet Group Bajío en León, Guanajuato.
              </p>

              <div className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B7B8C] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-500/25 transition-all hover:bg-[#486372] sm:w-auto"
                >
                  <span>💬</span>
                  <span>Contactar Línea de Apoyo 24/7</span>
                </a>

                <a
                  href="#servicios"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-stone-100 px-6 py-3.5 text-sm font-bold text-stone-800 transition-all hover:bg-stone-200 sm:w-auto"
                >
                  <span>🕊️</span>
                  <span>Servicios &amp; Planes Conmemorativos</span>
                </a>
              </div>

              <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left text-white shadow-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-bold text-[#C5A880]">📌</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
                    Información de Guardia &amp; Traslados
                  </span>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#C5A880]">•</span>
                    <span>
                      <strong>Atención de Urgencias:</strong> Guardia telefónica y unidades de recolección operando las <strong>24 horas</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#C5A880]">•</span>
                    <span>
                      <strong>Horario de Oficinas:</strong> Lunes a Domingo de 8:00 am a 9:30 pm (Paseo de los Insurgentes 321, Los Paraísos).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#C5A880]">•</span>
                    <span>
                      <strong>Tarifas Transparentes:</strong> Planes individuales desde $1,300 MXN en urna tradicional según peso y especie.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-slate-700 via-stone-400 to-[#C5A880] p-1.5 shadow-2xl">
                <div className="relative h-80 w-full overflow-hidden rounded-[22px] bg-white sm:h-96">
                  <Image
                    src="/images/hero/hero-pets-eternity.webp"
                    alt="Salas de Homenaje y Crematorio Pets' Eternity León Guanajuato"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-stone-200 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800">Cremación Individual Certificada</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#5B7B8C]">Guardia 24/7 Activa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-t border-stone-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5B7B8C]">
              Catálogo de Servicios Solemnes
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl">
              Un Adiós Digno, Ético y Reconfortante
            </h2>
            <p className="mt-3 text-sm text-stone-600 sm:text-base">
              Cuidamos cada detalle del proceso con el más alto respeto, ofreciéndote tranquilidad y memoria eterna para tu mejor amigo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-stone-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-400">Solemne</span>
                  </div>

                  <h3 className="mb-1 text-xl font-extrabold text-slate-900">{srv.name}</h3>
                  <p className="mb-3 text-xs font-semibold text-[#5B7B8C]">{srv.tagline}</p>
                  <p className="mb-5 text-xs leading-relaxed text-stone-600">{srv.description}</p>

                  <div className="mb-6 space-y-2 border-t border-stone-200 pt-4">
                    {srv.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="font-bold text-[#5B7B8C]">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#5B7B8C] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#486372]"
                  >
                    Consultar por WhatsApp →
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
            <span className="rounded-full border border-[#5B7B8C]/60 bg-[#5B7B8C]/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-200">
              Ética, Transparencia &amp; Contención
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              ¿Por qué confiar en Pets&apos; Eternity?
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Un estándar diseñado para brindar serenidad y certezas en el momento más difícil del ciclo de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SOLEMN_PILLARS.map((pil, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <h3 className="mb-2 text-base font-bold text-[#C5A880]">{pil.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-300">{pil.desc}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-between rounded-2xl border border-[#C5A880]/50 bg-gradient-to-br from-slate-800 to-[#1E293B] p-6 md:col-span-2">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <span>🕊️ Respaldo Integral Pet Group Bajío</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">Acompañamiento sin Trámites Dolorosos</h3>
                <p className="mb-4 text-xs leading-relaxed text-slate-300">
                  Sabemos lo complejo que es este momento. Nuestro equipo asume con delicadeza la recolección, trámites de custodia y entrega de cenizas, permitiéndote vivir tu duelo en paz junto a tu familia.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A880] px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-amber-600"
                >
                  <span>Llamar a Asistencia Inmediata</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7B8C]">
              La Diferencia Pets&apos; Eternity
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Diferencias de Atención &amp; Respaldo Ético
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold">Criterio Ético &amp; Operativo</th>
                  <th className="bg-slate-800 p-4 font-bold text-[#C5A880]">Pets&apos; Eternity (Servicio Certificado)</th>
                  <th className="p-4 font-bold text-slate-400">Servicio Informal / Sin Trazabilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {COMPARISON_POINTS.map((pt, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}>
                    <td className="p-4 font-bold text-slate-900">{pt.feature}</td>
                    <td className="bg-[#5B7B8C]/10 p-4 font-semibold text-slate-900">
                      <span className="mr-1.5 inline-block font-bold text-emerald-600">✓</span>
                      {pt.petsEternity}
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

      <section className="border-t border-stone-200 bg-gradient-to-b from-stone-100/60 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="rounded-full border border-stone-300 bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800">
              Flujo Transparente &amp; Respetuoso
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              ¿Cómo atendemos tu llamado en 4 sencillos pasos?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Contacto Inmediato',
                desc: 'Nos llamas o escribes por WhatsApp las 24 horas para coordinar el retiro a domicilio o en la clínica veterinaria.',
              },
              {
                step: '02',
                title: 'Recolección Dignificada',
                desc: 'Nuestra unidad de traslado arriba con personal calificado, asegurando un manejo amoroso y registro de Token QR.',
              },
              {
                step: '03',
                title: 'Ceremonia &amp; Cremación',
                desc: 'Se realiza el proceso individual en horno exclusivo, recuperando sus cenizas con certificado notariado y mechón de pelo.',
              },
              {
                step: '04',
                title: 'Entrega con Amor',
                desc: 'Entregamos la urna de madera con placa grabada en tu hogar o puedes recogerla en nuestras salas de velación.',
              },
            ].map((st) => (
              <div key={st.step} className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div>
                  <span className="text-2xl font-black tracking-widest text-[#5B7B8C]">{st.step}</span>
                  <h3 className="mt-2 mb-2 text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs leading-relaxed text-stone-600">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-stone-300 bg-white p-8 text-center shadow-md">
            <h3 className="mb-2 text-xl font-extrabold text-slate-900">
              ¿Requieres asistencia conmemorativa inmediata?
            </h3>
            <p className="mb-6 text-xs text-stone-600 sm:text-sm">
              Estamos contigo en cada momento. Comunícate directamente con nuestra guardia de atención 24/7.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B7B8C] px-8 py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#486372] active:scale-95 sm:w-auto"
              >
                <span>💬</span>
                <span>Contactar a Línea de Guardia 24/7</span>
              </a>
              <Link
                href="/verificar-token"
                className="inline-flex w-full items-center justify-center rounded-xl bg-stone-100 px-6 py-4 text-sm font-bold text-stone-800 transition-all hover:bg-stone-200 sm:w-auto"
              >
                Validar Folio / QR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B7B8C]">
              Orientación &amp; Preguntas
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Preguntas Frecuentes sobre Pets&apos; Eternity
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/50 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-slate-900 sm:p-5 sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-extrabold text-[#5B7B8C]">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-stone-200/60 p-4 pt-0 text-xs leading-relaxed text-stone-600 sm:p-5 sm:text-sm">
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
                  PETS&apos; <span className="text-[#C5A880]">ETERNITY</span>
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                Funeraria, salas de velación y crematorio para mascotas de Pet Group Bajío. Acompañamiento compasivo y procesos certificados 24/7 en León, Guanajuato.
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-800/60 bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                🔒 Trazabilidad por Token QR
              </span>
              <div className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:border-[#C5A880]/50 hover:bg-[#C5A880]/10 hover:text-[#C5A880]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Servicios Solemnes
              </h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#servicios" className="transition-colors hover:text-white">Cremación Individual</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">El Último Adiós en Casa</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Recolección &amp; Traslado 24/7</a></li>
                <li><a href="#servicios" className="transition-colors hover:text-white">Urnas de Cerámica &amp; Relicarios</a></li>
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
                <li><Link href="/pet-hotel" className="transition-colors hover:text-orange-400">Pet Hotel (Pensión)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Horarios &amp; Contacto
              </h4>
              <p className="mb-1 font-semibold text-slate-300">Oficinas &amp; Salas de Atención:</p>
              <p className="mb-2 leading-relaxed text-slate-400">
                Lunes a Domingo: 8:00 am - 9:30 pm<br />
                <em>(Guardia de recolección y traslados 24/7)</em>
              </p>
              <p className="text-slate-400">📍 Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Gto.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
            <p>© 2026 Pets&apos; Eternity · Pet Group Bajío. Todos los derechos reservados.</p>
            <Link href="/" className="text-slate-400 transition-colors hover:text-white">
              Volver al Hub Madre Pet Group Bajío →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}