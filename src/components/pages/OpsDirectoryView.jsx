import React, { useState } from 'react';
import { Download, Building2, Filter, Search, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Wallet, MoreVertical } from 'lucide-react';
import OpsDetailView from './OpsDetailView';

const OpsDirectoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOp, setSelectedOp] = useState(null);

  const mockOps = [
    { id: '#OP-1029', property: 'Casa Lomas Altas', agent: 'Laura Martínez', amount: '$12.5M', commission: '$625,000', date: '15/08/2026', status: 'Pagada' },
    { id: '#OP-1030', property: 'Depto Polanco', agent: 'Carlos Ruiz', amount: '$8.2M', commission: '$410,000', date: '22/08/2026', status: 'En Proceso' },
    { id: '#OP-1031', property: 'Oficinas Santa Fe', agent: 'Asesor Premium', amount: '$4.1M', commission: '$205,000', date: '30/08/2026', status: 'Cancelada' },
    { id: '#OP-1032', property: 'Casa Condesa', agent: 'Laura Martínez', amount: '$6.5M', commission: '$325,000', date: '05/09/2026', status: 'En Proceso' },
    { id: '#OP-1033', property: 'Penthouse Roma', agent: 'Ana Soto', amount: '$9.0M', commission: '$450,000', date: '12/09/2026', status: 'En Proceso' },
  ];

  const filteredOps = mockOps.filter(op => 
    op.property.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedOp) {
    return <OpsDetailView op={selectedOp} onBack={() => setSelectedOp(null)} />;
  }

  return (
    <div className="dashboard-grid animate-fade-in" style={{gap: '24px'}}>
      
      {/* Header */}
      <div style={{gridColumn: 'span 12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Wallet size={28} color="#10b981" /> Operaciones Comerciales
          </h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Control financiero, forecast de comisiones y cierres notariales.</p>
        </div>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Descargando reporte financiero (Excel)...', type: 'success' } }))}>
          <Download size={18} /> Exportar Reporte
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="glass-card" style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Pipeline Financiero (Forecast)</span>
          <div style={{background: '#fef3c7', padding: '6px', borderRadius: '8px'}}><TrendingUp size={18} color="#d97706" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>$1,185,000</div>
        <span style={{fontSize: '13px', color: '#64748b'}}>Comisiones "En Proceso"</span>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Ingresos Cobrados (Mes)</span>
          <div style={{background: '#dcfce7', padding: '6px', borderRadius: '8px'}}><CheckCircle2 size={18} color="#16a34a" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#10b981'}}>$625,000</div>
        <span style={{fontSize: '13px', color: '#10b981', fontWeight: 600}}>+24% vs mes pasado</span>
      </div>

      <div className="glass-card" style={{gridColumn: 'span 4', borderLeft: '4px solid #ef4444', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontSize: '13px', fontWeight: 600, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Operaciones en Riesgo</span>
          <div style={{background: '#fee2e2', padding: '6px', borderRadius: '8px'}}><AlertTriangle size={18} color="#ef4444" /></div>
        </div>
        <div style={{fontSize: '36px', fontWeight: 700, margin: '8px 0', color: '#0f172a'}}>1</div>
        <span style={{fontSize: '13px', color: '#64748b'}}>Retraso notarial detectado por IA (#OP-1030)</span>
      </div>

      {/* Analytical Table */}
      <div className="glass-card" style={{gridColumn: 'span 12', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden'}}>
        
        <div style={{padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', background: '#f8fafc'}}>
          <div style={{flex: 1, position: 'relative'}}>
            <Search size={16} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'}} />
            <input 
              type="text" 
              placeholder="Buscar por ID, Inmueble o Asesor..."
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
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>ID / Inmueble</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Asesor</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Monto Venta</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Comisión Agencia</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Firma Pactada</th>
                <th style={{padding: '16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase'}}>Estado</th>
                <th style={{padding: '16px', width: '40px'}}></th>
              </tr>
            </thead>
            <tbody>
              {filteredOps.map(op => (
                <tr key={op.id} style={{borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => setSelectedOp(op)}>
                  <td style={{padding: '16px'}}>
                    <div style={{fontWeight: 600, color: '#3b82f6', fontSize: '13px'}}>{op.id}</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontSize: '14px', marginTop: '4px'}}>
                      <Building2 size={14} color="#64748b" /> {op.property}
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <span style={{fontSize: '14px', color: '#334155'}}>{op.agent}</span>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a'}}>{op.amount}</div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <div style={{fontSize: '14px', fontWeight: 600, color: '#10b981'}}>{op.commission}</div>
                  </td>
                  <td style={{padding: '16px'}}>
                    <span style={{fontSize: '14px', color: '#64748b'}}>{op.date}</span>
                  </td>
                  <td style={{padding: '16px'}}>
                    <span style={{background: op.status === 'Pagada' ? '#dcfce7' : op.status === 'En Proceso' ? '#fef9c3' : '#f1f5f9', color: op.status === 'Pagada' ? '#166534' : op.status === 'En Proceso' ? '#854d0e' : '#475569', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600}}>
                      {op.status}
                    </span>
                    {op.status === 'En Proceso' && op.id === '#OP-1030' && (
                      <div style={{display: 'inline-flex', marginLeft: '8px', color: '#ef4444'}} title="Retraso notarial detectado">
                        <AlertTriangle size={14} />
                      </div>
                    )}
                  </td>
                  <td style={{padding: '16px', textAlign: 'right'}}>
                    <button style={{background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8'}}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOps.length === 0 && (
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>No se encontraron operaciones.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OpsDirectoryView;
