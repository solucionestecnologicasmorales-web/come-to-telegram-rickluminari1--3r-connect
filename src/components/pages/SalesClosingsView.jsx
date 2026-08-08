import React, { useState } from 'react';
import { Trophy, TrendingUp, DollarSign, Calendar, Target, Award, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesClosingsView = () => {
  const chartData = [
    { name: 'Semana 1', cierres: 2 },
    { name: 'Semana 2', cierres: 1 },
    { name: 'Semana 3', cierres: 3 },
    { name: 'Semana 4', cierres: 2 }
  ];

  const recentClosings = [
    { id: 1, property: 'Casa en Lomas de Chapultepec', client: 'Familia Garza', amount: '$15.5M', date: 'Hace 2 días', commission: '$465,000' },
    { id: 2, property: 'Depto Polanco (Arquímedes)', client: 'Roberto Gómez', amount: '$8.2M', date: 'Hace 5 días', commission: '$246,000' },
    { id: 3, property: 'Residencia en el Pedregal', client: 'María García', amount: '$11.0M', date: 'Hace 12 días', commission: '$330,000' }
  ];

  return (
    <div style={{width: '100%', height: '100%', overflowY: 'auto', background: '#f8fafc', padding: '32px'}}>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <div>
          <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Cierres del Mes</h2>
          <p style={{margin: 0, color: '#64748b'}}>Agosto 2026 - ¡Buen trabajo, sigues en racha!</p>
        </div>
        <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Trophy size={18} /> Registrar Nuevo Cierre
        </button>
      </div>

      {/* KPIs */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px'}}>
        {[
          { title: 'Volumen de Ventas', value: '$34.7M', trend: '+15%', icon: DollarSign, color: '#10b981' },
          { title: 'Comisiones (Brutas)', value: '$1.04M', trend: '+12%', icon: Award, color: '#3b82f6' },
          { title: 'Propiedades Vendidas', value: '8', trend: '+2', icon: Target, color: '#f59e0b' },
          { title: 'Días Prom. en Mercado', value: '18 días', trend: '-3 días', icon: Calendar, color: '#8b5cf6' }
        ].map((kpi, i) => (
          <div key={i} style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <span style={{fontSize: '14px', color: '#64748b', fontWeight: 500}}>{kpi.title}</span>
              <kpi.icon size={20} color={kpi.color} />
            </div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px'}}>{kpi.value}</div>
            <div style={{fontSize: '13px', color: kpi.trend.includes('+') ? '#10b981' : kpi.trend.includes('-') ? '#10b981' : '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'}}>
              <TrendingUp size={14} /> {kpi.trend} vs mes anterior
            </div>
          </div>
        ))}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
        
        {/* Gráfico */}
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <h3 style={{margin: '0 0 24px 0', fontSize: '18px', color: '#0f172a'}}>Ritmo de Ventas (Este Mes)</h3>
          <div style={{height: '300px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="cierres" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Cierres Recientes */}
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <h3 style={{margin: 0, fontSize: '18px', color: '#0f172a'}}>Últimos Cierres Exitosos</h3>
            <button style={{background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: '14px'}}>Ver Todos</button>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {recentClosings.map(c => (
              <div key={c.id} style={{padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s', cursor: 'pointer'}} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='white'}>
                <div>
                  <div style={{fontWeight: 600, color: '#0f172a', marginBottom: '4px', fontSize: '15px'}}>{c.property}</div>
                  <div style={{color: '#64748b', fontSize: '13px', display: 'flex', gap: '12px'}}>
                    <span>Cliente: {c.client}</span>
                    <span>•</span>
                    <span>{c.date}</span>
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontWeight: 'bold', color: '#10b981', fontSize: '16px', marginBottom: '2px'}}>{c.amount}</div>
                  <div style={{color: '#64748b', fontSize: '12px'}}>Comisión: {c.commission}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SalesClosingsView;
