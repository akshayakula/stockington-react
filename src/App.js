import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import bull from './Stockingtonlogo.png';
import axios from 'axios';
// import raw from './nyse.txt';
import stocks from 'stock-ticker-symbol';
// import TextField from '@mui/material/TextField';
const API_URL = "http://localhost:5002/stockington-4ffbd/us-central1/sec"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  let [ticker, setTicker] = useState("");
  let [spinner, setSpinner] = useState(false);
  
  let [validation, setValidation] = useState(true);
  let [report, setReport] = useState([]);
  let [notify, setNotify] = useState(false);
  let [number, setNumber] = useState("");


  let fetchAI = (event) => {
    // event.preventDefault()

    let body = {
      ticker
    }

    let headers = {
      "Content-Type": "text/plain"

    }
    console.log(ticker)
    setSpinner(true)
    axios.post(API_URL, ticker, headers)
    .then(res =>{
      console.log('hi');
      console.log(res.data);
      setReport(res.data.split("\n"));
      setSpinner(false)
    })
    .catch(err => {
      console.log('bye')
      console.log(err)
    })
  } 

  let sendNum = () => {

  }

  let validateTicker = (event) => {
    // event.preventDefault()
    if(stocks.lookup(ticker) === null){
      setValidation(false);
    }
    else{
      setValidation(true)
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <br></br>
        <img src={bull} className="img-fluid logo" alt="image"></img>
        <br></br>
        <h1><text className='text-success'></text>ASK <text className='text-warning'>STOCKINGTON</text></h1>
        <h4 className="text-light">Enter a stock ticker to get a <text className='text-success'>summary</text> of the most recent annual <text className='text-success'>finance</text> reports</h4>
        <br/>
          <Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" >
            <Form.Control placeholder="AAPL, MCD, TSLA, ..." onChange={event => {setTicker(event.target.value.toUpperCase());validateTicker(event.target.value.toUpperCase())}}/>
            {!validation ? <Form.Text className='text-danger'>Invalid ticker</Form.Text> : null }
            
          </Form.Group>
          <br></br>
          {!validation ? <div>
            <Button disabled className="mb-3" size="lg" variant="outline-danger" className="mybutton float-right" type="submit" onClick={(event) => {fetchAI(event)} }>
            Submit
          </Button>

          <Button disabled className="mb-3" size="lg" variant="outline-warning" className="mybutton float-right" type="submit">
            Notify Me For The Next Report
            </Button> 
          </div>:
          <div className='notify'><Button className="mb-3" size="lg" variant="outline-success" className="mybutton float-right" type="submit" onClick={(event) => {fetchAI(event)} }>
              Submit
              </Button>
              {notify ? <Button className="mb-3" size="lg" variant="outline-warning" className="mybutton float-right" type="submit" onClick={(event) => setNotify(false)}>
              Submit Number
              </Button> : <Button className="mb-3" size="lg" variant="outline-warning" className="mybutton float-right" type="submit" onClick={(event) => setNotify(true)}>
                Notify Me For The Next Report
              </Button> }

          </div>}
          <br></br>
          {notify ?<Form.Group className="mb-3" className = "input float-left"  controlId="formStockTicker" ><Form.Control placeholder="Enter Your Phone Number Ex. +(123)-456-7893"/></Form.Group>: null}

        <br></br>
        <br></br>
    
        <Stack direction="horizontal" className="justify-content-center" gap={3}>
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
          {spinner ? <Spinner className="loader" animation="grow" variant="light" /> : null }
        </Stack>
        {report.map((value, index) => {
              return <div className="result" key={index}>{value}</div>
            })}
      </header>
      
    </div>
  );
}

export default App;
