import React from 'react';
import { Download, Building2, Filter } from 'lucide-react';

const OpsDirectoryView = () => {
  const mockOps = [
    { id: '#OP-1029', property: 'Casa Lomas Altas', agent: 'Laura Martínez', amount: '$12.5M', commission: '$625k', date: '15/08/2026', status: 'Pagada' },
    { id: '#OP-1030', property: 'Depto Polanco', agent: 'Carlos Ruiz', amount: '$8.2M', commission: '$410k', date: '22/08/2026', status: 'En Proceso' },
    { id: '#OP-1031', property: 'Oficinas Santa Fe', agent: 'Asesor Premium', amount: '$4.1M', commission: '$205k', date: '30/08/2026', status: 'Cancelada' },
    { id: '#OP-1032', property: 'Casa Condesa', agent: 'Laura Martínez', amount: '$6.5M', commission: '$325k', date: '05/09/2026', status: 'En Proceso' },
  ];

  return (
    <div style={{padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Operaciones Comerciales</h2>
          <p style={{margin: 0, color: '#64748b'}}>Control de escrituraciones y pipeline financiero.</p>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
          <button className="btn btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Filter size={18} /> Filtrar
          </button>
          <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Descargando reporte financiero (Excel)...', type: 'success' } }))}>
            <Download size={18} /> Exportar Excel
          </button>
        </div>
      </div>

      <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: '14px'}}>
              <th style={{padding: '16px 24px'}}>ID Operación</th>
              <th style={{padding: '16px 24px'}}>Inmueble</th>
              <th style={{padding: '16px 24px'}}>Asesor Encargado</th>
              <th style={{padding: '16px 24px'}}>Monto de Venta</th>
              <th style={{padding: '16px 24px'}}>Comisión (Agencia)</th>
              <th style={{padding: '16px 24px'}}>Fecha de Escrituración</th>
              <th style={{padding: '16px 24px'}}>Estado</th>
              <th style={{padding: '16px 24px'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockOps.map(op => (
              <tr key={op.id} style={{borderBottom: '1px solid #e2e8f0'}}>
                <td style={{padding: '16px 24px', fontWeight: 600, color: '#3b82f6'}}>{op.id}</td>
                <td style={{padding: '16px 24px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 500}}>
                    <Building2 size={16} color="#64748b" /> {op.property}
                  </div>
                </td>
                <td style={{padding: '16px 24px', color: '#334155'}}>{op.agent}</td>
                <td style={{padding: '16px 24px', fontWeight: 600, color: '#0f172a'}}>{op.amount}</td>
                <td style={{padding: '16px 24px', fontWeight: 600, color: '#10b981'}}>{op.commission}</td>
                <td style={{padding: '16px 24px', color: '#64748b', fontSize: '14px'}}>{op.date}</td>
                <td style={{padding: '16px 24px'}}>
                  <span style={{background: op.status === 'Pagada' ? '#dcfce7' : op.status === 'En Proceso' ? '#fef9c3' : '#fee2e2', color: op.status === 'Pagada' ? '#166534' : op.status === 'En Proceso' ? '#854d0e' : '#991b1b', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600}}>
                    {op.status}
                  </span>
                </td>
                <td style={{padding: '16px 24px'}}>
                  <button className="btn btn-secondary" style={{padding: '4px 12px', fontSize: '12px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Editando estado de la operación ${op.id}` } }))}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpsDirectoryView;
