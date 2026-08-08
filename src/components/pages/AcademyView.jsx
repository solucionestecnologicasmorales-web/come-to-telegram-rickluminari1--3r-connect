import React, { useState } from 'react';
import { 
  PlayCircle, BookOpen, CheckCircle, Clock, ChevronLeft, 
  MessageSquare, FileText, Download, Award
} from 'lucide-react';

const courseSyllabus = {
  id: 'c1',
  title: 'Ventas Inmobiliarias Avanzadas',
  description: 'Aprende a cerrar más ventas con técnicas de Programación Neurolingüística (PNL) aplicadas al sector inmobiliario.',
  instructor: 'Laura Mendoza',
  modules: [
    {
      id: 'm1',
      title: 'Módulo 1: Introducción a la PNL en Ventas',
      duration: '45 min',
      lessons: [
        { id: 'l1-1', title: '1.1 ¿Qué es la PNL y por qué funciona?', duration: '10:30', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: true },
        { id: 'l1-2', title: '1.2 Sistemas representacionales (VAK)', duration: '15:45', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: true },
        { id: 'l1-3', title: '1.3 Calibración visual y auditiva', duration: '12:20', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: false },
        { id: 'l1-4', title: 'Test: Sistemas representacionales', duration: '10 min', type: 'quiz', completed: false },
      ]
    },
    {
      id: 'm2',
      title: 'Módulo 2: Construyendo Rapport y Confianza',
      duration: '55 min',
      lessons: [
        { id: 'l2-1', title: '2.1 El arte del espejeo (Mirroring)', duration: '18:15', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: false },
        { id: 'l2-2', title: '2.2 Acompasamiento verbal', duration: '14:30', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: false },
        { id: 'l2-3', title: 'Guía de preguntas empáticas', duration: '5 min', type: 'reading', completed: false },
      ]
    },
    {
      id: 'm3',
      title: 'Módulo 3: Manejo de Objeciones y Cierre',
      duration: '1h 10m',
      lessons: [
        { id: 'l3-1', title: '3.1 El reencuadre positivo', duration: '20:10', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: false },
        { id: 'l3-2', title: '3.2 Patrones de lenguaje hipnótico', duration: '25:00', type: 'video', videoUrl: 'https://www.youtube.com/embed/Qp4LGIrMpLc', completed: false },
        { id: 'l3-3', title: 'Examen Final de Certificación', duration: '30 min', type: 'quiz', completed: false },
      ]
    }
  ]
};

const AcademyView = () => {
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('resumen');
  const [expandedModules, setExpandedModules] = useState(['m1']);

  const toggleModule = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleStartCourse = (course) => {
    setActiveCourse(course);
    setActiveLesson(course.modules[0].lessons[0]);
  };

  if (activeCourse && activeLesson) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc'}}>
        {/* Navbar */}
        <div style={{height: '64px', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px'}}>
          <button 
            onClick={() => setActiveCourse(null)}
            style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}
          >
            <ChevronLeft size={20} /> Volver al catálogo
          </button>
          <div style={{width: '1px', height: '24px', background: '#334155', margin: '0 8px'}}></div>
          <h2 style={{margin: 0, fontSize: '16px', fontWeight: 500}}>{activeCourse.title}</h2>
        </div>

        {/* Player & Syllabus Layout */}
        <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
          
          {/* Main Content (Left) */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
            
            {/* Video Player Area */}
            <div style={{background: 'black', width: '100%', aspectRatio: '16/9', position: 'relative'}}>
              {activeLesson.type === 'video' ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`${activeLesson.videoUrl}?autoplay=1`} 
                  title={activeLesson.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white'}}>
                  {activeLesson.type === 'quiz' ? <Award size={64} color="#3b82f6" /> : <FileText size={64} color="#3b82f6" />}
                  <h2 style={{marginTop: '24px'}}>{activeLesson.title}</h2>
                  <button className="btn btn-primary" style={{marginTop: '24px'}}>Comenzar {activeLesson.type === 'quiz' ? 'Test' : 'Lectura'}</button>
                </div>
              )}
            </div>

            {/* Lesson Details & Tabs */}
            <div style={{padding: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%'}}>
              <h1 style={{margin: '0 0 24px 0', fontSize: '28px', color: '#0f172a'}}>{activeLesson.title}</h1>
              
              <div style={{borderBottom: '1px solid #e2e8f0', marginBottom: '24px'}}>
                <div style={{display: 'flex', gap: '32px'}}>
                  {['resumen', 'recursos', 'discusion'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        background: 'none', border: 'none', padding: '0 0 12px 0', fontSize: '16px', fontWeight: 500, cursor: 'pointer',
                        color: activeTab === tab ? '#1d4ed8' : '#64748b',
                        borderBottom: activeTab === tab ? '2px solid #1d4ed8' : '2px solid transparent'
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'resumen' && (
                <div style={{color: '#334155', lineHeight: '1.6'}}>
                  <p>En esta lección, exploraremos los conceptos fundamentales presentados. Aprenderás a identificar señales no verbales clave y cómo utilizarlas para generar confianza de manera inmediata con tus prospectos.</p>
                  <p>Instructor: <strong>{activeCourse.instructor}</strong></p>
                </div>
              )}

              {activeTab === 'recursos' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
                    <FileText size={24} color="#3b82f6" />
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 500}}>Checklist_PNL_Ventas.pdf</div>
                      <div style={{fontSize: '13px', color: '#64748b'}}>Documento PDF • 2.4 MB</div>
                    </div>
                    <button style={{background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer'}}><Download size={20}/></button>
                  </div>
                </div>
              )}

              {activeTab === 'discusion' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{display: 'flex', gap: '16px', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                    <div style={{width: '40px', height: '40px', background: '#3b82f6', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>MR</div>
                    <div>
                      <div style={{fontWeight: 600, fontSize: '14px'}}>Mario Ruiz <span style={{color: '#64748b', fontWeight: 400, marginLeft: '8px'}}>Hace 2 días</span></div>
                      <p style={{margin: '8px 0 0 0', color: '#334155'}}>¡Excelente lección! Empecé a aplicar el espejeo en mis últimas dos citas y noté una apertura mucho mayor de los clientes.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Sidebar (Right) */}
          <div style={{width: '350px', background: 'white', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: '24px', borderBottom: '1px solid #e2e8f0'}}>
              <h3 style={{margin: 0, fontSize: '18px', color: '#0f172a'}}>Contenido del Curso</h3>
            </div>
            
            <div style={{flex: 1, overflowY: 'auto'}}>
              {activeCourse.modules.map(module => (
                <div key={module.id} style={{borderBottom: '1px solid #e2e8f0'}}>
                  <div 
                    onClick={() => toggleModule(module.id)}
                    style={{padding: '16px 24px', background: '#f8fafc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                  >
                    <div>
                      <div style={{fontWeight: 600, color: '#1e293b', fontSize: '14px', marginBottom: '4px'}}>{module.title}</div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>{module.lessons.length} lecciones • {module.duration}</div>
                    </div>
                  </div>
                  
                  {expandedModules.includes(module.id) && (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      {module.lessons.map(lesson => (
                        <div 
                          key={lesson.id} 
                          onClick={() => setActiveLesson(lesson)}
                          style={{
                            padding: '12px 24px 12px 48px', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            gap: '12px',
                            background: activeLesson.id === lesson.id ? '#eff6ff' : 'white',
                            borderLeft: activeLesson.id === lesson.id ? '4px solid #3b82f6' : '4px solid transparent'
                          }}
                        >
                          <div style={{marginTop: '2px'}}>
                            {lesson.completed ? (
                              <CheckCircle size={16} color="#10b981" />
                            ) : (
                              lesson.type === 'video' ? <PlayCircle size={16} color={activeLesson.id === lesson.id ? '#3b82f6' : '#94a3b8'} /> 
                              : lesson.type === 'quiz' ? <Award size={16} color={activeLesson.id === lesson.id ? '#3b82f6' : '#94a3b8'} /> 
                              : <BookOpen size={16} color={activeLesson.id === lesson.id ? '#3b82f6' : '#94a3b8'} />
                            )}
                          </div>
                          <div>
                            <div style={{fontSize: '14px', color: activeLesson.id === lesson.id ? '#1d4ed8' : '#334155', fontWeight: activeLesson.id === lesson.id ? 600 : 400}}>
                              {lesson.title}
                            </div>
                            <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                              <Clock size={12} /> {lesson.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Catalog View
  return (
    <div style={{padding: '32px', height: '100%', overflowY: 'auto', background: '#f8fafc'}} className="animate-fade-in">
      <div style={{marginBottom: '32px'}}>
        <h2 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#0f172a'}}>3R Academy</h2>
        <p style={{margin: 0, color: '#64748b', fontSize: '16px'}}>Impulsa tu carrera inmobiliaria con nuestros cursos certificados.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px'}}>
        
        {/* Course 1 */}
        <div className="glass-card" style={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '100%', height: '180px', background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', position: 'relative'}}>
            <div style={{position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: 600}}>
              En Progreso
            </div>
          </div>
          <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
            <h3 style={{margin: '0 0 8px 0', color: '#0f172a', fontSize: '18px'}}>{courseSyllabus.title}</h3>
            <p style={{margin: '0 0 24px 0', color: '#64748b', fontSize: '14px', flex: 1}}>{courseSyllabus.description}</p>
            
            <div style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '8px'}}>
                <span>Progreso</span>
                <span style={{fontWeight: 600, color: '#3b82f6'}}>20%</span>
              </div>
              <div style={{width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden'}}>
                <div style={{width: '20%', height: '100%', background: '#3b82f6', borderRadius: '3px'}}></div>
              </div>
            </div>

            <button onClick={() => handleStartCourse(courseSyllabus)} className="btn btn-primary" style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center'}}>
              <PlayCircle size={18} /> Continuar Curso
            </button>
          </div>
        </div>

        {/* Course 2 */}
        <div className="glass-card" style={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '100%', height: '180px', background: 'linear-gradient(135deg, #064e3b, #10b981)'}}></div>
          <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
            <h3 style={{margin: '0 0 8px 0', color: '#0f172a', fontSize: '18px'}}>Fotografía de Inmuebles</h3>
            <p style={{margin: '0 0 24px 0', color: '#64748b', fontSize: '14px', flex: 1}}>Tips profesionales para tomar fotos increíbles usando solo tu celular, maximizando la luz natural.</p>
            <button className="btn btn-secondary" style={{width: '100%'}}>Explorar Curso</button>
          </div>
        </div>

        {/* Course 3 */}
        <div className="glass-card" style={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '100%', height: '180px', background: 'linear-gradient(135deg, #4c1d95, #8b5cf6)'}}></div>
          <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
            <h3 style={{margin: '0 0 8px 0', color: '#0f172a', fontSize: '18px'}}>Uso del Motor de IA</h3>
            <p style={{margin: '0 0 24px 0', color: '#64748b', fontSize: '14px', flex: 1}}>Domina el matching automático y los Análisis Comparativos de Mercado (ACM) generados por IA.</p>
            <button className="btn btn-secondary" style={{width: '100%'}}>Explorar Curso</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademyView;
