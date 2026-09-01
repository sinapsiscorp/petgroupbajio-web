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

export const BRAND_CONTACTS = {
  doggyWash: {
    whatsapp: process.env.NEXT_PUBLIC_WA_DOGGY_WASH || "5214771612693",
    phone: process.env.NEXT_PUBLIC_PHONE_DOGGY_WASH || "524771612693",
    email: process.env.NEXT_PUBLIC_EMAIL_DOGGY_WASH || "doggywash@petgroupbajio.com",
    website: process.env.NEXT_PUBLIC_SITE_DOGGY_WASH || "https://petgroupbajio.com/doggy-wash",
    contact: process.env.NEXT_PUBLIC_CONTACT_DOGGY_WASH || "Atención a domicilio",
    facebook: process.env.NEXT_PUBLIC_FB_DOGGY_WASH || "https://www.facebook.com/doggywashleongto",
    instagram: process.env.NEXT_PUBLIC_IG_DOGGY_WASH || "https://www.instagram.com/doggy_wash_bajio/",
  },
  vetForPets: {
    whatsapp: process.env.NEXT_PUBLIC_WA_VET_FOR_PETS || "524775763512",
    phone: process.env.NEXT_PUBLIC_PHONE_VET_FOR_PETS || "524777175762",
    email: process.env.NEXT_PUBLIC_EMAIL_VET_FOR_PETS || "vetforpets@petgroupbajio.com",
    website: process.env.NEXT_PUBLIC_SITE_VET_FOR_PETS || "https://petgroupbajio.com/vet-for-pets",
    contact: process.env.NEXT_PUBLIC_CONTACT_VET_FOR_PETS || "Clínica veterinaria",
    facebook: process.env.NEXT_PUBLIC_FB_VET_FOR_PETS || "https://www.facebook.com/vetforpetsbajio",
    instagram: process.env.NEXT_PUBLIC_IG_VET_FOR_PETS || "https://www.instagram.com/vetforpets_bajio/",
  },
  petHotel: {
    whatsapp: process.env.NEXT_PUBLIC_WA_PET_HOTEL || "524775187491",
    phone: process.env.NEXT_PUBLIC_PHONE_PET_HOTEL || "524775763512",
    email: process.env.NEXT_PUBLIC_EMAIL_PET_HOTEL || "pethotel@petgroupbajio.com",
    website: process.env.NEXT_PUBLIC_SITE_PET_HOTEL || "https://petgroupbajio.com/pet-hotel",
    contact: process.env.NEXT_PUBLIC_CONTACT_PET_HOTEL || "Recepción y reservas",
    facebook: process.env.NEXT_PUBLIC_FB_PET_HOTEL || "https://www.facebook.com/pethotelleongto",
    instagram: process.env.NEXT_PUBLIC_IG_PET_HOTEL || "https://www.instagram.com/pet_hotel_bajio",
  },
  petsEternity: {
    whatsapp: process.env.NEXT_PUBLIC_WA_PETS_ETERNITY || "524775941709",
    phone: process.env.NEXT_PUBLIC_PHONE_PETS_ETERNITY || "524775941709",
    email: process.env.NEXT_PUBLIC_EMAIL_PETS_ETERNITY || "petseternity@petgroupbajio.com",
    website: process.env.NEXT_PUBLIC_SITE_PETS_ETERNITY || "https://petseternity.com.mx",
    contact: process.env.NEXT_PUBLIC_CONTACT_PETS_ETERNITY || "Línea de acompañamiento",
    facebook: process.env.NEXT_PUBLIC_FB_PETS_ETERNITY || "https://www.facebook.com/petseternityleongto",
    instagram: process.env.NEXT_PUBLIC_IG_PETS_ETERNITY || "https://www.instagram.com/pets_eternity_bajio",
  },
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
    whatsapp: BRAND_CONTACTS.doggyWash.whatsapp,
    phone: BRAND_CONTACTS.doggyWash.phone,
    email: BRAND_CONTACTS.doggyWash.email,
    website: BRAND_CONTACTS.doggyWash.website,
    facebook: BRAND_CONTACTS.doggyWash.facebook,
    instagram: BRAND_CONTACTS.doggyWash.instagram,
    contact: BRAND_CONTACTS.doggyWash.contact,
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
    slug: "/pets-eternity",
    externalSite: BRAND_CONTACTS.petsEternity.website,
    website: BRAND_CONTACTS.petsEternity.website,
    whatsapp: BRAND_CONTACTS.petsEternity.whatsapp,
    phone: BRAND_CONTACTS.petsEternity.phone,
    email: BRAND_CONTACTS.petsEternity.email,
    facebook: BRAND_CONTACTS.petsEternity.facebook,
    instagram: BRAND_CONTACTS.petsEternity.instagram,
    contact: BRAND_CONTACTS.petsEternity.contact,
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
    whatsapp: BRAND_CONTACTS.petHotel.whatsapp,
    phone: BRAND_CONTACTS.petHotel.phone,
    email: BRAND_CONTACTS.petHotel.email,
    website: BRAND_CONTACTS.petHotel.website,
    facebook: BRAND_CONTACTS.petHotel.facebook,
    instagram: BRAND_CONTACTS.petHotel.instagram,
    contact: BRAND_CONTACTS.petHotel.contact,
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
    whatsapp: BRAND_CONTACTS.vetForPets.whatsapp,
    phone: BRAND_CONTACTS.vetForPets.phone,
    email: BRAND_CONTACTS.vetForPets.email,
    website: BRAND_CONTACTS.vetForPets.website,
    facebook: BRAND_CONTACTS.vetForPets.facebook,
    instagram: BRAND_CONTACTS.vetForPets.instagram,
    contact: BRAND_CONTACTS.vetForPets.contact,
    schedule: "Lunes a Sábado 9:00 - 20:00 | Urgencias",
  },
};
