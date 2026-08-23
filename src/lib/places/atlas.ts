export type Place = {
  name: string;
  detail?: string;
  kind?: string;
  lat: number;
  lon: number;
  tz: string;
  coords: string;
  aliases?: string[];
};

type Row = {
  locality: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
  kind?: string;
  aliases?: string[];
};

function coords(lat: number, lon: number): string {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';
  const fmt = (v: number, hemi: string) => {
    const abs = Math.abs(v);
    const d = Math.floor(abs);
    const m = Math.round((abs - d) * 60);
    return `${d}°${String(m).padStart(2, '0')}′${hemi}`;
  };
  return `${fmt(lat, ns)} ${fmt(lon, ew)}`;
}

function toPlace(row: Row): Place {
  const kind = row.kind ?? 'city';
  return {
    name: `${row.locality}, ${row.country}`,
    detail: `${kind} · ${row.region}`,
    kind,
    lat: row.lat,
    lon: row.lon,
    tz: row.tz,
    coords: coords(row.lat, row.lon),
    aliases: [row.locality, ...(row.aliases ?? [])],
  };
}

const ROWS: Row[] = [
  // Ukraine — oblast centres and large towns
  { locality: 'Kyiv', region: 'Kyiv', country: 'Ukraine', lat: 50.4501, lon: 30.5234, tz: 'Europe/Kyiv', aliases: ['Kiev', 'Київ', 'Киев'] },
  { locality: 'Kharkiv', region: 'Kharkiv Oblast', country: 'Ukraine', lat: 49.9935, lon: 36.2304, tz: 'Europe/Kyiv', aliases: ['Kharkov', 'Харків'] },
  { locality: 'Odesa', region: 'Odesa Oblast', country: 'Ukraine', lat: 46.4825, lon: 30.7233, tz: 'Europe/Kyiv', aliases: ['Odessa', 'Одеса'] },
  { locality: 'Dnipro', region: 'Dnipropetrovsk Oblast', country: 'Ukraine', lat: 48.4647, lon: 35.0462, tz: 'Europe/Kyiv', aliases: ['Dnipropetrovsk', 'Дніпро'] },
  { locality: 'Donetsk', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.0159, lon: 37.8028, tz: 'Europe/Kyiv', aliases: ['Донецьк'] },
  { locality: 'Zaporizhzhia', region: 'Zaporizhzhia Oblast', country: 'Ukraine', lat: 47.8388, lon: 35.1396, tz: 'Europe/Kyiv', aliases: ['Zaporizhia', 'Zaporozhye', 'Запоріжжя'] },
  { locality: 'Lviv', region: 'Lviv Oblast', country: 'Ukraine', lat: 49.8397, lon: 24.0297, tz: 'Europe/Kyiv', aliases: ['Lvov', 'Lemberg', 'Львів'] },
  { locality: 'Kryvyi Rih', region: 'Dnipropetrovsk Oblast', country: 'Ukraine', lat: 47.9105, lon: 33.3918, tz: 'Europe/Kyiv', aliases: ['Krivoy Rog', 'Кривий Ріг'] },
  { locality: 'Mykolaiv', region: 'Mykolaiv Oblast', country: 'Ukraine', lat: 46.975, lon: 31.9946, tz: 'Europe/Kyiv', aliases: ['Nikolaev', 'Миколаїв'] },
  { locality: 'Mariupol', region: 'Donetsk Oblast', country: 'Ukraine', lat: 47.0971, lon: 37.5434, tz: 'Europe/Kyiv', aliases: ['Маріуполь'] },
  { locality: 'Luhansk', region: 'Luhansk Oblast', country: 'Ukraine', lat: 48.574, lon: 39.3078, tz: 'Europe/Kyiv', aliases: ['Lugansk', 'Луганськ'] },
  { locality: 'Vinnytsia', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.2328, lon: 28.4809, tz: 'Europe/Kyiv', aliases: ['Vinnitsa', 'Вінниця'] },
  { locality: 'Simferopol', region: 'Crimea', country: 'Ukraine', lat: 44.9521, lon: 34.1024, tz: 'Europe/Simferopol', aliases: ['Сімферополь'] },
  { locality: 'Sevastopol', region: 'Sevastopol', country: 'Ukraine', lat: 44.6166, lon: 33.5254, tz: 'Europe/Simferopol', aliases: ['Севастополь'] },
  { locality: 'Kherson', region: 'Kherson Oblast', country: 'Ukraine', lat: 46.6354, lon: 32.6169, tz: 'Europe/Kyiv', aliases: ['Херсон'] },
  { locality: 'Poltava', region: 'Poltava Oblast', country: 'Ukraine', lat: 49.5883, lon: 34.5514, tz: 'Europe/Kyiv', aliases: ['Полтава'] },
  { locality: 'Chernihiv', region: 'Chernihiv Oblast', country: 'Ukraine', lat: 51.4982, lon: 31.2893, tz: 'Europe/Kyiv', aliases: ['Chernigov', 'Чернігів'] },
  { locality: 'Cherkasy', region: 'Cherkasy Oblast', country: 'Ukraine', lat: 49.4444, lon: 32.0598, tz: 'Europe/Kyiv', aliases: ['Черкаси'] },
  { locality: 'Zhytomyr', region: 'Zhytomyr Oblast', country: 'Ukraine', lat: 50.2547, lon: 28.6587, tz: 'Europe/Kyiv', aliases: ['Житомир'] },
  { locality: 'Sumy', region: 'Sumy Oblast', country: 'Ukraine', lat: 50.9077, lon: 34.7981, tz: 'Europe/Kyiv', aliases: ['Суми'] },
  { locality: 'Khmelnytskyi', region: 'Khmelnytskyi Oblast', country: 'Ukraine', lat: 49.4229, lon: 26.9871, tz: 'Europe/Kyiv', aliases: ['Khmelnitsky', 'Хмельницький'] },
  { locality: 'Chernivtsi', region: 'Chernivtsi Oblast', country: 'Ukraine', lat: 48.2921, lon: 25.9358, tz: 'Europe/Kyiv', aliases: ['Chernovtsy', 'Чернівці'] },
  { locality: 'Rivne', region: 'Rivne Oblast', country: 'Ukraine', lat: 50.6199, lon: 26.2516, tz: 'Europe/Kyiv', aliases: ['Rovno', 'Рівне'] },
  { locality: 'Ivano-Frankivsk', region: 'Ivano-Frankivsk Oblast', country: 'Ukraine', lat: 48.9226, lon: 24.7111, tz: 'Europe/Kyiv', aliases: ['Івано-Франківськ'] },
  { locality: 'Ternopil', region: 'Ternopil Oblast', country: 'Ukraine', lat: 49.5535, lon: 25.5948, tz: 'Europe/Kyiv', aliases: ['Тернопіль'] },
  { locality: 'Lutsk', region: 'Volyn Oblast', country: 'Ukraine', lat: 50.7472, lon: 25.3254, tz: 'Europe/Kyiv', aliases: ['Луцьк'] },
  { locality: 'Uzhhorod', region: 'Zakarpattia Oblast', country: 'Ukraine', lat: 48.6208, lon: 22.2879, tz: 'Europe/Kyiv', aliases: ['Uzhgorod', 'Ужгород'] },
  { locality: 'Kropyvnytskyi', region: 'Kirovohrad Oblast', country: 'Ukraine', lat: 48.5079, lon: 32.2623, tz: 'Europe/Kyiv', aliases: ['Kirovohrad', 'Kirovograd', 'Кропивницький'] },
  { locality: 'Bila Tserkva', region: 'Kyiv Oblast', country: 'Ukraine', lat: 49.795, lon: 30.1167, tz: 'Europe/Kyiv', aliases: ['Біла Церква'] },
  { locality: 'Kremenchuk', region: 'Poltava Oblast', country: 'Ukraine', lat: 49.065, lon: 33.41, tz: 'Europe/Kyiv', aliases: ['Кременчук'] },
  { locality: 'Kamianske', region: 'Dnipropetrovsk Oblast', country: 'Ukraine', lat: 48.511, lon: 34.6021, tz: 'Europe/Kyiv', aliases: ['Dniprodzerzhynsk', 'Камʼянське'] },
  { locality: 'Kramatorsk', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.739, lon: 37.584, tz: 'Europe/Kyiv', aliases: ['Краматорськ'] },
  { locality: 'Melitopol', region: 'Zaporizhzhia Oblast', country: 'Ukraine', lat: 46.8489, lon: 35.3653, tz: 'Europe/Kyiv', aliases: ['Мелітополь'] },
  { locality: 'Nikopol', region: 'Dnipropetrovsk Oblast', country: 'Ukraine', lat: 47.5713, lon: 34.396, tz: 'Europe/Kyiv', aliases: ['Нікополь'] },
  { locality: 'Sloviansk', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.853, lon: 37.605, tz: 'Europe/Kyiv', aliases: ['Slavyansk', 'Словʼянськ'] },
  { locality: 'Berdiansk', region: 'Zaporizhzhia Oblast', country: 'Ukraine', lat: 46.755, lon: 36.7885, tz: 'Europe/Kyiv', aliases: ['Berdyansk', 'Бердянськ'] },
  { locality: 'Uman', region: 'Cherkasy Oblast', country: 'Ukraine', lat: 48.7484, lon: 30.2218, tz: 'Europe/Kyiv', aliases: ['Умань'] },
  { locality: 'Pavlohrad', region: 'Dnipropetrovsk Oblast', country: 'Ukraine', lat: 48.5295, lon: 35.87, tz: 'Europe/Kyiv', aliases: ['Павлоград'] },
  { locality: 'Boryspil', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.3527, lon: 30.955, tz: 'Europe/Kyiv', aliases: ['Бориспіль'] },
  { locality: 'Brovary', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.511, lon: 30.7909, tz: 'Europe/Kyiv', aliases: ['Бровари'] },
  { locality: 'Irpin', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.5188, lon: 30.239, tz: 'Europe/Kyiv', aliases: ['Ірпінь'] },
  { locality: 'Bucha', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.5486, lon: 30.2206, tz: 'Europe/Kyiv', aliases: ['Буча'] },
  { locality: 'Fastiv', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.0768, lon: 29.9177, tz: 'Europe/Kyiv', aliases: ['Фастів'] },
  { locality: 'Obukhiv', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.11, lon: 30.628, tz: 'Europe/Kyiv', aliases: ['Обухів'] },
  { locality: 'Vasylkiv', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.178, lon: 30.3158, tz: 'Europe/Kyiv', aliases: ['Васильків'] },
  { locality: 'Pereiaslav', region: 'Kyiv Oblast', country: 'Ukraine', lat: 50.065, lon: 31.445, tz: 'Europe/Kyiv', aliases: ['Переяслав'] },
  { locality: 'Nizhyn', region: 'Chernihiv Oblast', country: 'Ukraine', lat: 51.048, lon: 31.8869, tz: 'Europe/Kyiv', aliases: ['Ніжин'] },
  { locality: 'Konotop', region: 'Sumy Oblast', country: 'Ukraine', lat: 51.24, lon: 33.2027, tz: 'Europe/Kyiv', aliases: ['Конотоп'] },
  { locality: 'Shostka', region: 'Sumy Oblast', country: 'Ukraine', lat: 51.863, lon: 33.4698, tz: 'Europe/Kyiv', aliases: ['Шостка'] },
  { locality: 'Okhtyrka', region: 'Sumy Oblast', country: 'Ukraine', lat: 50.31, lon: 34.89, tz: 'Europe/Kyiv', aliases: ['Охтирка'] },
  { locality: 'Izmail', region: 'Odesa Oblast', country: 'Ukraine', lat: 45.3517, lon: 28.8364, tz: 'Europe/Kyiv', aliases: ['Ізмаїл'] },
  { locality: 'Bilhorod-Dnistrovskyi', region: 'Odesa Oblast', country: 'Ukraine', lat: 46.195, lon: 30.341, tz: 'Europe/Kyiv', aliases: ['Akkerman', 'Білгород-Дністровський'] },
  { locality: 'Chornomorsk', region: 'Odesa Oblast', country: 'Ukraine', lat: 46.304, lon: 30.654, tz: 'Europe/Kyiv', aliases: ['Illichivsk', 'Чорноморськ'] },
  { locality: 'Mukachevo', region: 'Zakarpattia Oblast', country: 'Ukraine', lat: 48.4439, lon: 22.7178, tz: 'Europe/Kyiv', aliases: ['Mukacheve', 'Мукачево'] },
  { locality: 'Drohobych', region: 'Lviv Oblast', country: 'Ukraine', lat: 49.352, lon: 23.505, tz: 'Europe/Kyiv', aliases: ['Дрогобич'] },
  { locality: 'Stryi', region: 'Lviv Oblast', country: 'Ukraine', lat: 49.262, lon: 23.85, tz: 'Europe/Kyiv', aliases: ['Стрий'] },
  { locality: 'Chervonohrad', region: 'Lviv Oblast', country: 'Ukraine', lat: 50.391, lon: 24.235, tz: 'Europe/Kyiv', aliases: ['Червоноград'] },
  { locality: 'Kalush', region: 'Ivano-Frankivsk Oblast', country: 'Ukraine', lat: 49.011, lon: 24.373, tz: 'Europe/Kyiv', aliases: ['Калуш'] },
  { locality: 'Kolomyia', region: 'Ivano-Frankivsk Oblast', country: 'Ukraine', lat: 48.531, lon: 25.04, tz: 'Europe/Kyiv', aliases: ['Коломия'] },
  { locality: 'Kamianets-Podilskyi', region: 'Khmelnytskyi Oblast', country: 'Ukraine', lat: 48.6833, lon: 26.5833, tz: 'Europe/Kyiv', aliases: ['Камʼянець-Подільський'] },
  { locality: 'Shepetivka', region: 'Khmelnytskyi Oblast', country: 'Ukraine', lat: 50.185, lon: 27.066, tz: 'Europe/Kyiv', aliases: ['Шепетівка'] },
  { locality: 'Netishyn', region: 'Khmelnytskyi Oblast', country: 'Ukraine', lat: 50.33, lon: 26.647, tz: 'Europe/Kyiv', aliases: ['Нетішин'] },
  { locality: 'Korosten', region: 'Zhytomyr Oblast', country: 'Ukraine', lat: 50.95, lon: 28.638, tz: 'Europe/Kyiv', aliases: ['Коростень'] },
  { locality: 'Berdychiv', region: 'Zhytomyr Oblast', country: 'Ukraine', lat: 49.893, lon: 28.602, tz: 'Europe/Kyiv', aliases: ['Бердичів'] },
  { locality: 'Zviahel', region: 'Zhytomyr Oblast', country: 'Ukraine', lat: 50.59, lon: 27.616, tz: 'Europe/Kyiv', aliases: ['Novohrad-Volynskyi', 'Звягель'] },
  { locality: 'Oleksandriia', region: 'Kirovohrad Oblast', country: 'Ukraine', lat: 48.669, lon: 33.117, tz: 'Europe/Kyiv', aliases: ['Олександрія'] },
  { locality: 'Pervomaisk', region: 'Mykolaiv Oblast', country: 'Ukraine', lat: 48.044, lon: 30.85, tz: 'Europe/Kyiv', aliases: ['Первомайськ'] },
  { locality: 'Voznesensk', region: 'Mykolaiv Oblast', country: 'Ukraine', lat: 47.572, lon: 31.335, tz: 'Europe/Kyiv', aliases: ['Вознесенськ'] },
  { locality: 'Nova Kakhovka', region: 'Kherson Oblast', country: 'Ukraine', lat: 46.754, lon: 33.377, tz: 'Europe/Kyiv', aliases: ['Нова Каховка'] },
  { locality: 'Enerhodar', region: 'Zaporizhzhia Oblast', country: 'Ukraine', lat: 47.498, lon: 34.656, tz: 'Europe/Kyiv', aliases: ['Енергодар'] },
  { locality: 'Pokrovsk', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.282, lon: 37.183, tz: 'Europe/Kyiv', aliases: ['Krasnoarmiisk', 'Покровськ'] },
  { locality: 'Bakhmut', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.595, lon: 38.0, tz: 'Europe/Kyiv', aliases: ['Бахмут'] },
  { locality: 'Horlivka', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.307, lon: 38.03, tz: 'Europe/Kyiv', aliases: ['Горлівка'] },
  { locality: 'Makiivka', region: 'Donetsk Oblast', country: 'Ukraine', lat: 48.047, lon: 37.964, tz: 'Europe/Kyiv', aliases: ['Макіївка'] },
  { locality: 'Sievierodonetsk', region: 'Luhansk Oblast', country: 'Ukraine', lat: 48.948, lon: 38.491, tz: 'Europe/Kyiv', aliases: ['Severodonetsk', 'Сєвєродонецьк'] },
  { locality: 'Lysychansk', region: 'Luhansk Oblast', country: 'Ukraine', lat: 48.905, lon: 38.442, tz: 'Europe/Kyiv', aliases: ['Лисичанськ'] },
  { locality: 'Yalta', region: 'Crimea', country: 'Ukraine', lat: 44.499, lon: 34.166, tz: 'Europe/Simferopol', aliases: ['Ялта'] },
  { locality: 'Kerch', region: 'Crimea', country: 'Ukraine', lat: 45.356, lon: 36.467, tz: 'Europe/Simferopol', aliases: ['Керч'] },
  { locality: 'Feodosia', region: 'Crimea', country: 'Ukraine', lat: 45.032, lon: 35.383, tz: 'Europe/Simferopol', aliases: ['Феодосія'] },
  { locality: 'Yevpatoria', region: 'Crimea', country: 'Ukraine', lat: 45.2, lon: 33.366, tz: 'Europe/Simferopol', aliases: ['Євпаторія'] },
  { locality: 'Alushta', region: 'Crimea', country: 'Ukraine', lat: 44.676, lon: 34.41, tz: 'Europe/Simferopol', aliases: ['Алушта'] },
  { locality: 'Zhmerynka', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.039, lon: 28.109, tz: 'Europe/Kyiv', aliases: ['Жмеринка'] },
  { locality: 'Kozyatyn', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.717, lon: 28.833, tz: 'Europe/Kyiv', aliases: ['Козятин'] },
  { locality: 'Ladyzhyn', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 48.685, lon: 29.237, tz: 'Europe/Kyiv', aliases: ['Ладижин'] },
  { locality: 'Haisyn', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 48.811, lon: 29.39, tz: 'Europe/Kyiv', aliases: ['Гайсин'] },
  { locality: 'Mohyliv-Podilskyi', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 48.446, lon: 27.798, tz: 'Europe/Kyiv', aliases: ['Могилів-Подільський'] },
  { locality: 'Bar', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.077, lon: 27.683, tz: 'Europe/Kyiv', aliases: ['Бар'] },
  { locality: 'Nemyriv', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 48.971, lon: 28.661, tz: 'Europe/Kyiv', aliases: ['Немирів'] },
  { locality: 'Kalynivka', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.447, lon: 28.523, tz: 'Europe/Kyiv', aliases: ['Калинівка'] },
  { locality: 'Tulchyn', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 48.674, lon: 28.85, tz: 'Europe/Kyiv', aliases: ['Тульчин'] },
  { locality: 'Khmilnyk', region: 'Vinnytsia Oblast', country: 'Ukraine', lat: 49.56, lon: 26.911, tz: 'Europe/Kyiv', aliases: ['Хмільник'] },
  { locality: 'Dubno', region: 'Rivne Oblast', country: 'Ukraine', lat: 50.417, lon: 25.75, tz: 'Europe/Kyiv', aliases: ['Дубно'] },
  { locality: 'Kovel', region: 'Volyn Oblast', country: 'Ukraine', lat: 51.215, lon: 24.709, tz: 'Europe/Kyiv', aliases: ['Ковель'] },
  { locality: 'Novovolynsk', region: 'Volyn Oblast', country: 'Ukraine', lat: 50.726, lon: 24.163, tz: 'Europe/Kyiv', aliases: ['Нововолинськ'] },
  { locality: 'Volodymyr', region: 'Volyn Oblast', country: 'Ukraine', lat: 50.848, lon: 24.322, tz: 'Europe/Kyiv', aliases: ['Володимир'] },
  { locality: 'Khust', region: 'Zakarpattia Oblast', country: 'Ukraine', lat: 48.179, lon: 23.299, tz: 'Europe/Kyiv', aliases: ['Хуст'] },
  { locality: 'Berehove', region: 'Zakarpattia Oblast', country: 'Ukraine', lat: 48.205, lon: 22.644, tz: 'Europe/Kyiv', aliases: ['Берегове'] },
  { locality: 'Rakhiv', region: 'Zakarpattia Oblast', country: 'Ukraine', lat: 48.057, lon: 24.201, tz: 'Europe/Kyiv', aliases: ['Рахів'] },
  { locality: 'Truskavets', region: 'Lviv Oblast', country: 'Ukraine', lat: 49.278, lon: 23.506, tz: 'Europe/Kyiv', aliases: ['Трускавець'] },
  { locality: 'Yaremche', region: 'Ivano-Frankivsk Oblast', country: 'Ukraine', lat: 48.458, lon: 24.551, tz: 'Europe/Kyiv', aliases: ['Яремче'] },
  { locality: 'Smila', region: 'Cherkasy Oblast', country: 'Ukraine', lat: 49.222, lon: 31.887, tz: 'Europe/Kyiv', aliases: ['Сміла'] },
  { locality: 'Kaniv', region: 'Cherkasy Oblast', country: 'Ukraine', lat: 49.75, lon: 31.46, tz: 'Europe/Kyiv', aliases: ['Канів'] },

  // Europe
  { locality: 'London', region: 'England', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { locality: 'Manchester', region: 'England', country: 'United Kingdom', lat: 53.4808, lon: -2.2426, tz: 'Europe/London' },
  { locality: 'Birmingham', region: 'England', country: 'United Kingdom', lat: 52.4862, lon: -1.8904, tz: 'Europe/London' },
  { locality: 'Edinburgh', region: 'Scotland', country: 'United Kingdom', lat: 55.9533, lon: -3.1883, tz: 'Europe/London' },
  { locality: 'Glasgow', region: 'Scotland', country: 'United Kingdom', lat: 55.8642, lon: -4.2518, tz: 'Europe/London' },
  { locality: 'Liverpool', region: 'England', country: 'United Kingdom', lat: 53.4084, lon: -2.9916, tz: 'Europe/London' },
  { locality: 'Dublin', region: 'Leinster', country: 'Ireland', lat: 53.3498, lon: -6.2603, tz: 'Europe/Dublin' },
  { locality: 'Paris', region: 'Île-de-France', country: 'France', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { locality: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.764, lon: 4.8357, tz: 'Europe/Paris' },
  { locality: 'Marseille', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.2965, lon: 5.3698, tz: 'Europe/Paris' },
  { locality: 'Nice', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.7102, lon: 7.262, tz: 'Europe/Paris' },
  { locality: 'Toulouse', region: 'Occitanie', country: 'France', lat: 43.6047, lon: 1.4442, tz: 'Europe/Paris' },
  { locality: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'France', lat: 44.8378, lon: -0.5792, tz: 'Europe/Paris' },
  { locality: 'Brussels', region: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { locality: 'Amsterdam', region: 'North Holland', country: 'Netherlands', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam' },
  { locality: 'Rotterdam', region: 'South Holland', country: 'Netherlands', lat: 51.9244, lon: 4.4777, tz: 'Europe/Amsterdam' },
  { locality: 'The Hague', region: 'South Holland', country: 'Netherlands', lat: 52.0705, lon: 4.3007, tz: 'Europe/Amsterdam', aliases: ['Den Haag'] },
  { locality: 'Berlin', region: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin' },
  { locality: 'Munich', region: 'Bavaria', country: 'Germany', lat: 48.1351, lon: 11.582, tz: 'Europe/Berlin', aliases: ['München'] },
  { locality: 'Hamburg', region: 'Hamburg', country: 'Germany', lat: 53.5511, lon: 9.9937, tz: 'Europe/Berlin' },
  { locality: 'Frankfurt', region: 'Hesse', country: 'Germany', lat: 50.1109, lon: 8.6821, tz: 'Europe/Berlin' },
  { locality: 'Cologne', region: 'North Rhine-Westphalia', country: 'Germany', lat: 50.9375, lon: 6.9603, tz: 'Europe/Berlin', aliases: ['Köln'] },
  { locality: 'Stuttgart', region: 'Baden-Württemberg', country: 'Germany', lat: 48.7758, lon: 9.1829, tz: 'Europe/Berlin' },
  { locality: 'Düsseldorf', region: 'North Rhine-Westphalia', country: 'Germany', lat: 51.2277, lon: 6.7735, tz: 'Europe/Berlin' },
  { locality: 'Leipzig', region: 'Saxony', country: 'Germany', lat: 51.3397, lon: 12.3731, tz: 'Europe/Berlin' },
  { locality: 'Vienna', region: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738, tz: 'Europe/Vienna', aliases: ['Wien'] },
  { locality: 'Salzburg', region: 'Salzburg', country: 'Austria', lat: 47.8095, lon: 13.055, tz: 'Europe/Vienna' },
  { locality: 'Zurich', region: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, tz: 'Europe/Zurich', aliases: ['Zürich'] },
  { locality: 'Geneva', region: 'Geneva', country: 'Switzerland', lat: 46.2044, lon: 6.1432, tz: 'Europe/Zurich', aliases: ['Genève'] },
  { locality: 'Basel', region: 'Basel-Stadt', country: 'Switzerland', lat: 47.5596, lon: 7.5886, tz: 'Europe/Zurich' },
  { locality: 'Rome', region: 'Lazio', country: 'Italy', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome', aliases: ['Roma'] },
  { locality: 'Milan', region: 'Lombardy', country: 'Italy', lat: 45.4642, lon: 9.19, tz: 'Europe/Rome', aliases: ['Milano'] },
  { locality: 'Naples', region: 'Campania', country: 'Italy', lat: 40.8518, lon: 14.2681, tz: 'Europe/Rome', aliases: ['Napoli'] },
  { locality: 'Turin', region: 'Piedmont', country: 'Italy', lat: 45.0703, lon: 7.6869, tz: 'Europe/Rome', aliases: ['Torino'] },
  { locality: 'Florence', region: 'Tuscany', country: 'Italy', lat: 43.7696, lon: 11.2558, tz: 'Europe/Rome', aliases: ['Firenze'] },
  { locality: 'Venice', region: 'Veneto', country: 'Italy', lat: 45.4408, lon: 12.3155, tz: 'Europe/Rome', aliases: ['Venezia'] },
  { locality: 'Madrid', region: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
  { locality: 'Barcelona', region: 'Catalonia', country: 'Spain', lat: 41.3851, lon: 2.1734, tz: 'Europe/Madrid' },
  { locality: 'Valencia', region: 'Valencia', country: 'Spain', lat: 39.4699, lon: -0.3763, tz: 'Europe/Madrid' },
  { locality: 'Seville', region: 'Andalusia', country: 'Spain', lat: 37.3891, lon: -5.9845, tz: 'Europe/Madrid', aliases: ['Sevilla'] },
  { locality: 'Lisbon', region: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon', aliases: ['Lisboa'] },
  { locality: 'Porto', region: 'Porto', country: 'Portugal', lat: 41.1579, lon: -8.6291, tz: 'Europe/Lisbon' },
  { locality: 'Athens', region: 'Attica', country: 'Greece', lat: 37.9838, lon: 23.7275, tz: 'Europe/Athens' },
  { locality: 'Thessaloniki', region: 'Central Macedonia', country: 'Greece', lat: 40.6401, lon: 22.9444, tz: 'Europe/Athens' },
  { locality: 'Warsaw', region: 'Mazovia', country: 'Poland', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw', aliases: ['Warszawa'] },
  { locality: 'Kraków', region: 'Lesser Poland', country: 'Poland', lat: 50.0647, lon: 19.945, tz: 'Europe/Warsaw', aliases: ['Krakow'] },
  { locality: 'Gdańsk', region: 'Pomerania', country: 'Poland', lat: 54.352, lon: 18.6466, tz: 'Europe/Warsaw', aliases: ['Gdansk'] },
  { locality: 'Wrocław', region: 'Lower Silesia', country: 'Poland', lat: 51.1079, lon: 17.0385, tz: 'Europe/Warsaw', aliases: ['Wroclaw'] },
  { locality: 'Poznań', region: 'Greater Poland', country: 'Poland', lat: 52.4064, lon: 16.9252, tz: 'Europe/Warsaw', aliases: ['Poznan'] },
  { locality: 'Prague', region: 'Prague', country: 'Czechia', lat: 50.0755, lon: 14.4378, tz: 'Europe/Prague', aliases: ['Praha'] },
  { locality: 'Brno', region: 'South Moravia', country: 'Czechia', lat: 49.1951, lon: 16.6068, tz: 'Europe/Prague' },
  { locality: 'Bratislava', region: 'Bratislava', country: 'Slovakia', lat: 48.1486, lon: 17.1077, tz: 'Europe/Bratislava' },
  { locality: 'Budapest', region: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402, tz: 'Europe/Budapest' },
  { locality: 'Bucharest', region: 'Bucharest', country: 'Romania', lat: 44.4268, lon: 26.1025, tz: 'Europe/Bucharest' },
  { locality: 'Cluj-Napoca', region: 'Cluj', country: 'Romania', lat: 46.7712, lon: 23.6236, tz: 'Europe/Bucharest' },
  { locality: 'Sofia', region: 'Sofia', country: 'Bulgaria', lat: 42.6977, lon: 23.3219, tz: 'Europe/Sofia' },
  { locality: 'Belgrade', region: 'Belgrade', country: 'Serbia', lat: 44.7866, lon: 20.4489, tz: 'Europe/Belgrade' },
  { locality: 'Zagreb', region: 'Zagreb', country: 'Croatia', lat: 45.815, lon: 15.9819, tz: 'Europe/Zagreb' },
  { locality: 'Split', region: 'Split-Dalmatia', country: 'Croatia', lat: 43.5081, lon: 16.4402, tz: 'Europe/Zagreb' },
  { locality: 'Ljubljana', region: 'Ljubljana', country: 'Slovenia', lat: 46.0569, lon: 14.5058, tz: 'Europe/Ljubljana' },
  { locality: 'Sarajevo', region: 'Sarajevo', country: 'Bosnia and Herzegovina', lat: 43.8563, lon: 18.4131, tz: 'Europe/Sarajevo' },
  { locality: 'Skopje', region: 'Skopje', country: 'North Macedonia', lat: 41.9981, lon: 21.4254, tz: 'Europe/Skopje' },
  { locality: 'Tirana', region: 'Tirana', country: 'Albania', lat: 41.3275, lon: 19.8187, tz: 'Europe/Tirane' },
  { locality: 'Chișinău', region: 'Chișinău', country: 'Moldova', lat: 47.0105, lon: 28.8638, tz: 'Europe/Chisinau', aliases: ['Chisinau'] },
  { locality: 'Vilnius', region: 'Vilnius', country: 'Lithuania', lat: 54.6872, lon: 25.2797, tz: 'Europe/Vilnius' },
  { locality: 'Riga', region: 'Riga', country: 'Latvia', lat: 56.9496, lon: 24.1052, tz: 'Europe/Riga' },
  { locality: 'Tallinn', region: 'Harju', country: 'Estonia', lat: 59.437, lon: 24.7536, tz: 'Europe/Tallinn' },
  { locality: 'Helsinki', region: 'Uusimaa', country: 'Finland', lat: 60.1699, lon: 24.9384, tz: 'Europe/Helsinki' },
  { locality: 'Stockholm', region: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm' },
  { locality: 'Gothenburg', region: 'Västra Götaland', country: 'Sweden', lat: 57.7089, lon: 11.9746, tz: 'Europe/Stockholm' },
  { locality: 'Oslo', region: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522, tz: 'Europe/Oslo' },
  { locality: 'Copenhagen', region: 'Capital Region', country: 'Denmark', lat: 55.6761, lon: 12.5683, tz: 'Europe/Copenhagen' },
  { locality: 'Reykjavik', region: 'Capital Region', country: 'Iceland', lat: 64.1466, lon: -21.9426, tz: 'Atlantic/Reykjavik' },
  { locality: 'Moscow', region: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173, tz: 'Europe/Moscow' },
  { locality: 'Saint Petersburg', region: 'Saint Petersburg', country: 'Russia', lat: 59.9311, lon: 30.3609, tz: 'Europe/Moscow', aliases: ['St Petersburg'] },
  { locality: 'Minsk', region: 'Minsk', country: 'Belarus', lat: 53.9006, lon: 27.559, tz: 'Europe/Minsk' },
  { locality: 'Tbilisi', region: 'Tbilisi', country: 'Georgia', lat: 41.7151, lon: 44.8271, tz: 'Asia/Tbilisi' },
  { locality: 'Yerevan', region: 'Yerevan', country: 'Armenia', lat: 40.1792, lon: 44.4991, tz: 'Asia/Yerevan' },
  { locality: 'Baku', region: 'Baku', country: 'Azerbaijan', lat: 40.4093, lon: 49.8671, tz: 'Asia/Baku' },
  { locality: 'Istanbul', region: 'Istanbul', country: 'Türkiye', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul' },
  { locality: 'Ankara', region: 'Ankara', country: 'Türkiye', lat: 39.9334, lon: 32.8597, tz: 'Europe/Istanbul' },
  { locality: 'Izmir', region: 'Izmir', country: 'Türkiye', lat: 38.4237, lon: 27.1428, tz: 'Europe/Istanbul' },
  { locality: 'Antalya', region: 'Antalya', country: 'Türkiye', lat: 36.8969, lon: 30.7133, tz: 'Europe/Istanbul' },

  // North America
  { locality: 'New York', region: 'New York', country: 'United States', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { locality: 'Los Angeles', region: 'California', country: 'United States', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
  { locality: 'Chicago', region: 'Illinois', country: 'United States', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
  { locality: 'Houston', region: 'Texas', country: 'United States', lat: 29.7604, lon: -95.3698, tz: 'America/Chicago' },
  { locality: 'Phoenix', region: 'Arizona', country: 'United States', lat: 33.4484, lon: -112.074, tz: 'America/Phoenix' },
  { locality: 'Philadelphia', region: 'Pennsylvania', country: 'United States', lat: 39.9526, lon: -75.1652, tz: 'America/New_York' },
  { locality: 'San Antonio', region: 'Texas', country: 'United States', lat: 29.4241, lon: -98.4936, tz: 'America/Chicago' },
  { locality: 'San Diego', region: 'California', country: 'United States', lat: 32.7157, lon: -117.1611, tz: 'America/Los_Angeles' },
  { locality: 'Dallas', region: 'Texas', country: 'United States', lat: 32.7767, lon: -96.797, tz: 'America/Chicago' },
  { locality: 'San Jose', region: 'California', country: 'United States', lat: 37.3382, lon: -121.8863, tz: 'America/Los_Angeles' },
  { locality: 'Austin', region: 'Texas', country: 'United States', lat: 30.2672, lon: -97.7431, tz: 'America/Chicago' },
  { locality: 'San Francisco', region: 'California', country: 'United States', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { locality: 'Seattle', region: 'Washington', country: 'United States', lat: 47.6062, lon: -122.3321, tz: 'America/Los_Angeles' },
  { locality: 'Denver', region: 'Colorado', country: 'United States', lat: 39.7392, lon: -104.9903, tz: 'America/Denver' },
  { locality: 'Boston', region: 'Massachusetts', country: 'United States', lat: 42.3601, lon: -71.0589, tz: 'America/New_York' },
  { locality: 'Miami', region: 'Florida', country: 'United States', lat: 25.7617, lon: -80.1918, tz: 'America/New_York' },
  { locality: 'Atlanta', region: 'Georgia', country: 'United States', lat: 33.749, lon: -84.388, tz: 'America/New_York' },
  { locality: 'Washington', region: 'District of Columbia', country: 'United States', lat: 38.9072, lon: -77.0369, tz: 'America/New_York', aliases: ['Washington DC', 'DC'] },
  { locality: 'Las Vegas', region: 'Nevada', country: 'United States', lat: 36.1699, lon: -115.1398, tz: 'America/Los_Angeles' },
  { locality: 'Minneapolis', region: 'Minnesota', country: 'United States', lat: 44.9778, lon: -93.265, tz: 'America/Chicago' },
  { locality: 'Detroit', region: 'Michigan', country: 'United States', lat: 42.3314, lon: -83.0458, tz: 'America/Detroit' },
  { locality: 'Portland', region: 'Oregon', country: 'United States', lat: 45.5152, lon: -122.6784, tz: 'America/Los_Angeles' },
  { locality: 'Honolulu', region: 'Hawaii', country: 'United States', lat: 21.3069, lon: -157.8583, tz: 'Pacific/Honolulu' },
  { locality: 'Toronto', region: 'Ontario', country: 'Canada', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { locality: 'Montreal', region: 'Quebec', country: 'Canada', lat: 45.5019, lon: -73.5674, tz: 'America/Toronto', aliases: ['Montréal'] },
  { locality: 'Vancouver', region: 'British Columbia', country: 'Canada', lat: 49.2827, lon: -123.1207, tz: 'America/Vancouver' },
  { locality: 'Calgary', region: 'Alberta', country: 'Canada', lat: 51.0447, lon: -114.0719, tz: 'America/Edmonton' },
  { locality: 'Ottawa', region: 'Ontario', country: 'Canada', lat: 45.4215, lon: -75.6972, tz: 'America/Toronto' },
  { locality: 'Mexico City', region: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
  { locality: 'Guadalajara', region: 'Jalisco', country: 'Mexico', lat: 20.6597, lon: -103.3496, tz: 'America/Mexico_City' },
  { locality: 'Monterrey', region: 'Nuevo León', country: 'Mexico', lat: 25.6866, lon: -100.3161, tz: 'America/Monterrey' },
  { locality: 'Cancún', region: 'Quintana Roo', country: 'Mexico', lat: 21.1619, lon: -86.8515, tz: 'America/Cancun', aliases: ['Cancun'] },

  // South America
  { locality: 'São Paulo', region: 'São Paulo', country: 'Brazil', lat: -23.5558, lon: -46.6396, tz: 'America/Sao_Paulo', aliases: ['Sao Paulo'] },
  { locality: 'Rio de Janeiro', region: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729, tz: 'America/Sao_Paulo' },
  { locality: 'Brasília', region: 'Federal District', country: 'Brazil', lat: -15.7975, lon: -47.8919, tz: 'America/Sao_Paulo', aliases: ['Brasilia'] },
  { locality: 'Buenos Aires', region: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
  { locality: 'Santiago', region: 'Santiago', country: 'Chile', lat: -33.4489, lon: -70.6693, tz: 'America/Santiago' },
  { locality: 'Lima', region: 'Lima', country: 'Peru', lat: -12.0464, lon: -77.0428, tz: 'America/Lima' },
  { locality: 'Bogotá', region: 'Bogotá', country: 'Colombia', lat: 4.711, lon: -74.0721, tz: 'America/Bogota', aliases: ['Bogota'] },
  { locality: 'Caracas', region: 'Capital District', country: 'Venezuela', lat: 10.4806, lon: -66.9036, tz: 'America/Caracas' },
  { locality: 'Quito', region: 'Pichincha', country: 'Ecuador', lat: -0.1807, lon: -78.4678, tz: 'America/Guayaquil' },
  { locality: 'Montevideo', region: 'Montevideo', country: 'Uruguay', lat: -34.9011, lon: -56.1645, tz: 'America/Montevideo' },

  // Asia & Oceania
  { locality: 'Tokyo', region: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { locality: 'Osaka', region: 'Osaka', country: 'Japan', lat: 34.6937, lon: 135.5023, tz: 'Asia/Tokyo' },
  { locality: 'Seoul', region: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.978, tz: 'Asia/Seoul' },
  { locality: 'Beijing', region: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074, tz: 'Asia/Shanghai' },
  { locality: 'Shanghai', region: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737, tz: 'Asia/Shanghai' },
  { locality: 'Hong Kong', region: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lon: 114.1694, tz: 'Asia/Hong_Kong' },
  { locality: 'Taipei', region: 'Taipei', country: 'Taiwan', lat: 25.033, lon: 121.5654, tz: 'Asia/Taipei' },
  { locality: 'Singapore', region: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { locality: 'Bangkok', region: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, tz: 'Asia/Bangkok' },
  { locality: 'Jakarta', region: 'Jakarta', country: 'Indonesia', lat: -6.2088, lon: 106.8456, tz: 'Asia/Jakarta' },
  { locality: 'Manila', region: 'Metro Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842, tz: 'Asia/Manila' },
  { locality: 'Hanoi', region: 'Hanoi', country: 'Vietnam', lat: 21.0278, lon: 105.8342, tz: 'Asia/Ho_Chi_Minh' },
  { locality: 'Ho Chi Minh City', region: 'Ho Chi Minh', country: 'Vietnam', lat: 10.8231, lon: 106.6297, tz: 'Asia/Ho_Chi_Minh', aliases: ['Saigon'] },
  { locality: 'Mumbai', region: 'Maharashtra', country: 'India', lat: 19.076, lon: 72.8777, tz: 'Asia/Kolkata', aliases: ['Bombay'] },
  { locality: 'Delhi', region: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209, tz: 'Asia/Kolkata', aliases: ['New Delhi'] },
  { locality: 'Bengaluru', region: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata', aliases: ['Bangalore'] },
  { locality: 'Chennai', region: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707, tz: 'Asia/Kolkata', aliases: ['Madras'] },
  { locality: 'Kolkata', region: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639, tz: 'Asia/Kolkata', aliases: ['Calcutta'] },
  { locality: 'Hyderabad', region: 'Telangana', country: 'India', lat: 17.385, lon: 78.4867, tz: 'Asia/Kolkata' },
  { locality: 'Karachi', region: 'Sindh', country: 'Pakistan', lat: 24.8607, lon: 67.0011, tz: 'Asia/Karachi' },
  { locality: 'Lahore', region: 'Punjab', country: 'Pakistan', lat: 31.5204, lon: 74.3587, tz: 'Asia/Karachi' },
  { locality: 'Dhaka', region: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125, tz: 'Asia/Dhaka' },
  { locality: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { locality: 'Abu Dhabi', region: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lon: 54.3773, tz: 'Asia/Dubai' },
  { locality: 'Riyadh', region: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753, tz: 'Asia/Riyadh' },
  { locality: 'Jeddah', region: 'Makkah', country: 'Saudi Arabia', lat: 21.4858, lon: 39.1925, tz: 'Asia/Riyadh' },
  { locality: 'Tehran', region: 'Tehran', country: 'Iran', lat: 35.6892, lon: 51.389, tz: 'Asia/Tehran' },
  { locality: 'Baghdad', region: 'Baghdad', country: 'Iraq', lat: 33.3152, lon: 44.3661, tz: 'Asia/Baghdad' },
  { locality: 'Jerusalem', region: 'Jerusalem', country: 'Israel', lat: 31.7683, lon: 35.2137, tz: 'Asia/Jerusalem' },
  { locality: 'Tel Aviv', region: 'Tel Aviv', country: 'Israel', lat: 32.0853, lon: 34.7818, tz: 'Asia/Jerusalem' },
  { locality: 'Beirut', region: 'Beirut', country: 'Lebanon', lat: 33.8938, lon: 35.5018, tz: 'Asia/Beirut' },
  { locality: 'Amman', region: 'Amman', country: 'Jordan', lat: 31.9454, lon: 35.9284, tz: 'Asia/Amman' },
  { locality: 'Tashkent', region: 'Tashkent', country: 'Uzbekistan', lat: 41.2995, lon: 69.2401, tz: 'Asia/Tashkent' },
  { locality: 'Almaty', region: 'Almaty', country: 'Kazakhstan', lat: 43.222, lon: 76.8512, tz: 'Asia/Almaty' },
  { locality: 'Astana', region: 'Astana', country: 'Kazakhstan', lat: 51.1605, lon: 71.4704, tz: 'Asia/Almaty', aliases: ['Nur-Sultan'] },
  { locality: 'Ulaanbaatar', region: 'Ulaanbaatar', country: 'Mongolia', lat: 47.8864, lon: 106.9057, tz: 'Asia/Ulaanbaatar' },
  { locality: 'Sydney', region: 'New South Wales', country: 'Australia', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { locality: 'Melbourne', region: 'Victoria', country: 'Australia', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne' },
  { locality: 'Brisbane', region: 'Queensland', country: 'Australia', lat: -27.4698, lon: 153.0251, tz: 'Australia/Brisbane' },
  { locality: 'Perth', region: 'Western Australia', country: 'Australia', lat: -31.9505, lon: 115.8605, tz: 'Australia/Perth' },
  { locality: 'Adelaide', region: 'South Australia', country: 'Australia', lat: -34.9285, lon: 138.6007, tz: 'Australia/Adelaide' },
  { locality: 'Auckland', region: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland' },
  { locality: 'Wellington', region: 'Wellington', country: 'New Zealand', lat: -41.2865, lon: 174.7762, tz: 'Pacific/Auckland' },

  // Africa
  { locality: 'Cairo', region: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
  { locality: 'Alexandria', region: 'Alexandria', country: 'Egypt', lat: 31.2001, lon: 29.9187, tz: 'Africa/Cairo' },
  { locality: 'Casablanca', region: 'Casablanca-Settat', country: 'Morocco', lat: 33.5731, lon: -7.5898, tz: 'Africa/Casablanca' },
  { locality: 'Rabat', region: 'Rabat-Salé-Kénitra', country: 'Morocco', lat: 34.0209, lon: -6.8416, tz: 'Africa/Casablanca' },
  { locality: 'Algiers', region: 'Algiers', country: 'Algeria', lat: 36.7538, lon: 3.0588, tz: 'Africa/Algiers' },
  { locality: 'Tunis', region: 'Tunis', country: 'Tunisia', lat: 36.8065, lon: 10.1815, tz: 'Africa/Tunis' },
  { locality: 'Lagos', region: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792, tz: 'Africa/Lagos' },
  { locality: 'Abuja', region: 'FCT', country: 'Nigeria', lat: 9.0765, lon: 7.3986, tz: 'Africa/Lagos' },
  { locality: 'Accra', region: 'Greater Accra', country: 'Ghana', lat: 5.6037, lon: -0.187, tz: 'Africa/Accra' },
  { locality: 'Nairobi', region: 'Nairobi', country: 'Kenya', lat: -1.2921, lon: 36.8219, tz: 'Africa/Nairobi' },
  { locality: 'Addis Ababa', region: 'Addis Ababa', country: 'Ethiopia', lat: 9.032, lon: 38.7469, tz: 'Africa/Addis_Ababa' },
  { locality: 'Johannesburg', region: 'Gauteng', country: 'South Africa', lat: -26.2041, lon: 28.0473, tz: 'Africa/Johannesburg' },
  { locality: 'Cape Town', region: 'Western Cape', country: 'South Africa', lat: -33.9249, lon: 18.4241, tz: 'Africa/Johannesburg' },
  { locality: 'Durban', region: 'KwaZulu-Natal', country: 'South Africa', lat: -29.8587, lon: 31.0218, tz: 'Africa/Johannesburg' },
  { locality: 'Dar es Salaam', region: 'Dar es Salaam', country: 'Tanzania', lat: -6.7924, lon: 39.2083, tz: 'Africa/Dar_es_Salaam' },
  { locality: 'Dakar', region: 'Dakar', country: 'Senegal', lat: 14.7167, lon: -17.4677, tz: 'Africa/Dakar' },
];

export const ATLAS: Place[] = ROWS.map(toPlace);

function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/['’ʼ`]/g, '');
}

function scorePlace(place: Place, needle: string): number {
  const name = fold(place.name);
  const aliases = (place.aliases ?? []).map(fold);
  if (aliases.some((a) => a === needle) || name === needle) return 200;
  if (aliases.some((a) => a.startsWith(needle))) return 120;
  if (name.startsWith(needle)) return 110;
  if (aliases.some((a) => a.includes(needle)) || name.includes(needle)) return 60;
  return 0;
}

export function searchAtlas(q: string, limit = 80): Place[] {
  const needle = fold(q.trim());
  if (!needle) return ATLAS;
  return ATLAS.map((place) => ({ place, score: scorePlace(place, needle) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name))
    .slice(0, limit)
    .map((row) => row.place);
}

export function mergePlaces(primary: Place[], extra: Place[], limit = 80): Place[] {
  const seen = new Set<string>();
  const out: Place[] = [];
  for (const place of [...primary, ...extra]) {
    const key = `${fold(place.name)}|${place.lat.toFixed(3)}|${place.lon.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(place);
    if (out.length >= limit) break;
  }
  return out;
}
