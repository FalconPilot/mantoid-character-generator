// Local functions
import { generator, dataset } from '../helpers/generators'

// Local data
import skills from './skills'

/*
**  Races datasets
*/

// Clone
const clone = {
  key: "clone",
  amt: 3,
  data: {
    name:   "Clone",
    skills: [ skills.clonage ]
  }
}

// Porkman
const porkman = {
  key: "porkman",
  amt: 3,
  data: {
    name:   "Homme-Porc",
    skills: [ skills.saucisse ]
  }
}

// Mantoid
const mantoid = {
  key: "mantoid",
  amt: 3,
  data: {
    name:   "Mantoïde",
    skills: [ skills.riche ]
  }
}

// Cafaroid
const cafaroid = {
  key: "cafaroid",
  amt: 3,
  data: {
    name:   "Cafaroïde",
    skills: [ skills.artisanat ]
  }
}

// Export races object
export const races = generator("races", dataset([clone, porkman, mantoid, cafaroid], 3))
