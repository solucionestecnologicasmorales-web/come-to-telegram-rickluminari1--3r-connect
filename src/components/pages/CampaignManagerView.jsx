import React, { useState, useEffect } from 'react';
import { Mail, Play, CheckCircle2, Users } from 'lucide-react';

const CampaignManagerView = () => {
  const [status, setStatus] = useState('idle'); // idle, running, finished
  const [progress, setProgress] = useState(0);
  const total = 45;

  useEffect(() => {
    let interval;
    if (status === 'running') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= total) {
            clearInterval(interval);
            setStatus('finished');
            return total;
          }
          return prev + 1;
        });
      }, 100); // simulated fast sending
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleStart = () => {
    setStatus('running');
    setProgress(0);
  };

  const percentage = Math.floor((progress / total) * 100);

  return (
    <div style={{padding: '32px', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px'}}>
        <Mail size={32} color="#8b5cf6" />
        <h2 style={{margin: 0, fontSize: '24px', color: '#0f172a'}}>Gestión de Campañas Inteligentes</h2>
      </div>
      
      <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex'}}>
        
        {/* Left Side: Campaign Setup */}
        <div style={{flex: 1, padding: '32px', borderRight: '1px solid #e2e8f0'}}>
          <div style={{display: 'inline-block', background: '#ede9fe', color: '#6d28d9', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, marginBottom: '16px'}}>
            Campaña de Reactivación (IA)
          </div>
          <h3 style={{margin: '0 0 8px 0', fontSize: '20px'}}>Reactivar "Casa Lomas Altas"</h3>
          <p style={{color: '#64748b', marginBottom: '24px', lineHeight: '1.5'}}>
            La IA ha identificado {total} prospectos inactivos con un match superior al 85% para esta propiedad. Se enviará un correo personalizado sugiriendo un Tour 3D.
          </p>
          
          <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '32px'}}>
            <div style={{fontWeight: 600, marginBottom: '8px'}}>Asunto:</div>
            <div style={{color: '#334155'}}>&quot;{'{'}{'{'}nombre{'}'}{'}'}, encontramos una propiedad ideal para ti en Lomas Altas&quot;</div>
          </div>
          
          {status === 'idle' && (
            <button onClick={handleStart} className="btn btn-primary" style={{width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
              <Play size={18} /> Ejecutar Campaña Ahora
            </button>
          )}
          
          {(status === 'running' || status === 'finished') && (
            <div style={{background: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                <span style={{fontWeight: 600, color: '#0f172a'}}>Progreso de envío</span>
                <span style={{fontWeight: 'bold', color: '#8b5cf6'}}>{progress} / {total} ({percentage}%)</span>
              </div>
              <div style={{width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{width: `${percentage}%`, height: '100%', background: '#8b5cf6', transition: 'width 0.1s linear'}}></div>
              </div>
              
              {status === 'finished' && (
                <div style={{marginTop: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500}}>
                  <CheckCircle2 size={18} /> ¡Campaña completada exitosamente!
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right Side: Audience List */}
        <div style={{flex: 1, padding: '32px', background: '#f8fafc'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 600, color: '#0f172a'}}>
            <Users size={20} /> Audiencia Seleccionada ({total})
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px'}}>
            {Array.from({length: Math.min(progress > 0 ? progress : 5, 8)}).map((_, i) => (
              <div key={i} style={{background: 'white', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: 500, fontSize: '14px', color: '#0f172a'}}>Prospecto #{1000 + i}</div>
                  <div style={{fontSize: '12px', color: '#64748b'}}>Afinidad: 9{Math.floor(Math.random()*9)}%</div>
                </div>
                {status === 'running' || status === 'finished' ? (
                  <CheckCircle2 size={16} color="#10b981" />
                ) : (
                  <span style={{fontSize: '12px', color: '#94a3b8'}}>Pendiente</span>
                )}
              </div>
            ))}
            {status === 'idle' && (
              <div style={{textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginTop: '8px'}}>
                Y {total - 5} prospectos más...
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CampaignManagerView;
