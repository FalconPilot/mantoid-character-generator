// React core
import React, { Component } from 'react'

// Local components
import Overlay from './Overlay'

// Local functions
import { exists }           from '../helpers/common'
import { d12 }              from '../helpers/dice'
import { getSkills }        from '../helpers/skills'
import { store, retrieve }  from '../helpers/storage'

// Local data
import { races }              from '../data/races'
import { classes }            from '../data/classes'
import { prefixes, suffixes } from '../data/names'
import { motivations }        from '../data/motivations'

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
    const data = retrieve()
    this.state = Object.assign((exists(data) ? data : this.initialState), {
      overlay: null,
    })
  }

  // Main render
  render() {
    const max = 4
    const noGen = this.state.characters.length >= max

    // Return viewport
    return <div className="flex-col center-v center-h">
      <header>
        <h1>Mantoid Generator</h1>
      </header>
      {this.state.overlay && <Overlay {...this.state.overlay}/>}
      <main className="flex-col center-v center-h">
        <button onClick={this.genChar} disabled={noGen}>Générer</button>
        {noGen && <p className="notice">Pas plus de <strong>{max}</strong> personnages !</p>}
        <div className="flex-row center-h flex-wrap">
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
      name:       prefixes[d12(this, hash) - 1] + suffixes[d12(this, hash) - 1],
      race:       races[d12(this, hash) - 1],
      charClass:  classes[d12(this, hash) - 1],
      motivation: motivations[d12(this, hash) - 1],
      hp:         hp,
      hp_max:     hp,
      skills:     [],
      level:      0
    }

    const finalChar = getSkills(character, (d12(this, hash) + d12(this, hash)))

    this.setState({ characters: this.state.characters.concat([finalChar])}, () => {
      store(this.state)
      finalChar.skills.forEach(s => {
        if (exists(s.affect)) { s.affect(this, hash) }
      })
    })
  }

  // Render character
  renderCharacter = (data) => {

    // Set constant
    const ones = this.state.ones[data.hash] || 0
    const luck = this.state.luck[data.hash] || 0

    // Render character
    return <div key={`char-${data.hash}`} className="character-wrapper">
      <button
        className="kill-character"
        onClick={this.askDelete}
        data-char-name={data.name}
        value={data.hash}
      >Supprimer</button>
      <div className="flex-row center-v char-title">
        <h3>{data.name}</h3>
        <p className="flex-row center-v">
          Niveau {data.level}
          {data.level === 0 && <button
            data-hash={data.hash}
            className="upgrade-level"
            onClick={this.upgradeLevel}
          >+</button>}
        </p>
      </div>
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
      {this.renderLine("Chance", <div className="flex-row center-v num">
        <input
          type="number"
          value={luck}
          data-hash={data.hash}
          onChange={this.updateLuck}
        />
      </div>)}
      {ones > 0 && <div className="char-line bad">Je vais devoir lancer <strong>{ones}D100</strong></div>}
      <div className="char-line">{`Je suis un(e) ${data.race.name}`}</div>
      <div className="char-line">{`Je suis un(e) ${data.charClass.name}`}</div>
      {data.special && <div className="char-line">{data.special}</div>}
      <textarea className="char-motivation" value={`« ${data.motivation} »`} readOnly={true}/>
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

  // Update luck
  updateLuck = (event) => {
    const hash = event.currentTarget.dataset.hash
    const luck = parseInt(event.currentTarget.value, 10)
    this.setState({ luck: Object.assign(this.state.luck, {[hash]: luck < 0 ? 0 : luck}) })
  }

  // Change name
  changeName = (event) => {
    const hash = event.currentTarget.dataset.hash
    const name = event.currentTarget.value
    const char = this.state.characters.filter(c => c.hash === hash)[0]

    // Update state or send warning
    if (exists(char)) {
      const newChar = Object.assign(char, {name: name})
      const index = this.state.characters.indexOf(char)
      var newArray = this.state.characters.slice()
      newArray[index] = newChar
      this.setState({ characters: newArray })
    } else {
      console.warn(`Character "${hash}" does not exist (Name updating)`)
    }
  }

  // Upgrade to level 1
  upgradeLevel = (event) => {
    const hash = event.currentTarget.dataset.hash
    const char = this.state.characters.filter(c => c.hash === hash)[0]

    // Update state or send warning
    if (exists(char)) {
      const newMaxHP = d12(this, hash) + d12(this, hash)
      const newChar = Object.assign(char, {
        level: 1,
        hp_max: newMaxHP,
        hp:     newMaxHP
      })
      const index = this.state.characters.indexOf(char)
      var newArray = this.state.characters.slice()
      newArray[index] = newChar
      this.setState({ characters: newArray }, () => { store(this.state) })
    } else {
      console.warn(`Character "${hash}" does not exist (Level upgrading)`)
    }
  }

  // Ask to delete
  askDelete = (event) => {
    this.setState({
      overlay: {
        title: `Êtes-vous sûr(e) de vouloir supprimer ce personnage : "${event.currentTarget.dataset.charName}" ?`,
        choices: [{
          label: "Oui",
          func: this.deleteCharacter,
          value: event.currentTarget.value
        }, {
          label: "Non",
          func: this.goBack
        }]
      }
    })
  }

  // Delete character from list
  deleteCharacter = (event) => {
    const hash = event.currentTarget.value
    const char = this.state.characters.filter(c => c.hash === hash)[0]
    if (exists(char)) {
      this.setState({ characters: this.state.characters.filter(c => c.hash !== hash) }, () => {
        store(this.state)
        this.goBack()
      })
    } else {
      console.warn(`Character "${hash}" does not exist (Delete operation attempt)`)
      this.goBack()
    }
  }

  // Go back from overlay
  goBack = () => {
    this.setState({ overlay: null })
  }
}

export default App
