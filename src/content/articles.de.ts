import type { ArticleCopy } from './articles';

export const deArticles: Record<string, ArticleCopy> = {
  'what-is-a-natal-chart': {
    title: 'Was ist ein Natalchart?',
    excerpt:
      'Ein Natalchart ist eine Karte des Himmels aus Ihrem Geburtsdatum, Ihrer Uhrzeit und Ihrem Ort: Planeten, Aszendent und zwölf Häuser. Es ist kein tägliches Sonnenzeichen-Horoskop und kein Quiz.',
    sections: [
      {
        heading: 'Was ist ein Natalchart?',
        paragraphs: [
          'Ein Natalchart ist eine Karte des Sonnensystems, gesehen von einem Ort in einem Augenblick. Sie liefern drei Angaben: ein Geburtsdatum, eine Uhrzeit und einen geografischen Ort. Daraus berechnet ein Rechner die ekliptikale Länge jedes Planeten, den Grad, der im Osten aufging (den Aszendenten), und eine Zwölf-Häuser-Teilung des örtlichen Himmels. SideraChart ist dieser Rechner: tropischer Tierkreis, Placidus-Häuser als Standard, Positionen aus einer Ephemeride der Klasse VSOP87 über astronomy-engine.',
          'Das Chart ist ein Diagramm von Akzenten, kein Urteil. Jeder Planet ist eine Funktion. Jedes Zeichen ist ein Stil dieser Funktion. Jedes Haus ist ein Lebensbereich, in dem die Funktion sichtbar wird. Aspekte sind die Winkelabstände zwischen diesen Funktionen. Zusammen gelesen zeigen sie, welche Teile des Charts laut sind. Sie sagen Ihnen nicht, ob Sie den Beruf wechseln, eine Beziehung beenden oder eine medizinische Entscheidung treffen sollen.',
        ],
      },
      {
        heading: 'Was Sie brauchen: Geburtsdatum, Uhrzeit und Ort',
        paragraphs: [
          'Das Datum legt fest, an welchem Tag der Erdumlaufbahn Sie geboren wurden — das reicht, damit Sonne und langsame Planeten im richtigen Zeichen landen. Die Uhrzeit rechnet bürgerliche Ortszeit mit den IANA-Zeitzonenregeln, die an jenem Datum galten, in Weltzeit um, einschließlich historischer Sommerzeit. Der Ort liefert Breite und Länge, damit der örtliche Horizont — und damit Aszendent und Häuserspitzen — berechnet werden können.',
          'Ist die Uhrzeit unbekannt, erhalten Sie trotzdem die Planetenzeichen. Einen zuverlässigen Aszendenten oder ein Häusersystem erhalten Sie nicht. SideraChart lässt Sie die Zeit als unbekannt markieren und zeichnet dann nur Planeten. Mittag zu raten und die Häuser als Tatsache zu lesen ist schlechter als eine ehrliche Lücke. Steht in der Geburtsurkunde eine Uhrzeit, nutzen Sie sie; widersprechen sich Angehörige um eine halbe Stunde, behandeln Sie den Aszendenten als vorläufig.',
        ],
      },
      {
        heading: 'Planeten, Zeichen, Häuser und Aspekte',
        paragraphs: [
          'Planeten (Sonne bis Pluto, plus der Mond) sitzen auf der Ekliptik. Das Zeichen ist, in welches 30°-Stück des tropischen Tierkreises diese Länge fällt. Das Haus ist, in welchen örtlichen Sektor dieselbe Länge fällt, sobald der Aszendent bekannt ist. Ein Planet im Widder im zehnten Haus ist nicht dieselbe Aussage wie ein Planet im Widder im vierten: derselbe Stil, anderer Bereich.',
          'Aspekte sind die benannten Winkel zwischen zwei Längen: Konjunktion (0°), Sextil (60°), Quadrat (90°), Trigon (120°), Opposition (180°). SideraChart zeichnet diese fünf mit Orbis 8° für Konjunktion und Opposition, 6° für Quadrat und Trigon und 4° für Sextil. Engere Orbis lesen sich lauter. Die farbigen Linien im Rad und die Tabelle darunter zeigen dieselben Kontakte.',
        ],
      },
      {
        heading: 'Was ein Natalchart nicht ist',
        paragraphs: [
          'Ein Natalchart ist keine tägliche Horoskopspalte für zwölf Sonnenzeichen. Es ist keine vedische oder siderische Astrologie, die von einem sternbasierten Nullpunkt etwa 24° vom tropischen Äquinoktium von heute misst. Es ist keine chinesische Astrologie. SideraChart berechnet diese Systeme nicht und verwendet nicht Swiss Ephemeris.',
          'Es ist auch kein Persönlichkeitsquiz, das einen Typ ausgibt. Zwei Menschen mit demselben Sonnenzeichen können unterschiedliche Monde, unterschiedliche Aszendenten, unterschiedliche Häuserakzente und unterschiedliche Aspektmuster haben. Kennen Sie nur die Sonne, haben Sie eine Koordinate. Das Chart ist der Rest des Koordinatensystems.',
        ],
      },
      {
        heading: 'Wie SideraChart das Chart berechnet',
        paragraphs: [
          'SideraChart löst den Geburtsort in Breite und Länge auf, rechnet die Ortszeit in Weltzeit um und liest dann scheinbare tropische Längen aus astronomy-engine (Klasse VSOP87). Der tropische Tierkreis beginnt beim März-Äquinoktium — die westliche Konvention. Siderische Längen werden nicht gezeigt. Häuser stehen standardmäßig auf Placidus, weil die meisten veröffentlichten westlichen Texte das voraussetzen; Whole Sign ist verfügbar, wenn Sie gleiche Zeichen ab dem Zeichen des Aszendenten brauchen.',
          'Placidus teilt Aufgangszeit, daher sind die Häuser ungleich, und oberhalb von etwa 66° Breite wird es unzuverlässig. Für Polargeburten ist Whole Sign das ehrlichere Raster. Planetenlängen werden in beiden Fällen berechnet. Speichern Sie das Chart, wenn Sie den geschriebenen Bericht und das Tagesprotokoll möchten; die öffentlichen Rechner bleiben ohne Konto kostenlos.',
        ],
      },
      {
        heading: 'Wie Sie das Chart nutzen, sobald Sie es haben',
        paragraphs: [
          'Beginnen Sie mit der Großen Drei: Sonne, Mond und Aszendent. Dann die besetzten Häuser, dann die engsten Aspekte. Leere Häuser sind Zimmer ohne einen Planeten darin, keine fehlenden Organe. Das PNG des Rads ist eine Momentaufnahme; die Tabellen sind das Instrument. Zuerst die Zahlen, dann die geschriebene Schicht.',
          'Vergleichen Sie das Natalchart später mit dem heutigen Himmel, sind das Transite — ein anderer Artikel. Das Tagesprotokoll von SideraChart speichert diese täglichen Überlagerungen um Mittag in der natalen Zeitzone, damit die Notiz des Tages stabil bleibt. Nichts davon schreibt das Natalchart um. Das Natalchart ist die Basislinie, die Sie behalten; Transite sind Wetter dagegen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ist ein Natalchart dasselbe wie ein Horoskop?',
        a: 'Nein. Ein Natalchart ist eine berechnete Karte aus Ihrem Geburtsdatum, Ihrer Uhrzeit und Ihrem Ort. Ein Horoskop meint im Alltag meist eine Sonnenzeichen-Spalte für den Tag, die Woche oder das Jahr. Das Natalchart ist die Basislinie; ein Horoskop ist eine spätere, viel dünnere Lesung.',
      },
      {
        q: 'Brauche ich meine genaue Geburtszeit für ein Natalchart?',
        a: 'Sie brauchen sie für den Aszendenten und die Häuser. Ohne Uhrzeit sind die Planetenzeichen trotzdem brauchbar. SideraChart berechnet die Planeten und lässt den Aszendenten weg, wenn Sie die Zeit als unbekannt markieren.',
      },
      {
        q: 'Welchen Tierkreis verwendet ein Natalchart?',
        a: 'Westliche Natalcharts, einschließlich SideraChart, verwenden den tropischen Tierkreis, gemessen vom Frühlingsäquinoktium. Siderische (vedische) Charts nutzen einen sternbasierten Nullpunkt und sehen bei vielen Stellungen heute etwa ein Zeichen anders aus.',
      },
      {
        q: 'Können zwei am selben Tag Geborene unterschiedliche Natalcharts haben?',
        a: 'Ja. Uhrzeit und Ort ändern den Aszendenten, die Häuser und den Grad des Mondes. Selbst dasselbe Krankenhaus eine Stunde auseinander kann einen anderen Aszendenten ergeben.',
      },
    ],
  },
  'natal-chart-vs-horoscope': {
    title: 'Natalchart und Horoskop: der Unterschied',
    excerpt:
      'Ein Natalchart ist Ihre Geburtskarte aus Datum, Uhrzeit und Ort. Ein Horoskop ist meist eine Sonnenzeichen-Spalte. Es sind nicht dieselbe Lesung und sollten nicht vertauscht werden.',
    sections: [
      {
        heading: 'Natalchart und Horoskop: der Unterschied',
        paragraphs: [
          'Menschen suchen „Natalchart und Horoskop“, weil beide Wörter für „Astrologie“ verwendet werden — und es nicht dasselbe Objekt ist. Ein Natalchart ist ein berechnetes Diagramm des Himmels aus Ihrem Geburtsdatum, Ihrer Uhrzeit und Ihrem Ort: Planeten auf der Ekliptik, ein Aszendent, wenn die Uhr bekannt ist, Häuser und Aspekte. Ein Horoskop im Sinn der meisten Suchergebnisse ist eine kurze Prognose für ein Sonnenzeichen — Widder bis Fische — für einen Tag, eine Woche oder einen Monat.',
          'Aus einem Natalchart können Sie einen horoskopähnlichen Absatz ableiten. Aus einer Horoskopspalte können Sie kein Natalchart rekonstruieren. Das eine ist eine Karte mit Koordinaten. Das andere ist ein Textprodukt für zwölf Zielgruppen. SideraChart berechnet die Karte. Sonnenzeichen-Spalten, wöchentlich oder sonst, veröffentlicht es nicht.',
        ],
      },
      {
        heading: 'Was ein Horoskop gewöhnlich meint',
        paragraphs: [
          'In Zeitungen und Apps ist ein Horoskop nach Sonnenzeichen sortiert. Die Autorin mag den Mond, Merkur oder einen Transit zu diesem Zeichen ansehen und dann zwölf Kurztexte schreiben. Der Text kennt Ihren Mond nicht, Ihren Aszendenten nicht, Ihre Häuserspitzen nicht und nicht, ob Ihre Sonne im ersten Haus oder im zehnten steht. Das kann er nicht. Diese Fakten brauchen eine Geburtszeit und einen Ort.',
          'Älterer astronomischer Sprachgebrauch von „Horoskop“ meinte den Aszendenten selbst — die Stundenmarke. Dieser Sinn steckt noch im Wort, deshalb bleibt die Verwechslung klebrig. Wenn jemand nach „Ihrem Horoskop“ fragt, kann das Sonnenzeichen, Aszendent oder das ganze Natalrad gemeint sein. Fragen Sie nach, welches. Dann berechnen Sie das Natalchart, wenn Sie den tatsächlichen Himmel wollen.',
        ],
      },
      {
        heading: 'Was ein Natalchart enthält, was ein Horoskop nicht hat',
        paragraphs: [
          'Ein Natalchart listet jeden großen Körper: Sonne, Mond, Merkur, Venus, Mars, Jupiter, Saturn, Uranus, Neptun, Pluto. Es setzt sie in tropische Zeichen. Mit Geburtszeit setzt es sie auch in Häuser und bestimmt Aszendent und Medium Coeli. Dann listet es Hauptaspekte innerhalb der Orbis 8° / 6° / 4°. Das ist viel Struktur im Vergleich zu „Stier, diese Woche.“',
          'Zwei Menschen mit demselben Sonnenzeichen können gegensätzliche Monde, unterschiedliche Aszendenten und keine gemeinsamen Aspekte haben. Eine Horoskopspalte behandelt sie als dieselbe Leserin. Ein Natalchart tut das nicht. Wenn Sie bisher nur Sonnenzeichen-Horoskope gelesen haben, wirkt das Natalchart überdetailliert. Diese Detailtiefe ist der Grund, eines zu berechnen.',
        ],
      },
      {
        heading: 'Sonnenzeichen-Spalten gegen ein volles Rad',
        paragraphs: [
          'Ihr Sonnenzeichen ist eine Koordinate: das tropische Zeichen, das die Sonne an Ihrem Geburtsdatum einnahm. Es ist die leichteste Tatsache, weil die Sonne etwa einen Monat in einem Zeichen bleibt und selten eine genaue Uhr braucht. Es ist auch die Tatsache, die Horoskope als Index nutzen. Es ist nicht das Chart.',
          'Das Rad fügt den Mond hinzu (der alle zweieinhalb Tage das Zeichen wechselt), den Aszendenten (der die Minute braucht) und die übrigen Planeten. Der Geburtshoroskop-Rechner von SideraChart zeichnet dieses Rad im tropischen Tierkreis mit Placidus-Häusern als Standard. Vergleichen Sie es mit einem Magazin-Horoskop, und Sie sehen, warum die Wörter nicht austauschbar sind.',
        ],
      },
      {
        heading: 'Warum die beiden verwechselt werden',
        paragraphs: [
          'Marketingsprache klappt sie zusammen. „Kostenloses Horoskop“ meint oft „kostenloses Natalchart“ oder umgekehrt. Soziale Posts fragen „Was ist dein Horoskop?“, wenn sie das Sonnenzeichen meinen. Suchmaschinen erben diese Mischung. Wenn Sie über „Natalchart vs. Horoskop“ hier gelandet sind, behalten Sie die Unterscheidung: Chart = berechnete Karte aus Geburtsdaten; Horoskop = meist ein Sonnenzeichen-Text.',
          'Eine Transitlesung zu Ihrem gespeicherten Natalchart kommt einem persönlichen Horoskop näher als eine Zeitungsspalte, weil sie Ihre tatsächlichen Positionen nutzt. Das Tagesprotokoll von SideraChart speichert diese Transite um Mittag in der natalen Zeitzone. Das ist trotzdem nicht das Natalchart. Das Natalchart ändert sich nicht; der Himmel darüber schon.',
        ],
      },
      {
        heading: 'Was SideraChart berechnet',
        paragraphs: [
          'SideraChart berechnet Natalcharts, zeichenweise Planeten-Werkzeuge, Synastrie- und Kompositräder. Positionen kommen aus astronomy-engine (VSOP87), nicht aus Swiss Ephemeris. Der Tierkreis ist tropisch, nicht siderisch oder chinesisch. Häuser sind Placidus, sofern Sie nicht auf Whole Sign wechseln. Unbekannte Geburtszeit: Planeten ja, Häuser nein.',
          'Wenn Sie ein Sonnenzeichen-Horoskop für die Woche wollen, ist diese Site das falsche Instrument. Wenn Sie die Karte wollen, die jene Spalten vage vorzugeben versuchen, nutzen Sie den Geburtshoroskop-Rechner mit Datum, Uhrzeit und Ort. Lesen Sie das Chart als strukturierte Beschreibung von Akzenten. Behandeln Sie keines der beiden Produkte als medizinischen, rechtlichen oder finanziellen Rat.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ist mein Horoskop mein Sonnenzeichen?',
        a: 'Im populären Gebrauch ja: Horoskope sind nach Sonnenzeichen abgelegt. Ihr Natalchart enthält das Sonnenzeichen plus Mond, Aszendent, Häuser und Aspekte. Sie beantworten unterschiedliche Fragen.',
      },
      {
        q: 'Kann ein Horoskop ein Natalchart ersetzen?',
        a: 'Nein. Eine Spalte für zwölf Zeichen kann Ihre Geburtszeit, Ihren Ort, Ihren Mond oder Ihre Häuserspitzen nicht kodieren. Berechnen Sie ein Natalchart, wenn Sie diese Koordinaten wollen.',
      },
      {
        q: 'Sagt ein Natalchart meine Woche voraus?',
        a: 'Das Natalchart ist die Basislinie. Sprache von Woche zu Woche gehört zu Transiten gegen diese Basislinie. SideraChart speichert tägliche Transite um Mittag in der natalen Zeitzone; das ist trotzdem kein Zeitungs-Horoskop.',
      },
      {
        q: 'Warum nennen manche Sites ein Geburtshoroskop ein Horoskop?',
        a: 'Älterer Jargon nutzte „Horoskop“ für den Aszendenten oder die ganze Figur. Modernes Marketing hat das Wort für Sonnenzeichen-Texte wiederverwendet. Prüfen Sie, ob die Seite nach der Geburtszeit fragt. Wenn ja, berechnet sie ein Chart.',
      },
    ],
  },
  'what-is-my-sun-sign': {
    title: 'Was ist mein Sonnenzeichen?',
    excerpt:
      'Ihr Sonnenzeichen ist das tropische Tierkreiszeichen, das die Sonne an Ihrem Geburtsdatum einnahm. Meist brauchen Sie keine Geburtszeit. Es ist eine Stellung, nicht das ganze Natalchart.',
    sections: [
      {
        heading: 'Was ist mein Sonnenzeichen?',
        paragraphs: [
          'Ihr Sonnenzeichen ist das tropische 30°-Stück, das die Sonne bei Ihrer Geburt enthielt. Menschen fragen „Was ist mein Sonnenzeichen?“, weil es die eine astrologische Tatsache ist, die Zeitungen, Apps und Alltagsgespräch teilen. Sie finden es aus dem Geburtsdatum. Die Sonne wandert etwa ein Grad pro Tag und wechselt um dieselben Kalenderdaten jedes Jahr das Zeichen, mit etwas Drift nahe den Grenzen.',
          'SideraChart misst die Sonne im tropischen Tierkreis, vom März-Äquinoktium, mit astronomy-engine (VSOP87). Das ist westliche Praxis. Ein siderisches (vedisches) Sonnenzeichen kann sich heute um etwa ein Zeichen unterscheiden, weil der sternbasierte Nullpunkt präzediert hat. Meldet eine Freundin in einer siderischen App eine andere Sonne, schauen Sie nicht dasselbe Koordinatensystem an.',
        ],
      },
      {
        heading: 'Wie das Sonnenzeichen berechnet wird',
        paragraphs: [
          'Der Rechner rechnet Ihr bürgerliches Geburtsdatum und Ihre Uhrzeit in Weltzeit um und liest dann die scheinbare ekliptikale Länge der Sonne. Das Zeichen ist die Länge, geteilt in zwölf 30°-Blöcke ab 0° Widder (dem Äquinoktium). An einem Grenz-Tag — wenn die Sonne das Zeichen wechselt — entscheiden Uhrzeit und Zeitzone, auf welcher Seite Sie stehen. Das sind die einzigen Tage, an denen „Ich bin ein Cusp“ eine Rechenfrage ist und kein Gefühl.',
          'Der Ort spielt für das Sonnenzeichen kaum eine Rolle. Die Uhrzeit zählt an der Grenze und für Grad und Haus der Sonne. Wollen Sie nur das Zeichen und wurden Sie nicht an einem Wechseldatum geboren, reicht der Geburtstag. Wurden Sie am Wechsel geboren, tragen Sie die echte Uhrzeit ein oder markieren Sie sie als unbekannt und behandeln Sie das Ergebnis als ungeklärt, bis Sie eine Uhr haben.',
        ],
      },
      {
        heading: 'Warum Ihr Sonnenzeichen nicht das ganze Chart ist',
        paragraphs: [
          'Die Sonne ist ein Körper. Ein Natalchart hat außerdem Mond, Merkur, Venus, Mars und die äußeren Planeten, plus den Aszendenten, wenn Sie eine Geburtszeit haben. Zwei Löwen können denselben Sonnenmonat teilen und trotzdem nicht denselben Mond, denselben Aszendenten oder dasselbe Häusermuster. Sonnenzeichen-Beschreibungen überleben, weil sie leicht zu indizieren sind, nicht weil sie den Himmel erschöpfen.',
          'Lesen Sie die Sonne als die Tageshandlung: was Sie tun, wenn Sie in öffentlicher Zeit am offensichtlichsten Sie selbst sind. Dann lesen Sie den Rest. Ein Chart, das nur die Sonne listet, ist eine Überschrift. Die Tabellen unter dem Rad von SideraChart sind der Artikel.',
        ],
      },
      {
        heading: 'Sonnenzeichen, Mondzeichen und Aszendent',
        paragraphs: [
          'Der Mond wechselt alle zweieinhalb Tage das Zeichen, daher teilen viele Menschen, die im selben Sonnenmonat geboren wurden, nicht denselben Mond. Der Aszendent wechselt etwa alle zwei Stunden und braucht Geburtszeit und Ort. Zusammen sind diese drei die Große Drei. Kennen Sie nur die Sonne, kennen Sie die langsamste der drei.',
          'Für ein typisches Sonnenzeichen brauchen Sie keine Geburtszeit. Für den Mond oft auch nicht, außer er hat an diesem Tag das Zeichen gewechselt. Für den Aszendenten brauchen Sie immer eine. Die eigenen Sonne-, Mond- und Aszendenten-Werkzeuge von SideraChart sind Filter auf derselben Engine wie das volle Natalchart. Nutzen Sie das volle Chart, wenn Sie auch Häuser und Aspekte wollen.',
        ],
      },
      {
        heading: 'Grenzen, Zeitzonen und „Ich bin zwei Zeichen“',
        paragraphs: [
          'Im tropischen Gebrauch gibt es kein extra dreizehntes Zeichen, und es gibt keine offizielle Doppelstaatsbürgerschaft an der Grenze. Die Sonne steht in der Geburtsminute in einem Zeichen oder im anderen. Fehlt Ihnen an einem Grenz-Tag die Uhrzeit, sagen Sie das. Mitteln Sie nicht zwei Zeichen zu einer eigenen Identität und behandeln Sie das dann als berechnete Tatsache.',
          'Zeitzonengeschichte zählt mehr, als Menschen erwarten. Eine Geburt, die als 23:40 in einer Stadt eingetragen ist, die noch auf Sommerzeit stand, kann eine andere Weltzeit sein als dieselbe Uhrzeit im Winter. SideraChart verwendet IANA-Regeln für jenes Datum. Nutzte ein altes Papier einen anderen Versatz, kann der Grad der Sonne wandern; an einer Grenze das Zeichen ebenfalls.',
        ],
      },
      {
        heading: 'Ihr Sonnenzeichen auf SideraChart finden',
        paragraphs: [
          'Tragen Sie das Geburtsdatum ein und fügen Sie Uhrzeit und Ort hinzu, wenn Sie sie haben. Die Sonnenzeile in der Tabelle ist Zeichen und Grad. Das Rad setzt die Sonnenglyphe auf diese Länge. Aspekte zur Sonne nutzen dieselben Orbis wie der Rest des Charts: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil.',
          'Speichern Sie das Natalchart, wenn Sie den geschriebenen Bericht und das Tagesprotokoll möchten. Transite zu Ihrer natalen Sonne sind späteres Wetter, gespeichert um Mittag in der natalen Zeitzone. Sie ändern das natale Sonnenzeichen nicht. Das Sonnenzeichen ist eine Geburtstatsache. Alles andere ist Lesen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kann ich mein Sonnenzeichen ohne Geburtszeit wissen?',
        a: 'Meist ja. Die Sonne bleibt etwa einen Monat in einem Zeichen. Eine Uhrzeit brauchen Sie nur an dem Kalendertag, an dem sie das Zeichen wechselt, oder wenn Sie das Haus der Sonne wollen.',
      },
      {
        q: 'Warum ist mein Sonnenzeichen in einer vedischen App anders?',
        a: 'Vedische Apps nutzen typischerweise den siderischen Tierkreis. SideraChart nutzt tropische Längen vom Äquinoktium. Die Lücke beträgt heute etwa 24°, was die Sonne oft ins vorherige Zeichen schiebt.',
      },
      {
        q: 'Was, wenn ich an der Grenze geboren wurde?',
        a: 'Die Sonne steht in der Geburtsminute trotzdem in einem tropischen Zeichen. Tragen Sie eine genaue Uhrzeit ein. Ist die Zeit unbekannt, ist das Zeichen nicht geklärt und sollte nicht erzwungen werden.',
      },
      {
        q: 'Ist das Sonnenzeichen die wichtigste Stellung?',
        a: 'Es ist die bekannteste, nicht automatisch die lauteste. Ein enger Mond oder ein volles Haus können ein Chart beherrschen, das zufällig eine ruhige Sonne hat.',
      },
    ],
  },
  'sun-moon-rising': {
    title: 'Sonne, Mond und Aszendent: die Große Drei',
    excerpt:
      'Die Große Drei sind Sonnenzeichen, Mondzeichen und Aszendent. Sonne aus dem Datum, Mond aus Datum plus Prüfung der Uhrzeit, Aszendent nur mit Geburtszeit und Ort. Lesen Sie sie zusammen.',
    sections: [
      {
        heading: 'Sonne, Mond und Aszendent: die Große Drei',
        paragraphs: [
          'Sonne, Mond und Aszendent heißen Große Drei, weil sie die drei Stellungen sind, die Menschen im Gespräch tatsächlich nutzen, und weil sie auf drei unterschiedlichen Uhren sitzen. Die Sonne braucht ein Datum. Der Mond braucht ein Datum und an schnellen Tagen eine Uhrzeit. Der Aszendent braucht Datum, Uhrzeit und Ort. Haben Sie nur eine der drei, haben Sie das Set nicht.',
          'Sie sind keine Rangfolge spiritueller Wichtigkeit. Sie sind drei Koordinaten, die unterschiedliche Tempi beschreiben: den Jahresweg der Sonne, den Monatsweg des Mondes und die tägliche Rotation der Erde unter der Ekliptik. SideraChart berechnet alle drei aus derselben tropischen, VSOP87-basierten Engine. Der Aszendent entfällt, wenn die Geburtszeit unbekannt ist.',
        ],
      },
      {
        heading: 'Die Sonne: die langsame, öffentliche Koordinate',
        paragraphs: [
          'Das Sonnenzeichen ist das tropische Stück, das sie bei der Geburt einnahm. Es wechselt etwa einmal im Monat. Es ist der Index von Zeitungs-Horoskopen und die Antwort auf „Was ist mein Zeichen?“ im Alltag. Im Natalchart ist es trotzdem nur eine Länge. Es sagt Ihnen den Stil der Sonnenfunktion — wie Sie Tageszeit einnehmen —, nicht den Rest des Himmels.',
          'Für das Sonnenzeichen brauchen Sie selten eine genaue Uhr. Für das Haus der Sonne brauchen Sie eine, und an Grenz-Tagen für das Zeichen selbst. Wenn Sie die Große Drei aufbauen, tragen Sie die echte Uhrzeit trotzdem ein, damit der Grad der Sonne mit Aspekten zu Mond und Aszendent zusammenpasst.',
        ],
      },
      {
        heading: 'Der Mond: der schnelle Körper',
        paragraphs: [
          'Der Mond wandert etwa 13° am Tag und wechselt alle zweieinhalb Tage das Zeichen. Deshalb teilen zwei Menschen, die im selben Sonnenzeichen-Monat geboren wurden, oft nicht denselben Mond. Das Mondzeichen beschreibt das schnellere Wetter des Charts: Appetit, Schlaf, die unbenoteten Stunden. Es ist keine medizinische Diagnose und kein Etikett für eine Stimmungsstörung.',
          'Ohne Geburtszeit ist das Mondzeichen meist trotzdem korrekt. Grad und Haus sind es nicht. Hat der Mond an Ihrem Geburtstag das Zeichen gewechselt, lässt eine unbekannte Zeit den Mond selbst ungeklärt. Markieren Sie die Zeit in SideraChart als unbekannt, statt Mittag zu erfinden und den Grad zu verteidigen.',
        ],
      },
      {
        heading: 'Der Aszendent: der östliche Horizont',
        paragraphs: [
          'Der Aszendent ist der Tierkreisgrad, der in der Geburtsminute über dem östlichen Horizont aufging. Es ist ein örtlicher Winkel, kein Planet. Er hängt von Breite, Länge und Uhrzeit ab. Der Aszendent wandert etwa ein Grad alle vier Minuten, daher kann ein Fehler von zwanzig Minuten das Zeichen ändern.',
          'Häuser in Placidus (dem Standard von SideraChart) beginnen an diesem Winkel. Kein zuverlässiger Aszendent bedeutet keine zuverlässigen Häuser. Haben Sie keine Uhrzeit, lassen Sie den Aszendenten weg. Ein geratener Aszendent verschiebt jede „Planet im Haus“-Zeile, die ihm folgt.',
        ],
      },
      {
        heading: 'Warum Sie die drei zusammen lesen',
        paragraphs: [
          'Eine Nur-Sonne-Lesung ist eine Überschrift. Der Mond dazu sagt Ihnen, was das Chart tut, wenn niemand benotet. Der Aszendent dazu sagt Ihnen die Tür, die das Chart nutzt — erster Eindruck, der Körper im Raum, das Häuserraster. Die drei können reimen (alles Feuer) oder streiten (Sonne im Steinbock, Mond im Widder, Zwillinge-Aszendent). Der Streit ist Information.',
          'Aspekte unter der Großen Drei zählen mehr als Slogan-Chemie. Ein Sonne–Mond-Quadrat innerhalb 6° Orbis ist eine engere Aussage als „Feuer und Wasser“. Die Orbis von SideraChart sind 8° für Konjunktion und Opposition, 6° für Quadrat und Trigon, 4° für Sextil. Schauen Sie in die Tabelle, nicht in Meme-Kompatibilität.',
        ],
      },
      {
        heading: 'Wie Sie die Große Drei berechnen',
        paragraphs: [
          'Nutzen Sie den Geburtshoroskop-Rechner mit Datum, Uhrzeit und Ort. Lesen Sie zuerst die Zeilen Sonne, Mond und Aszendent, dann den Rest. Die eigenen Sonne-, Mond- und Aszendenten-Werkzeuge auf SideraChart sind dieselbe Engine mit schmalerer Anzeige. Nur tropischer Tierkreis; nicht siderisch, nicht chinesisch. Unbekannte Zeit: Sonne und meist den Mond können Sie noch listen; den Aszendenten nicht.',
          'Sobald das Natalchart gespeichert ist, legt das Tagesprotokoll Transite um Mittag in der natalen Zeitzone darüber. Diese Transite sprechen unter anderem mit der Großen Drei. Sie ersetzen sie nicht. Die Große Drei sind Geburtstatsachen. Transite sind der spätere Himmel.',
          'Stimmen die drei Stellungen nicht überein, wählen Sie keinen Favoriten und werfen Sie die anderen nicht weg. Schreiben Sie sie in einem Satz: Sonne in diesem Zeichen, Mond in jenem, dieses Zeichen aszendent. Dann öffnen Sie die Aspekttabelle. Dieser Satz plus der engste Orbis ist schon mehr Natalchart als eine Sonnenzeichen-Spalte.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was ist die Große Drei in der Astrologie?',
        a: 'Sonnenzeichen, Mondzeichen und Aszendent. Sie laufen auf Jahres-, Monats- und Tagesuhren. Für den Aszendenten brauchen Sie Geburtszeit und Ort.',
      },
      {
        q: 'Welche der Großen Drei ist am wichtigsten?',
        a: 'Keine ist automatisch die erste. Die Sonne ist die bekannteste. Der Mond ist schneller. Der Aszendent setzt die Häuser. Lesen Sie die engsten Aspekte unter ihnen, bevor Sie rangieren.',
      },
      {
        q: 'Kann ich meine Große Drei ohne Geburtszeit wissen?',
        a: 'Sonne meist ja, Mond meist ja außer an Tagen des Zeichenwechsels, Aszendent nein. SideraChart lässt den Aszendenten weg, wenn die Zeit als unbekannt markiert ist.',
      },
      {
        q: 'Ist der Aszendent dasselbe wie das Sonnenzeichen?',
        a: 'Nein. Die Sonne ist die Länge eines Planeten. Der Aszendent ist der ekliptikale Grad am östlichen Horizont. Sie fallen nur zufällig zusammen, und selbst dann sind es unterschiedliche Objekte.',
      },
    ],
  },
  'rising-sign': {
    title: 'Was ist mein Aszendent?',
    excerpt:
      'Ihr Aszendent ist der Tierkreisgrad am östlichen Horizont bei der Geburt. Er braucht eine genaue Geburtszeit und einen Ort. Ohne Geburtszeit lassen Sie ihn weg.',
    sections: [
      {
        heading: 'Was ist mein Aszendent?',
        paragraphs: [
          'Ihr Aszendent ist der tropische Tierkreisgrad, der in der Minute Ihrer Geburt im Osten aufging. Es ist kein Planet. Es ist ein örtlicher Winkel aus der Erdrotation, Ihrer Breite und Länge und der Uhr. Zwei Menschen, die in derselben Stunde in unterschiedlichen Städten geboren wurden, teilen keinen Aszendenten. Zwei Menschen, die in derselben Stadt eine Stunde auseinander geboren wurden, oft auch nicht.',
          'Menschen suchen „Was ist mein Aszendent?“, weil soziale Astrologie ihn als zweite Identität neben der Sonne behandelt. Am Instrument ist er genauer: er ist der Startschuss für das Häusersystem und der Grad, der beschreibt, wie das Chart der Welt zuerst begegnet — Körper, Eingang, erster Eindruck. Er ist keine Maske für Fremde und per Dekret nicht wichtiger als die Sonne.',
        ],
      },
      {
        heading: 'Warum der Aszendent eine Geburtszeit braucht',
        paragraphs: [
          'Der Aszendent wandert etwa ein Grad alle vier Minuten. Ein Fehler von zwanzig Minuten sind fünf Grad und kann das Zeichen ändern, besonders nahe einer Grenze. Eine Zwei-Stunden-Schätzung ist die meiste Zeit ein anderer Aszendent. Der Ort zählt ebenfalls: dieselbe Weltzeit erzeugt in London und in Kiew unterschiedliche örtliche Horizonte.',
          'SideraChart rechnet bürgerliche Zeit mit IANA-Zeitzonenregeln für jenes Datum in Weltzeit um und berechnet dann die örtliche Sternzeit und den schneidenden ekliptikalen Grad. Markieren Sie die Zeit als unbekannt, liefert der Rechner trotzdem Planetenlängen und lässt den Aszendenten weg. Das ist die ehrliche Ausgabe. 12:00 zu erfinden und einen Aszendenten zu veröffentlichen ist ein anderes, schlechteres Produkt.',
        ],
      },
      {
        heading: 'Aszendent und Sonnenzeichen',
        paragraphs: [
          'Das Sonnenzeichen kommt aus der ekliptikalen Länge der Sonne und ist über einen Tag stabil. Der Aszendent kommt vom Horizont und ist es nicht. Ihr Sonnenzeichen können Sie von einer Geburtstagstorte wissen. Ihren Aszendenten nicht. Gab Ihnen eine App einen Aszendenten, ohne nach einer Uhrzeit zu fragen, hat sie geraten, meist um Mittag, und sollte nicht vertraut werden.',
          'Sind beide bekannt, lesen Sie sie als unterschiedliche Objekte. Sonne in der Jungfrau, Skorpion-Aszendent ist ein häufiges Muster, kein Widerspruch. Das eine ist die Sonnenhandlung; das andere die östliche Tür und das Häuserraster. Der Aszendenten-Rechner von SideraChart ist die Natal-Engine, gefiltert auf diesen Winkel. Das volle Chart zeigt trotzdem, warum der Rest des Himmels dort sitzt, wo er sitzt.',
        ],
      },
      {
        heading: 'Häuser beginnen am Aszendenten',
        paragraphs: [
          'In Placidus, dem Standard von SideraChart, beginnt Haus I am Aszendenten. Die übrigen Spitzen folgen aus der Aufgangszeit, daher sind die Häuser ungleich. Whole Sign weist Haus I dem ganzen Zeichen zu, das den Aszendenten enthält, und zählt dann Zeichen. So oder so: kein Aszendent bedeutet keine ehrlichen Häuser.',
          'Jede Zeile „Planet im siebten Haus“ hängt davon ab. Ist der Aszendent falsch, sind diese Zeilen falsch, selbst wenn die Planetenzeichen stimmen. Deshalb heißt unbekannte Zeit: Planeten ja, Häuser nein — nicht „Häuser ungefähr“. Polarbreiten über etwa 66° belasten Placidus ebenfalls; wechseln Sie dort zu Whole Sign, statt gebrochene Spitzen zu erzwingen.',
        ],
      },
      {
        heading: 'Ungefähre Zeiten und Mittags-Charts',
        paragraphs: [
          'Eine eingetragene Zeit 04:00 kann „gegen vier“ oder „genau vier“ meinen. Behandeln Sie gerundete Stunden als Spanne. Rechnen Sie zwanzig Minuten in beide Richtungen nach und sehen Sie, ob der Aszendent im Zeichen bleibt. Kippt er, haben Sie noch keinen Aszendenten; Sie haben zwei Kandidaten. Rektifikation — eine Zeit zu erfinden, die zu einer Biografie passt — ist ein eigenes, leicht missbrauchbares Handwerk. SideraChart macht das nicht für Sie.',
          'Familienerinnerung ist schwächer als eine Urkunde. Widersprechen sich Angehörige, bevorzugen Sie das Dokument. Gibt es keines, lassen Sie die Zeit unbekannt. Sie können trotzdem Sonne, Mond (meist), Merkur, Venus, Mars und die äußeren Planeten in Zeichen lesen, plus Aspekte unter ihnen. Das ist schon ein Natalchart minus den örtlichen Rahmen.',
        ],
      },
      {
        heading: 'Wie Sie Ihren Aszendenten berechnen',
        paragraphs: [
          'Nutzen Sie den Aszendenten-Rechner von SideraChart oder den vollen Geburtshoroskop-Rechner. Tragen Sie Datum, Uhrzeit und Ort ein. Die Aszendentenzeile ist Zeichen und Grad. Positionen sind tropisch, aus astronomy-engine (VSOP87), nicht Swiss Ephemeris, nicht siderisch. Aspekte von Planeten zum Aszendenten nutzen dieselben Orbis wie Planet-zu-Planet-Kontakte: 8° / 6° / 4°.',
          'Speichern Sie das Chart, wenn Sie Häuser, den geschriebenen Bericht und spätere Transite im Tagesprotokoll um Mittag nataler Zeit möchten. Ein Aszendent ohne den Rest des Rads ist trotzdem nur ein Winkel. Berechnen Sie ihn sorgfältig und setzen Sie ihn dann zurück ins Chart, zu dem er gehört.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kann ich meinen Aszendenten ohne Geburtszeit finden?',
        a: 'Nein. Der Aszendent ist ein Horizontgrad. Ohne Uhr und Ort ist jeder Aszendent eine Schätzung. SideraChart lässt ihn weg, wenn die Zeit unbekannt ist.',
      },
      {
        q: 'Wie oft wechselt der Aszendent?',
        a: 'Etwa alle zwei Stunden geht ein neues Zeichen auf, und der Grad selbst wandert etwa 1° in vier Minuten. Deshalb zählen Minuten.',
      },
      {
        q: 'Ist Aszendent dasselbe wie Rising Sign?',
        a: 'Ja. Rising Sign meint gewöhnlich das Zeichen des Aszendenten. Der Aszendent ist der genaue Grad; das Rising Sign ist, in welches tropische Zeichen dieser Grad fällt.',
      },
      {
        q: 'Warum ist mein Aszendent auf einer anderen Site anders?',
        a: 'Prüfen Sie Zeitzone, Sommerzeit, Koordinaten und ob die andere Site siderisch ist. SideraChart ist tropisch Placidus als Standard. Ein Mittags-Platzhalter erzeugt ebenfalls einen falschen Aszendenten.',
      },
    ],
  },
  'moon-sign': {
    title: 'Was ist ein Mondzeichen?',
    excerpt:
      'Ihr Mondzeichen ist das tropische Zeichen, das der Mond bei der Geburt einnahm. Es wechselt alle zweieinhalb Tage. Die Uhrzeit zählt trotzdem für Grad, Haus und Grenz-Tage.',
    sections: [
      {
        heading: 'Was ist ein Mondzeichen?',
        paragraphs: [
          'Ihr Mondzeichen ist das tropische Tierkreiszeichen, das den Mond enthielt, als Sie geboren wurden. Menschen fragen danach, weil es nach der Sonne die zweitbekannteste Stellung ist, und weil er schnell genug wandert, dass zwei Menschen mit derselben Sonne ihn oft nicht teilen. Der Mond ist eine Länge wie jeder andere Planet im Natalchart, nur schneller: etwa 13° pro Tag, ein neues Zeichen alle zweieinhalb Tage.',
          'In der Chartsprache beschreibt der Mond die unbenoteten Stunden: Appetit, Schlaf, was Sie tun, wenn niemand die Aufführung benotet. Das ist eine Funktion, keine medizinische Notiz und kein Freifahrtschein. SideraChart setzt den Mond mit derselben Engine der Klasse VSOP87 (astronomy-engine) wie die Sonne, im tropischen Tierkreis, nicht siderisch.',
        ],
      },
      {
        heading: 'Wie schnell der Mond wandert',
        paragraphs: [
          'Weil der Mond schnell ist, verdient eine Geburtszeit ihren Platz, selbst wenn das Zeichen offensichtlich wirkt. Der Grad ändert sich um rund einen halben Grad pro Stunde. Aspekte zum Mond werden über einen Vormittag enger oder lockerer. Das Haus des Mondes — sobald Sie einen Aszendenten haben — ist falsch, wenn die Uhr falsch ist, selbst wenn das Zeichen stimmt.',
          'An einem Tag des Zeichenwechsels entscheidet die Uhr das Zeichen selbst. Wurden Sie an einem Tag geboren, an dem der Mond den Stier Richtung Zwillinge verließ, bedeutet unbekannte Zeit, dass Sie noch kein Mondzeichen haben. Wählen Sie nicht das, das Sie lieber mögen. Berechnen Sie es, oder markieren Sie die Lücke.',
        ],
      },
      {
        heading: 'Mondzeichen ohne Geburtszeit',
        paragraphs: [
          'Haben Sie ein Datum und keine Uhrzeit, ist das Mondzeichen meist trotzdem korrekt. Der Grad ist es nicht. Das Haus ist es nicht, weil Häuser den Aszendenten brauchen und der Aszendent die Minute. Die Regel von SideraChart ist dieselbe wie für den Rest des Charts: unbekannte Zeit = Planeten ja, Häuser nein. Der Mond ist in diesem Satz ein Planet.',
          'Ein Mittags-Platzhalter ist eine Schätzung. Er ist nützlich für einen ersten Blick auf das Zeichen an einem ruhigen Tag. Er ist keine Tatsache, aus der Sie argumentieren sollten, wenn Grad, Haus oder eine Grenze im Spiel sind. Bevorzugen Sie eine Urkundenzeit. Gibt es keine, sagen Sie, die Zeit sei unbekannt, und lesen Sie den Mond nur im Zeichen.',
        ],
      },
      {
        heading: 'Mond und Sonne im selben Chart',
        paragraphs: [
          'Die Sonne ist der monatliche Index, den alle schon kennen. Der Mond ist das schnellere innere Wetter. Sie können dasselbe Zeichen einnehmen (eine Neumond-Geburt) oder gegenüberliegen (eine Vollmond-Geburt) oder alles dazwischen. Sonne–Mond-Aspekte nutzen die Orbis von SideraChart: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil. Ein enges Sonne–Mond-Quadrat ist eine lautere Aussage als zwei gestapelte Zeichen-Memes.',
          'Die Große Drei setzt den Mond zwischen Sonne und Aszendent. Sonne und Mond (meist) können Sie ohne Uhrzeit wissen. Das Trio können Sie ohne eine nicht vervollständigen. Sind Sie nur wegen des Mondzeichens gekommen, tragen Sie trotzdem Uhrzeit und Ort ein, wenn Sie sie haben, damit Grad und Aspekte ehrlich sind.',
        ],
      },
      {
        heading: 'Grad, Haus und Aspekte',
        paragraphs: [
          'Der Grad sagt Ihnen, wie früh oder spät der Mond im Zeichen steht und wie nah er an einem Aspekt ist. Das Haus, mit bekanntem Aszendenten, sagt Ihnen, welcher Lebensbereich diese Mondfunktion trägt. Leere andere Häuser streichen den Mond nicht; sie bedeuten nur, dass der Mond nicht in diesen Zimmern sitzt.',
          'Der Mondzeichen-Rechner von SideraChart ist die Natal-Engine, gefiltert auf einen Körper. Das volle Geburtshoroskop fügt Häuser hinzu (Placidus als Standard), den Aszendenten und das Aspektarium. Tägliche Transite zu Ihrem natalen Mond liegen im Tagesprotokoll um Mittag in der natalen Zeitzone. Das ist späterer Himmel, keine Umschreibung des natalen Mondes.',
        ],
      },
      {
        heading: 'Wie Sie Ihr Mondzeichen berechnen',
        paragraphs: [
          'Tragen Sie Geburtsdatum, Uhrzeit falls vorhanden und Ort ein. Lesen Sie die Mondzeile: Zeichen, Grad, Haus wenn die Uhr bekannt ist. Positionen sind tropisch. Ist eine andere App siderisch, kann der Mond im vorherigen Zeichen sitzen; das ist die Ayanamsha-Lücke, kein Fehler in astronomy-engine.',
          'Behandeln Sie ein Mondzeichen nicht als finanziellen, rechtlichen oder medizinischen Rat. Nutzen Sie es als Koordinate. Fehlt die Uhrzeit, halten Sie die Koordinate grob: nur Zeichen. Ist die Uhrzeit da, nutzen Sie Grad und Aspekte. Das ist die ganze Methode.',
          'Vergleichen Sie mit der Sonne, bevor Sie aufhören. Sonne und Mond im selben Zeichen (eine Neumond-Geburt) haben eine andere Textur als eine Vollmond-Opposition. Beides ist gewöhnliche Astronomie. SideraChart zeigt den Orbis; Sie entscheiden, ob 6° noch als laut zählt. Spätere Mondtransite im Tagesprotokoll sind Wetter, gespeichert um Mittag nataler Zeit, kein neues Mondzeichen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie finde ich mein Mondzeichen?',
        a: 'Berechnen Sie ein Natalchart aus Geburtsdatum, Uhrzeit und Ort. Die Mondzeile ist das tropische Zeichen. Der Mondzeichen-Rechner von SideraChart nutzt dieselbe Engine wie das volle Chart.',
      },
      {
        q: 'Brauche ich eine Geburtszeit für mein Mondzeichen?',
        a: 'Für das Zeichen meist nicht. Eine Uhrzeit brauchen Sie für den Grad, das Haus und jeden Geburtstag, an dem der Mond das Zeichen gewechselt hat.',
      },
      {
        q: 'Wie oft wechselt der Mond das Zeichen?',
        a: 'Etwa alle zweieinhalb Tage. Deshalb haben Menschen, die im selben Sonnenzeichen-Monat geboren wurden, oft unterschiedliche Monde.',
      },
      {
        q: 'Warum unterscheidet sich mein Mondzeichen auf einer vedischen Site?',
        a: 'Siderische Tierkreise messen von einem sternbasierten Nullpunkt etwa 24° vom tropischen Äquinoktium von heute. SideraChart ist nur tropisch.',
      },
    ],
  },
  'venus-sign': {
    title: 'Was ist ein Venuszeichen?',
    excerpt:
      'Ihr Venuszeichen ist das tropische Zeichen, das Venus bei der Geburt einnahm. Es beschreibt Stil in Anziehung, Geschmack und Werten — eine natale Koordinate, kein Dating-Urteil.',
    sections: [
      {
        heading: 'Was ist ein Venuszeichen?',
        paragraphs: [
          'Ihr Venuszeichen ist das tropische Tierkreiszeichen, das Venus bei Ihrer Geburt enthielt. Menschen suchen „Was ist ein Venuszeichen?“, weil populäre Astrologie Venus als Kurzform für Geschmack, Anziehung und die Art nutzt, Dinge zu bewerten, die keine Rechnungen sind — Kunst, Umgangsformen, die Menschen, die Sie behalten. Am Instrument ist es eine planetare Länge, berechnet wie die anderen aus Geburtsdatum, Uhrzeit und Ort.',
          'SideraChart setzt Venus im tropischen Tierkreis mit astronomy-engine (VSOP87). Es ist keine siderische Venus und keine chinesische Stunde. Das Zeichen ist das 30°-Stück. Das Haus, wenn Sie eine Geburtszeit haben, ist der örtliche Bereich. Aspekte zu Venus nutzen Orbis 8° / 6° / 4°. Nichts davon ist ein Urteil, ob eine Beziehung weitergehen soll.',
        ],
      },
      {
        heading: 'Was Venus in einem Natalchart misst',
        paragraphs: [
          'Venus ist der Appetit des Charts auf Harmonie, Wert und Kontakt. In der Praxis lesen Sie sie als: wie Räume sich anfühlen sollen, was Ihnen schön genug heißt, und wie Sie Nähe aushandeln. Das ist beschreibend. Es sagt Ihnen nicht, wen Sie daten, ob Sie Geld ausgeben oder wie Sie einen Rechtsstreit beilegen sollen. Behalten Sie die Funktion; lassen Sie das Wahrsagen weg.',
          'Venus reist nie weit von der Sonne, daher ist Ihr Venuszeichen oft dasselbe wie Ihr Sonnenzeichen oder ein Nachbar. Das ist Astronomie, kein Schicksal. Eine Zwillinge-Sonne mit Stier-Venus ist eine häufige Spaltung: Sonnenhandlung in einem Stil, Venus im vorherigen. Lesen Sie beide, statt sie in einen Slogan zu zwingen.',
        ],
      },
      {
        heading: 'Geschwindigkeit, Rückläufigkeit und Zeichenwechsel',
        paragraphs: [
          'Venus verbringt im direkten Lauf ein paar Wochen in einem Zeichen und länger, wenn sie stillsteht oder rückläufig wird. Rückläufige Venus bei der Geburt ist eine natale Tatsache über die scheinbare Bewegung, kein Fluch und keine Persönlichkeitsstörung. Sie bedeutet, dass die Länge an diesem Tag rückwärts entlang der Ekliptik wanderte. Berechnen Sie es; dramatisieren Sie es nicht.',
          'Weil Venus langsamer ist als der Mond, erhalten Sie das richtige Zeichen meist aus dem Datum allein. Die Uhrzeit setzt trotzdem Grad, Haus und welche Seite einer Grenze Sie einnehmen. Unbekannte Zeit: Planeten ja, Häuser nein. Erfinden Sie nicht Mittag, um Venus ins siebte Haus zu setzen, und behandeln Sie dieses Haus dann als Beleg.',
        ],
      },
      {
        heading: 'Venus und die Große Drei',
        paragraphs: [
          'Sonne, Mond und Aszendent bleiben der erste Durchgang. Venus ist eine Spezialkoordinate, die Sie nach diesen drei lesen, es sei denn, Venus liegt auf einem Winkel oder ist in einem engen Aspekt zu ihnen verriegelt. Eine Venus–Saturn-Konjunktion innerhalb 8° ist lauter als ein Venuszeichen-Text. Schauen Sie ins Aspektarium.',
          'Der Aszendent braucht trotzdem die Uhr. Sind Sie nur wegen Venus gekommen und haben eine Uhrzeit, tragen Sie sie trotzdem ein, damit Haus und Aspekte real sind. Der Venuszeichen-Rechner von SideraChart ist die Natal-Engine, gefiltert auf eine Glyphe. Das volle Chart ist der Kontext, der verhindert, dass Venus die ganze Lesung frisst.',
        ],
      },
      {
        heading: 'Häuser und Aspekte zu Venus',
        paragraphs: [
          'Mit bekanntem Aszendenten nennt Venus in einem Haus den Lebensbereich, in dem diese Wertfunktion offensichtlich ist — viertes, siebtes, zehntes und so weiter. Leere Häuser anderswo sind keine fehlenden Organe. Placidus ist der Standard von SideraChart; Whole Sign ist die Alternative, wenn Sie gleiche Zeichen wollen oder in hoher Breite sind.',
          'Hauptaspekte zu Venus sind Konjunktion, Sextil, Quadrat, Trigon und Opposition. Engere Orbis zuerst lesen. Transite zur natalen Venus leben später im Tagesprotokoll, gespeichert um Mittag in der natalen Zeitzone. Diese Transite ändern das natale Venuszeichen nicht. Sie sind Wetter gegen einen festen Punkt.',
        ],
      },
      {
        heading: 'Wie Sie Ihr Venuszeichen finden',
        paragraphs: [
          'Tragen Sie Geburtsdatum, Uhrzeit und Ort in SideraChart ein. Lesen Sie die Venuszeile. Vergleichen Sie mit der Sonne: oft in der Nähe, manchmal dieselbe. Widerspricht eine siderische App, schauen Sie einen anderen Nullpunkt an, etwa 24° entfernt. Stellen Sie jene App auf tropisch, wenn Sie mit dieser Site übereinstimmen wollen.',
          'Nutzen Sie die Stellung als Koordinate in einem Natalchart, nicht als Dating-Rat. Ist die Zeit unbekannt, halten Sie Venus im Zeichen und lassen Sie das Haus weg. Ist die Zeit bekannt, lesen Sie Grad, Haus und Aspekte. Dann setzen Sie Venus zurück neben den Rest des Rads.',
          'Wenn Sie später auch Synastrie rechnen, sind Venus-Kontakte zwischen zwei Charts eine andere Karte. Berechnen Sie zuerst Ihre natale Venus, damit Sie wissen, welche Länge andere Menschen kontaktieren. Komposit-Mittelpunkte, die Venus einschließen, sind noch einmal eine dritte Karte. Eine Koordinate, drei Instrumente — mischen Sie die Ausdrucke nicht.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie finde ich mein Venuszeichen?',
        a: 'Rechnen Sie ein Natalchart oder den Venuszeichen-Rechner von SideraChart mit Ihrem Geburtsdatum und fügen Sie Uhrzeit und Ort hinzu, wenn Sie sie haben. Die Venuszeile ist das tropische Zeichen und der Grad.',
      },
      {
        q: 'Braucht Venus eine genaue Geburtszeit?',
        a: 'Für das Zeichen meist nicht. Eine Uhrzeit brauchen Sie für das Haus, den genauen Grad an einer Grenze und Aspekte, die sich über den Tag verengen.',
      },
      {
        q: 'Was bedeutet rückläufige Venus im Natalchart?',
        a: 'Es bedeutet, dass die scheinbare ekliptikale Länge der Venus bei der Geburt rückwärts wanderte. Berechnen Sie es als Bewegungsfakt. Es ist kein medizinisches oder Beziehungsurteil.',
      },
      {
        q: 'Warum steht mein Venuszeichen neben meinem Sonnenzeichen?',
        a: 'Venus bleibt am Himmel nahe der Sonne, daher sind die natalen Zeichen oft dieselben oder benachbart. Das ist Orbitgeometrie, kein besonderes Schicksal.',
      },
    ],
  },
  'mercury-sign': {
    title: 'Was ist ein Merkurzeichen?',
    excerpt:
      'Ihr Merkurzeichen ist das tropische Zeichen, das Merkur bei der Geburt einnahm. Merkur bleibt nahe der Sonne, daher stimmen die Zeichen überein oder sind Nachbarn. Die Uhrzeit setzt trotzdem Haus und Grad.',
    sections: [
      {
        heading: 'Was ist ein Merkurzeichen?',
        paragraphs: [
          'Ihr Merkurzeichen ist das tropische Tierkreiszeichen, das Merkur bei Ihrer Geburt enthielt. Menschen schlagen es nach, weil Merkur die Sprach-und-Besorgungs-Funktion des Charts ist: wie Sie Informationen sortieren, sprechen, pendeln und Ihre Meinung ändern. Es ist eine Länge im Natalchart, kein Intelligenzmaß und keine Diagnose von Aufmerksamkeit.',
          'SideraChart berechnet Merkur im tropischen Tierkreis aus astronomy-engine (VSOP87), mit Placidus-Häusern, wenn eine Geburtszeit vorliegt. Es verwendet nicht Swiss Ephemeris und bietet keinen siderischen oder vedischen Merkur. Widerspricht eine andere App um etwa ein Zeichen, prüfen Sie, ob sie siderisch ist, bevor Sie einen Fehler annehmen.',
        ],
      },
      {
        heading: 'Merkur nie weit von der Sonne',
        paragraphs: [
          'Die Merkurbahn hält ihn am Himmel nah an der Sonne, daher ist Ihr Merkurzeichen meist dasselbe wie Ihr Sonnenzeichen oder ein Zeichen daneben. Eine Löwe-Sonne mit Jungfrau-Merkur ist gewöhnliche Geometrie. Behandeln Sie diese Spaltung als nützlich: Sonnenhandlung in einem Stil, die Sprech- und Sortierfunktion im nächsten. Klappen Sie sie nicht in ein einziges Meme zusammen.',
          'Weil Merkur nicht so schnell ist wie der Mond, legt das Datum oft das Zeichen fest. Die Uhrzeit zählt trotzdem für den Grad, für Aspekte, die sich über den Tag bilden, und für das Haus. Unbekannte Zeit: das Merkurzeichen können Sie behalten; eine Merkur-im-Haus-Aussage nicht.',
        ],
      },
      {
        heading: 'Merkur rückläufig bei der Geburt',
        paragraphs: [
          'Merkur bleibt stehen und wird drei- oder viermal im Jahr rückläufig. Ein nataler rückläufiger Merkur bedeutet, dass die scheinbare Länge bei der Geburt rückwärts auf der Ekliptik wanderte. Das ist eine Bewegungsflagge, kein Fluch auf Ihre E-Mails und kein Etikett für eine Lernbeeinträchtigung. Berechnen Sie es, notieren Sie es, lesen Sie Zeichen und Aspekte darum herum.',
          'Rückläufige Phasen bedeuten auch, dass Merkur extra Zeit in einem Zeichen verbringen oder ins vorherige zurückkehren kann. Grenz-Tage um Stationen verdienen eine echte Uhr. Ist die Zeit an diesen Daten unbekannt, lassen Sie das Zeichen ungeklärt, statt die Geschichte zu wählen, die Ihnen gefällt.',
        ],
      },
      {
        heading: 'Merkur, Häuser und die Große Drei',
        paragraphs: [
          'Lesen Sie Sonne, Mond und Aszendent zuerst, es sei denn, Merkur steht in Konjunktion mit einem von ihnen oder auf einem Winkel. Eine Merkur–Mond-Konjunktion innerhalb 8° färbt beide Funktionen. Der Aszendent braucht trotzdem die Geburtszeit; ohne sie lassen Sie Häuser ganz weg.',
          'Merkur in einem Haus (Placidus-Standard) nennt, wo die Sortierfunktion offensichtlich ist — drittes, sechstes, zehntes und so weiter. Leere Häuser sind leer von Planeten, nicht leer von Leben. Whole Sign ist verfügbar, wenn jedes Haus ein ganzes Zeichen ab dem Zeichen des Aszendenten sein soll, oder wenn Placidus in hoher Breite versagt.',
        ],
      },
      {
        heading: 'Aspekte zu Merkur',
        paragraphs: [
          'Hauptaspekte sind Konjunktion, Sextil, Quadrat, Trigon und Opposition. Die Orbis von SideraChart sind 8° für Konjunktion und Opposition, 6° für Quadrat und Trigon, 4° für Sextil. Enge Merkur–Saturn- oder Merkur–Uranus-Kontakte sagen mehr als der Zeichen-Text. Nutzen Sie die Tabelle unter dem Rad.',
          'Transite zum natalen Merkur erscheinen später im Tagesprotokoll, gespeichert um Mittag in der natalen Zeitzone, damit die Notiz des Tages nicht driftet, wenn Sie um 23:00 aktualisieren. Diese Transite schreiben das natale Merkurzeichen nicht um. Die natale Stellung ist die Basislinie.',
          'Ein transitierender rückläufiger Merkur über natalem Merkur ist eine vorübergehende Überlagerung, beliebt in Schlagzeilen und leicht überlesen. Notieren Sie den Orbis, notieren Sie, ob er appliciert, dann schauen Sie auf die übrigen langsamen Kontakte des Tages. Schnelles Merkur-Wetter sollte einen tatsächlich engen Saturn-Transit nicht übertrumpfen.',
        ],
      },
      {
        heading: 'Wie Sie Ihr Merkurzeichen berechnen',
        paragraphs: [
          'Nutzen Sie den Merkurzeichen-Rechner von SideraChart oder das volle Geburtshoroskop. Tragen Sie Datum, Uhrzeit und Ort ein. Lesen Sie die Merkurzeile, dann einen Blick auf die Sonne, ob sie ein Zeichen teilen. Nur tropisch. Brauchen Sie Häuser, brauchen Sie die Uhr; haben Sie die Uhr nicht, bleiben Sie beim Zeichen.',
          'Behandeln Sie Merkur nicht als Berufs-, Rechts- oder medizinischen Rat. Es ist eine Koordinate dafür, wie das Chart spricht und sortiert. Setzen Sie ihn zurück ins Rad mit Venus, Mars und der Großen Drei, bevor Sie entscheiden, das Chart habe ein einziges Thema.',
          'Wenn Sie mit einer anderen Website abgleichen, stellen Sie tropischen Tierkreis und dieselbe Geburtszeitzone ein. Ein Merkurzeichen, das springt, ist meist siderisch, ein Uhrfehler am Stationstag oder ein Treffer in der Zeitzonengeschichte — nicht astronomy-engine, das versagt. Häuser werden trotzdem abweichen, wenn eine Site Whole Sign nutzte und Sie SideraChart auf Placidus gelassen haben.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie finde ich mein Merkurzeichen?',
        a: 'Berechnen Sie ein Natalchart aus Geburtsdatum, Uhrzeit und Ort oder nutzen Sie den Merkurzeichen-Rechner von SideraChart. Die Merkurzeile ist das tropische Zeichen und der Grad.',
      },
      {
        q: 'Warum steht mein Merkur im selben Zeichen wie meine Sonne?',
        a: 'Merkur entfernt sich nie weit von der Sonne, daher stimmen die natalen Zeichen oft überein oder sitzen nebenan. Prüfen Sie die Grade; sie können andere Planeten trotzdem unterschiedlich aspektieren.',
      },
      {
        q: 'Brauche ich eine Geburtszeit für Merkur?',
        a: 'Für das Zeichen meist nicht. Eine Uhrzeit brauchen Sie für das Haus und für Grenz- oder Stationstage, an denen das Merkurzeichen kippen kann.',
      },
      {
        q: 'Ist nataler Merkur rückläufig etwas Schlechtes?',
        a: 'Es ist eine Tatsache scheinbarer Bewegung, kein Urteil. Lesen Sie Zeichen, Haus und Aspekte. Es ist keine Aussage über Intelligenz oder Gesundheit.',
      },
    ],
  },
  'mars-sign': {
    title: 'Was ist ein Marszeichen?',
    excerpt:
      'Ihr Marszeichen ist das tropische Zeichen, das Mars bei der Geburt einnahm. Es beschreibt, wie das Chart startet, streitet und verfolgt — eine natale Koordinate, keine Lizenz für Konflikt.',
    sections: [
      {
        heading: 'Was ist ein Marszeichen?',
        paragraphs: [
          'Ihr Marszeichen ist das tropische Tierkreiszeichen, das Mars bei Ihrer Geburt enthielt. Menschen suchen „Was ist ein Marszeichen?“, weil populäre Texte Mars als Treibstoff behandeln: wie Sie starten, konkurrieren, begehren und wütend werden. Am Instrument ist es eine planetare Länge in einem Natalchart, berechnet aus Geburtsdatum, Uhrzeit und Ort. Es ist kein Freifahrtschein für Grausamkeit und keine medizinische Lesung von Blut oder Muskeln.',
          'SideraChart setzt Mars im tropischen Tierkreis mit astronomy-engine (VSOP87). Häuser, wenn die Uhr bekannt ist, stehen standardmäßig auf Placidus. Siderische und chinesische Systeme liegen außerhalb des Rahmens. Zeigt eine vedische App ein anderes Marszeichen, schauen Sie einen anderen Nullpunkt an, nicht einen anderen Planeten.',
        ],
      },
      {
        heading: 'Was Mars im Chart beschreibt',
        paragraphs: [
          'Mars ist die initiierende und kämpferische Funktion: Hitze, Verfolgung, der erste Zug in einem Konflikt, der Wille, einen Weg zu schneiden. Sie lesen das Zeichen als Stil dieser Hitze — direkt, langsam, taktisch, theatralisch — und das Haus als den Bereich, in dem sie sich zeigt. Bleiben Sie beschreibend. Nutzen Sie es nicht, um Schaden zu rechtfertigen oder Gewalt vorherzusagen.',
          'Mars kann weit von der Sonne sitzen, anders als Merkur und Venus, daher unterscheidet sich Ihr Marszeichen oft von Ihrem Sonnenzeichen. Diese Spaltung ist gewöhnlich. Eine Stier-Sonne mit Widder-Mars ist kein Widerspruch. Es sind zwei Funktionen mit zwei Stilen. Lesen Sie beide, dann prüfen Sie die Aspekttabelle, bevor Sie eines rangieren.',
        ],
      },
      {
        heading: 'Geschwindigkeit, Rückläufigkeit und Geburtszeit',
        paragraphs: [
          'Mars verbringt direkt etwa sechs bis sieben Wochen in einem Zeichen, länger um Rückläufigkeit. Nataler rückläufiger Mars bedeutet, dass die scheinbare Länge bei der Geburt rückwärts wanderte. Notieren Sie es als Bewegung. Behandeln Sie es nicht als Charakterfehler.',
          'Das Datum legt meist das Zeichen fest. Die Uhrzeit setzt trotzdem Grad, Aspekte über den Tag und das Haus. Unbekannte Zeit: Planeten ja, Häuser nein. Ein Mittags-Chart, das Mars auf einen Winkel parkt, ist eine Schätzung. Liegt Ihnen „Mars im ersten Haus“ am Herzen, brauchen Sie einen tatsächlichen Aszendenten, und das heißt eine tatsächliche Uhr.',
        ],
      },
      {
        heading: 'Mars, die Große Drei und andere Planeten',
        paragraphs: [
          'Lesen Sie Sonne, Mond und Aszendent zuerst, es sei denn, Mars steht in Konjunktion mit einem von ihnen oder sitzt auf Aszendent oder Medium Coeli. Ein Mars–Mond-Quadrat innerhalb 6° spricht lauter als ein Marszeichen-Absatz. Der Aszendent braucht weiterhin Geburtszeit und Ort.',
          'Mars–Venus- und Mars–Saturn-Kontakte sind leicht zu übererzählen. Nutzen Sie das Aspektarium von SideraChart und die genannten Orbis: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil. Enges zuerst. Weite Kontakte am Rand des Orbis sind leiser. Die farbigen Linien im Rad entsprechen der Tabelle.',
        ],
      },
      {
        heading: 'Häuser und spätere Transite',
        paragraphs: [
          'Mit bekanntem Aszendenten nennt Mars in einem Haus, wo die initiierende Funktion offensichtlich ist. Leere Häuser bedeuten nicht, dass Ihnen dieser Lebensbereich fehlt; sie bedeuten, dass kein Planet in diesem Zimmer sitzt. Placidus ist der Standard, weil die meisten westlichen Texte ihn voraussetzen. Whole Sign ist in hohen Breiten sauberer und wenn Zeichen = Haus gelten soll.',
          'Transite zum natalen Mars sind späteres Wetter. Das Tagesprotokoll von SideraChart speichert die Überlagerung des Tages um Mittag in der natalen Zeitzone. Ein transitierendes Mars-Quadrat zum natalen Mars ist ein vorübergehender Kontakt, keine Umschreibung des natalen Marszeichens. Halten Sie Basislinie und Wetter in unterschiedlichen Schubladen.',
          'Mars-Return — transitierender Mars zurück auf dem natalen Grad — ist ein Zyklus von etwa zwei Jahren, kein Persönlichkeitsreset. Verfolgen Sie ihn im Tagesprotokoll, verfolgen Sie einen wiederholten Kontakt, kein neues Natalchart. Verpasste Tage bleiben verpasst; das Produkt erfindet keine Return, die Sie nicht geöffnet haben.',
        ],
      },
      {
        heading: 'Wie Sie Ihr Marszeichen finden',
        paragraphs: [
          'Nutzen Sie den Marszeichen-Rechner oder das volle Natalchart auf SideraChart. Tragen Sie Datum, Uhrzeit und Ort ein. Lesen Sie die Marszeile, dann die Aspekte. Nur tropisch. Gleichen Sie andere Sites ab, indem Sie sie auf tropisch plus Placidus stellen, wenn Sie dieselben Häuser wollen.',
          'Setzen Sie Mars zurück ins Chart. Ein Marszeichen ohne Sonne, Mond, Aszendent und den Rest ist eine Spezialnotiz. Berechnen Sie es sorgfältig und lesen Sie es dann als eine Funktion unter zehn Körpern, nicht als den ganzen Menschen.',
          'Ist die Zeit unbekannt, können Sie trotzdem das Marszeichen und Planet-zu-Planet-Aspekte zitieren. Mars auf dem Aszendenten oder im zehnten Haus können Sie nicht zitieren. Schreiben Sie die Grenze auf dieselbe Seite wie das Zeichen, damit Sie später keine Häusessprache einschmuggeln.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie finde ich mein Marszeichen?',
        a: 'Berechnen Sie ein Natalchart oder nutzen Sie den Marszeichen-Rechner von SideraChart mit Geburtsdatum, Uhrzeit und Ort. Die Marszeile ist das tropische Zeichen und der Grad.',
      },
      {
        q: 'Brauche ich eine Geburtszeit für mein Marszeichen?',
        a: 'Für das Zeichen meist nicht. Eine Uhrzeit brauchen Sie für das Haus, für eine Grenze und für jede Behauptung, Mars sitze auf einem Winkel.',
      },
      {
        q: 'Was bedeutet nataler Mars rückläufig?',
        a: 'Scheinbare Rückwärtsbewegung entlang der Ekliptik bei der Geburt. Halten Sie es als Bewegungsflagge fest und lesen Sie Zeichen und Aspekte. Es ist kein Urteil über Wut oder Gesundheit.',
      },
      {
        q: 'Warum unterscheidet sich mein Marszeichen von meinem Sonnenzeichen?',
        a: 'Mars kann über seinen Zweijahreszyklus überall auf der Ekliptik relativ zur Sonne stehen. Unterschiedliche Zeichen sind normal. Lesen Sie beide Stellungen.',
      },
    ],
  },
  'why-birth-time-matters': {
    title: 'Warum zählt die Geburtszeit für ein Natalchart?',
    excerpt:
      'Die Geburtszeit setzt Aszendent, Häuser und den Grad des Mondes. Ein Fehler von zwanzig Minuten kann den Aszendenten ändern. Ohne Uhrzeit erhalten Sie Planetenzeichen, keine Häuser.',
    sections: [
      {
        heading: 'Warum zählt die Geburtszeit für ein Natalchart?',
        paragraphs: [
          'Die Geburtszeit zählt, weil in einem bürgerlichen Zeitstempel zwei unterschiedliche Uhren stecken. Die erste Uhr rechnet Ihre Ortszeit in Weltzeit um, damit die Planetenlängen stimmen. Die zweite Uhr setzt mit Breite und Länge die örtliche Sternzeit — welcher Grad der Ekliptik aufging, welcher kulminierte, und wo die Häuserspitzen fallen. Menschen fragen „Warum zählt die Geburtszeit?“, wenn sie einen Geburtstag haben, aber keine Minute. Die kurze Antwort: Planeten überleben meist; der örtliche Rahmen nicht.',
          'SideraChart verwendet die IANA-Zeitzonenregeln, die an jenem Datum galten, einschließlich historischer Sommerzeit, und liest dann tropische Positionen aus astronomy-engine (VSOP87). Eine falsche Zeitzone schadet so sehr wie eine falsche Minute. Eine Geburt, die als 14:00 im falschen Versatz steht, ist ein anderer Himmel und eine andere Weltzeit.',
        ],
      },
      {
        heading: 'Der Aszendent wandert etwa ein Grad alle vier Minuten',
        paragraphs: [
          'Der Aszendent ist ein Horizontgrad. Er wandert rund 1° in vier Minuten, ein neues Zeichen in etwa zwei Stunden. Ein Fehler von zwanzig Minuten sind etwa fünf Grad und kann das Zeichen nahe einer Grenze kippen. Das ist keine mystische Empfindlichkeit. Das ist die Erde, die sich dreht.',
          'Ist Ihr Aszendent falsch, sind Placidus-Häuser mit ihm falsch, weil Haus I am Aszendenten beginnt. Jeder Planet-im-Haus-Satz verschiebt sich dann. Das ist der Hauptgrund, sich um die Uhr zu kümmern, selbst wenn das Sonnenzeichen offensichtlich ist.',
        ],
      },
      {
        heading: 'Häuser hängen von der örtlichen Sternzeit ab',
        paragraphs: [
          'Häuser sind Sektoren des örtlichen Himmels, keine Zeichen. Zeichen sind 30° des tropischen Tierkreises. Häuser sind, was Sie erhalten, wenn Sie den Raum um Horizont und SideraChart teilen. Placidus, der Standard von SideraChart, teilt Aufgangszeit, daher sind die Häuser ungleich. Whole Sign gibt jedem Haus ein volles Zeichen ab dem Zeichen des Aszendenten.',
          'Ohne Geburtszeit gibt es keinen ehrlichen Aszendenten und daher keine ehrlichen Häuser. Unbekannte Zeit = Planeten ja, Häuser nein. SideraChart folgt dieser Regel, statt Sie still auf Mittag zu parken. Mittag ist eine Konvention für manche historische Charts; es ist nicht Ihr Aszendent.',
        ],
      },
      {
        heading: 'Der Grad des Mondes und andere schnelle Fakten',
        paragraphs: [
          'Der Mond wandert etwa einen halben Grad pro Stunde. Über einen Tag sind das mehrere Grade — genug, um Aspekte zu ändern und an einem Tag des Zeichenwechsels das Mondzeichen selbst. Merkur, Venus und die Sonne können ebenfalls auf einer Grenze sitzen. Äußere Planeten bewegen sich an einem Tag kaum; ihre Zeichen sind ohne Uhrzeit sicher.',
          'Aspekte unter Planeten existieren auch ohne Häuser. SideraChart listet Hauptaspekte innerhalb der Orbis 8° / 6° / 4° aus Planetenlängen, selbst wenn der Aszendent entfällt. Was Sie verlieren, ist alles, das einen Winkel braucht: Aszendent, Häuserspitzen, Planeten auf dem Medium Coeli.',
        ],
      },
      {
        heading: 'Urkunden, Erinnerung und gerundete Stunden',
        paragraphs: [
          'Bevorzugen Sie eine Geburtsurkunde oder einen Krankenhausbefund gegenüber einer Geschichte. Angehörige runden. „Gegen sechs“ kann 17:40 bedeuten. Rechnen Sie eine Spanne nach, wenn die Zeit ungefähr ist, und sehen Sie, ob der Aszendent stehen bleibt. Tut er das nicht, haben Sie noch keinen Aszendenten.',
          'Rektifizieren Sie in diesem Rechner keine Zeit, damit sie zu einer Biografie passt. SideraChart erfindet keine Minute, damit das zehnte Haus nach Ihrem Jobtitel aussieht. Ist die Zeit unbekannt, markieren Sie sie als unbekannt. Lesen Sie Planeten in Zeichen und Aspekten. Lassen Sie Häuser für einen Tag, an dem Sie eine Uhr haben.',
          'Krankenhausakten schlagen Taufschätzungen. Eine Zeit, geschrieben als 16 h 30, ist besser als „später Nachmittag“. Nutzt das Dokument eine alte mittlere Ortszeit, sagen Sie das, wenn Sie mit einer anderen Site vergleichen; die IANA-Umrechnung nimmt die bürgerliche Zeitzone jenes Datums an, und das wendet SideraChart an.',
        ],
      },
      {
        heading: 'Was Sie auf SideraChart eintragen',
        paragraphs: [
          'Datum, Uhrzeit, Ort. Der Ort wird zu Koordinaten gesucht; die Zeit wird mit IANA umgerechnet; Planeten kommen aus Ephemeriden der Klasse VSOP87; Häuser stehen standardmäßig auf Placidus. Fehlt die Zeit, nutzen Sie die Option unbekannte Zeit. Sie erhalten trotzdem ein brauchbares Planetenchart. Einen Aszendenten erhalten Sie nicht.',
          'Später speichert das Tagesprotokoll Transite um Mittag in der natalen Zeitzone. Dieser Mittag ist eine stabile Momentaufnahme für Transite, kein Ersatz für eine fehlende Geburtszeit. Ihr nataler Aszendent braucht weiterhin die echte Minute. Mischen Sie diese zwei Mittage nicht.',
          'Geben Ihnen Angehörige zwei Zeiten eine Stunde auseinander, berechnen Sie beide und vergleichen Sie die Aszendenten. Hält das Zeichen, haben Sie einen arbeitsfähigen Aszendenten mit einer Gradspanne. Kippt er, haben Sie noch keinen. Veröffentlichen Sie die Spanne, keine Scheingenauigkeit von 14:00:00.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was passiert, wenn meine Geburtszeit falsch ist?',
        a: 'Planetenzeichen überleben meist. Aszendent, Häuser und Mondgrad vielleicht nicht. Ein Fehler von zwanzig Minuten kann den Aszendenten nahe einer Grenze ändern.',
      },
      {
        q: 'Ist ein Mittags-Geburtshoroskop genau?',
        a: 'Es kann Planetenzeichen an einem ruhigen Tag schätzen. Es ist kein genauer Aszendent und kein genaues Häusersystem. SideraChart behandelt unbekannte Zeit als nur Planeten.',
      },
      {
        q: 'Zählt der Geburtsort so sehr wie die Zeit?',
        a: 'Für Aszendent und Häuser ja: Breite und Länge setzen den Horizont. Für Planetenzeichen zählt der Ort kaum. Zeitzonenfehler zählen für beides.',
      },
      {
        q: 'Kann ich 12:00 nutzen, wenn ich die Zeit nicht kenne?',
        a: 'Als Skizze für Zeichen schon. Lesen Sie daraus keine Häuser und keinen Aszendenten. Markieren Sie die Zeit auf SideraChart als unbekannt, statt Mittag als Tatsache auszugeben.',
      },
    ],
  },
  'birth-chart-without-time': {
    title: 'Kann ich ein Geburtshoroskop ohne Geburtszeit erstellen?',
    excerpt:
      'Ja: Planetenzeichen und Aspekte berechnen sich auch ohne Geburtszeit. Aszendent und Häuser nicht. Behandeln Sie ein Mittags-Chart nicht als volle natale Häuserkarte.',
    sections: [
      {
        heading: 'Kann ich ein Geburtshoroskop ohne Geburtszeit erstellen?',
        paragraphs: [
          'Ja, mit einer klaren Grenze. Ohne Geburtszeit können Sie trotzdem Planetenlängen aus dem Datum berechnen (und einer Zeitzone/einem Ort für die Weltzeit). Das gibt Ihnen Sonne bis Pluto in tropischen Zeichen und die Hauptaspekte unter ihnen. Einen zuverlässigen Aszendenten, ein Medium Coeli oder Häuserspitzen können Sie nicht berechnen. Das ehrliche Natalchart ohne Uhrzeit ist ein Planetenchart, kein volles Häuser-Rad.',
          'SideraChart lässt Sie die Zeit als unbekannt markieren und liefert dann Planeten, während der Aszendent entfällt. Das ist das richtige Produkt. Viele Sites nutzen still 12:00 und zeichnen Häuser trotzdem. Diese Häuser gehören zu jemandem, der um Mittag geboren wurde, und das ist keine Tatsache über Sie.',
        ],
      },
      {
        heading: 'Was Sie trotzdem erhalten: Planetenzeichen',
        paragraphs: [
          'Sonne, Merkur, Venus, Mars und die äußeren Planeten bewegen sich langsam genug, dass ein Kalenderdatum meist das Zeichen festlegt. Aspekte unter diesen Körpern sind ebenfalls brauchbar, mit den Orbis von SideraChart: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil. So können Sie viel von einem Chart lesen: Elementbalance, ein Stellium in einem Zeichen, ein enges Saturn-Quadrat zur Sonne.',
          'Der Ort hilft trotzdem, weil Zeitzone und Sommerzeit das Datum in Weltzeit umrechnen. Eine Geburt nahe Mitternacht kann in UT technisch auf das Nachbardatum fallen. Kennen Sie die Stadt, aber nicht die Minute, tragen Sie den Ort und unbekannte Zeit ein, statt einer falschen Uhr.',
        ],
      },
      {
        heading: 'Was Sie verlieren: Aszendent und Häuser',
        paragraphs: [
          'Der Aszendent ist ein Horizontgrad. Er braucht die Minute. Häuser in Placidus beginnen dort. Whole Sign braucht ebenfalls das Zeichen des Aszendenten. Keine Zeit, keine Häuser — nicht „ungefähre Häuser“. Unbekannte Zeit = Planeten ja, Häuser nein. Verinnerlichen Sie diesen Satz, und Sie vermeiden das häufigste schlechte Natalchart im Internet.',
          'Ohne Häuser können Sie nicht ehrlich sagen, ein Planet stehe im zehnten Haus, oder Sie hätten ein leeres siebtes. Diese Aussagen sind örtlich. Sie können trotzdem sagen, der Planet stehe im Steinbock, oder zwei Planeten stünden in Opposition. Bleiben Sie auf der Ekliptik, bis Sie eine Uhr haben.',
        ],
      },
      {
        heading: 'Der Mond an einem Tag des Zeichenwechsels',
        paragraphs: [
          'Der Mond ist die Ausnahme, die beißt. Er wechselt alle zweieinhalb Tage das Zeichen. Hat er an Ihrem Geburtstag nicht gewechselt, ist das Zeichen meist ohne Uhrzeit sicher. Hat er gewechselt, haben Sie kein Mondzeichen, bis Sie eine Uhr haben. Wählen Sie nicht den Mond, den Sie lieber mögen.',
          'Selbst an einem ruhigen Mondtag ist der Grad über vierundzwanzig Stunden um mehrere Grade unsicher. Aspekte, die nahe der Orbisgrenze sitzen — 8°, 6°, 4° — können je nach Stunde drin oder draußen sein. Behandeln Sie Mondaspekte am Rand des Orbis als vorläufig, wenn die Zeit unbekannt ist.',
        ],
      },
      {
        heading: 'Warum Mittag eine Schätzung ist, kein Chart',
        paragraphs: [
          'Mittag ist beliebt, weil er die Mitte des bürgerlichen Tages ist und weil manche historischen Ephemeriden tägliche Positionen um Mittag listeten. Es ist trotzdem eine bestimmte Zeit. Sie erzeugt einen bestimmten Aszendenten für diese Breite. Sie als Platzhalter für „unbekannt“ zu nutzen, versteckt die Unsicherheit, statt sie zu beschriften.',
          'Wenn Sie skizzieren müssen, berechnen Sie Planeten um Mittag und ignorieren Sie das Häuserrad. Der Pfad unbekannte Zeit von SideraChart macht diese Beschriftung für Sie. Polargeburten haben ein zweites Problem: Placidus-Spitzen brechen oberhalb von etwa 66° Breite zusammen, selbst mit perfekter Zeit. Das ist eine Grenze des Häusersystems, kein Grund, eine Uhr zu fälschen.',
        ],
      },
      {
        heading: 'Wie Sie SideraChart ohne Uhrzeit nutzen',
        paragraphs: [
          'Tragen Sie Datum und Ort ein, markieren Sie die Zeit als unbekannt, lesen Sie die Planetentabelle. Lassen Sie Aszendenten-Werkzeuge weg. Lassen Sie jeden Satz weg, der ein Haus braucht. Sie können trotzdem Planetenzeichen-Rechner für Sonne, Mond (meist), Merkur, Venus und Mars nutzen. Tropischer Tierkreis, VSOP87 über astronomy-engine, nicht Swiss Ephemeris, nicht siderisch.',
          'Aspekte unter den Planeten bleiben fair. Sortieren Sie sie nach Orbis auf dieselbe Weise: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil. Ein enges Sonne–Saturn-Quadrat ohne Häuser ist trotzdem ein enges Sonne–Saturn-Quadrat. Was Sie nicht tun dürfen, ist es an „zehnten Haus Beruf“ zu hängen, bis der Aszendent existiert.',
          'Taucht später eine Zeit auf — eine Urkunde, eine Notiz der Hebamme — rechnen Sie neu und dann, und nur dann, lesen Sie Häuser. Die Mittags-Momentaufnahme des Tagesprotokolls für Transite ist ein anderer Mittag: sie speichert den heutigen Himmel gegen ein gespeichertes Natalchart. Sie füllt keine fehlende Geburtsminute. Halten Sie diese Aufgaben getrennt.',
          'Sie können trotzdem ein nur-planetares Chart speichern. Die geschriebene Schicht wird dünner, weil Häusersätze wegfallen. Das ist vorzuziehen gegenüber einem dicken Bericht auf Mittags-Spitzen. Wenn die Uhr kommt, rechnen Sie einmal neu und ersetzen Sie das gespeicherte Chart, statt zwei widersprüchliche Räder zu stapeln.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kann ich ein Natalchart nur mit einem Geburtsdatum erstellen?',
        a: 'Sie können Planetenzeichen und Aspekte erstellen. Einen zuverlässigen Aszendenten oder Häuser nicht. SideraChart markiert diese Grenze, wenn die Zeit unbekannt ist.',
      },
      {
        q: 'Ist eine Geburtszeit 12:00 in Ordnung, wenn ich die echte Zeit nicht kenne?',
        a: 'Nur als Skizze für langsame Planeten. Lesen Sie den Aszendenten oder Häuser nicht aus Mittag. Bevorzugen Sie die Option unbekannte Zeit.',
      },
      {
        q: 'Stimmt mein Mondzeichen ohne Uhrzeit?',
        a: 'Meist, es sei denn, der Mond hat an Ihrem Geburtstag das Zeichen gewechselt. Grad und Haus stimmen ohne Uhr nicht.',
      },
      {
        q: 'Was sollte ich zuerst lesen, wenn ich keine Geburtszeit habe?',
        a: 'Planetenzeichen, besonders Sonne, Mond falls sicher, Merkur, Venus, Mars, und die engsten Aspekte. Lassen Sie Häuser, bis Sie eine Uhrzeit haben.',
      },
    ],
  },
  'how-to-read-a-natal-chart': {
    title: 'Wie man ein Natalchart liest',
    excerpt:
      'Lesen Sie ein Natalchart in dieser Reihenfolge: Große Drei, besetzte Häuser, dann die engsten Aspekte. Nutzen Sie die Tabellen als Instrument. Unbekannte Zeit heißt: Häuser und Aszendent weglassen.',
    sections: [
      {
        heading: 'Wie man ein Natalchart liest',
        paragraphs: [
          'Ein Natalchart ist leichter, wenn Sie sich weigern, alles auf einmal zu lesen. Beginnen Sie mit der Großen Drei — Sonne, Mond, Aszendent —, dann die Häuser, die tatsächlich Planeten enthalten, dann die engsten Hauptaspekte. Das Rad ist eine Karte. Die Tabellen sind das Instrument. Zuerst Zahlen: Zeichen, Grad, Haus, Orbis. Dann Text. Diese Reihenfolge bewahrt Sie davor, in zwölf Zeichen-Essays zu ertrinken, bevor Sie wissen, welche Zimmer besetzt sind.',
          'Für die volle Methode brauchen Sie Geburtsdatum, Uhrzeit und Ort. Ist die Zeit unbekannt, lassen Sie Aszendent und Häuser weg und lesen Sie Planeten in Zeichen plus Aspekte. SideraChart folgt dieser Trennung. Lesen Sie sich nicht um eine fehlende Uhr herum, indem Sie Mittag als Daten ausgeben. Schreiben Sie die Lücke auf die Seite.',
        ],
      },
      {
        heading: 'Beginnen Sie mit Sonne, Mond und Aszendent',
        paragraphs: [
          'Die Sonne ist die Tageshandlung, aus dem Datum. Der Mond ist das schnellere innere Wetter; prüfen Sie, ob er an diesem Tag das Zeichen gewechselt hat. Der Aszendent ist der östliche Horizont und existiert nur mit einer Uhrzeit. Lesen Sie, ob die drei reimen oder streiten. Dann schauen Sie auf Aspekte unter ihnen mit Orbis 8° / 6° / 4°.',
          'Haben Sie nur die Sonne, wissen Sie noch nicht, wie man das Chart liest; Sie kennen eine Koordinate. Das Rad von SideraChart setzt diese drei Glyphen dorthin, wo Sie sie sehen, bevor Sie nach Asteroiden oder hypothetischen Punkten jagen, die diese Site nicht nutzt.',
        ],
      },
      {
        heading: 'Dann lesen Sie besetzte Häuser',
        paragraphs: [
          'Häuser sind örtliche Bereiche. Ein Planet im zehnten ist nicht dasselbe wie derselbe Planet im vierten, selbst im selben Zeichen. Listen Sie die Häuser, die Körper enthalten. Das sind die lauten Zimmer. Leere Häuser sind keine Defekte; sie sind Zimmer ohne einen Planeten darin. Dafür gibt es einen eigenen Artikel.',
          'SideraChart steht standardmäßig auf Placidus, weil die meisten westlichen Texte das voraussetzen. Whole Sign ist das andere Raster. Polarbreiten über etwa 66° sollten keine gebrochenen Placidus-Spitzen erzwingen. Ist die Zeit unbekannt, überspringen Sie diesen ganzen Schritt. Planet-im-Haus-Sprache ohne Aszendenten ist Fiktion.',
        ],
      },
      {
        heading: 'Dann lesen Sie die engsten Aspekte',
        paragraphs: [
          'Aspekte sind benannte Winkel: Konjunktion, Sextil, Quadrat, Trigon, Opposition. Sortieren Sie nach Orbis, engste zuerst. Eine Sonne–Saturn-Konjunktion von 0,4° rangiert vor einem Mars-Trigon von 7,8°. SideraChart zeichnet die fünf Hauptaspekte und listet applicierend oder separierend in der Tabelle. Blenden Sie die Linien im Rad aus, wenn die Zeichnung laut ist; die Tabelle bleibt.',
          'Moralisieren Sie Aspekte nicht. Quadrate sind Reibung, die ein Können baut, wenn Sie dabei bleiben; sie sind keine Flüche. Trigone sind Leichtigkeit, die faul werden kann. Konjunktionen verschmelzen Funktionen. Oppositionen polarisieren. Behalten Sie die Geometrie. Lassen Sie „das Universum will“ weg.',
        ],
      },
      {
        heading: 'Rad gegen Tabellen gegen geschriebene Schicht',
        paragraphs: [
          'Der äußere Ring sind Zeichen. Die inneren Teilungen sind Häuser. Glyphen sitzen auf Längen. Farbige Linien sind Aspekte. Öffnen Sie eine Tabellenzeile für genaues Zeichen, Haus und Grad. Die geschriebenen Karten unter einem gespeicherten Chart sind eine gecachte Deutungsschicht, kein lebendes Sprachmodell, das neue Physik erfindet.',
          'Ein PNG-Export ist eine Momentaufnahme zum Teilen. Die lebenden Tabellen sind das, was Sie wiederlesen. Widerspricht eine andere Site, gleichen Sie tropischen Tierkreis, Placidus und dieselbe Geburtszeitzone ab, bevor Sie Ephemeriden beschuldigen. SideraChart nutzt astronomy-engine (VSOP87), nicht Swiss Ephemeris. Unterschiede von ein paar Bogenminuten sind erwartet; ein ganzes Zeichen bedeutet meist eine siderische Einstellung oder eine falsche Uhr.',
        ],
      },
      {
        heading: 'Eine Arbeitsreihenfolge auf SideraChart',
        paragraphs: [
          'Berechnen Sie das Chart. Bestätigen Sie Datum, Uhrzeit, Ort, tropisch, Placidus. Lesen Sie Sonne, Mond, Aszendent. Scannen Sie besetzte Häuser. Sortieren Sie Aspekte nach Orbis. Erst dann öffnen Sie zeichenweisen Text. Speichern Sie das Chart, wenn Sie den Bericht und das Tagesprotokoll möchten. Transite im Tagesprotokoll werden um Mittag nataler Zeit gespeichert; sie sind ein späterer Schritt, nicht Schritt eins beim Lesen des Natals.',
          'Halten Sie zuerst nur drei Fakten fest: die Große Drei, das am stärksten besetzte Haus, den engsten Aspekt. Das ist eine Natalchart-Lesung, die Sie tatsächlich zu Ende bringen. Erweitern Sie auf Herrscher leerer Häuser und langsame Transite, nachdem diese drei Fakten stabil sind.',
          'Halten Sie inne vor medizinischen, rechtlichen oder finanziellen Schlüssen. Die Methode ist: Koordinaten, dann Struktur, dann vorsichtige Sprache. Überspringen Sie die Koordinaten, lesen Sie eine Horoskopspalte, kein Natalchart.',
          'Lesen Sie dasselbe Chart eine Woche später in derselben Reihenfolge. Das Rad ändert sich nicht; Ihr Blick schon. Taucht ein neues Detail auf, prüfen Sie es gegen die Tabelle. Existiert es in den Zahlen nicht, ist es nicht im Natalchart, so attraktiv der Satz auch ist.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was sollte ich zuerst in einem Natalchart ansehen?',
        a: 'Sonne, Mond und Aszendent, dann besetzte Häuser, dann die engsten Aspekte. Lassen Sie leere Häuser und Nebenpunkte für später.',
      },
      {
        q: 'Wie lese ich ein Natalchart ohne Geburtszeit?',
        a: 'Lesen Sie nur Planetenzeichen und Aspekte. Lassen Sie den Aszendenten und alle Häuseraussagen weg. SideraChart lässt den Aszendenten weg, wenn die Zeit unbekannt ist.',
      },
      {
        q: 'Lese ich zuerst Zeichen oder Häuser?',
        a: 'Zeichen sagen Ihnen den Stil; Häuser den Bereich. Nach der Großen Drei listen Sie besetzte Häuser, dann kombinieren Sie: „Mars im Widder im zehnten“ ist beides.',
      },
      {
        q: 'Welche Orbis sollte ich beim Lesen von Aspekten nutzen?',
        a: 'SideraChart nutzt 8° für Konjunktion und Opposition, 6° für Quadrat und Trigon, 4° für Sextil. Engere Orbis zuerst.',
      },
    ],
  },
  'houses-in-a-birth-chart': {
    title: 'Was sind Häuser in einem Geburtshoroskop?',
    excerpt:
      'Häuser sind zwölf örtliche Sektoren des Geburtshimmels, keine Tierkreiszeichen. Sie brauchen eine Geburtszeit. SideraChart steht standardmäßig auf Placidus; unbekannte Zeit bedeutet keine ehrlichen Häuser.',
    sections: [
      {
        heading: 'Was sind Häuser in einem Geburtshoroskop?',
        paragraphs: [
          'Häuser sind zwölf Sektoren des Himmels, gesehen vom Geburtsort im Geburtsaugenblick. Sie sind keine Zeichen. Zeichen sind 30°-Stücke des tropischen Tierkreises entlang der Ekliptik. Häuser sind ein örtlicher Rahmen: welcher Teil dieses Himmels aufging, kulminierte, unterging. Das Zeichen eines Planeten ist sein Stil. Das Haus eines Planeten ist der Lebensbereich, in dem dieser Stil leicht zu erkennen ist.',
          'Ohne Geburtszeit können Sie keine Häuser haben, weil der Rahmen an den Horizont gebunden ist. Unbekannte Zeit = Planeten ja, Häuser nein. Menschen, die Häuserlesungen aus einem Mittags-Platzhalter veröffentlichen, beschreiben Mittag, nicht eine unbekannte Minute. SideraChart tut das standardmäßig nicht.',
        ],
      },
      {
        heading: 'Häuser sind örtlich; Zeichen sind zodiakal',
        paragraphs: [
          'Zwei Menschen können eine Sonne im Steinbock teilen und nicht dasselbe zehnte Haus. Das Haus der Sonne hängt vom Aszendenten ab, und der hängt von Zeit und Ort ab. Deshalb wirkt Häuser-Sprache „biografischer“ als Zeichen-Sprache, und deshalb ist sie zerbrechlicher. Ist die Uhr falsch, hängt die Biografie, die Sie gerade geschrieben haben, an den falschen Zimmern.',
          'Lesen Sie sie zusammen, wenn Sie beides haben: „Venus im Stier im zweiten“ ist ein anderer Satz als „Venus im Stier im achten.“ Dasselbe Zeichen, anderer Bereich. Haben Sie nur das Zeichen, bleiben Sie beim Zeichen.',
        ],
      },
      {
        heading: 'Placidus ist der Standard auf SideraChart',
        paragraphs: [
          'Placidus teilt Aufgangszeit statt gleicher Raumstücke, daher sind die Häuser ungleich. SideraChart steht standardmäßig darauf, weil die meisten veröffentlichten westlichen Deutungen Placidus voraussetzen. Whole Sign ist verfügbar: Haus I ist das ganze Zeichen, das den Aszendenten enthält, dann die nächsten Zeichen der Reihe nach. Keines der Systeme ist vedische siderische Praxis; beide sitzen hier auf tropischen Längen aus astronomy-engine (VSOP87).',
          'Oberhalb von etwa 66° Breite können Placidus-Spitzen versagen. Für diese Geburten ist Whole Sign das ehrlichere Raster. Planetenpositionen werden in beiden Fällen berechnet. Widerspricht eine Site Ihren Häusern, prüfen Sie das Häusersystem vor der Ephemeride. Swiss Ephemeris ist in diesem Stack nicht enthalten; eine Systemabweichung ist der übliche Schuldige.',
        ],
      },
      {
        heading: 'Angular, succedent und kadent',
        paragraphs: [
          'Häuser 1, 4, 7 und 10 sind angular — an Horizont und SideraChart gebunden, historisch die lautesten. 2, 5, 8 und 11 sind succedent. 3, 6, 9 und 12 sind kadent. Das ist ein Lautstärkehinweis, keine moralische Rangfolge. Ein Haufen Planeten im zwölften ist laut, selbst wenn Lehrbücher das zwölfte kadent nennen.',
          'Traditionelle Häuserthemen (Selbst, Geld, Geschwister, Zuhause und so weiter) sind ein Vokabular, kein Vertrag. Nutzen Sie sie als Etiketten für Bereiche, dann schauen Sie, welche Planeten sie tatsächlich besetzen. Erfinden Sie keine Ereignisse, um ein Haus zu füllen, das zufällig leer ist.',
        ],
      },
      {
        heading: 'Spitzen, Einschlüsse und hohe Breiten',
        paragraphs: [
          'In Placidus ist eine Häuserspitze der Grenzgrad. Ein Planet nahe einer Spitze ist eine Ermessensfrage; diese Site verschiebt ihn nicht heimlich ins nächste Haus für Sie. Eingeschlossene Zeichen — ein Zeichen, das in einem Haus ohne Spitze verschluckt ist — entstehen in höheren Breiten, wenn Häuser sich dehnen. Whole Sign vermeidet diese Geometrie, indem es Häuser an Zeichen bindet.',
          'Ist Ihre Geburt polar, foltern Sie Placidus nicht. Wechseln Sie das System. Ist Ihre Geburtszeit gerundet, rechnen Sie eine Spanne nach und sehen Sie, ob Planeten die Häuser wechseln. Tun sie das, sind diese Häuseraussagen vorläufig.',
          'OpenStreetMap Nominatim liefert die Koordinaten, die SideraChart für den Ort nutzt. Eine Stecknadel in der Stadtmitte ist keine Krankenhausnadel; für Häuser ist der Unterschied meist klein, aber in hoher Breite oder nahe einer Spitze kann er zählen. Bevorzugen Sie den tatsächlichen Geburtsort gegenüber einem späteren Wohnort.',
        ],
      },
      {
        heading: 'Wie Sie Häuser auf dem Rad lesen',
        paragraphs: [
          'Auf SideraChart sind die inneren Teilungen Häuser, gezählt vom Aszendenten links. Glyphen sitzen auf ekliptikaler Länge; die Tabelle sagt Ihnen, in welche Hausnummer diese Länge fiel. Aspekte bleiben auf der Ekliptik (Orbis 8° / 6° / 4°) und kümmern sich nicht um Häuserwände. Häuserwände kümmern sich um die Uhr.',
          'Speichern Sie das Chart, um das Häusersystem mit dem Bericht zu behalten. Tägliche Transite im Tagesprotokoll werden um Mittag nataler Zeit gegen diesen natalen Rahmen gerechnet. Transitierende Planeten durch Häuser ergeben nur Sinn, wenn die natalen Häuser überhaupt real waren — was wiederum heißt, Sie hatten eine Geburtszeit.',
          'Wechseln Sie nach dem Speichern von Placidus zu Whole Sign, rechnen Sie neu, statt Glyphen gedanklich zu ziehen. Der Planet hat sich nicht bewegt; die Wände schon. Notieren Sie das System auf jedem Screenshot, den Sie teilen, damit ein späterer Vergleich keine Scheinabweichung ist.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen Zeichen und Häusern?',
        a: 'Zeichen sind 30° des tropischen Tierkreises. Häuser sind zwölf örtliche Sektoren von Ihrem Geburtshorizont. Zeichen brauchen ein Datum; Häuser brauchen Uhrzeit und Ort.',
      },
      {
        q: 'Welches Häusersystem sollte ich nutzen?',
        a: 'Placidus ist der Standard von SideraChart und passt zu den meisten westlichen Texten. Nutzen Sie Whole Sign in hohen Breiten oder wenn Sie ein Zeichen pro Haus wollen.',
      },
      {
        q: 'Kann ich Häuser ohne Geburtszeit lesen?',
        a: 'Nein. Ohne Aszendenten ist der Häuserrahmen nicht definiert. Sie können trotzdem Planetenzeichen und Aspekte lesen.',
      },
      {
        q: 'Warum unterscheiden sich meine Häuser auf einer anderen Website?',
        a: 'Anderes Häusersystem, andere Zeitzone oder siderischer Tierkreis. Stellen Sie die andere Site auf tropisch Placidus und dieselben Koordinaten, bevor Sie vergleichen.',
      },
    ],
  },
  'empty-houses': {
    title: 'Was sind leere Häuser in einem Geburtshoroskop?',
    excerpt:
      'Ein leeres Haus hat keinen Planeten darin. Es ist kein fehlender Lebensbereich. Sie brauchen trotzdem eine Geburtszeit, um zu wissen, welche Häuser leer sind; Mittags-Charts fälschen die Lücken.',
    sections: [
      {
        heading: 'Was sind leere Häuser in einem Geburtshoroskop?',
        paragraphs: [
          'Ein leeres Haus ist ein Haus ohne natalen Planeten darin. Das ist die ganze Definition. Es ist kein Loch in Ihrem Leben, kein fehlendes Organ und keine Vorhersage, dass in diesem Bereich nichts passiert. Zehn Körper (Sonne bis Pluto plus der Mond) können nicht zwölf Zimmer auf einmal besetzen. Die meisten Charts haben leere Häuser. Hätte Ihres keine, hätten Sie ein sehr gedrängtes Rad.',
          'Sie wissen nur, welche Häuser leer sind, wenn Sie den Häuserrahmen kennen, und das heißt, Sie kennen die Geburtszeit. Unbekannte Zeit = Planeten ja, Häuser nein — einschließlich Rede über leere Häuser. Ein Mittags-Chart kann „leere“ Häuser zeigen, die um 04:00 voll oder leer wären. Deuten Sie keine gefälschten Lücken.',
        ],
      },
      {
        heading: 'Leer heißt nicht inaktiv',
        paragraphs: [
          'Das Leben geht in Themen weiter, die keinen Planeten auf der Spitze haben. Traditionelle Lesung schaut trotzdem auf das Zeichen auf der Häuserspitze und auf den Planeten, der dieses Zeichen beherrscht. Das ist eine längere Methode. Die kurze Methode auf dieser Site ist: besetzte Häuser sind lauter, weil ein Planet dort sitzt; leere Häuser sind leiser auf dem Rad, nicht abwesend aus der Biografie.',
          'Füllen Sie ein leeres Haus nicht mit Angst. Menschen suchen „Was sind leere Häuser in einem Geburtshoroskop?“, weil Texte im Netz sie als Defekte behandeln. Sie sind ein Gedrängeproblem in den anderen Zimmern, kein Fluch auf die leeren.',
        ],
      },
      {
        heading: 'Herrschaft zählt trotzdem',
        paragraphs: [
          'Ist das siebte Haus leer, steht seine Spitze aber in der Waage, hat Venus als traditionelle Herrscherin trotzdem ein Wort. Sie finden Venus irgendwo anders im Chart — vielleicht im zweiten, vielleicht in Konjunktion mit Saturn. Diese Stellung ist, wie das leere Haus „spricht“, ohne Bewohner. Das ist Struktur, kein Mystizismus.',
          'Die Tabellen von SideraChart listen Planeten in Häusern. Sie verstecken leere Häuser nicht; sie haben dort einfach keine Glyphe. Schauen Sie auf das Spitzenzeichen im Rad, wenn Sie den Herrscher wollen. Aspekte (Orbis 8° / 6° / 4°) können einen Planeten auch an Themen binden, die mit einem Haus verbunden sind, das er nicht besetzt, weil Aspekte ekliptikale Winkel sind, keine Zimmerzuweisungen.',
        ],
      },
      {
        heading: 'Stellien und volle Häuser',
        paragraphs: [
          'Das Gegenstück leerer Häuser ist ein Stellium: mehrere Planeten in einem Zeichen oder einem Haus. Dieses Zimmer bekommt die Lautstärke. Nachbarhäuser können leer sein, weil die Körper sich gebündelt haben. Lesen Sie das Bündel zuerst. Dann notieren Sie die leeren Zimmer, ohne Nachrufe für sie zu schreiben.',
          'Das Häusersystem ändert, welche Zimmer leer wirken. Placidus (Standard) und Whole Sign können einen Planeten über eine Grenze schieben, besonders in hoher Breite oder bei einem Planeten nahe einer Spitze. Erscheint ein „leeres siebtes“ in einem System und nicht im anderen, schauen Sie eine Grenze an, kein Schicksal.',
        ],
      },
      {
        heading: 'Unbekannte Zeit und gefälschte leere Häuser',
        paragraphs: [
          'Ohne Geburtszeit ist jede Aussage über leere Häuser ungültig, weil die Wände ungültig sind. Nutzen Sie kein 12:00-Chart, um zu verkünden, Ihr viertes Haus sei leer. Markieren Sie die Zeit auf SideraChart als unbekannt und lassen Sie Häuser weg. Sie können trotzdem über leere Zeichen sprechen — kein Planet im Skorpion zum Beispiel —, weil Zeichen den Horizont nicht brauchen.',
          'Ist die Zeit ungefähr, rechnen Sie eine Spanne nach. Planeten, die Häuser wechseln, erzeugen und zerstören „Leere“ in zwanzig Minuten. Behandeln Sie diese Häuser als ungeklärt. Die Bewegung des Aszendenten von vier Minuten pro Grad ist dieselbe Uhr, die Listen leerer Häuser zerbrechlich macht.',
          'Whole Sign kann andere Zimmer leeren und füllen als Placidus mit denselben Planeten. Wechseln Sie Systeme, um ein leeres Haus zu „reparieren“, das Ihnen nicht gefällt, bearbeiten Sie das Raster, nicht den Himmel. Wählen Sie ein System und lesen Sie das Gedränge, das Sie tatsächlich haben.',
        ],
      },
      {
        heading: 'Wie Sie sie auf SideraChart lesen',
        paragraphs: [
          'Berechnen Sie mit Datum, Uhrzeit und Ort, tropisch, Placidus, sofern Sie keinen Grund zum Wechseln haben. Listen Sie besetzte Häuser. Der Rest ist leer. Lesen Sie zuerst das Besetzte. Nutzen Sie Spitzenherrscher, wenn Sie einen zweiten Durchgang brauchen. Rangieren Sie Lebensbereiche nicht nach Leere.',
          'Transite durch ein leeres natales Haus sind trotzdem Transite durch diesen Sektor des natalen Rahmens. Das Tagesprotokoll speichert sie um Mittag in der natalen Zeitzone. Ein Transit „füllt“ ein natal leeres Haus nicht dauerhaft. Es ist Wetter in diesem Zimmer für eine Weile. Das natale Haus bleibt leer von natalen Planeten.',
          'Kommen Sie von einem Meme, das Ihre leeren Häuser als Lebensversagen nummeriert hat, werfen Sie es weg. Zählen Sie besetzte Häuser, nennen Sie das Stellium, falls es eines gibt, und hören Sie auf. Leere ist eine Zeichnungsfakt. Sie ist keine Prognose, keine Diagnose und kein Grund, eine Geburtszeit zu raten, damit das siebte Haus bewohnt wirkt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Sind leere Häuser in einem Geburtshoroskop schlecht?',
        a: 'Nein. Sie bedeuten, dass kein nataler Planet in diesem Haus sitzt. Die meisten Charts haben mehrere. Sie sind keine fehlenden Teile eines Lebens.',
      },
      {
        q: 'Wie viele leere Häuser sind normal?',
        a: 'Mit zehn Körpern und zwölf Häusern sind mehrere leere Häuser typisch. Ein Stellium in einem Haus garantiert fast Leere anderswo.',
      },
      {
        q: 'Kann ich meine leeren Häuser ohne Geburtszeit wissen?',
        a: 'Nein. Häuser brauchen den Aszendenten. Ohne Uhrzeit können Sie leere Zeichen notieren, nicht leere Häuser.',
      },
      {
        q: 'Bedeutet ein leeres siebtes Haus, dass ich keine Beziehungen haben werde?',
        a: 'Nein. Das ist die Defektgeschichte. Lesen Sie den Herrscher des siebten und den Rest des Charts. Behandeln Sie Leere nicht als Prognose.',
      },
    ],
  },
  'aspects-in-astrology': {
    title: 'Was sind Aspekte in der Astrologie?',
    excerpt:
      'Aspekte sind benannte Winkel zwischen Planeten entlang der Ekliptik: Konjunktion, Sextil, Quadrat, Trigon, Opposition. SideraChart nutzt Orbis 8°, 6° und 4° für diese fünf.',
    sections: [
      {
        heading: 'Was sind Aspekte in der Astrologie?',
        paragraphs: [
          'Aspekte sind Winkelabstände entlang der Ekliptik zwischen zwei natalen Längen. Sie sind Geometrie, keine Schicksalslinien. Stehen zwei Planeten 90° auseinander, ist das ein Quadrat. Stehen sie 120° auseinander, ist das ein Trigon. Das Natalchart listet die, die innerhalb eines erlaubten Orbis liegen. Menschen suchen „Was sind Aspekte in der Astrologie?“, weil die farbigen Linien im Rad wie eine Geheimsprache aussehen. Sie sind ein Winkelmesser.',
          'SideraChart zeichnet fünf Hauptaspekte: Konjunktion (0°), Sextil (60°), Quadrat (90°), Trigon (120°), Opposition (180°). Orbis sind 8° für Konjunktion und Opposition, 6° für Quadrat und Trigon, 4° für Sextil. Engere Orbis sind lauter. Die Tabelle unter dem Rad ist dieselbe Liste wie die Linien, mit applicierender oder separierender Bewegung.',
        ],
      },
      {
        heading: 'Die fünf Hauptaspekte',
        paragraphs: [
          'Eine Konjunktion verschmilzt zwei Funktionen im selben Fleck des Tierkreises. Ein Sextil ist 60° — eine Tür, durch die Sie trotzdem gehen müssen. Ein Quadrat ist 90° — Reibung, die Können erzeugt, wenn Sie dabei bleiben, oder Lärm, wenn Sie es nicht tun. Ein Trigon ist 120° — Leichtigkeit, die ungenutzt bleiben kann. Eine Opposition ist 180° — zwei Pole, oft auf eine andere Person oder einen Zeitplan projiziert, der in beide Richtungen zieht.',
          'Halten Sie die Verben konkret. Werten Sie ein Quadrat nicht zu einem Fluch auf oder ein Trigon zu einem Segen von anderswo. Sie lesen, wie zwei Chartfunktionen Arbeit teilen. Der Rest des Charts — Zeichen, Häuser, die Große Drei — sagt Ihnen, in welchen Bereichen diese Arbeit landet.',
        ],
      },
      {
        heading: 'Orbis: 8°, 6° und 4°',
        paragraphs: [
          'Ein Orbis ist, wie weit vom exakten Kontakt entfernt der Kontakt noch zählen darf. Der Satz von SideraChart ist 8° / 6° / 4° wie oben. Eine Sonne–Mond-Konjunktion bei 7,2° zählt; ein Merkur-Sextil bei 4,5° nicht. Andere Software nutzt andere Orbis, deshalb weichen Aspektlisten ab, selbst wenn die Längen übereinstimmen.',
          'Sortieren Sie nach Enge. Ein Aspekt von 0,3° rangiert vor einem Aspekt derselben Art von 7,9°. Wenn Sie lernen, ignorieren Sie alles am Rand, bis die engen klar sind. Exaktheit ist keine moralische Reinheit; sie ist Lautstärke am Instrument.',
        ],
      },
      {
        heading: 'Applicierend, separierend und Geburtszeit',
        paragraphs: [
          'Applicierend bedeutet, der Aspekt wurde bei der Geburt enger; separierend bedeutet, er hatte den Höhepunkt schon hinter sich und wurde weiter. SideraChart kennzeichnet das in der natalen Tabelle. Es ist eine Zeitnuance im Geburtsaugenblick, keine Prognose. Sie brauchen trotzdem anständige Längen, und das heißt eine anständige Weltzeit.',
          'Ohne Geburtszeit existieren Planet-zu-Planet-Aspekte trotzdem. Aspekte zum Aszendenten nicht, weil es keinen Aszendenten gibt. Die Mondaspekte nahe einer Orbisgrenze können über einen Tag kippen. Unbekannte Zeit: Planeten ja, Häuser nein; Mondaspekte nahe 8°/6°/4° vielleicht. Streiten Sie nicht mit einem Mittags-Chart um ein Mond-Quadrat von 5,9°.',
        ],
      },
      {
        heading: 'Was Aspekte nicht sind',
        paragraphs: [
          'Sie sind nicht von selbst Synastrie — Synastrie sind Aspekte zwischen zwei Charts. Sie sind keine Transite — Transite sind heutige Planeten zu natalen Planeten. Sie sind kein medizinischer, rechtlicher oder finanzieller Rat. Ein Mars-Quadrat Saturn schreibt kein Training und keine Klage vor. Es beschreibt Reibung zwischen initiierender Hitze und Struktur.',
          'Nebenaspekte (Quinkunx, Halbquadrat und der Rest) werden hier nicht gezeichnet. Zeigt eine andere Site mehr Linien, nutzt sie einen weiteren Katalog, nicht einen genaueren Himmel. SideraChart bleibt bei den fünf Hauptaspekten auf tropischen Längen aus astronomy-engine (VSOP87), nicht Swiss Ephemeris.',
          'Stellien erzeugen Stapel von Konjunktionen. Lesen Sie zuerst das engste Paar, statt den ganzen Haufen zu einer Stimmung zu erklären. Ein leeres Haus streicht keinen Aspekt, der zufällig einen Planeten in einem anderen Haus betrifft; Aspekte ignorieren Wände. Häuser brauchen die Geburtszeit; Aspekte zwischen Planeten nicht.',
        ],
      },
      {
        heading: 'Wie SideraChart Aspekte zeigt',
        paragraphs: [
          'Farbige Linien im Rad; eine sortierbare Tabelle darunter. Blenden Sie die Linien aus, wenn die Zeichnung voll ist. Synastrie nutzt dieselben Orbis zwischen den Planeten zweier Menschen. Kompositcharts haben ihre eigenen Mittelpunkte und dann ihre eigenen inneren Aspekte. Tägliche Transite im Tagesprotokoll werden um Mittag nataler Zeit gespeichert und nutzen dieselben Aspektnamen gegen die natale Basislinie.',
          'Wenn Sie mit astro-seek oder Ähnlichem vergleichen, stellen Sie tropisch, dieselbe Zeitzone und vergleichbare Orbis ein. Ein fehlender Aspekt ist oft ein Orbis oder eine siderische Einstellung. Placidus gegen Whole Sign ändert ekliptikale Aspekte zwischen Planeten nicht; es ändert häuserbasierte Sätze, die Sie versehentlich untermischen könnten.',
          'Lesen Sie applicierend gegen separierend als Notiz zum Geburtsaugenblick und gehen Sie weiter. Es sagt Ihnen nicht, wann Jahre später ein Ereignis eintritt. Transite verwenden dieselben Aspektnamen gegen einen bewegten Himmel, gespeichert um Mittag nataler Zeit im Tagesprotokoll. Das ist eine andere Uhr als die natale Applicierend-Flagge.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was sind die Hauptaspekte in der Astrologie?',
        a: 'Konjunktion, Sextil, Quadrat, Trigon und Opposition. Das sind die fünf, die SideraChart zeichnet. Orbis sind 8°, 6° und 4°, je nach Aspekt.',
      },
      {
        q: 'Was bedeutet Orbis in der Astrologie?',
        a: 'Um wie viele Grade ein Aspekt vom Exakten entfernt sein darf und trotzdem zählt. Engere Orbis sind am Instrument stärker. Der Satz von SideraChart ist 8° / 6° / 4°.',
      },
      {
        q: 'Sind Quadrataspekte schlecht?',
        a: 'Sie sind Reibung, kein Fluch. Lesen Sie sie als Arbeit zwischen zwei Funktionen. Behandeln Sie sie nicht als medizinische oder moralische Urteile.',
      },
      {
        q: 'Brauche ich eine Geburtszeit, um Aspekte zu sehen?',
        a: 'Nicht für Planet-zu-Planet-Aspekte. Eine Uhrzeit brauchen Sie für Aspekte zum Aszendenten und für Mondaspekte, die nahe einer Orbisgrenze sitzen.',
      },
    ],
  },
  'tropical-vs-sidereal': {
    title: 'Tropischer und siderischer Tierkreis',
    excerpt:
      'Der tropische Tierkreis beginnt beim März-Äquinoktium. Der siderische nutzt einen Stern-Nullpunkt, heute etwa 24° entfernt. SideraChart ist nur tropisch — nicht vedisch, nicht Swiss Ephemeris.',
    sections: [
      {
        heading: 'Tropischer und siderischer Tierkreis',
        paragraphs: [
          'Tropisch gegen siderisch ist ein Streit um den Nullpunkt. Beide Tierkreise teilen die Ekliptik in zwölf 30°-Zeichen mit denselben Namen. Sie beginnen nicht am selben Ort. Tropisch 0° Widder ist das März-Äquinoktium — der Durchgang der Sonne durch den Himmelsäquator. Siderisch 0° Widder ist an eine Sternreferenz gebunden (eine Ayanamsha). Weil die Erdachse präzediert, sind diese zwei Nullen heute um rund 24° auseinandergedriftet.',
          'Diese Lücke ist der Grund, warum Ihr Sonnenzeichen in einer vedischen App oft das vorherige Zeichen ist, verglichen mit SideraChart. Keiner der Rechner liegt „falsch über den Himmel“. Sie nutzen unterschiedliche Ursprünge für denselben benannten Gürtel. SideraChart ist tropisch: westliche Konvention, äquinoktiumbasiert, astronomy-engine (VSOP87). Es berechnet keine siderischen, vedischen oder chinesischen Systeme.',
        ],
      },
      {
        heading: 'Was der tropische Tierkreis misst',
        paragraphs: [
          'Tropische Zeichen sind Jahreszeiten der Erdumlaufbahn, keine Fotografien von Sternbildern. Die Sternbilder sind ungleich und präzedieren. Tropischer Widder beginnt, wenn Tag und Nacht im März übereinstimmen (im nordhemisphärischen Kalendersinn des Äquinoktiums), unabhängig davon, welches Sternfeld jetzt hinter diesem Punkt sitzt. Westliche Natalastrologie — einschließlich dieser Site — liest diese saisonalen Zeichen.',
          'Ihre natalen Planeten auf SideraChart sind scheinbare tropische Längen des Datums. Häuser (Placidus-Standard) sitzen auf dieser tropischen Ekliptik. Geburtsdatum, Uhrzeit und Ort zählen weiterhin auf die übliche Weise: Zeit für den Aszendenten, unbekannte Zeit = Planeten ja, Häuser nein. Den Tierkreis zu wechseln ist ein anderer Schalter als das Häusersystem zu wechseln.',
        ],
      },
      {
        heading: 'Was der siderische Tierkreis misst',
        paragraphs: [
          'Siderische Praxis zielt darauf, Zeichen an einem stellaren Rahmen auszurichten. Unterschiedliche Ayanamshas (Lahiri und andere) wählen leicht unterschiedliche Versätze. Indische Natalastrologie ist typischerweise siderisch und nutzt oft Whole Sign oder andere Häusermethoden, die nicht die Standards dieser Site sind. Wollen Sie jenes Chart, brauchen Sie jene Engine. SideraChart wird nicht so tun, als wäre es das.',
          'Chinesische Natalsysteme sind noch einmal ein anderer Stack — nicht tropisch, nicht dasselbe Zwölf-Zeichen-Rad. Kleben Sie kein chinesisches Jahres-Tier auf eine tropische Sonne und nennen Sie das dieselbe Koordinate. Sind Sie von einer gemischten Suche hierher gekommen, wählen Sie ein System und bleiben Sie dort, während Sie lernen.',
        ],
      },
      {
        heading: 'Die Lücke von rund 24° und Ayanamsha',
        paragraphs: [
          'Vierundzwanzig Grad sind etwa vier Fünftel eines Zeichens. Viele Stellungen fallen daher beim Wechsel zu siderisch in das vorhergehende tropisch benannte Zeichen. Eine tropische Zwillinge-Sonne wird oft eine siderische Stier-Sonne. Monde nahe einer Grenze kippen öfter, weil der Mond schnell ist. Aszendenten kippen ebenfalls, weil der Aszendent ein Grad ist.',
          'Vergleichen Sie zwei tropische Sites und sie weichen schon um ein Zeichen ab, schauen Sie zuerst auf Geburtszeit und Zeitzone, nicht auf Ayanamsha. Siderisch ist die Erklärung, wenn eine Site ausdrücklich vedisch oder „siderisch“ ist und die andere westlich tropisch. SideraChart wird nicht mit einem Lahiri-Ausdruck übereinstimmen. Das ist erwartet.',
        ],
      },
      {
        heading: 'Warum SideraChart nur tropisch ist',
        paragraphs: [
          'Das Produkt ist ein westlicher Natalchart-Rechner: tropischer Tierkreis, Placidus-Standard, Whole Sign optional, Hauptaspekte bei 8° / 6° / 4°, Positionen der Klasse VSOP87 über astronomy-engine, IANA-Zeitzonen. Es ist nicht Swiss Ephemeris. Es ist kein siderischer Schalter. Ein Nullpunkt vermeidet einen stillen 24°-Fehler, wenn Sie glauben, Sie schauten „dasselbe Chart“ an.',
          'Nutzen Sie tropisch, wenn Sie westliche Texte, die meisten englischsprachigen Natal-Kochbücher und die geschriebene Schicht dieser Site lesen wollen. Nutzen Sie eine siderische Spezialistin, wenn das Ihre Tradition ist. Mitteln Sie die zwei Sonnen nicht. Behandeln Sie die Abweichung nicht als Persönlichkeitskrise. Es ist ein Zusammenstoß von Koordinatensystemen.',
        ],
      },
      {
        heading: 'Abgleich mit anderen Websites',
        paragraphs: [
          'Auf astro-seek, astro.com und Ähnlichem stellen Sie tropisch + Placidus ein (oder Whole Sign, wenn Sie das genutzt haben) und dieselbe Geburtszeit. Sie sollten innerhalb eines Bruchteils eines Grads bei den Planeten landen. Liegen Sie um ein Zeichen daneben, sind Sie siderisch oder haben die falsche Uhr. Weichen Häuser ab, stimmen Planeten aber überein, haben Sie eine Häusersystem-Abweichung.',
          'Transite im Tagesprotokoll von SideraChart sind tropische Transite, gespeichert um Mittag in der natalen Zeitzone. Tropisches Natal mit siderischen Transiten zu mischen ist derselbe 24°-Fehler in Bewegung. Halten Sie den Tierkreis konsistent. Das Natalchart ist die Basislinie; Transite sind Wetter gegen diese Basislinie, im selben Koordinatensystem.',
          'Wenn Sie ein Chart veröffentlichen, nennen Sie den Tierkreis in der Bildunterschrift: tropisch, Placidus, Geburtszeit bekannt oder unbekannt. Diese eine Zeile verhindert die meisten Threads „Ihr Rechner ist falsch“. Die Bildunterschrift von SideraChart zeigt bereits tropisch und Placidus, wenn das Rad vollständig ist.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen tropischem und siderischem Tierkreis?',
        a: 'Tropisch misst vom Frühlingsäquinoktium. Siderisch misst von einem sternbasierten Nullpunkt. Sie unterscheiden sich heute um etwa 24°, oft ein ganzes Zeichen.',
      },
      {
        q: 'Welchen Tierkreis verwendet SideraChart?',
        a: 'Nur tropisch, mit Positionen aus astronomy-engine (VSOP87). Es berechnet keine siderischen, vedischen oder chinesischen Charts und verwendet nicht Swiss Ephemeris.',
      },
      {
        q: 'Warum ist mein Sonnenzeichen in der vedischen Astrologie anders?',
        a: 'Vedische Praxis ist typischerweise siderisch. Ihre tropische Sonne ist weiterhin die äquinoktiumbasierte Länge. Der Name des Zeichens hat sich geändert, weil der Nullpunkt sich geändert hat.',
      },
      {
        q: 'Sollte ich tropisch oder siderisch nutzen?',
        a: 'Nutzen Sie tropisch, um westlichen Nataltexten und diesem Rechner zu entsprechen. Nutzen Sie siderisch, wenn Sie in dieser Tradition arbeiten. Mischen Sie sie nicht in einer Lesung.',
      },
    ],
  },
  'synastry-vs-composite': {
    title: 'Synastrie und Kompositchart',
    excerpt:
      'Synastrie legt zwei Natalcharts übereinander und listet Aspekte zwischen ihnen. Ein Kompositchart mittelt Längen zu einem dritten Rad. Sie beantworten unterschiedliche Fragen.',
    sections: [
      {
        heading: 'Synastrie und Kompositchart',
        paragraphs: [
          'Synastrie gegen Komposit sind zwei unterschiedliche Beziehungskarten, nicht zwei Namen für eine Karte. Synastrie behält beide Menschen. Sie berechnen zwei Natalcharts, legen die Planeten übereinander und listen Aspekte von Person A zu Person B. Ein Kompositchart verwirft die zwei Räder als getrennte Menschen und baut ein drittes Chart aus Mittelpunkten. Menschen suchen den Vergleich, weil Apps die Wörter nutzen, als wären sie austauschbar. Das sind sie nicht.',
          'SideraChart bietet beide als getrennte Rechner. Jedes Natal ist tropisch, Placidus als Standard, VSOP87 über astronomy-engine. Synastrie-Aspekte nutzen dieselben Orbis wie ein natales Aspektarium: 8° Konjunktion und Opposition, 6° Quadrat und Trigon, 4° Sextil. Keines der Räder ist ein Urteil, ob Sie zusammenbleiben, heiraten oder Vermögen teilen sollen. Es sind Diagramme.',
        ],
      },
      {
        heading: 'Was Synastrie tut',
        paragraphs: [
          'Synastrie lässt beide Charts unversehrt. Auf SideraChart ist ein Satz Glyphen Person A, der andere Person B. Die Tabelle listet Aspekte zwischen den Charts, nicht die inneren Aspekte eines Natals. Sie fragen, was passiert, wenn zwei Himmel eine Küche teilen: ihr Saturn auf seinem Mond, sein Mars auf ihrem Aszendenten, ein Sonne–Sonne-Trigon.',
          'Jede Person braucht weiterhin eigenes Geburtsdatum, eigene Uhrzeit und eigenen Ort. Ist eine Zeit unbekannt, fallen Aszendent und Häuser dieser Person weg. Sie können trotzdem Planet-zu-Planet-Synastrie rechnen. Sie können nicht ehrlich über „ihre Planeten in Ihrem siebten Haus“ sprechen ohne den Aszendenten dieser Person. Unbekannte Zeit = Planeten ja, Häuser nein — pro Chart.',
        ],
      },
      {
        heading: 'Was ein Kompositchart tut',
        paragraphs: [
          'Ein Komposit nimmt jedes Paar nataler Planeten (Sonne von A und Sonne von B, Mond von A und Mond von B und so weiter), findet den kürzeren Bogen-Mittelpunkt und zeichnet ein neues Rad. Das Ergebnis ist die Beziehung als dritte Entität, nicht einer der beiden Menschen. Es ist kein Davison-Chart, das in Zeit und Raum Mittelpunkte zu einer hypothetischen Geburt der Beziehung bildet.',
          'Komposit-Häuser brauchen trotzdem eine Ortskonvention und in der Praxis eine Art, Winkel zu setzen. Lesen Sie das Komposit als eigenes Instrument. Mischen Sie nicht die natalen Häuserbedeutungen einer Person in Komposit-Mittelpunkte, ohne zu merken, dass Sie die Karte gewechselt haben. Der Komposit-Rechner von SideraChart ist dieses dritte Rad, keine Synastrie-Überlagerung.',
        ],
      },
      {
        heading: 'Zwei Menschen, zwei vollständige Eingaben',
        paragraphs: [
          'Müll rein, Müll raus, zweimal. Falsche Zeitzone bei Person B verschiebt deren Mond und Aszendenten, die dann entweder Person A in der Synastrie falsch aspektieren oder jeden Komposit-Mittelpunkt ziehen. Bevorzugen Sie Urkunden. Fehlt eine Uhr, sagen Sie das und halten Sie häuserbasierte Synastrie-Sätze vom Tisch.',
          'Sie mitteln in der Synastrie nicht zwei Aszendenten zu einem „Paar-Aszendenten“. Dieser Instinkt gehört zu Komposit-Mittelpunkten, und selbst dort ist es ein konstruierter Winkel, kein Baby. Halten Sie die Methoden in getrennten Tabs und beschriften Sie, welches Rad Sie lesen.',
        ],
      },
      {
        heading: 'Was keines der Charts entscheidet',
        paragraphs: [
          'Weder Synastrie noch Komposit sagt Ihnen, sich zu binden, zu gehen, ein Kind zu bekommen oder einen Vertrag zu unterschreiben. Sie beschreiben Kontaktmuster und eine Mittelpunkt-Atmosphäre. Leichte Venus-Kontakte sind kein Rechtsstatus. Saturn-Kontakte sind keine Haftstrafe. Brauchen Sie Rat dieser Art, brauchen Sie eine andere Fachperson.',
          'Lesen Sie zuerst Natalcharts, getrennt. Zwei Menschen ohne Beziehung zu den eigenen Monden werden von einem hübschen Synastrie-Trigon nicht gerettet. Die Große Drei jedes Natals kommt trotzdem zuerst. Dann überlagern. Dann, wenn Sie die Dritte-Entität-Sicht wollen, Komposit.',
        ],
      },
      {
        heading: 'Wie Sie sie auf SideraChart rechnen',
        paragraphs: [
          'Nutzen Sie den Synastrie-Rechner für Überlagerungen und Inter-Aspekte. Nutzen Sie den Komposit-Rechner für Mittelpunkte. Dieselbe tropische Engine, nicht siderisch, nicht Swiss Ephemeris. Ein kostenloser Beziehungslauf ohne Konto; dann anmelden. Speichern Sie einzelne Natals, wenn Sie auch tägliche Transite in jedem Tagesprotokoll um Mittag nataler Zeit wollen — diese Transite sind persönliches Wetter, keine Paarprognose, es sei denn, Sie bauen das getrennt.',
          'Beim Vergleich mit anderen Sites gleichen Sie tropisch, Placidus, Orbis und ab, ob sie Synastrie oder Komposit meinen. Eine Site, die „Charts kombiniert“, ohne Mittelpunkt gegen Überlagerung zu sagen, ist der Grund, warum dieser Artikel existiert. Schauen Sie auf das Rad: zwei Planetensätze bedeuten Synastrie; ein Satz gemischter Mittelpunkte bedeutet Komposit.',
          'Häuserüberlagerungen in der Synastrie brauchen beide Uhren. Hat Person B keine Zeit, haben Sie trotzdem Planet-zu-Planet-Aspekte mit Orbis 8° / 6° / 4°. Sie haben nicht „ihre Venus in Ihrem siebten“. Schreiben Sie diese Grenze neben die Tabelle, damit die Überlagerung keine Häuser wachsen lässt, die sie nicht besitzt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen Synastrie und Komposit?',
        a: 'Synastrie legt zwei Natalcharts übereinander und aspektiert sie zueinander. Ein Komposit baut ein drittes Chart aus Planetenmittelpunkten. Überlagerung gegen Mittelwert.',
      },
      {
        q: 'Was ist besser für Beziehungsastrologie?',
        a: 'Sie beantworten unterschiedliche Fragen. Synastrie: wie zwei Menschen interagieren. Komposit: die Beziehung als drittes Chart. Rechnen Sie in beiden Fällen zuerst Natalcharts.',
      },
      {
        q: 'Brauchen beide Menschen eine Geburtszeit?',
        a: 'Für häuserbasierte Synastrie und für Komposit-Winkel ja. Planet-zu-Planet-Synastrie kann mit Daten fortfahren, wenn Zeiten fehlen, mit der üblichen Vorsicht am Mond-Cusp.',
      },
      {
        q: 'Ist ein Kompositchart dasselbe wie ein Davison-Chart?',
        a: 'Nein. Komposit nutzt Planetenmittelpunkte. Davison mittelt die zwei Geburtszeiten und -orte zu einem hypothetischen Ereignis. Das Komposit von SideraChart ist das Mittelpunkt-Rad.',
      },
    ],
  },
  'what-are-transits': {
    title: 'Was sind Transite in der Astrologie?',
    excerpt:
      'Transite sind heutige Positionen im Vergleich mit Ihrem Natalchart. Sie sind Wetter gegen eine feste Basislinie, kein neues Geburtshoroskop. SideraChart speichert sie um Mittag.',
    sections: [
      {
        heading: 'Was sind Transite in der Astrologie?',
        paragraphs: [
          'Transite sind die Planeten am Himmel jetzt (oder an einem gewählten Datum), gemessen gegen die Planeten in Ihrem Natalchart. Das Natalchart bleibt stehen: es ist die Basislinie aus Ihrem Geburtsdatum, Ihrer Uhrzeit und Ihrem Ort. Transite bewegen sich. Ein transitierendes Saturn-Quadrat zu Ihrer natalen Sonne ist ein vorübergehender Kontakt zwischen dem heutigen Saturn und der Sonne, mit der Sie geboren wurden. Menschen suchen „Was sind Transite in der Astrologie?“, wenn sie wissen wollen, ob sich das Natalchart ändert. Das tut es nicht. Das Wetter darüber schon.',
          'SideraChart berechnet Transite mit derselben tropischen Engine wie das Natal: astronomy-engine (VSOP87), Hauptaspekte bei 8° / 6° / 4°. Das Tagesprotokoll speichert eine Überlagerung pro Kalenderdatum um Mittag in der natalen Zeitzone, damit die Notiz des Tages stabil bleibt, wenn Sie um 23:00 aktualisieren. Verpasste Daten werden nicht nachgetragen.',
        ],
      },
      {
        heading: 'Transite und natale Positionen',
        paragraphs: [
          'Natale Positionen sind eine Momentaufnahme. Transite sind eine zweite Momentaufnahme, verglichen mit der ersten. Sie brauchen ein gespeichertes Natalchart, um das ehrlich zu tun. Ohne natale Längen listen Sie nur den heutigen Himmel, und das ist Astronomie, keine persönliche Transitlesung.',
          'War die natale Geburtszeit unbekannt, sind natale Häuser schon vom Tisch. Transitierende Planeten „durch Ihr siebtes Haus“ haben dann keine ehrliche Wand, durch die sie gehen. Sie können trotzdem zu natalen Planeten transiten (Sonne, Mond wenn das Zeichen sicher war, Merkur und der Rest). Unbekannte Zeit = natale Planeten ja, natale Häuser nein — Transite erben diese Grenze.',
        ],
      },
      {
        heading: 'Schnelle Transite und langsame Transite',
        paragraphs: [
          'Der Mond transitet einen natalen Planeten in Stunden. Sonne, Merkur, Venus und Mars brauchen Tage bis Wochen, um einen natalen Punkt zu kreuzen. Jupiter und Saturn brauchen länger. Uranus, Neptun und Pluto können Monate auf einem natalen Grad sitzen, mit Rückläufigkeiten, die die Geschichte dehnen. Schnelle Transite sind Wetter. Langsame Transite sind Klima. Keines ist eine medizinische oder finanzielle Anweisung.',
          'Orbis behalten dieselben Namen: Konjunktion, Sextil, Quadrat, Trigon, Opposition. Eine transitierende Konjunktion zur natalen Venus innerhalb 8° ist dieselbe Geometrie wie eine natale Konjunktion, nur dass ein Ende des Aspekts sich bewegt. Enge applicierende Transite sind die, die in einer Tagesnotiz zuerst gelistet werden sollten.',
        ],
      },
      {
        heading: 'Warum SideraChart Mittag in der natalen Zeitzone nutzt',
        paragraphs: [
          'Ein „Tag“ von Transiten muss einen Moment wählen. Würde das Tagesprotokoll bei jedem Laden der Seite neu rechnen, würde der Mond wandern und die Notiz würde nicht zu gestern Screenshot passen. Mittag in der natalen Zeitzone ist eine stabile bürgerliche Momentaufnahme für jenes Datum. Es ist nicht Ihre Geburtszeit, und es ist keine Behauptung, Transite zählten nur zum Mittagessen.',
          'Das Tagesprotokoll schreibt eine Zeile pro Kalenderdatum, wenn Sie es öffnen. Morgen bleibt die Zeile von gestern. Eine übersprungene Woche bleibt übersprungen; das Produkt erfindet keine Geschichte. Sie brauchen ein gespeichertes Natal und ein Konto für dieses Journal. Öffentliche Rechner bleiben ohne Anmeldung nutzbar.',
        ],
      },
      {
        heading: 'Wie Sie einen Transit-Tag lesen',
        paragraphs: [
          'Listen Sie transitierende Planeten, die Hauptaspekte zur natalen Sonne, zum Mond, zum Aszendenten (wenn Sie eine Uhrzeit haben) und zu engen natalen Konfigurationen bilden. Bevorzugen Sie langsame Kontakte für die Überschrift, schnelle für das Wetter. Befördern Sie ein transitierendes Mond-Quadrat nicht zu einer Lebensentscheidung. Ignorieren Sie auch keine transitierende Saturn-Konjunktion zur natalen Sonne; verwandeln Sie sie nur nicht in rechtlichen oder medizinischen Rat.',
          'Halten Sie tropische Transite auf einem tropischen Natal. Siderische Transite auf einem tropischen Natal mischen Nullpunkte und verschwenden die 24°-Lücke. SideraChart macht diese Mischung nicht. Placidus-Natalhäuser, falls sie existieren, sind die Zimmer, durch die Transite gehen. Leere natale Häuser können trotzdem Transite empfangen; Leere betraf natale Planeten, kein Verbot späteren Verkehrs.',
        ],
      },
      {
        heading: 'Was Transite nicht sind',
        paragraphs: [
          'Sie sind kein neues Natalchart. Sie sind kein Zeitungs-Sonnenzeichen-Horoskop, obwohl sie „Ihrer Woche“ näher kommen als das Natalrad allein. Sie sind keine Synastrie (zwei Natalcharts) und kein Komposit (Mittelpunkte). Sie sind nicht Swiss Ephemeris, vedische Dashas oder chinesische Tagessäulen. Die Transit-Schicht dieser Site sind westliche tropische Positionen gegen ein westliches tropisches Natal.',
          'Nutzen Sie sie als datierte Überlagerung. Drucken oder laden Sie den Text des Tages herunter, wenn Sie eine Aufzeichnung wollen. Gehen Sie dann zum Natal zurück, wenn Sie die Basislinie brauchen. Das Natalchart ist das Instrument, das Sie bei der Geburt kalibriert haben. Transite sind der spätere Himmel, der darüber läuft.',
          'Überspringen Sie eine Woche, lassen Sie die Lücke. Mittags-Momentaufnahmen für Tage nachzutragen, die Sie nicht geöffnet haben, würde ein Journal erfinden, das Sie nicht geführt haben. Das Natalchart ist trotzdem da. Öffnen Sie das heutige Datum, wenn Sie heutiges Wetter wollen, nicht einen rekonstruierten Monat.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was ist ein Transit in der Astrologie?',
        a: 'Ein Kontakt zwischen einem Planeten am Himmel an einem gegebenen Datum und einem Punkt in Ihrem Natalchart. Das Natalchart bleibt fest; der Himmel bewegt sich.',
      },
      {
        q: 'Ändern Transite mein Natalchart?',
        a: 'Nein. Transite überlagern das Natal. SideraChart speichert die Überlagerung jedes Tages um Mittag in der natalen Zeitzone. Ihre Geburtspositionen bewegen sich nicht.',
      },
      {
        q: 'Warum berechnet SideraChart tägliche Transite um Mittag?',
        a: 'Damit die Notiz des Tages stabil ist. Mittag in der natalen Zeitzone ist eine konsistente Momentaufnahme. Es ist kein Ersatz für Ihre Geburtszeit.',
      },
      {
        q: 'Kann ich Transite ohne Geburtszeit lesen?',
        a: 'Sie können Transite zu natalen Planeten lesen. Transite durch natale Häuser können Sie ohne Aszendenten nicht ehrlich lesen.',
      },
    ],
  },
};
