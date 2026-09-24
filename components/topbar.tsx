import React from 'react'

interface TopbarProps {
  onBrandClick: () => void
}

export function Topbar({ onBrandClick }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onBrandClick} type="button">
        <span className="brand-mark">S</span>
        <span>
          SNIPER <b>WMS</b>
        </span>
      </button>
      <div className="topbar-meta">
        <span className="live-dot" /> Datos actualizados hace 8 min{' '}
        <span className="divider" />
        <span className="user-avatar">AM</span> Admin
      </div>
    </header>
  )
}
