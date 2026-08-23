import type { ArticleCopy } from './articles';

export const esArticles: Record<string, ArticleCopy> = {
  'what-is-a-natal-chart': {
    title: '¿Qué es una carta natal?',
    excerpt:
      'Una carta natal es un mapa del cielo desde tu fecha, hora y lugar de nacimiento: planetas, Ascendente y doce casas. No es un horóscopo diario del signo solar ni un test.',
    sections: [
      {
        heading: '¿Qué es una carta natal?',
        paragraphs: [
          'Una carta natal es un mapa del Sistema Solar visto desde un lugar en un instante. Tú aportas tres datos: una fecha de nacimiento, una hora civil y un lugar geográfico. Con ellos, una calculadora obtiene la longitud eclíptica de cada planeta, el grado que salía por el este (el Ascendente) y una división en doce casas del cielo local. SideraChart es esa calculadora: zodiaco tropical, casas Placidus por defecto, posiciones de una efeméride de clase VSOP87 a través de astronomy-engine.',
          'La carta es un diagrama de acentos, no un veredicto. Cada planeta es una función. Cada signo es un estilo de esa función. Cada casa es un ámbito de la vida donde esa función se nota. Los aspectos son las distancias angulares entre esas funciones. Leídos juntos te dicen qué partes de la carta suenan más alto. No te dicen si debes cambiar de trabajo, dejar una relación o tomar una decisión médica.',
        ],
      },
      {
        heading: 'Qué necesitas: fecha, hora y lugar de nacimiento',
        paragraphs: [
          'La fecha fija en qué día de la órbita de la Tierra naciste, y eso basta para que el Sol y los planetas lentos caigan en el signo correcto. La hora convierte el reloj civil a Tiempo Universal con las reglas IANA vigentes en esa fecha, incluido el horario de verano histórico. El lugar da latitud y longitud para poder calcular el horizonte local — y por tanto el Ascendente y las cúspides de las casas.',
          'Si la hora es desconocida, igual obtienes los signos planetarios. No obtienes un Ascendente fiable ni un sistema de casas. SideraChart te deja marcar la hora como desconocida y entonces dibuja solo planetas. Adivinar el mediodía y tratar las casas como un hecho es peor que un hueco honesto. Si el certificado tiene una hora, úsala; si los parientes discrepan en media hora, trata el Ascendente como provisional.',
        ],
      },
      {
        heading: 'Planetas, signos, casas y aspectos',
        paragraphs: [
          'Los planetas (del Sol a Plutón, más la Luna) se sientan en la eclíptica. El signo es en qué rebanada de 30° del zodiaco tropical cae esa longitud. La casa es en qué sector local cae esa misma longitud cuando ya conoces el Ascendente. Un planeta en Aries en la casa diez no es la misma afirmación que un planeta en Aries en la cuatro: mismo estilo, otro ámbito.',
          'Los aspectos son los ángulos con nombre entre dos longitudes: conjunción (0°), sextil (60°), cuadratura (90°), trígono (120°), oposición (180°). SideraChart dibuja esos cinco con orbes de 8° para conjunción y oposición, 6° para cuadratura y trígono, y 4° para sextil. Los orbes más estrechos se leen más alto. Las líneas de color de la rueda y la tabla debajo muestran los mismos contactos.',
        ],
      },
      {
        heading: 'Qué no es una carta natal',
        paragraphs: [
          'Una carta natal no es una columna diaria de horóscopo escrita para doce signos solares. No es astrología védica ni sideral, que mide desde un punto cero estelar a unos 24° del equinoccio tropical de hoy. No es astrología china. SideraChart no calcula esos sistemas y no usa Swiss Ephemeris.',
          'Tampoco es un test de personalidad que entrega un tipo. Dos personas con el mismo signo solar pueden tener Lunas distintas, ascendentes distintos, distinto acento de casas y distintos patrones de aspectos. Si solo conoces el Sol, tienes una coordenada. La carta es el resto del sistema de coordenadas.',
        ],
      },
      {
        heading: 'Cómo calcula SideraChart la carta',
        paragraphs: [
          'SideraChart resuelve el lugar de nacimiento en latitud y longitud, convierte la hora civil local a Tiempo Universal y luego lee las longitudes tropicales aparentes en astronomy-engine (clase VSOP87). El zodiaco tropical empieza en el equinoccio de marzo, la convención occidental. No se muestran longitudes siderales. Las casas van por defecto a Placidus porque la mayoría de los textos occidentales publicados lo asumen; Whole Sign está disponible cuando necesitas signos iguales a partir del signo del Ascendente.',
          'Placidus divide el tiempo de ascensión, así que las casas son desiguales y se vuelve poco fiable por encima de unos 66° de latitud. Para nacimientos polares, Whole Sign es la cuadrícula más honesta. Las longitudes planetarias se calculan de un modo u otro. Guarda la carta si quieres el informe escrito y el gabinete diario; las calculadoras públicas siguen gratis sin cuenta.',
        ],
      },
      {
        heading: 'Cómo usar la carta cuando ya la tienes',
        paragraphs: [
          'Empieza por los Tres Grandes: Sol, Luna y Ascendente. Luego las casas ocupadas, luego los aspectos más estrechos. Las casas vacías son habitaciones sin un planeta sentado dentro, no órganos que faltan. El PNG de la rueda es una instantánea; las tablas son el instrumento. Primero los números, después la capa escrita.',
          'Si más tarde comparas la carta natal con el cielo de hoy, eso son tránsitos: otro artículo. El gabinete de SideraChart guarda esas superposiciones diarias al mediodía en la zona horaria natal para que la nota del día se quede estable. Nada de eso reescribe la carta natal. La natal es la línea de base que conservas; los tránsitos son el tiempo contra ella.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Una carta natal es lo mismo que un horóscopo?',
        a: 'No. Una carta natal es un mapa calculado a partir de tu fecha, hora y lugar de nacimiento. Un horóscopo, en el habla cotidiana, suele ser una columna del signo solar para el día, la semana o el año. La carta natal es la línea de base; el horóscopo es una lectura posterior y mucho más delgada.',
      },
      {
        q: '¿Necesito la hora exacta de nacimiento para una carta natal?',
        a: 'La necesitas para el Ascendente y las casas. Sin hora, los signos planetarios siguen siendo útiles. SideraChart calculará los planetas y omitirá el signo ascendente si marcas la hora como desconocida.',
      },
      {
        q: '¿Qué zodiaco usa una carta natal?',
        a: 'Las cartas natales occidentales, incluida SideraChart, usan el zodiaco tropical medido desde el equinoccio de primavera. Las cartas siderales (védicas) usan un punto cero estelar y hoy diferirán aproximadamente un signo en muchas posiciones.',
      },
      {
        q: '¿Pueden dos personas nacidas el mismo día tener cartas natales distintas?',
        a: 'Sí. La hora y el lugar cambian el Ascendente, las casas y el grado de la Luna. Incluso el mismo hospital con una hora de diferencia puede dar un signo ascendente distinto.',
      },
    ],
  },
  'natal-chart-vs-horoscope': {
    title: 'Carta natal y horóscopo',
    excerpt:
      'Una carta natal es el mapa del cielo de tu nacimiento a partir de fecha, hora y lugar. Un horóscopo suele ser una columna del signo solar. No son la misma lectura y no deberían intercambiarse.',
    sections: [
      {
        heading: 'Carta natal y horóscopo',
        paragraphs: [
          'La gente busca «carta natal y horóscopo» porque ambas palabras se usan como si fueran «astrología», y no son el mismo objeto. Una carta natal es un diagrama calculado del cielo desde tu fecha, hora y lugar de nacimiento: planetas en la eclíptica, un Ascendente si se conoce el reloj, casas y aspectos. Un horóscopo, en el sentido de la mayoría de los resultados de búsqueda, es un pronóstico breve escrito para un signo solar — de Aries a Piscis — para un día, una semana o un mes.',
          'Puedes extraer un párrafo al estilo horóscopo a partir de una carta natal. No puedes reconstruir una carta natal a partir de una columna de horóscopo. Uno es un mapa con coordenadas. El otro es un producto de texto dirigido a doce audiencias. SideraChart calcula el mapa. No publica columnas de signo solar, semanales ni de otro tipo.',
        ],
      },
      {
        heading: 'Qué suele significar un horóscopo',
        paragraphs: [
          'En periódicos y apps, un horóscopo se indexa por signo solar. Quien escribe puede mirar la Luna, Mercurio o un tránsito a ese signo y luego redactar doce textos. El texto no conoce tu Luna, tu signo ascendente, tus cúspides de casa ni si tu Sol está en la casa uno o en la diez. No puede. Esos datos piden una hora de nacimiento y un lugar.',
          'En el uso astronómico antiguo, «horóscopo» significaba el propio Ascendente: el marcador de la hora. Ese sentido sobrevive en la palabra, y por eso la confusión se pega. Si alguien te pide «tu horóscopo», puede referirse al signo solar, al ascendente o a toda la rueda natal. Pregunta cuál. Luego calcula la carta natal si quieres el cielo de verdad.',
        ],
      },
      {
        heading: 'Qué contiene una carta natal que un horóscopo no tiene',
        paragraphs: [
          'Una carta natal lista todos los cuerpos mayores: Sol, Luna, Mercurio, Venus, Marte, Júpiter, Saturno, Urano, Neptuno, Plutón. Los coloca en signos tropicales. Con hora de nacimiento también los coloca en casas y fija el Ascendente y el Medio Cielo. Luego lista los aspectos mayores dentro de orbes de 8° / 6° / 4°. Eso es mucha estructura comparada con «Tauro, esta semana».',
          'Dos personas que comparten signo solar pueden tener Lunas opuestas, ascendentes distintos y ningún aspecto en común. Una columna de horóscopo las trata como la misma lectora. Una carta natal no. Si solo has leído horóscopos de signo solar, la carta natal te parecerá demasiado detallada. Ese detalle es el sentido de calcular una.',
        ],
      },
      {
        heading: 'Columnas de signo solar frente a una rueda completa',
        paragraphs: [
          'Tu signo solar es una coordenada: el signo tropical que ocupaba el Sol en tu fecha de nacimiento. Es el dato más fácil de conocer porque el Sol se queda en un signo aproximadamente un mes y rara vez necesita un reloj preciso. También es el dato que los horóscopos usan como índice. No es la carta.',
          'La rueda añade la Luna (que cambia de signo cada dos días y medio), el signo ascendente (que necesita el minuto) y el resto de los planetas. La calculadora de carta natal de SideraChart dibuja esa rueda en el zodiaco tropical con casas Placidus por defecto. Compárala con un horóscopo de revista y verás por qué las palabras no deberían usarse como si fueran intercambiables.',
        ],
      },
      {
        heading: 'Por qué se confunden las dos',
        paragraphs: [
          'El lenguaje de marketing las aplasta. «Horóscopo gratis» a menudo significa «carta natal gratis», o al revés. En redes preguntan «¿cuál es tu horóscopo?» cuando quieren decir el signo solar. Los buscadores heredan esa mezcla. Si llegaste aquí desde «carta natal y horóscopo», quédate con la distinción: carta = mapa calculado a partir de datos de nacimiento; horóscopo = normalmente un texto de signo solar.',
          'Una lectura de tránsitos sobre tu carta natal guardada está más cerca de un horóscopo personal que una columna de periódico, porque usa tus posiciones reales. El gabinete diario de SideraChart guarda esos tránsitos al mediodía en la zona horaria natal. Eso sigue sin ser la carta natal. La natal no cambia; el cielo encima sí.',
        ],
      },
      {
        heading: 'Cuál calcula SideraChart',
        paragraphs: [
          'SideraChart calcula cartas natales, herramientas de signo planeta a planeta, ruedas de sinastría y de carta compuesta. Las posiciones vienen de astronomy-engine (VSOP87), no de Swiss Ephemeris. El zodiaco es tropical, no sideral ni chino. Las casas son Placidus salvo que pases a Whole Sign. Hora desconocida: planetas sí, casas no.',
          'Si quieres un horóscopo de signo solar para la semana, este sitio es el instrumento equivocado. Si quieres el mapa que esas columnas pretenden describir a medias, usa la calculadora de carta natal con fecha, hora y lugar. Lee la carta como una descripción estructurada de acentos. No trates ninguno de los dos productos como consejo médico, legal ni financiero.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Mi horóscopo es mi signo solar?',
        a: 'En el uso popular, sí: los horóscopos se archivan por signo solar. Tu carta natal incluye el signo solar más Luna, Ascendente, casas y aspectos. Responden a preguntas distintas.',
      },
      {
        q: '¿Puede un horóscopo sustituir una carta natal?',
        a: 'No. Una columna para doce signos no puede codificar tu hora de nacimiento, tu lugar, tu Luna ni tus cúspides. Calcula una carta natal si quieres esas coordenadas.',
      },
      {
        q: '¿Una carta natal predice mi semana?',
        a: 'La carta natal es la línea de base. El lenguaje de semana a semana pertenece a los tránsitos contra esa línea. SideraChart guarda tránsitos diarios al mediodía en la zona horaria natal; eso sigue sin ser un horóscopo de periódico.',
      },
      {
        q: '¿Por qué algunos sitios llaman horóscopo a una carta natal?',
        a: 'La jerga antigua usaba «horóscopo» para el Ascendente o para toda la figura. El marketing moderno reutilizó la palabra para textos de signo solar. Mira si la página pide hora de nacimiento. Si la pide, está calculando una carta.',
      },
    ],
  },
  'what-is-my-sun-sign': {
    title: '¿Cuál es mi signo solar?',
    excerpt:
      'Tu signo solar es el signo del zodiaco tropical que ocupaba el Sol en tu fecha de nacimiento. Por lo general no necesitas hora. Es una posición, no toda la carta natal.',
    sections: [
      {
        heading: '¿Cuál es mi signo solar?',
        paragraphs: [
          'Tu signo solar es la rebanada tropical de 30° que contenía el Sol al nacer. La gente pregunta «¿cuál es mi signo solar?» porque es el único dato astrológico que comparten periódicos, apps y la conversación casual. Lo encuentras a partir de la fecha de nacimiento. El Sol se mueve aproximadamente un grado al día y cambia de signo alrededor de las mismas fechas de calendario cada año, con un poco de deriva cerca de las cúspides.',
          'SideraChart mide el Sol en el zodiaco tropical, desde el equinoccio de marzo, con astronomy-engine (VSOP87). Esa es la práctica occidental. Un signo solar sideral (védico) puede diferir aproximadamente un signo hoy porque el punto cero estelar se ha desplazado por precesión. Si un amigo en una app sideral reporta un Sol distinto, no se trata del mismo sistema de coordenadas.',
        ],
      },
      {
        heading: 'Cómo se calcula el signo solar',
        paragraphs: [
          'La calculadora convierte tu fecha y hora civiles de nacimiento a Tiempo Universal y luego lee la longitud eclíptica aparente del Sol. El signo es esa longitud dividida en doce bloques de 30° que empiezan en 0° de Aries (el equinoccio). En un día de cúspide — cuando el Sol cambia de signo — la hora del reloj y la zona horaria deciden de qué lado estás. Esos son los únicos días en que «soy de cúspide» es una pregunta de cálculo y no una vibra.',
          'El lugar apenas importa para el signo del Sol. La hora importa en la cúspide y para el grado y la casa del Sol. Si solo quieres el signo y no naciste en una fecha de cambio, el cumpleaños basta. Si naciste en el recambio, introduce la hora real o márcala desconocida y trata el resultado como no resuelto hasta que tengas un reloj.',
        ],
      },
      {
        heading: 'Por qué tu signo solar no es toda la carta',
        paragraphs: [
          'El Sol es un cuerpo. Una carta natal también tiene la Luna, Mercurio, Venus, Marte y los planetas exteriores, más el Ascendente si tienes hora de nacimiento. Dos Leos pueden compartir un mes solar y aun así no compartir Luna, signo ascendente ni patrón de casas. Las descripciones de signo solar sobreviven porque son fáciles de indexar, no porque agoten el cielo.',
          'Lee el Sol como el argumento de luz diurna: lo que haces cuando eres más obviamente tú en el tiempo público. Luego lee el resto. Una carta que solo lista el Sol es un titular. Las tablas bajo la rueda de SideraChart son el artículo.',
        ],
      },
      {
        heading: 'Signo solar, signo lunar y signo ascendente',
        paragraphs: [
          'La Luna cambia de signo cada dos días y medio, así que mucha gente nacida en el mismo mes solar no comparte Luna. El signo ascendente cambia aproximadamente cada dos horas y necesita hora y lugar de nacimiento. Juntos, estos tres son los Tres Grandes. Si solo conoces el Sol, conoces el más lento de los tres.',
          'No necesitas hora de nacimiento para un signo solar típico. A menudo tampoco la necesitas para la Luna, salvo que cambiara de signo ese día. Siempre la necesitas para el signo ascendente. Las herramientas dedicadas de Sol, Luna y Ascendente de SideraChart son filtros del mismo motor que la carta natal completa. Usa la carta completa cuando también quieras casas y aspectos.',
        ],
      },
      {
        heading: 'Cúspides, zonas horarias y «soy dos signos»',
        paragraphs: [
          'En la práctica tropical no hay un decimotercer signo extra, y no hay doble ciudadanía oficial en el límite. El Sol está en un signo o en el otro en el minuto de nacimiento. Si te falta la hora en una fecha de cúspide, dilo. No promedies dos signos en una identidad a medida y luego la trates como un hecho calculado.',
          'La historia de las zonas horarias importa más de lo que se espera. Un nacimiento anotado a las 23:40 en una ciudad que aún estaba en horario de verano puede ser un Tiempo Universal distinto que la misma lectura de reloj en invierno. SideraChart usa las reglas IANA de esa fecha. Si un papel antiguo usó otro desfase, el grado del Sol puede moverse; en una cúspide, también el signo.',
        ],
      },
      {
        heading: 'Cómo encontrar tu signo solar en SideraChart',
        paragraphs: [
          'Introduce la fecha de nacimiento y añade hora y lugar si los tienes. La fila del Sol en la tabla es el signo y el grado. La rueda coloca el glifo solar en esa longitud. Los aspectos al Sol usan los mismos orbes que el resto de la carta: 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil.',
          'Guarda la carta natal si quieres el informe escrito y el gabinete diario. Los tránsitos a tu Sol natal son tiempo posterior, guardados al mediodía en la zona horaria natal. No cambian el signo solar natal. El signo solar es un hecho de nacimiento. Todo lo demás es lectura.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Puedo saber mi signo solar sin hora de nacimiento?',
        a: 'Por lo general sí. El Sol se queda en un signo aproximadamente un mes. Solo necesitas una hora el día de calendario en que cambia de signo, o si quieres la casa del Sol.',
      },
      {
        q: '¿Por qué mi signo solar es distinto en una app védica?',
        a: 'Las apps védicas suelen usar el zodiaco sideral. SideraChart usa longitudes tropicales desde el equinoccio. La brecha es de unos 24° hoy, lo que a menudo mueve el Sol al signo anterior.',
      },
      {
        q: '¿Y si nací en la cúspide?',
        a: 'El Sol sigue estando en un solo signo tropical en el minuto de nacimiento. Introduce una hora precisa. Si la hora es desconocida, el signo no está zanjado y no debería forzarse.',
      },
      {
        q: '¿El signo solar es la posición más importante?',
        a: 'Es la más famosa, no automáticamente la más alta. Una Luna estrecha o una casa abarrotada pueden dominar una carta que casualmente tiene un Sol callado.',
      },
    ],
  },
  'sun-moon-rising': {
    title: 'Sol, Luna y Ascendente: los Tres Grandes',
    excerpt:
      'Los Tres Grandes son Sol, Luna y signo ascendente. El Sol a partir de la fecha, la Luna a partir de la fecha más un control de hora, el Ascendente solo con hora y lugar. Léelos juntos.',
    sections: [
      {
        heading: 'Sol, Luna y Ascendente: los Tres Grandes',
        paragraphs: [
          'Al Sol, la Luna y el Ascendente se les llama los Tres Grandes porque son las tres posiciones que la gente usa de verdad en conversación, y porque van en tres relojes distintos. El Sol necesita una fecha. La Luna necesita una fecha y, en días rápidos, una hora. El signo ascendente necesita fecha, hora y lugar. Si solo tienes uno de los tres, no tienes el conjunto.',
          'No son un ranking de importancia espiritual. Son tres coordenadas que describen tempos distintos: el camino anual del Sol, el camino mensual de la Luna y la rotación diaria de la Tierra bajo la eclíptica. SideraChart calcula los tres con el mismo motor tropical basado en VSOP87. El signo ascendente se omite cuando la hora de nacimiento es desconocida.',
        ],
      },
      {
        heading: 'El Sol: la coordenada lenta y pública',
        paragraphs: [
          'El signo del Sol es la rebanada tropical que ocupaba al nacer. Cambia aproximadamente una vez al mes. Es el índice de los horóscopos de periódico y la respuesta a «¿cuál es mi signo?» en el habla casual. En la carta natal sigue siendo solo una longitud. Te dice el estilo de la función solar — cómo ocupas el tiempo de luz — no el resto del cielo.',
          'Rara vez necesitas un reloj preciso para el signo del Sol. Lo necesitas para la casa del Sol, y en fechas de cúspide para el propio signo. Si estás armando los Tres Grandes, introduce de todos modos la hora real para que el grado del Sol encaje con los aspectos a la Luna y al Ascendente.',
        ],
      },
      {
        heading: 'La Luna: el cuerpo rápido',
        paragraphs: [
          'La Luna se mueve unos 13° al día y cambia de signo cada dos días y medio. Por eso dos personas nacidas en el mismo mes de signo solar a menudo no comparten Luna. El signo lunar describe el tiempo más rápido de la carta: apetito, sueño, las horas sin nota. No es un diagnóstico médico ni una etiqueta de trastorno del ánimo.',
          'Sin hora de nacimiento, el signo de la Luna suele ser correcto igual. El grado y la casa no. Si la Luna cambió de signo el día de tu cumpleaños, una hora desconocida deja la propia Luna sin resolver. Marca la hora como desconocida en SideraChart en lugar de inventar el mediodía y defender el grado.',
        ],
      },
      {
        heading: 'El signo ascendente: el horizonte este',
        paragraphs: [
          'El signo ascendente, o Ascendente, es el grado del zodiaco que estaba saliendo por el horizonte este en el minuto de nacimiento. No es un planeta. Es un ángulo local. Depende de latitud, longitud y hora del reloj. El Ascendente se mueve aproximadamente un grado cada cuatro minutos, así que un error de veinte minutos puede cambiar el signo.',
          'Las casas en Placidus (el valor por defecto de SideraChart) empiezan en ese ángulo. Sin un signo ascendente fiable no hay casas fiables. Si no tienes hora, salta el Ascendente. Un signo ascendente adivinado desplaza cada línea de «planeta en casa» que viene detrás.',
        ],
      },
      {
        heading: 'Por qué se leen los tres juntos',
        paragraphs: [
          'Una lectura solo de Sol es un titular. Añadir la Luna te dice qué hace la carta cuando nadie la califica. Añadir el signo ascendente te dice la puerta que usa la carta: primeras impresiones, el cuerpo en el espacio, la cuadrícula de casas. Los tres pueden rimar (todo fuego) o discutir (Sol en Capricornio, Luna en Aries, Géminis ascendente). La discusión es información.',
          'Los aspectos entre los Tres Grandes importan más que la química de eslogan. Una cuadratura Sol–Luna dentro de un orbe de 6° es una afirmación más estrecha que «fuego y agua». Los orbes de SideraChart son 8° para conjunción y oposición, 6° para cuadratura y trígono, 4° para sextil. Mira la tabla, no la compatibilidad de memes.',
        ],
      },
      {
        heading: 'Cómo calcular los Tres Grandes',
        paragraphs: [
          'Usa la calculadora de carta natal con fecha, hora y lugar. Lee primero las filas de Sol, Luna y Ascendente, luego el resto. Las herramientas dedicadas de Sol, Luna y Ascendente en SideraChart son el mismo motor con una pantalla más estrecha. Solo zodiaco tropical; no sideral, no chino. Hora desconocida: aún puedes listar Sol y, por lo general, Luna; no puedes listar el Ascendente.',
          'Una vez guardada la carta natal, el gabinete diario superpondrá tránsitos al mediodía en la zona horaria natal. Esos tránsitos hablan con los Tres Grandes entre otros puntos. No los sustituyen. Los Tres Grandes son hechos de nacimiento. Los tránsitos son el cielo posterior.',
          'Si las tres posiciones discrepan, no elijas una favorita y descartes las otras. Escríbelas en una frase: Sol en este signo, Luna en aquel, este signo ascendente. Luego abre la tabla de aspectos. Esa frase más el orbe más estrecho ya es más carta natal que una columna de signo solar.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué son los Tres Grandes en astrología?',
        a: 'Signo solar, signo lunar y signo ascendente (Ascendente). Van en relojes anual, mensual y diario. Necesitas hora y lugar de nacimiento para el signo ascendente.',
      },
      {
        q: '¿Cuál de los Tres Grandes es el más importante?',
        a: 'Ninguno es primero por decreto. El Sol es el más famoso. La Luna es más rápida. El signo ascendente fija las casas. Lee los aspectos más estrechos entre ellos antes de ordenarlos.',
      },
      {
        q: '¿Puedo conocer mis Tres Grandes sin hora de nacimiento?',
        a: 'Sol por lo general sí, Luna por lo general sí salvo en días de cambio de signo, Ascendente no. SideraChart omite el Ascendente cuando la hora está marcada como desconocida.',
      },
      {
        q: '¿El Ascendente es lo mismo que el signo solar?',
        a: 'No. El Sol es la longitud de un planeta. El Ascendente es el grado de la eclíptica en el horizonte este. Solo coinciden por azar, y aun entonces son objetos distintos.',
      },
    ],
  },
  'rising-sign': {
    title: '¿Cuál es mi signo ascendente?',
    excerpt:
      'Tu signo ascendente es el grado del zodiaco en el horizonte este al nacer: el Ascendente. Necesita hora y lugar precisos. Sin hora de nacimiento, sáltalo.',
    sections: [
      {
        heading: '¿Cuál es mi signo ascendente?',
        paragraphs: [
          'Tu signo ascendente, o Ascendente, es el grado del zodiaco tropical que estaba saliendo por el este en el minuto en que naciste. No es un planeta. Es un ángulo local hecho por la rotación de la Tierra, tu latitud y longitud, y el reloj. Dos personas nacidas a la misma hora en ciudades distintas no comparten Ascendente. Dos nacidas en la misma ciudad con una hora de diferencia a menudo tampoco.',
          'La gente busca «¿cuál es mi signo ascendente?» porque la astrología social lo trata como una segunda identidad junto al Sol. En el instrumento es más concreto: es el pistoletazo de salida del sistema de casas y el grado que describe cómo la carta encuentra primero el mundo — cuerpo, entrada, primera impresión. No es una máscara que te pones para extraños, y no es más importante que el Sol por decreto.',
        ],
      },
      {
        heading: 'Por qué el Ascendente necesita una hora de nacimiento',
        paragraphs: [
          'El Ascendente se mueve aproximadamente un grado cada cuatro minutos. Un error de veinte minutos son cinco grados y puede cambiar el signo, sobre todo cerca de un límite. Una conjetura de dos horas es un signo ascendente distinto la mayoría de las veces. El lugar también importa: el mismo Tiempo Universal produce horizontes locales distintos en Londres y en Kyiv.',
          'SideraChart convierte la hora civil a Tiempo Universal con las reglas IANA de esa fecha, luego calcula el tiempo sidéreo local y el grado de la eclíptica que intersecta. Si marcas la hora como desconocida, la calculadora igual devuelve longitudes planetarias y omite el Ascendente. Esa es la salida honesta. Inventar las 12:00 y publicar un signo ascendente es un producto distinto y peor.',
        ],
      },
      {
        heading: 'Signo ascendente frente a signo solar',
        paragraphs: [
          'El signo solar viene de la longitud eclíptica del Sol y es estable a lo largo de un día. El signo ascendente viene del horizonte y no lo es. Puedes conocer tu Sol por una tarta de cumpleaños. No puedes conocer tu signo ascendente por una. Si una app te dio un signo ascendente sin pedir hora, adivinó, normalmente al mediodía, y no debería fiarse.',
          'Cuando conoces ambos, léelos como objetos distintos. Sol en Virgo, Escorpio ascendente es un patrón habitual, no una contradicción. Uno es el argumento solar; el otro es la puerta este y la cuadrícula de casas. La calculadora de signo ascendente de SideraChart es el motor natal filtrado a ese ángulo. La carta completa sigue mostrando por qué el resto del cielo se sienta donde se sienta.',
        ],
      },
      {
        heading: 'Las casas empiezan en el Ascendente',
        paragraphs: [
          'En Placidus, el valor por defecto de SideraChart, la casa I empieza en el Ascendente. El resto de las cúspides sigue el tiempo de ascensión, así que las casas son desiguales. Whole Sign asigna la casa I a todo el signo que contiene el Ascendente y luego cuenta signos. De un modo u otro, sin Ascendente no hay casas honestas.',
          'Cada línea de «planeta en la casa siete» depende de esto. Si el signo ascendente está mal, esas líneas están mal aunque los signos planetarios estén bien. Por eso hora desconocida significa planetas sí, casas no — no «casas aproximadamente». Las latitudes polares por encima de unos 66° también tensan Placidus; pasa a Whole Sign ahí en lugar de forzar cúspides rotas.',
        ],
      },
      {
        heading: 'Horas aproximadas y cartas de mediodía',
        paragraphs: [
          'Una hora anotada como 04:00 puede significar «alrededor de las cuatro» o «exactamente las cuatro». Trata las horas redondeadas como un rango. Recalcula veinte minutos a cada lado y mira si el Ascendente se queda en el signo. Si salta, aún no tienes un signo ascendente; tienes dos candidatos. La rectificación — inventar una hora para que encaje con una biografía — es un oficio aparte, fácil de abusar. SideraChart no lo hace por ti.',
          'La memoria familiar es más débil que un certificado. Si los parientes discrepan, prefiere el documento. Si no hay documento, deja la hora desconocida. Aún puedes leer Sol, Luna (por lo general), Mercurio, Venus, Marte y los planetas exteriores en signos, más los aspectos entre ellos. Eso ya es una carta natal menos el marco local.',
        ],
      },
      {
        heading: 'Cómo calcular tu signo ascendente',
        paragraphs: [
          'Usa la calculadora de signo ascendente de SideraChart o la calculadora de carta natal completa. Introduce fecha, hora y lugar. La fila del Ascendente es el signo y el grado. Las posiciones son tropicales, de astronomy-engine (VSOP87), no Swiss Ephemeris, no siderales. Los aspectos de planetas al Ascendente usan los mismos orbes que los contactos planeta a planeta: 8° / 6° / 4°.',
          'Guarda la carta si quieres casas, el informe escrito y más tarde tránsitos en el gabinete al mediodía natal. Un signo ascendente sin el resto de la rueda sigue siendo solo un ángulo. Calcúlalo con cuidado y luego devuélvelo a la carta a la que pertenece.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Puedo encontrar mi signo ascendente sin hora de nacimiento?',
        a: 'No. El Ascendente es un grado del horizonte. Sin reloj y sin lugar, cualquier signo ascendente es una conjetura. SideraChart lo omite cuando la hora es desconocida.',
      },
      {
        q: '¿Cada cuánto cambia el signo ascendente?',
        a: 'Aproximadamente cada dos horas sale un signo nuevo, y el propio grado se mueve unos 1° cada cuatro minutos. Por eso importan los minutos.',
      },
      {
        q: '¿Signo ascendente es lo mismo que Ascendente?',
        a: 'Sí. Signo ascendente suele significar el signo del Ascendente. El Ascendente es el grado exacto; el signo ascendente es en qué signo tropical cae ese grado.',
      },
      {
        q: '¿Por qué mi signo ascendente es distinto en otro sitio?',
        a: 'Revisa zona horaria, horario de verano, coordenadas y si el otro sitio es sideral. SideraChart es tropical Placidus por defecto. Un relleno de mediodía también produce un Ascendente falso.',
      },
    ],
  },
  'moon-sign': {
    title: '¿Qué es un signo lunar?',
    excerpt:
      'Tu signo lunar es el signo tropical que ocupaba la Luna al nacer. Cambia cada dos días y medio. La hora sigue importando para el grado, la casa y los días de cúspide.',
    sections: [
      {
        heading: '¿Qué es un signo lunar?',
        paragraphs: [
          'Tu signo lunar es el signo del zodiaco tropical que contenía la Luna cuando naciste. La gente lo pide porque es la segunda posición más famosa después del Sol, y porque se mueve lo bastante rápido para que dos personas con el mismo Sol a menudo no lo compartan. La Luna es una longitud como cualquier otro planeta de la carta natal, solo más rápida: unos 13° al día, un signo nuevo cada dos días y medio.',
          'En el lenguaje de la carta, la Luna describe las horas sin nota: apetito, sueño, lo que haces cuando nadie califica la actuación. Eso es una función, no una nota médica ni un permiso. SideraChart coloca la Luna con el mismo motor de clase VSOP87 (astronomy-engine) que el Sol, en el zodiaco tropical, no sideral.',
        ],
      },
      {
        heading: 'A qué velocidad se mueve la Luna',
        paragraphs: [
          'Como la Luna es rápida, una hora de nacimiento sigue valiendo la pena incluso cuando el signo parece obvio. El grado cambia aproximadamente medio grado por hora. Los aspectos a la Luna se estrechan o se aflojan a lo largo de una mañana. La casa de la Luna — una vez que tienes Ascendente — estará mal si el reloj está mal, aunque el signo esté bien.',
          'En un día de cambio de signo, el reloj decide el propio signo. Si naciste un día en que la Luna dejó Tauro por Géminis, una hora desconocida significa que aún no tienes signo lunar. No elijas el que más te guste. Calcúlalo, o marca el hueco.',
        ],
      },
      {
        heading: 'Signo lunar sin hora de nacimiento',
        paragraphs: [
          'Si tienes fecha y no hora, el signo de la Luna suele ser correcto igual. El grado no. La casa no, porque las casas piden el Ascendente y el Ascendente pide el minuto. La regla de SideraChart es la misma que para el resto de la carta: hora desconocida = planetas sí, casas no. En esa frase, la Luna es un planeta.',
          'Un relleno de mediodía es una estimación. Sirve para una primera mirada al signo en un día tranquilo. No es un hecho desde el que debas discutir cuando entran el grado, la casa o una cúspide. Prefiere la hora del certificado. Si no hay, di que la hora es desconocida y lee la Luna solo en signo.',
        ],
      },
      {
        heading: 'Luna y Sol en la misma carta',
        paragraphs: [
          'El Sol es el índice mensual que todo el mundo ya conoce. La Luna es el tiempo interior más rápido. Pueden ocupar el mismo signo (un nacimiento en luna nueva) o signos opuestos (un nacimiento en luna llena) o cualquier punto intermedio. Los aspectos Sol–Luna usan los orbes de SideraChart: 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil. Una cuadratura Sol–Luna estrecha es una afirmación más alta que dos memes de signo apilados.',
          'Los Tres Grandes ponen la Luna entre el Sol y el Ascendente. Puedes conocer Sol y Luna (por lo general) sin hora. No puedes completar el trío sin una. Si solo viniste por el signo lunar, igual introduce hora y lugar cuando los tengas para que el grado y los aspectos sean honestos.',
        ],
      },
      {
        heading: 'Grado, casa y aspectos',
        paragraphs: [
          'El grado te dice cuán temprana o tardía está la Luna en el signo y qué tan cerca está de un aspecto. La casa, con un Ascendente conocido, te dice qué ámbito de la vida lleva esa función lunar. Las demás casas vacías no cancelan la Luna; solo significan que la Luna no está sentada en esas habitaciones.',
          'La calculadora de signo lunar de SideraChart es el motor natal filtrado a un cuerpo. La carta natal completa añade casas (Placidus por defecto), el Ascendente y el aspectario. Los tránsitos diarios a tu Luna natal se guardan en el gabinete al mediodía en la zona horaria natal. Eso es cielo posterior, no una reescritura de la Luna natal.',
        ],
      },
      {
        heading: 'Cómo calcular tu signo lunar',
        paragraphs: [
          'Introduce fecha de nacimiento, hora si la tienes, y lugar. Lee la fila de la Luna: signo, grado, casa si se conoce el reloj. Las posiciones son tropicales. Si otra app es sideral, la Luna puede sentarse en el signo anterior; esa es la brecha de ayanamsha, no un fallo de astronomy-engine.',
          'No trates un signo lunar como consejo financiero, legal ni médico. Úsalo como una coordenada. Si falta la hora, deja la coordenada gruesa: solo el signo. Si la hora está, usa el grado y los aspectos. Ese es todo el método.',
          'Compara con el Sol antes de parar. Sol y Luna en el mismo signo (nacimiento en luna nueva) tiene otra textura que una oposición de luna llena. Ambos son astronomía ordinaria. SideraChart mostrará el orbe; tú decides si 6° todavía cuenta como alto. Los tránsitos posteriores de la Luna en el gabinete son tiempo, guardados al mediodía natal, no un signo lunar nuevo.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cómo encuentro mi signo lunar?',
        a: 'Calcula una carta natal a partir de fecha, hora y lugar de nacimiento. La fila de la Luna es el signo tropical. La calculadora de signo lunar de SideraChart usa el mismo motor que la carta completa.',
      },
      {
        q: '¿Necesito hora de nacimiento para mi signo lunar?',
        a: 'Por lo general no para el signo. Necesitas una hora para el grado, la casa y cualquier cumpleaños en que la Luna cambiara de signo.',
      },
      {
        q: '¿Cada cuánto cambia de signo la Luna?',
        a: 'Unos cada dos días y medio. Por eso las personas nacidas en el mismo mes de signo solar a menudo tienen Lunas distintas.',
      },
      {
        q: '¿Por qué mi signo lunar difiere en un sitio védico?',
        a: 'Los zodiacos siderales miden desde un punto cero estelar a unos 24° del equinoccio tropical de hoy. SideraChart es solo tropical.',
      },
    ],
  },
  'venus-sign': {
    title: '¿Qué es un signo de Venus?',
    excerpt:
      'Tu signo de Venus es el signo tropical que ocupaba Venus al nacer. Describe el estilo en atracción, gusto y valores: una coordenada natal, no un veredicto de citas.',
    sections: [
      {
        heading: '¿Qué es un signo de Venus?',
        paragraphs: [
          'Tu signo de Venus es el signo del zodiaco tropical que contenía a Venus al nacer. La gente busca «¿qué es un signo de Venus?» porque la astrología popular usa Venus como taquigrafía del gusto, la atracción y el modo en que pones precio a lo que no es una factura: el arte, los modales, la gente que retienes. En el instrumento es una longitud planetaria, calculada como las demás a partir de fecha, hora y lugar de nacimiento.',
          'SideraChart coloca a Venus en el zodiaco tropical con astronomy-engine (VSOP87). No es una Venus sideral ni una hora china. El signo es la rebanada de 30°. La casa, si tienes hora de nacimiento, es el ámbito local. Los aspectos a Venus usan orbes de 8° / 6° / 4°. Nada de eso es un veredicto sobre si una relación debe continuar.',
        ],
      },
      {
        heading: 'Qué mide Venus en una carta natal',
        paragraphs: [
          'Venus es el apetito de la carta por armonía, valor y contacto. En la práctica la lees como cómo te gusta que se sientan las habitaciones, qué llamas lo bastante bello y cómo negocias la cercanía. Eso es descriptivo. No te dice con quién salir, si gastar dinero o cómo resolver un litigio. Quédate con la función; suelta la adivinación.',
          'Venus nunca viaja lejos del Sol, así que tu signo de Venus suele ser el mismo que tu signo solar o un vecino. Eso es astronomía, no destino. Un Sol de Géminis con Venus en Tauro es una división habitual: argumento solar en un estilo, Venus en el anterior. Lee ambos en lugar de forzarlos a un solo eslogan.',
        ],
      },
      {
        heading: 'Velocidad, retrógrado y cambios de signo',
        paragraphs: [
          'Venus pasa unas semanas en un signo en movimiento directo y más tiempo cuando se estaciona o se pone retrógrada. Venus retrógrada al nacer es un hecho natal sobre el movimiento aparente, no una maldición ni un trastorno de personalidad. Significa que la longitud se movía hacia atrás a lo largo de la eclíptica ese día. Calcúlalo; no lo dramatizes.',
          'Como Venus es más lenta que la Luna, por lo general obtienes el signo correcto solo con la fecha. La hora sigue fijando el grado, la casa y de qué lado de una cúspide estás. Hora desconocida: planetas sí, casas no. No inventes el mediodía para meter a Venus en la casa siete y luego trates esa casa como prueba.',
        ],
      },
      {
        heading: 'Venus frente a los Tres Grandes',
        paragraphs: [
          'Sol, Luna y Ascendente siguen siendo el primer pase. Venus es una coordenada de especialista que lees después de esos tres, salvo que Venus esté apilada en un ángulo o trabada en un aspecto estrecho con ellos. Una conjunción Venus–Saturno dentro de 8° suena más alto que un texto de signo de Venus. Mira el aspectario.',
          'El signo ascendente sigue necesitando el reloj. Si viniste solo por Venus y tienes hora, introdúcela igual para que casa y aspectos sean reales. La calculadora de signo de Venus de SideraChart es el motor natal filtrado a un glifo. La carta completa es el contexto que impide que Venus se coma toda la lectura.',
        ],
      },
      {
        heading: 'Casas y aspectos a Venus',
        paragraphs: [
          'Con un Ascendente conocido, Venus en una casa nombra el ámbito de la vida donde esa función de valorar es obvia: cuarta, séptima, décima y así. Las casas vacías en otros sitios no son órganos que faltan. Placidus es el valor por defecto de SideraChart; Whole Sign es la alternativa cuando quieres signos iguales o cuando estás en alta latitud.',
          'Los aspectos mayores a Venus son conjunción, sextil, cuadratura, trígono y oposición. Los orbes más estrechos se leen primero. Los tránsitos a la Venus natal viven después en el gabinete diario, guardados al mediodía en la zona horaria natal. Esos tránsitos no cambian el signo natal de Venus. Son tiempo contra un punto fijo.',
        ],
      },
      {
        heading: 'Cómo encontrar tu signo de Venus',
        paragraphs: [
          'Introduce fecha, hora y lugar de nacimiento en SideraChart. Lee la fila de Venus. Compárala con el Sol: a menudo cerca, a veces el mismo. Si una app sideral discrepa, estás mirando otro punto cero, a unos 24°. Pasa esa app a tropical si quieres coincidir con este sitio.',
          'Usa la posición como coordenada en una carta natal, no como consejo de citas. Si la hora es desconocida, deja a Venus en signo y salta la casa. Si la hora es conocida, lee grado, casa y aspectos. Luego devuelve a Venus junto al resto de la rueda.',
          'Si más tarde corres una sinastría, los contactos de Venus entre dos cartas son otro mapa. Calcula primero tu Venus natal para saber qué longitud están contactando las demás personas. Los puntos medios de una carta compuesta que incluyen a Venus son un tercer mapa otra vez. Una coordenada, tres instrumentos: no mezcles las impresiones.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cómo encuentro mi signo de Venus?',
        a: 'Corre una carta natal o la calculadora de signo de Venus de SideraChart con tu fecha de nacimiento, y añade hora y lugar si los tienes. La fila de Venus es el signo tropical y el grado.',
      },
      {
        q: '¿Venus necesita una hora de nacimiento exacta?',
        a: 'Por lo general no para el signo. Necesitas una hora para la casa, el grado exacto en una cúspide y los aspectos que se estrechan a lo largo del día.',
      },
      {
        q: '¿Qué significa Venus retrógrada en la carta natal?',
        a: 'Significa que la longitud eclíptica aparente de Venus se movía hacia atrás al nacer. Calcúlalo como un hecho de movimiento. No es un veredicto médico ni de relación.',
      },
      {
        q: '¿Por qué mi signo de Venus está junto a mi signo solar?',
        a: 'Venus se queda cerca del Sol en el cielo, así que los signos natales suelen ser el mismo o adyacentes. Eso es geometría orbital, no un destino especial.',
      },
    ],
  },
  'mercury-sign': {
    title: '¿Qué es un signo de Mercurio?',
    excerpt:
      'Tu signo de Mercurio es el signo tropical que ocupaba Mercurio al nacer. Mercurio se queda cerca del Sol, así que los signos coinciden o son vecinos. La hora sigue fijando casa y grado.',
    sections: [
      {
        heading: '¿Qué es un signo de Mercurio?',
        paragraphs: [
          'Tu signo de Mercurio es el signo del zodiaco tropical que contenía a Mercurio al nacer. La gente lo busca porque Mercurio es la función de lenguaje y recados de la carta: cómo ordenas información, hablas, te desplazas y cambias de opinión. Es una longitud en la carta natal, no una medida de inteligencia ni un diagnóstico de atención.',
          'SideraChart calcula a Mercurio en el zodiaco tropical a partir de astronomy-engine (VSOP87), con casas Placidus cuando hay hora de nacimiento. No usa Swiss Ephemeris y no ofrece un Mercurio sideral ni védico. Si otra app discrepa aproximadamente un signo, comprueba si es sideral antes de asumir un error.',
        ],
      },
      {
        heading: 'Mercurio nunca lejos del Sol',
        paragraphs: [
          'La órbita de Mercurio lo mantiene cerca del Sol en el cielo, así que tu signo de Mercurio suele ser el mismo que tu signo solar o un signo de diferencia. Un Sol de Leo con Mercurio en Virgo es geometría ordinaria. Trata esa división como útil: argumento solar en un estilo, la función de hablar y ordenar en el siguiente. No los aplastes en un solo meme.',
          'Como Mercurio no es tan rápido como la Luna, la fecha a menudo zanja el signo. La hora sigue importando para el grado, para los aspectos que se forman durante el día y para la casa. Hora desconocida: puedes quedarte con el signo de Mercurio; no puedes quedarte con una afirmación de Mercurio en casa.',
        ],
      },
      {
        heading: 'Mercurio retrógrado al nacer',
        paragraphs: [
          'Mercurio se estaciona y se pone retrógrado tres o cuatro veces al año. Un Mercurio natal retrógrado significa que la longitud aparente se movía hacia atrás en la eclíptica al nacer. Eso es una bandera de movimiento, no una maldición sobre tus correos ni una etiqueta de dificultad de aprendizaje. Calcúlalo, anótalo, lee el signo y los aspectos a su alrededor.',
          'Los periodos retrógrados también significan que Mercurio puede pasar tiempo extra en un signo o reentrar en el anterior. Los días de cúspide alrededor de las estaciones merecen un reloj real. Si la hora es desconocida en esas fechas, deja el signo sin resolver en lugar de elegir la historia que te gusta.',
        ],
      },
      {
        heading: 'Mercurio, casas y los Tres Grandes',
        paragraphs: [
          'Lee primero Sol, Luna y Ascendente salvo que Mercurio esté en conjunción con uno de ellos o apilado en un ángulo. Una conjunción Mercurio–Luna dentro de 8° coloreará ambas funciones. El Ascendente sigue necesitando la hora de nacimiento; sin ella, salta las casas por completo.',
          'Mercurio en una casa (Placidus por defecto) nombra dónde es obvia la función de ordenar: tercera, sexta, décima, y así. Las casas vacías están vacías de planetas, no vacías de vida. Whole Sign está disponible cuando quieres que cada casa sea un signo entero a partir del signo del Ascendente, o cuando Placidus se porta mal en alta latitud.',
        ],
      },
      {
        heading: 'Aspectos a Mercurio',
        paragraphs: [
          'Los aspectos mayores son conjunción, sextil, cuadratura, trígono y oposición. Los orbes de SideraChart son 8° para conjunción y oposición, 6° para cuadratura y trígono, 4° para sextil. Los contactos estrechos Mercurio–Saturno o Mercurio–Urano dirán más que el texto del signo. Usa la tabla bajo la rueda.',
          'Los tránsitos a Mercurio natal aparecen después en el gabinete diario, guardados al mediodía en la zona horaria natal para que la nota del día no derive si refrescas a las 23:00. Esos tránsitos no reescriben el signo natal de Mercurio. La posición natal es la línea de base.',
          'Un Mercurio en tránsito retrógrado sobre el Mercurio natal es una superposición temporal, popular en titulares y fácil de sobreleer. Anota el orbe, anota si es aplicativo, luego mira el resto de los contactos lentos del día. El tiempo rápido de Mercurio no debería desbancar un tránsito de Saturno que de verdad está estrecho.',
        ],
      },
      {
        heading: 'Cómo calcular tu signo de Mercurio',
        paragraphs: [
          'Usa la calculadora de signo de Mercurio de SideraChart o la carta natal completa. Introduce fecha, hora y lugar. Lee la fila de Mercurio y luego echa un vistazo al Sol para ver si comparten signo. Solo tropical. Si necesitas casas, necesitas el reloj; si no tienes el reloj, párate en el signo.',
          'No trates a Mercurio como consejo laboral, legal ni médico. Es una coordenada de cómo habla y ordena la carta. Devuélvelo a la rueda con Venus, Marte y los Tres Grandes antes de decidir que la carta tiene un solo tema.',
          'Cuando coincidas con otro sitio, pon zodiaco tropical y la misma zona horaria de nacimiento. Un signo de Mercurio que salta suele ser sideral, un error de reloj en un día de estación, o un fallo de historia de zona horaria — no astronomy-engine fallando. Las casas seguirán discrepando si un sitio usó Whole Sign y tú dejaste SideraChart en Placidus.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cómo encuentro mi signo de Mercurio?',
        a: 'Calcula una carta natal a partir de fecha, hora y lugar de nacimiento, o usa la calculadora de signo de Mercurio de SideraChart. La fila de Mercurio es el signo tropical y el grado.',
      },
      {
        q: '¿Por qué mi Mercurio está en el mismo signo que mi Sol?',
        a: 'Mercurio nunca se aleja mucho del Sol, así que los signos natales a menudo coinciden o se sientan al lado. Mira los grados; aún pueden aspectar a otros planetas de modo distinto.',
      },
      {
        q: '¿Necesito hora de nacimiento para Mercurio?',
        a: 'Por lo general no para el signo. Necesitas una hora para la casa y para días de cúspide o de estación en que el signo de Mercurio puede saltar.',
      },
      {
        q: '¿El Mercurio natal retrógrado es algo malo?',
        a: 'Es un hecho de movimiento aparente, no un veredicto. Lee el signo, la casa y los aspectos. No es una afirmación sobre inteligencia ni salud.',
      },
    ],
  },
  'mars-sign': {
    title: '¿Qué es un signo de Marte?',
    excerpt:
      'Tu signo de Marte es el signo tropical que ocupaba Marte al nacer. Describe cómo la carta arranca, discute y persigue: una coordenada natal, no una licencia para el conflicto.',
    sections: [
      {
        heading: '¿Qué es un signo de Marte?',
        paragraphs: [
          'Tu signo de Marte es el signo del zodiaco tropical que contenía a Marte al nacer. La gente busca «¿qué es un signo de Marte?» porque los textos populares tratan a Marte como combustible: cómo arrancas, compites, deseas y te enfadas. En el instrumento es una longitud planetaria en una carta natal, calculada a partir de fecha, hora y lugar de nacimiento. No es un permiso para la crueldad ni una lectura médica de sangre o músculos.',
          'SideraChart coloca a Marte en el zodiaco tropical con astronomy-engine (VSOP87). Las casas, cuando se conoce el reloj, van por defecto a Placidus. Los sistemas sideral y chino quedan fuera de alcance. Si una app védica muestra un signo de Marte distinto, estás mirando otro punto cero, no otro planeta.',
        ],
      },
      {
        heading: 'Qué describe Marte en la carta',
        paragraphs: [
          'Marte es la función de iniciar y combatir: calor, persecución, el primer movimiento en un conflicto, la voluntad de abrirse camino. Lees el signo como el estilo de ese calor — directo, lento, táctico, teatral — y la casa como el ámbito donde se muestra. Quédate en lo descriptivo. No lo uses para justificar daño ni para predecir violencia.',
          'Marte puede sentarse lejos del Sol, a diferencia de Mercurio y Venus, así que tu signo de Marte a menudo es distinto de tu signo solar. Esa división es ordinaria. Un Sol de Tauro con Marte en Aries no es una contradicción. Son dos funciones con dos estilos. Lee ambos y luego mira la tabla de aspectos antes de ordenar a cualquiera de los dos.',
        ],
      },
      {
        heading: 'Velocidad, retrógrado y hora de nacimiento',
        paragraphs: [
          'Marte pasa unas seis o siete semanas en un signo cuando va directo, más alrededor del retrógrado. Marte natal retrógrado significa que la longitud aparente se movía hacia atrás al nacer. Anótalo como movimiento. No lo trates como un defecto de carácter.',
          'La fecha suele zanjar el signo. La hora sigue fijando el grado, los aspectos a lo largo del día y la casa. Hora desconocida: planetas sí, casas no. Una carta de mediodía que aparca a Marte en un ángulo es una conjetura. Si te importa «Marte en la casa uno», necesitas un Ascendente real, y eso significa un reloj real.',
        ],
      },
      {
        heading: 'Marte, los Tres Grandes y los demás planetas',
        paragraphs: [
          'Lee primero Sol, Luna y Ascendente salvo que Marte esté en conjunción con uno de ellos o sentado en el Ascendente o el Medio Cielo. Una cuadratura Marte–Luna dentro de 6° hablará más alto que un párrafo de signo de Marte. El Ascendente sigue pidiendo hora y lugar de nacimiento.',
          'Los contactos Marte–Venus y Marte–Saturno son fáciles de sobre-narrar. Usa el aspectario de SideraChart y los orbes declarados: 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil. Primero lo estrecho. Los contactos anchos en el borde del orbe son más callados. Las líneas de color de la rueda coinciden con la tabla.',
        ],
      },
      {
        heading: 'Casas y tránsitos posteriores',
        paragraphs: [
          'Con un Ascendente conocido, Marte en una casa nombra dónde es obvia la función de iniciar. Las casas vacías no significan que te falte ese ámbito de la vida; significan que ningún planeta está sentado en esa habitación. Placidus es el valor por defecto porque la mayoría de los textos occidentales lo asumen. Whole Sign es más limpio en altas latitudes y cuando quieres signo = casa.',
          'Los tránsitos a Marte natal son tiempo posterior. El gabinete de SideraChart guarda la superposición del día al mediodía en la zona horaria natal. Una cuadratura de Marte en tránsito a Marte natal es un contacto temporal, no una reescritura del signo natal de Marte. Guarda la línea de base y el tiempo en cajones distintos.',
          'El retorno de Marte — Marte en tránsito de vuelta al grado natal — es un ciclo de unos dos años, no un reinicio de personalidad. Si lo sigues en el gabinete, estás siguiendo un contacto que se repite, no una carta natal nueva. Los días perdidos se quedan perdidos; el producto no inventa un retorno que no abriste.',
        ],
      },
      {
        heading: 'Cómo encontrar tu signo de Marte',
        paragraphs: [
          'Usa la calculadora de signo de Marte o la carta natal completa en SideraChart. Introduce fecha, hora y lugar. Lee la fila de Marte y luego los aspectos. Solo tropical. Haz coincidir otros sitios poniéndolos en tropical más Placidus si quieres las mismas casas.',
          'Devuelve a Marte a la carta. Un signo de Marte sin Sol, Luna, Ascendente y el resto es una nota de especialista. Calcúlalo con cuidado y luego léelo como una función entre diez cuerpos, no como toda la persona.',
          'Si la hora es desconocida, aún puedes citar el signo de Marte y los aspectos planeta a planeta. No puedes citar a Marte en el Ascendente o en la casa diez. Escribe el límite en la misma página que el signo para no colar después lenguaje de casas.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cómo encuentro mi signo de Marte?',
        a: 'Calcula una carta natal o usa la calculadora de signo de Marte de SideraChart con fecha, hora y lugar de nacimiento. La fila de Marte es el signo tropical y el grado.',
      },
      {
        q: '¿Necesito hora de nacimiento para mi signo de Marte?',
        a: 'Por lo general no para el signo. Necesitas una hora para la casa, para una cúspide y para cualquier afirmación de que Marte se sienta en un ángulo.',
      },
      {
        q: '¿Qué significa Marte natal retrógrado?',
        a: 'Movimiento aparente hacia atrás a lo largo de la eclíptica al nacer. Regístralo como una bandera de movimiento y lee el signo y los aspectos. No es un veredicto sobre ira ni salud.',
      },
      {
        q: '¿Por qué mi signo de Marte difiere de mi signo solar?',
        a: 'Marte puede estar en cualquier punto de la eclíptica respecto al Sol a lo largo de su ciclo de dos años. Signos distintos son normales. Lee ambas posiciones.',
      },
    ],
  },
  'why-birth-time-matters': {
    title: '¿Por qué importa la hora de nacimiento en una carta natal?',
    excerpt:
      'La hora de nacimiento fija el Ascendente, las casas y el grado de la Luna. Un error de veinte minutos puede cambiar el signo ascendente. Sin hora obtienes signos planetarios, no casas.',
    sections: [
      {
        heading: '¿Por qué importa la hora de nacimiento en una carta natal?',
        paragraphs: [
          'La hora de nacimiento importa porque en una sola marca civil se esconden dos relojes. El primero convierte tu hora local a Tiempo Universal para que las longitudes planetarias sean correctas. El segundo, con latitud y longitud, fija el tiempo sidéreo local: qué grado de la eclíptica estaba saliendo, cuál culminaba y dónde caen las cúspides de las casas. La gente pregunta «¿por qué importa la hora de nacimiento?» cuando tiene un cumpleaños pero no un minuto. La respuesta corta: los planetas en su mayoría sobreviven; el marco local no.',
          'SideraChart usa las reglas IANA vigentes en esa fecha, incluido el horario de verano histórico, y luego lee posiciones tropicales en astronomy-engine (VSOP87). Una zona horaria incorrecta daña tanto como un minuto incorrecto. Un nacimiento listado a las 14:00 con el desfase equivocado es otro cielo y otro Tiempo Universal.',
        ],
      },
      {
        heading: 'El Ascendente se mueve aproximadamente un grado cada cuatro minutos',
        paragraphs: [
          'El signo ascendente es un grado del horizonte. Recorre unos 1° en cuatro minutos, un signo nuevo en unas dos horas. Un error de veinte minutos son unos cinco grados y puede saltar el signo cerca de un límite. Eso no es una sensibilidad mística. Es la Tierra girando.',
          'Si tu signo ascendente está mal, las casas Placidus lo están con él, porque la casa I empieza en el Ascendente. Cada frase de planeta-en-casa se desplaza entonces. Esa es la razón principal para cuidar el reloj aunque el signo solar sea obvio.',
        ],
      },
      {
        heading: 'Las casas dependen del tiempo sidéreo local',
        paragraphs: [
          'Las casas son sectores del cielo local, no signos. Los signos son 30° del zodiaco tropical. Las casas son lo que obtienes cuando divides el espacio alrededor del horizonte y el meridiano. Placidus, el valor por defecto de SideraChart, divide el tiempo de ascensión, así que las casas son desiguales. Whole Sign da a cada casa un signo entero a partir del signo del Ascendente.',
          'Sin hora de nacimiento no hay Ascendente honesto y por tanto no hay casas honestas. Hora desconocida = planetas sí, casas no. SideraChart sigue esa regla en lugar de aparcarte en silencio al mediodía. El mediodía es una convención para algunas cartas históricas; no es tu Ascendente.',
        ],
      },
      {
        heading: 'El grado de la Luna y otros datos rápidos',
        paragraphs: [
          'La Luna se mueve aproximadamente medio grado por hora. A lo largo de un día eso son varios grados: suficiente para cambiar aspectos y, en un día de cambio de signo, el propio signo lunar. Mercurio, Venus y el Sol también pueden sentarse en una cúspide. Los planetas exteriores apenas se mueven en un día; sus signos están a salvo sin hora.',
          'Los aspectos entre planetas existen igual sin casas. SideraChart listará aspectos mayores dentro de orbes de 8° / 6° / 4° a partir de las longitudes planetarias incluso cuando se omite el Ascendente. Lo que pierdes es todo lo que necesita un ángulo: signo ascendente, cúspides de casa, planetas en el Medio Cielo.',
        ],
      },
      {
        heading: 'Certificados, memoria y horas redondeadas',
        paragraphs: [
          'Prefiere un certificado de nacimiento o un registro hospitalario a un relato. Los parientes redondean. «Sobre las seis» puede significar las 17:40. Recalcula un rango si la hora es aproximada y mira si el Ascendente se queda. Si no, aún no tienes un signo ascendente.',
          'No rectifiques una hora para que encaje con una biografía dentro de esta calculadora. SideraChart no inventará un minuto para que la casa diez se parezca a tu cargo. Si la hora es desconocida, márcala desconocida. Lee planetas en signos y aspectos. Deja las casas para un día en que tengas un reloj.',
          'Los registros hospitalarios ganan a las conjeturas de bautizo. Una hora escrita como 16 h 30 es mejor que «a última hora de la tarde». Si el documento usa una hora media local antigua, dilo cuando compares con otro sitio; la conversión IANA asume la zona civil de esa fecha, que es lo que aplica SideraChart.',
        ],
      },
      {
        heading: 'Qué introducir en SideraChart',
        paragraphs: [
          'Fecha, hora, lugar. El lugar se busca hasta coordenadas; la hora se convierte con IANA; los planetas vienen de efemérides de clase VSOP87; las casas van por defecto a Placidus. Si falta la hora, usa la opción de hora desconocida. Aún obtienes una carta planetaria usable. No obtienes un signo ascendente.',
          'Más tarde, el gabinete diario guarda tránsitos al mediodía en la zona horaria natal. Ese mediodía es una instantánea estable para tránsitos, no un sustituto de una hora de nacimiento que falta. Tu Ascendente natal sigue necesitando el minuto real. No mezcles esos dos mediodías.',
          'Si los parientes te dan dos horas con una hora de diferencia, calcula ambas y compara Ascendentes. Si el signo se sostiene, tienes un signo ascendente de trabajo con un rango de grado. Si salta, aún no tienes uno. Publica el rango, no una precisión falsa de 14:00:00.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué pasa si mi hora de nacimiento está mal?',
        a: 'Los signos planetarios suelen sobrevivir. El Ascendente, las casas y el grado de la Luna pueden no. Un error de veinte minutos puede cambiar el signo ascendente cerca de una cúspide.',
      },
      {
        q: '¿Es precisa una carta natal de mediodía?',
        a: 'Puede estimar signos planetarios en un día tranquilo. No es un Ascendente preciso ni un sistema de casas. SideraChart trata la hora desconocida como solo planetas.',
      },
      {
        q: '¿El lugar de nacimiento importa tanto como la hora?',
        a: 'Para el Ascendente y las casas, sí: latitud y longitud fijan el horizonte. Para los signos planetarios, el lugar apenas importa. Los errores de zona horaria importan para ambos.',
      },
      {
        q: '¿Puedo usar las 12:00 si no sé la hora?',
        a: 'Puedes como boceto para signos. No leas casas ni Ascendente a partir de eso. Marca la hora desconocida en SideraChart en lugar de fingir que el mediodía es un hecho.',
      },
    ],
  },
  'birth-chart-without-time': {
    title: '¿Puedo hacer una carta natal sin hora de nacimiento?',
    excerpt:
      'Sí: los signos planetarios y los aspectos se calculan igual sin hora de nacimiento. El Ascendente y las casas no. No trates una carta de mediodía como un mapa natal completo de casas.',
    sections: [
      {
        heading: '¿Puedo hacer una carta natal sin hora de nacimiento?',
        paragraphs: [
          'Sí, con un límite claro. Sin hora de nacimiento aún puedes calcular longitudes planetarias a partir de la fecha (y una zona/lugar para el Tiempo Universal). Eso te da del Sol a Plutón en signos tropicales y los aspectos mayores entre ellos. No puedes calcular un Ascendente, un Medio Cielo o cúspides de casa fiables. La carta natal honesta sin hora es una carta planetaria, no una rueda completa de casas.',
          'SideraChart te deja marcar la hora como desconocida y entonces devuelve planetas y omite el signo ascendente. Ese es el producto correcto. Muchos sitios usan en silencio las 12:00 y dibujan casas igual. Esas casas pertenecen a quien nació al mediodía, que no es un hecho sobre ti.',
        ],
      },
      {
        heading: 'Lo que aún obtienes: signos planetarios',
        paragraphs: [
          'El Sol, Mercurio, Venus, Marte y los planetas exteriores se mueven lo bastante despacio para que una fecha de calendario suele fijar el signo. Los aspectos entre esos cuerpos también son usables, con los orbes de SideraChart de 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil. Puedes leer mucho de una carta así: equilibrio de elementos, un estelium en un signo, una cuadratura estrecha de Saturno al Sol.',
          'El lugar sigue ayudando, porque la zona horaria y el horario de verano convierten la fecha en Tiempo Universal. Un nacimiento cerca de medianoche puede caer técnicamente en la fecha vecina en UT. Si conoces la ciudad pero no el minuto, introduce el lugar y hora desconocida en lugar de un reloj falso.',
        ],
      },
      {
        heading: 'Lo que pierdes: Ascendente y casas',
        paragraphs: [
          'El Ascendente es un grado del horizonte. Necesita el minuto. Las casas en Placidus empiezan ahí. Las casas Whole Sign también necesitan el signo del Ascendente. Sin hora, sin casas — no «casas aproximadas». Hora desconocida = planetas sí, casas no. Interioriza esa frase y evitarás la carta natal mala más común de internet.',
          'Sin casas no puedes decir con honestidad que un planeta está en la casa diez, o que tienes la siete vacía. Esas afirmaciones son locales. Aún puedes decir que el planeta está en Capricornio, o que dos planetas están en oposición. Quédate en la eclíptica hasta que tengas un reloj.',
        ],
      },
      {
        heading: 'La Luna en un día de cambio de signo',
        paragraphs: [
          'La Luna es la excepción que muerde. Cambia de signo cada dos días y medio. Si no cambió el día de tu cumpleaños, el signo suele estar a salvo sin hora. Si sí, no tienes signo lunar hasta que tengas un reloj. No elijas la Luna que más te gusta.',
          'Incluso en un día lunar tranquilo, el grado es incierto en varios grados a lo largo de veinticuatro horas. Los aspectos que se sientan cerca del borde del orbe — 8°, 6°, 4° — pueden estar dentro o fuera según la hora. Trata los aspectos lunares en el borde del orbe como provisionales cuando la hora es desconocida.',
        ],
      },
      {
        heading: 'Por qué el mediodía es una conjetura, no una carta',
        paragraphs: [
          'El mediodía es popular porque es el medio del día civil y porque algunas efemérides históricas listaban posiciones diarias al mediodía. Sigue siendo una hora concreta. Produce un Ascendente concreto para esa latitud. Usarlo como sustituto de «desconocido» esconde la incertidumbre en lugar de etiquetarla.',
          'Si tienes que bocetar, calcula planetas al mediodía e ignora la rueda de casas. El camino de hora desconocida de SideraChart hace esa etiqueta por ti. Los nacimientos polares tienen un segundo problema: las cúspides Placidus se rompen por encima de unos 66° de latitud incluso con una hora perfecta. Eso es un límite del sistema de casas, no una razón para fingir un reloj.',
        ],
      },
      {
        heading: 'Cómo usar SideraChart sin hora',
        paragraphs: [
          'Introduce fecha y lugar, marca la hora desconocida, lee la tabla de planetas. Salta las herramientas de signo ascendente. Salta cualquier frase que necesite una casa. Aún puedes usar las calculadoras de signo planetario para Sol, Luna (por lo general), Mercurio, Venus y Marte. Zodiaco tropical, VSOP87 a través de astronomy-engine, no Swiss Ephemeris, no sideral.',
          'Los aspectos entre los planetas siguen siendo juego limpio. Ordénalos por orbe del mismo modo: 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil. Una cuadratura estrecha Sol–Saturno sin casas sigue siendo una cuadratura estrecha Sol–Saturno. Lo que no debes hacer es pegarla a «carrera de la casa diez» hasta que exista el Ascendente.',
          'Si más tarde aparece una hora — un certificado, una nota de la partera — recalcula y entonces, y solo entonces, lee casas. La instantánea de mediodía del gabinete diario para tránsitos es otro mediodía: guarda el cielo de hoy contra una carta natal guardada. No rellena un minuto de nacimiento que falta. Mantén esos trabajos separados.',
          'Aún puedes guardar una carta solo planetaria. La capa escrita será más delgada porque caen las frases de casa. Eso es preferible a un informe grueso construido sobre cúspides de mediodía. Cuando llegue el reloj, recalcula una vez y sustituye la carta guardada en lugar de apilar dos ruedas en conflicto.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Puedo levantar una carta natal solo con la fecha de nacimiento?',
        a: 'Puedes levantar signos planetarios y aspectos. No puedes levantar un Ascendente o casas fiables. SideraChart marca ese límite cuando la hora es desconocida.',
      },
      {
        q: '¿Está bien una hora de nacimiento 12:00 si no sé la hora real?',
        a: 'Solo como boceto para planetas lentos. No leas el signo ascendente ni las casas a partir del mediodía. Prefiere la opción de hora desconocida.',
      },
      {
        q: '¿Mi signo lunar será correcto sin hora?',
        a: 'Por lo general, salvo que la Luna cambiara de signo el día de tu cumpleaños. El grado y la casa no serán correctos sin un reloj.',
      },
      {
        q: '¿Qué debo leer primero si no tengo hora de nacimiento?',
        a: 'Signos planetarios, sobre todo Sol, Luna si está a salvo, Mercurio, Venus, Marte, y los aspectos más estrechos. Deja las casas hasta que tengas una hora.',
      },
    ],
  },
  'how-to-read-a-natal-chart': {
    title: 'Cómo leer una carta natal',
    excerpt:
      'Lee una carta natal en orden: Tres Grandes, casas ocupadas, luego los aspectos más estrechos. Usa las tablas como instrumento. Hora desconocida significa saltar casas y Ascendente.',
    sections: [
      {
        heading: 'Cómo leer una carta natal',
        paragraphs: [
          'Una carta natal es más fácil si te niegas a leerlo todo a la vez. Empieza por los Tres Grandes — Sol, Luna, Ascendente — luego las casas que de verdad contienen planetas, luego los aspectos mayores más estrechos. La rueda es un mapa. Las tablas son el instrumento. Primero los números: signo, grado, casa, orbe. El texto después. Ese orden te evita ahogarte en doce ensayos de signo antes de saber qué habitaciones están ocupadas.',
          'Necesitas fecha, hora y lugar de nacimiento para el método completo. Si la hora es desconocida, deja el Ascendente y las casas y lee planetas en signos más aspectos. SideraChart sigue esa división. No rodees un reloj que falta «cómo leer una carta natal» fingiendo que el mediodía es un dato. Escribe el hueco en la página.',
        ],
      },
      {
        heading: 'Empieza por Sol, Luna y Ascendente',
        paragraphs: [
          'El Sol es el argumento de luz diurna, a partir de la fecha. La Luna es el tiempo interior más rápido; comprueba si cambió de signo ese día. El Ascendente es el horizonte este y solo existe con una hora. Lee si los tres riman o discuten. Luego mira los aspectos entre ellos con orbes de 8° / 6° / 4°.',
          'Si solo tienes el Sol, aún no sabes leer la carta; conoces una coordenada. La rueda de SideraChart pone esos tres glifos donde puedes verlos antes de ir a cazar asteroides o puntos hipotéticos que este sitio no usa.',
        ],
      },
      {
        heading: 'Luego lee las casas ocupadas',
        paragraphs: [
          'Las casas son ámbitos locales. Un planeta en la diez no es lo mismo que ese planeta en la cuatro, aunque esté en el mismo signo. Lista las casas que contienen cuerpos. Esas son las habitaciones altas. Las casas vacías no son defectos; son habitaciones sin un planeta sentado dentro. Hay un artículo aparte para eso.',
          'SideraChart va por defecto a Placidus porque la mayoría de los textos occidentales lo asumen. Whole Sign es la otra cuadrícula. Las latitudes polares por encima de unos 66° no deberían forzar cúspides Placidus rotas. Si la hora es desconocida, salta este paso entero. El lenguaje de planeta-en-casa sin Ascendente es ficción.',
        ],
      },
      {
        heading: 'Luego lee los aspectos más estrechos',
        paragraphs: [
          'Los aspectos son ángulos con nombre: conjunción, sextil, cuadratura, trígono, oposición. Ordena por orbe, primero lo más estrecho. Una conjunción Sol–Saturno de 0,4° desbanca un trígono de Marte de 7,8°. SideraChart dibuja los cinco mayores y lista aplicativo o separativo en la tabla. Oculta las líneas de la rueda si el dibujo hace ruido; la tabla se queda.',
          'No moralices los aspectos. Las cuadraturas son fricción que construye un oficio si las trabajas; no son maldiciones. Los trígonos son facilidad que puede volverse perezosa. Las conjunciones fusionan funciones. Las oposiciones polarizan. Quédate con la geometría. Suelta «el universo quiere».',
        ],
      },
      {
        heading: 'Rueda, tablas y capa escrita',
        paragraphs: [
          'El anillo exterior son signos. Las divisiones interiores son casas. Los glifos se sientan en longitudes. Las líneas de color son aspectos. Abre una fila de tabla para el signo, la casa y el grado exactos. Las tarjetas escritas bajo una carta guardada son una capa de interpretación en caché, no un modelo de lenguaje en vivo que inventa física nueva.',
          'Una exportación PNG es una instantánea para compartir. Las tablas en vivo son lo que relees. Si otro sitio discrepa, haz coincidir zodiaco tropical, Placidus y la misma zona horaria de nacimiento antes de culpar a las efemérides. SideraChart usa astronomy-engine (VSOP87), no Swiss Ephemeris. Diferencias de unos minutos de arco son esperables; un signo entero suele significar un ajuste sideral o un reloj equivocado.',
        ],
      },
      {
        heading: 'Un orden de trabajo en SideraChart',
        paragraphs: [
          'Calcula la carta. Confirma fecha, hora, lugar, tropical, Placidus. Lee Sol, Luna, Ascendente. Recorre las casas ocupadas. Ordena aspectos por orbe. Solo entonces abre el texto signo a signo. Guarda la carta si quieres el informe y el gabinete diario. Los tránsitos del gabinete se guardan al mediodía natal; son un paso posterior, no el paso uno de leer la natal.',
          'Quédate al principio con una nota de trabajo de solo tres hechos: los Tres Grandes, la casa más ocupada, el aspecto más estrecho. Eso es una lectura de carta natal que de verdad puedes terminar. Amplía a regentes de casas vacías y tránsitos lentos después de que esos tres hechos estén estables.',
          'Párate antes de conclusiones médicas, legales o financieras. El método es: coordenadas, luego estructura, luego lenguaje cauto. Si te saltas las coordenadas, estás leyendo una columna de horóscopo, no una carta natal.',
          'Relee la misma carta una semana después con el mismo orden. La rueda no cambia; tu ojo sí. Si aparece un detalle nuevo, compruébalo contra la tabla. Si no existe en los números, no está en la carta natal, por muy atractiva que sea la frase.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué debo mirar primero en una carta natal?',
        a: 'Sol, Luna y Ascendente, luego las casas ocupadas, luego los aspectos más estrechos. Deja las casas vacías y los puntos menores para después.',
      },
      {
        q: '¿Cómo leo una carta natal sin hora de nacimiento?',
        a: 'Lee solo signos planetarios y aspectos. Salta el Ascendente y todas las afirmaciones de casa. SideraChart omite el Ascendente cuando la hora es desconocida.',
      },
      {
        q: '¿Leo primero signos o casas?',
        a: 'Los signos te dicen el estilo; las casas te dicen el ámbito. Después de los Tres Grandes, lista las casas ocupadas y luego combina: «Marte en Aries en la diez» es ambas cosas.',
      },
      {
        q: '¿Qué orbes debo usar al leer aspectos?',
        a: 'SideraChart usa 8° para conjunción y oposición, 6° para cuadratura y trígono, 4° para sextil. Primero los orbes más estrechos.',
      },
    ],
  },
  'houses-in-a-birth-chart': {
    title: '¿Qué son las casas en una carta natal?',
    excerpt:
      'Las casas son doce sectores locales del cielo de nacimiento, no signos del zodiaco. Necesitan hora de nacimiento. SideraChart va por defecto a Placidus; hora desconocida significa que no hay casas honestas.',
    sections: [
      {
        heading: '¿Qué son las casas en una carta natal?',
        paragraphs: [
          'Las casas son doce sectores del cielo vistos desde el lugar de nacimiento en el instante de nacimiento. No son signos. Los signos son rebanadas de 30° del zodiaco tropical a lo largo de la eclíptica. Las casas son un marco local: qué parte de ese cielo estaba saliendo, culminando, poniéndose. El signo de un planeta es su estilo. La casa de un planeta es el ámbito de la vida donde ese estilo es fácil de ver.',
          'No puedes tener casas sin hora de nacimiento, porque el marco está atado al horizonte. Hora desconocida = planetas sí, casas no. Quienes publican lecturas de casas a partir de un relleno de mediodía están describiendo el mediodía, no un minuto desconocido. SideraChart no hace eso por defecto.',
        ],
      },
      {
        heading: 'Las casas son locales; los signos son zodiacales',
        paragraphs: [
          'Dos personas pueden compartir un Sol en Capricornio y no compartir una casa diez. La casa del Sol depende del Ascendente, que depende de hora y lugar. Por eso el habla de casas se siente más «biográfica» que el de signos, y por eso es más frágil. Si el reloj está mal, la biografía que acabas de escribir está pegada a las habitaciones equivocadas.',
          'Léelos juntos cuando tengas ambos: «Venus en Tauro en la dos» es una frase distinta de «Venus en Tauro en la ocho». Mismo signo, otro ámbito. Si solo tienes el signo, párate en el signo.',
        ],
      },
      {
        heading: 'Placidus es el valor por defecto en SideraChart',
        paragraphs: [
          'Placidus divide el tiempo de ascensión en lugar de rebanadas iguales de espacio, así que las casas son desiguales. SideraChart lo pone por defecto porque la mayoría de las interpretaciones occidentales publicadas asumen Placidus. Whole Sign está disponible: la casa I es todo el signo que contiene el Ascendente, luego los signos siguientes en orden. Ninguno de los dos sistemas es práctica sideral védica; ambos aquí se sientan sobre longitudes tropicales de astronomy-engine (VSOP87).',
          'Por encima de unos 66° de latitud las cúspides Placidus pueden fallar. Para esos nacimientos, Whole Sign es la cuadrícula más honesta. Las posiciones planetarias se calculan de un modo u otro. Si un sitio discrepa de tus casas, revisa el sistema de casas antes que la efeméride. Swiss Ephemeris no está en esta pila; un desajuste de sistema es el culpable habitual.',
        ],
      },
      {
        heading: 'Angulares, sucedentes y cadentes',
        paragraphs: [
          'Las casas 1, 4, 7 y 10 son angulares — atadas al horizonte y al meridiano, históricamente las más altas. 2, 5, 8 y 11 son sucedentes. 3, 6, 9 y 12 son cadentes. Esto es una pista de volumen, no un ranking moral. Un montón de planetas en la doce suena alto aunque los manuales llamen cadente a la doce.',
          'Los temas tradicionales de casa (yo, dinero, hermanos, hogar, y así) son un vocabulario, no un contrato. Úsalos como etiquetas de ámbitos y luego mira qué planetas los ocupan de verdad. No inventes sucesos para llenar una casa que casualmente está vacía.',
        ],
      },
      {
        heading: 'Cúspides, intercepciones y altas latitudes',
        paragraphs: [
          'En Placidus, una cúspide de casa es el grado de frontera. Un planeta cerca de una cúspide es un juicio; este sitio no lo mueve en secreto a la casa siguiente por ti. Los signos interceptados — un signo tragado dentro de una casa sin cúspide — ocurren en latitudes más altas cuando las casas se estiran. Whole Sign evita esa geometría atando casas a signos.',
          'Si tu nacimiento es polar, no tortures Placidus. Cambia de sistema. Si tu hora de nacimiento está redondeada, recalcula un rango y mira si los planetas cambian de casa. Si lo hacen, esas afirmaciones de casa son provisionales.',
          'Nominatim de OpenStreetMap suministra las coordenadas que SideraChart usa para el lugar. Un pin de centro de ciudad no es un pin de hospital; para las casas la diferencia suele ser pequeña, pero en alta latitud o cerca de una cúspide puede importar. Prefiere el pueblo de nacimiento real a un hogar posterior.',
        ],
      },
      {
        heading: 'Cómo leer las casas en la rueda',
        paragraphs: [
          'En SideraChart las divisiones interiores son casas, contadas desde el Ascendente a la izquierda. Los glifos se sientan en longitud eclíptica; la tabla te dice en qué número de casa cayó esa longitud. Los aspectos se quedan en la eclíptica (orbes 8° / 6° / 4°) y no les importan las paredes de casa. A las paredes de casa les importa el reloj.',
          'Guarda la carta para conservar el sistema de casas con el informe. Los tránsitos diarios del gabinete se calculan al mediodía natal contra ese marco natal. Los planetas en tránsito a través de las casas solo tienen sentido si las casas natales eran reales de entrada — lo que, otra vez, significa que tenías hora de nacimiento.',
          'Si pasas de Placidus a Whole Sign después de guardar, recalcula en lugar de arrastrar glifos de cabeza. El planeta no se movió; las paredes sí. Anota el sistema en cualquier captura que compartas para que una comparación posterior no sea un desacuerdo falso.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuál es la diferencia entre signos y casas?',
        a: 'Los signos son 30° del zodiaco tropical. Las casas son doce sectores locales desde tu horizonte de nacimiento. Los signos necesitan una fecha; las casas necesitan hora y lugar.',
      },
      {
        q: '¿Qué sistema de casas debo usar?',
        a: 'Placidus es el valor por defecto de SideraChart y coincide con la mayoría de los textos occidentales. Usa Whole Sign en altas latitudes o si quieres un signo por casa.',
      },
      {
        q: '¿Puedo leer casas sin hora de nacimiento?',
        a: 'No. Sin Ascendente el marco de casas no está definido. Aún puedes leer signos planetarios y aspectos.',
      },
      {
        q: '¿Por qué mis casas difieren en otro sitio web?',
        a: 'Sistema de casas distinto, zona horaria distinta o zodiaco sideral. Pon el otro sitio en tropical Placidus y las mismas coordenadas antes de comparar.',
      },
    ],
  },
  'empty-houses': {
    title: '¿Qué son las casas vacías en una carta natal?',
    excerpt:
      'Una casa vacía no tiene un planeta sentado dentro. No es un ámbito de la vida que falta. Sigue haciendo falta una hora de nacimiento para saber qué casas están vacías; las cartas de mediodía falsifican los huecos.',
    sections: [
      {
        heading: '¿Qué son las casas vacías en una carta natal?',
        paragraphs: [
          'Una casa vacía es una casa sin planeta natal dentro. Esa es toda la definición. No es un agujero en tu vida, ni un órgano que falta, ni una predicción de que no pasará nada en ese ámbito. Diez cuerpos (del Sol a Plutón más la Luna) no pueden ocupar doce habitaciones a la vez. La mayoría de las cartas tienen casas vacías. Si la tuya no las tuviera, tendrías una rueda muy abarrotada.',
          'Solo sabes qué casas están vacías si conoces el marco de casas, lo que significa que conoces la hora de nacimiento. Hora desconocida = planetas sí, casas no — incluido el habla de casas vacías. Una carta de mediodía puede mostrar casas «vacías» que se llenarían o vaciarían a las 04:00. No interpretes huecos falsos.',
        ],
      },
      {
        heading: 'Vacío no significa inactivo',
        paragraphs: [
          'La vida sigue en temas que no tienen un planeta en la cúspide. La lectura tradicional aún mira el signo de la cúspide de la casa y el planeta que rige ese signo. Ese es un método más largo. El método corto en este sitio es: las casas ocupadas suenan más alto porque hay un planeta sentado ahí; las casas vacías están más calladas en la rueda, no ausentes de la biografía.',
          'No llenes una casa vacía con miedo. La gente busca «qué son las casas vacías en una carta natal» porque la copia en línea las trata como defectos. Son un problema de aglomeración en las otras habitaciones, no una maldición sobre las vacías.',
        ],
      },
      {
        heading: 'La regencia sigue contando',
        paragraphs: [
          'Si la casa siete está vacía pero su cúspide está en Libra, Venus sigue teniendo voz como regente tradicional. Encontrarás a Venus en otro sitio de la carta — quizá en la dos, quizá en conjunción con Saturno. Esa posición es cómo «habla» la casa vacía sin un residente. Esto es estructura, no misticismo.',
          'Las tablas de SideraChart listan planetas en casas. No esconden las casas vacías; simplemente no hay glifo ahí. Mira el signo de la cúspide en la rueda si quieres el regente. Los aspectos (orbes 8° / 6° / 4°) también pueden atar un planeta a temas asociados con una casa que no ocupa, porque los aspectos son ángulos eclípticos, no asignaciones de habitación.',
        ],
      },
      {
        heading: 'Esteliums y casas abarrotadas',
        paragraphs: [
          'La contraparte de las casas vacías es un estelium: varios planetas en un signo o en una casa. Esa habitación se lleva el volumen. Las casas vecinas pueden estar vacías porque los cuerpos se agruparon. Lee primero el cúmulo. Luego anota las habitaciones vacías sin escribirles obituarios.',
          'El sistema de casas cambia qué habitaciones se ven vacías. Placidus (por defecto) y Whole Sign pueden mover un planeta a través de una frontera, sobre todo en alta latitud o con un planeta cerca de una cúspide. Si una «siete vacía» aparece en un sistema y no en el otro, estás mirando una frontera, no un destino.',
        ],
      },
      {
        heading: 'Hora desconocida y casas vacías falsas',
        paragraphs: [
          'Sin hora de nacimiento, toda afirmación de casa vacía es inválida, porque las paredes son inválidas. No uses una carta de 12:00 para anunciar que tu casa cuatro está vacía. Marca la hora desconocida en SideraChart y salta las casas. Aún puedes hablar de signos vacíos — ningún planeta en Escorpio, por ejemplo — porque los signos no necesitan el horizonte.',
          'Si la hora es aproximada, recalcula un rango. Los planetas que saltan de casa crearán y destruirán «vacío» en veinte minutos. Trata esas casas como no resueltas. El movimiento de cuatro minutos por grado del Ascendente es el mismo reloj que hace frágiles las listas de casas vacías.',
          'Whole Sign puede vaciar y llenar habitaciones distintas que Placidus con los mismos planetas. Si cambias de sistema para «arreglar» una casa vacía que no te gusta, estás editando la cuadrícula, no el cielo. Elige un sistema y lee el abarrotamiento que de verdad tienes.',
        ],
      },
      {
        heading: 'Cómo leerlas en SideraChart',
        paragraphs: [
          'Calcula con fecha, hora y lugar, tropical, Placidus salvo que tengas una razón para cambiar. Lista las casas ocupadas. El resto están vacías. Lee primero las ocupadas. Usa los regentes de cúspide si necesitas un segundo pase. No ordenes ámbitos de la vida por vacío.',
          'Los tránsitos a través de una casa natal vacía siguen siendo tránsitos a través de ese sector del marco natal. El gabinete diario los guarda al mediodía en la zona horaria natal. Un tránsito no «llena» de forma permanente una casa natal vacía. Es tiempo en esa habitación durante un rato. La casa natal sigue vacía de planetas natales.',
          'Si llegaste de un meme que numeraba tus casas vacías como fracasos vitales, descártalo. Cuenta las casas ocupadas, nombra el estelium si hay uno, y párate. El vacío es un hecho de dibujo. No es un pronóstico, un diagnóstico ni una razón para adivinar una hora de nacimiento para que la casa siete parezca habitada.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Las casas vacías en una carta natal son malas?',
        a: 'No. Significan que ningún planeta natal se sienta en esa casa. La mayoría de las cartas tienen varias. No son partes que faltan de una vida.',
      },
      {
        q: '¿Cuántas casas vacías es normal?',
        a: 'Con diez cuerpos y doce casas, varias casas vacías son típicas. Un estelium en una casa casi garantiza vacío en otras.',
      },
      {
        q: '¿Puedo saber mis casas vacías sin hora de nacimiento?',
        a: 'No. Las casas requieren el Ascendente. Sin hora puedes anotar signos vacíos, no casas vacías.',
      },
      {
        q: '¿Una casa siete vacía significa que no tendré relaciones?',
        a: 'No. Esa es la historia del defecto. Lee el regente de la siete y el resto de la carta. No trates el vacío como un pronóstico.',
      },
    ],
  },
  'aspects-in-astrology': {
    title: '¿Qué son los aspectos en astrología?',
    excerpt:
      'Los aspectos son ángulos con nombre entre planetas a lo largo de la eclíptica: conjunción, sextil, cuadratura, trígono, oposición. SideraChart usa orbes de 8°, 6° y 4° para esos cinco.',
    sections: [
      {
        heading: '¿Qué son los aspectos en astrología?',
        paragraphs: [
          'Los aspectos son distancias angulares a lo largo de la eclíptica entre dos longitudes natales. Son geometría, no líneas de destino. Si dos planetas están a 90°, eso es una cuadratura. Si están a 120°, eso es un trígono. La carta natal lista los que caen dentro de un orbe permitido. La gente busca «qué son los aspectos en astrología» porque las líneas de color de la rueda parecen un lenguaje secreto. Son un transportador.',
          'SideraChart dibuja cinco aspectos mayores: conjunción (0°), sextil (60°), cuadratura (90°), trígono (120°), oposición (180°). Los orbes son 8° para conjunción y oposición, 6° para cuadratura y trígono, 4° para sextil. Los orbes más estrechos suenan más alto. La tabla bajo la rueda es la misma lista que las líneas, con movimiento aplicativo o separativo.',
        ],
      },
      {
        heading: 'Los cinco aspectos mayores',
        paragraphs: [
          'Una conjunción fusiona dos funciones en el mismo parche del zodiaco. Un sextil son 60°: una puerta por la que aún tienes que pasar. Una cuadratura son 90°: fricción que tiende a producir oficio si te quedas con ella, o ruido si no. Un trígono son 120°: facilidad que puede quedar sin usar. Una oposición son 180°: dos polos, a menudo proyectados sobre otra persona o un horario que tira hacia los dos lados.',
          'Quédate con verbos concretos. No asciendas una cuadratura a maldición ni un trígono a bendición de otro sitio. Estás leyendo cómo dos funciones de la carta comparten trabajo. El resto de la carta — signos, casas, los Tres Grandes — te dice en qué ámbitos aterriza ese trabajo.',
        ],
      },
      {
        heading: 'Orbes: 8°, 6° y 4°',
        paragraphs: [
          'Un orbe es cuánto puede alejarse el contacto de lo exacto y seguir contando. La pila de SideraChart es 8° / 6° / 4° como arriba. Una conjunción Sol–Luna a 7,2° cuenta; un sextil de Mercurio a 4,5° no. Otro software usa orbes distintos, y por eso las listas de aspectos discrepan aunque las longitudes coincidan.',
          'Ordena por estrechez. Un aspecto de 0,3° desbanca uno de 7,9° del mismo tipo. Si estás aprendiendo, ignora lo que está cerca del borde hasta que los estrechos estén claros. La exactitud no es pureza moral; es volumen en el instrumento.',
        ],
      },
      {
        heading: 'Aplicativo, separativo y hora de nacimiento',
        paragraphs: [
          'Aplicativo significa que el aspecto se estaba estrechando al nacer; separativo significa que ya había alcanzado el pico y se estaba abriendo. SideraChart lo marca en la tabla natal. Es un matiz de timing dentro del instante de nacimiento, no un pronóstico. Aún necesitas longitudes decentes, lo que significa un Tiempo Universal decente.',
          'Sin hora de nacimiento, los aspectos planeta a planeta existen igual. Los aspectos al Ascendente no, porque no hay Ascendente. Los aspectos de la Luna cerca de un borde de orbe pueden saltar a lo largo de un día. Hora desconocida: planetas sí, casas no; aspectos lunares cerca de 8°/6°/4° quizás. No pelees con una carta de mediodía por una cuadratura lunar de 5,9°.',
        ],
      },
      {
        heading: 'Qué no son los aspectos',
        paragraphs: [
          'No son sinastría por sí mismos: la sinastría son aspectos entre dos cartas. No son tránsitos: los tránsitos son los planetas de hoy a los planetas natales. No son consejo médico, legal ni financiero. Una cuadratura Marte–Saturno no prescribe un entrenamiento ni un juicio. Describe fricción entre el calor de iniciar y la estructura.',
          'Los aspectos menores (quincuncio, semicuadratura y el resto) no se dibujan aquí. Si otro sitio muestra más líneas, está usando un catálogo más amplio, no un cielo más preciso. SideraChart se queda con los cinco mayores en longitudes tropicales de astronomy-engine (VSOP87), no Swiss Ephemeris.',
          'Los esteliums producen pilas de conjunciones. Lee primero el par más estrecho en lugar de declarar que todo el montón es un solo ánimo. Una casa vacía no cancela un aspecto que casualmente involucra a un planeta en otra casa; los aspectos ignoran las paredes. Las casas necesitan la hora de nacimiento; los aspectos entre planetas no.',
        ],
      },
      {
        heading: 'Cómo muestra SideraChart los aspectos',
        paragraphs: [
          'Líneas de color dentro de la rueda; una tabla ordenable debajo. Oculta las líneas si el dibujo está abarrotado. La sinastría usa los mismos orbes entre los planetas de dos personas. Las cartas compuestas tienen sus propios puntos medios y luego sus propios aspectos internos. Los tránsitos diarios del gabinete se guardan al mediodía natal y usan los mismos nombres de aspecto contra la línea de base natal.',
          'Cuando compares con astro-seek o similar, pon tropical, la misma zona horaria y orbes comparables. Un aspecto que falta suele ser un orbe o un ajuste sideral. Placidus frente a Whole Sign no cambiará los aspectos eclípticos entre planetas; sí cambiará las frases basadas en casas que podrías mezclar por error.',
          'Lee aplicativo frente a separativo como una nota del instante de nacimiento y sigue. No te dice cuándo ocurrirá un suceso años más tarde. Los tránsitos reutilizan los mismos nombres de aspecto contra un cielo en movimiento, guardados al mediodía natal en el gabinete. Ese es otro reloj distinto de la bandera aplicativo natal.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuáles son los aspectos mayores en astrología?',
        a: 'Conjunción, sextil, cuadratura, trígono y oposición. Esos son los cinco que dibuja SideraChart. Los orbes son 8°, 6° y 4° según el aspecto.',
      },
      {
        q: '¿Qué significa orbe en astrología?',
        a: 'Cuántos grados puede alejarse un aspecto de lo exacto y seguir contando. Los orbes más estrechos son más fuertes en el instrumento. El conjunto de SideraChart es 8° / 6° / 4°.',
      },
      {
        q: '¿Los aspectos de cuadratura son malos?',
        a: 'Son fricción, no una maldición. Léelos como trabajo entre dos funciones. No los trates como veredictos médicos ni morales.',
      },
      {
        q: '¿Necesito hora de nacimiento para ver aspectos?',
        a: 'No para aspectos planeta a planeta. Necesitas una hora para aspectos al Ascendente y para aspectos lunares que se sientan cerca de un borde de orbe.',
      },
    ],
  },
  'tropical-vs-sidereal': {
    title: 'Zodiaco tropical y sideral',
    excerpt:
      'El zodiaco tropical empieza en el equinoccio de marzo. El sideral usa un punto cero estelar, a unos 24° de distancia hoy. SideraChart es solo tropical — no védico, no Swiss Ephemeris.',
    sections: [
      {
        heading: 'Zodiaco tropical y sideral',
        paragraphs: [
          'Tropical frente a sideral es una discusión de punto cero. Ambos zodiacos dividen la eclíptica en doce signos de 30° con los mismos nombres. No empiezan en el mismo sitio. El 0° de Aries tropical es el equinoccio de marzo: el cruce del Sol por el ecuador celeste. El 0° de Aries sideral está atado a una referencia estelar (un ayanamsha). Como el eje de la Tierra tiene precesión, esos dos ceros se han alejado unos 24° hoy.',
          'Esa brecha es por qué tu signo solar en una app védica suele ser el signo anterior comparado con SideraChart. Ninguna calculadora está «equivocada sobre el cielo». Están usando orígenes distintos para el mismo cinturón con nombre. SideraChart es tropical: convención occidental, basada en el equinoccio, astronomy-engine (VSOP87). No calcula sistemas siderales, védicos ni chinos.',
        ],
      },
      {
        heading: 'Qué mide el zodiaco tropical',
        paragraphs: [
          'Los signos tropicales son estaciones de la órbita de la Tierra, no fotografías de constelaciones. Las constelaciones son desiguales y se desplazan por precesión. Aries tropical empieza cuando el día y la noche coinciden en marzo (en el sentido calendárico boreal del equinoccio), da igual qué campo de estrellas quede ahora detrás de ese punto. La astrología natal occidental — incluido este sitio — lee esos signos de estación.',
          'Tus planetas natales en SideraChart son longitudes tropicales aparentes de la fecha. Las casas (Placidus por defecto) se sientan encima de esa eclíptica tropical. Fecha, hora y lugar de nacimiento siguen importando del modo habitual: hora para el Ascendente, hora desconocida = planetas sí, casas no. Cambiar de zodiaco es un ajuste distinto de cambiar de sistema de casas.',
        ],
      },
      {
        heading: 'Qué mide el zodiaco sideral',
        paragraphs: [
          'La práctica sideral busca mantener los signos alineados con un marco estelar. Distintos ayanamshas (Lahiri y otros) eligen desfases ligeramente distintos. La astrología natal india es por lo general sideral y a menudo usa signo entero u otros métodos de casas que no son los valores por defecto de este sitio. Si quieres esa carta, necesitas ese motor. SideraChart no fingirá serlo.',
          'Los sistemas natales chinos son otra pila otra vez: ni tropicales ni la misma rueda de doce signos. No pegues un animal de año chino a un Sol tropical y lo llames la misma coordenada. Si llegaste aquí desde una búsqueda mezclada, elige un sistema y quédate ahí mientras aprendes.',
        ],
      },
      {
        heading: 'La brecha de unos 24° y el ayanamsha',
        paragraphs: [
          'Veinticuatro grados son unos cuatro quintos de un signo. Por eso muchas posiciones caen en el signo de nombre tropical precedente cuando pasas a sideral. Un Sol tropical de Géminis a menudo se vuelve un Sol sideral de Tauro. Las Lunas cerca de un límite saltan más a menudo porque la Luna es rápida. Los signos ascendentes también saltan, porque el Ascendente es un grado.',
          'Si comparas dos sitios tropicales y ya discrepan en un signo, mira primero la hora de nacimiento y la zona horaria, no el ayanamsha. Sideral es la explicación cuando un sitio es explícitamente védico o «sideral» y el otro es tropical occidental. SideraChart no coincidirá con una impresión Lahiri. Eso es esperable.',
        ],
      },
      {
        heading: 'Por qué SideraChart es solo tropical',
        paragraphs: [
          'El producto es una calculadora de carta natal occidental: zodiaco tropical, Placidus por defecto, Whole Sign opcional, aspectos mayores a 8° / 6° / 4°, posiciones de clase VSOP87 a través de astronomy-engine, zonas IANA. No es Swiss Ephemeris. No ofrece un modo sideral. Quedarse con un punto cero evita un error silencioso de 24° cuando crees que estás mirando «la misma carta».',
          'Usa tropical si quieres leer textos occidentales, la mayoría de los recetarios natales en español o inglés, y la capa escrita de este sitio. Usa un especialista sideral si esa es tu tradición. No promedies los dos Soles. No trates el desacuerdo como una crisis de personalidad. Es un choque de sistemas de coordenadas.',
        ],
      },
      {
        heading: 'Cómo coincidir con otros sitios',
        paragraphs: [
          'En astro-seek, astro.com y similares, pon tropical + Placidus (o Whole Sign si eso es lo que usaste) y la misma hora de nacimiento. Deberías caer a una fracción de grado en los planetas. Si te desvías un signo, estás en sideral o tienes el reloj equivocado. Si las casas difieren pero los planetas coinciden, tienes un desajuste de sistema de casas.',
          'Los tránsitos del gabinete de SideraChart son tránsitos tropicales guardados al mediodía en la zona horaria natal. Mezclar natal tropical con tránsitos siderales es el mismo error de 24° en movimiento. Mantén el zodiaco coherente. La carta natal es la línea de base; los tránsitos son el tiempo contra esa línea, en el mismo sistema de coordenadas.',
          'Si publicas una carta, nombra el zodiaco en el pie: tropical, Placidus, hora de nacimiento conocida o desconocida. Esa sola línea evita la mayoría de los hilos de «tu calculadora está mal». El pie de SideraChart ya muestra tropical y Placidus cuando la rueda está completa.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuál es la diferencia entre zodiaco tropical y sideral?',
        a: 'El tropical mide desde el equinoccio de primavera. El sideral mide desde un punto cero estelar. Hoy difieren unos 24°, a menudo un signo entero.',
      },
      {
        q: '¿Qué zodiaco usa SideraChart?',
        a: 'Solo tropical, con posiciones de astronomy-engine (VSOP87). No calcula cartas siderales, védicas ni chinas y no usa Swiss Ephemeris.',
      },
      {
        q: '¿Por qué mi signo solar es distinto en astrología védica?',
        a: 'La práctica védica es por lo general sideral. Tu Sol tropical sigue siendo la longitud basada en el equinoccio. El nombre del signo cambió porque cambió el punto cero.',
      },
      {
        q: '¿Debo usar tropical o sideral?',
        a: 'Usa tropical para coincidir con los textos natales occidentales y esta calculadora. Usa sideral si trabajas en esa tradición. No los mezcles en una sola lectura.',
      },
    ],
  },
  'synastry-vs-composite': {
    title: 'Sinastría y carta compuesta',
    excerpt:
      'La sinastría superpone dos cartas natales y lista los aspectos entre ellas. Una carta compuesta promedia longitudes en una tercera rueda. Responden a preguntas distintas.',
    sections: [
      {
        heading: 'Sinastría y carta compuesta',
        paragraphs: [
          'Sinastría frente a carta compuesta son dos mapas relacionales distintos, no dos nombres para un mapa. La sinastría conserva a las dos personas. Calculas dos cartas natales, superpones los planetas y listas aspectos de la persona A a la persona B. Una carta compuesta descarta las dos ruedas como personas separadas y construye una tercera carta a partir de puntos medios. La gente busca la comparación porque las apps usan las palabras como si fueran intercambiables. No lo son.',
          'SideraChart ofrece ambas como calculadoras separadas. Cada natal es tropical, Placidus por defecto, VSOP87 a través de astronomy-engine. Los aspectos de sinastría usan los mismos orbes que un aspectario natal: 8° conjunción y oposición, 6° cuadratura y trígono, 4° sextil. Ninguna rueda es un veredicto sobre si quedarse juntos, casarse o repartir bienes. Son diagramas.',
        ],
      },
      {
        heading: 'Qué hace la sinastría',
        paragraphs: [
          'La sinastría deja intactas ambas cartas. En SideraChart, un conjunto de glifos es la persona A y el otro la persona B. La tabla lista aspectos entre cartas, no los aspectos internos de una natal. Estás preguntando qué pasa cuando dos cielos comparten cocina: su Saturno sobre tu Luna, su Marte sobre tu Ascendente, un trígono Sol–Sol.',
          'Cada persona sigue necesitando su propia fecha, hora y lugar de nacimiento. Si una hora es desconocida, el Ascendente y las casas de esa persona se caen. Aún puedes hacer sinastría planeta a planeta. No puedes hablar con honestidad de «sus planetas en tu casa siete» sin el signo ascendente de esa persona. Hora desconocida = planetas sí, casas no — por carta.',
        ],
      },
      {
        heading: 'Qué hace una carta compuesta',
        paragraphs: [
          'Una carta compuesta toma cada par de planetas natales (el Sol de A y el Sol de B, la Luna de A y la Luna de B, y así) y encuentra el punto medio del arco corto, luego dibuja una rueda nueva. El resultado es la relación como una tercera entidad, no ninguna de las dos personas. No es una carta Davison, que toma puntos medios en tiempo y espacio hacia un nacimiento hipotético de la relación.',
          'Las casas de la carta compuesta siguen necesitando una convención de lugar y, en la práctica, un modo de fijar ángulos. Lee la compuesta como un instrumento aparte. No mezcles los significados de casa natal de una persona en los puntos medios compuestos sin notar que cambiaste de mapa. La calculadora de carta compuesta de SideraChart es esa tercera rueda, no una superposición de sinastría.',
        ],
      },
      {
        heading: 'Dos personas, dos entradas completas',
        paragraphs: [
          'Basura entra, basura sale, dos veces. Una zona horaria incorrecta en la persona B desplaza su Luna y su Ascendente, que entonces o aspectan mal a la persona A en sinastría o tiran de cada punto medio compuesto. Prefiere certificados. Si falta un reloj, dilo y deja fuera de la mesa las frases de sinastría basadas en casas.',
          'No promedias dos signos ascendentes para obtener un «ascendente de pareja» en sinastría. Ese instinto pertenece a los puntos medios de la carta compuesta, y aun ahí es un ángulo construido, no un bebé. Mantén los métodos en pestañas separadas y etiqueta qué rueda estás leyendo.',
        ],
      },
      {
        heading: 'Qué no decide ninguna de las dos cartas',
        paragraphs: [
          'Ni la sinastría ni la carta compuesta te dicen que te comprometas, te vayas, tengas un hijo o firmes un contrato. Describen patrones de contacto y una atmósfera de punto medio. Los contactos fáciles de Venus no son un estado legal. Los contactos de Saturno no son una condena. Si necesitas consejo de ese tipo, necesitas otro profesional.',
          'Lee primero las cartas natales, por separado. Dos personas sin relación con sus propias Lunas no se salvarán con un trígono bonito de sinastría. Los Tres Grandes de cada natal siguen yendo primero. Luego superpón. Luego, si quieres la vista de tercera entidad, la carta compuesta.',
        ],
      },
      {
        heading: 'Cómo correrlas en SideraChart',
        paragraphs: [
          'Usa la calculadora de sinastría para superposiciones y aspectos cruzados. Usa la calculadora de carta compuesta para puntos medios. El mismo motor tropical, no sideral, no Swiss Ephemeris. Una corrida relacional gratis sin cuenta; luego inicia sesión. Guarda las natales individuales si también quieres tránsitos diarios en cada gabinete al mediodía natal: esos tránsitos son tiempo personal, no un pronóstico de pareja salvo que lo construyas aparte.',
          'Cuando compares con otros sitios, haz coincidir tropical, Placidus, orbes y si quieren decir sinastría o carta compuesta. Un sitio que «combina cartas» sin decir punto medio frente a superposición es la razón de que exista este artículo. Mira la rueda: dos conjuntos de planetas significa sinastría; un conjunto de puntos medios mezclados significa carta compuesta.',
          'Las superposiciones de casa en sinastría necesitan ambos relojes. Si la persona B no tiene hora, aún tienes aspectos planeta a planeta con orbes 8° / 6° / 4°. No tienes «su Venus en tu siete». Escribe ese límite junto a la tabla para que la superposición no le crezcan casas que no le pertenecen.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuál es la diferencia entre sinastría y carta compuesta?',
        a: 'La sinastría superpone dos cartas natales y las aspecta entre sí. Una carta compuesta construye una tercera carta a partir de puntos medios planetarios. Superposición frente a promedio.',
      },
      {
        q: '¿Cuál es mejor para la astrología de relaciones?',
        a: 'Responden a preguntas distintas. Sinastría: cómo interactúan dos personas. Carta compuesta: la relación como una tercera carta. Corre primero las cartas natales de un modo u otro.',
      },
      {
        q: '¿Las dos personas necesitan hora de nacimiento?',
        a: 'Para sinastría basada en casas y para los ángulos de la carta compuesta, sí. La sinastría planeta a planeta puede seguir con fechas si faltan horas, con la precaución habitual de cúspide lunar.',
      },
      {
        q: '¿Una carta compuesta es lo mismo que una carta Davison?',
        a: 'No. La carta compuesta usa puntos medios planetarios. Davison toma el punto medio de las dos horas y lugares de nacimiento hacia un suceso hipotético. La compuesta de SideraChart es la rueda de puntos medios.',
      },
    ],
  },
  'what-are-transits': {
    title: '¿Qué son los tránsitos en astrología?',
    excerpt:
      'Los tránsitos son las posiciones de hoy comparadas con tu carta natal. Son el tiempo contra una línea de base fija, no una carta de nacimiento nueva. SideraChart los guarda al mediodía.',
    sections: [
      {
        heading: '¿Qué son los tránsitos en astrología?',
        paragraphs: [
          'Los tránsitos son los planetas en el cielo ahora (o en una fecha elegida) medidos contra los planetas de tu carta natal. La carta natal se queda quieta: es la línea de base de tu fecha, hora y lugar de nacimiento. Los tránsitos se mueven. Una cuadratura de Saturno en tránsito a tu Sol natal es un contacto temporal entre el Saturno de hoy y el Sol con el que naciste. La gente busca «qué son los tránsitos en astrología» cuando quiere saber si la carta natal cambia. No. El tiempo encima sí.',
          'SideraChart calcula tránsitos con el mismo motor tropical que la natal: astronomy-engine (VSOP87), aspectos mayores a 8° / 6° / 4°. El gabinete diario guarda una superposición por fecha de calendario al mediodía en la zona horaria natal, para que la nota del día se quede estable si refrescas a las 23:00. Las fechas perdidas no se rellenan hacia atrás.',
        ],
      },
      {
        heading: 'Tránsitos frente a posiciones natales',
        paragraphs: [
          'Las posiciones natales son una instantánea. Los tránsitos son una segunda instantánea comparada con la primera. Necesitas una carta natal guardada para hacer esto con honestidad. Sin longitudes natales solo estás listando el cielo de hoy, que es astronomía, no una lectura personal de tránsitos.',
          'Si la hora de nacimiento natal era desconocida, las casas natales ya están fuera de la mesa. Los planetas en tránsito «por tu casa siete» no tienen entonces una pared honesta por la que pasar. Aún puedes transitar a planetas natales (Sol, Luna si el signo estaba a salvo, Mercurio y el resto). Hora desconocida = planetas natales sí, casas natales no: los tránsitos heredan ese límite.',
        ],
      },
      {
        heading: 'Tránsitos rápidos y tránsitos lentos',
        paragraphs: [
          'La Luna transita un planeta natal en horas. El Sol, Mercurio, Venus y Marte tardan días o semanas en cruzar un punto natal. Júpiter y Saturno tardan más. Urano, Neptuno y Plutón pueden sentarse en un grado natal meses, con retrógrados que estiran la historia. Los tránsitos rápidos son tiempo. Los tránsitos lentos son clima. Ninguno es una instrucción médica ni financiera.',
          'Los orbes conservan los mismos nombres: conjunción, sextil, cuadratura, trígono, oposición. Una conjunción en tránsito a Venus natal dentro de 8° es la misma geometría que una conjunción natal, salvo que un extremo del aspecto se mueve. Los tránsitos aplicativos estrechos son los que merece la pena listar primero en una nota diaria.',
        ],
      },
      {
        heading: 'Por qué SideraChart usa el mediodía en la zona horaria natal',
        paragraphs: [
          'Un «día» de tránsitos tiene que elegir un instante. Si el gabinete recalculara en cada carga de página, la Luna vagaría y la nota no coincidiría con la captura de ayer. El mediodía en la zona horaria natal es una instantánea civil estable para esa fecha. No es tu hora de nacimiento, y no es la afirmación de que los tránsitos solo importan a la hora de comer.',
          'El gabinete escribe una fila por fecha de calendario cuando lo abres. Mañana, la fila de ayer se queda. Una semana saltada se queda saltada; el producto no inventa historia. Necesitas una natal guardada y una cuenta para ese diario. Las calculadoras públicas siguen usables sin iniciar sesión.',
        ],
      },
      {
        heading: 'Cómo leer un día de tránsitos',
        paragraphs: [
          'Lista los planetas en tránsito que hacen aspectos mayores al Sol natal, la Luna, el Ascendente (si tienes hora) y cualquier configuración natal estrecha. Prefiere los contactos lentos para el titular, los rápidos para el tiempo. No asciendas una cuadratura lunar en tránsito a una decisión de vida. Tampoco ignores una conjunción de Saturno en tránsito al Sol natal; solo no la conviertas en consejo legal ni médico.',
          'Mantén tránsitos tropicales sobre una natal tropical. Tránsitos siderales sobre una natal tropical mezclan puntos cero y desperdician la brecha de 24°. SideraChart no hará esa mezcla. Las casas natales Placidus, si existen, son las habitaciones por las que pasan los tránsitos. Las casas natales vacías aún pueden recibir tránsitos; el vacío era sobre planetas natales, no una prohibición de tráfico posterior.',
        ],
      },
      {
        heading: 'Qué no son los tránsitos',
        paragraphs: [
          'No son una carta natal nueva. No son un horóscopo de periódico de signo solar, aunque están más cerca de «tu semana» que la rueda natal sola. No son sinastría (dos cartas natales) ni una carta compuesta (puntos medios). No son Swiss Ephemeris, dashas védicas ni pilares de día chinos. La capa de tránsitos de este sitio son posiciones tropicales occidentales contra una natal tropical occidental.',
          'Úsalos como una superposición fechada. Imprime o descarga el texto del día si quieres un registro. Luego vuelve a la natal cuando necesites la línea de base. La carta natal es el instrumento que calibraste al nacer. Los tránsitos son el cielo posterior que corre a través de ella.',
          'Si te saltas una semana, deja el hueco. Rellenar hacia atrás instantáneas de mediodía de días que no abriste inventaría un diario que no llevaste. La carta natal sigue ahí. Abre la fecha de hoy cuando quieras el tiempo de hoy, no un mes reconstruido.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué es un tránsito en astrología?',
        a: 'Un contacto entre un planeta en el cielo en una fecha dada y un punto de tu carta natal. La carta natal se queda fija; el cielo se mueve.',
      },
      {
        q: '¿Los tránsitos cambian mi carta natal?',
        a: 'No. Los tránsitos se superponen a la natal. SideraChart guarda la superposición de cada día al mediodía en la zona horaria natal. Tus posiciones de nacimiento no se mueven.',
      },
      {
        q: '¿Por qué SideraChart calcula los tránsitos diarios al mediodía?',
        a: 'Para que la nota del día sea estable. El mediodía en la zona horaria natal es una instantánea coherente. No es un sustituto de tu hora de nacimiento.',
      },
      {
        q: '¿Puedo leer tránsitos sin hora de nacimiento?',
        a: 'Puedes leer tránsitos a planetas natales. No puedes leer con honestidad tránsitos a través de casas natales sin un Ascendente.',
      },
    ],
  },
};
