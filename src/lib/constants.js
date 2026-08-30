export const APP_CONFIG = {
  gasWebhookUrl: process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL || "",
  jotformAgentUrl:
    process.env.NEXT_PUBLIC_JOTFORM_AGENT_URL ||
    "https://agent.jotform.com/019ca04a1f7e7a6a92321eceb3ba72e8ae01",
  jotformEmbedUrl:
    process.env.NEXT_PUBLIC_JOTFORM_EMBED_URL ||
    "https://cdn.jotfor.ms/agent/embedjs/019ca04a1f7e7a6a92321eceb3ba72e8ae01/embed.js",
  jotformFormUrl:
    process.env.NEXT_PUBLIC_JOTFORM_FORM_URL || "https://form.jotform.com/260575689640065",
};

export const CORPORATE_INFO = {
  name: "Pet Group Bajío",
  address:
    process.env.NEXT_PUBLIC_CORPORATE_ADDRESS ||
    "Paseo de los Insurgentes 321 Local 6, León, Guanajuato",
  email: process.env.NEXT_PUBLIC_CORPORATE_EMAIL || "contacto@petgroupbajio.com",
  phone: process.env.NEXT_PUBLIC_CORPORATE_PHONE || "+52 477 123 4567",
  copyright: "© 2026 Pet Group Bajío. Todos los derechos reservados.",
};

export const BRANDS = {
  doggyWash: {
    id: "doggy-wash",
    name: "Doggy Wash",
    tagline: "Grooming & Spa Canino a Domicilio",
    description:
      "Cuidado profesional en la puerta de tu hogar. Higiene, corte y estética con equipo especializado.",
    color: "#0284c7",
    badge: "Servicio a Domicilio",
    slug: "/doggy-wash",
    whatsapp: process.env.NEXT_PUBLIC_WA_DOGGY_WASH || "524775187491",
    jotformAgentUrl: APP_CONFIG.jotformAgentUrl,
    jotformEmbedUrl: APP_CONFIG.jotformEmbedUrl,
    schedule: "Lunes a Viernes 9:00 - 19:00 | Sábados 9:00 - 15:00",
  },
  petsEternity: {
    id: "pets-eternity",
    name: "Pets Eternity",
    tagline: "Funeraria & Crematorio para Mascotas",
    description:
      "Despedidas dignas, amorosas y en paz. Salas de velación y cremación individual o comunitaria.",
    color: "#94a3b8",
    badge: "Atención Inmediata 24/7",
    slug: "https://petseternity.com.mx",
    externalSite: "https://petseternity.com.mx",
    whatsapp: process.env.NEXT_PUBLIC_WA_PETS_ETERNITY || "524775756361",
    schedule: "Guardia activa los 365 días del año",
  },
  petHotel: {
    id: "pet-hotel",
    name: "Pet Hotel",
    tagline: "Pensión y Hospedaje Campestre",
    description:
      "Libertad, socialización, recreación y confort en espacios seguros mientras estás fuera de la ciudad.",
    color: "#16a34a",
    badge: "Hospedaje Seguro",
    slug: "/pet-hotel",
    whatsapp: process.env.NEXT_PUBLIC_WA_PET_HOTEL || "524775756361",
    schedule: "Check-in: 9:00 - 18:00 | Monitoreo 24 hrs",
  },
  vetForPets: {
    id: "vet-for-pets",
    name: "Vet for Pets",
    tagline: "Clínica Veterinaria & Especialidades",
    description:
      "Medicina preventiva, laboratorio, rayos X, cirugías y diagnóstico con especialistas calificados.",
    color: "#dc2626",
    badge: "Salud y Diagnóstico",
    slug: "/vet-for-pets",
    whatsapp: process.env.NEXT_PUBLIC_WA_VET_FOR_PETS || "524775756361",
    schedule: "Lunes a Sábado 9:00 - 20:00 | Urgencias",
  },
};
