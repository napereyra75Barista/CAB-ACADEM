
import { Course, ForumPost, Student, Transaction, Instructor } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Martín Barista',
    role: 'Head of Coffee',
    bio: 'Más de 15 años de experiencia liderando barras de especialidad en Argentina e Italia. Juez internacional de la WBC.',
    expertise: ['Espresso', 'Calibración', 'Gestión de Barras'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    coursesIds: ['1', '3', '4', '5', '7'],
    rating: 4.9,
    studentsCount: 12500
  },
  {
    id: 'inst-2',
    name: 'Lucía Milk',
    role: 'Latte Art Expert',
    bio: 'Campeona nacional de Latte Art. Especialista en química de la leche y técnicas de vertido libre profesional.',
    expertise: ['Latte Art', 'Microespuma', 'Creatividad'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    coursesIds: ['2', '6', '8'],
    rating: 4.8,
    studentsCount: 8400
  }
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Barista Inicial',
    description: 'Aprende los fundamentos del espresso, calibración de molino y técnicas básicas de texturización.',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    progress: 75,
    instructorId: 'inst-1',
    instructorName: 'Martín Barista',
    category: 'Fundamentos',
    level: 'Inicial',
    durationHours: '12h',
    price: '$18.500',
    tags: ['espresso', 'molido', 'limpieza'],
    enrollmentCount: 4500,
    rating: 4.9,
    recommendationCount: 842,
    createdAt: '2023-01-15',
    modules: [
      {
        id: 'm1',
        title: 'Introducción al Grano',
        lessons: [
          { id: 'l1', title: 'Historia del Café', duration: '12:00', isCompleted: true, videoUrl: '', summary: 'Un viaje desde Etiopía hasta las cafeterías modernas.' },
          { id: 'l2', title: 'Regiones y Variedades', duration: '18:30', isCompleted: true, videoUrl: '' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Latte Art Avanzado',
    description: 'Domina las figuras complejas: Rosetta, Cisne y técnicas de vertido libre profesional.',
    thumbnail: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop',
    progress: 30,
    instructorId: 'inst-2',
    instructorName: 'Lucía Milk',
    category: 'Técnica',
    level: 'Avanzado',
    durationHours: '15h',
    price: '$22.000',
    tags: ['leche', 'creatividad', 'competencia'],
    enrollmentCount: 2100,
    rating: 4.8,
    isTrending: true,
    recommendationCount: 1205,
    createdAt: '2023-06-20',
    modules: [
      {
        id: 'm1',
        title: 'La Textura Perfecta',
        lessons: [
          { id: 'l1', title: 'Química de la Leche', duration: '15:00', isCompleted: true, videoUrl: '' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Brew Methods Professional',
    description: 'V60, Chemex, Aeropress y Prensa Francesa. Aprende a extraer lo mejor de cada método.',
    thumbnail: 'https://images.unsplash.com/photo-1544787210-2213d84ad964?q=80&w=800&auto=format&fit=crop',
    progress: 10,
    instructorId: 'inst-1',
    instructorName: 'Martín Barista',
    category: 'Filtrados',
    level: 'Intermedio',
    durationHours: '8h',
    price: '$16.500',
    tags: ['V60', 'Chemex', 'Filtrado'],
    enrollmentCount: 3200,
    rating: 4.7,
    recommendationCount: 560,
    createdAt: '2023-09-10',
    modules: [
       {
        id: 'm1',
        title: 'Fundamentos del Filtrado',
        lessons: [
          { id: 'l1', title: 'Introducción al V60', duration: '10:00', isCompleted: false, videoUrl: '' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Coffee Business Strategy',
    description: 'Guía completa para abrir y gestionar tu propia cafetería de especialidad con éxito.',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    progress: 0,
    instructorId: 'inst-1',
    instructorName: 'Martín Barista',
    category: 'Negocios',
    level: 'Intermedio',
    durationHours: '20h',
    price: '$35.000',
    tags: ['administracion', 'marketing', 'costos'],
    enrollmentCount: 1500,
    rating: 4.9,
    recommendationCount: 932,
    createdAt: '2023-12-01',
    modules: []
  },
  {
    id: '5',
    title: 'Tostado de Especialidad I',
    description: 'Entiende la termodinámica del tueste y crea perfiles de sabor únicos.',
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    progress: 0,
    instructorId: 'inst-1',
    instructorName: 'Martín Barista',
    category: 'Producción',
    level: 'Avanzado',
    durationHours: '18h',
    price: '$42.000',
    tags: ['tueste', 'quimica', 'maquinaria'],
    enrollmentCount: 800,
    rating: 5.0,
    isTrending: true,
    recommendationCount: 410,
    createdAt: '2024-02-15',
    modules: []
  },
  {
    id: '6',
    title: 'Química del Agua',
    description: 'El ingrediente olvidado. Aprende a remineralizar agua para extracciones perfectas.',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800&auto=format&fit=crop',
    progress: 0,
    instructorId: 'inst-2',
    instructorName: 'Lucía Milk',
    category: 'Ciencia',
    level: 'Avanzado',
    durationHours: '6h',
    price: '$12.500',
    tags: ['agua', 'quimica', 'filtracion'],
    enrollmentCount: 1200,
    rating: 4.6,
    recommendationCount: 280,
    createdAt: '2024-03-01',
    modules: []
  },
  {
    id: '7',
    title: 'Análisis Sensorial: Protocolo SCA',
    description: 'Desarrolla tu paladar y aprende a puntuar cafés según estándares internacionales.',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    progress: 0,
    instructorId: 'inst-1',
    instructorName: 'Martín Barista',
    category: 'Cata',
    level: 'Avanzado',
    durationHours: '10h',
    price: '$28.000',
    tags: ['cata', 'sca', 'sensorial'],
    enrollmentCount: 450,
    rating: 4.8,
    recommendationCount: 120,
    createdAt: '2024-03-10',
    modules: []
  },
  {
    id: '8',
    title: 'Marketing para Cafeterías',
    description: 'Cómo llenar tu local y crear una marca que la gente ame en redes sociales.',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    progress: 0,
    instructorId: 'inst-2',
    instructorName: 'Lucía Milk',
    category: 'Negocios',
    level: 'Inicial',
    durationHours: '8h',
    price: '$14.900',
    tags: ['marketing', 'instagram', 'branding'],
    enrollmentCount: 920,
    rating: 4.7,
    recommendationCount: 310,
    createdAt: '2024-03-20',
    modules: []
  }
];

export const FORUM_POSTS: ForumPost[] = [
  { id: '1', author: "Julian Gomez", role: "Estudiante", title: "¿Qué molino recomiendan para empezar una cafetería?", content: "Estoy armando mi presupuesto inicial...", likes: 24, replies: 12, tag: "Equipamiento", time: "hace 2 horas", isSolved: true, isPinned: true },
  { id: '2', author: "Maria S.", role: "Expert Instructor", title: "Masterclass: Química del agua en el café", content: "Les comparto los resultados...", likes: 85, replies: 34, tag: "Química", time: "hace 5 horas", isSolved: false },
  { id: '3', author: "Carlos Perez", role: "Estudiante", title: "Dudas sobre el blooming en V60", content: "He notado que si el blooming dura más...", likes: 12, replies: 5, tag: "Técnica", time: "hace 8 horas", isSolved: false },
  { id: '4', author: "Laura M.", role: "Estudiante", title: "Mejor leche para latte art", content: "Estoy probando diferentes marcas...", likes: 45, replies: 18, tag: "Técnica", time: "hace 1 día", isSolved: true },
  { id: '5', author: "Roberto D.", role: "Estudiante", title: "Busco socio para cafetería en Palermo", content: "Tengo el local y parte de las máquinas...", likes: 30, replies: 7, tag: "Negocios", time: "hace 2 días", isSolved: false },
  { id: '6', author: "Elena F.", role: "Expert Instructor", title: "Nuevas variedades de tueste claro", content: "Acabamos de recibir un lote de Geisha...", likes: 120, replies: 42, tag: "Granos", time: "hace 3 días", isSolved: false, isPinned: true },
  { id: '7', author: "Tomas G.", role: "Estudiante", title: "Problemas con la presión de mi Silvia", content: "Mi Rancilio Silvia no está llegando...", likes: 8, replies: 15, tag: "Equipamiento", time: "hace 4 días", isSolved: true },
  { id: '8', author: "Ana P.", role: "Estudiante", title: "Limpieza del molino: ¿Cada cuánto?", content: "Uso el molino a diario en casa...", likes: 15, replies: 3, tag: "Equipamiento", time: "hace 5 días", isSolved: false },
  { id: '9', author: "Diego R.", role: "Estudiante", title: "Perfil de tueste para Cold Brew", content: "¿Recomiendan un tueste medio o más oscuro?", likes: 22, replies: 9, tag: "Técnica", time: "hace 6 días", isSolved: false },
  { id: '10', author: "Sofía L.", role: "Estudiante", title: "Técnica de vertido en espiral", content: "¿Es mejor verter del centro hacia afuera?", likes: 19, replies: 4, tag: "Técnica", time: "hace 1 semana", isSolved: true },
  { id: '11', author: "Marcos J.", role: "Estudiante", title: "Café de especialidad en Mendoza", content: "Recomendaciones de cafeterías de tueste local.", likes: 11, replies: 21, tag: "Granos", time: "hace 1 semana", isSolved: false },
  { id: '12', author: "Valentina H.", role: "Estudiante", title: "Diferencia entre Chemex y V60", content: "Para un café más limpio, ¿cuál prefieren?", likes: 38, replies: 14, tag: "Técnica", time: "hace 1 semana", isSolved: true },
  { id: '13', author: "Nico B.", role: "Estudiante", title: "Escala profesional vs báscula de cocina", content: "¿Vale la pena la Acaia para empezar?", likes: 27, replies: 31, tag: "Equipamiento", time: "hace 2 semanas", isSolved: false },
  { id: '14', author: "Luciana V.", role: "Estudiante", title: "Curso de Latte Art: ¿Presencial u Online?", content: "Tengo dudas sobre si se puede aprender online.", likes: 14, replies: 8, tag: "Técnica", time: "hace 2 semanas", isSolved: false },
  { id: '15', author: "Pedro S.", role: "Estudiante", title: "Marketing para cafeterías", content: "Ideas para atraer clientes en redes sociales.", likes: 52, replies: 12, tag: "Negocios", time: "hace 3 semanas", isSolved: true }
];

export const STUDENTS: Student[] = [
  { id: 's1', name: 'Facundo Rossi', email: 'facundo@barista.it', joinedDate: '2023-11-12', activeCourses: 3, completionRate: 85, status: 'active' },
  { id: 's2', name: 'Valentina Gomez', email: 'vale.g@coffee.ar', joinedDate: '2023-12-01', activeCourses: 1, completionRate: 40, status: 'active' },
  { id: 's3', name: 'Marcos Benitez', email: 'marcos@gmail.com', joinedDate: '2024-01-15', activeCourses: 2, completionRate: 15, status: 'active' },
  { id: 's4', name: 'Ana Luz', email: 'analuz@specialty.co', joinedDate: '2024-02-02', activeCourses: 4, completionRate: 95, status: 'active' },
  { id: 's5', name: 'Bautista Lopez', email: 'bauti@latte.art', joinedDate: '2024-02-20', activeCourses: 1, completionRate: 0, status: 'inactive' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', studentName: 'Facundo Rossi', courseTitle: 'Barista Inicial', amount: 18500, date: '2024-03-01', status: 'completed' },
  { id: 't2', studentName: 'Valentina Gomez', courseTitle: 'Latte Art Avanzado', amount: 22000, date: '2024-03-02', status: 'completed' },
  { id: 't3', studentName: 'Marcos Benitez', courseTitle: 'Brew Methods', amount: 16500, date: '2024-03-03', status: 'pending' },
  { id: 't4', studentName: 'Ana Luz', courseTitle: 'Coffee Business', amount: 35000, date: '2024-03-04', status: 'completed' },
  { id: 't5', studentName: 'Pedro Picapiedra', courseTitle: 'Barista Inicial', amount: 18500, date: '2024-03-05', status: 'failed' },
];
