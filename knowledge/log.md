# Bitácora de Cambios de Conocimiento y Datos

## 2026-10-30
- Desduplicación integral de las series municipales: consolidación de 179 registros a 60 datasets canónicos (última versión disponible por código municipal SIT).
- Eliminación de snapshots históricos redundantes (años 2022 y 2023 sustituidos por la última entrega consolidada).
- Ubicación de recursos de datos junto a sus contratos sintácticos: normalización de 60 archivos CSV en UTF-8 dentro de cada nodo soberano (`knowledge/nodes/<slug>/data.csv`).
- Actualización de contratos Frictionless (`datapackage.yaml`) y fichas OKF v0.2 referenciando ruta relativa `./data.csv` y enlace de custodia en Kaggle.
- Ingesta de 3 nuevos datasets procedentes de Datatón La Paz 2026 Punto Cero: `infraestructuras-educativas-municipales-2024`, `diagnostico-servicios-y-equipamiento-unidades-educativas` (D5 Educación Urbana) y `ciudadania-digital-autenticaciones-por-sistema-y-ano` (D1 Base Digital / AGETIC).
- Normalización sintáctica completa de 63 contratos `datapackage.yaml` y fichas de conocimiento `index.md`.
