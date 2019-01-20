import React, { Component } from 'react';
import {connect} from 'react-redux';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import {getSecretWord} from './actions';
import './App.scss';
import Input from './components/Input';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

export default connect(state => {
  const {success, secretWord, guessedWords} = state;
  return {
    success,
    secretWord,
    guessedWords
  }
}, {
  getSecretWord
})(App);
