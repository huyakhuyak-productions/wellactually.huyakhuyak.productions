import type { Card } from "../types";

import { prepositionsTime } from "./prepositions-time";
import { prepositionsPlace } from "./prepositions-place";
import { prepositionsAgent } from "./prepositions-agent";
import { prepositionsPurpose } from "./prepositions-purpose";
import { prepositionsRelation } from "./prepositions-relation";
import { prepositionsMovement } from "./prepositions-movement";
import { prepositionsDuration } from "./prepositions-duration";
import { prepositionsComparison } from "./prepositions-comparison";
import { prepositionsDependent } from "./prepositions-dependent";
import { prepositionsIdiomatic } from "./prepositions-idiomatic";
import { prepositionsAcademic } from "./prepositions-academic";
import { prepositionsPossession } from "./prepositions-possession";
import { prepositionsConcession } from "./prepositions-concession";
import { prepositionsHard } from "./prepositions-hard";
import { prepositionsExtraHard } from "./prepositions-extra-hard";

export const prepositionCards: Card[] = [
  ...prepositionsTime,
  ...prepositionsPlace,
  ...prepositionsAgent,
  ...prepositionsPurpose,
  ...prepositionsRelation,
  ...prepositionsMovement,
  ...prepositionsDuration,
  ...prepositionsComparison,
  ...prepositionsDependent,
  ...prepositionsIdiomatic,
  ...prepositionsAcademic,
  ...prepositionsPossession,
  ...prepositionsConcession,
  ...prepositionsHard,
  ...prepositionsExtraHard,
];
