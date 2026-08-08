import React, { useState, useEffect } from 'react';
import { Send, FileText, CheckCircle2, UserCircle } from 'lucide-react';

const EmailCenterView = ({ onBack }) => {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 2500);
  };

  return (
    <div style={{height: '100%', background: 'white', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px'}}>
        <Send size={24} color="#3b82f6" />
        <h2 style={{margin: 0, fontSize: '22px', fontWeight: 400, color: '#0f172a'}}>Centro de Envíos 3R</h2>
        {onBack && (
          <button onClick={onBack} style={{marginLeft: 'auto', background: 'none', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 500}}>
            Volver
          </button>
        )}
      </div>
      
      <div style={{padding: '32px', flex: 1, display: 'flex', justifyContent: 'center', background: '#f8fafc'}}>
        <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', width: '800px', overflow: 'hidden', alignSelf: 'flex-start'}}>
          
          {sent ? (
            <div style={{padding: '64px 32px', textAlign: 'center'}}>
              <CheckCircle2 size={64} color="#10b981" style={{margin: '0 auto 24px auto'}} />
              <h3 style={{margin: '0 0 16px 0', fontSize: '24px', color: '#0f172a'}}>¡Correo Enviado con Éxito!</h3>
              <p style={{color: '#64748b', fontSize: '16px', marginBottom: '32px'}}>El Análisis Comparativo de Mercado ha sido enviado a <strong>propietario@email.com</strong>.</p>
              {onBack && <button onClick={onBack} className="btn btn-primary" style={{padding: '10px 24px'}}>Volver al CRM</button>}
            </div>
          ) : (
            <>
              <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0'}}>
                <div style={{display: 'flex', gap: '16px', marginBottom: '16px'}}>
                  <div style={{width: '60px', color: '#64748b', fontWeight: 500}}>Para:</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 500}}>
                    <UserCircle size={16} /> propietario@email.com
                  </div>
                </div>
                <div style={{display: 'flex', gap: '16px', marginBottom: '16px'}}>
                  <div style={{width: '60px', color: '#64748b', fontWeight: 500}}>Asunto:</div>
                  <div style={{fontWeight: 600, color: '#0f172a'}}>Reporte de Plusvalía y Análisis de Mercado - Depto Polanco</div>
                </div>
              </div>
              
              <div style={{padding: '24px', background: '#f8fafc', minHeight: '300px'}}>
                <p style={{margin: '0 0 16px 0', color: '#334155'}}>Estimado propietario,</p>
                <p style={{margin: '0 0 16px 0', color: '#334155'}}>Adjunto encontrará el análisis comparativo de mercado (ACM) generado por nuestra inteligencia artificial para su departamento en Polanco. En este reporte detallamos los 12 comparables activos y las 5 operaciones cerradas recientes que respaldan nuestra estrategia de precio.</p>
                <p style={{margin: '0 0 24px 0', color: '#334155'}}>Quedo a su entera disposición para agendar una llamada y revisar la estrategia.</p>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', width: 'fit-content'}}>
                  <FileText size={32} color="#ef4444" />
                  <div>
                    <div style={{fontWeight: 600, color: '#0f172a'}}>ACM_Depto_Polanco_2026.pdf</div>
                    <div style={{fontSize: '12px', color: '#64748b'}}>2.4 MB</div>
                  </div>
                </div>
              </div>
              
              <div style={{padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', background: 'white'}}>
                <button 
                  onClick={handleSend} 
                  disabled={isSending}
                  className="btn btn-primary" 
                  style={{padding: '10px 32px', display: 'flex', alignItems: 'center', gap: '8px', opacity: isSending ? 0.7 : 1}}
                >
                  {isSending ? (
                    <>Enviando...</>
                  ) : (
                    <><Send size={18} /> Enviar Correo</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCenterView;
