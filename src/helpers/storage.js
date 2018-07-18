/*
**  Storage helpers
*/

export function store(state) {
  localStorage.setItem("state-mantoid", JSON.stringify(state))
}

export function retrieve() {
  const data = JSON.parse(localStorage.getItem("state-mantoid"))
  return data ? data : (console.warn("Couldn't retrieve state !"), null)
}
