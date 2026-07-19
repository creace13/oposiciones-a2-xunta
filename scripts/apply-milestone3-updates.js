const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newQuestions = [
  // ==========================================
  // Patrimonio de Galicia (14 questions)
  // ==========================================
  {
    id: 'troncal-patrimonio-30',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 2.2',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Conforme al artículo 2.2 de la Ley 6/2023, de 2 de noviembre, del patrimonio de la Comunidad Autónoma de Galicia, ¿qué recursos quedan excluidos del concepto de patrimonio de la Comunidad Autónoma a los solos efectos de esta ley?',
    options: [
      ['A', 'El dinero y demás recursos financieros de su hacienda, así como los recursos que constituyen la tesorería de sus entidades públicas instrumentales.'],
      ['B', 'Los derechos de propiedad intelectual e industrial que correspondan a las administraciones públicas.'],
      ['C', 'Los bienes y derechos adquiridos a título de sucesión legal abintestato o intestada.'],
      ['D', 'Los valores y títulos representativos de acciones en el capital de sociedades mercantiles autonómicas.']
    ],
    correct: 0,
    explanation: 'El artículo 2.2 de la Ley 6/2023 establece explícitamente que no se entienden incluidos en el patrimonio de la Comunidad Autónoma, a los solos efectos de esta ley, el dinero y demás recursos financieros de su hacienda ni los recursos de tesorería de sus entidades públicas instrumentales.',
    whys: [
      'Es correcta: el artículo 2.2 de la Ley 6/2023 excluye expresamente del concepto de patrimonio el dinero y demás recursos financieros de su hacienda, y los recursos que constituyen la tesorería de las entidades públicas instrumentales.',
      'Es incorrecta: los derechos de propiedad incorporal (intelectual e industrial) sí se consideran bienes patrimoniales según el artículo 2.5.c.',
      'Es incorrecta: los bienes y derechos adquiridos por sucesión abintestato tienen carácter de bienes patrimoniales según el artículo 2.5.d.',
      'Es incorrecta: las acciones y valores mobiliarios son bienes patrimoniales conforme al artículo 2.5.b.'
    ]
  },
  {
    id: 'troncal-patrimonio-34',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 2.4',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 2.4 de la Ley 6/2023, ¿cuál de los siguientes bienes tiene la consideración legal de bien demanial o de dominio público por ministerio de la ley?',
    options: [
      ['A', 'Los inmuebles de titularidad de la Administración general de la Comunidad Autónoma o de sus entidades instrumentales en los que se alojen los servicios, oficinas o dependencias de sus órganos.'],
      ['B', 'Los derechos de arrendamiento y otros de carácter personal de la Comunidad Autónoma.'],
      ['C', 'Los valores y títulos representativos de acciones en el capital de sociedades mercantiles autonómicas.'],
      ['D', 'Los bienes adquiridos a título de sucesión legal abintestato o intestada.']
    ],
    correct: 0,
    explanation: 'El artículo 2.4 de la Ley 6/2023 dispone que son bienes demaniales los inmuebles de titularidad autonómica en los que se alojen los servicios, oficinas o dependencias de sus órganos o de los órganos estatutarios de la Comunidad Autónoma.',
    whys: [
      'Es correcta: el artículo 2.4 de la Ley 6/2023 atribuye carácter demanial directamente a los inmuebles autonómicos destinados al alojamiento de sus servicios, oficinas o dependencias.',
      'Es incorrecta: los derechos de arrendamiento y de carácter personal se clasifican como patrimoniales según el artículo 2.5.a.',
      'Es incorrecta: las acciones y valores son bienes patrimoniales según el artículo 2.5.b.',
      'Es incorrecta: los bienes procedentes de sucesión intestada son patrimoniales según el artículo 2.5.d.'
    ]
  },
  {
    id: 'troncal-patrimonio-47',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 195.4',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'De acuerdo con el artículo 195.4 de la Ley 6/2023, ¿cuál es la naturaleza jurídica y eficacia del Inventario general de bienes y derechos de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'No tiene la consideración de registro público, sus datos constituyen información de apoyo para la gestión interna y no surten efectos frente a terceros.'],
      ['B', 'Es un registro público de carácter registral y sus datos surten plenos efectos constitutivos frente a terceros.'],
      ['C', 'Es un instrumento que sustituye la inscripción obligatoria en el Registro de la Propiedad para todos los bienes demaniales.'],
      ['D', 'Es un registro público de acceso general y carácter administrativo que da fe pública del dominio y posesión de los bienes.']
    ],
    correct: 0,
    explanation: 'El artículo 195.4 de la Ley 6/2023 establece explícitamente que el Inventario no tiene consideración de registro público, sirve de apoyo interno y no surte efectos frente a terceros.',
    whys: [
      'Es correcta: el artículo 195.4 de la Ley 6/2023 establece explícitamente que el Inventario no tiene consideración de registro público, sirve de apoyo interno y no surte efectos frente a terceros.',
      'Es incorrecta: niega la naturaleza de registro público y el efecto constitutivo frente a terceros.',
      'Es incorrecta: no sustituye al Registro de la Propiedad, cuya inscripción es independiente y obligatoria según las normas patrimoniales.',
      'Es incorrecta: no es un registro público ni tiene la función de dar fe pública de dominio.'
    ]
  },
  {
    id: 'troncal-patrimonio-75',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 193.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Conforme al artículo 193.1 de la Ley 6/2023, ¿cuál de las siguientes opciones describe una obligación específica de la Administración general y sus entidades públicas instrumentales para la protección y defensa de su patrimonio?',
    options: [
      ['A', 'Investigar e inventariar los bienes y derechos que lo integran, promover inscripciones registrales y ejercer las potestades administrativas y judiciales pertinentes.'],
      ['B', 'Limitar la defensa de sus bienes patrimoniales al arbitraje obligatorio ante el Consejo Consultivo de Galicia.'],
      ['C', 'Enajenar directamente cualquier bien que sea objeto de ocupación por un tercero para evitar litigios judiciales.'],
      ['D', 'Prescindir del inventariado de los bienes muebles que tengan un valor inferior a 100.000 euros.']
    ],
    correct: 0,
    explanation: 'El artículo 193.1 establece que la Administración general de la Comunidad Autónoma y las entidades instrumentales están obligadas a proteger y defender su patrimonio, en particular investigando, inventariando, promoviendo inscripciones y ejerciendo potestades de defensa y acciones judiciales.',
    whys: [
      'Es correcta: el artículo 193.1 detalla explícitamente estas obligaciones de protección y defensa patrimonial (investigar, inventariar, inscribir y defender de forma administrativa y judicial).',
      'Es incorrecta: la ley no limita la defensa al arbitraje y, de hecho, los demaniales no admiten arbitraje o transacción (artículo 5.1).',
      'Es incorrecta: la Administración debe defender sus bienes, no enajenarlos directamente ante perturbaciones o usurpaciones.',
      'Es incorrecta: aunque se excluyen ciertos muebles de escaso valor del inventario general, la ley no establece esa exclusión general como deber de no inventariar ni fija ese límite en el artículo 193.1.'
    ]
  },
  {
    id: 'troncal-patrimonio-103',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 6.3.a',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 6.3.a de la Ley 6/2023, ¿cuánto tiempo debe prolongarse la utilización pública, notoria y continuada de un bien propio por parte de la Administración autonómica para que produzca los mismos efectos que la afectación expresa?',
    options: [
      ['A', 'Durante un año.'],
      ['B', 'Durante dos años ininterrumpidos.'],
      ['C', 'Durante cinco años consecutivos.'],
      ['D', 'Durante diez años, de forma análoga a la usucapión civil ordinaria.']
    ],
    correct: 0,
    explanation: 'El artículo 6.3.a establece que la utilización pública, notoria y continuada durante un año de bienes propios para un uso general o servicio público produce los mismos efectos que la afectación expresa.',
    whys: [
      'Es correcta: el artículo 6.3.a establece que la utilización notoria y continuada durante un año de bienes propios para uso o servicio público produce efectos de afectación.',
      'Es incorrecta: el plazo legal establecido por el artículo 6.3.a es de un año, no de dos.',
      'Es incorrecta: la norma exige un año de utilización continuada, no de cinco.',
      'Es incorrecta: no se asimila al plazo civil de diez años, sino que se fija específicamente en un año.'
    ]
  },
  {
    id: 'troncal-patrimonio-116',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 4.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 4.1 de la Ley 6/2023, ¿a qué órgano corresponde, con carácter general, el ejercicio de las facultades derivadas de la titularidad dominical del patrimonio de la Administración general de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'A la consejería competente en materia de patrimonio.'],
      ['B', 'Exclusivamente al Presidente de la Xunta de Galicia mediante decreto presidencial.'],
      ['C', 'Al Consello de la Xunta de Galicia de forma colegiada y mancomunada.'],
      ['D', 'Al Parlamento de Galicia mediante acuerdo de su Mesa.']
    ],
    correct: 0,
    explanation: 'El artículo 4.1 establece que las facultades de titularidad dominical corresponden de forma general a la consejería competente en materia de patrimonio, a menos que por ley se atribuyeran a otro órgano.',
    whys: [
      'Es correcta: el artículo 4.1 atribuye con carácter general estas facultades de titularidad dominical a la consejería competente en materia de patrimonio.',
      'Es incorrecta: no corresponde al Presidente por decreto prescribir la gestión patrimonial ordinaria.',
      'Es incorrecta: el Consello de la Xunta tiene competencias autorizatorias específicas, pero la competencia dominical general es de la consejería competente.',
      'Es incorrecta: el Parlamento ejerce función legislativa y de control, no las facultades de gestión dominical ordinaria de la Administración general.'
    ]
  },
  {
    id: 'troncal-patrimonio-148',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 5.2.a',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'De acuerdo con el artículo 5.2 de la Ley 6/2023, ¿en qué supuesto se excluyen los bienes patrimoniales de la Comunidad Autónoma de Galicia de las providencias de embargo dictadas por los órganos jurisdiccionales?',
    options: [
      ['A', 'Cuando se hallen materialmente afectados a un uso, servicio o función pública.'],
      ['B', 'En todos los casos, dado que los bienes patrimoniales gozan de inmunidad absoluta de embargo al igual que los demaniales.'],
      ['C', 'Únicamente cuando su valor unitario en el Inventario General sea superior a los 300.000 euros.'],
      ['D', 'Cuando hayan sido adquiridos por herencia intestada y falte la liquidación del neto hereditario.']
    ],
    correct: 0,
    explanation: 'El artículo 5.2.a establece que los bienes y derechos patrimoniales se excluyen de embargo o ejecución judicial cuando se hallaran materialmente afectados a un uso, servicio o función pública.',
    whys: [
      'Es correcta: el artículo 5.2.a excluye de embargo los bienes patrimoniales que estén materialmente afectados a un uso, servicio o función pública.',
      'Es incorrecta: los bienes patrimoniales no tienen inmunidad de embargo automática e ilimitada; solo en los supuestos tasados del artículo 5.2.',
      'Es incorrecta: la ley no condiciona la inembargabilidad de los patrimoniales a un valor cuantitativo mínimo.',
      'Es incorrecta: la adquisición abintestato no es un supuesto genérico de exclusión de embargo bajo el artículo 5.2.'
    ]
  },
  {
    id: 'troncal-patrimonio-171',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 195.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 195.1 de la Ley 6/2023, ¿qué información debe incorporarse obligatoriamente al Inventario general de bienes y derechos de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'Los datos necesarios para la identificación de los bienes y los que reflejen su situación jurídica, limitaciones de disposición y destino o uso.'],
      ['B', 'Los nombres y datos de contacto de todo el personal que trabaja físicamente en los inmuebles públicos.'],
      ['C', 'Las copias autorizadas de los contratos laborales de las personas arrendatarias del sector público.'],
      ['D', 'El registro diario de visitas y accesos de público a los museos y archivos de la Comunidad Autónoma.']
    ],
    correct: 0,
    explanation: 'El artículo 195.1 establece que el Inventario general es el instrumento de apoyo en el que se deja constancia de todos los bienes y derechos, incorporando datos de identificación, situación jurídica, limitaciones y destino o uso.',
    whys: [
      'Es correcta: el artículo 195.1 establece literalmente que debe incorporar los datos de identificación, situación jurídica, limitaciones y destino o uso.',
      'Es incorrecta: los datos del personal de los inmuebles no forman parte del Inventario general de bienes y derechos.',
      'Es incorrecta: la información laboral de arrendatarios no es contenido propio de este Inventario general.',
      'Es incorrecta: el control de visitas no se gestiona en este Inventario.'
    ]
  },
  {
    id: 'troncal-patrimonio-194',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 5.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 5.1 de la Ley 6/2023, ¿qué características definen a los bienes y derechos de dominio público de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'Pueden ser objeto de gravamen, transacción y arbitraje por razones de urgencia.'],
      ['B', 'Son inalienables, imprescriptibles e inembargables, no pudiendo ser objeto de gravamen, carga, afección, transacción o arbitraje.'],
      ['C', 'Son embargables en ejecución judicial si están destinados al uso general de los ciudadanos.'],
      ['D', 'Prescriben y pueden adquirirse por terceros si son poseídos de buena fe durante diez años.']
    ],
    correct: 1,
    explanation: 'El artículo 5.1 de la Ley 6/2023 consagra las notas tradicionales de protección demanial: son inalienables, imprescriptibles e inembargables, excluyendo gravámenes, transacciones o arbitrajes.',
    whys: [
      'Es incorrecta: el artículo 5.1 prohíbe expresamente que los bienes demaniales sean objeto de gravamen o arbitraje.',
      'Es correcta: coincide literalmente con las notas definitorias del régimen demanial y las exclusiones previstas en el artículo 5.1.',
      'Es incorrecta: los bienes demaniales son inembargables de forma absoluta por ley.',
      'Es incorrecta: al ser imprescriptibles, no pueden ser adquiridos por prescripción adquisitiva por terceros.'
    ]
  },
  {
    id: 'troncal-patrimonio-207',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 6.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 6.1 de la Ley 6/2023, ¿cuál es el efecto jurídico principal que determina la afectación de un bien patrimonial autonómico?',
    options: [
      ['A', 'La vinculación del bien a un uso general o a un servicio público de competencia autonómica, e integración en el dominio público.'],
      ['B', 'La enajenación forzosa del bien a favor de entidades del sector público estatal o local.'],
      ['C', 'La conversión de un bien demanial en bien patrimonial para posibilitar su arrendamiento.'],
      ['D', 'El devengo automático de tasas e impuestos locales sobre la superficie construida del inmueble.']
    ],
    correct: 0,
    explanation: 'El artículo 6.1 establece que la afectación vincula bienes patrimoniales a un uso general o servicio público autonómico, integrándolos en el dominio público.',
    whys: [
      'Es correcta: conforme al artículo 6.1, la afectación vincula el bien patrimonial a un uso general o servicio público, integrándolo en el demanio.',
      'Es incorrecta: la afectación no es una enajenación ni transfiere la propiedad a otras administraciones.',
      'Es incorrecta: la conversión de demanial a patrimonial es la desafectación, no la afectación.',
      'Es incorrecta: la afectación no tiene por objeto regular tributos locales.'
    ]
  },
  {
    id: 'troncal-patrimonio-220',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 11.1 y 11.2',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 11 de la Ley 6/2023, ¿cuál es el efecto jurídico de la desafectación de un bien de dominio público y de qué forma debe realizarse como regla general?',
    options: [
      ['A', 'Determina que el bien pierda su condición demanial, adquiriendo la de patrimonial por dejar de destinarse a un uso general o servicio público, y debe realizarse de forma expresa.'],
      ['B', 'Determina la pérdida de propiedad de la Comunidad Autónoma y debe realizarse de forma tácita por el transcurso de un año sin uso público.'],
      ['C', 'Convierte el bien demanial en bien de uso general municipal y se realiza mediante resolución de la alcaldía correspondiente.'],
      ['D', 'Extingue los derechos de propiedad incorporal y se realiza de forma presunta tras la aprobación de los presupuestos anuales.']
    ],
    correct: 0,
    explanation: 'El artículo 11.1 y 11.2 indica que los bienes demaniales desafectados pasan a ser patrimoniales al dejar su fin público, y que debe hacerse siempre de forma expresa (salvo excepciones legales).',
    whys: [
      'Es correcta: el artículo 11.1 y 11.2 indica que los bienes demaniales desafectados pasan a ser patrimoniales al dejar su fin público, y que debe hacerse siempre de forma expresa.',
      'Es incorrecta: no supone perder la propiedad, sino que cambia su régimen a patrimonial; además, la desafectación no es tácita por regla general.',
      'Es incorrecta: no transfiere la propiedad a los municipios ni interviene la alcaldía.',
      'Es incorrecta: no extingue derechos ni es presunta por la ley presupuestaria.'
    ]
  },
  {
    id: 'troncal-patrimonio-233',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 65.1',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 65.1 de la Ley 6/2023, ¿cuál es el instrumento formal necesario para la adquisición a título oneroso de bienes inmuebles por parte de la Administración general de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'Una orden de la persona titular de la consejería competente en materia de patrimonio.'],
      ['B', 'Un acuerdo verbal ratificado por el director de la Tesorería general autonómica.'],
      ['C', 'Un decreto firmado por el Presidente de la Xunta de Galicia en Consejo de la Xunta.'],
      ['D', 'Una resolución administrativa dictada exclusivamente por los delegados territoriales periféricos.']
    ],
    correct: 0,
    explanation: 'El artículo 65.1 establece que en la Administración general de la Comunidad Autónoma de Galicia la competencia para adquirir a título oneroso bienes inmuebles y derechos sobre estos corresponde, mediante orden, a la persona titular de la consejería competente en materia de patrimonio.',
    whys: [
      'Es correcta: el artículo 65.1 establece explícitamente que la adquisición onerosa de inmuebles se realiza mediante orden de la persona titular de la consejería competente en materia de patrimonio.',
      'Es incorrecta: las adquisiciones onerosas no se deciden por acuerdo verbal ni son competencia de la Tesorería.',
      'Es incorrecta: el Consejo de la Xunta solo autoriza adquisiciones superiores a tres millones de euros o en el extranjero, pero el instrumento ordinario es la orden del titular de la consejería (artículos 65.1 y 65.3).',
      'Es incorrecta: la competencia general es del titular de la consejería competente en materia de patrimonio, no de los delegados territoriales.'
    ]
  },
  {
    id: 'troncal-patrimonio-246',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 227.3',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 227.3 de la Ley 6/2023, ¿cuál es el plazo máximo para notificar la iniciación del procedimiento de recuperación de la posesión en vía administrativa si se trata de bienes patrimoniales?',
    options: [
      ['A', 'Antes de que transcurra el plazo de un año, a contar desde el día siguiente al de la usurpación.'],
      ['B', 'En cualquier momento, ya que la potestad de recuperación de oficio es imprescriptible para todo tipo de bienes.'],
      ['C', 'En el plazo máximo de tres meses desde que se tenga conocimiento formal de la usurpación.'],
      ['D', 'Únicamente dentro del mismo ejercicio presupuestario en que se produjo la ocupación indebida.']
    ],
    correct: 0,
    explanation: 'El artículo 227.3 establece que para bienes patrimoniales, la recuperación de la posesión en vía administrativa requiere que la iniciación del procedimiento hubiera sido notificada antes de que transcurriese el plazo de un año, a contar desde el día siguiente al de la usurpación.',
    whys: [
      'Es correcta: el artículo 227.3 exige que el procedimiento de recuperación en vía administrativa de bienes patrimoniales se notifique antes del plazo de un año desde la usurpación.',
      'Es incorrecta: la potestad imprescriptible en cualquier momento se reserva para los demaniales (artículo 227.2); los patrimoniales tienen el límite de un año.',
      'Es incorrecta: la ley establece un plazo de un año a partir de la usurpación, no de tres meses.',
      'Es incorrecta: la anualidad presupuestaria no influye en la prescripción de esta potestad de recuperación posesoria.'
    ]
  },
  {
    id: 'troncal-patrimonio-253',
    quality: 'Verificada y reformulada · DOG 13/11/2023',
    topic: 'Troncal estatal',
    source: 'Ley 6/2023, art. 40.3.b',
    sourceUrlStr: 'officialSources.patrimonyGalicia',
    text: 'Según el artículo 40.3 de la Ley 6/2023, ¿bajo qué condición el uso privativo de un bien destinado al uso general demanial requerirá obligatoriamente de una concesión administrativa (en lugar de una autorización)?',
    options: [
      ['A', 'Cuando la ocupación se efectúe con obras o instalaciones fijas o por un plazo inicial superior a cuatro años.'],
      ['B', 'Cuando el uso privativo se destine exclusivamente a entidades públicas instrumentales del sector autonómico.'],
      ['C', 'Cuando el valor estimado del aprovechamiento demanial supere los 100.000 euros anuales.'],
      ['D', 'Siempre que la ocupación se realice únicamente con bienes muebles o instalaciones desmontables.']
    ],
    correct: 0,
    explanation: 'El artículo 40.3.b dispone que el uso privativo estará sujeto a concesión cuando la ocupación se efectuara con obras o instalaciones fijas o por plazo inicial superior a cuatro años.',
    whys: [
      'Es correcta: el artículo 40.3.b exige expresamente concesión cuando el uso privativo demanial cuente con obras/instalaciones fijas o exceda el plazo inicial de cuatro años.',
      'Es incorrecta: la naturaleza del sujeto beneficiario no determina la concesión frente a la autorización bajo el artículo 40.3.',
      'Es incorrecta: la ley no establece ese umbral de cuantía económica para diferenciar la exigencia de concesión.',
      'Es incorrecta: si la ocupación es desmontable y menor de cuatro años, requiere autorización demanial, no concesión.'
    ]
  },

  // ==========================================
  // Régimen financiero (14 questions)
  // ==========================================
  {
    id: 'troncal-financiero-31',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 1.1',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 1.1 del texto refundido aprobado por el Decreto legislativo 1/1999, ¿de qué elementos está constituida la Hacienda pública de Galicia?',
    options: [
      ['A', 'Por el conjunto de derechos y obligaciones de contenido económico y financiero cuya titularidad le corresponde a la Comunidad Autónoma de Galicia.'],
      ['B', 'Exclusivamente por los tributos propios que recaude la Administración tributaria de Galicia en cada ejercicio anual.'],
      ['C', 'Por todos los bienes patrimoniales y demaniales de las corporaciones locales de Galicia.'],
      ['D', 'Por los fondos y depósitos bancarios de titularidad privada de los ciudadanos gallegos.']
    ],
    correct: 0,
    explanation: 'El artículo 1.1 establece textualmente que la Hacienda pública está constituida por el conjunto de derechos y obligaciones de contenido económico y financiero cuya titularidad corresponda a la Comunidad Autónoma.',
    whys: [
      'Es correcta: el artículo 1.1 establece textualmente que la Hacienda pública está constituida por el conjunto de derechos y obligaciones de contenido económico y financiero cuya titularidad corresponda a la Comunidad Autónoma.',
      'Es incorrecta: los tributos son solo una parte de los ingresos, no la Hacienda pública en su conjunto.',
      'Es incorrecta: las corporaciones locales tienen sus propias haciendas locales independientes de la Hacienda autonómica.',
      'Es incorrecta: los fondos privados de los ciudadanos no forman parte de la Hacienda pública de la Comunidad Autónoma.'
    ]
  },
  {
    id: 'troncal-financiero-37',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 3.3',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 3.3 del Decreto legislativo 1/1999, ¿cuál es el orden supletorio de aplicación para la regulación de la actividad económico-financiera de la Comunidad Autónoma de Galicia en defecto de su propia normativa?',
    options: [
      ['A', 'Las demás normas del ordenamiento administrativo y, en su defecto, el derecho privado respetando la prelación de las normas del derecho civil gallego.'],
      ['B', 'El derecho mercantil común de forma directa, seguido por el Código civil común sin tener en cuenta el derecho foral.'],
      ['C', 'Las normas procesales de la jurisdicción contencioso-administrativa estatal y las leyes penales.'],
      ['D', 'La ley anual de presupuestos del Estado, de manera prioritaria y excluyente de cualquier derecho civil local.']
    ],
    correct: 0,
    explanation: 'El artículo 3.3 establece expresamente la supletoriedad de las normas administrativas y, en su defecto, el derecho privado respetando la prelación de normas de derecho civil gallego.',
    whys: [
      'Es correcta: el artículo 3.3 establece expresamente la supletoriedad de las normas administrativas y, en su defecto, el derecho privado respetando el derecho civil gallego.',
      'Es incorrecta: ignora la supletoriedad del derecho administrativo general y del derecho civil gallego.',
      'Es incorrecta: las normas procesales o penales no actúan como derecho supletorio de la actividad económica ordinaria.',
      'Es incorrecta: los presupuestos generales del Estado no actúan como derecho supletorio de la actividad autonómica bajo el artículo 3.3.'
    ]
  },
  {
    id: 'troncal-financiero-50',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 4.3',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Conforme al artículo 4.3 del Decreto legislativo 1/1999, ¿cuál es el órgano encargado de la ejecución de las funciones de control interno y de contabilidad de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'La Intervención General de la Comunidad Autónoma de Galicia.'],
      ['B', 'El Consello de Contas de Galicia.'],
      ['C', 'El Tribunal de Cuentas del Estado.'],
      ['D', 'El Consejo Consultivo de Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 4.3 atribuye la ejecución de las funciones de control interno y de contabilidad a la Intervención General de la Comunidad Autónoma.',
    whys: [
      'Es correcta: el artículo 4.3 atribuye la ejecución de las funciones de control interno y de contabilidad a la Intervención General de la Comunidad Autónoma.',
      'Es incorrecta: el Consello de Contas ejerce fiscalización y control externo de las cuentas, no la ejecución del control interno ni la contabilidad ordinaria.',
      'Es incorrecta: el Tribunal de Cuentas es el órgano supremo de control externo a nivel estatal, no el encargado del control interno autonómico.',
      'Es incorrecta: el Consejo Consultivo es un órgano consultivo de asesoramiento jurídico, sin atribuciones contables o de intervención.'
    ]
  },
  {
    id: 'troncal-financiero-78',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 94.1',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 94.1 del Decreto legislativo 1/1999, ¿a través de qué modalidades específicas se realiza el ejercicio del control interno de la actividad económico-financiera?',
    options: [
      ['A', 'A través de la función interventora y del control financiero.'],
      ['B', 'Únicamente por medio de la fiscalización externa del Consello de Contas de Galicia.'],
      ['C', 'Exclusivamente mediante la auditoría de cuentas privada a cargo de auditores externos inscritos.'],
      ['D', 'Mediante la previa revisión parlamentaria anual realizada por la Comisión de Economía del Parlamento.']
    ],
    correct: 0,
    explanation: 'El artículo 94.1 del Decreto legislativo 1/1999 determina que el control interno se realiza a través de dos modalidades específicas: la función interventora y el control financiero.',
    whys: [
      'Es correcta: el artículo 94.1 establece textualmente que el control interno se realiza a través de la función interventora y del control financiero.',
      'Es incorrecta: el Consello de Contas realiza control externo de fiscalización, no el control interno regulado en el artículo 94.1.',
      'Es incorrecta: no se realiza por medio de auditorías de firmas privadas como modal de control de control interno.',
      'Es incorrecta: la comisión parlamentaria ejerce control político, no la función de control interno.'
    ]
  },
  {
    id: 'troncal-financiero-106',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 56.2',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 56.2 del Decreto legislativo 1/1999, ¿cuál es, con carácter general, el nivel en el que los créditos autorizados en los programas de gastos tienen carácter limitativo y vinculante?',
    options: [
      ['A', 'A nivel de concepto, salvo los gastos de personal (excepto incentivos al rendimiento) y bienes corrientes y servicios, que vinculan a nivel de artículo.'],
      ['B', 'A nivel de capítulo en todos los casos, independientemente de la naturaleza económica del gasto.'],
      ['C', 'A nivel de subconcepto de forma obligatoria y sin posibilidad de realizar transferencias de crédito.'],
      ['D', 'A nivel de programa de gasto únicamente, quedando exento el desglose económico de cualquier vinculación.']
    ],
    correct: 0,
    explanation: 'El artículo 56.2 prescribe que los créditos autorizados en los programas de gastos tienen carácter limitativo y vinculante a nivel de concepto, con la salvedad de los gastos de personal ordinarios y gastos corrientes que vinculan a nivel de artículo.',
    whys: [
      'Es correcta: el artículo 56.2 prescribe que los créditos vinculan a nivel de concepto, excepto gastos de personal ordinarios y gastos corrientes que lo hacen a nivel de artículo.',
      'Es incorrecta: la vinculación general es a nivel de concepto, no de capítulo.',
      'Es incorrecta: no vincula a nivel de subconcepto como regla de vinculación legal general establecida en el artículo 56.2.',
      'Es incorrecta: la limitación y vinculación económica sí vincula a nivel de concepto y artículo, no solo a nivel de programa.'
    ]
  },
  {
    id: 'troncal-financiero-119',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 46.1',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Conforme al artículo 46.1 del Decreto legislativo 1/1999, ¿de qué constituyen expresión cifrada, conjunta y sistemática los presupuestos generales de la Comunidad Autónoma?',
    options: [
      ['A', 'De las obligaciones que se puedan reconocer y derechos a liquidar por la Comunidad y organismos autónomos, sus objetivos financieros, estimaciones de flujos de sociedades públicas, gastos e ingresos de otros entes y beneficios fiscales estimados.'],
      ['B', 'Únicamente de los ingresos y recursos financieros obtenidos a través de transferencias estatales y fondos europeos durante un ejercicio.'],
      ['C', 'De los acuerdos bilaterales de financiación firmados entre la Xunta de Galicia y el Ministerio de Hacienda del Gobierno central.'],
      ['D', 'De las directrices políticas generales y de los convenios internacionales suscritos por el Presidente de la Comunidad Autónoma.']
    ],
    correct: 0,
    explanation: 'El artículo 46.1 detalla que los presupuestos generales son la expresión cifrada, conjunta y sistemática de todos los elementos enumerados (obligaciones, derechos, objetivos, flujos de sociedades públicas, otros entes y beneficios fiscales).',
    whys: [
      'Es correcta: el artículo 46.1 detalla que los presupuestos generales son la expresión cifrada, conjunta y sistemática de todos los elementos enumerados (obligaciones, derechos, objetivos, flujos de sociedades públicas, otros entes y beneficios fiscales).',
      'Es incorrecta: el presupuesto incluye también obligaciones, estimaciones de sociedades públicas, beneficios fiscales y otros ingresos propios, no solo transferencias.',
      'Es incorrecta: no consiste únicamente en acuerdos de financiación bilaterales.',
      'Es incorrecta: los convenios internacionales no forman el contenido del presupuesto general definido en el artículo 46.1.'
    ]
  },
  {
    id: 'troncal-financiero-151',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 57.1',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 57.1 del Decreto legislativo 1/1999, ¿cuál es la consecuencia jurídica para los actos administrativos que adquieran compromisos de gastos por cuantía superior al importe de los créditos consignados en los presupuestos?',
    options: [
      ['A', 'Son nulos de pleno derecho, sin perjuicio de las responsabilidades a que haya lugar.'],
      ['B', 'Son simplemente anulables, pudiendo ser convalidados a posteriori por orden del conselleiro de Hacienda.'],
      ['C', 'Son plenamente válidos y eficaces, devengando automáticamente un crédito extraordinario extrapresupuestario.'],
      ['D', 'Quedan suspendidos temporalmente hasta la aprobación del siguiente ejercicio presupuestario anual.']
    ],
    correct: 0,
    explanation: 'El artículo 57.1 declara la nulidad de pleno derecho de los actos administrativos y las disposiciones con rango inferior a ley que infrinjan la norma de no adquirir compromisos por cuantía superior a los créditos presupuestados.',
    whys: [
      'Es correcta: el artículo 57.1 declara de forma expresa la nulidad de pleno derecho de los actos y disposiciones que comprometan gastos por encima de los créditos.',
      'Es incorrecta: la consecuencia legal es la nulidad de pleno derecho, no la mera anulabilidad.',
      'Es incorrecta: la infracción del límite produce nulidad radical del acto, no su validez o convalidación.',
      'Es incorrecta: no se suspende temporalmente en espera del siguiente ejercicio presupuestario.'
    ]
  },
  {
    id: 'troncal-financiero-174',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 47',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 47 del Decreto legislativo 1/1999, ¿cuáles son los criterios de imputación temporal al correspondiente ejercicio presupuestario anual para los derechos y las obligaciones?',
    options: [
      ['A', 'Se imputan los derechos liquidados en el transcurso del mismo (cualquiera que sea su periodo de origen) y las obligaciones reconocidas hasta el 31 de diciembre del ejercicio.'],
      ['B', 'Se imputan los derechos recaudados efectivamente y las obligaciones devengadas materialmente durante el primer semestre únicamente.'],
      ['C', 'Se imputan únicamente los derechos y obligaciones generados en ejercicios anteriores que hayan sido objeto de aplazamiento formal.'],
      ['D', 'Se imputan exclusivamente los derechos y obligaciones liquidados y reconocidos en días hábiles del tercer trimestre del ejercicio económico.']
    ],
    correct: 0,
    explanation: 'El artículo 47 prescribe que al ejercicio presupuestario se imputan los derechos liquidados en el transcurso del mismo (cualquiera que sea su periodo de origen) y las obligaciones reconocidas hasta el 31 de diciembre.',
    whys: [
      'Es correcta: el artículo 47 prescribe que al ejercicio presupuestario se imputan los derechos liquidados en el transcurso del mismo y las obligaciones reconocidas hasta el 31 de diciembre.',
      'Es incorrecta: la imputación es para todo el ejercicio anual ordinario, no reducida al primer semestre.',
      'Es incorrecta: la imputación es general y corriente, no limitada a deudas aplazadas de ejercicios anteriores.',
      'Es incorrecta: el cómputo del año natural no tiene restricciones por trimestres o días hábiles.'
    ]
  },
  {
    id: 'troncal-financiero-197',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 5',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 5 del Decreto legislativo 1/1999, ¿cuál de las siguientes materias debe regularse necesariamente mediante una ley del Parlamento de Galicia?',
    options: [
      ['A', 'La emisión y el régimen de la deuda pública, así como el establecimiento, modificación o supresión de tributos propios.'],
      ['B', 'La aprobación de los manuales de procedimiento interno e instrucciones de contabilidad pública de la Intervención General.'],
      ['C', 'El nombramiento del Interventor General de la Comunidad Autónoma y del Tesorero general.'],
      ['D', 'La fijación de las tarifas del transporte público interurbano y de las tasas de los museos autonómicos.']
    ],
    correct: 0,
    explanation: 'El artículo 5 establece reserva de ley parlamentaria para materias cruciales de la Hacienda, incluyendo presupuestos, tributos propios, deuda pública, patrimonio, organismos autónomos y avales.',
    whys: [
      'Es correcta: el artículo 5.d y 5.b establece de forma explícita la reserva de ley para la deuda pública y los tributos propios autonómicos.',
      'Es incorrecta: la aprobación de manuales e instrucciones contables de rango de control interno no tiene rango ni reserva de ley.',
      'Es incorrecta: el nombramiento de altos cargos no cuenta con reserva de ley autonómica bajo el artículo 5.',
      'Es incorrecta: las tarifas del transporte público o tasas específicas de museos no cuentan con reserva de ley en este artículo.'
    ]
  },
  {
    id: 'troncal-financiero-210',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 73.a.3',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 73.a.3 del Decreto legislativo 1/1999, ¿en qué consiste la fase del gasto de "reconocimiento de la obligación"?',
    options: [
      ['A', 'En la operación de contraer en cuentas los créditos exigibles contra la Comunidad de Galicia derivados de un compromiso previo, una vez realizada y justificada la contraprestación.'],
      ['B', 'En el acto por el que la autoridad competente acuerda provisionalmente la realización de un gasto futuro de cuantía indeterminada.'],
      ['C', 'En la expedición formal de la orden de pago contra la Tesorería de la Comunidad a favor del acreedor respectivo.'],
      ['D', 'En el acto por el cual se concierta y determina la cuantía concreta del compromiso económico inicial con un tercero.']
    ],
    correct: 0,
    explanation: 'El artículo 73.a.3 define el reconocimiento de la obligación como la contraición en cuentas de los créditos exigibles contra la Comunidad una vez realizada y justificada la correspondiente prestación.',
    whys: [
      'Es correcta: el artículo 73.a.3 define el reconocimiento de la obligación como la contraición en cuentas de los créditos exigibles tras realizar y justificar la prestación.',
      'Es incorrecta: esta es la definición aproximada de la fase de "autorización del gasto" (artículo 73.a.1).',
      'Es incorrecta: esta corresponde a la fase de "ordenación del pago" (artículo 73.a.4).',
      'Es incorrecta: esta define la fase de "disposición" del gasto (artículo 73.a.2).'
    ]
  },
  {
    id: 'troncal-financiero-223',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 62.1',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 62.1 del Decreto legislativo 1/1999, ¿cuál es el instrumento legal necesario y la figura presupuestaria aplicable para realizar un gasto urgente que no puede demorarse y para el cual no existe crédito presupuestario?',
    options: [
      ['A', 'Un proyecto de ley remitido al Parlamento para la concesión de un crédito extraordinario.'],
      ['B', 'Una orden directa del conselleiro de Hacienda que apruebe un suplemento de crédito extrapresupuestario.'],
      ['C', 'Una instrucción de la Intervención General de la Xunta que acuerde una transferencia de crédito demanial.'],
      ['D', 'Un decreto del Presidente de la Xunta de Galicia que autorice un anticipo extrapresupuestario del 10%.']
    ],
    correct: 0,
    explanation: 'El artículo 62.1 prevé que cuando no exista crédito para un gasto inaplazable, se debe someter a la Xunta para su envío al Parlamento un proyecto de ley de concesión de un crédito extraordinario.',
    whys: [
      'Es correcta: el artículo 62.1 establece que cuando no exista crédito en los estados de gastos, debe someterse un proyecto de ley para la concesión de un crédito extraordinario.',
      'Es incorrecta: el suplemento de crédito se aplica cuando el crédito es insuficiente, no cuando no existe; además, requiere ley parlamentaria, no orden del conselleiro.',
      'Es incorrecta: la Intervención General no concede créditos extraordinarios ni transferencias de crédito mediante instrucciones.',
      'Es incorrecta: la figura del anticipo de Tesorería tiene un límite del 2% y exige otros requisitos (artículo 63).'
    ]
  },
  {
    id: 'troncal-financiero-236',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 94.2',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'De acuerdo con el artículo 94.2 del Decreto legislativo 1/1999, ¿cuál es el objeto principal de la "función interventora" como modalidad de control interno?',
    options: [
      ['A', 'Asegurar que la gestión de los órganos controlados de los que se deriven derechos y obligaciones económicas se ajuste a las disposiciones aplicables en cada caso.'],
      ['B', 'Autorizar discrecionalmente transferencias extrapresupuestarias de crédito de cualquier consellería en base a criterios de oportunidad política.'],
      ['C', 'Realizar una fiscalización externa del rendimiento y cumplimiento global de los planes económicos de la Comunidad Autónoma.'],
      ['D', 'Sustituir a los órganos gestores de la Comunidad Autónoma en la toma de decisiones y en la adjudicación de contratos públicos.']
    ],
    correct: 0,
    explanation: 'El artículo 94.2 define que la función interventora tiene por objeto controlar actos y expedientes para asegurar que la gestión económica se ajuste a las disposiciones vigentes en cada caso.',
    whys: [
      'Es correcta: coincide con el objeto de la función interventora definido en el artículo 94.2, que busca controlar actos y expedientes para asegurar que la gestión económica se ajuste a derecho.',
      'Es incorrecta: la Intervención no autoriza transferencias ni valora criterios de oportunidad política.',
      'Es incorrecta: el control del rendimiento y fiscalización global externa es propio del control externo (Consello de Contas), no de la función interventora de control interno.',
      'Es incorrecta: la función interventora fiscaliza la gestión, pero no sustituye al órgano decisor o gestor administrativo.'
    ]
  },
  {
    id: 'troncal-financiero-247',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 110º',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 110º del Decreto legislativo 1/1999, ¿cuál de los siguientes es un fin específico de la organización de la contabilidad pública a cargo de la Consellería de Economía y Hacienda?',
    options: [
      ['A', 'Registrar la ejecución de los presupuestos, conocer la situación de la Tesorería y proporcionar los datos para la Cuenta General de la Comunidad.'],
      ['B', 'Autorizar la contratación temporal de personal interino y la selección de personal laboral de las consellerías.'],
      ['C', 'Liquidar los tributos demaniales locales de las entidades que ocupen espacios públicos de forma gratuita.'],
      ['D', 'Fiscalizar los planes y proyectos del sector privado gallego para determinar su viabilidad comercial y financiera.']
    ],
    correct: 0,
    explanation: 'El artículo 110º del Decreto legislativo 1/1999 detalla los fines de la contabilidad pública, entre los que destacan el registro del presupuesto, la situación de la Tesorería y de la Cuenta General.',
    whys: [
      'Es correcta: coincide con los fines establecidos en las letras a), b) y d) del artículo 110º del texto refundido.',
      'Es incorrecta: la contratación de personal interino corresponde a la gestión de empleo público y función pública, no a los fines de la contabilidad pública.',
      'Es incorrecta: la liquidación de tributos locales corresponde a las corporaciones locales u otros organismos tributarios, no a la contabilidad pública autonómica.',
      'Es incorrecta: la contabilidad pública no fiscaliza planes comerciales de empresas privadas ajenas a las ayudas o fondos públicos.'
    ]
  },
  {
    id: 'troncal-financiero-254',
    quality: 'Verificada y reformulada · DOG 05/11/1999',
    topic: 'Troncal estatal',
    source: 'Decreto legislativo 1/1999, art. 88º',
    sourceUrlStr: 'officialSources.financeGalicia',
    text: 'Según el artículo 88º del Decreto legislativo 1/1999, ¿cuál de los siguientes es una función propia de la Tesorería de la Comunidad Autónoma de Galicia?',
    options: [
      ['A', 'Instrumentar y servir al principio de unidad de caja, recaudar los recursos y pagar las obligaciones de la Comunidad y de sus organismos autónomos.'],
      ['B', 'Autorizar créditos extraordinarios mediante órdenes circulares en situaciones de demanialidad.'],
      ['C', 'Liquidar los tributos estatales cedidos y resolver las reclamaciones económico-administrativas en vía ordinaria.'],
      ['D', 'Ejercer la fiscalización previa y el control financiero sobre todos los pagos que efectúe la Xunta de Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 88º establece las funciones propias de la Tesorería de la Comunidad Autónoma de Galicia, incluyendo la gestión recaudatoria y pagos y la instrumentación del principio de unidad de caja.',
    whys: [
      'Es correcta: coincide con las funciones establecidas en las letras a) y b) del artículo 88º del texto refundido.',
      'Es incorrecta: la autorización de créditos extraordinarios corresponde a una ley del Parlamento (artículo 5 y 62), no a la Tesorería.',
      'Es incorrecta: la liquidación tributaria general y las reclamaciones económico-administrativas corresponden a órganos tributarios específicos, no a la Tesorería.',
      'Es incorrecta: la fiscalización previa es competencia de la Intervención General (artículo 4.3 y 93), no de la Tesorería, que realiza materialmente el pago.'
    ]
  },

  // ==========================================
  // Subvenciones (14 questions)
  // ==========================================
  {
    id: 'troncal-subvenciones-32',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 1 de la Ley 9/2007, de 13 de junio, de subvenciones de Galicia, ¿a qué administraciones es aplicable esta norma de forma directa para el establecimiento y gestión de subvenciones?',
    options: [
      ['A', 'A la Administración general de la Comunidad Autónoma de Galicia, a sus organismos y entidades vinculadas, y a las entidades locales de Galicia.'],
      ['B', 'Exclusivamente a la Administración general de la Comunidad Autónoma, estando excluidas las entidades locales gallegas.'],
      ['C', 'A la Administración general del Estado y a todas las comunidades autónomas del territorio español por igual.'],
      ['D', 'Únicamente a las sociedades mercantiles privadas que tengan su domicilio fiscal y social en Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 1 declara de forma directa que la ley tiene por objeto la regulación del régimen de subvenciones de la Administración general autonómica, sus entes dependientes y las entidades locales de Galicia.',
    whys: [
      'Es correcta: el artículo 1 declara la aplicación de la ley a la Administración de la Comunidad Autónoma de Galicia, sus organismos y entidades dependientes, y a las entidades locales de Galicia.',
      'Es incorrecta: las entidades locales de Galicia sí están explícitamente incluidas en el ámbito de aplicación directa.',
      'Es incorrecta: la ley es autonómica gallega y no regula a la Administración del Estado ni a otras comunidades autónomas.',
      'Es incorrecta: las sociedades privadas no son entes públicos concedentes sometidos a la ley en los mismos términos que la Administración.'
    ]
  },
  {
    id: 'troncal-subvenciones-38',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 2.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 2.1 de la Ley 9/2007, ¿cuáles son los requisitos cumulativos esenciales que debe reunir una entrega de fondos para ser considerada subvención?',
    options: [
      ['A', 'Que se realice sin contraprestación directa del beneficiario, esté sujeta al cumplimiento de un objetivo o actividad, y fomente una utilidad pública o interés social.'],
      ['B', 'Que implique la devolución obligatoria de las cuantías recibidas con un tipo de interés comercial fijo en un plazo menor de cinco años.'],
      ['C', 'Que se formalice obligatoriamente mediante un contrato de compraventa mercantil sujeto al derecho privado civil.'],
      ['D', 'Que suponga una dotación de carácter financiero reintegrable destinada a cubrir la tesorería ordinaria de empresas públicas.']
    ],
    correct: 0,
    explanation: 'El artículo 2.1 define la subvención mediante la concurrencia de tres requisitos: ausencia de contraprestación directa, afectación al cumplimiento de un fin o conducta del beneficiario, y fomento de utilidad pública o interés social.',
    whys: [
      'Es correcta: recoge los tres requisitos establecidos en las letras a), b) y c) del artículo 2.1 de la ley.',
      'Es incorrecta: la subvención es a título gratuito y no comporta devolución con interés, salvo reintegro por incumplimiento.',
      'Es incorrecta: no se formaliza mediante compraventa mercantil, sino por resolución o convenio sujeto al derecho público.',
      'Es incorrecta: las subvenciones se destinan a fines de interés público/social de personas públicas o privadas, no al sostenimiento extrapresupuestario.'
    ]
  },
  {
    id: 'troncal-subvenciones-51',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 28.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 28.1 de la Ley 9/2007, ¿de qué formas documentales puede revestir la justificación de los gastos de la subvención por parte del beneficiario?',
    options: [
      ['A', 'En forma de cuenta justificativa del gasto realizado, o acreditarse por módulos, o mediante la presentación de estados contables.'],
      ['B', 'Únicamente a través de declaraciones verbales tomadas bajo acta administrativa notarial.'],
      ['C', 'Mediante una certificación externa obligatoria expedida por el Consejo Consultivo de Galicia.'],
      ['D', 'A través de la entrega del inventario completo de bienes patrimoniales de la entidad beneficiaria.']
    ],
    correct: 0,
    explanation: 'El artículo 28.1 dispone que la justificación del cumplimiento de las condiciones se documentará de la manera reglamentaria, pudiendo revestir la forma de cuenta justificativa del gasto realizado, módulos o estados contables.',
    whys: [
      'Es correcta: el artículo 28.1 recoge textualmente que la justificación del gasto puede revestir la forma de cuenta justificativa, módulos o estados contables.',
      'Es incorrecta: las declaraciones verbales no constituyen un medio de justificación formal del artículo 28.1.',
      'Es incorrecta: el Consejo Consultivo no certifica ni fiscaliza gastos de subvenciones de particulares.',
      'Es incorrecta: el inventario de bienes propios no es la justificación documental de los gastos de la subvención de que habla el artículo 28.1.'
    ]
  },
  {
    id: 'troncal-subvenciones-74',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 33.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 33.1 de la Ley 9/2007, además de reintegrar las cantidades percibidas, ¿qué obligación accesoria se exige con carácter general en las resoluciones de reintegro?',
    options: [
      ['A', 'La exigencia del interés de demora correspondiente, computado desde el momento del pago de la subvención.'],
      ['B', 'El pago de una multa coercitiva de carácter tributario del 150% del valor de la subvención.'],
      ['C', 'La prohibición perpetua de presentarse a cualquier proceso de licitación pública autonómica.'],
      ['D', 'La realización de prestaciones accesorias de carácter social y comunitario gratuitas a favor de la Xunta.']
    ],
    correct: 0,
    explanation: 'El artículo 33.1 establece que en los supuestos de reintegro procederá la devolución de las cantidades percibidas y la exigencia del interés de demora correspondiente desde el momento del pago.',
    whys: [
      'Es correcta: el artículo 33.1 exige expresamente el reintegro de las cantidades percibidas y la exigencia del interés de demora correspondiente desde el pago.',
      'Es incorrecta: el interés de demora es de resarcimiento y no una multa sancionadora automática del 150%.',
      'Es incorrecta: la inhabilitación temporal existe como sanción pero no es una obligación del reintegro y menos de carácter perpetuo.',
      'Es incorrecta: no se imponen prestaciones sociales comunitarias obligatorias en el reintegro.'
    ]
  },
  {
    id: 'troncal-subvenciones-79',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 14.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 14.1 de la Ley 9/2007, ¿cuándo deben establecerse las bases reguladoras de una subvención y dónde deben publicarse preceptivamente?',
    options: [
      ['A', 'Con carácter previo a la disposición de los créditos, y deben publicarse en el Diario Oficial de Galicia y en la página web del órgano concedente.'],
      ['B', 'En el transcurso de la valoración de las solicitudes, y deben publicarse únicamente en el tablón de anuncios físico del órgano concedente.'],
      ['C', 'Con posterioridad a la resolución definitiva de concesión, y deben publicarse en el Boletín Oficial del Estado de forma obligatoria.'],
      ['D', 'En cualquier momento del ejercicio económico, publicándose exclusivamente en la contabilidad patrimonial interna de la Xunta.']
    ],
    correct: 0,
    explanation: 'El artículo 14.1 dispone que las bases reguladoras deben establecerse con carácter previo a la disposición de los créditos y serán objeto de publicación en el Diario Oficial de Galicia y en la página web del órgano concedente.',
    whys: [
      'Es correcta: el artículo 14.1 exige que las bases reguladoras se establezcan previamente a la disposición de los créditos y se publiquen en el DOG y en la web del órgano concedente.',
      'Es incorrecta: las bases deben ser previas y publicarse en el DOG y web, no pueden establecerse a mitad de procedimiento ni limitarse al tablón físico.',
      'Es incorrecta: no pueden publicarse a posteriori; además, el DOG es el diario de publicación preceptivo para las bases gallegas, no el BOE.',
      'Es incorrecta: el establecimiento debe ser previo a la disposición del gasto y su publicidad es pública externa, no meramente contable interna.'
    ]
  },
  {
    id: 'troncal-subvenciones-107',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 19.4.c',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 19.4 de la Ley 9/2007, ¿en qué supuestos excepcionales se podrán conceder subvenciones de forma directa sin convocatoria pública?',
    options: [
      ['A', 'Cuando se acrediten razones de interés público, social, económico o humanitario, u otras debidamente justificadas que dificulten su convocatoria pública.'],
      ['B', 'Siempre que el importe unitario solicitado por el beneficiario sea inferior a los 60.000 euros.'],
      ['C', 'En todo caso cuando la entidad solicitante sea una fundación de carácter privado sin ánimo de lucro registrada en Galicia.'],
      ['D', 'Cuando las bases reguladoras no hayan sido publicadas a tiempo en el Diario Oficial de Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 19.4.c autoriza la concesión directa, con carácter excepcional, cuando se acrediten razones de interés público, social, económico o humanitario u otras justificadas que dificulten la convocatoria pública.',
    whys: [
      'Es correcta: el artículo 19.4.c prevé de forma expresa y excepcional la concesión directa cuando se acrediten razones de interés público, social, económico o humanitario.',
      'Es incorrecta: la ley no prevé la concesión directa libre por razón de cuantía general sin justificar los motivos excepcionales.',
      'Es incorrecta: ser una fundación privada no exime del régimen ordinario de publicidad y concurrencia como regla general.',
      'Es incorrecta: la falta de publicación de las bases no habilita a la concesión directa; al contrario, es un vicio procedimental.'
    ]
  },
  {
    id: 'troncal-subvenciones-120',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 11.d',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 11.d de la Ley 9/2007, ¿en qué momento debe el beneficiario comunicar al órgano concedente la obtención de otras subvenciones o recursos que financien las actividades subvencionadas?',
    options: [
      ['A', 'En el momento en que se conozca y, en todo caso, con anterioridad a la justificación de la aplicación dada a los fondos percibidos.'],
      ['B', 'En el primer mes del ejercicio presupuestario siguiente al de la obtención del recurso financiero.'],
      ['C', 'Exclusivamente tras recibir la resolución firme que acuerde la liquidación definitiva de los intereses de demora.'],
      ['D', 'En cualquier momento antes de que transcurra el plazo de prescripción general de cuatro años de la subvención.']
    ],
    correct: 0,
    explanation: 'El artículo 11.d prescribe que la comunicación de obtención de otras ayudas debe efectuarse en el momento en que se conozca y, en todo caso, con anterioridad a la justificación de la aplicación de los fondos.',
    whys: [
      'Es correcta: el artículo 11.d prescribe que dicha comunicación debe realizarse en cuanto se conozca y siempre antes de la justificación.',
      'Es incorrecta: no se permite demorarla al ejercicio presupuestario siguiente si la justificación de la subvención es previa.',
      'Es incorrecta: no está condicionada a la liquidación de intereses de demora de ningún tipo.',
      'Es incorrecta: no se puede diferir a los cuatro años de prescripción; debe ser antes de justificar la aplicación de fondos.'
    ]
  },
  {
    id: 'troncal-subvenciones-152',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 35.1 y 35.2.a',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 35 de la Ley 9/2007, ¿cuál es el plazo de prescripción del derecho de la administración a reconocer o liquidar el reintegro de una subvención y desde cuándo se computa por regla general?',
    options: [
      ['A', 'Cuatro años, a contar desde el momento en que venció el plazo para presentar la justificación por parte del beneficiario o entidad colaboradora.'],
      ['B', 'Diez años, computados desde la fecha de publicación de las bases reguladoras de la subvención en el DOG.'],
      ['C', 'Un año ininterrumpido, a partir de la fecha de notificación de la resolución expresa de concesión de la ayuda.'],
      ['D', 'Cinco años, a contar desde la finalización del ejercicio presupuestario de la concesión de los fondos.']
    ],
    correct: 0,
    explanation: 'El artículo 35.1 y 35.2.a establece que el derecho de la administración a liquidar el reintegro prescribe a los cuatro años, computados desde el vencimiento del plazo de justificación.',
    whys: [
      'Es correcta: el artículo 35.1 y 35.2.a establece un plazo de prescripción de cuatro años a contar desde el vencimiento del plazo de justificación.',
      'Es incorrecta: el plazo general es de cuatro años, no de diez; además, no se inicia con la publicación de las bases.',
      'Es incorrecta: el plazo es de cuatro años, no de un año.',
      'Es incorrecta: el plazo general es de cuatro años y no se computa desde el fin de año presupuestario ordinario.'
    ]
  },
  {
    id: 'troncal-subvenciones-175',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 5.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 5.1 de la Ley 9/2007, ¿cuáles son los principios de gestión de obligado cumplimiento a los que debe ajustarse la concesión de subvenciones?',
    options: [
      ['A', 'Publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia y eficiencia.'],
      ['B', 'Discrecionalidad política absoluta, reserva de las bases reguladoras e inembargabilidad de los fondos.'],
      ['C', 'Silencio positivo, gratuidad ilimitada de las solicitudes y arbitraje comercial obligatorio.'],
      ['D', 'Confidencialidad total de las identidades de los beneficiarios y fomento del libre mercado sin control público.']
    ],
    correct: 0,
    explanation: 'El artículo 5.1 detalla de forma acumulativa los principios rectores de la gestión subvencionable: publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia y eficiencia.',
    whys: [
      'Es correcta: recoge todos los principios explícitos del artículo 5.1 (publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia y eficiencia).',
      'Es incorrecta: la discrecionalidad absoluta o la reserva de las bases contradicen los principios de objetividad y publicidad.',
      'Es incorrecta: no se rigen por silencio positivo general ni por arbitraje comercial obligatorio.',
      'Es incorrecta: las subvenciones están sujetas al principio de publicidad y transparencia (artículo 15), no a confidencialidad total.'
    ]
  },
  {
    id: 'troncal-subvenciones-198',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 7.2',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 7 de la Ley 9/2007, ¿bajo qué circunstancia se requiere la autorización del Consejo de la Xunta de Galicia para la concesión de una subvención en el sector público autonómico?',
    options: [
      ['A', 'Cuando la cuantía de la subvención a conceder supere la cuantía de 3.000.000 de euros por beneficiario.'],
      ['B', 'En todos los casos en que la subvención se otorgue mediante concurrencia competitiva ordinaria.'],
      ['C', 'Únicamente cuando la subvención sea financiada en más de un 50% por fondos europeos.'],
      ['D', 'Siempre que el beneficiario de la ayuda sea una corporación local de fuera de Galicia.']
    ],
    correct: 0,
    explanation: 'El artículo 7.2 establece que requerirá autorización del Consejo de la Xunta la concesión de subvenciones que superen la cuantía de 3.000.000 de euros por beneficiario.',
    whys: [
      'Es correcta: el artículo 7.2 exige expresamente la autorización del Consejo de la Xunta para subvenciones que superen los 3.000.000 de euros por beneficiario.',
      'Es incorrecta: el procedimiento ordinario competitivo se resuelve directamente por los conselleiros sin autorización del Consello si no superan el límite de cuantía.',
      'Es incorrecta: la procedencia europea de la financiación no determina esta autorización por sí misma en el artículo 7.2.',
      'Es incorrecta: la localización o naturaleza del beneficiario no es la condición de la autorización del artículo 7.2.'
    ]
  },
  {
    id: 'troncal-subvenciones-211',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 8.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'De acuerdo con el artículo 8.1 de la Ley 9/2007, ¿quién tendrá legalmente la consideración de beneficiario de una subvención?',
    options: [
      ['A', 'La persona que haya de realizar la actividad que fundamentó su otorgamiento o que se encuentre en la situación que legitima su concesión.'],
      ['B', 'La entidad bancaria o financiera privada encargada de canalizar el abono material de las transferencias.'],
      ['C', 'El órgano directivo o funcionario de la Intervención General que realice la fiscalización previa del gasto.'],
      ['D', 'Cualquier ciudadano residente en Galicia que declare tener un interés legítimo indirecto en el fomento del empleo.']
    ],
    correct: 0,
    explanation: 'El artículo 8.1 define que tendrá la consideración de beneficiario de subvenciones la persona que haya de realizar la actividad que fundamentó su otorgamiento o que se encuentre en la situación que legitima su concesión.',
    whys: [
      'Es correcta: coincide literalmente con la definición de beneficiario del artículo 8.1 de la ley.',
      'Es incorrecta: la entidad de crédito que preste servicios de caja no es beneficiaria, sino un mero intermediario financiero.',
      'Es incorrecta: el personal interventor ejerce control financiero público, no es beneficiario de la ayuda.',
      'Es incorrecta: el interés legítimo indirecto no otorga la condición de beneficiario de una subvención según la definición legal.'
    ]
  },
  {
    id: 'troncal-subvenciones-224',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 19.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Conforme al artículo 19.1 de la Ley 9/2007, ¿cómo se define el régimen de concurrencia competitiva para la concesión de subvenciones?',
    options: [
      ['A', 'El procedimiento mediante el cual la concesión se realiza a través de la comparación de solicitudes presentadas, a fin de establecer una prelación entre ellas de acuerdo con criterios de valoración fijados.'],
      ['B', 'El procedimiento mediante el cual las subvenciones se adjudican exclusivamente por sorteo público informático ante fedatario de la Xunta.'],
      ['C', 'El régimen de libre concurrencia donde se otorgan ayudas por orden estricto de presentación de solicitudes sin límite presupuestario.'],
      ['D', 'El procedimiento de urgencia que permite al Presidente de la Xunta otorgar subvenciones directas y discrecionales a corporaciones locales.']
    ],
    correct: 0,
    explanation: 'El artículo 19.1 define la concurrencia competitiva como la comparación de solicitudes para establecer una prelación según los criterios fijados y adjudicar las ayudas dentro del crédito disponible.',
    whys: [
      'Es correcta: coincide literalmente con la definición de concurrencia competitiva que figura en el artículo 19.1.',
      'Es incorrecta: la adjudicación no se realiza por sorteo, sino mediante baremación objetiva y comparación.',
      'Es incorrecta: la concurrencia competitiva establece una prelación y tiene el límite del crédito disponible.',
      'Es incorrecta: la concesión directa discrecional del Presidente no es concurrencia competitiva.'
    ]
  },
  {
    id: 'troncal-subvenciones-237',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 10.2.e y 10.2.f',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Según el artículo 10.2 de la Ley 9/2007, ¿cuál de las siguientes circunstancias impide obtener la condición de beneficiario de una subvención?',
    options: [
      ['A', 'Tener pendientes de pago deudas con la Administración pública de la Comunidad Autónoma de Galicia o poseer residencia fiscal en un paraíso fiscal.'],
      ['B', 'No estar afiliado a un sindicato con representación mayoritaria en el sector de actividad económica correspondiente.'],
      ['C', 'Ser una sociedad mercantil extranjera con sucursal física de producción inscrita legalmente en territorio de Galicia.'],
      ['D', 'Estar sometido a un procedimiento ordinario de fiscalización previa a cargo de la Intervención General.']
    ],
    correct: 0,
    explanation: 'El artículo 10.2 establece prohibiciones automáticas para obtener la condición de beneficiario, incluyendo deudas con la Administración de la Comunidad Autónoma o residencia fiscal en paraísos fiscales.',
    whys: [
      'Es correcta: el artículo 10.2.e y 10.2.f prohíbe obtener la condición de beneficiario a quienes tengan deudas con la Hacienda gallega o tengan residencia fiscal en un paraíso fiscal.',
      'Es incorrecta: la afición sindical no influye en las prohibiciones para obtener subvenciones.',
      'Es incorrecta: las empresas extranjeras con sucursales legales no están excluidas si cumplen los requisitos generales.',
      'Es incorrecta: estar sometido a fiscalización previa es un trámite obligatorio normal del procedimiento presupuestario, no una prohibición.'
    ]
  },
  {
    id: 'troncal-subvenciones-255',
    quality: 'Verificada y reformulada · DOG 25/06/2007',
    topic: 'Troncal estatal',
    source: 'Ley 9/2007, art. 15.1',
    sourceUrlStr: 'officialSources.grantsGalicia',
    text: 'Conforme al artículo 15 de la Ley 9/2007, ¿qué datos de las subvenciones concedidas deben publicarse obligatoriamente en el Diario Oficial de Galicia?',
    options: [
      ['A', 'La expresión de la convocatoria, el programa y crédito presupuestario, el beneficiario, la cantidad concedida y la finalidad de la subvención.'],
      ['B', 'Los estados financieros detallados y las cuentas anuales completas de las empresas o personas físicas adjudicatarias.'],
      ['C', 'El informe técnico y la puntuación desglosada obtenida por cada uno de los solicitantes excluidos en el procedimiento.'],
      ['D', 'La dirección del domicilio fiscal privado y los números de cuenta bancaria de los representantes legales de los beneficiarios.']
    ],
    correct: 0,
    explanation: 'El artículo 15.1 de la Ley 9/2007 exige que se publiquen en el Diario Oficial de Galicia las subvenciones concedidas con expresión de la convocatoria, el programa y crédito presupuestario al que se imputen, beneficiario, cantidad concedida y finalidad.',
    whys: [
      'Es correcta: el artículo 15.1 exige expresamente publicar la convocatoria, programa, crédito, beneficiario, cantidad y finalidad.',
      'Es incorrecta: no se publican las cuentas anuales de los beneficiarios en el DOG.',
      'Es incorrecta: la puntuación de los excluidos no forma parte del contenido mínimo de la publicación obligatoria de concesiones del artículo 15.1.',
      'Es incorrecta: no se publican datos confidenciales de cuentas o domicilios privados por razones de protección de datos.'
    ]
  }
];

// Apply updates by searching for each question block in app.js
newQuestions.forEach(q => {
  // Let's create a regular expression to match the object that has id: 'q.id'
  // Or do a manual search for the id
  const idSearch = `id: '${q.id}'`;
  let idx = appContent.indexOf(idSearch);
  if (idx === -1) {
    // try double quotes
    const idSearchDouble = `id: "${q.id}"`;
    idx = appContent.indexOf(idSearchDouble);
  }

  if (idx === -1) {
    console.error(`ERROR: No se encontró la pregunta con ID ${q.id} en app.js`);
    process.exit(1);
  }

  // Find the opening brace of this object before the ID
  let startBrace = -1;
  for (let i = idx; i >= 0; i--) {
    if (appContent[i] === '{') {
      startBrace = i;
      break;
    }
  }

  if (startBrace === -1) {
    console.error(`ERROR: No se encontró la llave de apertura para la pregunta con ID ${q.id}`);
    process.exit(1);
  }

  // Find the matching closing brace after the ID
  let endBrace = -1;
  let bracesCount = 0;
  for (let i = startBrace; i < appContent.length; i++) {
    if (appContent[i] === '{') bracesCount++;
    if (appContent[i] === '}') bracesCount--;
    if (bracesCount === 0) {
      endBrace = i;
      break;
    }
  }

  if (endBrace === -1) {
    console.error(`ERROR: No se encontró la llave de cierre para la pregunta con ID ${q.id}`);
    process.exit(1);
  }

  // Build the replacement string
  const formatOptions = q.options.map(opt => `      ['${opt[0]}', '${opt[1].replace(/'/g, "\\'")}']`).join(',\n');
  const formatWhys = q.whys.map(why => `      '${why.replace(/'/g, "\\'")}'`).join(',\n');
  
  const replacement = `{
    id: '${q.id}',
    quality: '${q.quality}',
    topic: '${q.topic}',
    source: '${q.source}',
    sourceUrl: ${q.sourceUrlStr},
    text: '${q.text.replace(/'/g, "\\'")}',
    options: [
${formatOptions}
    ],
    correct: ${q.correct},
    explanation: '${q.explanation.replace(/'/g, "\\'")}',
    whys: [
${formatWhys}
    ]
  }`;

  // Replace this block in appContent
  appContent = appContent.substring(0, startBrace) + replacement + appContent.substring(endBrace + 1);
});

// Write updated app.js back
fs.writeFileSync(appPath, appContent, 'utf8');
console.log('¡Se actualizaron con éxito las 42 preguntas en app.js!');
