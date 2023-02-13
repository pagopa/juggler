import './App.css';
import ReactJson from 'react-json-view'
import { useEffect, useState } from 'react';

const App = () => {
  const [requestResponse, setRequestResponse] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8080/api/requestresponse")
      .then(response => response.json())
      .then(data => setRequestResponse(data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <ReactJson
        name = { false }
        src = { requestResponse }
        collapsed = { 2 }
        iconStyle = { 'triangle' }
        enableClipboard = { false }
        displayDataTypes =  { false }
        displayObjectSize = { false }
        theme = { 'ocean' }
      />
    </div>
  )
};

export default App;
