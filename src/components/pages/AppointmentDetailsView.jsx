import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, MapPin, User, FileText, 
  MessageSquare, Target, CheckCircle2, Plus, Paperclip, Home
} from 'lucide-react';
import { mockProperties, mockFunnelLeads, names } from '../../mockData';

const AppointmentDetailsView = ({ appointmentId, onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('detalles');
  const [conclusions, setConclusions] = useState('');
  
  // Mock appointment data
  const appointment = {
    id: appointmentId || 'apt-1',
    title: 'Visita Terreno Residencial en Condesa',
    date: '11 Ago 2026',
    time: '10:00 a.m.',
    status: 'Programada',
    objective: 'visita',
    client: Object.values(mockFunnelLeads)[0] || { name: names[0], phone: '555-0192', email: 'cliente@ejemplo.com' },
    properties: [mockProperties[0]],
    notes: 'El cliente busca un terreno para construir departamentos.',
    history: [
      { date: '01 Ago 2026', action: 'Primer contacto vía WhatsApp' },
      { date: '05 Ago 2026', action: 'Llamada de calificación (Presupuesto $5M)' }
    ]
  };

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', overflowY: 'auto', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button onClick={onBack} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#64748b" />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>{appointment.title}</h1>
            <span className="badge badge-primary">{appointment.status}</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', color: '#64748b', fontSize: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {appointment.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {appointment.time}</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Calendar size={18} /> Reprogramar
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Main Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Objective & Status */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
              <Target size={20} color="#3b82f6" /> Objetivo de la Cita
            </h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['contacto', 'visita', 'negociacion', 'cierre'].map(obj => (
                <div key={obj} style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: `2px solid ${appointment.objective === obj ? '#3b82f6' : '#e2e8f0'}`,
                  background: appointment.objective === obj ? '#eff6ff' : 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontWeight: appointment.objective === obj ? 600 : 400,
                  color: appointment.objective === obj ? '#1d4ed8' : '#64748b'
                }}>
                  {obj}
                </div>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <Home size={20} color="#3b82f6" /> Inmuebles a Mostrar
              </h3>
              <button style={{ background: 'none', border: 'none', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 600 }}>
                <Plus size={16} /> Añadir Inmueble
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appointment.properties.map(prop => (
                <div key={prop.id} style={{ display: 'flex', gap: '16px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', alignItems: 'center' }}>
                  <img src={prop.image} alt={prop.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{prop.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{prop.specs}</div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>${parseFloat(prop.price).toLocaleString()}</div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Ver Detalles</button>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusions & Next Steps */}
          <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(to right, #ffffff, #f8fafc)' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
              <CheckCircle2 size={20} color="#10b981" /> Conclusiones (Post-Cita)
            </h3>
            <textarea 
              value={conclusions}
              onChange={(e) => setConclusions(e.target.value)}
              placeholder="¿Cómo salió la cita? ¿Qué le gustó al cliente? ¿Cuáles son las objeciones?"
              style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'none', marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Programar Siguiente Paso
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Client Info */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
              <User size={20} color="#3b82f6" /> Cliente
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={24} color="#64748b" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>{appointment.client.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{appointment.client.phone}</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('client', appointment.client.id)}
              style={{ width: '100%', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '6px', color: '#334155', fontWeight: 600, cursor: 'pointer' }}
            >
              Abrir Perfil Completo
            </button>
          </div>

          {/* Documents */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <FileText size={20} color="#3b82f6" /> Documentos
              </h3>
              <button style={{ background: 'none', border: 'none', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 600 }}>
                <Plus size={16} /> Añadir
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                <Paperclip size={16} color="#64748b" />
                <span style={{ fontSize: '14px', color: '#334155', flex: 1 }}>Ficha_Tecnica_Terreno.pdf</span>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
              <MessageSquare size={20} color="#3b82f6" /> Historial de Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              {appointment.history.map((evt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', marginTop: '4px' }}></div>
                    {idx < appointment.history.length - 1 && <div style={{ width: '2px', flex: 1, background: '#e2e8f0', margin: '4px 0' }}></div>}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{evt.date}</div>
                    <div style={{ fontSize: '14px', color: '#334155' }}>{evt.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsView;
