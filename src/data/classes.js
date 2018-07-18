// Local functions
import { generator, dataset } from '../helpers/generators'

// Local data
import skills from './skills'

/*
**  Game classes datasets
*/

// Mathematicien du vide
const mathematician = {
  key: "mathematician",
  amt: 2,
  data: {
    name: "Mathématicien du vide"
  }
}

// Chevalier d'or
const chevalier = {
  key: "chevalier_dor",
  amt: 3,
  data: {
    name:   "Chevalier d'or",
    skills: [ skills.armure(4) ]
  }
}

// Petrolhead
const petrolhead = {
  key: "petrolhead",
  amt: 3,
  data: {
    name: "Pétrol'head"
  }
}

// Cyborg
const cyborg = {
  key: "cyborg",
  amt: 2,
  data: {
    name: "Cyborg"
  }
}

// Pretre
const pretre = {
  key: "pretre_azathoth",
  amt: 2,
  data: {
    name: "Prêtre d'Azathoth"
  }
}

// Classes object
export const classes = generator("classes", dataset([mathematician, chevalier, petrolhead, cyborg, pretre]))
