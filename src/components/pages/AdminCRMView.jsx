import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Sparkles, User, MapPin, Calendar, MoreVertical, Zap } from 'lucide-react';
import { mockFunnelLeads, mockProperties } from '../../mockData';
import ClientCRMDetailView from './ClientCRMDetailView';

const agents = ['Laura Martínez', 'Carlos Ruiz', 'Asesor Premium', 'Ana Soto', 'Diego Luna'];

const allLeads = Object.values(mockFunnelLeads).map((lead, i) => ({
  ...lead,
  agent: agents[i % agents.length],
  property: mockProperties.find(p => p.id === lead.propertyId) || mockProperties[0],
  lastActivity: Math.floor(Math.random() * 14) // days ago
}));

const AdminCRMView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgent, setFilterAgent] = useState('Todos');
  const [filterStage, setFilterStage] = useState('Todos');
  const [selectedLead, setSelectedLead] = useState(null);

  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgent = filterAgent === 'Todos' || lead.agent === filterAgent;
    const matchesStage = filterStage === 'Todos' || lead.stage === filterStage;
    return matchesSearch && matchesAgent && matchesStage;
  });

  if (selectedLead) {
    return <ClientCRMDetailView lead={selectedLead} onBack={() => setSelectedLead(null)} />;
  }

  return (
    <div className="dashboard-grid animate-fade-in" style={{gap: '24px'}}>
      
      {/* Header */}
      <div style={{gridColumn: 'span 12', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
        <div>
          <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <User size={28} color="#2563eb" /> CRM Global & Auditoría
          </h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Visión general analítica de todos los tratos activos en la agencia.</p>
        </div>
      </div>

      {/* AI Insights (Top Cards) */}
      <div className="glass-card" style={{gridColumn: 'span 6', borderLeft: '4px solid #ef4444', background: 'linear-gradient(to right, #fff1f2, white)'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#991b1b'}}>Auditoría: Leads Estancados</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', color: '#64748b'}}>La IA detecta 15 prospectos sin seguimiento por más de 7 días. El 60% pertenecen a Carlos Ruiz.</p>
            <button style={{background: 'white', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', color: '#b91c1c', fontWeight: 600, cursor: 'pointer'}}>Enviar Alerta al Equipo</button>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 6', borderLeft: '4px solid #8b5cf6', background: 'linear-gradient(to right, #f5f3ff, white)'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Sparkles size={24} color="#8b5cf6" />
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#5b21b6'}}>Oportunidad de Cross-Selling</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', color: '#64748b'}}>Existen 8 clientes que perdieron propiedades en Polanco. Hay 3 nuevos ingresos que hacen match.</p>
            <button style={{background: '#8b5cf6', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}><Zap size={14} /> Asignar Sugerencias</button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{gridColumn: 'span 12', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '300px', position: 'relative'}}>
          <Search size={18} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'}} />
          <input 
            type="text" 
            placeholder="Buscar por cliente, propiedad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px'}}
          />
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b'}}>Asesor:</span>
          <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)} style={{padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white', fontSize: '14px', cursor: 'pointer'}}>
            <option value="Todos">Todos</option>
            {agents.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b'}}>Etapa:</span>
          <select value={filterStage} onChange={e => setFilterStage(e.target.value)} style={{padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white', fontSize: '14px', cursor: 'pointer'}}>
            <option value="Todos">Todas</option>
            <option value="contacto">Contacto Inicial</option>
            <option value="visita">Visita Agendada</option>
            <option value="negociacion">En Negociación</option>
          </select>
        </div>
        
        <button style={{padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569'}}>
          <Filter size={16} /> Más filtros
        </button>
      </div>

      {/* Analytical Table */}
      <div className="glass-card" style={{gridColumn: 'span 12', padding: 0, overflow: 'hidden'}}>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
                <th style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Cliente</th>
                <th style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Propiedad de Interés</th>
                <th style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Etapa</th>
                <th style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Asesor</th>
                <th style={{padding: '16px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Última Actividad</th>
                <th style={{padding: '16px', width: '50px'}}></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.slice(0, 15).map(lead => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{padding: '16px'}}>
                    <div style={{fontWeight: 600, color: '#0f172a', fontSize: '14px'}}>{lead.name}</div>
                    <div style={{color: '#64748b', fontSize: '13px'}}>{lead.phone}</div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '40px', height: '40px', borderRadius: '6px', background: `url(${lead.property.image}) center/cover`}}></div>
                      <div>
                        <div style={{fontWeight: 500, color: '#0f172a', fontSize: '14px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{lead.property.title}</div>
                        <div style={{color: '#64748b', fontSize: '13px'}}>{lead.budget} Presupuesto</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                      background: lead.stage === 'contacto' ? '#f3f4f6' : lead.stage === 'visita' ? '#dbeafe' : '#fef3c7',
                      color: lead.stage === 'contacto' ? '#4b5563' : lead.stage === 'visita' ? '#2563eb' : '#d97706'
                    }}>
                      {lead.stage === 'contacto' ? 'Contacto' : lead.stage === 'visita' ? 'Visita' : 'Negociación'}
                    </span>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold'}}>{lead.agent.charAt(0)}</div>
                      <span style={{fontSize: '14px', color: '#334155'}}>{lead.agent}</span>
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    {lead.lastActivity === 0 ? (
                      <span style={{color: '#10b981', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'}}></div> Hoy</span>
                    ) : (
                      <span style={{color: lead.lastActivity > 5 ? '#ef4444' : '#64748b', fontSize: '13px', fontWeight: lead.lastActivity > 5 ? 600 : 400}}>Hace {lead.lastActivity} días</span>
                    )}
                  </td>
                  <td style={{padding: '16px', textAlign: 'right'}}>
                    <button style={{background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8'}}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>No se encontraron leads con estos filtros.</div>
          )}
        </div>
        <div style={{padding: '16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: '13px', color: '#64748b'}}>Mostrando {Math.min(15, filteredLeads.length)} de {filteredLeads.length} leads</span>
          <div style={{display: 'flex', gap: '8px'}}>
            <button style={{padding: '6px 12px', border: '1px solid #cbd5e1', background: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'}}>Anterior</button>
            <button style={{padding: '6px 12px', border: '1px solid #cbd5e1', background: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'}}>Siguiente</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminCRMView;
