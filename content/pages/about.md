---
type: page
title: "Acerca del Catálogo Datos La Paz"
description: "Principios de gobernanza de datos abiertos, contratos sintácticos y estadísticas municipales de La Paz."
---

# Catálogo Datos La Paz

**Datos La Paz** (`datoslapaz`) es un catálogo cívico y abierto que organiza las series estadísticas y conjuntos de datos del municipio de Nuestra Señora de La Paz bajo principios de soberanía de dominio, contratos sintácticos verificables y acceso libre.

A diferencia de los repositorios aislados o portales difíciles de consultar analíticamente, esta plataforma cataloga y estructura los datos del Gobierno Autónomo Municipal de La Paz (GAMLP) preservados en Kaggle ([sociest/datos-abiertos-lapaz](https://www.kaggle.com/datasets/sociest/datos-abiertos-lapaz)), exponiendo metadatos normativos, esquemas formales y endpoints listos tanto para investigadores humanos como para modelos y agentes de Inteligencia Artificial.

---

## Principios de la Malla de Datos (Data Mesh)

1. **Propiedad Orientada al Dominio (Domain Ownership)**
   La clasificación y custodia se organiza por áreas municipales sustantivas: demografía, salud, educación, catastro, vialidad, alumbrado, culturas, medio ambiente y saneamiento.

2. **Datos como un Producto (Data as a Product)**
   Cada conjunto de datos se documenta con contratos sintácticos tipados (Frictionless DataPackage) y metadatos explícitos de procedencia y actualización.

3. **Plataforma de Autoservicio (Self-Serve Data Platform)**
   Estructura uniforme para búsqueda, visualización y consumo directo en bibliotecas de análisis (DuckDB, Pandas, Polars, Arrow).

4. **Gobernanza y Estándares Abiertos**
   Especificación normalizada (**Open Knowledge Format v0.2**), trazabilidad documental y verificación automatizada mediante linters normativos.

---

## Estándares Abiertos Utilizados

- **Open Knowledge Format (OKF v0.2):** Especificación que norma la estructura de carpetas, metadatos YAML frontmatter y trazabilidad de procedencia.
- **Frictionless DataPackage:** Especificación sintáctica para definir tablas, columnas, tipos de datos y restricciones.
- **Protocolo llms.txt:** Exposición estructurada de documentos en texto plano para indexación por agentes autónomos.
