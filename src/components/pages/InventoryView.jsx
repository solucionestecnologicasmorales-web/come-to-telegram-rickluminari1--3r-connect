import React, { useState } from 'react';
import { 
  Plus, Sparkles, AlertTriangle, CheckCircle2, Share2, FileText, 
  ChevronLeft, BarChart2, BrainCircuit, Edit3, Camera, MapPin, Eye, MousePointerClick, 
  TrendingUp, Users, Mail, Phone, Calendar, Maximize2, X
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProperties } from '../../mockData';

// Componente para estadísticas simuladas
const StatCard = ({ title, value, trend, isPositive, icon: Icon }) => (
  <div style={{background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
      <span style={{color: '#64748b', fontSize: '14px', fontWeight: 500}}>{title}</span>
      <div style={{width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6'}}>
        <Icon size={18} />
      </div>
    </div>
    <div style={{fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '8px'}}>{value}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: isPositive ? '#10b981' : '#ef4444'}}>
      <TrendingUp size={14} style={{transform: isPositive ? 'none' : 'rotate(180deg)'}} />
      <span>{trend} vs mes anterior</span>
    </div>
  </div>
);

const performanceData = [
  { name: 'Ene', vistas: 400, leads: 12 },
  { name: 'Feb', vistas: 430, leads: 15 },
  { name: 'Mar', vistas: 410, leads: 14 },
  { name: 'Abr', vistas: 580, leads: 22 },
  { name: 'May', vistas: 750, leads: 35 },
  { name: 'Jun', vistas: 680, leads: 28 },
];

const InventoryView = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('detalles');
  const [show3DFullScreen, setShow3DFullScreen] = useState(false);
  const [showMapFullScreen, setShowMapFullScreen] = useState(false);
  const [tourUrl, setTourUrl] = useState("https://my.matterport.com/show/?m=U7RSqFFpMU8&play=1");
  const [mapLat, setMapLat] = useState(19.4326);
  const [mapLng, setMapLng] = useState(-99.1332);

  // Si hay una propiedad seleccionada, renderizamos su Dashboard
  if (selectedProperty) {
    const isOverpriced = selectedProperty.acmStatus === 'high';
    const matchCount = selectedProperty.matchCount || 12;

    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden'}}>
        
        {/* Cabecera del Dashboard de Propiedad */}
        <div style={{background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button 
            onClick={() => setSelectedProperty(null)}
            style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}
          >
            <ChevronLeft size={20} /> Volver al catálogo
          </button>
          <div style={{width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px'}}></div>
          <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>{selectedProperty.title}</h2>
          <span className={`badge ${selectedProperty.badge === 'Nuevo Ingreso' ? 'badge-info' : 'badge-success'}`} style={{marginLeft: 'auto'}}>
            {selectedProperty.badge}
          </span>
        </div>

        <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
          {/* Panel Lateral de Navegación de Pestañas */}
          <div style={{width: '240px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '24px 0'}}>
            <button 
              onClick={() => setActiveTab('detalles')}
              style={{width: '100%', padding: '12px 24px', background: activeTab === 'detalles' ? '#eff6ff' : 'transparent', border: 'none', borderRight: activeTab === 'detalles' ? '3px solid #3b82f6' : '3px solid transparent', textAlign: 'left', color: activeTab === 'detalles' ? '#1d4ed8' : '#475569', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s'}}
            >
              <Edit3 size={18} /> Editar Detalles
            </button>
            <button 
              onClick={() => setActiveTab('estadisticas')}
              style={{width: '100%', padding: '12px 24px', background: activeTab === 'estadisticas' ? '#eff6ff' : 'transparent', border: 'none', borderRight: activeTab === 'estadisticas' ? '3px solid #3b82f6' : '3px solid transparent', textAlign: 'left', color: activeTab === 'estadisticas' ? '#1d4ed8' : '#475569', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s'}}
            >
              <BarChart2 size={18} /> Rendimiento
            </button>
            <button 
              onClick={() => setActiveTab('ia')}
              style={{width: '100%', padding: '12px 24px', background: activeTab === 'ia' ? '#eff6ff' : 'transparent', border: 'none', borderRight: activeTab === 'ia' ? '3px solid #3b82f6' : '3px solid transparent', textAlign: 'left', color: activeTab === 'ia' ? '#1d4ed8' : '#475569', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s'}}
            >
              <BrainCircuit size={18} /> Matching IA
            </button>
          </div>

          {/* Área de Contenido Principal */}
          <div style={{flex: 1, minHeight: 0, padding: '32px', overflowY: 'auto'}}>
            
            {activeTab === 'detalles' && (
              <div className="animate-fade-in" style={{maxWidth: '800px'}}>
                <h3 style={{fontSize: '24px', color: '#0f172a', marginBottom: '24px'}}>Información del Inmueble</h3>
                
                <div style={{background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <div style={{display: 'flex', gap: '24px'}}>
                    <div style={{width: '200px', height: '150px', borderRadius: '8px', backgroundImage: `url(${selectedProperty.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 500}}>Título del Inmueble</label>
                      <input type="text" defaultValue={selectedProperty.title} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none'}} />
                    </div>
                  </div>
                  
                  <div style={{display: 'flex', gap: '16px'}}>
                    <div style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 500}}>Precio (MXN)</label>
                      <input type="number" defaultValue={selectedProperty.price} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none'}} />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 500}}>Características</label>
                      <input type="text" defaultValue={selectedProperty.specs} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none'}} />
                    </div>
                  </div>

                  <div style={{display: 'flex', gap: '16px'}}>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500}}><Camera size={16}/> Tour Virtual 3D</label>
                        <button onClick={() => setShow3DFullScreen(true)} style={{background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 500}}>
                          <Maximize2 size={14} /> Pantalla Completa
                        </button>
                      </div>
                      <div style={{height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', marginBottom: '8px', position: 'relative'}}>
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={tourUrl}
                          frameBorder="0" 
                          allowFullScreen 
                          allow="xr-spatial-tracking"
                          title="Matterport 3D Tour"
                        ></iframe>
                      </div>
                      <input 
                        type="text" 
                        value={tourUrl}
                        onChange={(e) => setTourUrl(e.target.value)}
                        placeholder="Ingresa la URL de Matterport, Kuula, etc." 
                        style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', marginBottom: '16px', fontSize: '13px'}} 
                      />
                      
                      <div style={{background: '#f1f5f9', padding: '16px', borderRadius: '8px', border: '1px dashed #cbd5e1'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                          <div style={{background: '#e2e8f0', padding: '8px', borderRadius: '50%', color: '#64748b'}}><FileText size={16}/></div>
                          <div>
                            <div style={{fontWeight: 500, color: '#0f172a'}}>Ficha Técnica (PDF)</div>
                            <div style={{fontSize: '12px', color: '#64748b'}}>Generada automáticamente por IA</div>
                          </div>
                        </div>
                        <a href="/flyer-demo.pdf" download={`Ficha-${selectedProperty.title.replace(/\s+/g, '-')}.pdf`} className="btn btn-secondary" style={{width: '100%', fontSize: '13px', padding: '6px 0', textDecoration: 'none', display: 'flex', justifyContent: 'center'}}>Descargar Flyer</a>
                      </div>
                    </div>

                    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500}}><MapPin size={16}/> Ubicación del Inmueble</label>
                        <button onClick={() => setShowMapFullScreen(true)} style={{background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 500}}>
                          <Maximize2 size={14} /> Pantalla Completa
                        </button>
                      </div>
                      <div style={{height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', marginBottom: '8px'}}>
                        <MapContainer key={`${mapLat}-${mapLng}`} center={[mapLat, mapLng]} zoom={14} style={{height: '100%', width: '100%'}}>
                          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                          <Marker position={[mapLat, mapLng]} />
                        </MapContainer>
                      </div>
                      <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
                        <div style={{flex: 1}}>
                          <label style={{fontSize: '12px', color: '#64748b'}}>Latitud</label>
                          <input 
                            type="number" 
                            step="0.0001"
                            value={mapLat} 
                            onChange={(e) => setMapLat(parseFloat(e.target.value) || 0)}
                            style={{width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}} 
                          />
                        </div>
                        <div style={{flex: 1}}>
                          <label style={{fontSize: '12px', color: '#64748b'}}>Longitud</label>
                          <input 
                            type="number" 
                            step="0.0001"
                            value={mapLng} 
                            onChange={(e) => setMapLng(parseFloat(e.target.value) || 0)}
                            style={{width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px'}}>
                    <button className="btn btn-secondary">Descartar Cambios</button>
                    <button className="btn btn-primary" onClick={() => alert('Cambios guardados con éxito en la plataforma MLS.')}>Guardar Cambios</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'estadisticas' && (
              <div className="animate-fade-in">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                  <h3 style={{fontSize: '24px', color: '#0f172a', margin: 0}}>Rendimiento del Inmueble</h3>
                  <select style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none'}}>
                    <option>Últimos 30 días</option>
                    <option>Últimos 7 días</option>
                    <option>Desde la publicación</option>
                  </select>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px'}}>
                  <StatCard title="Vistas Totales" value="2,458" trend="12.5%" isPositive={true} icon={Eye} />
                  <StatCard title="Clics en 'Ver Teléfono'" value="142" trend="8.2%" isPositive={true} icon={MousePointerClick} />
                  <StatCard title="Leads Generados" value="18" trend="5.0%" isPositive={false} icon={Users} />
                  <StatCard title="Consultas Agendadas" value="4" trend="20.0%" isPositive={true} icon={Calendar} />
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', height: '350px'}}>
                  <h4 style={{margin: '0 0 24px 0', fontSize: '16px', color: '#0f172a'}}>Vistas vs Leads (Últimos 6 meses)</h4>
                  <div style={{height: 'calc(100% - 40px)'}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                          itemStyle={{fontWeight: 500}}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="vistas" name="Vistas" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                        <Line yAxisId="right" type="monotone" dataKey="leads" name="Leads" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ia' && (
              <div className="animate-fade-in" style={{maxWidth: '900px'}}>
                <h3 style={{fontSize: '24px', color: '#0f172a', marginBottom: '24px'}}>Asistente de Inteligencia Artificial</h3>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px'}}>
                  {/* ACM Analysis Widget */}
                  <div style={{padding: '24px', borderRadius: '12px', border: isOverpriced ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)', background: isOverpriced ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)'}}>
                    <h4 style={{display: 'flex', alignItems: 'center', gap: '8px', color: isOverpriced ? '#ef4444' : '#10b981', margin: '0 0 16px 0', fontSize: '18px'}}>
                      <Sparkles size={20} /> Análisis Comparativo de Mercado (ACM)
                    </h4>
                    <p style={{color: '#475569', margin: '0 0 16px 0'}}>
                      Promedio de mercado en esta zona para características similares: <strong>$10,500,000 MXN</strong>.
                    </p>
                    {isOverpriced ? (
                      <div style={{background: 'white', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
                        <strong style={{color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px'}}><AlertTriangle size={18}/> Alerta de Sobreprecio</strong>
                        <p style={{margin: '8px 0 0 0', color: '#475569', fontSize: '14px'}}>El precio actual está un {selectedProperty.diff?.toFixed(1) || 15}% por encima del mercado. Recomendamos un ajuste para mejorar la tracción.</p>
                      </div>
                    ) : (
                      <div style={{background: 'white', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10b981'}}>
                        <strong style={{color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px'}}><CheckCircle2 size={18}/> Precio Competitivo</strong>
                        <p style={{margin: '8px 0 0 0', color: '#475569', fontSize: '14px'}}>La propiedad se encuentra en un rango de precio ideal para generar interés inmediato.</p>
                      </div>
                    )}
                  </div>

                  {/* Stagnation Alert */}
                  {selectedProperty.stagnant ? (
                    <div style={{padding: '24px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.05)'}}>
                      <h4 style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', margin: '0 0 16px 0', fontSize: '18px'}}>
                        <AlertTriangle size={20} /> Estancamiento Detectado
                      </h4>
                      <p style={{color: '#475569', margin: '0 0 16px 0'}}>
                        Esta propiedad ha tenido un <strong>40% menos de visualizaciones</strong> en los últimos 7 días comparado con propiedades similares.
                      </p>
                      <button className="btn btn-secondary" style={{width: '100%', borderColor: '#f59e0b', color: '#d97706'}}>Generar Campaña de Reactivación</button>
                    </div>
                  ) : (
                    <div style={{padding: '24px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                      <div style={{width: '48px', height: '48px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                        <TrendingUp size={24} />
                      </div>
                      <h4 style={{color: '#0f172a', margin: '0 0 8px 0', fontSize: '18px'}}>Buen Nivel de Tracción</h4>
                      <p style={{color: '#475569', margin: 0, fontSize: '14px'}}>
                        La propiedad está recibiendo un flujo constante de prospectos.
                      </p>
                    </div>
                  )}
                </div>

                {/* Matching Engine Results */}
                <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
                  <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <h4 style={{margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a'}}>Prospectos Compatibles (Motor Matching)</h4>
                      <p style={{margin: 0, color: '#64748b', fontSize: '14px'}}>Se encontraron {matchCount} clientes en la base de datos con alta afinidad.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => alert('Notificaciones enviadas a todos los prospectos compatibles por WhatsApp.')}>Notificar a Todos</button>
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {Array.from({length: Math.min(matchCount, 6)}).map((_, i) => {
                      const fakeNames = ["Carlos Slim", "Emilio Azcárraga", "María Asunción", "Ricardo Salinas", "Empresa ABC S.A. de C.V.", "Inmobiliaria Global", "Desarrollos XYZ"];
                      const affinity = 99 - (i * 2);
                      return (
                        <div key={i} style={{padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#64748b'}}>
                              {fakeNames[i % fakeNames.length].charAt(0)}
                            </div>
                            <div>
                              <div style={{fontWeight: 600, color: '#0f172a'}}>{fakeNames[i % fakeNames.length]}</div>
                              <div style={{fontSize: '13px', color: '#64748b', display: 'flex', gap: '12px', marginTop: '4px'}}>
                                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Phone size={12}/> Activo hace 2 días</span>
                                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Mail size={12}/> Email verificado</span>
                              </div>
                            </div>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                            <div style={{textAlign: 'right'}}>
                              <div style={{fontWeight: 600, color: '#10b981'}}>{affinity}% Afinidad</div>
                              <div style={{fontSize: '12px', color: '#64748b'}}>Basado en historial</div>
                            </div>
                            <button className="btn btn-secondary" style={{padding: '6px 12px'}}>Contactar</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Modal Full Screen 3D */}
        {show3DFullScreen && (
          <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', color: 'white'}}>
              <h3 style={{margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}><Camera size={20} /> Tour Virtual 3D: {selectedProperty.title}</h3>
              <button onClick={() => setShow3DFullScreen(false)} style={{background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <X size={24} />
              </button>
            </div>
            <div style={{flex: 1, width: '100%'}}>
              <iframe 
                width="100%" 
                height="100%" 
                src={tourUrl}
                frameBorder="0" 
                allowFullScreen 
                allow="xr-spatial-tracking"
                title="Matterport 3D Tour Fullscreen"
              ></iframe>
            </div>
          </div>
        )}

        {/* Modal Full Screen Map */}
        {showMapFullScreen && (
          <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', color: 'white'}}>
              <h3 style={{margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}><MapPin size={20} /> Mapa: {selectedProperty.title}</h3>
              <button onClick={() => setShowMapFullScreen(false)} style={{background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <X size={24} />
              </button>
            </div>
            <div style={{flex: 1, width: '100%'}}>
              <MapContainer key={`fs-${mapLat}-${mapLng}`} center={[mapLat, mapLng]} zoom={15} style={{height: '100%', width: '100%'}}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={[mapLat, mapLng]} />
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista de Catálogo (Grid)
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', padding: '32px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#0f172a'}}>Inventario de Inmuebles</h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '16px'}}>Gestiona tu catálogo, actualiza propiedades y analiza su rendimiento en el mercado.</p>
        </div>
        <button onClick={() => alert('Abrir modal para nueva propiedad')} className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Plus size={18} /> Nueva Propiedad
        </button>
      </div>

      <div style={{flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', overflowY: 'auto', paddingBottom: '32px'}}>
        {properties.map(prop => (
          <div key={prop.id} style={{minHeight: '400px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s'}} onMouseOver={(e) => e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)'} onMouseOut={(e) => e.currentTarget.style.boxShadow='none'}>
            <div style={{height: '200px', backgroundImage: `url(${prop.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
              <div style={{position: 'absolute', top: 16, right: 16}}>
                <span className={`badge ${prop.badge === 'Nuevo Ingreso' ? 'badge-info' : (prop.badge === 'Destacada' ? 'badge-warning' : 'badge-success')}`} style={{background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)'}}>{prop.badge}</span>
              </div>
            </div>
            
            <div style={{padding: '20px', flex: 1, display: 'flex', flexDirection: 'column'}}>
              <h3 style={{fontSize: '18px', color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4'}}>{prop.title}</h3>
              <div style={{fontSize: '20px', fontWeight: 700, color: '#3b82f6', marginBottom: '12px'}}>${Number(prop.price).toLocaleString()} MXN</div>
              <div style={{color: '#64748b', fontSize: '14px', marginBottom: '20px'}}>{prop.specs}</div>
              
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', flex: 1}}>
                {prop.stagnant && (
                  <span style={{background: '#fef3c7', color: '#d97706', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <AlertTriangle size={14} /> Estancado
                  </span>
                )}
                {prop.acmStatus === 'high' && (
                  <span style={{background: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <TrendingUp size={14} /> Sobreprecio
                  </span>
                )}
                <span style={{background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <BrainCircuit size={14} /> {prop.matchCount || 12} Matches IA
                </span>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedProperty(prop);
                  setMapLat(prop.lat || 19.4326);
                  setMapLng(prop.lng || -99.1332);
                  setActiveTab('detalles');
                }} 
                className="btn btn-secondary" 
                style={{width: '100%'}}
              >
                Ver Estadísticas y Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryView;
