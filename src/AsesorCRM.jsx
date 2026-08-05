import React, { useState } from 'react';
import { 
  Search, KanbanSquare, Users, Home, Calendar, Clock, MapPin, 
  ChevronRight, Phone, MessageSquare, ArrowLeft, Plus, Send, X,
  Star, Eye, Heart, TrendingUp, Sparkles, CheckCircle2
} from 'lucide-react';
import { mockProperties, mockFunnelLeads, mockAppointments, stages } from './mockData';

export const AsesorCRM = ({ currentEntity, setCurrentEntity }) => {
  // Enrutador interno basado en currentEntity
  // currentEntity: { type: 'property-list' | 'funnel' | 'client', id?: string }

  const handleNavigate = (type, id = null) => {
    setCurrentEntity({ type, id });
  };

  if (currentEntity.type === 'property-list') {
    return <PropertyListView onNavigate={handleNavigate} />;
  }
  if (currentEntity.type === 'funnel') {
    return <FunnelView propertyId={currentEntity.id} onNavigate={handleNavigate} />;
  }
  if (currentEntity.type === 'client') {
    return <Client360View clientId={currentEntity.id} onNavigate={handleNavigate} />;
  }
  if (currentEntity.type === 'calendar') {
    return <CalendarView onNavigate={handleNavigate} />;
  }

  return <div>Vista no encontrada</div>;
};

const PropertyListView = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProps = mockProperties.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{margin: 0, fontSize: '24px'}}>Mis Inmuebles Asignados</h2>
        <div style={{position: 'relative', width: '300px'}}>
          <Search size={18} style={{position: 'absolute', left: '12px', top: '10px', color: '#999'}} />
          <input 
            type="text" 
            placeholder="Buscar por zona, título..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid #e6e6e6', outline: 'none', color: '#333'}}
          />
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px'}}>
        {filteredProps.map(prop => (
          <div key={prop.id} onClick={() => onNavigate('funnel', prop.id)} style={{background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e6e6e6', cursor: 'pointer', transition: 'box-shadow 0.2s'}} onMouseOver={(e) => e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow='none'}>
            <div style={{height: '140px', background: `url(${prop.image}) center/cover`}}></div>
            <div style={{padding: '16px'}}>
              <h3 style={{margin: '0 0 8px 0', fontSize: '16px'}}>{prop.title}</h3>
              <div style={{color: '#666', fontSize: '14px', marginBottom: '12px'}}>{prop.specs}</div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 'bold', color: '#333'}}>${(Number(prop.price)/1000000).toFixed(1)}M</span>
                <span style={{background: '#eef2ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500}}>Ver Embudo</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PropertyFunnelSummary = ({ propertyId, onNavigate, onStageClick, isPrimary }) => {
  const property = mockProperties.find(p => p.id === propertyId);
  const propLeads = Object.values(mockFunnelLeads).filter(l => l.propertyId === propertyId);

  return (
    <>
      {/* Panel Izquierdo: Info del Inmueble */}
      <div style={{width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {isPrimary && (
          <button onClick={() => onNavigate('property-list')} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#666', padding: 0}}>
            <ArrowLeft size={16} /> Volver a mis inmuebles
          </button>
        )}
        
        <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e6e6e6', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
          <div style={{position: 'relative'}}>
            <div style={{height: '200px', background: `url(${property?.image}) center/cover`}}></div>
            <div style={{position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', color: '#f59e0b', padding: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <Star size={14} fill="#f59e0b" /> Alta Demanda
            </div>
            <div style={{position: 'absolute', top: 12, left: 12, background: '#00a650', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              Activo
            </div>
          </div>
          <div style={{padding: '24px'}}>
            <div style={{color: '#999', fontSize: '12px', marginBottom: '8px'}}>ID: {property?.id} • 14 días en mercado</div>
            <h2 style={{margin: '0 0 8px 0', fontSize: '20px', color: '#333'}}>{property?.title}</h2>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '16px'}}>${(Number(property?.price || 0)/1000000).toFixed(1)}M</div>
            <div style={{color: '#666', fontSize: '14px', marginBottom: '16px'}}>{property?.specs}</div>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px', marginBottom: '24px'}}>
              <MapPin size={16} /> {property?.title.includes('Polanco') ? 'Miguel Hidalgo, CDMX' : 'Interlomas, Estado de México'}
            </div>

            {/* Estadísticas Rápidas */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px'}}>
              <div style={{background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e6e6e6'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '12px', marginBottom: '4px'}}>
                  <Eye size={14} /> Vistas
                </div>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#333'}}>1,248</div>
              </div>
              <div style={{background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e6e6e6'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '12px', marginBottom: '4px'}}>
                  <Heart size={14} /> Favoritos
                </div>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#333'}}>86</div>
              </div>
            </div>

            {/* AI Insights */}
            <div style={{background: 'linear-gradient(to right, rgba(52, 131, 250, 0.1), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(52, 131, 250, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#3483fa', fontWeight: 'bold', marginBottom: '8px'}}>
                <Sparkles size={14} /> AI Match Score: 92%
              </div>
              <p style={{margin: 0, color: '#666'}}>El precio está un 5% por debajo del promedio en la zona. Altísima probabilidad de cierre en los próximos 15 días.</p>
            </div>

            <button style={{width: '100%', padding: '10px', background: '#3483fa', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', transition: 'background 0.2s'}} onMouseOver={(e)=>e.target.style.background='#2968c8'} onMouseOut={(e)=>e.target.style.background='#3483fa'}>
              Editar Inmueble
            </button>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Resumen Embudo */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h2 style={{margin: 0, fontSize: '24px'}}>Rendimiento del Embudo</h2>
          {!isPrimary && (
            <button onClick={() => onNavigate('funnel', propertyId)} style={{padding: '8px 16px', background: '#e1f5fe', color: '#0284c7', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
              Abrir este Embudo <ChevronRight size={16} />
            </button>
          )}
        </div>
        <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e6e6e6', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
          <h3 style={{margin: '0 0 24px 0', fontSize: '18px', color: '#333'}}>Etapas de Venta</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {stages.map(stage => {
              const count = propLeads.filter(l => l.stage === stage).length;
              const stageNames = { contacto: 'Leads Nuevos', visita: 'Visitas / Interesados', negociacion: 'En Negociación' };
              const stageColors = { contacto: '#3b82f6', visita: '#f59e0b', negociacion: '#10b981' };
              
              return (
                <div 
                  key={stage} 
                  onClick={() => onStageClick(stage)}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e6e6e6', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', background: '#f8fafc'}}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor=stageColors[stage]; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)' }} 
                  onMouseOut={(e) => { e.currentTarget.style.borderColor='#e6e6e6'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '50%', background: `${stageColors[stage]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Users size={24} color={stageColors[stage]} />
                    </div>
                    <div style={{fontSize: '16px', fontWeight: 600, color: '#333'}}>{stageNames[stage]}</div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#111'}}>{count}</div>
                    <ChevronRight size={20} color="#999" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const StageTablePanel = ({ stage, propertyId, onClientClick }) => {
  const propLeads = Object.values(mockFunnelLeads).filter(l => l.propertyId === propertyId && l.stage === stage);
  
  return (
    <div style={{flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #e6e6e6', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingLeft: '56px'}}>
        <h3 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Users size={20} /> 
          Clientes en etapa: <span style={{textTransform: 'capitalize'}}>{stage}</span>
        </h3>
      </div>
      
      <div style={{flex: 1, overflowY: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #eee', textAlign: 'left', color: '#666'}}>
              <th style={{padding: '12px'}}>Nombre del Cliente</th>
              <th style={{padding: '12px'}}>Presupuesto</th>
              <th style={{padding: '12px'}}>Último Contacto</th>
              <th style={{padding: '12px'}}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {propLeads.map(lead => (
              <tr key={lead.id} style={{borderBottom: '1px solid #eee', cursor: 'pointer'}} onClick={() => onClientClick(lead.id)} onMouseOver={(e) => e.currentTarget.style.background='#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background='transparent'}>
                <td style={{padding: '16px 12px', fontWeight: 500, color: '#333'}}>{lead.name}</td>
                <td style={{padding: '16px 12px', color: '#666'}}>{lead.budget}</td>
                <td style={{padding: '16px 12px', color: '#666'}}>{lead.time}</td>
                <td style={{padding: '16px 12px'}}>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#3483fa', fontWeight: 500}}>
                    Abrir Perfil 360 <ChevronRight size={16} />
                  </span>
                </td>
              </tr>
            ))}
            {propLeads.length === 0 && (
              <tr><td colSpan="4" style={{padding: '24px', textAlign: 'center', color: '#999'}}>No hay clientes en esta etapa.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FunnelView = ({ propertyId, onNavigate }) => {  
  const [panels, setPanels] = useState([{ type: 'property', id: propertyId, isPrimary: true }]);

  const pushPanel = (panel) => {
    setPanels(prev => [...prev, panel]);
  };

  const popPanel = () => {
    if (panels.length > 1) {
      setPanels(prev => prev.slice(0, prev.length - 1));
    }
  };
  
  const popTo = (index) => {
    setPanels(prev => prev.slice(0, index + 1));
  };

  const translateX = `-${(panels.length - 1) * 100}%`;

  return (
    <div style={{width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}}>
      
      {panels.length > 1 && (
        <button 
          onClick={popPanel} 
          style={{
            position: 'absolute', top: '50%', left: '24px', transform: 'translateY(-50%)', 
            width: '48px', height: '48px', borderRadius: '50%', background: 'white', border: '1px solid #e6e6e6', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', zIndex: 50, color: '#3483fa', transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)' }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          <ArrowLeft size={24} />
        </button>
      )}

      <div style={{
          display: 'flex', 
          width: '100%', 
          height: '100%', 
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
          transform: `translateX(${translateX})`
        }}>
        
        {panels.map((panel, idx) => (
          <div key={`${panel.type}-${panel.id}-${idx}`} style={{flex: '0 0 100%', paddingRight: '24px', display: 'flex', flexDirection: panel.type === 'property' ? 'row' : 'column', gap: '24px', alignItems: panel.type === 'property' ? 'flex-start' : 'stretch'}}>
            {panel.type === 'property' && (
              <PropertyFunnelSummary 
                propertyId={panel.id} 
                onNavigate={onNavigate} 
                onStageClick={(stage) => {
                  popTo(idx);
                  pushPanel({ type: 'stage', id: stage, propertyId: panel.id });
                }} 
                isPrimary={panel.isPrimary}
              />
            )}
            {panel.type === 'stage' && (
              <StageTablePanel 
                stage={panel.id} 
                propertyId={panel.propertyId} 
                onClientClick={(clientId) => {
                  popTo(idx);
                  pushPanel({ type: 'client', id: clientId });
                }}
              />
            )}
            {panel.type === 'client' && (
              <Client360View 
                clientId={panel.id} 
                onNavigate={onNavigate} 
                onBack={popPanel} 
                isEmbedded={true}
                onPropertyClick={(propId) => {
                  popTo(idx);
                  pushPanel({ type: 'property', id: propId, isPrimary: false });
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Client360View = ({ clientId, onNavigate, onBack, isEmbedded, onPropertyClick }) => {
  const lead = mockFunnelLeads[clientId];
  if (!lead) return <div>Cliente no encontrado</div>;
  
  const leadProperty = mockProperties.find(p => p.id === lead.propertyId);
  const [localApts, setLocalApts] = useState(mockAppointments.filter(a => a.leadId === clientId));
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hola, vi el inmueble en el portal y me gustaría saber si el precio es negociable.', sender: 'client', time: 'Ayer' },
    { id: 2, text: `¡Hola ${lead.name.split(' ')[0]}! Soy tu asesor asignado. El precio puede tener un margen, ¿te gustaría agendar una visita para conocerlo?`, sender: 'agent', time: 'Ayer' }
  ]);
  const [inputText, setInputText] = useState('');
  
  // Modals state
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProps, setSelectedProps] = useState([]);
  
  const [showAptModal, setShowAptModal] = useState(false);
  const [aptDate, setAptDate] = useState('');
  const [aptTime, setAptTime] = useState('');
  const [aptType, setAptType] = useState('presencial');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      text: inputText,
      sender: 'agent',
      time: 'Ahora'
    }]);
    setInputText('');
  };

  const handleSendCollection = () => {
    if (selectedProps.length === 0) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      text: `¡Hola! Te he preparado una colección con ${selectedProps.length} propiedades que encajan con tu perfil. ¡Haz clic para verlas!`,
      sender: 'agent',
      time: 'Ahora',
      attachments: selectedProps
    }]);
    setShowPropertyModal(false);
    setSelectedProps([]);
  };

  const handleScheduleApt = () => {
    if (!aptDate || !aptTime) return;
    const newApt = {
      id: Date.now(),
      leadId: clientId,
      propertyId: lead.propertyId,
      date: `${aptDate}T${aptTime}:00`,
      title: `Cita ${aptType} - ${lead.name}`
    };
    setLocalApts([...localApts, newApt]);
    setShowAptModal(false);
    setAptDate('');
    setAptTime('');
  };

  return (
    <div style={{display: 'flex', height: '100%', gap: '24px', position: 'relative'}}>
      {/* Panel Izquierdo: Perfil y Grafo */}
      <div style={{flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px'}}>
        
        {!isEmbedded && (
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#666'}} onClick={onBack || (() => onNavigate('funnel', lead.propertyId))}>
            <ArrowLeft size={16} /> Volver al Embudo
          </div>
        )}
        
        {/* Info Principal */}
        <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e6e6e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
            <div style={{width: '64px', height: '64px', background: '#3483fa', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold'}}>
              {lead.name.charAt(0)}
            </div>
            <div>
              <h2 style={{margin: '0 0 4px 0', fontSize: '24px', color: '#333'}}>{lead.name}</h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#666'}}>
                <Phone size={14} /> {lead.phone}
              </div>
            </div>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
            <div style={{background: '#f8fafc', padding: '12px', borderRadius: '8px'}}>
              <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Presupuesto</div>
              <div style={{fontSize: '16px', fontWeight: 600, color: '#333'}}>{lead.budget}</div>
            </div>
            <div style={{background: '#f8fafc', padding: '12px', borderRadius: '8px'}}>
              <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Etapa Actual</div>
              <div style={{fontSize: '16px', fontWeight: 600, color: '#333', textTransform: 'capitalize'}}>{lead.stage}</div>
            </div>
          </div>
          
          <div>
            <div style={{fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px'}}>Notas del Asesor</div>
            <div style={{fontSize: '14px', color: '#666', background: '#fffbeb', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #f59e0b'}}>
              {lead.notes}
            </div>
          </div>
        </div>

        {/* Grafo: Inmuebles de Interés */}
        <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e6e6e6'}}>
          <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Home size={18} /> Inmuebles de Interés ({lead.interestedProperties?.length || 1})
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {(lead.interestedProperties || [lead.propertyId]).map(id => {
              const p = mockProperties.find(x => x.id === id);
              if (!p) return null;
              return (
                <div 
                  key={id}
                  onClick={() => onPropertyClick ? onPropertyClick(p.id) : onNavigate('funnel', p.id)}
                  style={{display: 'flex', gap: '16px', padding: '12px', border: '1px solid #e6e6e6', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', position: 'relative'}}
                  onMouseOver={(e) => e.currentTarget.style.background='#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background='transparent'}
                >
                  {id === lead.propertyId && (
                    <div style={{position: 'absolute', top: '-8px', right: '-8px', background: '#f59e0b', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                      Principal
                    </div>
                  )}
                  <div style={{width: '80px', height: '60px', background: `url(${p.image}) center/cover`, borderRadius: '4px'}}></div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 600, color: '#333', marginBottom: '4px'}}>{p.title}</div>
                    <div style={{color: '#3483fa', fontSize: '14px', fontWeight: 500}}>${(Number(p.price)/1000000).toFixed(1)}M</div>
                  </div>
                  <ChevronRight size={20} color="#999" style={{alignSelf: 'center'}} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Grafo: Citas */}
        <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e6e6e6'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h3 style={{margin: 0, fontSize: '18px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Calendar size={18} /> Citas
            </h3>
            <button onClick={() => setShowAptModal(true)} style={{background: 'none', border: 'none', color: '#3483fa', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <Plus size={16} /> Agendar
            </button>
          </div>
          
          {localApts.length > 0 ? localApts.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(apt => (
            <div key={apt.id} onClick={() => onNavigate('calendar')} style={{padding: '12px', background: '#f8fafc', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px'}}>
              <div style={{fontWeight: 600, color: '#333', marginBottom: '4px'}}>{new Date(apt.date).toLocaleString()}</div>
              <div style={{fontSize: '14px', color: '#666'}}>{apt.title}</div>
            </div>
          )) : (
            <div style={{fontSize: '14px', color: '#999'}}>No hay citas registradas.</div>
          )}
        </div>
      </div>

      {/* Panel Derecho: WhatsApp Simulator */}
      <div style={{flex: 1, background: '#efeae2', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e6e6e6', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
        <div style={{background: '#075e54', padding: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '40px', height: '40px', background: 'white', color: '#075e54', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
            {lead.name.charAt(0)}
          </div>
          <div>
            <div style={{fontWeight: 600, fontSize: '16px'}}>{lead.name}</div>
            <div style={{fontSize: '12px', opacity: 0.8}}>en línea</div>
          </div>
        </div>
        
        <div style={{flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{alignSelf: 'center', background: '#e1f5fe', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', color: '#333'}}>
            Ayer
          </div>
          {chatMessages.map(msg => (
            <div key={msg.id} style={{
              alignSelf: msg.sender === 'agent' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'agent' ? '#dcf8c6' : 'white',
              padding: '12px 16px',
              borderRadius: msg.sender === 'agent' ? '12px 0 12px 12px' : '0 12px 12px 12px',
              maxWidth: '80%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <div style={{fontSize: '14px', color: '#333', lineHeight: 1.4}}>{msg.text}</div>
              
              {msg.attachments && msg.attachments.length > 0 && (
                <div style={{marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 'bold', color: '#075e54', fontSize: '13px'}}>
                    <Home size={14} /> Colección de Inmuebles ({msg.attachments.length})
                  </div>
                  <div style={{display: 'flex', gap: '8px', overflowX: 'auto'}}>
                    {msg.attachments.map(propId => {
                      const p = mockProperties.find(x => x.id === propId);
                      if (!p) return null;
                      return (
                        <div key={propId} style={{width: '120px', flexShrink: 0, background: 'white', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e6e6e6', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                          <div style={{height: '80px', background: `url(${p.image}) center/cover`}}></div>
                          <div style={{padding: '8px'}}>
                            <div style={{fontSize: '11px', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{p.title}</div>
                            <div style={{fontSize: '12px', color: '#3483fa', fontWeight: 'bold'}}>${(Number(p.price)/1000000).toFixed(1)}M</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{background: '#f0f0f0', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center'}}>
          <button 
            onClick={() => setShowPropertyModal(true)}
            style={{width: '40px', height: '40px', borderRadius: '50%', background: 'white', color: '#54656f', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s'}}
            onMouseOver={(e)=>e.currentTarget.style.background='#e5e5e5'} onMouseOut={(e)=>e.currentTarget.style.background='white'}
            title="Adjuntar Inmuebles"
          >
            <Plus size={24} />
          </button>
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{flex: 1, padding: '12px 16px', borderRadius: '24px', border: 'none', outline: 'none', fontSize: '15px'}} 
          />
          <button onClick={handleSendMessage} style={{width: '48px', height: '48px', borderRadius: '50%', background: '#00a884', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <Send size={20} style={{marginLeft: '4px'}} />
          </button>
        </div>
      </div>

      {/* Appointment Modal */}
      {showAptModal && (
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
            <h3 style={{margin: '0 0 24px 0', fontSize: '20px', color: '#333'}}>Agendar Nueva Cita</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px'}}>Tipo de Cita</label>
                <select value={aptType} onChange={(e) => setAptType(e.target.value)} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e6e6e6', outline: 'none'}}>
                  <option value="presencial">Presencial (Visita al inmueble)</option>
                  <option value="virtual">Virtual (Videollamada)</option>
                  <option value="telefonica">Llamada Telefónica</option>
                </select>
              </div>
              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px'}}>Fecha</label>
                  <input type="date" value={aptDate} onChange={(e) => setAptDate(e.target.value)} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e6e6e6', outline: 'none'}} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px'}}>Hora</label>
                  <input type="time" value={aptTime} onChange={(e) => setAptTime(e.target.value)} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e6e6e6', outline: 'none'}} />
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
              <button onClick={() => setShowAptModal(false)} style={{padding: '10px 16px', background: 'white', border: '1px solid #e6e6e6', borderRadius: '8px', color: '#666', fontWeight: 600, cursor: 'pointer'}}>Cancelar</button>
              <button onClick={handleScheduleApt} disabled={!aptDate || !aptTime} style={{padding: '10px 16px', background: '#3483fa', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer', opacity: (!aptDate || !aptTime) ? 0.5 : 1}}>
                Guardar Cita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Selection Modal */}
      {showPropertyModal && (
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', borderRadius: '16px', width: '600px', maxHeight: '80%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden'}}>
            
            <div style={{padding: '24px', borderBottom: '1px solid #e6e6e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{margin: 0, fontSize: '20px', color: '#333'}}>Colección de Inmuebles</h3>
              <button onClick={() => setShowPropertyModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#999'}}><X size={24} /></button>
            </div>
            
            <div style={{padding: '16px 24px', borderBottom: '1px solid #e6e6e6', background: '#f8fafc'}}>
              <div style={{position: 'relative'}}>
                <Search size={18} color="#999" style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}} />
                <input 
                  type="text" 
                  placeholder="Buscar por ID, zona o título..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid #e6e6e6', outline: 'none', fontSize: '15px'}} 
                />
              </div>
            </div>

            <div style={{flex: 1, overflowY: 'auto', padding: '16px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {mockProperties.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      if (selectedProps.includes(p.id)) {
                        setSelectedProps(selectedProps.filter(id => id !== p.id));
                      } else {
                        setSelectedProps([...selectedProps, p.id]);
                      }
                    }}
                    style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: `2px solid ${selectedProps.includes(p.id) ? '#3483fa' : '#e6e6e6'}`, borderRadius: '8px', cursor: 'pointer', background: selectedProps.includes(p.id) ? '#eff6ff' : 'white', transition: 'all 0.2s'}}
                  >
                    <div style={{width: '24px', height: '24px', borderRadius: '4px', border: `1px solid ${selectedProps.includes(p.id) ? '#3483fa' : '#ccc'}`, background: selectedProps.includes(p.id) ? '#3483fa' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      {selectedProps.includes(p.id) && <div style={{color: 'white'}}>✓</div>}
                    </div>
                    <div style={{width: '60px', height: '48px', borderRadius: '4px', background: `url(${p.image}) center/cover`}}></div>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, color: '#333', fontSize: '14px', marginBottom: '4px'}}>{p.title}</div>
                      <div style={{color: '#666', fontSize: '12px'}}>{p.specs}</div>
                    </div>
                    <div style={{fontWeight: 'bold', color: '#3483fa'}}>${(Number(p.price)/1000000).toFixed(1)}M</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{padding: '24px', borderTop: '1px solid #e6e6e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc'}}>
              <div style={{color: '#666', fontSize: '14px'}}>
                <span style={{fontWeight: 'bold', color: '#333'}}>{selectedProps.length}</span> inmuebles seleccionados
              </div>
              <button 
                onClick={handleSendCollection}
                disabled={selectedProps.length === 0}
                style={{padding: '12px 24px', background: '#00a884', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: selectedProps.length === 0 ? 0.5 : 1}}
              >
                <Send size={18} /> Enviar al Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarView = ({ onNavigate }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <h2 style={{margin: '0 0 24px 0', fontSize: '24px'}}>Agenda General de Citas</h2>
      <div style={{flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #e6e6e6', padding: '24px', overflowY: 'auto'}}>
        <div style={{display: 'flex', gap: '24px'}}>
          {/* Falso Calendario Mensual a la izquierda */}
          <div style={{width: '300px'}}>
            <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: '#333'}}>Agosto 2026</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center'}}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => <div key={day} style={{fontWeight: 600, color: '#999', fontSize: '14px'}}>{day}</div>)}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} style={{padding: '8px 0', borderRadius: '50%', background: i===14 ? '#3483fa' : 'transparent', color: i===14 ? 'white' : '#333', fontWeight: i===14 ? 600: 400}}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Lista de citas próximas */}
          <div style={{flex: 1, borderLeft: '1px solid #e6e6e6', paddingLeft: '24px'}}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#333'}}>Próximas Citas (Grafo Conectado)</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {mockAppointments.slice(0,10).sort((a,b) => new Date(a.date) - new Date(b.date)).map(apt => (
                <div key={apt.id} style={{display: 'flex', padding: '16px', border: '1px solid #e6e6e6', borderRadius: '8px', alignItems: 'center', gap: '16px'}}>
                  <div style={{width: '60px', textAlign: 'center', borderRight: '1px solid #e6e6e6', paddingRight: '16px'}}>
                    <div style={{fontSize: '12px', color: '#666', textTransform: 'uppercase'}}>{new Date(apt.date).toLocaleDateString('es-ES', {weekday: 'short'})}</div>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#3483fa'}}>{new Date(apt.date).getDate()}</div>
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 600, color: '#333', fontSize: '16px', marginBottom: '4px'}}>{apt.title}</div>
                    <div style={{color: '#666', fontSize: '14px'}}>{new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                  <button 
                    onClick={() => onNavigate('client', apt.leadId)}
                    style={{padding: '8px 16px', background: '#f8fafc', color: '#3483fa', border: '1px solid #e6e6e6', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}
                  >
                    Ver Cliente <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
