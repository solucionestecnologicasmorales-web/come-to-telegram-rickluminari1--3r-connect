import React from 'react';
import { AlertTriangle, Clock, ChevronRight, User, CheckCircle2 } from 'lucide-react';
import { mockFunnelLeads } from '../../mockData';

const TaskResolutionView = ({ onResolve, onBack }) => {
  // Obtener 3 leads con tareas vencidas
  const pendingLeads = Object.values(mockFunnelLeads).slice(0, 3);
  
  return (
    <div style={{padding: '32px', maxWidth: '800px', margin: '0 auto'}} className="animate-fade-in">
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'}}>
        <button onClick={onBack} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '14px', fontWeight: 500}}>
          <ChevronRight size={16} style={{transform: 'rotate(180deg)', marginRight: '4px'}}/> Volver al Dashboard
        </button>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
        <div style={{width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'}}>
          <AlertTriangle size={24} />
        </div>
        <div>
          <h2 style={{margin: 0, fontSize: '24px', color: '#0f172a'}}>Centro de Resolución</h2>
          <p style={{margin: '4px 0 0 0', color: '#64748b'}}>Tienes {pendingLeads.length} tareas urgentes que requieren tu atención inmediata para no afectar tu Calidad IA.</p>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {pendingLeads.map((lead, idx) => (
          <div key={lead.id} className="glass-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', marginTop: '4px'}}>
                <User size={20} />
              </div>
              <div>
                <div style={{fontWeight: 600, fontSize: '16px', color: '#1e293b'}}>{lead.name}</div>
                <div style={{color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px'}}>
                  <Clock size={14} /> Tarea vencida: Enviar tour 3D por WhatsApp
                </div>
                <div style={{color: '#64748b', fontSize: '13px', marginTop: '4px'}}>
                  Vencido hace {24 + idx * 12} horas
                </div>
              </div>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={() => onResolve(lead.id)}
              style={{display: 'flex', alignItems: 'center', gap: '8px'}}
            >
              Atender Lead <ChevronRight size={16} />
            </button>
          </div>
        ))}
        
        <div className="glass-card" style={{padding: '24px', textAlign: 'center', marginTop: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.3)'}}>
          <CheckCircle2 size={32} color="#10b981" style={{marginBottom: '12px'}} />
          <div style={{fontWeight: 600, color: '#065f46'}}>¡Mantén tus tareas al día!</div>
          <div style={{color: '#047857', fontSize: '14px', marginTop: '4px'}}>Resolver estas tareas a tiempo te otorga un bono de 5% en tus leads calificados mensuales.</div>
        </div>
      </div>
    </div>
  );
};

export default TaskResolutionView;
