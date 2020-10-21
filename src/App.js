import React, { Component } from "react";
import "./App.css";
import Hangman from "./Hangman";
import HangmanColt from './HangmanColt';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HangmanColt />
      </div>
    );
  }
}

export default App;
