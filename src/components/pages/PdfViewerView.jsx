import React from 'react';
import { Download, Printer, ZoomIn, ZoomOut, FileText } from 'lucide-react';

const PdfViewerView = () => (
  <div style={{height: '100%', minHeight: '100vh', background: '#525659', display: 'flex', flexDirection: 'column'}}>
    <div style={{background: '#323639', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', zIndex: 10}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', color: 'white'}}>
        <FileText size={20} />
        <span style={{fontSize: '14px', fontFamily: 'sans-serif'}}>Ficha_Tecnica_Depto_Polanco.pdf</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', color: 'white'}}>
        <button style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><ZoomOut size={20} /></button>
        <span style={{fontSize: '14px', fontFamily: 'sans-serif'}}>100%</span>
        <button style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><ZoomIn size={20} /></button>
        <div style={{width: '1px', height: '24px', background: '#5f6368', margin: '0 8px'}}></div>
        <button style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><Printer size={20} /></button>
        <button style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Descarga iniciada', type: 'success' } }))}><Download size={20} /></button>
      </div>
    </div>
    <div style={{flex: 1, overflow: 'auto', padding: '32px', display: 'flex', justifyContent: 'center'}}>
      <div style={{background: 'white', width: '800px', minHeight: '1131px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', padding: '48px', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #1e293b', paddingBottom: '24px', marginBottom: '32px'}}>
          <img src="/3r_gris_transparente.png" alt="3R Logo" style={{height: '40px'}} />
          <div style={{textAlign: 'right'}}>
            <h1 style={{margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a'}}>Depto Exclusivo en Polanco</h1>
            <div style={{fontSize: '18px', fontWeight: 'bold', color: '#3b82f6'}}>$8,200,000 MXN</div>
          </div>
        </div>
        
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" alt="Inmueble" style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '32px'}} />
        
        <div style={{display: 'flex', gap: '32px'}}>
          <div style={{flex: 2}}>
            <h3 style={{margin: '0 0 16px 0', color: '#0f172a'}}>Características</h3>
            <ul style={{margin: '0 0 32px 0', padding: '0 0 0 20px', color: '#475569', lineHeight: '1.6'}}>
              <li>3 Habitaciones espaciosas con baño propio</li>
              <li>2 Baños completos y 1 medio baño</li>
              <li>2 Lugares de estacionamiento techados</li>
              <li>150 m² de construcción</li>
              <li>Seguridad 24/7 y acceso controlado</li>
              <li>Amenidades: Gimnasio, Roof Garden y Salón de usos múltiples</li>
            </ul>
            <h3 style={{margin: '0 0 16px 0', color: '#0f172a'}}>Descripción</h3>
            <p style={{margin: 0, color: '#475569', lineHeight: '1.6'}}>
              Espectacular departamento con acabados de lujo, pisos de madera y excelente iluminación natural. Ubicado en una de las zonas más exclusivas de la ciudad, a pasos de parques, restaurantes y centros comerciales.
            </p>
          </div>
          <div style={{flex: 1, borderLeft: '1px solid #e2e8f0', paddingLeft: '32px'}}>
            <h3 style={{margin: '0 0 16px 0', color: '#0f172a'}}>Contacto</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '20px', fontWeight: 'bold', color: '#64748b'}}>CR</span>
              </div>
              <div>
                <div style={{fontWeight: 'bold', color: '#0f172a'}}>Carlos Ruiz</div>
                <div style={{fontSize: '14px', color: '#64748b'}}>Asesor Inmobiliario</div>
              </div>
            </div>
            <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{width: '120px', height: '120px', background: 'white', margin: '0 auto 12px auto', border: '1px solid #e2e8f0', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" style={{width: '100%', height: '100%'}} />
              </div>
              <div style={{fontSize: '12px', color: '#64748b', fontWeight: 500}}>Escanea para ver el Tour 3D</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PdfViewerView;
