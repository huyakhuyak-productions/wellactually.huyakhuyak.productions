/**
 * Begrudging acknowledgments for correct answers.
 * The examiner is not impressed, merely… tolerant.
 */
const praises: readonly string[] = [
  "Adequate.",
  "One supposes that will do.",
  "Correct. Don't let it go to your head.",
  "Hmm. A stopped clock, as they say.",
  "Well. Even a blind squirrel, et cetera.",
  "That is… not incorrect.",
  "Grudgingly acknowledged.",
  "The examiners note your response with mild surprise.",
  "Technically correct — the most tedious kind of correct.",
  "One must concede the point. Reluctantly.",
  "You appear to have stumbled upon the right answer. Quite by accident, one assumes.",
  "Noted. Without enthusiasm, but noted.",
  "The committee shall record this as… acceptable. In the narrowest possible sense.",
  "A passable effort. Barely. But passable.",
  "Correct, though one suspects luck played its part.",
  "Even the mediocre may occasionally shine. Today appears to be your day.",
  "Right you are. How terribly unexpected.",
  "The examiners exchange glances of restrained astonishment.",
  "Satisfactory. In the way that room-temperature water is satisfactory.",
  "One's expectations have been — narrowly — exceeded.",
  "The Board notes your answer and declines to comment further.",
  "Correct. We shan't be writing to your parents about this one.",
  "How remarkably competent. One is almost moved.",
  "That is the right answer. We checked. Twice.",
  "The examiner suppresses what might, under other circumstances, be called a smile.",
  "Adequate. Not 'good.' Not 'impressive.' Adequate. Let us proceed.",
  "You have answered correctly. This changes nothing between us.",
  "One would almost think you'd been revising. Almost.",
  "The answer is correct. The examiner is unmoved. These are not contradictions.",
  "Well, well. It appears the investment in your education was not entirely wasted.",
];

/**
 * Returns a random begrudging praise from the collection.
 */
export function getRandomPraise(): string {
  return praises[Math.floor(Math.random() * praises.length)];
}
