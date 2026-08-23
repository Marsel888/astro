import type { SignName } from '@/lib/chart';
import { aspectReading } from './aspects';
import { planetInHouse } from './houses';
import { packedReading } from './packs';
import {
  JUPITER,
  MARS,
  MERCURY,
  NEPTUNE,
  PLUTO,
  SATURN,
  URANUS,
} from './planets';

export type ReadingKind =
  | 'sun'
  | 'moon'
  | 'rising'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

const SUN: Record<SignName, string> = {
  Aries:
    'You start before the room has agreed it is time. Aries Sun lives by ignition — work, arguments, and rooms get a first spark from you, then you have to stay long enough for heat to become a result.',
  Taurus:
    'You trust what can be touched, timed, and kept. Taurus Sun builds a life out of appetite and patience: money, food, craft, and the refusal to be rushed into a thinner version of the same thing.',
  Gemini:
    'You think out loud and collect people the way other people collect facts. Gemini Sun stays interested by splitting attention — two projects, two conversations — and the skill is making the split look like range, not escape.',
  Cancer:
    'You take the temperature of a room before you take a side. Cancer Sun protects what it loves by remembering: family, kitchens, old loyalties, the private history that other people treat as optional.',
  Leo:
    'You need the thing to be seen, or it hardly happened. Leo Sun organises life around a stage — work with an audience, love with witnesses — and goes cold when effort is treated as background noise.',
  Virgo:
    'You notice the one misaligned stitch and cannot pretend you did not. Virgo Sun serves by editing: health routines, sentences, other people’s plans. Usefulness is how you love; contempt is the shadow of the same eye.',
  Libra:
    'You would rather arrange the conflict than sit inside it. Libra Sun reads the social geometry of a room and moves toward balance — sometimes as peace, sometimes as a charm that postpones the real decision.',
  Scorpio:
    'You do not do shallow on purpose. Scorpio Sun wants the motive under the motive: who has power, who is bluffing, what will still be true after the performance. Intensity is not a mood; it is a method.',
  Sagittarius:
    'You need a horizon or you start chewing the furniture. Sagittarius Sun lives by thesis — travel, belief, a bigger map — and gets reckless when the story gets smaller than your appetite for meaning.',
  Capricorn:
    'You take time seriously, including other people’s. Capricorn Sun climbs in public and doubts in private: titles, structures, the long game. Respect is the currency; fatigue is what happens when the climb is the only personality left.',
  Aquarius:
    'You stand slightly outside the circle even when you built it. Aquarius Sun belongs to ideas and to people-as-a-pattern: scenes, causes, future tense. Warmth has to be chosen, because detachment is the default talent.',
  Pisces:
    'You pick up weather that is not yours and call it a day. Pisces Sun lives by permeability — art, care, the unnamed mood in a house — and has to learn the difference between compassion and disappearing.',
};

const MOON: Record<SignName, string> = {
  Aries:
    'Feelings arrive as action. The Aries Moon does not sit with a mood; it starts a fight, a run, a message. Safety is motion, and stillness can feel like a threat even when nothing is wrong.',
  Taurus:
    'You settle by feeding the body first. The Taurus Moon wants warmth, food, money in the account, a familiar sofa. Upset shows as stubbornness: if the ground moves, you hold still until the ground apologises.',
  Gemini:
    'You talk your way back to calm. The Gemini Moon names the feeling so it cannot swallow you — texts, jokes, a second tab. Anxiety is unprocessed chatter; rest is a conversation that finally lands.',
  Cancer:
    'Home is not a place so much as a climate you try to rebuild everywhere. The Cancer Moon stores slights and kindnesses with equal fidelity, and withdrawal is how you keep the inner room from being trampled.',
  Leo:
    'You need to be received, not merely tolerated. The Leo Moon brightens when someone watches with genuine interest and sulks when effort goes unwitnessed. Pride is the armour; hurt is usually underneath it.',
  Virgo:
    'Care looks like fixing. The Virgo Moon soothes by sorting — lists, meals, other people’s problems — and turns on itself when nothing is quite clean enough to allow rest.',
  Libra:
    'You feel safest when no one is quietly furious. The Libra Moon reads faces, keeps the peace, and can mislay its own preference in the process. Harmony is nourishment; a one-sided compromise is how you go hungry.',
  Scorpio:
    'Nothing emotional is casual. The Scorpio Moon bonds in private and tests in silence. Trust, once given, is total; suspicion, once earned, is hard to talk down with charm.',
  Sagittarius:
    'You feel better when the story gets bigger. The Sagittarius Moon needs air — a walk, a belief, a laugh that breaks the spell. Trapped feelings come out as restlessness or a sermon.',
  Capricorn:
    'You keep the feeling until it has a job. The Capricorn Moon is loyal, dry-eyed in public, and older than the room. Comfort is competence; sadness waits until the work is done, which is how it becomes architecture.',
  Aquarius:
    'You step back to see the pattern, even from your own heart. The Aquarius Moon intellectualises first: friends, causes, the cool take. Intimacy has to be invited past the observation deck.',
  Pisces:
    'Moods arrive without a name and leave the same way. The Pisces Moon absorbs the house, the news, the person across from you. Rest is a boundary, not another act of care.',
};

const RISING: Record<SignName, string> = {
  Aries:
    'You enter like a decision. Aries rising reads as direct, impatient, physically forward — the first handshake, the first objection. People meet your heat before they meet your private weather.',
  Taurus:
    'You arrive already seated. Taurus rising looks unhurried, sensory, hard to shove. The first impression is substance: voice, clothes, the sense that you will still be here when the trend has moved on.',
  Gemini:
    'You come in talking, or looking as if you might. Gemini rising reads as quick, social, slightly split — two interests visible at once. People meet your curiosity before they meet your attachments.',
  Cancer:
    'You scan for whether the room is kind. Cancer rising presents as careful, hospitable, privately armoured. Softness is the costume; the guard is already up.',
  Leo:
    'You are visible whether you meant to be or not. Leo rising carries warmth and a slight performance: posture, hair, the sense of an entrance. People meet the sunlit version first.',
  Virgo:
    'You notice the error in the invitation. Virgo rising reads as precise, useful, a little withheld. Competence is the first language; ease comes later, if it comes.',
  Libra:
    'You arrange yourself in relation to whoever is already there. Libra rising is gracious, watchful, aesthetically tuned. Charm is the opening move; the preference is hiding behind it.',
  Scorpio:
    'You are felt before you are known. Scorpio rising gives little away and still changes the air. People meet the stare, the pause, the sense that you are measuring the stakes.',
  Sagittarius:
    'You enter as if the map is still unfolding. Sagittarius rising reads as candid, restless, slightly too honest for small talk. Humour is the passport; belief is the luggage.',
  Capricorn:
    'You look like you have already started the meeting. Capricorn rising presents as composed, older than your years, allergic to fuss. Authority is the first impression, whether you wanted the job or not.',
  Aquarius:
    'You stand at a slight angle to the group. Aquarius rising reads as original, friendly at a distance, hard to categorise. People meet the idea of you — style, stance, the unexpected remark — before the private person.',
  Pisces:
    'You arrive as atmosphere. Pisces rising is porous, unfocused in a way that reads as kindness or drift. People meet the mood you carry, which is not always yours.',
};

const VENUS: Record<SignName, string> = {
  Aries:
    'You like the chase more than the treaty. Venus in Aries wants heat, a yes that arrives fast, and goes bored when affection becomes a schedule.',
  Taurus:
    'Pleasure is a craft. Venus in Taurus loves what lasts — texture, meals, money as safety — and will not be talked out of a slower yes.',
  Gemini:
    'Flirtation is information. Venus in Gemini wants conversation as courtship: variety, wit, two threads at once. Loyalty has to include room to be interested elsewhere without leaving.',
  Cancer:
    'You bond by taking care. Venus in Cancer wants the private world — kitchens, nicknames, being chosen in small repeating ways. Love that stays public and unhoused does not quite count.',
  Leo:
    'You want to be adored on purpose. Venus in Leo gives generously and notices when the gift is not seen. Romance needs a little theatre; neglect looks like dimming the lights.',
  Virgo:
    'Devotion looks like improvement. Venus in Virgo shows love by fixing, feeding, editing the plan. Criticism is often a clumsy form of care, and has to be translated.',
  Libra:
    'Beauty is a moral category. Venus in Libra wants the elegant arrangement: fairness, style, a partner who can be shown. Conflict is the tax; harmony is the native language.',
  Scorpio:
    'Casual is not on the menu. Venus in Scorpio bonds as fusion or not at all — jealousy, loyalty, the refusal to share the real story with the room.',
  Sagittarius:
    'You fall for the horizon in a person. Venus in Sagittarius wants adventure as affection: humour, distance, a thesis you can travel inside. Too small a life feels like a bad romance.',
  Capricorn:
    'Love has to be built, not merely felt. Venus in Capricorn is loyal, slow to declare, serious about the future tense. Respect is foreplay; unreliability is a deal-breaker.',
  Aquarius:
    'You need friendship inside the romance. Venus in Aquarius loves at a slight remove — ideals, scenes, the unusual arrangement — and chills if asked to merge on command.',
  Pisces:
    'You dissolve the border and call it devotion. Venus in Pisces idealises, rescues, and hears the music in people. The work is loving without disappearing into the other person’s weather.',
};

const TABLES: Record<ReadingKind, Record<SignName, string>> = {
  sun: SUN,
  moon: MOON,
  rising: RISING,
  mercury: MERCURY,
  venus: VENUS,
  mars: MARS,
  jupiter: JUPITER,
  saturn: SATURN,
  uranus: URANUS,
  neptune: NEPTUNE,
  pluto: PLUTO,
};

export function isReadingKind(key: string): key is ReadingKind {
  return Object.prototype.hasOwnProperty.call(TABLES, key);
}

export function readingFor(kind: ReadingKind, sign: SignName, locale?: string | null): string {
  return packedReading(kind, sign, locale) ?? TABLES[kind][sign];
}

export function natalParagraphs(input: {
  sun: SignName;
  moon: SignName;
  rising: SignName | null;
  sunHouse?: number | null;
  moonHouse?: number | null;
  locale?: string | null;
  short?: boolean;
}): string[] {
  const loc = input.locale;
  const out = [readingFor('sun', input.sun, loc)];
  if (!input.short && input.sunHouse) {
    const houseText = planetInHouse('sun', input.sunHouse, loc);
    if (houseText) out.push(houseText);
  }
  out.push(readingFor('moon', input.moon, loc));
  if (!input.short && input.moonHouse) {
    const houseText = planetInHouse('moon', input.moonHouse, loc);
    if (houseText) out.push(houseText);
  }
  if (input.rising) out.push(readingFor('rising', input.rising, loc));
  return out;
}

export function placementReading(
  planetKey: string,
  sign: SignName,
  house: number | null,
  locale?: string | null,
): string[] {
  if (!isReadingKind(planetKey)) return [];
  const out = [readingFor(planetKey, sign, locale)];
  if (house) {
    const houseText = planetInHouse(planetKey, house, locale);
    if (houseText) out.push(houseText);
  }
  return out;
}

export { aspectReading, planetInHouse };
export { HOUSES } from './houses';
export { ASPECT_SENSE } from './aspects';
