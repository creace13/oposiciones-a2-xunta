const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const appJsPath = path.join(root, 'app.js');
let source = fs.readFileSync(appJsPath, 'utf8');

const replacements = {
  'troncal-elecciones-27': `{
    id: 'troncal-elecciones-27', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 9', sourceUrl: officialSources.electionsGalicia,
    text: 'Conforme a la Ley 8/1985, de elecciones al Parlamento de Galicia, ¿por cuántos diputados está constituido el Parlamento de Galicia?',
    options: [['A', '75 diputados.'], ['B', '60 diputados.'], ['C', '80 diputados.'], ['D', '100 diputados.']], correct: 0,
    explanation: 'El artículo 9 de la Ley 8/1985 establece que el Parlamento de Galicia está constituido por 75 diputados.',
    whys: ['Es la respuesta correcta conforme al artículo 9 de la Ley 8/1985.', '60 diputados no es la cifra establecida en la ley.', '80 diputados no es la cifra establecida en la ley.', '100 diputados no es la cifra establecida en la ley.']
  }`,
  'troncal-elecciones-66': `{
    id: 'troncal-elecciones-66', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 10', sourceUrl: officialSources.electionsGalicia,
    text: 'Según el artículo 10 de la Ley 8/1985, de elecciones al Parlamento de Galicia, ¿cuál es el número mínimo inicial de diputados que se asigna a cada circunscripción provincial?',
    options: [['A', '5 diputados.'], ['B', '10 diputados.'], ['C', '12 diputados.'], ['D', '8 diputados.']], correct: 1,
    explanation: 'El artículo 10.2 de la Ley 8/1985 dispone que a cada una de las provincias gallegas se le asigna un mínimo inicial de 10 diputados, distribuyéndose los restantes en proporción a la población.',
    whys: ['5 diputados no cumple el mínimo legal inicial por provincia.', 'Es la respuesta correcta conforme al artículo 10.2.', '12 diputados supera el mínimo inicial legal por provincia.', '8 diputados es inferior al mínimo inicial legal por provincia.']
  }`,
  'troncal-elecciones-94': `{
    id: 'troncal-elecciones-94', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 11.4', sourceUrl: officialSources.electionsGalicia,
    text: 'Conforme a la Ley 8/1985, de elecciones al Parlamento de Galicia, ¿qué porcentaje mínimo de los votos válidos emitidos en la circunscripción debe obtener una candidatura para ser tenida en cuenta en el reparto de escaños?',
    options: [['A', 'El 3 por 100.'], ['B', 'El 5 por 100.'], ['C', 'El 1 por 100.'], ['D', 'El 10 por 100.']], correct: 1,
    explanation: 'El artículo 11.4 de la Ley 8/1985 señala que no se tienen en cuenta aquellas candidaturas que no hubieran obtenido, al menos, el 5 por 100 de los votos válidos emitidos en la circunscripción.',
    whys: ['El 3 por 100 es el umbral para las elecciones generales, pero no para las del Parlamento de Galicia.', 'Es la respuesta correcta conforme al artículo 11.4 de la ley.', 'El 1 por 100 es un umbral inexistente para este reparto.', 'El 10 por 100 es un porcentaje excesivo no exigido por la ley.']
  }`,
  'troncal-elecciones-135': `{
    id: 'troncal-elecciones-135', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 11', sourceUrl: officialSources.electionsGalicia,
    text: 'Para la atribución de escaños a las candidaturas que superen el límite mínimo de votos, ¿qué sistema o regla de reparto aplica la Ley 8/1985 de elecciones al Parlamento de Galicia?',
    options: [['A', 'La regla D\\'Hondt.'], ['B', 'La regla Sainte-Laguë.'], ['C', 'El sistema mayoritario uninominal.'], ['D', 'El cociente Hare.']], correct: 0,
    explanation: 'El artículo 11 de la Ley 8/1985 establece que la atribución de escaños a las distintas candidaturas se realizará conforme a la regla D\\'Hondt.',
    whys: ['Es la respuesta correcta conforme al sistema de representación proporcional adoptado.', 'La regla Sainte-Laguë no es el sistema de reparto establecido por la legislación electoral gallega.', 'El sistema mayoritario uninominal no es el de representación proporcional adoptado.', 'El cociente Hare es otra fórmula de reparto proporcional no contemplada en esta ley.']
  }`,
  'troncal-elecciones-167': `{
    id: 'troncal-elecciones-167', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 12 y Estatuto, art. 15', sourceUrl: officialSources.electionsGalicia,
    text: 'De acuerdo con la normativa aplicable a las elecciones al Parlamento de Galicia, ¿a quién corresponde convocar las elecciones autonómicas?',
    options: [['A', 'Al Presidente del Parlamento de Galicia.'], ['B', 'Al Presidente de la Xunta de Galicia.'], ['C', 'Al Rey de España.'], ['D', 'Al Presidente del Gobierno del Estado.']], correct: 1,
    explanation: 'La convocatoria de elecciones al Parlamento de Galicia se efectúa mediante decreto del Presidente de la Xunta de Galicia, de conformidad con lo establecido en el Estatuto de Autonomía y la legislación gallega.',
    whys: ['El Presidente del Parlamento no tiene competencia para convocar las elecciones.', 'Es la respuesta correcta: corresponde al Presidente de la Xunta decretar la convocatoria.', 'El Rey no convoca directamente las elecciones autonómicas gallegas.', 'El Presidente del Gobierno no tiene la atribución para convocar las elecciones parlamentarias de Galicia.']
  }`,
  'troncal-elecciones-190': `{
    id: 'troncal-elecciones-190', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 10.1', sourceUrl: officialSources.electionsGalicia,
    text: 'Según el artículo 10.1 de la Ley 8/1985, ¿cuál es la circunscripción electoral aplicable en las elecciones al Parlamento de Galicia?',
    options: [['A', 'El municipio.'], ['B', 'La comarca.'], ['C', 'La provincia.'], ['D', 'La Comunidad Autónoma en su conjunto como circunscripción única.']], correct: 2,
    explanation: 'El artículo 10.1 de la Ley 8/1985 dispone que la circunscripción electoral es la provincia (A Coruña, Lugo, Ourense y Pontevedra).',
    whys: ['El municipio no actúa como circunscripción para estas elecciones parlamentarias.', 'La comarca no es una división electoral para las elecciones autonómicas de Galicia.', 'Es la respuesta correcta conforme al artículo 10.1.', 'La normativa gallega no adopta una circunscripción única autonómica para el Parlamento de Galicia.']
  }`,
  'troncal-elecciones-265': `{
    id: 'troncal-elecciones-265', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 8/1985, art. 3.2', sourceUrl: officialSources.electionsGalicia,
    text: 'Según el artículo 3.2 de la Ley 8/1985, para tener derecho de sufragio pasivo (ser elegible) en las elecciones al Parlamento de Galicia, ¿qué condición se requiere además de ser mayor de edad y español?',
    options: [['A', 'Poseer la vecindad civil gallega en exclusiva.'], ['B', 'Gozar de la condición política de gallego conforme al Estatuto de Autonomía.'], ['C', 'Haber residido de forma ininterrumpida en Galicia durante los últimos 5 años.'], ['D', 'Estar afiliado a un partido político inscrito en Galicia.']], correct: 1,
    explanation: 'El artículo 3.2 de la Ley 8/1985 indica que gozan del derecho de sufragio pasivo los ciudadanos españoles mayores de edad que, gozando del sufragio activo, tengan la condición política de gallegos.',
    whys: ['La vecindad civil gallega es un concepto civil y no define por sí misma los derechos políticos de sufragio.', 'Es la respuesta correcta según la definición de sufragio activo y pasivo del artículo 3.', 'No se exige un plazo de residencia ininterrumpida de 5 años para ser elegible.', 'La afiliación a partidos políticos no es un requisito legal para ejercer el sufragio pasivo.']
  }`,

  'troncal-valedor-28': `{
    id: 'troncal-valedor-28', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 1', sourceUrl: officialSources.valedorGalicia,
    text: 'Según el artículo 1 de la Ley 6/1984, ¿qué naturaleza y función definen la posición del Valedor del Pueblo de Galicia?',
    options: [['A', 'Es el alto comisionado del Parlamento de Galicia para la defensa de los derechos y libertades en Galicia.'], ['B', 'Es un órgano de control externo que fiscaliza la contabilidad pública gallega.'], ['C', 'Es un departamento ejecutivo con capacidad para sancionar disciplinariamente a los funcionarios.'], ['D', 'Es una sección judicial especializada integrada en el Tribunal Superior de Xustiza de Galicia.']], correct: 0,
    explanation: 'El artículo 1.1 de la Ley 6/1984 establece que el Valedor del Pueblo es el alto comisionado del Parlamento de Galicia para la defensa de los derechos y libertades en la Comunidad Autónoma.',
    whys: ['Es la respuesta correcta conforme al artículo 1.1 de la ley.', 'El control externo y fiscalización corresponde al Consello de Contas de Galicia, no al Valedor.', 'El Valedor no tiene potestad sancionadora disciplinaria directa ni forma parte del Ejecutivo.', 'El Valedor es una institución parlamentaria de garantía y no forma parte del orden judicial.']
  }`,
  'troncal-valedor-67': `{
    id: 'troncal-valedor-67', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 2.3', sourceUrl: officialSources.valedorGalicia,
    text: 'De conformidad con el artículo 2.3 de la Ley 6/1984, ¿por qué mayoría debe ser elegido el Valedor del Pueblo por el Pleno del Parlamento de Galicia?',
    options: [['A', 'Por mayoría simple de los diputados presentes.'], ['B', 'Por mayoría absoluta de la cámara en primera votación.'], ['C', 'Por mayoría de las tres quintas partes (3/5) de los miembros del Parlamento.'], ['D', 'Por unanimidad de todos los grupos parlamentarios.']], correct: 2,
    explanation: 'El artículo 2.3 de la Ley 6/1984 exige una votación favorable de las tres quintas partes (3/5) de los miembros del Parlamento de Galicia para la elección del Valedor del Pueblo.',
    whys: ['La mayoría simple no es suficiente para la elección del Valedor en el Parlamento.', 'La mayoría absoluta no es la requerida en el procedimiento ordinario del artículo 2.3.', 'Es la respuesta correcta: se exige la mayoría reforzada de 3/5.', 'La ley no exige unanimidad para este nombramiento institucional.']
  }`,
  'troncal-valedor-95': `{
    id: 'troncal-valedor-95', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 2.1', sourceUrl: officialSources.valedorGalicia,
    text: 'Según dispone el artículo 2.1 de la Ley 6/1984, ¿para qué periodo de tiempo es elegido el Valedor del Pueblo de Galicia?',
    options: [['A', 'Para un período de cuatro años.'], ['B', 'Para un período de dos años.'], ['C', 'Para un período de seis años.'], ['D', 'Para un período de cinco años.']], correct: 3,
    explanation: 'El artículo 2.1 de la Ley 6/1984 señala expresamente que el Valedor del Pueblo será elegido por el Parlamento de Galicia para un período de cinco años.',
    whys: ['Cuatro años es la duración ordinaria de las legislaturas, pero no del mandato del Valedor.', 'Dos años es incorrecto e insuficiente para el mandato legal.', 'Seis años es la duración del mandato de otros órganos autonómicos, pero no del Valedor.', 'Es la respuesta correcta de conformidad con el artículo 2.1.']
  }`,
  'troncal-valedor-101': `{
    id: 'troncal-valedor-101', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 3.1', sourceUrl: officialSources.valedorGalicia,
    text: 'De acuerdo con el artículo 3.1 de la Ley 6/1984, ¿cuál de los siguientes es un requisito obligatorio para poder ser elegido Valedor del Pueblo de Galicia?',
    options: [['A', 'Ser funcionario de carrera con más de quince años de servicio activo.'], ['B', 'Gozar de la condición política de gallego, pleno disfrute de derechos civiles y políticos, y conocer los idiomas oficiales.'], ['C', 'Tener residencia efectiva en la provincia de Santiago de Compostela.'], ['D', 'Haber desempeñado previamente funciones en el Defensor del Pueblo estatal.']], correct: 1,
    explanation: 'El artículo 3.1 establece que podrá ser elegido Valedor del Pueblo cualquier ciudadano que goce de la condición política de gallego, esté en pleno disfrute de sus derechos civiles y políticos, y conozca los idiomas oficiales de Galicia.',
    whys: ['No se requiere la condición de funcionario para ser elegido Valedor.', 'Es la respuesta correcta conforme a los requisitos del artículo 3.1.', 'La ley no exige residencia previa en un municipio específico.', 'No se requiere experiencia previa en el órgano de garantía estatal.']
  }`,
  'troncal-valedor-136': `{
    id: 'troncal-valedor-136', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 18.3', sourceUrl: officialSources.valedorGalicia,
    text: 'Conforme al artículo 18.3 de la Ley 6/1984, ¿cuál es el plazo máximo dentro del cual se deben presentar las quejas ante el Valedor del Pueblo de Galicia?',
    options: [['A', 'En el plazo de tres meses desde el suceso.'], ['B', 'En el plazo de un año cumplido a partir del conocimiento de los hechos.'], ['C', 'En el plazo de seis meses desde que ocurrieron los hechos.'], ['D', 'No existe plazo límite, pueden presentarse en cualquier momento.']], correct: 1,
    explanation: 'El artículo 18.3 de la Ley 6/1984 prescribe que las quejas al Valedor del Pueblo se deberán presentar en el plazo de un año cumplido a partir del conocimiento de los hechos.',
    whys: ['Tres meses es un plazo breve aplicable a otros recursos administrativos, pero no ante el Valedor.', 'Es la respuesta correcta de conformidad con el artículo 18.3.', 'Seis meses es incorrecto: la ley prevé un plazo más amplio.', 'El derecho a queja no es imprescriptible y está sujeto a este límite anual.']
  }`,
  'troncal-valedor-168': `{
    id: 'troncal-valedor-168', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 20', sourceUrl: officialSources.valedorGalicia,
    text: 'Según dispone el artículo 20 de la Ley 6/1984, ¿cómo debe proceder el Valedor del Pueblo de Galicia ante una queja individual sobre la que esté pendiente una resolución judicial?',
    options: [['A', 'No entrará en el examen individual de la queja y suspenderá su actuación si ya se hubiera iniciado.'], ['B', 'Emitirá un informe urgente dirigido directamente al Tribunal correspondiente.'], ['C', 'Dictará una recomendación sobre el fondo de la queja independientemente de los plazos judiciales.'], ['D', 'Archivará definitivamente la queja sin posibilidad de retomar la investigación de problemas generales.']], correct: 0,
    explanation: 'El artículo 20 de la Ley 6/1984 establece que el Valedor no entrará en el examen individual de quejas sobre las que esté pendiente resolución judicial y suspenderá su actuación si ya se hubiese iniciado, aunque sí podrá investigar los problemas generales derivados.',
    whys: ['Es la respuesta correcta según la incompatibilidad con la litispendencia judicial del artículo 20.', 'El Valedor no tiene la potestad de dirigir informes sobre el fondo al tribunal juzgador.', 'El Valedor no puede interferir en asuntos sub iudice dictando recomendaciones sobre el fondo.', 'El archivo individual no impide continuar con la investigación de problemas generales planteados en la queja.']
  }`,
  'troncal-valedor-191': `{
    id: 'troncal-valedor-191', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 6/1984, art. 32.2', sourceUrl: officialSources.valedorGalicia,
    text: 'Conforme al artículo 32.2 de la Ley 6/1984, ¿en qué plazo máximo y por qué medio deben responder las autoridades y funcionarios a las recomendaciones del Valedor?',
    options: [['A', 'En el plazo de quince días y de forma verbal.'], ['B', 'En el plazo de un mes y por escrito.'], ['C', 'En el plazo de diez días y por medios telemáticos.'], ['D', 'En el plazo de dos meses mediante informe administrativo reservado.']], correct: 1,
    explanation: 'El artículo 32.2 de la Ley 6/1984 señala de forma expresa que las autoridades y funcionarios concernidos por advertencias, recomendaciones o sugerencias deberán responder siempre por escrito y en el plazo de un mes.',
    whys: ['Quince días y forma verbal es un plazo y canal incorrecto según la ley.', 'Es la respuesta correcta de conformidad con el artículo 32.2.', 'Diez días es un plazo reducido no aplicable a este trámite ordinario.', 'Dos meses excede el plazo establecido en la Ley 6/1984.']
  }`,

  'troncal-consultivo-29': `{
    id: 'troncal-consultivo-29', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 1', sourceUrl: officialSources.consultivoGalicia,
    text: 'Conforme al artículo 1 de la Ley 3/2014, ¿cómo se define la posición institucional y el funcionamiento del Consejo Consultivo de Galicia?',
    options: [['A', 'Es el supremo órgano consultivo de la Xunta y de las administraciones gallegas, y actúa con independencia y autonomía.'], ['B', 'Es el órgano de control financiero y fiscalización del sector público de la Comunidad Autónoma.'], ['C', 'Es una sección especializada de la consellería encargada de presidencia con carácter subordinado.'], ['D', 'Es un tribunal administrativo con competencia para resolver recursos contenciosos.']], correct: 0,
    explanation: 'El artículo 1 de la Ley 3/2014 define al Consejo Consultivo como el supremo órgano consultivo de la Xunta de Galicia y de las administraciones públicas gallegas, garantizando su independencia y autonomía orgánica y funcional.',
    whys: ['Es la respuesta correcta conforme al artículo 1 de la Ley 3/2014.', 'La fiscalización y control financiero corresponde al Consello de Contas, no al Consejo Consultivo.', 'No es un órgano subordinado de ninguna consellería; goza de autonomía orgánica y funcional.', 'Es un órgano de consulta y asesoramiento técnico-jurídico, no un tribunal de justicia.']
  }`,
  'troncal-consultivo-68': `{
    id: 'troncal-consultivo-68', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 3', sourceUrl: officialSources.consultivoGalicia,
    text: 'Según el artículo 3 de la Ley 3/2014, ¿cómo está integrado el Consejo Consultivo de Galicia en cuanto a sus miembros?',
    options: [['A', 'Por siete consejeros de designación parlamentaria exclusiva.'], ['B', 'Por cinco consejeros electivos y por consejeros natos (quienes ejercieron la Presidencia de la Xunta).'], ['C', 'Por el Presidente de la Xunta y los titulares de las distintas Consellerías.'], ['D', 'Por tres magistrados judiciales en activo y dos letrados de la Comunidad Autónoma.']], correct: 1,
    explanation: 'El artículo 3 de la Ley 3/2014 establece que el Consejo está integrado por consejeras y consejeros electivos, en número de cinco, y por consejeras y consejeros natos (las personas que ejercieron la Presidencia de la Xunta de Galicia).',
    whys: ['La designación parlamentaria no cubre la totalidad de los miembros electivos ni a los natos.', 'Es la respuesta correcta conforme al artículo 3.1 de la ley.', 'El Gobierno autonómico y los Conselleiros no integran el Consejo Consultivo.', 'Los miembros no pueden estar en activo en las carreras judicial o de letrados al ser incompatible.']
  }`,
  'troncal-consultivo-96': `{
    id: 'troncal-consultivo-96', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 3.2', sourceUrl: officialSources.consultivoGalicia,
    text: 'De acuerdo con el artículo 3.2 de la Ley 3/2014, ¿cómo se distribuye la propuesta de nombramiento de los cinco consejeros electivos del Consejo Consultivo de Galicia?',
    options: [['A', 'Dos son propuestos oído el Consello de la Xunta, y tres son propuestos por el Parlamento de Galicia.'], ['B', 'Los cinco son propuestos libre y directamente por el Parlamento de Galicia.'], ['C', 'Tres son propuestos por el Tribunal Superior de Xustiza y dos por la Xunta de Galicia.'], ['D', 'Los cinco son elegidos libremente por el Presidente de la Xunta sin otra intervención.']], correct: 0,
    explanation: 'El artículo 3.2 de la Ley 3/2014 señala que el Presidente de la Xunta nombrará a los cinco miembros electivos: dos una vez escuchado el Consello de la Xunta y los otros tres a propuesta del Parlamento de Galicia.',
    whys: ['Es la respuesta correcta conforme al artículo 3.2.', 'El Parlamento no propone a la totalidad de los miembros electivos.', 'El Tribunal Superior de Xustiza no propone miembros para el Consejo Consultivo.', 'El nombramiento exige seguir las propuestas y consultas legalmente reguladas.']
  }`,
  'troncal-consultivo-137': `{
    id: 'troncal-consultivo-137', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 4', sourceUrl: officialSources.consultivoGalicia,
    text: 'Conforme a los apartados 1 y 2 del artículo 4 de la Ley 3/2014, ¿cuál es la duración del mandato de los consejeros electivos y cuál es su edad límite de permanencia en el cargo?',
    options: [['A', 'Un período de seis años, con un límite máximo de permanencia de setenta y dos años de edad.'], ['B', 'Un período de cinco años, con un límite máximo de setenta y cinco años de edad.'], ['C', 'Un período de cuatro años, sin límite de edad establecido legalmente.'], ['D', 'Un período de seis años, con un límite de permanencia de setenta años de edad.']], correct: 0,
    explanation: 'El artículo 4 de la Ley 3/2014 establece que las consejeras y consejeros electivos ejercerán su mandato por un periodo de seis años (art. 4.1) y tendrán como límite máximo de permanencia los setenta y dos años de edad (art. 4.2).',
    whys: ['Es la respuesta correcta según los límites temporales del artículo 4.', 'El mandato de 5 años y límite de 75 años es incorrecto.', 'La ley establece expresamente un límite de edad de permanencia.', 'La edad de 70 años como límite es incorrecta según la ley.']
  }`,
  'troncal-consultivo-169': `{
    id: 'troncal-consultivo-169', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 11.2', sourceUrl: officialSources.consultivoGalicia,
    text: 'Según establece el artículo 11.2 de la Ley 3/2014, ¿en qué consistirá el examen que realiza el Consejo Consultivo en su función dictaminadora?',
    options: [['A', 'En una valoración de oportunidad política de los proyectos de ley.'], ['B', 'En el control previo de legalidad y rigor técnico-jurídico, sin extenderse a valoraciones de oportunidad salvo solicitud expresa.'], ['C', 'En un control posterior de legalidad que permite anular directamente actos administrativos.'], ['D', 'En una auditoría presupuestaria sobre el gasto de la actuación administrativa consultada.']], correct: 1,
    explanation: 'El artículo 11.2 de la Ley 3/2014 determina que el Consejo ejerce el control previo de legalidad y rigor técnico-jurídico de las actuaciones, velando por la observancia jurídica y sin extenderse a la oportunidad salvo petición expresa.',
    whys: ['La ley expresamente prohíbe las valoraciones de oportunidad salvo solicitud expresa.', 'Es la respuesta correcta conforme al artículo 11.2.', 'El Consejo emite dictámenes previos no vinculantes y no puede anular por sí mismo actos.', 'El Consejo Consultivo no ejerce funciones de auditoría presupuestaria o financiera.']
  }`,
  'troncal-consultivo-192': `{
    id: 'troncal-consultivo-192', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 12.j', sourceUrl: officialSources.consultivoGalicia,
    text: 'De conformidad con el artículo 12 de la Ley 3/2014, ¿a partir de qué cuantías es preceptivo el dictamen del Consejo Consultivo en las reclamaciones de responsabilidad patrimonial?',
    options: [['A', 'Superiores a 50.000 euros en ambos casos.'], ['B', 'Superiores a 30.000 euros para la autonómica y a 15.000 euros para las locales.'], ['C', 'Superiores a 6.000 euros para la autonómica y a 3.000 euros para las locales.'], ['D', 'En todas las reclamaciones de responsabilidad patrimonial sin límite de cuantía.']], correct: 1,
    explanation: 'El artículo 12.j) de la Ley 3/2014 establece la preceptividad del dictamen en las reclamaciones de responsabilidad patrimonial de cuantía superior a 30.000 euros para la Administración autonómica y a 15.000 euros para las administraciones locales.',
    whys: ['La cuantía de 50.000 euros is incorrecta.', 'Es la respuesta correcta según lo regulado en el artículo 12.j).', 'La cuantía de 6.000 y 3.000 euros es incorrecta.', 'La ley establece un umbral de cuantía mínima para la intervención preceptiva del Consejo.']
  }`,
  'troncal-consultivo-266': `{
    id: 'troncal-consultivo-266', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 3/2014, art. 23.4', sourceUrl: officialSources.consultivoGalicia,
    text: 'Conforme al artículo 23.4 de la Ley 3/2014, ¿qué funciones de participación corresponden a los miembros natos del Consejo Consultivo de Galicia en el Pleno?',
    options: [['A', 'Tienen derecho a voz y voto idéntico al de los consejeros electivos.'], ['B', 'Actuarán con voz pero sin voto, no computándose su asistencia a efectos de quórum de constitución y acuerdos.'], ['C', 'Actúan únicamente como asesores externos sin presencia en las deliberaciones del Pleno.'], ['D', 'Coordinan con voto dirimente en caso de empate todas las sesiones del Pleno.']], correct: 1,
    explanation: 'El artículo 23.4 de la Ley 3/2014 señala que los miembros natos del Consejo Consultivo actuarán en el Pleno con voz pero sin voto, no computándose, en consecuencia, su asistencia a efectos del quórum de constitución y adopción de acuerdos.',
    whys: ['Los consejeros natos no tienen voto en el Pleno.', 'Es la respuesta correcta de conformidad con el artículo 23.4.', 'Los consejeros natos forman parte del Pleno y participan presencialmente en las deliberaciones.', 'El voto dirimente corresponde al Presidente, no a los miembros natos.']
  }`,

  'troncal-ljca-12': `{
    id: 'troncal-ljca-12', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 1.1', sourceUrl: officialSources.ljca,
    text: 'De conformidad con el artículo 1.1 de la Ley 29/1998 (LJCA), ¿de qué pretensiones conoce, con carácter general, el orden jurisdiccional contencioso-administrativo?',
    options: [['A', 'De las pretensiones en relación con la actuación de las Administraciones públicas sujeta al Derecho Administrativo, disposiciones generales e infracciones de decretos legislativos.'], ['B', 'De los litigios civiles contractuales entre particulares exclusivamente.'], ['C', 'De los delitos tipificados en el Código Penal cometidos por funcionarios públicos.'], ['D', 'De los conflictos colectivos de trabajo en el ámbito mercantil privado.']], correct: 0,
    explanation: 'El artículo 1.1 de la Ley 29/1998 (LJCA) establece que este orden jurisdiccional conocerá de las pretensiones sobre la actuación de las Administraciones públicas sujeta al Derecho Administrativo, de las disposiciones generales de rango inferior a la Ley y de los Decretos legislativos que excedan de la delegación.',
    whys: ['Es la respuesta correcta según la definición legal del ámbito de la jurisdicción.', 'Los litigios civiles privados corresponden al orden civil.', 'Los delitos corresponden en exclusiva al orden penal.', 'Los conflictos laborales colectivos privados corresponden al orden social.']
  }`,
  'troncal-ljca-69': `{
    id: 'troncal-ljca-69', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 21.1.c', sourceUrl: officialSources.ljca,
    text: 'Según establece el artículo 21.1.c) de la Ley 29/1998 (LJCA), en el proceso contencioso-administrativo se considera parte demandada, además de la Administración y personas interesadas:',
    options: [['A', 'Las aseguradoras de las Administraciones públicas, que siempre serán parte codemandada junto con la Administración a quien aseguren.'], ['B', 'El Ministerio Fiscal en todo caso y con carácter de parte demandada principal.'], ['C', 'Los funcionarios públicos que redactaron materialmente el acto administrativo impugnado.'], ['D', 'El órgano consultivo que emitió dictamen preceptivo previo a la resolución.']], correct: 0,
    explanation: 'El artículo 21.1.c) de la Ley 29/1998 (LJCA) dispone expresamente que se consideran parte demandada las aseguradoras de las Administraciones públicas, que siempre serán parte codemandada junto con la Administración a quien aseguren.',
    whys: ['Es la respuesta correcta según el artículo 21.1.c).', 'El Ministerio Fiscal interviene en los procesos previstos legalmente pero no es la parte demandada principal.', 'El recurso se dirige contra la Administración pública como persona jurídica, no contra los funcionarios ejecutores.', 'El órgano consultivo no es parte procesal ni defiende judicialmente el acto impugnado.']
  }`,
  'troncal-ljca-97': `{
    id: 'troncal-ljca-97', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 29.1', sourceUrl: officialSources.ljca,
    text: 'De acuerdo con el artículo 29.1 de la Ley 29/1998 (LJCA), ante la inactividad de la Administración sobre una prestación concreta obligatoria, si los interesados reclaman su cumplimiento, ¿cuánto tiempo debe transcurrir sin que la Administración actúe para poder interponer recurso?',
    options: [['A', 'Un mes desde la presentación de la reclamación.'], ['B', 'Tres meses desde la presentación de la reclamación.'], ['C', 'Diez días desde la solicitud de cumplimiento.'], ['D', 'Seis meses desde la inactividad inicial.']], correct: 1,
    explanation: 'El artículo 29.1 de la Ley 29/1998 (LJCA) establece que si la Administración no da cumplimiento a lo solicitado en el plazo de tres meses desde la reclamación, los interesados pueden deducir recurso contencioso-administrativo contra dicha inactividad.',
    whys: ['Un mes es un plazo insuficiente según el artículo 29.1.', 'Es la respuesta correcta de conformidad con el artículo 29.1.', 'Diez días es el plazo de inactividad de la vía de hecho, no de prestaciones ordinarias.', 'Seis meses es un plazo general para otros fines, no el plazo específico de inactividad del artículo 29.1.']
  }`,
  'troncal-ljca-102': `{
    id: 'troncal-ljca-102', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 46.1', sourceUrl: officialSources.ljca,
    text: 'Según dispone el artículo 46.1 de la Ley 29/1998 (LJCA), ¿cuál es el plazo general para interponer el recurso contencioso-administrativo cuando se trata de actos expresos o de disposiciones de carácter general?',
    options: [['A', 'Un mes, contado desde el día siguiente al de la notificación del acto expreso.'], ['B', 'Dos meses, contados desde el día siguiente al de la publicación de la disposición o al de la notificación del acto que ponga fin a la vía administrativa.'], ['C', 'Quince días hábiles a partir de la publicación oficial de la disposición.'], ['D', 'Seis meses, contados desde la fecha del acto administrativo originario.']], correct: 1,
    explanation: 'El artículo 46.1 de la Ley 29/1998 (LJCA) fija en dos meses el plazo para la interposición del recurso contencioso-administrativo contra actos expresos o disposiciones generales, contados desde el día siguiente al de la publicación o notificación.',
    whys: ['Un mes es el plazo general para recursos de alzada o reposición, no para el contencioso-administrativo.', 'Es la respuesta correcta de conformidad con el artículo 46.1.', 'Quince días es un plazo aplicable a recursos especiales, no el general.', 'Seis meses es aplicable en el supuesto de actos no expresos presuntos, no para expresos.']
  }`,
  'troncal-ljca-138': `{
    id: 'troncal-ljca-138', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 46.3', sourceUrl: officialSources.ljca,
    text: 'De conformidad con el artículo 46.3 de la Ley 29/1998 (LJCA), si el recurso se dirige contra una actuación en vía de hecho y no hubiese existido requerimiento previo de cesación, ¿cuál es el plazo para interponer el recurso contencioso-administrativo?',
    options: [['A', 'Veinte días desde el día en que se inició la actuación administrativa en vía de hecho.'], ['B', 'Diez días desde el inicio de la vía de hecho.'], ['C', 'Dos meses desde que cesó la vía de hecho.'], ['D', 'Treinta días contados a partir del suceso.']], correct: 0,
    explanation: 'El artículo 46.3 de la Ley 29/1998 (LJCA) establece que si no hubiere requerimiento de cesación, el plazo para interponer el recurso será de veinte días desde el día en que se inició la actuación administrativa en vía de hecho.',
    whys: ['Es la respuesta correcta de conformidad con el artículo 46.3.', 'Diez días es aplicable si hubiese existido requerimiento previo de cesación, no en su ausencia.', 'Dos meses es aplicable a recursos generales pero no en vía de hecho.', 'Treinta días es un plazo común civil que no rige para la vía de hecho contenciosa.']
  }`,
  'troncal-ljca-170': `{
    id: 'troncal-ljca-170', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 78.1', sourceUrl: officialSources.ljca,
    text: 'De acuerdo con el artículo 78.1 de la Ley 29/1998 (LJCA), ¿de qué asuntos conocen los Juzgados de lo Contencioso-Administrativo por los trámites del procedimiento abreviado?',
    options: [['A', 'De la impugnación directa de reglamentos autonómicos y ordenanzas de cualquier cuantía.'], ['B', 'De los conflictos de atribuciones entre corporaciones locales.'], ['C', 'De cuestiones de personal, extranjería, inadmisión de asilo, disciplina deportiva en dopaje, y asuntos cuya cuantía no supere los 30.000 euros.'], ['D', 'De la responsabilidad patrimonial de la Administración de cuantía superior a 100.000 euros.']], correct: 2,
    explanation: 'El artículo 78.1 de la Ley 29/1998 (LJCA) señala que el procedimiento abreviado se aplica a los recursos sobre cuestiones de personal, extranjería, asilo, disciplina deportiva en materia de dopaje y aquellos cuya cuantía no supere los 30.000 euros.',
    whys: ['La impugnación directa de reglamentos no se tramita por el procedimiento abreviado ordinario.', 'Los conflictos de atribuciones no forman parte del ámbito del procedimiento abreviado.', 'Es la respuesta correcta según la delimitación de materias del artículo 78.1.', 'La responsabilidad de cuantía superior a 30.000 euros se tramita por el procedimiento ordinario.']
  }`,
  'troncal-ljca-193': `{
    id: 'troncal-ljca-193', quality: 'Verificada y reformulada', topic: 'Troncal estatal', source: 'Ley 29/1998, art. 81.1.a', sourceUrl: officialSources.ljca,
    text: 'Conforme al artículo 81.1.a) de la Ley 29/1998 (LJCA), ¿en qué supuesto de cuantía están exceptuadas de recurso de apelación las sentencias de los Juzgados de lo Contencioso-Administrativo?',
    options: [['A', 'Aquellas cuya cuantía no exceda de 18.000 euros.'], ['B', 'Aquellas cuya cuantía no exceda de 30.000 euros.'], ['C', 'Aquellas cuya cuantía sea inferior a 50.000 euros.'], ['D', 'No existe límite de cuantía, todas las sentencias de los Juzgados son apelables.']], correct: 1,
    explanation: 'El artículo 81.1.a) de la Ley 29/1998 (LJCA) dispone que están exceptuadas de recurso de apelación las sentencias de los Juzgados de lo Contencioso-Administrativo cuya cuantía no exceda de 30.000 euros.',
    whys: ['La cuantía de 18.000 euros es incorrecta según la ley.', 'Es la respuesta correcta de conformidad con el artículo 81.1.a).', 'El límite es de 30.000 euros, no de 50.000 euros.', 'La ley establece límites para el acceso a la segunda instancia por razón de la cuantía y materia.']
  }`
};

Object.entries(replacements).forEach(([id, newContent]) => {
  const index = source.indexOf(`id: '${id}'`);
  if (index === -1) {
    console.error(`ERROR: Cannot find question ID: ${id}`);
    process.exit(1);
  }
  
  const start = source.lastIndexOf('{', index);
  let bracesCount = 1;
  let end = start + 1;
  while (bracesCount > 0 && end < source.length) {
    if (source[end] === '{') bracesCount++;
    if (source[end] === '}') bracesCount--;
    end++;
  }
  
  const before = source.substring(0, start);
  const after = source.substring(end);
  source = before + newContent + after;
  console.log(`Replaced question: ${id}`);
});

fs.writeFileSync(appJsPath, source, 'utf8');
console.log('Successfully wrote app.js');
