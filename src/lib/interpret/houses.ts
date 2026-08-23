import { packedHousePlay } from './packs';

export const HOUSES: Record<number, string> = {
  1: 'The first house is the body and the entrance — how life meets you before the biography does.',
  2: 'The second house is what you keep: money, voice, the worth you will not be talked out of.',
  3: 'The third house is the near world — siblings, errands, the mind in traffic, the message that has to land today.',
  4: 'The fourth house is the root: home, the private weather, the family you came from and the one you build.',
  5: 'The fifth house is play with stakes — making, children, romance, the thing you do because it has to be seen.',
  6: 'The sixth house is the day’s labour: work, health, the animals and systems that keep the life running.',
  7: 'The seventh house is the other chair — partners, open enemies, the contract you cannot write alone.',
  8: 'The eighth house is what is not yours until it is: other people’s money, sex, debt, the rooms you do not show guests.',
  9: 'The ninth house is the far map — belief, study, travel, the story that has to be larger than the postcode.',
  10: 'The tenth house is the skyline: vocation, reputation, the name the city uses for you.',
  11: 'The eleventh house is the circle you choose — friends, scenes, the future tense of belonging.',
  12: 'The twelfth house is the back room — solitude, the unnamed, what you do when nobody is keeping score.',
};

const LENS: Record<string, string> = {
  sun: 'Will and vitality',
  moon: 'Need and mood',
  mercury: 'Mind and speech',
  venus: 'Appetite and bond',
  mars: 'Drive and anger',
  jupiter: 'Growth and faith',
  saturn: 'Time and duty',
  uranus: 'The glitch and the future',
  neptune: 'Longing and fog',
  pluto: 'Pressure and power',
};

export function planetInHouse(planetKey: string, house: number, locale?: string | null): string | null {
  const packed = packedHousePlay(planetKey, house, locale);
  if (packed) return packed;
  const domain = HOUSES[house];
  const lens = LENS[planetKey];
  if (!domain || !lens) return null;
  return `${lens} play out through house ${house}. ${domain}`;
}
