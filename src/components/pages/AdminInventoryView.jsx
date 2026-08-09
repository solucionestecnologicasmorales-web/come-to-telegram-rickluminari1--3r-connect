import React, { useState } from 'react';
import { Home, AlertTriangle, TrendingDown, MapPin, EyeOff, Sparkles, Filter, Search, Activity, MoreVertical, Zap } from 'lucide-react';
import { mockProperties } from '../../mockData';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropertyDetailView from './PropertyDetailView';

// Fix leaflet icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const agents = ['Laura Martínez', 'Carlos Ruiz', 'Asesor Premium', 'Ana Soto'];

const enhancedProperties = mockProperties.map((p, i) => {
  const dom = Math.floor(Math.random() * 90) + 5; // Days on Market
  const views = Math.floor(Math.random() * 2000) + 100;
  
  let verdict = 'Sana';
  let verdictColor = '#10b981'; // Green
  let verdictIcon = Sparkles;
  
  if (dom > 60 && views < 500) {
    verdict = 'Baja Visibilidad';
    verdictColor = '#f59e0b'; // Yellow
    verdictIcon = EyeOff;
  } else if (dom > 45 && views > 1000) {
    verdict = 'Sobreprecio Est.'
    verdictColor = '#ef4444'; // Red
    verdictIcon = TrendingDown;
  }

  return {
    ...p,
    agent: agents[i % agents.length],
    dom,
    views,
    verdict,
    verdictColor,
    verdictIcon
  };
});

const AdminInventoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('Todos');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = enhancedProperties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerdict = filterVerdict === 'Todos' || p.verdict === filterVerdict;
    return matchesSearch && matchesVerdict;
  });

  if (selectedProperty) {
    return <PropertyDetailView property={selectedProperty} onBack={() => setSelectedProperty(null)} />;
  }

  return (
    <div className="dashboard-grid animate-fade-in" style={{gap: '24px'}}>
      
      {/* Header */}
      <div style={{gridColumn: 'span 12', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
        <div>
          <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Home size={28} color="#8b5cf6" /> Inventario & Auditoría IA
          </h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Monitoreo del rendimiento de propiedades a nivel agencia.</p>
        </div>
        <button style={{background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <Zap size={16} /> Generar Reporte Diagnóstico
        </button>
      </div>

      {/* Health Metrics */}
      <div className="glass-card" style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Total Inmuebles Activos</span>
          <div style={{background: '#f1f5f9', padding: '6px', borderRadius: '8px'}}><Home size={18} color="#475569" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>{enhancedProperties.length}</div>
        <span style={{fontSize: '13px', color: '#10b981', fontWeight: 600}}>+12% vs mes pasado</span>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Promedio en Mercado (DOM)</span>
          <div style={{background: '#e0f2fe', padding: '6px', borderRadius: '8px'}}><Activity size={18} color="#0284c7" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>45 <span style={{fontSize: '20px', color: '#94a3b8', fontWeight: 500}}>días</span></div>
        <span style={{fontSize: '13px', color: '#ef4444', fontWeight: 600}}>+5 días (alerta ligera)</span>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', borderLeft: '4px solid #ef4444', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Inmuebles en Riesgo</span>
          <div style={{background: '#fee2e2', padding: '6px', borderRadius: '8px'}}><AlertTriangle size={18} color="#ef4444" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>
          {enhancedProperties.filter(p => p.verdict !== 'Sana').length}
        </div>
        <span style={{fontSize: '13px', color: '#64748b'}}>Propiedades estancadas o con sobreprecio</span>
      </div>

      {/* Heatmap & Filters */}
      <div style={{gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px'}}>
        
        {/* Heatmap */}
        <div className="glass-card" style={{gridColumn: 'span 4', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px'}}>
          <div style={{padding: '16px', borderBottom: '1px solid #e2e8f0'}}>
            <h3 style={{margin: 0, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}><MapPin size={18} color="#8b5cf6" /> Demanda vs Oferta (Mapa IA)</h3>
            <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#64748b'}}>Las zonas rojas indican alta demanda de compradores en el CRM sin suficiente inventario.</p>
          </div>
          <div style={{flex: 1, minHeight: '350px'}}>
            <MapContainer center={[19.4326, -99.1332]} zoom={11} style={{height: '100%', width: '100%', zIndex: 0}}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {enhancedProperties.map((p, idx) => (
                <Marker key={idx} position={[19.4326 + (Math.random() - 0.5) * 0.1, -99.1332 + (Math.random() - 0.5) * 0.1]}>
                  <Popup>{p.title}</Popup>
                </Marker>
              ))}
              {/* Fake heat zones */}
              <Circle center={[19.43, -99.15]} pathOptions={{color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3}} radius={2000} />
              <Circle center={[19.35, -99.18]} pathOptions={{color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3}} radius={3000} />
            </MapContainer>
          </div>
        </div>

        {/* Analytical Table */}
        <div className="glass-card" style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', height: '600px'}}>
          
          <div style={{padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', background: '#f8fafc', flexShrink: 0}}>
            <div style={{flex: 1, position: 'relative'}}>
              <Search size={16} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'}} />
              <input 
                type="text" 
                placeholder="Buscar propiedad..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}}
              />
            </div>
            <select value={filterVerdict} onChange={e => setFilterVerdict(e.target.value)} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}}>
              <option value="Todos">Todos los Veredictos</option>
              <option value="Sana">Sana</option>
              <option value="Sobreprecio Est.">Sobreprecio Est.</option>
              <option value="Baja Visibilidad">Baja Visibilidad</option>
            </select>
          </div>

          <div style={{overflowX: 'auto', overflowY: 'auto', flex: 1}}>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
              <thead style={{position: 'sticky', top: 0, zIndex: 10, background: 'white'}}>
                <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                  <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Propiedad</th>
                  <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Asesor</th>
                  <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>DOM / Visitas</th>
                  <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Veredicto IA</th>
                  <th style={{padding: '16px', width: '40px'}}></th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(p => (
                  <tr key={p.id} onClick={() => setSelectedProperty(p)} style={{borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{padding: '16px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{width: '48px', height: '48px', borderRadius: '8px', background: `url(${p.image}) center/cover`}}></div>
                        <div>
                          <div style={{fontWeight: 600, color: '#0f172a', fontSize: '14px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{p.title}</div>
                          <div style={{color: '#10b981', fontSize: '13px', fontWeight: 600}}>{p.price}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding: '16px'}}>
                      <span style={{fontSize: '14px', color: '#334155'}}>{p.agent}</span>
                    </td>
                    <td style={{padding: '16px'}}>
                      <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>{p.dom} días</div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>{p.views} views</div>
                    </td>
                    <td style={{padding: '16px'}}>
                      <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: `${p.verdictColor}15`, color: p.verdictColor, fontSize: '12px', fontWeight: 600}}>
                        <p.verdictIcon size={14} /> {p.verdict}
                      </div>
                    </td>
                    <td style={{padding: '16px', textAlign: 'right'}}>
                      <button style={{background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8'}}><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminInventoryView;
