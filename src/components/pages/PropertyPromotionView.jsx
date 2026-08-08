import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink, Sparkles, Send, Search } from 'lucide-react';
import { mockProperties } from '../../mockData';

const WhatsAppIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-10.457a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/>
  </svg>
);

const LinkedInIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PropertyPromotionView = () => {
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0].id);
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('whatsapp');
  const [searchTerm, setSearchTerm] = useState('');

  const networks = [
    { id: 'whatsapp', name: 'WhatsApp', icon: WhatsAppIcon, color: '#25D366' },
    { id: 'facebook', name: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: '#E4405F' },
    { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2' }
  ];

  const generateDefaultText = (prop) => {
    return `¡Nueva Propiedad en el Mercado! 🏡✨\n\n${prop.title}\nPrecio: ${prop.price}\n\n${prop.description}\n\n👉 Contáctame para agendar una visita.\n🌐 https://3rconnect.com/p/${prop.id}\n\n#BienesRaices #Propiedades #RealEstate #Venta`;
  };

  const activeProp = mockProperties.find(p => p.id === selectedProperty) || mockProperties[0];
  
  const [postText, setPostText] = useState(generateDefaultText(mockProperties[0]));
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Update text when property changes
  React.useEffect(() => {
    setPostText(generateDefaultText(activeProp));
  }, [selectedProperty, activeProp]);

  const handleGenerate = () => {
    if(!aiPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setPostText(`¡Atención inversionistas! 🚀\n\nTenemos esta increíble oportunidad: ${activeProp.title} por solo ${activeProp.price}.\n\n${activeProp.description} 🔥\n\nNo dejes pasar esta oportunidad.\n👇 Haz clic aquí:\nhttps://3rconnect.com/p/${activeProp.id}\n\n#Inversion #BienesRaices #Oportunidad`);
      setIsGenerating(false);
      setAiPrompt('');
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{width: '100%', height: '100%', overflowY: 'auto', background: '#f8fafc', padding: '32px'}}>
      
      <div style={{marginBottom: '32px'}}>
        <h2 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Promoción de Inmuebles</h2>
        <p style={{margin: 0, color: '#64748b'}}>Comparte tu inventario captado en redes sociales con un solo clic.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px'}}>
        
        {/* Lista de Inmuebles */}
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: 'calc(100vh - 150px)'}}>
          <h3 style={{margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a'}}>Selecciona un Inmueble</h3>
          
          <div style={{position: 'relative', marginBottom: '8px'}}>
            <Search size={16} color="#94a3b8" style={{position: 'absolute', left: '12px', top: '10px'}} />
            <input 
              type="text" 
              placeholder="Buscar por título o zona..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px'}}
            />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '8px'}}>
            {mockProperties.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map(prop => (
              <div 
                key={prop.id}
                onClick={() => setSelectedProperty(prop.id)}
                style={{
                  display: 'flex', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer',
                  border: selectedProperty === prop.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  background: selectedProperty === prop.id ? '#eff6ff' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{width: '64px', height: '64px', borderRadius: '6px', background: `url(${prop.image}) center/cover`}}></div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.2, marginBottom: '4px'}}>{prop.title}</div>
                  <div style={{fontSize: '13px', color: '#10b981', fontWeight: 'bold'}}>{prop.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zona de Publicación */}
        <div style={{background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          
          <div style={{display: 'flex', gap: '16px', marginBottom: '32px'}}>
            {networks.map(net => (
              <button
                key={net.id}
                onClick={() => setSelectedNetwork(net.id)}
                style={{
                  flex: 1, padding: '16px', borderRadius: '8px', border: selectedNetwork === net.id ? `2px solid ${net.color}` : '1px solid #e2e8f0',
                  background: selectedNetwork === net.id ? `${net.color}10` : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <net.icon size={24} color={selectedNetwork === net.id ? net.color : '#64748b'} />
                <span style={{fontSize: '13px', fontWeight: 600, color: selectedNetwork === net.id ? net.color : '#64748b'}}>{net.name}</span>
              </button>
            ))}
          </div>

          <div style={{display: 'flex', gap: '24px'}}>
            
            {/* Preview */}
            <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden'}}>
              <div style={{background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Share2 size={16} color="#64748b" />
                <span style={{fontSize: '14px', fontWeight: 600, color: '#334155'}}>Vista Previa del Post</span>
              </div>
              <div style={{width: '100%', height: '240px', background: `url(${activeProp.image}) center/cover`}}></div>
              <div style={{padding: '16px'}}>
                <textarea 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  style={{width: '100%', height: '180px', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: '#334155', lineHeight: 1.5, background: 'transparent'}}
                />
              </div>
              <div style={{padding: '12px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0'}}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <div style={{position: 'relative', flex: 1}}>
                    <Sparkles size={16} color="#8b5cf6" style={{position: 'absolute', left: '12px', top: '12px'}} />
                    <input 
                      type="text" 
                      placeholder="Ej. Hazlo más corto y persuasivo..." 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                      style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px'}}
                    />
                  </div>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !aiPrompt.trim()}
                    style={{
                      background: isGenerating || !aiPrompt.trim() ? '#cbd5e1' : '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 16px', 
                      display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, cursor: isGenerating || !aiPrompt.trim() ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    {isGenerating ? 'Generando...' : <><Send size={14} /> Aplicar</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div style={{width: '250px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <h3 style={{margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a'}}>Acciones Rápidas</h3>
              
              <button 
                onClick={handleCopy}
                className="btn btn-secondary" 
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', width: '100%'}}
              >
                {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                {copied ? '¡Copiado!' : 'Copiar Texto'}
              </button>
              
              <button 
                className="btn btn-primary" 
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', width: '100%', background: networks.find(n => n.id === selectedNetwork).color, borderColor: networks.find(n => n.id === selectedNetwork).color}}
                onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Abriendo ${networks.find(n => n.id === selectedNetwork).name}...`, type: 'info' } }))}
              >
                <ExternalLink size={18} />
                Publicar en {networks.find(n => n.id === selectedNetwork).name}
              </button>

              <div style={{marginTop: 'auto', background: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #bfdbfe'}}>
                <div style={{fontSize: '13px', color: '#1e3a8a', lineHeight: 1.5}}>
                  <strong>Tip de IA:</strong><br/>
                  Publicar en Instagram entre las 6:00 PM y 8:00 PM genera 40% más de interacciones en esta zona.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyPromotionView;
