import React, { useState } from 'react';
import { User, Settings, Link as LinkIcon, Star, Target, Calendar, Phone, Mail, Award, Shield, Bell, CheckCircle2, MapPin, BarChart3, Clock, Smartphone } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgentProfileView = () => {
  const [activeTab, setActiveTab] = useState('resumen');

  const performanceData = [
    { name: 'Ene', leads: 40, cierres: 2 },
    { name: 'Feb', leads: 45, cierres: 3 },
    { name: 'Mar', leads: 60, cierres: 4 },
    { name: 'Abr', leads: 55, cierres: 3 },
    { name: 'May', leads: 70, cierres: 5 },
    { name: 'Jun', leads: 85, cierres: 6 },
  ];

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#f8fafc', padding: '32px'}}>
      
      {/* Cabecera del Perfil */}
      <div style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '24px'}}>
        <div style={{height: '160px', background: 'linear-gradient(to right, #1e3a8a, #3b82f6)', position: 'relative'}}>
          <div style={{position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, backdropFilter: 'blur(4px)'}}>
            <Award size={16} /> Asesor Premium Nivel 3
          </div>
        </div>
        
        <div style={{padding: '0 32px 32px 32px', display: 'flex', gap: '24px', alignItems: 'flex-end', marginTop: '-60px'}}>
          <div style={{width: '120px', height: '120px', borderRadius: '50%', background: '#fff', padding: '4px', position: 'relative', zIndex: 2}}>
            <div style={{width: '100%', height: '100%', borderRadius: '50%', background: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80) center/cover'}}></div>
            <div style={{position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', border: '3px solid white'}}></div>
          </div>
          
          <div style={{flex: 1, paddingBottom: '8px'}}>
            <h1 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#0f172a'}}>Luis Morales</h1>
            <div style={{display: 'flex', gap: '16px', color: '#64748b', fontSize: '14px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Mail size={16} /> luis.morales@3rconnect.com</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Phone size={16} /> +52 55 1234 5678</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><MapPin size={16} /> Sede Polanco</div>
            </div>
          </div>
          
          <div style={{paddingBottom: '8px'}}>
            <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Settings size={18} /> Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '1px'}}>
        {[
          { id: 'resumen', icon: BarChart3, label: 'Resumen y Desempeño' },
          { id: 'config', icon: User, label: 'Configuración' },
          { id: 'integraciones', icon: LinkIcon, label: 'Integraciones' },
          { id: 'seguridad', icon: Shield, label: 'Seguridad' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 500,
              color: activeTab === tab.id ? '#3b82f6' : '#64748b',
              borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de Tabs */}
      <div style={{flex: 1}}>
        
        {activeTab === 'resumen' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'}}>
              {[
                { label: 'Cierres Este Mes', value: '6', trend: '+20%', icon: CheckCircle2, color: '#10b981' },
                { label: 'Leads Activos', value: '42', trend: '+15%', icon: Target, color: '#3b82f6' },
                { label: 'Rating Promedio', value: '4.9/5', trend: 'Estable', icon: Star, color: '#f59e0b' },
                { label: 'Inmuebles Captados', value: '14', trend: '+2', icon: MapPin, color: '#8b5cf6' },
              ].map((stat, i) => (
                <div key={i} style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b'}}>
                    <span style={{fontSize: '14px', fontWeight: 500}}>{stat.label}</span>
                    <stat.icon size={20} color={stat.color} />
                  </div>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: '#0f172a'}}>{stat.value}</div>
                  <div style={{fontSize: '13px', color: stat.trend.includes('+') ? '#10b981' : '#64748b', fontWeight: 500}}>
                    {stat.trend} vs mes anterior
                  </div>
                </div>
              ))}
            </div>

            <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', height: '400px'}}>
              <h3 style={{margin: '0 0 24px 0', fontSize: '18px', color: '#0f172a'}}>Evolución de Captación y Cierres (YTD)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                  <Line yAxisId="left" type="monotone" name="Leads Generados" dataKey="leads" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line yAxisId="right" type="monotone" name="Cierres Exitosos" dataKey="cierres" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

        {activeTab === 'config' && (
          <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px', margin: '0 auto'}}>
            <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0'}}>
              <h3 style={{margin: 0, fontSize: '18px', color: '#0f172a'}}>Información Personal</h3>
              <p style={{margin: '4px 0 0 0', fontSize: '14px', color: '#64748b'}}>Actualiza tu foto y datos de contacto públicos.</p>
            </div>
            
            <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <div style={{display: 'flex', gap: '24px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Nombre Completo</label>
                  <input type="text" defaultValue="Luis Morales" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Cargo Puesto</label>
                  <input type="text" defaultValue="Asesor Premium Nivel 3" disabled style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#94a3b8', outline: 'none', fontSize: '14px'}} />
                </div>
              </div>

              <div style={{display: 'flex', gap: '24px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Correo Electrónico (Corporativo)</label>
                  <input type="email" defaultValue="luis.morales@3rconnect.com" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Teléfono Móvil (WhatsApp)</label>
                  <input type="tel" defaultValue="+52 55 1234 5678" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
                </div>
              </div>

              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Biografía Pública (Para la App del Cliente)</label>
                <textarea rows="4" defaultValue="Soy experto en la zona de Polanco y Lomas con más de 10 años de experiencia. Mi prioridad es entender tus necesidades y encontrar la propiedad ideal con un enfoque 100% transparente." style={{width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', resize: 'vertical'}} />
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0'}}>
                <button className="btn btn-secondary">Descartar Cambios</button>
                <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Perfil actualizado exitosamente', type: 'success' } }))}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integraciones' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto'}}>
            {[
              { name: 'WhatsApp Business API', status: 'Conectado', icon: Smartphone, color: '#25D366', desc: 'Sincroniza tus chats de WhatsApp directamente con el CRM 3R Connect.' },
              { name: 'Google Calendar', status: 'Conectado', icon: Calendar, color: '#4285F4', desc: 'Tus citas agendadas se reflejan en tu calendario de Google.' },
              { name: 'Slack Notifications', status: 'Desconectado', icon: Bell, color: '#E01E5A', desc: 'Recibe alertas en Slack cuando un nuevo lead es asignado a ti.' }
            ].map((int, i) => (
              <div key={i} style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <div style={{width: '48px', height: '48px', borderRadius: '12px', background: `${int.color}15`, color: int.color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <int.icon size={24} />
                  </div>
                  <div>
                    <h4 style={{margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a'}}>{int.name}</h4>
                    <p style={{margin: 0, fontSize: '14px', color: '#64748b'}}>{int.desc}</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  {int.status === 'Conectado' ? (
                    <span style={{background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'}}><CheckCircle2 size={14}/> Conectado</span>
                  ) : (
                    <button className="btn btn-secondary" style={{padding: '6px 16px', fontSize: '13px'}}>Conectar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'seguridad' && (
          <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px', margin: '0 auto', padding: '24px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '40px', height: '40px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Shield size={20} />
              </div>
              <div>
                <h3 style={{margin: 0, fontSize: '18px', color: '#0f172a'}}>Seguridad y Contraseña</h3>
                <p style={{margin: '4px 0 0 0', fontSize: '14px', color: '#64748b'}}>Gestiona tus credenciales de acceso al sistema.</p>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Contraseña Actual</label>
                <input type="password" placeholder="••••••••" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Nueva Contraseña</label>
                <input type="password" placeholder="Mínimo 8 caracteres" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px'}}>Confirmar Nueva Contraseña</label>
                <input type="password" placeholder="Repite la contraseña" style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}} />
              </div>
              <button className="btn btn-primary" style={{marginTop: '8px'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Contraseña actualizada de forma segura', type: 'success' } }))}>Actualizar Contraseña</button>
            </div>
            
            <hr style={{border: 'none', borderTop: '1px solid #e2e8f0', margin: '32px 0'}} />
            
            <div>
              <h4 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a'}}>Dispositivos Activos</h4>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <Smartphone size={20} color="#64748b" />
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 500, color: '#0f172a'}}>iPhone 14 Pro (Actual)</div>
                    <div style={{fontSize: '12px', color: '#64748b'}}>Ciudad de México • IP 189.200.x.x</div>
                  </div>
                </div>
                <span style={{background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600}}>En uso</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgentProfileView;
