const fs = require('fs');

const appPath = 'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js';
let content = fs.readFileSync(appPath, 'utf8');

// Define the 50 updated questions with exact formatting
const updates = [
  // 1
  {
    id: 'procedimiento-1',
    replacement: `  {
    id: 'procedimiento-1', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Procedimiento administrativo', source: 'Ley 39/2015, art. 14.2', sourceUrl: officialSources.law39,
    text: 'Con carácter general, ¿quién está obligado a relacionarse electrónicamente con las administraciones públicas?',
    options: [
      ['A', 'Todas las personas físicas, sin excepción.'],
      ['B', 'Las personas jurídicas, entre otros sujetos previstos legalmente.'],
      ['C', 'Solo quienes trabajen en la Administración General del Estado.'],
      ['D', 'Únicamente quienes presenten un recurso administrativo.']
    ], correct: 1,
    explanation: 'El artículo 14.2 de la Ley 39/2015 establece la obligación de relacionarse electrónicamente con las Administraciones para determinados sujetos, entre los cuales figuran expresamente las personas jurídicas, mientras que para las personas físicas es opcional con carácter general.',
    whys: [
      'La obligación no se extiende automáticamente a todas las personas físicas.',
      'Es la respuesta correcta: las personas jurídicas figuran expresamente entre los sujetos obligados en el artículo 14.2.a.',
      'La obligación no se limita a la Administración General del Estado.',
      'Presentar un recurso no convierte por sí solo a toda persona en sujeto obligado.'
    ]
  }`
  },
  // 2
  {
    id: 'procedimiento-2',
    replacement: `  {
    id: 'procedimiento-2', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Procedimiento administrativo', source: 'Ley 39/2015, art. 30.2', sourceUrl: officialSources.law39,
    text: 'Cuando un plazo se señala por días en un procedimiento administrativo, salvo que una ley o el Derecho de la Unión Europea disponga otra cosa, se entiende que son:',
    options: [['A', 'Días naturales.'], ['B', 'Días hábiles.'], ['C', 'Días laborables solo en la localidad de la persona interesada.'], ['D', 'Días hábiles excepto los sábados, que siempre cuentan.']], correct: 1,
    explanation: 'El artículo 30.2 de la Ley 39/2015 dispone que cuando los plazos se señalan por días se entiende que estos son hábiles, excluyendo sábados, domingos y festivos, salvo que la ley o el Derecho de la UE prevean otro cómputo.',
    whys: [
      'Los días naturales solo se aplican cuando una norma lo declare de forma expresa.',
      'Es la respuesta correcta: es la regla general fijada por el artículo 30.2.',
      'El cómputo no se define por la localidad de la persona interesada.',
      'Los sábados están expresamente excluidos y son inhábiles.'
    ]
  }`
  },
  // 3
  {
    id: 'historico-2025-01',
    replacement: `  {
    id: 'historico-2025-01', quality: 'Verificada · Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 2.2.b', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 2 da Lei 39/2015, as entidades de dereito privado dependentes das administracións públicas quedarán suxeitas ao disposto nesta lei:',
    options: [['A', 'Só cando exerzan potestades administrativas.'], ['B', 'Cando as normas desta lei se refiran especificamente a estas e, en todo caso, cando exerzan potestades administrativas.'], ['C', 'Cando as normas desta lei se refiran especificamente a estas, pero non cando exerzan potestades administrativas.'], ['D', 'Supletoriamente en todo caso e cando as súas competencias se deleguen por unha Administración pública territorial.']], correct: 1,
    explanation: 'La plantilla oficial marca la B. El artículo 2.2.b dispone que quedarán sujetas a las normas de esta Ley que se refieran específicamente a las mismas y, en todo caso, cuando ejerzan potestades administrativas.',
    whys: [
      'Es incompleta: omite el supuesto de referencia expresa en la propia Ley.',
      'Es la respuesta correcta y coincide con el artículo 2.2.b.',
      'Es incorrecta porque sí quedan sujetas cuando ejercen potestades administrativas.',
      'La Ley no establece esta regla supletoria ligada a una delegación territorial.'
    ]
  }`
  },
  // 4
  {
    id: 'historico-2025-02',
    replacement: `  {
    id: 'historico-2025-02', quality: 'Verificada · Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 5.3', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 5 da Lei 39/2015, a representación dos interesados con capacidade de obrar presumirase para:',
    options: [['A', 'Formular solicitudes.'], ['B', 'Presentar declaracións responsables.'], ['C', 'Os actos e xestións de mero trámite.'], ['D', 'Interpoñer recursos.']], correct: 2,
    explanation: 'La plantilla oficial marca la C. Según el artículo 5.3, para formular solicitudes, declaraciones responsables, comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos debe acreditarse la representación. Para los actos y gestiones de mero trámite se presumirá.',
    whys: [
      'Formular solicitudes exige acreditar la representación.',
      'Presentar declaraciones responsables exige acreditar la representación.',
      'Es la respuesta correcta: la representación se presume para gestiones de mero trámite.',
      'Interponer recursos exige acreditar la representación.'
    ]
  }`
  },
  // 5
  {
    id: 'historico-2025-03',
    replacement: `  {
    id: 'historico-2025-03', quality: 'Verificada · Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 10.1', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 10 da Lei 39/2015, os interesados poderán asinar a través de calquera medio que permita acreditar:',
    options: [
      ['A', 'A autenticidade do consentimento e a veracidade do documento asinado.'],
      ['B', 'A autenticidade da expresión da súa vontade e consentimento, aínda que non acredite a integridade e a inalterabilidade do documento.'],
      ['C', 'A autenticidade da expresión da súa vontade ou a integridade.'],
      ['D', 'A autenticidade da expresión da súa vontade e consentimento, así como a integridade e inalterabilidade do documento.']
    ], correct: 3,
    explanation: 'La plantilla oficial marca la D. El artículo 10.1 prevé que los interesados firmarán por cualquier medio que permita acreditar conjuntamente la autenticidad de la expresión de la voluntad y del consentimiento, y la integridad e inalterabilidad del documento.',
    whys: [
      'La ley no menciona la veracidad del documento en este apartado.',
      'Falta acreditar la integridad e inalterabilidad del documento.',
      'No se trata de requisitos alternativos, sino acumulativos.',
      'Es la respuesta correcta: recoge la autenticidad, consentimiento, integridad e inalterabilidad.'
    ]
  }`
  },
  // 6
  {
    id: 'historico-2025-04',
    replacement: `  {
    id: 'historico-2025-04', quality: 'Verificada · Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 23.2', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Contra o acordo que resolva sobre a ampliación de prazos para resolver e notificar do procedemento administrativo:',
    options: [['A', 'Cabe recurso de reposición.'], ['B', 'Cabe recurso de alzada.'], ['C', 'Non caberá recurso ningún.'], ['D', 'Só cabe recurso de revisión.']], correct: 2,
    explanation: 'La plantilla oficial marca la C. Según el artículo 23.2, contra el acuerdo que resuelva sobre la ampliación de plazos no cabrá recurso alguno, sin perjuicio del que proceda contra la resolución final.',
    whys: [
      'No procede recurso de reposición contra este tipo de acuerdo.',
      'No procede recurso de alzada contra este tipo de acuerdo.',
      'Es la respuesta correcta: la Ley excluye expresamente cualquier recurso contra este acuerdo.',
      'Tampoco procede recurso extraordinario de revisión por esta causa.'
    ]
  }`
  },
  // 7
  {
    id: 'historico-2025-05',
    replacement: `  {
    id: 'historico-2025-05', quality: 'Verificada · Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 25.1.b', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Nos procedementos iniciados de oficio nos que a Administración exerza potestades sancionadoras, o vencemento do prazo máximo sen resolución expresa producirá:',
    options: [['A', 'A desestimación por silencio administrativo.'], ['B', 'A caducidade.'], ['C', 'A prescrición.'], ['D', 'O desistimento.']], correct: 1,
    explanation: 'La plantilla oficial marca la B. Conforme al artículo 25.1.b, el transcurso del plazo máximo en procedimientos de oficio sancionadores o de intervención produce la caducidad.',
    whys: [
      'No se produce silencio desestimatorio en este supuesto de gravamen.',
      'Es la respuesta correcta: produce la caducidad y el archivo de las actuaciones.',
      'La prescripción es una causa de extinción sustantiva regulada aparte.',
      'El desistimiento no es la consecuencia legal aplicable al transcurso del plazo en este caso.'
    ]
  }`
  },
  // 8
  {
    id: 'troncal-procedimiento-03',
    replacement: `  {
    id: 'troncal-procedimiento-03', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 53.1', sourceUrl: officialSources.law39,
    text: '¿Cuál de las siguientes NO es, con carácter general, una facultad de las personas interesadas en un procedimiento administrativo?',
    options: [['A', 'Conocer el estado de la tramitación.'], ['B', 'Obtener copia de los documentos contenidos en el procedimiento.'], ['C', 'Identificar a las autoridades y al personal responsable de la tramitación.'], ['D', 'Exigir siempre una resolución oral en lugar de una resolución escrita.']], correct: 3,
    explanation: 'El artículo 53.1 de la Ley 39/2015 reconoce los derechos de conocer el estado, obtener copias e identificar autoridades (opciones A, B y C). La forma escrita de los actos es la regla general y no puede exigir siempre resolución oral.',
    whys: [
      'Es un derecho expresamente reconocido en el artículo 53.1.a.',
      'Es un derecho expresamente reconocido en el artículo 53.1.a.',
      'Es un derecho expresamente reconocido en el artículo 53.1.b.',
      'Es la respuesta correcta: la Ley no otorga la facultad de exigir resolución oral.'
    ]
  }`
  },
  // 9
  {
    id: 'troncal-regimen-04',
    replacement: `  {
    id: 'troncal-regimen-04', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 3.1', sourceUrl: officialSources.law40,
    text: '¿Cuál de los siguientes es un principio general de actuación de las administraciones públicas recogido en el artículo 3 de la Ley 40/2015?',
    options: [
      ['A', 'Jerarquía orgánica de carácter absoluto sobre el resto de Administraciones Públicas.'],
      ['B', 'Planificación y dirección por objetivos, y control de gestión y evaluación de resultados.'],
      ['C', 'Desviación de poder justificada por razones excepcionales de interés público.'],
      ['D', 'Inmunidad jurisdiccional de las autoridades políticas en el ejercicio de la potestad reglamentaria.']
    ], correct: 1,
    explanation: 'El artículo 3.1.g de la Ley 40/2015 recoge la planificación y dirección por objetivos, y control de gestión y evaluación de los resultados de las políticas públicas como uno de sus principios.',
    whys: [
      'La jerarquía rige internamente, pero no hay jerarquía orgánica absoluta entre Administraciones independientes.',
      'Es la respuesta correcta: coincide con el principio del artículo 3.1.g.',
      'La desviación de poder es una ilegalidad y nunca un principio amparado.',
      'Toda actuación administrativa y reglamentaria está plenamente sometida al control de los tribunales.'
    ]
  }`
  },
  // 10
  {
    id: 'troncal-galicia-05',
    replacement: `  {
    id: 'troncal-galicia-05', quality: 'Verificada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 2.1', sourceUrl: officialSources.law16,
    text: 'Según la Ley 16/2010, la Administración general de la Comunidad Autónoma de Galicia actúa:',
    options: [
      ['A', 'Con personalidad jurídica única para el cumplimiento de sus fines.'],
      ['B', 'Con tantas personalidades jurídicas independientes como consellerías compongan la Xunta.'],
      ['C', 'Careciendo de personalidad jurídica y actuando siempre bajo la personalidad del Estado.'],
      ['D', 'Únicamente de forma delegada y a través del sector público instrumental local.']
    ], correct: 0,
    explanation: 'El artículo 2.1 de la Ley 16/2010 de Galicia establece que la Administración general de la Comunidad Autónoma actúa para el cumplimiento de sus fines con personalidad jurídica única.',
    whys: [
      'Es la respuesta correcta: la LOFAX establece expresamente la personalidad jurídica única.',
      'Las consellerías son órganos de una única Administración y carecen de personalidad jurídica propia.',
      'La Comunidad Autónoma goza de autonomía y personalidad jurídica propia diferenciada de la del Estado.',
      'La Administración general periférica y central actúa por sí misma de forma ordinaria.'
    ]
  }`
  },
  // 11
  {
    id: 'troncal-procedimiento-18',
    replacement: `  {
    id: 'troncal-procedimiento-18', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 21.1', sourceUrl: officialSources.law39,
    text: 'Con carácter general, la Administración está obligada a dictar resolución expresa y a notificarla:',
    options: [['A', 'En todos los procedimientos cualquiera que sea su forma de iniciación.'], ['B', 'Solo en procedimientos iniciados a solicitud de persona interesada.'], ['C', 'Solo cuando el resultado sea favorable.'], ['D', 'Únicamente si existe recurso administrativo previo.']], correct: 0,
    explanation: 'El artículo 21.1 de la Ley 39/2015 impone a la Administración la obligación de dictar resolución expresa y notificarla en todos los procedimientos, con independencia de cómo se hayan iniciado.',
    whys: [
      'Es la respuesta correcta: refleja la regla general del artículo 21.1.',
      'La obligación legal de resolver y notificar se extiende también a los iniciados de oficio.',
      'La resolución debe dictarse sea cual sea el sentido del fondo del asunto.',
      'La obligación de resolver existe desde el inicio del expediente, sin requerir recursos.'
    ]
  }`
  },
  // 12
  {
    id: 'troncal-procedimiento-19',
    replacement: `  {
    id: 'troncal-procedimiento-19', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 40.2', sourceUrl: officialSources.law39,
    text: 'Toda notificación administrativa debe contener, entre otros extremos:',
    options: [['A', 'El texto íntegro de la resolución.'], ['B', 'Solo el número de expediente, sin contenido resolutorio.'], ['C', 'Una recomendación informal sin indicación de recursos.'], ['D', 'La firma de todas las personas interesadas.']], correct: 0,
    explanation: 'El artículo 40.2 de la Ley 39/2015 dispone que toda notificación deberá contener el texto íntegro de la resolución, indicando además si pone fin o no a la vía administrativa y los recursos que procedan.',
    whys: [
      'Es la respuesta correcta: el texto íntegro es un requisito esencial de validez de la notificación.',
      'No basta con indicar el número de expediente; debe notificarse el texto del acto.',
      'La notificación debe indicar los recursos, plazos y órganos competentes.',
      'La firma de los interesados es ajena al contenido formal mínimo que debe incluir la notificación.'
    ]
  }`
  },
  // 13
  {
    id: 'troncal-regimen-20',
    replacement: `  {
    id: 'troncal-regimen-20', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 47.1', sourceUrl: officialSources.law40,
    text: 'Según la Ley 40/2015, los convenios son acuerdos con efectos jurídicos adoptados por administraciones públicas, organismos públicos o entidades de derecho público entre sí o con sujetos de derecho privado para:',
    options: [
      ['A', 'La realización de una actividad de utilidad pública o interés general para un fin común, sin que su objeto coincida con el de un contrato.'],
      ['B', 'Sustituir o subrogar los contratos del sector público en contra de la normativa de contratación.'],
      ['C', 'Excluir el control de legalidad ejercido por la Intervención General del Estado.'],
      ['D', 'Establecer una relación jerárquica de subordinación de los sujetos privados a la Administración.']
    ], correct: 0,
    explanation: 'El artículo 47.1 de la Ley 40/2015 define los convenios como acuerdos para la consecución de un fin común, precisando que no pueden incluir prestaciones propias de los contratos del sector público ni alterar las competencias.',
    whys: [
      'Es la respuesta correcta: resume el fin común y la prohibición de coincidir con contratos (artículo 47.1).',
      'Su objeto no puede coincidir con el de un contrato del sector público.',
      'Los convenios están sometidos al control de legalidad y presupuestario ordinario.',
      'El convenio se fundamenta en el acuerdo de voluntades y no en una relación jerárquica.'
    ]
  }`
  },
  // 14
  {
    id: 'troncal-procedimiento-35',
    replacement: `  {
    id: 'troncal-procedimiento-35', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 66.1', sourceUrl: officialSources.law39,
    text: 'Según la Ley 39/2015, las solicitudes que se formulen ante la Administración deben contener, entre otros datos:',
    options: [
      ['A', 'Nombre y apellidos del interesado (y en su caso del representante), medio electrónico o lugar de notificación, hechos, razones y petición, lugar, fecha, firma y órgano al que se dirige.'],
      ['B', 'El certificado de antecedentes penales de la persona interesada en todo caso.'],
      ['C', 'La firma obligatoria de un funcionario habilitado del registro de entrada.'],
      ['D', 'La justificación de no estar incurso en causa de incompatibilidad para el empleo público.']
    ], correct: 0,
    explanation: 'El artículo 66.1 de la Ley 39/2015 establece de forma tasada los datos mínimos que deben constar en una solicitud de inicio de procedimiento para su válida tramitación.',
    whys: [
      'Es la respuesta correcta: contiene los elementos mínimos exigidos en las letras a, b, c, d, e y f del artículo 66.1.',
      'El certificado penal solo se exige en procedimientos específicos y no es un dato general de solicitudes.',
      'La firma que se exige es la del interesado o representante, no del funcionario de registro.',
      'La incompatibilidad no forma parte del contenido ordinario exigible a toda solicitud administrativa.'
    ]
  }`
  },
  // 15
  {
    id: 'troncal-regimen-36',
    replacement: `  {
    id: 'troncal-regimen-36', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 5.2', sourceUrl: officialSources.law40,
    text: 'De forma general, la creación de órganos administrativos exige determinar:',
    options: [
      ['A', 'Su integración en la Administración y dependencia jerárquica, delimitación de sus funciones y competencias, y dotación de créditos necesarios.'],
      ['B', 'La habilitación expresa y firma de todos los ciudadanos del territorio afectado.'],
      ['C', 'El nombramiento previo del titular por Real Decreto del Consejo de Ministros en todo caso.'],
      ['D', 'La renuncia expresa e irrevocable a cualquier otra competencia territorial preexistente.']
    ], correct: 0,
    explanation: 'El artículo 5.2 de la Ley 40/2015 establece que la creación exige fijar su integración y dependencia, funciones y competencias, y dotación presupuestaria.',
    whys: [
      'Es la respuesta correcta: enumera los tres requisitos obligatorios establecidos en el artículo 5.2.',
      'La ciudadanía no interviene mediante firmas en el proceso de creación de órganos ordinarios.',
      'Muchos órganos se crean por niveles inferiores sin requerir Real Decreto estatal.',
      'La creación no se asocia con renuncias competenciales revocables de ese tipo.'
    ]
  }`
  },
  // 16
  {
    id: 'troncal-organizacion-39',
    replacement: `  {
    id: 'troncal-organizacion-39', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 54.1', sourceUrl: officialSources.law16,
    text: 'Conforme al artículo 54.1 de la Ley 16/2010 (LOFAX), la creación de organismos autónomos y agencias públicas autonómicas requiere:',
    options: [
      ['A', 'Una orden del conselleiro de Hacienda y Administración Pública de Galicia.'],
      ['B', 'Una ley del Parlamento de Galicia.'],
      ['C', 'Un acuerdo de la Comisión Delegada de la Xunta de Galicia.'],
      ['D', 'Un simple convenio administrativo con el Estado.']
    ], correct: 1,
    explanation: 'El artículo 54.1 de la Ley 16/2010 establece que la creación de organismos autónomos y de agencias públicas autonómicas se realizará por ley del Parlamento de Galicia.',
    whys: [
      'No basta con una orden del conselleiro de hacienda para crear este tipo de organismos.',
      'Es la respuesta correcta: la LOFAX exige rango de ley del Parlamento gallego (artículo 54.1).',
      'Un acuerdo de la Xunta no sustituye la reserva de ley exigida para su creación.',
      'No es un convenio con el Estado lo que faculta o realiza su creación.'
    ]
  }`
  },
  // 17
  {
    id: 'troncal-procedimiento-48',
    replacement: `  {
    id: 'troncal-procedimiento-48', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 68.1', sourceUrl: officialSources.law39,
    text: 'Conforme al artículo 68.1 de la Ley 39/2015, si la solicitud de iniciación no reúne los requisitos exigidos, se requerirá al interesado para que subsane la falta o acompañe los documentos preceptivos en un plazo de:',
    options: [
      ['A', 'Cinco días hábiles.'],
      ['B', 'Diez días hábiles, ampliables hasta en cinco días más en determinados casos.'],
      ['C', 'Quince días naturales sin posibilidad de ampliación.'],
      ['D', 'Un mes a contar desde la recepción del requerimiento.']
    ], correct: 1,
    explanation: 'El artículo 68.1 dispone que el plazo de subsanación es de diez días hábiles, ampliable en cinco días adicionales si la aportación presenta dificultades especiales.',
    whys: [
      'El plazo de cinco días no es el término general de subsanación fijado en el artículo 68.1.',
      'Es la respuesta correcta: el plazo general de subsanación es de diez días hábiles, con opción de ampliación de cinco días.',
      'El cómputo administrativo general se hace en días hábiles y el plazo admite prórroga.',
      'El plazo de un mes no corresponde con el trámite general del artículo 68.1.'
    ]
  }`
  },
  // 18
  {
    id: 'troncal-regimen-49',
    replacement: `  {
    id: 'troncal-regimen-49', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 8.1', sourceUrl: officialSources.law40,
    text: 'En la Ley 40/2015, la competencia administrativa se caracteriza, con carácter general, por ser:',
    options: [
      ['A', 'Irrenunciable, ejerciéndose por los órganos que la tengan atribuida como propia, salvo delegación o avocación legalmente previstas.'],
      ['B', 'Delegable de forma ilimitada en favor de cualquier asociación privada de interés general.'],
      ['C', 'Extinguible de forma automática por inactividad o falta de ejercicio continuado durante un año.'],
      ['D', 'Una potestad discrecional que puede ser transferida mediante orden verbal de servicio.']
    ], correct: 0,
    explanation: 'El artículo 8.1 de la Ley 40/2015 dispone que la competencia es irrenunciable y se ejerce por los órganos que la tengan atribuida como propia, admitiendo delegación o avocación como excepciones legales.',
    whys: [
      'Es la respuesta correcta: recoge la regla de irrenunciabilidad y sus excepciones legales básicas.',
      'La competencia no se delega de forma ilimitada ni a favor de entidades puramente privadas.',
      'La inactividad de un órgano no extingue sus atribuciones de competencia legalmente establecidas.',
      'Las transferencias de ejercicio (como la delegación) requieren actos formales escritos y publicados.'
    ]
  }`
  },
  // 19
  {
    id: 'troncal-organizacion-52',
    replacement: `  {
    id: 'troncal-organizacion-52', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 16.1', sourceUrl: officialSources.law16,
    text: 'De conformidad con el artículo 16 de la Ley 16/2010 (LOFAX), ¿cuál de los siguientes órganos de una consellería se clasifica como órgano superior (y no directivo)?',
    options: [
      ['A', 'La Secretaría General Técnica.'],
      ['B', 'La Dirección General.'],
      ['C', 'La Secretaría General.'],
      ['D', 'El Conselleiro o Conselleira.']
    ], correct: 3,
    explanation: 'El artículo 16.1 de la Ley 16/2010 establece que las consellerías se estructuran en órganos superiores (el conselleiro o conselleira) y órganos directivos (secretarías generales, secretarías generales técnicas y direcciones generales).',
    whys: [
      'La Secretaría General Técnica se cataloga expresamente como órgano directivo.',
      'La Dirección General es clasificada como órgano directivo.',
      'La Secretaría General forma parte de la estructura de órganos directivos.',
      'Es la respuesta correcta: el conselleiro o conselleira es el único órgano superior de la consellería.'
    ]
  }`
  },
  // 20
  {
    id: 'troncal-procedimiento-70',
    replacement: `  {
    id: 'troncal-procedimiento-70', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 24.1', sourceUrl: officialSources.law39,
    text: 'En procedimientos iniciados a solicitud de persona interesada, el silencio administrativo tiene como regla general efecto:',
    options: [
      ['A', 'Estimatorio, salvo excepciones legales.'],
      ['B', 'Always desestimatorio sin excepción.'],
      ['C', 'Siempre sancionador.'],
      ['D', 'Nulo sin producir ningún efecto jurídico.']
    ], correct: 0,
    explanation: 'El artículo 24.1 de la Ley 39/2015 establece que en los procedimientos iniciados a solicitud del interesado el silencio tiene efecto estimatorio (positivo) como regla general, salvo excepciones expresas.',
    whys: [
      'Es la respuesta correcta: establece el principio del silencio positivo y sus excepciones.',
      'La ley contempla numerosos supuestos de silencio negativo, pero no es la regla de partida.',
      'El silencio no constituye una sanción administrativa.',
      'El silencio produce plenos efectos de acto presunto estimatorio o desestimatorio.'
    ]
  }`
  },
  // 21
  {
    id: 'troncal-regimen-71',
    replacement: `  {
    id: 'troncal-regimen-71', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 9.1', sourceUrl: officialSources.law40,
    text: 'La delegación de competencias permite que:',
    options: [
      ['A', 'Los órganos de las Administraciones Públicas deleguen el ejercicio de sus competencias en otros órganos de la misma Administración o en entidades públicas vinculadas o dependientes, sean o no jerárquicamente dependientes.'],
      ['B', 'Los órganos directivos deleguen tanto la titularidad como el ejercicio de sus funciones en sujetos privados.'],
      ['C', 'Se delegue el ejercicio de competencias en materia de adopción de disposiciones de carácter general de forma ordinaria.'],
      ['D', 'Se delegue el ejercicio de competencias sobre asuntos que ya hayan sido resueltos mediante propuesta previa obligatoria.']
    ], correct: 0,
    explanation: 'El artículo 9.1 de la Ley 40/2015 permite delegar el ejercicio de competencias en otros órganos de la misma Administración (sean o no dependientes) o en entidades instrumentales.',
    whys: [
      'Es la respuesta correcta: refleja literalmente el ámbito subjetivo de la delegación en el artículo 9.1.',
      'La delegación solo transfiere el ejercicio y no la titularidad, y se hace entre órganos públicos.',
      'La adopción de disposiciones generales está expresamente excluida de la delegación (artículo 9.2.a).',
      'No cabe delegación una vez emitido dictamen o propuesta preceptiva antes de resolver.'
    ]
  }`
  },
  // 22
  {
    id: 'troncal-procedimiento-76',
    replacement: `  {
    id: 'troncal-procedimiento-76', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 82.2', sourceUrl: officialSources.law39,
    text: 'De conformidad con el artículo 82 de la Ley 39/2015, ¿en qué momento del procedimiento administrativo común se realiza el trámite de audiencia y cuál es su duración general?',
    options: [
      ['A', 'Al inicio del procedimiento, inmediatamente después de la solicitud, por un plazo de cinco días.'],
      ['B', 'Instruido el procedimiento e inmediatamente antes de redactar la propuesta de resolución, por un plazo no inferior a diez ni superior a quince días.'],
      ['C', 'Tras la firma de la resolución definitiva para que el interesado pueda manifestar su disconformidad durante un mes.'],
      ['D', 'Únicamente durante la fase de prueba a criterio discrecional del instructor por un plazo fijo de veinte días.']
    ], correct: 1,
    explanation: 'El artículo 82 establece que la audiencia se realiza una vez instruido el procedimiento e inmediatamente antes de redactar la propuesta de resolución, por un plazo de entre 10 y 15 días.',
    whys: [
      'No se efectúa al inicio del expediente procedimental ni tiene esa duración.',
      'Es la respuesta correcta: define el momento procedimental y el plazo indicados en el artículo 82.',
      'La audiencia debe ser siempre previa al acto que pone fin al procedimiento.',
      'No se asocia a la fase de prueba ni el instructor la reduce a su discreción fija.'
    ]
  }`
  },
  // 23
  {
    id: 'troncal-regimen-77',
    replacement: `  {
    id: 'troncal-regimen-77', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 11.1', sourceUrl: officialSources.law40,
    text: 'La encomienda de gestión permite encargar actividades de carácter material o técnico a otro órgano o entidad cuando:',
    options: [
      ['A', 'Concurran razones de eficacia o no se posean los medios técnicos, personales o materiales idóneos para su desempeño.'],
      ['B', 'Se pretenda modificar sustancialmente la titularidad jurídica de la competencia afectada.'],
      ['C', 'El objeto de la encomienda sea la resolución de recursos administrativos planteados en el expediente.'],
      ['D', 'Se trate de dictar disposiciones reglamentarias de carácter organizativo interno.']
    ], correct: 0,
    explanation: 'El artículo 11.1 de la Ley 40/2015 autoriza la encomienda por razones de eficacia o carencia de medios idóneos, sin que pueda suponer cesión de titularidad de la competencia.',
    whys: [
      'Es la respuesta correcta: recoge los supuestos habilitantes de eficacia y medios del artículo 11.1.',
      'La encomienda de gestión no supone alteración de la titularidad de la competencia.',
      'La resolución de recursos administrativos no puede ser objeto de encomienda material.',
      'Aprobar reglamentos es una actividad jurídica sustantiva excluida de encomienda.'
    ]
  }`
  },
  // 24
  {
    id: 'troncal-organizacion-80',
    replacement: `  {
    id: 'troncal-organizacion-80', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 45.1', sourceUrl: officialSources.law16,
    text: 'Según el artículo 45 de la Ley 16/2010 (LOFAX), ¿cuál de las siguientes entidades del sector público autonómico instrumental gallego se clasifica dentro de la categoría de "Organismo Público"?',
    options: [
      ['A', 'Una Sociedad Mercantil Pública autonómica.'],
      ['B', 'Una Agencia Pública autonómica.'],
      ['C', 'Una Fundación del sector público autonómico.'],
      ['D', 'Un Consorcio autonómico.']
    ], correct: 1,
    explanation: 'El artículo 45.1 de la Ley 16/2010 de Galicia clasifica como organismos públicos únicamente a los organismos autónomos y a las agencias públicas autonómicas.',
    whys: [
      'Las sociedades mercantiles autonómicas son una clase de entidad instrumental diferenciada de los organismos públicos.',
      'Es la respuesta correcta: la agencia pública es una clase de organismo público según el artículo 45.1.a.',
      'Las fundaciones se clasifican aparte en la estructura del sector público autonómico.',
      'Los consorcios son entes instrumentales consorciales diferenciados.'
    ]
  }`
  },
  // 25
  {
    id: 'troncal-procedimiento-104',
    replacement: `  {
    id: 'troncal-procedimiento-104', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 88.1', sourceUrl: officialSources.law39,
    text: 'La resolución que ponga fin al procedimiento administrativo debe decidir:',
    options: [
      ['A', 'Todas las cuestiones planteadas por los interesados y aquellas otras derivadas del mismo, previo trámite de alegaciones en este último caso.'],
      ['B', 'Exclusivamente aquellas cuestiones que beneficien de forma directa a la Administración pública instructora.'],
      ['C', 'Únicamente las pretensiones originales de la solicitud de inicio, ignorando las incidencias surgidas.'],
      ['D', 'Solamente las cuestiones de hecho, remitiendo las de derecho al orden jurisdiccional contencioso-administrativo.']
    ], correct: 0,
    explanation: 'El artículo 88.1 exige congruencia completa debiendo decidir sobre todas las cuestiones planteadas y las derivadas del procedimiento (con previa audiencia si hay nuevas cuestiones derivadas).',
    whys: [
      'Es la respuesta correcta: recoge la exigencia del artículo 88.1 sobre la resolución de todas las cuestiones ordinarias y derivadas.',
      'La resolución debe resolver conforme a Derecho, valorando todos los intereses en juego, no solo el público.',
      'Debe decidir también sobre incidencias y cuestiones derivadas de la instrucción.',
      'La Administración tiene competencia y obligación de pronunciarse sobre hechos y fundamentos jurídicos.'
    ]
  }`
  },
  // 26
  {
    id: 'troncal-regimen-105',
    replacement: `  {
    id: 'troncal-regimen-105', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 12.2', sourceUrl: officialSources.law40,
    text: 'De conformidad con el artículo 12 de la Ley 40/2015, ¿cuál de las siguientes afirmaciones es correcta respecto a la suplencia de los titulares de órganos administrativos?',
    options: [
      ['A', 'Requiere obligatoriamente que el suplente sea un cargo de rango superior al del suplido.'],
      ['B', 'No implica alteración de la titularidad de la competencia y su validez no exige publicar el acuerdo en boletines oficiales, salvo que una norma lo disponga.'],
      ['C', 'Supone una transferencia definitiva de la titularidad competencial que impide la revocación por el órgano originario.'],
      ['D', 'Solo es aplicable en supuestos de huelga legal de los funcionarios del departamento.']
    ], correct: 1,
    explanation: 'El artículo 12.2 dispone que la suplencia de titulares no altera la titularidad de la competencia, y no precisa publicación obligatoria en boletines oficiales para ser válida (salvo que la norma aplicable lo exija).',
    whys: [
      'La ley no establece restricciones de rango superior para designar al suplente.',
      'Es la respuesta correcta: la suplencia no altera la titularidad de la competencia y sus acuerdos no requieren publicación sistemática obligatoria en boletín oficial.',
      'La suplencia es de carácter puramente temporal y circunstancial.',
      'Se da por vacante, ausencia, enfermedad o por abstención/recusación declarada.'
    ]
  }`
  },
  // 27
  {
    id: 'troncal-organizacion-108',
    replacement: `  {
    id: 'troncal-organizacion-108', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 29.2', sourceUrl: officialSources.law16,
    text: 'De acuerdo con el artículo 29.2 de la Ley 16/2010 (LOFAX), ¿cuál de las siguientes atribuciones corresponde específicamente a la Secretaría General Técnica de una consellería?',
    options: [
      ['A', 'La representación del Estado dentro de la Comunidad Autónoma de Galicia.'],
      ['B', 'El asesoramiento técnico y administrativo de la consellería, la coordinación de sus servicios y la jefatura superior de su personal.'],
      ['C', 'El control judicial de las disposiciones administrativas generales aprobadas por el Consello de la Xunta.'],
      ['D', 'La convocatoria y fijación del orden del día de las sesiones del Parlamento de Galicia.']
    ], correct: 1,
    explanation: 'El artículo 29.2 atribuye a la Secretaría General Técnica competencias de asesoramiento de la consellería, coordinación de sus servicios y jefatura del personal del departamento.',
    whys: [
      'La representación del Estado periférica corresponde al Delegado del Gobierno.',
      'Es la respuesta correcta: recoge de forma fidedigna las competencias del artículo 29.2.',
      'El control de legalidad jurisdiccional corresponde al orden contencioso-administrativo.',
      'Las sesiones del Parlamento se coordinan por el órgano legislativo rector.'
    ]
  }`
  },
  // 28
  {
    id: 'troncal-procedimiento-117',
    replacement: `  {
    id: 'troncal-procedimiento-117', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 47.1.b', sourceUrl: officialSources.law39,
    text: 'Según el artículo 47.1 de la Ley 39/2015, ¿cuál del los siguientes actos de las Administraciones Públicas es nulo de pleno derecho?',
    options: [
      ['A', 'Aquel que contenga cualquier defecto de forma que no produzca indefensión.'],
      ['B', 'Aquel dictado por un órgano que carezca manifiestamente de competencia por razón de la materia o del territorio.'],
      ['C', 'Aquel que sea notificado fuera del plazo reglamentariamente establecido.'],
      ['D', 'Aquel dictado en un procedimiento donde falte algún informe facultativo.']
    ], correct: 1,
    explanation: 'El artículo 47.1.b establece que son nulos de pleno derecho los actos dictados por órganos manifiestamente incompetentes por razón de la materia o del territorio.',
    whys: [
      'Un defecto de forma no invalidante o que no cause indefensión es una irregularidad formal.',
      'Es la respuesta correcta: la incompetencia manifiesta de materia o territorio determina nulidad de pleno derecho (artículo 47.1.b).',
      'La notificación tardía no produce la nulidad de pleno derecho salvo plazo esencial.',
      'La falta de informes facultativos no determina nulidad de pleno derecho del acto final.'
    ]
  }`
  },
  // 29
  {
    id: 'troncal-regimen-118',
    replacement: `  {
    id: 'troncal-regimen-118', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 15.1', sourceUrl: officialSources.law40,
    text: 'Según la Ley 40/2015, ¿qué caracteriza a un órgano colegiado?',
    options: [
      ['A', 'Estar integrado por tres o más personas a las que se les atribuyan funciones de decisión, propuesta, asesoramiento, seguimiento o control.'],
      ['B', 'Contar obligatoriamente con una presidencia compartida de forma rotatoria por todos los vocales.'],
      ['C', 'Estar constituido exclusivamente por representantes electos procedentes de corporaciones locales.'],
      ['D', 'Carecer de la figura de secretario, siendo sus actas validadas por notario público externo.']
    ], correct: 0,
    explanation: 'El artículo 15.1 de la Ley 40/2015 dispone que las normas de la sección se aplican a los órganos colegiados integrados por tres o más personas dotados de funciones administrativas.',
    whys: [
      'Es la respuesta correcta: refleja la composición mínima y la asignación de funciones del artículo 15.1.',
      'La ley contempla una presidencia individual y no rotatoria forzosa.',
      'Los órganos colegiados administrativos no se restringen a representantes locales.',
      'La figura del Secretario es preceptiva en los órganos colegiados del sector público.'
    ]
  }`
  },
  // 30
  {
    id: 'troncal-organizacion-121',
    replacement: `  {
    id: 'troncal-organizacion-121', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 36.3', sourceUrl: officialSources.law16,
    text: 'De conformidad con el artículo 36 de la Ley 16/2010 (LOFAX), ¿cuál es la denominación que reciben las unidades orgánicas de nivel inferior que se crean para la tramitación administrativa ordinaria?',
    options: [
      ['A', 'Servicios territoriales autonómicos.'],
      ['B', 'Secciones de área.'],
      ['C', 'Negociados.'],
      ['D', 'Direcciones de servicio técnico.']
    ], correct: 2,
    explanation: 'El artículo 36.3 de la Ley 16/2010 establece que los negociados son las unidades orgánicas de nivel inferior que se constituyen para la tramitación, archivo y custodia de documentos y tareas administrativas de gestión.',
    whys: [
      'Los servicios son unidades superiores destinadas a áreas homogéneas de actividad.',
      'Las secciones son unidades administrativas de nivel orgánico intermedio.',
      'Es la respuesta correcta: los negociados representan el nivel inferior de gestión (artículo 36.3).',
      'No constituyen una denominación de nivel organizativo básico según esta ley.'
    ]
  }`
  },
  // 31
  {
    id: 'troncal-procedimiento-149',
    replacement: `  {
    id: 'troncal-procedimiento-149', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 1.1', sourceUrl: officialSources.law39,
    text: 'De acuerdo con el artículo 1.1 de la Ley 39/2015, ¿cuál de las siguientes materias NO forma parte del objeto de dicha ley?',
    options: [
      ['A', 'Los requisitos de validez y eficacia de los actos administrativos.'],
      ['B', 'El procedimiento administrativo común a todas las Administraciones Públicas.'],
      ['C', 'Los principios de organización interna de las entidades que integran la Administración Local.'],
      ['D', 'Los principios a los que se ha de ajustar el ejercicio de la iniciativa legislativa y la potestad reglamentaria.']
    ], correct: 2,
    explanation: 'El artículo 1.1 especifica el objeto de la Ley 39/2015 (actos administrativos, procedimiento común, iniciativa legislativa y potestad reglamentaria). La organización interna de las entidades locales se rige por su legislación básica específica (Ley 7/1985 de Bases del Régimen Local).',
    whys: [
      'Los requisitos de validez y eficacia sí forman parte del objeto regulado en el artículo 1.1.',
      'El procedimiento común es la materia central del objeto regulado en el artículo 1.1.',
      'Es la respuesta correcta: la organización local está excluida del objeto básico regulado.',
      'Los principios de la iniciativa legislativa y potestad reglamentaria se incluyen expresamente en su artículo 1.1.'
    ]
  }`
  },
  // 32
  {
    id: 'troncal-regimen-150',
    replacement: `  {
    id: 'troncal-regimen-150', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 21.2', sourceUrl: officialSources.law40,
    text: 'Conforme al artículo 21.2 de la Ley 40/2015, ¿cuál es el efecto de que un órgano administrativo incumpla una instrucción u orden de servicio de su superior?',
    options: [
      ['A', 'Determina de forma directa la nulidad de pleno derecho de todos los actos dictados.'],
      ['B', 'No afecta por sí solo a la validez de los actos dictados, sin perjuicio de la responsabilidad disciplinaria.'],
      ['C', 'Conlleva la suspensión inmediata y automática de funciones del titular del órgano.'],
      ['D', 'Hace que el procedimiento deba reanudarse desde la fase de iniciación de oficio.']
    ], correct: 1,
    explanation: 'El artículo 21.2 establece que el incumplimiento de instrucciones u órdenes de servicio no afecta por sí solo a la validez de los actos dictados por los órganos administrativos, sin perjuicio de la responsabilidad disciplinaria.',
    whys: [
      'El incumplimiento no causa por sí solo la nulidad del acto dictado.',
      'Es la respuesta correcta: así lo establece expresamente el artículo 21.2.',
      'No tiene la consideración de causa de suspensión de funciones automática.',
      'No obliga a repetir los trámites procedimentales desde la fase de iniciación.'
    ]
  }`
  },
  // 33
  {
    id: 'troncal-organizacion-153',
    replacement: `  {
    id: 'troncal-organizacion-153', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 31.2', sourceUrl: officialSources.law16,
    text: 'Según el artículo 31.2 de la Ley 16/2010 (LOFAX), ¿a qué figura corresponde con carácter general la representación de la Administración general de la Comunidad Autónoma en el ámbito territorial periférico de Galicia?',
    options: [
      ['A', 'A los Delegados o Delegadas Territoriales de la Xunta de Galicia.'],
      ['B', 'A los Secretarios Generales Técnicos de cada consellería.'],
      ['C', 'A los Alcaldes de las capitales de provincia de forma delegada.'],
      ['D', 'A los Conselleiros en régimen de presidencia rotatoria.']
    ], correct: 0,
    explanation: 'El artículo 31.2 dispone que con carácter general la representación de la Administración general de la Comunidad Autónoma de Galicia en el territorio recaerá en las figuras de los delegados y delegadas territoriales de la Xunta de Galicia.',
    whys: [
      'Es la respuesta correcta: atribuye a los delegados territoriales la representación general periférica.',
      'Los Secretarios Generales Técnicos ejercen competencias centrales del departamento.',
      'Los alcaldes pertenecen al ámbito local independiente y no representan a la Xunta.',
      'Los conselleiros dirigen sus consellerías desde la administración central.'
    ]
  }`
  },
  // 34
  {
    id: 'troncal-procedimiento-172',
    replacement: `  {
    id: 'troncal-procedimiento-172', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 24.1', sourceUrl: officialSources.law39,
    text: 'Según el artículo 24.1 de la Ley 39/2015, ¿en cuál de los siguientes casos el silencio administrativo en procedimientos a solicitud del interesado tiene efecto desestimatorio (negativo)?',
    options: [
      ['A', 'En procedimientos de responsabilidad patrimonial de las Administraciones Públicas.'],
      ['B', 'Con carácter general en cualquier procedimiento en materia tributaria común.'],
      ['C', 'En las solicitudes de ampliación de los plazos de tramitación del expediente.'],
      ['D', 'En las autorizaciones de funcionamiento de establecimientos comerciales comunes.']
    ], correct: 0,
    explanation: 'El artículo 24.1 de la Ley 39/2015 enumera excepciones al silencio estimatorio, estableciendo el carácter desestimatorio para los procedimientos de responsabilidad patrimonial.',
    whys: [
      'Es la respuesta correcta: la responsabilidad patrimonial figura entre las excepciones expresamente tasadas de silencio negativo.',
      'La materia tributaria común se rige por su propia normativa de silencio y no es una excepción de carácter general del 24.1.',
      'Las solicitudes de ampliación se resuelven por acuerdo directo sin someterse a esta regla.',
      'Las autorizaciones ordinarias no constituyen supuestos excepcionales de silencio negativo en el 24.1.'
    ]
  }`
  },
  // 35
  {
    id: 'troncal-regimen-173',
    replacement: `  {
    id: 'troncal-regimen-173', quality: 'Verificada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 32.1', sourceUrl: officialSources.law40,
    text: '¿Qué idea está detrás de la responsabilidad patrimonial de las Administraciones Públicas?',
    options: [
      ['A', 'El derecho de los particulares a ser indemnizados por toda lesión en sus bienes y derechos que sea consecuencia del funcionamiento normal o anormal de los servicios públicos, salvo fuerza mayor o deber jurídico de soportarlo.'],
      ['B', 'La cobertura económica universal para cualquier daño incidental fortuito que afecte a un particular dentro del territorio nacional.'],
      ['C', 'El derecho de indemnización condicionado a que exista dolo o negligencia grave debidamente probada del funcionario actuante.'],
      ['D', 'La compensación económica discrecional concedida por las Administraciones sin necesidad de acreditar nexo causal alguno.']
    ], correct: 0,
    explanation: 'El artículo 32.1 de la Ley 40/2015 consagra el derecho de indemnización por lesiones derivadas del funcionamiento normal o anormal del servicio público, excluyendo la fuerza mayor y los daños que exista el deber de soportar.',
    whys: [
      'Es la respuesta correcta: define los contornos de la responsabilidad objetiva del artículo 32.1.',
      'No se trata de un seguro de cobertura universal ajeno al funcionamiento del servicio público.',
      'La responsabilidad es objetiva y no depende de la prueba de negligencia personal del funcionario.',
      'Exige acreditar el nexo de causalidad directo y la efectividad del daño individualizado.'
    ]
  }`
  },
  // 36
  {
    id: 'troncal-organizacion-176',
    replacement: `  {
    id: 'troncal-organizacion-176', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 68', sourceUrl: officialSources.law16,
    text: 'Conforme al artículo 68 de la Ley 16/2010 (LOFAX), ¿por qué régimen jurídico se rigen con carácter general los organismos autónomos de la Xunta de Galicia?',
    options: [
      ['A', 'Por el derecho privado, en todo caso.'],
      ['B', 'Por el derecho mercantil de forma exclusiva.'],
      ['C', 'Por el derecho administrativo.'],
      ['D', 'Por el derecho penal y procesal militar.']
    ], correct: 2,
    explanation: 'El artículo 68 de la Ley 16/2010 dispone expresamente que los organismos autónomos de la Comunidad Autónoma de Galicia se rigen por el derecho administrativo.',
    whys: [
      'Los organismos autónomos actúan sometidos al derecho público y no al derecho privado con carácter general.',
      'El derecho mercantil no es aplicable a los organismos públicos de esta naturaleza.',
      'Es la respuesta correcta: la LOFAX prevé que los organismos autónomos están sujetos al derecho administrativo.',
      'La jurisdicción militar es por completo ajena a la organización administrativa autonómica.'
    ]
  }`
  },
  // 37
  {
    id: 'troncal-procedimiento-195',
    replacement: `  {
    id: 'troncal-procedimiento-195', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 5', sourceUrl: officialSources.law39,
    text: '¿Puede una persona interesada actuar mediante representante en un procedimiento administrativo?',
    options: [
      ['A', 'No, nunca.'],
      ['B', 'Solo si el representante es empleado público.'],
      ['C', 'Sí, en los términos previstos por la ley y acreditando la representación cuando sea exigible.'],
      ['D', 'Solo después de finalizar el procedimiento.']
    ], correct: 2,
    explanation: 'La Ley 39/2015 permite actuar por medio de representante y regula en su artículo 5 cuándo y cómo debe acreditarse esa representación en el procedimiento.',
    whys: [
      'La representación está perfectamente admitida en el tráfico administrativo.',
      'No es un requisito general que el representante sea un empleado de la Administración.',
      'Es la respuesta correcta: la representación se admite en los términos y con las acreditaciones del artículo 5.',
      'La representación es aplicable a lo largo de todo el procedimiento, desde la iniciación.'
    ]
  }`
  },
  // 38
  {
    id: 'troncal-regimen-196',
    replacement: `  {
    id: 'troncal-regimen-196', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 23.2', sourceUrl: officialSources.law40,
    text: 'Según el artículo 23.2 de la Ley 40/2015, ¿cuál de los siguientes NO es un motivo legalmente establecido de abstención para las autoridades y personal al servicio de las Administraciones?',
    options: [
      ['A', 'Tener parentesco de consanguinidad dentro del cuarto grado con cualquiera de los interesados.'],
      ['B', 'Compartir la misma afiliación a un sindicato o partido político con alguno de los interesados.'],
      ['C', 'Tener amistad íntima o enemistad manifiesta con alguna de las personas interesadas.'],
      ['D', 'Tener relación de servicio con persona natural o jurídica interesada directamente en el asunto.']
    ], correct: 1,
    explanation: 'El artículo 23.2 de la Ley 40/2015 detalla los motivos de abstención (interés personal, parentesco, amistad íntima o enemistad, perito/testigo, relación de servicio). La afiliación sindical o política común no se incluye.',
    whys: [
      'El parentesco por consanguinidad hasta el cuarto grado es causa legal de abstención (artículo 23.2.b).',
      'Es la respuesta correcta: compartir afiliación sindical o política no constituye causa legal de abstención.',
      'La amistad íntima o enemistad manifiesta es causa expresa de abstención (artículo 23.2.c).',
      'Tener relación de servicio con el interesado constituye causa legal de abstención (artículo 23.2.e).'
    ]
  }`
  },
  // 39
  {
    id: 'troncal-organizacion-199',
    replacement: `  {
    id: 'troncal-organizacion-199', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 74.1', sourceUrl: officialSources.law16,
    text: 'Según el artículo 74.1 de la Ley 16/2010 (LOFAX), ¿qué régimen jurídico rige las actuaciones de las agencias públicas autonómicas de Galicia?',
    options: [
      ['A', 'Derecho administrativo en el ejercicio de sus funciones y potestades públicas, y derecho privado, laboral o civil en lo restante.'],
      ['B', 'Exclusivamente derecho constitucional del Estado.'],
      ['C', 'Derecho internacional público sin posibilidad de aplicar derecho gallego.'],
      ['D', 'Derecho penal de forma exclusiva en toda su organización.']
    ], correct: 0,
    explanation: 'El artículo 74.1 de la Ley 16/2010 establece un régimen jurídico mixto para las agencias públicas autonómicas: derecho administrativo para el ejercicio de potestades públicas, y derecho privado, laboral o civil en lo demás.',
    whys: [
      'Es la respuesta correcta: describe el régimen mixto y equilibrado de las agencias en el artículo 74.1.',
      'No se rigen de forma exclusiva por derecho constitucional del Estado.',
      'El derecho internacional público es ajeno a la gestión ordinaria de estas entidades locales.',
      'El derecho penal no rige el funcionamiento o gestión ordinaria de una agencia pública.'
    ]
  }`
  },
  // 40
  {
    id: 'troncal-procedimiento-208',
    replacement: `  {
    id: 'troncal-procedimiento-208', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 41.6', sourceUrl: officialSources.law39,
    text: 'Conforme al artículo 41.6 de la Ley 39/2015, ¿qué consecuencia jurídica tiene la falta de práctica del aviso de puesta a disposición de una notificación en la sede electrónica?',
    options: [
      ['A', 'Determina la nulidad de pleno derecho del acto administrativo notificado.'],
      ['B', 'No impide que la notificación sea considerada plenamente válida.'],
      ['C', 'Interrumpe automáticamente los plazos de prescripción de la infracción.'],
      ['D', 'Obliga a repetir todo el procedimiento administrativo desde el trámite de audiencia.']
    ], correct: 1,
    explanation: 'El artículo 41.6 de la Ley 39/2015 prevé que la falta de práctica del aviso de cortesía por correo o dispositivo electrónico no impedirá la validez de la notificación.',
    whys: [
      'No determina la nulidad del acto; el aviso no tiene rango de requisito formal de validez.',
      'Es la respuesta correcta: la falta de práctica de este aviso no afecta a la validez de la notificación.',
      'La ausencia del aviso no tiene el efecto legal de interrumpir la prescripción de infracciones.',
      'No causa indefensión invalidante ni obliga a retrotraer actuaciones procedimentales.'
    ]
  }`
  },
  // 41
  {
    id: 'troncal-regimen-209',
    replacement: `  {
    id: 'troncal-regimen-209', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 17.1', sourceUrl: officialSources.law40,
    text: 'Según el artículo 17.1 de la Ley 40/2015, para la válida constitución de un órgano colegiado a efectos de la celebración de sesiones, se requiere la asistencia del Presidente y Secretario (o de quienes les suplan) y de:',
    options: [
      ['A', 'La totalidad absoluta de sus miembros, sin admitir ausencias.'],
      ['B', 'La mitad, al menos, de sus miembros.'],
      ['C', 'Al menos un tercio de los miembros que representen a la Administración.'],
      ['D', 'Dos tercios de los vocales inscritos en el registro oficial del órgano.']
    ], correct: 1,
    explanation: 'El artículo 17.1 exige para la válida constitución del órgano colegiado la presencia del Presidente y Secretario (o suplentes) y de la mitad, al menos, de sus miembros.',
    whys: [
      'No se requiere unanimidad de miembros para celebrar sesiones ordinarias.',
      'Es la respuesta correcta: el quórum mínimo general es de la mitad de los miembros según el artículo 17.1.',
      'La ley no define la constitución basándose en tercios representativos de la Administración.',
      'La constitución general no se eleva a la exigencia de dos tercios.'
    ]
  }`
  },
  // 42
  {
    id: 'troncal-organizacion-212',
    replacement: `  {
    id: 'troncal-organizacion-212', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 80', sourceUrl: officialSources.law16,
    text: 'Según el artículo 80 de la Ley 16/2010 (LOFAX), las agencias públicas autonómicas actúan conforme a un instrumento de planificación que regula sus objetivos y financiación, denominado:',
    options: [
      ['A', 'Convenio multilateral tributario periférico.'],
      ['B', 'Pliego de prescripciones administrativas generales.'],
      ['C', 'Contrato plurianual de gestión.'],
      ['D', 'Protocolo general de coordinación y desconcentración.']
    ], correct: 2,
    explanation: 'La Ley 16/2010 de Galicia prevé en su artículo 80 que la gestión y financiación de las agencias autonómicas se articula mediante el contrato plurianual de gestión aprobado por el Consello de la Xunta.',
    whys: [
      'No es un convenio multilateral de carácter tributario.',
      'Los pliegos regulan contratos del sector público, no la gestión de agencias.',
      'Es la respuesta correcta: el instrumento regulador es el contrato plurianual de gestión.',
      'No se asocia a protocolos generales de coordinación periférica.'
    ]
  }`
  },
  // 43
  {
    id: 'troncal-procedimiento-221',
    replacement: `  {
    id: 'troncal-procedimiento-221', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 28.2', sourceUrl: officialSources.law39,
    text: 'Según el artículo 28.2 de la Ley 39/2015, los interesados tienen derecho a no aportar documentos que:',
    options: [
      ['A', 'Sean de carácter privado y no tengan relación alguna con el expediente administrativo.'],
      ['B', 'Hayan sido elaborados por cualquier Administración o ya se encuentren en poder de la Administración actuante.'],
      ['C', 'Se redacten en un idioma cooficial de otra Comunidad Autónoma diferente a la de tramitación.'],
      ['D', 'Superen las diez páginas de extensión o requieran firma de notario.']
    ], correct: 1,
    explanation: 'El artículo 28.2 establece el derecho a no aportar documentos de otras Administraciones o ya aportados anteriormente, debiendo la Administración recabarlos electrónicamente salvo oposición del interesado.',
    whys: [
      'La naturaleza privada sin relación no otorga este derecho especial de no aportación.',
      'Es la respuesta correcta: el artículo 28.2 garantiza este derecho respecto a documentos que obren en poder administrativo o hayan sido creados por él.',
      'El idioma oficial no define la dispensa general de aportación del artículo 28.2.',
      'La extensión o exigencia notarial no son criterios contemplados para esta dispensa.'
    ]
  }`
  },
  // 44
  {
    id: 'troncal-regimen-222',
    replacement: `  {
    id: 'troncal-regimen-222', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 13.2', sourceUrl: officialSources.law40,
    text: 'De acuerdo con el artículo 13 de la Ley 40/2015, ¿cuál de las siguientes afirmaciones sobre la avocación de competencias es correcta?',
    options: [
      ['A', 'La avocación permite a un órgano dependiente atraer para sí el conocimiento de asuntos de un órgano superior.'],
      ['B', 'Se realiza mediante acuerdo motivado que debe ser notificado a los interesados antes o simultáneamente a la resolución, y contra él no cabe recurso directo.'],
      ['C', 'Conlleva la pérdida permanente y definitiva de la competencia del órgano avocado.'],
      ['D', 'Debe ser publicada con carácter previo y obligatorio en el boletín oficial de la Administración correspondiente para tener validez.']
    ], correct: 1,
    explanation: 'El artículo 13 regula que la avocación de un asunto por el superior exige acuerdo motivado y notificación al interesado, y excluye el recurso directo contra dicho acuerdo.',
    whys: [
      'La avocación opera desde el órgano superior sobre asuntos del dependiente, no al revés.',
      'Es la respuesta correcta: define las reglas de motivación, notificación y exclusión de recurso del artículo 13.',
      'No tiene efectos permanentes ni supone la pérdida de la titularidad competencial.',
      'No se exige publicación oficial previa en boletín como requisito de validez del acuerdo.'
    ]
  }`
  },
  // 45
  {
    id: 'troncal-organizacion-225',
    replacement: `  {
    id: 'troncal-organizacion-225', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 20.5', sourceUrl: officialSources.law16,
    text: 'De conformidad con el artículo 20.5 de la Ley 16/2010 (LOFAX), ¿cómo pueden ser aprobadas las actas de las sesiones de los órganos colegiados de la Administración pública gallega?',
    options: [
      ['A', 'Exclusivamente en presencia física y con firma manuscrita en libro registro.'],
      ['B', 'Por vía telemática, previo envío de la propuesta a los miembros del órgano a su dirección electrónica.'],
      ['C', 'Únicamente mediante acuerdo verbal registrado por el secretario por teléfono.'],
      ['D', 'No requieren aprobación, siendo de validez inmediata tras la sesión.']
    ], correct: 1,
    explanation: 'El artículo 20.5 de la LOFAX prevé que las actas se aprueben por vía telemática tras su envío por correo a los miembros, sin exigir presencia física.',
    whys: [
      'La ley flexibiliza la gestión y no impone obligatoriamente presencia física o manuscrita.',
      'Es la respuesta correcta: prevé la aprobación telemática de las actas tras su envío electrónico (artículo 20.5).',
      'Un registro verbal por vía telefónica no cumple con las garantías documentales mínimas.',
      'Toda acta de órgano colegiado requiere aprobación por sus miembros en los términos legales.'
    ]
  }`
  },
  // 46
  {
    id: 'troncal-procedimiento-234',
    replacement: `  {
    id: 'troncal-procedimiento-234', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 48.1', sourceUrl: officialSources.law39,
    text: 'De acuerdo con el artículo 48 de la Ley 39/2015, son anulables los actos de la Administración que:',
    options: [
      ['A', 'Incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder.'],
      ['B', 'Sean dictados por un órgano manifiestamente incompetente por razón del territorio.'],
      ['C', 'Lesionen los derechos y libertades susceptibles de amparo constitucional.'],
      ['D', 'Carezcan de los informes facultativos en su tramitación ordinaria.']
    ], correct: 0,
    explanation: 'El artículo 48.1 dispone que son anulables los actos que incurran en cualquier infracción del ordenamiento, incluida la desviación de poder. Los supuestos B y C determinan nulidad de pleno derecho.',
    whys: [
      'Es la respuesta correcta: recoge textualmente la regla general de anulabilidad del artículo 48.1.',
      'La incompetencia manifiesta por territorio es causa de nulidad de pleno derecho (artículo 47.1.b).',
      'La lesión de derechos fundamentales protegidos por amparo causa nulidad de pleno derecho (artículo 47.1.a).',
      'La omisión de un informe de tipo potestativo o facultativo no determina la anulabilidad del acto.'
    ]
  }`
  },
  // 47
  {
    id: 'troncal-regimen-235',
    replacement: `  {
    id: 'troncal-regimen-235', quality: 'Verificada y reformulada · BOE consolidado 03/01/2025', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 49.h.1º', sourceUrl: officialSources.law40,
    text: 'Conforme al artículo 49 de la Ley 40/2015, ¿cuál de los siguientes plazos representa la duración máxima general de los convenios, salvo que una norma especial establezca otra cosa?',
    options: [
      ['A', 'Dos años, con una única prórroga expresa por un año más.'],
      ['B', 'Cuatro años, pudiendo acordarse su prórroga por un periodo de hasta cuatro años adicionales antes de su finalización.'],
      ['C', 'Cinco años naturales improrrogables en todo caso.'],
      ['D', 'Diez años, debiendo revisarse de forma obligatoria cada año por la Intervención General.']
    ], correct: 1,
    explanation: 'El artículo 49.h.1º establece que la duración máxima general de los convenios es de cuatro años, pudiendo prorrogarse de forma expresa por hasta cuatro años más.',
    whys: [
      'El plazo general de duración no es de dos años.',
      'Es la respuesta correcta: coincide con las reglas de duración de cuatro años y prórrogas del artículo 49.h.1º.',
      'El plazo general no se fija en cinco años improrrogables.',
      'El límite máximo de diez años no es la regla de partida de la Ley 40/2015.'
    ]
  }`
  },
  // 48
  {
    id: 'troncal-organizacion-238',
    replacement: `  {
    id: 'troncal-organizacion-238', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 102', sourceUrl: officialSources.law16,
    text: 'Según el artículo 102 de la Ley 16/2010 (LOFAX), ¿qué requisito de participación pública define a una Sociedad Mercantil Pública autonómica de Galicia?',
    options: [
      ['A', 'Que la participación de la Administración general gallega o sus entidades instrumentales sea superior al 50 por ciento del capital social.'],
      ['B', 'Que cuente con al menos un 10 por ciento de participación estatal de forma obligatoria.'],
      ['C', 'Que pertenezca íntegramente (100%) a un ayuntamiento gallego.'],
      ['D', 'Que carezca de participación pública, siendo de capital privado puro tutelado.']
    ], correct: 0,
    explanation: 'El artículo 102 define las sociedades públicas autonómicas como aquellas donde el control público autonómico (directo o indirecto) exceda del 50 por ciento del capital social.',
    whys: [
      'Es la respuesta correcta: establece el criterio de participación superior al 50% de la LOFAX.',
      'La norma no asocia su consideración a participación estatal del 10%.',
      'Si pertenece a entidades locales sería una sociedad mercantil local y no autonómica.',
      'Exige control de capital público mayoritario, lo que excluye el capital privado puro.'
    ]
  }`
  },
  // 49
  {
    id: 'troncal-organizacion-248',
    replacement: `  {
    id: 'troncal-organizacion-248', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 113', sourceUrl: officialSources.law16,
    text: 'Conforme al artículo 113 de la Ley 16/2010 (LOFAX), son fundaciones del sector público de la Comunidad Autónoma de Galicia aquellas en las que se cumpla, entre otros, cuál de los siguientes requisitos:',
    options: [
      ['A', 'Se constituyan con aportación mayoritaria, directa o indirecta, de la Administración general o entidades instrumentales, o cuenten con mayoría de patronos designados por estas.'],
      ['B', 'Estén registradas en la Bolsa de Madrid.'],
      ['C', 'Tengan por objeto social el lucro mercantil repartible entre los fundadores.'],
      ['D', 'Sean declaradas de interés general por el Tribunal Supremo del Estado.']
    ], correct: 0,
    explanation: 'El artículo 113 define las fundaciones del sector público de la Comunidad Autónoma de Galicia por su aportación patrimonial mayoritaria pública o por tener mayoría de patronos públicos.',
    whys: [
      'Es la respuesta correcta: recoge los requisitos tasados en el artículo 113.',
      'Las fundaciones del sector público no son sociedades y no cotizan en bolsa.',
      'Las fundaciones se caracterizan precisamente por la ausencia de ánimo de lucro mercantil.',
      'No requieren declaración especial de interés general por parte del Tribunal Supremo.'
    ]
  }`
  },
  // 50
  {
    id: 'troncal-organizacion-256',
    replacement: `  {
    id: 'troncal-organizacion-256', quality: 'Verificada y reformulada · DOG 31/12/2010', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 6.3.a', sourceUrl: officialSources.law16,
    text: 'Según el artículo 6.3 de la Ley 16/2010 (LOFAX), ¿cuál de las siguientes materias NO puede ser objeto de delegación por los órganos administrativos?',
    options: [
      ['A', 'La realización de actividades materiales de tramitación interna.'],
      ['B', 'Los asuntos que deban ser sometidos a la aprobación del Consello de la Xunta de Galicia.'],
      ['C', 'Las competencias en materia de fomento y concesión de subvenciones generales.'],
      ['D', 'Las jefaturas de servicio periféricas dependientes del delegado territorial.']
    ], correct: 1,
    explanation: 'El artículo 6.3 prohíbe delegar competencias sobre asuntos que deban someterse al Consello de la Xunta, disposiciones generales y recursos dictados por el propio órgano.',
    whys: [
      'Las gestiones materiales internas sí pueden delegarse o encomendarse.',
      'Es la respuesta correcta: la delegación de asuntos atribuidos al Consello de la Xunta está explícitamente vedada por el artículo 6.3.a.',
      'La gestión y resolución de subvenciones generales sí admite la delegación.',
      'Las jefaturas periféricas no se incluyen dentro de las prohibiciones de delegación.'
    ]
  }`
  }
];

let replacedCount = 0;
for (const item of updates) {
  const regex = new RegExp("\\{\\s*id:\\s*['\"]" + item.id + "['\"][\\s\\S]*?\\n\\s*\\}(?:,)?");
  const match = content.match(regex);
  if (match) {
    const originalText = match[0];
    const hasComma = originalText.endsWith(',');
    const newText = item.replacement + (hasComma ? ',' : '');
    content = content.replace(originalText, newText);
    replacedCount++;
  } else {
    console.error('ERROR: Could not match regex in app.js for ID:', item.id);
  }
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('SUCCESS: Replaced', replacedCount, 'out of', updates.length, 'questions in app.js via regex');
