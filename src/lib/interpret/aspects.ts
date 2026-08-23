import { packedAspectSense, packedAspectType } from './packs';

export const ASPECT_SENSE: Record<string, string> = {
  conjunction:
    'Fused: the two functions share a room and are hard to tell apart. Useful as focus, costly as a blind spot.',
  sextile:
    'An easy door. The talent is there if you walk through; it will not chase you.',
  square:
    'Friction that builds a skill. The two wants collide until you learn a third move.',
  trine:
    'Ease that can go lazy. Support is native; effort has to be chosen or nothing much happens.',
  opposition:
    'The other pole. You meet this in people, and in the part of yourself you keep across the room.',
};

export function aspectReading(a: string, b: string, type: string, locale?: string | null): string {
  const sense = packedAspectSense(type, locale) ?? ASPECT_SENSE[type];
  const typeLabel = packedAspectType(type, locale) ?? type;
  if (!sense) return `${a} ${typeLabel} ${b}.`;
  return `${a} ${typeLabel} ${b}. ${sense}`;
}
