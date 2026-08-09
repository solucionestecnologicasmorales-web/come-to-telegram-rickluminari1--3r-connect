import React, { useState } from 'react';
import { ArrowLeft, Building2, User, Calendar, DollarSign, CheckCircle2, Clock, AlertCircle, MessageSquare, Zap, Shield, FileText } from 'lucide-react';

const OpsDetailView = ({ op, onBack }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([{ text: newComment, date: 'Ahora mismo', author: 'Finanzas (Tú)' }, ...comments]);
      setNewComment('');
    }
  };

  const isCompleted = op.status === 'Pagada';
  const isAtRisk = op.status === 'En Proceso' && op.id === '#OP-1030'; // Hardcoded risk condition for demo
  const isCancelled = op.status === 'Cancelada';

  const healthColor = isCompleted ? '#10b981' : isCancelled ? '#94a3b8' : isAtRisk ? '#ef4444' : '#3b82f6';
  const healthScore = isCompleted ? 100 : isCancelled ? 0 : isAtRisk ? 45 : 85;

  return (
    <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={onBack} style={{background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
          <ArrowLeft size={20} color="#64748b" />
        </button>
        <div>
          <h2 style={{fontSize: '24px', color: '#0f172a', margin: '0 0 4px 0'}}>Expediente Operación {op.id}</h2>
          <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Building2 size={14} /> {op.property}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><User size={14} /> Asesor: {op.agent}</span>
            <span style={{background: isCompleted ? '#dcfce7' : isCancelled ? '#f1f5f9' : '#dbeafe', color: isCompleted ? '#166534' : isCancelled ? '#475569' : '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600}}>
              {op.status}
            </span>
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px'}}>
        
        {/* Left Column: Financial Info & Timeline */}
        <div style={{gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          {/* Main Financial Card */}
          <div className="glass-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '28px', fontWeight: 700, color: '#0f172a'}}>{op.amount}</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Monto de Cierre</div>
            </div>
            <div style={{width: '1px', height: '50px', background: '#e2e8f0'}}></div>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '28px', fontWeight: 700, color: '#10b981'}}>{op.commission}</div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Comisión Agencia</div>
            </div>
            <div style={{width: '1px', height: '50px', background: '#e2e8f0'}}></div>
            <div style={{textAlign: 'center', flex: 1}}>
              <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <Calendar size={20} color="#64748b" /> {op.date}
              </div>
              <div style={{fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Firma Pactada</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card">
            <h3 style={{fontSize: '18px', margin: '0 0 24px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Shield size={20} color="#8b5cf6" /> Bitácora Legal / Financiera
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              
              {isAtRisk && (
                <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                  <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                    <AlertCircle size={20} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Retraso Notarial (Alerta IA)</div>
                    <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>La Notaría 45 reporta retraso en la obtención del Certificado de Libertad de Gravamen.</div>
                    <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 2 días</div>
                  </div>
                </div>
              )}

              {isCompleted && (
                <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                  <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                    <DollarSign size={20} color="#16a34a" />
                  </div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Comisión Cobrada</div>
                    <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Transferencia recibida por {op.commission}. Expediente cerrado.</div>
                    <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>{op.date}</div>
                  </div>
                </div>
              )}

              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <Clock size={20} color="#3b82f6" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Expediente Enviado a Notaría</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Documentación completa enviada para proyecto de escrituración.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 15 días</div>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '16px', position: 'relative', paddingBottom: '24px'}}>
                <div style={{position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '2px', background: '#e2e8f0', display: comments.length > 0 ? 'block' : 'none'}}></div>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1}}>
                  <FileText size={20} color="#64748b" />
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Apartado Recibido</div>
                  <div style={{fontSize: '13px', color: '#475569', marginTop: '4px'}}>Oferta aceptada por el propietario y apartado firmado de $50,000.</div>
                  <div style={{fontSize: '12px', color: '#94a3b8', marginTop: '4px'}}>Hace 20 días</div>
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
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>Nota Interna ({c.author})</div>
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
                  placeholder="Agregar seguimiento, actualización notarial o retrasos..."
                  style={{width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
                  disabled={isCompleted || isCancelled}
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isCompleted || isCancelled}
                  style={{alignSelf: 'flex-end', padding: '8px 16px', background: newComment.trim() ? '#8b5cf6' : '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: newComment.trim() && !isCompleted && !isCancelled ? 'pointer' : 'not-allowed', transition: 'background 0.2s'}}
                >
                  Agregar Nota al Expediente
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div className="glass-card" style={{borderTop: `4px solid ${healthColor}`}}>
            <h3 style={{fontSize: '16px', margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Zap size={18} color={healthColor} /> Financial Intelligence
            </h3>
            
            <div style={{marginBottom: '24px', textAlign: 'center', padding: '16px 0'}}>
              <div style={{fontSize: '48px', fontWeight: 800, color: healthColor, lineHeight: 1}}>{healthScore}%</div>
              <div style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginTop: '4px'}}>Probabilidad de Fecha de Cierre</div>
            </div>

            <div style={{padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '8px', display: 'block'}}>Notary Health (Análisis Histórico)</span>
              {isAtRisk ? (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  Esta Notaría presenta una <strong>desviación de +12 días</strong> promedio en sus trámites actuales debido a carga de trabajo en municipio.
                </p>
              ) : isCompleted ? (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  Operación cerrada en tiempo forma. El equipo notarial fue eficiente.
                </p>
              ) : (
                <p style={{margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5}}>
                  La notaría avanza conforme a los tiempos proyectados. Sin anomalías detectadas en el flujo documental.
                </p>
              )}
            </div>
            
            {!isCompleted && !isCancelled && (
              <div style={{padding: '16px', background: isAtRisk ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', border: `1px solid ${isAtRisk ? '#fecaca' : '#bbf7d0'}`}}>
                <span style={{fontSize: '12px', fontWeight: 700, color: isAtRisk ? '#ef4444' : '#16a34a', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <CheckCircle2 size={14} /> Next Best Action
                </span>
                <p style={{margin: '0 0 12px 0', fontSize: '13px', color: isAtRisk ? '#991b1b' : '#166534', lineHeight: 1.5}}>
                  {isAtRisk 
                    ? "Llamar urgentemente a gestoría notarial para acelerar el trámite de Libertad de Gravamen. Alertar al comprador sobre posible retraso de 1 semana."
                    : "Solicitar pre-cierre y revisión de proyecto de escritura a la notaría 3 días antes de la firma."}
                </p>
                <button style={{width: '100%', padding: '10px', background: isAtRisk ? '#ef4444' : '#16a34a', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s'}} onMouseOver={(e) => e.currentTarget.style.opacity = 0.9} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                  <AlertCircle size={16} /> Notificar Partes Involucradas
                </button>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default OpsDetailView;
