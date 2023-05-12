import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Histogram from './Histogram';
import {useState} from 'react'
import { CSVLink } from 'react-csv';

function App() {
  const [data ,setData] = useState([])
  const [frequency, setFrequency] = useState([])
  const [error, setError] = useState(null)
  const [histogramData, setHistogramData] = useState([]);

  const fetchData = async () => {
    try{
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const data = await response.text();
      console.log(data)
      setData(data)
      if(data.length>0){
        countFrequency(data)
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const countFrequency = (data)=>{
    //remove all special characters like . , ? ! etc
    const words = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
    //make all words lowercase
    words.forEach((word,index)=>{
      words[index] = word.toLowerCase()
    })
    const frequency = {}
    words.forEach((word)=>{
      if(frequency[word]){
        frequency[word] +=1
      }else{
        frequency[word] = 1
      }
    })
    console.log(frequency)
    const sortableArray = []
    for (const word in frequency) {
      sortableArray.push([word, frequency[word]]);
    }
    sortableArray.sort(function(a, b) {
      return b[1] - a[1];
    });
    const topTwenty = sortableArray.slice(0,20)
    console.log("toptwenty "+ topTwenty)
    setFrequency(topTwenty)
  }

  const handleClick =()=>{
    if(text === 'Back'){
      toggle()
      return
    }
    else{
      console.log('click')
      fetchData()
      toggle()
    }
  }
  const [text, setText] = useState(' Submit ')
  const toggle = () => {
    if(text === 'Back'){
      setText('Submit')
    }else{
      setText('Back')
    }

    // setText(data ? 'Back' : 'Submit')


    if( text === 'Back'){
      setFrequency([])
      setData([])

    }
  }


  return (
    <div className="App">
      {/* make a button */}
      <button type="button" onClick={handleClick} className="btn btn-primary"> {text} </button>
      {error ? <p>{error}</p> : frequency.length > 0 && (
        <>
          <h2>Top 20 Most Occurring Words</h2>
          <div className="histogram">
            <Histogram frequency={frequency}/> 
          </div>
        </>
      )}
    </div>
  );
}

export default App;
