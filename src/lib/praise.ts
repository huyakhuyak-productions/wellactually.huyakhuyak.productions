/**
 * Begrudging acknowledgments for correct answers.
 * The examiner is not impressed, merely... tolerant.
 */
const praises: readonly string[] = [
  "Adequate.",
  "One supposes that will do.",
  "Correct. Don't let it go to your head.",
  "Hmm. A stopped clock, as they say.",
  "Well. Even a blind squirrel, et cetera.",
  "That is... not incorrect.",
  "Grudgingly acknowledged.",
  "The examiners note your response with mild surprise.",
  "Technically correct — the most tedious kind of correct.",
  "One must concede the point. Reluctantly.",
  "You appear to have stumbled upon the right answer.",
  "Noted. Without enthusiasm.",
  "The committee shall record this as... acceptable.",
  "A passable effort. Barely.",
  "Correct, though one suspects luck played its part.",
  "Even the mediocre may occasionally shine. Carry on.",
  "Right you are. How terribly unexpected.",
  "The examiners exchange glances of restrained astonishment.",
  "Satisfactory. In the loosest possible sense.",
  "One's expectations have been — narrowly — exceeded.",
];

/**
 * Returns a random begrudging praise from the collection.
 */
export function getRandomPraise(): string {
  return praises[Math.floor(Math.random() * praises.length)];
}
