This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Guía rápida para pruebas locales

Sigue estos pasos para previsualizar la web en tu navegador y revisar los cambios antes de publicarlos.

### Paso 1: abrir la terminal en VS Code

1. Abre el proyecto en VS Code.
2. Presiona Ctrl + ñ o ve a Terminal → New Terminal.
3. Verifica que la ruta final del terminal termine en `petgroupbajio-web>`.

### Paso 2: ejecutar el servidor de pruebas

Ejecuta este comando:

```bash
npm run dev
```

Esto levantará el proyecto en modo desarrollo. Luego abre la siguiente URL en tu navegador:

- [http://localhost:3000](http://localhost:3000)

### Paso 3: revisar cambios en tiempo real

Cuando la terminal muestre que el servidor está listo, podrás ver los cambios en el navegador sin afectar la versión de producción en Vercel.

> Esta es la forma recomendada para hacer pruebas y validar avances antes de desplegar.

## Consulta de estatus y separación operativa

La ruta `/verificar-token` está pensada para seguimiento y operación del servicio, pero debe verse como una zona discreta y claramente identificada dentro del sitio.

### Principio de diseño

1. La experiencia principal para clientes y visitantes debe ser clara, amigable y orientada a la consulta del servicio.
2. El acceso operativo se mantiene separado visualmente con una etiqueta de "Área interna" y controles de actualización de estatus.
3. El PIN y la edición de estatus quedan restringidos a la parte interna de la pantalla para evitar confusión con el flujo del cliente.

### Recomendación de uso

- Mantener la ruta disponible como consulta pública, pero no como bloque principal del contenido general.
- Reservar el panel de operación para personal del negocio, operadores o coordinación de servicio.
- No exponer PINs ni datos sensibles de clientes en canales públicos o redes sociales.

> La intención es que el cliente pueda confirmar su servicio sin que el flujo operativo se mezcle con el contenido corporativo general.

## Documentación de integraciones

La arquitectura de Jotform AI Agent, el formulario, Google Apps Script y Google Sheets está documentada en [`.context/INTEGRATIONS_JOTFORM_AI.md`](.context/INTEGRATIONS_JOTFORM_AI.md).

Consulta también:

- [`.context/OPERATIONAL_FLOW.md`](.context/OPERATIONAL_FLOW.md) para el flujo de recepción, seguimiento y operación.
- [`.context/BUSINESS_RULES.md`](.context/BUSINESS_RULES.md) para las reglas de captura y autorización.
- [`.context/MASTER_PLAN_OPCION_B.md`](.context/MASTER_PLAN_OPCION_B.md) para el estado y alcance del proyecto.

La especificación de integración se mantiene como documento independiente y funciona como referencia técnica para actualizar Jotform, Apps Script o la estructura de Sheets.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Variables de entorno

Este proyecto centraliza los datos públicos del negocio en variables de entorno para no dejarlos hardcodeados dentro del código.

### Uso recomendado

1. Copia el archivo [.env.example.txt](.env.example.txt) a `.env.local` para desarrollo local.
2. En producción, define las mismas variables en el panel de variables de entorno del hosting (por ejemplo Vercel).
3. Usa `NEXT_PUBLIC_` solo para valores que sí pueden exponerse al navegador.
4. Mantén secretos, tokens y claves privadas fuera de este archivo.

### Qué se guarda ahí

- URLs de Google Apps Script para webhooks o integraciones públicas
- URLs de Jotform para agente, embed y formularios
- Números de WhatsApp oficiales
- Datos corporativos como dirección, correo y teléfono

### Propósito

Estas variables permiten cambiar enlaces, rutas o contactos sin tocar la lógica del frontend. Si un teléfono o un formulario cambia, basta con actualizar la variable del entorno.

### Alcance actual de la app

Las páginas desplegadas y configuradas en este repo actualmente son:

- Doggy Wash: `/doggy-wash`
- Pets Eternity: `/pets-eternity`
- Pet Hotel: `/pet-hotel`
- Vet for Pets: `/vet-for-pets`
- Consulta de servicio: `/verificar-token`

La hoja de constantes y la navegación corporativa reflejan actualmente esos 4 brands activos más la ruta interna de verificación.

> Importante: si algo no debe verse en el cliente, no debe ir en `NEXT_PUBLIC_*`; debe ir a un backend o un entorno privado.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
