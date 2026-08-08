import React from 'react';
import { Calendar, Clock, MapPin, Video, Users } from 'lucide-react';

const CalendarSimulationView = () => (
  <div style={{height: '100%', background: 'white', display: 'flex', flexDirection: 'column'}}>
    <div style={{padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px'}}>
      <Calendar size={24} color="#1a73e8" />
      <h2 style={{margin: 0, fontSize: '22px', fontWeight: 400, color: '#3c4043'}}>Google Calendar</h2>
    </div>
    <div style={{padding: '32px', flex: 1, display: 'flex', justifyContent: 'center', background: '#f8f9fa'}}>
      <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', width: '600px', overflow: 'hidden', alignSelf: 'flex-start'}}>
        <div style={{height: '10px', background: '#1a73e8'}}></div>
        <div style={{padding: '24px'}}>
          <h3 style={{margin: '0 0 16px 0', fontSize: '24px', color: '#3c4043'}}>Visita a Depto Polanco</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <Clock size={20} color="#5f6368" />
              <div style={{color: '#3c4043'}}>
                <div>Sábado, 15 de Agosto</div>
                <div style={{fontSize: '14px', color: '#5f6368'}}>10:00 AM – 11:00 AM</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <MapPin size={20} color="#5f6368" />
              <div style={{color: '#3c4043'}}>Av. Presidente Masaryk 123, Polanco, CDMX</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <Video size={20} color="#5f6368" />
              <button style={{background: '#1a73e8', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 500}}>Unirse con Google Meet</button>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
              <Users size={20} color="#5f6368" style={{marginTop: '4px'}} />
              <div style={{color: '#3c4043'}}>
                <div>2 invitados</div>
                <div style={{fontSize: '14px', color: '#5f6368', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '24px', height: '24px', background: '#e8f0fe', color: '#1a73e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'}}>T</div>
                  Tú (Organizador)
                </div>
                <div style={{fontSize: '14px', color: '#5f6368', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '24px', height: '24px', background: '#fce8e6', color: '#d93025', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'}}>C</div>
                  carlos.ruiz@ejemplo.com
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{background: '#f8f9fa', padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{color: '#3c4043', fontWeight: 500}}>¿Asistirás?</span>
          <button style={{background: 'white', border: '1px solid #dadce0', padding: '6px 16px', borderRadius: '4px', color: '#1a73e8', fontWeight: 500, cursor: 'pointer'}}>Sí</button>
          <button style={{background: 'white', border: '1px solid #dadce0', padding: '6px 16px', borderRadius: '4px', color: '#3c4043', fontWeight: 500, cursor: 'pointer'}}>Quizás</button>
          <button style={{background: 'white', border: '1px solid #dadce0', padding: '6px 16px', borderRadius: '4px', color: '#3c4043', fontWeight: 500, cursor: 'pointer'}}>No</button>
        </div>
      </div>
    </div>
  </div>
);

export default CalendarSimulationView;
