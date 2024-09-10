import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [gameNumber, setGameNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');
  const [btmMsg, setBtmMsg] = useState('');
  const [guessesText, setGuessesText] = useState(['1:','2:','3:','4:','5:','6:','7:','8:','9:','10:','11:','12:']);
  const [guess, setGuess] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(0); // 0 = in progress, 1 = done, 2 = loss
  const WON_MSG = 'You won!';

  function handleGuessChange(e) {
    const value = e.target.value.replace(/\D/g, "");
    setGuess(value);
  }

  function newGame() {
    var newCode = generateCode();
    setCode(newCode);
    setCount(0);
    setStatus(0);
    setGuessesText(['1:','2:','3:','4:','5:','6:','7:','8:','9:','10:','11:','12:']);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      makeGuess();
    }
  }

  function generateCode() {
    let newCode = '';
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 4; i += 1) {
      let digit = Math.floor(Math.random() * (9 - i));
      newCode += numbers[digit];
      numbers.splice(digit, 1);
    }
    console.log(newCode);
    return newCode;
  }

  function getCorrectPoints(attempt, realcode) {
    let correct = 0;
    for (let i = 0; i < attempt.length; i += 1) {
      if (attempt.charAt(i) === realcode.charAt(i)) {
        correct += 1;
      }
    }
    return correct;
  }

  function getWrongPoints(attempt, realcode) {
    let wrong = 0;
    for (let i = 0; i < attempt.length; i += 1) {
      if ((attempt.charAt(i) !== realcode.charAt(i)) && (realcode.indexOf(attempt.charAt(i)) !== -1)) {
        wrong += 1;
      }
    }
    return wrong;
  }

  function stringifyGuess(attempt, realcode) {
    let stringOfGuess = ' ' + attempt + ' : ';
    if (attempt === realcode) {
      stringOfGuess += WON_MSG;
    } else {
      stringOfGuess += getCorrectPoints(attempt, realcode) + ' correct, ' + getWrongPoints(attempt, realcode) + ' wrong';
    }
    return stringOfGuess;
  };

  function makeGuess() {
    if (guess.length != 4) {
      setMsg('Invalid guess.')
      return;
    }
    var currCode = code;
    if (!currCode) {
      currCode = generateCode();
      setCode(currCode);
      setStatus(0);
    }
    var currGuess = stringifyGuess(guess, currCode);
    guessesText[count] += currGuess;
    if (guess == code) {
      setStatus(1);
    } else {
      if (count == 11) {
        setStatus(2);
        setBtmMsg('The code was ' + code + '.');
      } else {
        setCount(count + 1);
        resetTexts();
      }
    }
  }

  function resetTexts() {
    setGuess('');
    setMsg('');
    setBtmMsg('');
  }

  function showCode() {
    if (!code) {
      setBtmMsg('A game has not been started yet.');
    } else {
      setBtmMsg('The code is ' + code + '.');
    }
  }

  return (
    <>
      <div className="top">
        <span className="top__title"><strong>MASTER</strong>MIND</span>
        <span className="top__author">View on <a href="https://github.com/dimitriwalters/mastermind">GitHub</a></span>
      </div>
      <div className="game" ng-controller="MainCtrl">
        <div className="guessing-area">
          <div className="guessing-area__form">
            <div><span>Guess:</span></div>
            <input className="guessing-area__input" type="text" maxlength="4" disabled={status != 0} ng-model="guess" ng-keyup="validateNumber()" ng-disabled="done" value={guess} onChange={handleGuessChange} onKeyUp={handleKeyDown} />
            <button className="guessing-area__submit" onClick={makeGuess} disabled={status != 0}>Make a guess</button>
            <span className="guessing-area__error">{ msg }</span>
          </div>
        </div>
        <div className="guesses-area">
          <span>Guesses:</span>
          {guessesText.map(text => (
            <div>#{text}</div>
          ))}
        </div>
        <div className="button-area">
          <button onClick={showCode} disabled={status != 0}>Show code</button>
          <button onClick={newGame}>New game</button>
        </div>
        <p className="game__bottom-message">{ btmMsg }</p>
      </div>
      <div className="instructions">
        <p>Insturctions: Guess a 4-digit number with unique digits 1 - 9. You are told how many digits match the code (correct), and how many are in the code but wrong position (wrong).</p>
      </div>
    </>
  )
}

export default App
