// Local functions
import { generator, dataset } from '../helpers/generators'

// Local data
import { skills } from './skills'

/*
**  Races datasets
*/

// Clone
export const clone = {
  key: "clone",
  amt: 3,
  data: {
    name:   "Clone",
    skills: [ skills.clonage ]
  }
}

// Porkman
export const porkman = {
  key: "porkman",
  amt: 3,
  data: {
    name:   "Homme-Porc",
    skills: [ skills.saucisse ]
  }
}

// Mantoid
export const mantoid = {
  key: "mantoid",
  amt: 3,
  data: {
    name:   "Mantoïde",
    skills: [ skills.riche ]
  }
}

// Cafaroid
export const cafaroid = {
  key: "cafaroid",
  amt: 3,
  data: {
    name:   "Cafaroïde",
    skills: [ skills.artisanat ]
  }
}

// Export races object
export const races = generator("races", dataset([clone, porkman, mantoid, cafaroid], 3))
