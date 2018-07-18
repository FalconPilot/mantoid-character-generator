// Local data
import { skills }     from '../data/skills'
import { petrolhead } from '../data/classes'

// Local functions
import { exists }           from './common'
import { store }            from './storage'

/*
**  Skills helpers
*/

const sklist = [{
  description: "J'émet un rayon inter-dimensionnel",
  skill: skills.armure(4),
  fuseValue: 4
}, {
  description: "Je perd la raison (-1 PV)",
  affect: (obj, hash) => {
    const char = obj.state.characters.filter(c => c.hash === hash)[0]
    if (exists(char)) {
      const newChar = Object.assign(char, {hp: char.hp - 1, hp_max: char.hp_max - 1})
      const index = obj.state.characters.indexOf(char)
      var newArray = obj.state.characters.slice()
      newArray[index] = newChar
      obj.setState({ characters: newArray }, () => { store(obj.state) })
    } else {
      console.warn(`Character "${hash} not found, trying to diminish HP by 1 !"`)
    }
  }
}, {
  description: "Je sniffe du Pétrol'magie",
  affect: (obj, hash) => {
    const val = (exists(obj.state.luck[hash]) ? obj.state.luck[hash] : 0) - 1
    obj.setState({ luck: Object.assign(obj.state.luck, {[hash]: val < 0 ? 0 : 1}) }, () => { store(obj.state) })
  }
}, {
  description: "Je torture mes ennemis",
  skill: skills.brutal
}, {
  description: "Je baigne dans le métal",
  skill: skills.resistance(["Tout"])
}, {
  description: "Je viens du futur",
  affect: (obj, hash) => {
    const val = (exists(obj.state.luck[hash]) ? obj.state.luck[hash] : 0) + 1
    obj.setState({ luck: Object.assign(obj.state.luck, {[hash]: val < 0 ? 0 : 1}) })
  }
}, {
  description: "Je vénère les dieux Zoomorphes",
  affect: (obj, hash) => {
    const val = (exists(obj.state.luck[hash]) ? obj.state.luck[hash] : 0) + 1
    obj.setState({ luck: Object.assign(obj.state.luck, {[hash]: val < 0 ? 0 : 1}) })
  }
}, {
  description: "Je dresse des Zazamons"
}, {
  description: "Je collectionne les machines à écrire"
}, {
  description: "Je me prépare à l'apocalypse"
}, {
  description : "J'erre sur la mer du chaos"
}, {
  description: "J'ai fui l'empire des mille-pattes humains"
}, {
  description: "Je parle à Azathoth"
}, {
  description: "J'admire les Voyvodes"
}, {
  description: "Je suis un bâtard d'Androgyne-Roi",
  skill: skills.riche
}, {
  description: "J'adore les piercings, tatouages et crêtes de punk"
}, {
  description: "Je tuerai mes amis à la fin de cette histoire, sans faire exprès",
  affect: (obj, hash) => {
    const val = (exists(obj.state.luck[hash]) ? obj.state.luck[hash] : 0) - 1
    obj.setState({ luck: Object.assign(obj.state.luck, {[hash]: val < 0 ? 0 : 1}) })
  }
}, {
  description: "Je changerai de sexe chaque fois que je fais 12"
}, {
  description: "J'ai fui les geôles royales"
}, {
  description: "J'ai fais des études pour créer des mille-pattes humains améliorés"
}, {
  description: "Je travaille dans une usine de viande d'Hommes-Porcs",
  skill: skills.resistance(["Maladies"]),
  fuseValue: ["Maladies"]
}, {
  description: "J'ai fui une tribu de Sumériens"
}, {
  description: "Je suis un ancien esclave du Crabe aux Pinces d'or",
  morphChar: (character) => {
    return Object.assign(character, {charClass: petrolhead.data})
  }
}]

// Get quality skill, can fuse with already existing skills
export function getSkills(rawChar, value) {
  const item = sklist[value - 1]

  const midChar = exists(item) && exists(item.morphChar)
    ? item.morphChar(rawChar)
    : rawChar

  const nativeSkills = midChar.race.skills.concat(rawChar.charClass.skills)

  // Character must be altered
  const character = exists(item) && exists(item.affect)
    ? Object.assign(midChar, { affect: item.affect })
    : midChar

  if (exists(item)
    && exists(item.skill)
    && exists(item.skill.key)
    && nativeSkills.filter(s => exists(s.key) && s.key === item.skill.key).length > 0
  ) {

  // Skill already obtained by character, fuse them
    return Object.assign(character, {
      special: item.description,
      skills: nativeSkills
        .filter(s => s.key !== item.skill.key)
        .concat([item.skill.fuse(item.fuseValue)])
    })

  // Skill not present in character
  } else if (exists(item) && exists(item.skill)) {
    return Object.assign(character, {
      special: item.description,
      skills: nativeSkills.concat([item.skill])
    })

  // No skill, but item exist
  } else if (exists(item)) {
    return Object.assign(character, {
      special: item.description
    })

  // Fallback, no item found
  } else {
    console.warn(`Warning : no item found for quality for index ${value - 1} !`)
    return character
  }
}
