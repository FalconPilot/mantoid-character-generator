/*
**  Helper functions for data generators
*/

// Create generator from dataset
export function generator(key, dataset) {
  const occurences = Object.values(dataset)
    .reduce((acc, obj) => (acc.concat(obj.occurences)), [])

  // If data hasn't been validated, return null and warn in console
  if (generatorValidity(occurences) === false) {
    console.warn(`Error validating dataset "${key}" !`)
    return null
  }

  // Return proper dataset
  return Object.values(dataset).sort((a, b) => {
    return a.occurences.slice(-1)[0] <= b.occurences.slice(-1)[0] ? -1 : 1
  }).reduce((acc, obj) => {
    return acc.concat(obj.occurences.map(_x => obj.data))
  }, [])
}

// Ensure generator validity
function generatorValidity(arr) {
  return arr.length === arr.filter((x, i, a) => {
    return arr.indexOf(x) === i
      && x >= 1
      && x <= arr.length
  }).length
}

// Generate dataset from items
export function dataset(items) {
  return items.reduce((acc, obj) => {
    const offset = Object.values(acc).reduce((total, x) => (total + x.occurences.length), 0)
    return Object.assign(acc, {[obj.key]: {
      data: obj.data,
      occurences: [...Array(obj.amt).keys()].map(x => (x + offset + 1))
    }})
  }, {})
}
