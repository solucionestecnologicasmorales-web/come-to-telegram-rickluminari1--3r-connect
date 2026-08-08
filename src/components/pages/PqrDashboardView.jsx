import React from 'react';
import { AlertCircle, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

const PqrDashboardView = () => (
  <div style={{padding: '32px', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px'}}>
      <AlertCircle size={32} color="#3b82f6" />
      <h2 style={{margin: 0, fontSize: '24px', color: '#0f172a'}}>Mis Reportes y Ayuda</h2>
    </div>
    
    <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
      <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc'}}>
        <div>
          <div style={{fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '4px'}}>Folio de Reporte</div>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#0f172a'}}>#PQR-9821</div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#fffbeb', color: '#d97706', padding: '8px 16px', borderRadius: '24px', fontWeight: 600}}>
          <Clock size={18} />
          Bajo revisión por moderación
        </div>
      </div>
      
      <div style={{padding: '32px'}}>
        <h3 style={{margin: '0 0 24px 0', fontSize: '18px', color: '#0f172a'}}>Línea de Tiempo del Reporte</h3>
        
        <div style={{position: 'relative', paddingLeft: '48px'}}>
          <div style={{position: 'absolute', left: '19px', top: '24px', bottom: '0', width: '2px', background: '#e2e8f0'}}></div>
          
          <div style={{position: 'relative', marginBottom: '32px'}}>
            <div style={{position: 'absolute', left: '-48px', top: '0', width: '40px', height: '40px', borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
              <MessageSquare size={20} />
            </div>
            <div style={{fontWeight: 600, color: '#0f172a', marginBottom: '4px'}}>Reporte Creado</div>
            <div style={{fontSize: '14px', color: '#64748b', marginBottom: '8px'}}>Hoy, 10:45 AM</div>
            <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155'}}>
              "El asesor no se presentó a la cita programada en Polanco. Estuve esperando 30 minutos."
            </div>
          </div>

          <div style={{position: 'relative', marginBottom: '32px'}}>
            <div style={{position: 'absolute', left: '-48px', top: '0', width: '40px', height: '40px', borderRadius: '50%', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
              <Clock size={20} />
            </div>
            <div style={{fontWeight: 600, color: '#0f172a', marginBottom: '4px'}}>Bajo Revisión</div>
            <div style={{fontSize: '14px', color: '#64748b'}}>Hoy, 11:00 AM</div>
            <div style={{color: '#475569', marginTop: '8px'}}>Nuestro equipo de moderación está investigando lo sucedido con el asesor asignado.</div>
          </div>

          <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: '-48px', top: '0', width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
              <CheckCircle2 size={20} />
            </div>
            <div style={{fontWeight: 600, color: '#94a3b8', marginBottom: '4px'}}>Resolución</div>
            <div style={{fontSize: '14px', color: '#94a3b8'}}>Pendiente</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PqrDashboardView;
