import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, ChevronLeft, BrainCircuit, TrendingUp, MapPin, Calendar, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockClients = [
  { 
    id: 1, name: 'Juan Pérez', phone: '55-1234-5678', email: 'juan.perez@example.com', budget: '$5.5M', date: '2026-08-01', agent: 'Laura Martínez', status: 'Activo',
    zones: ['Polanco', 'Lomas de Chapultepec', 'Condesa'],
    aiAnalysis: {
      overall: 'Cliente altamente calificado. Urgencia media. Alta probabilidad de cierre si se presentan opciones llave en mano.',
      matchScore: 92,
      features: [
        { feature: 'Iluminación Natural', status: 'Indispensable', color: '#10b981' },
        { feature: 'Estacionamiento (2+)', status: 'Indispensable', color: '#10b981' },
        { feature: 'Amenidades (Alberca)', status: 'Deseable', color: '#3b82f6' },
        { feature: 'Planta Baja', status: 'Descartado', color: '#ef4444' }
      ]
    },
    activityTimeline: [
      { id: 1, date: 'Hoy, 10:30 AM', type: 'visit', prop: 'Casa en Lomas de Chapultepec', note: 'Le encantó la terraza, pero el precio está al límite de su presupuesto. Quedó de enviar oferta.' },
      { id: 2, date: 'Ayer, 4:00 PM', type: 'interest', prop: 'Depto Polanco (Arquímedes)', note: 'Revisó el Tour 3D por más de 15 minutos. Solicitó más información del costo de mantenimiento.' },
      { id: 3, date: 'Hace 1 semana', type: 'contact', prop: 'N/A', note: 'Llamada de perfilamiento. Buscan mudarse en los próximos 3 meses.' }
    ],
    budgetHistory: [
      { name: 'Ene', presupuesto: 4.5 },
      { name: 'Mar', presupuesto: 4.8 },
      { name: 'May', presupuesto: 5.0 },
      { name: 'Jul', presupuesto: 5.5 },
    ]
  },
  { 
    id: 2, name: 'María García', phone: '55-8765-4321', email: 'maria.garcia@example.com', budget: '$12M', date: '2026-08-03', agent: 'Carlos Ruiz', status: 'Negociación',
    zones: ['Pedregal', 'San Ángel'],
    aiAnalysis: {
      overall: 'Inversionista patrimonial. Busca alta plusvalía a largo plazo. Muy analítica con los números.',
      matchScore: 85,
      features: [
        { feature: 'Jardín Amplio', status: 'Indispensable', color: '#10b981' },
        { feature: 'Seguridad 24/7', status: 'Indispensable', color: '#10b981' }
      ]
    },
    activityTimeline: [
      { id: 1, date: 'Ayer', type: 'offer', prop: 'Residencia en el Pedregal', note: 'Envió contraoferta por $11.5M. Esperando respuesta del propietario.' }
    ],
    budgetHistory: [
      { name: 'Feb', presupuesto: 10.0 },
      { name: 'Abr', presupuesto: 11.0 },
      { name: 'Jun', presupuesto: 12.0 },
    ]
  },
  { id: 3, name: 'Roberto Gómez', phone: '55-1111-2222', email: 'roberto.g@example.com', budget: '$3M', date: '2026-08-04', agent: 'Asesor Premium', status: 'Nuevo', zones: ['Narvarte'], aiAnalysis: { overall: 'Primer comprador.', matchScore: 60, features: [] }, activityTimeline: [], budgetHistory: [] },
  { id: 4, name: 'Ana López', phone: '55-3333-4444', email: 'ana.lopez@example.com', budget: '$8M', date: '2026-08-05', agent: 'Laura Martínez', status: 'Activo', zones: ['Roma Norte'], aiAnalysis: { overall: 'Busca departamento moderno.', matchScore: 75, features: [] }, activityTimeline: [], budgetHistory: [] },
];

const ClientDirectoryView = ({ currentEntity, setCurrentEntity, setCurrentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Auto-open client if navigated from elsewhere
  React.useEffect(() => {
    if (currentEntity && currentEntity.type === 'client' && currentEntity.name) {
      const found = mockClients.find(c => c.name === currentEntity.name);
      if (found) {
        setSelectedClient(found);
      }
    }
  }, [currentEntity]);
  
  const filtered = mockClients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (selectedClient) {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden'}}>
        {/* Header */}
        <div style={{padding: '24px 32px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <button onClick={() => setSelectedClient(null)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <ChevronLeft size={20} /> Volver al directorio
            </button>
            <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px'}}>{selectedClient.name}</h2>
            <span style={{background: selectedClient.status === 'Nuevo' ? '#dbeafe' : selectedClient.status === 'Negociación' ? '#fef3c7' : '#e0e7ff', color: selectedClient.status === 'Nuevo' ? '#2563eb' : selectedClient.status === 'Negociación' ? '#d97706' : '#4338ca', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600}}>
              {selectedClient.status}
            </span>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
            <button className="btn btn-secondary" onClick={() => {
              if (setCurrentView && setCurrentEntity) {
                // We fake the id based on name since we use mock data
                const leadId = selectedClient.name === 'Juan Pérez' ? 'lead-1' : selectedClient.name === 'María García' ? 'lead-2' : 'lead-1';
                setCurrentEntity({ type: 'client', id: leadId });
                setCurrentView('crm');
              }
            }}>Abrir Chat CRM</button>
            <button className="btn btn-primary">Agendar Reunión</button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{flex: 1, overflowY: 'auto', padding: '32px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
            
            {/* Left Column */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              
              {/* Client Info */}
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0'}}>
                <h3 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a'}}>Detalles de Contacto</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569'}}><Phone size={16}/> {selectedClient.phone}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569'}}><Mail size={16}/> {selectedClient.email}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569'}}><Calendar size={16}/> Registrado: {selectedClient.date}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569'}}><UserPlus size={16}/> Asesor: {selectedClient.agent}</div>
                </div>
              </div>

              {/* Zones */}
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0'}}>
                <h3 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a'}}>Zonas de Interés</h3>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  {selectedClient.zones.map(zone => (
                    <span key={zone} style={{background: '#f1f5f9', color: '#334155', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <MapPin size={14}/> {zone}
                    </span>
                  ))}
                </div>
              </div>

              {/* Budget History */}
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0'}}>
                <h3 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a', display: 'flex', justifyContent: 'space-between'}}>
                  <span>Evolución de Presupuesto</span>
                  <span style={{color: '#10b981'}}>{selectedClient.budget} Actual</span>
                </h3>
                {selectedClient.budgetHistory.length > 0 ? (
                  <div style={{height: '200px'}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedClient.budgetHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val}M`} />
                        <Tooltip formatter={(value) => [`$${value}M`, 'Presupuesto']} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        <Line type="monotone" dataKey="presupuesto" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div style={{color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px'}}>No hay historial suficiente.</div>
                )}
              </div>

            </div>

            {/* Right Column */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              
              {/* AI Analysis */}
              <div style={{background: 'linear-gradient(to right bottom, #eff6ff, #f8fafc)', borderRadius: '12px', padding: '24px', border: '1px solid #bfdbfe'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                  <h3 style={{margin: 0, fontSize: '16px', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <BrainCircuit size={18} /> Análisis 3R-AI
                  </h3>
                  <div style={{background: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 600, color: '#3b82f6', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <TrendingUp size={14}/> Score: {selectedClient.aiAnalysis.matchScore}%
                  </div>
                </div>
                
                <p style={{color: '#334155', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                  "{selectedClient.aiAnalysis.overall}"
                </p>

                <div>
                  <h4 style={{fontSize: '13px', color: '#475569', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Preferencias Clave (Basado en Visitas y Clics)</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                    {selectedClient.aiAnalysis.features.map(f => (
                      <div key={f.feature} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                        <span style={{fontSize: '13px', color: '#334155', fontWeight: 500}}>{f.feature}</span>
                        <span style={{fontSize: '11px', color: f.color, background: f.color + '1a', padding: '2px 8px', borderRadius: '12px', fontWeight: 600}}>{f.status}</span>
                      </div>
                    ))}
                    {selectedClient.aiAnalysis.features.length === 0 && (
                      <div style={{fontSize: '13px', color: '#94a3b8', gridColumn: 'span 2'}}>No hay suficientes datos de preferencias aún.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', flex: 1}}>
                <h3 style={{margin: '0 0 24px 0', fontSize: '16px', color: '#0f172a'}}>Timeline de Visitas y Actividad</h3>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  {selectedClient.activityTimeline.map((item, index) => (
                    <div key={item.id} style={{display: 'flex', gap: '16px', position: 'relative'}}>
                      {/* Line connector */}
                      {index !== selectedClient.activityTimeline.length - 1 && (
                        <div style={{position: 'absolute', left: '15px', top: '32px', bottom: '-24px', width: '2px', background: '#e2e8f0'}}></div>
                      )}
                      
                      <div style={{width: '32px', height: '32px', borderRadius: '50%', background: item.type === 'visit' ? '#dcfce7' : item.type === 'interest' ? '#dbeafe' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.type === 'visit' ? '#10b981' : item.type === 'interest' ? '#3b82f6' : '#64748b', zIndex: 1}}>
                        {item.type === 'visit' ? <MapPin size={16}/> : item.type === 'interest' ? <CheckCircle2 size={16}/> : <Phone size={16}/>}
                      </div>
                      
                      <div style={{flex: 1, paddingBottom: index !== selectedClient.activityTimeline.length - 1 ? '16px' : '0'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                          <div style={{fontWeight: 600, color: '#0f172a', fontSize: '14px'}}>
                            {item.type === 'visit' ? 'Visita presencial' : item.type === 'interest' ? 'Interés digital' : 'Contacto'}
                          </div>
                          <span style={{fontSize: '12px', color: '#94a3b8'}}>{item.date}</span>
                        </div>
                        <div style={{fontSize: '13px', color: '#3b82f6', marginBottom: '8px', fontWeight: 500}}>{item.prop}</div>
                        <div style={{fontSize: '14px', color: '#475569', lineHeight: 1.5}}>{item.note}</div>
                      </div>
                    </div>
                  ))}
                  {selectedClient.activityTimeline.length === 0 && (
                    <div style={{color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px'}}>No hay actividad reciente registrada.</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Directorio (Tabla expandida sin maxWidth)
  return (
    <div style={{padding: '32px', width: '100%', minHeight: '100vh', boxSizing: 'border-box'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Directorio de Clientes</h2>
          <p style={{margin: 0, color: '#64748b'}}>Gestiona tu base global de leads y prospectos.</p>
        </div>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Abriendo formulario de alta...' } }))}>
          <UserPlus size={18} /> Nuevo Cliente
        </button>
      </div>

      <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
        <div style={{padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', background: '#f8fafc'}}>
          <div style={{position: 'relative', flex: 1, maxWidth: '400px'}}>
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none'}}
            />
            <Search size={18} color="#94a3b8" style={{position: 'absolute', left: '10px', top: '11px'}} />
          </div>
        </div>
        
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px'}}>
            <thead>
              <tr style={{borderBottom: '1px solid #e2e8f0', background: '#f1f5f9', color: '#475569', fontSize: '14px'}}>
                <th style={{padding: '16px 24px'}}>Nombre</th>
                <th style={{padding: '16px 24px'}}>Contacto</th>
                <th style={{padding: '16px 24px'}}>Presupuesto</th>
                <th style={{padding: '16px 24px'}}>Registro</th>
                <th style={{padding: '16px 24px'}}>Asesor Asignado</th>
                <th style={{padding: '16px 24px'}}>Estado</th>
                <th style={{padding: '16px 24px'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => (
                <tr key={client.id} style={{borderBottom: '1px solid #e2e8f0'}}>
                  <td style={{padding: '16px 24px', fontWeight: 500, color: '#0f172a'}}>{client.name}</td>
                  <td style={{padding: '16px 24px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#64748b'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Phone size={14}/> {client.phone}</div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Mail size={14}/> {client.email}</div>
                    </div>
                  </td>
                  <td style={{padding: '16px 24px', fontWeight: 600, color: '#10b981'}}>{client.budget}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#64748b'}}>{client.date}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#334155'}}>{client.agent}</td>
                  <td style={{padding: '16px 24px'}}>
                    <span style={{background: client.status === 'Nuevo' ? '#dbeafe' : client.status === 'Negociación' ? '#fef3c7' : '#e0e7ff', color: client.status === 'Nuevo' ? '#2563eb' : client.status === 'Negociación' ? '#d97706' : '#4338ca', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600}}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{padding: '16px 24px'}}>
                    <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '13px'}} onClick={() => setSelectedClient(client)}>
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{padding: '48px', textAlign: 'center', color: '#94a3b8'}}>
            No se encontraron clientes que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDirectoryView;
