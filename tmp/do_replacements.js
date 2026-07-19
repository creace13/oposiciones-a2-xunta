const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

const newQuestions = {
  // === CONTRATOS (14 questions) ===
  'troncal-contratos-13': {
    id: 'troncal-contratos-13',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 1',
    sourceUrl: 'officialSources.lcsp',
    text: '¿Cuál de las siguientes afirmaciones define mejor el objeto y finalidad de la Ley 9/2017 (LCSP) según su artículo 1?',
    options: [
      ['A', 'Garantizar que la contratación pública se ajuste a los principios de libertad de acceso, publicidad, transparencia, no discriminación e igualdad de trato, asegurando una eficiente utilización de los fondos.'],
      ['B', 'Permitir la adjudicación directa discrecional de cualquier contrato sin necesidad de publicidad previa.'],
      ['C', 'Excluir del ámbito de aplicación de la competencia a las pequeñas y medianas empresas.'],
      ['D', 'Priorizar en todo caso la contratación de empresas extranjeras sobre las nacionales.']
    ],
    correct: 0,
    explanation: 'El artículo 1 de la Ley 9/2017 señala que la ley tiene por objeto regular la contratación del sector público para garantizar que se ajuste a los principios de libertad de acceso a las licitaciones, publicidad y transparencia de los procedimientos, y no discriminación e igualdad de trato entre los licitadores, logrando una eficiente utilización de los fondos públicos.',
    whys: [
      'Es correcta: recoge los principios fundamentales descritos en el artículo 1.1 de la LCSP.',
      'La publicidad y transparencia impiden la adjudicación discrecional generalizada.',
      'La ley busca precisamente facilitar el acceso a la contratación de las PYMES.',
      'La discriminación por origen geográfico de las empresas está explícitamente prohibida.'
    ]
  },
  'troncal-contratos-21': {
    id: 'troncal-contratos-21',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 3',
    sourceUrl: 'officialSources.lcsp',
    text: 'Según el artículo 3 de la Ley 9/2017, ¿cuál de los siguientes sujetos tiene la consideración de Administración Pública a efectos de esta ley?',
    options: [
      ['A', 'Los consorcios dotados de personalidad jurídica propia asociados a una o varias Administraciones Públicas que cumplan los requisitos del artículo 3.2.c.'],
      ['B', 'Las sociedades mercantiles públicas cuyo capital social sea mayoritariamente de titularidad privada.'],
      ['C', 'Las fundaciones del sector público estatal que no dependan de una entidad administrativa.'],
      ['D', 'Las corporaciones de derecho privado, como los colegios profesionales, en toda su actividad ordinaria.']
    ],
    correct: 0,
    explanation: 'El artículo 3 de la Ley 9/2017 delimita el ámbito subjetivo, clasificando las entidades en tres categorías: las que forman parte del sector público, las que son poderes adjudicadores, y las que tienen la consideración de Administraciones Públicas. Los consorcios del artículo 3.2.c se consideran Administración Pública.',
    whys: [
      'Es correcta: los consorcios referidos en el artículo 3.2.c tienen la consideración de Administración Pública.',
      'Las sociedades mercantiles con capital privado mayoritario no se consideran del sector público.',
      'Las fundaciones públicas son poderes adjudicadores, pero no administraciones públicas.',
      'Los colegios profesionales son corporaciones de derecho privado y no forman parte ordinariamente de la Administración Pública.'
    ]
  },
  'troncal-contratos-40': {
    id: 'troncal-contratos-40',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 6',
    sourceUrl: 'officialSources.lcsp',
    text: 'A tenor del artículo 6 de la Ley 9/2017, ¿cuál de las siguientes relaciones jurídicas se encuentra excluida de la LCSP por constituir un convenio de colaboración?',
    options: [
      ['A', 'Aquella en que los sujetos que lo formalizan son únicamente entidades del sector público, su objeto es realizar un servicio público conjunto y no coincide con la de los contratos sujetos a esta ley.'],
      ['B', 'Aquella en la que participe al menos una empresa con ánimo de lucro para proveer suministros ordinarios.'],
      ['C', 'Aquella cuyo fin sea la obtención de un beneficio económico comercial inmediato para una de las administraciones públicas firmantes.'],
      ['D', 'Todo encargo o negocio formalizado por teléfono con empresas externas sin procedimiento escrito.']
    ],
    correct: 0,
    explanation: 'El artículo 6.1 de la Ley 9/2017 excluye del ámbito de la ley los convenios cuyos efectos se circunscriban a la esfera interna de las administraciones públicas y que tengan por objeto un servicio público compartido, siempre que no coincida con el de un contrato ordinario.',
    whys: [
      'Es correcta: refleja los requisitos acumulativos exigidos por el artículo 6 de la LCSP para excluir los convenios.',
      'Si participa una empresa privada con ánimo de lucro, se trataría de un contrato público, no de un convenio excluido.',
      'La búsqueda de beneficio económico o comercial es contraria a la naturaleza del convenio y exige licitación.',
      'Los negocios verbales están prohibidos salvo por razones de emergencia (artículo 37 de la LCSP).'
    ]
  },
  'troncal-contratos-53': {
    id: 'troncal-contratos-53',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, arts. 14 y 15',
    sourceUrl: 'officialSources.lcsp',
    text: 'Según la delimitación de tipos contractuales de la Ley 9/2017, ¿qué elemento distingue sustancialmente al contrato de concesión de servicios frente al contrato de servicios?',
    options: [
      ['A', 'La transferencia al concesionario del riesgo operacional de la explotación de los servicios, abarcando el riesgo de demanda o el de suministro.'],
      ['B', 'Que el contrato de servicios siempre debe tener una duración obligatoria superior a 25 años.'],
      ['C', 'Que el contrato de concesión de servicios se adjudica necesariamente sin pliegos de condiciones.'],
      ['D', 'Que en la concesión de servicios no existe en ningún caso contraprestación económica.']
    ],
    correct: 0,
    explanation: 'Los artículos 14, 15 y concordantes definen el contrato de concesión de servicios indicando que su objeto es la gestión de un servicio cuya prestación sea de competencia de la Administración, en el que la contraprestación consiste en el derecho a explotar el servicio e implica la transferencia del riesgo operacional.',
    whys: [
      'Es correcta: la asunción del riesgo operacional es la frontera jurídica que define a las concesiones.',
      'La duración del contrato de servicios ordinario suele ser menor (límite general de 5 años, artículo 29).',
      'Todos los contratos del sector público requieren pliegos de condiciones administrativas y técnicas.',
      'En la concesión hay contraprestación (tarifas de los usuarios o pagos de la administración).'
    ]
  },
  'troncal-contratos-72': {
    id: 'troncal-contratos-72',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 18',
    sourceUrl: 'officialSources.lcsp',
    text: 'En el caso de un contrato mixto que contenga prestaciones de distintos tipos contractuales, ¿cómo se determina el régimen aplicable para su preparación y adjudicación conforme al artículo 18 de la Ley 9/2017?',
    options: [
      ['A', 'Como regla general, se atenderá al carácter de la prestación que tenga el mayor valor estimado de entre las prestaciones que integren el contrato.'],
      ['B', 'Se aplicará siempre, y sin excepción, el régimen del contrato de obras con infraestructura pública con independencia de la cuantía.'],
      ['C', 'El órgano de contratación podrá elegir de manera totalmente discrecional y sin motivar el régimen que prefiera.'],
      ['D', 'Se dividirá obligatoriamente el contrato y se preparará y adjudicará mediante expedientes de menor cuantía.']
    ],
    correct: 0,
    explanation: 'El artículo 18.1 de la Ley 9/2017 dispone que para la preparación y adjudicación de los contratos mixtos que contengan prestaciones de obras, suministros o servicios se aplicarán las normas de la prestación que presente el mayor valor estimado.',
    whys: [
      'Es correcta: es el criterio básico de prevalencia por valor económico establecido en el artículo 18.1.',
      'No se aplica siempre obras; depende del valor de la prestación principal.',
      'El régimen de preparación y adjudicación está regido por ley y no es de libre elección discrecional.',
      'El fraccionamiento del contrato para eludir las reglas de publicidad y procedimiento está prohibido.'
    ]
  },
  'troncal-contratos-81': {
    id: 'troncal-contratos-81',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 99',
    sourceUrl: 'officialSources.lcsp',
    text: 'A tenor del artículo 99 de la Ley 9/2017, ¿cuál es la regla general respecto a la división en lotes del objeto de los contratos del sector público?',
    options: [
      ['A', 'La división en lotes es obligatoria, debiendo justificarse la no división en el expediente de contratación.'],
      ['B', 'La prohibición absoluta de dividir los contratos para evitar la fragmentación administrativa.'],
      ['C', 'La división en lotes es puramente potestativa y no requiere mención en el expediente en ningún caso.'],
      ['D', 'Exclusivamente se permite la división en lotes en los contratos de obras de cuantía superior a 10 millones de euros.']
    ],
    correct: 0,
    explanation: 'El artículo 99.3 de la Ley 9/2017 invierte la regla tradicional y establece que, siempre que la naturaleza de la prestación lo permita, el contrato deberá dividirse en lotes, debiendo justificarse la decisión de no dividir en el expediente.',
    whys: [
      'Es correcta: la regla general impone la división en lotes con obligación de justificar la no división.',
      'La división en lotes busca la competencia y acceso de PYMES, no es un fraccionamiento ilegal.',
      'La no división exige justificar motivos tasados legalmente, no es potestativa.',
      'Se aplica en general a todos los contratos, no solo a grandes obras.'
    ]
  },
  'troncal-contratos-109': {
    id: 'troncal-contratos-109',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 101',
    sourceUrl: 'officialSources.lcsp',
    text: 'Según el artículo 101 de la Ley 9/2017, ¿qué elemento debe excluirse explícitamente al realizar el cálculo del valor estimado de un contrato público?',
    options: [
      ['A', 'El Impuesto sobre el Valor Añadido (IVA).'],
      ['B', 'Los costes derivados del cumplimiento de las obligaciones medioambientales o sociales.'],
      ['C', 'Las prórrogas previstas en los pliegos del contrato.'],
      ['D', 'Las primas o pagos que se hayan establecido a favor de los licitadores en la convocatoria.']
    ],
    correct: 0,
    explanation: 'El artículo 101.1 de la Ley 9/2017 define el valor estimado indicando que el cálculo del valor de un contrato debe basarse en el importe total pagadero, excluido el Impuesto sobre el Valor Añadido (IVA), estimado por el órgano de contratación.',
    whys: [
      'Es correcta: el valor estimado se calcula siempre excluyendo el IVA por imperativo del artículo 101.1.',
      'Los costes laborales, sociales y ambientales deben incluirse en el presupuesto y valor estimado.',
      'El valor estimado debe contemplar la duración total, incluyendo las prórrogas que se prevean.',
      'Las primas o pagos previstos para los licitadores forman parte del cálculo del valor estimado.'
    ]
  },
  'troncal-contratos-122': {
    id: 'troncal-contratos-122',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 102',
    sourceUrl: 'officialSources.lcsp',
    text: 'Conforme al artículo 102 de la Ley 9/2017, sobre el precio en los contratos del sector público, ¿cuál de las siguientes prohibiciones rige con carácter general?',
    options: [
      ['A', 'El pago aplazado del precio de los contratos, salvo las excepciones autorizadas por esta u otras leyes.'],
      ['B', 'El pago en moneda de curso legal de la Unión Europea.'],
      ['C', 'Fijar precios unitarios referidos a componentes de la prestación.'],
      ['D', 'La inclusión de cláusulas de revisión de precios bajo cualquier circunstancia.']
    ],
    correct: 0,
    explanation: 'El artículo 102.4 de la Ley 9/2017 establece formalmente la prohibición del pago aplazado del precio de los contratos del sector público, salvo cuando se trate de modalidades de contratos que admitan legalmente este pago.',
    whys: [
      'Es correcta: la prohibición del pago aplazado es una regla de orden público en el gasto de contratación.',
      'El pago en moneda legal no está prohibido, es el medio natural de pago.',
      'Los precios unitarios están plenamente autorizados para la facturación (artículo 102.2).',
      'La revisión de precios se permite conforme a los requisitos específicos de los artículos 103 a 105.'
    ]
  },
  'troncal-contratos-154': {
    id: 'troncal-contratos-154',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 107',
    sourceUrl: 'officialSources.lcsp',
    text: 'De acuerdo con el artículo 107 de la Ley 9/2017, ¿cuál es el importe general exigido al adjudicatario de un contrato como garantía definitiva?',
    options: [
      ['A', 'Un 5 por ciento del presupuesto de adjudicación del contrato, excluido el Impuesto sobre el Valor Añadido (IVA).'],
      ['B', 'Un 10 por ciento del valor estimado del contrato, incluyendo el IVA y las prórrogas.'],
      ['C', 'El 1 por ciento del presupuesto base de licitación, con IVA incluido.'],
      ['D', 'Una cuantía fija de 1.500 euros para cualquier tipo de contrato público.']
    ],
    correct: 0,
    explanation: 'El artículo 107.1 de la Ley 9/2017 dispone que los licitadores que presenten las ofertas económicamente más ventajosas deberán constituir una garantía definitiva a disposición del órgano de contratación del 5% del precio de adjudicación, excluido el IVA.',
    whys: [
      'Es correcta: es el porcentaje legal de la garantía definitiva previsto en el artículo 107.1.',
      'El porcentaje es del 5%, no del 10%, y se aplica sobre la adjudicación, no sobre el valor estimado.',
      'El presupuesto base de licitación sirve de referencia para la garantía provisional, no definitiva.',
      'No existe una cuantía fija única aplicable a todos los contratos por ley.'
    ]
  },
  'troncal-contratos-177': {
    id: 'troncal-contratos-177',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 118',
    sourceUrl: 'officialSources.lcsp',
    text: 'Según el artículo 118 de la Ley 9/2017, ¿cuál es el requisito formal indispensable para tramitar un expediente de contrato menor de servicios o suministros?',
    options: [
      ['A', 'El informe del órgano de contratación motivando la necesidad del contrato y justificando que no se está alterando su objeto para eludir las reglas de contratación.'],
      ['B', 'La publicación obligatoria del anuncio de licitación en el Diario Oficial de la Unión Europea con 30 días de antelación.'],
      ['C', 'La constitución por parte del contratista de una fianza provisional equivalente al 3 por ciento del valor estimado.'],
      ['D', 'La aprobación previa y expresa del Consejo de Ministros o Consello de la Xunta para gastos de cualquier cuantía.']
    ],
    correct: 0,
    explanation: 'El artículo 118.2 de la Ley 9/2017 exige para los contratos menores de servicios y suministros la aprobación del gasto, la incorporación de la factura y la emisión de un informe del órgano de contratación motivando la necesidad y justificando que no se está fraccionando el contrato.',
    whys: [
      'Es correcta: el informe motivador y la declaración de no fraccionamiento son exigencias imperativas del artículo 118.',
      'El contrato menor no requiere anuncios de licitación ordinarios ni publicación en el DOUE.',
      'En los contratos menores no se exige fianza provisional por ley.',
      'La autorización del Gobierno o Consello de la Xunta solo se reserva para cuantías muy elevadas o supuestos específicos.'
    ]
  },
  'troncal-contratos-200': {
    id: 'troncal-contratos-200',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 131',
    sourceUrl: 'officialSources.lcsp',
    text: 'Conforme al artículo 131 de la Ley 9/2017, ¿cuál de los siguientes es un procedimiento de adjudicación utilizable por las Administraciones Públicas para contratar?',
    options: [
      ['A', 'El diálogo competitivo.'],
      ['B', 'El arbitraje comercial privado discrecional.'],
      ['C', 'El sorteo por insaculación ante notario.'],
      ['D', 'La subasta inversa telefónica sin expediente previo.']
    ],
    correct: 0,
    explanation: 'El artículo 131.2 de la Ley 9/2017 regula los procedimientos de adjudicación que pueden ser abiertos, restringidos, con negociación, diálogo competitivo, asociación para la innovación y simplificado.',
    whys: [
      'Es correcta: el diálogo competitivo es un procedimiento regulado y previsto para contratos complejos.',
      'El arbitraje privado no constituye un procedimiento de adjudicación ordinario.',
      'El sorteo notarial no es un procedimiento selectivo para adjudicar contratos.',
      'La subasta electrónica tiene reglas y medios específicos; no es telefónica ni carece de expediente.'
    ]
  },
  'troncal-contratos-213': {
    id: 'troncal-contratos-213',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 156',
    sourceUrl: 'officialSources.lcsp',
    text: 'A la luz del artículo 156 de la Ley 9/2017, sobre el procedimiento abierto de adjudicación, ¿cuál de las siguientes es una característica esencial de esta forma de contratar?',
    options: [
      ['A', 'La prohibición absoluta de negociar las condiciones del contrato con los licitadores.'],
      ['B', 'Que solo pueden presentar oferta las empresas previamente seleccionadas por el órgano de contratación.'],
      ['C', 'Que la licitación se tramita obligatoriamente de forma verbal ante una comisión de expertos.'],
      ['D', 'Que no requiere la aprobación de pliegos técnicos ni administrativos previos.']
    ],
    correct: 0,
    explanation: 'El artículo 156 de la Ley 9/2017 establece que en el procedimiento abierto cualquier empresario interesado podrá presentar una proposición, quedando excluida toda negociación de los términos del contrato con los licitadores.',
    whys: [
      'Es correcta: la inalterabilidad de las proposiciones y la prohibición de negociación definen el procedimiento abierto.',
      'El filtro previo de empresas seleccionadas define al procedimiento restringido, no al abierto.',
      'La tramitación verbal está prohibida y la licitación se formaliza electrónicamente.',
      'Todo procedimiento de licitación abierto exige pliegos de condiciones administrativas y prescripciones técnicas.'
    ]
  },
  'troncal-contratos-226': {
    id: 'troncal-contratos-226',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 211',
    sourceUrl: 'officialSources.lcsp',
    text: 'Con el artículo 211 de la Ley 9/2017, ¿cuál de las siguientes circunstancias constituye una causa legal de resolución del contrato público?',
    options: [
      ['A', 'La declaración de concurso o la declaración de insolvencia en cualquier otro procedimiento del contratista.'],
      ['B', 'El incremento voluntario de la solvencia técnica por parte del contratista durante la ejecución.'],
      ['C', 'Que una de las empresas subcontratadas decida cambiar su logotipo o nombre comercial.'],
      ['D', 'La simple jubilación del personal de la mesa de contratación que intervino en la adjudicación.']
    ],
    correct: 0,
    explanation: 'El artículo 211.1.b de la Ley 9/2017 establece como causa de resolución contractual la declaración de concurso o la declaración de insolvencia en cualquier otro procedimiento del contratista.',
    whys: [
      'Es correcta: la insolvencia y concurso del contratista son causas típicas de resolución.',
      'Mejorar la solvencia técnica es algo positivo y no constituye causa de resolución.',
      'El cambio de marca de un subcontratista no afecta a la vigencia del contrato principal.',
      'La jubilación del personal de la mesa de contratación no altera los derechos y obligaciones del contrato.'
    ]
  },
  'troncal-contratos-239': {
    id: 'troncal-contratos-239',
    quality: 'Verificada y reformulada · BOE consolidado 03/01/2025',
    topic: 'Troncal estatal',
    source: 'Ley 9/2017, art. 326',
    sourceUrl: 'officialSources.lcsp',
    text: 'De conformidad con el artículo 326 de la Ley 9/2017, ¿cuál de las siguientes es una restricción legal aplicable a la composición de las Mesas de contratación?',
    options: [
      ['A', 'En ningún caso podrá formar parte de la Mesa de contratación el personal de elección o designación política, ni el personal eventual.'],
      ['B', 'La mesa debe estar compuesta exclusivamente por el personal eventual del órgano de contratación.'],
      ['C', 'Los miembros de la mesa deben ser obligatoriamente parientes en primer grado del contratista.'],
      ['D', 'Se prohíbe que formen parte de la mesa los funcionarios de carrera de la Administración contratante.']
    ],
    correct: 0,
    explanation: 'El artículo 326.5 de la Ley 9/2017 establece que la Mesa de contratación estará constituida por un Presidente, los vocales y un Secretario, y que en ningún caso podrá formar parte de ella personal de elección o designación política ni personal eventual.',
    whys: [
      'Es correcta: esta prohibición legal busca garantizar la neutralidad técnica en las adjudicaciones.',
      'El personal eventual tiene prohibido formar parte de las mesas de contratación.',
      'El parentesco directo con el contratista es causa de abstención obligatoria y recusación.',
      'El personal funcionario de carrera (especialmente de asesoría e intervención) debe integrar la mesa.'
    ]
  },

  // === TREBEP (14 questions) ===
  'troncal-trebep-14': {
    id: 'troncal-trebep-14',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 14',
    sourceUrl: 'officialSources.trebep',
    text: 'Según el artículo 14 del TREBEP, ¿cuál de los siguientes constituye un derecho individual de los empleados públicos en el ejercicio de sus funciones?',
    options: [
      ['A', 'A la no discriminación por razón de nacimiento, origen racial o étnico, género, sexo u orientación sexual, religión o convicciones.'],
      ['B', 'Al nombramiento automático como funcionario de carrera tras dos años de servicios interinos.'],
      ['C', 'A fijar de forma unilateral y mediante acuerdo de la unidad el horario diario de trabajo.'],
      ['D', 'A percibir primas o recompensas económicas por la afiliación obligatoria a un sindicato de clase.']
    ],
    correct: 0,
    explanation: 'El artículo 14.i del TREBEP reconoce expresamente como derecho individual de los empleados públicos la no discriminación por razón de nacimiento, origen racial o étnico, género, sexo u orientación sexual, religión o convicciones, opinión, discapacidad, edad o cualquier otra condición o circunstancia personal o social.',
    whys: [
      'Es correcta: se trata de un derecho individual fundamental consagrado literalmente en el artículo 14.i.',
      'El acceso a funcionario de carrera exige superar un proceso selectivo selectivo, no por antigüedad de interino.',
      'El horario se regula colectiva o reglamentariamente, no puede ser fijado de forma unilateral.',
      'La afiliación sindical es voluntaria y libre; la discriminación por sindicarse está estrictamente prohibida.'
    ]
  },
  'troncal-trebep-22': {
    id: 'troncal-trebep-22',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 8',
    sourceUrl: 'officialSources.trebep',
    text: 'De acuerdo con el artículo 8 del TREBEP, ¿cuál es la condición necesaria para ostentar la condición de empleado público?',
    options: [
      ['A', 'Prestar servicios retribuidos por cuenta ajena y estar vinculado por una relación funcionarial o laboral con una Administración Pública.'],
      ['B', 'Haber participado como candidato en elecciones municipales o autonómicas de forma ordinaria.'],
      ['C', 'Prestar servicios voluntarios no retribuidos de apoyo social en organizaciones no gubernamentales.'],
      ['D', 'Estar inscrito en un registro de proveedores o empresas que contratan con el sector público.']
    ],
    correct: 0,
    explanation: 'El artículo 8.1 del TREBEP define que son empleados públicos quienes desempeñan funciones retribuidas al servicio de las Administraciones Públicas y se clasifican en: funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual.',
    whys: [
      'Es correcta: resume los dos requisitos acumulativos del artículo 8.1: retribución y relación funcionarial o laboral.',
      'Ser candidato a cargos electos políticos no otorga la condición de empleado público.',
      'Los servicios voluntarios y de beneficencia no conllevan una relación contratada de empleo público.',
      'Las empresas o autónomos contratistas se rigen por la legislación contractual, no tienen relación de empleo público.'
    ]
  },
  'troncal-trebep-41': {
    id: 'troncal-trebep-41',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 10',
    sourceUrl: 'officialSources.trebep',
    text: 'Conforme al artículo 10 del TREBEP, ¿en cuál de los siguientes supuestos es legalmente viable el nombramiento de personal funcionario interino?',
    options: [
      ['A', 'La existencia de plazas vacantes cuando no sea posible su cobertura por funcionarios de carrera, por un plazo máximo de tres años.'],
      ['B', 'Para realizar tareas de asesoramiento político especial y de confianza directa de los directores generales.'],
      ['C', 'El desempeño de funciones con carácter indefinido sin necesidad de convocatoria selectiva posterior.'],
      ['D', 'La cobertura temporal de ausencias de personal contratista o empresas de limpieza de los edificios públicos.']
    ],
    correct: 0,
    explanation: 'El artículo 10.1.a de la Ley del Estatuto Básico del Empleado Público permite el nombramiento de funcionarios interinos por razones de necesidad y urgencia para la existencia de plazas vacantes cuando no sea posible su cobertura por funcionarios de carrera. Además, tras la reforma de la Ley 20/2021, se limita a tres años.',
    whys: [
      'Es correcta: refleja el supuesto de vacante y el límite temporal de 3 años.',
      'Las tareas de confianza y asesoramiento corresponden al personal eventual (artículo 12), no al interino.',
      'El nombramiento interino tiene naturaleza temporal e instrumental; no puede convertirse en indefinido fijo sin proceso selectivo.',
      'Las ausencias de empresas subcontratadas se rigen por derecho privado, ajenas al funcionariado interino.'
    ]
  },
  'troncal-trebep-54': {
    id: 'troncal-trebep-54',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, arts. 53 y 54',
    sourceUrl: 'officialSources.trebep',
    text: 'En el marco del código de conducta regulado en el TREBEP, ¿cuál de los siguientes principios de conducta obliga a los empleados públicos en su relación con el público?',
    options: [
      ['A', 'Mantener una atención respetuosa y cortés, facilitando a los ciudadanos el ejercicio de sus derechos y el cumplimiento de sus deberes.'],
      ['B', 'Decidir los expedientes atendiendo a las preferencias personales para agilizar las relaciones administrativas.'],
      ['C', 'Aceptar cualquier regalo de valor económico siempre que se reciba fuera del horario de atención ordinario.'],
      ['D', 'Derivar verbalmente todas las dudas a los órganos superiores sin registrar ninguna solicitud formal.']
    ],
    correct: 0,
    explanation: 'El artículo 54.12 del TREBEP recoge como principio de conducta la obligatoriedad de garantizar la atención al público respetuosa y cortés, y facilitar a los ciudadanos el ejercicio de sus derechos.',
    whys: [
      'Es correcta: reproduce con exactitud la formulación del principio de conducta del artículo 54.12.',
      'Las decisiones deben ser objetivas e imparciales, la arbitrariedad y preferencias personales están prohibidas.',
      'El artículo 53.6 establece que no se admitirá ningún favor o ventaja que comprometa la neutralidad; los regalos están prohibidos.',
      'El personal debe tramitar las solicitudes conforme al procedimiento y no evadirlas verbalmente.'
    ]
  },
  'troncal-trebep-82': {
    id: 'troncal-trebep-82',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 11',
    sourceUrl: 'officialSources.trebep',
    text: 'Según el artículo 11 del TREBEP, ¿cómo se formaliza la relación de servicios del personal laboral al servicio de las Administraciones Públicas?',
    options: [
      ['A', 'En virtud de un contrato de trabajo formalizado por escrito que se rige por la legislación laboral y demás normas de aplicación.'],
      ['B', 'Mediante un acto de nombramiento unilateral publicado obligatoriamente en el Boletín Oficial del Estado.'],
      ['C', 'A través de la suscripción de un contrato mercantil de arrendamiento de servicios profesionales.'],
      ['D', 'Por la mera posesión de un título académico oficial expedido por una Universidad pública.']
    ],
    correct: 0,
    explanation: 'El artículo 11.1 del TREBEP define al personal laboral indicando que es el que en virtud de contrato de trabajo escrito presta servicios retribuidos en las modalidades de contratación previstas por la legislación laboral.',
    whys: [
      'Es correcta: es el modo legal de formalización y régimen jurídico del personal laboral del artículo 11.1.',
      'El nombramiento unilateral es propio del personal funcionario de carrera o interino, no del laboral.',
      'Los contratos mercantiles pertenecen al ámbito contractual administrativo y de derecho civil, no laboral.',
      'El título universitario es un requisito de titulación, no formaliza una relación de empleo público.'
    ]
  },
  'troncal-trebep-110': {
    id: 'troncal-trebep-110',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 12',
    sourceUrl: 'officialSources.trebep',
    text: 'Con arreglo al artículo 12 del TREBEP, ¿cuál es la característica que define al personal eventual en el empleo público?',
    options: [
      ['A', 'Su nombramiento y cese son libres, y realiza exclusivamente funciones de confianza o asesoramiento especial no reservadas a funcionarios.'],
      ['B', 'El carácter definitivo e inamovible de su puesto de trabajo tras seis meses de servicio activo.'],
      ['C', 'La exigencia ineludible de superar un concurso-oposición con tres ejercicios eliminatorios.'],
      ['D', 'La prohibición absoluta de percibir retribuciones complementarias de cualquier clase.']
    ],
    correct: 0,
    explanation: 'El artículo 12.1 del TREBEP define al personal eventual como aquel que, con carácter no permanente, realiza funciones de confianza o asesoramiento especial, siendo su nombramiento y cese libres.',
    whys: [
      'Es correcta: sintetiza el carácter libre, la temporalidad y las funciones del personal eventual (artículo 12.1 y 12.3).',
      'El personal eventual carece de inamovilidad y cesa automáticamente cuando cesa la autoridad que lo nombró.',
      'Su selección no se realiza mediante procesos selectivos, sino de manera discrecional.',
      'Tienen derecho a percibir retribuciones básicas y complementarias según se determine presupuestariamente.'
    ]
  },
  'troncal-trebep-123': {
    id: 'troncal-trebep-123',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, arts. 16 y 17',
    sourceUrl: 'officialSources.trebep',
    text: '¿En qué consiste la carrera profesional horizontal definida en el artículo 16 del TREBEP para el personal funcionario?',
    options: [
      ['A', 'En la progresión de grado, categoría o escalón sin necesidad de cambiar de puesto de trabajo y previa valoración de los méritos.'],
      ['B', 'En el ascenso en la estructura orgánica que implica necesariamente el cambio de puesto de trabajo por libre designación.'],
      ['C', 'En el traslado forzoso del funcionario de una Administración local a una Administración autonómica o estatal.'],
      ['D', 'En la conversión automática del personal del subgrupo C2 al subgrupo A1 tras completar diez años de servicio.']
    ],
    correct: 0,
    explanation: 'El artículo 16.3.a del TREBEP define la carrera horizontal como aquella que consiste en la progresión de grado u otros conceptos análogos, sin necesidad de cambiar de puesto de trabajo.',
    whys: [
      'Es correcta: recoge la definición legal de carrera horizontal del artículo 16.3.a.',
      'El cambio de puesto de trabajo mediante ascenso corresponde a la carrera vertical (artículo 16.3.b).',
      'La movilidad interadministrativa es un derecho de traslado, no un concepto de carrera.',
      'La promoción interna exige superar pruebas y tener titulación; no hay ascensos automáticos por antigüedad.'
    ]
  },
  'troncal-trebep-155': {
    id: 'troncal-trebep-155',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 20',
    sourceUrl: 'officialSources.trebep',
    text: 'De conformidad con el artículo 20 del TREBEP, ¿qué carácter deben tener los sistemas de evaluación del desempeño que implanten las Administraciones Públicas?',
    options: [
      ['A', 'Deben ser adecuados, transparentes y objetivos, y su aplicación debe realizarse con la participación de los empleados a través de la representación.'],
      ['B', 'Deben ser de naturaleza secreta y de aplicación exclusiva por parte del director general sin control.'],
      ['C', 'Estarán orientados exclusivamente a sancionar económicamente al personal funcionario en prácticas.'],
      ['D', 'Excluirán cualquier tipo de valoración sobre el rendimiento o consecución de resultados de la organización.']
    ],
    correct: 0,
    explanation: 'El artículo 20.2 del TREBEP dispone que los sistemas de evaluación del desempeño se adecuarán a criterios de transparencia, objetividad, imparcialidad y no discriminación, aplicándose con participación de los empleados.',
    whys: [
      'Es correcta: refleja los criterios y principios exigidos a los sistemas de evaluación de desempeño por el artículo 20.2.',
      'El secreto y la discrecionalidad total contradicen la publicidad, objetividad y transparencia exigidas.',
      'La evaluación no es una sanción al funcionario en prácticas, sino un instrumento general de carrera.',
      'El rendimiento y logro de resultados son elementos que la evaluación debe medir (artículo 20.1).'
    ]
  },
  'troncal-trebep-178': {
    id: 'troncal-trebep-178',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 55',
    sourceUrl: 'officialSources.trebep',
    text: 'A la luz del artículo 55 del TREBEP, ¿cuál de los siguientes principios debe presidir el acceso al empleo público y la actuación de los órganos de selección?',
    options: [
      ['A', 'La independencia y discrecionalidad técnica en la actuación de los órganos de selección.'],
      ['B', 'El favoritismo y la preferencia familiar basada en la antigüedad de los parientes directos.'],
      ['C', 'La selección exclusiva mediante entrevistas informales no publicadas.'],
      ['D', 'El carácter de sometimiento obligatorio a instrucciones jerárquicas directas de las autoridades sobre las notas.']
    ],
    correct: 0,
    explanation: 'El artículo 55.2 del TREBEP enumera los principios rectores para el acceso y la actuación de los tribunales selectivos, entre los que se cita la independencia y discrecionalidad técnica de los órganos de selección.',
    whys: [
      'Es correcta: la independencia y discrecionalidad técnica son principios del artículo 55.2.e.',
      'El nepotismo y parentesco vulneran los principios constitucionales de igualdad, mérito y capacidad.',
      'La publicidad exige convocatorias oficiales escritas detalladas; las entrevistas informales son ilegales.',
      'Los tribunales de selección son órganos independientes, sus calificaciones no pueden ser dirigidas jerárquicamente.'
    ]
  },
  'troncal-trebep-201': {
    id: 'troncal-trebep-201',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 63',
    sourceUrl: 'officialSources.trebep',
    text: 'Según el artículo 63 del TREBEP, ¿cuál de las siguientes situaciones determina legalmente la pérdida de la condición de funcionario de carrera?',
    options: [
      ['A', 'La pena principal o accesoria de inhabilitación absoluta o especial para cargo público que tuviere carácter firme.'],
      ['B', 'El mero cumplimiento de los 55 años de edad sin mediar ninguna otra circunstancia.'],
      ['C', 'El disfrute de una excedencia voluntaria por interés particular superior a un año.'],
      ['D', 'El cambio de residencia legal o domicilio del funcionario a otra Comunidad Autónoma.']
    ],
    correct: 0,
    explanation: 'El artículo 63 del TREBEP detalla las causas de pérdida de la condición de funcionario de carrera, entre las que se encuentra en su apartado e) la pena de inhabilitación absoluta o especial que tuviere carácter firme.',
    whys: [
      'Es correcta: la inhabilitación absoluta o especial firme es causa expresa de pérdida de la condición (artículo 63.e).',
      'La edad de pérdida ordinaria de la condición es la jubilación forzosa (generalmente a los 65 años), no a los 55.',
      'La excedencia voluntaria suspende derechos y deberes pero no supone la pérdida definitiva del estatus.',
      'La libre residencia es un derecho constitucional y los funcionarios pueden trasladarse libremente.'
    ]
  },
  'troncal-trebep-214': {
    id: 'troncal-trebep-214',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 76',
    sourceUrl: 'officialSources.trebep',
    text: 'De acuerdo con el artículo 76 del TREBEP, ¿cuál es la titulación académica exigida para acceder a los cuerpos o escalas del Grupo B de clasificación profesional?',
    options: [
      ['A', 'El título de Técnico Superior.'],
      ['B', 'El título universitario de Grado o Licenciatura.'],
      ['C', 'El título de Graduado en Educación Secundaria Obligatoria.'],
      ['D', 'El título de Bachiller.']
    ],
    correct: 0,
    explanation: 'El artículo 76 del TREBEP clasifica los cuerpos en los siguientes grupos: Grupo A (grado universitario), Grupo B (Técnico Superior) y Grupo C (subgrupo C1 bachiller/técnico y C2 ESO).',
    whys: [
      'Es correcta: para el Grupo B se exige legalmente el título de Técnico Superior conforme al artículo 76.',
      'El título de Grado o Licenciatura se exige para el Grupo A.',
      'El título de ESO se exige para el subgrupo C2.',
      'El título de Bachiller se exige para el subgrupo C1.'
    ]
  },
  'troncal-trebep-227': {
    id: 'troncal-trebep-227',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 87',
    sourceUrl: 'officialSources.trebep',
    text: 'Con arreglo al artículo 87 del TREBEP, ¿cuál de las siguientes situaciones justifica que el personal funcionario de carrera sea declarado en la situación administrativa de servicios especiales?',
    options: [
      ['A', 'Cuando sean nombrados miembros del Gobierno o de los órganos de gobierno de las Comunidades Autónomas.'],
      ['B', 'Cuando disfruten de su periodo ordinario de vacaciones anuales retribuidas.'],
      ['C', 'Al desempeñar un puesto de trabajo ordinario mediante comisión de servicios voluntaria de corta duración.'],
      ['D', 'En los casos de sanción de suspensión firme de funciones de duración inferior a seis meses.']
    ],
    correct: 0,
    explanation: 'El artículo 87.1.a del TREBEP establece que los funcionarios de carrera serán declarados en servicios especiales cuando sean nombrados miembros del Gobierno, o de los órganos de gobierno de las Comunidades Autónomas.',
    whys: [
      'Es correcta: es el primer supuesto legal previsto en la lista del artículo 87.1.',
      'El disfrute de vacaciones se produce en la situación de servicio activo (artículo 86), no en servicios especiales.',
      'La comisión de servicios mantiene al funcionario en servicio activo.',
      'La suspensión firme es una situación administrativa específica y de carácter sancionador (artículo 90).'
    ]
  },
  'troncal-trebep-240': {
    id: 'troncal-trebep-240',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 95',
    sourceUrl: 'officialSources.trebep',
    text: 'Según el catálogo de infracciones del artículo 95 del TREBEP, ¿cuál de las siguientes conductas se califica formalmente como infracción muy grave?',
    options: [
      ['A', 'El abandono del servicio, así como la publicación o utilización indebida de secretos oficiales declarados así por ley.'],
      ['B', 'La falta de puntualidad injustificada que no supere las tres veces en un mismo mes natural.'],
      ['C', 'La discrepancia técnica motivada expresada por escrito ante una instrucción del superior jerárquico.'],
      ['D', 'La asistencia voluntaria a cursos de formación profesional fuera de la jornada de trabajo ordinaria.']
    ],
    correct: 0,
    explanation: 'El artículo 95.2 del TREBEP establece el listado tasado de infracciones muy graves, que en su apartado c) incluye el abandono del servicio y la publicación de secretos oficiales.',
    whys: [
      'Es correcta: el abandono del servicio y la revelación de secretos oficiales son infracciones muy graves.',
      'La falta puntual aislada de puntualidad suele calificarse como infracción leve.',
      'La discrepancia técnica motivada y encauzada formalmente no es infracción disciplinaria.',
      'La formación profesional fuera del trabajo es un derecho del empleado público.'
    ]
  },
  'troncal-trebep-257': {
    id: 'troncal-trebep-257',
    quality: 'Verificada y reformulada · BOE consolidado 20/05/2026',
    topic: 'Troncal estatal',
    source: 'Real Decreto Legislativo 5/2015, art. 98',
    sourceUrl: 'officialSources.trebep',
    text: 'Conforme al artículo 98 del TREBEP, ¿cuál es el plazo de prescripción establecido para las infracciones graves cometidas por los empleados públicos?',
    options: [
      ['A', 'Dos años.'],
      ['B', 'Tres años.'],
      ['C', 'Seis meses.'],
      ['D', 'Cinco años.']
    ],
    correct: 0,
    explanation: 'El artículo 98.1 del TREBEP dispone que las infracciones muy graves prescribirán a los tres años; las graves, a los dos años; y las leves, a los seis meses.',
    whys: [
      'Es correcta: el plazo de prescripción legal para infracciones graves es de dos años según el artículo 98.1.',
      'Tres años es el plazo correspondiente a las infracciones muy graves.',
      'Seis meses es el plazo aplicable a las infracciones leves.',
      'El plazo de cinco años no está previsto para la prescripción de infracciones en el TREBEP.'
    ]
  },

  // === EMPLEO GALICIA (14 questions) ===
  'empleo-1': {
    id: 'empleo-1',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Empleo público',
    source: 'Ley 2/2015, art. 4',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 4 de la Ley 2/2015 de empleo público de Galicia, ¿a qué órgano corresponde la superior dirección del empleo público y la aprobación de las directrices de la política de personal?',
    options: [
      ['A', 'Al Consello de la Xunta.'],
      ['B', 'Exclusivamente a la Mesa de contratación general de la Comunidad Autónoma.'],
      ['C', 'Al Valedor del Pueblo de Galicia de forma independiente.'],
      ['D', 'A cada una de las corporaciones locales de forma separada para todo el sector público gallego.']
    ],
    correct: 0,
    explanation: 'El artículo 4.1 de la Ley 2/2015 atribuye al Consello de la Xunta de Galicia la competencia para ejercer la superior dirección de la política de empleo público y coordinar la actuación de los órganos de la Administración.',
    whys: [
      'Es correcta: el Consello de la Xunta ostenta la superior dirección según el artículo 4.1.',
      'La Mesa de contratación es un órgano técnico-administrativo para licitaciones.',
      'El Valedor del Pueblo de Galicia es un alto comisionado del Parlamento, sin dirección de función pública.',
      'Las corporaciones locales dirigen a su propio personal, pero la política autonómica superior es del Consello de la Xunta.'
    ]
  },
  'troncal-empleo-15': {
    id: 'troncal-empleo-15',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 2',
    sourceUrl: 'officialSources.employment',
    text: 'De conformidad con el artículo 2 de la Ley 2/2015, ¿cuál de los siguientes colectivos queda expresamente excluido de su ámbito de aplicación?',
    options: [
      ['A', 'El personal al servicio del Parlamento de Galicia y el del Valedor del Pueblo de Galicia, que se rigen por sus normas específicas.'],
      ['B', 'El personal funcionario de carrera de la Administración general de la Xunta de Galicia.'],
      ['C', 'El personal laboral de las entidades públicas instrumentales autonómicas.'],
      ['D', 'El personal funcionario docente dependiente de la Administración educativa autonómica.']
    ],
    correct: 0,
    explanation: 'El artículo 2 de la Ley 2/2015 especifica su ámbito de aplicación. En sus disposiciones y concordantes, se establece que el personal del Parlamento de Galicia y del Valedor se rige por su propia normativa.',
    whys: [
      'Es correcta: estos colectivos de órganos estatutarios o parlamentarios quedan fuera del ámbito de aplicación general de la ley.',
      'El personal funcionario de la Administración general de la Xunta es el destinatario principal de esta ley.',
      'El personal laboral de las entidades instrumentales gallegas se rige en parte por esta ley.',
      'El personal docente está incluido en el ámbito de aplicación de la ley, sin perjuicio de su legislación especial.'
    ]
  },
  'troncal-empleo-42': {
    id: 'troncal-empleo-42',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 5',
    sourceUrl: 'officialSources.employment',
    text: 'Con arreglo al artículo 5 de la Ley 2/2015, de empleo público de Galicia, ¿qué régimen caracteriza al personal directivo profesional?',
    options: [
      ['A', 'Su designación atiende a principios de mérito, capacidad e idoneidad mediante procedimientos que garanticen publicidad, y está sujeto a evaluación.'],
      ['B', 'Su nombramiento es definitivo e inamovible de por vida desde el momento de su designación discrecional.'],
      ['C', 'No puede en ningún caso ser contratado bajo el régimen de personal laboral de alta dirección.'],
      ['D', 'Queda totalmente exento de cualquier control de objetivos o de evaluación de resultados de su gestión.']
    ],
    correct: 0,
    explanation: 'El artículo 5.2 de la Ley 2/2015 establece que el personal directivo profesional se selecciona atendiendo a criterios de competencia profesional, y está sujeto a evaluación periódica de acuerdo con la eficacia y eficiencia.',
    whys: [
      'Es correcta: refleja los criterios de acceso y el sometimiento imperativo a evaluación del artículo 5.',
      'El personal directivo no tiene derecho de inamovilidad y puede ser cesado discrecionalmente.',
      'El artículo 5.1 prevé la contratación de alta dirección para este personal.',
      'La evaluación del desempeño y la orientación a resultados son las notas fundamentales del personal directivo.'
    ]
  },
  'troncal-empleo-55': {
    id: 'troncal-empleo-55',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 7',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 7 de la Ley 2/2015 de Galicia, ¿cuál es la naturaleza y función del personal eventual?',
    options: [
      ['A', 'Realiza funciones de confianza o asesoramiento especial no reservadas a funcionarios de carrera, y cesa automáticamente cuando cesa la autoridad que lo nombró.'],
      ['B', 'Ejerce con carácter ordinario y definitivo las funciones de fe pública de las secretarías de consellerías.'],
      ['C', 'Se selecciona obligatoriamente mediante oposición pública y bolsa de empleo por orden estricto de nota.'],
      ['D', 'Su nombramiento adquiere carácter inamovible de funcionario de carrera tras dos años continuados de servicios.']
    ],
    correct: 0,
    explanation: 'El artículo 7 de la Ley 2/2015 define al personal eventual indicando que realiza funciones no permanentes de confianza y que su cese se produce de forma libre o automática por el cese de la autoridad.',
    whys: [
      'Es correcta: describe exactamente las funciones y el cese característico del personal eventual conforme al artículo 7.',
      'Las funciones de fe pública o ejercicio de potestades soberanas están reservadas a funcionarios de carrera.',
      'Su nombramiento es libre y discrecional, no mediante oposiciones regladas ni bolsas de empleo.',
      'Ningún periodo de tiempo como personal eventual puede transformar la relación en funcionarial de carrera.'
    ]
  },
  'troncal-empleo-73': {
    id: 'troncal-empleo-73',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 28',
    sourceUrl: 'officialSources.employment',
    text: 'A tenor del artículo 28 de la Ley 2/2015 de Galicia, ¿qué requisito registral es indispensable para que los actos de nombramiento, provisión o carrera del personal produzcan efectos económicos?',
    options: [
      ['A', 'La inscripción obligatoria del acto o resolución correspondiente en el Registro General de Personal.'],
      ['B', 'La mera publicación del acto en la intranet corporativa de la consellería respectiva.'],
      ['C', 'Que el interesado declare formalmente por escrito ante notario que ha asumido las tareas de su cargo.'],
      ['D', 'Su comunicación informal vía correo electrónico al servicio de intervención presupuestaria de la Xunta.']
    ],
    correct: 0,
    explanation: 'El artículo 28.3 de la Ley 2/2015 establece que los actos de nombramiento, toma de posesión, provisión, jubilación y carrera del personal deben inscribirse en el Registro, y no podrán producir efectos económicos si no se ha inscrito.',
    whys: [
      'Es correcta: la inscripción previa en el Registro General de Personal es condición sine qua non para el devengo y pago de haberes según el artículo 28.3.',
      'La intranet no suple la inscripción formal en el Registro de Personal.',
      'La asunción ante notario es ajena a la legalidad y procedimiento ordinario de personal público.',
      'Las comunicaciones informales no habilitan la inclusión de haberes en nómina.'
    ]
  },
  'troncal-empleo-83': {
    id: 'troncal-empleo-83',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 37',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 37 de la Ley 2/2015 de Galicia, ¿qué instrumento técnico de ordenación de puestos de trabajo de la Administración gallega es de carácter público y obligatorio?',
    options: [
      ['A', 'Las relaciones de puestos de trabajo (RPTs), que deben incluir la totalidad de puestos de la correspondiente organización dotados presupuestariamente.'],
      ['B', 'Los estatutos privados de cada una de las consellerías firmados por sus respectivos conselleiros.'],
      ['C', 'El catálogo confidencial de directivos autonómicos no sometido a publicación oficial.'],
      ['D', 'El padrón general de empleados autonómicos en situación de suspensión firme de funciones.']
    ],
    correct: 0,
    explanation: 'El artículo 37.1 de la Ley 2/2015 dispone que las relaciones de puestos de trabajo son los instrumentos técnicos a través de los cuales las administraciones públicas ordenan sus puestos y que su contenido será público.',
    whys: [
      'Es correcta: las RPTs son el instrumento legal e imperativo de ordenación de puestos, con naturaleza pública y obligatoria (artículo 37.1).',
      'La organización de puestos es materia regulada por ley mediante RPT y no por estatutos privados.',
      'El secreto o carácter confidencial de la ordenación de puestos de trabajo vulneraría la publicidad.',
      'El padrón no ordena puestos; la RPT ordena los puestos y sus requisitos de acceso.'
    ]
  },
  'troncal-empleo-111': {
    id: 'troncal-empleo-111',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 47',
    sourceUrl: 'officialSources.employment',
    text: 'De conformidad con el artículo 47 de la Ley 2/2015, ¿cuál es el plazo máximo establecido para ejecutar las convocatorias de empleo derivadas de una oferta de empleo público (OPE) aprobada?',
    options: [
      ['A', 'Tres años.'],
      ['B', 'Cinco años.'],
      ['C', 'Doce meses improrrogables.'],
      ['D', 'Diez años.']
    ],
    correct: 0,
    explanation: 'El artículo 47.1 de la Ley 2/2015 de Galicia establece que la oferta de empleo público debe aprobarse anualmente por el Consello de la Xunta y ejecutarse en el plazo máximo de tres años.',
    whys: [
      'Es correcta: el plazo máximo de ejecución de la oferta de empleo público es de tres años según el artículo 47.1.',
      'El plazo de cinco años excede el máximo permitido legalmente.',
      'Doce meses es el plazo en el que se aprueba la OPE (anual), pero no el de su ejecución.',
      'Diez años excede el límite legal del Estatuto y de la legislación estatal concordante.'
    ]
  },
  'troncal-empleo-124': {
    id: 'troncal-empleo-124',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 59',
    sourceUrl: 'officialSources.employment',
    text: 'Con arreglo al artículo 59 de la Ley 2/2015 de Galicia, ¿cuál es la edad mínima exigida con carácter general para poder participar en los procesos selectivos de acceso al empleo público?',
    options: [
      ['A', 'Tener cumplidos dieciséis años y no exceder de la edad de jubilación forzosa, salvo que por ley se exija la mayoría de edad.'],
      ['B', 'Tener cumplidos obligatoriamente dieciocho años en todos los casos sin excepción legal alguna.'],
      ['C', 'Ser mayor de veintiún años cumplidos con anterioridad a la fecha de la convocatoria selectiva.'],
      ['D', 'Cualquier edad, permitiéndose el acceso a partir de los catorce años en prácticas.']
    ],
    correct: 0,
    explanation: 'El artículo 59.1.c de la Ley 2/2015 establece que se requiere tener cumplidos dieciséis años y no exceder de la edad de jubilación forzosa, especificando que solo por ley podrá exigirse la mayoría de edad.',
    whys: [
      'Es correcta: dieciséis años es la edad mínima general establecida legalmente en el artículo 59.1.c.',
      'La mayoría de edad (dieciocho años) no es la regla general, solo se aplica cuando se exija expresamente por ley.',
      'Veintiún años no figura como límite de edad general en la normativa de función pública.',
      'La edad mínima de acceso al empleo público no puede ser inferior a los dieciséis años.'
    ]
  },
  'troncal-empleo-156': {
    id: 'troncal-empleo-156',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 78',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 78 de la Ley 2/2015, ¿en qué consiste la carrera profesional horizontal del personal funcionario de carrera de la Administración general de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'En la progresión de grado u otros conceptos análogos, sin necesidad de cambiar de puesto de trabajo, de acuerdo con la evaluación del desempeño.'],
      ['B', 'En el traslado obligatorio a otra localidad por decisión discrecional del director general de función pública.'],
      ['C', 'En el ascenso orgánico por antigüedad absoluta que exige cambiar el grupo de clasificación profesional sin examen.'],
      ['D', 'En la exención de cumplir la jornada horaria al cumplir los 25 años de servicios continuados.']
    ],
    correct: 0,
    explanation: 'El artículo 78.2 de la Ley 2/2015 de Galicia define la carrera horizontal como la progresión de grado de carrera sin necesidad de cambiar de puesto de trabajo y previa valoración de la evaluación del desempeño.',
    whys: [
      'Es correcta: define con precisión la progresión horizontal del artículo 78.2 sin cambiar de puesto de trabajo.',
      'El traslado de localidad no es carrera profesional, sino movilidad geográfica o sanción.',
      'La carrera horizontal no cambia de grupo ni escala (eso es promoción interna vertical o carrera vertical, artículo 79).',
      'La antigüedad da derecho a trienios pero no exime del cumplimiento de la jornada laboral.'
    ]
  },
  'troncal-empleo-179': {
    id: 'troncal-empleo-179',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 90',
    sourceUrl: 'officialSources.employment',
    text: 'Con arreglo al artículo 90 de la Ley 2/2015 de Galicia, ¿cuáles son los sistemas ordinarios previstos para la provisión de puestos de trabajo del personal funcionario de carrera?',
    options: [
      ['A', 'El concurso, que constituye el sistema normal de provisión, y la libre designación con convocatoria pública.'],
      ['B', 'El sorteo informático anual de todas las vacantes de la consellería.'],
      ['C', 'La adjudicación directa verbal por parte de los jefes de negociado sin pliego previo.'],
      ['D', 'La contratación mercantil en régimen de exclusividad con consultoras privadas.']
    ],
    correct: 0,
    explanation: 'El artículo 90.1 de la Ley 2/2015 de Galicia dispone que los puestos de trabajo reservados al personal funcionario de carrera se proveerán ordinariamente por los procedimientos de concurso y por el de libre designación con convocatoria pública.',
    whys: [
      'Es correcta: el concurso y la libre designación con convocatoria pública son los dos sistemas ordinarios del artículo 90.1.',
      'El sorteo no garantiza la idoneidad ni cumple con los principios de mérito y capacidad.',
      'La adjudicación verbal discrecional conculca la transparencia y legalidad administrativa.',
      'El personal funcionario provee sus puestos mediante procedimientos administrativos de función pública.'
    ]
  },
  'troncal-empleo-202': {
    id: 'troncal-empleo-202',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 93',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 93 de la Ley 2/2015 de Galicia, ¿qué consecuencia legal se deriva para el personal funcionario de carrera que obtenga un puesto por concurso o libre designación y no tome posesión en el plazo establecido sin causa justificada?',
    options: [
      ['A', 'Decaerá en los derechos que le pudiesen corresponder y, en su caso, será declarado en la situación de excedencia voluntaria por interés particular.'],
      ['B', 'Adquirirá de forma automática e inmediata la inamovilidad definitiva sobre otro puesto vacante de mayor nivel.'],
      ['C', 'Será suspendido provisionalmente de funciones de forma vitalicia sin posibilidad de reincorporación.'],
      ['D', 'Se le extinguirá definitivamente la nacionalidad española por incurrir en desobediencia manifiesta.']
    ],
    correct: 0,
    explanation: 'El artículo 93.2 de la Ley 2/2015 establece que el personal funcionario de carrera que no tome posesión decaerá en los derechos y será declarado en la situación de excedencia voluntaria por interés particular.',
    whys: [
      'Es correcta: el decaimiento de derechos y la declaración en excedencia por interés particular son los efectos del artículo 93.2.',
      'No tomar posesión no puede premiarse con la adjudicación de un puesto superior.',
      'La suspensión vitalicia sin procedimiento vulnera el marco constitucional e institucional básico.',
      'La pérdida de nacionalidad no es una sanción de empleo público.'
    ]
  },
  'troncal-empleo-215': {
    id: 'troncal-empleo-215',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 99',
    sourceUrl: 'officialSources.employment',
    text: 'De conformidad con el artículo 99 de la Ley 2/2015 de Galicia, ¿cuál es uno de los requisitos exigidos para autorizar una permuta de puestos de trabajo entre personal funcionario de carrera?',
    options: [
      ['A', 'Que las personas interesadas hayan prestado un mínimo de cinco años de servicios efectivos como personal funcionario de carrera y que a ninguna le falte menos de cinco años para la jubilación.'],
      ['B', 'Que los puestos pertenezcan a distintos subgrupos de clasificación profesional y tengan diferente complemento retributivo.'],
      ['C', 'Haber prestado servicios continuados de al menos tres meses como personal funcionario en prácticas.'],
      ['D', 'Que el acuerdo de permuta se realice por teléfono sin necesidad de emitir ningún informe previo.']
    ],
    correct: 0,
    explanation: 'El artículo 99.1 de la Ley 2/2015 establece las condiciones para autorizar permutas, exigiendo puestos con el mismo complemento, mismo subgrupo, mínimo de 5 años de servicios efectivos, y que falten más de 5 años para la jubilación.',
    whys: [
      'Es correcta: recoge los límites temporales (5 años de servicios y 5 años antes de la jubilación) regulados en el artículo 99.1.',
      'Los puestos permutados deben tener el mismo complemento retributivo y pertenecer al mismo subgrupo.',
      'Se exige ser funcionario de carrera con 5 años de servicios; el funcionario en prácticas no puede permutar.',
      'Exige una tramitación escrita reglamentaria con informe de los órganos de personal (artículo 99.2).'
    ]
  },
  'troncal-empleo-228': {
    id: 'troncal-empleo-228',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 164',
    sourceUrl: 'officialSources.employment',
    text: 'A la luz del artículo 164 de la Ley 2/2015 de Galicia, ¿cuál de las siguientes es una de las situaciones administrativas en las que puede hallarse el personal funcionario de carrera?',
    options: [
      ['A', 'Servicio en otras administraciones públicas.'],
      ['B', 'Excedencia forzosa de carácter vitalicio y absoluto por jubilación parcial.'],
      ['C', 'Incompatibilidad retribuida permanente con funciones de alta dirección privada.'],
      ['D', 'Suspensión definitiva del derecho de asociación y sindicación profesional.']
    ],
    correct: 0,
    explanation: 'El artículo 164 de la Ley 2/2015 enumera las situaciones del personal funcionario: servicio activo, servicios especiales, servicio en otras administraciones públicas, excedencia voluntaria, excedencia forzosa y suspensión de funciones.',
    whys: [
      'Es correcta: figura de forma explícita en la lista de situaciones administrativas del artículo 164.1.c.',
      'La excedencia forzosa vitalicia por jubilación parcial no existe en la tipología del artículo 164.',
      'La incompatibilidad permanente no es una situación administrativa regulada en el catálogo legal.',
      'Los funcionarios mantienen sus derechos fundamentales de asociación y sindicación.'
    ]
  },
  'troncal-empleo-241': {
    id: 'troncal-empleo-241',
    quality: 'Verificada y reformulada · DOG 04/05/2015',
    topic: 'Troncal estatal',
    source: 'Ley 2/2015, art. 176',
    sourceUrl: 'officialSources.employment',
    text: 'Según el artículo 176 de la Ley 2/2015 de Galicia, ¿cuál es el límite de duración establecido para la situación de excedencia por cuidado de familiares del personal funcionario de carrera?',
    options: [
      ['A', 'No superior a tres años por cada sujeto causante, computándose este período a efectos de trienios y reserva del puesto de trabajo definitivo.'],
      ['B', 'Un máximo improrrogable de doce meses sin derecho a reserva de puesto ni antigüedad de ninguna clase.'],
      ['C', 'De duración ilimitada a elección de la persona interesada, sin posibilidad de computar antigüedad alguna.'],
      ['D', 'Cinco años obligatorios, perdiendo de forma inmediata toda relación funcionarial con la Xunta de Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 176.1 de la Ley 2/2015 regula la excedencia por cuidado de familiares concediendo un período de duración no superior a tres años por cada sujeto causante, con reserva de puesto y cómputo del tiempo para trienios y carrera.',
    whys: [
      'Es correcta: recoge la duración máxima de tres años, la reserva de puesto y el cómputo de carrera y antigüedad del artículo 176.',
      'El límite no es de 12 meses; además hay plenos derechos de reserva de puesto y trienios.',
      'No es de duración ilimitada, tiene el tope máximo legal de tres años por sujeto causante.',
      'No exige 5 años obligatorios ni conlleva la pérdida de la relación de empleo.'
    ]
  }
};

// Replacement function
function replaceQuestion(id, newData) {
  // We need to construct the JavaScript string representation of the object.
  // Note: sourceUrl must be a variable reference (officialSources.xxx), so we format it without quotes.
  let sourceUrlVal = newData.sourceUrl;
  
  let code = `  {\n`;
  code += `    id: '${newData.id}', quality: '${newData.quality}', topic: '${newData.topic}', source: '${newData.source}', sourceUrl: ${sourceUrlVal},\n`;
  code += `    text: ${JSON.stringify(newData.text)},\n`;
  code += `    options: ${JSON.stringify(newData.options)},\n`;
  code += `    correct: ${newData.correct},\n`;
  code += `    explanation: ${JSON.stringify(newData.explanation)},\n`;
  code += `    whys: ${JSON.stringify(newData.whys)}\n`;
  code += `  }`;

  // Find where this id is defined in appJsContent
  // e.g. "id: 'QUESTION_ID'" or 'id: "QUESTION_ID"'
  const idRegex = new RegExp(`id:\\s*['"]${id}['"]`);
  const match = idRegex.exec(appJsContent);
  if (!match) {
    throw new Error(`Could not find question ID: ${id}`);
  }

  const idIndex = match.index;
  // Look backward to find the opening brace '{'
  let startBraceIndex = -1;
  for (let i = idIndex; i >= 0; i--) {
    if (appJsContent[i] === '{') {
      startBraceIndex = i;
      break;
    }
  }

  if (startBraceIndex === -1) {
    throw new Error(`Could not find opening brace '{' for ID: ${id}`);
  }

  // Count braces forward from startBraceIndex to find matching '}'
  let endBraceIndex = -1;
  let braceCount = 0;
  for (let i = startBraceIndex; i < appJsContent.length; i++) {
    if (appJsContent[i] === '{') braceCount++;
    else if (appJsContent[i] === '}') braceCount--;

    if (braceCount === 0) {
      endBraceIndex = i;
      break;
    }
  }

  if (endBraceIndex === -1) {
    throw new Error(`Could not find matching closing brace '}' for ID: ${id}`);
  }

  // Replace
  const before = appJsContent.slice(0, startBraceIndex);
  const after = appJsContent.slice(endBraceIndex + 1);
  appJsContent = before + code + after;
}

// Perform all replacements
try {
  for (const [id, data] of Object.entries(newQuestions)) {
    replaceQuestion(id, data);
    console.log(`Updated ID: ${id}`);
  }

  // Save back to app.js
  fs.writeFileSync(appJsPath, appJsContent, 'utf8');
  console.log('Successfully updated app.js with 42 audited questions.');
} catch (err) {
  console.error('Replacement failed:', err);
  process.exit(1);
}
