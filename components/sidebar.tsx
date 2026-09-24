import React from 'react'
import { View } from '@/lib/types'
import { VIEWS, getIconForView } from '@/lib/data'

interface SidebarProps {
  active: View
  onSelectView: (view: View) => void
}

export function Sidebar({ active, onSelectView }: SidebarProps) {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">APPS Y ATAJOS</p>
      {VIEWS.map((view) => (
        <button
          key={view}
          type="button"
          className={active === view ? 'nav-item active' : 'nav-item'}
          onClick={() => onSelectView(view)}
        >
          <span className="nav-icon">{getIconForView(view)}</span>
          {view === 'Resumen' ? 'Centro de control' : view}
        </button>
      ))}
      <div className="sidebar-bottom">
        <span className="live-dot" /> Operación conectada
      </div>
    </aside>
  )
}
