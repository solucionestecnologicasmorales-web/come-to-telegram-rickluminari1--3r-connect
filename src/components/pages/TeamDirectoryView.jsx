import React from 'react';
import { UserPlus, Star, Shield, Award } from 'lucide-react';

const TeamDirectoryView = () => {
  const mockTeam = [
    { id: 1, name: 'Laura Martínez', role: 'Broker Senior', closed: 12, time: '5m', quality: '98%', commission: '$450k', zones: 'Polanco, Lomas' },
    { id: 2, name: 'Carlos Ruiz', role: 'Asesor Junior', closed: 8, time: '12m', quality: '89%', commission: '$310k', zones: 'Condesa, Roma' },
    { id: 3, name: 'Asesor Premium (Tú)', role: 'Director Comercial', closed: 5, time: '18m', quality: '100%', commission: '$200k', zones: 'Todas' },
  ];

  return (
    <div style={{padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Equipo de Asesores</h2>
          <p style={{margin: 0, color: '#64748b'}}>Monitorea el rendimiento de tu agencia inmobiliaria.</p>
        </div>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Abriendo formulario de nuevo asesor...' } }))}>
          <UserPlus size={18} /> Registrar Asesor
        </button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px'}}>
        {mockTeam.map(member => (
          <div key={member.id} style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
            <div style={{background: '#f8fafc', padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{width: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold'}}>
                {member.name.substring(0,2).toUpperCase()}
              </div>
              <div>
                <h3 style={{margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a'}}>{member.name}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', fontWeight: 500}}>
                  <Shield size={14} color="#8b5cf6" /> {member.role}
                </div>
              </div>
            </div>
            <div style={{padding: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '16px'}}>
                <div>
                  <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Cierres (Mes)</div>
                  <div style={{fontSize: '20px', fontWeight: 'bold', color: '#0f172a'}}>{member.closed}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Comisiones Generadas</div>
                  <div style={{fontSize: '20px', fontWeight: 'bold', color: '#10b981'}}>{member.commission}</div>
                </div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Award size={18} color="#f59e0b" />
                  <span style={{fontSize: '14px', color: '#334155'}}>Calidad IA:</span>
                </div>
                <span style={{fontWeight: 'bold', color: '#0f172a'}}>{member.quality}</span>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Star size={18} color="#3b82f6" />
                  <span style={{fontSize: '14px', color: '#334155'}}>Tiempo de Resp.:</span>
                </div>
                <span style={{fontWeight: 'bold', color: '#0f172a'}}>{member.time}</span>
              </div>
              
              <div style={{background: '#f1f5f9', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#475569'}}>
                <strong>Zonas:</strong> {member.zones}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDirectoryView;
