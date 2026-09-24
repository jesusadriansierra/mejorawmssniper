'use client'

import { useState, useMemo } from 'react'
import { View, FilterState } from '@/lib/types'
import { DATA_BY_VIEW } from '@/lib/data'
import { Topbar } from '@/components/topbar'
import { Sidebar } from '@/components/sidebar'
import { KpiCard } from '@/components/kpi-card'
import { FilterBar } from '@/components/filter-bar'
import { DataTable } from '@/components/data-table'
import { DecisionCenter } from '@/components/decision-center'

const INITIAL_FILTERS: FilterState = {
  site: 'Todos',
  period: '30d',
  status: 'Todos',
  searchTerm: '',
}

export default function Page() {
  const [activeView, setActiveView] = useState<View>('Resumen')

  return (
    <main className="dashboard-shell">
      <Topbar onBrandClick={() => setActiveView('Resumen')} />
      <div className="app-layout">
        <Sidebar active={activeView} onSelectView={setActiveView} />
        <section className="dashboard-content">
          <PageContent
            activeView={activeView}
            onNavigate={() => setActiveView('Decisiones')}
          />
        </section>
      </div>
      <div className="floating-badge">
        <span className="live-dot" /> SNIPER · WMS <span>⌃</span>
      </div>
    </main>
  )
}

function PageContent({
  activeView,
  onNavigate,
}: {
  activeView: View
  onNavigate: () => void
}) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS)
  }

  const isDataView = activeView !== 'Resumen' && activeView !== 'Decisiones'
  const pageData = isDataView ? DATA_BY_VIEW[activeView] : null

  const filteredRows = useMemo(() => {
    if (!pageData) return []
    return pageData.rows.filter((row) => {
      const rowText = row.join(' ').toLowerCase()
      if (filters.status === 'Critico') {
        const isCritical =
          rowText.includes('crít') ||
          rowText.includes('quie') ||
          rowText.includes('atrasa') ||
          rowText.includes('retras') ||
          rowText.includes('lento')
        if (!isCritical) return false
      } else if (filters.status === 'Saludable') {
        const isCritical =
          rowText.includes('crít') ||
          rowText.includes('quie') ||
          rowText.includes('atrasa') ||
          rowText.includes('retras')
        if (isCritical) return false
      }

      if (filters.site !== 'Todos') {
        if (!rowText.includes(filters.site.toLowerCase())) {
          return false
        }
      }

      return true
    })
  }, [pageData, filters])

  if (activeView === 'Resumen') {
    return <ResumenContent onNavigateToDecisions={onNavigate} />
  }

  if (activeView === 'Decisiones') {
    return <DecisionCenter />
  }

  if (!pageData) return null

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow coral-text">{pageData.eyebrow}</p>
          <h1>{pageData.title}</h1>
          <p className="hero-copy">{pageData.subtitle}</p>
        </div>
        <div className="heading-actions">
          <button type="button" className="outline-button">
            Exportar ↓
          </button>
          <button type="button" className="primary-button">
            + Nueva acción
          </button>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <div className="kpi-grid">
        {pageData.kpis.map((kpi) => (
          <KpiCard
            key={kpi[0]}
            label={kpi[0]}
            value={kpi[1]}
            change={kpi[2]}
            danger={
              kpi[0] === 'Atrasados' ||
              kpi[0] === 'Sin stock' ||
              kpi[0] === 'Diferencias'
            }
          />
        ))}
      </div>

      <DataTable
        title={
          activeView === 'Config'
            ? 'Áreas configuradas'
            : `Detalle de ${activeView.toLowerCase()}`
        }
        columns={pageData.columns}
        rows={filteredRows}
      />

      <div className="insight-grid lower-grid">
        <div className="panel">
          <p className="eyebrow">RECOMENDACIÓN</p>
          <h2>Próxima mejor acción</h2>
          <p className="muted">
            Revisa primero los registros marcados como críticos. El sistema puede
            agrupar acciones por tienda, SKU o responsable.
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={onNavigate}
          >
            Abrir Decision Center →
          </button>
        </div>
        <div className="panel mini-chart">
          <p className="eyebrow">ACTIVIDAD</p>
          <h2>Actividad del período</h2>
          <div className="fake-bars">
            {[45, 68, 51, 82, 60, 92, 74, 88, 67, 96].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ResumenContent({
  onNavigateToDecisions,
}: {
  onNavigateToDecisions: () => void
}) {
  const alerts = [
    ['3.859', 'Aging crítico', 'Revisar aging'],
    ['3.633', 'ETA +20 sin venta', 'Ver recepciones'],
    ['226', 'Baja rotación', 'Optimizar stock'],
    ['12', 'Competencia vs costo', 'Comparar precios'],
  ]

  return (
    <>
      <div className="hero-row">
        <div>
          <p className="eyebrow">SNIPER ANALYTICS / CONTROL COMERCIAL</p>
          <h1>
            Centro de control <span>comercial</span>
          </h1>
          <p className="hero-copy">
            Una vista ejecutiva para detectar riesgos, proteger margen y mover
            inventario.
          </p>
        </div>
        <button type="button" className="outline-button">
          Exportar reporte ↓
        </button>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Venta bruta del período"
          value="$130.299.621"
          change="+12,4%"
        />
        <KpiCard label="Unidades vendidas" value="2.839" change="+8,2%" />
        <KpiCard label="Stock disponible" value="5.550" change="−3,1%" />
        <KpiCard label="SKUs sin stock" value="160" change="+18" danger />
      </div>

      <div className="attention-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow coral-text">PRIORIZAR HOY</p>
            <h2>Atención requerida</h2>
            <p className="muted">
              Alertas ordenadas por impacto comercial. Cada alerta tiene una
              siguiente acción.
            </p>
          </div>
          <button
            type="button"
            className="coral-link"
            onClick={onNavigateToDecisions}
          >
            Abrir Decision Center →
          </button>
        </div>
        <div className="alert-grid">
          {alerts.map((a) => (
            <button
              type="button"
              className="alert-item critical"
              key={a[1]}
              onClick={onNavigateToDecisions}
            >
              <span className="alert-icon">!</span>
              <span className="alert-body">
                <strong>{a[0]}</strong>
                <span>{a[1]}</span>
                <em>{a[2]} →</em>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="preview-strip">
        <h2>Accesos rápidos</h2>
        <p className="muted">
          Explora cada ventana desde el menú lateral para ver el nuevo patrón de
          diseño.
        </p>
      </div>
    </>
  )
}
