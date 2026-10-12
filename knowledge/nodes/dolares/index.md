---
type: dataset
title: Tipos de Cambio en Bolivia (Mercado Paralelo, Bancos y BCB)
description: Series temporales y monitoreo continuo de los tipos de cambio del dólar estadounidense (USD) y criptoactivos estables (USDT) frente al boliviano (BOB). Integra cotizaciones de alta frecuencia de Binance P2P, registros oficiales y referenciales del Banco Central de Bolivia (BCB), detalle desagregado por entidad bancaria y pizarras web comerciales.
dimensions:
  - timestamp
  - tipo_mercado
  - operacion
  - banco
contracts:
  - type: datapackage
    path: ./datapackage.yaml
lineage:
  source:
    - url: https://github.com/mauforonda/dolares
      title: Repositorio Oficial Dólares en Bolivia (GitHub)
    - url: https://mauforonda.github.io/dolares/
      title: Visualizador y Tablero de Cotizaciones
    - url: https://www.bcb.gob.bo
      title: Banco Central de Bolivia (BCB)
  author:
    name: Mauricio Foronda
    url: https://github.com/mauforonda
  version: 1.0.0
  updated_at: '2026-10-12T00:00:00Z'
---

# Tipos de Cambio en Bolivia: Mercado Paralelo (Binance P2P), Oficial y Bancario

Conjunto unificado de series de tiempo y datos transaccionales de alta frecuencia sobre la cotización del dólar estadounidense (USD) y criptomonedas estables (USDT) en el mercado boliviano (BOB).

## Contexto del Régimen Cambiario y Segmentación del Mercado

A partir de las restricciones de liquidez externa y divisas físicas iniciadas a principios de 2023, el mercado cambiario en Bolivia experimentó una fragmentación estructural en múltiples bandas y canales operativos:

1. **Mercado Paralelo Digital (Binance P2P):** Canal libre y continuo entre particulares y comerciantes donde se transacciona Tether (USDT) en bolivianos vía transferencias bancarias y pagos QR inmediatos. Es el indicador de mayor liquidez y frecuencia para evaluar el tipo de cambio real de mercado.
2. **Tipo de Cambio Oficial (TCO - BCB):** Cotización institucional fijada por el Banco Central de Bolivia para operaciones públicas del Estado y comercio exterior formal.
3. **Tipo de Cambio Referencial del BCB:** Promedio ponderado y reporte diario de operaciones interbancarias y compras efectivas ejecutadas por el sistema financiero nacional.
4. **Pizarras Web de Bancos Comerciales:** Cotizaciones nominales de compra y venta publicadas en ventanillas digitales de las principales entidades financieras privadas (BISA, BCP, BNB, BancoSol, Banco Unión, Mercantil Santa Cruz, entre otros).

Este nodo consolida los flujos de datos automatizados desarrollados para realizar seguimiento transparente y abierto de todas estas fuentes.

## Metodología Estadística y Métricas de Cotización

Para mitigar anomalías y capturar la dinámica efectiva del libro de órdenes P2P, el pipeline calcula métricas estadísticas específicas:

- **VWAP (Volume-Weighted Average Price):** Media ponderada por volumen negociable de las ofertas activas, representando el valor justo de equilibrio en el mercado.
- **Naive (10% Extremo):** Valor modal o más representativo dentro del 10% más competitivo del libro de órdenes, correspondiente a la tasa efectiva que utilizan los operadores habituales.
- **Mediana (`median`):** Mediana no paramétrica de todas las posturas de compra o venta vigentes.
- **Índice Herfindahl-Hirschman (`herfindahl_hirschman`):** Indicador de concentración económica que cuantifica el grado de competencia entre anunciantes en la plataforma.

```ojs
const resourceUrl = dataset.resources?.[0]?.path;
const data = await datamesh.query({
  resource_uri: resourceUrl || "dolares:binance_compra",
  limit: 250
});

const tsIdx = data.columns.indexOf("timestamp");
const vwapIdx = data.columns.indexOf("vwap");
const naiveIdx = data.columns.indexOf("naive");
const medianIdx = data.columns.indexOf("median");

const rows = data.rows.map(r => ({
  fecha: new Date(r[tsIdx]),
  vwap: parseFloat(r[vwapIdx]) || 0,
  naive: parseFloat(r[naiveIdx]) || 0,
  median: parseFloat(r[medianIdx]) || 0
})).filter(d => !isNaN(d.vwap) && d.fecha instanceof Date && !isNaN(d.fecha.getTime()));

return Plot.plot({
  title: "Cotización del Dólar Paralelo en Bolivia (Binance P2P)",
  subtitle: "Evolución reciente de compra: VWAP (Ponderado), Naive (10% Extremo) y Mediana",
  x: { label: "Fecha y Hora" },
  y: { label: "Bs por USDT / USD", grid: true },
  color: {
    domain: ["VWAP (Ponderado)", "Naive (10% Extremo)", "Mediana"],
    range: ["#0284c7", "#f59e0b", "#10b981"],
    legend: true
  },
  marks: [
    Plot.lineY(rows, { x: "fecha", y: "vwap", stroke: "#0284c7", strokeWidth: 2 }),
    Plot.lineY(rows, { x: "fecha", y: "naive", stroke: "#f59e0b", strokeWidth: 1.5, strokeDasharray: "4,4" }),
    Plot.lineY(rows, { x: "fecha", y: "median", stroke: "#10b981", strokeWidth: 1.5 }),
    Plot.ruleY([6.96], { stroke: "#ef4444", strokeDasharray: "2,2" })
  ]
});
```

## Recursos de Datos Federados (14 Tablas)

El contrato Frictionless del nodo expone 14 recursos tabulares divididos en cuatro dominios funcionales:

### 1. Mercado P2P (Binance)
- `binance_compra`: Series de precios de compra de USDT/BOB (`low`, `high`, `median`, `vwap`, `naive`).
- `binance_compra_mercado`: Métricas de liquidez de compra (`offers`, `tradable`, `herfindahl_hirschman`).
- `binance_venta`: Series de precios de venta de USDT/BOB.
- `binance_venta_mercado`: Métricas de liquidez y concentración de venta.

### 2. Banco Central de Bolivia (Referencial)
- `referencial_bcb_compra`: Tipo de cambio referencial diario de compra publicado por el BCB.
- `referencial_bcb_venta`: Tipo de cambio referencial diario de venta publicado por el BCB.
- `referencial_bcb_compra_completo`: Tipo de cambio diario desagregado por cada banco de la red nacional.
- `referencial_bcb_compra_monto`: Montos diarios totales de compra operados por entidad bancaria en USD.

### 3. Banco Central de Bolivia (Oficial)
- `oficial_compra`: Serie del tipo de cambio oficial de compra en portada del BCB.
- `oficial_venta`: Serie histórica del tipo de cambio oficial de venta del BCB.
- `oficial_compras_detalle`: Registro detallado de transacciones cambiarias por banco, tipo de cambio pactado y monto.
- `oficial_bancos_detalle`: Tipo de cambio promedio ponderado estimado por entidad financiera.

### 4. Bancos Comerciales (Pizarras Web)
- `bancos_compra`: Cotizaciones de compra extraídas de los portales de bancos comerciales bolivianos.
- `bancos_venta`: Cotizaciones de venta extraídas de los portales de bancos comerciales bolivianos.

## Consultas Analíticas con DataMesh

```bash
# Consultar las últimas 10 cotizaciones de compra en Binance P2P
datamesh query "dolares:binance_compra" --limit 10

# Comparar montos transaccionados por banco en el BCB
datamesh sql "SELECT timestamp, banco_union, banco_bisa, banco_nacional_de_bolivia, value FROM 'dolares:referencial_bcb_compra_monto' ORDER BY timestamp DESC LIMIT 5"

# Analizar la brecha entre el mercado libre P2P y las pizarras bancarias
datamesh sql "SELECT b.timestamp, b.banco, b.valor AS cotizacion_bancaria, p.vwap AS cotizacion_p2p FROM 'dolares:bancos_compra' b JOIN 'dolares:binance_compra' p ON DATE(b.timestamp) = DATE(p.timestamp) ORDER BY b.timestamp DESC LIMIT 20"
```

## Autoría y Atribución

Este nodo federado recopila y estructura los datos generados por el proyecto de código abierto desarrollado por **Mauricio Foronda**:

- **Autor:** Mauricio Foronda ([@mauforonda](https://github.com/mauforonda))
- **Repositorio de Código y Datos:** [https://github.com/mauforonda/dolares](https://github.com/mauforonda/dolares)
- **Tablero y Explorador Visual:** [https://mauforonda.github.io/dolares/](https://mauforonda.github.io/dolares/)
- **Licencia:** Datos abiertos y código de dominio público / open-source conforme a los términos del repositorio fuente.
