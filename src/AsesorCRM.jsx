import React, { useState } from 'react';
import { 
  Search, KanbanSquare, Users, Home, Calendar, Clock, MapPin, 
  ChevronRight, Phone, MessageSquare, ArrowLeft, Plus, Send, X,
  Star, Eye, Heart, TrendingUp, Sparkles, CheckCircle2, FileText, Share2, History, ShieldAlert, UserPlus, ArrowRight
} from 'lucide-react';
import { mockProperties, mockFunnelLeads, mockAppointments, stages } from './mockData';

export const AsesorCRM = ({ currentEntity, setCurrentEntity, setCurrentView }) => {
  // Enrutador interno basado en currentEntity
  // currentEntity: { type: 'property-list' | 'funnel' | 'client' | 'calendar', id?: string }

  const handleNavigate = (type, id = null) => {
    if (type === 'appointment-details') {
      setCurrentEntity({ type: 'calendar', id });
      setCurrentView('appointment-details');
    } else {
      setCurrentEntity({ type, id });
    }
  };

  if (currentEntity.type === 'property-list') {
    return <PropertyListView onNavigate={handleNavigate} />;
  }
  if (currentEntity.type === 'funnel') {
    return <FunnelView propertyId={currentEntity.id} onNavigate={handleNavigate} />;
  }
  if (currentEntity.type === 'client') {
    return <Client360View clientId={currentEntity.id} onNavigate={handleNavigate} setCurrentView={setCurrentView} setCurrentEntity={setCurrentEntity} />;
  }
  if (currentEntity.type === 'calendar') {
    return <CalendarView onNavigate={handleNavigate} />;
  }

  return <div>Vista no encontrada</div>;
};

const PropertyListView = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('');

  const handleSaveLead = () => {
    if(!newLeadName) return;
    const id = 'lead-' + Date.now();
    mockFunnelLeads[id] = {
      id,
      name: newLeadName,
      phone: newLeadPhone || '555-0000',
      budget: newLeadBudget || '$3M',
      stage: 'contacto',
      propertyId: 'prop-1',
      notes: 'Lead creado manualmente.'
    };
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Lead guardado y asignado a Inmueble 1', type: 'success' } }));
    setShowNewLeadModal(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadBudget('');
  };

  const filteredProps = mockProperties.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{margin: 0, fontSize: '24px'}}>Mis Inmuebles Asignados</h2>
        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
          <button onClick={() => setShowNewLeadModal(true)} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#3483fa', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
            <UserPlus size={18} /> Nuevo Lead
          </button>
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

      {showNewLeadModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowNewLeadModal(false)}>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <h3 style={{margin: 0, fontSize: '18px'}}>Alta de Nuevo Lead</h3>
              <button onClick={() => setShowNewLeadModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <input type="text" placeholder="Nombre completo" value={newLeadName} onChange={e=>setNewLeadName(e.target.value)} style={{padding: '10px', borderRadius: '8px', border: '1px solid #e6e6e6'}} />
              <input type="text" placeholder="Teléfono" value={newLeadPhone} onChange={e=>setNewLeadPhone(e.target.value)} style={{padding: '10px', borderRadius: '8px', border: '1px solid #e6e6e6'}} />
              <input type="text" placeholder="Presupuesto" value={newLeadBudget} onChange={e=>setNewLeadBudget(e.target.value)} style={{padding: '10px', borderRadius: '8px', border: '1px solid #e6e6e6'}} />
              <button onClick={handleSaveLead} className="btn btn-primary" style={{marginTop: '8px'}}>Guardar Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PropertyFunnelSummary = ({ propertyId, onNavigate, onStageClick, isPrimary }) => {
  const property = mockProperties.find(p => p.id === propertyId);
  const propLeads = Object.values(mockFunnelLeads).filter(l => l.propertyId === propertyId);
  const [showAcmModal, setShowAcmModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDownloadingACM, setIsDownloadingACM] = useState(false);
  const [isSendingACM, setIsSendingACM] = useState(false);
  const [isExportingCanva, setIsExportingCanva] = useState(false);
  const [isPublishingStory, setIsPublishingStory] = useState(false);
  const [editTitle, setEditTitle] = useState(property?.title || '');
  const [editPrice, setEditPrice] = useState(property?.price || '');
  const [forceRender, setForceRender] = useState(0);
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
            <div style={{background: 'linear-gradient(to right, rgba(52, 131, 250, 0.1), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(52, 131, 250, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#3483fa', fontWeight: 'bold', marginBottom: '8px'}}>
                <Sparkles size={14} /> AI Match Score: 92%
              </div>
              <p style={{margin: 0, color: '#666'}}>El precio está un 5% por debajo del promedio en la zona. Altísima probabilidad de cierre en los próximos 15 días.</p>
            </div>
            
            {/* Listing Quality Score */}
            <div style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#666'}}>
                <strong>Listing Quality Score</strong>
                <span style={{color: '#f59e0b', fontWeight: 'bold'}}>75% (Regular)</span>
              </div>
              <div style={{background: '#e6e6e6', height: '6px', borderRadius: '3px', width: '100%', overflow: 'hidden'}}>
                <div style={{width: '75%', height: '100%', background: '#f59e0b'}}></div>
              </div>
              <div style={{fontSize: '11px', color: '#999', marginTop: '4px'}}>Sugerencia: Añade fotos de los baños para subir a 90%.</div>
            </div>

            <button onClick={() => setShowEditModal(true)} style={{width: '100%', padding: '10px', background: '#3483fa', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', transition: 'background 0.2s'}} onMouseOver={(e)=>e.target.style.background='#2968c8'} onMouseOut={(e)=>e.target.style.background='#3483fa'}>
              Editar Inmueble
            </button>
            <div style={{display: 'flex', gap: '8px', marginTop: '12px'}}>
              <button style={{flex: 1, padding: '8px', background: '#f8fafc', color: '#333', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}} onClick={() => setShowAcmModal(true)}>
                <FileText size={14} /> ACM
              </button>
              <button style={{flex: 1, padding: '8px', background: '#f8fafc', color: '#333', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}} onClick={() => setShowMarketingModal(true)}>
                <Share2 size={14} /> Marketing
              </button>
            </div>
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

      {/* ACM Modal */}
      {showAcmModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowAcmModal(false)}>
          <div style={{background: 'white', padding: '0', borderRadius: '12px', width: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden'}} onClick={e => e.stopPropagation()}>
            <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc'}}>
              <h3 style={{margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px'}}><FileText size={20} color="#3483fa"/> Análisis Comparativo de Mercado (ACM)</h3>
              <button onClick={() => setShowAcmModal(false)} style={{background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}><X size={20} /></button>
            </div>
            <div style={{padding: '24px', textAlign: 'center'}}>
              <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=600" alt="Grafico ACM" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px'}} />
              <h4 style={{margin: '0 0 8px 0'}}>Reporte de Plusvalía y Comparables</h4>
              <p style={{margin: '0 0 16px 0', color: '#64748b', fontSize: '14px'}}>El análisis ha encontrado 12 propiedades comparables activas y 5 vendidas recientemente en un radio de 2km.</p>
              <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
                <button className="btn btn-secondary" onClick={() => { setIsDownloadingACM(true); setTimeout(() => { setIsDownloadingACM(false); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Listo. PDF en tu carpeta de descargas.', type: 'success' } })); setShowAcmModal(false); }, 1500); }}>{isDownloadingACM ? 'Descargando...' : 'Descargar PDF'}</button>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px', padding: '0 24px 24px 24px'}}>
              <button className="btn btn-secondary" onClick={() => setShowAcmModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => { setShowAcmModal(false); setCurrentView('email-center'); }}>{isSendingACM ? 'Enviando...' : 'Enviar a Propietario'}</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowEditModal(false)}>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', width: '500px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <h3 style={{margin: 0, fontSize: '18px'}}>Editar Inmueble</h3>
              <button onClick={() => setShowEditModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <input type="text" value={editTitle} onChange={e=>setEditTitle(e.target.value)} style={{padding: '10px', borderRadius: '8px', border: '1px solid #e6e6e6'}} />
              <input type="text" value={editPrice} onChange={e=>setEditPrice(e.target.value)} style={{padding: '10px', borderRadius: '8px', border: '1px solid #e6e6e6'}} />
              <button onClick={() => { 
                if(property) { property.title = editTitle; property.price = editPrice.replace(/[^0-9]/g,''); }
                setForceRender(prev => prev + 1);
                window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Inmueble actualizado correctamente', type: 'success' } })); 
                setShowEditModal(false); 
              }} className="btn btn-primary" style={{marginTop: '8px'}}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Center Modal */}
      {showMarketingModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowMarketingModal(false)}>
          <div style={{background: 'white', padding: '0', borderRadius: '12px', width: '700px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden'}} onClick={e => e.stopPropagation()}>
            <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc'}}>
              <h3 style={{margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px'}}><Share2 size={20} color="#3483fa"/> Marketing Center</h3>
              <button onClick={() => setShowMarketingModal(false)} style={{background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}><X size={20} /></button>
            </div>
            <div style={{padding: '24px', display: 'flex', gap: '16px'}}>
              <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=300" alt="Instagram" style={{width: '100%', height: '140px', objectFit: 'cover'}} />
                <div style={{padding: '16px'}}>
                  <h4 style={{margin: '0 0 4px 0'}}>Post para Instagram</h4>
                  <p style={{margin: '0 0 12px 0', fontSize: '12px', color: '#64748b'}}>Formato 1080x1080px</p>
                  <button className="btn btn-secondary" style={{width: '100%'}} onClick={() => { setIsExportingCanva(true); setTimeout(() => { setIsExportingCanva(false); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Plantilla exportada a Canva' } })); setShowMarketingModal(false); }, 1500); }}>{isExportingCanva ? 'Abriendo Canva...' : 'Editar en Canva'}</button>
                </div>
              </div>
              <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=300" alt="Story" style={{width: '100%', height: '140px', objectFit: 'cover'}} />
                <div style={{padding: '16px'}}>
                  <h4 style={{margin: '0 0 4px 0'}}>Story de Facebook</h4>
                  <p style={{margin: '0 0 12px 0', fontSize: '12px', color: '#64748b'}}>Formato 1080x1920px</p>
                  <button className="btn btn-primary" style={{width: '100%'}} onClick={() => { setIsPublishingStory(true); setTimeout(() => { setIsPublishingStory(false); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: '✓ Story publicada. Llegará a ~3,400 personas.', type: 'success' } })); setShowMarketingModal(false); }, 1500); }}>{isPublishingStory ? 'Publicando...' : 'Publicar Directo'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <div key={`${panel.type}-${panel.id}-${idx}`} style={{flex: '0 0 100%', height: '100%', paddingRight: '24px', display: 'flex', flexDirection: panel.type === 'property' ? 'row' : 'column', gap: '24px', alignItems: panel.type === 'property' ? 'flex-start' : 'stretch', overflowY: 'auto', paddingBottom: '24px'}}>
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

const Client360View = ({ clientId, onNavigate, onBack, isEmbedded, onPropertyClick, setCurrentView, setCurrentEntity }) => {
  const lead = mockFunnelLeads[clientId];
  if (!lead) return <div>Cliente no encontrado</div>;
  
  const leadProperty = mockProperties.find(p => p.id === lead.propertyId);
  const [localApts, setLocalApts] = useState(mockAppointments.filter(a => a.leadId === clientId));
  const [notes, setNotes] = useState(lead.notes);
  
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
  const [isRequestingCoverage, setIsRequestingCoverage] = useState(false);
  const [coverageRequested, setCoverageRequested] = useState(false);

  const handleRequestCoverage = () => {
    setIsRequestingCoverage(true);
    setTimeout(() => {
      setIsRequestingCoverage(false);
      setCoverageRequested(true);
      setTimeout(() => setCoverageRequested(false), 3000);
    }, 1000);
  };

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
            <div style={{flex: 1}}>
              <h2 style={{margin: '0 0 4px 0', fontSize: '24px', color: '#333'}}>{lead.name}</h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#666'}}>
                <Phone size={14} /> {lead.phone}
              </div>
            </div>
            {(setCurrentView && setCurrentEntity) && (
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setCurrentEntity({ type: 'client', name: lead.name });
                  setCurrentView('client-directory');
                }}
              >
                Ver Ficha Analítica
              </button>
            )}
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
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              onBlur={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Notas guardadas automáticamente', type: 'success' } }))}
              style={{width: '100%', minHeight: '80px', fontSize: '14px', color: '#666', background: '#fffbeb', padding: '12px', borderRadius: '8px', border: '1px solid #fcd34d', borderLeft: '4px solid #f59e0b', outline: 'none', resize: 'none', fontFamily: 'inherit'}} 
            />
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

        {/* Historial de Actividad / Timeline */}
        <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e6e6e6'}}>
          <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <History size={18} /> Historial de Actividad
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '12px'}}>
            <div style={{position: 'absolute', left: '16px', top: '8px', bottom: '8px', width: '2px', background: '#e6e6e6'}}></div>
            
            <div style={{display: 'flex', gap: '12px', position: 'relative', zIndex: 1}}>
              <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#3483fa', marginTop: '4px', outline: '4px solid white'}}></div>
              <div>
                <div style={{fontSize: '14px', fontWeight: 600, color: '#333'}}>WhatsApp enviado automáticamente</div>
                <div style={{fontSize: '12px', color: '#999'}}>Hace 2 horas (Plantilla: Seguimiento Tour 3D)</div>
              </div>
            </div>
            
            <div style={{display: 'flex', gap: '12px', position: 'relative', zIndex: 1}}>
              <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', marginTop: '4px', outline: '4px solid white'}}></div>
              <div>
                <div style={{fontSize: '14px', fontWeight: 600, color: '#333'}}>Avance a "Negociación"</div>
                <div style={{fontSize: '12px', color: '#999'}}>Hace 1 día por Asesor Premium</div>
              </div>
            </div>
            
            <div style={{display: 'flex', gap: '12px', position: 'relative', zIndex: 1}}>
              <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8', marginTop: '4px', outline: '4px solid white'}}></div>
              <div>
                <div style={{fontSize: '14px', fontWeight: 600, color: '#333'}}>Ingreso de Lead (Portal B2C)</div>
                <div style={{fontSize: '12px', color: '#999'}}>Hace 3 días</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho: WhatsApp Simulator */}
      <div style={{flex: 1, background: '#efeae2', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e6e6e6', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
        <div style={{background: '#075e54', padding: '16px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{width: '40px', height: '40px', background: 'white', color: '#075e54', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
              {lead.name.charAt(0)}
            </div>
            <div>
              <div style={{fontWeight: 600, fontSize: '16px'}}>{lead.name}</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.9}}>
                <span>en línea</span>
                <span style={{width: 4, height: 4, background: 'white', borderRadius: '50%'}}></span>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><CheckCircle2 size={12}/> Sincronizado</span>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px'}}>
            <Sparkles size={14} color="#fbbf24" />
            <span>Calidad IA: 85% (Buena)</span>
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
            <div style={{display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center'}}>
              <button 
                onClick={handleRequestCoverage} 
                disabled={isRequestingCoverage || coverageRequested}
                style={{
                  padding: '10px 16px', 
                  background: coverageRequested ? '#f0fdf4' : 'transparent', 
                  border: coverageRequested ? '1px solid #16a34a' : '1px dashed #3483fa', 
                  borderRadius: '8px', 
                  color: coverageRequested ? '#16a34a' : '#3483fa', 
                  fontWeight: 600, 
                  cursor: (isRequestingCoverage || coverageRequested) ? 'default' : 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px'
                }}>
                {isRequestingCoverage ? (
                  <>Solicitando...</>
                ) : coverageRequested ? (
                  <><CheckCircle2 size={18} /> Cobertura Solicitada</>
                ) : (
                  <><Users size={18} /> Solicitar Cobertura</>
                )}
              </button>
              <div style={{display: 'flex', gap: '12px'}}>
                <button onClick={() => setShowAptModal(false)} style={{padding: '10px 16px', background: 'white', border: '1px solid #e6e6e6', borderRadius: '8px', color: '#666', fontWeight: 600, cursor: 'pointer'}}>Cancelar</button>
                <button onClick={handleScheduleApt} disabled={!aptDate || !aptTime} style={{padding: '10px 16px', background: '#3483fa', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer', opacity: (!aptDate || !aptTime) ? 0.5 : 1}}>
                  Guardar Cita
                </button>
              </div>
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
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [isOptimized, setIsOptimized] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  let filteredAppointments = selectedDate 
    ? mockAppointments.filter(apt => new Date(apt.date).getDate() === selectedDate)
    : mockAppointments;

  if (isOptimized) {
    // Fake optimization: reverse the array or sort by a fake priority just to show the UI change
    // We'll just reverse it and add a mock 'priority' label in the render
    filteredAppointments = [...filteredAppointments].reverse();
  }

  const handleOptimizeRequest = () => {
    setShowModal(true);
  };

  const confirmOptimize = () => {
    setShowModal(false);
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setIsOptimized(true);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Agenda optimizada exitosamente (Rutas y Prioridad).', type: 'success' } }));
    }, 2000);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 style={{margin: '0', fontSize: '24px'}}>Agenda General de Citas</h2>
        {selectedDate && (
          <button 
            onClick={() => setSelectedDate(null)}
            style={{background: 'none', border: 'none', color: '#3483fa', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px'}}
          >
            Mostrar todas las fechas
          </button>
        )}
      </div>
      <div style={{flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #e6e6e6', padding: '24px', overflowY: 'auto'}}>
        <div style={{display: 'flex', gap: '24px'}}>
          {/* Falso Calendario Mensual a la izquierda */}
          <div style={{width: '300px'}}>
            <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: '#333'}}>Agosto 2026</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center'}}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => <div key={day} style={{fontWeight: 600, color: '#999', fontSize: '14px'}}>{day}</div>)}
              {Array.from({length: 31}).map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedDate(i + 1)}
                  style={{
                    padding: '8px 0', 
                    borderRadius: '50%', 
                    background: selectedDate === i + 1 ? '#3483fa' : (i===14 && !selectedDate ? '#e1f5fe' : 'transparent'), 
                    color: selectedDate === i + 1 ? 'white' : (i===14 && !selectedDate ? '#0284c7' : '#333'), 
                    fontWeight: (selectedDate === i + 1 || (i===14 && !selectedDate)) ? 600: 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { if(selectedDate !== i + 1) e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseOut={(e) => { if(selectedDate !== i + 1) e.currentTarget.style.background = (i===14 && !selectedDate ? '#e1f5fe' : 'transparent'); }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Lista de citas próximas */}
          <div style={{flex: 1, borderLeft: '1px solid #e6e6e6', paddingLeft: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
                <h3 style={{margin: 0, fontSize: '18px', color: '#333'}}>
                  {selectedDate ? `Citas para el ${selectedDate} de Agosto` : 'Próximas Citas (Grafo Conectado)'}
                </h3>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: isOptimized ? '#ecfdf5' : '#fff7ed', padding: '4px 12px', borderRadius: '16px', border: `1px solid ${isOptimized ? '#a7f3d0' : '#fed7aa'}`, transition: 'all 0.5s'}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: isOptimized ? '#059669' : '#d97706'}}>
                    Eficiencia: {isOptimized ? '98%' : '65%'}
                  </div>
                  <div style={{width: '60px', height: '6px', background: isOptimized ? '#d1fae5' : '#ffedd5', borderRadius: '4px', overflow: 'hidden'}}>
                    <div style={{width: isOptimized ? '98%' : '65%', height: '100%', background: isOptimized ? '#10b981' : '#f59e0b', transition: 'width 1.5s ease-in-out'}}></div>
                  </div>
                </div>
              </div>
              
              {!isOptimized ? (
                <button 
                  onClick={handleOptimizeRequest}
                  disabled={isOptimizing}
                  style={{
                    background: isOptimizing ? '#d1d5db' : '#8b5cf6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', 
                    fontWeight: 600, fontSize: '13px', cursor: isOptimizing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <Sparkles size={16} />
                  {isOptimizing ? 'Optimizando rutas...' : 'Optimizar con IA'}
                </button>
              ) : (
                <div style={{background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <CheckCircle2 size={16} /> Agenda Optimizada
                </div>
              )}
            </div>
            
            {isOptimized && (
              <div style={{background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', fontSize: '13px', color: '#475569'}}>
                <strong>Recomendación IA:</strong> Hemos reordenado tus reuniones agrupando las ubicaciones en la Zona Sur para ahorrarte 1.5 horas de tráfico y asegurando que las reuniones de "Cierre" sean en tu hora de mayor energía.
              </div>
            )}

            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {filteredAppointments.length === 0 ? (
                <div style={{padding: '32px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1'}}>
                  No hay citas agendadas para esta fecha.
                </div>
              ) : 
                filteredAppointments.slice(0,10).sort((a,b) => new Date(a.date) - new Date(b.date)).map(apt => (
                <div key={apt.id} style={{display: 'flex', padding: '16px', border: '1px solid #e6e6e6', borderRadius: '8px', alignItems: 'center', gap: '16px'}}>
                  <div style={{width: '60px', textAlign: 'center', borderRight: '1px solid #e6e6e6', paddingRight: '16px'}}>
                    <div style={{fontSize: '12px', color: '#666', textTransform: 'uppercase'}}>{new Date(apt.date).toLocaleDateString('es-ES', {weekday: 'short'})}</div>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#3483fa'}}>{new Date(apt.date).getDate()}</div>
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 600, color: '#333', fontSize: '16px', marginBottom: '4px'}}>{apt.title}</div>
                    <div style={{color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <span>{new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      {isOptimized && (
                        <span style={{background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600}}>
                          Prioridad Alta
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('appointment-details', apt.id)}
                    style={{padding: '8px 16px', background: '#f8fafc', color: '#3483fa', border: '1px solid #e6e6e6', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}
                  >
                    Ver Detalles <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowModal(false)}>
          <div style={{background: 'white', borderRadius: '12px', width: '600px', maxWidth: '95%', padding: '32px', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Sparkles size={24} color="white" />
              </div>
              <div>
                <h2 style={{margin: '0 0 4px 0', fontSize: '20px', color: '#0f172a'}}>Optimización Inteligente de Agenda</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}}>
                  <span style={{color: '#64748b'}}>Eficiencia actual: <strong style={{color: '#d97706'}}>65%</strong></span>
                  <ArrowRight size={12} color="#94a3b8" />
                  <span style={{color: '#64748b'}}>Optimizada: <strong style={{color: '#059669'}}>98%</strong> (+33%)</span>
                </div>
              </div>
            </div>
            
            <p style={{margin: '0 0 20px 0', color: '#475569', fontSize: '15px', lineHeight: 1.6}}>
              He analizado tu agenda para el día de hoy y encontré rutas ineficientes. Estos son los cambios propuestos:
            </p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px'}}>
              
              {/* Meeting 1 */}
              <div style={{background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                  <div style={{fontWeight: 600, color: '#0f172a'}}>Visita Departamento en Polanco</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600}}>
                    <span style={{color: '#ef4444', textDecoration: 'line-through'}}>15:00</span>
                    <ArrowRight size={14} color="#94a3b8" />
                    <span style={{color: '#10b981'}}>11:30</span>
                  </div>
                </div>
                <div style={{fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'flex-start', gap: '6px'}}>
                  <Sparkles size={14} color="#8b5cf6" style={{marginTop: '2px', flexShrink: 0}} />
                  <span><strong>Agrupación Geográfica:</strong> Se movió a la mañana para coincidir con tu recorrido en la Zona Norte, ahorrando 45 mins de tráfico a media tarde.</span>
                </div>
              </div>

              {/* Meeting 2 */}
              <div style={{background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                  <div style={{fontWeight: 600, color: '#0f172a'}}>Firma de Contrato Lomas</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600}}>
                    <span style={{color: '#ef4444', textDecoration: 'line-through'}}>11:00</span>
                    <ArrowRight size={14} color="#94a3b8" />
                    <span style={{color: '#10b981'}}>16:00</span>
                  </div>
                </div>
                <div style={{fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'flex-start', gap: '6px'}}>
                  <Sparkles size={14} color="#8b5cf6" style={{marginTop: '2px', flexShrink: 0}} />
                  <span><strong>Prioridad Biométrica:</strong> Las reuniones de cierre requieren alta concentración. Tu historial indica que tienes menos interrupciones y mayor asertividad por la tarde.</span>
                </div>
              </div>

            </div>

            <div style={{background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#065f46', display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
              <CheckCircle2 size={18} color="#10b981" style={{marginTop: '2px', flexShrink: 0}} />
              <span>Se enviarán notificaciones automáticas por WhatsApp a los clientes afectados para confirmar los ajustes. (Ahorro total estimado: 1.5 horas).</span>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
              <button onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer'}}>
                Cancelar
              </button>
              <button onClick={confirmOptimize} style={{padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#8b5cf6', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Sparkles size={16} /> Confirmar y Aplicar (+33%)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsesorCRM;
