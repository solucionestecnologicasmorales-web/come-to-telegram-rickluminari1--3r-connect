import React, { useState } from 'react';
import { Search, BookOpen, Video, MessageCircle, HelpCircle, ChevronRight, PhoneCall, Mail } from 'lucide-react';

const HelpCenterView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: 'Guías de Inicio Rápidos', icon: BookOpen, desc: 'Aprende a usar la plataforma desde cero.', articles: 12 },
    { title: 'Tutoriales en Video', icon: Video, desc: 'Paso a paso de cómo captar y cerrar con el sistema.', articles: 8 },
    { title: 'FAQ y Resolución', icon: HelpCircle, desc: 'Preguntas frecuentes sobre el uso del CRM.', articles: 24 },
    { title: 'Soporte Técnico', icon: MessageCircle, desc: 'Contacta directo con el equipo de TI.', articles: 'Chat' },
  ];

  const popularArticles = [
    '¿Cómo sincronizar mi calendario de Google?',
    'Cómo interpretar el "Match Score" de la IA en un lead.',
    'Pasos para solicitar una campaña de marketing en redes.',
    'No puedo acceder a los datos de contacto de mi cliente, ¿qué hago?',
    'Guía para usar el Análisis Comparativo de Mercado (ACM).'
  ];

  return (
    <div style={{width: '100%', height: '100%', overflowY: 'auto', background: '#f8fafc', padding: '32px'}}>
      
      {/* Cabecera / Buscador */}
      <div style={{background: '#1e3a8a', borderRadius: '16px', padding: '48px 32px', textAlign: 'center', marginBottom: '32px', color: 'white'}}>
        <h1 style={{margin: '0 0 16px 0', fontSize: '32px', color: 'white'}}>¿Cómo podemos ayudarte hoy?</h1>
        <p style={{margin: '0 0 32px 0', fontSize: '16px', opacity: 0.9}}>Busca guías, tutoriales o contacta a soporte.</p>
        
        <div style={{position: 'relative', maxWidth: '600px', margin: '0 auto'}}>
          <input 
            type="text" 
            placeholder="Ej. ¿Cómo agendar una cita?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{width: '100%', padding: '16px 24px 16px 48px', borderRadius: '32px', border: 'none', outline: 'none', fontSize: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}
          />
          <Search size={20} color="#94a3b8" style={{position: 'absolute', left: '16px', top: '16px'}} />
          <button style={{position: 'absolute', right: '8px', top: '8px', background: '#3b82f6', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer'}}>Buscar</button>
        </div>
      </div>

      {/* Tarjetas de Categorías */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px'}}>
        {categories.map((cat, i) => (
          <div key={i} style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s'}} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 10px 25px rgba(0,0,0,0.05)'}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
              <cat.icon size={24} />
            </div>
            <h3 style={{margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a'}}>{cat.title}</h3>
            <p style={{margin: '0 0 16px 0', fontSize: '13px', color: '#64748b', lineHeight: 1.5}}>{cat.desc}</p>
            <div style={{fontSize: '12px', fontWeight: 600, color: '#3b82f6'}}>{cat.articles} artículos</div>
          </div>
        ))}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px'}}>
        
        {/* Artículos Populares */}
        <div style={{background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <h2 style={{margin: '0 0 24px 0', fontSize: '20px', color: '#0f172a'}}>Artículos Más Buscados</h2>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {popularArticles.map((article, i) => (
              <div key={i} style={{padding: '16px 0', borderBottom: i !== popularArticles.length - 1 ? '1px solid #e2e8f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}} onMouseOver={e=>e.currentTarget.style.color='#3b82f6'} onMouseOut={e=>e.currentTarget.style.color='#334155'}>
                <span style={{fontSize: '15px', color: 'inherit'}}>{article}</span>
                <ChevronRight size={18} color="#cbd5e1" />
              </div>
            ))}
          </div>
        </div>

        {/* Contacto Directo */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div style={{background: 'linear-gradient(to right bottom, #eff6ff, #dbeafe)', padding: '32px', borderRadius: '12px', border: '1px solid #bfdbfe'}}>
            <h2 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#1e3a8a'}}>¿No encuentras lo que buscas?</h2>
            <p style={{margin: '0 0 24px 0', fontSize: '14px', color: '#334155', lineHeight: 1.5}}>Nuestro equipo de soporte a asesores está disponible de Lunes a Sábado, de 9 AM a 7 PM para ayudarte.</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px'}}>
                <MessageCircle size={18} /> Iniciar Chat en Vivo
              </button>
              <button className="btn btn-secondary" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'white'}}>
                <PhoneCall size={18} /> Solicitar Llamada
              </button>
            </div>
          </div>

          <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px'}}>
            <Mail size={24} color="#64748b" />
            <div>
              <div style={{fontWeight: 600, color: '#0f172a', fontSize: '14px'}}>Soporte por Correo</div>
              <div style={{color: '#3b82f6', fontSize: '13px', marginTop: '4px'}}>soporte.asesores@3rconnect.com</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HelpCenterView;
