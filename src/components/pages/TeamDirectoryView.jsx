import React, { useState } from 'react';
import { UserPlus, Star, Shield, Award, AlertTriangle, TrendingUp, Zap, Search, Filter, MoreVertical, CheckCircle2 } from 'lucide-react';
import AdminAgentDetailView from './AdminAgentDetailView';

const TeamDirectoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const mockTeam = [
    { id: 1, name: 'Laura Martínez', role: 'Broker Senior', pipeline: 24, closed: 12, time: '5m', quality: 98, aiAdoption: 95, commission: '$450k', status: 'Estrella', color: '#10b981' },
    { id: 2, name: 'Carlos Ruiz', role: 'Asesor Junior', pipeline: 18, closed: 4, time: '35m', quality: 72, aiAdoption: 40, commission: '$120k', status: 'Atención Req.', color: '#ef4444' },
    { id: 3, name: 'Ana Soto', role: 'Asesor', pipeline: 15, closed: 8, time: '12m', quality: 89, aiAdoption: 85, commission: '$310k', status: 'En Progreso', color: '#f59e0b' },
    { id: 4, name: 'Diego Luna', role: 'Asesor', pipeline: 20, closed: 9, time: '10m', quality: 91, aiAdoption: 88, commission: '$350k', status: 'En Progreso', color: '#f59e0b' },
    { id: 5, name: 'Asesor Premium (Tú)', role: 'Director Comercial', pipeline: 5, closed: 5, time: '2m', quality: 100, aiAdoption: 100, commission: '$200k', status: 'Estrella', color: '#10b981' },
  ];

  const filteredTeam = mockTeam.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedAgent) {
    return <AdminAgentDetailView agent={selectedAgent} onBack={() => setSelectedAgent(null)} />;
  }

  return (
    <div className="dashboard-grid animate-fade-in" style={{gap: '24px'}}>
      
      {/* Header */}
      <div style={{gridColumn: 'span 12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Shield size={28} color="#2563eb" /> Equipo de Asesores
          </h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Auditoría de rendimiento y adopción de IA del equipo comercial.</p>
        </div>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Abriendo formulario de nuevo asesor...' } }))}>
          <UserPlus size={18} /> Registrar Asesor
        </button>
      </div>

      {/* Team Intelligence Cards */}
      <div className="glass-card" style={{gridColumn: 'span 4', borderLeft: '4px solid #f59e0b', background: 'linear-gradient(to right, #fffbeb, white)'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Award size={24} color="#d97706" />
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#92400e'}}>Top Performer del Mes</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', color: '#64748b'}}><strong>Laura Martínez</strong> lidera con 12 cierres y 98% en Score de Calidad.</p>
            <button style={{background: 'white', border: '1px solid #fcd34d', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', color: '#b45309', fontWeight: 600, cursor: 'pointer'}}>Ver Perfil de Laura</button>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', borderLeft: '4px solid #ef4444', background: 'linear-gradient(to right, #fff1f2, white)'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#991b1b'}}>Alerta de Rendimiento</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', color: '#64748b'}}><strong>Carlos Ruiz</strong> tiene un tiempo de respuesta alto (35m) y baja adopción de IA.</p>
            <button style={{background: 'white', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', color: '#b91c1c', fontWeight: 600, cursor: 'pointer'}}>Agendar Coaching</button>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', borderLeft: '4px solid #8b5cf6', background: 'linear-gradient(to right, #f5f3ff, white)'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Zap size={24} color="#8b5cf6" />
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#5b21b6'}}>Adopción Global de IA</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', color: '#64748b'}}>El equipo utiliza sugerencias de IA en el <strong>81%</strong> de sus interacciones.</p>
            <div style={{width: '100%', height: '6px', background: '#ddd6fe', borderRadius: '4px'}}>
              <div style={{width: '81%', height: '100%', background: '#8b5cf6', borderRadius: '4px'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Table */}
      <div className="glass-card" style={{gridColumn: 'span 12', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden'}}>
        
        <div style={{padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', background: '#f8fafc'}}>
          <div style={{flex: 1, position: 'relative'}}>
            <Search size={16} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'}} />
            <input 
              type="text" 
              placeholder="Buscar asesor por nombre o rol..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}}
            />
          </div>
          <button style={{padding: '8px 16px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569'}}>
            <Filter size={16} /> Más filtros
          </button>
        </div>

        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{background: 'white', borderBottom: '1px solid #e2e8f0'}}>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Asesor</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Embudo Activo</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Cierres / Comisiones</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Eficiencia (Score / Resp.)</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Adopción IA</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Veredicto IA</th>
                <th style={{padding: '16px', width: '40px'}}></th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map(member => (
                <tr key={member.id} style={{borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => setSelectedAgent(member)}>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold'}}>
                        {member.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{fontWeight: 600, color: '#0f172a', fontSize: '14px'}}>{member.name}</div>
                        <div style={{color: '#64748b', fontSize: '13px'}}>{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <span style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>{member.pipeline}</span>
                    <span style={{fontSize: '12px', color: '#64748b', marginLeft: '4px'}}>clientes</span>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#10b981'}}>{member.commission}</div>
                    <div style={{fontSize: '12px', color: '#64748b'}}>{member.closed} ventas</div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{fontSize: '14px', fontWeight: 600, color: member.quality >= 90 ? '#10b981' : member.quality >= 80 ? '#f59e0b' : '#ef4444'}}>
                        {member.quality}%
                      </div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>({member.time})</div>
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px'}}>
                        <div style={{width: `${member.aiAdoption}%`, height: '100%', background: '#8b5cf6', borderRadius: '3px'}}></div>
                      </div>
                      <span style={{fontSize: '12px', fontWeight: 600, color: '#475569'}}>{member.aiAdoption}%</span>
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '20px', background: `${member.color}15`, color: member.color, fontSize: '12px', fontWeight: 600}}>
                      {member.status === 'Estrella' ? <Star size={12} /> : member.status === 'Atención Req.' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      {member.status}
                    </div>
                  </td>
                  <td style={{padding: '16px', textAlign: 'right'}}>
                    <button style={{background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8'}}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTeam.length === 0 && (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>No se encontraron asesores.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeamDirectoryView;
