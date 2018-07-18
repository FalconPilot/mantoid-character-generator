// React core
import React, { Component } from 'react'

// Local functions
import { exists }     from '../helpers/common'
import { d12 }        from '../helpers/dice'
import { races }      from '../data/races'
import { classes }    from '../data/classes'

/*
**  Main App component
*/

class App extends Component {

  // Initial blank state
  initialState = {
    characters: [],
    luck: {},
    ones: {}
  }

  // Reset
  reset() { this.setState(this.initialState) }

  // Class constructor
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  // Main render
  render() {
    const noGen = this.state.characters.length >= 3

    // Return viewport
    return <div className="flex-col center-v center-h">
      <header>
        <h1>Générateur de personnage pour Mantoid Universe</h1>
      </header>
      <main>
        <button onClick={this.genChar} disabled={noGen}>Générer</button>
        {noGen && <p className="notice">Pas plus de 3 personnages par niveau !</p>}
        <div className="flex-col center-v center-h">
          {this.state.characters.map(this.renderCharacter)}
        </div>
      </main>
    </div>
  }

  // Generate character
  genChar = () => {

    // Generate hash for character
    const hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)

    const hp = d12(this, hash)

    // Character object
    const character = {
      hash:       hash,
      race:       races[d12(this, hash) - 1],
      charClass:  classes[d12(this, hash) - 1],
      name:       "placeholder",
      hp:         hp,
      hp_max:     hp
    }

    this.setState({ characters: this.state.characters.concat([character]) })
  }

  // Render character
  renderCharacter = (data) => {
    return <div key={`char-${data.hash}`} className="character-wrapper">
      <h3>{data.name}</h3>
      {this.renderLine("PV", <div className="flex-row center-v max-num">
        <input
          type="number"
          value={data.hp}
          data-hash={data.hash}
          data-max={data.hp_max}
          onChange={this.updateHP}
        />
        <p>{`/${data.hp_max}`}</p>
      </div>)}
      <div className="char-line">
        {`Je suis un(e) ${data.race.name}`}
      </div>
    </div>
  }

  // Render line
  renderLine = (label, value) => {
    return <div className="flex-row center-v char-line">
      <label>{label}</label>
      <div>{value}</div>
    </div>
  }

  // Update HP
  updateHP = (event) => {
    const hash = event.currentTarget.dataset.hash
    const thp = event.currentTarget.value
    const max = parseInt(event.currentTarget.dataset.max, 10)
    const hp = parseInt(thp, 10) >= max ? max : thp
    const char = this.state.characters.filter(c => c.hash === hash)[0]

    // Update state or send warning
    if (exists(char)) {
      const newChar = Object.assign(char, {hp: hp})
      const index = this.state.characters.indexOf(char)
      var newArray = this.state.characters.slice()
      newArray[index] = newChar
      this.setState({ characters: newArray })
    } else {
      console.warn(`Character "${hash}" does not exist (HP updating)`)
    }
  }
}

export default App
