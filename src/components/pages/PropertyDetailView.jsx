import React, { useState } from 'react';
import { ArrowLeft, MapPin, Activity, Zap, MessageSquare, User, CheckCircle2, TrendingDown, Eye, Users, FileText, Sparkles } from 'lucide-react';

const PropertyDetailView = ({ property, onBack }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([{ text: newComment, date: 'Ahora mismo', author: 'Asesor Premium (Tú)' }, ...comments]);
      setNewComment('');
    }
  };

  const isHealthy = property.verdict === 'Sana';
  const healthScore = isHealthy ? 92 : property.verdict === 'Baja Visibilidad' ? 45 : 30;
  const healthColor = isHealthy ? '#10b981' : property.verdict === 'Baja Visibilidad' ? '#f59e0b' : '#ef4444';

  return (
    <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={onBack} style={{background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
          <ArrowLeft size={20} color="#64748b" />
        </button>
        <div>
          <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0'}}>Auditoría: {property.title}</h2>
          <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><User size={14} /> Captador: {property.agent}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><MapPin size={14} /> {property.location}</span>
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px'}}>
        
        {/* Left Column: Property Info & Timeline */}
        <div style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          {/* Main Info Card */}
          <div className="glass-card" style={{padding: '0', display: 'flex', overflow: 'hidden', flexDirection: 'column'}}>
            <div style={{height: '250px', background: `url(${property.image}) center/cover`}}></div>
            <div style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>{property.price}</h3>
                <div style={{fontSize: '14px', color: '#64748b'}}>
                  {property.specs}
                </div>
              </div>
              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a'}}>{property.dom}</div>
                  <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase'}}>Días (DOM)</div>
                </div>
                <div style={{width: '1px', background: '#e2e8f0'}}></div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a'}}>{property.views}</div>
                  <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase'}}>Visitas web</div>
                </div>
                <div style={{width: '1px', background: '#e2e8f0'}}></div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a'}}>{Math.floor(property.views / 25)}</div>
                  <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase'}}>Leads Generados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h3 style={{fontSize: '18px', margin: '0 0 24px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Activity size={20} color="#8b5cf6" /> Historial de Vida
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <TrendingDown size={20} color="#ef4444" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Alerta de IA: Caída de Tráfico</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Las visitas semanales en portales cayeron un 40%. Probable desgaste del listing.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 2 días</div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Users size={20} color="#16a34a" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Campaña en Meta Ads Iniciada</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Se invirtieron $500 MXN impulsando esta propiedad. Generó 12 leads iniciales.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 15 días</div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Eye size={20} color="#3b82f6" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Publicación en Portales</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Sincronización exitosa con Inmuebles24, Vivanuncios y sitio web.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace {property.dom - 1} días</div>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0', display: comments.length > 0 ? 'block' : 'none'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <FileText size={20} color="#64748b" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Alta de Inmueble</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Captada por {property.agent} con contrato en exclusiva.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace {property.dom} días</div>
                </div>
              </div>

              {/* Dynamic Comments */}
              {comments.map((c, i) => (
                <div key={i} style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                  <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0', display: i === comments.length - 1 ? 'none' : 'block'}}></div>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                    <MessageSquare size={16} color="#475569" />
                  </div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Nota Agregada ({c.author})</div>
                    <div style={{fontSize: '13px', color: '#475569', marginTop: '4px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>{c.text}</div>
                    <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '6px'}}>{c.date}</div>
                  </div>
                </div>
              ))}
              
              {/* Comment Input */}
              <div style={{marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative'}}>
                <div style={{position: 'absolute', left: '19px', top: '-16px', height: '16px', width: '2px', background: '#e2e8f0', display: comments.length > 0 ? 'block' : 'none'}}></div>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Agregar una nota sobre el seguimiento de la propiedad..."
                  style={{width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  style={{alignSelf: 'flex-end', padding: '8px 16px', background: newComment.trim() ? '#8b5cf6' : '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: newComment.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.2s'}}
                >
                  Agregar Nota
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div className="glass-card" style={{borderTop: `4px solid ${healthColor}`}}>
            <h3 style={{fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Zap size={18} color={healthColor} /> Property Intelligence
            </h3>
            
            <div style={{marginBottom: '24px', textAlign: 'center', padding: '16px 0'}}>
              <div style={{fontSize: '48px', fontWeight: 800, color: healthColor, lineHeight: 1}}>{healthScore}</div>
              <div style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Health Score</div>
              <div style={{fontSize: '14px', fontWeight: 600, color: healthColor, marginTop: '8px', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: `${healthColor}15`}}>{property.verdict}</div>
            </div>

            <div style={{padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '8px', display: 'block'}}>Análisis de Precio (CMA Automático)</span>
              {isHealthy ? (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  El precio está <strong>en rango competitivo</strong> comparado con 5 propiedades similares en un radio de 2km. Buena liquidez esperada.
                </p>
              ) : (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  El precio de lista está un <strong>8% por encima</strong> del promedio de la zona para propiedades de similares características, lo que justifica la falta de ofertas.
                </p>
              )}
            </div>
            
            <div style={{padding: '16px', background: isHealthy ? '#f0fdf4' : '#fef2f2', borderRadius: '8px', border: `1px solid ${isHealthy ? '#bbf7d0' : '#fecaca'}`}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: isHealthy ? '#16a34a' : '#ef4444', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px'}}><Sparkles size={14} /> Next Best Action</span>
              <p style={{margin: '0 0 12px 0', fontSize: '13px', color: isHealthy ? '#166534' : '#991b1b', lineHeight: 1.5}}>
                {isHealthy 
                  ? "Aprovechar el buen momentum. Solicitar al propietario un pequeño descuento temporal (flash sale) para acelerar cierres con leads interesados."
                  : "Solicitar reducción de precio al propietario. La IA puede generar un reporte técnico que justifique estadísticamente la bajada de valor."}
              </p>
              <button style={{width: '100%', padding: '10px', background: isHealthy ? '#16a34a' : '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s'}} onMouseOver={(e) => e.currentTarget.style.opacity = 0.9} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                <Sparkles size={16} /> Generar Reporte para Propietario
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailView;
