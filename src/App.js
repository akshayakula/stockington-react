import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import bull from './Stockingtonlogo.png'
import raw from './nyse.txt';
// import TextField from '@mui/material/TextField';

function App() {
  let arr = []
  let readFile = () => {
  
    fetch(raw)
    .then(r => r.text())
    .then(text => {
      arr = text.split('\n')
      console.log(arr);
    });

  } 
  
  
  //   const lineReader = require('line-reader');
  //   const f = require('fs');
  //   lineReader.eachLine('./nyse.txt',(line,last)=>{
  //   console.log(line);
  //   })
  //   // if(error){ throw error; }
  //   // const parsedData = [];
  //   // for(let row of textContent.split("\n")){
  //   //   const rowItems = row.split(",");
      
  //   //   set_list.add(rowItems[0].toString());
  //   // }

  // };
  // 
  readFile();

  let validateTicker = (query) => {
    console.log(query);
    if (arr.includes(query))
    {
      console.log("yay");
      setValidation(true);
      setSpinner(true);
    }
    else 
    {
      setValidation(false);
      setSpinner(false);
    }
  }

  let [ticker, setTicker] = useState("");
  let [spinner, setSpinner] = useState(false);
  
  let [validation, setValidation] = useState(true);
  let [query, setQuery] = useState("")

 
  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <br></br>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={bull} className="img-fluid logo" alt="image"></img>
        <br></br>
        <h1><text className='text-success'></text>ASK <text className='text-warning'>STOCKINGTON</text></h1>
        <h4 className="text-light">Enter a stock ticker to get a <text className='text-success'>summary</text> of the most recent annual <text className='text-success'>finance</text> reports</h4>
        <br/>
        {/* <Stack direction="horizontal" gap={3}> */}
          <Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" >
            <Form.Control type="email" placeholder="AAPL, MCD, TSLA, ..." onChange={event => setTicker(event.target.value.toUpperCase())} />
            {!validation ? <Form.Text>Unacceptable ticker</Form.Text> : null }
            
          </Form.Group>
          <br></br>
          <Button className="mb-3" size="lg" variant="outline-success" className="mybutton float-right" type="submit" onClick={() => {validateTicker(ticker)} }>
            Submit
          </Button>
        {/* </Stack> */}
        <br></br>
        <br></br>
    
        <Stack direction="horizontal" className="justify-content-center" gap={3}>
          {spinner ? <Spinner className="mb-3 loader" className="ratio ratio-1x1" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="mb-3 loader" className="ratio ratio-1x1" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="mb-3 loader" className="ratio ratio-1x1" animation="grow" variant="light" /> : null }
        </Stack>
        
      </header>
      
    </div>
  );
}

export default App;
