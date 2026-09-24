import React from 'react'

interface KpiCardProps {
  label: string
  value: string
  change: string
  danger?: boolean
}

export function KpiCard({ label, value, change, danger }: KpiCardProps) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={danger ? 'danger-text' : 'positive-text'}>
        {change} vs período anterior
      </small>
    </div>
  )
}
