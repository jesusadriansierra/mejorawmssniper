import { View, ViewDetailData, DecisionItem } from './types'

export const VIEWS: View[] = [
  'Resumen',
  'Decisiones',
  'Pedidos',
  'Inventario',
  'Manifiestos',
  'Ventas',
  'Tiendas',
  'Financiero',
  'Config',
]

export const DATA_BY_VIEW: Record<Exclude<View, 'Resumen' | 'Decisiones'>, ViewDetailData> = {
  Pedidos: {
    eyebrow: 'OPERACIÓN / PEDIDOS',
    title: 'Pedidos y fulfillment',
    subtitle: 'Prioriza pedidos por etapa, antigüedad y nivel de servicio.',
    kpis: [
      ['Pendientes', '184', '+12 hoy'],
      ['En picking', '42', '8 urgentes'],
      ['Listos para despacho', '67', '94% SLA'],
      ['Atrasados', '11', 'Requieren acción'],
    ],
    columns: ['PEDIDO', 'CLIENTE / CANAL', 'ESTADO', 'EDAD', 'PRIORIDAD'],
    rows: [
      ['PED-10482', 'Mercado Libre', 'Picking', '18 min', 'Alta'],
      ['PED-10476', 'Tienda 029', 'Empacado', '32 min', 'Normal'],
      ['PED-10461', 'Falabella', 'Atrasado', '2 h 14 min', 'Crítica'],
      ['PED-10453', 'Web propia', 'Nuevo', '6 min', 'Normal'],
    ],
  },
  Inventario: {
    eyebrow: 'INVENTARIO / CONTROL',
    title: 'Inventario operativo',
    subtitle: 'Stock físico, reservado, disponible y ubicación en una sola vista.',
    kpis: [
      ['Stock disponible', '5.550', '−3,1%'],
      ['Sin stock', '160', '+18'],
      ['Pendiente ubicación', '0', 'Todo ubicado'],
      ['Cobertura media', '86 días', '−4 días'],
    ],
    columns: ['SKU', 'PRODUCTO', 'DISPONIBLE', 'UBICACIÓN', 'ESTADO'],
    rows: [
      ['45496906160', 'Pokemon Legends Z-A', '167', 'A-02-14', 'Saludable'],
      ['83717301776', 'Pro-Evolution Soccer 2014', '340', 'B-11-02', 'Lento'],
      ['5051893236118', 'Rocket League Edición Coleccionista', '415', 'Sin ubicación', 'Sin ventas'],
      ['810136673364', 'SW2 Cyberpunk 2077', '0', 'C-04-08', 'Quiebre'],
    ],
  },
  Manifiestos: {
    eyebrow: 'LOGÍSTICA / RECEPCIONES',
    title: 'Manifiestos en tránsito',
    subtitle: 'Controla ETA, recepción y diferencias contra lo esperado.',
    kpis: [
      ['En tránsito', '8', '3 llegan hoy'],
      ['Recepción pendiente', '4', '1 retrasada'],
      ['Unidades esperadas', '1.248', '+6,4%'],
      ['Diferencias', '12', 'Revisar conteo'],
    ],
    columns: ['MANIFIESTO', 'PROVEEDOR', 'ETA', 'UNIDADES', 'ESTADO'],
    rows: [
      ['MNF-00291', 'Nintendo Iberia', 'Hoy · 14:30', '420', 'En tránsito'],
      ['MNF-00287', 'Distribuciones K', 'Ayer', '288', 'Retrasado'],
      ['MNF-00283', 'Sony Interactive', '22 sep', '356', 'Confirmado'],
      ['MNF-00275', 'Importadora MX', 'Recibido', '184', 'Diferencia'],
    ],
  },
  Ventas: {
    eyebrow: 'COMERCIAL / VENTAS',
    title: 'Ventas por canal',
    subtitle: 'Rendimiento comercial, unidades y margen por período.',
    kpis: [
      ['Venta bruta', '$130,3M', '+12,4%'],
      ['Unidades', '2.839', '+8,2%'],
      ['Ticket promedio', '$45.895', '+3,8%'],
      ['Margen estimado', '28,6%', '+1,2 pp'],
    ],
    columns: ['CANAL', 'VENTA BRUTA', 'UNIDADES', 'MARGEN', 'VARIACIÓN'],
    rows: [
      ['Mercado Libre', '$58,4M', '1.204', '31,2%', '+18,4%'],
      ['Web propia', '$34,8M', '706', '29,7%', '+11,1%'],
      ['Tiendas físicas', '$27,1M', '624', '24,6%', '+4,2%'],
      ['Falabella', '$10,0M', '305', '19,8%', '−2,1%'],
    ],
  },
  Tiendas: {
    eyebrow: 'OPERACIÓN / TIENDAS',
    title: 'Rendimiento por tienda',
    subtitle: 'Compara rotación, ventas, cobertura y quiebres por local.',
    kpis: [
      ['Tiendas activas', '12', '100% online'],
      ['Mejor rotación', 'Store 029', '4,8x'],
      ['Mayor riesgo', 'Store 08', '23 quiebres'],
      ['Stock en tiendas', '2.840', '51% del total'],
    ],
    columns: ['TIENDA', 'VENTA 30D', 'STOCK', 'ROTACIÓN', 'ALERTA'],
    rows: [
      ['Store 029', '$42,8M', '1.240', '4,8x', 'Saludable'],
      ['Store 08', '$31,6M', '864', '3,2x', '23 quiebres'],
      ['Store 014', '$18,2M', '420', '2,7x', 'Stock lento'],
      ['Store 021', '$12,4M', '316', '2,1x', 'Revisar surtido'],
    ],
  },
  Financiero: {
    eyebrow: 'FINANCIERO / MARGEN',
    title: 'Margen y costo FIFO',
    subtitle: 'Conciliación de ventas, costo atribuido y margen comercial.',
    kpis: [
      ['Costo vendido', '$93,1M', '+9,8%'],
      ['Margen comercial', '$37,2M', '+19,6%'],
      ['Margen %', '28,6%', '+1,2 pp'],
      ['Recepciones por costear', '18', '$4,8M'],
    ],
    columns: ['PERÍODO', 'VENTA', 'COSTO FIFO', 'MARGEN', 'ESTADO'],
    rows: [
      ['Semana actual', '$31,2M', '$22,4M', '$8,8M · 28,2%', 'Conciliado'],
      ['Semana anterior', '$28,9M', '$21,8M', '$7,1M · 24,6%', 'Conciliado'],
      ['Recepciones abiertas', '—', '$4,8M', 'Pendiente', 'Revisar'],
      ['Ajustes de costo', '—', '$0,6M', '−$0,6M', 'Auditar'],
    ],
  },
  Config: {
    eyebrow: 'ADMINISTRACIÓN / CONFIG',
    title: 'Configuración del sistema',
    subtitle: 'Gestiona acceso, reglas operativas e integraciones de SNIPER WMS.',
    kpis: [
      ['Usuarios activos', '18', '3 administradores'],
      ['Tiendas configuradas', '12', 'Todas activas'],
      ['Reglas de alertas', '9', '2 requieren revisión'],
      ['Última auditoría', 'Hoy · 09:42', 'Sin incidencias'],
    ],
    columns: ['ÁREA', 'CONFIGURACIÓN', 'ÚLTIMA MODIFICACIÓN', 'RESPONSABLE', 'ESTADO'],
    rows: [
      ['Usuarios y permisos', 'Roles, accesos y sesiones', 'Hoy · 09:42', 'Admin', 'Correcto'],
      ['Tiendas y ubicaciones', 'Racks, zonas y capacidad', '18 sep', 'Operaciones', 'Correcto'],
      ['Reglas de alertas', 'Umbrales de aging y DOI', '16 sep', 'Comercial', 'Revisar'],
      ['Integraciones', 'Canales y Costeo Cloud', '12 sep', 'Admin', 'Conectado'],
    ],
  },
}

export const DECISIONS_DATA: DecisionItem[] = [
  {
    id: 'dec-1',
    priority: 'CRÍTICO',
    title: 'Pro-Evolution Soccer 2014 Xbox 360',
    subtitle: '340 unidades · 10.200 días de inventario',
    impact: '$1,8M inmovilizados',
    recommendation: 'Liquidar 120 · transferir 80',
  },
  {
    id: 'dec-2',
    priority: 'ALTO',
    title: 'Rocket League Edición Coleccionista',
    subtitle: '415 unidades · sin ventas en 90 días',
    impact: '$920K en stock sin rotación',
    recommendation: 'Revisar precio · crear campaña',
  },
  {
    id: 'dec-3',
    priority: 'MEDIO',
    title: 'Store 08 · quiebre de surtido',
    subtitle: '23 SKUs con DOI menor a 21 días',
    impact: '$2,4M de venta en riesgo',
    recommendation: 'Transferir desde Store 029',
  },
]

export function getIconForView(view: View): string {
  const icons: Record<View, string> = {
    Resumen: '⌂',
    Decisiones: '!',
    Pedidos: '▣',
    Inventario: '▤',
    Manifiestos: '↗',
    Ventas: '◒',
    Tiendas: '⌖',
    Financiero: '$',
    Config: '⚙',
  }
  return icons[view] || '•'
}
