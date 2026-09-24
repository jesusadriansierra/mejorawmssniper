# SNIPER WMS / Analytics Commercial Control Center

Sistema de analítica comercial, control de inventario, tracking de manifiestos y motor de decisiones optimizado para operaciones multicanal y logísticas.

## 🚀 Arquitectura y Optimización

Este proyecto ha sido auditado y optimizado arquitectónicamente para garantizar escalabilidad, alto rendimiento y buenas prácticas de desarrollo en React 19 y Next.js 16.

### 📋 Informe de Auditoría
El detalle completo de la auditoría técnica, diagnóstico de código, análisis de rendimiento y matriz de hallazgos se encuentra disponible en [`AUDIT.md`](./AUDIT.md).

### 🛠️ Mejoras Implementadas
1. **Tipado Estricto con TypeScript:** Activación de verificación de compilación sin omitir errores (`ignoreBuildErrors: false`).
2. **Descomposición Monolítica:** Modularización de componentes en el directorio `components/` (`Topbar`, `Sidebar`, `KpiCard`, `DataTable`, `FilterBar`, `DecisionCenter`).
3. **Capa de Abstracción de Datos:** Separación de los datos y tipos de la UI en `lib/types.ts` y `lib/data.ts`.
4. **Optimización de Renderizado:** Corrección de `key` duplicados en las listas e implementación de estado interactivo para filtrado dinámico.

## 🧰 Requisitos y Scripts

### Desarrollo
```bash
pnpm dev
```

### Compilación y Verificación
```bash
pnpm build
```
