import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
const shortid = require('shortid');
const randomWords = require('random-words');



class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    maxGuesses: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    //this.state = { nWrong: 0, guessed: new Set(), answer: "apple" };
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWords() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      
      <button 
        key={shortid.generate()}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr} 

      </button>


    ));

  }

  restart(){

    //we just change the state to zero on all props
    this.generateButtons();

      this.setState(lastState => ({
      answer: randomWords(),
      nWrong: 0,
      guessed: new Set()

      
    
    }));
  }

  handleClick(){
    this.restart();
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong] } alt={this.state.nWrong + " wrong guesses"} />
        <h3>Numbers wrong: {this.state.nWrong}  </h3>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.state.nWrong === this.props.maxGuesses  
        ? "GAME OVER. Correct answer was: " + this.state.answer 
        : <p className='Hangman-btns'>{this.generateButtons()}</p>}

        {this.state.nWrong === this.props.maxGuesses 
        ? <button id="reset" onClick={this.handleClick}> Restart</button>
      : ""}

        
      </div>
    );
  }
}

export default Hangman;