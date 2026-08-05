import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Home, 
  UserCircle, 
  Bell, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Zap,
  Send,
  Sparkles,
  AlertTriangle,
  Users,
  Plus,
  X,
  CheckCircle2,
  Share2,
  FileText,
  Calendar,
  MapPin,
  Camera,
  ArrowRight,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

// Fix leaflet icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="background: white; border: 1px solid #ddd; border-radius: 20px; padding: 4px 12px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; color: #222; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">$${(Number(price)/1000000).toFixed(1)}M</div>`,
    iconSize: [70, 30],
    iconAnchor: [35, 15]
  });
};

import { AsesorCRM } from './AsesorCRM';
import { chartData, mockProperties, mockFunnelLeads, zones, propTypes, images, names, stages } from './mockData';

const DashboardView = ({ onNavigate }) => (
  <div className="dashboard-grid animate-fade-in">
    <div className="glass-card kpi-card">
      <span className="kpi-label">Conversión a Visitas</span>
      <span className="kpi-value">28.4%</span>
      <span className="kpi-trend trend-up"><TrendingUp size={16} /> +3.2% este mes</span>
    </div>
    <div className="glass-card kpi-card">
      <span className="kpi-label">Tiempo de Respuesta</span>
      <span className="kpi-value">2m</span>
      <span className="kpi-trend trend-up"><Zap size={16} /> Excelente</span>
    </div>
    <div className="glass-card kpi-card">
      <span className="kpi-label">Negociaciones Activas</span>
      <span className="kpi-value">24</span>
      <span className="kpi-trend trend-up"><TrendingUp size={16} /> +8 vs mes pasado</span>
    </div>
    <div className="glass-card kpi-card">
      <span className="kpi-label">Ventas Dormidas</span>
      <span className="kpi-value" style={{color: 'var(--warning-color)'}}>8</span>
      <span className="kpi-trend trend-down"><Clock size={16} /> Requieren acción (IA)</span>
    </div>

    <div className="glass-card" style={{gridColumn: 'span 8', minHeight: '350px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)'}}>
      <h3 style={{color: 'var(--text-primary)'}}>Embudo Omnicanal (Visitas vs Cierres)</h3>
      <div style={{flex: 1, width: '100%', minHeight: '250px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip contentStyle={{backgroundColor: 'var(--surface-color-solid)', border: 'none', borderRadius: '8px', color: '#fff'}} />
            <Line type="monotone" dataKey="visitas" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} name="Visitas" />
            <Line type="monotone" dataKey="cierres" stroke="#10b981" strokeWidth={3} dot={{r: 4}} name="Cierres" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div className="glass-card" style={{gridColumn: 'span 4', minHeight: '350px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)'}}>
      <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Sparkles size={18} color="var(--primary-color)"/> Tareas Sugeridas por IA</h3>
      
      <div className="ai-suggestion-box">
        <strong>Casa Colonial Coyoacán (Estancada)</strong>
        <p>El precio ($9.2M) está un 12% por encima de los comparables. Sugiero ajuste de ACM.</p>
        <button onClick={() => onNavigate('inventory')} className="btn btn-primary" style={{marginTop: '8px', padding: '4px 12px'}}>Ver Inmueble</button>
      </div>
      
      <div className="ai-suggestion-box" style={{background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)'}}>
        <strong>Juan Pérez (Inactivo 5 días)</strong>
        <p>Visitó el depa en Polanco. ¿Enviamos tour 3D por WhatsApp para re-enganchar?</p>
        <button onClick={() => onNavigate('pipeline')} className="btn btn-secondary" style={{marginTop: '8px', padding: '4px 12px'}}>Ir al Chat</button>
      </div>
    </div>
  </div>
);

const PipelineView = () => {
  const [selectedProperty, setSelectedProperty] = useState('prop-0');
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'incoming', text: 'Hola, vi el anuncio del inmueble. ¿Aún está disponible?', time: 'Ayer' },
    { id: 2, type: 'outgoing', text: '¡Hola! Sí, está disponible. ¿Te gustaría agendar una visita presencial?', time: 'Hoy 10:45 AM' }
  ]);
  
  const [funnel, setFunnel] = useState(mockFunnelLeads);

  const handleSendTemplate = () => {
    setMessages([...messages, { id: Date.now(), type: 'outgoing', text: 'Hola, noté que te interesó la propiedad. Te comparto un recorrido virtual 3D para que la conozcas a detalle desde tu celular: [Enlace]', time: 'Ahora' }]);
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;
    setMessages([...messages, { id: Date.now(), type: 'outgoing', text: chatInput, time: 'Ahora' }]);
    setChatInput('');
  };
  
  const moveLead = (id, newStage, e) => {
    e.stopPropagation();
    setFunnel({ ...funnel, [id]: { ...funnel[id], stage: newStage } });
  };
  
  const handleChatSelect = (id) => {
    setActiveChat(id);
    setMessages([
      { id: 1, type: 'incoming', text: `Hola, me interesa mucho información sobre ${mockProperties.find(p => p.id === selectedProperty)?.title || 'esta propiedad'}.`, time: 'Ayer' },
      { id: 2, type: 'outgoing', text: `¡Claro ${funnel[id].name.split(' ')[0]}! Te comparto la ficha técnica enriquecida.`, time: 'Hace unas horas' }
    ]);
  };

  const stages = [
    { id: 'contacto', label: 'Contacto Inicial', icon: MessageSquare },
    { id: 'visita', label: 'Visitas', icon: Users },
    { id: 'negociacion', label: 'Negociación', icon: CheckCircle2 }
  ];

  const currentLeads = Object.entries(funnel).filter(([_, lead]) => lead.propertyId === selectedProperty);

  return (
    <div className="pipeline-container animate-fade-in" style={{flexDirection: 'column', height: '100%'}}>
      <div style={{padding: 'var(--spacing-md) var(--spacing-lg)', background: 'var(--surface-color)', borderBottom: 'var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px'}}>
        <span style={{fontWeight: 600, color: 'var(--text-muted)'}}>Embudo de Ventas por Inmueble:</span>
        <select 
          value={selectedProperty}
          onChange={(e) => { setSelectedProperty(e.target.value); setActiveChat(null); }}
          style={{background: 'var(--glass-bg)', color: 'white', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '8px', outline: 'none', fontSize: '1rem', cursor: 'pointer', flex: 1}}
        >
          {mockProperties.map(p => (
            <option key={p.id} value={p.id}>{p.title} (${(Number(p.price)/1000000).toFixed(1)}M) - ID: {p.id}</option>
          ))}
        </select>
      </div>

      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <div className="kanban-board" style={{height: '100%', overflowX: 'auto'}}>
          {stages.map(stage => (
            <div key={stage.id} className="kanban-column">
              <div className="kanban-column-header">
                <h4 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <stage.icon size={16}/> {stage.label}
                </h4>
                <span className="badge badge-info">{currentLeads.filter(([_, l]) => l.stage === stage.id).length}</span>
              </div>
              {currentLeads.filter(([_, lead]) => lead.stage === stage.id).map(([id, lead]) => (
                <div key={id} className={`glass-card kanban-card ${lead.alert ? 'alert-border' : ''}`} onClick={() => handleChatSelect(id)} style={{borderColor: activeChat === id ? 'var(--primary-color)' : (lead.alert ? 'var(--warning-color)' : '')}}>
                  <div style={{fontWeight: 600}}>{lead.name}</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>{lead.time}</div>
                  
                  {lead.alert && (
                    <div className="ai-alert alert-warning" style={{marginTop: '12px', padding: '4px 8px', fontSize: '0.75rem'}}>
                      <AlertTriangle size={12}/> Venta estancada. Sugerencia IA: Re-enganchar.
                    </div>
                  )}
                  
                  <div style={{marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="badge badge-success">WhatsApp</span>
                    {stage.id === 'contacto' && (
                      <button onClick={(e) => moveLead(id, 'visita', e)} className="btn btn-primary" style={{padding: '4px 8px', fontSize: '0.75rem'}} title="Avanzar a Visita">
                        <ArrowRight size={14} />
                      </button>
                    )}
                    {stage.id === 'visita' && (
                      <button onClick={(e) => moveLead(id, 'negociacion', e)} className="btn btn-primary" style={{padding: '4px 8px', fontSize: '0.75rem'}} title="Avanzar a Negociación">
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="whatsapp-panel" style={{height: '100%'}}>
          {activeChat && funnel[activeChat] ? (
            <>
              <div className="chat-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                    {funnel[activeChat].name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div style={{fontWeight: 600}}>{funnel[activeChat].name}</div>
                    <div style={{fontSize: '0.75rem', color: 'var(--secondary-color)'}}>En línea - {mockProperties.find(p => p.id === selectedProperty)?.title}</div>
                  </div>
                </div>
              </div>
              
              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`message message-${msg.type}`}>
                    {msg.text}
                    <div style={{fontSize: '0.7rem', color: msg.type === 'incoming' ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)', marginTop: '4px', textAlign: 'right'}}>{msg.time}</div>
                  </div>
                ))}

                {funnel[activeChat].alert && (
                  <div className="ai-suggestion-box" style={{margin: '10px 0'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#10b981'}}>
                      <Sparkles size={14} /> Sugerencia IA de Re-engagement
                    </div>
                    El prospecto lleva varios días inactivo en esta fase. Envía un mensaje con el tour virtual 3D para revivir el interés.
                    <button onClick={handleSendTemplate} className="btn btn-success" style={{marginTop: '8px', fontSize: '0.8rem'}}>Enviar Plantilla (Tour Virtual)</button>
                  </div>
                )}
              </div>
              
              <div className="chat-input-area">
                <div className="chat-input-box">
                  <input 
                    type="text" 
                    placeholder="Escribe un mensaje en WhatsApp..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} style={{background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: '4px'}}>
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)'}}>
              Selecciona un chat del embudo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddPropertyModal = ({ onClose, onAddProperty }) => {
  const [price, setPrice] = useState('15000000');
  const [title, setTitle] = useState('Casa en Jardines del Pedregal');
  
  // Fake ACM Analysis
  const marketAverage = 10500000;
  const difference = ((Number(price) - marketAverage) / marketAverage) * 100;
  const isOverpriced = difference > 10;

  const handlePublish = () => {
    onAddProperty({
      id: 'prop-custom-' + Date.now(),
      title,
      price,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specs: '3 Rec • 2 Baños • 200m²',
      badge: 'Nuevo Ingreso',
      acmStatus: isOverpriced ? 'high' : 'ok',
      diff: difference,
      matchCount: Math.floor(Math.random() * 20) + 1
    });
    onClose();
  };

  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
      <div className="glass-card" style={{width: '700px', maxWidth: '100%', background: 'var(--surface-color-solid)', maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h2 style={{fontSize: '1.5rem'}}>Agregar Inmueble (Ficha Enriquecida)</h2>
          <button onClick={onClose} style={{background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}><X size={24} /></button>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)'}}>Título del Inmueble</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'}} />
          </div>
          
          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{flex: 1}}>
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)'}}>Precio (MXN)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'}} 
              />
            </div>
            <div style={{flex: 1}}>
              <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-secondary)'}}>Recámaras / Baños</label>
              <input type="text" defaultValue="3 Rec, 2 Baños" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'}} />
            </div>
          </div>

          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{flex: 1}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)'}}><Camera size={16}/> Enlace Tour 3D</label>
              <input type="text" placeholder="https://my.matterport.com/show/?m=..." style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'}} />
            </div>
            <div style={{flex: 1}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)'}}><MapPin size={16}/> URL Mapa Interactivo</label>
              <input type="text" placeholder="Enlace de Google Maps" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'}} />
            </div>
          </div>

          {/* AI ACM Widget */}
          <div style={{marginTop: '16px', padding: '16px', borderRadius: '8px', border: isOverpriced ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)', background: isOverpriced ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}}>
            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px', color: isOverpriced ? '#f87171' : '#34d399', marginBottom: '8px'}}>
              <Sparkles size={16} /> ACM Automatizado en Tiempo Real
            </h4>
            <p style={{fontSize: '0.9rem', color: 'var(--text-primary)'}}>
              Promedio de mercado para características similares: <strong>$10,500,000 MXN</strong>.
            </p>
            {isOverpriced ? (
              <p style={{fontSize: '0.85rem', marginTop: '8px', color: '#f87171'}}>
                <AlertTriangle size={14} style={{display: 'inline', verticalAlign: 'middle'}}/> El precio sugerido está un {difference.toFixed(1)}% por encima del mercado.
              </p>
            ) : (
              <p style={{fontSize: '0.85rem', marginTop: '8px', color: '#34d399'}}>
                <CheckCircle2 size={14} style={{display: 'inline', verticalAlign: 'middle'}}/> El precio es competitivo.
              </p>
            )}
          </div>
          
          <div style={{marginTop: '16px'}}>
            <label style={{display: 'block', marginBottom: '12px', fontWeight: 600}}>Difusión Multiportal (Multiposting)</label>
            <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}><input type="checkbox" defaultChecked /> Mercado Libre</label>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}><input type="checkbox" defaultChecked /> Inmuebles24</label>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}><input type="checkbox" defaultChecked /> Propiedades.com</label>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}><input type="checkbox" defaultChecked /> Red MLS Interna</label>
            </div>
          </div>
          
          <div style={{marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '16px'}}>
            <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
            <button onClick={handlePublish} className="btn btn-primary">Publicar Inmueble</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchingModal = ({ onClose, matchCount, propertyTitle }) => (
  <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
    <div className="glass-card animate-fade-in" style={{width: '500px', background: 'var(--surface-color-solid)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 style={{fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px'}}><Sparkles color="var(--primary-color)" /> Resultados Motor Matching</h2>
        <button onClick={onClose} style={{background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}><X size={24} /></button>
      </div>
      <p style={{marginBottom: '16px', color: 'var(--text-secondary)'}}>Hemos analizado nuestra base de datos y la Red MLS. Encontramos <strong>{matchCount} prospectos</strong> con alta afinidad para <em>{propertyTitle}</em>.</p>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto'}}>
        {Array.from({length: Math.min(matchCount, 8)}).map((_, i) => {
          const fakeNames = ["Carlos Slim", "Emilio Azcárraga", "María Asunción", "Ricardo Salinas", "Empresa ABC S.A. de C.V.", "Inmobiliaria Global", "Desarrollos XYZ"];
          const affinity = 99 - (i * 2);
          return (
            <div key={i} style={{background: 'var(--surface-color)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: 600}}>{fakeNames[i % fakeNames.length]}</div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Inversión preaprobada</div>
              </div>
              <span className="badge badge-success">{affinity}% Afinidad</span>
            </div>
          )
        })}
        {matchCount > 8 && (
          <div style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '8px'}}>
            + {matchCount - 8} prospectos adicionales
          </div>
        )}
      </div>
      <button onClick={() => {alert('Notificaciones enviadas a los prospectos compatibles.'); onClose();}} className="btn btn-primary" style={{width: '100%', marginTop: '24px'}}>Notificar a Prospectos (WhatsApp & Email)</button>
    </div>
  </div>
);

const InventoryView = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [matchData, setMatchData] = useState({ count: 0, title: '' });
  
  const [properties, setProperties] = useState(mockProperties);

  const handleAddProperty = (newProp) => {
    setProperties([ { ...newProp, stagnant: false }, ...properties ]);
  };

  const handleOpenMatching = (count, title) => {
    setMatchData({ count, title });
    setShowMatchingModal(true);
  };

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 var(--spacing-xl) var(--spacing-md)'}}>
        <div style={{color: 'var(--text-secondary)'}}>
          Mostrando <strong>{properties.length}</strong> inmuebles en catálogo
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} /> Nueva Propiedad
        </button>
      </div>

      <div className="inventory-grid animate-fade-in" style={{paddingTop: 0}}>
        {properties.map(prop => (
          <div key={prop.id} className="glass-card property-card">
            <div className="property-image" style={{backgroundImage: `url(${prop.image})`}}>
              <div style={{position: 'absolute', top: 12, right: 12}}>
                <span className={`badge ${prop.badge === 'Nuevo Ingreso' ? 'badge-info' : (prop.badge === 'Destacada' ? 'badge-warning' : 'badge-success')}`} style={{background: 'rgba(0,0,0,0.7)'}}>{prop.badge}</span>
              </div>
            </div>
            <div className="property-details">
              <h3 style={{fontSize: '1.25rem'}}>{prop.title}</h3>
              <div className="property-price">${Number(prop.price).toLocaleString()} MXN</div>
              <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{prop.specs}</div>
              
              {prop.stagnant && (
                <div className="ai-alert alert-warning" style={{flexDirection: 'column'}}>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <AlertTriangle size={16} style={{minWidth: '16px', marginTop: '2px'}} />
                    <div>
                      <strong>Alerta de Estancamiento</strong>
                      <div style={{marginTop: '4px'}}>Bajo volumen de visitas.</div>
                    </div>
                  </div>
                  <button onClick={() => alert('Generando campaña de email marketing y ajuste de precios sugerido...')} className="btn btn-secondary" style={{padding: '4px', fontSize: '0.75rem', marginTop: '8px'}}>Generar Estrategia de IA</button>
                </div>
              )}

              {!prop.stagnant && prop.acmStatus === 'ok' && (
                <div className="ai-alert" style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399'}}>
                  <CheckCircle2 size={16} style={{minWidth: '16px', marginTop: '2px'}} />
                  <div>
                    <strong>ACM Óptimo</strong>
                    <div style={{marginTop: '4px'}}>Precio muy competitivo para la zona.</div>
                  </div>
                </div>
              )}

              {!prop.stagnant && prop.acmStatus === 'high' && (
                <div className="ai-alert alert-warning">
                  <AlertTriangle size={16} style={{minWidth: '16px', marginTop: '2px'}} />
                  <div>
                    <strong>Alerta de Precio</strong>
                    <div style={{marginTop: '4px'}}>El precio está un {prop.diff?.toFixed(1) || 15}% por encima del mercado.</div>
                  </div>
                </div>
              )}
              
              <div style={{marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <button onClick={() => handleOpenMatching(prop.matchCount, prop.title)} className="btn btn-primary" style={{width: '100%'}}><Sparkles size={16} /> Motor Matching ({prop.matchCount})</button>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button onClick={() => alert('Propiedad compartida con la Red MLS para split de comisiones. Ahora visible para todos los asesores de la red.')} className="btn btn-secondary" style={{flex: 1, padding: '8px', fontSize: '0.8rem'}}><Share2 size={14}/> Compartir en MLS</button>
                  <button onClick={() => alert('PDF Flyer interactivo con código QR y branding generado con éxito.')} className="btn btn-secondary" style={{flex: 1, padding: '8px', fontSize: '0.8rem'}}><FileText size={14}/> PDF Flyer</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddPropertyModal onClose={() => setShowAddModal(false)} onAddProperty={handleAddProperty} />}
      {showMatchingModal && <MatchingModal onClose={() => setShowMatchingModal(false)} matchCount={matchData.count} propertyTitle={matchData.title} />}
    </div>
  );
};

const ClientPortalView = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  const handleSearch = () => {
    if(!searchTerm) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  const recommendedProps = mockProperties.slice(0, 5);
  const similarProps = mockProperties.slice(5, 10);

  const renderPropertyCard = (prop, affinity) => {
    const isDiscount = Math.random() > 0.5;
    const oldPrice = Number(prop.price) * 1.15;
    return (
      <div key={prop.id} onClick={() => { setSelectedProperty(prop); setCurrentImgIndex(0); }} className="animate-fade-in" style={{background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(0,0,0,.12)', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'box-shadow .2s ease-out', borderBottom: '1px solid #e6e6e6'}}>
        <div style={{position: 'relative'}}>
          <img src={prop.image} alt="Property" style={{width: '100%', height: '224px', objectFit: 'cover'}} />
          <div style={{position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '6px', borderRadius: '50%'}}>
             <Sparkles size={14} />
          </div>
        </div>
        <div style={{padding: '16px', flex: 1, display: 'flex', flexDirection: 'column'}}>
          {isDiscount && <div style={{fontSize: '0.85rem', color: '#999', textDecoration: 'line-through'}}>${(oldPrice/1000000).toFixed(1)}M</div>}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 400, color: '#333'}}>${(Number(prop.price)/1000000).toFixed(1)}M</div>
            {isDiscount && <span style={{color: '#00a650', fontSize: '0.85rem'}}>15% OFF</span>}
          </div>
          
          <div style={{color: '#00a650', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px'}}>
            Visita guiada <span style={{fontStyle: 'italic', fontWeight: 900}}>FULL</span> <Zap size={12} fill="#00a650" color="#00a650"/>
          </div>
          
          <h3 style={{fontSize: '0.9rem', color: '#666', marginBottom: '4px', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{prop.title}</h3>
          <p style={{color: '#999', fontSize: '0.8rem'}}>{prop.specs}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ebebeb', margin: 0, overflowY: 'auto'}}>
      
      {/* ML Header */}
      <header style={{background: '#0f172a', padding: '12px 0', borderBottom: '1px solid #1e293b'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '12px'}}>
            <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', height: '40px'}}>
              <img src="/3r_gris_transparente.png" alt="3R Connect" style={{height: '100%', objectFit: 'contain'}} />
            </a>
            
            <div style={{flex: 1, position: 'relative', display: 'flex', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)', borderRadius: '2px', background: 'white'}}>
              <input 
                type="text" 
                placeholder="Busca inmuebles, zonas, constructoras y más..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{width: '100%', padding: '10px 48px 10px 16px', borderRadius: '2px', border: 'none', outline: 'none', fontSize: '16px'}}
              />
              <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #e6e6e6', background: 'white', borderTopRightRadius: '2px', borderBottomRightRadius: '2px', cursor: 'pointer'}} onClick={handleSearch}>
                <span style={{fontSize: '18px'}}>🔍</span>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', fontSize: '14px', color: '#f8fafc'}}>
              <a href="/admin" style={{color: '#f8fafc', textDecoration: 'none'}}>Portal Asesores</a>
            </div>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#f8fafc'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}}>
              <MapPin size={20} color="#f8fafc"/> <div><span style={{fontSize: '11px', color: '#94a3b8'}}>Ingresa tu</span><br/><span style={{fontWeight: 400}}>ubicación</span></div>
            </div>
            <div style={{display: 'flex', gap: '20px', color: '#94a3b8'}}>
              <span style={{cursor: 'pointer', color: '#f8fafc'}}>Categorías ▾</span>
              <span style={{cursor: 'pointer'}}>Ofertas</span>
              <span style={{cursor: 'pointer'}}>Historial</span>
              <span style={{cursor: 'pointer'}}>Vender mi inmueble</span>
              <span style={{cursor: 'pointer'}}>Ayuda / PQR</span>
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
              <span style={{cursor: 'pointer'}}>Crea tu cuenta</span>
              <span style={{cursor: 'pointer'}}>Ingresa</span>
              <span style={{cursor: 'pointer'}}>Mis citas</span>
            </div>
          </div>
        </div>
      </header>

      <div style={{flex: 1, padding: '40px 0', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '100%', maxWidth: '1200px', padding: '0 16px'}}>
          
          {isSearching ? (
            <div style={{textAlign: 'center', padding: '60px', color: '#666', background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,.12)'}}>
              <Sparkles size={40} className="animate-spin" style={{margin: '0 auto 16px', color: '#3483fa'}}/>
              <h2 style={{fontSize: '24px', fontWeight: 300, color: '#333', marginBottom: '8px'}}>Procesando tus preferencias con IA...</h2>
              <p>Buscando las mejores opciones en nuestra red.</p>
            </div>
          ) : (
            <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <h2 style={{fontSize: '24px', color: '#666', fontWeight: 300}}>Basado en tu última búsqueda</h2>
                  <a href="#" style={{color: '#3483fa', fontSize: '14px', textDecoration: 'none'}}>Ver historial</a>
                </div>
                <div style={{display: 'flex', background: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e6e6e6'}}>
                  <button onClick={() => setViewMode('grid')} style={{padding: '8px 16px', border: 'none', background: viewMode === 'grid' ? '#ebebeb' : 'white', color: viewMode === 'grid' ? '#333' : '#999', cursor: 'pointer', fontWeight: 600}}>Cuadrícula</button>
                  <button onClick={() => setViewMode('map')} style={{padding: '8px 16px', border: 'none', borderLeft: '1px solid #e6e6e6', background: viewMode === 'map' ? '#ebebeb' : 'white', color: viewMode === 'map' ? '#333' : '#999', cursor: 'pointer', fontWeight: 600}}>Mapa Interactivo</button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(224px, 1fr))', gap: '16px', marginBottom: '48px'}}>
                    {recommendedProps.map((prop, i) => renderPropertyCard(prop, 98 - i))}
                  </div>

                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                    <h2 style={{fontSize: '24px', color: '#666', fontWeight: 300}}>Ofertas de Inversión</h2>
                    <a href="#" style={{color: '#3483fa', fontSize: '14px', textDecoration: 'none'}}>Ver todas</a>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(224px, 1fr))', gap: '16px', marginBottom: '48px'}}>
                    {similarProps.map((prop, i) => renderPropertyCard(prop, 85 - i))}
                  </div>
                </>
              ) : (
                <div style={{display: 'flex', height: 'calc(100vh - 180px)', margin: '0 -16px', borderTop: '1px solid #e6e6e6'}}>
                  {/* Left Column (List) */}
                  <div style={{flex: '0 0 60%', overflowY: 'auto', padding: '24px 16px', background: '#ebebeb'}}>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
                      {[...recommendedProps, ...similarProps].map((prop, i) => renderPropertyCard(prop, 99 - i))}
                    </div>
                  </div>
                  
                  {/* Right Column (Map) */}
                  <div style={{flex: '1', position: 'relative', background: '#e5e3df'}}>
                    <MapContainer center={[19.4326, -99.1332]} zoom={12} style={{height: '100%', width: '100%'}}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {[...recommendedProps, ...similarProps].map((prop) => (
                        <Marker key={prop.id} position={[prop.lat, prop.lng]} icon={createPriceIcon(prop.price)}>
                          <Popup className="custom-airbnb-popup">
                            <div style={{position: 'relative', cursor: 'pointer', background: 'white'}} onClick={() => setSelectedProperty(prop)}>
                              {/* Top Action Buttons */}
                              <div style={{position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10}}>
                                <div style={{width: '32px', height: '32px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'rgba(0,0,0,0.5)', height: '16px', width: '16px', stroke: 'white', strokeWidth: '2'}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                                </div>
                                {/* Close Button */}
                                <div style={{width: '32px', height: '32px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: '#222', strokeWidth: '4'}}><path d="m6 6 20 20M26 6 6 26"></path></svg>
                                </div>
                              </div>
                              
                              {/* Image Carousel Mock */}
                              <div style={{position: 'relative'}}>
                                <img src={prop.image} style={{width: '100%', height: '220px', objectFit: 'cover', display: 'block'}} />
                                <div style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '28px', height: '28px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10}}>
                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: '#222', strokeWidth: '4'}}><path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                                </div>
                                <div style={{position: 'absolute', bottom: '12px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 10}}>
                                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'white'}}></div>
                                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)'}}></div>
                                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)'}}></div>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div style={{padding: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                                  <h3 style={{margin: 0, fontSize: '15px', fontWeight: 600, color: '#222', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{prop.title}</h3>
                                  <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#222'}}>
                                    <span style={{fontSize: '12px'}}>★</span>
                                    <span>5.0 (9)</span>
                                  </div>
                                </div>
                                <div style={{color: '#717171', fontSize: '15px', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{prop.specs}</div>
                                <div style={{color: '#717171', fontSize: '15px', marginBottom: '8px'}}>Disponibilidad Inmediata</div>
                                <div style={{fontSize: '15px', color: '#222', marginBottom: '8px'}}>
                                  <span style={{fontWeight: 600}}>${(Number(prop.price)/1000000).toFixed(1)}M COP</span>
                                </div>
                                <div style={{display: 'inline-block', background: '#e6f4ea', color: '#00a650', fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px'}}>
                                  Visita guiada GRATIS
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ML Style Property Detail Modal */}
      {selectedProperty && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
          <div className="animate-fade-in" style={{width: '1000px', maxWidth: '100%', maxHeight: '90vh', background: 'white', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            
            <div style={{position: 'relative', height: '400px', background: '#f5f5f5', flexShrink: 0, display: 'flex', justifyContent: 'center'}}>
              <img 
                src={[selectedProperty.image, images[(images.indexOf(selectedProperty.image) + 1) % images.length], images[(images.indexOf(selectedProperty.image) + 2) % images.length]][currentImgIndex]} 
                alt="Property Gallery" 
                style={{height: '100%', objectFit: 'contain', boxShadow: '0 0 15px rgba(0,0,0,0.1)'}} 
              />
              <button onClick={() => setSelectedProperty(null)} style={{position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.1)', color: '#333', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', zIndex: 10}}><X size={24}/></button>
              
              <button onClick={() => setCurrentImgIndex((prev) => (prev - 1 + 3) % 3)} style={{position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'white', color: '#3483fa', border: 'none', borderRadius: '50%', width: '48px', height: '48px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>‹</button>
              <button onClick={() => setCurrentImgIndex((prev) => (prev + 1) % 3)} style={{position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'white', color: '#3483fa', border: 'none', borderRadius: '50%', width: '48px', height: '48px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>›</button>
            </div>
            
            <div style={{padding: '32px', overflowY: 'auto', display: 'flex', gap: '32px'}}>
              
              <div style={{flex: 2}}>
                <div style={{color: '#999', fontSize: '14px', marginBottom: '8px'}}>Nuevo | 239 vendidos en esta zona</div>
                <h2 style={{fontSize: '22px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: 1.2}}>{selectedProperty.title} - {selectedProperty.specs}</h2>
                <div style={{color: '#3483fa', fontSize: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                   ★★★★☆ (24)
                </div>

                <h3 style={{fontSize: '20px', fontWeight: 400, color: '#333', marginBottom: '16px'}}>Descripción</h3>
                <p style={{color: '#666', lineHeight: '1.4', fontSize: '16px'}}>
                  Espectacular propiedad con acabados de lujo, excelente iluminación natural y espacios de concepto abierto. Ubicada estratégicamente en una zona de alta plusvalía, ofreciendo seguridad 24/7, amenidades exclusivas (gym, alberca, roof garden) y acceso inmediato a vías principales.
                </p>

                {/* Smart Investment Stats Widget ML Style */}
                <div style={{marginTop: '32px', padding: '20px', background: 'white', borderRadius: '4px', border: '1px solid #e6e6e6'}}>
                  <h4 style={{fontSize: '18px', fontWeight: 400, color: '#333', marginBottom: '16px'}}>Inteligencia de Inversión</h4>
                  <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                    <div style={{flex: 1, minWidth: '150px'}}>
                      <div style={{color: '#666', fontSize: '14px', marginBottom: '4px'}}>Plusvalía Estimada (3 años)</div>
                      <div style={{fontSize: '24px', fontWeight: 400, color: '#00a650'}}>+18.5%</div>
                    </div>
                    <div style={{flex: 1, minWidth: '150px'}}>
                      <div style={{color: '#666', fontSize: '14px', marginBottom: '4px'}}>Nivel de Demanda</div>
                      <div style={{fontSize: '24px', fontWeight: 400, color: '#ff7733'}}>Alta</div>
                    </div>
                    <div style={{flex: 1, minWidth: '150px'}}>
                      <div style={{color: '#666', fontSize: '14px', marginBottom: '4px'}}>Precio vs Mercado</div>
                      <div style={{fontSize: '24px', fontWeight: 400, color: '#3483fa'}}>-4.2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{flex: 1, border: '1px solid #e6e6e6', borderRadius: '8px', padding: '24px'}}>
                <div style={{fontSize: '36px', fontWeight: 300, color: '#333', marginBottom: '4px'}}>${(Number(selectedProperty.price)/1000000).toFixed(1)}M</div>
                <div style={{fontSize: '16px', color: '#333', marginBottom: '24px'}}>en <span style={{color: '#00a650'}}>240x ${(Number(selectedProperty.price)/240/1000).toFixed(1)}k sin interés</span></div>

                <div style={{color: '#00a650', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <Zap size={18} fill="#00a650"/> Visita guiada <span style={{fontStyle: 'italic', fontWeight: 900}}>FULL</span>
                </div>
                <div style={{color: '#999', fontSize: '14px', marginBottom: '24px'}}>Conoce la propiedad hoy mismo. <span style={{color: '#3483fa', cursor: 'pointer'}}>Ver beneficios</span></div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <button onClick={() => { setSelectedProperty(null); setShowCalendar(true); }} style={{width: '100%', background: '#3483fa', color: 'white', border: 'none', padding: '16px', borderRadius: '6px', fontWeight: 600, fontSize: '16px', cursor: 'pointer', transition: 'background .2s'}}>
                    Agendar Visita
                  </button>
                  <button onClick={() => { alert('Iniciando chat seguro con tu asesor...'); }} style={{width: '100%', background: 'rgba(65,137,230,.15)', color: '#3483fa', border: 'none', padding: '16px', borderRadius: '6px', fontWeight: 600, fontSize: '16px', cursor: 'pointer'}}>
                    Preguntar a un Asesor
                  </button>
                </div>

                <div style={{marginTop: '24px', fontSize: '14px', color: '#999', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{color: '#3483fa'}}>Compra Protegida</span>, recibe el título o te devolvemos tu dinero.
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
          <div style={{width: '400px', background: 'white', borderRadius: '4px', padding: '24px', boxShadow: '0 1px 2px 0 rgba(0,0,0,.12)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h3 style={{color: '#333', fontSize: '20px', fontWeight: 400, margin: 0}}>Selecciona Fecha y Hora</h3>
              <button onClick={() => setShowCalendar(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#999'}}><X size={24}/></button>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '16px'}}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => <div key={day} style={{fontWeight: 600, color: '#999', fontSize: '14px'}}>{day}</div>)}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} style={{padding: '8px 0', borderRadius: '50%', background: i===14 ? '#3483fa' : 'transparent', color: i===14 ? 'white' : '#333', cursor: 'pointer', fontWeight: i===14 ? 600: 400}}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{borderTop: '1px solid #e6e6e6', paddingTop: '16px', marginBottom: '24px'}}>
              <p style={{fontWeight: 400, color: '#333', marginBottom: '12px', fontSize: '16px'}}>Horarios Disponibles</p>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {['10:00 AM', '11:30 AM', '04:00 PM'].map(time => (
                  <div key={time} style={{padding: '8px 16px', border: '1px solid #e6e6e6', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', color: '#333'}}>{time}</div>
                ))}
              </div>
            </div>
            <button onClick={() => {alert('Visita agendada con éxito. Se ha enviado una notificación a tu asesor.'); setShowCalendar(false);}} style={{width: '100%', background: '#3483fa', color: 'white', border: 'none', padding: '16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'}}>Confirmar Cita</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminView = () => (
  <div className="dashboard-grid animate-fade-in">
    <div className="glass-card kpi-card">
      <span className="kpi-label">Facturación Global (Mes)</span>
      <span className="kpi-value">$2.4M</span>
      <span className="kpi-trend trend-up"><TrendingUp size={16} /> +12% vs mes pasado</span>
    </div>
    <div className="glass-card kpi-card">
      <span className="kpi-label">Inmuebles Activos</span>
      <span className="kpi-value">540</span>
      <span className="kpi-trend trend-up"><Home size={16} /> +15 nuevos hoy</span>
    </div>
    <div className="glass-card kpi-card">
      <span className="kpi-label">Asesores Activos</span>
      <span className="kpi-value">32</span>
      <span className="kpi-trend trend-up"><Users size={16} /> 100% de retención</span>
    </div>
    
    <div className="glass-card" style={{gridColumn: 'span 12', marginTop: 'var(--spacing-lg)'}}>
      <h3>Ranking de Asesores (Top 3)</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px'}}>
        <div style={{background: 'var(--surface-color)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div><strong>1. Laura Martínez</strong><div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>12 cierres este mes</div></div>
          <span className="badge badge-success" style={{fontSize: '1rem'}}>$450k Comisiones</span>
        </div>
        <div style={{background: 'var(--surface-color)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div><strong>2. Carlos Ruiz</strong><div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>8 cierres este mes</div></div>
          <span className="badge badge-success" style={{fontSize: '1rem'}}>$310k Comisiones</span>
        </div>
        <div style={{background: 'var(--surface-color)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div><strong>3. Asesor Premium (Tú)</strong><div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>5 cierres este mes</div></div>
          <span className="badge badge-info" style={{fontSize: '1rem'}}>$180k Comisiones</span>
        </div>
      </div>
    </div>
  </div>
);

const LoginView = ({ onLogin }) => (
  <div style={{display: 'flex', height: '100vh', background: '#0f172a', alignItems: 'center', justifyContent: 'center'}}>
    <div className="glass-card animate-fade-in" style={{width: '400px', padding: '40px', textAlign: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
        <div style={{width: 64, height: 64, background: 'linear-gradient(135deg, var(--primary-color), #2563eb)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Sparkles size={32} color="white" />
        </div>
      </div>
      <h2 style={{color: 'white', marginBottom: '8px'}}>3R Connect CRM</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '32px'}}>Selecciona tu perfil para ingresar al área segura.</p>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <button onClick={() => onLogin('admin')} className="btn btn-secondary" style={{padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', fontSize: '1rem'}}>
          <LayoutDashboard size={20} /> Administrador (Agencia)
        </button>
        <button onClick={() => onLogin('asesor')} className="btn btn-primary" style={{padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', fontSize: '1rem'}}>
          <UserCircle size={20} /> Asesor (Agente)
        </button>
      </div>
      
      <div style={{marginTop: '32px', fontSize: '0.85rem'}}>
        <a href="/" style={{color: 'var(--text-secondary)', textDecoration: 'underline'}}>Ir a la vista de cliente final (Portal B2C)</a>
      </div>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentEntity, setCurrentEntity] = useState({ type: 'property-list' });
  const [userRole, setUserRole] = useState(null);

  // Simple pseudo-router
  const isClientRoute = window.location.pathname === '/' || window.location.pathname === '';
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  if (isClientRoute) {
    return <ClientPortalView />;
  }

  if (isAdminRoute && !userRole) {
    return <LoginView onLogin={setUserRole} />;
  }

  const renderView = () => {
    if (userRole === 'admin') return <AdminView />;
    
    switch (currentView) {
      case 'dashboard': return <DashboardView onNavigate={(view) => {
        if(view === 'pipeline' || view === 'inventory') {
          setCurrentView('crm');
          setCurrentEntity({ type: 'property-list' });
        } else {
          setCurrentView(view);
        }
      }} />;
      case 'crm': return <AsesorCRM currentEntity={currentEntity} setCurrentEntity={setCurrentEntity} />;
      default: return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-container" style={{ zoom: '0.8', width: '125vw', height: '125vh' }}>
      <aside className="sidebar">
        <div className="sidebar-logo" style={{justifyContent: 'center', padding: 'var(--spacing-xl) 0'}}>
          <img src="/3r_gris_transparente.png" alt="3R Logo" style={{height: '64px', objectFit: 'contain'}} />
        </div>

        <nav style={{marginTop: 'var(--spacing-xl)', flex: 1}}>
          {userRole === 'admin' ? (
            <div className="nav-item active">
              <LayoutDashboard size={20} />
              <span style={{fontWeight: 500}}>Dashboard Global</span>
            </div>
          ) : (
            <>
              <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
                <LayoutDashboard size={20} />
                <span style={{fontWeight: 500}}>Mis Métricas</span>
              </div>
              <div className={`nav-item ${currentView === 'crm' && currentEntity.type !== 'calendar' ? 'active' : ''}`} onClick={() => { setCurrentView('crm'); setCurrentEntity({ type: 'property-list' }); }}>
                <Users size={20} />
                <span style={{fontWeight: 500}}>CRM & Embudo</span>
              </div>
              <div className={`nav-item ${currentView === 'crm' && currentEntity.type === 'calendar' ? 'active' : ''}`} onClick={() => { setCurrentView('crm'); setCurrentEntity({ type: 'calendar' }); }}>
                <Calendar size={20} />
                <span style={{fontWeight: 500}}>Agenda General</span>
              </div>
            </>
          )}
        </nav>
        
        <div style={{padding: 'var(--spacing-xl)', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
            <div style={{width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <UserCircle size={24} color="#94a3b8" />
            </div>
            <div>
              <div style={{fontWeight: 600, color: 'white'}}>{userRole === 'admin' ? 'Administrador' : 'Asesor Premium'}</div>
              <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{userRole === 'admin' ? 'Broker / Director' : 'agencia@3rconnect.com'}</div>
            </div>
          </div>
          <button onClick={() => setUserRole(null)} className="btn btn-secondary" style={{width: '100%', fontSize: '0.8rem', padding: '8px', color: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)'}}>Cerrar Sesión</button>
        </div>
      </aside>

      <main className="main-content">
        <header style={{background: '#0f172a', padding: '12px 0', borderBottom: '1px solid #1e293b'}}>
          <div style={{padding: '0 32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '12px'}}>
              <div style={{flex: 1, position: 'relative', maxWidth: '600px'}}>
                <input 
                  type="text" 
                  placeholder="Busca clientes, folios de citas, inmuebles..." 
                  style={{width: '100%', padding: '10px 16px', borderRadius: '4px', border: 'none', outline: 'none', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)'}}
                />
                <button style={{position: 'absolute', right: 0, top: 0, bottom: 0, background: 'white', border: 'none', borderLeft: '1px solid #e6e6e6', padding: '0 12px', cursor: 'pointer', borderTopRightRadius: '4px', borderBottomRightRadius: '4px'}}>
                  <Search size={18} color="#666"/>
                </button>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '24px', color: 'white', fontSize: '14px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: 32, height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <UserCircle size={20} color="white" />
                  </div>
                  <div>
                    <div style={{fontWeight: 600}}>{userRole === 'admin' ? 'Administrador' : 'Asesor Premium'}</div>
                  </div>
                </div>
                
                <div style={{position: 'relative', cursor: 'pointer'}}>
                  <Bell size={20} color="white" />
                  <span style={{position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: '#ef4444', borderRadius: '50%'}}></span>
                </div>
                
                <button onClick={() => alert(`Demo interactivo v1.0.`)} className="btn btn-primary" style={{padding: '6px 16px', fontSize: '0.85rem'}}>
                  <Sparkles size={14} /> Modo Demo Activo
                </button>
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <MapPin size={16} /> 
                <div style={{display: 'flex', flexDirection: 'column', lineHeight: 1.1}}>
                  <span style={{fontSize: '0.7rem'}}>Sede actual</span>
                  <span style={{color: 'white'}}>Oficina Polanco</span>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
                <span style={{cursor: 'pointer', transition: 'color .2s'}} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Inmuebles Captados</span>
                <span style={{cursor: 'pointer', transition: 'color .2s'}} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Clientes Activos</span>
                <span style={{cursor: 'pointer', transition: 'color .2s'}} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Cierres del Mes</span>
                <span style={{cursor: 'pointer', transition: 'color .2s'}} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Ayuda / Soporte Asesores</span>
              </div>
              
              <div style={{display: 'flex', gap: '16px', alignItems: 'center', color: 'white'}}>
                <span style={{cursor: 'pointer'}} onClick={() => setUserRole(null)}>Cerrar Sesión</span>
                <span style={{cursor: 'pointer'}}>Mi Perfil</span>
                <span style={{cursor: 'pointer'}}>Notificaciones</span>
              </div>
            </div>
          </div>
        </header>

        <div style={{padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto'}}>
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
