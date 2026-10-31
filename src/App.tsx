import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './index.css'

type VehicleStatus = 'On rent' | 'Available' | 'Maintenance'

type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  plate: string
  status: VehicleStatus
  location: string
  mileage: number
  tracker: boolean
  issue?: boolean
}

const vehicles: Vehicle[] = [
  { id: 'RM-1001', make: 'Toyota', model: 'Corolla', year: 2024, plate: 'LN24 KRP', status: 'On rent', location: 'London Heathrow', mileage: 12480, tracker: true },
  { id: 'RM-1002', make: 'Volkswagen', model: 'Tiguan', year: 2023, plate: 'LF23 VWT', status: 'On rent', location: 'Manchester', mileage: 18204, tracker: true },
  { id: 'RM-1003', make: 'BMW', model: '3 Series', year: 2024, plate: 'LN24 BMR', status: 'Available', location: 'London Heathrow', mileage: 9320, tracker: true },
  { id: 'RM-1004', make: 'Ford', model: 'Focus', year: 2022, plate: 'KN22 FOC', status: 'On rent', location: 'Birmingham', mileage: 26711, tracker: true },
  { id: 'RM-1005', make: 'Nissan', model: 'Qashqai', year: 2024, plate: 'LN24 NQH', status: 'On rent', location: 'Edinburgh', mileage: 10632, tracker: true },
  { id: 'RM-1006', make: 'Mercedes-Benz', model: 'A-Class', year: 2023, plate: 'LF23 MBC', status: 'Maintenance', location: 'London Heathrow', mileage: 21840, tracker: true, issue: true },
  { id: 'RM-1007', make: 'Kia', model: 'Sportage', year: 2024, plate: 'LN24 KSP', status: 'On rent', location: 'Manchester', mileage: 8642, tracker: true },
  { id: 'RM-1008', make: 'Hyundai', model: 'Tucson', year: 2023, plate: 'LF23 HTN', status: 'On rent', location: 'Birmingham', mileage: 19408, tracker: true },
  { id: 'RM-1009', make: 'Skoda', model: 'Octavia', year: 2022, plate: 'KN22 SOK', status: 'Available', location: 'Edinburgh', mileage: 32156, tracker: true },
  { id: 'RM-1010', make: 'Peugeot', model: '3008', year: 2024, plate: 'LN24 PGT', status: 'On rent', location: 'London Heathrow', mileage: 7134, tracker: false },
  { id: 'RM-1011', make: 'Toyota', model: 'Yaris', year: 2023, plate: 'LF23 TYR', status: 'On rent', location: 'Manchester', mileage: 16240, tracker: true },
  { id: 'RM-1012', make: 'Volvo', model: 'XC40', year: 2024, plate: 'LN24 VXC', status: 'On rent', location: 'Birmingham', mileage: 11202, tracker: true },
  { id: 'RM-1013', make: 'Audi', model: 'A3', year: 2023, plate: 'LF23 AUD', status: 'Available', location: 'London Heathrow', mileage: 20415, tracker: true },
  { id: 'RM-1014', make: 'Renault', model: 'Clio', year: 2022, plate: 'KN22 RCL', status: 'On rent', location: 'Edinburgh', mileage: 28904, tracker: true, issue: true },
  { id: 'RM-1015', make: 'Honda', model: 'Civic', year: 2024, plate: 'LN24 HCV', status: 'On rent', location: 'Manchester', mileage: 6880, tracker: true },
  { id: 'RM-1016', make: 'Land Rover', model: 'Discovery Sport', year: 2023, plate: 'LF23 LRD', status: 'On rent', location: 'Birmingham', mileage: 17332, tracker: true },
  { id: 'RM-1017', make: 'Vauxhall', model: 'Corsa', year: 2022, plate: 'KN22 VCR', status: 'Maintenance', location: 'Edinburgh', mileage: 35890, tracker: true, issue: true },
  { id: 'RM-1018', make: 'Tesla', model: 'Model 3', year: 2024, plate: 'LN24 TMD', status: 'On rent', location: 'London Heathrow', mileage: 9622, tracker: true },
  { id: 'RM-1019', make: 'Mazda', model: 'CX-5', year: 2023, plate: 'LF23 MCX', status: 'Available', location: 'Manchester', mileage: 14866, tracker: true },
  { id: 'RM-1020', make: 'Toyota', model: 'RAV4', year: 2024, plate: 'LN24 TRV', status: 'On rent', location: 'Birmingham', mileage: 8240, tracker: true },
  { id: 'RM-1021', make: 'Volkswagen', model: 'Golf', year: 2022, plate: 'KN22 VGF', status: 'On rent', location: 'Edinburgh', mileage: 30214, tracker: false },
  { id: 'RM-1022', make: 'BMW', model: 'X1', year: 2023, plate: 'LF23 BMX', status: 'On rent', location: 'London Heathrow', mileage: 15892, tracker: true },
  { id: 'RM-1023', make: 'Ford', model: 'Puma', year: 2024, plate: 'LN24 FPM', status: 'Available', location: 'Manchester', mileage: 5328, tracker: true },
  { id: 'RM-1024', make: 'Nissan', model: 'Juke', year: 2023, plate: 'LF23 NJK', status: 'On rent', location: 'Birmingham', mileage: 19720, tracker: true },
  { id: 'RM-1025', make: 'Kia', model: 'Niro', year: 2024, plate: 'LN24 KNR', status: 'Available', location: 'Edinburgh', mileage: 4160, tracker: true },
]

function isVehicleStatus(value: string): value is VehicleStatus {
  return value === 'On rent' || value === 'Available' || value === 'Maintenance'
}

type IconName =
  | 'activity'
  | 'arrow'
  | 'bell'
  | 'car'
  | 'chevron'
  | 'close'
  | 'dashboard'
  | 'device'
  | 'menu'
  | 'map'
  | 'pin'
  | 'refresh'
  | 'search'
  | 'settings'
  | 'tool'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    activity: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    car: <><path d="m5 11 1.5-5h11L19 11" /><path d="M3 11h18v7H3z" /><path d="M5 18v2m14-2v2M6 14h.01M18 14h.01" /></>,
    chevron: <><path d="m7 10 5 5 5-5" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    dashboard: <><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="5" rx="1" /><rect x="13" y="10" width="8" height="11" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /></>,
    device: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6m-6 4h6m-6 4h3" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15m6-12v15" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.5 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.5-3" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.2 1-1.2 2.1-1.5-.6a8 8 0 0 1-1.6.9l-.3 1.6h-2.4l-.3-1.6a8 8 0 0 1-1.6-.9l-1.5.6-1.2-2.1 1.2-1a8 8 0 0 1 0-1.9l-1.2-1 1.2-2.1 1.5.6a8 8 0 0 1 1.6-.9l.3-1.6h2.4l.3 1.6a8 8 0 0 1 1.6.9l1.5-.6 1.2 2.1-1.2 1a8 8 0 0 1-.1 1.9Z" /></>,
    tool: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14.5 12 12 9.5Z" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function FleetReport() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All statuses' | VehicleStatus>('All statuses')
  const [sortAscending, setSortAscending] = useState(true)

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return vehicles
      .filter((vehicle) => {
        const matchesStatus = statusFilter === 'All statuses' || vehicle.status === statusFilter
        const matchesQuery =
          !normalizedQuery ||
          `${vehicle.id} ${vehicle.make} ${vehicle.model} ${vehicle.plate} ${vehicle.location}`
            .toLowerCase()
            .includes(normalizedQuery)
        return matchesStatus && matchesQuery
      })
      .sort((a, b) => sortAscending
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id))
  }, [query, sortAscending, statusFilter])

  const exportVehicles = () => {
    const rows = [
      ['Vehicle ID', 'Make', 'Model', 'Year', 'Registration', 'Status', 'Location', 'Mileage', 'Device'],
      ...filteredVehicles.map((vehicle) => [
        vehicle.id,
        vehicle.make,
        vehicle.model,
        String(vehicle.year),
        vehicle.plate,
        vehicle.status,
        vehicle.location,
        String(vehicle.mileage),
        vehicle.tracker ? 'Connected' : 'Offline',
      ]),
    ]
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'rentalmatics-fleet-report.csv'
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <>
      <div className="page-heading report-heading">
        <div>
          <p className="eyebrow">FLEET</p>
          <h1>Fleet report</h1>
          <p className="page-description">Every vehicle in your fleet with status, device and location details.</p>
        </div>
        <div className="heading-actions">
          <span className="live-badge"><span /> Live</span>
          <button className="outline-button" type="button" onClick={exportVehicles}>
            <Icon name="arrow" size={15} />
            Export CSV
          </button>
        </div>
      </div>

      <section className="report-summary" aria-label="Fleet report summary">
        <article className="report-summary-card"><span>Total vehicles</span><strong>{vehicles.length}</strong><small>Across 4 locations</small></article>
        <article className="report-summary-card"><span>On rent</span><strong>{vehicles.filter((vehicle) => vehicle.status === 'On rent').length}</strong><small>Currently rented</small></article>
        <article className="report-summary-card"><span>Available</span><strong>{vehicles.filter((vehicle) => vehicle.status === 'Available').length}</strong><small>Ready to rent</small></article>
        <article className="report-summary-card"><span>In maintenance</span><strong>{vehicles.filter((vehicle) => vehicle.status === 'Maintenance').length}</strong><small>Being serviced</small></article>
      </section>

      <section className="panel report-table-panel">
        <div className="report-table-heading">
          <div><h2>All vehicles</h2><p>Fleet inventory and live vehicle status</p></div>
          <div className="vehicle-tools">
            <label className="table-search">
              <Icon name="search" size={16} />
              <input aria-label="Search fleet report" placeholder="Search vehicles" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label className="report-status-filter">
              <span className="sr-only">Filter by vehicle status</span>
              <select
                aria-label="Filter by vehicle status"
                value={statusFilter}
                onChange={(event) => {
                  const value = event.currentTarget.value
                  if (value === 'All statuses' || isVehicleStatus(value)) setStatusFilter(value)
                }}
              >
                <option>All statuses</option>
                <option>On rent</option>
                <option>Available</option>
                <option>Maintenance</option>
              </select>
              <Icon name="chevron" size={14} />
            </label>
          </div>
        </div>
        <div className="vehicle-table-wrap">
          <table className="vehicle-table report-table">
            <thead>
              <tr>
                <th><button type="button" className="sort-heading" onClick={() => setSortAscending((ascending) => !ascending)}>Vehicle <Icon name="chevron" size={13} /></button></th>
                <th>Registration</th><th>Status</th><th>Location</th><th>Mileage</th><th>Device</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td><div className="vehicle-name"><span className="vehicle-thumb"><Icon name="car" size={18} /></span><span><strong>{vehicle.make} {vehicle.model}</strong><small>{vehicle.year} · {vehicle.id}</small></span></div></td>
                  <td><span className="registration-plate">{vehicle.plate}</span></td>
                  <td><span className={`status-badge status-${vehicle.status.toLowerCase().replace(' ', '-')}`}><span />{vehicle.status}</span></td>
                  <td><span className="location-cell"><Icon name="pin" size={14} />{vehicle.location}</span></td>
                  <td>{vehicle.mileage.toLocaleString()} mi</td>
                  <td><span className={vehicle.tracker ? 'device-status connected' : 'device-status disconnected'}><span />{vehicle.tracker ? 'Connected' : 'Offline'}</span></td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && <tr><td className="empty-table" colSpan={6}>No vehicles match your search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing <strong>{filteredVehicles.length}</strong> of <strong>{vehicles.length}</strong> vehicles</span><span>Sample fleet data</span></div>
      </section>
    </>
  )
}

const MAP_OFFSETS = [
  [-10, -10], [0, -10], [10, -10], [-10, 0], [0, 0], [10, 0], [0, 10],
] as const

function getMapPosition(vehicle: Vehicle) {
  const locationIndex = vehicles
    .filter((candidate) => candidate.location === vehicle.location)
    .findIndex((candidate) => candidate.id === vehicle.id)
  const [baseX, baseY] = {
    Edinburgh: [55, 18],
    Manchester: [49, 42],
    Birmingham: [51, 57],
    'London Heathrow': [59, 76],
  }[vehicle.location] ?? [50, 50]
  const [offsetX, offsetY] = MAP_OFFSETS[locationIndex % MAP_OFFSETS.length]
  return { left: `${baseX + offsetX}%`, top: `${baseY + offsetY}%` }
}

function InteractiveFleetMap() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All vehicles' | VehicleStatus>('All vehicles')
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)

  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => {
    const matchesStatus = statusFilter === 'All vehicles' || vehicle.status === statusFilter
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery =
      !normalizedQuery ||
      `${vehicle.id} ${vehicle.make} ${vehicle.model} ${vehicle.plate} ${vehicle.location}`
        .toLowerCase()
        .includes(normalizedQuery)
    return matchesStatus && matchesQuery
  }), [query, statusFilter])

  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId)

  return (
    <>
      <div className="page-heading map-page-heading">
        <div>
          <p className="eyebrow">FLEET</p>
          <h1>Interactive map</h1>
          <p className="page-description">Explore vehicle locations and status across your fleet.</p>
        </div>
        <div className="heading-actions"><span className="live-badge"><span /> Live</span><span className="demo-data-tag">Demo locations</span></div>
      </div>

      <section className="map-toolbar panel">
        <label className="filter-select">
          <span>Location</span>
          <select aria-label="Filter map location" onChange={(event) => setQuery(event.target.value === 'All locations' ? '' : event.target.value)}>
            <option>All locations</option>
            <option>London Heathrow</option>
            <option>Manchester</option>
            <option>Birmingham</option>
            <option>Edinburgh</option>
          </select>
          <Icon name="chevron" size={14} />
        </label>
        <label className="map-search table-search">
          <Icon name="search" size={16} />
          <input aria-label="Search map vehicles" placeholder="Search vehicles" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="map-status-filters" role="group" aria-label="Filter map by status">
          {(['All vehicles', 'On rent', 'Available', 'Maintenance'] as const).map((filter) => (
            <button key={filter} type="button" className={statusFilter === filter ? 'map-filter selected' : 'map-filter'} onClick={() => setStatusFilter(filter)} aria-pressed={statusFilter === filter}>
              {filter}
            </button>
          ))}
        </div>
        <span className="map-result-count">{filteredVehicles.length} vehicles</span>
      </section>

      <section className="map-workspace">
        <div className="fleet-map" aria-label="Demo fleet vehicle map">
          <div className="map-water-label">UNITED KINGDOM</div>
          <div className="map-land map-land-main" />
          <div className="map-land map-land-wales" />
          <div className="map-land map-land-scotland" />
          <svg className="map-road-network" viewBox="0 0 900 700" preserveAspectRatio="none" aria-hidden="true">
            <path className="road minor-road" d="M330 30 380 160 420 300 465 445 560 600M170 300 380 300 580 340 810 400M290 510 430 470 620 485 790 560M420 150 570 200 730 180M350 80 500 110 670 95" />
            <path className="road major-road" d="M400 190 420 310 460 430 570 600M330 305 490 325 665 385M450 430 580 450 725 515" />
            <path className="road route-road" d="M400 190 420 310 460 430 570 600" />
          </svg>
          <span className="map-city-label city-edinburgh">Edinburgh</span>
          <span className="map-city-label city-manchester">Manchester</span>
          <span className="map-city-label city-birmingham">Birmingham</span>
          <span className="map-city-label city-london">London</span>
          <div className="map-markers" style={{ transform: `scale(${zoom})` }}>
            {filteredVehicles.map((vehicle) => (
              <button
                type="button"
                key={vehicle.id}
                className={`map-marker marker-${vehicle.status.toLowerCase().replace(' ', '-')}${selectedVehicleId === vehicle.id ? ' marker-selected' : ''}`}
                style={getMapPosition(vehicle)}
                aria-label={`${vehicle.make} ${vehicle.model}, ${vehicle.status}, ${vehicle.location}`}
                title={`${vehicle.make} ${vehicle.model} · ${vehicle.status}`}
                onClick={() => setSelectedVehicleId(vehicle.id)}
              >
                <Icon name="car" size={13} />
              </button>
            ))}
          </div>
          {selectedVehicle && filteredVehicles.some((vehicle) => vehicle.id === selectedVehicle.id) && (
            <article className="map-vehicle-popup">
              <button type="button" className="popup-close" aria-label="Close vehicle details" onClick={() => setSelectedVehicleId(null)}><Icon name="close" size={15} /></button>
              <span className={`status-badge status-${selectedVehicle.status.toLowerCase().replace(' ', '-')}`}><span />{selectedVehicle.status}</span>
              <h2>{selectedVehicle.make} {selectedVehicle.model}</h2>
              <p>{selectedVehicle.plate} · {selectedVehicle.id}</p>
              <span className="location-cell"><Icon name="pin" size={14} />{selectedVehicle.location}</span>
            </article>
          )}
          <div className="map-zoom-controls" aria-label="Map zoom controls">
            <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.35, value + 0.1))}>+</button>
            <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))}>−</button>
          </div>
          <div className="map-legend"><span><i className="legend-dot rent" />On rent</span><span><i className="legend-dot available" />Available</span><span><i className="legend-dot maintenance" />Maintenance</span></div>
          <span className="map-attribution">Sample vehicle locations · UK</span>
        </div>

        <aside className="map-vehicle-list panel">
          <div className="map-list-heading"><div><h2>Vehicles on map</h2><p>{filteredVehicles.length} vehicles shown</p></div><button type="button" className="icon-button" aria-label="Map settings"><Icon name="settings" size={17} /></button></div>
          <div className="map-list-items">
            {filteredVehicles.map((vehicle) => (
              <button key={vehicle.id} type="button" className={`map-list-item${selectedVehicleId === vehicle.id ? ' selected' : ''}`} onClick={() => setSelectedVehicleId(vehicle.id)}>
                <span className={`map-list-status ${vehicle.status.toLowerCase().replace(' ', '-')}`}><Icon name="car" size={16} /></span>
                <span className="map-list-details"><strong>{vehicle.make} {vehicle.model}</strong><small>{vehicle.plate} · {vehicle.location}</small></span>
                <span className={`map-list-dot ${vehicle.status.toLowerCase().replace(' ', '-')}`} />
              </button>
            ))}
            {filteredVehicles.length === 0 && <p className="map-empty">No vehicles match this filter.</p>}
          </div>
          <div className="map-list-footer"><span>Demo fleet</span><span>Updated just now</span></div>
        </aside>
      </section>
    </>
  )
}

function FleetDashboard() {
  const { pathname } = useLocation()
  const currentPage =
    pathname === '/fleet'
      ? 'Fleet report'
      : pathname === '/interactivemap'
        ? 'Interactive map'
        : 'Fleet dashboard'
  useEffect(() => {
    document.title = `${currentPage} | Rentalmatics`
  }, [currentPage])

  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All vehicles' | VehicleStatus>('All vehicles')
  const [updatedAt, setUpdatedAt] = useState('just now')

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return vehicles.filter((vehicle) => {
      const matchesStatus = statusFilter === 'All vehicles' || vehicle.status === statusFilter
      const matchesQuery =
        !normalizedQuery ||
        `${vehicle.id} ${vehicle.make} ${vehicle.model} ${vehicle.plate} ${vehicle.location}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
  }, [query, statusFilter])

  const onRentCount = vehicles.filter((vehicle) => vehicle.status === 'On rent').length
  const availableCount = vehicles.filter((vehicle) => vehicle.status === 'Available').length
  const maintenanceCount = vehicles.filter((vehicle) => vehicle.status === 'Maintenance').length
  const trackerCount = vehicles.filter((vehicle) => vehicle.tracker).length
  const issueCount = vehicles.filter((vehicle) => vehicle.issue).length
  const utilization = Math.round((onRentCount / vehicles.length) * 100)

  const refreshDashboard = () => {
    setUpdatedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
  }

  return (
    <div className={`dashboard-app${collapsed ? ' sidebar-collapsed' : ''}`}>
      {mobileMenuOpen && (
        <button
          className="mobile-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`app-sidebar${mobileMenuOpen ? ' mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <Link to="/fleetdashboard" aria-label="Rentalmatics fleet dashboard">
            <img className="sidebar-logo-full" src="/brand/white-logo-rm.svg" alt="Rentalmatics" />
            <img className="sidebar-logo-icon" src="/brand/white-icon-rm.svg" alt="" />
          </Link>
          <button
            className="icon-button mobile-close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="sidebar-search">
          <Icon name="search" size={16} />
          {!collapsed && <input aria-label="Search menu" placeholder="Search menu" />}
          {!collapsed && <kbd>⌘ K</kbd>}
        </div>

        <nav className="side-navigation" aria-label="Main navigation">
          <div className="side-group">
            {!collapsed && <p className="side-group-label">FLEET</p>}
            <Link
              className={`side-nav-link${pathname === '/fleetdashboard' ? ' active' : ''}`}
              to="/fleetdashboard"
              aria-current={pathname === '/fleetdashboard' ? 'page' : undefined}
              title={collapsed ? 'Fleet dashboard' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="dashboard" />
              {!collapsed && <span>Fleet dashboard</span>}
              {!collapsed && pathname === '/fleetdashboard' && <span className="nav-active-dot" />}
            </Link>
            <Link
              className={`side-nav-link${pathname === '/fleet' ? ' active' : ''}`}
              to="/fleet"
              aria-current={pathname === '/fleet' ? 'page' : undefined}
              title={collapsed ? 'Fleet report' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="car" />
              {!collapsed && <span>Fleet report</span>}
              {!collapsed && pathname === '/fleet' && <span className="nav-active-dot" />}
            </Link>
            <Link
              className={`side-nav-link${pathname === '/interactivemap' ? ' active' : ''}`}
              to="/interactivemap"
              aria-current={pathname === '/interactivemap' ? 'page' : undefined}
              title={collapsed ? 'Interactive map' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="map" />
              {!collapsed && <span>Interactive map</span>}
              {!collapsed && pathname === '/interactivemap' && <span className="nav-active-dot" />}
            </Link>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-utility">
            <button type="button" className="sidebar-utility-button" aria-label="Settings">
              <Icon name="settings" />
              {!collapsed && <span>Settings</span>}
            </button>
            <button
              type="button"
              className="sidebar-utility-button collapse-sidebar-button"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setCollapsed((value) => !value)}
            >
              <span className="collapse-chevron">{collapsed ? '›' : '‹'}</span>
              {!collapsed && <span>Collapse menu</span>}
            </button>
          </div>
          <div className="sidebar-profile">
            <span className="profile-avatar">JD</span>
            {!collapsed && (
              <>
                <span className="profile-details">
                  <strong>Jordan Davis</strong>
                  <small>Fleet manager</small>
                </span>
                <span className="profile-more">···</span>
              </>
            )}
          </div>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <div className="breadcrumbs">
            <span>Fleet</span>
            <span className="breadcrumb-divider">/</span>
              <strong>{currentPage}</strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-location">
              <Icon name="pin" size={16} />
              All locations
              <Icon name="chevron" size={14} />
            </span>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
              <span />
            </button>
            <span className="topbar-avatar">JD</span>
          </div>
        </header>

        <main className={`dashboard-content content-${pathname.slice(1)}`}>
          <Routes>
            <Route path="/fleet" element={<FleetReport />} />
            <Route path="/interactivemap" element={<InteractiveFleetMap />} />
            <Route
              path="/fleetdashboard"
              element={
                <>
          <div className="page-heading">
            <div>
              <p className="eyebrow">FLEET</p>
              <h1>Fleet dashboard</h1>
              <p className="page-description">Live utilisation, stock health and device coverage across your fleet.</p>
            </div>
            <div className="heading-actions">
              <span className="live-badge"><span /> Live</span>
              <button className="outline-button" type="button" onClick={refreshDashboard}>
                <Icon name="refresh" size={16} />
                Refresh
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={() => document.getElementById('fleet-vehicles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View fleet
                <Icon name="arrow" size={15} />
              </button>
            </div>
          </div>

          <div className="dashboard-filters">
            <label className="filter-select">
              <span>Location</span>
              <select aria-label="Location">
                <option>All locations</option>
                <option>London Heathrow</option>
                <option>Manchester</option>
                <option>Birmingham</option>
                <option>Edinburgh</option>
              </select>
              <Icon name="chevron" size={14} />
            </label>
            <span className="filter-updated">Last updated {updatedAt}</span>
            <span className="demo-data-tag">Demo data</span>
          </div>

          <section className="metric-grid" aria-label="Fleet summary">
            <article className="metric-card">
              <div className="metric-card-top"><span className="metric-icon metric-icon-ink"><Icon name="car" /></span><span className="metric-trend positive">+2.4%</span></div>
              <p className="metric-label">Vehicles</p>
              <strong className="metric-value">{vehicles.length}</strong>
              <p className="metric-note">Across 4 locations</p>
            </article>
            <article className="metric-card">
              <div className="metric-card-top"><span className="metric-icon metric-icon-blue"><Icon name="device" /></span><span className="metric-trend neutral">92% coverage</span></div>
              <p className="metric-label">Devices</p>
              <strong className="metric-value">{trackerCount}</strong>
              <p className="metric-note">Trackers installed</p>
            </article>
            <article className="metric-card">
              <div className="metric-card-top"><span className="metric-icon metric-icon-green"><Icon name="activity" /></span><span className="metric-trend positive">On track</span></div>
              <p className="metric-label">Active vehicles</p>
              <strong className="metric-value">{onRentCount + availableCount}</strong>
              <p className="metric-note">Ready or currently on rent</p>
            </article>
            <article className="metric-card">
              <div className="metric-card-top"><span className="metric-icon metric-icon-amber"><Icon name="tool" /></span><span className="metric-trend warning">Needs attention</span></div>
              <p className="metric-label">Stock issues</p>
              <strong className="metric-value">{issueCount}</strong>
              <p className="metric-note">Across your active fleet</p>
            </article>
            <article className="metric-card utilization-metric">
              <div className="metric-card-top"><span className="metric-icon metric-icon-amber"><Icon name="activity" /></span><span className="metric-trend positive">+5.1%</span></div>
              <p className="metric-label">Utilisation</p>
              <strong className="metric-value">{utilization}<small>%</small></strong>
              <div className="metric-progress"><span style={{ width: `${utilization}%` }} /></div>
              <p className="metric-note">Target: 75%</p>
            </article>
          </section>

          <section className="issues-section">
            <div className="section-heading">
              <div>
                <h2>Issues to address</h2>
                <p>Keep your fleet healthy and ready to rent.</p>
              </div>
              <button className="quiet-button" type="button">View all issues <Icon name="arrow" size={14} /></button>
            </div>
            <div className="issue-grid">
              <article className="issue-card">
                <span className="issue-icon issue-icon-red"><Icon name="car" /></span>
                <div><p>Stock mismatches</p><strong>3 <small>vehicles</small></strong></div>
                <span className="issue-arrow"><Icon name="arrow" size={15} /></span>
              </article>
              <article className="issue-card">
                <span className="issue-icon issue-icon-amber"><Icon name="device" /></span>
                <div><p>Device issues</p><strong>2 <small>vehicles</small></strong></div>
                <span className="issue-arrow"><Icon name="arrow" size={15} /></span>
              </article>
              <article className="issue-card">
                <span className="issue-icon issue-icon-blue"><Icon name="tool" /></span>
                <div><p>Service due soon</p><strong>4 <small>vehicles</small></strong></div>
                <span className="issue-arrow"><Icon name="arrow" size={15} /></span>
              </article>
              <article className="issue-card">
                <span className="issue-icon issue-icon-purple"><Icon name="activity" /></span>
                <div><p>Open recalls</p><strong>1 <small>vehicle</small></strong></div>
                <span className="issue-arrow"><Icon name="arrow" size={15} /></span>
              </article>
            </div>
          </section>

          <section className="insights-grid">
            <article className="panel utilization-panel">
              <div className="panel-heading">
                <div><h2>Fleet utilisation</h2><p>Vehicle status across your fleet</p></div>
                <button className="period-select" type="button">This week <Icon name="chevron" size={14} /></button>
              </div>
              <div className="utilization-content">
                <div
                  className="donut-chart"
                  role="img"
                  aria-label={`${utilization}% of vehicles on rent`}
                  style={{
                    background: `conic-gradient(#4b4b47 0 ${utilization}%, #e8e8e9 ${utilization}% 100%)`,
                  }}
                >
                  <div><strong>{utilization}%</strong><span>utilised</span></div>
                </div>
                <div className="utilization-legend">
                  <p><span className="legend-dot rent" />On rent <strong>{onRentCount}</strong></p>
                  <p><span className="legend-dot available" />Available <strong>{availableCount}</strong></p>
                  <p><span className="legend-dot maintenance" />Maintenance <strong>{maintenanceCount}</strong></p>
                  <div className="legend-total"><span>Total fleet</span><strong>{vehicles.length}</strong></div>
                </div>
              </div>
              <div className="utilization-footer"><span>Utilisation has increased <strong>5.1%</strong> from last week</span><span className="positive">↗ 5.1%</span></div>
            </article>

            <article className="panel composition-panel">
              <div className="panel-heading">
                <div><h2>Fleet composition</h2><p>Vehicles by category</p></div>
                <button className="period-select" type="button">Category <Icon name="chevron" size={14} /></button>
              </div>
              <div className="composition-list">
                <div className="composition-item"><div><span>SUV</span><strong>8 <small>vehicles</small></strong></div><div className="composition-track"><span style={{ width: '32%' }} /></div></div>
                <div className="composition-item"><div><span>Compact</span><strong>7 <small>vehicles</small></strong></div><div className="composition-track"><span style={{ width: '28%' }} /></div></div>
                <div className="composition-item"><div><span>Saloon</span><strong>6 <small>vehicles</small></strong></div><div className="composition-track"><span style={{ width: '24%' }} /></div></div>
                <div className="composition-item"><div><span>Premium</span><strong>4 <small>vehicles</small></strong></div><div className="composition-track"><span style={{ width: '16%' }} /></div></div>
              </div>
              <div className="composition-footer"><span>Most popular</span><strong>SUV <span>·</span> 32% of fleet</strong></div>
            </article>
          </section>

          <section className="panel vehicles-panel" id="fleet-vehicles">
            <div className="panel-heading vehicles-heading">
              <div><h2>Fleet vehicles</h2><p>Browse and monitor all vehicles in your fleet.</p></div>
              <div className="vehicle-tools">
                <label className="table-search">
                  <Icon name="search" size={16} />
                  <input
                    aria-label="Search vehicles"
                    placeholder="Search vehicles"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <button className="outline-button export-button" type="button">Export</button>
              </div>
            </div>
            <div className="vehicle-tabs" role="group" aria-label="Filter vehicles by status">
              {(['All vehicles', 'On rent', 'Available', 'Maintenance'] as const).map((filter) => {
                const count = filter === 'All vehicles'
                  ? vehicles.length
                  : vehicles.filter((vehicle) => vehicle.status === filter).length
                return (
                  <button
                    key={filter}
                    className={statusFilter === filter ? 'vehicle-tab selected' : 'vehicle-tab'}
                    type="button"
                    aria-pressed={statusFilter === filter}
                    onClick={() => setStatusFilter(filter)}
                  >
                    {filter}<span>{count}</span>
                  </button>
                )
              })}
            </div>
            <div className="vehicle-table-wrap">
              <table className="vehicle-table">
                <thead>
                  <tr><th>Vehicle</th><th>Registration</th><th>Status</th><th>Location</th><th>Mileage</th><th>Device</th><th aria-label="Actions" /></tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td><div className="vehicle-name"><span className="vehicle-thumb"><Icon name="car" size={18} /></span><span><strong>{vehicle.make} {vehicle.model}</strong><small>{vehicle.year} · {vehicle.id}</small></span></div></td>
                      <td><span className="registration-plate">{vehicle.plate}</span></td>
                      <td><span className={`status-badge status-${vehicle.status.toLowerCase().replace(' ', '-')}`}><span />{vehicle.status}</span></td>
                      <td><span className="location-cell"><Icon name="pin" size={14} />{vehicle.location}</span></td>
                      <td>{vehicle.mileage.toLocaleString()} mi</td>
                      <td><span className={vehicle.tracker ? 'device-status connected' : 'device-status disconnected'}><span />{vehicle.tracker ? 'Connected' : 'Offline'}</span></td>
                      <td><button className="row-action" type="button" aria-label={`View ${vehicle.make} ${vehicle.model}`}>···</button></td>
                    </tr>
                  ))}
                  {filteredVehicles.length === 0 && (
                    <tr><td className="empty-table" colSpan={7}>No vehicles match your search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing <strong>{filteredVehicles.length}</strong> of <strong>{vehicles.length}</strong> vehicles</span><span>Demo fleet · Updated {updatedAt}</span></div>
          </section>

          <footer className="dashboard-footer">
            <span>© {new Date().getFullYear()} Rentalmatics</span>
            <span>Fleet data is sample content for this demo.</span>
          </footer>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/fleetdashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Rentalmatics | Sign in'
  }, [])

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/fleetdashboard')
  }

  return (
    <main className="auth-page">
      <section className="brand-panel" aria-label="About Rentalmatics">
        <Link className="brand-logo brand-logo-desktop" to="/" aria-label="Rentalmatics home">
          <img src="/brand/white-logo-rm.svg" alt="Rentalmatics" />
        </Link>

        <div className="brand-content">
          <h1>
            One platform.
            <span>Every vehicle profitable.</span>
          </h1>
          <p className="brand-intro">
            The intelligence layer for your fleet, bringing every vehicle and
            every opportunity into view.
          </p>

          <ul className="highlights">
            <li>
              <span className="highlight-icon" aria-hidden="true">↗</span>
              <div>
                <h2>See everything</h2>
                <p>Every vehicle, in every state: on rent, off rent, in transit.</p>
              </div>
            </li>
            <li>
              <span className="highlight-icon" aria-hidden="true">✓</span>
              <div>
                <h2>Catch what's hidden</h2>
                <p>Damage, idle time, and unbilled costs, spotted instantly.</p>
              </div>
            </li>
            <li>
              <span className="highlight-icon" aria-hidden="true">⌁</span>
              <div>
                <h2>Recover the profit</h2>
                <p>Turn invisible losses into revenue you keep.</p>
              </div>
            </li>
          </ul>
        </div>

        <p className="copyright">© {new Date().getFullYear()} Rentalmatics. All rights reserved.</p>
      </section>

      <section className="form-panel">
        <div className="auth-content">
          <Link className="brand-logo brand-logo-mobile" to="/" aria-label="Rentalmatics home">
            <img src="/brand/rentalmatics-logo-dark.png" alt="Rentalmatics" />
          </Link>

          <h1>Welcome back</h1>
          <p className="form-subtitle">Sign in to continue to your fleet</p>

          <form className="login-form" onSubmit={handleLogin} noValidate>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" autoFocus />

            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button className="submit-button" type="submit">Sign in</button>
          </form>

          <div className="auth-footer">
            <span className="text-link">Forgot password?</span>
            <span>
              <span className="muted-text">Need an account? </span>
              <span className="text-link">Register</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<Navigate to="/fleetdashboard" replace />} />
        <Route path="*" element={<FleetDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
