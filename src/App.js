import {useEffect, useState} from 'react';
import Wordle from './components/Wordle';
import axios from "axios";

const App = () => {
  const [solution, setSolution] = useState(null);

  useEffect(()=>{
    fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/wordle-app-ymhpy/endpoint/get_solutions')
    .then(res => res.json())
    .then (json=>{
      // random int between 0 & 12971
      const randomSolution = json[Math.floor(Math.random()*json.length)]
      setSolution(randomSolution)
    })
  },[setSolution])

  return ( 
    <div className="app">
      <h1>W[]RDLE</h1>
      {solution && <Wordle solution = {solution}/> }
    </div>
   );
}
 
export default App;
