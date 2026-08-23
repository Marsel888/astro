import type { ArticleCopy } from './articles';

export const frArticles: Record<string, ArticleCopy> = {
  'what-is-a-natal-chart': {
    title: 'Qu’est-ce qu’un thème natal ?',
    excerpt:
      'Un thème natal est une carte du ciel à partir de votre date, heure et lieu de naissance : planètes, Ascendant et douze maisons. Ce n’est ni un horoscope solaire du jour, ni un quiz.',
    sections: [
      {
        heading: 'Qu’est-ce qu’un thème natal ?',
        paragraphs: [
          'Un thème natal est une carte du Système solaire vue depuis un lieu à un instant. Vous fournissez trois faits : une date de naissance, une heure d’horloge et un lieu géographique. À partir de ces données, un calculateur dérive la longitude écliptique de chaque planète, le degré qui se levait à l’est (l’Ascendant) et une division en douze maisons du ciel local. SideraChart est ce calculateur : zodiaque tropical, maisons Placidus par défaut, positions d’une éphéméride de classe VSOP87 via astronomy-engine.',
          'Le thème est un diagramme d’accents, pas un verdict. Chaque planète est une fonction. Chaque signe est un style de cette fonction. Chaque maison est un domaine de vie où la fonction se montre. Les aspects sont les distances angulaires entre ces fonctions. Lus ensemble, ils vous disent quelles parties du thème sont sonores. Ils ne vous disent pas s’il faut changer de travail, quitter une relation ou prendre une décision médicale.',
        ],
      },
      {
        heading: 'Ce dont vous avez besoin : date, heure et lieu de naissance',
        paragraphs: [
          'La date fixe le jour de l’orbite terrestre où vous êtes né, ce qui suffit pour que le Soleil et les planètes lentes tombent dans le bon signe. L’heure convertit l’heure civile en Temps universel avec les règles de fuseaux IANA en vigueur à cette date, y compris l’heure d’été historique. Le lieu fournit latitude et longitude pour que l’horizon local — donc l’Ascendant et les cuspides des maisons — puisse être calculé.',
          'Si l’heure est inconnue, vous obtenez quand même les signes planétaires. Vous n’obtenez pas d’Ascendant fiable ni de système de maisons. SideraChart vous laisse marquer l’heure comme inconnue, puis ne dessine que les planètes. Deviner midi et traiter les maisons comme un fait est pire qu’une lacune honnête. S’il y a une heure sur l’acte de naissance, utilisez-la ; si des proches se contredisent d’une demi-heure, traitez l’Ascendant comme provisoire.',
        ],
      },
      {
        heading: 'Planètes, signes, maisons et aspects',
        paragraphs: [
          'Les planètes (du Soleil à Pluton, plus la Lune) siègent sur l’écliptique. Le signe est la tranche de 30° du zodiaque tropical dans laquelle tombe cette longitude. La maison est le secteur local dans lequel tombe cette longitude une fois l’Ascendant connu. Une planète en Bélier en maison dix n’est pas la même affirmation qu’une planète en Bélier en maison quatre : même style, autre domaine.',
          'Les aspects sont les angles nommés entre deux longitudes : conjonction (0°), sextile (60°), carré (90°), trigone (120°), opposition (180°). SideraChart dessine ces cinq-là avec des orbes de 8° pour la conjonction et l’opposition, 6° pour le carré et le trigone, et 4° pour le sextile. Plus l’orbe est serré, plus la lecture est sonore. Les lignes colorées de la roue et le tableau en dessous montrent les mêmes contacts.',
        ],
      },
      {
        heading: 'Ce qu’un thème natal n’est pas',
        paragraphs: [
          'Un thème natal n’est pas une chronique d’horoscope quotidien écrite pour douze signes solaires. Ce n’est pas l’astrologie védique ou sidérale, qui mesure depuis un zéro stellaire éloigné d’environ 24° de l’équinoxe tropical d’aujourd’hui. Ce n’est pas l’astrologie chinoise. SideraChart ne calcule pas ces systèmes et n’utilise pas Swiss Ephemeris.',
          'Ce n’est pas non plus un quiz de personnalité qui sort un type. Deux personnes avec le même signe solaire peuvent avoir des Lunes différentes, des Ascendants différents, des accents de maisons différents et des schémas d’aspects différents. Si vous ne connaissez que le Soleil, vous avez une coordonnée. Le thème est le reste du système de coordonnées.',
        ],
      },
      {
        heading: 'Comment SideraChart calcule le thème',
        paragraphs: [
          'SideraChart résout le lieu de naissance en latitude et longitude, convertit l’heure civile locale en Temps universel, puis lit les longitudes tropicales apparentes dans astronomy-engine (classe VSOP87). Le zodiaque tropical commence à l’équinoxe de mars, convention occidentale. Les longitudes sidérales ne sont pas affichées. Les maisons sont Placidus par défaut parce que la plupart des textes occidentaux publiés le supposent ; Whole Sign est disponible lorsque vous voulez des signes égaux à partir du signe de l’Ascendant.',
          'Placidus divise le temps d’ascension, donc les maisons sont inégales, et il devient peu fiable au-dessus d’environ 66° de latitude. Pour les naissances polaires, Whole Sign est la grille la plus honnête. Les longitudes planétaires sont calculées dans les deux cas. Enregistrez le thème si vous voulez le rapport rédigé et l’espace quotidien ; les calculateurs publics restent gratuits sans compte.',
        ],
      },
      {
        heading: 'Comment utiliser le thème une fois que vous l’avez',
        paragraphs: [
          'Commencez par le Big Three : Soleil, Lune et Ascendant. Puis lisez les maisons occupées, puis les aspects les plus serrés. Les maisons vides sont des pièces sans planète dedans, pas des organes manquants. Le PNG de la roue est un instantané ; les tableaux sont l’instrument. Les chiffres d’abord, puis la couche rédigée.',
          'Si vous comparez plus tard le thème natal au ciel d’aujourd’hui, ce sont des transits — un autre article. L’espace de SideraChart stocke ces superpositions quotidiennes à midi dans le fuseau natal pour que la note du jour reste stable. Rien de cela ne réécrit le thème natal. Le thème natal est la ligne de base que vous gardez ; les transits sont la météo contre elle.',
        ],
      },
    ],
    faq: [
      {
        q: 'Un thème natal est-il la même chose qu’un horoscope ?',
        a: 'Non. Un thème natal est une carte calculée à partir de votre date, heure et lieu de naissance. Un horoscope, dans le français courant, est en général une chronique par signe solaire pour le jour, la semaine ou l’année. Le thème natal est la ligne de base ; un horoscope est une lecture plus tardive, beaucoup plus mince.',
      },
      {
        q: 'Ai-je besoin de mon heure de naissance exacte pour un thème natal ?',
        a: 'Vous en avez besoin pour l’Ascendant et les maisons. Sans heure, les signes planétaires restent utilisables. SideraChart calcule les planètes et omet le signe Ascendant si vous marquez l’heure comme inconnue.',
      },
      {
        q: 'Quel zodiaque utilise un thème natal ?',
        a: 'Les thèmes natals occidentaux, y compris SideraChart, utilisent le zodiaque tropical mesuré depuis l’équinoxe de printemps. Les thèmes sidéraux (védiques) utilisent un zéro stellaire et auront l’air décalés d’environ un signe pour beaucoup de positions aujourd’hui.',
      },
      {
        q: 'Deux personnes nées le même jour peuvent-elles avoir des thèmes natals différents ?',
        a: 'Oui. L’heure et le lieu changent l’Ascendant, les maisons et le degré de la Lune. Même le même hôpital à une heure d’écart peut produire un Ascendant différent.',
      },
    ],
  },
  'natal-chart-vs-horoscope': {
    title: 'Thème natal et horoscope',
    excerpt:
      'Un thème natal est votre carte du ciel de naissance à partir de la date, de l’heure et du lieu. Un horoscope est en général une chronique par signe solaire. Ce n’est pas la même lecture ; ne les intervertissez pas.',
    sections: [
      {
        heading: 'Thème natal et horoscope',
        paragraphs: [
          'On tape « thème natal et horoscope » parce que les deux mots servent pour « astrologie », et ce n’est pas le même objet. Un thème natal est un diagramme calculé du ciel à partir de votre date, heure et lieu de naissance : planètes sur l’écliptique, un Ascendant si l’horloge est connue, des maisons et des aspects. Un horoscope, au sens de la plupart des résultats de recherche, est une courte prévision écrite pour un signe solaire — Bélier jusqu’aux Poissons — pour un jour, une semaine ou un mois.',
          'Vous pouvez tirer un paragraphe de type horoscope d’un thème natal. Vous ne pouvez pas reconstruire un thème natal à partir d’une chronique d’horoscope. L’un est une carte avec des coordonnées. L’autre est un produit textuel destiné à douze publics. SideraChart calcule la carte. Il ne publie pas de chroniques par signe solaire, hebdomadaires ou autres.',
        ],
      },
      {
        heading: 'Ce que « horoscope » veut dire d’habitude',
        paragraphs: [
          'Dans les journaux et les applications, un horoscope est indexé par signe solaire. L’auteur peut regarder la Lune, Mercure ou un transit vers ce signe, puis écrire douze textes. Le texte ne connaît ni votre Lune, ni votre Ascendant, ni vos cuspides de maisons, ni si votre Soleil est en maison un ou en maison dix. Il ne peut pas. Ces faits exigent une heure et un lieu de naissance.',
          'Un usage astronomique plus ancien de « horoscope » désignait l’Ascendant lui-même — le marqueur de l’heure. Ce sens survit dans le mot, d’où la confusion tenace. Si quelqu’un demande « votre horoscope », il peut vouloir le signe solaire, l’Ascendant ou toute la roue natale. Demandez lequel. Puis calculez le thème natal si vous voulez le ciel réel.',
        ],
      },
      {
        heading: 'Ce qu’un thème natal contient qu’un horoscope n’a pas',
        paragraphs: [
          'Un thème natal liste tous les corps majeurs : Soleil, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, Pluton. Il les place en signes tropicaux. Avec une heure de naissance, il les place aussi en maisons et fixe l’Ascendant et le Milieu du Ciel. Il liste ensuite les aspects majeurs dans les orbes de 8° / 6° / 4°. C’est beaucoup de structure comparé à « Taureau, cette semaine ».',
          'Deux personnes qui partagent un signe solaire peuvent avoir des Lunes opposées, des Ascendants différents et aucun aspect en commun. Une chronique d’horoscope les traite comme le même lecteur. Un thème natal, non. Si vous n’avez jamais lu que des horoscopes par signe solaire, le thème natal paraîtra trop détaillé. Ce détail est précisément la raison de le calculer.',
        ],
      },
      {
        heading: 'Chroniques par signe solaire et roue complète',
        paragraphs: [
          'Votre signe solaire est une coordonnée : le signe tropical occupé par le Soleil à votre date de naissance. C’est le fait le plus facile à connaître parce que le Soleil reste dans un signe environ un mois et a rarement besoin d’une horloge précise. C’est aussi le fait que les horoscopes utilisent comme index. Ce n’est pas le thème.',
          'La roue ajoute la Lune (qui change de signe tous les deux jours et demi), le signe Ascendant (qui a besoin de la minute) et le reste des planètes. Le calculateur de thème natal de SideraChart dessine cette roue dans le zodiaque tropical avec des maisons Placidus par défaut. Comparez-la à un horoscope de magazine et vous verrez pourquoi les mots ne doivent pas s’échanger.',
        ],
      },
      {
        heading: 'Pourquoi les deux se confondent',
        paragraphs: [
          'Le langage marketing les écrase. « Horoscope gratuit » veut souvent dire « thème natal gratuit », ou l’inverse. Les publications disent « quel est ton horoscope ? » en voulant dire le signe solaire. Les moteurs de recherche héritent de ce mélange. Si vous arrivez ici par « thème natal et horoscope », gardez la distinction : thème = carte calculée à partir des données de naissance ; horoscope = en général un texte par signe solaire.',
          'Une lecture de transits pour votre thème natal enregistré est plus proche d’un horoscope personnel qu’une chronique de journal, parce qu’elle utilise vos positions réelles. L’espace quotidien de SideraChart stocke ces transits à midi dans le fuseau natal. Ce n’est toujours pas le thème natal. Le thème natal ne change pas ; le ciel au-dessus de lui, si.',
        ],
      },
      {
        heading: 'Ce que SideraChart calcule',
        paragraphs: [
          'SideraChart calcule des thèmes natals, des outils de signe planète par planète, des roues de synastrie et de composite. Les positions viennent d’astronomy-engine (VSOP87), pas de Swiss Ephemeris. Le zodiaque est tropical, pas sidéral ni chinois. Les maisons sont Placidus sauf si vous passez à Whole Sign. Heure inconnue : planètes oui, maisons non.',
          'Si vous voulez un horoscope par signe solaire pour la semaine, ce site n’est pas le bon instrument. Si vous voulez la carte que ces chroniques prétendent décrire de loin, utilisez le calculateur de thème natal avec date, heure et lieu. Lisez le thème comme une description structurée d’accents. Ne traitez ni l’un ni l’autre comme un conseil médical, juridique ou financier.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mon horoscope est-il mon signe solaire ?',
        a: 'Dans l’usage courant, oui : les horoscopes sont classés par signe solaire. Votre thème natal comprend le signe solaire plus la Lune, l’Ascendant, les maisons et les aspects. Ils répondent à des questions différentes.',
      },
      {
        q: 'Un horoscope peut-il remplacer un thème natal ?',
        a: 'Non. Une chronique pour douze signes ne peut pas encoder votre heure de naissance, votre lieu, votre Lune ou vos cuspides de maisons. Calculez un thème natal si vous voulez ces coordonnées.',
      },
      {
        q: 'Un thème natal prédit-il ma semaine ?',
        a: 'Le thème natal est la ligne de base. Le langage semaine par semaine appartient aux transits contre cette ligne de base. SideraChart stocke les transits quotidiens à midi dans le fuseau natal ; ce n’est toujours pas un horoscope de journal.',
      },
      {
        q: 'Pourquoi certains sites appellent-ils un thème de naissance un horoscope ?',
        a: 'Le jargon plus ancien utilisait « horoscope » pour l’Ascendant ou toute la figure. Le marketing moderne a repris le mot pour des textes par signe solaire. Vérifiez si la page demande l’heure de naissance. Si oui, elle calcule un thème.',
      },
    ],
  },
  'what-is-my-sun-sign': {
    title: 'Quel est mon signe solaire ?',
    excerpt:
      'Votre signe solaire est le signe du zodiaque tropical occupé par le Soleil à votre date de naissance. Vous n’avez en général pas besoin d’une heure de naissance. C’est une position, pas tout le thème natal.',
    sections: [
      {
        heading: 'Quel est mon signe solaire ?',
        paragraphs: [
          'Votre signe solaire est la tranche tropicale de 30° qui contenait le Soleil à votre naissance. On demande « quel est mon signe solaire ? » parce que c’est le seul fait astrologique que partagent journaux, applications et conversation courante. Vous le trouvez à partir de la date de naissance. Le Soleil avance d’environ un degré par jour et change de signe autour des mêmes dates calendaires chaque année, avec un peu de dérive près des cuspides.',
          'SideraChart mesure le Soleil dans le zodiaque tropical, depuis l’équinoxe de mars, avec astronomy-engine (VSOP87). C’est la pratique occidentale. Un signe solaire sidéral (védique) peut différer d’environ un signe aujourd’hui parce que le zéro stellaire a précessé. Si un ami dans une application sidérale rapporte un Soleil différent, vous ne regardez pas le même système de coordonnées.',
        ],
      },
      {
        heading: 'Comment le signe solaire est calculé',
        paragraphs: [
          'Le calculateur convertit votre date et heure civiles de naissance en Temps universel, puis lit la longitude écliptique apparente du Soleil. Le signe est cette longitude divisée en douze blocs de 30° à partir de 0° Bélier (l’équinoxe). Un jour de cuspide — quand le Soleil change de signe — l’heure d’horloge et le fuseau décident de quel côté vous êtes. Ce sont les seuls jours où « je suis une cuspide » est une question de calcul plutôt qu’une ambiance.',
          'Le lieu compte à peine pour le signe du Soleil. L’heure compte sur la cuspide et pour le degré et la maison du Soleil. Si vous voulez seulement le signe et que vous n’êtes pas né un jour de changement de signe, l’anniversaire suffit. Si vous êtes né au passage, saisissez l’heure réelle ou marquez-la inconnue et traitez le résultat comme non tranché jusqu’à avoir une horloge.',
        ],
      },
      {
        heading: 'Pourquoi votre signe solaire n’est pas tout le thème',
        paragraphs: [
          'Le Soleil est un corps. Un thème natal a aussi la Lune, Mercure, Vénus, Mars et les planètes externes, plus l’Ascendant si vous avez une heure de naissance. Deux Lions peuvent partager un mois solaire et ne pas partager une Lune, un Ascendant ou un schéma de maisons. Les descriptions par signe solaire survivent parce qu’elles sont faciles à indexer, pas parce qu’elles épuisent le ciel.',
          'Lisez le Soleil comme l’intrigue diurne : ce que vous faites quand vous êtes le plus visiblement vous-même dans le temps public. Puis lisez le reste. Un thème qui ne liste que le Soleil est un titre. Les tableaux sous la roue de SideraChart sont l’article.',
        ],
      },
      {
        heading: 'Signe solaire, signe lunaire et signe Ascendant',
        paragraphs: [
          'La Lune change de signe tous les deux jours et demi, donc beaucoup de personnes nées le même mois solaire ne partagent pas une Lune. Le signe Ascendant change environ toutes les deux heures et a besoin de l’heure et du lieu de naissance. Ensemble, ces trois-là sont le Big Three. Si vous ne connaissez que le Soleil, vous connaissez le plus lent des trois.',
          'Vous n’avez pas besoin d’une heure de naissance pour un signe solaire typique. Vous n’en avez souvent pas besoin pour la Lune, sauf si elle a changé de signe ce jour-là. Vous en avez toujours besoin pour le signe Ascendant. Les outils dédiés Soleil, Lune et Ascendant de SideraChart sont des filtres sur le même moteur que le thème natal complet. Utilisez le thème complet lorsque vous voulez aussi les maisons et les aspects.',
        ],
      },
      {
        heading: 'Cuspides, fuseaux et « je suis deux signes »',
        paragraphs: [
          'Il n’y a pas de treizième signe en pratique tropicale, et il n’y a pas de double nationalité officielle sur la frontière. Le Soleil est dans un signe ou dans l’autre à la minute de la naissance. S’il vous manque une heure un jour de cuspide, dites-le. N’en faites pas la moyenne de deux signes en une identité sur mesure pour la traiter ensuite comme un fait calculé.',
          'L’histoire des fuseaux compte plus qu’on ne croit. Une naissance notée 23:40 dans une ville encore à l’heure d’été peut être un Temps universel différent de la même lecture d’horloge en hiver. SideraChart utilise les règles IANA pour cette date. Si un vieux papier utilisait un autre décalage, le degré du Soleil peut bouger ; sur une cuspide, le signe aussi.',
        ],
      },
      {
        heading: 'Trouver votre signe solaire sur SideraChart',
        paragraphs: [
          'Saisissez la date de naissance, et ajoutez l’heure et le lieu si vous les avez. La ligne Soleil du tableau est le signe et le degré. La roue place le glyphe solaire sur cette longitude. Les aspects au Soleil utilisent les mêmes orbes que le reste du thème : 8° conjonction et opposition, 6° carré et trigone, 4° sextile.',
          'Enregistrez le thème natal si vous voulez le rapport rédigé et l’espace quotidien. Les transits à votre Soleil natal sont une météo plus tardive, stockée à midi dans le fuseau natal. Ils ne changent pas le signe solaire natal. Le signe solaire est un fait de naissance. Tout le reste est lecture.',
        ],
      },
    ],
    faq: [
      {
        q: 'Puis-je connaître mon signe solaire sans heure de naissance ?',
        a: 'En général oui. Le Soleil reste dans un signe environ un mois. Vous n’avez besoin d’une heure que le jour calendaire où il change de signe, ou si vous voulez la maison du Soleil.',
      },
      {
        q: 'Pourquoi mon signe solaire est-il différent dans une application védique ?',
        a: 'Les applications védiques utilisent en général le zodiaque sidéral. SideraChart utilise des longitudes tropicales depuis l’équinoxe. L’écart est d’environ 24° aujourd’hui, ce qui déplace souvent le Soleil dans le signe précédent.',
      },
      {
        q: 'Et si je suis né sur la cuspide ?',
        a: 'Le Soleil est quand même dans un seul signe tropical à la minute de la naissance. Saisissez une heure exacte. Si l’heure est inconnue, le signe n’est pas tranché et ne doit pas être forcé.',
      },
      {
        q: 'Le signe solaire est-il la position la plus importante ?',
        a: 'C’est la plus célèbre, pas automatiquement la plus sonore. Une Lune serrée ou une maison encombrée peut dominer un thème dont le Soleil se trouve être calme.',
      },
    ],
  },
  'sun-moon-rising': {
    title: 'Soleil, Lune et Ascendant : le Big Three',
    excerpt:
      'Le Big Three, ce sont le Soleil, la Lune et le signe Ascendant. Soleil d’après la date, Lune d’après la date plus un contrôle de l’heure, Ascendant seulement avec l’heure et le lieu de naissance. Lisez-les ensemble.',
    sections: [
      {
        heading: 'Soleil, Lune et Ascendant : le Big Three',
        paragraphs: [
          'On appelle Soleil, Lune et Ascendant le Big Three parce que ce sont les trois positions que les gens utilisent vraiment en conversation, et parce qu’ils reposent sur trois horloges différentes. Le Soleil a besoin d’une date. La Lune a besoin d’une date et, les jours rapides, d’une heure. Le signe Ascendant a besoin d’une date, d’une heure et d’un lieu. Si vous n’avez qu’un des trois, vous n’avez pas l’ensemble.',
          'Ce n’est pas un classement d’importance spirituelle. Ce sont trois coordonnées qui décrivent des tempos différents : le chemin annuel du Soleil, le chemin mensuel de la Lune, et la rotation quotidienne de la Terre sous l’écliptique. SideraChart calcule les trois avec le même moteur tropical fondé sur VSOP87. Le signe Ascendant est omis lorsque l’heure de naissance est inconnue.',
        ],
      },
      {
        heading: 'Le Soleil : la coordonnée lente et publique',
        paragraphs: [
          'Le signe du Soleil est la tranche tropicale qu’il occupait à la naissance. Il change environ une fois par mois. C’est l’index des horoscopes de journal et la réponse à « quel est mon signe ? » dans la conversation courante. Dans le thème natal, ce n’est toujours qu’une longitude. Il vous dit le style de la fonction solaire — comment vous occupez le temps diurne — pas le reste du ciel.',
          'Vous avez rarement besoin d’une horloge précise pour le signe du Soleil. Vous en avez besoin pour la maison du Soleil, et les jours de cuspide pour le signe lui-même. Si vous construisez le Big Three, saisissez quand même l’heure réelle pour que le degré du Soleil s’aligne avec les aspects à la Lune et à l’Ascendant.',
        ],
      },
      {
        heading: 'La Lune : le corps rapide',
        paragraphs: [
          'La Lune avance d’environ 13° par jour et change de signe tous les deux jours et demi. C’est pourquoi deux personnes nées le même mois de signe solaire ne partagent souvent pas une Lune. Le signe de la Lune décrit la météo plus rapide du thème : l’appétit, le sommeil, les heures où personne ne tient le score. Ce n’est pas un diagnostic médical et ce n’est pas une étiquette de trouble de l’humeur.',
          'Sans heure de naissance, le signe de la Lune est en général encore juste. Le degré et la maison ne le sont pas. Si la Lune a changé de signe le jour de votre naissance, une heure inconnue laisse la Lune elle-même non tranchée. Marquez l’heure inconnue dans SideraChart plutôt que d’inventer midi et de défendre le degré.',
        ],
      },
      {
        heading: 'Le signe Ascendant : l’horizon est',
        paragraphs: [
          'Le signe Ascendant, ou Ascendant, est le degré du zodiaque qui se levait à l’horizon est à la minute de la naissance. Ce n’est pas une planète. C’est un angle local, qui dépend de la latitude, de la longitude et de l’heure d’horloge. L’Ascendant avance d’environ un degré toutes les quatre minutes, donc une erreur de vingt minutes peut changer le signe.',
          'Les maisons en Placidus (le défaut de SideraChart) partent de cet angle. Pas d’Ascendant fiable veut dire pas de maisons fiables. Si vous n’avez pas d’heure, sautez l’Ascendant. Un signe Ascendant deviné décale chaque ligne « planète en maison » qui le suit.',
        ],
      },
      {
        heading: 'Pourquoi lire les trois ensemble',
        paragraphs: [
          'Une lecture Soleil seul est un titre. Ajouter la Lune vous dit ce que fait le thème quand personne ne note la performance. Ajouter le signe Ascendant vous dit la porte qu’utilise le thème — premières impressions, le corps dans l’espace, la grille des maisons. Les trois peuvent rimer (tout en feu) ou se contredire (Soleil en Capricorne, Lune en Bélier, Ascendant Gémeaux). La contradiction est une information.',
          'Les aspects entre le Big Three comptent plus que la chimie des slogans. Un carré Soleil–Lune dans un orbe de 6° est une affirmation plus serrée que « feu et eau ». Les orbes de SideraChart sont 8° pour la conjonction et l’opposition, 6° pour le carré et le trigone, 4° pour le sextile. Regardez le tableau, pas la compatibilité des mèmes.',
        ],
      },
      {
        heading: 'Comment calculer le Big Three',
        paragraphs: [
          'Utilisez le calculateur de thème natal avec date, heure et lieu. Lisez d’abord les lignes Soleil, Lune et Ascendant, puis le reste. Les outils dédiés Soleil, Lune et Ascendant sur SideraChart sont le même moteur avec un affichage plus étroit. Zodiaque tropical seulement ; pas sidéral, pas chinois. Heure inconnue : vous pouvez encore lister le Soleil et en général la Lune ; vous ne pouvez pas lister l’Ascendant.',
          'Une fois le thème natal enregistré, l’espace quotidien superposera les transits à midi dans le fuseau natal. Ces transits parlent au Big Three parmi d’autres points. Ils ne les remplacent pas. Le Big Three, ce sont des faits de naissance. Les transits sont le ciel plus tardif.',
          'Si les trois positions se contredisent, ne choisissez pas une favorite pour jeter les autres. Écrivez-les en une phrase : Soleil dans ce signe, Lune dans celui-là, ce signe à l’Ascendant. Puis ouvrez le tableau des aspects. Cette phrase plus l’orbe le plus serré est déjà plus un thème natal qu’une chronique par signe solaire.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qu’est-ce que le Big Three en astrologie ?',
        a: 'Signe solaire, signe lunaire et signe Ascendant. Ils tournent sur des horloges annuelle, mensuelle et quotidienne. Vous avez besoin d’une heure et d’un lieu de naissance pour le signe Ascendant.',
      },
      {
        q: 'Lequel du Big Three est le plus important ?',
        a: 'Aucun n’est automatiquement premier. Le Soleil est le plus célèbre. La Lune est plus rapide. Le signe Ascendant pose les maisons. Lisez les aspects les plus serrés entre eux avant de classer.',
      },
      {
        q: 'Puis-je connaître mon Big Three sans heure de naissance ?',
        a: 'Soleil en général oui, Lune en général oui sauf les jours de changement de signe, Ascendant non. SideraChart omet l’Ascendant lorsque l’heure est marquée inconnue.',
      },
      {
        q: 'L’Ascendant est-il le même que le signe solaire ?',
        a: 'Non. Le Soleil est la longitude d’une planète. L’Ascendant est le degré de l’écliptique à l’horizon est. Ils ne coïncident que par hasard, et même alors ce sont des objets différents.',
      },
    ],
  },
  'rising-sign': {
    title: 'Quel est mon signe Ascendant ?',
    excerpt:
      'Votre signe Ascendant est le degré du zodiaque à l’horizon est à la naissance — l’Ascendant. Il faut une heure et un lieu de naissance exacts. Sans heure de naissance, sautez-le.',
    sections: [
      {
        heading: 'Quel est mon signe Ascendant ?',
        paragraphs: [
          'Votre signe Ascendant, ou Ascendant, est le degré du zodiaque tropical qui se levait à l’est à la minute de votre naissance. Ce n’est pas une planète. C’est un angle local produit par la rotation de la Terre, votre latitude et longitude, et l’horloge. Deux personnes nées la même heure dans des villes différentes ne partagent pas un Ascendant. Deux personnes nées dans la même ville à une heure d’écart non plus, souvent.',
          'On cherche « quel est mon signe Ascendant ? » parce que l’astrologie sociale le traite comme une seconde identité à côté du Soleil. Sur l’instrument, c’est plus précis : c’est le coup d’envoi du système de maisons et le degré qui décrit comment le thème rencontre d’abord le monde — corps, entrée, première impression. Ce n’est pas un masque que vous portez pour les inconnus, et ce n’est pas plus important que le Soleil par décret.',
        ],
      },
      {
        heading: 'Pourquoi l’Ascendant a besoin d’une heure de naissance',
        paragraphs: [
          'L’Ascendant avance d’environ un degré toutes les quatre minutes. Une erreur de vingt minutes, c’est cinq degrés, et cela peut changer le signe, surtout près d’une frontière. Une estimation à deux heures est un autre signe Ascendant la plupart du temps. Le lieu compte aussi : le même Temps universel produit des horizons locaux différents à Londres et à Kyiv.',
          'SideraChart convertit l’heure civile en Temps universel avec les règles de fuseaux IANA pour cette date, puis calcule le temps sidéral local et le degré d’écliptique qui intersecte. Si vous marquez l’heure inconnue, le calculateur renvoie encore les longitudes planétaires et omet l’Ascendant. C’est la sortie honnête. Inventer 12:00 et publier un signe Ascendant est un autre produit, pire.',
        ],
      },
      {
        heading: 'Signe Ascendant et signe solaire',
        paragraphs: [
          'Le signe solaire vient de la longitude écliptique du Soleil et est stable sur une journée. Le signe Ascendant vient de l’horizon et ne l’est pas. Vous pouvez connaître votre Soleil d’après un gâteau d’anniversaire. Vous ne pouvez pas connaître votre signe Ascendant de la même façon. Si une application vous a donné un signe Ascendant sans demander une heure, elle a deviné, en général à midi, et il ne faut pas s’y fier.',
          'Lorsque les deux sont connus, lisez-les comme des objets différents. Soleil en Vierge, Ascendant Scorpion est un schéma courant, pas une contradiction. L’un est l’intrigue solaire ; l’autre est la porte est et la grille des maisons. Le calculateur d’ascendant de SideraChart est le moteur natal filtré sur cet angle. Le thème complet montre encore pourquoi le reste du ciel siège où il siège.',
        ],
      },
      {
        heading: 'Les maisons commencent à l’Ascendant',
        paragraphs: [
          'En Placidus, le défaut de SideraChart, la maison I commence à l’Ascendant. Le reste des cuspides suit le temps d’ascension, donc les maisons sont inégales. Whole Sign attribue la maison I à tout le signe qui contient l’Ascendant, puis compte les signes. Dans les deux cas, pas d’Ascendant veut dire pas de maisons honnêtes.',
          'Chaque ligne « planète en maison sept » en dépend. Si le signe Ascendant est faux, ces lignes sont fausses même lorsque les signes planétaires sont justes. C’est pourquoi heure inconnue veut dire planètes oui, maisons non — pas « maisons approximatives ». Les latitudes polaires au-dessus d’environ 66° mettent aussi Placidus à rude épreuve ; passez à Whole Sign là-bas plutôt que de forcer des cuspides cassées.',
        ],
      },
      {
        heading: 'Heures approximatives et thèmes de midi',
        paragraphs: [
          'Une heure notée 04:00 peut vouloir dire « vers quatre heures » ou « exactement quatre heures ». Traitez les heures arrondies comme une plage. Recalculez vingt minutes de chaque côté et voyez si l’Ascendant reste dans le signe. S’il bascule, vous n’avez pas encore de signe Ascendant ; vous avez deux candidats. La rectification — inventer une heure pour coller à une biographie — est un métier séparé, facile à abuser. SideraChart ne le fait pas pour vous.',
          'La mémoire familiale est plus faible qu’un acte. Si des proches se contredisent, préférez le document. S’il n’y a pas de document, laissez l’heure inconnue. Vous pouvez encore lire Soleil, Lune (en général), Mercure, Vénus, Mars et les planètes externes en signes, plus les aspects entre eux. C’est déjà un thème natal moins le cadre local.',
        ],
      },
      {
        heading: 'Comment calculer votre signe Ascendant',
        paragraphs: [
          'Utilisez le calculateur d’ascendant de SideraChart ou le calculateur de thème natal complet. Saisissez date, heure et lieu. La ligne Ascendant est le signe et le degré. Les positions sont tropicales, d’astronomy-engine (VSOP87), pas Swiss Ephemeris, pas sidérales. Les aspects des planètes à l’Ascendant utilisent les mêmes orbes que les contacts planète à planète : 8° / 6° / 4°.',
          'Enregistrez le thème si vous voulez les maisons, le rapport rédigé et plus tard les transits dans l’espace à midi natal. Un signe Ascendant sans le reste de la roue n’est encore qu’un angle. Calculez-le avec soin, puis remettez-le dans le thème auquel il appartient.',
        ],
      },
    ],
    faq: [
      {
        q: 'Puis-je trouver mon signe Ascendant sans heure de naissance ?',
        a: 'Non. L’Ascendant est un degré d’horizon. Sans horloge et sans lieu, tout signe Ascendant est une estimation. SideraChart l’omet lorsque l’heure est inconnue.',
      },
      {
        q: 'À quelle fréquence le signe Ascendant change-t-il ?',
        a: 'Environ toutes les deux heures un nouveau signe se lève, et le degré lui-même avance d’environ 1° toutes les quatre minutes. C’est pourquoi les minutes comptent.',
      },
      {
        q: 'Signe Ascendant et Ascendant, est-ce la même chose ?',
        a: 'Oui. Signe Ascendant veut en général dire le signe de l’Ascendant. L’Ascendant est le degré exact ; le signe Ascendant est le signe tropical dans lequel tombe ce degré.',
      },
      {
        q: 'Pourquoi mon signe Ascendant est-il différent sur un autre site ?',
        a: 'Vérifiez le fuseau, l’heure d’été, les coordonnées, et si l’autre site est sidéral. SideraChart est tropical Placidus par défaut. Un substitut de midi produit aussi un faux Ascendant.',
      },
    ],
  },
  'moon-sign': {
    title: 'Qu’est-ce qu’un signe lunaire ?',
    excerpt:
      'Votre signe lunaire est le signe tropical occupé par la Lune à la naissance. Il change tous les deux jours et demi. L’heure compte encore pour le degré, la maison et les jours de cuspide.',
    sections: [
      {
        heading: 'Qu’est-ce qu’un signe lunaire ?',
        paragraphs: [
          'Votre signe lunaire est le signe du zodiaque tropical qui contenait la Lune à votre naissance. On le demande parce que c’est la deuxième position la plus célèbre après le Soleil, et parce qu’elle avance assez vite pour que deux personnes avec le même Soleil ne la partagent souvent pas. La Lune est une longitude comme n’importe quelle autre planète du thème natal, seulement plus rapide : environ 13° par jour, un nouveau signe tous les deux jours et demi.',
          'Dans le langage du thème, la Lune décrit les heures sans notation : l’appétit, le sommeil, ce que vous faites quand personne ne note la performance. C’est une fonction, pas une note médicale et pas un laissez-passer. SideraChart place la Lune avec le même moteur de classe VSOP87 (astronomy-engine) que le Soleil, dans le zodiaque tropical, pas sidéral.',
        ],
      },
      {
        heading: 'À quelle vitesse la Lune avance',
        paragraphs: [
          'Parce que la Lune est rapide, une heure de naissance gagne encore sa place même lorsque le signe semble évident. Le degré change d’environ un demi-degré par heure. Les aspects à la Lune se resserrent ou se desserrent au fil d’une matinée. La maison de la Lune — une fois que vous avez un Ascendant — sera fausse si l’horloge est fausse, même lorsque le signe est juste.',
          'Un jour de changement de signe, l’horloge décide du signe lui-même. Si vous êtes né un jour où la Lune a quitté le Taureau pour les Gémeaux, une heure inconnue veut dire que vous n’avez pas encore de signe lunaire. Ne choisissez pas celui que vous préférez. Calculez-le, ou marquez la lacune.',
        ],
      },
      {
        heading: 'Signe lunaire sans heure de naissance',
        paragraphs: [
          'Si vous avez une date et pas d’heure, le signe de la Lune est en général encore juste. Le degré ne l’est pas. La maison non plus, parce que les maisons exigent l’Ascendant, et l’Ascendant exige la minute. La règle de SideraChart est la même que pour le reste du thème : heure inconnue = planètes oui, maisons non. La Lune est une planète dans cette phrase.',
          'Un substitut de midi est une estimation. Il est utile pour un premier regard sur le signe un jour calme. Ce n’est pas un fait depuis lequel argumenter lorsque le degré, la maison ou une cuspide est en jeu. Préférez une heure d’acte. S’il n’y en a pas, dites que l’heure est inconnue et lisez la Lune en signe seulement.',
        ],
      },
      {
        heading: 'Lune et Soleil dans le même thème',
        paragraphs: [
          'Le Soleil est l’index mensuel que tout le monde connaît déjà. La Lune est la météo intérieure plus rapide. Ils peuvent occuper le même signe (une naissance de Nouvelle Lune) ou des signes opposés (une naissance de Pleine Lune) ou n’importe quoi entre les deux. Les aspects Soleil–Lune utilisent les orbes de SideraChart : 8° conjonction et opposition, 6° carré et trigone, 4° sextile. Un carré Soleil–Lune serré est une affirmation plus sonore que deux mèmes de signes empilés.',
          'Le Big Three place la Lune entre le Soleil et l’Ascendant. Vous pouvez connaître Soleil et Lune (en général) sans heure. Vous ne pouvez pas terminer le trio sans une. Si vous n’êtes venu que pour le signe lunaire, saisissez quand même l’heure et le lieu lorsque vous les avez, pour que le degré et les aspects soient honnêtes.',
        ],
      },
      {
        heading: 'Degré, maison et aspects',
        paragraphs: [
          'Le degré vous dit si la Lune est tôt ou tard dans le signe et à quel point elle est proche d’un aspect. La maison, avec un Ascendant connu, vous dit quel domaine de vie porte cette fonction lunaire. Les autres maisons vides n’annulent pas la Lune ; elles veulent seulement dire que la Lune ne siège pas dans ces pièces.',
          'Le calculateur de signe lunaire de SideraChart est le moteur natal filtré sur un corps. Le thème natal complet ajoute les maisons (Placidus par défaut), l’Ascendant et l’aspectaire. Les transits quotidiens à votre Lune natale sont stockés dans l’espace à midi dans le fuseau natal. C’est un ciel plus tardif, pas une réécriture de la Lune natale.',
        ],
      },
      {
        heading: 'Comment calculer votre signe lunaire',
        paragraphs: [
          'Saisissez la date de naissance, l’heure si vous l’avez, et le lieu. Lisez la ligne Lune : signe, degré, maison si l’horloge est connue. Les positions sont tropicales. Si une autre application est sidérale, la Lune peut siéger dans le signe précédent ; c’est l’écart d’ayanamsha, pas un bogue d’astronomy-engine.',
          'Ne traitez pas un signe lunaire comme un conseil financier, juridique ou médical. Utilisez-le comme une coordonnée. Si l’heure manque, gardez la coordonnée grossière : le signe seulement. Si l’heure est là, utilisez le degré et les aspects. C’est toute la méthode.',
          'Comparez avec le Soleil avant de vous arrêter. Un Soleil et une Lune dans le même signe (naissance de Nouvelle Lune) ont une texture différente d’une opposition de Pleine Lune. Les deux sont de l’astronomie ordinaire. SideraChart montrera l’orbe ; vous décidez si 6° compte encore comme sonore. Les transits lunaires plus tardifs de l’espace sont de la météo, stockée à midi natal, pas un nouveau signe lunaire.',
        ],
      },
    ],
    faq: [
      {
        q: 'Comment trouver mon signe lunaire ?',
        a: 'Calculez un thème natal à partir de la date, de l’heure et du lieu de naissance. La ligne Lune est le signe tropical. Le calculateur de signe lunaire de SideraChart utilise le même moteur que le thème complet.',
      },
      {
        q: 'Ai-je besoin d’une heure de naissance pour mon signe lunaire ?',
        a: 'En général non pour le signe. Vous avez besoin d’une heure pour le degré, la maison, et tout anniversaire où la Lune a changé de signe.',
      },
      {
        q: 'À quelle fréquence la Lune change-t-elle de signe ?',
        a: 'Environ tous les deux jours et demi. C’est pourquoi les personnes nées le même mois de signe solaire ont souvent des Lunes différentes.',
      },
      {
        q: 'Pourquoi mon signe lunaire diffère-t-il sur un site védique ?',
        a: 'Les zodiaques sidéraux mesurent depuis un zéro stellaire éloigné d’environ 24° de l’équinoxe tropical aujourd’hui. SideraChart est tropical seulement.',
      },
    ],
  },
  'venus-sign': {
    title: 'Qu’est-ce qu’un signe de Vénus ?',
    excerpt:
      'Votre signe de Vénus est le signe tropical occupé par Vénus à la naissance. Il décrit le style dans l’attraction, le goût et les valeurs — une coordonnée natale, pas un verdict amoureux.',
    sections: [
      {
        heading: 'Qu’est-ce qu’un signe de Vénus ?',
        paragraphs: [
          'Votre signe de Vénus est le signe du zodiaque tropical qui contenait Vénus à votre naissance. On cherche « qu’est-ce qu’un signe de Vénus ? » parce que l’astrologie populaire utilise Vénus comme raccourci pour le goût, l’attraction et la façon dont vous tarifez ce qui n’est pas une facture — l’art, les manières, les gens que vous gardez. Sur l’instrument, c’est une longitude planétaire, calculée comme les autres à partir de la date, de l’heure et du lieu de naissance.',
          'SideraChart place Vénus dans le zodiaque tropical avec astronomy-engine (VSOP87). Ce n’est pas une Vénus sidérale ni une heure chinoise. Le signe est la tranche de 30°. La maison, si vous avez une heure de naissance, est le domaine local. Les aspects à Vénus utilisent des orbes de 8° / 6° / 4°. Rien de cela n’est un verdict sur la poursuite d’une relation.',
        ],
      },
      {
        heading: 'Ce que Vénus mesure dans un thème natal',
        paragraphs: [
          'Vénus est l’appétit du thème pour l’harmonie, la valeur et le contact. En pratique, vous la lisez comme la façon dont vous aimez que les pièces se sentent, ce que vous appelez assez beau, et comment vous négociez la proximité. C’est descriptif. Cela ne vous dit pas qui fréquenter, s’il faut dépenser de l’argent, ni comment régler un litige. Gardez la fonction ; laissez tomber la divination.',
          'Vénus ne s’éloigne jamais beaucoup du Soleil, donc votre signe de Vénus est souvent le même que votre signe solaire ou un voisin. C’est de l’astronomie, pas un destin. Un Soleil Gémeaux avec Vénus Taureau est une scission courante : intrigue solaire dans un style, Vénus dans le précédent. Lisez les deux au lieu de les forcer en un slogan.',
        ],
      },
      {
        heading: 'Vitesse, rétrogradation et changements de signe',
        paragraphs: [
          'Vénus passe quelques semaines dans un signe en mouvement direct, plus longtemps lorsqu’elle stationne ou tourne rétrograde. Une Vénus rétrograde à la naissance est un fait natal sur le mouvement apparent, pas une malédiction et pas un trouble de la personnalité. Cela veut dire que la longitude reculait le long de l’écliptique ce jour-là. Calculez-le ; ne le dramatisez pas.',
          'Parce que Vénus est plus lente que la Lune, vous obtenez en général le bon signe à partir de la date seule. L’heure fixe encore le degré, la maison, et de quel côté d’une cuspide vous êtes. Heure inconnue : planètes oui, maisons non. N’inventez pas midi pour mettre Vénus en maison sept et traiter ensuite cette maison comme une preuve.',
        ],
      },
      {
        heading: 'Vénus et le Big Three',
        paragraphs: [
          'Soleil, Lune et Ascendant restent le premier passage. Vénus est une coordonnée de spécialiste que vous lisez après ces trois-là, sauf si Vénus est empilée sur un angle ou verrouillée dans un aspect serré avec eux. Une conjonction Vénus–Saturne dans 8° est plus sonore qu’un texte de signe de Vénus. Regardez l’aspectaire.',
          'Le signe Ascendant a encore besoin de l’horloge. Si vous n’êtes venu que pour Vénus et que vous avez une heure, saisissez-la quand même pour que maison et aspects soient réels. Le calculateur de signe de Vénus de SideraChart est le moteur natal filtré sur un glyphe. Le thème complet est le contexte qui empêche Vénus de manger toute la lecture.',
        ],
      },
      {
        heading: 'Maisons et aspects à Vénus',
        paragraphs: [
          'Avec un Ascendant connu, Vénus dans une maison nomme le domaine de vie où cette fonction d’évaluation est évidente — quatre, sept, dix, et ainsi de suite. Les maisons vides ailleurs ne sont pas des organes manquants. Placidus est le défaut de SideraChart ; Whole Sign est l’alternative lorsque vous voulez des signes égaux ou lorsque vous êtes à haute latitude.',
          'Les aspects majeurs à Vénus sont conjonction, sextile, carré, trigone et opposition. Les orbes plus serrés se lisent d’abord. Les transits à la Vénus natale vivent plus tard dans l’espace quotidien, stockés à midi dans le fuseau natal. Ces transits ne changent pas le signe natal de Vénus. C’est de la météo contre un point fixe.',
        ],
      },
      {
        heading: 'Comment trouver votre signe de Vénus',
        paragraphs: [
          'Saisissez date, heure et lieu de naissance dans SideraChart. Lisez la ligne Vénus. Comparez avec le Soleil : souvent à proximité, parfois le même. Si une application sidérale n’est pas d’accord, vous regardez un zéro différent, éloigné d’environ 24°. Passez cette application en tropical si vous voulez coller à ce site.',
          'Utilisez la position comme une coordonnée dans un thème natal, pas comme un conseil amoureux. Si l’heure est inconnue, gardez Vénus en signe et sautez la maison. Si l’heure est connue, lisez degré, maison et aspects. Puis remettez Vénus à côté du reste de la roue.',
          'Si vous lancez aussi une synastrie plus tard, les contacts de Vénus entre deux thèmes sont une autre carte. Calculez d’abord votre Vénus natale pour savoir quelle longitude les autres personnes contactent. Les milieux de composite qui incluent Vénus sont encore une troisième carte. Une coordonnée, trois instruments — ne mélangez pas les sorties.',
        ],
      },
    ],
    faq: [
      {
        q: 'Comment trouver mon signe de Vénus ?',
        a: 'Lancez un thème natal ou le calculateur de signe de Vénus de SideraChart avec votre date de naissance, et ajoutez l’heure et le lieu si vous les avez. La ligne Vénus est le signe tropical et le degré.',
      },
      {
        q: 'Vénus a-t-elle besoin d’une heure de naissance exacte ?',
        a: 'En général non pour le signe. Vous avez besoin d’une heure pour la maison, le degré exact sur une cuspide, et les aspects qui se resserrent dans la journée.',
      },
      {
        q: 'Que signifie Vénus rétrograde dans le thème natal ?',
        a: 'Cela veut dire que la longitude écliptique apparente de Vénus reculait à la naissance. Calculez-le comme un fait de mouvement. Ce n’est pas un verdict médical ou relationnel.',
      },
      {
        q: 'Pourquoi mon signe de Vénus est-il à côté de mon signe solaire ?',
        a: 'Vénus reste près du Soleil dans le ciel, donc les signes natals sont souvent les mêmes ou adjacents. C’est de la géométrie orbitale, pas un destin spécial.',
      },
    ],
  },
  'mercury-sign': {
    title: 'Qu’est-ce qu’un signe de Mercure ?',
    excerpt:
      'Votre signe de Mercure est le signe tropical occupé par Mercure à la naissance. Mercure reste près du Soleil, donc les signes coïncident ou se voisinent. L’heure fixe encore la maison et le degré.',
    sections: [
      {
        heading: 'Qu’est-ce qu’un signe de Mercure ?',
        paragraphs: [
          'Votre signe de Mercure est le signe du zodiaque tropical qui contenait Mercure à votre naissance. On le cherche parce que Mercure est la fonction langage-et-courses du thème : comment vous triez l’information, parlez, vous déplacez et changez d’avis. C’est une longitude dans le thème natal, pas une mesure d’intelligence et pas un diagnostic de l’attention.',
          'SideraChart calcule Mercure dans le zodiaque tropical à partir d’astronomy-engine (VSOP87), avec des maisons Placidus lorsqu’une heure de naissance est présente. Il n’utilise pas Swiss Ephemeris et n’offre pas de Mercure sidéral ou védique. Si une autre application n’est pas d’accord d’environ un signe, vérifiez si elle est sidérale avant de supposer une erreur.',
        ],
      },
      {
        heading: 'Mercure jamais loin du Soleil',
        paragraphs: [
          'L’orbite de Mercure le garde près du Soleil dans le ciel, donc votre signe de Mercure est en général le même que votre signe solaire ou un signe à côté. Un Soleil Lion avec Mercure Vierge est une géométrie ordinaire. Traitez cette scission comme utile : intrigue solaire dans un style, fonction de parole et de tri dans le suivant. Ne les écrasez pas en un seul mème.',
          'Parce que Mercure n’est pas aussi rapide que la Lune, la date tranche souvent le signe. L’heure compte encore pour le degré, pour les aspects qui se forment dans la journée, et pour la maison. Heure inconnue : vous pouvez garder le signe de Mercure ; vous ne pouvez pas garder une affirmation Mercure-en-maison.',
        ],
      },
      {
        heading: 'Mercure rétrograde à la naissance',
        paragraphs: [
          'Mercure stationne et tourne rétrograde trois ou quatre fois par an. Un Mercure natal rétrograde veut dire que la longitude apparente reculait sur l’écliptique à la naissance. C’est un drapeau de mouvement, pas une malédiction sur vos e-mails et pas une étiquette de trouble d’apprentissage. Calculez-le, notez-le, lisez le signe et les aspects autour.',
          'Les périodes rétrogrades veulent aussi dire que Mercure peut passer plus de temps dans un signe ou rentrer dans le précédent. Les jours de cuspide autour des stations méritent une vraie horloge. Si l’heure est inconnue à ces dates, laissez le signe non tranché plutôt que de choisir l’histoire qui vous plaît.',
        ],
      },
      {
        heading: 'Mercure, maisons et Big Three',
        paragraphs: [
          'Lisez Soleil, Lune et Ascendant d’abord, sauf si Mercure est conjoint à l’un d’eux ou empilé sur un angle. Une conjonction Mercure–Lune dans 8° colorera les deux fonctions. L’Ascendant a encore besoin de l’heure de naissance ; sans elle, sautez entièrement les maisons.',
          'Mercure dans une maison (Placidus par défaut) nomme où la fonction de tri est évidente — trois, six, dix, et ainsi de suite. Les maisons vides sont vides de planètes, pas vides de vie. Whole Sign est disponible lorsque vous voulez que chaque maison soit un signe entier depuis le signe de l’Ascendant, ou lorsque Placidus se comporte mal à haute latitude.',
        ],
      },
      {
        heading: 'Aspects à Mercure',
        paragraphs: [
          'Les aspects majeurs sont conjonction, sextile, carré, trigone et opposition. Les orbes de SideraChart sont 8° pour la conjonction et l’opposition, 6° pour le carré et le trigone, 4° pour le sextile. Des contacts serrés Mercure–Saturne ou Mercure–Uranus diront plus que le texte du signe. Utilisez le tableau sous la roue.',
          'Les transits à Mercure natal apparaissent plus tard dans l’espace quotidien, stockés à midi dans le fuseau natal pour que la note du jour ne dérive pas si vous actualisez à 23:00. Ces transits ne réécrivent pas le signe natal de Mercure. La position natale est la ligne de base.',
          'Un Mercure rétrograde en transit sur Mercure natal est une superposition temporaire, populaire dans les titres et facile à surinterpréter. Notez l’orbe, notez s’il est appliquant, puis regardez le reste des contacts lents du jour. La météo rapide de Mercure ne doit pas passer avant un transit de Saturne qui est vraiment serré.',
        ],
      },
      {
        heading: 'Comment calculer votre signe de Mercure',
        paragraphs: [
          'Utilisez le calculateur de signe de Mercure de SideraChart ou le thème natal complet. Saisissez date, heure et lieu. Lisez la ligne Mercure, puis jetez un œil au Soleil pour voir s’ils partagent un signe. Tropical seulement. Si vous avez besoin des maisons, vous avez besoin de l’horloge ; si vous n’avez pas l’horloge, arrêtez-vous au signe.',
          'Ne traitez pas Mercure comme un conseil de carrière, juridique ou médical. C’est une coordonnée pour la façon dont le thème parle et trie. Remettez-le dans la roue avec Vénus, Mars et le Big Three avant de décider que le thème a un seul thème.',
          'Lorsque vous alignez un autre site, réglez zodiaque tropical et le même fuseau de naissance. Un signe de Mercure qui saute est en général sidéral, une erreur d’horloge un jour de station, ou un raté d’histoire de fuseau — pas astronomy-engine qui échoue. Les maisons divergeront encore si un site a utilisé Whole Sign et que vous avez laissé SideraChart sur Placidus.',
        ],
      },
    ],
    faq: [
      {
        q: 'Comment trouver mon signe de Mercure ?',
        a: 'Calculez un thème natal à partir de la date, de l’heure et du lieu de naissance, ou utilisez le calculateur de signe de Mercure de SideraChart. La ligne Mercure est le signe tropical et le degré.',
      },
      {
        q: 'Pourquoi mon Mercure est-il dans le même signe que mon Soleil ?',
        a: 'Mercure ne s’éloigne jamais beaucoup du Soleil, donc les signes natals coïncident souvent ou se voisinent. Vérifiez les degrés ; ils peuvent encore aspecter d’autres planètes différemment.',
      },
      {
        q: 'Ai-je besoin d’une heure de naissance pour Mercure ?',
        a: 'En général non pour le signe. Vous avez besoin d’une heure pour la maison et pour les jours de cuspide ou de station où le signe de Mercure peut basculer.',
      },
      {
        q: 'Un Mercure natal rétrograde est-il une mauvaise chose ?',
        a: 'C’est un fait de mouvement apparent, pas un verdict. Lisez le signe, la maison et les aspects. Ce n’est pas une affirmation sur l’intelligence ou la santé.',
      },
    ],
  },
  'mars-sign': {
    title: 'Qu’est-ce qu’un signe de Mars ?',
    excerpt:
      'Votre signe de Mars est le signe tropical occupé par Mars à la naissance. Il décrit comment le thème démarre, discute et poursuit — une coordonnée natale, pas une licence pour le conflit.',
    sections: [
      {
        heading: 'Qu’est-ce qu’un signe de Mars ?',
        paragraphs: [
          'Votre signe de Mars est le signe du zodiaque tropical qui contenait Mars à votre naissance. On cherche « qu’est-ce qu’un signe de Mars ? » parce que les textes populaires traitent Mars comme du carburant : comment vous démarrez, rivalisez, désirez et vous mettez en colère. Sur l’instrument, c’est une longitude planétaire dans un thème natal, calculée à partir de la date, de l’heure et du lieu de naissance. Ce n’est pas un laissez-passer pour la cruauté et ce n’est pas une lecture médicale du sang ou des muscles.',
          'SideraChart place Mars dans le zodiaque tropical avec astronomy-engine (VSOP87). Les maisons, lorsque l’horloge est connue, sont Placidus par défaut. Les systèmes sidéraux et chinois sont hors champ. Si une application védique montre un autre signe de Mars, vous regardez un autre zéro, pas une autre planète.',
        ],
      },
      {
        heading: 'Ce que Mars décrit dans le thème',
        paragraphs: [
          'Mars est la fonction d’initiative et de combat : la chaleur, la poursuite, le premier geste dans un conflit, la volonté de se frayer un chemin. Vous lisez le signe comme le style de cette chaleur — direct, lent, tactique, théâtral — et la maison comme le domaine où elle se montre. Restez descriptif. Ne l’utilisez pas pour justifier un préjudice ni pour prédire la violence.',
          'Mars peut siéger loin du Soleil, contrairement à Mercure et Vénus, donc votre signe de Mars est souvent différent de votre signe solaire. Cette scission est ordinaire. Un Soleil Taureau avec Mars Bélier n’est pas une contradiction. Ce sont deux fonctions avec deux styles. Lisez les deux, puis consultez le tableau des aspects avant de classer l’un ou l’autre.',
        ],
      },
      {
        heading: 'Vitesse, rétrogradation et heure de naissance',
        paragraphs: [
          'Mars passe à peu près six à sept semaines dans un signe en mouvement direct, plus longtemps autour de la rétrogradation. Un Mars natal rétrograde veut dire que la longitude apparente reculait à la naissance. Notez-le comme un mouvement. Ne le traitez pas comme un défaut de caractère.',
          'La date tranche en général le signe. L’heure fixe encore le degré, les aspects dans la journée, et la maison. Heure inconnue : planètes oui, maisons non. Un thème de midi qui parque Mars sur un angle est une estimation. Si vous tenez à « Mars en maison un », vous avez besoin d’un vrai Ascendant, donc d’une vraie horloge.',
        ],
      },
      {
        heading: 'Mars, le Big Three et les autres planètes',
        paragraphs: [
          'Lisez Soleil, Lune et Ascendant d’abord, sauf si Mars est conjoint à l’un d’eux ou assis sur l’Ascendant ou le Milieu du Ciel. Un carré Mars–Lune dans 6° parlera plus fort qu’un paragraphe de signe de Mars. L’Ascendant exige encore l’heure et le lieu de naissance.',
          'Les contacts Mars–Vénus et Mars–Saturne sont faciles à trop raconter. Utilisez l’aspectaire de SideraChart et les orbes indiqués : 8° conjonction et opposition, 6° carré et trigone, 4° sextile. Le serré d’abord. Les contacts larges en bord d’orbe sont plus calmes. Les lignes colorées de la roue correspondent au tableau.',
        ],
      },
      {
        heading: 'Maisons et transits plus tardifs',
        paragraphs: [
          'Avec un Ascendant connu, Mars dans une maison nomme où la fonction d’initiative est évidente. Les maisons vides ne veulent pas dire que ce domaine de vie vous manque ; elles veulent dire qu’aucune planète n’est assise dans cette pièce. Placidus est le défaut parce que la plupart des textes occidentaux le supposent. Whole Sign est plus propre aux hautes latitudes et lorsque vous voulez signe = maison.',
          'Les transits à Mars natal sont une météo plus tardive. L’espace de SideraChart stocke la superposition du jour à midi dans le fuseau natal. Un carré de Mars en transit à Mars natal est un contact temporaire, pas une réécriture du signe natal de Mars. Gardez la ligne de base et la météo dans des tiroirs différents.',
          'Le retour de Mars — Mars en transit de retour sur le degré natal — est un cycle d’environ deux ans, pas une remise à zéro de la personnalité. Si vous le suivez dans l’espace, vous suivez un contact qui se répète, pas un nouveau thème natal. Les jours manqués restent manqués ; le produit n’invente pas un retour que vous n’avez pas ouvert.',
        ],
      },
      {
        heading: 'Comment trouver votre signe de Mars',
        paragraphs: [
          'Utilisez le calculateur de signe de Mars ou le thème natal complet sur SideraChart. Saisissez date, heure et lieu. Lisez la ligne Mars, puis les aspects. Tropical seulement. Alignez les autres sites en les réglant sur tropical plus Placidus si vous voulez les mêmes maisons.',
          'Remettez Mars dans le thème. Un signe de Mars sans Soleil, Lune, Ascendant et le reste est une note de spécialiste. Calculez-le avec soin, puis lisez-le comme une fonction parmi dix corps, pas comme la personne entière.',
          'Si l’heure est inconnue, vous pouvez encore citer le signe de Mars et les aspects planète à planète. Vous ne pouvez pas citer Mars sur l’Ascendant ou en maison dix. Écrivez la limite sur la même page que le signe pour ne pas réintroduire plus tard un langage de maisons.',
        ],
      },
    ],
    faq: [
      {
        q: 'Comment trouver mon signe de Mars ?',
        a: 'Calculez un thème natal ou utilisez le calculateur de signe de Mars de SideraChart avec la date, l’heure et le lieu de naissance. La ligne Mars est le signe tropical et le degré.',
      },
      {
        q: 'Ai-je besoin d’une heure de naissance pour mon signe de Mars ?',
        a: 'En général non pour le signe. Vous avez besoin d’une heure pour la maison, pour une cuspide, et pour toute affirmation que Mars siège sur un angle.',
      },
      {
        q: 'Que signifie Mars natal rétrograde ?',
        a: 'Un mouvement apparent vers l’arrière le long de l’écliptique à la naissance. Enregistrez-le comme un drapeau de mouvement et lisez le signe et les aspects. Ce n’est pas un verdict sur la colère ou la santé.',
      },
      {
        q: 'Pourquoi mon signe de Mars diffère-t-il de mon signe solaire ?',
        a: 'Mars peut être n’importe où sur l’écliptique par rapport au Soleil au fil de son cycle de deux ans. Des signes différents sont normaux. Lisez les deux positions.',
      },
    ],
  },
  'why-birth-time-matters': {
    title: 'Pourquoi l’heure de naissance compte-t-elle pour un thème natal ?',
    excerpt:
      'L’heure de naissance fixe l’Ascendant, les maisons et le degré de la Lune. Une erreur de vingt minutes peut changer le signe Ascendant. Sans heure, vous obtenez les signes planétaires, pas les maisons.',
    sections: [
      {
        heading: 'Pourquoi l’heure de naissance compte-t-elle pour un thème natal ?',
        paragraphs: [
          'L’heure de naissance compte parce que deux horloges différentes se cachent dans un horodatage civil. La première convertit votre heure locale en Temps universel pour que les longitudes planétaires soient justes. La seconde, avec latitude et longitude, fixe le temps sidéral local — quel degré de l’écliptique se levait, lequel culminait, et où tombent les cuspides des maisons. On demande « pourquoi l’heure de naissance compte-t-elle ? » lorsqu’on a un anniversaire mais pas une minute. La réponse courte : les planètes survivent en grande partie ; le cadre local, non.',
          'SideraChart utilise les règles de fuseaux IANA en vigueur à cette date, y compris l’heure d’été historique, puis lit les positions tropicales dans astronomy-engine (VSOP87). Un mauvais fuseau est aussi dommageable qu’une mauvaise minute. Une naissance listée 14:00 avec le mauvais décalage est un autre ciel et un autre Temps universel.',
        ],
      },
      {
        heading: 'L’Ascendant avance d’environ un degré toutes les quatre minutes',
        paragraphs: [
          'Le signe Ascendant est un degré d’horizon. Il parcourt à peu près 1° en quatre minutes, un nouveau signe en environ deux heures. Une erreur de vingt minutes, c’est environ cinq degrés, et cela peut basculer le signe près d’une frontière. Ce n’est pas une sensibilité mystique. C’est la Terre qui tourne.',
          'Si votre signe Ascendant est faux, les maisons Placidus le sont avec lui, parce que la maison I commence à l’Ascendant. Chaque phrase planète-en-maison se décale alors. C’est la raison principale de soigner l’horloge même lorsque le signe solaire est évident.',
        ],
      },
      {
        heading: 'Les maisons dépendent du temps sidéral local',
        paragraphs: [
          'Les maisons sont des secteurs du ciel local, pas des signes. Les signes sont 30° du zodiaque tropical. Les maisons, c’est ce que vous obtenez lorsque vous divisez l’espace autour de l’horizon et du méridien. Placidus, le défaut de SideraChart, divise le temps d’ascension, donc les maisons sont inégales. Whole Sign donne à chaque maison un signe entier à partir du signe de l’Ascendant.',
          'Sans heure de naissance, il n’y a pas d’Ascendant honnête et donc pas de maisons honnêtes. Heure inconnue = planètes oui, maisons non. SideraChart suit cette règle au lieu de vous parquer silencieusement à midi. Midi est une convention pour certains thèmes historiques ; ce n’est pas votre Ascendant.',
        ],
      },
      {
        heading: 'Le degré de la Lune et d’autres faits rapides',
        paragraphs: [
          'La Lune avance d’environ un demi-degré par heure. Sur une journée, cela fait plusieurs degrés — assez pour changer des aspects et, un jour de changement de signe, le signe lunaire lui-même. Mercure, Vénus et le Soleil peuvent aussi siéger sur une cuspide. Les planètes externes bougent à peine en un jour ; leurs signes sont sûrs sans heure.',
          'Les aspects entre planètes existent encore sans maisons. SideraChart listera les aspects majeurs dans les orbes de 8° / 6° / 4° à partir des longitudes planétaires même lorsque l’Ascendant est omis. Ce que vous perdez, c’est tout ce qui a besoin d’un angle : signe Ascendant, cuspides de maisons, planètes au Milieu du Ciel.',
        ],
      },
      {
        heading: 'Actes, mémoire et heures arrondies',
        paragraphs: [
          'Préférez un acte de naissance ou un dossier d’hôpital à une histoire. Les proches arrondissent. « Vers six heures » peut vouloir dire 17:40. Recalculez une plage si l’heure est approximative et voyez si l’Ascendant tient. S’il ne tient pas, vous n’avez pas encore de signe Ascendant.',
          'Ne rectifiez pas une heure pour coller à une biographie dans ce calculateur. SideraChart n’inventera pas une minute pour que la maison dix ressemble à votre titre de poste. Si l’heure est inconnue, marquez-la inconnue. Lisez les planètes en signes et les aspects. Laissez les maisons pour un jour où vous aurez une horloge.',
          'Les dossiers d’hôpital battent les estimations de baptême. Une heure écrite 16 h 30 vaut mieux que « fin d’après-midi ». Si le document utilise une ancienne heure locale moyenne, dites-le lorsque vous comparez avec un autre site ; la conversion IANA suppose le fuseau civil de cette date, c’est ce que SideraChart applique.',
        ],
      },
      {
        heading: 'Que saisir sur SideraChart',
        paragraphs: [
          'Date, heure, lieu. Le lieu est cherché en coordonnées ; l’heure est convertie avec IANA ; les planètes viennent d’éphémérides de classe VSOP87 ; les maisons sont Placidus par défaut. Si l’heure manque, utilisez l’option heure inconnue. Vous obtenez encore un thème planétaire utilisable. Vous n’obtenez pas de signe Ascendant.',
          'Plus tard, l’espace quotidien stocke les transits à midi dans le fuseau natal. Ce midi est un instantané stable pour les transits, pas un substitut à une heure de naissance manquante. Votre Ascendant natal a encore besoin de la vraie minute. Ne mélangez pas ces deux midis.',
          'Si des proches vous donnent deux heures à une heure d’écart, calculez les deux et comparez les Ascendants. Si le signe tient, vous avez un signe Ascendant de travail avec une plage de degrés. S’il bascule, vous n’en avez pas encore. Publiez la plage, pas une fausse précision de 14:00:00.',
        ],
      },
    ],
    faq: [
      {
        q: 'Que se passe-t-il si mon heure de naissance est fausse ?',
        a: 'Les signes planétaires survivent en général. L’Ascendant, les maisons et le degré de la Lune peuvent ne pas. Une erreur de vingt minutes peut changer le signe Ascendant près d’une cuspide.',
      },
      {
        q: 'Un thème natal de midi est-il exact ?',
        a: 'Il peut estimer les signes planétaires un jour calme. Ce n’est pas un Ascendant ni un système de maisons exacts. SideraChart traite l’heure inconnue comme des planètes seulement.',
      },
      {
        q: 'Le lieu de naissance compte-t-il autant que l’heure ?',
        a: 'Pour l’Ascendant et les maisons, oui : latitude et longitude fixent l’horizon. Pour les signes planétaires, le lieu compte à peine. Les erreurs de fuseau comptent pour les deux.',
      },
      {
        q: 'Puis-je utiliser 12:00 si je ne connais pas l’heure ?',
        a: 'Vous pouvez comme esquisse pour les signes. N’en lisez pas les maisons ni l’Ascendant. Marquez l’heure inconnue sur SideraChart plutôt que de prétendre que midi est un fait.',
      },
    ],
  },
  'birth-chart-without-time': {
    title: 'Peut-on faire un thème natal sans heure de naissance ?',
    excerpt:
      'Oui : les signes planétaires et les aspects se calculent encore sans heure de naissance. L’Ascendant et les maisons, non. Ne traitez pas un thème de midi comme une carte natale complète des maisons.',
    sections: [
      {
        heading: 'Peut-on faire un thème natal sans heure de naissance ?',
        paragraphs: [
          'Oui, avec une limite claire. Sans heure de naissance, vous pouvez encore calculer les longitudes planétaires à partir de la date (et d’un fuseau/lieu pour le Temps universel). Cela vous donne le Soleil jusqu’à Pluton en signes tropicaux, et les aspects majeurs entre eux. Vous ne pouvez pas calculer un Ascendant, un Milieu du Ciel ou des cuspides de maisons fiables. Le thème natal honnête sans heure est un thème planétaire, pas une roue complète de maisons.',
          'SideraChart vous laisse marquer l’heure comme inconnue, puis renvoie les planètes tout en omettant le signe Ascendant. C’est le bon produit. Beaucoup de sites utilisent silencieusement 12:00 et dessinent quand même des maisons. Ces maisons appartiennent à qui est né à midi, ce qui n’est pas un fait à votre sujet.',
        ],
      },
      {
        heading: 'Ce que vous obtenez encore : les signes planétaires',
        paragraphs: [
          'Le Soleil, Mercure, Vénus, Mars et les planètes externes bougent assez lentement pour qu’une date calendaire verrouille en général le signe. Les aspects entre ces corps sont aussi utilisables, avec les orbes de SideraChart de 8° conjonction et opposition, 6° carré et trigone, 4° sextile. Vous pouvez lire beaucoup d’un thème ainsi : équilibre des éléments, un stellium dans un signe, un carré serré de Saturne au Soleil.',
          'Le lieu aide encore, parce que le fuseau et l’heure d’été convertissent la date en Temps universel. Une naissance près de minuit peut techniquement tomber sur la date voisine en TU. Si vous connaissez la ville mais pas la minute, saisissez le lieu et l’heure inconnue plutôt qu’une fausse horloge.',
        ],
      },
      {
        heading: 'Ce que vous perdez : Ascendant et maisons',
        paragraphs: [
          'L’Ascendant est un degré d’horizon. Il a besoin de la minute. Les maisons en Placidus commencent là. Les maisons Whole Sign ont aussi besoin du signe de l’Ascendant. Pas d’heure, pas de maisons — pas « des maisons approximatives ». Heure inconnue = planètes oui, maisons non. Intégrez cette phrase et vous éviterez le plus mauvais thème natal courant sur internet.',
          'Sans maisons, vous ne pouvez pas dire honnêtement qu’une planète est en maison dix, ou que vous avez une septième vide. Ces affirmations sont locales. Vous pouvez encore dire que la planète est en Capricorne, ou que deux planètes sont en opposition. Restez sur l’écliptique jusqu’à avoir une horloge.',
        ],
      },
      {
        heading: 'La Lune un jour de changement de signe',
        paragraphs: [
          'La Lune est l’exception qui pique. Elle change de signe tous les deux jours et demi. Si elle n’a pas changé le jour de votre naissance, le signe est en général sûr sans heure. Si elle a changé, vous n’avez pas de signe lunaire tant que vous n’avez pas d’horloge. Ne choisissez pas la Lune que vous aimez davantage.',
          'Même un jour de Lune calme, le degré est incertain de plusieurs degrés sur vingt-quatre heures. Les aspects qui siègent près de la limite d’orbe — 8°, 6°, 4° — peuvent être dedans ou dehors selon l’heure. Traitez les aspects lunaires en bord d’orbe comme provisoires lorsque l’heure est inconnue.',
        ],
      },
      {
        heading: 'Pourquoi midi est une estimation, pas un thème',
        paragraphs: [
          'Midi est populaire parce que c’est le milieu du jour civil et parce que certaines éphémérides historiques listaient les positions quotidiennes à midi. C’est encore une heure précise. Elle produit un Ascendant précis pour cette latitude. L’utiliser comme substitut de « inconnu » cache l’incertitude au lieu de la nommer.',
          'Si vous devez esquisser, calculez les planètes à midi et ignorez la roue des maisons. Le chemin heure inconnue de SideraChart fait cet étiquetage pour vous. Les naissances polaires ont un second problème : les cuspides Placidus se cassent au-dessus d’environ 66° de latitude même avec une heure parfaite. C’est une limite de système de maisons, pas une raison d’inventer une horloge.',
        ],
      },
      {
        heading: 'Comment utiliser SideraChart sans heure',
        paragraphs: [
          'Saisissez date et lieu, marquez l’heure inconnue, lisez le tableau des planètes. Sautez les outils d’ascendant. Sautez toute phrase qui a besoin d’une maison. Vous pouvez encore utiliser les calculateurs de signe planétaire pour Soleil, Lune (en général), Mercure, Vénus et Mars. Zodiaque tropical, VSOP87 via astronomy-engine, pas Swiss Ephemeris, pas sidéral.',
          'Les aspects entre les planètes restent de bonne guerre. Classez-les par orbe de la même façon : 8° conjonction et opposition, 6° carré et trigone, 4° sextile. Un carré Soleil–Saturne serré sans maisons est encore un carré Soleil–Saturne serré. Ce que vous ne devez pas faire, c’est l’attacher à « carrière de maison dix » tant que l’Ascendant n’existe pas.',
          'Si une heure surgit plus tard — un acte, une note de sage-femme — recalculez et alors, et seulement alors, lisez les maisons. L’instantané de midi de l’espace quotidien pour les transits est un autre midi : il stocke le ciel d’aujourd’hui contre un thème natal enregistré. Il ne comble pas une minute de naissance manquante. Gardez ces tâches séparées.',
          'Vous pouvez encore enregistrer un thème planétaire seulement. La couche rédigée sera plus mince parce que les phrases de maisons tombent. C’est préférable à un rapport épais bâti sur des cuspides de midi. Lorsque l’horloge arrive, recalculez une fois et remplacez le thème enregistré plutôt que d’empiler deux roues contradictoires.',
        ],
      },
    ],
    faq: [
      {
        q: 'Puis-je dresser un thème natal avec seulement une date de naissance ?',
        a: 'Vous pouvez dresser les signes planétaires et les aspects. Vous ne pouvez pas dresser un Ascendant ou des maisons fiables. SideraChart marque cette limite lorsque l’heure est inconnue.',
      },
      {
        q: 'Une heure de naissance 12:00 convient-elle si je ne connais pas la vraie heure ?',
        a: 'Seulement comme esquisse pour les planètes lentes. N’en lisez pas le signe Ascendant ni les maisons. Préférez l’option heure inconnue.',
      },
      {
        q: 'Mon signe lunaire sera-t-il juste sans heure ?',
        a: 'En général, sauf si la Lune a changé de signe le jour de votre naissance. Le degré et la maison ne seront pas justes sans horloge.',
      },
      {
        q: 'Que lire d’abord si je n’ai pas d’heure de naissance ?',
        a: 'Les signes planétaires, surtout Soleil, Lune si elle est sûre, Mercure, Vénus, Mars, et les aspects les plus serrés. Laissez les maisons jusqu’à avoir une heure.',
      },
    ],
  },
  'how-to-read-a-natal-chart': {
    title: 'Comment lire un thème natal',
    excerpt:
      'Lisez un thème natal dans l’ordre : Big Three, maisons occupées, puis aspects les plus serrés. Utilisez les tableaux comme instrument. Heure inconnue : sautez les maisons et l’Ascendant.',
    sections: [
      {
        heading: 'Comment lire un thème natal',
        paragraphs: [
          'Un thème natal est plus facile si vous refusez de tout lire d’un coup. Commencez par le Big Three — Soleil, Lune, Ascendant — puis les maisons qui contiennent vraiment des planètes, puis les aspects majeurs les plus serrés. La roue est une carte. Les tableaux sont l’instrument. Les chiffres d’abord : signe, degré, maison, orbe. Le texte ensuite. Cet ordre vous empêche de vous noyer dans douze essais de signes avant de savoir quelles pièces sont occupées.',
          'Vous avez besoin de la date, de l’heure et du lieu de naissance pour la méthode complète. Si l’heure est inconnue, laissez tomber l’Ascendant et les maisons et lisez les planètes en signes plus les aspects. SideraChart suit cette scission. Ne contournez pas une horloge manquante en prétendant que midi est une donnée. Écrivez la lacune sur la page.',
        ],
      },
      {
        heading: 'Commencez par Soleil, Lune et Ascendant',
        paragraphs: [
          'Le Soleil est l’intrigue diurne, d’après la date. La Lune est la météo intérieure plus rapide ; vérifiez si elle a changé de signe ce jour-là. L’Ascendant est l’horizon est et n’existe qu’avec une heure. Lisez si les trois riment ou se disputent. Puis regardez les aspects entre eux avec les orbes de 8° / 6° / 4°.',
          'Si vous n’avez que le Soleil, vous ne savez pas encore lire le thème ; vous connaissez une coordonnée. La roue de SideraChart place ces trois glyphes où vous pouvez les voir avant de chasser des astéroïdes ou des points hypothétiques que ce site n’utilise pas.',
        ],
      },
      {
        heading: 'Puis lisez les maisons occupées',
        paragraphs: [
          'Les maisons sont des domaines locaux. Une planète en dix n’est pas la même que cette planète en quatre, même dans le même signe. Listez les maisons qui contiennent des corps. Ce sont les pièces sonores. Les maisons vides ne sont pas des défauts ; ce sont des pièces sans planète assise dedans. Il y a un article à part pour cela.',
          'SideraChart est Placidus par défaut parce que la plupart des textes occidentaux le supposent. Whole Sign est l’autre grille. Les latitudes polaires au-dessus d’environ 66° ne doivent pas forcer des cuspides Placidus cassées. Si l’heure est inconnue, sautez toute cette étape. Un langage planète-en-maison sans Ascendant est une fiction.',
        ],
      },
      {
        heading: 'Puis lisez les aspects les plus serrés',
        paragraphs: [
          'Les aspects sont des angles nommés : conjonction, sextile, carré, trigone, opposition. Classez par orbe, le plus serré d’abord. Une conjonction Soleil–Saturne de 0,4° passe avant un trigone de Mars de 7,8°. SideraChart dessine les cinq majeurs et liste appliquant ou séparant dans le tableau. Cachez les lignes sur la roue si le dessin est bruyant ; le tableau reste.',
          'Ne moralisez pas les aspects. Les carrés sont un frottement qui construit un métier si vous y restez ; ce ne sont pas des malédictions. Les trigones sont une aisance qui peut devenir paresse. Les conjonctions fusionnent des fonctions. Les oppositions polarisent. Gardez la géométrie. Laissez tomber « l’univers veut ».',
        ],
      },
      {
        heading: 'Roue, tableaux et couche rédigée',
        paragraphs: [
          'L’anneau extérieur, ce sont les signes. Les divisions intérieures, les maisons. Les glyphes siègent sur des longitudes. Les lignes colorées sont des aspects. Ouvrez une ligne de tableau pour le signe, la maison et le degré exacts. Les cartes rédigées sous un thème enregistré sont une couche d’interprétation en cache, pas un modèle de langue en direct qui invente une nouvelle physique.',
          'Un export PNG est un instantané à partager. Les tableaux en direct sont ce que vous relisez. Si un autre site n’est pas d’accord, alignez zodiaque tropical, Placidus et le même fuseau de naissance avant de blâmer les éphémérides. SideraChart utilise astronomy-engine (VSOP87), pas Swiss Ephemeris. Des écarts de quelques minutes d’arc sont attendus ; un signe entier veut en général dire un réglage sidéral ou une mauvaise horloge.',
        ],
      },
      {
        heading: 'Un ordre de travail sur SideraChart',
        paragraphs: [
          'Calculez le thème. Confirmez date, heure, lieu, tropical, Placidus. Lisez Soleil, Lune, Ascendant. Balayez les maisons occupées. Classez les aspects par orbe. Seulement ensuite ouvrez le texte signe par signe. Enregistrez le thème si vous voulez le rapport et l’espace quotidien. Les transits dans l’espace sont stockés à midi natal ; c’est une étape plus tardive, pas l’étape un de la lecture natale.',
          'Gardez d’abord une note de travail de trois faits seulement : le Big Three, la maison la plus occupée, l’aspect le plus serré. C’est une lecture de thème natal que vous pouvez vraiment finir. Étendez aux maîtres des maisons vides et aux transits lents après que ces trois faits sont stables.',
          'Arrêtez-vous avant les conclusions médicales, juridiques ou financières. La méthode est : coordonnées, puis structure, puis langage prudent. Si vous sautez les coordonnées, vous lisez une chronique d’horoscope, pas un thème natal.',
          'Relisez le même thème une semaine plus tard dans le même ordre. La roue ne change pas ; votre œil, si. Si un nouveau détail apparaît, vérifiez-le contre le tableau. S’il n’existe pas dans les chiffres, il n’est pas dans le thème natal, si attrayante que soit la phrase.',
        ],
      },
    ],
    faq: [
      {
        q: 'Que regarder d’abord dans un thème natal ?',
        a: 'Soleil, Lune et Ascendant, puis les maisons occupées, puis les aspects les plus serrés. Laissez les maisons vides et les points mineurs pour plus tard.',
      },
      {
        q: 'Comment lire un thème natal sans heure de naissance ?',
        a: 'Lisez seulement les signes planétaires et les aspects. Sautez l’Ascendant et toutes les affirmations de maisons. SideraChart omet l’Ascendant lorsque l’heure est inconnue.',
      },
      {
        q: 'Est-ce que je lis d’abord les signes ou les maisons ?',
        a: 'Les signes vous disent le style ; les maisons vous disent le domaine. Après le Big Three, listez les maisons occupées, puis combinez : « Mars en Bélier en maison dix » est les deux.',
      },
      {
        q: 'Quels orbes dois-je utiliser pour lire les aspects ?',
        a: 'SideraChart utilise 8° pour la conjonction et l’opposition, 6° pour le carré et le trigone, 4° pour le sextile. Les orbes plus serrés d’abord.',
      },
    ],
  },
  'houses-in-a-birth-chart': {
    title: 'Que sont les maisons dans un thème natal ?',
    excerpt:
      'Les maisons sont douze secteurs locaux du ciel de naissance, pas des signes du zodiaque. Elles ont besoin d’une heure de naissance. SideraChart est Placidus par défaut ; heure inconnue veut dire pas de maisons honnêtes.',
    sections: [
      {
        heading: 'Que sont les maisons dans un thème natal ?',
        paragraphs: [
          'Les maisons sont douze secteurs du ciel tels qu’on les voit depuis le lieu de naissance à l’instant de la naissance. Ce ne sont pas des signes. Les signes sont des tranches de 30° du zodiaque tropical le long de l’écliptique. Les maisons sont un cadre local : quelle partie de ce ciel se levait, culminait, se couchait. Le signe d’une planète est son style. La maison d’une planète est le domaine de vie où ce style est facile à repérer.',
          'Vous ne pouvez pas avoir de maisons sans heure de naissance, parce que le cadre est lié à l’horizon. Heure inconnue = planètes oui, maisons non. Les gens qui publient des lectures de maisons à partir d’un substitut de midi décrivent midi, pas une minute inconnue. SideraChart ne fait pas cela par défaut.',
        ],
      },
      {
        heading: 'Les maisons sont locales ; les signes sont zodiacaux',
        paragraphs: [
          'Deux personnes peuvent partager un Soleil en Capricorne et ne pas partager une maison dix. La maison du Soleil dépend de l’Ascendant, qui dépend de l’heure et du lieu. C’est pourquoi le langage des maisons paraît plus « biographique » que celui des signes, et pourquoi il est plus fragile. Si l’horloge est fausse, la biographie que vous venez d’écrire est accrochée aux mauvaises pièces.',
          'Lisez-les ensemble lorsque vous avez les deux : « Vénus en Taureau en deux » est une autre phrase que « Vénus en Taureau en huit ». Même signe, autre domaine. Si vous n’avez que le signe, arrêtez-vous au signe.',
        ],
      },
      {
        heading: 'Placidus est le défaut sur SideraChart',
        paragraphs: [
          'Placidus divise le temps d’ascension plutôt que des tranches égales d’espace, donc les maisons sont inégales. SideraChart l’utilise par défaut parce que la plupart des interprétations occidentales publiées supposent Placidus. Whole Sign est disponible : la maison I est tout le signe qui contient l’Ascendant, puis les signes suivants dans l’ordre. Ni l’un ni l’autre n’est la pratique sidérale védique ; tous deux ici reposent sur des longitudes tropicales d’astronomy-engine (VSOP87).',
          'Au-dessus d’environ 66° de latitude, les cuspides Placidus peuvent échouer. Pour ces naissances, Whole Sign est la grille la plus honnête. Les positions planétaires sont calculées dans les deux cas. Si un site n’est pas d’accord avec vos maisons, vérifiez le système de maisons avant l’éphéméride. Swiss Ephemeris n’est pas dans cette pile ; un décalage de système est le coupable habituel.',
        ],
      },
      {
        heading: 'Angulaires, succécentes et cadentes',
        paragraphs: [
          'Les maisons 1, 4, 7 et 10 sont angulaires — liées à l’horizon et au méridien, historiquement les plus sonores. 2, 5, 8 et 11 sont succécentes. 3, 6, 9 et 12 sont cadentes. C’est un indice de volume, pas un classement moral. Un tas de planètes en douze est sonore même si les manuels appellent la douze cadente.',
          'Les sujets traditionnels des maisons (soi, argent, fratrie, foyer, et ainsi de suite) sont un vocabulaire, pas un contrat. Utilisez-les comme étiquettes de domaines, puis regardez quelles planètes les occupent vraiment. N’inventez pas d’événements pour remplir une maison qui se trouve être vide.',
        ],
      },
      {
        heading: 'Cuspides, interceptions et hautes latitudes',
        paragraphs: [
          'En Placidus, une cuspide de maison est le degré de frontière. Une planète près d’une cuspide est un jugement ; ce site ne la déplace pas en secret vers la maison suivante pour vous. Les signes interceptés — un signe avalé dans une maison sans cuspide — arrivent aux latitudes plus hautes lorsque les maisons s’étirent. Whole Sign évite cette géométrie en liant les maisons aux signes.',
          'Si votre naissance est polaire, ne torturez pas Placidus. Changez de système. Si votre heure de naissance est arrondie, recalculez une plage et voyez si des planètes changent de maison. Si oui, ces affirmations de maisons sont provisoires.',
          'Nominatim d’OpenStreetMap fournit les coordonnées que SideraChart utilise pour le lieu. Une épingle centre-ville n’est pas une épingle d’hôpital ; pour les maisons la différence est en général petite, mais à haute latitude ou près d’une cuspide elle peut compter. Préférez la vraie ville de naissance à une ville d’adoption plus tardive.',
        ],
      },
      {
        heading: 'Comment lire les maisons sur la roue',
        paragraphs: [
          'Sur SideraChart, les divisions intérieures sont les maisons, comptées depuis l’Ascendant à gauche. Les glyphes siègent sur la longitude écliptique ; le tableau vous dit dans quel numéro de maison cette longitude est tombée. Les aspects restent sur l’écliptique (orbes 8° / 6° / 4°) et ne se soucient pas des murs de maisons. Les murs de maisons se soucient de l’horloge.',
          'Enregistrez le thème pour garder le système de maisons avec le rapport. Les transits quotidiens dans l’espace sont calculés à midi natal contre ce cadre natal. Les planètes en transit à travers les maisons n’ont de sens que si les maisons natales étaient réelles pour commencer — ce qui, encore, veut dire que vous aviez une heure de naissance.',
          'Si vous passez de Placidus à Whole Sign après l’enregistrement, recalculez plutôt que de faire glisser les glyphes dans votre tête. La planète n’a pas bougé ; les murs, si. Notez le système sur toute capture que vous partagez pour qu’une comparaison plus tardive ne soit pas un faux désaccord.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quelle est la différence entre signes et maisons ?',
        a: 'Les signes sont 30° du zodiaque tropical. Les maisons sont douze secteurs locaux depuis votre horizon de naissance. Les signes ont besoin d’une date ; les maisons ont besoin d’une heure et d’un lieu.',
      },
      {
        q: 'Quel système de maisons dois-je utiliser ?',
        a: 'Placidus est le défaut de SideraChart et correspond à la plupart des textes occidentaux. Utilisez Whole Sign aux hautes latitudes ou si vous voulez un signe par maison.',
      },
      {
        q: 'Puis-je lire les maisons sans heure de naissance ?',
        a: 'Non. Sans Ascendant, le cadre des maisons n’est pas défini. Vous pouvez encore lire les signes planétaires et les aspects.',
      },
      {
        q: 'Pourquoi mes maisons diffèrent-elles sur un autre site ?',
        a: 'Système de maisons différent, fuseau différent, ou zodiaque sidéral. Réglez l’autre site sur tropical Placidus et les mêmes coordonnées avant de comparer.',
      },
    ],
  },
  'empty-houses': {
    title: 'Que sont les maisons vides dans un thème natal ?',
    excerpt:
      'Une maison vide n’a aucune planète assise dedans. Ce n’est pas un domaine de vie manquant. Vous avez encore besoin d’une heure de naissance pour savoir quelles maisons sont vides ; les thèmes de midi falsifient les lacunes.',
    sections: [
      {
        heading: 'Que sont les maisons vides dans un thème natal ?',
        paragraphs: [
          'Une maison vide est une maison sans planète natale à l’intérieur. C’est toute la définition. Ce n’est pas un trou dans votre vie, pas un organe manquant, et pas une prédiction que rien n’arrivera dans ce domaine. Dix corps (Soleil jusqu’à Pluton plus la Lune) ne peuvent pas occuper douze pièces à la fois. La plupart des thèmes ont des maisons vides. Si le vôtre n’en avait pas, vous auriez une roue très encombrée.',
          'Vous ne savez quelles maisons sont vides que si vous connaissez le cadre des maisons, donc si vous connaissez l’heure de naissance. Heure inconnue = planètes oui, maisons non — y compris le langage des maisons vides. Un thème de midi peut montrer des maisons « vides » qui se rempliraient ou se videraient à 04:00. N’interprétez pas de fausses lacunes.',
        ],
      },
      {
        heading: 'Vide ne veut pas dire inactif',
        paragraphs: [
          'La vie continue dans des sujets qui n’ont pas de planète sur la cuspide. La lecture traditionnelle regarde encore le signe sur la cuspide de la maison et la planète qui gouverne ce signe. C’est une méthode plus longue. La méthode courte sur ce site : les maisons occupées sont plus sonores parce qu’une planète y est assise ; les maisons vides sont plus calmes sur la roue, pas absentes de la biographie.',
          'Ne remplissez pas une maison vide avec de la peur. On cherche « que sont les maisons vides dans un thème natal ? » parce que des textes en ligne les traitent comme des défauts. C’est un problème d’encombrement dans les autres pièces, pas une malédiction sur les vides.',
        ],
      },
      {
        heading: 'La maîtrise compte encore',
        paragraphs: [
          'Si la maison sept est vide mais que sa cuspide est en Balance, Vénus a encore son mot comme maître traditionnel. Vous trouverez Vénus ailleurs dans le thème — peut-être en deux, peut-être conjointe à Saturne. Cette position est la façon dont la maison vide « parle » sans résident. C’est de la structure, pas du mysticisme.',
          'Les tableaux de SideraChart listent les planètes en maisons. Ils ne cachent pas les maisons vides ; ils n’y ont simplement pas de glyphe. Regardez le signe de cuspide dans la roue si vous voulez le maître. Les aspects (orbes 8° / 6° / 4°) peuvent aussi lier une planète à des sujets associés à une maison qu’elle n’occupe pas, parce que les aspects sont des angles écliptiques, pas des affectations de pièces.',
        ],
      },
      {
        heading: 'Stelliums et maisons encombrées',
        paragraphs: [
          'Le pendant des maisons vides est un stellium : plusieurs planètes dans un signe ou une maison. Cette pièce prend le volume. Les maisons voisines peuvent être vides parce que les corps se sont regroupés. Lisez d’abord le groupe. Puis notez les pièces vides sans leur écrire d’obituaires.',
          'Le système de maisons change quelles pièces ont l’air vides. Placidus (défaut) et Whole Sign peuvent déplacer une planète à travers une frontière, surtout à haute latitude ou avec une planète près d’une cuspide. Si une « septième vide » apparaît dans un système et pas dans l’autre, vous regardez une frontière, pas un destin.',
        ],
      },
      {
        heading: 'Heure inconnue et fausses maisons vides',
        paragraphs: [
          'Sans heure de naissance, chaque affirmation de maison vide est invalide, parce que les murs sont invalides. N’utilisez pas un thème 12:00 pour annoncer que votre maison quatre est vide. Marquez l’heure inconnue sur SideraChart et sautez les maisons. Vous pouvez encore parler de signes vides — aucune planète en Scorpion, par exemple — parce que les signes n’ont pas besoin de l’horizon.',
          'Si l’heure est approximative, recalculez une plage. Les planètes qui sautent de maison créeront et détruiront le « vide » en vingt minutes. Traitez ces maisons comme non tranchées. Le mouvement de l’Ascendant d’un degré toutes les quatre minutes est la même horloge qui rend les listes de maisons vides fragiles.',
          'Whole Sign peut vider et remplir d’autres pièces que Placidus avec les mêmes planètes. Si vous changez de système pour « réparer » une maison vide qui vous déplaît, vous éditez la grille, pas le ciel. Choisissez un système et lisez l’encombrement que vous avez vraiment.',
        ],
      },
      {
        heading: 'Comment les lire sur SideraChart',
        paragraphs: [
          'Calculez avec date, heure et lieu, tropical, Placidus sauf si vous avez une raison de changer. Listez les maisons occupées. Le reste est vide. Lisez d’abord l’occupé. Utilisez les maîtres de cuspides si vous avez besoin d’un second passage. Ne classez pas les domaines de vie par le vide.',
          'Les transits à travers une maison natale vide sont encore des transits à travers ce secteur du cadre natal. L’espace quotidien les stocke à midi dans le fuseau natal. Un transit ne « remplit » pas une maison natale vide pour de bon. C’est de la météo dans cette pièce pour un temps. La maison natale reste vide de planètes natales.',
          'Si vous venez d’un mème qui numérotait vos maisons vides comme des échecs de vie, jetez-le. Comptez les maisons occupées, nommez le stellium s’il y en a un, et arrêtez-vous. Le vide est un fait de dessin. Ce n’est pas une prévision, un diagnostic, ni une raison de deviner une heure de naissance pour que la maison sept ait l’air habitée.',
        ],
      },
    ],
    faq: [
      {
        q: 'Les maisons vides dans un thème natal sont-elles mauvaises ?',
        a: 'Non. Elles veulent dire qu’aucune planète natale ne siège dans cette maison. La plupart des thèmes en ont plusieurs. Ce ne sont pas des parts manquantes d’une vie.',
      },
      {
        q: 'Combien de maisons vides est-ce normal ?',
        a: 'Avec dix corps et douze maisons, plusieurs maisons vides sont typiques. Un stellium dans une maison garantit presque le vide ailleurs.',
      },
      {
        q: 'Puis-je connaître mes maisons vides sans heure de naissance ?',
        a: 'Non. Les maisons exigent l’Ascendant. Sans heure, vous pouvez noter des signes vides, pas des maisons vides.',
      },
      {
        q: 'Une maison sept vide veut-elle dire que je n’aurai pas de relations ?',
        a: 'Non. C’est l’histoire du défaut. Lisez le maître de la sept et le reste du thème. Ne traitez pas le vide comme une prévision.',
      },
    ],
  },
  'aspects-in-astrology': {
    title: 'Que sont les aspects en astrologie ?',
    excerpt:
      'Les aspects sont des angles nommés entre planètes le long de l’écliptique : conjonction, sextile, carré, trigone, opposition. SideraChart utilise des orbes de 8°, 6° et 4° pour ces cinq-là.',
    sections: [
      {
        heading: 'Que sont les aspects en astrologie ?',
        paragraphs: [
          'Les aspects sont des distances angulaires le long de l’écliptique entre deux longitudes natales. C’est de la géométrie, pas des lignes de destin. Si deux planètes sont à 90°, c’est un carré. Si elles sont à 120°, c’est un trigone. Le thème natal liste ceux qui tombent dans un orbe autorisé. On cherche « que sont les aspects en astrologie ? » parce que les lignes colorées de la roue ont l’air d’un langage secret. C’est un rapporteur.',
          'SideraChart dessine cinq aspects majeurs : conjonction (0°), sextile (60°), carré (90°), trigone (120°), opposition (180°). Les orbes sont 8° pour la conjonction et l’opposition, 6° pour le carré et le trigone, 4° pour le sextile. Les orbes plus serrés sont plus sonores. Le tableau sous la roue est la même liste que les lignes, avec le mouvement appliquant ou séparant.',
        ],
      },
      {
        heading: 'Les cinq aspects majeurs',
        paragraphs: [
          'Une conjonction fusionne deux fonctions dans le même patch de zodiaque. Un sextile, c’est 60° — une porte qu’il faut encore franchir. Un carré, c’est 90° — un frottement qui tend à produire un métier si vous y restez, ou du bruit si vous n’y restez pas. Un trigone, c’est 120° — une aisance qui peut rester inutilisée. Une opposition, c’est 180° — deux pôles, souvent projetés sur une autre personne ou un emploi du temps qui tire des deux côtés.',
          'Gardez les verbes concrets. Ne transformez pas un carré en malédiction ni un trigone en bénédiction venue d’ailleurs. Vous lisez comment deux fonctions du thème partagent le travail. Le reste du thème — signes, maisons, le Big Three — vous dit dans quels domaines ce travail atterrit.',
        ],
      },
      {
        heading: 'Orbes : 8°, 6° et 4°',
        paragraphs: [
          'Un orbe, c’est de combien le contact peut s’écarter de l’exact et compter encore. La pile de SideraChart est 8° / 6° / 4° comme ci-dessus. Une conjonction Soleil–Lune à 7,2° compte ; un sextile de Mercure à 4,5° ne compte pas. D’autres logiciels utilisent d’autres orbes, c’est pourquoi les listes d’aspects divergent même lorsque les longitudes collent.',
          'Classez par serrage. Un aspect de 0,3° passe avant un aspect de 7,9° du même type. Si vous apprenez, ignorez tout ce qui est près du bord jusqu’à ce que les serrés soient clairs. L’exactitude n’est pas une pureté morale ; c’est du volume sur l’instrument.',
        ],
      },
      {
        heading: 'Appliquant, séparant et heure de naissance',
        paragraphs: [
          'Appliquant veut dire que l’aspect se resserrait à la naissance ; séparant veut dire qu’il avait déjà culminé et s’élargissait. SideraChart le signale dans le tableau natal. C’est une nuance de timing à l’intérieur de l’instant de naissance, pas une prévision. Vous avez encore besoin de longitudes correctes, donc d’un Temps universel correct.',
          'Sans heure de naissance, les aspects planète à planète existent encore. Les aspects à l’Ascendant, non, parce qu’il n’y a pas d’Ascendant. Les aspects de la Lune près d’une limite d’orbe peuvent basculer sur une journée. Heure inconnue : planètes oui, maisons non ; aspects lunaires près de 8°/6°/4° peut-être. Ne vous battez pas avec un thème de midi pour un carré lunaire de 5,9°.',
        ],
      },
      {
        heading: 'Ce que les aspects ne sont pas',
        paragraphs: [
          'Ce n’est pas de la synastrie à eux seuls — la synastrie, ce sont des aspects entre deux thèmes. Ce ne sont pas des transits — les transits, ce sont les planètes d’aujourd’hui aux planètes natales. Ce n’est pas un conseil médical, juridique ou financier. Un carré Mars Saturne ne prescrit ni un entraînement ni un procès. Il décrit un frottement entre la chaleur d’initiative et la structure.',
          'Les aspects mineurs (quinconce, semi-carré, et le reste) ne sont pas dessinés ici. Si un autre site montre plus de lignes, il utilise un catalogue plus large, pas un ciel plus exact. SideraChart reste aux cinq majeurs sur des longitudes tropicales d’astronomy-engine (VSOP87), pas Swiss Ephemeris.',
          'Les stelliums produisent des piles de conjonctions. Lisez d’abord la paire la plus serrée plutôt que de déclarer tout le tas une seule humeur. Une maison vide n’annule pas un aspect qui implique une planète dans une autre maison ; les aspects ignorent les murs. Les maisons ont besoin de l’heure de naissance ; les aspects entre planètes, non.',
        ],
      },
      {
        heading: 'Comment SideraChart montre les aspects',
        paragraphs: [
          'Des lignes colorées dans la roue ; un tableau triable en dessous. Cachez les lignes si le dessin est encombré. La synastrie utilise les mêmes orbes entre les planètes de deux personnes. Les thèmes composites ont leurs propres milieux, puis leurs propres aspects internes. Les transits quotidiens dans l’espace sont stockés à midi natal et utilisent les mêmes noms d’aspects contre la ligne de base natale.',
          'Lorsque vous comparez avec astro-seek ou similaire, réglez tropical, le même fuseau, et des orbes comparables. Un aspect manquant est souvent un orbe ou un réglage sidéral. Placidus contre Whole Sign ne changera pas les aspects écliptiques entre planètes ; cela changera les phrases fondées sur les maisons que vous pourriez mélanger par erreur.',
          'Lisez appliquant contre séparant comme une note de l’instant de naissance, puis passez. Cela ne vous dit pas quand un événement arrivera des années plus tard. Les transits réutilisent les mêmes noms d’aspects contre un ciel en mouvement, stockés à midi natal dans l’espace. C’est une autre horloge que le drapeau natal appliquant.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quels sont les aspects majeurs en astrologie ?',
        a: 'Conjonction, sextile, carré, trigone et opposition. Ce sont les cinq que SideraChart dessine. Les orbes sont 8°, 6° et 4° selon l’aspect.',
      },
      {
        q: 'Que veut dire orbe en astrologie ?',
        a: 'De combien de degrés un aspect peut s’écarter de l’exact et compter encore. Les orbes plus serrés sont plus forts sur l’instrument. Le jeu de SideraChart est 8° / 6° / 4°.',
      },
      {
        q: 'Les aspects en carré sont-ils mauvais ?',
        a: 'C’est du frottement, pas une malédiction. Lisez-les comme un travail entre deux fonctions. Ne les traitez pas comme des verdicts médicaux ou moraux.',
      },
      {
        q: 'Ai-je besoin d’une heure de naissance pour voir les aspects ?',
        a: 'Pas pour les aspects planète à planète. Vous avez besoin d’une heure pour les aspects à l’Ascendant et pour les aspects lunaires qui siègent près d’une limite d’orbe.',
      },
    ],
  },
  'tropical-vs-sidereal': {
    title: 'Zodiaque tropical et zodiaque sidéral',
    excerpt:
      'Le zodiaque tropical commence à l’équinoxe de mars. Le sidéral utilise un zéro stellaire, éloigné d’environ 24° aujourd’hui. SideraChart est tropical seulement — pas védique, pas Swiss Ephemeris.',
    sections: [
      {
        heading: 'Zodiaque tropical et zodiaque sidéral',
        paragraphs: [
          'Tropical contre sidéral est un débat de zéro. Les deux zodiaques divisent l’écliptique en douze signes de 30° avec les mêmes noms. Ils ne commencent pas au même endroit. Le 0° Bélier tropical est l’équinoxe de mars — le passage du Soleil à l’équateur céleste. Le 0° Bélier sidéral est lié à une référence stellaire (un ayanamsha). Parce que l’axe de la Terre précesse, ces deux zéros se sont écartés d’environ 24° aujourd’hui.',
          'Cet écart est la raison pour laquelle votre signe solaire dans une application védique est souvent le signe précédent comparé à SideraChart. Ni l’un ni l’autre calculateur n’a « tort sur le ciel ». Ils utilisent des origines différentes pour la même ceinture nommée. SideraChart est tropical : convention occidentale, fondé sur l’équinoxe, astronomy-engine (VSOP87). Il ne calcule pas les systèmes sidéraux, védiques ou chinois.',
        ],
      },
      {
        heading: 'Ce que le zodiaque tropical mesure',
        paragraphs: [
          'Les signes tropicaux sont des saisons de l’orbite terrestre, pas des photographies de constellations. Les constellations sont inégales et précessent. Le Bélier tropical commence lorsque le jour et la nuit s’égalisent en mars (au sens calendaire nord de l’équinoxe), quel que soit le champ d’étoiles derrière ce point maintenant. L’astrologie natale occidentale — y compris ce site — lit ces signes saisonniers.',
          'Vos planètes natales sur SideraChart sont des longitudes tropicales apparentes de la date. Les maisons (Placidus par défaut) s’assoient sur cette écliptique tropicale. Date, heure et lieu de naissance comptent encore de la façon habituelle : l’heure pour l’Ascendant, heure inconnue = planètes oui, maisons non. Changer de zodiaque est un interrupteur séparé de changer de système de maisons.',
        ],
      },
      {
        heading: 'Ce que le zodiaque sidéral mesure',
        paragraphs: [
          'La pratique sidérale vise à garder les signes alignés sur un cadre stellaire. Différents ayanamshas (Lahiri et d’autres) choisissent des décalages légèrement différents. L’astrologie natale indienne est en général sidérale et utilise souvent des maisons en signes entiers ou d’autres méthodes qui ne sont pas les défauts de ce site. Si vous voulez ce thème, vous avez besoin de ce moteur. SideraChart ne prétendra pas l’être.',
          'Les systèmes natals chinois sont encore une autre pile — pas tropicale, pas la même roue de douze signes. Ne collez pas un animal d’année chinois sur un Soleil tropical en l’appelant la même coordonnée. Si vous arrivez ici d’une recherche mélangée, choisissez un système et restez-y pendant que vous apprenez.',
        ],
      },
      {
        heading: 'L’écart d’environ 24° et l’ayanamsha',
        paragraphs: [
          'Vingt-quatre degrés, c’est environ les quatre cinquièmes d’un signe. Beaucoup de positions tombent donc dans le signe de nom tropical précédent lorsque vous passez au sidéral. Un Soleil tropical Gémeaux devient souvent un Soleil sidéral Taureau. Les Lunes près d’une frontière basculent plus souvent parce que la Lune est rapide. Les signes Ascendant basculent aussi, parce que l’Ascendant est un degré.',
          'Si vous comparez deux sites tropicaux et qu’ils divergent déjà d’un signe, regardez d’abord l’heure de naissance et le fuseau, pas l’ayanamsha. Le sidéral est l’explication lorsqu’un site est explicitement védique ou « sidéral » et l’autre occidental tropical. SideraChart ne collera pas à une sortie Lahiri. C’est attendu.',
        ],
      },
      {
        heading: 'Pourquoi SideraChart est tropical seulement',
        paragraphs: [
          'Le produit est un calculateur de thème natal occidental : zodiaque tropical, Placidus par défaut, Whole Sign en option, aspects majeurs à 8° / 6° / 4°, positions de classe VSOP87 via astronomy-engine, fuseaux IANA. Ce n’est pas Swiss Ephemeris. Ce n’est pas un interrupteur sidéral. Garder un seul zéro évite une erreur silencieuse de 24° lorsque vous croyez regarder « le même thème ».',
          'Utilisez le tropical si vous voulez lire les textes occidentaux, la plupart des manuels natals en anglais, et la couche rédigée de ce site. Utilisez un spécialiste sidéral si c’est votre tradition. Ne faites pas la moyenne des deux Soleils. Ne traitez pas le désaccord comme une crise de personnalité. C’est un choc de systèmes de coordonnées.',
        ],
      },
      {
        heading: 'Aligner d’autres sites',
        paragraphs: [
          'Sur astro-seek, astro.com et similaires, réglez tropical + Placidus (ou Whole Sign si c’est ce que vous avez utilisé) et la même heure de naissance. Vous devriez atterrir à une fraction de degré près sur les planètes. Si vous êtes décalé d’un signe, vous êtes en sidéral ou vous avez la mauvaise horloge. Si les maisons diffèrent mais que les planètes collent, vous avez un décalage de système de maisons.',
          'Les transits dans l’espace de SideraChart sont des transits tropicaux stockés à midi dans le fuseau natal. Mélanger un natal tropical avec des transits sidéraux, c’est la même erreur de 24° en mouvement. Gardez le zodiaque cohérent. Le thème natal est la ligne de base ; les transits sont la météo contre cette ligne de base, dans le même système de coordonnées.',
          'Si vous publiez un thème, nommez le zodiaque dans la légende : tropical, Placidus, heure de naissance connue ou inconnue. Cette seule ligne prévient la plupart des fils « votre calculateur a tort ». La légende de SideraChart montre déjà tropical et Placidus lorsque la roue est complète.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quelle est la différence entre zodiaque tropical et sidéral ?',
        a: 'Le tropical mesure depuis l’équinoxe de printemps. Le sidéral mesure depuis un zéro stellaire. Ils diffèrent d’environ 24° aujourd’hui, souvent d’un signe entier.',
      },
      {
        q: 'Quel zodiaque SideraChart utilise-t-il ?',
        a: 'Tropical seulement, avec des positions d’astronomy-engine (VSOP87). Il ne calcule pas de thèmes sidéraux, védiques ou chinois et n’utilise pas Swiss Ephemeris.',
      },
      {
        q: 'Pourquoi mon signe solaire est-il différent en astrologie védique ?',
        a: 'La pratique védique est en général sidérale. Votre Soleil tropical est encore la longitude fondée sur l’équinoxe. Le nom du signe a changé parce que le zéro a changé.',
      },
      {
        q: 'Dois-je utiliser le tropical ou le sidéral ?',
        a: 'Utilisez le tropical pour coller aux textes natals occidentaux et à ce calculateur. Utilisez le sidéral si vous travaillez dans cette tradition. Ne les mélangez pas dans une même lecture.',
      },
    ],
  },
  'synastry-vs-composite': {
    title: 'Synastrie et thème composite',
    excerpt:
      'La synastrie superpose deux thèmes natals et liste les aspects entre eux. Un thème composite moyenne les longitudes en une troisième roue. Ils répondent à des questions différentes.',
    sections: [
      {
        heading: 'Synastrie et thème composite',
        paragraphs: [
          'Synastrie contre composite, ce sont deux cartes relationnelles différentes, pas deux noms pour une seule carte. La synastrie garde les deux personnes. Vous calculez deux thèmes natals, superposez les planètes, et listez les aspects de la personne A à la personne B. Un thème composite jette les deux roues comme personnes séparées et construit un troisième thème à partir de milieux. On cherche la comparaison parce que les applications utilisent les mots comme s’ils étaient interchangeables. Ils ne le sont pas.',
          'SideraChart offre les deux comme calculateurs séparés. Chaque natal est tropical, Placidus par défaut, VSOP87 via astronomy-engine. Les aspects de synastrie utilisent les mêmes orbes qu’un aspectaire natal : 8° conjonction et opposition, 6° carré et trigone, 4° sextile. Ni l’une ni l’autre roue n’est un verdict sur le fait de rester ensemble, de se marier ou de partager des biens. Ce sont des diagrammes.',
        ],
      },
      {
        heading: 'Ce que fait la synastrie',
        paragraphs: [
          'La synastrie laisse les deux thèmes intacts. Sur SideraChart, un jeu de glyphes est la personne A, l’autre la personne B. Le tableau liste les aspects inter-thèmes, pas les aspects internes d’un natal. Vous demandez ce qui se passe lorsque deux ciels partagent une cuisine : son Saturne sur sa Lune, son Mars sur son Ascendant, un trigone Soleil–Soleil.',
          'Chaque personne a encore besoin de sa propre date, heure et lieu de naissance. Si une heure est inconnue, l’Ascendant et les maisons de cette personne tombent. Vous pouvez encore faire de la synastrie planète à planète. Vous ne pouvez pas parler honnêtement de « leurs planètes dans votre maison sept » sans le signe Ascendant de cette personne. Heure inconnue = planètes oui, maisons non — par thème.',
        ],
      },
      {
        heading: 'Ce que fait un thème composite',
        paragraphs: [
          'Un composite prend chaque paire de planètes natales (le Soleil de A et le Soleil de B, la Lune de A et la Lune de B, et ainsi de suite), trouve le milieu d’arc court, puis dessine une nouvelle roue. Le résultat est la relation comme une troisième entité, pas l’une ou l’autre personne. Ce n’est pas un thème Davison, qui prend le milieu dans le temps et l’espace vers une naissance hypothétique de la relation.',
          'Les maisons du composite ont encore besoin d’une convention de lieu et, en pratique, d’une façon de fixer les angles. Lisez le composite comme un instrument séparé. Ne mélangez pas les significations de maisons natales d’une personne dans les milieux du composite sans remarquer que vous avez changé de carte. Le calculateur composite de SideraChart est cette troisième roue, pas une superposition de synastrie.',
        ],
      },
      {
        heading: 'Deux personnes, deux saisies complètes',
        paragraphs: [
          'Erreur en entrée, erreur en sortie, deux fois. Un mauvais fuseau sur la personne B décale sa Lune et son Ascendant, qui ensuite soit aspectent mal la personne A en synastrie, soit tirent chaque milieu du composite. Préférez les actes. Si une horloge manque, dites-le et gardez les phrases de synastrie fondées sur les maisons hors table.',
          'Vous ne moyennez pas deux signes Ascendant pour obtenir un « Ascendant de couple » en synastrie. Cet instinct appartient aux milieux du composite, et même là c’est un angle construit, pas un bébé. Gardez les méthodes dans des onglets séparés et étiquetez quelle roue vous lisez.',
        ],
      },
      {
        heading: 'Ce que ni l’un ni l’autre thème ne décide',
        paragraphs: [
          'Ni la synastrie ni le composite ne vous dit de vous engager, de partir, d’avoir un enfant ou de signer un contrat. Ils décrivent des schémas de contact et une atmosphère de milieux. Des contacts de Vénus faciles ne sont pas un statut juridique. Des contacts de Saturne ne sont pas une peine de prison. Si vous avez besoin de conseils de ces sortes, vous avez besoin d’un autre professionnel.',
          'Lisez d’abord les thèmes natals, séparément. Deux personnes sans rapport à leurs propres Lunes ne seront pas sauvées par un joli trigone de synastrie. Le Big Three de chaque natal vient encore en premier. Puis superposez. Puis, si vous voulez la vue troisième-entité, le composite.',
        ],
      },
      {
        heading: 'Comment les lancer sur SideraChart',
        paragraphs: [
          'Utilisez le calculateur de synastrie pour les superpositions et les inter-aspects. Utilisez le calculateur composite pour les milieux. Même moteur tropical, pas sidéral, pas Swiss Ephemeris. Un passage relationnel gratuit sans compte ; puis connexion. Enregistrez les natals individuels si vous voulez aussi les transits quotidiens dans chaque espace à midi natal — ces transits sont une météo personnelle, pas une prévision de couple sauf si vous construisez cela à part.',
          'Lorsque vous comparez avec d’autres sites, alignez tropical, Placidus, orbes, et s’ils veulent dire synastrie ou composite. Un site qui « combine des thèmes » sans dire milieu contre superposition est la raison d’être de cet article. Regardez la roue : deux jeux de planètes veulent dire synastrie ; un jeu de milieux mélangés veut dire composite.',
          'Les superpositions de maisons en synastrie ont besoin des deux horloges. Si la personne B n’a pas d’heure, vous avez encore des aspects planète à planète avec les orbes 8° / 6° / 4°. Vous n’avez pas « leur Vénus dans votre sept ». Écrivez cette limite à côté du tableau pour que la superposition ne fasse pas pousser des maisons qu’elle ne possède pas.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quelle est la différence entre synastrie et composite ?',
        a: 'La synastrie superpose deux thèmes natals et les aspecte l’un à l’autre. Un composite construit un troisième thème à partir de milieux planétaires. Superposition contre moyenne.',
      },
      {
        q: 'Lequel est meilleur pour l’astrologie relationnelle ?',
        a: 'Ils répondent à des questions différentes. Synastrie : comment deux personnes interagissent. Composite : la relation comme un troisième thème. Lancez d’abord les thèmes natals dans les deux cas.',
      },
      {
        q: 'Les deux personnes ont-elles besoin d’une heure de naissance ?',
        a: 'Pour la synastrie fondée sur les maisons et pour les angles du composite, oui. La synastrie planète à planète peut avancer avec des dates si les heures manquent, avec la prudence habituelle de cuspide lunaire.',
      },
      {
        q: 'Un thème composite est-il la même chose qu’un thème Davison ?',
        a: 'Non. Le composite utilise des milieux planétaires. Davison prend le milieu des deux heures et lieux de naissance en un événement hypothétique. Le composite de SideraChart est la roue des milieux.',
      },
    ],
  },
  'what-are-transits': {
    title: 'Que sont les transits en astrologie ?',
    excerpt:
      'Les transits sont les positions d’aujourd’hui comparées à votre thème natal. C’est de la météo contre une ligne de base fixe, pas un nouveau thème de naissance. SideraChart les stocke à midi.',
    sections: [
      {
        heading: 'Que sont les transits en astrologie ?',
        paragraphs: [
          'Les transits sont les planètes dans le ciel maintenant (ou à une date choisie) mesurées contre les planètes de votre thème natal. Le thème natal reste en place : c’est la ligne de base de votre date, heure et lieu de naissance. Les transits bougent. Un carré de Saturne en transit à votre Soleil natal est un contact temporaire entre le Saturne d’aujourd’hui et le Soleil avec lequel vous êtes né. On cherche « que sont les transits en astrologie ? » lorsqu’on veut savoir si le thème natal change. Il ne change pas. La météo au-dessus de lui, si.',
          'SideraChart calcule les transits avec le même moteur tropical que le natal : astronomy-engine (VSOP87), aspects majeurs à 8° / 6° / 4°. L’espace quotidien stocke une superposition par date civile à midi dans le fuseau natal, pour que la note du jour reste stable si vous actualisez à 23:00. Les dates manquées ne sont pas rattrapées.',
        ],
      },
      {
        heading: 'Transits et positions natales',
        paragraphs: [
          'Les positions natales sont un instantané. Les transits sont un second instantané comparé au premier. Vous avez besoin d’un thème natal enregistré pour le faire honnêtement. Sans longitudes natales, vous ne listez que le ciel d’aujourd’hui, ce qui est de l’astronomie, pas une lecture de transit personnelle.',
          'Si l’heure de naissance natale était inconnue, les maisons natales sont déjà hors table. Les planètes en transit « à travers votre maison sept » n’ont alors pas de mur honnête à traverser. Vous pouvez encore transiter vers les planètes natales (Soleil, Lune si le signe était sûr, Mercure, et le reste). Heure inconnue = planètes natales oui, maisons natales non — les transits héritent de cette limite.',
        ],
      },
      {
        heading: 'Transits rapides et transits lents',
        paragraphs: [
          'La Lune transite une planète natale en heures. Le Soleil, Mercure, Vénus et Mars mettent des jours à des semaines à croiser un point natal. Jupiter et Saturne mettent plus longtemps. Uranus, Neptune et Pluton peuvent siéger sur un degré natal pendant des mois, les rétrogradations allongeant l’histoire. Les transits rapides sont la météo. Les transits lents sont le climat. Ni l’un ni l’autre n’est une instruction médicale ou financière.',
          'Les orbes gardent les mêmes noms : conjonction, sextile, carré, trigone, opposition. Une conjonction en transit à Vénus natale dans 8° est la même géométrie qu’une conjonction natale, sauf qu’une extrémité de l’aspect bouge. Les transits appliquants serrés sont ceux qu’il vaut la peine de lister d’abord dans une note quotidienne.',
        ],
      },
      {
        heading: 'Pourquoi SideraChart utilise midi dans le fuseau natal',
        paragraphs: [
          'Un « jour » de transits doit choisir un instant. Si l’espace recalculait à chaque chargement de page, la Lune errerait et la note ne collerait pas à la capture d’hier. Midi dans le fuseau natal est un instantané civil stable pour cette date. Ce n’est pas votre heure de naissance, et ce n’est pas une affirmation que les transits ne comptent qu’à l’heure du déjeuner.',
          'L’espace écrit une ligne par date civile lorsque vous l’ouvrez. Demain, la ligne d’hier reste. Une semaine sautée reste sautée ; le produit n’invente pas d’histoire. Vous avez besoin d’un natal enregistré et d’un compte pour ce journal. Les calculateurs publics restent utilisables sans connexion.',
        ],
      },
      {
        heading: 'Comment lire un jour de transit',
        paragraphs: [
          'Listez les planètes en transit qui font des aspects majeurs au Soleil natal, à la Lune, à l’Ascendant (si vous avez une heure), et à toute configuration natale serrée. Préférez les contacts lents pour le titre, les rapides pour la météo. Ne promouvez pas un carré de Lune en transit en décision de vie. N’ignorez pas non plus une conjonction de Saturne en transit au Soleil natal ; ne la transformez simplement pas en conseil juridique ou médical.',
          'Gardez les transits tropicaux sur un natal tropical. Des transits sidéraux sur un natal tropical mélangent les zéros et gaspillent l’écart de 24°. SideraChart ne fera pas ce mélange. Les maisons natales Placidus, si elles existent, sont les pièces que les transits traversent. Les maisons natales vides peuvent encore recevoir des transits ; le vide concernait les planètes natales, pas une interdiction de trafic plus tardif.',
        ],
      },
      {
        heading: 'Ce que les transits ne sont pas',
        paragraphs: [
          'Ce n’est pas un nouveau thème natal. Ce n’est pas un horoscope de journal par signe solaire, même s’ils sont plus proches de « votre semaine » que la roue natale seule. Ce n’est pas de la synastrie (deux thèmes natals) ni un composite (milieux). Ce n’est pas Swiss Ephemeris, des dashas védiques, ni des piliers de jour chinois. La couche de transits de ce site, ce sont des positions tropicales occidentales contre un natal tropical occidental.',
          'Utilisez-les comme une superposition datée. Imprimez ou téléchargez le texte du jour si vous voulez un enregistrement. Puis revenez au natal lorsque vous avez besoin de la ligne de base. Le thème natal est l’instrument que vous avez calibré à la naissance. Les transits sont le ciel plus tardif qui le traverse.',
          'Si vous sautez une semaine, laissez la lacune. Rattraper des instantanés de midi pour des jours que vous n’avez pas ouverts inventerait un journal que vous n’avez pas tenu. Le thème natal est toujours là. Ouvrez la date d’aujourd’hui lorsque vous voulez la météo d’aujourd’hui, pas un mois reconstruit.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qu’est-ce qu’un transit en astrologie ?',
        a: 'Un contact entre une planète dans le ciel à une date donnée et un point de votre thème natal. Le thème natal reste fixe ; le ciel bouge.',
      },
      {
        q: 'Les transits changent-ils mon thème natal ?',
        a: 'Non. Les transits se superposent au natal. SideraChart stocke la superposition de chaque jour à midi dans le fuseau natal. Vos positions de naissance ne bougent pas.',
      },
      {
        q: 'Pourquoi SideraChart calcule-t-il les transits quotidiens à midi ?',
        a: 'Pour que la note du jour soit stable. Midi dans le fuseau natal est un instantané cohérent. Ce n’est pas un substitut à votre heure de naissance.',
      },
      {
        q: 'Puis-je lire les transits sans heure de naissance ?',
        a: 'Vous pouvez lire les transits aux planètes natales. Vous ne pouvez pas lire honnêtement les transits à travers les maisons natales sans Ascendant.',
      },
    ],
  },
};
