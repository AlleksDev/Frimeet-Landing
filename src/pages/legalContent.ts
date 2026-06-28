export type LegalIcon = 'shield' | 'file' | 'trash' | 'bot' | 'cookie' | 'terms' | 'childSafety'

export type LegalBlock = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  note?: string
}

export type LegalPageData = {
  path: string
  title: string
  eyebrow: string
  badge: string
  icon: LegalIcon
  summary: string
  updatedAt: string
  canonicalUrl: string
  blocks: LegalBlock[]
  related: Array<{
    label: string
    href: string
  }>
}

export const legalBaseUrl = 'https://frimeet.app'
export const privacyEmail = 'support.frimeet@gmail.com'
export const childSafetyEmail = 'support.frimeet@gmail.com'

export const legalPages: LegalPageData[] = [
  {
    path: '/privacidad',
    title: 'Aviso de privacidad simplificado',
    eyebrow: 'Privacidad Frimeet',
    badge: 'Avisos de privacidad para Google Play',
    icon: 'shield',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/privacidad`,
    summary:
      'Este aviso resume como Frimeet trata los datos personales necesarios para operar la app, generar recomendaciones, proteger a la comunidad y atender solicitudes de privacidad.',
    blocks: [
      {
        heading: 'Quienes somos',
        paragraphs: [
          `Frimeet, operada por el equipo Frimeet, es responsable del tratamiento de los datos personales que se recaban en la app movil, APIs, servicios de recomendacion, sitio web y canales de soporte relacionados con Frimeet.`,
          `Para efectos de privacidad, nuestro domicilio de atencion se ubica en Mexico y el canal oficial para solicitudes es ${privacyEmail}. Si Frimeet publica una razon social o domicilio fiscal distinto, este aviso se actualizara para reflejarlo.`,
        ],
      },
      {
        heading: 'Finalidades primarias',
        paragraphs: [
          'Usamos tus datos personales para prestar las funciones principales de Frimeet y mantener la seguridad de la plataforma.',
        ],
        bullets: [
          'Crear, autenticar y administrar tu cuenta, incluyendo correo, nombre, usuario, contraseña protegida, inicio de sesion con Google, tokens de sesion y recuperacion de acceso.',
          'Mantener tu perfil, avatar, biografia, fecha de nacimiento, genero, rol, preferencias, puntaje de confianza, estadisticas, amistades, grupos, clubes, eventos y contenido asociado.',
          'Mostrar lugares, rutas, publicaciones, comentarios, valoraciones, favoritos, visitas, imagenes y demas contenido social generado por usuarios o negocios.',
          'Usar ubicacion aproximada o precisa, cuando la autorices, para mapas, busqueda cercana, recomendaciones, rutas, aforo, eventos y seguridad de la experiencia.',
          'Enviar notificaciones transaccionales y de actividad mediante tokens de dispositivo, Firebase Cloud Messaging u otros servicios equivalentes.',
          'Procesar consultas de IA/NLP para recomendaciones conversacionales, busqueda semantica de lugares y mejora de resultados, sin usar la IA como fuente unica de verdad.',
          'Recibir, revisar y resolver reportes de respuestas generadas por IA, contenido de usuarios, cuentas, lugares, eventos o comportamientos que puedan ser ofensivos, ilegales o inseguros.',
          'Prevenir abuso, fraude, spam, accesos no autorizados, fallas tecnicas y actividades que pongan en riesgo a usuarios, negocios o a la infraestructura.',
          'Atender soporte, solicitudes de derechos de privacidad, eliminacion de cuenta y obligaciones legales aplicables.',
        ],
      },
      {
        heading: 'Finalidades secundarias',
        paragraphs: [
          'Tambien podremos usar datos limitados para finalidades que no son indispensables para prestar el servicio.',
        ],
        bullets: [
          'Analitica agregada, medicion de uso, pruebas de producto y mejora de la experiencia.',
          'Comunicaciones sobre novedades, promociones, encuestas, alianzas, funciones para negocios y contenido editorial de Frimeet.',
          'Personalizacion no esencial de recomendaciones, mensajes o contenido destacado.',
        ],
        note:
          'Puedes negarte a estas finalidades secundarias enviando un correo a support.frimeet@gmail.com con el asunto "Negativa a finalidades secundarias". Tu negativa no sera motivo para negar las funciones principales de Frimeet.',
      },
      {
        heading: 'Aviso integral',
        paragraphs: [
          'Puedes consultar el aviso de privacidad integral, con mas detalle sobre datos tratados, transferencias, encargados, derechos ARCO, revocacion de consentimiento, conservacion y seguridad, en la siguiente URL:',
          `${legalBaseUrl}/privacidad/integral`,
        ],
      },
    ],
    related: [
      { label: 'Aviso integral', href: '/privacidad/integral' },
      { label: 'Eliminar cuenta', href: '/eliminacion-de-cuenta' },
      { label: 'Reportar IA', href: '/reportar-ia' },
    ],
  },
  {
    path: '/privacidad/integral',
    title: 'Aviso de privacidad integral',
    eyebrow: 'Tratamiento de datos',
    badge: 'Detalle completo',
    icon: 'file',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/privacidad/integral`,
    summary:
      'Documento integral sobre los datos que Frimeet puede recabar, usar, compartir, conservar y proteger dentro de sus servicios moviles, web, APIs y sistemas de recomendacion.',
    blocks: [
      {
        heading: 'Responsable y contacto',
        paragraphs: [
          `Frimeet, operada por el equipo Frimeet, es responsable de los datos personales tratados en la app Frimeet, landing page, API principal, API NLP y servicios relacionados. El contacto oficial para privacidad es ${privacyEmail}.`,
          'Frimeet opera inicialmente en Mexico y Latinoamerica. Para solicitudes formales de privacidad, el domicilio de atencion se considera en Mexico y el canal verificable es el correo indicado. Si se constituye o publica una razon social distinta, este aviso se actualizara.',
        ],
      },
      {
        heading: 'Datos personales que podemos tratar',
        bullets: [
          'Identificacion y cuenta: nombre, nombre de usuario, correo electronico, fecha de nacimiento, genero, avatar, fotografia de perfil, biografia, rol, preferencias y configuracion.',
          'Autenticacion y seguridad: contrasena protegida, proveedor de inicio de sesion, tokens, identificadores de sesion, refresh tokens, registros de acceso, plataforma y datos necesarios para proteger la cuenta.',
          'Ubicacion: ubicacion aproximada o precisa, coordenadas actuales, radio de busqueda, lugares visitados, favoritos, rutas, mapas y senales necesarias para recomendaciones cercanas.',
          'Contenido generado por usuarios: publicaciones, imagenes, comentarios, valoraciones, reacciones, guardados, grupos, clubes, eventos, invitaciones, reportes y metadatos asociados.',
          'Multimedia: imagenes seleccionadas desde galeria o camara, archivos subidos, URLs de almacenamiento, contexto de carga y metadatos tecnicos necesarios para publicarlos o moderarlos.',
          'Dispositivo y notificaciones: token FCM, identificador de dispositivo generado, sistema operativo, preferencias de notificacion y datos tecnicos para entregar alertas.',
          'IA y recomendaciones: texto de consulta, contexto elegido por el usuario, coordenadas opcionales, radio, resultados recomendados, metricas de calidad, modelo/proveedor usado y reportes sobre respuestas de IA.',
          'Soporte y cumplimiento: mensajes enviados a soporte, solicitudes de derechos, reportes de seguridad, evidencia enviada por el usuario y datos necesarios para responder obligaciones legales.',
        ],
      },
      {
        heading: 'Finalidades del tratamiento',
        bullets: [
          'Operar la app, crear cuentas, autenticar sesiones y mantener perfiles.',
          'Mostrar, ordenar y recomendar lugares, eventos, clubes, grupos, rutas y publicaciones.',
          'Permitir interacciones sociales como comentarios, valoraciones, invitaciones, favoritos, visitas, publicaciones y contenido compartido.',
          'Generar recomendaciones conversacionales y busquedas semanticas mediante el servicio NLP/IA.',
          'Enviar notificaciones transaccionales, de seguridad, actividad social y, si lo permites, comunicaciones no esenciales.',
          'Moderar contenido, investigar reportes, bloquear abuso y proteger a usuarios, negocios e infraestructura.',
          'Atender soporte, solicitudes de acceso, rectificacion, cancelacion, oposicion, revocacion de consentimiento, portabilidad cuando aplique y eliminacion de cuenta.',
          'Cumplir obligaciones legales, conservar evidencia de seguridad y mejorar la estabilidad del servicio.',
        ],
      },
      {
        heading: 'Encargados, proveedores y transferencias',
        paragraphs: [
          'Frimeet puede usar proveedores tecnicos para prestar el servicio. Estos proveedores tratan datos como encargados o proveedores de infraestructura, bajo finalidades limitadas al funcionamiento de Frimeet.',
        ],
        bullets: [
          'Google/Firebase/Play Services para inicio de sesion, mapas, mensajeria push, servicios Android y distribucion en Google Play.',
          'Cloudinary u otros proveedores de almacenamiento y optimizacion de imagenes para fotos, avatars y multimedia.',
          'Servicios cloud, bases de datos y hosting para APIs, Postgres/PostGIS, logs, respaldos e infraestructura.',
          'Hugging Face Spaces, Groq/Llama u otros proveedores de IA/NLP para ejecutar recomendaciones conversacionales y procesamiento semantico.',
          'Herramientas de analitica, monitoreo, correo o soporte cuando sean necesarias para seguridad, estabilidad y atencion a usuarios.',
        ],
        note:
          'No vendemos datos personales. Solo compartimos datos cuando es necesario para operar Frimeet, cumplir una obligacion legal, proteger derechos, atender una solicitud del usuario o usar un proveedor tecnico bajo instrucciones de Frimeet.',
      },
      {
        heading: 'Ubicacion y permisos sensibles',
        paragraphs: [
          'Frimeet puede solicitar ubicacion precisa, ubicacion aproximada, acceso a camara/galeria y notificaciones. Estos permisos se usan para recomendaciones cercanas, mapas, rutas, carga de imagenes, publicaciones, alertas y seguridad.',
          'Puedes controlar permisos desde el sistema operativo. Algunas funciones pueden dejar de operar correctamente si revocas permisos indispensables, por ejemplo recomendaciones cercanas o carga de fotos.',
        ],
      },
      {
        heading: 'IA, NLP y reportes de respuestas',
        paragraphs: [
          'Frimeet usa IA/NLP para interpretar consultas y generar recomendaciones conversacionales. Las respuestas de IA pueden contener errores, omisiones o contenido no deseado. Los lugares y resultados estructurados deben validarse con los datos disponibles en la app.',
          'Si una respuesta generada por IA es ofensiva, insegura, discriminatoria, sexual, violenta, ilegal, enganosa o inadecuada, puedes reportarla desde la app cuando la funcion este disponible y tambien mediante la pagina publica de reporte.',
        ],
        bullets: [
          'URL de reporte de IA: https://frimeet.app/reportar-ia',
          'Correo de reporte: support.frimeet@gmail.com',
          'Datos recomendados para investigar: captura, fecha/hora, consulta enviada, texto de respuesta y motivo del reporte.',
        ],
      },
      {
        heading: 'Contenido de usuarios y moderacion',
        paragraphs: [
          'Frimeet permite contenido generado por usuarios, incluyendo publicaciones, comentarios, fotos, valoraciones, grupos, clubes, eventos y datos de lugares. El usuario conserva la responsabilidad por el contenido que publica.',
          'Podemos retirar contenido, limitar visibilidad, suspender cuentas, bloquear usuarios o conservar evidencia cuando detectemos abuso, spam, acoso, contenido sexual, violencia, odio, actividades ilegales, suplantacion, datos personales de terceros o infracciones a nuestras reglas.',
        ],
      },
      {
        heading: 'Derechos ARCO, revocacion y oposicion',
        paragraphs: [
          'Puedes solicitar acceso, rectificacion, cancelacion u oposicion al tratamiento de tus datos personales, asi como revocar tu consentimiento cuando legalmente proceda.',
          `Envia tu solicitud a ${privacyEmail} con el asunto "Solicitud ARCO Frimeet" e incluye: nombre de usuario o correo de la cuenta, derecho que deseas ejercer, descripcion clara de la solicitud y medio para contactarte. Podemos pedir informacion adicional para verificar identidad y proteger la cuenta.`,
        ],
      },
      {
        heading: 'Eliminacion de cuenta y datos',
        paragraphs: [
          'Si tienes una cuenta, puedes solicitar su eliminacion y la eliminacion de datos asociados desde la URL publica de eliminacion. Frimeet tambien debera ofrecer un flujo dentro de la app antes de publicar en Google Play cuando la cuenta se pueda crear desde la app.',
          'URL publica: https://frimeet.app/eliminacion-de-cuenta',
        ],
      },
      {
        heading: 'Conservacion y seguridad',
        paragraphs: [
          'Conservamos los datos mientras tu cuenta este activa, mientras sean necesarios para prestar el servicio o durante los plazos requeridos para seguridad, prevencion de abuso, cumplimiento legal, respaldo y resolucion de disputas.',
          'Usamos medidas razonables de seguridad tecnica y organizacional, incluyendo autenticacion, control de acceso, separacion de servicios, cifrado/transporte seguro cuando aplique, monitoreo y revision de reportes. Ningun sistema es infalible, pero trabajamos para reducir riesgos y responder incidentes.',
        ],
      },
      {
        heading: 'Cambios al aviso',
        paragraphs: [
          'Podremos actualizar este aviso cuando cambien funciones, proveedores, obligaciones legales o practicas de tratamiento. La version vigente se publicara en esta pagina con su fecha de actualizacion.',
        ],
      },
    ],
    related: [
      { label: 'Aviso simplificado', href: '/privacidad' },
      { label: 'Terminos', href: '/terminos' },
      { label: 'Eliminar cuenta', href: '/eliminacion-de-cuenta' },
    ],
  },
  {
    path: '/terminos',
    title: 'Terminos y condiciones',
    eyebrow: 'Reglas de uso',
    badge: 'Comunidad y seguridad',
    icon: 'terms',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/terminos`,
    summary:
      'Reglas basicas para usar Frimeet, publicar contenido, interactuar con otros usuarios, consultar IA y reportar conductas o respuestas inadecuadas.',
    blocks: [
      {
        heading: 'Aceptacion del servicio',
        paragraphs: [
          'Al crear una cuenta, iniciar sesion o usar Frimeet aceptas estos terminos, el aviso de privacidad y las reglas de comunidad aplicables. Si no estas de acuerdo, no debes usar el servicio.',
        ],
      },
      {
        heading: 'Uso permitido',
        bullets: [
          'Usa Frimeet para descubrir lugares, crear planes, unirte a grupos, participar en clubes, asistir a eventos y compartir experiencias reales.',
          'Mantén tu informacion actualizada y protege tus credenciales.',
          'Respeta la privacidad, seguridad, reputacion y derechos de otros usuarios, negocios y terceros.',
          'No uses bots, scraping, abuso de APIs, spam, suplantacion, manipulacion de valoraciones ni intentos de afectar la disponibilidad del servicio.',
        ],
      },
      {
        heading: 'Contenido generado por usuarios',
        paragraphs: [
          'El contenido que publiques puede incluir fotos, textos, comentarios, valoraciones, eventos, grupos, clubes o datos de lugares. Eres responsable de contar con derechos y autorizaciones para compartirlo.',
        ],
        bullets: [
          'No publiques contenido ilegal, sexual explicito, de odio, acoso, amenazas, violencia grafica, autolesiones, explotacion, datos personales de terceros, suplantacion, spam, fraude o instrucciones peligrosas.',
          'No publiques reseñas falsas, contenido enganoso, propaganda abusiva ni material que infrinja propiedad intelectual.',
          'Frimeet puede moderar, ocultar, eliminar o restringir contenido y cuentas cuando exista riesgo para la comunidad o incumplimiento de estas reglas.',
          'Los usuarios deben contar con mecanismos dentro de la app para reportar contenido o usuarios cuando se publique la version de Google Play.',
        ],
      },
      {
        heading: 'Seguridad infantil',
        paragraphs: [
          'Frimeet prohibe cualquier forma de explotacion y abuso sexual infantil (CSAE), grooming, sextorsion, trata de menores con fines sexuales y material de abuso sexual infantil (CSAM).',
          'Los usuarios deben poder denunciar preocupaciones de seguridad infantil dentro de la app. Frimeet revisara estos reportes con prioridad, tomara medidas de moderacion y, cuando corresponda, enviara denuncias a autoridades regionales o nacionales competentes.',
        ],
        bullets: [
          'URL de estandares de seguridad infantil: https://frimeet.app/seguridad-infantil',
          'Contacto designado para seguridad infantil y CSAM: support.frimeet@gmail.com',
        ],
      },
      {
        heading: 'IA y recomendaciones',
        paragraphs: [
          'Frimeet puede usar IA/NLP para interpretar consultas y sugerir lugares o planes. La IA puede equivocarse y sus respuestas no sustituyen criterio personal, informacion oficial del lugar, recomendaciones medicas, legales, financieras ni decisiones de seguridad.',
          'Debes verificar horarios, disponibilidad, precios, edad minima, ubicacion y condiciones antes de asistir a un lugar o evento.',
        ],
        bullets: [
          'No uses la IA para generar o solicitar contenido ilegal, ofensivo, sexual con menores, discriminatorio, violento, acosador, fraudulento o inseguro.',
          'Si una respuesta de IA es ofensiva o peligrosa, reportala desde la app cuando el boton este disponible o en https://frimeet.app/reportar-ia.',
          'Frimeet puede usar los reportes para mejorar filtros, moderacion, calidad de respuestas y seguridad del producto.',
        ],
      },
      {
        heading: 'Cuentas, suspension y eliminacion',
        paragraphs: [
          'Podemos suspender o limitar cuentas cuando detectemos abuso, fraude, incumplimiento legal, riesgo de seguridad, uso automatizado indebido o afectacion a otros usuarios.',
          'Puedes solicitar la eliminacion de tu cuenta y datos asociados en https://frimeet.app/eliminacion-de-cuenta.',
        ],
      },
      {
        heading: 'Disponibilidad y cambios',
        paragraphs: [
          'Frimeet puede cambiar, pausar o retirar funciones por mantenimiento, seguridad, pruebas beta, cambios tecnicos, requisitos legales o decisiones de producto.',
          'Podemos actualizar estos terminos; la version vigente se publicara en esta pagina.',
        ],
      },
    ],
    related: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Reportar IA', href: '/reportar-ia' },
      { label: 'Eliminar cuenta', href: '/eliminacion-de-cuenta' },
    ],
  },
  {
    path: '/seguridad-infantil',
    title: 'Estandares de seguridad infantil contra CSAE',
    eyebrow: 'Seguridad infantil',
    badge: 'Estandares publicados para Google Play',
    icon: 'childSafety',
    updatedAt: '28 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/seguridad-infantil`,
    summary:
      'Estandares publicados de Frimeet contra la explotacion y el abuso sexual infantil (CSAE), el material de abuso sexual infantil (CSAM), y los procesos de reporte, moderacion y escalamiento.',
    blocks: [
      {
        heading: 'Compromiso de Frimeet',
        paragraphs: [
          'Frimeet es una app social para descubrir lugares, crear planes y participar en contenido comunitario. Por esa naturaleza social, mantenemos estandares especificos para prevenir, detectar, remover y reportar riesgos relacionados con la seguridad de los ninos.',
          'Frimeet prohibe de forma absoluta la explotacion y abuso sexual infantil (CSAE), el material de abuso sexual infantil (CSAM), el grooming, la sextorsion, la trata de menores con fines sexuales, la sexualizacion de menores y cualquier contenido o conducta que explote, abuse o ponga en riesgo a una persona menor de edad.',
        ],
      },
      {
        heading: 'Contenido y conductas prohibidas',
        bullets: [
          'Publicar, solicitar, almacenar, compartir, enlazar, vender o promover CSAM en imagenes, video, texto, audio, enlaces, comentarios, mensajes, perfiles, grupos, clubes, eventos, lugares o cualquier otra superficie de Frimeet.',
          'Intentar contactar, manipular, acosar, amenazar, extorsionar, sexualizar o explotar a una persona menor de edad.',
          'Crear cuentas, perfiles, eventos, grupos o publicaciones que faciliten abuso sexual infantil, captacion, intercambio de material, trata, turismo sexual, explotacion o encuentros inseguros con menores.',
          'Usar IA, recomendaciones, imagenes, publicaciones o cualquier funcion de Frimeet para generar, promover o encubrir CSAE/CSAM.',
          'Recompartir contenido sospechoso para denunciarlo publicamente dentro de la app. El reporte debe hacerse mediante los mecanismos de denuncia o el contacto de seguridad infantil.',
        ],
      },
      {
        heading: 'Mecanismos de denuncia',
        paragraphs: [
          'Frimeet debe permitir que los usuarios reporten preocupaciones de seguridad infantil desde la app sin salir de ella. Mientras se integra o mejora el flujo interno, los usuarios tambien pueden contactar al punto designado de seguridad infantil por correo.',
          `Punto de contacto designado para seguridad infantil y CSAM: ${childSafetyEmail}`,
        ],
        bullets: [
          'Motivos de denuncia esperados dentro de la app: seguridad infantil, CSAE/CSAM, acoso, contenido sexual, explotacion, amenaza, suplantacion, spam o riesgo inmediato.',
          'Informacion util para investigar: usuario reportado, publicacion o contenido, captura si es seguro conservarla, fecha/hora aproximada, ciudad o contexto, y descripcion del riesgo.',
          'Si un menor esta en peligro inmediato, el usuario debe contactar de inmediato a emergencias o a la autoridad local competente antes de enviar el reporte a Frimeet.',
        ],
      },
      {
        heading: 'Revision, remocion y acciones',
        paragraphs: [
          'Cuando Frimeet tenga conocimiento de contenido o conducta potencialmente relacionada con CSAE/CSAM, revisara el reporte con prioridad, limitara la distribucion del contenido cuando corresponda, preservara la evidencia necesaria de forma segura y tomara medidas proporcionales al riesgo.',
        ],
        bullets: [
          'Remocion o bloqueo de contenido, perfiles, grupos, clubes, eventos, comentarios, imagenes o enlaces que infrinjan estos estandares.',
          'Suspension o eliminacion de cuentas involucradas en CSAE/CSAM, grooming, sextorsion, explotacion o intentos de evadir moderacion.',
          'Limitacion de funciones, bloqueo de usuarios, revision de patrones de abuso y mejora de filtros, reglas de moderacion o senales de deteccion.',
          'Conservacion de registros necesarios para investigacion, cumplimiento legal, defensa de derechos y cooperacion con autoridades competentes.',
        ],
      },
      {
        heading: 'Reporte a autoridades',
        paragraphs: [
          'Frimeet cumple con las leyes de seguridad infantil aplicables y, cuando corresponda, enviara denuncias o informacion relevante a autoridades regionales, nacionales u organizaciones autorizadas para recibir reportes de CSAM.',
          'Para orientacion publica sobre autoridades y organizaciones de reporte por region, Google mantiene una guia de ayuda en https://support.google.com/websearch/answer/148666.',
        ],
      },
      {
        heading: 'Prevencion y mejora continua',
        bullets: [
          'Mantener reglas publicas que prohiben CSAE/CSAM y explicar como reportar riesgos de seguridad infantil.',
          'Revisar reportes de usuarios y senales internas para reducir abuso, reincidencia y evasion.',
          'Capacitar al punto de contacto designado para hablar sobre practicas de prevencion de CSAM y cumplimiento de Frimeet.',
          'Actualizar estos estandares cuando cambien funciones sociales, mecanismos de reporte, proveedores, procesos internos o requisitos legales.',
        ],
      },
      {
        heading: 'Contacto designado',
        paragraphs: [
          `El punto de contacto designado para asuntos de seguridad infantil, CSAE y CSAM es ${childSafetyEmail}. Este contacto debe estar preparado para hablar sobre las practicas de prevencion, moderacion, escalamiento y cumplimiento de Frimeet.`,
          'Para soporte general, privacidad o eliminacion de cuenta, consulta las paginas legales correspondientes de Frimeet.',
        ],
      },
    ],
    related: [
      { label: 'Terminos', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Reportar IA', href: '/reportar-ia' },
      { label: 'Contacto seguridad infantil', href: `mailto:${childSafetyEmail}?subject=Seguridad%20infantil%20Frimeet` },
    ],
  },
  {
    path: '/cookies',
    title: 'Politica de cookies',
    eyebrow: 'Sitio web y medicion',
    badge: 'Landing Frimeet',
    icon: 'cookie',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/cookies`,
    summary:
      'Informacion sobre cookies, almacenamiento local y tecnologias similares que pueden usarse en la landing, enlaces compartidos y servicios web de Frimeet.',
    blocks: [
      {
        heading: 'Que son',
        paragraphs: [
          'Las cookies y tecnologias similares son pequenos archivos o identificadores que ayudan a recordar preferencias, operar funciones, medir uso y proteger servicios web.',
        ],
      },
      {
        heading: 'Como las usamos',
        bullets: [
          'Cookies esenciales o almacenamiento tecnico para que el sitio cargue correctamente, preserve preferencias o mantenga compatibilidad con enlaces compartidos.',
          'Medicion agregada de rendimiento, errores, trafico y uso cuando se habiliten herramientas de analitica.',
          'Seguridad, prevencion de abuso y diagnostico tecnico.',
          'Campanas o medicion publicitaria solo si se habilitan integraciones especificas y se informa cuando corresponda.',
        ],
      },
      {
        heading: 'Control del usuario',
        paragraphs: [
          'Puedes bloquear o eliminar cookies desde tu navegador. Algunas funciones del sitio pueden comportarse de forma limitada si deshabilitas almacenamiento esencial.',
          'Dentro de la app movil, los permisos y datos locales se controlan desde Android, ajustes internos de Frimeet y solicitudes de privacidad.',
        ],
      },
    ],
    related: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Aviso integral', href: '/privacidad/integral' },
      { label: 'Terminos', href: '/terminos' },
    ],
  },
  {
    path: '/eliminacion-de-cuenta',
    title: 'Eliminacion de cuenta y datos',
    eyebrow: 'Solicitud publica',
    badge: 'Requerido para Google Play',
    icon: 'trash',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/eliminacion-de-cuenta`,
    summary:
      'Canal publico para solicitar la eliminacion de una cuenta Frimeet y de los datos personales asociados, conforme a las reglas de Google Play para apps con creacion de cuenta.',
    blocks: [
      {
        heading: 'Como solicitarlo',
        paragraphs: [
          `Envia un correo a ${privacyEmail} con el asunto "Eliminar cuenta Frimeet". Para proteger tu cuenta, escribe desde el correo asociado a Frimeet cuando sea posible.`,
        ],
        bullets: [
          'Correo o nombre de usuario de la cuenta.',
          'Confirmacion clara de que deseas eliminar la cuenta.',
          'Si no escribes desde el correo registrado, informacion suficiente para verificar identidad sin exponer datos sensibles innecesarios.',
        ],
      },
      {
        heading: 'Que se elimina',
        bullets: [
          'Datos de cuenta y perfil, incluyendo nombre, usuario, correo, avatar, biografia, preferencias y sesiones activas.',
          'Tokens de autenticacion, tokens de notificacion y datos tecnicos vinculados directamente a la cuenta.',
          'Contenido personal asociado cuando tecnicamente corresponda, como publicaciones, comentarios, imagenes, favoritos, visitas, grupos, clubes, eventos o reportes vinculados.',
          'Datos en proveedores usados por Frimeet, cuando el proveedor permita la eliminacion o desasociacion.',
        ],
      },
      {
        heading: 'Datos que podrian conservarse',
        paragraphs: [
          'Podemos conservar datos limitados cuando sea necesario por seguridad, prevencion de abuso, respaldo temporal, cumplimiento legal, defensa de derechos, registros de moderacion o informacion que ya este anonimizada/agregada.',
          'Cuando el contenido involucre a otros usuarios, negocios, grupos o eventos, podremos eliminarlo, anonimizarlo o conservar una version minima segun el contexto y las obligaciones aplicables.',
        ],
      },
      {
        heading: 'Plazos y confirmacion',
        paragraphs: [
          'Confirmaremos la recepcion de tu solicitud y podremos pedir verificaciones razonables. Una vez validada, procesaremos la eliminacion en un plazo razonable y te notificaremos el resultado por correo.',
          'Antes de publicar en Google Play, Frimeet debe mantener tambien un flujo dentro de la app para eliminar cuenta o iniciar esta solicitud desde una cuenta autenticada.',
        ],
      },
    ],
    related: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Aviso integral', href: '/privacidad/integral' },
      { label: 'Soporte', href: `mailto:${privacyEmail}?subject=Soporte%20Frimeet` },
    ],
  },
  {
    path: '/reportar-ia',
    title: 'Reportar una respuesta de IA',
    eyebrow: 'IA conversacional',
    badge: 'Seguridad y moderacion',
    icon: 'bot',
    updatedAt: '27 de junio de 2026',
    canonicalUrl: `${legalBaseUrl}/reportar-ia`,
    summary:
      'Canal para reportar respuestas generadas por IA que sean ofensivas, inseguras, discriminatorias, sexuales, violentas, ilegales, enganosas o contrarias a las reglas de Frimeet.',
    blocks: [
      {
        heading: 'Cuando reportar',
        bullets: [
          'La respuesta contiene odio, acoso, discriminacion, amenazas, violencia o instrucciones peligrosas.',
          'La respuesta incluye contenido sexual inapropiado, explotacion, autolesion, datos personales de terceros o material ilegal.',
          'La respuesta recomienda un lugar, ruta o accion de forma enganosa, insegura o claramente incorrecta.',
          'La respuesta intenta evadir reglas de seguridad, promueve fraude, spam o actividad abusiva.',
        ],
      },
      {
        heading: 'Como reportar ahora',
        paragraphs: [
          `Envia un correo a ${privacyEmail} con el asunto "Reporte IA Frimeet". Adjunta la mayor informacion posible para revisar el caso.`,
        ],
        bullets: [
          'Captura de pantalla o texto de la respuesta.',
          'Consulta que escribiste antes de recibir la respuesta.',
          'Fecha, hora aproximada y ciudad o contexto si aplica.',
          'Motivo del reporte: ofensivo, inseguro, ilegal, enganoso, privacidad, discriminacion u otro.',
        ],
      },
      {
        heading: 'Que haremos con el reporte',
        paragraphs: [
          'Revisaremos el contenido, podremos ajustar filtros, prompts, reglas de moderacion, datos de ranking o proveedores, y tomaremos medidas si hay riesgo para usuarios o terceros.',
          'Google Play requiere que las apps con contenido generado por IA permitan reportar contenido ofensivo sin salir de la app. Este canal web complementa ese flujo y la app debe incluir el boton interno correspondiente antes de publicarse.',
        ],
      },
      {
        heading: 'Privacidad del reporte',
        paragraphs: [
          'Usaremos los datos del reporte para investigar, mejorar seguridad, depurar el sistema de IA/NLP, moderar contenido y cumplir obligaciones aplicables. No uses el reporte para enviar datos sensibles innecesarios.',
        ],
      },
    ],
    related: [
      { label: 'Terminos', href: '/terminos' },
      { label: 'Privacidad integral', href: '/privacidad/integral' },
      { label: 'Enviar reporte', href: `mailto:${privacyEmail}?subject=Reporte%20IA%20Frimeet` },
    ],
  },
]

export const getLegalPageByPath = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  return legalPages.find((page) => page.path === normalizedPath)
}
