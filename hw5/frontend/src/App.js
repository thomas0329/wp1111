import {useState} from 'react'
import './App.css';
import { guess, startGame, restart} from './axios'

function App() {

  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');   // the number guessed
  const [status, setStatus] = useState('');

  const handleGuess = async () => {
    const response = await guess(number);

    if (response === 'Equal')
      setHasWon(true);
    else {
      setStatus(response);
      setNumber('');
    }
  }
  
  const startMenu =
  <div>
    <button onClick
      // someFunctionToBackend; and setHasStarted
      = {async () => {
        await startGame();  // 透過 axios 通知 server 去產生一個新的猜謎數字
        setHasStarted(true);
      }}
    > start game </button>
  </div>

  const gameMode = 
  <>
    <p>Guess a number between 1 to 100</p>
    <input  // Get the value from input
      onChange={(e) => setNumber(e.target.value)}
      value={number}
    ></input>
    <button  // Send number to backend
      onClick={handleGuess}
      disabled={!number}
    >guess!</button>
    <p>{status}</p>
  </>

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button // handle restart for backend and frontend
        onClick
        = {async () => {  // is async needed?
            await restart();  // 透過 axios 通知 server 去重新產生一個新的猜謎數字
            setHasWon(false); // “guess” mode
            setNumber('');
            setStatus('');
          }}
      >restart</button>
    </>
  )

  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
 
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
