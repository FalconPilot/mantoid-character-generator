// Local functions
import { generator, dataset } from '../helpers/generators'

// Local data
import { skills } from './skills'

/*
**  Game classes datasets
*/

// Mathematicien du vide
export const mathematician = {
  key: "mathematician",
  amt: 2,
  data: {
    name: "Mathématicien du vide",
    skills: [ skills.technomagie ]
  }
}

// Chevalier d'or
export const chevalier = {
  key: "chevalier_dor",
  amt: 3,
  data: {
    name:   "Chevalier d'or",
    skills: [ skills.armure(4) ]
  }
}

// Petrolhead
export const petrolhead = {
  key: "petrolhead",
  amt: 3,
  data: {
    name: "Pétrol'head",
    skills: []
  }
}

// Cyborg
export const cyborg = {
  key: "cyborg",
  amt: 2,
  data: {
    name: "Cyborg",
    skills: []
  }
}

// Pretre
export const pretre = {
  key: "pretre_azathoth",
  amt: 2,
  data: {
    name: "Prêtre d'Azathoth",
    skills: []
  }
}

// Classes object
export const classes = generator("classes", dataset([mathematician, chevalier, petrolhead, cyborg, pretre]))
