export const chartData = [
  { name: 'Ene', visitas: 400, cierres: 240 },
  { name: 'Feb', visitas: 300, cierres: 139 },
  { name: 'Mar', visitas: 200, cierres: 980 },
  { name: 'Abr', visitas: 278, cierres: 390 },
  { name: 'May', visitas: 189, cierres: 480 },
  { name: 'Jun', visitas: 239, cierres: 380 },
  { name: 'Jul', visitas: 349, cierres: 430 },
];

export const zones = ['Polanco', 'Lomas de Chapultepec', 'Roma Norte', 'Condesa', 'Santa Fe', 'Coyoacán', 'Del Valle', 'Napoles', 'Pedregal', 'Reforma', 'Bosques de las Lomas', 'Interlomas', 'San Ángel'];
export const propTypes = ['Casa', 'Depto Lujo', 'Penthouse', 'Loft', 'Oficina', 'Terreno Residencial', 'Villa'];
export const images = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1cd2cb8ea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

export const mockProperties = Array.from({length: 50}).map((_, i) => {
  const type = propTypes[Math.floor(Math.random() * propTypes.length)];
  const zone = zones[Math.floor(Math.random() * zones.length)];
  const code = `3R-${100 + i}`;
  return {
    id: `prop-${i}`,
    code,
    title: `${type} en ${zone}`,
    price: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(Math.floor(Math.random() * 200) * 100000 + 2000000),
    image: images[Math.floor(Math.random() * images.length)],
    specs: `${Math.floor(Math.random() * 4) + 1} Rec • ${Math.floor(Math.random() * 3) + 1} Baños • ${Math.floor(Math.random() * 300) + 50}m²`,
    badge: Math.random() > 0.7 ? 'Nuevo Ingreso' : (Math.random() > 0.5 ? 'Destacada' : 'Activa'),
    stagnant: Math.random() > 0.85,
    acmStatus: Math.random() > 0.7 ? 'high' : 'ok',
    matchCount: Math.floor(Math.random() * 50) + 5,
    diff: Math.floor(Math.random() * 15) + 5,
    lat: 19.4326 + (Math.random() - 0.5) * 0.1,
    lng: -99.1332 + (Math.random() - 0.5) * 0.1
  };
});

export const names = ['Juan Pérez', 'Ana García', 'Carlos Slim', 'Lucía Méndez', 'María Gómez', 'Roberto Palazuelos', 'Fernando Colunga', 'Sofía Vergara', 'David Bisbal', 'Pedro Infante', 'Jorge Negrete', 'Luis Miguel', 'Martha Higareda', 'Diego Luna', 'Gael García', 'Salma Hayek', 'Alfonso Cuarón', 'Guillermo del Toro', 'Eugenio Derbez', 'Belinda', 'Danna Paola', 'Yalitza Aparicio'];
export const stages = ['contacto', 'visita', 'negociacion'];

export const mockFunnelLeads = {};
Array.from({length: 200}).forEach((_, i) => {
  const propId = `prop-${Math.floor(Math.random() * 50)}`;
  
  // Generar de 1 a 4 propiedades de interés adicionales
  const interestedProps = [propId];
  const numExtraProps = Math.floor(Math.random() * 3) + 1;
  for (let j = 0; j < numExtraProps; j++) {
    const extraProp = `prop-${Math.floor(Math.random() * 50)}`;
    if (!interestedProps.includes(extraProp)) {
      interestedProps.push(extraProp);
    }
  }

  const id = `lead-${i}`;
  mockFunnelLeads[id] = {
    id,
    propertyId: propId,
    interestedProperties: interestedProps,
    stage: stages[Math.floor(Math.random() * stages.length)],
    name: names[Math.floor(Math.random() * names.length)] + ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    time: `Hace ${Math.floor(Math.random() * 24) + 1} horas`,
    alert: Math.random() > 0.8,
    phone: '+52 55 ' + Math.floor(10000000 + Math.random() * 90000000).toString(),
    budget: '$' + (Math.floor(Math.random() * 10) + 2) + 'M',
    notes: 'Busca zona céntrica, preferiblemente con balcón.'
  };
});

export const mockAppointments = Array.from({length: 30}).map((_, i) => {
  const leadId = `lead-${Math.floor(Math.random() * 200)}`;
  const propId = mockFunnelLeads[leadId].propertyId;
  const day = Math.floor(Math.random() * 28) + 1;
  const time = `${Math.floor(Math.random() * 8) + 9}:00`;
  return {
    id: `apt-${i}`,
    leadId,
    propId,
    date: `2026-08-${day.toString().padStart(2, '0')}T${time}:00`,
    title: `Visita ${mockProperties.find(p=>p.id===propId).title}`
  };
});
