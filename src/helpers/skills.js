// Local data
import { skills } from '../data/skills'

// Local functions
import { exists } from './common'

/*
**  Skills helpers
*/

const sklist = [{
  description: "J'émet un rayon inter-dimensionnel",
  skill: skills.armure(4),
  fuseValue: 4
}, {
  description: "Je perd la raison",
  affect: (obj, hash) => {
    const char = obj.state.characters.filter(c => c.hash === hash)[0]
    if (exists(char)) {
      const newChar = Object.assign(char, {hp: char.hp - 1, hp_max: char.hp_max - 1})
      const index = obj.state.characters.indexOf(char)
      var newArray = obj.state.characters.slice()
      newArray[index] = newChar
      obj.setState({ characters: newArray })
    } else {
      console.warn(`Character "${hash} not found, trying to diminish HP by 1 !"`)
    }
    const val = (exists(obj.state.hp[hash]) ? obj.state.hp[hash] : 0) - 1
    obj.setState({ hp: Object.assign(obj.state.hp, {[hash]: val < 0 ? 0 : 1}) })
  }
}, {
  description: "Je sniffe du Pétrol'magie",
  affect: (obj, hash) => {
    const val = (exists(obj.state.luck[hash]) ? obj.state.luck[hash] : 0) - 1
    obj.setState({ luck: Object.assign(obj.state.luck, {[hash]: val < 0 ? 0 : 1}) })
  }
}, {

}]

// Get quality skill, can fuse with already existing skills
export function getSkills(rawChar, value) {
  const nativeSkills = rawChar.race.skills.concat(rawChar.charClass.skills)
  const item = sklist[value - 1]

  // Character must be altered
  const character = exists(item) && exists(item.affect)
    ? Object.assign(rawChar, { affect: item.affect })
    : rawChar

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
