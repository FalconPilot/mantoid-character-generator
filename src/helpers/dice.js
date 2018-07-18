// Local functions
import { exists } from './common'

/*
**  Dice-throwing helpers
*/

// Throw dices
export function dice(amount, faces, add = false) {
  const numbers = new Array(amount)
    .fill(0)
    .map(n => Math.floor(Math.random() * faces) + 1)
  return add === true ? numbers.reduce((total, num) => (total + num), 0) : numbers
}

// Throw a D12
export function d12(obj, hash) {
  const num = dice(1, 12, true)

  // Update state if value is 1 or 12
  if (num === 1 || num === 12) {
    const key = num === 1 ? "ones" : "luck"
    const val = exists(obj.state[key][hash]) ? obj.state[key][hash] : 0
    obj.setState({ [key]: Object.assign(obj.state[key], { [hash]: val + 1 }) })
  }

  // Return dice result
  return num
}
