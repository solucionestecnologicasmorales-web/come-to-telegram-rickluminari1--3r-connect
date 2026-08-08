import React, { useState } from 'react';
import { Sparkles, TrendingDown, EyeOff, AlertTriangle, ArrowRight, Zap, Target, BarChart3, CheckCircle2, MessageCircle, Rocket, Megaphone, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { mockProperties, images } from '../../mockData';

const AiRecommendationsView = () => {
  const [resolving, setResolving] = useState(null);
  const [resolvingAlert, setResolvingAlert] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [suggestedMessage, setSuggestedMessage] = useState("Hola Carlos, he estado analizando el mercado en Lomas de Chapultepec. Tu propiedad lleva 45 días sin ofertas y notamos que inmuebles similares han ajustado sus precios un 5% este mes. Te sugiero hacer una reducción del 5% para reactivar el interés y asegurar una venta rápida. ¿Qué opinas?");
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const [whatsAppSent, setWhatsAppSent] = useState(false);

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [suggestedCampaignAd, setSuggestedCampaignAd] = useState("🏡 ¡Oportunidad Única en Coyoacán! 🌳\n\nDescubre esta increíble propiedad con amplios espacios, iluminación natural y una ubicación inmejorable. Perfecta para tu familia.\n\n✨ 3 Recámaras\n🚗 2 Estacionamientos\n🔒 Seguridad 24/7\n\n¡Agenda tu visita hoy mismo y enamórate de tu próximo hogar! 👇\n[Link a la propiedad]");
  const [campaignAiPrompt, setCampaignAiPrompt] = useState('');
  const [isGeneratingCampaign, setIsGeneratingCampaign] = useState(false);
  const [isActivatingCampaign, setIsActivatingCampaign] = useState(false);
  const [campaignActivated, setCampaignActivated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedNetworks, setSelectedNetworks] = useState({ facebook: true, instagram: true, linkedin: false });

  const [showClientsModal, setShowClientsModal] = useState(false);
  const [suggestedClientsMessage, setSuggestedClientsMessage] = useState("¡Hola {{nombre}}! Tengo una propiedad que acaba de ingresar al mercado y hace 'match' perfecto con lo que estás buscando. Tiene 3 recámaras, está en la Zona Sur y entra en tu presupuesto. ¿Te gustaría agendar una visita antes de que la publiquemos masivamente?");
  const [clientsAiPrompt, setClientsAiPrompt] = useState('');
  const [isGeneratingClients, setIsGeneratingClients] = useState(false);
  const [isSendingToClients, setIsSendingToClients] = useState(false);
  const [clientsSent, setClientsSent] = useState(false);
  const [selectedPreviewClient, setSelectedPreviewClient] = useState('Luis M.');

  const toggleNetwork = (net) => setSelectedNetworks(prev => ({...prev, [net]: !prev[net]}));

  // Generate fake AI insights for the first few properties
  const initialInsights = [
    {
      id: mockProperties[0]?.id || 1,
      property: mockProperties[0],
      type: 'price',
      icon: TrendingDown,
      color: '#ef4444', // Red
      title: 'Ajuste de Precio Recomendado',
      analysis: 'La propiedad lleva 45 días en el mercado sin ofertas. El precio actual está un 8% por encima del mercado en esta zona (Lomas de Chapultepec) según las últimas 20 ventas.',
      actionLabel: 'Sugerir reducción del 5% al propietario',
      impact: 'Aumentaría la probabilidad de venta al 75% en 30 días.'
    },
    {
      id: mockProperties[1]?.id || 2,
      property: mockProperties[1],
      type: 'marketing',
      icon: EyeOff,
      color: '#f59e0b', // Yellow
      title: 'Baja Visibilidad en Redes',
      analysis: 'Las visualizaciones han caído un 40% esta semana. El algoritmo detecta que las fotos actuales tienen bajo contraste y no hay recorrido virtual.',
      actionLabel: 'Activar campaña de Ads & Renovar Fotos',
      impact: 'Estimación de 120 nuevos leads potenciales en 1 semana.'
    },
    {
      id: mockProperties[2]?.id || 3,
      property: mockProperties[2],
      type: 'match',
      icon: Target,
      color: '#3b82f6', // Blue
      title: 'Match de Compradores (98%)',
      analysis: 'Hemos detectado 3 clientes en tu cartera activa que están buscando exactamente estas características (Presupuesto $10M-$12M, 3 recámaras, Zona Sur).',
      actionLabel: 'Enviar propuesta a estos 3 clientes',
      impact: 'Alto potencial de cierre directo sin invertir en ads.'
    }
  ];

  const [activeInsights, setActiveInsights] = useState(initialInsights);

  const resolveInsight = (type) => {
    setActiveInsights(prev => prev.filter(i => i.type !== type));
  };

  const handleAction = (id) => {
    setResolving(id);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Acción automatizada ejecutada con éxito por la IA', type: 'success' } }));
      setResolving(null);
    }, 1500);
  };

  return (
    <div style={{width: '100%', height: '100%', overflowY: 'auto', background: '#f8fafc', padding: '32px', color: '#0f172a'}}>
      
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px'}}>
        <div style={{width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'}}>
          <Sparkles size={28} color="white" />
        </div>
        <div>
          <h2 style={{margin: '0 0 4px 0', fontSize: '28px', fontWeight: 700}}>Asistente Copilot IA</h2>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Análisis predictivo de inventario y sugerencias estratégicas de movimiento.</p>
        </div>
      </div>

      {/* Global Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px'}}>
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#64748b'}}>
            <BarChart3 size={20} />
            <span style={{fontSize: '14px'}}>Salud del Inventario</span>
          </div>
          <div style={{fontSize: '32px', fontWeight: 700, color: '#10b981'}}>82% <span style={{fontSize: '14px', fontWeight: 400, color: '#64748b'}}>Óptimo</span></div>
        </div>
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#64748b'}}>
            <AlertTriangle size={20} />
            <span style={{fontSize: '14px'}}>Inmuebles en Riesgo (Estancados)</span>
          </div>
          <div style={{fontSize: '32px', fontWeight: 700, color: '#ef4444'}}>3 <span style={{fontSize: '14px', fontWeight: 400, color: '#64748b'}}>Requieren acción</span></div>
        </div>
        <div style={{background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'}}>
          <div style={{position: 'absolute', right: -20, top: -20, opacity: 0.05}}>
            <Sparkles size={120} color="#8b5cf6" />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#64748b'}}>
            <Zap size={20} />
            <span style={{fontSize: '14px'}}>Oportunidades Automatizadas</span>
          </div>
          <div style={{fontSize: '32px', fontWeight: 700, color: '#8b5cf6'}}>12 <span style={{fontSize: '14px', fontWeight: 400, color: '#64748b'}}>Matches listos</span></div>
        </div>
      </div>

      {/* Urgent Alerts */}
      {!alertDismissed && (
        <>
          <h3 style={{fontSize: '20px', marginBottom: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <AlertTriangle size={24} />
            Alertas Urgentes
          </h3>
          <div style={{background: '#fef2f2', border: '1px solid #f87171', borderRadius: '12px', padding: '24px', marginBottom: '40px', display: 'flex', gap: '24px'}}>
            <div style={{flex: 1}}>
              <h4 style={{margin: '0 0 8px 0', color: '#b91c1c', fontSize: '18px'}}>Riesgo de Penalización: 3 Tareas de Seguimiento Vencidas</h4>
              <p style={{margin: 0, color: '#991b1b', fontSize: '15px', lineHeight: 1.6}}>
                La IA ha detectado que tienes leads clave esperando respuesta desde hace más de 24 horas. Esto afecta tu "Calidad de Seguimiento IA".
              </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '220px'}}>
              <button 
                onClick={() => {
                  setResolvingAlert(true);
                  setTimeout(() => {
                    setAlertDismissed(true);
                    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Respuestas automáticas generadas y enviadas con éxito', type: 'success' } }));
                  }, 2000);
                }}
                disabled={resolvingAlert}
                style={{
                  background: resolvingAlert ? '#fca5a5' : '#ef4444', color: 'white', border: 'none', padding: '12px', borderRadius: '8px',
                  fontWeight: 600, fontSize: '14px', cursor: resolvingAlert ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {resolvingAlert ? 'Generando respuestas...' : <><Sparkles size={16} /> Auto-Resolver con IA</>}
              </button>
            </div>
          </div>
        </>
      )}

      <h2 style={{fontSize: '20px', color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Sparkles size={24} color="#8b5cf6" />
        Sugerencias de IA
      </h2>

      {activeInsights.length === 0 ? (
        <div style={{background: 'white', borderRadius: '12px', padding: '64px 32px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
            <CheckCircle2 size={32} color="#16a34a" />
          </div>
          <h3 style={{margin: '0 0 8px 0', fontSize: '20px', color: '#0f172a'}}>¡Todo al día!</h3>
          <p style={{margin: 0, color: '#64748b', fontSize: '15px'}}>Has resuelto todas las sugerencias de la IA. Tu cartera está optimizada.</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          {activeInsights.map(item => (
            <div key={item.id} style={{background: 'white', borderRadius: '16px', border: `1px solid ${item.color}40`, display: 'flex', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
              
              {/* Property Image & Info */}
              <div style={{width: '300px', background: '#f8fafc'}}>
                <div style={{width: '100%', height: '180px', background: `url(${item.property?.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}) center/cover`}}></div>
                <div style={{padding: '16px'}}>
                  <div style={{fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px'}}>{item.property?.title}</div>
                  <div style={{fontSize: '14px', color: '#10b981', fontWeight: 700}}>{item.property?.price}</div>
                </div>
              </div>

              {/* AI Analysis */}
              <div style={{flex: 1, padding: '32px', display: 'flex', flexDirection: 'column'}}>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <h4 style={{margin: 0, fontSize: '18px', color: item.color}}>{item.title}</h4>
                </div>

                <p style={{margin: '0 0 24px 0', fontSize: '15px', color: '#475569', lineHeight: 1.6}}>
                  {item.analysis}
                </p>

                <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '16px 24px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <Sparkles size={16} color="#8b5cf6" />
                    <span style={{fontSize: '13px', color: '#64748b'}}>Impacto: <strong style={{color: '#0f172a'}}>{item.impact}</strong></span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (item.type === 'price') {
                        setShowMessageModal(true);
                      } else if (item.type === 'marketing') {
                        setShowCampaignModal(true);
                      } else if (item.type === 'match') {
                        setShowClientsModal(true);
                      } else {
                        handleAction(item.id);
                      }
                    }}
                    disabled={resolving === item.id}
                    style={{
                      background: resolving === item.id ? '#94a3b8' : item.color, 
                      color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', 
                      fontWeight: 600, fontSize: '14px', cursor: resolving === item.id ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                    }}
                  >
                    {resolving === item.id ? 'Ejecutando...' : (
                      <>
                        {item.actionLabel}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Suggestion Modal */}
      {showMessageModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowMessageModal(false)}>
          <div style={{background: 'white', borderRadius: '12px', width: '500px', maxWidth: '90%', padding: '32px', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <MessageCircle size={24} color="white" />
              </div>
              <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>Mensaje Sugerido (IA)</h2>
            </div>

            {whatsAppSent ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0'}}>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                  <CheckCircle2 size={32} color="white" />
                </div>
                <h3 style={{margin: '0 0 8px 0', color: '#0f172a'}}>¡Enviado con éxito!</h3>
                <p style={{margin: 0, color: '#64748b'}}>Abriendo WhatsApp para enviar a Carlos...</p>
              </div>
            ) : (
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
                  <img src="https://i.pravatar.cc/150?u=carlos" alt="Carlos Propietario" style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}} />
                  <div>
                    <div style={{fontWeight: 600, color: '#0f172a', fontSize: '15px'}}>Carlos (Propietario)</div>
                    <div style={{fontSize: '13px', color: '#64748b', display: 'flex', gap: '12px'}}>
                      <span>+52 55 2345 6789</span>
                      <span>carlos.p@ejemplo.com</span>
                    </div>
                  </div>
                </div>
                
                <div style={{background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                  <textarea 
                    value={suggestedMessage}
                    onChange={e => setSuggestedMessage(e.target.value)}
                    style={{width: '100%', minHeight: '120px', background: 'transparent', border: 'none', resize: 'vertical', fontSize: '15px', color: '#334155', outline: 'none', lineHeight: 1.5}}
                  />
                </div>

                <div style={{display: 'flex', gap: '8px', marginBottom: '24px'}}>
                  <input 
                    type="text" 
                    placeholder="Ej. Hazlo más amigable y corto..." 
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    style={{flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && aiPrompt) {
                        setIsGenerating(true);
                        setTimeout(() => {
                          setSuggestedMessage("¡Hola Carlos! 👋 Analizando el mercado en Lomas, noté que propiedades similares bajaron un 5% recientemente. Como llevamos 45 días sin ofertas, te sugiero un ligero ajuste del 5% para destacar y vender rápido. ¿Te late la idea?");
                          setIsGenerating(false);
                          setAiPrompt('');
                        }, 1000);
                      }
                    }}
                  />
                  <button 
                    disabled={isGenerating || !aiPrompt}
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        setSuggestedMessage("¡Hola Carlos! 👋 Analizando el mercado en Lomas, noté que propiedades similares bajaron un 5% recientemente. Como llevamos 45 días sin ofertas, te sugiero un ligero ajuste del 5% para destacar y vender rápido. ¿Te late la idea?");
                        setIsGenerating(false);
                        setAiPrompt('');
                      }, 1000);
                    }}
                    style={{background: isGenerating || !aiPrompt ? '#e2e8f0' : '#8b5cf6', color: isGenerating || !aiPrompt ? '#94a3b8' : 'white', border: 'none', padding: '0 16px', borderRadius: '8px', cursor: isGenerating || !aiPrompt ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600}}
                  >
                    <Sparkles size={16} /> {isGenerating ? '...' : 'Corregir'}
                  </button>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
                  <button onClick={() => setShowMessageModal(false)} style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer'}}>
                    Cancelar
                  </button>
                  <button disabled={isSendingWhatsApp} onClick={() => {
                    setIsSendingWhatsApp(true);
                    setTimeout(() => {
                      setIsSendingWhatsApp(false);
                      setWhatsAppSent(true);
                      setTimeout(() => {
                        setShowMessageModal(false);
                        setWhatsAppSent(false); // Reset para la proxima vez
                        resolveInsight('price');
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Mensaje enviado a Carlos', type: 'success' } }));
                      }, 2000);
                    }, 1500);
                  }} style={{padding: '10px 20px', borderRadius: '8px', border: 'none', background: isSendingWhatsApp ? '#86efac' : '#25D366', color: 'white', fontWeight: 600, cursor: isSendingWhatsApp ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s'}}>
                    <MessageCircle size={18} /> {isSendingWhatsApp ? 'Enviando...' : 'Enviar por WhatsApp'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Campaign Suggestion Modal */}
      {showCampaignModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowCampaignModal(false)}>
          <div style={{background: 'white', borderRadius: '12px', width: '550px', maxWidth: '90%', padding: '32px', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Megaphone size={24} color="white" />
              </div>
              <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>Campaña Sugerida (IA)</h2>
            </div>

            {campaignActivated ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0'}}>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                  <Rocket size={32} color="white" />
                </div>
                <h3 style={{margin: '0 0 8px 0', color: '#0f172a'}}>¡Campaña Activada!</h3>
                <p style={{margin: 0, color: '#64748b'}}>Tus anuncios están en revisión y se publicarán en breve.</p>
              </div>
            ) : (
              <>
                <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                    <div style={{width: '60px', height: '60px', borderRadius: '8px', background: `url(${images[currentImageIndex]}) center/cover`}}></div>
                    <div>
                      <div style={{fontWeight: 600, color: '#0f172a', fontSize: '15px'}}>{mockProperties[1].title}</div>
                      <div style={{fontSize: '13px', color: '#64748b', display: 'flex', gap: '12px'}}>
                        <span>{mockProperties[1].zone}</span>
                        <span>{mockProperties[1].price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{position: 'relative', width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0'}}>
                    <img src={images[currentImageIndex]} alt="Carousel preview" style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s'}} />
                    
                    <div style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 12px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', color: 'white', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <Megaphone size={12} /> Vista Previa del Anuncio
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); }}
                      style={{position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}
                    >
                      <ChevronLeft size={16} color="#0f172a" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); }}
                      style={{position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}
                    >
                      <ChevronRight size={16} color="#0f172a" />
                    </button>
                    <div style={{position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px'}}>
                      {images.map((_, i) => (
                        <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: currentImageIndex === i ? 'white' : 'rgba(255,255,255,0.5)', transition: 'background 0.3s'}} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                  <textarea 
                    value={suggestedCampaignAd}
                    onChange={e => setSuggestedCampaignAd(e.target.value)}
                    style={{width: '100%', minHeight: '140px', background: 'transparent', border: 'none', resize: 'vertical', fontSize: '15px', color: '#334155', outline: 'none', lineHeight: 1.5}}
                  />
                </div>

                <div style={{marginBottom: '16px'}}>
                  <div style={{fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Publicar en:</div>
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button 
                      onClick={() => toggleNetwork('facebook')}
                      style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: selectedNetworks.facebook ? '1px solid #1877F2' : '1px solid #e2e8f0', background: selectedNetworks.facebook ? '#ebf5ff' : 'white', color: selectedNetworks.facebook ? '#1877F2' : '#64748b', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'}}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Facebook
                    </button>
                    <button 
                      onClick={() => toggleNetwork('instagram')}
                      style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: selectedNetworks.instagram ? '1px solid #E1306C' : '1px solid #e2e8f0', background: selectedNetworks.instagram ? '#fce7f3' : 'white', color: selectedNetworks.instagram ? '#E1306C' : '#64748b', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'}}
                    >
                      <svg viewBox="0 0 24 24" fill="url(#ig-grad)" height="18" width="18">
                        <defs><linearGradient id="ig-grad" x1="0" x2="1" y1="1" y2="0"><stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" /><stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" /><stop offset="100%" stopColor="#bc1888" /></linearGradient></defs>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      Instagram
                    </button>
                    <button 
                      onClick={() => toggleNetwork('linkedin')}
                      style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: selectedNetworks.linkedin ? '1px solid #0077B5' : '1px solid #e2e8f0', background: selectedNetworks.linkedin ? '#e0f2fe' : 'white', color: selectedNetworks.linkedin ? '#0077B5' : '#64748b', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'}}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </button>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '8px', marginBottom: '24px'}}>
                  <input 
                    type="text" 
                    placeholder="Ej. Enfócalo a inversionistas jóvenes..." 
                    value={campaignAiPrompt}
                    onChange={e => setCampaignAiPrompt(e.target.value)}
                    style={{flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && campaignAiPrompt) {
                        setIsGeneratingCampaign(true);
                        setTimeout(() => {
                          setSuggestedCampaignAd("🚀 ¡El ROI que buscabas está en Coyoacán!\n\nPropiedad ideal para AirBnb o renta a largo plazo. Zona de alta plusvalía y demanda constante.\n\n📈 Retorno estimado: 8% anual\n📍 Excelente conectividad\n\n¿Quieres los números detallados? Haz clic abajo. 👇");
                          setIsGeneratingCampaign(false);
                          setCampaignAiPrompt('');
                        }, 1000);
                      }
                    }}
                  />
                  <button 
                    disabled={isGeneratingCampaign || !campaignAiPrompt}
                    onClick={() => {
                      setIsGeneratingCampaign(true);
                      setTimeout(() => {
                        setSuggestedCampaignAd("🚀 ¡El ROI que buscabas está en Coyoacán!\n\nPropiedad ideal para AirBnb o renta a largo plazo. Zona de alta plusvalía y demanda constante.\n\n📈 Retorno estimado: 8% anual\n📍 Excelente conectividad\n\n¿Quieres los números detallados? Haz clic abajo. 👇");
                        setIsGeneratingCampaign(false);
                        setCampaignAiPrompt('');
                      }, 1000);
                    }}
                    style={{background: isGeneratingCampaign || !campaignAiPrompt ? '#e2e8f0' : '#8b5cf6', color: isGeneratingCampaign || !campaignAiPrompt ? '#94a3b8' : 'white', border: 'none', padding: '0 16px', borderRadius: '8px', cursor: isGeneratingCampaign || !campaignAiPrompt ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600}}
                  >
                    <Sparkles size={16} /> {isGeneratingCampaign ? '...' : 'Corregir'}
                  </button>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
                  <button onClick={() => setShowCampaignModal(false)} style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer'}}>
                    Cancelar
                  </button>
                  <button disabled={isActivatingCampaign} onClick={() => {
                    setIsActivatingCampaign(true);
                    setTimeout(() => {
                      setIsActivatingCampaign(false);
                      setCampaignActivated(true);
                      setTimeout(() => {
                        setShowCampaignModal(false);
                        setCampaignActivated(false);
                        resolveInsight('marketing');
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Campaña lanzada correctamente', type: 'success' } }));
                      }, 2000);
                    }, 1500);
                  }} style={{padding: '10px 20px', borderRadius: '8px', border: 'none', background: isActivatingCampaign ? '#fcd34d' : '#f59e0b', color: 'white', fontWeight: 600, cursor: isActivatingCampaign ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s'}}>
                    <Rocket size={18} /> {isActivatingCampaign ? 'Activando...' : 'Activar Campaña'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Clients Match Suggestion Modal */}
      {showClientsModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowClientsModal(false)}>
          <div style={{background: 'white', borderRadius: '12px', width: '550px', maxWidth: '90%', padding: '32px', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Users size={24} color="white" />
              </div>
              <h2 style={{margin: 0, fontSize: '20px', color: '#0f172a'}}>Propuesta a Compradores (IA)</h2>
            </div>

            {clientsSent ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0'}}>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                  <CheckCircle2 size={32} color="white" />
                </div>
                <h3 style={{margin: '0 0 8px 0', color: '#0f172a'}}>¡Enviado a 3 clientes!</h3>
                <p style={{margin: 0, color: '#64748b'}}>Se ha disparado la secuencia de mensajes por WhatsApp.</p>
              </div>
            ) : (
              <>
                <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px'}}>
                  <div style={{fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Destinatarios (Clic para ver vista previa)</div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    {['Luis M.', 'Ana G.', 'Pedro R.'].map((client, idx) => (
                      <div 
                        key={client} 
                        onClick={() => setSelectedPreviewClient(client)}
                        style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '6px 12px', borderRadius: '20px', background: selectedPreviewClient === client ? '#dbeafe' : 'transparent', border: selectedPreviewClient === client ? '1px solid #93c5fd' : '1px solid transparent', transition: 'all 0.2s'}}
                      >
                        <img src={`https://i.pravatar.cc/150?u=a${idx+1}`} alt={client} style={{width: '32px', height: '32px', borderRadius: '50%'}} />
                        <span style={{fontSize: '14px', fontWeight: 500, color: selectedPreviewClient === client ? '#1d4ed8' : '#0f172a'}}>{client}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Plantilla del Mensaje (Usa {"{{nombre}}"})</div>
                  <textarea 
                    value={suggestedClientsMessage}
                    onChange={e => setSuggestedClientsMessage(e.target.value)}
                    style={{width: '100%', minHeight: '100px', background: 'transparent', border: 'none', resize: 'vertical', fontSize: '15px', color: '#334155', outline: 'none', lineHeight: 1.5}}
                  />
                </div>

                <div style={{background: '#ecfdf5', padding: '16px', borderRadius: '8px', border: '1px solid #a7f3d0', marginBottom: '16px'}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: '#065f46', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Vista Previa de WhatsApp ({selectedPreviewClient})</div>
                  <div style={{fontSize: '14px', color: '#064e3b', whiteSpace: 'pre-wrap', lineHeight: 1.5}}>
                    {suggestedClientsMessage.replace(/{{nombre}}/gi, selectedPreviewClient)}
                  </div>
                </div>

                <div style={{display: 'flex', gap: '8px', marginBottom: '24px'}}>
                  <input 
                    type="text" 
                    placeholder="Ej. Hazlo más persuasivo..." 
                    value={clientsAiPrompt}
                    onChange={e => setClientsAiPrompt(e.target.value)}
                    style={{flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px'}}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && clientsAiPrompt) {
                        setIsGeneratingClients(true);
                        setTimeout(() => {
                          setSuggestedClientsMessage("¡Hola {{nombre}}! Sé que estás buscando activamente en Zona Sur y te tengo una primicia. 🤫\n\nAcabamos de captar una propiedad con 3 recámaras a un súper precio. Hice match directo contigo. ¿Quieres verla mañana antes de que se publique y te la ganen?");
                          setIsGeneratingClients(false);
                          setClientsAiPrompt('');
                        }, 1000);
                      }
                    }}
                  />
                  <button 
                    disabled={isGeneratingClients || !clientsAiPrompt}
                    onClick={() => {
                      setIsGeneratingClients(true);
                      setTimeout(() => {
                        setSuggestedClientsMessage("¡Hola {{nombre}}! Sé que estás buscando activamente en Zona Sur y te tengo una primicia. 🤫\n\nAcabamos de captar una propiedad con 3 recámaras a un súper precio. Hice match directo contigo. ¿Quieres verla mañana antes de que se publique y te la ganen?");
                        setIsGeneratingClients(false);
                        setClientsAiPrompt('');
                      }, 1000);
                    }}
                    style={{background: isGeneratingClients || !clientsAiPrompt ? '#e2e8f0' : '#8b5cf6', color: isGeneratingClients || !clientsAiPrompt ? '#94a3b8' : 'white', border: 'none', padding: '0 16px', borderRadius: '8px', cursor: isGeneratingClients || !clientsAiPrompt ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600}}
                  >
                    <Sparkles size={16} /> {isGeneratingClients ? '...' : 'Corregir'}
                  </button>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
                  <button onClick={() => setShowClientsModal(false)} style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer'}}>
                    Cancelar
                  </button>
                  <button disabled={isSendingToClients} onClick={() => {
                    setIsSendingToClients(true);
                    setTimeout(() => {
                      setIsSendingToClients(false);
                      setClientsSent(true);
                      setTimeout(() => {
                        setShowClientsModal(false);
                        setClientsSent(false);
                        resolveInsight('match');
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Mensajes enviados a 3 clientes', type: 'success' } }));
                      }, 2000);
                    }, 1500);
                  }} style={{padding: '10px 20px', borderRadius: '8px', border: 'none', background: isSendingToClients ? '#93c5fd' : '#3b82f6', color: 'white', fontWeight: 600, cursor: isSendingToClients ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s'}}>
                    <MessageCircle size={18} /> {isSendingToClients ? 'Enviando...' : 'Enviar a 3 Clientes'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendationsView;
