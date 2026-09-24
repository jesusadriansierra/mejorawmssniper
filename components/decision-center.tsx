'use client'

import React, { useState } from 'react'
import { DECISIONS_DATA } from '@/lib/data'
import { DecisionPriority } from '@/lib/types'

export function DecisionCenter() {
  const [filter, setFilter] = useState<'Todas' | 'Críticas' | 'Asignadas'>('Todas')

  const filteredDecisions = DECISIONS_DATA.filter((d) => {
    if (filter === 'Críticas') return d.priority === 'CRÍTICO'
    return true
  })

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow coral-text">SNIPER WMS / DECISION ENGINE</p>
          <h1>Centro de decisiones</h1>
          <p className="hero-copy">
            Excepciones priorizadas por impacto económico y siguiente mejor acción.
          </p>
        </div>
        <div className="heading-actions">
          <button type="button" className="outline-button">
            Exportar bandeja ↓
          </button>
          <button type="button" className="primary-button">
            + Nueva decisión
          </button>
        </div>
      </div>

      <div className="decision-summary">
        <div>
          <span>IMPACTO IDENTIFICADO</span>
          <strong>$5,1M</strong>
          <small>valor protegido si se ejecutan las acciones</small>
        </div>
        <div>
          <span>DECISIONES ABIERTAS</span>
          <strong>23</strong>
          <small>8 requieren aprobación</small>
        </div>
        <div>
          <span>TIEMPO AHORRADO</span>
          <strong>14 h</strong>
          <small>por priorización automática</small>
        </div>
        <div className="decision-score">
          <span>SCORE OPERATIVO</span>
          <strong>82/100</strong>
          <small>atención recomendada hoy</small>
        </div>
      </div>

      <div className="decision-toolbar">
        <b>Bandeja priorizada</b>
        <button
          type="button"
          className={`decision-filter ${filter === 'Todas' ? 'active' : ''}`}
          onClick={() => setFilter('Todas')}
        >
          Todas · 23
        </button>
        <button
          type="button"
          className={`decision-filter ${filter === 'Críticas' ? 'active' : ''}`}
          onClick={() => setFilter('Críticas')}
        >
          Críticas · 3
        </button>
        <button
          type="button"
          className={`decision-filter ${filter === 'Asignadas' ? 'active' : ''}`}
          onClick={() => setFilter('Asignadas')}
        >
          Asignadas · 8
        </button>
        <button type="button" className="text-button">
          Configurar reglas →
        </button>
      </div>

      <div className="decision-list">
        {filteredDecisions.map((decision) => (
          <article className="decision-card" key={decision.id}>
            <div
              className={`priority priority-${decision.priority.toLowerCase()}`}
            >
              {decision.priority}
            </div>
            <div className="decision-main">
              <p className="eyebrow">{decision.title}</p>
              <h2>{decision.impact}</h2>
              <p className="muted">{decision.subtitle}</p>
              <div className="decision-recommendation">
                <span>RECOMENDACIÓN</span>
                <b>{decision.recommendation}</b>
              </div>
            </div>
            <div className="decision-actions">
              <button type="button" className="outline-button">
                Ver detalle
              </button>
              <button type="button" className="primary-button">
                Crear decisión
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="panel simulation-panel">
        <div>
          <p className="eyebrow">SIMULADOR DE ESCENARIOS</p>
          <h2>¿Qué pasa si muevo stock?</h2>
          <p className="muted">
            Prueba una transferencia antes de ejecutarla y estima el impacto en cobertura y ventas.
          </p>
        </div>
        <button type="button" className="primary-button">
          Abrir simulador →
        </button>
      </div>
    </>
  )
}
