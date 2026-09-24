import React from 'react'

interface DataTableProps {
  title: string
  columns: string[]
  rows: string[][]
}

export function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <div className="panel table-panel full-table">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">VISTA OPERATIVA</p>
          <h2>{title}</h2>
        </div>
        <button type="button" className="more-button">
          •••
        </button>
      </div>
      <div className="data-table">
        <div className="table-row table-head">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        {rows.map((row, rowIndex) => {
          const rowKey = `row-${row[0] || rowIndex}`
          return (
            <div className="table-row" key={rowKey}>
              {row.map((cell, colIndex) => {
                const isFirstCol = colIndex === 0
                const isSecondCol = colIndex === 1
                const isLastCol = colIndex === row.length - 1
                const cellKey = `${rowKey}-col-${colIndex}`

                const isCritical =
                  cell.toLowerCase().includes('crít') ||
                  cell.toLowerCase().includes('quie') ||
                  cell.toLowerCase().includes('atrasa') ||
                  cell.toLowerCase().includes('retras')

                return (
                  <span
                    key={cellKey}
                    className={
                      isFirstCol ? 'sku' : isSecondCol ? 'product-name' : ''
                    }
                  >
                    {isLastCol ? (
                      <b
                        className={`status ${
                          isCritical ? 'critical-status' : ''
                        }`}
                      >
                        {cell}
                      </b>
                    ) : (
                      cell
                    )}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
