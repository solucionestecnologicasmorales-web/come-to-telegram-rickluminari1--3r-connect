import React from 'react';
import { LayoutDashboard, Users, Calendar, TrendingUp, UserCircle, Home, FileText, ClipboardList, Share2, Sparkles, Key } from 'lucide-react';

const Sidebar = ({ userRole, currentView, setCurrentView, currentEntity, setCurrentEntity, setUserRole }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{justifyContent: 'center', padding: 'var(--spacing-xl) 0'}}>
        <img src="/3r_gris_transparente.png" alt="3R Logo" style={{height: '64px', objectFit: 'contain'}} />
      </div>

      <nav style={{marginTop: 'var(--spacing-xl)', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
        {userRole === 'admin' ? (
          <>
            <div className={`nav-item ${currentView === 'admin-dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('admin-dashboard')}>
              <LayoutDashboard size={20} />
              <span style={{fontWeight: 500}}>Dashboard Global</span>
            </div>
            <div className={`nav-item ${currentView === 'admin-crm' ? 'active' : ''}`} onClick={() => setCurrentView('admin-crm')}>
              <Users size={20} />
              <span style={{fontWeight: 500}}>CRM Global</span>
            </div>
            <div className={`nav-item ${currentView === 'admin-inventory' ? 'active' : ''}`} onClick={() => setCurrentView('admin-inventory')}>
              <Home size={20} />
              <span style={{fontWeight: 500}}>Inventario Global</span>
            </div>
            <div className={`nav-item ${currentView === 'team-directory' ? 'active' : ''}`} onClick={() => setCurrentView('team-directory')}>
              <UserCircle size={20} />
              <span style={{fontWeight: 500}}>Equipo de Asesores</span>
            </div>
            <div className={`nav-item ${currentView === 'commercial-ops' ? 'active' : ''}`} onClick={() => setCurrentView('commercial-ops')}>
              <ClipboardList size={20} />
              <span style={{fontWeight: 500}}>Operaciones Comerciales</span>
            </div>
          </>
        ) : (
          <>
            <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
              <LayoutDashboard size={20} />
              <span style={{fontWeight: 500}}>Mis Métricas</span>
            </div>
            <div className={`nav-item ${currentView === 'crm' && currentEntity?.type !== 'calendar' ? 'active' : ''}`} onClick={() => { setCurrentView('crm'); setCurrentEntity({ type: 'property-list' }); }}>
              <Users size={20} />
              <span style={{fontWeight: 500}}>CRM & Embudo</span>
            </div>
            <div className={`nav-item ${currentView === 'inventory' ? 'active' : ''}`} onClick={() => setCurrentView('inventory')}>
              <Home size={20} />
              <span style={{fontWeight: 500}}>Inventario de Inmuebles</span>
            </div>
            <div className={`nav-item ${currentView === 'client-directory' ? 'active' : ''}`} onClick={() => setCurrentView('client-directory')}>
              <Users size={20} />
              <span style={{fontWeight: 500}}>Directorio Clientes</span>
            </div>
            <div className={`nav-item ${currentView === 'owners-directory' ? 'active' : ''}`} onClick={() => setCurrentView('owners-directory')}>
              <Key size={20} />
              <span style={{fontWeight: 500}}>Directorio Propietarios</span>
            </div>
            <div className={`nav-item ${currentView === 'crm' && currentEntity?.type === 'calendar' ? 'active' : ''}`} onClick={() => { setCurrentView('crm'); setCurrentEntity({ type: 'calendar' }); }}>
              <Calendar size={20} />
              <span style={{fontWeight: 500}}>Agenda General</span>
            </div>
            <div className={`nav-item ${currentView === 'property-promotion' ? 'active' : ''}`} onClick={() => setCurrentView('property-promotion')}>
              <Share2 size={20} />
              <span style={{fontWeight: 500}}>Promoción Inmuebles</span>
            </div>
            <div className={`nav-item ${currentView === 'ai-assistant' ? 'active' : ''}`} onClick={() => setCurrentView('ai-assistant')}>
              <Sparkles size={20} />
              <span style={{fontWeight: 500}}>Asistente IA</span>
            </div>
            <div className={`nav-item ${currentView === 'academy' ? 'active' : ''}`} onClick={() => setCurrentView('academy')}>
              <TrendingUp size={20} />
              <span style={{fontWeight: 500}}>3R Academy</span>
            </div>
          </>
        )}
      </nav>
      
      <div style={{padding: 'var(--spacing-xl)', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div style={{width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <UserCircle size={24} color="#94a3b8" />
          </div>
          <div>
            <div style={{fontWeight: 600, color: 'white'}}>{userRole === 'admin' ? 'Administrador' : 'Asesor Premium'}</div>
            <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{userRole === 'admin' ? 'Broker / Director' : 'agencia@3rconnect.com'}</div>
          </div>
        </div>
        <button onClick={() => setUserRole(null)} className="btn btn-secondary" style={{width: '100%', fontSize: '0.8rem', padding: '8px', color: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)'}}>Cerrar Sesión</button>
      </div>
    </aside>
  );
};

export default Sidebar;
