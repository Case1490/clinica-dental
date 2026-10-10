// Contenido editable de la landing. Reemplazar nombres, matrículas (C.O.P./R.N.E.),
// testimonios y fotos por datos reales y verificables de la clínica antes de producción.

export const treatments = [
  {
    id: 'limpieza',
    category: 'estetica',
    badge: '1 Sesión • 45m',
    title: 'Limpieza Dental & Profilaxis Ultrasónica',
    description: 'Eliminación integral de cálculo y sarro subgingival con sistema ultrasónico no invasivo, tecnología Airflow desmanchadora y aplicación tópica de flúor bioactivo protector.',
    price: 'Desde S/ 80',
    priceLabel: 'Inversión clínica',
    iconBg: 'bg-[#F0F9FF] text-secondary',
  },
  {
    id: 'blanqueamiento',
    category: 'estetica',
    badge: 'Sesión Ágil • 60m',
    title: 'Blanqueamiento LED Avanzado',
    description: 'Fotoactivación láser de peróxido clínico regulado. Aclara hasta 4 tonos en 1 sola visita, con protocolo desensibilizante y protector gingival fotocurable.',
    price: 'Desde S/ 250',
    priceLabel: 'Inversión clínica',
    iconBg: 'bg-[#F0F9FF] text-secondary',
  },
  {
    id: 'alineadores',
    category: 'ortodoncia',
    badge: 'Simulación 3D',
    title: 'Alineadores Invisibles Digitales',
    description: 'Ortodoncia estética removible sin alambres ni brackets. Planificación por software 3D con visualización del resultado final desde el primer día de diagnóstico.',
    price: 'Desde S/ 1,500',
    priceLabel: 'Inversión clínica',
    iconBg: 'bg-primary-fixed text-primary',
  },
  {
    id: 'endodoncia',
    category: 'cirugia',
    badge: 'Microscopía Óptica',
    title: 'Endodoncia Microscópica',
    description: 'Tratamiento de conductos guiado bajo microscopio de alta magnificación. Salva piezas dentarias complejas con anestesia computarizada totalmente indolora.',
    price: 'Desde S/ 300',
    priceLabel: 'Inversión clínica',
    iconBg: 'bg-surface-container-high text-primary-container',
  },
  {
    id: 'carillas',
    category: 'estetica',
    badge: 'Cerámica Pura',
    title: 'Carillas E-Max de Porcelana',
    description: 'Diseño de sonrisa armónico con láminas cerámicas ultrafinas de máxima resistencia y translucidez natural que no cambian de color con el tiempo.',
    price: 'Desde S/ 600',
    priceLabel: 'Inversión por pieza',
    iconBg: 'bg-[#F0F9FF] text-secondary',
  },
  {
    id: 'implantes',
    category: 'implantes',
    badge: 'Garantía 10 años',
    title: 'Implantes de Titanio Grado Médico',
    description: 'Reemplazo dental definitivo con tornillo osteointegrable biocompatible. Cirugía guiada por tomografía computarizada sin colgajo y recuperación veloz.',
    price: 'Desde S/ 2,000',
    priceLabel: 'Inversión quirúrgica',
    iconBg: 'bg-tertiary-fixed text-tertiary',
  },
]

export const treatmentFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'estetica', label: 'Estética Dental' },
  { key: 'ortodoncia', label: 'Ortodoncia Digital' },
  { key: 'implantes', label: 'Rehabilitación & Implantes' },
  { key: 'cirugia', label: 'Cirugía & Endodoncia' },
]

export const specialists = [
  {
    name: 'Dr. Vikram Singh',
    role: 'Cirujano Dentista • Implantología & Rehabilitación Oral',
    license: 'C.O.P. 18452',
    bio: 'Posgrado en Cirugía e Implantología por la Universidad Nacional Mayor de San Marcos (UNMSM). Miembro Titular de la Asociación Peruana de Implantología y Certificado Straumann Dental Biocare en Suiza.',
    tags: ['R.N.E. 3012', 'Straumann Fellow', 'Cirugía Guiada 3D'],
    chief: true,
  },
  {
    name: 'Dra. Camila Vargas',
    role: 'Ortodoncia Digital • Invisalign Doctor',
    license: 'C.O.P. 24810',
    bio: 'Especialista en alineación invisible y corrección oclusal asistida por software de modelado 3D.',
  },
  {
    name: 'Dr. Mateo Palacios',
    role: 'Endodoncia Microscópica y Dolor Orofacial',
    license: 'C.O.P. 21904',
    bio: 'Magíster en conservación dental compleja con óptica quirúrgica y tecnología rotatoria silenciosa.',
  },
]

export const testimonials = [
  {
    text: 'El escaneo 3D y la paciencia del equipo me devolvieron la tranquilidad. Mi tratamiento de alineadores duró 6 meses y el cambio es impecable. Súper recomendado.',
    author: 'Mariana Riva Agüero',
    service: 'Alineadores Invisibles',
  },
  {
    text: 'Tenía pavor a la cirugía de implante, pero con la planificación computarizada del Dr. Singh no sentí ninguna molestia ni durante ni después. Excelente recuperación.',
    author: 'Carlos Benavides',
    service: 'Implante Dental Guiado',
  },
  {
    text: 'Atención de primer nivel en San Isidro. Precios transparentes y sin sorpresas. Mis carillas quedaron exactamente como deseaba: naturales y cómodas.',
    author: 'Lucía Melgar',
    service: 'Blanqueamiento & Carillas',
  },
]

export const faqs = [
  {
    question: '¿La primera consulta incluye radiografías y diagnóstico 3D?',
    answer: 'Sí. Nuestra valoración inicial prioritaria incluye escaneo intraoral 3D de alta definición, registro fotográfico clínico y la explicación directa del plan de tratamiento con el especialista correspondiente, entregándote un presupuesto claro y sin sorpresas.',
  },
  {
    question: '¿Qué facilidades y cuotas de pago ofrecen (sin intereses)?',
    answer: 'Disponemos de convenios directos con todas las tarjetas de crédito bancarias (BCP, BBVA, Interbank, Diners, Scotiabank) para financiar tus tratamientos hasta en 12 cuotas fijas sin intereses. Además, emitimos facturas clínicas válidas para reembolsos de tu póliza EPS.',
  },
  {
    question: '¿Atienden emergencias dentales el mismo día?',
    answer: 'Sí. Contamos con cupos diarios reservados exclusivamente para urgencias (fracturas dentarias, dolor agudo, pérdida de provisionales o hemorragias) con disponibilidad prioritaria en nuestra sede de San Isidro para aliviar el dolor de forma inmediata.',
  },
  {
    question: '¿Cuánto tiempo duran los tratamientos de ortodoncia invisible?',
    answer: 'El tiempo promedio varía entre 4 a 14 meses según la complejidad de la malposición dental. Desde la primera sesión con nuestro escáner 3D, generamos una simulación computarizada donde sabrás la cantidad exacta de alineadores y semanas requeridas.',
  },
]

export const navLinks = [
  { path: 'inicio', label: 'Inicio', href: '#inicio' },
  { path: 'tratamientos', label: 'Tratamientos', href: '#tratamientos' },
  { path: 'especialistas', label: 'Especialistas', href: '#especialistas' },
  { path: 'tecnologia-y-garantia', label: 'Tecnología', href: '#tecnologia-y-garantia' },
  { path: 'testimonios', label: 'Testimonios', href: '#testimonios' },
  { path: 'preguntas-frecuentes', label: 'Preguntas', href: '#preguntas-frecuentes' },
]
