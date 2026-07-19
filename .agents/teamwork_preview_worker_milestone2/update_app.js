const fs = require('fs');

const appPath = 'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js';
let content = fs.readFileSync(appPath, 'utf8');

// Define the 50 updated questions with exact formatting
const updates = [
  // 1
  {
    id: 'procedimiento-1',
    target: `  {
    id: 'procedimiento-1', topic: 'Procedimiento administrativo', source: 'Ley 39/2015, art. 14', sourceUrl: officialSources.law39,
    text: 'Con carácter general, ¿quién está obligado a relacionarse electrónicamente con las administraciones públicas?',
    options: [
      ['A', 'Todas las personas físicas, sin excepción.'],
      ['B', 'Las personas jurídicas, entre otros sujetos previstos legalmente.'],
      ['C', 'Solo quienes trabajen en la Administración General del Estado.'],
      ['D', 'Únicamente quienes presenten un recurso administrativo.']
    ], correct: 1,
    explanation: 'La Ley 39/2015 establece una regla general de elección para las personas físicas, pero enumera sujetos obligados a relacionarse electrónicamente, entre ellos las personas jurídicas.',
    whys: ['La obligación no se extiende automáticamente a todas las personas físicas.', 'Es la respuesta correcta: las personas jurídicas figuran expresamente entre los sujetos obligados.', 'La obligación no se limita a una Administración concreta.', 'Presentar un recurso no convierte por sí solo a toda persona en sujeto obligado.']
  },`,
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
  },`
  },
  // 2
  {
    id: 'procedimiento-2',
    target: `  {
    id: 'procedimiento-2', topic: 'Procedimiento administrativo', source: 'Ley 39/2015, art. 30', sourceUrl: officialSources.law39,
    text: 'Cuando un plazo se señala por días en un procedimiento administrativo, salvo que una ley o el Derecho de la Unión Europea disponga otra cosa, se entiende que son:',
    options: [['A', 'Días naturales.'], ['B', 'Días hábiles.'], ['C', 'Días laborables solo en la localidad de la persona interesada.'], ['D', 'Días hábiles excepto los sábados, que siempre cuentan.']], correct: 1,
    explanation: 'La regla general del artículo 30 de la Ley 39/2015 es que los plazos expresados por días se cuentan por días hábiles, salvo previsión distinta.',
    whys: ['Los días naturales solo se aplican cuando una norma lo declare expresamente.', 'Es correcta: es la regla general para los plazos por días.', 'El cómputo no se define por la localidad de la persona interesada.', 'Los sábados son inhábiles a estos efectos.']
  },`,
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
  },`
  },
  // 3
  {
    id: 'historico-2025-01',
    target: `  {
    id: 'historico-2025-01', quality: 'Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 2', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 2 da Lei 39/2015, as entidades de dereito privado dependentes das administracións públicas quedarán suxeitas ao disposto nesta lei:',
    options: [['A', 'Só cando exerzan potestades administrativas.'], ['B', 'Cando as normas desta lei se refiran especificamente a estas e, en todo caso, cando exerzan potestades administrativas.'], ['C', 'Cando as normas desta lei se refiran especificamente a estas, pero non cando exerzan potestades administrativas.'], ['D', 'Supletoriamente en todo caso e cando as súas competencias se deleguen por unha Administración pública territorial.']], correct: 1,
    explanation: 'La plantilla oficial marca la B. El artículo 2 combines dos supuestos: cuando la ley se refiere específicamente a estas entidades y, en todo caso, cuando ejercen potestades administrativas.',
    whys: ['Es incompleta: omite el supuesto de referencia expresa en la propia Ley.', 'Es correcta y coincide con la redacción del artículo 2.', 'Es incorrecta porque sí quedan sujetas cuando ejercen potestades administrativas.', 'La Ley no establece esta regla supletoria ligada a una delegación territorial.']
  },`,
    replacement: `  {
    id: 'historico-2025-01', quality: 'Histórica oficial · Verificada · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 2.2.b', sourceUrl: officialSources.law39,
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
  },`
  },
  // 4
  {
    id: 'historico-2025-02',
    target: `  {
    id: 'historico-2025-02', quality: 'Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 5.3', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 5 da Lei 39/2015, a representación dos interesados con capacidade de obrar presumirase para:',
    options: [['A', 'Formular solicitudes.'], ['B', 'Presentar declaracións responsables.'], ['C', 'Os actos e xestións de mero trámite.'], ['D', 'Interpoñer recursos.']], correct: 2,
    explanation: 'La plantilla oficial marca la C. La representación se presume para actos y gestiones de mero trámite; para solicitar, formular declaraciones responsables o interponer recursos se exige acreditación.',
    whys: ['Formular solicitudes exige acreditar la representación.', 'Presentar declaraciones responsables exige acreditar la representación.', 'Es correcta: la Ley presume la representación para actos y gestiones de mero trámite.', 'Interponer recursos exige acreditar la representación.']
  },`,
    replacement: `  {
    id: 'historico-2025-02', quality: 'Histórica oficial · Verificada · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 5.3', sourceUrl: officialSources.law39,
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
  },`
  },
  // 5
  {
    id: 'historico-2025-03',
    target: `  {
    id: 'historico-2025-03', quality: 'Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 10', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 10 da Lei 39/2015, os interesados poderán asinar a través de calquera medio que permita acreditar:',
    options: [
      ['A', 'A autenticidade do consentimento e a veracidade do documento asinado.'],
      ['B', 'A autenticidade da expresión da súa vontade e consentimento, aínda que non acredite a integridade e a inalterabilidade do documento.'],
      ['C', 'A autenticidade da expresión da súa vontade ou a integridade.'],
      ['D', 'A autenticidade da expresión da súa vontade e consentimento, así como a integridade e inalterabilidade do documento.']
    ], correct: 3,
    explanation: 'La plantilla oficial marca la D. La firma electrónica debe acreditar conjuntamente la autenticidad de la voluntad y consentimiento, y la integridad e inalterabilidad del documento firmado.',
    whys: ['La Ley no exige “veracidad” como elemento alternativo a los requisitos enumerados.', 'Falta acreditar la integridad e inalterabilidad del documento.', 'El requisito no es alternativo: no basta una de las dos dimensiones.', 'Es correcta: recoge todos los elementos exigidos por el artículo 10.']
  },`,
    replacement: `  {
    id: 'historico-2025-03', quality: 'Histórica oficial · Verificada · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 10.1', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Segundo o artigo 10 da Lei 39/2015, os interesados poderán asinar a través de calquera medio que permita acreditar:',
    options: [
      ['A', 'A autenticidade do consentimento e a veracidade del documento asinado.'],
      ['B', 'A autenticidade da expresión da súa vontade e consentimento, aínda que non acredite a integridade e a inalterabilidade do documento.'],
      ['C', 'A autenticidade da expresión da súa vontade ou a integridade.'],
      ['D', 'A autenticidade da expresión da súa vontade e consentimento, así como a integridade e inalterabilidade del documento.']
    ], correct: 3,
    explanation: 'La plantilla oficial marca la D. El artículo 10.1 prevé que los interesados firmarán por cualquier medio que permita acreditar conjuntamente la autenticidad de la expresión de la voluntad y del consentimiento, y la integridad e inalterabilidad del documento.',
    whys: [
      'La ley no menciona la veracidad del documento en este apartado.',
      'Falta acreditar la integridad e inalterabilidad del documento.',
      'No se trata de requisitos alternativos, sino acumulativos.',
      'Es la respuesta correcta: recoge la autenticidad, consentimiento, integridad e inalterabilidad.'
    ]
  },`
  },
  // 6
  {
    id: 'historico-2025-04',
    target: `  {
    id: 'historico-2025-04', quality: 'Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 23.2', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Contra o acordo que resolva sobre a ampliación de prazos para resolver e notificar do procedemento administrativo:',
    options: [['A', 'Cabe recurso de reposición.'], ['B', 'Cabe recurso de alzada.'], ['C', 'Non caberá recurso ningún.'], ['D', 'Só cabe recurso de revisión.']], correct: 2,
    explanation: 'La plantilla oficial marca la C. El artículo 23.2 establece que contra el acuerdo que resuelva sobre la ampliación de plazos no cabe recurso alguno, sin perjuicio del procedente contra la resolución que ponga fin al procedimiento.',
    whys: ['No procede recurso de reposición contra este acuerdo.', 'No procede recurso de alzada contra este acuerdo.', 'Es correcta: la Ley excluye el recurso directo contra el acuerdo.', 'Tampoco procede recurso de revisión por esta causa.']
  },`,
    replacement: `  {
    id: 'historico-2025-04', quality: 'Histórica oficial · Verificada · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 23.2', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Contra o acordo que resolva sobre a ampliación de prazos para resolver e notificar do procedemento administrativo:',
    options: [['A', 'Cabe recurso de reposición.'], ['B', 'Cabe recurso de alzada.'], ['C', 'Non caberá recurso nenhum.'], ['D', 'Só cabe recurso de revisión.']], correct: 2,
    explanation: 'La plantilla oficial marca la C. Según el artículo 23.2, contra el acuerdo que resuelva sobre la ampliación de plazos no cabrá recurso alguno, sin perjuicio del que proceda contra la resolución final.',
    whys: [
      'No procede recurso de reposición contra este tipo de acuerdo.',
      'No procede recurso de alzada contra este tipo de acuerdo.',
      'Es la respuesta correcta: la Ley excluye expresamente cualquier recurso contra este acuerdo.',
      'Tampoco procede recurso extraordinario de revisión por esta causa.'
    ]
  },`
  },
  // 7
  {
    id: 'historico-2025-05',
    target: `  {
    id: 'historico-2025-05', quality: 'Histórica oficial · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 25.1.b', sourceUrl: officialSources.law39,
    originUrl: 'https://ficheiros-web.xunta.gal/funcion-publica/promocion-especifica/2025/exames/A2-modelo-A-galego.pdf',
    text: 'Nos procedementos iniciados de oficio nos que a Administración exerza potestades sancionadoras, o vencemento do prazo máximo sen resolución expresa producirá:',
    options: [['A', 'A desestimación por silencio administrativo.'], ['B', 'A caducidade.'], ['C', 'A prescrición.'], ['D', 'O desistimento.']], correct: 1,
    explanation: 'La plantilla oficial marca la B. En los procedimientos sancionadores iniciados de oficio, el vencimiento del plazo máximo sin resolución y notificación expresa produce la caducidad.',
    whys: ['No se trata de silencio desestimatorio en este supuesto.', 'Es correcta: la consecuencia prevista es la caducidad.', 'La prescripción es una institución distinta, no el efecto automático del vencimiento del plazo.', 'El desistimiento no es la consecuencia legal del transcurso del plazo.']
  }`,
    replacement: `  {
    id: 'historico-2025-05', quality: 'Histórica oficial · Verificada · A2 promoción específica 2025', topic: 'Histórico oficial 2025', source: 'Ley 39/2015, art. 25.1.b', sourceUrl: officialSources.law39,
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
    target: `  {
    id: 'troncal-procedimiento-03', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 53', sourceUrl: officialSources.law39,
    text: '¿Cuál de las siguientes NO es, con carácter general, una facultad de las personas interesadas en un procedimiento administrativo?',
    options: [['A', 'Conocer el estado de la tramitación.'], ['B', 'Obtener copia de los documentos contenidos en el procedimiento.'], ['C', 'Identificar a las autoridades y al personal responsable de la tramitación.'], ['D', 'Exigir siempre una resolución oral en lugar de una resolución escrita.']], correct: 3,
    explanation: 'El artículo 53 reconoce, entre otras, las facultades de las opciones A, B y C. No existe un derecho general a sustituir una resolución escrita por una oral.',
    whys: ['Es una facultad reconocida por el artículo 53.', 'Es una facultad reconocida por el artículo 53.', 'Es una facultad reconocida por el artículo 53.', 'Es correcta: la forma de la resolución se rige por la ley y no puede imponerse siempre oralmente.']
  },`,
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
  },`
  },
  // 9
  {
    id: 'troncal-regimen-04',
    target: `  {
    id: 'troncal-regimen-04', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 3', sourceUrl: 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566',
    text: '¿Cuál de los siguientes es un principio general de actuación de las administraciones públicas recogido en el artículo 3 de la Ley 40/2015?',
    options: [['A', 'La opacidad de los procedimientos.'], ['B', 'La coordinación.'], ['C', 'La arbitrariedad organizativa.'], ['D', 'La ausencia de responsabilidad.']], correct: 1,
    explanation: 'El artículo 3 incluye, entre otros, eficacia, jerarquía, descentralización, desconcentración, coordinación, cooperación y colaboración.',
    whys: ['La actuación administrativa está sujeta a transparencia y servicio objetivo, no a opacidad.', 'Es correcta: la coordinación figura expresamente entre los principios.', 'La arbitrariedad contradice el sometimiento pleno a la ley y al Derecho.', 'La responsabilidad es un principio reconocido, no su ausencia.']
  },`,
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
  },`
  },
  // 10
  {
    id: 'troncal-galicia-05',
    target: `  {
    id: 'troncal-galicia-05', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, art. 2', sourceUrl: officialSources.law16,
    text: 'Según la Ley 16/2010, la Administración general de la Comunidad Autónoma de Galicia actúa:',
    options: [['A', 'Con personalidad jurídica única.'], ['B', 'Sin personalidad jurídica propia.'], ['C', 'Con una personalidad jurídica distinta por cada consellería.'], ['D', 'Solo mediante las entidades instrumentales.']], correct: 0,
    explanation: 'El artículo 2.1 de la Ley 16/2010 establece que la Administración general de Galicia, constituida por órganos jerárquicamente ordenados y dirigida por la Xunta, actúa con personalidad jurídica única.',
    whys: ['Es correcta: la personalidad jurídica es única.', 'La ley afirma expresamente lo contrario.', 'Las consellerías no tienen una personalidad jurídica independiente por ese solo hecho.', 'La Administración general actúa directamente, además de contar con entidades instrumentales.']
  }`,
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
    target: `  {
    id: 'troncal-procedimiento-18', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 21', sourceUrl: officialSources.law39,
    text: 'Con carácter general, la Administración está obligada a dictar resolución expresa y a notificarla:',
    options: [['A', 'En todos los procedimientos cualquiera que sea su forma de iniciación.'], ['B', 'Solo en procedimientos iniciados a solicitud de persona interesada.'], ['C', 'Solo cuando el resultado sea favorable.'], ['D', 'Únicamente si existe recurso administrativo previo.']], correct: 0,
    explanation: 'El artículo 21 de la Ley 39/2015 establece la obligación de resolver expresamente y notificar en todos los procedimientos, con independencia de cómo se hayan iniciado.',
    whys: ['Es correcta: es la regla general del artículo 21.', 'La obligación no se limita a procedimientos iniciados a solicitud.', 'La obligación no depende de que la resolución sea favorable o desfavorable.', 'No exige la existencia previa de un recurso.']
  },`,
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
  },`
  },
  // 12
  {
    id: 'troncal-procedimiento-19',
    target: `  {
    id: 'troncal-procedimiento-19', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 40.2', sourceUrl: officialSources.law39,
    text: 'Toda notificación administrativa debe contener, entre otros extremos:',
    options: [['A', 'El texto íntegro de la resolución.'], ['B', 'Solo el número de expediente, sin contenido resolutorio.'], ['C', 'Una recomendación informal sin indicación de recursos.'], ['D', 'La firma de todas las personas interesadas.']], correct: 0,
    explanation: 'El artículo 40.2 exige que la notificación contenga el texto íntegro de la resolución e indique si pone fin a la vía administrativa, los recursos procedentes, órgano y plazo.',
    whys: ['Es correcta: el texto íntegro es un contenido mínimo de la notificación.', 'El número de expediente por sí solo no cumple el contenido legal.', 'La notificación debe informar sobre recursos cuando proceda.', 'No se exige la firma de todas las personas interesadas como contenido de la notificación.']
  },`,
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
  },`
  },
  // 13
  {
    id: 'troncal-regimen-20',
    target: `  {
    id: 'troncal-regimen-20', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 47', sourceUrl: officialSources.law40,
    text: 'Según la Ley 40/2015, los convenios son acuerdos con efectos jurídicos adoptados por administraciones públicas, organismos públicos o entidades de derecho público entre sí o con sujetos de derecho privado para:',
    options: [['A', 'Un fin común.'], ['B', 'Sustituir siempre a los contratos del sector público.'], ['C', 'Crear normas con rango de ley.'], ['D', 'Evitar toda forma de control presupuestario.']], correct: 0,
    explanation: 'El artículo 47 define los convenios como acuerdos con efectos jurídicos para un fin común, sin que puedan tener por objeto prestaciones propias de los contratos.',
    whys: ['Es correcta: el fin común forma parte de la definición legal.', 'La Ley distingue convenios y contratos; no se sustituyen siempre.', 'Un convenio no crea normas con rango de ley.', 'Los convenios están sometidos a requisitos y controles, no a una ausencia total de control.']
  },`,
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
  },`
  },
  // 14
  {
    id: 'troncal-procedimiento-35',
    target: `  {
    id: 'troncal-procedimiento-35', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 66', sourceUrl: officialSources.law39,
    text: 'Según la Ley 39/2015, las solicitudes que se formulen ante la Administración deben contener, entre otros datos:',
    options: [['A', 'La identificación de la persona interesada.'], ['B', 'La sentencia judicial firme que resuelve el fondo.'], ['C', 'La aprobación previa de las Cortes Generales.'], ['D', 'La adjudicación de un contrato público.']], correct: 0,
    explanation: 'El artículo 66 de la Ley 39/2015 recoge el contenido mínimo de las solicitudes, incluyendo la identificación de quien las formula.',
    whys: ['Es correcta: la identificación es un elemento básico de la solicitud.', 'Una solicitud administrativa no requiere contener una sentencia firme.', 'La aprobación previa de las Cortes no forma parte del contenido ordinario de una solicitud.', 'La adjudicación contractual no es un requisito general de las solicitudes.']
  },`,
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
  },`
  },
  // 15
  {
    id: 'troncal-regimen-36',
    target: `  {
    id: 'troncal-regimen-36', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 5', sourceUrl: officialSources.law40,
    text: 'De forma general, la creación de órganos administrativos exige determinar:',
    options: [
      ['A', 'Su forma de integración en la Administración y su dependencia jerárquica.'],
      ['B', 'La imposibilidad absoluta de asignarles funciones.'],
      ['C', 'Que actúen siempre sin medios personales ni materiales.'],
      ['D', 'Que sustituyan automáticamente a todos los órganos existentes.']
    ], correct: 0,
    explanation: 'La Ley 40/2015 vincula la creación de órganos administrativos a requisitos organizativos, funcionales y de integración dentro de la Administración correspondiente.',
    whys: ['Es correcta: la integración y dependencia son elementos organizativos esenciales.', 'Un órgano se crea precisamente para ejercer funciones atribuidas.', 'La creación debe atender a medios y dotación, no a su ausencia absoluta.', 'Crear un órgano no implica sustituir automáticamente a todos los demás.']
  },`,
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
  },`
  },
  // 16
  {
    id: 'troncal-organizacion-39',
    target: `  {
    id: 'troncal-organizacion-39', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y sector público autonómico', sourceUrl: officialSources.law16,
    text: 'La Ley 16/2010 de Galicia se estudia principalmente porque regula:',
    options: [
      ['A', 'La organización y funcionamiento de la Administración general y del sector público autonómico de Galicia.'],
      ['B', 'El régimen jurídico completo del Tribunal Constitucional.'],
      ['C', 'Las elecciones al Parlamento Europeo.'],
      ['D', 'La jurisdicción penal militar.']
    ], correct: 0,
    explanation: 'La Ley 16/2010 es una norma central para entender cómo se organiza y funciona la Administración general gallega y su sector público autonómico.',
    whys: ['Es correcta: coincide con el objeto de la norma.', 'El Tribunal Constitucional se regula por su ley orgánica.', 'Las elecciones europeas no son el objeto de esta ley gallega.', 'La jurisdicción penal militar pertenece a otro ámbito.']
  },`,
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
  },`
  },
  // 17
  {
    id: 'troncal-procedimiento-48',
    target: `  {
    id: 'troncal-procedimiento-48', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 68', sourceUrl: officialSources.law39,
    text: 'Si una solicitud no reúne los requisitos exigidos, con carácter general la Administración debe requerir a la persona interesada para que:',
    options: [
      ['A', 'Subsane la falta o acompañe los documentos preceptivos.'],
      ['B', 'Renuncie obligatoriamente a su derecho.'],
      ['C', 'Presente una demanda penal.'],
      ['D', 'Espere sin plazo hasta que la Administración actúe de oficio.']
    ], correct: 0,
    explanation: 'La Ley 39/2015 prevé el trámite de subsanación cuando una solicitud no cumple requisitos o no incorpora documentos necesarios.',
    whys: ['Es correcta: la subsanación permite corregir defectos de la solicitud.', 'La falta inicial no implica renuncia obligatoria al derecho.', 'No se exige una demanda penal para corregir una solicitud administrativa.', 'La subsanación se articula mediante requerimiento y plazo, no espera indefinida.']
  },`,
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
  },`
  },
  // 18
  {
    id: 'troncal-regimen-49',
    target: `  {
    id: 'troncal-regimen-49', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 8', sourceUrl: officialSources.law40,
    text: 'En la Ley 40/2015, la competencia administrativa se caracteriza, con carácter general, por ser:',
    options: [
      ['A', 'Irrenunciable y ejercida por los órganos que la tengan atribuida como propia.'],
      ['B', 'Libremente vendible a particulares.'],
      ['C', 'Siempre inexistente en los órganos administrativos.'],
      ['D', 'Un simple consejo sin efectos jurídicos.']
    ], correct: 0,
    explanation: 'La competencia es un elemento central de la organización administrativa y, con carácter general, es irrenunciable, sin perjuicio de técnicas como delegación o avocación en los términos legales.',
    whys: ['Es correcta: expresa la regla general de irrenunciabilidad competencial.', 'La competencia pública no se vende a particulares.', 'Los órganos administrativos actúan precisamente dentro de sus competencias.', 'La competencia no es un consejo, sino habilitación jurídica de actuación.']
  },`,
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
  },`
  },
  // 19
  {
    id: 'troncal-organizacion-52',
    target: `  {
    id: 'troncal-organizacion-52', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y sector público autonómico', sourceUrl: officialSources.law16,
    text: 'En la organización de la Administración autonómica gallega, las consellerías se entienden como:',
    options: [
      ['A', 'Departamentos en los que se estructura la Administración general de la Comunidad Autónoma.'],
      ['B', 'Órganos judiciales independientes de la Xunta.'],
      ['C', 'Municipios con potestad legislativa propia.'],
      ['D', 'Empresas privadas sin vinculación pública.']
    ], correct: 0,
    explanation: 'Las consellerías son departamentos de la Administración autonómica gallega y forman parte de su estructura organizativa.',
    whys: ['Es correcta: identifica su naturaleza administrativa.', 'No son órganos judiciales.', 'No son municipios ni tienen potestad legislativa propia.', 'No son empresas privadas ajenas al sector público.']
  }`,
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
    target: `  {
    id: 'troncal-procedimiento-70', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 24', sourceUrl: officialSources.law39,
    text: 'En procedimientos iniciados a solicitud de persona interesada, el silencio administrativo tiene como regla general efecto:',
    options: [
      ['A', 'Estimatorio, salvo excepciones legales.'],
      ['B', 'Siempre desestimatorio sin excepción.'],
      ['C', 'Siempre sancionador.'],
      ['D', 'Nulo sin producir ningún efecto jurídico.']
    ], correct: 0,
    explanation: 'La Ley 39/2015 establece como regla general el silencio estimatorio en procedimientos iniciados a solicitud, aunque recoge excepciones relevantes.',
    whys: ['Es correcta: es la regla general, sin olvidar las excepciones.', 'No siempre es desestimatorio.', 'El silencio no es una sanción.', 'El silencio administrativo sí puede producir efectos jurídicos.']
  },`,
    replacement: `  {
    id: 'troncal-procedimiento-70', quality: 'Verificada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 24.1', sourceUrl: officialSources.law39,
    text: 'En procedimientos iniciados a solicitud de persona interesada, el silencio administrativo tiene como regla general efecto:',
    options: [
      ['A', 'Estimatorio, salvo excepciones legales.'],
      ['B', 'Siempre desestimatorio sin excepción.'],
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
  },`
  },
  // 21
  {
    id: 'troncal-regimen-71',
    target: `  {
    id: 'troncal-regimen-71', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 9', sourceUrl: officialSources.law40,
    text: 'La delegación de competencias permite que:',
    options: [
      ['A', 'Un órgano administrativo delegue el ejercicio de competencias en otro órgano en los términos previstos legalmente.'],
      ['B', 'Se venda la competencia a una empresa privada.'],
      ['C', 'Desaparezca la titularidad de la competencia delegada.'],
      ['D', 'Se elimine todo control sobre el órgano delegado.']
    ], correct: 0,
    explanation: 'La delegación afecta al ejercicio de la competencia, no a su titularidad, y debe ajustarse a los requisitos y límites legales.',
    whys: ['Es correcta: define la lógica de la delegación.', 'La competencia administrativa no se vende.', 'La titularidad no desaparece por delegar el ejercicio.', 'La delegación no elimina controles legales.']
  },`,
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
  },`
  },
  // 22
  {
    id: 'troncal-procedimiento-76',
    target: `  {
    id: 'troncal-procedimiento-76', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 82', sourceUrl: officialSources.law39,
    text: 'El trámite de audiencia en el procedimiento administrativo permite principalmente que las personas interesadas:',
    options: [
      ['A', 'Aleguen y presenten documentos antes de la propuesta de resolución cuando proceda.'],
      ['B', 'Dicten directamente la resolución final.'],
      ['C', 'Sustituyan al órgano instructor.'],
      ['D', 'Eliminen todos los informes preceptivos.']
    ], correct: 0,
    explanation: 'El trámite de audiencia da participación a las personas interesadas antes de resolver, para formular alegaciones y aportar documentación en los términos legales.',
    whys: ['Es correcta: refleja la finalidad garantista de la audiencia.', 'La persona interesada no dicta la resolución administrativa.', 'No sustituye al órgano instructor.', 'No elimina informes que sean preceptivos.']
  },`,
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
  },`
  },
  // 23
  {
    id: 'troncal-regimen-77',
    target: `  {
    id: 'troncal-regimen-77', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 11', sourceUrl: officialSources.law40,
    text: 'La encomienda de gestión permite encargar actividades de carácter material o técnico a otro órgano o entidad cuando:',
    options: [
      ['A', 'Existan razones de eficacia o no se posean los medios técnicos idóneos para su desempeño.'],
      ['B', 'Se quiera transferir la titularidad de la competencia sin límites.'],
      ['C', 'Se pretenda evitar toda publicidad normativa.'],
      ['D', 'El órgano encomendante desaparezca automáticamente.']
    ], correct: 0,
    explanation: 'La encomienda de gestión es una técnica organizativa para actividades materiales o técnicas; no supone cesión de titularidad de la competencia.',
    whys: ['Es correcta: recoge la lógica de eficacia y medios técnicos.', 'La titularidad de la competencia no se transfiere por encomienda.', 'La encomienda se sujeta a requisitos formales y publicidad cuando proceda.', 'El órgano encomendante no desaparece por usar esta técnica.']
  },`,
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
  },`
  },
  // 24
  {
    id: 'troncal-organizacion-80',
    target: `  {
    id: 'troncal-organizacion-80', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y sector público autonómico', sourceUrl: officialSources.law16,
    text: 'El sector público autonómico de Galicia incluye, junto a la Administración general, entidades instrumentales que sirven para:',
    options: [
      ['A', 'Desarrollar funciones o actividades públicas en los términos previstos por la normativa.'],
      ['B', 'Actuar siempre fuera de todo control público.'],
      ['C', 'Sustituir al Parlamento de Galicia.'],
      ['D', 'Ejercer función jurisdiccional penal.']
    ], correct: 0,
    explanation: 'Las entidades instrumentales forman parte de la organización del sector público y se crean para cumplir fines o actividades públicas bajo régimen jurídico y control aplicable.',
    whys: [
      'Es correcta: resume su función instrumental dentro del sector público.',
      'No quedan fuera de control público por ser instrumentales.',
      'No sustituyen al Parlamento.',
      'No ejercen jurisdicción penal.'
    ]
  },`,
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
  },`
  },
  // 25
  {
    id: 'troncal-procedimiento-104',
    target: `  {
    id: 'troncal-procedimiento-104', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 88', sourceUrl: officialSources.law39,
    text: 'La resolución que ponga fin al procedimiento administrativo debe decidir:',
    options: [
      ['A', 'Todas las cuestiones planteadas por las personas interesadas y aquellas otras derivadas del procedimiento.'],
      ['B', 'Solo cuestiones ajenas al expediente.'],
      ['C', 'Únicamente la identidad del órgano judicial penal.'],
      ['D', 'La adjudicación de contratos privados sin relación con el asunto.']
    ], correct: 0,
    explanation: 'La Ley 39/2015 exige congruencia y resolución de las cuestiones propias del procedimiento administrativo.',
    whys: [
      'Es correcta: recoge la regla de decisión completa del procedimiento.',
      'La resolución debe centrarse en el expediente y sus cuestiones.',
      'No se limita a identificar órganos judiciales penales.',
      'No decide contratos privados ajenos.'
    ]
  },`,
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
  },`
  },
  // 26
  {
    id: 'troncal-regimen-105',
    target: `  {
    id: 'troncal-regimen-105', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 3', sourceUrl: officialSources.law40,
    text: 'La cooperación entre administraciones públicas implica:',
    options: [
      ['A', 'Actuación conjunta o coordinada para alcanzar fines comunes dentro del marco legal.'],
      ['B', 'Subordinación absoluta de todas las administraciones a un particular.'],
      ['C', 'Prohibición de compartir información en todo caso.'],
      ['D', 'Eliminación de las competencias de cada administración.']
    ], correct: 0,
    explanation: 'La cooperación y colaboración son principios de relación interadministrativa para actuar con eficacia respetando competencias.',
    whys: [
      'Es correcta: resume el sentido de la cooperación administrativa.',
      'No supone subordinación a particulares.',
      'Puede haber intercambio de información con límites legales.',
      'Cooperar no elimina competencias propias.'
    ]
  },`,
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
  },`
  },
  // 27
  {
    id: 'troncal-organizacion-108',
    target: `  {
    id: 'troncal-organizacion-108', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y sector público autonómico', sourceUrl: officialSources.law16,
    text: 'La Administración general de Galicia se organiza bajo principios como:',
    options: [
      ['A', 'Jerarquía, coordinación y eficacia administrativa.'],
      ['B', 'Desorden permanente como regla legal.'],
      ['C', 'Ausencia absoluta de órganos.'],
      ['D', 'Dependencia de empresas privadas para toda decisión.']
    ], correct: 0,
    explanation: 'La organización administrativa responde a principios de jerarquía, coordinación, eficacia y servicio objetivo al interés general.',
    whys: [
      'Es correcta: son principios coherentes con la organización administrativa.',
      'El desorden no es un principio organizativo.',
      'La Administración se estructura mediante órganos.',
      'Las decisiones públicas no dependen siempre de empresas privadas.'
    ]
  },`,
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
  },`
  },
  // 28
  {
    id: 'troncal-procedimiento-117',
    target: `  {
    id: 'troncal-procedimiento-117', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 68', sourceUrl: officialSources.law39,
    text: 'Si una solicitud no reúne los requisitos exigidos, ¿qué actuación prevé con carácter general la Ley 39/2015 antes de tener por desistida a la persona interesada?',
    options: [
      ['A', 'Requerir la subsanación en el plazo legalmente previsto.'],
      ['B', 'Archivar de forma automática sin aviso previo.'],
      ['C', 'Resolver siempre a favor por silencio positivo inmediato.'],
      ['D', 'Enviar el expediente directamente al orden penal.']
    ], correct: 0,
    explanation: 'El artículo 68 de la Ley 39/2015 regula el requerimiento de subsanación cuando una solicitud no cumple los requisitos, advirtiendo de los efectos de no atenderlo.',
    whys: [
      'Es correcta: la subsanación es el paso ordinario antes del desistimiento.',
      'El archivo automático sin requerimiento no respeta la regla de subsanación.',
      'El defecto de la solicitud no genera por sí mismo silencio positivo inmediato.',
      'No es una consecuencia propia de un defecto subsanable de solicitud.'
    ]
  },`,
    replacement: `  {
    id: 'troncal-procedimiento-117', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 47.1.b', sourceUrl: officialSources.law39,
    text: 'Según el artículo 47.1 de la Ley 39/2015, ¿cuál de los siguientes actos de las Administraciones Públicas es nulo de pleno derecho?',
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
  },`
  },
  // 29
  {
    id: 'troncal-regimen-118',
    target: `  {
    id: 'troncal-regimen-118', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, art. 15', sourceUrl: officialSources.law40,
    text: 'Según la Ley 40/2015, ¿qué caracteriza a un órgano colegiado?',
    options: [
      ['A', 'Está integrado por tres o más personas y se le atribuyen funciones administrativas.'],
      ['B', 'Está formado necesariamente por una sola persona titular.'],
      ['C', 'Solo puede existir en entidades privadas sin participación pública.'],
      ['D', 'Carece siempre de normas de funcionamiento.']
    ], correct: 0,
    explanation: 'La Ley 40/2015 regula los órganos colegiados como órganos integrados por varias personas, con régimen de convocatoria, sesiones, acuerdos y actas.',
    whys: [
      'Es correcta: recoge la idea básica de composición plural y funciones administrativas.',
      'Un órgano unipersonal no es colegiado.',
      'La regulación se refiere a órganos administrativos del sector público.',
      'La ley sí prevé reglas de funcionamiento para estos órganos.'
    ]
  },`,
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
  },`
  },
  // 30
  {
    id: 'troncal-organizacion-121',
    target: `  {
    id: 'troncal-organizacion-121', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué diferencia básica conviene recordar entre Administración general y sector público autonómico instrumental de Galicia?',
    options: [
      ['A', 'La Administración general actúa con órganos propios; el sector instrumental agrupa entidades creadas para fines específicos.'],
      ['B', 'El sector instrumental equivale siempre al Parlamento de Galicia.'],
      ['C', 'La Administración general carece de personalidad jurídica.'],
      ['D', 'Las entidades instrumentales nunca forman parte del ámbito público.']
    ], correct: 0,
    explanation: 'La Ley 16/2010 distingue la Administración general de la Comunidad Autónoma y las entidades del sector público autonómico, que sirven fines públicos concretos.',
    whys: [
      'Es correcta: refleja la distinción organizativa básica.',
      'El Parlamento es una institución estatutaria, no el sector instrumental.',
      'La Administración general actúa con personalidad jurídica única.',
      'Las entidades instrumentales forman parte del sector público autonómico.'
    ]
  },`,
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
  },`
  },
  // 31
  {
    id: 'troncal-procedimiento-149',
    target: `  {
    id: 'troncal-procedimiento-149', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, procedimiento administrativo común', sourceUrl: officialSources.law39,
    text: '¿Qué idea resume mejor el procedimiento administrativo común?',
    options: [
      ['A', 'Un cauce ordenado para que la Administración tramite, escuche cuando proceda y resuelva conforme a Derecho.'],
      ['B', 'Un sistema para evitar siempre toda resolución administrativa.'],
      ['C', 'Un mecanismo exclusivo de los tribunales penales.'],
      ['D', 'Una vía informal sin plazos ni garantías.']
    ], correct: 0,
    explanation: 'El procedimiento administrativo común estructura la actuación administrativa con garantías, trámites, plazos, derechos de las personas interesadas y resolución.',
    whys: [
      'Es correcta: capta la función garantista y ordenadora del procedimiento.',
      'La Administración tiene obligación de resolver en los términos legales.',
      'No es un proceso penal judicial.',
      'La Ley 39/2015 establece reglas y garantías, no informalidad absoluta.'
    ]
  },`,
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
      'El procedimiento común es la materia central declarada en el artículo 1.1.',
      'Es la respuesta correcta: la organización local está excluida de su objeto básico regulado.',
      'Los principios de la iniciativa legislativa y potestad reglamentaria se incluyen expresamente en su artículo 1.1.'
    ]
  },`
  },
  // 32
  {
    id: 'troncal-regimen-150',
    target: `  {
    id: 'troncal-regimen-150', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, régimen jurídico del sector público', sourceUrl: officialSources.law40,
    text: '¿Qué aspecto pertenece claramente al régimen jurídico del sector público?',
    options: [
      ['A', 'Los principios de actuación y funcionamiento de las administraciones públicas.'],
      ['B', 'La redacción de contratos privados entre particulares sin Administración.'],
      ['C', 'La organización interna de asociaciones deportivas privadas sin funciones públicas.'],
      ['D', 'La regulación de la sucesión hereditaria civil como materia exclusiva.']
    ], correct: 0,
    explanation: 'La Ley 40/2015 regula bases del régimen jurídico del sector público, incluyendo principios, órganos, funcionamiento, convenios y responsabilidad.',
    whys: [
      'Es correcta: esos principios forman parte del núcleo de la Ley 40/2015.',
      'Los contratos privados puros no son el objeto central de esta norma.',
      'Esa organización privada no define el régimen jurídico del sector público.',
      'La sucesión hereditaria civil pertenece a otro ámbito.'
    ]
  },`,
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
  },`
  },
  // 33
  {
    id: 'troncal-organizacion-153',
    target: `  {
    id: 'troncal-organizacion-153', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Para qué sirve distinguir órganos administrativos y entidades instrumentales?',
    options: [
      ['A', 'Para saber quién actúa dentro de la Administración general y quién opera como entidad del sector público autonómico.'],
      ['B', 'Para declarar que ambos son siempre personas físicas privadas.'],
      ['C', 'Para excluir todo control sobre las entidades públicas.'],
      ['D', 'Para impedir cualquier reparto de competencias.']
    ], correct: 0,
    explanation: 'La organización administrativa diferencia órganos de la Administración general y entidades del sector público instrumental, con régimen, funciones y controles propios.',
    whys: [
      'Es correcta: explica la utilidad práctica de la distinción.',
      'No son personas físicas privadas.',
      'Las entidades públicas también quedan sujetas a control.',
      'La organización administrativa precisamente ordena funciones y competencias.'
    ]
  },`,
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
  },`
  },
  // 34
  {
    id: 'troncal-procedimiento-172',
    target: `  {
    id: 'troncal-procedimiento-172', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 24', sourceUrl: officialSources.law39,
    text: 'En procedimientos iniciados a solicitud de persona interesada, ¿qué regula con carácter general la Ley 39/2015 sobre el silencio administrativo?',
    options: [
      ['A', 'Los efectos de la falta de resolución expresa dentro del plazo máximo.'],
      ['B', 'La prohibición absoluta de resolver por escrito.'],
      ['C', 'La obligación de acudir siempre al orden penal.'],
      ['D', 'La inexistencia de plazos administrativos.']
    ], correct: 0,
    explanation: 'La Ley 39/2015 regula los efectos del silencio administrativo cuando vence el plazo máximo sin resolución expresa, con reglas generales y excepciones.',
    whys: [
      'Es correcta: define el objeto del silencio administrativo.',
      'La Administración debe resolver expresamente.',
      'El silencio administrativo no obliga siempre a acudir al orden penal.',
      'Los plazos son esenciales en el procedimiento.'
    ]
  },`,
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
  },`
  },
  // 35
  {
    id: 'troncal-regimen-173',
    target: `  {
    id: 'troncal-regimen-173', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, responsabilidad patrimonial', sourceUrl: officialSources.law40,
    text: '¿Qué idea está detrás de la responsabilidad patrimonial de las Administraciones Públicas?',
    options: [
      ['A', 'La reparación de daños antijurídicos causados por el funcionamiento de los servicios públicos cuando concurran los requisitos legales.'],
      ['B', 'La exención absoluta de toda responsabilidad administrativa.'],
      ['C', 'La la imposibilidad de reclamar nunca por daños públicos.'],
      ['D', 'La conversión de todo daño privado en subvención.']
    ], correct: 0,
    explanation: 'La responsabilidad patrimonial permite reclamar indemnización por daños antijurídicos imputables al funcionamiento de los servicios públicos, si se cumplen los requisitos legales.',
    whys: [
      'Es correcta: resume el fundamento de la institución.',
      'La Administración no está absolutamente exenta.',
      'La ley prevé cauces de reclamación.',
      'No todo daño privado se convierte en subvención.'
    ]
  },`,
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
  },`
  },
  // 36
  {
    id: 'troncal-organizacion-176',
    target: `  {
    id: 'troncal-organizacion-176', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué busca la organización administrativa de la Xunta y su sector público?',
    options: [
      ['A', 'Ordenar órganos y entidades para prestar servicios públicos con eficacia y control.'],
      ['B', 'Eliminar toda estructura administrativa.'],
      ['C', 'Sustituir la ley por instrucciones privadas.'],
      ['D', 'Convertir las consellerías en tribunales penales.']
    ], correct: 0,
    explanation: 'La organización administrativa distribuye funciones entre órganos y entidades para actuar con eficacia, coordinación y sometimiento al Derecho.',
    whys: [
      'Es correcta: resume la finalidad organizativa.',
      'La ley no elimina la estructura administrativa.',
      'Las instrucciones privadas no sustituyen la ley.',
      'Las consellerías no son tribunales penales.'
    ]
  },`,
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
  },`
  },
  // 37
  {
    id: 'troncal-procedimiento-195',
    target: `  {
    id: 'troncal-procedimiento-195', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 5', sourceUrl: officialSources.law39,
    text: '¿Puede una persona interesada actuar mediante representante en un procedimiento administrativo?',
    options: [
      ['A', 'No, nunca.'],
      ['B', 'Solo si el representante es empleado público.'],
      ['C', 'Sí, en los términos previstos por la ley y acreditando la representación cuando sea exigible.'],
      ['D', 'Solo después de finalizar el procedimiento.']
    ], correct: 2,
    explanation: 'La Ley 39/2015 permite actuar por medio de representante y regula cuándo y cómo debe acreditarse esa representación.',
    whys: [
      'La actuación representada está admitida legalmente.',
      'No se exige con carácter general que represente un empleado público.',
      'Es correcta: reconoce la representación y su necesaria acreditación en los actos previstos.',
      'La representación puede operar durante la tramitación, no solo al terminar.'
    ]
  },`,
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
  },`
  },
  // 38
  {
    id: 'troncal-regimen-196',
    target: `  {
    id: 'troncal-regimen-196', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, abstención y recusación', sourceUrl: officialSources.law40,
    text: 'Si una autoridad tiene interés personal en un asunto que debe tramitar, ¿qué conducta procede?',
    options: [
      ['A', 'Abstenerse de intervenir y comunicarlo conforme a la ley.'],
      ['B', 'Resolverlo con prioridad sin informar a nadie.'],
      ['C', 'Delegarlo verbalmente en una persona particular.'],
      ['D', 'Destruir el expediente para evitar el conflicto.']
    ], correct: 0,
    explanation: 'El interés personal es una causa de abstención destinada a proteger la imparcialidad de la actuación administrativa.',
    whys: [
      'Es correcta: debe apartarse del asunto siguiendo el cauce legal.',
      'Intervenir ocultando el conflicto comprometería la imparcialidad.',
      'Una persona particular no recibe así una competencia administrativa.',
      'La conservación del expediente y la tramitación legal son obligatorias.'
    ]
  },`,
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
  },`
  },
  // 39
  {
    id: 'troncal-organizacion-199',
    target: `  {
    id: 'troncal-organizacion-199', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué principio favorece que los órganos administrativos actúen de forma coherente entre sí?',
    options: [
      ['A', 'La arbitrariedad.'],
      ['B', 'El aislamiento absoluto.'],
      ['C', 'La coordinación.'],
      ['D', 'La ausencia de competencias definidas.']
    ], correct: 2,
    explanation: 'La coordinación permite integrar y ordenar actuaciones de distintos órganos para alcanzar objetivos comunes con coherencia.',
    whys: [
      'La arbitrariedad está prohibida y no mejora el funcionamiento.',
      'El aislamiento dificulta una actuación administrativa coherente.',
      'Es correcta: la coordinación articula la actuación conjunta.',
      'Definir competencias aporta seguridad y responsabilidad organizativa.'
    ]
  },`,
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
  },`
  },
  // 40
  {
    id: 'troncal-procedimiento-208',
    target: `  {
    id: 'troncal-procedimiento-208', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, arts. 40 y siguientes', sourceUrl: officialSources.law39,
    text: '¿Qué finalidad tiene la notificación de un acto administrativo?',
    options: [
      ['A', 'Ocultar su contenido a la persona interesada.'],
      ['B', 'Sustituir siempre la resolución por un aviso informal.'],
      ['C', 'Poner el acto en conocimiento de la persona interesada con la información necesaria para que pueda actuar.'],
      ['D', 'Evitar que se conozcan los recursos posibles.']
    ], correct: 2,
    explanation: 'La notificación comunica el acto y debe permitir conocer su contenido, los recursos procedentes y los demás datos exigidos legalmente.',
    whys: [
      'La notificación busca conocimiento efectivo, no ocultación.',
      'Un aviso no sustituye el contenido y requisitos de la notificación.',
      'Es correcta: permite conocer el acto y ejercer los derechos correspondientes.',
      'La información sobre recursos forma parte de las garantías de la persona interesada.'
    ]
  },`,
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
  },`
  },
  // 41
  {
    id: 'troncal-regimen-209',
    target: `  {
    id: 'troncal-regimen-209', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, órganos colegiados', sourceUrl: officialSources.law40,
    text: '¿Qué documento deja constancia de los acuerdos adoptados por un órgano colegiado?',
    options: [
      ['A', 'Una conversación privada de uno de sus miembros.'],
      ['B', 'El acta de la sesión.'],
      ['C', 'Una factura de un proveedor.'],
      ['D', 'Un contrato laboral ajeno al órgano.']
    ], correct: 1,
    explanation: 'El acta documenta la sesión del órgano colegiado, incluyendo sus elementos esenciales y los acuerdos adoptados.',
    whys: [
      'Una conversación privada no acredita formalmente la actuación colegiada.',
      'Es correcta: el acta es el instrumento documental de la sesión y sus acuerdos.',
      'Una factura no documenta la formación de la voluntad colegiada.',
      'Un contrato ajeno carece de esa función.'
    ]
  },`,
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
  },`
  },
  // 42
  {
    id: 'troncal-organizacion-212',
    target: `  {
    id: 'troncal-organizacion-212', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué persigue el principio de eficacia en la organización administrativa?',
    options: [
      ['A', 'Multiplicar trámites aunque no aporten valor.'],
      ['B', 'Alcanzar los objetivos públicos encomendados.'],
      ['C', 'Actuar al margen de las competencias.'],
      ['D', 'Evitar cualquier evaluación de resultados.']
    ], correct: 1,
    explanation: 'La eficacia orienta la organización y la actuación administrativa hacia el cumplimiento real de los fines y objetivos públicos.',
    whys: [
      'Los trámites innecesarios dificultan una actuación eficaz.',
      'Es correcta: relaciona medios y organización con la consecución de objetivos.',
      'La eficacia debe respetar la legalidad y la distribución competencial.',
      'Evaluar resultados ayuda a conocer si se alcanzaron los fines previstos.'
    ]
  },`,
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
  },`
  },
  // 43
  {
    id: 'troncal-procedimiento-221',
    target: `  {
    id: 'troncal-procedimiento-221', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 21', sourceUrl: officialSources.law39,
    text: '¿Existe obligación administrativa de dictar resolución expresa?',
    options: [
      ['A', 'No, el silencio elimina siempre esa obligación.'],
      ['B', 'Sí, la Administración debe resolver y notificar en los procedimientos, con las excepciones legales.'],
      ['C', 'Solo cuando la resolución sea favorable.'],
      ['D', 'Únicamente si lo pide un órgano judicial.']
    ], correct: 1,
    explanation: 'La Administración está obligada a dictar resolución expresa y notificarla en todos los procedimientos, sin perjuicio de las excepciones previstas legalmente.',
    whys: [
      'El silencio regula efectos de la falta de resolución en plazo, pero no suprime con carácter general el deber de resolver.',
      'Es correcta: recoge la regla del artículo 21.',
      'La obligación no depende de que el resultado sea favorable.',
      'Tampoco requiere una petición judicial previa.'
    ]
  },`,
    replacement: `  {
    id: 'troncal-procedimiento-221', quality: 'Verificada y reformulada · BOE consolidado 10/07/2021', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 28.2', sourceUrl: officialSources.law39,
    text: 'Según el artículo 28.2 de la Ley 39/2015, los interesados tienen derecho a no aportar documentos que:',
    options: [
      ['A', 'Sean de carácter privado y no tengan relación alguna con el expediente administrativo.'],
      ['B', 'Hayan sido elaborados por cualquier Administración o ya se encuentren en poder de la Administración actuante.'],
      ['C', 'Se redacten en un idioma cooficial de otra Comunidad Autónoma diferente a la de tramitación.'],
      ['D', 'Superen las diez páginas de extensión o requieran firma de notario.']
    ], correct: 1,
    explanation: 'El artículo 28.2 establece el derecho a no aportar documentos elaborados por Administraciones Públicas o aportados anteriormente por el interesado, debiendo la Administración recabarlos electrónicamente.',
    whys: [
      'La naturaleza privada sin relación no otorga este derecho especial de no aportación.',
      'Es la respuesta correcta: el artículo 28.2 garantiza este derecho respecto a documentos que obren en poder administrativo o hayan sido elaborados por él.',
      'El idioma oficial no define la dispensa general de aportación del artículo 28.2.',
      'La extensión o exigencia notarial no son criterios contemplados para esta dispensa.'
    ]
  },`
  },
  // 44
  {
    id: 'troncal-regimen-222',
    target: `  {
    id: 'troncal-regimen-222', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, delegación de competencias', sourceUrl: officialSources.law40,
    text: 'Cuando un órgano delega el ejercicio de una competencia, ¿cambia su titularidad?',
    options: [
      ['A', 'Sí, se transmite definitivamente al órgano delegado.'],
      ['B', 'Sí, pero solo durante diez días.'],
      ['C', 'No; se delega el ejercicio, pero la titularidad permanece en el órgano delegante.'],
      ['D', 'La competencia queda sin titular.']
    ], correct: 2,
    explanation: 'La delegación permite que otro órgano ejerza la competencia, pero no altera su titularidad, que continúa correspondiendo al órgano delegante.',
    whys: [
      'La delegación no transmite definitivamente la titularidad.',
      'No existe ese plazo general de diez días.',
      'Es correcta: distingue titularidad y ejercicio.',
      'La competencia conserva un órgano titular.'
    ]
  },`,
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
  },`
  },
  // 45
  {
    id: 'troncal-organizacion-225',
    target: `  {
    id: 'troncal-organizacion-225', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué permite el principio de jerarquía dentro de una estructura administrativa?',
    options: [
      ['A', 'Que cualquier órgano actúe fuera de su competencia.'],
      ['B', 'Ordenar la relación entre órganos superiores y dependientes en los términos legales.'],
      ['C', 'Que las instrucciones internas sustituyan a las leyes.'],
      ['D', 'Eliminar la responsabilidad de los órganos.']
    ], correct: 1,
    explanation: 'La jerarquía organiza relaciones de dirección y dependencia entre órganos, respetando siempre la competencia y el ordenamiento jurídico.',
    whys: [
      'La jerarquía no habilita para invadir competencias.',
      'Es correcta: define su función organizativa.',
      'Una instrucción no puede desplazar una norma superior.',
      'Cada órgano mantiene la responsabilidad derivada de su actuación.'
    ]
  },`,
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
  },`
  },
  // 46
  {
    id: 'troncal-procedimiento-234',
    target: `  {
    id: 'troncal-procedimiento-234', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 39/2015, art. 68', sourceUrl: officialSources.law39,
    text: '¿Para qué sirve el trámite de subsanación de una solicitud?',
    options: [
      ['A', 'Para permitir que se corrijan defectos o se aporten documentos preceptivos antes de tener a la persona por desistida.'],
      ['B', 'Para rechazar automáticamente toda solicitud incompleta.'],
      ['C', 'Para sustituir la resolución final.'],
      ['D', 'Para impedir que la persona interesada conozca el defecto.']
    ], correct: 0,
    explanation: 'La subsanación ofrece la oportunidad de corregir la falta o acompañar documentos exigidos dentro del plazo concedido, con advertencia de las consecuencias de no hacerlo.',
    whys: [
      'Es correcta: protege la tramitación y evita un rechazo inmediato por defectos corregibles.',
      'La ley prevé un requerimiento previo de subsanación.',
      'Subsanar completa la solicitud, pero no resuelve el fondo.',
      'El requerimiento debe identificar qué debe corregirse.'
    ]
  },`,
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
      'La omisión de un informe potestativo o facultativo no determina la anulabilidad del acto.'
    ]
  },`
  },
  // 47
  {
    id: 'troncal-regimen-235',
    target: `  {
    id: 'troncal-regimen-235', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 40/2015, encomienda de gestión', sourceUrl: officialSources.law40,
    text: '¿Transfiere una encomienda de gestión la titularidad de la competencia?',
    options: [
      ['A', 'Sí, siempre y de manera definitiva.'],
      ['B', 'Sí, junto con todos los elementos sustantivos de su ejercicio.'],
      ['C', 'No; encarga actividades materiales o técnicas sin ceder la titularidad ni los elementos sustantivos de la competencia.'],
      ['D', 'La competencia queda anulada.']
    ], correct: 2,
    explanation: 'La encomienda permite encargar actividades materiales o técnicas por razones de eficacia o falta de medios, pero no transmite la titularidad competencial.',
    whys: [
      'No constituye una transmisión definitiva.',
      'El órgano competente conserva las decisiones jurídicas sustantivas.',
      'Es correcta: delimita el objeto y los efectos de la encomienda.',
      'La competencia sigue existiendo y mantiene su titular.'
    ]
  },`,
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
  },`
  },
  // 48
  {
    id: 'troncal-organizacion-238',
    target: `  {
    id: 'troncal-organizacion-238', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué debe favorecer la administración electrónica?',
    options: [
      ['A', 'La exclusión de toda atención presencial sin valorar necesidades.'],
      ['B', 'Una relación más accesible, eficiente y trazable entre ciudadanía y Administración.'],
      ['C', 'La desaparición de las garantías de identificación y seguridad.'],
      ['D', 'El uso de canales no oficiales sin registro.']
    ], correct: 1,
    explanation: 'Los medios electrónicos deben mejorar la accesibilidad y eficacia de los servicios, manteniendo seguridad, identificación, constancia y derechos de las personas.',
    whys: [
      'La transformación digital debe atender también a la accesibilidad y asistencia.',
      'Es correcta: resume sus ventajas dentro de un marco garantista.',
      'La seguridad e identificación siguen siendo imprescindibles.',
      'Los canales oficiales permiten registro y trazabilidad.'
    ]
  },`,
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
  },`
  },
  // 49
  {
    id: 'troncal-organizacion-248',
    target: `  {
    id: 'troncal-organizacion-248', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Qué debe determinarse al crear un órgano administrativo?',
    options: [
      ['A', 'Solo su nombre informal.'],
      ['B', 'Únicamente el edificio donde trabajará.'],
      ['C', 'Su integración, dependencia, funciones y dotación necesaria, en los términos exigidos.'],
      ['D', 'Las preferencias personales de sus futuros miembros.']
    ], correct: 2,
    explanation: 'La creación de órganos exige definir su encaje organizativo, dependencia, competencias o funciones y los medios necesarios, evitando duplicidades.',
    whys: [
      'El nombre por sí solo no configura un órgano.',
      'La sede no define sus competencias ni posición organizativa.',
      'Es correcta: reúne los elementos esenciales de su creación.',
      'Las preferencias personales no son un elemento jurídico organizativo.'
    ]
  },`,
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
  },`
  },
  // 50
  {
    id: 'troncal-organizacion-256',
    target: `  {
    id: 'troncal-organizacion-256', quality: 'Redacción propia · pendiente de revisión', topic: 'Troncal estatal', source: 'Ley 16/2010, organización y funcionamiento de la Administración gallega', sourceUrl: officialSources.law16,
    text: '¿Puede un órgano administrativo renunciar libremente a ejercer una competencia que tiene atribuida?',
    options: [
      ['A', 'Sí, sin necesidad de motivación ni norma.'],
      ['B', 'Sí, transfiriéndola verbalmente a una empresa.'],
      ['C', 'Sí, siempre que no informe a su superior.'],
      ['D', 'No; la competencia es irrenunciable y se ejerce por el órgano que la tiene atribuida, salvo las técnicas legales previstas.']
    ], correct: 3,
    explanation: 'La competencia es irrenunciable. Delegación, encomienda, suplencia y otras técnicas pueden afectar a su ejercicio, pero solo en los términos previstos por el ordenamiento.',
    whys: [
      'El órgano no puede abandonar unilateralmente sus responsabilidades.',
      'Una empresa no recibe competencia mediante un acuerdo verbal.',
      'Ocultar la inactividad no modifica la atribución competencial.',
      'Es correcta: recoge la regla y la existencia de técnicas legales de ejercicio.'
    ]
  }
]`,
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
  }
]`
  }
];

let replacedCount = 0;
for (const item of updates) {
  if (content.includes(item.target)) {
    content = content.replace(item.target, item.replacement);
    replacedCount++;
  } else {
    // Normalise newlines and try replacing
    const normalizedContent = content.replace(/\\r\\n/g, '\\n');
    const normalizedTarget = item.target.replace(/\\r\\n/g, '\\n');
    const normalizedReplacement = item.replacement.replace(/\\r\\n/g, '\\n');
    
    if (normalizedContent.includes(normalizedTarget)) {
      content = normalizedContent.replace(normalizedTarget, normalizedReplacement);
      replacedCount++;
    } else {
      console.error('ERROR: Could not find target content in app.js for ID:', item.id);
    }
  }
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('SUCCESS: Replaced', replacedCount, 'out of', updates.length, 'questions in app.js');
