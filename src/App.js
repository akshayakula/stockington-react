import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';

function App() {
  
  let num = 5;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField
          id="outlined-password-input"
          label="Enter a ticker symbol"
          color="primary"
          focused
        />
        <text>{num}</text>
      </header>
    </div>
  );
}

export default App;
