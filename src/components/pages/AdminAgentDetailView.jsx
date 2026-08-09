import React, { useState } from 'react';
import { ArrowLeft, User, Shield, TrendingUp, AlertTriangle, Zap, MessageSquare, Briefcase, Star, Clock, BookOpen } from 'lucide-react';

const AdminAgentDetailView = ({ agent, onBack }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([{ text: newComment, date: 'Ahora mismo', author: 'Director Comercial (Tú)' }, ...comments]);
      setNewComment('');
    }
  };

  const isHealthy = agent.status === 'Estrella';
  const needsAttention = agent.status === 'Atención Req.';

  return (
    <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={onBack} style={{background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
          <ArrowLeft size={20} color="#64748b" />
        </button>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div style={{width: '56px', height: '56px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold'}}>
            {agent.name.substring(0,2).toUpperCase()}
          </div>
          <div>
            <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0'}}>Auditoría: {agent.name}</h2>
            <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Shield size={14} /> {agent.role}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '4px', color: agent.color, fontWeight: 600}}>
                {agent.status === 'Estrella' ? <Star size={14} /> : agent.status === 'Atención Req.' ? <AlertTriangle size={14} /> : <TrendingUp size={14} />} {agent.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px'}}>
        
        {/* Left Column: Metrics & Timeline */}
        <div style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          {/* Main Info Card */}
          <div className="glass-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a'}}>{agent.pipeline}</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Embudo Activo</div>
            </div>
            <div style={{width: '1px', height: '40px', background: '#e2e8f0'}}></div>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '24px', fontWeight: 700, color: '#10b981'}}>{agent.commission}</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Comisiones (Mes)</div>
            </div>
            <div style={{width: '1px', height: '40px', background: '#e2e8f0'}}></div>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '24px', fontWeight: 700, color: agent.quality >= 90 ? '#10b981' : agent.quality >= 80 ? '#f59e0b' : '#ef4444'}}>{agent.quality}%</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Score de Calidad</div>
            </div>
            <div style={{width: '1px', height: '40px', background: '#e2e8f0'}}></div>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a'}}>{agent.time}</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Tiempo de Resp.</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h3 style={{fontSize: '18px', margin: '0 0 24px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <TrendingUp size={20} color="#8b5cf6" /> Historial de Rendimiento
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              
              {needsAttention && (
                <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                  <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                    <AlertTriangle size={20} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Alerta: Baja Adopción Tecnológica</div>
                    <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>El asesor ignoró las sugerencias de la IA en los últimos 5 leads, aumentando su tiempo de respuesta.</div>
                    <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 2 días</div>
                  </div>
                </div>
              )}

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Briefcase size={20} color="#16a34a" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Cierre Exitoso: Casa en Polanco</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Venta cerrada por $12M MXN. Comisión asegurada.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 5 días</div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <BookOpen size={20} color="#d97706" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Capacitación IA Completada</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Taller: "Cerrando más ventas usando predicciones de precios."</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 1 mes</div>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0', display: comments.length > 0 ? 'block' : 'none'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <User size={20} color="#64748b" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Promoción a {agent.role}</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Alcanzó las metas trimestrales y ascendió de rol.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 6 meses</div>
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
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Nota de Coaching ({c.author})</div>
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
                  placeholder="Agregar una nota de desempeño o resumen de sesión de coaching..."
                  style={{width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  style={{alignSelf: 'flex-end', padding: '8px 16px', background: newComment.trim() ? '#8b5cf6' : '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: newComment.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.2s'}}
                >
                  Agregar Nota al Expediente
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div className="glass-card" style={{borderTop: `4px solid ${agent.color}`}}>
            <h3 style={{fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Zap size={18} color={agent.color} /> Agent Intelligence
            </h3>
            
            <div style={{marginBottom: '24px', textAlign: 'center', padding: '16px 0'}}>
              <div style={{fontSize: '48px', fontWeight: 800, color: agent.color, lineHeight: 1}}>{agent.quality}%</div>
              <div style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Calidad Integral</div>
              <div style={{fontSize: '14px', fontWeight: 600, color: agent.color, marginTop: '8px', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: `${agent.color}15`}}>Adopción IA: {agent.aiAdoption}%</div>
            </div>

            <div style={{padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '8px', display: 'block'}}>Análisis de Embudo</span>
              {isHealthy ? (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  Tasa de conversión excelente. Convierte el 35% de sus visitas a cierres. Sólido uso de las herramientas de respuesta automática.
                </p>
              ) : needsAttention ? (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  El asesor se está estancando en la fase de "Visita". Pierde seguimientos críticos a las 48h. El tiempo de respuesta es la principal causa de fugas.
                </p>
              ) : (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  Rendimiento estable. Podría mejorar su tasa de cierre (actual: 15%) apoyándose más en las predicciones de negociación del sistema.
                </p>
              )}
            </div>
            
            <div style={{padding: '16px', background: isHealthy ? '#f0fdf4' : needsAttention ? '#fef2f2' : '#fffbeb', borderRadius: '8px', border: `1px solid ${isHealthy ? '#bbf7d0' : needsAttention ? '#fecaca' : '#fde68a'}`}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: isHealthy ? '#16a34a' : needsAttention ? '#ef4444' : '#d97706', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                <Star size={14} /> Next Best Action (Management)
              </span>
              <p style={{margin: '0 0 12px 0', fontSize: '13px', color: isHealthy ? '#166534' : needsAttention ? '#991b1b' : '#92400e', lineHeight: 1.5}}>
                {isHealthy 
                  ? "Asignar leads Premium (A+). Felicitar por su 95% de adopción tecnológica."
                  : needsAttention 
                  ? "Requerido: Sesión de Shadowing de 30 min para repasar el flujo de captura y el uso de las plantillas sugeridas."
                  : "Sugerir el curso interno de 'Cierres de Alta Velocidad' para acortar su ciclo de venta."}
              </p>
              <button style={{width: '100%', padding: '10px', background: isHealthy ? '#16a34a' : needsAttention ? '#ef4444' : '#d97706', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s'}} onMouseOver={(e) => e.currentTarget.style.opacity = 0.9} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                <Zap size={16} /> Generar Reporte 360°
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default AdminAgentDetailView;
