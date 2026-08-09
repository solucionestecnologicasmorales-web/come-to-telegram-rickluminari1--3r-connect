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
  Search,
  Settings,
  LogOut,
  ChevronDown,
  Phone,
  BarChart3,
  Rocket,
  Target,
  Activity,
  Megaphone,
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
import AdminCRMView from './components/pages/AdminCRMView';
import AdminInventoryView from './components/pages/AdminInventoryView';
import { chartData, mockProperties, mockFunnelLeads, zones, propTypes, images, names, stages } from './mockData';

import Sidebar from './components/globals/Sidebar';
import AcademyView from './components/pages/AcademyView';
import CalendarSimulationView from './components/pages/CalendarSimulationView';
import CampaignManagerView from './components/pages/CampaignManagerView';
import ClientDirectoryView from './components/pages/ClientDirectoryView';
import EmailCenterView from './components/pages/EmailCenterView';
import InventoryView from './components/pages/InventoryView';
import OpsDirectoryView from './components/pages/OpsDirectoryView';
import PdfViewerView from './components/pages/PdfViewerView';
import PqrDashboardView from './components/pages/PqrDashboardView';
import AgentProfileView from './components/pages/AgentProfileView';
import SalesClosingsView from './components/pages/SalesClosingsView';
import HelpCenterView from './components/pages/HelpCenterView';
import PropertyPromotionView from './components/pages/PropertyPromotionView';
import AiRecommendationsView from './components/pages/AiRecommendationsView';
import OwnersDirectoryView from './components/pages/OwnersDirectoryView';
import TaskResolutionView from './components/pages/TaskResolutionView';
import TeamDirectoryView from './components/pages/TeamDirectoryView';
import AppointmentDetailsView from './components/pages/AppointmentDetailsView';

const DashboardView = ({ onNavigate }) => {
  const [showPenalty, setShowPenalty] = useState(true);
  return (
  <div className="dashboard-grid animate-fade-in">
    {showPenalty && (
      <div className="glass-card" style={{gridColumn: 'span 12', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px'}}>
        <AlertTriangle size={24} color="#ef4444" />
        <div>
          <h4 style={{margin: 0, color: '#ef4444', fontSize: '16px'}}>Alerta de Penalización: Tareas Vencidas</h4>
          <p style={{margin: '4px 0 0 0', color: '#b91c1c', fontSize: '14px'}}>Tienes 3 tareas de seguimiento con más de 24 horas de retraso. Esto ha impactado negativamente tu "Calidad de Seguimiento IA". Tu posición en el ranking general podría bajar.</p>
        </div>
        <button onClick={() => { onNavigate('ai-assistant'); setShowPenalty(false); }} style={{marginLeft: 'auto', background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}>Resolver ahora</button>
      </div>
    )}

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
        <button onClick={() => onNavigate('funnel', 'prop-0')} className="btn btn-primary" style={{marginTop: '8px', padding: '4px 12px'}}>Ver Inmueble</button>
      </div>
      
      <div className="ai-suggestion-box" style={{background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)'}}>
        <strong>Juan Pérez (Inactivo 5 días)</strong>
        <p>Visitó el depa en Polanco. ¿Enviamos tour 3D por WhatsApp para re-enganchar?</p>
        <button onClick={() => onNavigate('client', 'lead-1')} className="btn btn-secondary" style={{marginTop: '8px', padding: '4px 12px'}}>Ir al Chat</button>
      </div>
    </div>
  </div>
  );
};

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
            <a href="#" onClick={() => window.location.hash = ''} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', height: '40px'}}>
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
              <a href="#admin" onClick={() => { window.location.hash = 'admin'; window.location.reload(); }} style={{color: '#f8fafc', textDecoration: 'none'}}>Portal Asesores</a>
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
  <div className="dashboard-grid animate-fade-in" style={{gap: '24px'}}>
    
    {/* Header / Title */}
    <div style={{gridColumn: 'span 12', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
      <div>
        <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Activity size={28} color="#2563eb" /> Centro de Mando Global
        </h2>
        <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Monitorea el rendimiento de tu agencia impulsado por Inteligencia Artificial.</p>
      </div>
      <div style={{background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#10b981'}}></div>
        Sistema Operativo Normal
      </div>
    </div>

    {/* AI Super KPIs */}
    <div className="glass-card" style={{gridColumn: 'span 3', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', border: 'none', position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1}}><TrendingUp size={120} /></div>
      <span style={{fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Facturación (Mes)</span>
      <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: 'white'}}>$2.4M</div>
      <span style={{fontSize: '13px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600}}><TrendingUp size={16} /> +12% vs mes pasado</span>
    </div>

    <div className="glass-card" style={{gridColumn: 'span 3', borderTop: '4px solid #8b5cf6', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Ahorro de Tiempo IA</span>
        <div style={{background: '#f3e8ff', padding: '6px', borderRadius: '8px'}}><Clock size={18} color="#8b5cf6" /></div>
      </div>
      <div style={{fontSize: '32px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>120h</div>
      <span style={{fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600}}><TrendingUp size={16} /> 4h promedio por asesor</span>
    </div>

    <div className="glass-card" style={{gridColumn: 'span 3', borderTop: '4px solid #f59e0b', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Leads por Promoción IA</span>
        <div style={{background: '#fef3c7', padding: '6px', borderRadius: '8px'}}><Rocket size={18} color="#f59e0b" /></div>
      </div>
      <div style={{fontSize: '32px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>+450</div>
      <span style={{fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600}}><TrendingUp size={16} /> Campañas auto-generadas</span>
    </div>

    <div className="glass-card" style={{gridColumn: 'span 3', borderTop: '4px solid #3b82f6', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Matches (Cierre Rápido)</span>
        <div style={{background: '#dbeafe', padding: '6px', borderRadius: '8px'}}><Target size={18} color="#3b82f6" /></div>
      </div>
      <div style={{fontSize: '32px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>18%</div>
      <span style={{fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600}}><TrendingUp size={16} /> Aumento en prop. directas</span>
    </div>
    
    {/* Lower Section Grid */}
    <div style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Activity Stream */}
      <div className="glass-card" style={{flex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
          <h3 style={{margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px'}}><Zap size={20} color="#eab308" /> Actividad IA Reciente</h3>
          <button style={{background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: '13px'}}>Ver todo el registro</button>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{display: 'flex', gap: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Calendar size={18} color="#8b5cf6" />
            </div>
            <div>
              <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Agenda Optimizada Automáticamente</div>
              <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>La IA de Carlos Ruiz reacomodó 3 reuniones (Ahorro est. 1.5h de traslado).</div>
              <div style={{fontSize: '11px', color: '#94a3b8', marginTop: '6px'}}>Hace 5 min</div>
            </div>
          </div>

          <div style={{display: 'flex', gap: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Send size={18} color="#3b82f6" />
            </div>
            <div>
              <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Propuesta Masiva Enviada (Match 98%)</div>
              <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Asesor Premium envió mensaje sugerido por IA a 3 clientes potenciales para 'Casa en Coyoacán'.</div>
              <div style={{fontSize: '11px', color: '#94a3b8', marginTop: '6px'}}>Hace 12 min</div>
            </div>
          </div>

          <div style={{display: 'flex', gap: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Megaphone size={18} color="#f59e0b" />
            </div>
            <div>
              <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Campaña de Ads Activada</div>
              <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Laura Martínez aprobó el copy generado por IA para 'Depto Lujo en Polanco' (FB & IG).</div>
              <div style={{fontSize: '11px', color: '#94a3b8', marginTop: '6px'}}>Hace 25 min</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Agents Ranking */}
    <div className="glass-card" style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{margin: '0 0 20px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Users size={20} color="#10b981" /> 
        Top Asesores (Uso de IA)
      </h3>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <div style={{background: 'linear-gradient(to right, #f8fafc, #ffffff)', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: '#10b981'}}></div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white'}}>1</div>
              <strong style={{fontSize: '15px', color: '#0f172a'}}>Laura Martínez</strong>
            </div>
            <span style={{fontSize: '14px', fontWeight: 700, color: '#10b981'}}>$450k</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b'}}>
            <Sparkles size={12} color="#8b5cf6" /> 95% adopción de IA (Nivel Experto)
          </div>
        </div>

        <div style={{background: 'linear-gradient(to right, #f8fafc, #ffffff)', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: '#3b82f6'}}></div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white'}}>2</div>
              <strong style={{fontSize: '15px', color: '#0f172a'}}>Carlos Ruiz</strong>
            </div>
            <span style={{fontSize: '14px', fontWeight: 700, color: '#3b82f6'}}>$310k</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b'}}>
            <Sparkles size={12} color="#8b5cf6" /> 82% adopción de IA (Nivel Avanzado)
          </div>
        </div>

        <div style={{background: 'linear-gradient(to right, #f8fafc, #ffffff)', border: '1px solid #8b5cf6', padding: '16px', borderRadius: '12px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'}}>
          <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: '#8b5cf6'}}></div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white'}}>3</div>
              <strong style={{fontSize: '15px', color: '#0f172a'}}>Asesor Premium (Tú)</strong>
            </div>
            <span style={{fontSize: '14px', fontWeight: 700, color: '#8b5cf6'}}>$180k</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b'}}>
            <Sparkles size={12} color="#8b5cf6" /> 100% adopción (Pionero IA)
          </div>
        </div>
        
        <button style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px dashed #cbd5e1', background: 'transparent', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
          <BarChart3 size={16} /> Ver reporte completo
        </button>
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
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }} style={{color: 'var(--text-secondary)', textDecoration: 'underline'}}>Ir a la vista de cliente final (Portal B2C)</a>
      </div>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentEntity, setCurrentEntity] = useState({ type: 'property-list' });
  const [userRole, setUserRole] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getSearchResults = () => {
    if (globalSearchTerm.length < 2) return [];
    
    const term = globalSearchTerm.toLowerCase();
    const results = [];
    
    mockProperties.forEach(prop => {
      const title = prop?.title || '';
      if (title.toLowerCase().includes(term)) {
        results.push({ type: 'property', id: prop.id, title: title, subtitle: title, image: prop?.image });
      }
    });
    
    Object.values(mockFunnelLeads).forEach(lead => {
      const name = lead?.name || '';
      const email = lead?.email || '';
      const phone = lead?.phone || '';
      if (name.toLowerCase().includes(term) || phone.includes(term) || email.toLowerCase().includes(term)) {
        results.push({ type: 'client', id: lead.id, title: name, subtitle: email });
      }
    });
    
    if ('cita'.includes(term) || 'folio'.includes(term)) {
      results.push({ type: 'calendar', id: 'cal-1', title: 'Cita con prospecto', subtitle: 'Folio: 001' });
    }
    
    return results.slice(0, 6);
  };
  
  const searchResults = getSearchResults();

  const handleGlobalSearch = (result) => {
    if (result && result.type) {
       if (result.type === 'calendar') {
         setCurrentEntity({ type: 'calendar', id: result.id });
         setCurrentView('appointment-details');
       } else if (result.type === 'property') {
         setCurrentEntity({ type: 'funnel', id: result.id });
         setCurrentView('crm');
       } else if (result.type === 'client') {
         setCurrentEntity({ type: 'client', id: result.id });
         setCurrentView('crm');
       }
       setGlobalSearchTerm('');
       setIsSearchFocused(false);
    } else if (searchResults.length > 0) {
       handleGlobalSearch(searchResults[0]);
    }
  };

  // Simple pseudo-router compatible with GitHub Pages subpaths
  const isAdminRoute = window.location.pathname.includes('/admin') || window.location.hash.includes('#admin');
  const isClientRoute = !isAdminRoute;

  if (isClientRoute) {
    return <ClientPortalView />;
  }

  if (isAdminRoute && !userRole) {
    return <LoginView onLogin={setUserRole} />;
  }

  const renderView = () => {
    if (userRole === 'admin') {
      switch (currentView) {
        case 'admin-dashboard': return <AdminView />;
        case 'team-directory': return <TeamDirectoryView />;
        case 'commercial-ops': return <OpsDirectoryView />;
        case 'admin-crm': return <AdminCRMView />;
        case 'admin-inventory': return <AdminInventoryView />;
        default: return <AdminView />;
      }
    }
    
    switch (currentView) {
      case 'dashboard': return <DashboardView onNavigate={(view, id) => {
        if(view === 'pipeline') {
          setCurrentView('crm');
          setCurrentEntity({ type: 'property-list' });
        } else if (view === 'funnel') {
          setCurrentView('crm');
          setCurrentEntity({ type: 'funnel', id: id || 'prop-0' });
        } else if (view === 'client') {
          setCurrentView('crm');
          setCurrentEntity({ type: 'client', id: id || 'lead-1' });
        } else if (view === 'task-resolution') {
          setCurrentView('task-resolution');
        } else if (view === 'campaign-manager') {
          setCurrentView('campaign-manager');
        } else {
          setCurrentView(view);
        }
      }} />;
      case 'crm': return <AsesorCRM currentEntity={currentEntity} setCurrentEntity={setCurrentEntity} setCurrentView={setCurrentView} />;
      case 'inventory': return <InventoryView />;
      case 'academy': return <AcademyView />;
      case 'client-directory': return <ClientDirectoryView setCurrentView={setCurrentView} currentEntity={currentEntity} setCurrentEntity={setCurrentEntity} />;
      case 'calendar-sim': return <CalendarSimulationView />;
      case 'task-resolution': return <TaskResolutionView 
        onBack={() => setCurrentView('dashboard')}
        onResolve={(leadId) => {
          setCurrentEntity({ type: 'client', id: leadId });
          setCurrentView('crm');
        }} 
      />;
      case 'pdf-viewer': return <PdfViewerView />;
      case 'pqr-dashboard': return <PqrDashboardView />;
      case 'email-center': return <EmailCenterView onBack={() => setCurrentView('crm')} />;
      case 'campaign-manager': return <CampaignManagerView onBack={() => setCurrentView('dashboard')} />;
      case 'appointment-details': return <AppointmentDetailsView 
        appointmentId={currentEntity.id} 
        onNavigate={(view, id) => {
          if (view === 'client') {
             setCurrentEntity({ type: 'client', id: id });
             setCurrentView('crm');
          } else {
             setCurrentView(view);
          }
        }} 
        onBack={() => setCurrentView('dashboard')} 
      />;
      case 'profile': return <AgentProfileView />;
      case 'sales-closings': return <SalesClosingsView />;
      case 'help-center': return <HelpCenterView />;
      case 'property-promotion': return <PropertyPromotionView />;
      case 'ai-assistant': return <AiRecommendationsView />;
      case 'owners-directory': return <OwnersDirectoryView />;
      default: return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-container" style={{ zoom: '0.8', width: '125vw', height: '125vh' }}>
      <Sidebar 
        userRole={userRole} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        currentEntity={currentEntity} 
        setCurrentEntity={setCurrentEntity} 
        setUserRole={setUserRole} 
      />

      <main className="main-content">
        <header style={{background: '#0f172a', padding: '12px 0', borderBottom: '1px solid #1e293b'}}>
          <div style={{padding: '0 32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '12px'}}>
              <div style={{flex: 1, position: 'relative', maxWidth: '600px'}}>
                <input 
                  type="text" 
                  value={globalSearchTerm}
                  onChange={(e) => setGlobalSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGlobalSearch()}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Busca clientes, folios de citas, inmuebles..." 
                  style={{width: '100%', padding: '10px 16px', borderRadius: '4px', border: 'none', outline: 'none', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)'}}
                />
                <button onClick={() => handleGlobalSearch()} style={{position: 'absolute', right: 0, top: 0, bottom: 0, background: 'white', border: 'none', borderLeft: '1px solid #e6e6e6', padding: '0 12px', cursor: 'pointer', borderTopRightRadius: '4px', borderBottomRightRadius: '4px'}}>
                  <Search size={18} color="#666"/>
                </button>
                
                {isSearchFocused && globalSearchTerm.length >= 2 && (
                  <div style={{position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', zIndex: 50, marginTop: '4px', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
                    {searchResults.length > 0 ? searchResults.map((res, i) => (
                      <div key={i} onMouseDown={(e) => { e.preventDefault(); handleGlobalSearch(res); }} style={{padding: '12px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{width: '40px', height: '40px', borderRadius: res.type === 'property' ? '4px' : '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0}}>
                          {res.image ? (
                            <img src={res.image} alt={res.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            res.type === 'client' ? <UserCircle size={20} color="#64748b" /> : <Calendar size={20} color="#64748b" />
                          )}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{res.title}</span>
                          <span style={{fontSize: '0.75rem', color: '#64748b'}}>{res.type === 'client' ? 'Cliente' : res.type === 'property' ? 'Inmueble' : 'Agenda'} • {res.subtitle}</span>
                        </div>
                      </div>
                    )) : (
                      <div style={{padding: '12px 16px', color: '#64748b', fontSize: '0.9rem'}}>No se encontraron resultados</div>
                    )}
                  </div>
                )}
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
              
              <div style={{display: 'flex', gap: '16px', alignItems: 'center', color: 'white'}}>
                <button style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center'}} onClick={() => alert('Notificaciones...')}>
                  <Bell size={20} />
                </button>
                <div style={{position: 'relative'}}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', color: 'white', border: '2px solid transparent', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
                      transition: 'border 0.2s'
                    }}
                    onMouseOver={e=>e.currentTarget.style.border='2px solid rgba(255,255,255,0.5)'}
                    onMouseOut={e=>e.currentTarget.style.border='2px solid transparent'}
                  >
                    L
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <>
                      {/* Invisible overlay to close dropdown when clicking outside */}
                      <div style={{position: 'fixed', inset: 0, zIndex: 99}} onClick={() => setShowProfileMenu(false)}></div>
                      
                      <div style={{
                        position: 'absolute', top: '100%', right: '0', marginTop: '12px', width: '320px', background: 'white', 
                        borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)', zIndex: 100, overflow: 'hidden',
                        border: '1px solid #e2e8f0', color: '#0f172a'
                      }}>
                        {/* Google style bubble */}
                        <div style={{padding: '24px 20px', display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid #e2e8f0'}}>
                          <div style={{width: '56px', height: '56px', borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold'}}>
                            L
                          </div>
                          <div>
                            <div style={{fontWeight: 600, fontSize: '16px'}}>Luis Morales</div>
                            <div style={{fontSize: '13px', color: '#64748b'}}>luis.morales@3rconnect.com</div>
                            <div style={{fontSize: '12px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginTop: '4px', fontWeight: 600}}>
                              Asesor Premium
                            </div>
                          </div>
                        </div>

                        {/* Administrar tu cuenta */}
                        <div style={{padding: '12px', borderBottom: '1px solid #e2e8f0'}}>
                          <button 
                            onClick={() => { setShowProfileMenu(false); setCurrentView('profile'); }}
                            style={{width: '100%', padding: '10px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer', transition: 'background 0.2s'}}
                            onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='white'}
                          >
                            Administrar tu Cuenta
                          </button>
                        </div>

                        {/* Menu Options */}
                        <div style={{padding: '8px 0'}}>
                          {[
                            { icon: Home, label: 'Inmuebles Captados', action: () => { setCurrentView('crm'); setCurrentEntity({ type: 'property-list' }); } },
                            { icon: Users, label: 'Clientes Activos', action: () => setCurrentView('client-directory') },
                            { icon: TrendingUp, label: 'Cierres del Mes', action: () => setCurrentView('sales-closings') },
                            { icon: Settings, label: 'Ayuda / Soporte Asesores', action: () => setCurrentView('help-center') }
                          ].map((item, i) => (
                            <div 
                              key={i}
                              onClick={() => { setShowProfileMenu(false); item.action(); }}
                              style={{padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'background 0.2s', fontSize: '14px', color: '#334155'}}
                              onMouseOver={e=>e.currentTarget.style.background='#f1f5f9'} onMouseOut={e=>e.currentTarget.style.background='transparent'}
                            >
                              <item.icon size={18} color="#64748b" />
                              {item.label}
                            </div>
                          ))}
                        </div>

                        {/* Cerrar Sesion */}
                        <div style={{padding: '12px 0', borderTop: '1px solid #e2e8f0'}}>
                          <div 
                            onClick={() => { setShowProfileMenu(false); setUserRole(null); }}
                            style={{padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'background 0.2s', fontSize: '14px', color: '#334155'}}
                            onMouseOver={e=>e.currentTarget.style.background='#f1f5f9'} onMouseOut={e=>e.currentTarget.style.background='transparent'}
                          >
                            <UserCircle size={18} color="#64748b" />
                            Salir de la cuenta
                          </div>
                        </div>

                      </div>
                    </>
                  )}
                </div>
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
