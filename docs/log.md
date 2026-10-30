# Bitácora de Cambios de Ingeniería y Portal

## 2026-10-30
- Rebranding del portal a Datos La Paz (`datoslapaz`) en `portal.config.ts`, `package.json` y manifiestos de la aplicación.
- Rediseño visual institucional con paleta cívica de La Paz: Rojo Punzó (`#9e1b2f`), Verde Esmeralda (`#0a5c36`) y acentos de cabecera con cinta bicolor.
- Actualización de `favicon.svg` y meta-tags temáticos en `manifest.webmanifest`.
- Actualización de textos editoriales en `content/pages/` (`home.md`, `about.md`, `download.md`) y `README.md`.
- Sincronización de endpoints LLM (`llms.txt`, `llms-full.txt`) con los 60 datasets desduplicados de La Paz.
- Resolución de rutas relativas de recursos de datos hacia el endpoint estático soberano `/raw/nodes/<slug>/data.csv`.
- Detección automática y saneamiento de delimitadores (coma y punto y coma) en `DataExplorer.astro`.
- Simplificación de arquitectura y navegación: eliminación de módulo de blog (`docs/blog/`) y rutas/enlaces de descargas (`/download`).
- Desactivación de banners de instalación PWA y enlaces desktop para una interfaz web limpia y minimalista.
