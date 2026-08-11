import React from 'react';
import { LayoutDashboard, Users, Calendar, TrendingUp, UserCircle, Home, FileText, ClipboardList, Share2, Sparkles, Key } from 'lucide-react';

const Sidebar = ({ userRole, currentView, setCurrentView, currentEntity, setCurrentEntity, setUserRole }) => {
  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Dashboard Global', icon: LayoutDashboard, action: () => setCurrentView('admin-dashboard') },
    { id: 'admin-crm', label: 'CRM Global', icon: Users, action: () => setCurrentView('admin-crm') },
    { id: 'admin-inventory', label: 'Inventario Global', icon: Home, action: () => setCurrentView('admin-inventory') },
    { id: 'team-directory', label: 'Equipo de Asesores', icon: UserCircle, action: () => setCurrentView('team-directory') },
    { id: 'commercial-ops', label: 'Operaciones Comerciales', icon: ClipboardList, action: () => setCurrentView('commercial-ops') }
  ];

  const agentNavItems = [
    { id: 'dashboard', label: 'Mis Métricas', icon: LayoutDashboard, active: currentView === 'dashboard', action: () => setCurrentView('dashboard') },
    { id: 'crm', label: 'CRM & Embudo', icon: Users, active: currentView === 'crm' && currentEntity?.type !== 'calendar', action: () => { setCurrentView('crm'); setCurrentEntity({ type: 'property-list' }); } },
    { id: 'inventory', label: 'Inventario de Inmuebles', icon: Home, active: currentView === 'inventory', action: () => setCurrentView('inventory') },
    { id: 'client-directory', label: 'Directorio Clientes', icon: Users, active: currentView === 'client-directory', action: () => setCurrentView('client-directory') },
    { id: 'owners-directory', label: 'Directorio Propietarios', icon: Key, active: currentView === 'owners-directory', action: () => setCurrentView('owners-directory') },
    { id: 'calendar', label: 'Agenda General', icon: Calendar, active: currentView === 'crm' && currentEntity?.type === 'calendar', action: () => { setCurrentView('crm'); setCurrentEntity({ type: 'calendar' }); } },
    { id: 'property-promotion', label: 'Promoción Inmuebles', icon: Share2, active: currentView === 'property-promotion', action: () => setCurrentView('property-promotion') },
    { id: 'ai-assistant', label: 'Asistente IA', icon: Sparkles, active: currentView === 'ai-assistant', action: () => setCurrentView('ai-assistant') },
    { id: 'academy', label: '3R Academy', icon: TrendingUp, active: currentView === 'academy', action: () => setCurrentView('academy') }
  ];

  const currentNav = userRole === 'admin' ? adminNavItems : agentNavItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{justifyContent: 'center', padding: 'var(--spacing-xl) 0'}}>
        <img 
          src="/3r_gris_transparente.png" 
          alt="3R Logo" 
          className="animate-fade-in"
          style={{height: '64px', objectFit: 'contain', transition: 'transform 0.3s ease'}} 
        />
      </div>

      <nav style={{marginTop: 'var(--spacing-xl)', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
        {currentNav.map((item, idx) => {
          const Icon = item.icon;
          const isActive = userRole === 'admin' ? currentView === item.id : item.active;
          return (
            <div 
              key={item.id} 
              className={`nav-item animate-slide-left stagger-${Math.min(idx + 1, 8)} ${isActive ? 'active' : ''}`} 
              onClick={item.action}
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <Icon size={20} />
              <span style={{fontWeight: 500}}>{item.label}</span>
            </div>
          );
        })}
      </nav>
      
      <div style={{padding: 'var(--spacing-xl)', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div 
            style={{
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(52, 131, 250, 0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
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
