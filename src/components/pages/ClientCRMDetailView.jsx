import React from 'react';
import { ArrowLeft, User, Phone, MapPin, Calendar, CheckCircle2, AlertTriangle, Sparkles, BrainCircuit, Activity, Zap, MessageSquare } from 'lucide-react';

const ClientCRMDetailView = ({ lead, onBack }) => {
  const [newComment, setNewComment] = React.useState('');
  const [comments, setComments] = React.useState([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([{ text: newComment, date: 'Ahora mismo', author: 'Asesor Premium (Tú)' }, ...comments]);
      setNewComment('');
    }
  };

  const stages = ['contacto', 'visita', 'negociacion', 'cierre'];
  const currentStageIndex = stages.indexOf(lead.stage);

  return (
    <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Top Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={onBack} style={{background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
          <ArrowLeft size={20} color="#64748b" />
        </button>
        <div>
          <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0'}}>Expediente: {lead.name}</h2>
          <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><User size={14} /> Asesor: {lead.agent}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Phone size={14} /> {lead.phone}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card" style={{padding: '24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}>
          <div style={{position: 'absolute', top: '16px', left: '40px', right: '40px', height: '4px', background: '#e2e8f0', zIndex: 0}}></div>
          <div style={{position: 'absolute', top: '16px', left: '40px', right: '40px', height: '4px', background: '#3b82f6', zIndex: 1, width: `${(currentStageIndex / (stages.length - 1)) * 100}%`, transition: 'width 0.5s ease-in-out'}}></div>
          
          {['Contacto Inicial', 'Visita Agendada', 'En Negociación', 'Cierre Exitoso'].map((stage, idx) => (
            <div key={stage} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: '8px', width: '120px'}}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: idx <= currentStageIndex ? '#3b82f6' : 'white',
                border: idx <= currentStageIndex ? 'none' : '2px solid #e2e8f0',
                color: idx <= currentStageIndex ? 'white' : '#cbd5e1',
                boxShadow: idx === currentStageIndex ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none'
              }}>
                <CheckCircle2 size={20} />
              </div>
              <span style={{fontSize: '13px', fontWeight: 600, color: idx <= currentStageIndex ? '#0f172a' : '#94a3b8', textAlign: 'center'}}>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px'}}>
        
        {/* Left Column: Property & Timeline */}
        <div style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          {/* Linked Property */}
          <div className="glass-card" style={{padding: '0', display: 'flex', overflow: 'hidden'}}>
            <div style={{width: '200px', background: `url(${lead.property.image}) center/cover`}}></div>
            <div style={{padding: '24px', flex: 1}}>
              <span style={{fontSize: '12px', fontWeight: 600, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block'}}>Propiedad de Interés Principal</span>
              <h3 style={{margin: '0 0 8px 0', fontSize: '20px', color: '#0f172a'}}>{lead.property.title}</h3>
              <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><MapPin size={14} /> {lead.property.location}</span>
                <span>💰 {lead.property.price}</span>
              </div>
              <div style={{padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569'}}>
                <strong>Presupuesto del Cliente:</strong> {lead.budget} <br/>
                <em>* El cliente tiene un presupuesto ligeramente inferior al precio de lista. Probable negociación requerida.</em>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h3 style={{fontSize: '18px', margin: '0 0 24px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Activity size={20} color="#3b82f6" /> Historial de Actividad
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Zap size={20} color="#3b82f6" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>IA Analizó Perfil del Cliente</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>El asistente virtual analizó los chats recientes y actualizó la probabilidad de cierre de 40% a 75%.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hoy, 09:30 AM</div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Calendar size={20} color="#d97706" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Visita Completada</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>El cliente visitó la propiedad con {lead.agent}. Comentarios positivos sobre la iluminación.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Ayer, 16:00 PM</div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <MessageSquare size={20} color="#16a34a" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Mensaje de Seguimiento Enviado (WhatsApp)</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Se envió el recordatorio de cita generado por IA.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 3 días</div>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0', display: comments.length > 0 ? 'block' : 'none'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <User size={20} color="#64748b" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Lead Creado</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Ingresó a través de la Campaña de Ads "Oportunidades Coyoacán".</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 7 días</div>
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
                  placeholder="Agregar una nota o comentario al expediente..."
                  style={{width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  style={{alignSelf: 'flex-end', padding: '8px 16px', background: newComment.trim() ? '#2563eb' : '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: newComment.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.2s'}}
                >
                  Agregar Nota
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div className="glass-card" style={{borderTop: '4px solid #8b5cf6'}}>
            <h3 style={{fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <BrainCircuit size={18} color="#8b5cf6" /> Deal Intelligence
            </h3>
            
            <div style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b'}}>Probabilidad de Cierre</span>
                <span style={{fontSize: '18px', fontWeight: 700, color: '#10b981'}}>75%</span>
              </div>
              <div style={{width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px'}}>
                <div style={{width: '75%', height: '100%', background: '#10b981', borderRadius: '4px'}}></div>
              </div>
            </div>

            <div style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b'}}>Score de Urgencia</span>
                <span style={{fontSize: '18px', fontWeight: 700, color: '#f59e0b'}}>Alta (8.5/10)</span>
              </div>
              <div style={{width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px'}}>
                <div style={{width: '85%', height: '100%', background: '#f59e0b', borderRadius: '4px'}}></div>
              </div>
            </div>

            <div style={{padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '8px', display: 'block'}}>Análisis de Sentimiento</span>
              <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                El cliente se mostró <strong>entusiasta</strong> durante la visita. Utilizó palabras clave como "perfecto para mi familia" y "buena luz". Su principal objeción potencial es el <em>descuento esperado</em> sobre el precio final.
              </p>
            </div>
            
            <div style={{padding: '16px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe'}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px'}}><Sparkles size={14} /> Next Best Action</span>
              <p style={{margin: '0 0 12px 0', fontSize: '13px', color: '#1e3a8a', lineHeight: 1.5}}>
                Enviar un análisis comparativo de mercado (CMA) resaltando que la propiedad ya está a un precio competitivo en la zona para mitigar la negociación agresiva.
              </p>
              <button style={{width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}>
                <Sparkles size={16} /> Generar Reporte con IA
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default ClientCRMDetailView;
