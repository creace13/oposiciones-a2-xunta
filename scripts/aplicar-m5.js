const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newQuestions = [
  // ----------------------------------------------------
  // INCOMPATIBILIDADES (14 questions)
  // ----------------------------------------------------
  {
    id: 'troncal-incompatibilidades-23', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 1.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 1.1 de la Ley 53/1984, ¿cuál es el principio general aplicable al personal público respecto al desempeño de sus funciones?',
    options: [['A', 'La dedicación a un solo puesto de trabajo y la incompatibilidad para realizar una segunda actividad en el sector público, salvo las excepciones legales.'], ['B', 'La posibilidad de ejercer libremente hasta dos puestos públicos de jornada completa sin autorización previa.'], ['C', 'La compatibilidad automática con cualquier actividad privada sin necesidad de declaración.'], ['D', 'El derecho a percibir doble remuneración íntegra de fondos públicos sin límites.']], correct: 0,
    explanation: 'El artículo 1.1 de la Ley 53/1984 establece que el personal público no podrá compatibilizar sus actividades con un segundo puesto en el sector público, salvo en los supuestos previstos en la ley, protegiendo la imparcialidad y dedicación al servicio público.',
    whys: ['Es correcta: recoge la dedicación a un solo puesto y la incompatibilidad como regla general.', 'El desempeño de un segundo puesto público es excepcional y requiere autorización expresa previa.', 'Las actividades privadas están sometidas a previo reconocimiento de compatibilidad, no son automáticas.', 'La percepción de doble remuneración pública está prohibida salvo en los casos excepcionales autorizados.']
  },
  {
    id: 'troncal-incompatibilidades-43', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 2.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'Según el artículo 2.1 de la Ley 53/1984, ¿qué personal queda incluido en su ámbito de aplicación?',
    options: [['A', 'El personal al servicio de la Administración del Estado, de las Comunidades Autónomas, de las Corporaciones Locales y sus organismos o empresas públicas.'], ['B', 'Exclusivamente el personal funcionario de carrera de la Administración General del Estado.'], ['C', 'Únicamente el personal eventual de las corporaciones locales de más de 50.000 habitantes.'], ['D', 'Exclusivamente el personal estatutario del Servicio Gallego de Salud (Sergas).']], correct: 0,
    explanation: 'El artículo 2.1 establece un ámbito subjetivo amplio que abarca a todo el personal de la Administración del Estado, de las Comunidades Autónomas, de las Corporaciones Locales, de organismos autónomos, de la Seguridad Social y de entidades y empresas públicas.',
    whys: ['Es correcta: el ámbito abarca a todas las Administraciones públicas y sus entidades dependientes.', 'No se limita a la Administración del Estado, también incluye la autonómica y local.', 'El personal eventual y de cualquier corporación local está incluido sin límite de población.', 'Aunque incluye al personal del Sergas, no se limita exclusivamente a él.']
  },
  {
    id: 'troncal-incompatibilidades-56', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 3.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 3.1 de la Ley 53/1984, ¿en qué régimen específico puede autorizarse la compatibilidad para un segundo puesto público docente?',
    options: [['A', 'Como Profesor Universitario Asociado en régimen de dedicación a tiempo parcial.'], ['B', 'Como Profesor de Educación Secundaria con jornada completa.'], ['C', 'Como Catedrático de Universidad con dedicación exclusiva.'], ['D', 'Como tutor eventual sin sujeción a ningún límite de horario.']], correct: 0,
    explanation: 'El artículo 3.1 prevé que pueda autorizarse la compatibilidad, por razones de interés público, para ejercer la docencia como Profesor Universitario Asociado en régimen de dedicación a tiempo parcial.',
    whys: ['Es correcta: es la modalidad docente compatible expresamente prevista en el artículo 3.1.', 'La compatibilidad no se otorga para puestos docentes de jornada completa.', 'La dedicación exclusiva universitaria es incompatible con cualquier otro puesto público.', 'Cualquier compatibilidad autorizada exige estricta sujeción a límites horarios y de dedicación.']
  },
  {
    id: 'troncal-incompatibilidades-84', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 7.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'De acuerdo con el artículo 7.1 de la Ley 53/1984, el desempeño de un segundo puesto compatible en el sector público:',
    options: [['A', 'No podrá modificar la jornada de trabajo ni el horario de ninguno de los dos puestos, quedando condicionado a su estricto cumplimiento.'], ['B', 'Permite reducir la jornada del puesto principal a la mitad de forma automática.'], ['C', 'Faculta al empleado para flexibilizar discrecionalmente el horario del segundo puesto.'], ['D', 'Autoriza la coincidencia parcial de horarios si el superior jerárquico lo consiente verbalmente.']], correct: 0,
    explanation: 'El artículo 7.1 establece que la autorización de compatibilidad no modificará la jornada ni horario de los puestos y queda condicionada al estricto cumplimiento de ambos.',
    whys: ['Es correcta: refleja el requisito de no alteración de jornadas ni horarios y cumplimiento estricto.', 'La reducción de jornada no es automática ni una consecuencia de la compatibilidad.', 'No se concede flexibilidad discrecional para incumplir el horario de los puestos.', 'Está prohibida la coincidencia de horarios, y las autorizaciones deben ser previas y expresas.']
  },
  {
    id: 'troncal-incompatibilidades-112', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 12.1.a', sourceUrl: 'officialSources.incompatibilities',
    text: 'Según el artículo 12.1.a de la Ley 53/1984, ¿qué actividad privada está expresamente prohibida para el personal público?',
    options: [['A', 'El desempeño de cargos de todo orden en empresas o sociedades concesionarias, contratistas o subvencionadas por las Administraciones Públicas.'], ['B', 'La publicación ocasional de artículos científicos en revistas indexadas de carácter privado.'], ['C', 'La participación como ponente invitado en un congreso profesional organizado por una entidad privada.'], ['D', 'La colaboración altruista en actividades benéficas de asociaciones sin ánimo de lucro.']], correct: 0,
    explanation: 'El artículo 12.1.a prohíbe taxativamente al personal público desempeñar cargos en empresas concesionarias, contratistas, arrendatarias o subvencionadas por las Administraciones Públicas para evitar conflictos de interés.',
    whys: ['Es correcta: recoge la prohibición legal respecto a empresas contratistas o subvencionadas.', 'La creación científica y sus publicaciones derivadas están exceptuadas por el artículo 19.', 'La participación ocasional en congresos profesionales está permitida sin necesidad de autorización.', 'La colaboración altruista en actividades benéficas de asociaciones sin ánimo de lucro está permitida si es ajena al puesto.']
  },
  {
    id: 'troncal-incompatibilidades-125', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 14', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 14 de la Ley 53/1984, para ejercer una actividad privada, laboral, mercantil o industrial, el personal público:',
    options: [['A', 'Debe solicitar y obtener el previo reconocimiento de compatibilidad antes de iniciar su ejercicio.'], ['B', 'Solo está obligado a comunicarlo si la facturación de la actividad supera el salario público.'], ['C', 'Puede iniciarla libremente y solicitar la compatibilidad en el plazo de seis meses.'], ['D', 'Queda exento si la actividad se ejerce fuera de la comunidad autónoma donde presta servicios.']], correct: 0,
    explanation: 'El artículo 14 exige el previo reconocimiento de compatibilidad para el ejercicio de cualquier actividad profesional, laboral, mercantil o industrial fuera de las Administraciones Públicas.',
    whys: ['Es correcta: el reconocimiento de compatibilidad debe ser siempre previo al inicio.', 'El control de compatibilidad es independiente del nivel de facturación privada.', 'No está permitido iniciar la actividad privada sin el reconocimiento previo.', 'La exigencia de compatibilidad se aplica con independencia de la ubicación de la actividad privada.']
  },
  {
    id: 'troncal-incompatibilidades-157', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 16.4', sourceUrl: 'officialSources.incompatibilities',
    text: 'Según el artículo 16.4 de la Ley 53/1984, ¿en qué caso no podrá autorizarse o reconocerse compatibilidad para actividades privadas?',
    options: [['A', 'Cuando el puesto público comporte complementos específicos o equivalentes cuya cuantía supere el 30 por ciento de la retribución básica, excluida la antigüedad.'], ['B', 'Cuando el empleado público tenga una antigüedad superior a los diez años de servicios efectivos.'], ['C', 'Cuando las retribuciones del empleado público no superen el salario mínimo interprofesional.'], ['D', 'Cuando la actividad privada no guarde ninguna relación con las funciones de la administración.']], correct: 0,
    explanation: 'El artículo 16.4 prohíbe autorizar la compatibilidad para actividades privadas a quienes desempeñen puestos con complementos específicos o equivalentes que superen el 30% de sus retribuciones básicas (excluida la antigüedad).',
    whys: ['Es correcta: recoge la limitación económica del complemento específico superior al 30% de la retribución básica.', 'La antigüedad no es causa de incompatibilidad para actividades privadas.', 'Los salarios bajos no impiden el reconocimiento de compatibilidad, al contrario, se facilitan.', 'Si la actividad privada no tiene relación y cumple los límites, es cuando puede autorizarse.']
  },
  {
    id: 'troncal-incompatibilidades-180', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 19.e', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 19 de la Ley 53/1984, ¿qué actividad privada está exceptuada del régimen de incompatibilidades y no requiere autorización previa?',
    options: [['A', 'La producción y creación literaria, artística, científica y técnica, y las publicaciones derivadas de ellas, si no se originan por empleo o servicio.'], ['B', 'El asesoramiento técnico recurrente y retribuido a empresas del sector de la construcción.'], ['C', 'La administración ordinaria de una sociedad mercantil contratista de la Xunta de Galicia.'], ['D', 'El ejercicio libre de la abogacía en asuntos judiciales dirigidos contra la propia administración.']], correct: 0,
    explanation: 'El artículo 19.e exceptúa del régimen de incompatibilidades la creación literaria, artística, científica o técnica, siempre que no sea consecuencia de una relación de empleo o prestación de servicios.',
    whys: ['Es correcta: la creación y producción intelectual independiente está expresamente exceptuada.', 'El asesoramiento técnico continuado a empresas requiere reconocimiento previo de compatibilidad.', 'La administración de sociedades contratistas del sector público está estrictamente prohibida.', 'El ejercicio de la abogacía contra la administración del empleado es incompatible.']
  },
  {
    id: 'troncal-incompatibilidades-203', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 7.2', sourceUrl: 'officialSources.incompatibilities',
    text: 'Según el artículo 7.2 de la Ley 53/1984, ¿qué límite económico general se aplica a las retribuciones del segundo puesto público compatible?',
    options: [['A', 'La retribución del segundo puesto no podrá superar el 30 por ciento de la del principal, salvo excepciones de interés público.'], ['B', 'Las retribuciones del segundo puesto público pueden duplicar libremente las del principal.'], ['C', 'El salario del segundo puesto público debe ser exactamente igual al salario mínimo.'], ['D', 'No se aplica ningún límite económico si ambos puestos pertenecen a administraciones distintas.']], correct: 0,
    explanation: 'La normativa limita las retribuciones de puestos públicos compatibles, estableciendo que la retribución complementaria del segundo puesto no puede superar el 30% del puesto principal, salvo excepciones autorizadas por interés público.',
    whys: ['Es correcta: recoge la limitación económica general del 30% aplicable a los puestos compatibles.', 'La regla general es restrictiva y prohíbe duplicar ingresos sin control.', 'El límite no se fija en función del salario mínimo interprofesional.', 'La limitación se aplica con independencia de que las administraciones sean coincidentes o distintas.']
  },
  {
    id: 'troncal-incompatibilidades-216', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 12.1.c', sourceUrl: 'officialSources.incompatibilities',
    text: 'De acuerdo con el artículo 12.1.c de la Ley 53/1984, ¿cuándo es incompatible pertenecer al Consejo de Administración de una empresa privada?',
    options: [['A', 'Siempre que la actividad de la empresa esté directamente relacionada con las competencias del departamento u organismo donde preste servicios.'], ['B', 'Únicamente si la empresa privada tiene su domicilio social en el extranjero.'], ['C', 'Solo si el empleado público posee más del 50 por ciento del capital social de la misma.'], ['D', 'En ningún caso, ya que los cargos privados no ejecutivos están siempre exceptuados.']], correct: 0,
    explanation: 'El artículo 12.1.c prohíbe la pertenencia a Consejos de Administración o consejos de empresas privadas cuya actividad esté directamente relacionada con las competencias del departamento u organismo en el que preste servicios el empleado.',
    whys: ['Es correcta: la vinculación competencial entre el organismo y la empresa privada fundamenta la incompatibilidad.', 'El domicilio de la empresa no es el criterio determinante de la prohibición.', 'La prohibición de pertenecer al consejo es orgánica e independiente de la participación accionarial.', 'La pertenencia a consejos de administración de estas empresas relacionadas está prohibida, sea ejecutiva o no.']
  },
  {
    id: 'troncal-incompatibilidades-229', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 23', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 23 de la Ley 53/1984, el incumplimiento de las normas sobre incompatibilidades tiene la consideración disciplinaria de:',
    options: [['A', 'Falta muy grave.'], ['B', 'Falta grave.'], ['C', 'Falta leve.'], ['D', 'Mera irregularidad no sancionable si no causa perjuicio económico.']], correct: 0,
    explanation: 'El artículo 23 de la Ley 53/1984 califica expresamente el incumplimiento del régimen de incompatibilidades como una falta muy grave en el ámbito disciplinario.',
    whys: ['Es correcta: la calificación legal aplicable en todo caso es falta muy grave.', 'No se considera falta grave.', 'No se cataloga como falta leve.', 'El incumplimiento es una infracción disciplinaria formal tipificada, haya o no perjuicio económico.']
  },
  {
    id: 'troncal-incompatibilidades-242', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 10', sourceUrl: 'officialSources.incompatibilities',
    text: 'Según el artículo 10 de la Ley 53/1984, la competencia para autorizar la compatibilidad en un segundo puesto en el sector público autonómico corresponde a:',
    options: [['A', 'El órgano competente de la respectiva Comunidad Autónoma, previo informe del ministerio correspondiente.'], ['B', 'El jefe de sección administrativo del puesto principal de forma directa.'], ['C', 'El propio empleado público mediante declaración jurada en el registro.'], ['D', 'El Valedor del Pueblo de Galicia de manera exclusiva.']], correct: 0,
    explanation: 'El artículo 10 de la Ley 53/1984 atribuye la competencia para autorizar la compatibilidad para un segundo puesto público autonómico al órgano competente de la respectiva Comunidad Autónoma.',
    whys: ['Es correcta: identifica a los órganos competentes autonómicos autorizados.', 'Un jefe de sección no tiene competencia legal para resolver una autorización de compatibilidad.', 'La declaración del interesado no sustituye a la resolución expresa del órgano competente.', 'El Valedor del Pueblo supervisa la actuación de la administración pero no dicta estas autorizaciones.']
  },
  {
    id: 'troncal-incompatibilidades-249', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 4.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'De acuerdo con el artículo 4.1 de la Ley 53/1984, ¿en qué supuesto se puede autorizar la compatibilidad para un segundo puesto en el sector público docente o investigador?',
    options: [['A', 'Por razones de interés público, para el ejercicio de la docencia o investigación en centros públicos de nivel universitario.'], ['B', 'En cualquier puesto de la administración general con independencia de sus funciones.'], ['C', 'Cuando el empleado público renuncie por escrito al derecho a vacaciones anuales.'], ['D', 'Cuando el segundo puesto sea de jornada completa y horario coincidente.']], correct: 0,
    explanation: 'El artículo 4.1 permite la compatibilidad para el desempeño de un segundo puesto en el sector público por razones de interés público en el ámbito docente o de investigación en centros de nivel universitario u otros ámbitos expresamente previstos.',
    whys: ['Es correcta: recoge la excepción por interés público en el ámbito docente o investigador universitario.', 'No se puede autorizar para cualquier puesto de la administración general de forma discrecional.', 'Las vacaciones son un derecho irrenunciable y no guardan relación con la autorización de compatibilidad.', 'Está estrictamente prohibido que el segundo puesto sea de jornada completa u horario coincidente.']
  },
  {
    id: 'troncal-incompatibilidades-258', topic: 'Troncal estatal', source: 'Ley 53/1984, art. 11.1', sourceUrl: 'officialSources.incompatibilities',
    text: 'Conforme al artículo 11.1 de la Ley 53/1984, ¿qué límite general rige para la autorización de compatibilidad de actividades privadas?',
    options: [['A', 'No se podrá ejercer ninguna actividad privada que se relacione directamente con las que gestione el departamento u organismo donde preste servicios.'], ['B', 'La actividad privada debe ejercerse exclusivamente en horario nocturno.'], ['C', 'El empleado público debe ceder un porcentaje de sus beneficios a la Hacienda Pública.'], ['D', 'Solo se permite si la actividad privada genera menos de tres mil euros anuales.']], correct: 0,
    explanation: 'El artículo 11.1 de la Ley 53/1984 prohíbe el reconocimiento de compatibilidad para actividades privadas que se relacionen directamente con las competencias del departamento u oficina donde preste servicios el empleado público.',
    whys: ['Es correcta: la relación directa de competencias privadas y públicas fundamenta la incompatibilidad general.', 'No existe la obligación de ejercer la actividad compatible solo de noche.', 'No se exige ceder beneficios a la Hacienda Pública como condición de compatibilidad.', 'La compatibilidad se evalúa por la naturaleza de la actividad y conflicto, no por el volumen de ingresos.']
  },

  // ----------------------------------------------------
  // IGUALDAD (14 questions)
  // ----------------------------------------------------
  {
    id: 'troncal-igualdad-24', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 1', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según el artículo 1 de la Ley 7/2023 de Galicia, ¿cuál es el objeto principal de esta norma autonómica?',
    options: [['A', 'Eliminar la discriminación de las mujeres y promover la igualdad entre mujeres y hombres en las competencias de la Comunidad Autónoma de Galicia.'], ['B', 'Establecer los requisitos de acceso a los cargos de la judicatura estatal.'], ['C', 'Regular el régimen sancionador tributario aplicable a empresas privadas de Galicia.'], ['D', 'Establecer las bases del sistema electoral provincial para el Parlamento de Galicia.']], correct: 0,
    explanation: 'El artículo 1 de la Ley 7/2023 define que su objeto es reforzar el compromiso de la Comunidad Autónoma con la eliminación de la discriminación de las mujeres y la promoción de la igualdad de género dentro de las competencias autonómicas.',
    whys: ['Es correcta: identifica el objeto expresado en el artículo 1 de la norma.', 'La judicatura estatal se rige por la Ley Orgánica del Poder Judicial.', 'La materia tributaria no es el objeto de esta ley de igualdad.', 'El sistema electoral gallego está regulado por la Ley 8/1985.']
  },
  {
    id: 'troncal-igualdad-44', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 5', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Conforme al artículo 5 de la Ley 7/2023 de Galicia, ¿qué supuesto justifica la "buena fe ocupacional" para atribuir una actividad profesional a las mujeres?',
    options: [['A', 'La protección de las víctimas de violencia de género para actividades profesionales de atención directa a esas víctimas.'], ['B', 'La realización de cualquier actividad laboral en horario nocturno para evitar riesgos colectivos.'], ['C', 'La preferencia generalizada por el sexo menos representado en puestos de nivel de entrada.'], ['D', 'La realización de actividades de representación institucional en el extranjero.']], correct: 0,
    explanation: 'El artículo 5.2 de la Ley 7/2023 señala que la protección de las víctimas de violencia de género es un objetivo legítimo que justifica atribuir a las mujeres actividades de atención directa, constituyendo un requisito profesional esencial (buena fe ocupacional).',
    whys: ['Es correcta: recoge textualmente la justificación de atención directa a víctimas del artículo 5.2.', 'El trabajo nocturno no se atribuye de forma selectiva por razón de sexo bajo buena fe ocupacional.', 'La preferencia general en nivel de entrada no se ampara en el artículo 5 sino en acciones positivas reguladas aparte.', 'Las actividades en el extranjero no constituyen un supuesto de buena fe ocupacional por razón de sexo.']
  },
  {
    id: 'troncal-igualdad-57', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 9', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según el artículo 9 de la Ley 7/2023 de Galicia, la discriminación sexista por asociación se entiende como aquella sufrida por una persona:',
    options: [['A', 'Por razón del sexo, embarazo, parto, maternidad o estado civil de otra persona con la que estuviera relacionada.'], ['B', 'Por pertenecer a un partido político o sindicato no mayoritario en su centro de trabajo.'], ['C', 'Por asociarse con empresas externas para la realización de servicios comunes.'], ['D', 'Por el mero hecho de no estar sindicado o no participar en elecciones de representantes.']], correct: 0,
    explanation: 'El artículo 9 de la Ley 7/2023 define la discriminación por asociación como aquella sufrida por un sujeto debido al sexo, embarazo, maternidad o estado civil de otra persona con la que guarda relación.',
    whys: ['Es correcta: recoge los elementos definitorios de la discriminación por asociación.', 'La filiación política o sindical se protege por la libertad sindical, no es discriminación por asociación sexista.', 'La asociación de empresas no tiene relación con el acoso o discriminación de género regulados.', 'La no sindicación no se relaciona con la discriminación sexista por asociación definida en esta ley.']
  },
  {
    id: 'troncal-igualdad-85', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 10', sourceUrl: 'officialSources.equalityGalicia',
    text: 'De acuerdo con el artículo 10 de la Ley 7/2023 de Galicia, ¿cuándo existe discriminación sexista por error?',
    options: [['A', 'Cuando la discriminación se funde en una apreciación incorrecta del embarazo, maternidad, obligaciones familiares o estado civil de la víctima.'], ['B', 'Cuando el órgano administrativo comete una errata de redacción al resolver un expediente sin perjuicio.'], ['C', 'Cuando se aplica por error una sanción disciplinaria leve en lugar de una grave.'], ['D', 'Cuando se confunden las identidades de dos candidatos en una lista electoral.']], correct: 0,
    explanation: 'El artículo 10 define la discriminación por error como aquella que se fundamenta en una apreciación incorrecta del embarazo, maternidad, obligaciones familiares o estado civil de la persona afectada por parte del discriminador.',
    whys: ['Es correcta: coincide con la definición de discriminación por error del artículo 10.', 'Las erratas administrativas de redacción no constituyen discriminación sexista por error.', 'Los errores en calificación de faltas disciplinarias se rigen por el derecho sancionador general.', 'La confusión de datos electorales no representa la discriminación por error por motivos de género.']
  },
  {
    id: 'troncal-igualdad-113', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 11', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Conforme al artículo 11 de la Ley 7/2023 de Galicia, ¿qué caracteriza a la discriminación sexista múltiple e interseccional?',
    options: [['A', 'La concurrencia del sexo con otros factores de discriminación, generando efectos específicos y diferenciados que no pueden separarse.'], ['B', 'La comisión simultánea de varias infracciones administrativas por parte de un mismo sujeto público.'], ['C', 'La aplicación de normas estatales y autonómicas de manera concurrente sobre el mismo puesto.'], ['D', 'La discriminación realizada de forma sucesiva en varios puestos de trabajo de administraciones distintas.']], correct: 0,
    explanation: 'El artículo 11 de la Ley 7/2023 regula la discriminación múltiple (concurrencia de factores) e interseccional (cuando esos factores interactúan de forma inseparable generando una desventaja única).',
    whys: ['Es correcta: describe conceptualmente la discriminación múltiple e interseccional en el artículo 11.', 'El concurso de infracciones administrativas se rige por la Ley 40/2015.', 'La concurrencia normativa se resuelve por los principios de jerarquía y competencia.', 'El cambio de puesto de trabajo no caracteriza el concepto de discriminación interseccional.']
  },
  {
    id: 'troncal-igualdad-126', topic: 'Troncal estatal', source: 'Ley 7/2023, disp. adic. primera', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según la disposición adicional primera de la Ley 7/2023 de Galicia, ¿qué porcentaje define la composición equilibrada de mujeres y hombres en un conjunto de personas?',
    options: [['A', 'Que las personas de cada sexo no superen el 60 por ciento ni sean menos del 40 por ciento del total.'], ['B', 'Que exista una proporción exacta del 50 por ciento para cada uno de los sexos en todo caso.'], ['C', 'Que ningún sexo sea inferior al 30 por ciento del total de miembros.'], ['D', 'Que el sexo menos representado suponga al menos el 25 por ciento del conjunto.']], correct: 0,
    explanation: 'La disposición adicional primera de la Ley 7/2023 define la composición equilibrada como aquella presencia de mujeres y hombres donde las personas de cada sexo no superen el 60% ni sean menos del 40% del conjunto.',
    whys: ['Es correcta: recoge los límites porcentuales del 60% y 40% que definen la presencia equilibrada.', 'La ley no exige una proporción fija del 50% debido a la flexibilidad de participación.', 'El límite del 30% no coincide con la composición equilibrada de esta norma.', 'El 25% está por debajo del mínimo legal exigido para la presencia equilibrada.']
  },
  {
    id: 'troncal-igualdad-158', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 22.1', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Conforme al artículo 22.1 de la Ley 7/2023 de Galicia, ¿sobre qué documentos es preceptivo el informe sobre impacto de género?',
    options: [['A', 'Sobre todos los proyectos de ley elaborados por el Consello de la Xunta de Galicia.'], ['B', 'Exclusivamente sobre los reglamentos internos de las corporaciones locales de menos de cinco mil habitantes.'], ['C', 'Únicamente sobre los pliegos de contratación de obras menores de la administración autonómica.'], ['D', 'Sobre todas las resoluciones administrativas de carácter particular firmadas por los directores generales.']], correct: 0,
    explanation: 'El artículo 22.1 establece que los proyectos de ley elaborados por el Consello de la Xunta de Galicia deben ir acompañados preceptivamente de un informe sobre el impacto de género.',
    whys: ['Es correcta: los proyectos de ley del Consello de la Xunta requieren este informe obligatoriamente.', 'El artículo 22.1 se enfoca en proyectos de ley autonómicos, no en reglamentos locales menores.', 'Los pliegos contractuales tienen su propio régimen y no exigen este informe parlamentario.', 'Las resoluciones de carácter particular de directores generales no requieren este informe de elaboración normativa.']
  },
  {
    id: 'troncal-igualdad-181', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 23', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según el artículo 23 de la Ley 7/2023 de Galicia, ¿qué requisito debe acompañar al proyecto de ley de presupuestos generales de la Comunidad Autónoma?',
    options: [['A', 'Un informe sobre el enfoque de género de las dotaciones presupuestarias, que analice su impacto en la igualdad.'], ['B', 'Una declaración jurada de los conselleiros de no haber incurrido en discriminación.'], ['C', 'Un dictamen vinculante de la Comisión de la Transparencia sobre los gastos corrientes.'], ['D', 'La suspensión de toda subvención a entidades que no tengan paridad del 50 por ciento.']], correct: 0,
    explanation: 'El artículo 23 establece que el proyecto de ley de presupuestos generales de la Comunidad Autónoma de Galicia irá acompañado de un informe de enfoque de género que evalúe el impacto de las partidas en la igualdad.',
    whys: ['Es correcta: recoge la obligación de acompañar el presupuesto con el informe de enfoque de género.', 'La ley no exige una declaración jurada individual de los conselleiros sobre discriminación en los presupuestos.', 'La Comisión de Transparencia no dictamina los presupuestos generales de la Xunta.', 'No se prevé la suspensión automática de subvenciones por no tener paridad del 50%.']
  },
  {
    id: 'troncal-igualdad-204', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 27.1', sourceUrl: 'officialSources.equalityGalicia',
    text: 'De acuerdo con el artículo 27.1 de la Ley 7/2023 de Galicia, ¿qué obligación se impone a la actividad estadística del sector público autonómico?',
    options: [['A', 'Desglosar por la variable sexo los datos estadísticos que recopilen y procesen en sus actividades.'], ['B', 'Utilizar únicamente encuestas telefónicas realizadas en el territorio gallego.'], ['C', 'Prohibir el almacenamiento de datos relativos al empleo o nivel educativo.'], ['D', 'Destruir anualmente las estadísticas históricas para proteger la privacidad.']], correct: 0,
    explanation: 'El artículo 27.1 obliga a incluir la variable sexo en las operaciones estadísticas y a realizar el desglose de los datos recopilados por esta variable para permitir un análisis de género fiable.',
    whys: ['Es correcta: es la obligación estadística clave establecida en el artículo 27.1.', 'El método de encuestas no se restringe por ley a la vía telefónica.', 'El almacenamiento de datos de empleo o nivel educativo es básico para la estadística pública.', 'Las estadísticas históricas deben conservarse bajo medidas de protección, no destruirse.']
  },
  {
    id: 'troncal-igualdad-217', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 28', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Conforme al artículo 28 de la Ley 7/2023 de Galicia, ¿qué finalidad tiene la cuenta satélite de producción doméstica?',
    options: [['A', 'Visibilizar y estimar el valor económico del trabajo doméstico no remunerado y del cuidado de personas en Galicia.'], ['B', 'Establecer un impuesto especial sobre la compra de electrodomésticos.'], ['C', 'Subvencionar el mantenimiento de segundas residencias de familias numerosas.'], ['D', 'Controlar fiscalmente las actividades de autónomos del sector de limpieza.']], correct: 0,
    explanation: 'El artículo 28 prevé la creación de una cuenta satélite de producción doméstica para estimar y visibilizar la contribución económica del trabajo doméstico no remunerado y del cuidado familiar.',
    whys: ['Es correcta: recoge la finalidad de estimación económica de la cuenta satélite.', 'La ley no crea ningún tributo o gravamen sobre electrodomésticos.', 'No tiene como fin subvencionar segundas residencias de familias.', 'No es un instrumento de inspección fiscal para trabajadores autónomos.']
  },
  {
    id: 'troncal-igualdad-230', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 31', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según el artículo 31 de la Ley 7/2023 de Galicia, el uso no sexista del lenguaje institucional implica:',
    options: [['A', 'Utilizar formas de comunicación claras y neutras que no invisibilicen ni discriminen a las mujeres.'], ['B', 'Modificar obligatoriamente la gramática tradicional eliminando el género masculino de todas las palabras.'], ['C', 'Prohibir el uso del idioma gallego en las comunicaciones dirigidas a mujeres.'], ['D', 'Sustituir toda comunicación escrita por notificaciones verbales obligatorias.']], correct: 0,
    explanation: 'El artículo 31 promueve el uso no sexista del lenguaje en la administración pública, recomendando opciones neutras y claras para evitar la invisibilización y asegurar la igualdad.',
    whys: ['Es correcta: define la lógica del uso no sexista del lenguaje del artículo 31.', 'La ley promueve un lenguaje institucional inclusivo y neutro, no una reforma total obligatoria de la gramática.', 'No se prohíbe el gallego, al contrario, se fomenta el uso de ambas lenguas oficiales con perspectiva de género.', 'Las notificaciones deben ser escritas o telemáticas para garantizar su validez jurídica.']
  },
  {
    id: 'troncal-igualdad-243', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 52', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Conforme al artículo 52 de la Ley 7/2023 de Galicia, ¿qué función se atribuye a la Escuela Gallega de Administración Pública (EGAP) en materia de igualdad?',
    options: [['A', 'La formación del personal de la administración en materia de igualdad de oportunidades y transversalidad de género.'], ['B', 'La instrucción de los expedientes sancionadores por acoso laboral en empresas privadas.'], ['C', 'El nombramiento directo de los directores generales de las consellerías de la Xunta.'], ['D', 'La resolución de las reclamaciones de acceso a la información pública.']], correct: 0,
    explanation: 'El artículo 52 encomienda a la EGAP la organización de formación continua en igualdad de oportunidades, no discriminación y transversalidad para el personal del sector público gallego.',
    whys: ['Es correcta: la EGAP tiene el mandato legal de formación en igualdad para el personal autonómico.', 'La EGAP no sanciona acoso en el sector privado, función que corresponde a la Inspección de Trabajo.', 'Los directores generales son nombrados por decreto del Consello de la Xunta.', 'Las reclamaciones de acceso corresponden a la Comisión de Transparencia.']
  },
  {
    id: 'troncal-igualdad-250', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 6.3', sourceUrl: 'officialSources.equalityGalicia',
    text: 'Según el artículo 6 de la Ley 7/2023 de Galicia, la diferencia básica entre acoso sexual y acoso por razón de sexo radica en que:',
    options: [['A', 'El acoso sexual exige comportamiento de naturaleza sexual; el acoso por razón de sexo se funda en el sexo del sujeto con fin hostil.'], ['B', 'El acoso sexual solo se comete por vía telemática; el acoso por razón de sexo es siempre físico.'], ['C', 'El acoso por razón de sexo no se considera discriminación; el acoso sexual sí.'], ['D', 'El acoso sexual requiere que exista una relación conyugal previa entre los sujetos.']], correct: 0,
    explanation: 'El artículo 6 distingue el acoso sexual (comportamiento físico o verbal de naturaleza sexual que atenta contra la dignidad) del acoso por razón de sexo (comportamiento relacionado con el sexo de una persona con el propósito o efecto de atentar contra su dignidad), declarando que ambos constituyen discriminación.',
    whys: ['Es correcta: identifica la diferencia conceptual clave que señala la ley.', 'Los canales (físicos o telemáticos) pueden darse en ambas formas de acoso.', 'Ambos tipos de acoso están tipificados y se consideran discriminación por razón de sexo.', 'La relación conyugal no es un elemento configurador del acoso sexual.']
  },
  {
    id: 'troncal-igualdad-259', topic: 'Troncal estatal', source: 'Ley 7/2023, art. 12', sourceUrl: 'officialSources.equalityGalicia',
    text: 'De acuerdo con el artículo 12 de la Ley 7/2023 de Galicia, la protección frente a represalias implica que:',
    options: [['A', 'Serán nulos de pleno derecho los actos que supongan un trato adverso como consecuencia de una reclamación o recurso para exigir la igualdad.'], ['B', 'Se suspenderá de empleo al denunciante durante el tiempo que dure la investigación.'], ['C', 'El denunciante debe abonar las tasas del expediente sancionador en todo caso.'], ['D', 'Se prohíbe interponer demandas judiciales si no existe acuerdo previo entre las partes.']], correct: 0,
    explanation: 'El artículo 12 prohíbe las represalias y declara la nulidad de pleno derecho de cualquier trato adverso o efecto negativo producido en un sujeto como reacción a una denuncia, reclamación o recurso destinado a exigir la igualdad de trato.',
    whys: ['Es correcta: define el alcance y consecuencia de nulidad que otorga el artículo 12.', 'La suspensión de empleo al denunciante constituiría una represalia prohibida.', 'El denunciante no abona tasas por instar la tutela administrativa o sancionadora.', 'La protección frente a represalias salvaguarda el libre acceso a la tutela judicial sin cortapisas.']
  },

  // ----------------------------------------------------
  // DISCAPACIDAD (14 questions)
  // ----------------------------------------------------
  {
    id: 'troncal-discapacidad-33', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 4.1', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 4.1 del Real Decreto Legislativo 1/2013, ¿quiénes tienen legalmente la consideración de personas con discapacidad?',
    options: [['A', 'Quienes presenten deficiencias físicas, mentales, intelectuales o sensoriales a largo plazo y tengan reconocido un grado igual o superior al 33 por ciento.'], ['B', 'Exclusivamente los pensionistas de la Seguridad Social de más de sesenta y cinco años.'], ['C', 'Únicamente las personas que precisen asistencia domiciliaria diaria certificada.'], ['D', 'Cualquier ciudadano que lo declare bajo su responsabilidad en un proceso selectivo.']], correct: 0,
    explanation: 'El artículo 4.1 establece que tienen la consideración de personas con discapacidad aquellas que tengan reconocido un grado de discapacidad igual o superior al 33%, incluyendo también a pensionistas de incapacidad permanente total, absoluta o gran invalidez.',
    whys: ['Es correcta: coincide con la definición y el umbral del 33% del artículo 4.1.', 'No se limita a pensionistas de más de 65 años, abarca a cualquier edad con grado reconocido.', 'La necesidad de asistencia domiciliaria no define con carácter general la discapacidad legal.', 'Se requiere reconocimiento administrativo oficial, la mera declaración del interesado no es suficiente.']
  },
  {
    id: 'troncal-discapacidad-45', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.k', sourceUrl: 'officialSources.disability',
    text: 'Conforme al artículo 2.k del Real Decreto Legislativo 1/2013, la accesibilidad universal se define como la condición que permite que los entornos, procesos, bienes y servicios:',
    options: [['A', 'Sean comprensibles, utilizables y practicables por todas las personas en condiciones de seguridad y comodidad y de la forma más autónoma posible.'], ['B', 'Sean accesibles únicamente para quienes dispongan de un asistente personal acreditado.'], ['C', 'Se diseñen de forma exclusiva para colectivos específicos sin uso común.'], ['D', 'Se adapten individualmente tras el pago de una tasa de tramitación pública.']], correct: 0,
    explanation: 'El artículo 2.k define la accesibilidad universal como la condición que deben cumplir los entornos, productos y servicios para ser utilizables y practicables por todas las personas de forma autónoma, segura y natural.',
    whys: ['Es correcta: recoge la definición completa y los términos del artículo 2.k.', 'La accesibilidad universal busca prescindir de apoyos o asistentes siempre que sea posible.', 'Busca el uso común y normalizado por toda la ciudadanía, no el diseño exclusivo o separado.', 'Es una condición previa y general que no depende de tasas de adaptación individuales.']
  },
  {
    id: 'troncal-discapacidad-58', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.l', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 2.l del Real Decreto Legislativo 1/2013, el diseño universal o diseño para todas las personas se entiende como:',
    options: [['A', 'La actividad por la que se conciben desde el origen entornos, productos y servicios para que puedan ser utilizados por todos en la mayor medida posible.'], ['B', 'El diseño arquitectónico de edificios públicos que imponen barreras físicas decorativas.'], ['C', 'El procedimiento para adaptar un servicio público de manera posterior a su puesta en marcha.'], ['D', 'El diseño exclusivo de herramientas digitales para personas con discapacidad visual.']], correct: 0,
    explanation: 'El artículo 2.l define el diseño universal como la actividad orientada a concebir desde el origen entornos, productos, servicios y objetos utilizables por el mayor número de personas sin necesidad de adaptación posterior.',
    whys: ['Es correcta: define el diseño universal partiendo de la concepción originaria sin adaptaciones.', 'El diseño universal busca eliminar barreras, no imponerlas bajo ningún pretexto.', 'El diseño universal se aplica en el origen, la adaptación posterior es un ajuste razonable.', 'Busca el uso generalizado de todos, no el diseño segmentado para un único grupo.']
  },
  {
    id: 'troncal-discapacidad-86', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.m', sourceUrl: 'officialSources.disability',
    text: 'De acuerdo con el artículo 2.m del Real Decreto Legislativo 1/2013, ¿qué caracteriza a los ajustes razonables?',
    options: [['A', 'Son modificaciones necesarias y adecuadas en un caso particular que no impongan una carga desproporcionada o indebida.'], ['B', 'Son adaptaciones obligatorias que deben realizarse aunque supongan la quiebra de la entidad.'], ['C', 'Son medidas estéticas secundarias que no alteran la accesibilidad real.'], ['D', 'Son resoluciones generales que eximen a la administración de cumplir la ley.']], correct: 0,
    explanation: 'El artículo 2.m define los ajustes razonables como las adaptaciones necesarias y adecuadas en situaciones concretas para garantizar la igualdad de oportunidades, limitadas por el criterio de no imponer una carga desproporcionada.',
    whys: ['Es correcta: reúne los requisitos de necesidad, adecuación, caso particular y proporcionalidad económica.', 'La no imposición de una carga desproporcionada es un límite recogido en la ley.', 'Tienen un fin práctico y de accesibilidad real, no meramente estético.', 'Son de carácter particular y no tienen carácter de exención general de la norma.']
  },
  {
    id: 'troncal-discapacidad-114', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.d', sourceUrl: 'officialSources.disability',
    text: 'Conforme al artículo 2.d del Real Decreto Legislativo 1/2013, la discriminación directa por razón de discapacidad existe cuando:',
    options: [['A', 'Una persona sea tratada de manera menos favorable que otra en situación análoga por motivo de su discapacidad.'], ['B', 'Una regla aparentemente neutra sitúa a personas con discapacidad en desventaja sin fin legítimo.'], ['C', 'Se adoptan medidas de acción positiva para compensar desigualdades de hecho.'], ['D', 'Se realizan obras de accesibilidad exigidas por la inspección de vivienda.']], correct: 0,
    explanation: 'El artículo 2.d define la discriminación directa como aquella situación en la que una persona recibe un trato menos favorable que otra en situación comparable por razón de su discapacidad.',
    whys: ['Es correcta: define el trato desfavorable directo comparativo.', 'La regla aparentemente neutra define a la discriminación indirecta (artículo 2.e).', 'Las acciones positivas no discriminan, son medidas de compensación autorizadas.', 'Las obras de accesibilidad son el cumplimiento de un deber legal, no discriminación.']
  },
  {
    id: 'troncal-discapacidad-127', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.e', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 2.e del Real Decreto Legislativo 1/2013, ¿cuándo existe discriminación indirecta?',
    options: [['A', 'Cuando una disposición, criterio o práctica aparentemente neutros ocasiona una desventaja particular a personas con discapacidad sin justificación legítima y proporcionada.'], ['B', 'Cuando el trato desfavorable se expresa verbalmente de forma explícita.'], ['C', 'Cuando se otorga un ajuste razonable a un trabajador que lo solicitó.'], ['D', 'Cuando se reserva un cupo de empleo público en los procesos selectivos.']], correct: 0,
    explanation: 'El artículo 2.e define la discriminación indirecta como el impacto adverso y desfavorable que produce una norma o práctica neutra en personas con discapacidad, salvo que persiga un fin legítimo con medios necesarios y proporcionados.',
    whys: ['Es correcta: recoge los elementos de la discriminación indirecta del artículo 2.e.', 'El trato desfavorable explícito caracteriza a la discriminación directa.', 'Otorgar un ajuste razonable es un acto de cumplimiento de la igualdad, no de discriminación.', 'La reserva de cupo es una medida de acción positiva amparada por la ley.']
  },
  {
    id: 'troncal-discapacidad-159', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 5', sourceUrl: 'officialSources.disability',
    text: 'Conforme al artículo 5 del Real Decreto Legislativo 1/2013, ¿cuál de los siguientes es un principio rector de la ley?',
    options: [['A', 'El respeto de la dignidad inherente, la autonomía individual, incluida la libertad de tomar las propias decisiones, y la vida independiente.'], ['B', 'El internamiento forzoso y sistemático de las personas con discapacidad.'], ['C', 'La segregación escolar y laboral obligatoria de las personas con discapacidad intelectual.'], ['D', 'La exención absoluta de toda responsabilidad penal y administrativa.']], correct: 0,
    explanation: 'El artículo 5 detalla los principios rectores, destacando el respeto de la dignidad, la autonomía individual (vida independiente), la no discriminación y la igualdad de oportunidades.',
    whys: ['Es correcta: es el primer principio rector del artículo 5.', 'El internamiento forzoso sistemático contradice la autonomía y la vida independiente.', 'La ley persigue la inclusión e integración, no la segregación.', 'Las personas con discapacidad están sujetas a las leyes, no existe una exención penal absoluta.']
  },
  {
    id: 'troncal-discapacidad-182', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 7.1', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 7.1 del Real Decreto Legislativo 1/2013, las medidas de acción positiva consisten en:',
    options: [['A', 'Apoyos de carácter específico destinados a prevenir o compensar las desventajas o dificultades que tienen las personas con discapacidad.'], ['B', 'Sanciones económicas a las personas que soliciten un ajuste razonable.'], ['C', 'Procedimientos judiciales abreviados para declarar la incapacitación civil.'], ['D', 'Subvenciones directas sin justificación para la adquisición de bienes de lujo.']], correct: 0,
    explanation: 'El artículo 7.1 prevé la adopción de medidas de acción positiva, consistentes en apoyos específicos de carácter temporal o permanente dirigidos a neutralizar las desventajas de la discapacidad.',
    whys: ['Es correcta: define el objeto de las medidas de acción positiva conforme al artículo 7.1.', 'No se sanciona a quien solicita ajustes, es un derecho protegido.', 'No se asocian con procesos de incapacitación civil y apoyos a la capacidad.', 'Tienen como fin compensar desventajas de integración, no adquirir bienes suntuarios.']
  },
  {
    id: 'troncal-discapacidad-205', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 35.1', sourceUrl: 'officialSources.disability',
    text: 'De acuerdo con el artículo 35.1 del Real Decreto Legislativo 1/2013, el derecho al trabajo de las personas con discapacidad se rige por el principio de:',
    options: [['A', 'Igualdad de oportunidades y de trato, prohibiéndose cualquier discriminación directa o indirecta.'], ['B', 'Preferencia absoluta del personal extranjero sobre el nacional en todo caso.'], ['C', 'Obligatoriedad de trabajar sin retribución durante los periodos de formación.'], ['D', 'Exclusión voluntaria del régimen general de la Seguridad Social.']], correct: 0,
    explanation: 'El artículo 35.1 consagra el derecho al trabajo en igualdad de oportunidades y de trato, prohibiendo toda forma de discriminación por razón de discapacidad en el acceso, condiciones y extinción laboral.',
    whys: ['Es correcta: el principio rector laboral es la igualdad de oportunidades y de trato.', 'La nacionalidad no es objeto de este régimen específico de discapacidad.', 'La formación laboral de personas con discapacidad debe ser retribuida conforme a la ley.', 'La afiliación a la Seguridad Social es obligatoria para todos los trabajadores.']
  },
  {
    id: 'troncal-discapacidad-218', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 42.1', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 42.1 del Real Decreto Legislativo 1/2013, las empresas públicas y privadas que empleen a 50 o más trabajadores están obligadas a que:',
    options: [['A', 'Al menos el 2 por ciento de su plantilla esté constituida por trabajadores con discapacidad, salvo convenio o medidas alternativas.'], ['B', 'El 10 por ciento de los puestos directivos estén ocupados por personas con discapacidad de forma obligatoria.'], ['C', 'Subcontraten todos sus servicios con Centros Especiales de Empleo.'], ['D', 'Establezcan jornadas de trabajo semanales de máximo diez horas.']], correct: 0,
    explanation: 'El artículo 42.1 impone la reserva de empleo de al menos el 2% de puestos para personas con discapacidad en empresas públicas y privadas de 50 o más trabajadores.',
    whys: ['Es correcta: recoge la cuota del 2% y el umbral de 50 trabajadores del artículo 42.1.', 'La cuota legal general es del 2%, no del 10% obligatorio en dirección.', 'La subcontratación con CEE es una de las medidas alternativas autorizadas, no una obligación absoluta.', 'La jornada laboral se rige por el Estatuto de los Trabajadores, sin límite de 10 horas.']
  },
  {
    id: 'troncal-discapacidad-231', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 16', sourceUrl: 'officialSources.disability',
    text: 'Conforme al artículo 16 del Real Decreto Legislativo 1/2013, en materia de educación, las administraciones públicas deben asegurar:',
    options: [['A', 'Un sistema educativo inclusivo en todos los niveles, así como el aprendizaje a lo largo de la vida, garantizando la atención a la diversidad.'], ['B', 'La escolarización obligatoria en centros especiales separados de toda persona con discapacidad.'], ['C', 'La exención de cursar asignaturas científicas o de idiomas a estos alumnos.'], ['D', 'La gratuidad de la educación superior universitaria privada para todos los familiares del alumno.']], correct: 0,
    explanation: 'El artículo 16 garantiza el derecho a una educación inclusiva, de calidad y gratuita en igualdad de condiciones, promoviendo apoyos y adaptaciones curriculares en el sistema ordinario.',
    whys: ['Es correcta: la inclusión educativa y la atención a la diversidad en todos los niveles es el mandato legal.', 'La escolarización en centros especiales es excepcional y basada en el interés del alumno, no obligatoria ni general.', 'Los alumnos con discapacidad cursan el currículo ordinario con las adaptaciones necesarias, sin exenciones sistemáticas.', 'La gratuidad se centra en la enseñanza obligatoria pública y en exenciones de tasas públicas del alumno, no familiares en la privada.']
  },
  {
    id: 'troncal-discapacidad-244', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 2.a', sourceUrl: 'officialSources.disability',
    text: 'De acuerdo con el artículo 2.a del Real Decreto Legislativo 1/2013, la discapacidad se conceptualiza como:',
    options: [['A', 'Una situación resultante de la interacción entre personas con deficiencias y las barreras que impiden su participación plena en igualdad.'], ['B', 'Una enfermedad médica aguda de carácter transitorio curable en menos de un mes.'], ['C', 'La pérdida involuntaria del empleo público por motivos disciplinarios o cese.'], ['D', 'La condición de dependencia absoluta que impide realizar cualquier acto vital autónomo.']], correct: 0,
    explanation: 'El artículo 2.a adopta el modelo social y define la discapacidad como una situación dinámica de interacción entre las deficiencias de la persona y las barreras ambientales o de actitud del entorno.',
    whys: ['Es correcta: recoge la definición legal de discapacidad de base interactiva.', 'No es una dolencia médica aguda o transitoria corta.', 'La pérdida de empleo público es una sanción o cese, no tiene relación con la discapacidad.', 'No presupone dependencia absoluta; las personas con discapacidad pueden ser muy autónomas con accesibilidad.']
  },
  {
    id: 'troncal-discapacidad-251', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 8', sourceUrl: 'officialSources.disability',
    text: 'Según el artículo 8 del Real Decreto Legislativo 1/2013, ¿qué exige el principio de transversalidad de las políticas de discapacidad?',
    options: [['A', 'Que las actuaciones de los poderes públicos en discapacidad no se limiten a planes aislados, sino que integren sus principios en todas sus políticas sectoriales.'], ['B', 'Que los gastos de discapacidad se financien exclusivamente mediante donaciones privadas voluntarias.'], ['C', 'Que la materia de discapacidad dependa únicamente de la consejería de sanidad de la Xunta de Galicia.'], ['D', 'Que se aplique de manera opcional en las corporaciones locales de menos de mil habitantes.']], correct: 0,
    explanation: 'El principio de transversalidad (artículo 8) implica que la discapacidad debe ser considerada en todas las decisiones, normas y políticas sectoriales de la administración pública.',
    whys: ['Es correcta: define la transversalidad de la discapacidad en las políticas sectoriales.', 'Las políticas públicas se financian con cargo a los presupuestos públicos.', 'La transversalidad exige implicar a todas las consejerías e infraestructuras, no solo a Sanidad.', 'El cumplimiento de los principios de la ley es obligatorio para todas las administraciones, sin importar su tamaño.']
  },
  {
    id: 'troncal-discapacidad-260', topic: 'Troncal estatal', source: 'RDL 1/2013, art. 66', sourceUrl: 'officialSources.disability',
    text: 'Conforme al artículo 66 del Real Decreto Legislativo 1/2013, en materia de defensa de la igualdad, se define el acoso como:',
    options: [['A', 'Cualquier conducta relacionada con la discapacidad que tenga como objetivo o efecto atentar contra la dignidad y crear un entorno intimidatorio u ofensivo.'], ['B', 'La exigencia reglamentaria de cumplir el horario de trabajo establecido en el puesto.'], ['C', 'El retraso ocasional e involuntario en el pago de una ayuda pública autonómica.'], ['D', 'La discrepancia técnica motivada entre dos profesionales de la administración.']], correct: 0,
    explanation: 'El artículo 66 prohíbe el acoso por motivos de discapacidad, tipificándolo como conducta hostil que lesiona la dignidad o crea un entorno intimidatorio, hostil, degradante u ofensivo.',
    whys: ['Es correcta: recoge la definición de acoso relacionada con la discapacidad del artículo 66.', 'Exigir el cumplimiento del horario es una función de control del superior, no acoso.', 'Los retrasos en ayudas se rigen por el procedimiento administrativo, no constituyen acoso.', 'La discrepancia técnica motivada y constructiva no atenta contra la dignidad de las personas.']
  },

  // ----------------------------------------------------
  // TRANSPARENCIA Y BUEN GOBIERNO (14 questions)
  // ----------------------------------------------------
  {
    id: 'troncal-transparencia-25', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 1', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 1 de la Ley 1/2016 de Galicia, ¿cuál es el objeto de esta ley autonómica?',
    options: [['A', 'Regular la transparencia y el acceso a la información pública, e introducir reglas de buen gobierno en Galicia.'], ['B', 'Establecer las bases de la contratación de personal directivo privado en la comunidad.'], ['C', 'Regular las competencias penales exclusivas del Tribunal Superior de Justicia de Galicia.'], ['D', 'Sustituir el régimen de contratación del sector público estatal por normas puramente locales.']], correct: 0,
    explanation: 'El artículo 1 de la Ley 1/2016 de transparencia y buen gobierno de Galicia tiene por objeto regular la transparencia, el acceso ciudadano a la información y fijar las reglas de buen gobierno de los altos cargos.',
    whys: ['Es correcta: resume el objeto expresado en el artículo 1 de la norma.', 'La ley no regula el personal directivo mercantil privado.', 'Las competencias penales y del TSJG corresponden a la Ley Orgánica del Poder Judicial.', 'La ley gallega se somete a la legislación básica estatal de contratos y transparencia.']
  },
  {
    id: 'troncal-transparencia-46', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 3.2', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Conforme al artículo 3.2 de la Ley 1/2016, ¿dónde deben cumplir sus obligaciones de publicidad los partidos políticos, sindicatos y patronales gallegas que reciban fondos públicos?',
    options: [['A', 'En el Portal de transparencia y Gobierno abierto de la Comunidad Autónoma.'], ['B', 'Exclusivamente en los diarios de mayor difusión comercial en Galicia.'], ['C', 'En el registro mercantil de la provincia donde tengan su sede principal.'], ['D', 'Únicamente en sus tablones de anuncios físicos oficiales.']], correct: 0,
    explanation: 'El artículo 3.2 establece que los partidos políticos, sindicatos, organizaciones empresariales y entidades privadas perceptoras de fondos públicos autonómicos deben dar cumplimiento a su publicidad activa en el Portal de Transparencia y Gobierno Abierto.',
    whys: ['Es correcta: identifica el portal digital autonómico designado por el artículo 3.2.', 'Los diarios comerciales no sustituyen al canal público del Portal de Transparencia.', 'El Registro Mercantil no es el canal destinado a la publicidad activa de transparencia de fondos públicos.', 'Los tablones de anuncios físicos son complementarios pero insuficientes para cumplir la ley.']
  },
  {
    id: 'troncal-transparencia-59', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 4.2', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 4.2 de la Ley 1/2016 de Galicia, ¿a quiénes se extiende la obligación de suministrar información a la administración previa petición?',
    options: [['A', 'A los adjudicatarios de contratos públicos y a los beneficiarios de subvenciones públicas autonómicas.'], ['B', 'A todo ciudadano gallego mayor de edad sin importar su relación con el sector público.'], ['C', 'Exclusivamente a los funcionarios en situación de excedencia voluntaria.'], ['D', 'Únicamente a los diputados del Parlamento de Galicia en activo.']], correct: 0,
    explanation: 'El artículo 4.2 extiende la obligación de suministrar información necesaria a los adjudicatarios de contratos (art. 4.2.a) y beneficiarios de subvenciones (art. 4.2.b) que tengan relación con la administración autonómica.',
    whys: ['Es correcta: recoge la extensión de la obligación del artículo 4.2 a contratistas y subvencionados.', 'No se puede requerir información privada indiscriminadamente a todo ciudadano sin causa jurídica.', 'Los funcionarios en excedencia no tienen una relación de servicio activo que les obligue de esta forma.', 'Los diputados del Parlamento ejercen control político pero no son sujetos obligados de suministro del artículo 4.']
  },
  {
    id: 'troncal-transparencia-87', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 24', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'De acuerdo con el artículo 24 de la Ley 1/2016 de Galicia, el derecho de acceso a la información pública:',
    options: [['A', 'Se puede ejercer por todas las personas sin necesidad de motivar la solicitud.'], ['B', 'Exige obligatoriamente la acreditación de un interés legítimo o directo.'], ['C', 'Solo puede ejercitarse si el solicitante es de vecindad civil gallega.'], ['D', 'Está reservado a los procuradores y abogados en ejercicio colegiados.']], correct: 0,
    explanation: 'El artículo 24 consagra el derecho de acceso a la información pública para todos, sin que el ejercicio del derecho esté condicionado a la motivación o justificación de un interés.',
    whys: ['Es correcta: el derecho de acceso es universal y no exige motivar la solicitud.', 'No se exige acreditar un interés legítimo o directo, a diferencia de otros procedimientos.', 'Se reconoce a todas las personas, sin limitarse a quienes ostenten la vecindad civil gallega.', 'No se restringe a profesionales del derecho o abogacía.']
  },
  {
    id: 'troncal-transparencia-115', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 25.2', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Conforme al artículo 25.2 de la Ley 1/2016 de Galicia, los límites al derecho de acceso a la información pública deben:',
    options: [['A', 'Interpretarse de manera restrictiva y justificada, aplicándose de forma proporcionada.'], ['B', 'Operar como prohibición automática ante cualquier solicitud de datos económicos.'], ['C', 'Aplicarse discrecionalmente por el órgano gestor sin necesidad de motivación.'], ['D', 'Sustituirse por el criterio de silencio administrativo negativo inmediato.']], correct: 0,
    explanation: 'El artículo 25.2 establece que las limitaciones al derecho de acceso habrán de interpretarse de forma restrictiva y justificada, debiendo ser proporcionadas atendiendo a su objeto y finalidad.',
    whys: ['Es correcta: define las directrices de interpretación restrictiva y proporcionalidad del artículo 25.2.', 'Los límites no son automáticos ni deniegan por sí mismos toda información económica.', 'Cualquier aplicación de límites debe ser motivada en la resolución que deniegue el acceso.', 'La denegación exige resolución expresa y motivada, el silencio administrativo no suple el deber de motivar.']
  },
  {
    id: 'troncal-transparencia-128', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 25.1', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 25.1 de la Ley 1/2016 de Galicia, si una limitación afecta solo a una parte de la información solicitada:',
    options: [['A', 'Se concederá el acceso parcial, omitiendo la parte afectada, salvo que la información resultante sea equívoca o carente de sentido.'], ['B', 'Se denegará la totalidad de la solicitud de forma automática para proteger la confidencialidad.'], ['C', 'Se revelará el documento íntegro ignorando el límite si el solicitante firma un pacto de secreto.'], ['D', 'Se remitirá el expediente al Valedor del Pueblo para que lo redacte de nuevo.']], correct: 0,
    explanation: 'El artículo 25.1 establece el principio de acceso parcial, obligando a facilitar la información omitiendo las partes afectadas por la limitación, siempre que el resultado conserve sentido.',
    whys: ['Es correcta: recoge la regla de acceso parcial y la excepción de falta de sentido del artículo 25.1.', 'Denegar toda la solicitud vulnera el principio de proporcionalidad y acceso parcial.', 'Los límites legales no pueden eludirse mediante pactos de confidencialidad con el solicitante.', 'El Valedor no redacta ni depura documentos particulares de la administración general.']
  },
  {
    id: 'troncal-transparencia-160', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 27.2', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Conforme al artículo 27.2 de la Ley 1/2016 de Galicia, si la solicitud de acceso afecta a derechos o intereses de terceros:',
    options: [['A', 'Se les concederá un plazo de quince días para formular alegaciones, produciendo la suspensión del plazo para resolver.'], ['B', 'Se archivará el expediente por conflicto de intereses inmediato sin trámite.'], ['C', 'Se dará acceso inmediato al solicitante sin notificar a los terceros afectados.'], ['D', 'Se exigirá una comparecencia física conjunta de todas las partes afectadas.']], correct: 0,
    explanation: 'El artículo 27.2 prevé que, si la información solicitada afecta a terceros, se les dará traslado para formular alegaciones en el plazo de 15 días, quedando suspendido el plazo de resolución mientras transcurre dicho plazo.',
    whys: ['Es correcta: recoge el trámite de alegaciones de 15 días y la suspensión del plazo del artículo 27.2.', 'La afección a terceros exige darles trámite de audiencia, no archivar la solicitud.', 'Dar acceso sin oír a los terceros afectados vulnera sus derechos y el procedimiento legal.', 'El trámite es escrito e individual, no se exige comparecencia física presencial común.']
  },
  {
    id: 'troncal-transparencia-183', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 27.3', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 27.3 de la Ley 1/2016 de Galicia, ¿a quién corresponde la competencia para resolver las solicitudes de acceso en el sector público autonómico?',
    options: [['A', 'A la persona titular de la secretaría general, secretaría general técnica, dirección general o presidencia del ente instrumental competente.'], ['B', 'Exclusivamente al Conselleiro de Hacienda y Administración Pública.'], ['C', 'A los jefes de sección del archivo general de forma solidaria.'], ['D', 'Al Director General de la Policía Autonómica Gallega.']], correct: 0,
    explanation: 'El artículo 27.3 atribuye la competencia para resolver las solicitudes de acceso a los titulares de la secretaría general, secretaría general técnica, dirección general o presidencia del ente instrumental al que se refiera la información.',
    whys: ['Es correcta: identifica a los órganos competentes autonómicos para resolver del artículo 27.3.', 'El Conselleiro de Hacienda no concentra la competencia de toda la Xunta de Galicia.', 'Los jefes de sección del archivo no ostentan la competencia resolutoria legal.', 'La Policía Autonómica no tiene asignada la resolución de solicitudes de acceso a la información.']
  },
  {
    id: 'troncal-transparencia-206', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 28.1 & 33.3', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'De acuerdo con los artículos 28.1 y 33.3 de la Ley 1/2016, ¿qué órgano independiente resuelve las reclamaciones frente a denegaciones de acceso a la información en Galicia?',
    options: [['A', 'La Comisión de la Transparencia adscrita al Valedor del Pueblo.'], ['B', 'El Consejo de Cuentas de Galicia de forma directa.'], ['C', 'El Tribunal Superior de Justicia de Galicia en vía administrativa.'], ['D', 'La Junta Arbitral de Consumo de la Comunidad Autónoma.']], correct: 0,
    explanation: 'El artículo 33.3 atribuye a la Comisión de la Transparencia (creada como órgano independiente adscrito al Valedor del Pueblo) la competencia para resolver las reclamaciones potestativas reguladas en el artículo 28.',
    whys: ['Es correcta: la Comisión de la Transparencia resuelve las reclamaciones en Galicia.', 'El Consejo de Cuentas fiscaliza la gestión económica, no resuelve reclamaciones de acceso.', 'El TSJG actúa en vía jurisdiccional, no administrativa.', 'La Junta de Consumo resuelve conflictos de consumo, no reclamaciones de transparencia pública.']
  },
  {
    id: 'troncal-transparencia-219', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 32.1', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 32.1 de la Ley 1/2016 de Galicia, las funciones del Comisionado de la Transparencia se atribuyen a:',
    options: [['A', 'El Valedor del Pueblo.'], ['B', 'El Presidente del Parlamento de Galicia.'], ['C', 'El Letrado Mayor de la Xunta de Galicia.'], ['D', 'El Presidente del Consejo Consultivo.']], correct: 0,
    explanation: 'El artículo 32.1 crea el Comisionado de la Transparencia y atribuye sus funciones de forma directa e independiente al Valedor del Pueblo.',
    whys: ['Es correcta: el Valedor del Pueblo ejerce las funciones de Comisionado de la Transparencia.', 'El Presidente del Parlamento representa a la Cámara legislativa y no ejerce como Comisionado.', 'La asesoría jurídica de la Xunta no ejerce funciones de control independiente de transparencia.', 'El Presidente del Consejo Consultivo dirige el órgano de dictamen, no el control de acceso.']
  },
  {
    id: 'troncal-transparencia-232', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 33.2', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Conforme al artículo 33.2 de la Ley 1/2016, la Comisión de la Transparencia de Galicia está integrada por:',
    options: [['A', 'El Valedor del Pueblo como presidente, su adjunto como vicepresidente, y vocales representantes de la Xunta, Consejo Consultivo, Consejo de Cuentas y FEGAMP.'], ['B', 'El Presidente de la Xunta y los alcaldes de las siete grandes ciudades gallegas.'], ['C', 'Todos los diputados de la comisión parlamentaria de educación e igualdad.'], ['D', 'Tres magistrados de la Sala de lo Contencioso-Administrativo designados por sorteo.']], correct: 0,
    explanation: 'El artículo 33.2 detalla la composición mixta e independiente de la Comisión de Transparencia, presidida por el Valedor e integrada por vocales de órganos institucionales y de corporaciones locales.',
    whys: ['Es correcta: recoge la estructura jerárquica y de vocales detallada en el artículo 33.2.', 'El Presidente de la Xunta y alcaldes pertenecen al poder ejecutivo y no integran esta comisión de control.', 'Los diputados pertenecen al legislativo, no forman parte de esta comisión adscrita al Valedor.', 'Los magistrados actúan en el poder judicial, ajenos a la composición de este órgano administrativo.']
  },
  {
    id: 'troncal-transparencia-245', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 37.1', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'De acuerdo con el artículo 37.1 de la Ley 1/2016 de Galicia, las obligaciones del título de Buen Gobierno vinculan a:',
    options: [['A', 'La totalidad de los altos cargos de la Administración general y entidades del sector público autonómico.'], ['B', 'Exclusivamente a las empresas privadas que presten servicios comerciales sin ayudas.'], ['C', 'Únicamente a los jefes de departamento y negociados con rango de funcionario del subgrupo C1.'], ['D', 'A todos los ciudadanos residentes en Galicia que realicen transacciones mercantiles.']], correct: 0,
    explanation: 'El artículo 37.1 establece que las obligaciones de buen gobierno se aplican a todos los altos cargos de la Xunta y sus entes instrumentales, definiendo quiénes tienen tal consideración.',
    whys: ['Es correcta: recoge el ámbito subjetivo de buen gobierno del artículo 37.1.', 'Las empresas puramente privadas sin relación pública no están vinculadas por el buen gobierno público.', 'Los jefes de negociado C1 son personal funcionario ordinario, no altos cargos gubernamentales.', 'Los ciudadanos comunes no ejercen funciones de gobierno ni altos cargos públicos regulados.']
  },
  {
    id: 'troncal-transparencia-252', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 45.1', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Según el artículo 45.1 de la Ley 1/2016 de Galicia, ¿qué limitación se impone a los altos cargos de la Xunta tras su cese?',
    options: [['A', 'Durante los dos años siguientes al cese, no podrán realizar actividades en entidades privadas vinculadas con expedientes sobre los que dictaran resolución.'], ['B', 'Tienen prohibido volver a residir en el territorio de la Comunidad Autónoma de Galicia durante cinco años.'], ['C', 'No podrán ejercer ningún puesto de trabajo en la administración pública estatal durante diez años.'], ['D', 'Están obligados a liquidar de forma inmediata todo su patrimonio inmobiliario privado.']], correct: 0,
    explanation: 'El artículo 45.1 establece una limitación de dos años (puertas giratorias) para impedir que los altos cargos cesados presten servicios en empresas privadas implicadas en resoluciones dictadas por ellos.',
    whys: ['Es correcta: describe la prohibición pos-cese de dos años sobre expedientes resueltos por el alto cargo.', 'La ley no limita la residencia o movilidad de los cargos cesados.', 'No se limita el retorno a la función pública de carrera o de provisión estatal.', 'La norma no exige liquidar patrimonio inmobiliario, solo declararlo al Registro correspondiente.']
  },
  {
    id: 'troncal-transparencia-261', topic: 'Troncal estatal', source: 'Ley 1/2016, art. 46', sourceUrl: 'officialSources.transparencyGalicia',
    text: 'Conforme al artículo 46 de la Ley 1/2016 de Galicia, ¿qué prohibición financiera se aplica a los altos cargos?',
    options: [['A', 'La prohibición absoluta de poseer fondos en países o territorios calificados como paraísos fiscales.'], ['B', 'La obligación de invertir todo su ahorro privado en deuda pública de la Comunidad Autónoma.'], ['C', 'La prohibición de solicitar préstamos hipotecarios en entidades bancarias españolas.'], ['D', 'La obligación de declarar anualmente todas las compras de bienes de consumo diario.']], correct: 0,
    explanation: 'El artículo 46 de la Ley 1/2016 establece de forma clara la prohibición de poseer fondos en paraísos fiscales para todos los altos cargos regulados por la norma.',
    whys: ['Es correcta: recoge la prohibición financiera respecto a paraísos fiscales del artículo 46.', 'No se impone la inversión obligatoria de ahorros en deuda pública de Galicia.', 'No se impide la obtención ordinaria de hipotecas bancarias en España.', 'No se exige declarar compras cotidianas de bienes de consumo común.']
  }
];

// Perform updates in app.js
let updatedCount = 0;
for (const q of newQuestions) {
  const idStr = `id: '${q.id}'`;
  const idIndex = appContent.indexOf(idStr);
  if (idIndex === -1) {
    console.error(`ID not found: ${q.id}`);
    continue;
  }

  const startBraceIndex = appContent.lastIndexOf('{', idIndex);

  let openBraces = 0;
  let endBraceIndex = -1;
  for (let i = startBraceIndex; i < appContent.length; i++) {
    if (appContent[i] === '{') {
      openBraces++;
    } else if (appContent[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        endBraceIndex = i;
        break;
      }
    }
  }

  if (endBraceIndex === -1) {
    console.error(`Closing brace not found for ${q.id}`);
    continue;
  }

  const escapeStr = (str) => str.replace(/'/g, "\\'");
  const optionsStr = '[' + q.options.map(opt => `['${opt[0]}', '${escapeStr(opt[1])}']`).join(', ') + ']';
  const whysStr = '[' + q.whys.map(why => `'${escapeStr(why)}'`).join(', ') + ']';

  const newBlock = `{
    id: '${q.id}', quality: 'Verificada y reformulada', topic: '${q.topic}', source: '${q.source}', sourceUrl: ${q.sourceUrl},
    text: '${escapeStr(q.text)}',
    options: ${optionsStr}, correct: ${q.correct},
    explanation: '${escapeStr(q.explanation)}',
    whys: ${whysStr}
  }`;

  appContent = appContent.substring(0, startBraceIndex) + newBlock + appContent.substring(endBraceIndex + 1);
  updatedCount++;
}

if (updatedCount === newQuestions.length) {
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log(`SUCCESS: All ${updatedCount} questions updated in app.js!`);
  process.exit(0);
} else {
  console.error(`ERROR: Only ${updatedCount} out of ${newQuestions.length} questions were found and updated.`);
  process.exit(1);
}
