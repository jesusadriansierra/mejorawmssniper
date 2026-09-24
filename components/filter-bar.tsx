'use client'

import React from 'react'
import { FilterState } from '@/lib/types'

interface FilterBarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

export function FilterBar({ filters, onFilterChange, onReset }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-field">
        <label htmlFor="site-select">Sitio / Bodega</label>
        <select
          id="site-select"
          value={filters.site}
          onChange={(e) => onFilterChange('site', e.target.value)}
        >
          <option value="Todos">Todos los sitios</option>
          <option value="CD Central">CD Central</option>
          <option value="Store 029">Store 029</option>
          <option value="Store 08">Store 08</option>
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="period-select">Período</label>
        <select
          id="period-select"
          value={filters.period}
          onChange={(e) => onFilterChange('period', e.target.value)}
        >
          <option value="30d">Últimos 30 días</option>
          <option value="7d">Últimos 7 días</option>
          <option value="hoy">Hoy</option>
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="status-select">Estado</label>
        <select
          id="status-select"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="Todos">Todos los estados</option>
          <option value="Critico">Críticos / Retrasados</option>
          <option value="Saludable">Saludables / Correctos</option>
        </select>
      </div>

      <button type="button" className="text-button" onClick={onReset}>
        Limpiar filtros
      </button>
    </div>
  )
}
