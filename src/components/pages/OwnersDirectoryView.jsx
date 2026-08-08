import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Building, Plus, TrendingUp, Calendar, ArrowRight, DollarSign } from 'lucide-react';
import { mockProperties } from '../../mockData';

const OwnersDirectoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generar mock data de propietarios y asignarles propiedades del inventario
  const mockOwners = [
    {
      id: 1,
      name: 'Roberto Fernández',
      email: 'roberto.f@ejemplo.com',
      phone: '+52 55 1234 5678',
      type: 'Inversionista',
      joinedDate: 'Ene 2023',
      avatar: 'https://i.pravatar.cc/150?u=rob',
      propertyIds: [mockProperties[0].id, mockProperties[3].id, mockProperties[7].id],
      preferredContact: 'WhatsApp'
    },
    {
      id: 2,
      name: 'Carolina Mendoza',
      email: 'caro.men@ejemplo.com',
      phone: '+52 55 8765 4321',
      type: 'Propietario Único',
      joinedDate: 'Mar 2024',
      avatar: 'https://i.pravatar.cc/150?u=caro',
      propertyIds: [mockProperties[1].id],
      preferredContact: 'Llamada'
    },
    {
      id: 3,
      name: 'Desarrolladora Del Valle (Empresa)',
      email: 'contacto@delvalle.com',
      phone: '+52 55 9999 8888',
      type: 'Desarrollador',
      joinedDate: 'Nov 2022',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80',
      propertyIds: [mockProperties[2].id, mockProperties[4].id, mockProperties[5].id, mockProperties[6].id],
      preferredContact: 'Email'
    }
  ];

  const [selectedOwner, setSelectedOwner] = useState(mockOwners[0]);

  const filteredOwners = mockOwners.filter(owner => 
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOwnerProperties = (owner) => {
    return owner.propertyIds.map(id => mockProperties.find(p => p.id === id)).filter(Boolean);
  };

  const activeProperties = getOwnerProperties(selectedOwner);
  const totalPortfolioValue = activeProperties.reduce((sum, prop) => {
    // Basic parse of string price like "$15.5M" to number
    const num = parseFloat(prop.price.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div style={{display: 'flex', height: '100%', width: '100%', background: '#f8fafc', overflow: 'hidden'}}>
      
      {/* Sidebar de Propietarios */}
      <div style={{width: '380px', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column'}}>
        <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>Propietarios</h2>
            <button style={{background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
              <Plus size={18} />
            </button>
          </div>
          
          <div style={{position: 'relative'}}>
            <Search size={18} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '10px'}} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px'}}
            />
          </div>
        </div>

        <div style={{flex: 1, overflowY: 'auto', padding: '12px'}}>
          {filteredOwners.map(owner => (
            <div 
              key={owner.id}
              onClick={() => setSelectedOwner(owner)}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', 
                borderRadius: '12px', cursor: 'pointer', marginBottom: '8px',
                background: selectedOwner.id === owner.id ? '#eff6ff' : 'transparent',
                border: selectedOwner.id === owner.id ? '1px solid #bfdbfe' : '1px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <img src={owner.avatar} alt={owner.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}} />
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, color: '#0f172a', fontSize: '15px'}}>{owner.name}</div>
                <div style={{fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px'}}>
                  <Building size={12} />
                  {owner.propertyIds.length} {owner.propertyIds.length === 1 ? 'Inmueble' : 'Inmuebles'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detalle del Propietario */}
      <div style={{flex: 1, overflowY: 'auto', padding: '32px'}}>
        
        {/* Encabezado del Perfil */}
        <div style={{background: 'white', borderRadius: '16px', padding: '32px', display: 'flex', gap: '32px', border: '1px solid #e2e8f0', marginBottom: '32px'}}>
          <img src={selectedOwner.avatar} alt={selectedOwner.name} style={{width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover'}} />
          
          <div style={{flex: 1}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div>
                <h1 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#0f172a'}}>{selectedOwner.name}</h1>
                <span style={{background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 600}}>
                  {selectedOwner.type}
                </span>
              </div>
              <button style={{background: 'white', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                Editar Perfil
              </button>
            </div>

            <div style={{display: 'flex', gap: '32px', marginTop: '24px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b'}}>
                <Phone size={18} />
                <span style={{color: '#0f172a', fontWeight: 500}}>{selectedOwner.phone}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b'}}>
                <Mail size={18} />
                <span style={{color: '#0f172a', fontWeight: 500}}>{selectedOwner.email}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b'}}>
                <Calendar size={18} />
                <span>Cliente desde {selectedOwner.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs del Propietario */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px'}}>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
            <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Building size={16} /> Total de Inmuebles
            </div>
            <div style={{fontSize: '28px', fontWeight: 700, color: '#0f172a'}}>{activeProperties.length}</div>
          </div>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
            <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <DollarSign size={16} /> Valor Estimado del Portafolio
            </div>
            <div style={{fontSize: '28px', fontWeight: 700, color: '#10b981'}}>${totalPortfolioValue.toFixed(1)}M</div>
          </div>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
            <div style={{color: '#64748b', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <TrendingUp size={16} /> Interés Promedio (Leads)
            </div>
            <div style={{fontSize: '28px', fontWeight: 700, color: '#8b5cf6'}}>Alta</div>
          </div>
        </div>

        {/* Lista de Inmuebles */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>Inmuebles Captados de este Propietario</h3>
          <button style={{background: 'transparent', color: '#2563eb', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
            Agregar Inmueble <Plus size={16} />
          </button>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
          {activeProperties.map(prop => (
            <div key={prop.id} style={{background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', ':hover': {transform: 'translateY(-2px)'}}}>
              <div style={{width: '100%', height: '180px', background: `url(${prop.image}) center/cover`}}></div>
              <div style={{padding: '16px'}}>
                <div style={{fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{prop.title}</div>
                <div style={{fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px'}}>
                  <MapPin size={14} /> {prop.zone || 'Zona Premium'}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px'}}>
                  <div style={{fontSize: '18px', color: '#10b981', fontWeight: 700}}>{prop.price}</div>
                  <button style={{background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569'}}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OwnersDirectoryView;
