<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contexto del proyecto: Pet Group Bajío

Antes de escribir o modificar cualquier UI, landing, componente, copy o pieza de contenido (propia o generada por IA), consulta `docs/branding/` — es la **biblia de diseño (SOT)** del consorcio Pet Group Bajío y de sus 4 marcas (Doggy Wash, Vet for Pets, Pet Hotel, Pets' Eternity). Define paleta cromática, tipografías, tono de voz, arquitectura de componentes y mapa de assets estáticos (`public/images/...`). No inventes colores, fuentes ni tono sin haber leído primero el `BRAND_KIT` maestro y el `BRAND_SPEC` de la marca correspondiente:

- `docs/branding/BRAND_KIT_PET_GROUP_BAJIO.md` — kit maestro corporativo (prevalece para hub, navegación, footer, elementos de nivel consorcio).
- `docs/branding/BRAND_SPEC_DOGGY_WASH.md`, `BRAND_SPEC_VET_FOR_PETS.md`, `BRAND_SPEC_PET_HOTEL.md`, `BRAND_SPEC_PETS_ETERNITY.md` — identidad propia de cada marca (prevalece dentro de la landing/página de esa marca).

Para arquitectura de datos, integraciones (Jotform AI Agent + Google Apps Script + Sheets) y reglas de negocio, consulta `.context/`:

- `.context/MASTER_PLAN_OPCION_B.md` — plan maestro, hitos y pendientes activos.
- `.context/INTEGRATIONS_JOTFORM_AI.md` — contrato técnico Jotform ↔ Apps Script ↔ Sheets.
- `.context/BUSINESS_RULES.md` — reglas de negocio de las 4 marcas.
- `.context/OPERATIONAL_FLOW.md` — flujo operativo de recepción y campo.

El backend real vive en `integrations/appscript/BackendWebhook.gs`, con su propia bitácora técnica en `integrations/appscript/README.md` (payloads reales de Jotform, advertencias sobre bugs ya resueltos, configuración exacta del AI Agent). Ese `.gs` no se ejecuta directamente desde este repo — hay que copiarlo manualmente al editor de Apps Script vinculado al Google Sheet y crear una nueva versión de implementación tras cada cambio.
