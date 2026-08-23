import type { ArticleCopy } from './articles';

export const enArticles: Record<string, ArticleCopy> = {
  'what-is-a-natal-chart': {
    title: 'What is a natal chart?',
    excerpt:
      'A natal chart is a map of the sky from your birth date, time and place: planets, Ascendant and twelve houses. It is not a daily Sun-sign horoscope or a quiz.',
    sections: [
      {
        heading: 'What is a natal chart?',
        paragraphs: [
          'A natal chart is a map of the Solar System as seen from one place at one moment. You supply three facts: a birth date, a clock time, and a geographic location. From those inputs a calculator derives each planet’s ecliptic longitude, the degree that was rising in the east (the Ascendant), and a twelve-house division of the local sky. SideraChart is that calculator: tropical zodiac, Placidus houses by default, positions from a VSOP87-class ephemeris via astronomy-engine.',
          'The chart is a diagram of accents, not a verdict. Each planet is a function. Each sign is a style of that function. Each house is a department of life where the function shows up. Aspects are the angular distances between those functions. Read together they tell you which parts of the chart are loud. They do not tell you whether to change jobs, leave a relationship, or take a medical decision.',
        ],
      },
      {
        heading: 'What you need: birth date, time and place',
        paragraphs: [
          'Date sets which day of the Earth’s orbit you were born on, which is enough for the Sun and the slow planets to land in the correct sign. Time converts civil clock time to Universal Time with the IANA timezone rules that were in force on that date, including historical daylight-saving. Place supplies latitude and longitude so the local horizon — and therefore the Ascendant and the house cusps — can be computed.',
          'If the time is unknown, you still get planetary signs. You do not get a reliable Ascendant or a house system. SideraChart lets you mark time as unknown and then draws planets only. Guessing noon and treating the houses as fact is worse than an honest gap. If a birth certificate has a time, use it; if relatives disagree by half an hour, treat the Ascendant as provisional.',
        ],
      },
      {
        heading: 'Planets, signs, houses and aspects',
        paragraphs: [
          'Planets (Sun through Pluto, plus the Moon) sit on the ecliptic. The sign is which 30° slice of the tropical zodiac that longitude falls in. The house is which local sector that longitude falls in once the Ascendant is known. A planet in Aries in the tenth house is not the same statement as a planet in Aries in the fourth: same style, different department.',
          'Aspects are the named angles between two longitudes: conjunction (0°), sextile (60°), square (90°), trine (120°), opposition (180°). SideraChart draws those five with orbs of 8° for conjunction and opposition, 6° for square and trine, and 4° for sextile. Tighter orbs read louder. The wheel’s coloured lines and the table under it show the same contacts.',
        ],
      },
      {
        heading: 'What a natal chart is not',
        paragraphs: [
          'A natal chart is not a daily horoscope column written for twelve Sun signs. It is not Vedic or sidereal astrology, which measures from a star-based zero point about 24° away from the tropical equinox today. It is not Chinese astrology. SideraChart does not compute those systems and does not use Swiss Ephemeris.',
          'It is also not a personality quiz that outputs a type. Two people with the same Sun sign can have different Moons, different rising signs, different house emphasis and different aspect patterns. If you only know the Sun, you have one coordinate. The chart is the rest of the coordinate system.',
        ],
      },
      {
        heading: 'How SideraChart calculates the chart',
        paragraphs: [
          'SideraChart resolves the birthplace to latitude and longitude, converts local clock time to Universal Time, then reads apparent tropical longitudes from astronomy-engine (VSOP87-class). The tropical zodiac starts at the March equinox, which is the Western convention. Sidereal longitudes are not shown. Houses default to Placidus because most published Western texts assume it; Whole Sign is available when you need equal signs from the Ascendant’s sign.',
          'Placidus divides time of ascension, so houses are uneven, and it becomes unreliable above roughly 66° latitude. For polar births, Whole Sign is the more honest grid. Planetary longitudes are computed either way. Save the chart if you want the written report and the daily cabinet; the public calculators stay free without an account.',
        ],
      },
      {
        heading: 'How to use the chart once you have it',
        paragraphs: [
          'Start with the Big Three: Sun, Moon and rising. Then read occupied houses, then the tightest aspects. Empty houses are rooms without a planet sitting in them, not missing organs. The PNG of the wheel is a snapshot; the tables are the instrument. Numbers first, then the written layer.',
          'If you later compare the natal chart with today’s sky, that is transits — a different article. SideraChart’s cabinet stores those daily overlays at noon in the natal timezone so the day’s note stays stable. None of that rewrites the natal chart. The natal chart is the baseline you keep; transits are weather against it.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is a natal chart the same as a horoscope?',
        a: 'No. A natal chart is a calculated map from your birth date, time and place. A horoscope in everyday English is usually a Sun-sign column for the day, week or year. The natal chart is the baseline; a horoscope is a later, much thinner reading.',
      },
      {
        q: 'Do I need my exact birth time for a natal chart?',
        a: 'You need it for the Ascendant and the houses. Without a time, planetary signs are still usable. SideraChart will calculate planets and skip the rising sign if you mark time as unknown.',
      },
      {
        q: 'What zodiac does a natal chart use?',
        a: 'Western natal charts, including SideraChart, use the tropical zodiac measured from the vernal equinox. Sidereal (Vedic) charts use a star-based zero point and will look about a sign different for many placements today.',
      },
      {
        q: 'Can two people born on the same day have different natal charts?',
        a: 'Yes. Time and place change the Ascendant, the houses and the Moon’s degree. Even the same hospital an hour apart can produce a different rising sign.',
      },
    ],
  },
  'natal-chart-vs-horoscope': {
    title: 'Natal chart vs horoscope',
    excerpt:
      'A natal chart is your birth-sky map from date, time and place. A horoscope is usually a Sun-sign column. They are not the same reading and should not be swapped.',
    sections: [
      {
        heading: 'Natal chart vs horoscope',
        paragraphs: [
          'People type “natal chart vs horoscope” because both words get used for “astrology,” and they are not the same object. A natal chart is a calculated diagram of the sky from your birth date, time and place: planets on the ecliptic, an Ascendant if the clock is known, houses, and aspects. A horoscope, in the sense most search results mean, is a short forecast written for a Sun sign — Aries through Pisces — for a day, week or month.',
          'You can derive a horoscope-style paragraph from a natal chart. You cannot reconstruct a natal chart from a horoscope column. One is a map with coordinates. The other is a text product aimed at twelve audiences. SideraChart calculates the map. It does not publish Sun-sign columns, weekly or otherwise.',
        ],
      },
      {
        heading: 'What a horoscope usually means',
        paragraphs: [
          'In newspapers and apps, a horoscope is indexed by Sun sign. The writer may look at the Moon, Mercury or a transit to that sign, then write twelve blurbs. The blurb does not know your Moon, your rising sign, your house cusps, or whether your Sun is in the first house or the tenth. It cannot. Those facts require a birth time and a place.',
          'Older astronomical usage of “horoscope” meant the Ascendant itself — the hour-marker. That sense survives in the word, which is why the confusion is sticky. If someone asks for “your horoscope” they might mean the Sun sign, the rising sign, or the whole natal wheel. Ask which one. Then calculate the natal chart if you want the actual sky.',
        ],
      },
      {
        heading: 'What a natal chart contains that a horoscope does not',
        paragraphs: [
          'A natal chart lists every major body: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto. It places them in tropical signs. With a birth time it also places them in houses and sets the Ascendant and Midheaven. It then lists major aspects inside orbs of 8° / 6° / 4°. That is a lot of structure compared with “Taurus, this week.”',
          'Two people who share a Sun sign can have opposite Moons, different rising signs, and no aspects in common. A horoscope column treats them as the same reader. A natal chart does not. If you have only ever read Sun-sign horoscopes, the natal chart will look over-detailed. That detail is the point of calculating one.',
        ],
      },
      {
        heading: 'Sun-sign columns vs a full wheel',
        paragraphs: [
          'Your Sun sign is one coordinate: the tropical sign the Sun occupied on your birth date. It is the easiest fact to know because the Sun stays in a sign for about a month and rarely needs a precise clock. It is also the fact horoscopes use as an index. It is not the chart.',
          'The wheel adds the Moon (which changes sign every two and a half days), the rising sign (which needs the minute), and the rest of the planets. SideraChart’s birth-chart calculator draws that wheel in the tropical zodiac with Placidus houses by default. Compare it with a magazine horoscope and you will see why the words should not be used interchangeably.',
        ],
      },
      {
        heading: 'Why the two get confused',
        paragraphs: [
          'Marketing language collapses them. “Free horoscope” often means “free natal chart,” or the reverse. Social posts say “what’s your horoscope?” when they mean Sun sign. Search engines inherit that mix. If you landed here from “natal chart vs horoscope,” keep the distinction: chart = calculated map from birth data; horoscope = usually a Sun-sign text.',
          'A transit reading for your saved natal chart is closer to a personal horoscope than a newspaper column is, because it uses your actual positions. SideraChart’s daily cabinet stores those transits at noon in the natal timezone. That is still not the natal chart. The natal chart does not change; the sky over it does.',
        ],
      },
      {
        heading: 'Which one SideraChart calculates',
        paragraphs: [
          'SideraChart calculates natal charts, planet-by-planet sign tools, synastry and composite wheels. Positions come from astronomy-engine (VSOP87), not Swiss Ephemeris. The zodiac is tropical, not sidereal or Chinese. Houses are Placidus unless you switch to Whole Sign. Unknown birth time: planets yes, houses no.',
          'If you want a Sun-sign horoscope for the week, this site is the wrong instrument. If you want the map those columns are vaguely pretending to describe, use the birth-chart calculator with date, time and place. Read the chart as a structured description of accents. Do not treat either product as medical, legal or financial advice.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is my horoscope my Sun sign?',
        a: 'In popular use, yes: horoscopes are filed by Sun sign. Your natal chart includes the Sun sign plus Moon, rising, houses and aspects. They answer different questions.',
      },
      {
        q: 'Can a horoscope replace a natal chart?',
        a: 'No. A column for twelve signs cannot encode your birth time, place, Moon or house cusps. Calculate a natal chart if you want those coordinates.',
      },
      {
        q: 'Does a natal chart predict my week?',
        a: 'The natal chart is the baseline. Week-to-week language belongs to transits against that baseline. SideraChart stores daily transits at noon in the natal timezone; that still is not a newspaper horoscope.',
      },
      {
        q: 'Why do some sites call a birth chart a horoscope?',
        a: 'Older jargon used “horoscope” for the Ascendant or the whole figure. Modern marketing reused the word for Sun-sign copy. Check whether the page asks for birth time. If it does, it is calculating a chart.',
      },
    ],
  },
  'what-is-my-sun-sign': {
    title: 'What is my sun sign?',
    excerpt:
      'Your Sun sign is the tropical zodiac sign the Sun occupied on your birth date. You usually do not need a birth time. It is one placement, not the whole natal chart.',
    sections: [
      {
        heading: 'What is my sun sign?',
        paragraphs: [
          'Your Sun sign is the 30° tropical slice that contained the Sun at your birth. People ask “what is my sun sign?” because it is the one astrological fact that newspapers, apps and casual conversation all share. You find it from the birth date. The Sun moves about one degree per day and changes sign around the same calendar dates each year, with a little drift near the cusps.',
          'SideraChart measures the Sun in the tropical zodiac, from the March equinox, using astronomy-engine (VSOP87). That is Western practice. A sidereal (Vedic) Sun sign can differ by about one sign today because the star-based zero point has precessed. If a friend in a sidereal app reports a different Sun, you are not looking at the same coordinate system.',
        ],
      },
      {
        heading: 'How the Sun sign is calculated',
        paragraphs: [
          'The calculator converts your civil birth date and time to Universal Time, then reads the Sun’s apparent ecliptic longitude. The sign is longitude divided into twelve 30° blocks starting at 0° Aries (the equinox). On a cusp day — when the Sun changes sign — the clock time and timezone decide which side you are on. Those are the only days when “I am a cusp” is a calculation question rather than a vibe.',
          'Place barely matters for the Sun’s sign. Time matters on the cusp and for the Sun’s degree and house. If you only want the sign and you were not born on a sign-change date, the birthday is enough. If you were born on the changeover, enter the real time or mark it unknown and treat the result as unresolved until you have a clock.',
        ],
      },
      {
        heading: 'Why your Sun sign is not the whole chart',
        paragraphs: [
          'The Sun is one body. A natal chart also has the Moon, Mercury, Venus, Mars and the outer planets, plus the Ascendant if you have a birth time. Two Leos can share a solar month and still not share a Moon, a rising sign, or a house pattern. Sun-sign descriptions survive because they are easy to index, not because they exhaust the sky.',
          'Read the Sun as the daylight plot: what you are doing when you are most obviously yourself in public time. Then read the rest. A chart that only lists the Sun is a headline. The tables under SideraChart’s wheel are the article.',
        ],
      },
      {
        heading: 'Sun sign vs Moon sign and rising sign',
        paragraphs: [
          'The Moon changes sign every two and a half days, so many people born in the same solar month do not share a Moon. The rising sign changes about every two hours and needs the birth time and place. Together these three are the Big Three. If you only know the Sun, you know the slowest of the three.',
          'You do not need a birth time for a typical Sun sign. You often do not need one for the Moon unless it changed sign that day. You always need one for the rising sign. SideraChart’s dedicated Sun, Moon and rising tools are filters on the same engine as the full natal chart. Use the full chart when you want houses and aspects as well.',
        ],
      },
      {
        heading: 'Cusps, time zones and “I am two signs”',
        paragraphs: [
          'There is no extra thirteenth sign in tropical practice, and there is no official dual citizenship on the boundary. The Sun is in one sign or the other at the minute of birth. If you lack a time on a cusp date, say so. Do not average two signs into a custom identity and then treat it as a calculated fact.',
          'Timezone history matters more than people expect. A birth recorded as 23:40 in a city that was still on daylight-saving can be a different Universal Time than the same clock reading in winter. SideraChart uses IANA rules for that date. If an old paper used a different offset, the Sun’s degree can shift; on a cusp, the sign can too.',
        ],
      },
      {
        heading: 'Finding your Sun sign on SideraChart',
        paragraphs: [
          'Enter birth date, and add time and place if you have them. The Sun row in the table is the sign and degree. The wheel places the solar glyph on that longitude. Aspects to the Sun use the same orbs as the rest of the chart: 8° conjunction and opposition, 6° square and trine, 4° sextile.',
          'Save the natal chart if you want the written report and the daily cabinet. Transits to your natal Sun are later weather, stored at noon in the natal timezone. They do not change the natal Sun sign. The Sun sign is a birth fact. Everything else is reading.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I know my Sun sign without a birth time?',
        a: 'Usually yes. The Sun stays in a sign for about a month. You need a time only on the calendar day it changes sign, or if you want the Sun’s house.',
      },
      {
        q: 'Why is my Sun sign different in a Vedic app?',
        a: 'Vedic apps typically use the sidereal zodiac. SideraChart uses tropical longitudes from the equinox. The gap is about 24° today, which often moves the Sun into the previous sign.',
      },
      {
        q: 'What if I was born on the cusp?',
        a: 'The Sun is still in one tropical sign at the minute of birth. Enter an accurate time. If the time is unknown, the sign is not settled and should not be forced.',
      },
      {
        q: 'Is the Sun sign the most important placement?',
        a: 'It is the most famous, not automatically the loudest. A tight Moon or a piled-up house can dominate a chart that happens to have a quiet Sun.',
      },
    ],
  },
  'sun-moon-rising': {
    title: 'Sun, Moon and rising: the Big Three',
    excerpt:
      'The Big Three are Sun, Moon and rising sign. Sun from the date, Moon from date plus a check on time, rising only with birth time and place. Read them together.',
    sections: [
      {
        heading: 'Sun, Moon and rising: the Big Three',
        paragraphs: [
          'Sun, Moon and rising are called the Big Three because they are the three placements people actually use in conversation, and because they sit on three different clocks. The Sun needs a date. The Moon needs a date and, on fast days, a time. The rising sign needs a date, a time and a place. If you only have one of the three, you do not have the set.',
          'They are not a ranking of spiritual importance. They are three coordinates that describe different tempos: the Sun’s yearly path, the Moon’s monthly path, and the Earth’s daily rotation under the ecliptic. SideraChart calculates all three from the same tropical, VSOP87-based engine. The rising sign is omitted when birth time is unknown.',
        ],
      },
      {
        heading: 'The Sun: the slow, public coordinate',
        paragraphs: [
          'The Sun’s sign is the tropical slice it occupied at birth. It changes about once a month. It is the index of newspaper horoscopes and the answer to “what is my sign?” in casual speech. In the natal chart it is still just one longitude. It tells you the style of the solar function — how you occupy daylight time — not the rest of the sky.',
          'You rarely need a precise clock for the Sun’s sign. You need one for the Sun’s house, and on cusp dates for the sign itself. If you are building the Big Three, enter the real time anyway so the Sun’s degree lines up with aspects to the Moon and the Ascendant.',
        ],
      },
      {
        heading: 'The Moon: the fast body',
        paragraphs: [
          'The Moon moves about 13° a day and changes sign every two and a half days. That is why two people born in the same Sun-sign month often do not share a Moon. The Moon’s sign describes the faster weather of the chart: appetite, sleep, the un-scored hours. It is not a medical diagnosis and not a mood disorder label.',
          'Without a birth time, the Moon’s sign is usually still correct. The degree and the house are not. If the Moon changed sign on your birthday, an unknown time leaves the Moon itself unresolved. Mark the time unknown in SideraChart rather than inventing noon and defending the degree.',
        ],
      },
      {
        heading: 'The rising sign: the eastern horizon',
        paragraphs: [
          'The rising sign, or Ascendant, is the zodiac degree that was coming up over the eastern horizon at the minute of birth. It is a local angle, not a planet. It depends on latitude, longitude and clock time. The Ascendant moves about one degree every four minutes, so a twenty-minute error can change the sign.',
          'Houses in Placidus (SideraChart’s default) start from that angle. No reliable rising sign means no reliable houses. If you do not have a time, skip the Ascendant. A guessed rising sign shifts every “planet in house” line that follows it.',
        ],
      },
      {
        heading: 'Why you read the three together',
        paragraphs: [
          'A Sun-only reading is a headline. Adding the Moon tells you what the chart does when nobody is grading it. Adding the rising sign tells you the door the chart uses — first impressions, the body in space, the house grid. The three can rhyme (all fire) or argue (Sun in Capricorn, Moon in Aries, Gemini rising). The argument is information.',
          'Aspects among the Big Three matter more than slogan chemistry. A Sun–Moon square inside a 6° orb is a tighter statement than “fire and water.” SideraChart’s orbs are 8° for conjunction and opposition, 6° for square and trine, 4° for sextile. Look at the table, not at meme compatibility.',
        ],
      },
      {
        heading: 'How to calculate the Big Three',
        paragraphs: [
          'Use the birth-chart calculator with date, time and place. Read the Sun, Moon and Ascendant rows first, then the rest. Dedicated Sun, Moon and rising tools on SideraChart are the same engine with a narrower display. Tropical zodiac only; not sidereal, not Chinese. Unknown time: you can still list Sun and usually Moon; you cannot list rising.',
          'Once the natal chart is saved, the daily cabinet will overlay transits at noon in the natal timezone. Those transits talk to the Big Three among other points. They do not replace them. The Big Three are birth facts. Transits are the later sky.',
          'If the three placements disagree, do not pick a favourite and discard the others. Write them in one sentence: Sun in this sign, Moon in that sign, this sign rising. Then open the aspect table. That sentence plus the tightest orb is already more of a natal chart than a Sun-sign column.',
        ],
      },
    ],
    faq: [
      {
        q: 'What are the Big Three in astrology?',
        a: 'Sun sign, Moon sign and rising sign (Ascendant). They run on yearly, monthly and daily clocks. You need a birth time and place for the rising sign.',
      },
      {
        q: 'Which of the Big Three is most important?',
        a: 'None is automatically first. The Sun is the most famous. The Moon is faster. The rising sign sets the houses. Read the tightest aspects among them before ranking.',
      },
      {
        q: 'Can I know my Big Three without a birth time?',
        a: 'Sun usually yes, Moon usually yes except on sign-change days, rising no. SideraChart skips the Ascendant when time is marked unknown.',
      },
      {
        q: 'Is rising the same as Sun sign?',
        a: 'No. The Sun is a planet’s longitude. Rising is the ecliptic degree on the eastern horizon. They coincide only by chance, and even then they are different objects.',
      },
    ],
  },
  'rising-sign': {
    title: 'What is my rising sign?',
    excerpt:
      'Your rising sign is the zodiac degree on the eastern horizon at birth — the Ascendant. It needs an accurate birth time and place. Without a birth time, skip it.',
    sections: [
      {
        heading: 'What is my rising sign?',
        paragraphs: [
          'Your rising sign, or Ascendant, is the tropical zodiac degree that was rising in the east at the minute you were born. It is not a planet. It is a local angle made by the Earth’s rotation, your latitude and longitude, and the clock. Two people born the same hour in different cities do not share an Ascendant. Two people born in the same city an hour apart often do not either.',
          'People search “what is my rising sign?” because social astrology treats it as a second identity next to the Sun. On the instrument it is more specific than that: it is the starting gun for the house system and the degree that describes how the chart meets the world first — body, entrance, first impression. It is not a mask you wear for strangers, and it is not more important than the Sun by decree.',
        ],
      },
      {
        heading: 'Why the Ascendant needs a birth time',
        paragraphs: [
          'The Ascendant moves about one degree every four minutes. A twenty-minute error is five degrees and can change the sign, especially near a boundary. A two-hour guess is a different rising sign most of the time. Place matters as well: the same Universal Time produces different local horizons in London and in Kyiv.',
          'SideraChart converts civil time to Universal Time with IANA timezone rules for that date, then computes the local sidereal time and the intersecting ecliptic degree. If you mark time unknown, the calculator still returns planetary longitudes and omits the Ascendant. That is the honest output. Inventing 12:00 and publishing a rising sign is a different, worse product.',
        ],
      },
      {
        heading: 'Rising sign vs Sun sign',
        paragraphs: [
          'The Sun sign comes from the Sun’s ecliptic longitude and is stable across a day. The rising sign comes from the horizon and is not. You can know your Sun from a birthday cake. You cannot know your rising sign from one. If an app gave you a rising sign without asking for a time, it guessed, usually at noon, and should not be trusted.',
          'When both are known, read them as different objects. Sun in Virgo, Scorpio rising is a common pattern, not a contradiction. One is the solar plot; the other is the eastern door and the house grid. SideraChart’s rising-sign calculator is the natal engine filtered to that angle. The full chart still shows why the rest of the sky sits where it does.',
        ],
      },
      {
        heading: 'Houses start at the Ascendant',
        paragraphs: [
          'In Placidus, SideraChart’s default, house I begins at the Ascendant. The rest of the cusps follow from time of ascension, so houses are unequal. Whole Sign assigns house I to the whole sign that contains the Ascendant and then counts signs. Either way, no Ascendant means no honest houses.',
          'Every “planet in the seventh house” line depends on this. If the rising sign is wrong, those lines are wrong even when the planetary signs are right. That is why unknown time means planets yes, houses no — not “houses approximately.” Polar latitudes above about 66° also strain Placidus; switch to Whole Sign there rather than forcing broken cusps.',
        ],
      },
      {
        heading: 'Approximate times and noon charts',
        paragraphs: [
          'A recorded time of 04:00 might mean “about four” or “exactly four.” Treat rounded hours as a range. Recalculate twenty minutes either side and see whether the Ascendant stays in sign. If it flips, you do not have a rising sign yet; you have two candidates. Rectification — inventing a time to match a biography — is a separate, easy-to-abuse craft. SideraChart does not do it for you.',
          'Family memory is weaker than a certificate. If relatives disagree, prefer the document. If there is no document, leave the time unknown. You can still read Sun, Moon (usually), Mercury, Venus, Mars and the outer planets in signs, plus aspects among them. That is already a natal chart minus the local frame.',
        ],
      },
      {
        heading: 'How to calculate your rising sign',
        paragraphs: [
          'Use SideraChart’s rising-sign calculator or the full birth-chart calculator. Enter date, time and place. The Ascendant row is the sign and degree. Positions are tropical, from astronomy-engine (VSOP87), not Swiss Ephemeris, not sidereal. Aspects from planets to the Ascendant use the same orbs as planet-to-planet contacts: 8° / 6° / 4°.',
          'Save the chart if you want houses, the written report, and later transits in the cabinet at noon natal time. A rising sign without the rest of the wheel is still only one angle. Calculate it carefully, then put it back in the chart it belongs to.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I find my rising sign without a birth time?',
        a: 'No. The Ascendant is a horizon degree. Without a clock and a place, any rising sign is a guess. SideraChart omits it when time is unknown.',
      },
      {
        q: 'How often does the rising sign change?',
        a: 'Roughly every two hours a new sign rises, and the degree itself moves about 1° per four minutes. That is why minutes matter.',
      },
      {
        q: 'Is rising sign the same as Ascendant?',
        a: 'Yes. Rising sign usually means the sign of the Ascendant. The Ascendant is the exact degree; the rising sign is which tropical sign that degree falls in.',
      },
      {
        q: 'Why is my rising sign different on another site?',
        a: 'Check timezone, daylight-saving, coordinates, and whether the other site is sidereal. SideraChart is tropical Placidus by default. A noon placeholder also produces a fake Ascendant.',
      },
    ],
  },
  'moon-sign': {
    title: 'What is a Moon sign?',
    excerpt:
      'Your Moon sign is the tropical sign the Moon occupied at birth. It changes every two and a half days. Time still matters for the degree, the house and cusp days.',
    sections: [
      {
        heading: 'What is a Moon sign?',
        paragraphs: [
          'Your Moon sign is the tropical zodiac sign that contained the Moon when you were born. People ask for it because it is the second most famous placement after the Sun, and because it moves fast enough that two people with the same Sun often do not share it. The Moon is a longitude like any other planet in the natal chart, only quicker: about 13° per day, a new sign every two and a half days.',
          'In chart language the Moon describes the un-scored hours: appetite, sleep, what you do when nobody is grading the performance. That is a function, not a medical note and not a permission slip. SideraChart places the Moon with the same VSOP87-class engine (astronomy-engine) as the Sun, in the tropical zodiac, not sidereal.',
        ],
      },
      {
        heading: 'How fast the Moon moves',
        paragraphs: [
          'Because the Moon is fast, a birth time still earns its keep even when the sign looks obvious. The degree changes by roughly half a degree per hour. Aspects to the Moon tighten or loosen across a morning. The house of the Moon — once you have an Ascendant — will be wrong if the clock is wrong, even when the sign is right.',
          'On a sign-change day the clock decides the sign itself. If you were born on a day the Moon left Taurus for Gemini, an unknown time means you do not yet have a Moon sign. Do not pick the one you prefer. Calculate it, or mark the gap.',
        ],
      },
      {
        heading: 'Moon sign without a birth time',
        paragraphs: [
          'If you have a date and not a time, the Moon’s sign is usually still correct. The degree is not. The house is not, because houses require the Ascendant, and the Ascendant requires the minute. SideraChart’s rule is the same as for the rest of the chart: unknown time = planets yes, houses no. The Moon is a planet in that sentence.',
          'A noon placeholder is an estimate. It is useful for a first look at the sign on a quiet day. It is not a fact you should argue from when the degree, the house, or a cusp is in play. Prefer a certificate time. If there is none, say the time is unknown and read the Moon in sign only.',
        ],
      },
      {
        heading: 'Moon vs Sun in the same chart',
        paragraphs: [
          'The Sun is the monthly index everyone already knows. The Moon is the faster inner weather. They can occupy the same sign (a New Moon birth) or opposite signs (a Full Moon birth) or anything between. Sun–Moon aspects use SideraChart’s orbs: 8° conjunction and opposition, 6° square and trine, 4° sextile. A tight Sun–Moon square is a louder statement than two sign memes stacked.',
          'The Big Three put the Moon between Sun and rising. You can know Sun and Moon (usually) without a time. You cannot complete the trio without one. If you only came for the Moon sign, still enter time and place when you have them so the degree and any aspects are honest.',
        ],
      },
      {
        heading: 'Degree, house and aspects',
        paragraphs: [
          'The degree tells you how early or late the Moon is in the sign and how close it is to an aspect. The house, with a known Ascendant, tells you which department of life carries that lunar function. Empty other houses do not cancel the Moon; they just mean the Moon is not sitting in those rooms.',
          'SideraChart’s Moon-sign calculator is the natal engine filtered to one body. The full birth chart adds houses (Placidus by default), the Ascendant, and the aspectarian. Daily transits to your natal Moon are stored in the cabinet at noon in the natal timezone. Those are later sky, not a rewrite of the natal Moon.',
        ],
      },
      {
        heading: 'How to calculate your Moon sign',
        paragraphs: [
          'Enter birth date, time if you have it, and place. Read the Moon row: sign, degree, house if the clock is known. Positions are tropical. If another app is sidereal, the Moon may sit in the previous sign; that is the ayanamsha gap, not a bug in astronomy-engine.',
          'Do not treat a Moon sign as financial, legal or medical advice. Use it as a coordinate. If the time is missing, keep the coordinate coarse: sign only. If the time is present, use the degree and the aspects. That is the whole method.',
          'Compare with the Sun before you stop. Same-sign Sun and Moon (a New Moon birth) is a different texture from a Full Moon opposition. Both are ordinary astronomy. SideraChart will show the orb; you decide whether 6° still counts as loud. The cabinet’s later Moon transits are weather, stored at noon natal time, not a new Moon sign.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I find my Moon sign?',
        a: 'Calculate a natal chart from birth date, time and place. The Moon row is the tropical sign. SideraChart’s Moon-sign calculator uses the same engine as the full chart.',
      },
      {
        q: 'Do I need a birth time for my Moon sign?',
        a: 'Usually not for the sign. You need a time for the degree, the house, and any birthday when the Moon changed signs.',
      },
      {
        q: 'How often does the Moon change signs?',
        a: 'About every two and a half days. That is why people born in the same Sun-sign month often have different Moons.',
      },
      {
        q: 'Why does my Moon sign differ on a Vedic site?',
        a: 'Sidereal zodiacs measure from a star-based zero point about 24° from the tropical equinox today. SideraChart is tropical only.',
      },
    ],
  },
  'venus-sign': {
    title: 'What is a Venus sign?',
    excerpt:
      'Your Venus sign is the tropical sign Venus occupied at birth. It describes style in attraction, taste and values — a natal coordinate, not a dating verdict.',
    sections: [
      {
        heading: 'What is a Venus sign?',
        paragraphs: [
          'Your Venus sign is the tropical zodiac sign that contained Venus at your birth. People search “what is a Venus sign?” because popular astrology uses Venus as shorthand for taste, attraction and the way you price things that are not invoices — art, manners, the people you keep. On the instrument it is one planetary longitude, calculated like the others from birth date, time and place.',
          'SideraChart places Venus in the tropical zodiac with astronomy-engine (VSOP87). It is not a sidereal Venus and not a Chinese hour. The sign is the 30° slice. The house, if you have a birth time, is the local department. Aspects to Venus use orbs of 8° / 6° / 4°. None of that is a verdict on whether a relationship should continue.',
        ],
      },
      {
        heading: 'What Venus measures in a natal chart',
        paragraphs: [
          'Venus is the chart’s appetite for harmony, value and contact. In practice you read it as how you like rooms to feel, what you call beautiful enough, and how you bargain for closeness. That is descriptive. It does not tell you whom to date, whether to spend money, or how to settle a legal dispute. Keep the function; drop the fortune-telling.',
          'Venus never travels far from the Sun, so your Venus sign is often the same as your Sun sign or a neighbour. That is astronomy, not destiny. A Gemini Sun with Taurus Venus is a common split: solar plot in one style, Venus in the previous. Read both instead of forcing them into one slogan.',
        ],
      },
      {
        heading: 'Speed, retrograde and sign changes',
        paragraphs: [
          'Venus spends a few weeks in a sign in direct motion and longer when it stations or turns retrograde. Retrograde Venus at birth is a natal fact about the apparent motion, not a curse and not a personality disorder. It means the longitude was moving backwards along the ecliptic that day. Calculate it; do not dramatise it.',
          'Because Venus is slower than the Moon, you usually get the correct sign from the date alone. Time still sets the degree, the house, and which side of a cusp you are on. Unknown time: planets yes, houses no. Do not invent noon to put Venus in the seventh house and then treat that house as evidence.',
        ],
      },
      {
        heading: 'Venus vs the Big Three',
        paragraphs: [
          'Sun, Moon and rising remain the first pass. Venus is a specialist coordinate you read after those three, unless Venus is piled on an angle or locked in a tight aspect to them. A Venus–Saturn conjunction inside 8° is louder than a Venus sign blurb. Look at the aspectarian.',
          'Rising sign still needs the clock. If you came only for Venus and you have a time, enter it anyway so house and aspects are real. SideraChart’s Venus-sign calculator is the natal engine filtered to one glyph. The full chart is the context that keeps Venus from eating the whole reading.',
        ],
      },
      {
        heading: 'Houses and aspects to Venus',
        paragraphs: [
          'With a known Ascendant, Venus in a house names the life department where that valuing function is obvious — fourth, seventh, tenth and so on. Empty houses elsewhere are not missing organs. Placidus is SideraChart’s default; Whole Sign is the alternative when you want equal signs or when you are at high latitude.',
          'Major aspects to Venus are conjunction, sextile, square, trine and opposition. Tighter orbs read first. Transits to natal Venus later live in the daily cabinet, stored at noon in the natal timezone. Those transits do not change the natal Venus sign. They are weather against a fixed point.',
        ],
      },
      {
        heading: 'How to find your Venus sign',
        paragraphs: [
          'Enter birth date, time and place in SideraChart. Read the Venus row. Compare with the Sun: often nearby, sometimes the same. If a sidereal app disagrees, you are looking at a different zero point, about 24° away. Switch that app to tropical if you want to match this site.',
          'Use the placement as a coordinate in a natal chart, not as dating advice. If the time is unknown, keep Venus in sign and skip the house. If the time is known, read degree, house and aspects. Then put Venus back next to the rest of the wheel.',
          'If you also run synastry later, Venus contacts between two charts are a different map. Calculate your natal Venus first so you know which longitude other people are contacting. Composite midpoints that include Venus are a third map again. One coordinate, three instruments — do not mix the printouts.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I find my Venus sign?',
        a: 'Run a natal chart or SideraChart’s Venus-sign calculator with your birth date, and add time and place if you have them. The Venus row is the tropical sign and degree.',
      },
      {
        q: 'Does Venus need an exact birth time?',
        a: 'Usually not for the sign. You need a time for the house, the exact degree on a cusp, and aspects that tighten across the day.',
      },
      {
        q: 'What does Venus retrograde in the natal chart mean?',
        a: 'It means Venus’s apparent ecliptic longitude was moving backwards at birth. Calculate it as a motion fact. It is not a medical or relationship verdict.',
      },
      {
        q: 'Why is my Venus sign next to my Sun sign?',
        a: 'Venus stays near the Sun in the sky, so the natal signs are often the same or adjacent. That is orbital geometry, not a special destiny.',
      },
    ],
  },
  'mercury-sign': {
    title: 'What is a Mercury sign?',
    excerpt:
      'Your Mercury sign is the tropical sign Mercury occupied at birth. Mercury stays near the Sun, so the signs match or neighbour. Time still sets house and degree.',
    sections: [
      {
        heading: 'What is a Mercury sign?',
        paragraphs: [
          'Your Mercury sign is the tropical zodiac sign that contained Mercury at your birth. People look it up because Mercury is the chart’s language-and-errand function: how you sort information, talk, commute, and change your mind. It is one longitude in the natal chart, not a measure of intelligence and not a diagnosis of attention.',
          'SideraChart calculates Mercury in the tropical zodiac from astronomy-engine (VSOP87), with Placidus houses when a birth time is present. It does not use Swiss Ephemeris and does not offer a sidereal or Vedic Mercury. If another app disagrees by about a sign, check whether it is sidereal before assuming an error.',
        ],
      },
      {
        heading: 'Mercury never far from the Sun',
        paragraphs: [
          'Mercury’s orbit keeps it close to the Sun in the sky, so your Mercury sign is usually the same as your Sun sign or one sign away. A Leo Sun with Virgo Mercury is ordinary geometry. Treat that split as useful: solar plot in one style, the talking and sorting function in the next. Do not collapse them into a single meme.',
          'Because Mercury is not as fast as the Moon, the date often settles the sign. Time still matters for the degree, for aspects that form during the day, and for the house. Unknown time: you can keep the Mercury sign; you cannot keep a Mercury-in-house statement.',
        ],
      },
      {
        heading: 'Mercury retrograde at birth',
        paragraphs: [
          'Mercury stations and turns retrograde three or four times a year. A natal retrograde Mercury means the apparent longitude was moving backwards on the ecliptic at birth. That is a motion flag, not a curse on your emails and not a learning-disability label. Calculate it, note it, read the sign and aspects around it.',
          'Retrograde periods also mean Mercury may spend extra time in a sign or re-enter the previous one. Cusp days around stations deserve a real clock. If the time is unknown on those dates, leave the sign unsettled rather than picking the story you like.',
        ],
      },
      {
        heading: 'Mercury, houses and the Big Three',
        paragraphs: [
          'Read Sun, Moon and rising first unless Mercury is conjunct one of them or piled on an angle. A Mercury–Moon conjunction inside 8° will colour both functions. Rising still needs the birth time; without it, skip houses entirely.',
          'Mercury in a house (Placidus default) names where the sorting function is obvious — third, sixth, tenth, and so on. Empty houses are empty of planets, not empty of life. Whole Sign is available when you want each house to be a whole sign from the Ascendant’s sign, or when Placidus misbehaves at high latitude.',
        ],
      },
      {
        heading: 'Aspects to Mercury',
        paragraphs: [
          'Major aspects are conjunction, sextile, square, trine and opposition. SideraChart’s orbs are 8° for conjunction and opposition, 6° for square and trine, 4° for sextile. Tight Mercury–Saturn or Mercury–Uranus contacts will say more than the sign blurb. Use the table under the wheel.',
          'Transits to natal Mercury appear later in the daily cabinet, stored at noon in the natal timezone so the day’s note does not drift if you refresh at 23:00. Those transits do not rewrite the natal Mercury sign. The natal placement is the baseline.',
          'A transiting Mercury retrograde over natal Mercury is a temporary overlay, popular in headlines and easy to over-read. Note the orb, note whether it is applying, then look at the rest of the day’s slow contacts. Fast Mercury weather should not outrank a Saturn transit that is actually tight.',
        ],
      },
      {
        heading: 'How to calculate your Mercury sign',
        paragraphs: [
          'Use SideraChart’s Mercury-sign calculator or the full birth chart. Enter date, time and place. Read the Mercury row, then glance at the Sun to see whether they share a sign. Tropical only. If you need houses, you need the clock; if you do not have the clock, stop at the sign.',
          'Do not treat Mercury as career, legal or medical advice. It is a coordinate for how the chart talks and sorts. Put it back in the wheel with Venus, Mars and the Big Three before you decide the chart has a single theme.',
          'When you match another website, set tropical zodiac and the same birth time zone. A Mercury sign that jumps is usually sidereal, a station-day clock error, or a timezone history miss — not astronomy-engine failing. Houses will still disagree if one site used Whole Sign and you left SideraChart on Placidus.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I find my Mercury sign?',
        a: 'Calculate a natal chart from birth date, time and place, or use SideraChart’s Mercury-sign calculator. The Mercury row is the tropical sign and degree.',
      },
      {
        q: 'Why is my Mercury in the same sign as my Sun?',
        a: 'Mercury never strays far from the Sun, so the natal signs often match or sit next door. Check the degrees; they can still aspect other planets differently.',
      },
      {
        q: 'Do I need a birth time for Mercury?',
        a: 'Usually not for the sign. You need a time for the house and for cusp or station days when Mercury’s sign can flip.',
      },
      {
        q: 'Is natal Mercury retrograde a bad thing?',
        a: 'It is an apparent-motion fact, not a verdict. Read the sign, house and aspects. It is not a statement about intelligence or health.',
      },
    ],
  },
  'mars-sign': {
    title: 'What is a Mars sign?',
    excerpt:
      'Your Mars sign is the tropical sign Mars occupied at birth. It describes how the chart starts, argues and pursues — a natal coordinate, not a licence for conflict.',
    sections: [
      {
        heading: 'What is a Mars sign?',
        paragraphs: [
          'Your Mars sign is the tropical zodiac sign that contained Mars at your birth. People search “what is a Mars sign?” because popular copy treats Mars as fuel: how you start, compete, desire, and get angry. On the instrument it is a planetary longitude in a natal chart, calculated from birth date, time and place. It is not a permission slip for cruelty and not a medical reading of blood or muscles.',
          'SideraChart places Mars in the tropical zodiac using astronomy-engine (VSOP87). Houses, when the clock is known, default to Placidus. Sidereal and Chinese systems are out of scope. If a Vedic app shows a different Mars sign, you are looking at a different zero point, not a different planet.',
        ],
      },
      {
        heading: 'What Mars describes in the chart',
        paragraphs: [
          'Mars is the initiating and combative function: heat, pursuit, the first move in a conflict, the will to cut a path. You read the sign as the style of that heat — direct, slow, tactical, theatrical — and the house as the department where it shows. Keep it descriptive. Do not use it to justify harm or to predict violence.',
          'Mars can sit far from the Sun, unlike Mercury and Venus, so your Mars sign is often different from your Sun sign. That split is ordinary. A Taurus Sun with Aries Mars is not a contradiction. It is two functions with two styles. Read both, then check the aspect table before you rank either one.',
        ],
      },
      {
        heading: 'Speed, retrograde and time of birth',
        paragraphs: [
          'Mars spends roughly six to seven weeks in a sign when direct, longer around retrograde. Natal retrograde Mars means the apparent longitude was moving backwards at birth. Note it as motion. Do not treat it as a character flaw.',
          'The date usually settles the sign. Time still sets the degree, aspects across the day, and the house. Unknown time: planets yes, houses no. A noon chart that parks Mars on an angle is a guess. If you care about “Mars in the first house,” you need an actual Ascendant, which means an actual clock.',
        ],
      },
      {
        heading: 'Mars, the Big Three and other planets',
        paragraphs: [
          'Read Sun, Moon and rising first unless Mars is conjunct one of them or sitting on the Ascendant or Midheaven. A Mars–Moon square inside 6° will speak louder than a Mars-sign paragraph. Rising still requires birth time and place.',
          'Mars–Venus and Mars–Saturn contacts are easy to over-narrate. Use SideraChart’s aspectarian and the stated orbs: 8° conjunction and opposition, 6° square and trine, 4° sextile. Tight first. Wide contacts at the edge of orb are quieter. The wheel’s coloured lines match the table.',
        ],
      },
      {
        heading: 'Houses and later transits',
        paragraphs: [
          'With a known Ascendant, Mars in a house names where the initiating function is obvious. Empty houses do not mean you lack that area of life; they mean no planet is sitting in that room. Placidus is the default because most Western texts assume it. Whole Sign is cleaner at high latitudes and when you want sign = house.',
          'Transits to natal Mars are later weather. SideraChart’s cabinet stores the day’s overlay at noon in the natal timezone. A transiting Mars square to natal Mars is a temporary contact, not a rewrite of the natal Mars sign. Keep the baseline and the weather in different drawers.',
          'Mars return — transiting Mars back on the natal degree — is a cycle of about two years, not a personality reset. If you track it in the cabinet, you are tracking a repeating contact, not a new natal chart. Missed days stay missed; the product does not invent a return you did not open.',
        ],
      },
      {
        heading: 'How to find your Mars sign',
        paragraphs: [
          'Use the Mars-sign calculator or the full natal chart on SideraChart. Enter date, time and place. Read the Mars row, then the aspects. Tropical only. Match other sites by setting them to tropical plus Placidus if you want the same houses.',
          'Put Mars back in the chart. A Mars sign without Sun, Moon, rising and the rest is a specialist note. Calculate it carefully, then read it as one function among ten bodies, not as the whole person.',
          'If time is unknown, you can still quote the Mars sign and planet-to-planet aspects. You cannot quote Mars on the Ascendant or in the tenth house. Write the limit on the same page as the sign so you do not smuggle house language back in later.',
        ],
      },
    ],
    faq: [
      {
        q: 'How do I find my Mars sign?',
        a: 'Calculate a natal chart or use SideraChart’s Mars-sign calculator with birth date, time and place. The Mars row is the tropical sign and degree.',
      },
      {
        q: 'Do I need a birth time for my Mars sign?',
        a: 'Usually not for the sign. You need a time for the house, for a cusp, and for any claim that Mars sits on an angle.',
      },
      {
        q: 'What does natal Mars retrograde mean?',
        a: 'Apparent backward motion along the ecliptic at birth. Record it as a motion flag and read the sign and aspects. It is not a verdict on anger or health.',
      },
      {
        q: 'Why does my Mars sign differ from my Sun sign?',
        a: 'Mars can be anywhere on the ecliptic relative to the Sun over its two-year cycle. Different signs are normal. Read both placements.',
      },
    ],
  },
  'why-birth-time-matters': {
    title: 'Why does birth time matter for a natal chart?',
    excerpt:
      'Birth time sets the Ascendant, houses and the Moon’s degree. A twenty-minute error can change the rising sign. Without a time you get planetary signs, not houses.',
    sections: [
      {
        heading: 'Why does birth time matter for a natal chart?',
        paragraphs: [
          'Birth time matters because two different clocks are hiding in one civil timestamp. The first clock converts your local time to Universal Time so planetary longitudes are correct. The second clock, with latitude and longitude, sets local sidereal time — which degree of the ecliptic was rising, which was culminating, and where the house cusps fall. People ask “why does birth time matter?” when they have a birthday but not a minute. The short answer: planets mostly survive; the local frame does not.',
          'SideraChart uses IANA timezone rules in force on that date, including historical daylight-saving, then reads tropical positions from astronomy-engine (VSOP87). A wrong timezone is as damaging as a wrong minute. A birth listed as 14:00 in the wrong offset is a different sky and a different Universal Time.',
        ],
      },
      {
        heading: 'The Ascendant moves about one degree every four minutes',
        paragraphs: [
          'The rising sign is a horizon degree. It travels roughly 1° in four minutes, a new sign in about two hours. A twenty-minute error is about five degrees and can flip the sign near a boundary. That is not a mystical sensitivity. It is the Earth turning.',
          'If your rising sign is wrong, Placidus houses are wrong with it, because house I starts at the Ascendant. Every planet-in-house sentence then shifts. That is the main reason to care about the clock even when the Sun sign is obvious.',
        ],
      },
      {
        heading: 'Houses depend on local sidereal time',
        paragraphs: [
          'Houses are sectors of the local sky, not signs. Signs are 30° of the tropical zodiac. Houses are what you get when you divide the space around the horizon and meridian. Placidus, SideraChart’s default, divides time of ascension, so houses are unequal. Whole Sign gives each house a full sign from the Ascendant’s sign.',
          'Without a birth time there is no honest Ascendant and therefore no honest houses. Unknown time = planets yes, houses no. SideraChart follows that rule instead of silently parking you at noon. Noon is a convention for some historical charts; it is not your Ascendant.',
        ],
      },
      {
        heading: 'The Moon’s degree and other fast facts',
        paragraphs: [
          'The Moon moves about half a degree per hour. Across a day that is several degrees — enough to change aspects and, on a sign-change day, the Moon sign itself. Mercury, Venus and the Sun can also sit on a cusp. Outer planets barely move in a day; their signs are safe without a time.',
          'Aspects among planets still exist without houses. SideraChart will list major aspects inside orbs of 8° / 6° / 4° from planetary longitudes even when the Ascendant is omitted. What you lose is anything that needs an angle: rising sign, house cusps, planets on the Midheaven.',
        ],
      },
      {
        heading: 'Certificates, memory and rounded hours',
        paragraphs: [
          'Prefer a birth certificate or hospital record over a story. Relatives round. “About six” can mean 17:40. Recalculate a range if the time is approximate and see whether the Ascendant stays put. If it does not, you do not have a rising sign yet.',
          'Do not rectify a time to match a biography inside this calculator. SideraChart will not invent a minute to make the tenth house look like your job title. If the time is unknown, mark it unknown. Read planets in signs and aspects. Leave houses for a day you have a clock.',
          'Hospital records beat baptismal guesses. A time written as 16 h 30 is better than “late afternoon.” If the document uses an old local mean time, say so when you compare with another site; IANA conversion assumes the civil timezone of that date, which is what SideraChart applies.',
        ],
      },
      {
        heading: 'What to enter on SideraChart',
        paragraphs: [
          'Date, time, place. Place is searched to coordinates; time is converted with IANA; planets come from VSOP87-class ephemerides; houses default to Placidus. If time is missing, use the unknown-time option. You still get a usable planetary chart. You do not get a rising sign.',
          'Later, the daily cabinet stores transits at noon in the natal timezone. That noon is a stable snapshot for transits, not a substitute for a missing birth time. Your natal Ascendant still needs the real minute. Do not mix those two noons.',
          'If relatives give you two times an hour apart, calculate both and compare Ascendants. If the sign holds, you have a working rising sign with a degree range. If it flips, you do not have one yet. Publish the range, not a fake precision of 14:00:00.',
        ],
      },
    ],
    faq: [
      {
        q: 'What happens if my birth time is wrong?',
        a: 'Planetary signs usually survive. The Ascendant, houses and Moon degree may not. A twenty-minute error can change the rising sign near a cusp.',
      },
      {
        q: 'Is a noon birth chart accurate?',
        a: 'It can estimate planetary signs on a quiet day. It is not an accurate Ascendant or house system. SideraChart treats unknown time as planets only.',
      },
      {
        q: 'Does birth place matter as much as time?',
        a: 'For the Ascendant and houses, yes: latitude and longitude set the horizon. For planetary signs, place barely matters. Timezone errors matter for both.',
      },
      {
        q: 'Can I use 12:00 if I do not know the time?',
        a: 'You can as a sketch for signs. Do not read houses or rising from it. Mark time unknown on SideraChart instead of pretending noon is a fact.',
      },
    ],
  },
  'birth-chart-without-time': {
    title: 'Can I make a birth chart without a birth time?',
    excerpt:
      'Yes: planetary signs and aspects still calculate without a birth time. The Ascendant and houses do not. Do not treat a noon chart as a full natal map of houses.',
    sections: [
      {
        heading: 'Can I make a birth chart without a birth time?',
        paragraphs: [
          'Yes, with a clear limit. Without a birth time you can still calculate planetary longitudes from the date (and a timezone/place for Universal Time). That gives you Sun through Pluto in tropical signs, and the major aspects among them. You cannot calculate a reliable Ascendant, Midheaven, or house cusps. The honest natal chart without a time is a planetary chart, not a full wheel of houses.',
          'SideraChart lets you mark time as unknown and then returns planets while skipping the rising sign. That is the correct product. Many sites silently use 12:00 and draw houses anyway. Those houses belong to whoever was born at noon, which is not a fact about you.',
        ],
      },
      {
        heading: 'What you still get: planetary signs',
        paragraphs: [
          'The Sun, Mercury, Venus, Mars and the outer planets move slowly enough that a calendar date usually locks the sign. Aspects among those bodies are also usable, with SideraChart’s orbs of 8° conjunction and opposition, 6° square and trine, 4° sextile. You can read a lot of a chart this way: element balance, a stellium in one sign, a tight Saturn square to the Sun.',
          'Place still helps, because timezone and daylight-saving convert the date into Universal Time. A birth near midnight can technically fall on the neighbouring date in UT. If you know the city but not the minute, enter the place and unknown time rather than a fake clock.',
        ],
      },
      {
        heading: 'What you lose: Ascendant and houses',
        paragraphs: [
          'The Ascendant is a horizon degree. It needs the minute. Houses in Placidus start there. Whole Sign houses also need the Ascendant’s sign. No time, no houses — not “approximate houses.” Unknown time = planets yes, houses no. Internalise that sentence and you will avoid the most common bad natal chart on the internet.',
          'Without houses you cannot honestly say a planet is in the tenth house, or that you have an empty seventh. Those statements are local. You can still say the planet is in Capricorn, or that two planets are in opposition. Stay on the ecliptic until you have a clock.',
        ],
      },
      {
        heading: 'The Moon on a sign-change day',
        paragraphs: [
          'The Moon is the exception that bites. It changes sign every two and a half days. If it did not change on your birthday, the sign is usually safe without a time. If it did, you do not have a Moon sign until you have a clock. Do not choose the Moon you like more.',
          'Even on a quiet Moon day, the degree is uncertain by several degrees across twenty-four hours. Aspects that sit near the orb boundary — 8°, 6°, 4° — may be in or out depending on the hour. Treat edge-of-orb Moon aspects as provisional when time is unknown.',
        ],
      },
      {
        heading: 'Why noon is a guess, not a chart',
        paragraphs: [
          'Noon is popular because it is the middle of the civil day and because some historical ephemerides listed daily positions at noon. It is still a specific time. It produces a specific Ascendant for that latitude. Using it as a stand-in for “unknown” hides the uncertainty instead of labelling it.',
          'If you must sketch, calculate planets at noon and ignore the house wheel. SideraChart’s unknown-time path does that labelling for you. Polar births have a second problem: Placidus cusps break down above about 66° latitude even with a perfect time. That is a house-system limit, not a reason to fake a clock.',
        ],
      },
      {
        heading: 'How to use SideraChart without a time',
        paragraphs: [
          'Enter date and place, mark time unknown, read the planet table. Skip rising-sign tools. Skip any sentence that needs a house. You can still use planet-sign calculators for Sun, Moon (usually), Mercury, Venus and Mars. Tropical zodiac, VSOP87 via astronomy-engine, not Swiss Ephemeris, not sidereal.',
          'Aspects among the planets remain fair game. Sort them by orb the same way: 8° conjunction and opposition, 6° square and trine, 4° sextile. A tight Sun–Saturn square without houses is still a tight Sun–Saturn square. What you must not do is attach it to “tenth house career” until the Ascendant exists.',
          'If a time turns up later — a certificate, a midwife’s note — recalculate and then, and only then, read houses. The daily cabinet’s noon snapshot for transits is a different noon: it stores today’s sky against a saved natal chart. It does not fill in a missing birth minute. Keep those jobs separate.',
          'You can still save a planetary-only chart. The written layer will be thinner because house sentences drop out. That is preferable to a thick report built on noon cusps. When the clock arrives, recalculate once and replace the saved chart rather than stacking two conflicting wheels.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I cast a natal chart with only a birth date?',
        a: 'You can cast planetary signs and aspects. You cannot cast a reliable Ascendant or houses. SideraChart marks that limit when time is unknown.',
      },
      {
        q: 'Is a 12:00 birth time OK if I do not know the real time?',
        a: 'Only as a sketch for slow planets. Do not read the rising sign or houses from noon. Prefer the unknown-time option.',
      },
      {
        q: 'Will my Moon sign be correct without a time?',
        a: 'Usually, unless the Moon changed signs on your birthday. The degree and house will not be correct without a clock.',
      },
      {
        q: 'What should I read first if I have no birth time?',
        a: 'Planetary signs, especially Sun, Moon if safe, Mercury, Venus, Mars, and the tightest aspects. Leave houses until you have a time.',
      },
    ],
  },
  'how-to-read-a-natal-chart': {
    title: 'How to read a natal chart',
    excerpt:
      'Read a natal chart in order: Big Three, occupied houses, then tightest aspects. Use the tables as the instrument. Unknown time means skip houses and the Ascendant.',
    sections: [
      {
        heading: 'How to read a natal chart',
        paragraphs: [
          'A natal chart is easier if you refuse to read everything at once. Start with the Big Three — Sun, Moon, rising — then the houses that actually contain planets, then the tightest major aspects. The wheel is a map. The tables are the instrument. Numbers first: sign, degree, house, orb. Text second. That order keeps you from drowning in twelve sign essays before you know which rooms are occupied.',
          'You need birth date, time and place for the full method. If time is unknown, drop rising and houses and read planets in signs plus aspects. SideraChart follows that split. Do not “how to read a natal chart” your way around a missing clock by pretending noon is data. Write the gap on the page.',
        ],
      },
      {
        heading: 'Start with Sun, Moon and rising',
        paragraphs: [
          'Sun is the daylight plot, from the date. Moon is the faster inner weather; check whether it changed sign that day. Rising is the eastern horizon and only exists with a time. Read whether the three rhyme or argue. Then look at aspects among them with orbs of 8° / 6° / 4°.',
          'If you only have the Sun, you do not yet know how to read the chart; you know one coordinate. SideraChart’s wheel puts those three glyphs where you can see them before you hunt for asteroids or hypothetical points this site does not use.',
        ],
      },
      {
        heading: 'Then read occupied houses',
        paragraphs: [
          'Houses are local departments. A planet in the tenth is not the same as that planet in the fourth, even in the same sign. List the houses that contain bodies. Those are the loud rooms. Empty houses are not defects; they are rooms without a planet sitting in them. There is a separate article for that.',
          'SideraChart defaults to Placidus because most Western texts assume it. Whole Sign is the other grid. Polar latitudes above about 66° should not force broken Placidus cusps. If the time is unknown, skip this entire step. Planet-in-house language without an Ascendant is fiction.',
        ],
      },
      {
        heading: 'Then read the tightest aspects',
        paragraphs: [
          'Aspects are named angles: conjunction, sextile, square, trine, opposition. Sort by orb, tightest first. A 0.4° Sun–Saturn conjunction outranks a 7.8° Mars trine. SideraChart draws the five majors and lists applying or separating in the table. Hide the lines on the wheel if the drawing is noisy; the table remains.',
          'Do not moralise aspects. Squares are friction that builds a skill if you work them; they are not curses. Trines are ease that can go lazy. Conjunctions fuse functions. Oppositions polarise. Keep the geometry. Drop “the universe wants.”',
        ],
      },
      {
        heading: 'Wheel versus tables versus written layer',
        paragraphs: [
          'The outer ring is signs. The inner divisions are houses. Glyphs sit on longitudes. Coloured lines are aspects. Open a table row for the exact sign, house and degree. The written cards under a saved chart are a cached interpretation layer, not a live language model inventing new physics.',
          'A PNG export is a snapshot for sharing. The live tables are what you reread. If another site disagrees, match tropical zodiac, Placidus, and the same birth time zone before you blame ephemerides. SideraChart uses astronomy-engine (VSOP87), not Swiss Ephemeris. Differences of a few arcminutes are expected; a whole sign usually means a sidereal setting or a wrong clock.',
        ],
      },
      {
        heading: 'A working order on SideraChart',
        paragraphs: [
          'Calculate the chart. Confirm date, time, place, tropical, Placidus. Read Sun, Moon, Ascendant. Scan occupied houses. Sort aspects by orb. Only then open sign-by-sign copy. Save the chart if you want the report and the daily cabinet. Transits in the cabinet are stored at noon natal time; they are a later step, not step one of reading the natal.',
          'Keep a working note of three facts only at first: the Big Three, the most occupied house, the tightest aspect. That is a natal-chart reading you can actually finish. Expand to rulers of empty houses and slow transits after those three facts are stable.',
          'Stop before medical, legal or financial conclusions. The method is: coordinates, then structure, then cautious language. If you skip the coordinates, you are reading a horoscope column, not a natal chart.',
          'Reread the same chart a week later using the same order. The wheel does not change; your eye does. If a new detail appears, check it against the table. If it does not exist in the numbers, it is not in the natal chart, however attractive the sentence.',
        ],
      },
    ],
    faq: [
      {
        q: 'What should I look at first in a natal chart?',
        a: 'Sun, Moon and rising, then occupied houses, then the tightest aspects. Leave empty houses and minor points for later.',
      },
      {
        q: 'How do I read a natal chart without a birth time?',
        a: 'Read planetary signs and aspects only. Skip the Ascendant and all house statements. SideraChart omits rising when time is unknown.',
      },
      {
        q: 'Do I read signs or houses first?',
        a: 'Signs tell you style; houses tell you department. After the Big Three, list occupied houses, then combine: “Mars in Aries in the tenth” is both.',
      },
      {
        q: 'What orbs should I use when reading aspects?',
        a: 'SideraChart uses 8° for conjunction and opposition, 6° for square and trine, 4° for sextile. Tighter orbs first.',
      },
    ],
  },
  'houses-in-a-birth-chart': {
    title: 'What are houses in a birth chart?',
    excerpt:
      'Houses are twelve local sectors of the birth sky, not zodiac signs. They need a birth time. SideraChart defaults to Placidus; unknown time means no honest houses.',
    sections: [
      {
        heading: 'What are houses in a birth chart?',
        paragraphs: [
          'Houses are twelve sectors of the sky as seen from the birthplace at the birth moment. They are not signs. Signs are 30° slices of the tropical zodiac along the ecliptic. Houses are a local frame: which part of that sky was rising, culminating, setting. A planet’s sign is its style. A planet’s house is the department of life where that style is easy to spot.',
          'You cannot have houses without a birth time, because the frame is tied to the horizon. Unknown time = planets yes, houses no. People who publish house readings from a noon placeholder are describing noon, not an unknown minute. SideraChart does not do that by default.',
        ],
      },
      {
        heading: 'Houses are local; signs are zodiacal',
        paragraphs: [
          'Two people can share a Sun in Capricorn and not share a tenth house. The Sun’s house depends on the Ascendant, which depends on time and place. That is why house talk feels more “biographical” than sign talk, and why it is more fragile. If the clock is wrong, the biography you just wrote is attached to the wrong rooms.',
          'Read them together when you have both: “Venus in Taurus in the second” is a different sentence from “Venus in Taurus in the eighth.” Same sign, different department. If you only have the sign, stop at the sign.',
        ],
      },
      {
        heading: 'Placidus is the default on SideraChart',
        paragraphs: [
          'Placidus divides time of ascension rather than equal slices of space, so houses are uneven. SideraChart defaults to it because most published Western interpretations assume Placidus. Whole Sign is available: house I is the whole sign that contains the Ascendant, then the next signs in order. Neither system is Vedic sidereal practice; both here sit on tropical longitudes from astronomy-engine (VSOP87).',
          'Above roughly 66° latitude Placidus cusps can fail. For those births, Whole Sign is the more honest grid. Planetary positions are calculated either way. If a site disagrees with your houses, check the house system before the ephemeris. Swiss Ephemeris is not in this stack; a system mismatch is the usual culprit.',
        ],
      },
      {
        heading: 'Angular, succedent and cadent',
        paragraphs: [
          'Houses 1, 4, 7 and 10 are angular — tied to horizon and meridian, historically the loudest. 2, 5, 8 and 11 are succedent. 3, 6, 9 and 12 are cadent. This is a volume hint, not a moral ranking. A pile of planets in the twelfth is loud even if textbooks call the twelfth cadent.',
          'Traditional house topics (self, money, siblings, home, and so on) are a vocabulary, not a contract. Use them as labels for departments, then look at which planets actually occupy them. Do not invent events to fill a house that happens to be empty.',
        ],
      },
      {
        heading: 'Cusps, interceptions and high latitudes',
        paragraphs: [
          'In Placidus a house cusp is the boundary degree. A planet near a cusp is a judgement call; this site does not secretly move it to the next house for you. Intercepted signs — a sign swallowed inside a house with no cusp — happen at higher latitudes when houses stretch. Whole Sign avoids that geometry by tying houses to signs.',
          'If your birth is polar, do not torture Placidus. Switch system. If your birth time is rounded, recalculate a range and see whether planets change houses. If they do, those house statements are provisional.',
          'OpenStreetMap Nominatim supplies the coordinates SideraChart uses for place. A city-centre pin is not a hospital pin; for houses the difference is usually small, but at high latitude or near a cusp it can matter. Prefer the actual birth town over a later hometown.',
        ],
      },
      {
        heading: 'How to read houses on the wheel',
        paragraphs: [
          'On SideraChart the inner divisions are houses, counted from the Ascendant at the left. Glyphs sit on ecliptic longitude; the table tells you which house number that longitude fell in. Aspects stay on the ecliptic (orbs 8° / 6° / 4°) and do not care about house walls. House walls care about the clock.',
          'Save the chart to keep the house system with the report. Daily transits in the cabinet are computed at noon natal time against that natal frame. Transiting planets through houses only make sense if the natal houses were real in the first place — which, again, means you had a birth time.',
          'If you switch from Placidus to Whole Sign after saving, recalculate rather than mentally dragging glyphs. The planet did not move; the walls did. Note the system on any screenshot you share so a later comparison is not a fake disagreement.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between signs and houses?',
        a: 'Signs are 30° of the tropical zodiac. Houses are twelve local sectors from your birth horizon. Signs need a date; houses need a time and place.',
      },
      {
        q: 'Which house system should I use?',
        a: 'Placidus is SideraChart’s default and matches most Western texts. Use Whole Sign at high latitudes or if you want one sign per house.',
      },
      {
        q: 'Can I read houses without a birth time?',
        a: 'No. Without an Ascendant the house frame is not defined. You can still read planetary signs and aspects.',
      },
      {
        q: 'Why do my houses differ on another website?',
        a: 'Different house system, different timezone, or sidereal zodiac. Set the other site to tropical Placidus and the same coordinates before comparing.',
      },
    ],
  },
  'empty-houses': {
    title: 'What are empty houses in a birth chart?',
    excerpt:
      'An empty house has no planet sitting in it. It is not a missing area of life. You still need a birth time to know which houses are empty; noon charts fake the gaps.',
    sections: [
      {
        heading: 'What are empty houses in a birth chart?',
        paragraphs: [
          'An empty house is a house with no natal planet inside it. That is the whole definition. It is not a hole in your life, not a missing organ, and not a prediction that nothing will happen in that department. Ten bodies (Sun through Pluto plus the Moon) cannot occupy twelve rooms at once. Most charts have empty houses. If yours did not, you would have a very crowded wheel.',
          'You only know which houses are empty if you know the house frame, which means you know the birth time. Unknown time = planets yes, houses no — including empty-house talk. A noon chart can show “empty” houses that would fill or empty at 04:00. Do not interpret fake gaps.',
        ],
      },
      {
        heading: 'Empty does not mean inactive',
        paragraphs: [
          'Life continues in topics that have no planet on the cusp. Traditional reading still looks at the sign on the house cusp and at the planet that rules that sign. That is a longer method. The short method on this site is: occupied houses are louder because a planet is sitting there; empty houses are quieter on the wheel, not absent from the biography.',
          'Do not fill an empty house with fear. People search “what are empty houses in a birth chart?” because copy online treats them as defects. They are a crowding problem in the other rooms, not a curse on the empty ones.',
        ],
      },
      {
        heading: 'Rulership still counts',
        paragraphs: [
          'If the seventh house is empty but its cusp is in Libra, Venus still has a say as the traditional ruler. You will find Venus somewhere else in the chart — maybe in the second, maybe conjunct Saturn. That placement is how the empty house “speaks” without a resident. This is structure, not mysticism.',
          'SideraChart’s tables list planets in houses. They do not hide empty houses; they simply have no glyph there. Look at the cusp sign in the wheel if you want the ruler. Aspects (orbs 8° / 6° / 4°) can also tie a planet to topics associated with a house it does not occupy, because aspects are ecliptic angles, not room assignments.',
        ],
      },
      {
        heading: 'Stelliums and crowded houses',
        paragraphs: [
          'The counterpart of empty houses is a stellium: several planets in one sign or one house. That room gets the volume. Neighbouring houses may be empty because the bodies clustered. Read the cluster first. Then note the empty rooms without writing obituaries for them.',
          'House system changes which rooms look empty. Placidus (default) and Whole Sign can move a planet across a boundary, especially at high latitude or with a planet near a cusp. If an “empty seventh” appears in one system and not the other, you are looking at a boundary, not a destiny.',
        ],
      },
      {
        heading: 'Unknown time and fake empty houses',
        paragraphs: [
          'Without a birth time, every empty-house statement is invalid, because the walls are invalid. Do not use a 12:00 chart to announce that your fourth house is empty. Mark time unknown on SideraChart and skip houses. You can still talk about empty signs — no planet in Scorpio, for example — because signs do not need the horizon.',
          'If the time is approximate, recalculate a range. Planets that hop houses will create and destroy “emptiness” in twenty minutes. Treat those houses as unresolved. The Ascendant’s four-minute-per-degree motion is the same clock that makes empty-house lists fragile.',
          'Whole Sign can empty and fill different rooms than Placidus with the same planets. If you switch systems to “fix” an empty house you dislike, you are editing the grid, not the sky. Pick one system and read the crowding you actually have.',
        ],
      },
      {
        heading: 'How to read them on SideraChart',
        paragraphs: [
          'Calculate with date, time and place, tropical, Placidus unless you have a reason to switch. List occupied houses. The rest are empty. Read occupied first. Use cusp rulers if you need a second pass. Do not rank life areas by emptiness.',
          'Transits through an empty natal house are still transits through that sector of the natal frame. The daily cabinet stores them at noon in the natal timezone. A transit does not “fill” a natal empty house permanently. It is weather in that room for a while. The natal house remains empty of natal planets.',
          'If you came from a meme that numbered your empty houses as life failures, discard it. Count occupied houses, name the stellium if there is one, and stop. Emptiness is a drawing fact. It is not a forecast, a diagnosis, or a reason to guess a birth time so the seventh house looks inhabited.',
        ],
      },
    ],
    faq: [
      {
        q: 'Are empty houses in a birth chart bad?',
        a: 'No. They mean no natal planet sits in that house. Most charts have several. They are not missing parts of a life.',
      },
      {
        q: 'How many empty houses is normal?',
        a: 'With ten bodies and twelve houses, several empty houses are typical. A stellium in one house almost guarantees emptiness elsewhere.',
      },
      {
        q: 'Can I know my empty houses without a birth time?',
        a: 'No. Houses require the Ascendant. Without a time you can note empty signs, not empty houses.',
      },
      {
        q: 'Does an empty seventh house mean I will not have relationships?',
        a: 'No. That is the defect story. Read the ruler of the seventh and the rest of the chart. Do not treat emptiness as a forecast.',
      },
    ],
  },
  'aspects-in-astrology': {
    title: 'What are aspects in astrology?',
    excerpt:
      'Aspects are named angles between planets along the ecliptic: conjunction, sextile, square, trine, opposition. SideraChart uses orbs of 8°, 6° and 4° for those five.',
    sections: [
      {
        heading: 'What are aspects in astrology?',
        paragraphs: [
          'Aspects are angular distances along the ecliptic between two natal longitudes. They are geometry, not fate-lines. If two planets are 90° apart, that is a square. If they are 120° apart, that is a trine. The natal chart lists the ones inside an allowed orb. People search “what are aspects in astrology?” because the wheel’s coloured lines look like a secret language. They are a protractor.',
          'SideraChart draws five major aspects: conjunction (0°), sextile (60°), square (90°), trine (120°), opposition (180°). Orbs are 8° for conjunction and opposition, 6° for square and trine, 4° for sextile. Tighter orbs are louder. The table under the wheel is the same list as the lines, with applying or separating motion.',
        ],
      },
      {
        heading: 'The five major aspects',
        paragraphs: [
          'A conjunction fuses two functions in the same patch of zodiac. A sextile is 60° — a door you still have to walk through. A square is 90° — friction that tends to produce skill if you stay with it, or noise if you do not. A trine is 120° — ease that can go unused. An opposition is 180° — two poles, often projected onto another person or a schedule that pulls both ways.',
          'Keep the verbs concrete. Do not upgrade a square into a curse or a trine into a blessing from elsewhere. You are reading how two chart functions share work. The rest of the chart — signs, houses, the Big Three — tells you which departments that work lands in.',
        ],
      },
      {
        heading: 'Orbs: 8°, 6° and 4°',
        paragraphs: [
          'An orb is how far from exact the contact may be and still count. SideraChart’s stack is 8° / 6° / 4° as above. A Sun–Moon conjunction at 7.2° counts; a Mercury sextile at 4.5° does not. Other software uses different orbs, which is why aspect lists disagree even when longitudes match.',
          'Sort by tightness. A 0.3° aspect outranks a 7.9° aspect of the same type. If you are learning, ignore anything near the edge until the tight ones are clear. Exactness is not moral purity; it is volume on the instrument.',
        ],
      },
      {
        heading: 'Applying, separating and birth time',
        paragraphs: [
          'Applying means the aspect was getting tighter at birth; separating means it had already peaked and was widening. SideraChart flags this in the natal table. It is a timing nuance inside the birth moment, not a forecast. You still need decent longitudes, which means a decent Universal Time.',
          'Without a birth time, planet-to-planet aspects still exist. Aspects to the Ascendant do not, because there is no Ascendant. The Moon’s aspects near an orb boundary can flip across a day. Unknown time: planets yes, houses no; Moon aspects near 8°/6°/4° maybe. Do not fight with a noon chart over a 5.9° Moon square.',
        ],
      },
      {
        heading: 'What aspects are not',
        paragraphs: [
          'They are not synastry by themselves — synastry is aspects between two charts. They are not transits — transits are today’s planets to natal planets. They are not medical, legal or financial advice. A Mars square Saturn does not prescribe a workout or a lawsuit. It describes friction between initiating heat and structure.',
          'Minor aspects (quincunx, semisquare, and the rest) are not drawn here. If another site shows more lines, it is using a wider catalogue, not a more accurate sky. SideraChart stays with the five majors on tropical longitudes from astronomy-engine (VSOP87), not Swiss Ephemeris.',
          'Stelliums produce stacks of conjunctions. Read the tightest pair first rather than declaring the whole pile one mood. An empty house does not cancel an aspect that happens to involve a planet in another house; aspects ignore walls. Houses need the birth time; aspects between planets do not.',
        ],
      },
      {
        heading: 'How SideraChart shows aspects',
        paragraphs: [
          'Coloured lines inside the wheel; a sortable table under it. Hide the lines if the drawing is cluttered. Synastry uses the same orbs between two people’s planets. Composite charts have their own midpoints and then their own internal aspects. Daily transits in the cabinet are stored at noon natal time and use the same aspect names against the natal baseline.',
          'When you compare with astro-seek or similar, set tropical, the same time zone, and comparable orbs. A missing aspect is often an orb or a sidereal setting. Placidus vs Whole Sign will not change ecliptic aspects between planets; it will change house-based sentences you might mix in by mistake.',
          'Read applying vs separating as a birth-moment note, then move on. It does not tell you when an event will happen years later. Transits reuse the same aspect names against a moving sky, stored at noon natal time in the cabinet. That is a different clock from the natal applying flag.',
        ],
      },
    ],
    faq: [
      {
        q: 'What are the major aspects in astrology?',
        a: 'Conjunction, sextile, square, trine and opposition. Those are the five SideraChart draws. Orbs are 8°, 6° and 4° depending on the aspect.',
      },
      {
        q: 'What does orb mean in astrology?',
        a: 'How many degrees from exact an aspect may be and still count. Tighter orbs are stronger on the instrument. SideraChart’s set is 8° / 6° / 4°.',
      },
      {
        q: 'Are square aspects bad?',
        a: 'They are friction, not a curse. Read them as work between two functions. Do not treat them as medical or moral verdicts.',
      },
      {
        q: 'Do I need a birth time to see aspects?',
        a: 'Not for planet-to-planet aspects. You need a time for aspects to the Ascendant and for Moon aspects that sit near an orb boundary.',
      },
    ],
  },
  'tropical-vs-sidereal': {
    title: 'Tropical vs sidereal zodiac',
    excerpt:
      'Tropical zodiac starts at the March equinox. Sidereal uses a star zero point, about 24° away today. SideraChart is tropical only — not Vedic, not Swiss Ephemeris.',
    sections: [
      {
        heading: 'Tropical vs sidereal zodiac',
        paragraphs: [
          'Tropical vs sidereal is a zero-point argument. Both zodiacs divide the ecliptic into twelve 30° signs with the same names. They do not start in the same place. Tropical 0° Aries is the March equinox — the Sun’s crossing of the celestial equator. Sidereal 0° Aries is tied to a star reference (an ayanamsha). Because Earth’s axis precesses, those two zeros have drifted apart by roughly 24° today.',
          'That gap is why your Sun sign in a Vedic app is often the previous sign compared with SideraChart. Neither calculator is “wrong about the sky.” They are using different origins for the same named belt. SideraChart is tropical: Western convention, equinox-based, astronomy-engine (VSOP87). It does not compute sidereal, Vedic or Chinese systems.',
        ],
      },
      {
        heading: 'What the tropical zodiac measures',
        paragraphs: [
          'Tropical signs are seasons of Earth’s orbit, not photographs of constellations. The constellations are unequal and precess. Tropical Aries begins when day and night match in March (in the northern-hemisphere calendar sense of the equinox), regardless of which star field sits behind that point now. Western natal astrology — including this site — reads those seasonal signs.',
          'Your natal planets on SideraChart are apparent tropical longitudes of date. Houses (Placidus default) sit on top of that tropical ecliptic. Birth date, time and place still matter in the usual way: time for the Ascendant, unknown time = planets yes, houses no. Changing zodiacs is a separate switch from changing house systems.',
        ],
      },
      {
        heading: 'What the sidereal zodiac measures',
        paragraphs: [
          'Sidereal practice aims to keep signs aligned with a stellar frame. Different ayanamshas (Lahiri and others) pick slightly different offsets. Indian natal astrology is typically sidereal and often uses whole-sign or other house methods that are not this site’s defaults. If you want that chart, you need that engine. SideraChart will not pretend to be it.',
          'Chinese natal systems are another stack again — not tropical, not the same twelve-sign wheel. Do not paste a Chinese year animal onto a tropical Sun and call it the same coordinate. If you came here from a mixed search, pick one system and stay there while you learn.',
        ],
      },
      {
        heading: 'The roughly 24° gap and ayanamsha',
        paragraphs: [
          'Twenty-four degrees is about four-fifths of a sign. Many placements therefore fall in the preceding tropical-named sign when you switch to sidereal. A tropical Gemini Sun often becomes a sidereal Taurus Sun. Moons near a boundary flip more often because the Moon is fast. Rising signs flip too, because the Ascendant is a degree.',
          'If you compare two tropical sites and they already disagree by a sign, look at birth time and timezone first, not ayanamsha. Sidereal is the explanation when one site is explicitly Vedic or “sidereal” and the other is Western tropical. SideraChart will not match a Lahiri printout. That is expected.',
        ],
      },
      {
        heading: 'Why SideraChart is tropical only',
        paragraphs: [
          'The product is a Western natal-chart calculator: tropical zodiac, Placidus default, Whole Sign optional, major aspects at 8° / 6° / 4°, VSOP87-class positions via astronomy-engine, IANA timezones. It is not Swiss Ephemeris. It is not a sidereal switch. Keeping one zero point avoids a silent 24° error when you think you are looking at “the same chart.”',
          'Use tropical if you want to read Western texts, most English-language natal cookbooks, and this site’s written layer. Use a sidereal specialist if that is your tradition. Do not average the two Suns. Do not treat the disagreement as a personality crisis. It is a coordinate-system clash.',
        ],
      },
      {
        heading: 'Matching other websites',
        paragraphs: [
          'On astro-seek, astro.com and similar, set tropical + Placidus (or Whole Sign if that is what you used) and the same birth time. You should land within a fraction of a degree on planets. If you are off by a sign, you are in sidereal or you have the wrong clock. If houses differ but planets match, you have a house-system mismatch.',
          'Transits in SideraChart’s cabinet are tropical transits stored at noon in the natal timezone. Mixing tropical natal with sidereal transits is the same 24° error in motion. Keep the zodiac consistent. The natal chart is the baseline; transits are weather against that baseline, in the same coordinate system.',
          'If you publish a chart, name the zodiac in the caption: tropical, Placidus, birth time known or unknown. That single line prevents most “your calculator is wrong” threads. SideraChart’s caption already shows tropical and Placidus when the wheel is complete.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between tropical and sidereal zodiac?',
        a: 'Tropical measures from the vernal equinox. Sidereal measures from a star-based zero point. They differ by about 24° today, often a whole sign.',
      },
      {
        q: 'Which zodiac does SideraChart use?',
        a: 'Tropical only, with positions from astronomy-engine (VSOP87). It does not calculate sidereal, Vedic or Chinese charts and does not use Swiss Ephemeris.',
      },
      {
        q: 'Why is my Sun sign different in Vedic astrology?',
        a: 'Vedic practice is typically sidereal. Your tropical Sun is still the equinox-based longitude. The name of the sign changed because the zero point did.',
      },
      {
        q: 'Should I use tropical or sidereal?',
        a: 'Use tropical to match Western natal texts and this calculator. Use sidereal if you are working in that tradition. Do not mix them in one reading.',
      },
    ],
  },
  'synastry-vs-composite': {
    title: 'Synastry vs composite chart',
    excerpt:
      'Synastry overlays two natal charts and lists aspects between them. A composite chart averages longitudes into a third wheel. They answer different questions.',
    sections: [
      {
        heading: 'Synastry vs composite chart',
        paragraphs: [
          'Synastry vs composite is two different relationship maps, not two names for one map. Synastry keeps both people. You calculate two natal charts, overlay the planets, and list aspects from person A to person B. A composite chart discards the two wheels as separate people and builds a third chart from midpoints. People search the comparison because apps use the words as if they were interchangeable. They are not.',
          'SideraChart offers both as separate calculators. Each natal is tropical, Placidus by default, VSOP87 via astronomy-engine. Synastry aspects use the same orbs as a natal aspectarian: 8° conjunction and opposition, 6° square and trine, 4° sextile. Neither wheel is a verdict on whether to stay together, marry, or split assets. They are diagrams.',
        ],
      },
      {
        heading: 'What synastry does',
        paragraphs: [
          'Synastry leaves both charts intact. On SideraChart, one set of glyphs is person A, the other is person B. The table lists inter-chart aspects, not the internal aspects of one natal. You are asking what happens when two skies share a kitchen: her Saturn on his Moon, his Mars on her Ascendant, a Sun–Sun trine.',
          'Each person still needs their own birth date, time and place. If one time is unknown, that person’s Ascendant and houses drop out. You can still synastry planet-to-planet. You cannot honestly talk about “their planets in your seventh house” without that person’s rising sign. Unknown time = planets yes, houses no — per chart.',
        ],
      },
      {
        heading: 'What a composite chart does',
        paragraphs: [
          'A composite takes each pair of natal planets (A’s Sun and B’s Sun, A’s Moon and B’s Moon, and so on) and finds the shorter-arc midpoint, then draws a new wheel. The result is the relationship as a third entity, not either person. It is not a Davison chart, which midpoints in time and space to a hypothetical birth of the relationship.',
          'Composite houses still need a location convention and, in practice, a way to set angles. Read the composite as a separate instrument. Do not mix one person’s natal house meanings into composite midpoints without noticing you changed maps. SideraChart’s composite calculator is that third wheel, not a synastry overlay.',
        ],
      },
      {
        heading: 'Two people, two complete inputs',
        paragraphs: [
          'Garbage in, garbage out, twice. Wrong timezone on person B shifts their Moon and their Ascendant, which then either aspects person A wrongly in synastry or pulls every composite midpoint. Prefer certificates. If one clock is missing, say so and keep house-based synastry sentences off the table.',
          'You do not average two rising signs to get a “couple rising” in synastry. That instinct belongs to composite midpoints, and even there it is a constructed angle, not a baby. Keep the methods in separate tabs and label which wheel you are reading.',
        ],
      },
      {
        heading: 'What neither chart decides',
        paragraphs: [
          'Neither synastry nor composite tells you to commit, leave, have a child, or sign a contract. They describe contact patterns and a midpoint atmosphere. Easy Venus contacts are not a legal status. Saturn contacts are not a prison sentence. If you need advice of those kinds, you need a different professional.',
          'Read natal charts first, separately. Two people with no relationship to their own Moons will not be rescued by a pretty synastry trine. The Big Three of each natal still come first. Then overlay. Then, if you want the third-entity view, composite.',
        ],
      },
      {
        heading: 'How to run them on SideraChart',
        paragraphs: [
          'Use the synastry calculator for overlays and inter-aspects. Use the composite calculator for midpoints. Same tropical engine, not sidereal, not Swiss Ephemeris. One free relationship run without an account; then sign in. Save individual natals if you also want daily transits in each cabinet at noon natal time — those transits are personal weather, not a couple forecast unless you build that separately.',
          'When comparing with other sites, match tropical, Placidus, orbs, and whether they mean synastry or composite. A site that “combines charts” without saying midpoint vs overlay is the reason this article exists. Look at the wheel: two sets of planets means synastry; one set of mixed midpoints means composite.',
          'House overlays in synastry need both clocks. If person B has no time, you still have planet-to-planet aspects with orbs 8° / 6° / 4°. You do not have “their Venus in your seventh.” Write that limit next to the table so the overlay does not grow houses it does not own.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between synastry and composite?',
        a: 'Synastry overlays two natal charts and aspects them to each other. A composite builds a third chart from planetary midpoints. Overlay vs average.',
      },
      {
        q: 'Which is better for relationship astrology?',
        a: 'They answer different questions. Synastry: how two people interact. Composite: the relationship as a third chart. Run natal charts first either way.',
      },
      {
        q: 'Do both people need a birth time?',
        a: 'For house-based synastry and for composite angles, yes. Planet-to-planet synastry can proceed with dates if times are missing, with the usual Moon-cusp caution.',
      },
      {
        q: 'Is a composite chart the same as a Davison chart?',
        a: 'No. Composite uses planetary midpoints. Davison midpoints the two birth times and places into a hypothetical event. SideraChart’s composite is the midpoint wheel.',
      },
    ],
  },
  'what-are-transits': {
    title: 'What are transits in astrology?',
    excerpt:
      'Transits are today’s positions compared with your natal chart. They are weather against a fixed baseline, not a new birth chart. SideraChart stores them at noon.',
    sections: [
      {
        heading: 'What are transits in astrology?',
        paragraphs: [
          'Transits are the planets in the sky now (or on a chosen date) measured against the planets in your natal chart. The natal chart stays put: it is the baseline from your birth date, time and place. Transits move. A transiting Saturn square your natal Sun is a temporary contact between today’s Saturn and the Sun you were born with. People search “what are transits in astrology?” when they want to know whether the natal chart changes. It does not. The weather over it does.',
          'SideraChart calculates transits with the same tropical engine as the natal: astronomy-engine (VSOP87), major aspects at 8° / 6° / 4°. The daily cabinet stores one overlay per calendar date at noon in the natal timezone, so the day’s note stays stable if you refresh at 23:00. Missed dates are not backfilled.',
        ],
      },
      {
        heading: 'Transits vs natal positions',
        paragraphs: [
          'Natal positions are a snapshot. Transits are a second snapshot compared with the first. You need a saved natal chart to do this honestly. Without natal longitudes you are only listing today’s sky, which is astronomy, not a personal transit reading.',
          'If the natal birth time was unknown, natal houses are already off the table. Transiting planets “through your seventh house” then have no honest wall to go through. You can still transit to natal planets (Sun, Moon if the sign was safe, Mercury, and the rest). Unknown time = natal planets yes, natal houses no — transits inherit that limit.',
        ],
      },
      {
        heading: 'Fast transits and slow transits',
        paragraphs: [
          'The Moon transits a natal planet in hours. The Sun, Mercury, Venus and Mars take days to weeks to cross a natal point. Jupiter and Saturn take longer. Uranus, Neptune and Pluto can sit on a natal degree for months, with retrogrades stretching the story. Fast transits are weather. Slow transits are climate. Neither is a medical or financial instruction.',
          'Orbs stay the same names: conjunction, sextile, square, trine, opposition. A transiting conjunction to natal Venus inside 8° is the same geometry as a natal conjunction, except one end of the aspect is moving. Tight applying transits are the ones worth listing first in a daily note.',
        ],
      },
      {
        heading: 'Why SideraChart uses noon in the natal timezone',
        paragraphs: [
          'A “day” of transits has to pick a moment. If the cabinet recomputed at every page load, the Moon would wander and the note would not match yesterday’s screenshot. Noon in the natal timezone is a stable civil snapshot for that date. It is not your birth time, and it is not a claim that transits only matter at lunch.',
          'The cabinet writes one row per calendar date when you open it. Tomorrow, yesterday’s row remains. A skipped week stays skipped; the product does not invent history. You need a saved natal and an account for that journal. Public calculators remain usable without signing in.',
        ],
      },
      {
        heading: 'How to read a transit day',
        paragraphs: [
          'List transiting planets that make major aspects to natal Sun, Moon, rising (if you have a time), and any tight natal configurations. Prefer slow contacts for the headline, fast ones for the weather. Do not promote a transiting Moon square to a life decision. Do not ignore a transiting Saturn conjunction to natal Sun either; just do not turn it into legal or medical advice.',
          'Keep tropical transits on a tropical natal. Sidereal transits on a tropical natal mix zero points and waste the 24° gap. SideraChart will not do that mix. Placidus natal houses, if they exist, are the rooms transits pass through. Empty natal houses can still receive transits; emptiness was about natal planets, not a ban on later traffic.',
        ],
      },
      {
        heading: 'What transits are not',
        paragraphs: [
          'They are not a new natal chart. They are not a newspaper Sun-sign horoscope, though they are closer to “your week” than the natal wheel alone. They are not synastry (two natal charts) and not a composite (midpoints). They are not Swiss Ephemeris, Vedic dashas, or Chinese day pillars. This site’s transit layer is Western tropical positions against a Western tropical natal.',
          'Use them as a dated overlay. Print or download the day’s text if you want a record. Then go back to the natal when you need the baseline. The natal chart is the instrument you calibrated at birth. Transits are the later sky running across it.',
          'If you skip a week, leave the gap. Backfilling noon snapshots for days you did not open would invent a journal you did not keep. The natal chart is still there. Open today’s date when you want today’s weather, not a reconstructed month.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is a transit in astrology?',
        a: 'A contact between a planet in the sky on a given date and a point in your natal chart. The natal chart stays fixed; the sky moves.',
      },
      {
        q: 'Do transits change my natal chart?',
        a: 'No. Transits overlay the natal. SideraChart stores each day’s overlay at noon in the natal timezone. Your birth positions do not move.',
      },
      {
        q: 'Why does SideraChart calculate daily transits at noon?',
        a: 'So the day’s note is stable. Noon in the natal timezone is a consistent snapshot. It is not a substitute for your birth time.',
      },
      {
        q: 'Can I read transits without a birth time?',
        a: 'You can read transits to natal planets. You cannot honestly read transits through natal houses without an Ascendant.',
      },
    ],
  },
};
