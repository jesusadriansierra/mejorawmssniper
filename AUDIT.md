# Auditoría de Arquitectura Global - SNIPER Analytics / WMS

## 1. Resumen Ejecutivo
Se realizó una auditoría técnica y de arquitectura sobre el repositorio **SNIPER Analytics / WMS**. El sistema es una aplicación Next.js 16 (React 19) con Tailwind CSS orientada al monitoreo operativo, comercial y logístico de bodegas, tiendas y venta multicanal.

A pesar de presentar una interfaz limpia y atractiva en el frontend, la arquitectura interna actual presenta deficiencias estructurales críticas en la separación de responsabilidades, tipado estricto, gestión de estado, renderizado en React y preparación para escalabilidad de datos e integraciones.

---

## 2. Diagnóstico de Arquitectura Global y Estructura del Código

### 2.1 Monolito de UI y Datos Concentrados (`app/page.tsx`)
- **Hallazgo:** Toda la aplicación (rutas, navegación, lógica de negocio, datos mockeados, formateo de tablas, componentes de vista y centro de decisiones) residía en un solo archivo de 60+ líneas (`app/page.tsx`).
- **Impacto:**
  - Imposibilidad de reutilización de componentes y prueba unitaria.
  - Crecimiento insostenible a medida que se agreguen más vistas o endpoints.
  - Alto acoplamiento entre la representación visual y el modelo de datos.

### 2.2 Desactivación de Verificación de Tipos (`next.config.mjs`)
- **Hallazgo:** La configuración `next.config.mjs` contenía `typescript: { ignoreBuildErrors: true }`.
- **Impacto:** Ocultaba errores de compilación de TypeScript en producción, comprometiendo la solidez y el mantenimiento del código.

### 2.3 Estructura de Directorios Incompleta
- No existían carpetas especializadas para modelos/tipos (`lib/types/`), servicios de consulta (`lib/services/` o `lib/api/`), hooks personalizados o componentes de layout modulares.

---

## 3. Auditoría de Consultas, Capa de Datos y Modelado (Queries & Data)

### 3.1 Ausencia de Capa Abstraída de Consultas / API
- **Hallazgo:** Los datos operativos (pedidos, inventario, manifiestos, ventas, tiendas, datos financieros) estaban definidos como un objeto plano hardcodeado en el cliente (`use client`).
- **Riesgo/Mala práctica:**
  - En un entorno real, consultas de inventario, stock disponible y margen FIFO requieren agregaciones de base de datos (e.g. PostgreSQL, BigQuery, Snowflake, ClickHouse).
  - La falta de una abstracción de servicios (`data services` / `repository pattern`) impide implementar fetching asíncrono, almacenamiento en caché, revalidación incremental (ISR) o React Server Components.

### 3.2 Ineficiencias y Errores de Renderizado en Listas (`key={cell}`)
- **Hallazgo:** En las tablas dinámicas, se utilizaba `key={cell}` para iterar las celdas.
- **Riesgo:** Si dos celdas de una fila comparten el mismo valor (ej. `"Normal"` o `"Correcto"`), React lanza advertencias de claves duplicadas en la reconciliación del DOM Virtual, afectando el rendimiento y causando re-renderizados erráticos.

### 3.3 Filtros Inoperativos
- Los controles de filtrado (`filter-chip`: "Todos los sitios", "Últimos 30 días", etc.) eran simples elementos visuales sin estado de React ni lógica de filtrado/consulta detrás.

---

## 4. Auditoría de Automatizaciones y Configuración

### 4.1 Automatización de Auditoría y Reglas de Negocio
- **Hallazgo:** El "Decision Engine" y la "Auditoría de Costos FIFO" mostraban indicadores estáticos sin motores de evaluación en segundo plano ni pipelines de datos automáticos.
- **Recomendación:** Diseñar una arquitectura de tareas programadas (Cron Jobs / Queue Workers con Trigger.dev, BullMQ o Vercel Cron) para evaluar periódicamente reglas de negocio (ej. DOI < 21 días, aging > 90 días).

---

## 5. Matriz de Hallazgos y Malas Prácticas

| ID | Área | Hallazgo / Mala Práctica | Severidad | Solución Propuesta |
|---|---|---|---|---|
| **H-01** | Config / Build | `ignoreBuildErrors: true` en `next.config.mjs` | **Alta** | Remover flag y solucionar todos los tipos en compilación |
| **H-02** | Arquitectura | Código monolítico concentrado en `app/page.tsx` | **Alta** | Descomponer en componentes modulares (`components/`) y tipos (`lib/types.ts`) |
| **H-03** | React / Render | Utilización de `key={cell}` en celdas de tabla | **Media** | Usar identificadores composicionales únicos (`row-index-cell`) |
| **H-04** | Capa de Datos | Inexistencia de abstracciones de consulta / servicio | **Alta** | Crear capa `lib/data.ts` con funciones de consulta fuertemente tipadas |
| **H-05** | UI / Filtros | Filtros y búsquedas no funcionales (mock estático) | **Media** | Implementar estado dinámico de búsqueda y filtros reactivos |

---

## 6. Plan de Optimización Aplicado

1. **Refactorización de Configuración:** Activar comprobación estricta de TypeScript.
2. **Abstracción del Modelo de Datos:** Creación de `lib/types.ts` y `lib/data.ts`.
3. **Modularización UI:**
   - `components/topbar.tsx`
   - `components/sidebar.tsx`
   - `components/kpi-card.tsx`
   - `components/filter-bar.tsx`
   - `components/data-table.tsx`
   - `components/decision-center.tsx`
4. **Optimización de Renderizado:** Keys únicas para React reconciliation y soporte de filtros dinámicos.
