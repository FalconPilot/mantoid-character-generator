// React core
import React, { Component } from 'react'

/*
**  Overlay class
*/

class Overlay extends Component {

  // Main render
  render() {
    return <div className="overlay flex-col center-v center-h">
      <div className="flex-col center-v center-h">
        <h4>{this.props.title}</h4>
        <div className="flex-row center-v">
          {this.props.choices.map((choice, i) => <button
            key={`ov-choice-${i}`}
            onClick={choice.func}
            value={choice.value}
          >{choice.label}</button>)}
        </div>
      </div>
    </div>
  }
}

export default Overlay
