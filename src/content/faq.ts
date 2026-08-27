import type { AppLocale } from '@/i18n/locales';

/**
 * The questions people actually type.
 *
 * Every one of the first group is a query Search Console has recorded against
 * this site — "how to find your sun sign", "how to get your venus sign", "how to
 * work out rising sign", "how to know what house your moon is in". The pages
 * that answer them are titled as nouns ("Moon sign calculator"), which is what
 * the tool is called but not what anybody asks. This is the page that meets the
 * question in the form it was asked, and sends the reader to the tool.
 */
export type FaqItem = {
  q: string;
  a: string;
  /** The calculator or article that does the thing being asked about. */
  href?: string;
};

export type FaqGroup = {
  id: string;
  heading: string;
  items: FaqItem[];
};

const EN: FaqGroup[] = [
  {
    id: 'placements',
    heading: 'Finding your placements',
    items: [
      {
        q: 'How do I find my Sun sign?',
        a: 'Your date of birth is enough. The Sun spends about a month in each sign, so only people born within a day or two of a boundary need to check the year — and the calculator does that from the real position rather than from a table of dates.',
        href: '/birth-chart-calculator',
      },
      {
        q: 'How do I find my Moon sign?',
        a: 'Date, time and place. The Moon changes sign every two and a half days, so without a birth time it can land in either of two — the calculator uses noon as an estimate and says so. With a time it is exact, and you also get the house it falls in.',
        href: '/moon-sign-calculator',
      },
      {
        q: 'How do I work out my rising sign?',
        a: 'The ascendant is the degree climbing over the eastern horizon at the minute you were born, so it needs the clock and the place — it moves about one degree every four minutes. Without a birth time it cannot be calculated at all, by us or by anyone.',
        href: '/rising-sign-calculator',
      },
      {
        q: 'How do I get my Venus sign?',
        a: 'The date usually decides it: Venus stays in a sign for three to five weeks. Add a birth time and you also get the house, which says which part of life the way you love shows up in.',
        href: '/venus-sign-calculator',
      },
      {
        q: 'How do I find my Mars sign?',
        a: 'From the date, in almost every case — Mars holds a sign for six weeks or more. The exception is a birthday within a day of a sign change, which the calculator resolves exactly.',
        href: '/mars-sign-calculator',
      },
      {
        q: 'How do I know which house my Moon is in?',
        a: 'Houses come from the birth time and place, not from the date, so you need all three. The chart is cut into twelve slices from the horizon at your birth minute, and the Moon falls into one of them — that is the house. Without a time there are no houses to fall into.',
        href: '/birth-chart-calculator',
      },
    ],
  },
  {
    id: 'birth-time',
    heading: 'Birth time',
    items: [
      {
        q: 'Can I get a birth chart without a birth time?',
        a: 'Yes, and most of it is right. The Sun, Mercury, Venus, Mars and the outer planets keep their sign across a whole day. What you lose is the ascendant, the houses, and an exact Moon — the Moon moves thirteen degrees a day, so a noon estimate can be up to six degrees out.',
        href: '/articles/birth-chart-without-time',
      },
      {
        q: 'Why does the birth time matter so much?',
        a: 'Because two of the four things a chart is made of depend on it. The planets are where they are regardless, but the ascendant turns a full circle every twenty-four hours and the houses turn with it. Four minutes of clock is one degree of ascendant.',
        href: '/articles/why-birth-time-matters',
      },
      {
        q: 'My birth certificate time is rounded. Does that ruin it?',
        a: 'No. A time rounded to the nearest five minutes moves the ascendant by about a degree, which changes the sign only if you were born near a boundary. Rounded to the hour is worse — the ascendant can be a whole sign off — but the planets and their aspects are unaffected.',
      },
    ],
  },
  {
    id: 'transits',
    heading: 'Transits and horoscopes',
    items: [
      {
        q: 'What is a transit in astrology?',
        a: 'The angle between where a planet is right now and a point in your birth chart. The chart is the fixed half — it is the sky at the minute you were born and it never moves again. Today’s sky is the moving half. A transit is the relationship between the two.',
        href: '/transits-today',
      },
      {
        q: 'How is that different from a daily horoscope?',
        a: 'A horoscope column knows only your Sun sign, so it assumes a Sun at the middle of that sign and works without houses — twelve readings for eight billion people. A transit reading uses the real degree of every planet in your chart, and the houses if you know your time.',
        href: '/transits-today',
      },
      {
        q: 'How often do transits change?',
        a: 'The fast ones daily. The Moon covers thirteen degrees a day, so its contacts last half a day; the Sun and Mercury hold for two or three, Venus and Mars for about a week. Jupiter through Pluto can sit on the same point for months, which is why they are named separately as climate rather than weather.',
        href: '/articles/what-are-transits',
      },
      {
        q: 'Where does the daily horoscope on this site come from?',
        a: 'The real position of the sky today at 12:00 UTC, computed with the same ephemeris as the calculators. Without a birth date it assumes a Sun at 15° of each sign and says so; add a date and it uses your actual Sun degree. It is not a recycled column.',
        href: '/daily-horoscope',
      },
    ],
  },
  {
    id: 'method',
    heading: 'How the numbers are worked out',
    items: [
      {
        q: 'Do you use the tropical or the sidereal zodiac?',
        a: 'Tropical, measured from the March equinox — the system used across almost all Western astrology. Sidereal longitudes differ by roughly twenty-four degrees today, which is often a whole sign. If you were expecting a sidereal chart, these positions will not match.',
        href: '/articles/tropical-vs-sidereal',
      },
      {
        q: 'Which house system do you use?',
        a: 'Placidus by default, because it is what nearly every reading you will find assumes. Whole sign is available on a saved chart. On many charts nothing moves between them; when it does, it is usually one planet crossing one cusp.',
        href: '/articles/houses-in-a-birth-chart',
      },
      {
        q: 'How accurate are the positions?',
        a: 'Planetary longitudes come from a VSOP87-class ephemeris and agree with professional software to well under a minute of arc. House cusps are computed by iteration rather than approximation and match reference values to four decimal places. Placidus is undefined inside the polar circles, and there the quadrants are trisected instead — the chart says when that happens.',
      },
      {
        q: 'Is it free? Do I need an account?',
        a: 'Every calculator is free and needs no account. An account exists for one thing: keeping a chart, so the site can write a reading of the sky against it every day from the day you save it. The calculating never goes behind a sign-in.',
      },
    ],
  },
];

const UK: FaqGroup[] = [
  {
    id: 'placements',
    heading: 'Як дізнатися свої положення',
    items: [
      {
        q: 'Як дізнатися свій знак Сонця?',
        a: 'Досить дати народження. Сонце проходить знак приблизно за місяць, тож перевіряти рік треба лише тим, хто народився за день-два від межі — і калькулятор робить це за справжнім положенням, а не за таблицею дат.',
        href: '/birth-chart-calculator',
      },
      {
        q: 'Як дізнатися свій знак Місяця?',
        a: 'Потрібні дата, час і місце. Місяць змінює знак кожні дві з половиною доби, тож без часу народження він може випасти в один із двох — калькулятор бере полудень як оцінку і прямо про це каже. З часом положення точне, і ви ще отримуєте дім, у який Місяць падає.',
        href: '/moon-sign-calculator',
      },
      {
        q: 'Як порахувати асцендент?',
        a: 'Асцендент — це градус, що сходить над східним обрієм у хвилину народження, тож потрібні годинник і місце: він рухається приблизно на градус за чотири хвилини. Без часу народження його не порахувати ні в нас, ні деінде.',
        href: '/rising-sign-calculator',
      },
      {
        q: 'Як дізнатися свій знак Венери?',
        a: 'Зазвичай усе вирішує дата: Венера тримається знака від трьох до пʼяти тижнів. Додайте час народження — і отримаєте ще дім, тобто ділянку життя, у якій виявляється ваш спосіб любити.',
        href: '/venus-sign-calculator',
      },
      {
        q: 'Як дізнатися свій знак Марса?',
        a: 'З дати — майже завжди: Марс стоїть у знаку шість тижнів і довше. Виняток — день народження за добу від зміни знака, і його калькулятор розвʼязує точно.',
        href: '/mars-sign-calculator',
      },
      {
        q: 'Як дізнатися, в якому домі мій Місяць?',
        a: 'Доми беруться з часу й місця народження, а не з дати, тож потрібні всі три. Карта ріжеться на дванадцять частин від обрію у вашу хвилину народження, і Місяць падає в одну з них — це і є дім. Без часу падати нема куди.',
        href: '/birth-chart-calculator',
      },
    ],
  },
  {
    id: 'birth-time',
    heading: 'Час народження',
    items: [
      {
        q: 'Чи можна порахувати карту без часу народження?',
        a: 'Так, і більша частина буде правильна. Сонце, Меркурій, Венера, Марс і далекі планети тримають свій знак цілу добу. Втрачаєте ви асцендент, доми й точний Місяць — Місяць проходить тринадцять градусів на добу, тож оцінка на полудень може розійтися до шести градусів.',
        href: '/articles/birth-chart-without-time',
      },
      {
        q: 'Чому час народження такий важливий?',
        a: 'Бо від нього залежать дві з чотирьох речей, з яких складається карта. Планети стоять там, де стоять, незалежно від часу, але асцендент робить повне коло за добу, і доми обертаються разом із ним. Чотири хвилини годинника — це один градус асцендента.',
        href: '/articles/why-birth-time-matters',
      },
      {
        q: 'У свідоцтві час округлений. Це все псує?',
        a: 'Ні. Округлення до пʼяти хвилин зміщує асцендент приблизно на градус, і знак зміниться лише якщо ви народились біля межі. Округлення до години гірше — асцендент може розійтися на цілий знак — але планет і аспектів між ними це не торкається.',
      },
    ],
  },
  {
    id: 'transits',
    heading: 'Транзити й гороскопи',
    items: [
      {
        q: 'Що таке транзит в астрології?',
        a: 'Кут між тим, де планета стоїть зараз, і точкою у вашій натальній карті. Карта — нерухома половина: це небо в хвилину вашого народження, і воно вже не змінюється. Сьогоднішнє небо — рухома половина. Транзит — це відношення між ними.',
        href: '/transits-today',
      },
      {
        q: 'Чим це відрізняється від щоденного гороскопу?',
        a: 'Газетна колонка знає лише ваш знак Сонця, тож припускає Сонце посередині знака і обходиться без домів — дванадцять текстів на вісім мільярдів людей. Транзитне читання бере справжній градус кожної планети вашої карти, а якщо ви знаєте час — і доми.',
        href: '/transits-today',
      },
      {
        q: 'Як часто змінюються транзити?',
        a: 'Швидкі — щодня. Місяць проходить тринадцять градусів на добу, тож його дотики живуть пів дня; Сонце й Меркурій тримаються два-три дні, Венера й Марс — близько тижня. Від Юпітера до Плутона можуть стояти на тій самій точці місяцями, тому їх названо окремо: це клімат, а не погода.',
        href: '/articles/what-are-transits',
      },
      {
        q: 'Звідки береться щоденний гороскоп на цьому сайті?',
        a: 'Зі справжнього положення неба сьогодні о 12:00 UTC, порахованого тими самими ефемеридами, що й калькулятори. Без дати народження він припускає Сонце на 15° знака і прямо про це каже; з датою бере ваш дійсний градус Сонця. Це не переписана колонка.',
        href: '/daily-horoscope',
      },
    ],
  },
  {
    id: 'method',
    heading: 'Як рахуються числа',
    items: [
      {
        q: 'Ви використовуєте тропічний чи сидеричний зодіак?',
        a: 'Тропічний, від весняного рівнодення — систему, якою користується майже вся західна астрологія. Сидеричні довготи сьогодні відрізняються приблизно на двадцять чотири градуси, а це часто цілий знак. Якщо ви чекали сидеричну карту, ці положення не збіжаться.',
        href: '/articles/tropical-vs-sidereal',
      },
      {
        q: 'Яку систему домів ви використовуєте?',
        a: 'Плацидус за замовчуванням, бо саме його припускає майже будь-яка розшифровка, яку ви знайдете. Для збереженої карти доступний цілий знак. У багатьох картах між ними нічого не зсувається; коли зсувається — зазвичай це одна планета через одну межу.',
        href: '/articles/houses-in-a-birth-chart',
      },
      {
        q: 'Наскільки точні положення?',
        a: 'Довготи планет беруться з ефемерид класу VSOP87 і збігаються з професійним софтом із запасом краще за кутову мінуту. Межі домів рахуються ітерацією, а не наближенням, і збігаються з еталоном до чотирьох знаків після коми. За полярним колом Плацидус не визначений — там квадранти діляться на три, і карта про це повідомляє.',
      },
      {
        q: 'Це безкоштовно? Чи потрібен акаунт?',
        a: 'Усі калькулятори безкоштовні й не вимагають акаунта. Акаунт потрібен для одного: зберегти карту, щоб сайт щодня від дня збереження писав читання неба проти неї. Сам розрахунок за вхід не ховається.',
      },
    ],
  },
];

const RU: FaqGroup[] = [
  {
    id: 'placements',
    heading: 'Как узнать свои положения',
    items: [
      {
        q: 'Как узнать свой знак Солнца?',
        a: 'Достаточно даты рождения. Солнце проходит знак примерно за месяц, поэтому сверять год нужно лишь тем, кто родился за день-два от границы — и калькулятор делает это по настоящему положению, а не по таблице дат.',
        href: '/birth-chart-calculator',
      },
      {
        q: 'Как узнать свой знак Луны?',
        a: 'Нужны дата, время и место. Луна меняет знак каждые двое с половиной суток, поэтому без времени рождения она может попасть в один из двух — калькулятор берёт полдень как оценку и прямо об этом говорит. Со временем положение точное, и вы получаете ещё дом, в который Луна падает.',
        href: '/moon-sign-calculator',
      },
      {
        q: 'Как рассчитать асцендент?',
        a: 'Асцендент — это градус, восходящий над восточным горизонтом в минуту рождения, поэтому нужны часы и место: он движется примерно на градус за четыре минуты. Без времени рождения его не рассчитать ни у нас, ни где-либо ещё.',
        href: '/rising-sign-calculator',
      },
      {
        q: 'Как узнать свой знак Венеры?',
        a: 'Обычно всё решает дата: Венера держится знака от трёх до пяти недель. Добавьте время рождения — и получите ещё дом, то есть область жизни, в которой проявляется ваш способ любить.',
        href: '/venus-sign-calculator',
      },
      {
        q: 'Как узнать свой знак Марса?',
        a: 'По дате — почти всегда: Марс стоит в знаке шесть недель и дольше. Исключение — день рождения в сутках от смены знака, и его калькулятор разрешает точно.',
        href: '/mars-sign-calculator',
      },
      {
        q: 'Как узнать, в каком доме моя Луна?',
        a: 'Дома берутся из времени и места рождения, а не из даты, поэтому нужны все три. Карта режется на двенадцать частей от горизонта в вашу минуту рождения, и Луна падает в одну из них — это и есть дом. Без времени падать некуда.',
        href: '/birth-chart-calculator',
      },
    ],
  },
  {
    id: 'birth-time',
    heading: 'Время рождения',
    items: [
      {
        q: 'Можно ли рассчитать карту без времени рождения?',
        a: 'Да, и бо́льшая часть будет верной. Солнце, Меркурий, Венера, Марс и дальние планеты держат свой знак целые сутки. Теряете вы асцендент, дома и точную Луну — Луна проходит тринадцать градусов в сутки, поэтому оценка на полдень может разойтись до шести градусов.',
        href: '/articles/birth-chart-without-time',
      },
      {
        q: 'Почему время рождения так важно?',
        a: 'Потому что от него зависят две из четырёх вещей, из которых состоит карта. Планеты стоят там, где стоят, независимо от времени, но асцендент делает полный круг за сутки, и дома вращаются вместе с ним. Четыре минуты часов — это один градус асцендента.',
        href: '/articles/why-birth-time-matters',
      },
      {
        q: 'В свидетельстве время округлено. Это всё портит?',
        a: 'Нет. Округление до пяти минут смещает асцендент примерно на градус, и знак изменится, только если вы родились у границы. Округление до часа хуже — асцендент может разойтись на целый знак — но планет и аспектов между ними это не касается.',
      },
    ],
  },
  {
    id: 'transits',
    heading: 'Транзиты и гороскопы',
    items: [
      {
        q: 'Что такое транзит в астрологии?',
        a: 'Угол между тем, где планета стоит сейчас, и точкой в вашей натальной карте. Карта — неподвижная половина: это небо в минуту вашего рождения, и оно уже не меняется. Сегодняшнее небо — подвижная половина. Транзит — это отношение между ними.',
        href: '/transits-today',
      },
      {
        q: 'Чем это отличается от ежедневного гороскопа?',
        a: 'Газетная колонка знает только ваш знак Солнца, поэтому предполагает Солнце в середине знака и обходится без домов — двенадцать текстов на восемь миллиардов человек. Транзитное чтение берёт настоящий градус каждой планеты вашей карты, а если вы знаете время — и дома.',
        href: '/transits-today',
      },
      {
        q: 'Как часто меняются транзиты?',
        a: 'Быстрые — каждый день. Луна проходит тринадцать градусов в сутки, поэтому её касания живут полдня; Солнце и Меркурий держатся два-три дня, Венера и Марс — около недели. От Юпитера до Плутона могут стоять на той же точке месяцами, поэтому они названы отдельно: это климат, а не погода.',
        href: '/articles/what-are-transits',
      },
      {
        q: 'Откуда берётся ежедневный гороскоп на этом сайте?',
        a: 'Из настоящего положения неба сегодня в 12:00 UTC, посчитанного теми же эфемеридами, что и калькуляторы. Без даты рождения он предполагает Солнце на 15° знака и прямо об этом говорит; с датой берёт ваш действительный градус Солнца. Это не переписанная колонка.',
        href: '/daily-horoscope',
      },
    ],
  },
  {
    id: 'method',
    heading: 'Как считаются числа',
    items: [
      {
        q: 'Вы используете тропический или сидерический зодиак?',
        a: 'Тропический, от весеннего равноденствия — систему, которой пользуется почти вся западная астрология. Сидерические долготы сегодня отличаются примерно на двадцать четыре градуса, а это часто целый знак. Если вы ждали сидерическую карту, эти положения не совпадут.',
        href: '/articles/tropical-vs-sidereal',
      },
      {
        q: 'Какую систему домов вы используете?',
        a: 'Плацидус по умолчанию, потому что именно его предполагает почти любая расшифровка, которую вы найдёте. Для сохранённой карты доступен целый знак. Во многих картах между ними ничего не сдвигается; когда сдвигается — обычно это одна планета через одну границу.',
        href: '/articles/houses-in-a-birth-chart',
      },
      {
        q: 'Насколько точны положения?',
        a: 'Долготы планет берутся из эфемерид класса VSOP87 и совпадают с профессиональным софтом с запасом лучше угловой минуты. Границы домов считаются итерацией, а не приближением, и совпадают с эталоном до четырёх знаков после запятой. За полярным кругом Плацидус не определён — там квадранты делятся на три, и карта об этом сообщает.',
      },
      {
        q: 'Это бесплатно? Нужен ли аккаунт?',
        a: 'Все калькуляторы бесплатны и не требуют аккаунта. Аккаунт нужен для одного: сохранить карту, чтобы сайт каждый день со дня сохранения писал чтение неба против неё. Сам расчёт за вход не прячется.',
      },
    ],
  },
];

const BY_LOCALE: Partial<Record<AppLocale, FaqGroup[]>> = { en: EN, uk: UK, ru: RU };

/** English is the fallback, as everywhere else the copy has not been written yet. */
export function faqGroups(locale: AppLocale): FaqGroup[] {
  return BY_LOCALE[locale] ?? EN;
}

/** Every question and answer, flattened, for the FAQPage markup. */
export function faqItems(locale: AppLocale): FaqItem[] {
  return faqGroups(locale).flatMap((group) => group.items);
}
