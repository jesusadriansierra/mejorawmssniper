export type View =
  | 'Resumen'
  | 'Decisiones'
  | 'Pedidos'
  | 'Inventario'
  | 'Manifiestos'
  | 'Ventas'
  | 'Tiendas'
  | 'Financiero'
  | 'Config'

export interface KpiItem {
  label: string
  value: string
  change: string
  danger?: boolean
}

export interface TableRowData {
  id: string
  values: string[]
  isCritical?: boolean
}

export interface ViewDetailData {
  eyebrow: string
  title: string
  subtitle: string
  kpis: [string, string, string][]
  columns: string[]
  rows: string[][]
}

export type DecisionPriority = 'CRÍTICO' | 'ALTO' | 'MEDIO' | 'BAJO'

export interface DecisionItem {
  id: string
  priority: DecisionPriority
  title: string
  subtitle: string
  impact: string
  recommendation: string
}

export interface FilterState {
  site: string
  period: string
  status: string
  searchTerm: string
}
