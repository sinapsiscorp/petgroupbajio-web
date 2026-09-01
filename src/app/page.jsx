'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BRAND_PILLARS = [
  {
    id: 'doggy-wash',
    name: 'Doggy Wash',
    stage: 'Higiene & Estética en Casa',
    tagline: 'Grooming & Spa Canino Móvil a Domicilio',
    badge: 'Servicio a Domicilio',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/80',
    accentColor: '#00A3E0',
    hoverBorder: 'hover:border-sky-400 hover:shadow-sky-500/10',
    cardImage: '/images/hero/hero-doggy-wash.webp',
    logo: '/images/brand/logo-doggy-wash.png',
    href: '/doggy-wash',
    description: 'Cuidado profesional en la puerta de tu hogar. Baño con agua templada, deslanado profundo y corte de raza en unidades autónomas libres de jaulas.',
    highlights: ['La única con más de 7 unidades móviles', 'Agua Templada', 'Libre de Jaulas de Espera', 'Token de control de servicio'],
    ctaText: 'Solicitar Unidad Móvil',
    ctaLinkText: 'Solicitar unidad móvil →',
    ctaClass: 'bg-[#00A3E0] hover:bg-sky-600 text-white'
  },
  {
    id: 'vet-for-pets',
    name: 'Vet for Pets',
    stage: 'Salud, Diagnóstico & Cirugía',
    tagline: 'Clínica Veterinaria & Pet Shop',
    badge: 'Salud y Diagnóstico',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    accentColor: '#06B6D4',
    hoverBorder: 'hover:border-cyan-400 hover:shadow-cyan-500/10',
    cardImage: '/images/hero/hero-vet-for-pets.webp',
    logo: '/images/brand/logo-vet-for-pets.png',
    href: '/vet-for-pets',
    description: 'Medicina preventiva, laboratorio clínico, rayos X, quirófano estéril y boutique nutricional.',
    highlights: ['Dirección Médica Titulada', 'Quirófano & Anestesia Inhalatoria', 'Alimentos de Prescripción', 'Citas sin Aglomeraciones'],
    ctaText: 'Agendar Consulta Clínica',
    ctaLinkText: 'Agendar consulta clínica →',
    ctaClass: 'bg-indigo-950 hover:bg-[#06B6D4] text-white'
  },
  {
    id: 'pet-hotel',
    name: 'Pet Hotel',
    stage: 'Recreación, Campo & Vacaciones',
    tagline: 'Pensión Campestre Libre de Jaulas',
    badge: 'Hospedaje Campestre',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200/80',
    accentColor: '#F97316',
    hoverBorder: 'hover:border-orange-400 hover:shadow-orange-500/10',
    cardImage: '/images/hero/hero-pet-hotel.webp',
    logo: '/images/brand/logo-pet-hotel.png',
    href: '/pet-hotel',
    description: '1 hectárea completamente cercada de praderas verdes, suites térmicas nocturnas, alberca canina, suites felinas independientes y reportes diarios en video por WhatsApp.',
    highlights: ['1 Hectárea Completamente Cercada', '100% Libre de Jaulas', 'Suites Felinas Zen', 'Supervisión Médica 24/7'],
    ctaText: 'Reservar Estancia',
    ctaLinkText: 'Reservar vacaciones →',
    ctaClass: 'bg-[#F97316] hover:bg-orange-600 text-white'
  },
  {
    id: 'pets-eternity',
    name: "Pets' Eternity",
    stage: 'Trascendencia, Duelo & Memoria',
    tagline: 'Funeraria & Crematorio 24/7 para Mascotas',
    badge: 'Atención Inmediata 24/7',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    accentColor: '#5B7B8C',
    hoverBorder: 'hover:border-slate-400 hover:shadow-slate-500/10',
    cardImage: '/images/hero/hero-pets-eternity.webp',
    logo: '/images/brand/logo-pets-eternity.png',
    href: '/pets-eternity',
    description: 'Despedidas solemnes, cremación individual 100% garantizada con Token QR, último adiós compasivo en casa y guardia de traslados activa las 24 horas.',
    highlights: ['Cremación Individual Supervisada', 'Eutanasia con o sin Ceremonia', 'Urnas de Arte & Relicarios', 'Guardia de Recolección 24/7'],
    ctaText: 'Línea de Acompañamiento',
    ctaLinkText: 'Línea de acompañamiento →',
    ctaClass: 'bg-[#5B7B8C] hover:bg-[#486372] text-white'
  }
];

const TRUST_METRICS = [
{ value: '+15 Años', label: 'Cuidando a familias en León y el Bajío' },
{ value: '+15,000', label: 'Servicios con estándares médicos éticos' },
{ value: '4 Unidades', label: 'Ecosistema integral interconectado' },
{ value: '100% Blindado', label: 'Trazabilidad y validación por Token QR' }
];

export default function HomePage() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activePillar = BRAND_PILLARS[activeStageIndex];

  return (
    <div>

      {/* 1. TOP ANNOUNCEMENT & BRAND SWITCHER BAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo Corporativo Pet Group Bajío */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0 rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/images/brand/logo-pet-group.webp"
                  alt="Pet Group Bajío"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0B192C] leading-none">
                  PET GROUP <span className="text-amber-500">BAJÍO</span>
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mt-1">
                  Consorcio de Bienestar Animal
                </span>
              </div>
            </Link>

            {/* Quick Switcher de Submarcas (Desktop) */}
            <nav className="hidden lg:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
              {BRAND_PILLARS.map((brand) => (
                <Link
                  key={brand.id}
                  href={brand.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-[#0B192C] hover:bg-white hover:shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: brand.accentColor }}
                  />
                  {brand.name}
                </Link>
              ))}
            </nav>

            {/* Acciones de Cabecera: QR & Emergencia */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/verificar-token"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs"
              >
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span>Validar Folio / QR</span>
              </Link>

              <Link
                href="/pets-eternity"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-xs hover:shadow-md animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>Emergencias 24/7</span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO SECTION — EL CÍRCULO COMPLETO DEL BIENESTAR */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-white via-[#FBFBF9] to-[#FBFBF9]">
    
        {/* Glow Decorativo de Fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-200/30 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-bold tracking-wide uppercase mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Consorcio Integral de Bienestar Animal · León, Gto.
            </div>
        
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B192C] tracking-tight leading-[1.12]">
              Todo el ciclo de cuidado para tu mascota en un solo lugar.
            </h1>

            <div className="relative w-full max-w-3xl mx-auto mt-8 mb-8 aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 shadow-sm">
              <Image
                src="/images/hero/hero-lifecycle-wheel.webp"
                alt="Ciclo de vida y bienestar de tu mascota con Pet Group Bajío"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 640px, 896px"
                priority
              />
            </div>

            <p className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Desde su primera consulta veterinaria y estética móvil en tu puerta, hasta sus vacaciones campestres y el homenaje solemne a su memoria. Más de 15 años de calidez y respaldo médico integral en el Bajío.
            </p>
          </div>

          {/* COMPONENTE INTERACTIVO: SELECTOR DEL CICLO DE VIDA */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-gray-200/90 max-w-5xl mx-auto">
        
            <div className="text-center mb-6">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                Selecciona la etapa o necesidad de tu mascota hoy:
              </p>
            </div>

            {/* Píldoras Selectoras de Etapa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
              {BRAND_PILLARS.map((pillar, index) => {
                const isActive = activeStageIndex === index;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveStageIndex(index)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-md scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                    }`}
                  >
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-70 mb-1">
                      Paso 0{index + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-snug">
                      {pillar.name}
                    </span>
                    <span className={`text-[11px] mt-1 font-medium line-clamp-1 ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
                      {pillar.stage}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Ficha Dinámica Desplegada */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/60">
          
              {/* Contenido Izquierdo */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activePillar.badgeColor}`}>
                    {activePillar.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {activePillar.stage}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] tracking-tight">
                  {activePillar.name}
                </h3>
                <p className="text-sm font-semibold text-amber-600 mt-1">
                  {activePillar.tagline}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  {activePillar.description}
                </p>

                {/* Bullets de Puntos Fuertes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
                  {activePillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Botón de Acción a la Marca */}
                <div className="pt-2">
                  <Link
                    href={activePillar.href}
                    className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg ${activePillar.ctaClass}`}
                  >
                    <span>{activePillar.ctaText}</span>
                    <span className="ml-2 font-bold">→</span>
                  </Link>
                </div>
              </div>

              {/* Logotipo e Imagen Representativa Derecha */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
                  <Image
                    src={activePillar.logo}
                    alt={`${activePillar.name} - Consorcio Pet Group Bajío`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 160px, 192px"
                    priority
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 text-center tracking-wide uppercase">
                  Unidad Oficial de Pet Group Bajío
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. GRID DE LAS 4 MARCAS DEL CONSORCIO (ESTILIZADO Y UNIFICADO) */}
      <section className="py-16 lg:py-24 bg-[#FBFBF9] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Los 4 pilares del consorcio
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-3">
              Cada marca opera con autonomía propia, respaldada por la misma supervisión médica y ética del consorcio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_PILLARS.map((brand) => (
              <div
                key={brand.id}
                className={`bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${brand.hoverBorder}`}
              >
                <div>
              
                  {/* Visual Header con Imagen Fotográfica */}
                  <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                    <Image
                      src={brand.cardImage}
                      alt={`${brand.name} - Pet Group Bajío`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6 pt-5">
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${brand.badgeColor}`}>
                        {brand.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0B192C] tracking-tight">
                      {brand.name}
                    </h3>
                
                    <p className="text-xs font-semibold text-slate-500 mt-1 mb-3">
                      {brand.tagline}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                </div>

                {/* Footer de Tarjeta con Link CTA */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={brand.href}
                    className="inline-flex items-center text-xs font-bold text-[#0B192C] group-hover:text-amber-600 transition-colors"
                  >
                    <span>{brand.ctaLinkText}</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. AUTORIDAD MÉDICA & RESPALDO PROFESIONAL */}
      <section className="py-16 bg-[#0B192C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wide uppercase mb-4 border border-amber-400/30">
                ★ Dirección y Criterio Clínico Profesional
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Respaldo Médico Veterinario Certificado
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Cada servicio de estética móvil, pensión campestre, clínica veterinaria y crematorio cuenta con el aval y supervisión ética de médicos veterinarios con más de una década de arraigo y liderazgo en León, Guanajuato.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
                {TRUST_METRICS.map((metric, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">
                      {metric.value}
                    </span>
                    <span className="block text-xs text-slate-300 font-medium mt-1">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 p-6 sm:p-8 rounded-3xl border border-white/15 backdrop-blur-md flex flex-col justify-between text-center sm:text-left">
              <h3 className="text-lg font-bold text-white mb-2">
                ¿Necesitas orientación para tu mascota?
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Nuestro conmutador central te canaliza de inmediato con la división médica, asistencial o conmemorativa que requieres.
              </p>
              <Link
                href="/vet-for-pets"
                className="w-full text-center py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-[#0B192C] font-extrabold text-sm rounded-xl transition-all shadow-md"
              >
                Conectar con Clínica Central
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TRANSPARENCIA & SISTEMA ANTIFRAUDE TOKEN QR */}
      <section className="py-16 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-4">
                🔒 Trazabilidad & Garantía Antifraude
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Validación de Folios y Servicios Oficiales
              </h2>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Para tu total seguridad y la de tu mascota, cada cita agendada en Doggy Wash, Pet Hotel, Vet for Pets o Pets&apos; Eternity cuenta con un <strong>Token QR Oficial</strong> sincronizado en la nube. Así garantizamos tarifas oficiales y procesos auditados.
              </p>
          
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/verificar-token"
                  className="px-5 py-3 rounded-xl bg-white text-[#0B192C] text-xs sm:text-sm font-bold hover:bg-slate-100 transition-all shadow-md"
                >
                  Verificar Folio de Servicio →
                </Link>
                <span className="text-xs text-slate-400">
                  Formato: DW-AAMMDD-XXXX / PE-XXXX
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FOOTER CORPORATIVO UNIFICADO */}
      <footer className="bg-[#0B192C] text-slate-400 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        
            {/* Columna Corporativa */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  PET GROUP <span className="text-amber-500">BAJÍO</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
                Consorcio integral de bienestar animal. Medicina clínica, estética canina móvil, pensión campestre y servicios de homenaje y cremación para mascotas.
              </p>
              <p className="text-slate-300 font-semibold text-xs">
                📍 Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Guanajuato.
              </p>
            </div>

            {/* Links Marcas */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
                Divisiones
              </h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/vet-for-pets" className="hover:text-amber-400 transition-colors">Vet for Pets (Clínica)</Link></li>
                <li><Link href="/doggy-wash" className="hover:text-amber-400 transition-colors">Doggy Wash (Spa Móvil)</Link></li>
                <li><Link href="/pet-hotel" className="hover:text-amber-400 transition-colors">Pet Hotel (Pensión)</Link></li>
                <li><Link href="/pets-eternity" className="hover:text-amber-400 transition-colors">Pets&apos; Eternity (Funeraria)</Link></li>
              </ul>
            </div>

            {/* Servicios & Control */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
                Transparencia
              </h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/verificar-token" className="hover:text-amber-400 transition-colors">Verificar Token QR</Link></li>
                <li><span className="text-slate-500">Dirección Médica Certificada</span></li>
                <li><span className="text-slate-500">Coordinación: Recepción Central</span></li>
                <li><span className="text-emerald-400 font-semibold">Atención Activa 24/7</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2 font-medium">
                <li><span className="hover:text-slate-300 transition-colors cursor-pointer">Aviso de Privacidad</span></li>
                <li><span className="hover:text-slate-300 transition-colors cursor-pointer">Términos del Servicio</span></li>
                <li><span className="hover:text-slate-300 transition-colors cursor-pointer">Políticas de Grooming</span></li>
                <li><span className="hover:text-slate-300 transition-colors cursor-pointer">Protocolos Clínicos</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>© 2026 Pet Group Bajío. Todos los derechos reservados. León, Guanajuato, México.</p>
            <p className="text-[11px] text-slate-400">
              Desarrollado y optimizado por{' '}
              <a
                href="https://impletech-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 font-semibold hover:text-amber-400 transition-colors"
              >
                Impletech AI
              </a>.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
