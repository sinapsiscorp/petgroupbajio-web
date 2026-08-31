# **MASTER BRAND KIT & UI/UX LAYOUT SPECIFICATION**

## **PET GROUP BAJÍO — CONSORCIO INTEGRAL DE BIENESTAR ANIMAL**

**Ruta en Repositorio:** docs/branding/BRAND\_KIT\_PET\_GROUP\_BAJIO.md

**Dominio Oficial:** petgroupbajio.com

**Ubicación Central:** Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Guanajuato

**Dirección General:** Dr. Eusebio Lozano Bedia

**Dirección Operativa:** Lic. Larissa Rico

## **1\. CONCEPTO MAESTRO: "EL CÍRCULO COMPLETO DEL BIENESTAR"**

### **A. Diagnóstico del Layout Anterior**

El diseño previo presentaba un fondo oscuro y plano tipo "SaaS de software B2B" (\#0B132B), generando una barrera emocional con las familias y tutores de mascotas. Pet Group Bajío no es una empresa de tecnología fría, sino un consorcio médico, asistencial y recreativo con más de 15 años de arraigo y calidez en León, Gto.

### **B. La Nueva Propuesta de Identidad Integral**

Pet Group Bajío se posiciona como el **ecosistema integral que acompaña a la familia multiespecie en cada etapa de la vida de su mascota**:

1. **Salud y Prevención Continua:** *Vet for Pets* (Clínica, quirófano, diagnóstico y pet shop).  
2. **Higiene y Vida Diaria sin Estrés:** *Doggy Wash* (Estética y spa móvil a domicilio).  
3. **Recreación y Vacaciones:** *Pet Hotel* (Pensión campestre libre de jaulas).  
4. **Trascendencia y Memoria:** *Pets' Eternity* (Funeraria, salas de duelo y crematorio 24/7).

### **C. Esquema Jerárquico de Marca**

* **Nivel Corporativo / Hub Madre:** Pet Group Bajío actúa como conmutador de confianza, respaldo ético, supervisión médica del Dr. Lozano y punto de validación antifraude (Tokens QR).  
* **Nivel Operativo / Marcas Hijas:** Cada marca conserva su autonomía funcional, paleta de color propia, número de atención y canal de agendamiento especializado.

## **2\. PALETA CROMÁTICA CORPORATIVA DEL CONSORCIO**

| Rol Funcional | Nombre del Color | Hex Code | Tailwind CSS Class | Aplicación en UI |
| :---- | :---- | :---- | :---- | :---- |
| **Fondo Maestro** | Bajío Warm Pearl | \#FBFBF9 | bg-\[\#FBFBF9\] | Fondo base de todo el portal (luminoso, orgánico y limpio) |
| **Cabecera & Títulos** | Consorcio Deep Navy | \#0B192C | bg-\[\#0B192C\] / text-\[\#0B192C\] | Navbar institucional, pie de página y tipografía H1/H2 |
| **Acento Institucional** | Bajío Sun Amber | \#F59E0B | bg-amber-500 / text-amber-500 | Sello de calidad, badges de consorcio y llamadas destacadas |
| **Superficie de Tarjetas** | Pure White Card | \#FFFFFF | bg-white | Contenedores de marcas con sombras suaves (shadow-sm) |
| **Bordes & Divisiones** | Gentle Warm Gray | \#E5E7EB | border-gray-200 | Separadores de sección y contornos de cuadrantes |

## **3\. TIPOGRAFÍAS DEL SISTEMA**

* **Display y Títulos Corporativos (H1, H2, H3):** Outfit o Plus Jakarta Sans (Pesos: SemiBold 600, Bold 700). Transmite solidez institucional moderna, accesibilidad y liderazgo.  
* **Cuerpo de Texto y Fichas Informativas:** Inter o Plus Jakarta Sans (Pesos: Regular 400, Medium 500). Máxima legibilidad en descripciones de servicios, horarios y políticas.

## **4\. ARQUITECTURA DETALLADA DEL HUB PRINCIPAL (src/app/page.jsx)**

### **Sección 1: Top Navigation Bar Institucional**

* **Lado Izquierdo:** Logotipo oficial de Pet Group Bajío (/images/brand/pet-group-bajio-logo.png).  
* **Centro (Brand Switcher):** Píldoras con micro-iconos de color representativo para cada marca:  
  * Azul/Lima para Doggy Wash (/doggy-wash)  
  * Índigo/Cian para Vet for Pets (/vet-for-pets)  
  * Naranja/Verde para Pet Hotel (/pet-hotel)  
  * Pizarra/Salvia para Pets' Eternity (/pets-eternity)  
* **Lado Derecho:**  
  * Botón de Emergencias 24/7 (Acceso inmediato a cremación/atención urgente).  
  * Botón "Verificar Folio / QR" (Redirige a /verificar-token).

### **Sección 2: Hero Section — "El Círculo del Cuidado"**

* **Titular Principal (H1):** *"Todo el ciclo de cuidado para tu mascota en un solo lugar."*  
* **Subtítulo:** *"Desde su primera consulta veterinaria y spa a domicilio, hasta sus vacaciones campestres y el homenaje a su memoria. El consorcio de bienestar animal más completo de León y el Bajío."*  
* **Componente Interactivo Central:** PetLifeCycleWheel — Selector interactivo de 4 cuadrantes donde el tutor puede hacer clic en la etapa actual de su mascota y ver desplegada la solución inmediata.

### **Sección 3: Los 4 Pilares del Consorcio (Grid de Marcas)**

Cuatro tarjetas destacadas con micro-animaciones al hacer hover (hover:shadow-xl hover:-translate-y-1 transition-all duration-300):

1. **Tarjeta Doggy Wash:**  
   * Badge: *"Spa Canino en tu Puerta"* (bg-sky-100 text-sky-700)  
   * Imagen representativa del servicio móvil.  
   * Resumen: Baño, corte, deslanado y aromaterapia sin traslados ni jaulas.  
   * CTA: *"Solicitar Unidad Móvil →"*  
2. **Tarjeta Vet for Pets:**  
   * Badge: *"Clínica & Quirófano"* (bg-cyan-100 text-cyan-800)  
   * Imagen de consultorio y equipo diagnóstico.  
   * Resumen: Medicina preventiva, laboratorio, cirugías, rayos X y boutique nutricional.  
   * CTA: *"Agendar Consulta Clínica →"*  
3. **Tarjeta Pet Hotel:**  
   * Badge: *"Resort Libre de Jaulas"* (bg-orange-100 text-orange-800)  
   * Imagen de áreas verdes campestres y alberca canina.  
   * Resumen: Hospedaje en suites térmicas, socialización y reporte fotográfico diario.  
   * CTA: *"Reservar Vacaciones →"*  
4. **Tarjeta Pets' Eternity:**  
   * Badge: *"Atención y Traslado 24/7"* (bg-slate-100 text-slate-800)  
   * Imagen solemne de salas de velación y relicarios.  
   * Resumen: Despedidas dignas, cremación individual/comunitaria y apoyo tanatológico.  
   * CTA: *"Línea de Acompañamiento Inmediato →"*

### **Sección 4: Autoridad y Respaldo Médico**

* **Tarjeta de Garantía Profesional:** Distintivo *"Dirección Médica General: Dr. Eusebio Lozano Bedia"*.  
* **Mensaje:** Más de una década respaldando protocolos clínicos, sanitización de unidades móviles y certificaciones éticas.  
* **Métricas de Confianza:** \+15,000 servicios completados, 4 unidades especializadas, cobertura total en León y zona metropolitana.

### **Sección 5: Transparencia y Sistema Antifraude**

* Explicación breve de por qué cada servicio cuenta con un **Token QR Oficial** verificado en la nube de Google Sheets, garantizando precios oficiales y operadores certificados.

### **Sección 6: Footer Corporativo**

* Ubicación central: Paseo de los Insurgentes 321, Local 6, Col. Los Paraísos, León, Gto.  
* Conmutador general de WhatsApp y accesos a redes sociales unificadas de cada marca.  
* Enlaces legales: Aviso de Privacidad y Términos de Servicio.

## **5\. MAPA DE RECURSOS, ASSETS Y PLACEHOLDERS (public/)**

Todos los recursos estáticos que alimentan al sitio web deben ubicarse dentro de la carpeta public/ respetando esta nomenclatura exacta:

### **A. Subcarpeta public/images/brand/ (Identidad Gráfica y Logos)**

* public/images/brand/pet-group-bajio-logo.png — Logotipo horizontal del consorcio sobre fondo transparente (400x120 px).  
* public/images/brand/pet-group-bajio-symbol.png — Isotipo / Emblema circular del grupo (512x512 px).  
* public/images/brand/logo-doggy-wash.png — Logotipo oficial de Doggy Wash en PNG transparente (600x600 px).  
* public/images/brand/logo-pet-hotel.png — Logotipo oficial de Pet Hotel en PNG transparente (600x600 px).  
* public/images/brand/logo-pets-eternity.png — Logotipo oficial de Pets' Eternity en PNG transparente (600x600 px).  
* public/images/brand/logo-vet-for-pets.png — Logotipo oficial de Vet for Pets en PNG transparente (600x600 px).

### **B. Subcarpeta public/images/hero/ (Fotografías y Fondos Principales)**

* public/images/hero/hero-lifecycle-wheel.webp — Gráfico central del ciclo de vida animal (1200x800 px).  
* public/images/hero/hero-doggy-wash.webp — Fotografía de camioneta móvil o perro disfrutando el baño (800x600 px).  
* public/images/hero/hero-vet-for-pets.webp — Fotografía de clínica veterinaria / área de diagnóstico (800x600 px).  
* public/images/hero/hero-pet-hotel.webp — Fotografía de jardines campestres y perros jugando (800x600 px).  
* public/images/hero/hero-pets-eternity.webp — Fotografía conmemorativa serena / urna o sala de duelo (800x600 px).

### **C. Subcarpeta public/images/badges/ (Iconos Funcionales y Sellos)**

* public/images/badges/badge-qr-secure.svg — Icono de validación de Token Antifraude (120x120 px).  
* public/images/badges/badge-24-7.svg — Icono de atención de emergencias 24 horas (120x120 px).  
* public/images/badges/badge-medical-certified.svg — Sello de certificación y dirección médica (120x120 px).

## **6\. GUÍA DE IMPLEMENTACIÓN PARA COMPONENTES NEXT.JS / TAILWIND**

1. **Uso de Rutas Relativas:** En Next.js, cualquier archivo guardado en public/images/... se consume directamente desde el código como /images/... (sin anteponer public/).  
2. **Ejemplo de consumo en React:**  
   \<Image src="/images/brand/logo-doggy-wash.png" alt="Doggy Wash \- Spa Canino Móvil en León Gto" width={180} height={180} priority /\>  
3. **Píldora de Navegación de Retorno:** En las páginas internas (/doggy-wash, /vet-for-pets, etc.), colocar siempre en el header:  
   \<Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-amber-600"\>← Volver al Consorcio Pet Group Bajío\</Link\>