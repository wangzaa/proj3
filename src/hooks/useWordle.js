import {useState} from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});


  const formatGuess = ()=> {
    // take string value and spread letters
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l)=>{
      return {key:l, color: 'grey'}
    })
    // find green letters
    formattedGuess.forEach((l,i)=>{
      if(solutionArray[i]===l.key){
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })
    // find yellow letters, exclude green letters
    formattedGuess.forEach((l,i)=>{
      if(solutionArray.includes(l.key) && l.color !== 'green'){
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    }) 
    return formattedGuess;
  }

// add new guess to guess state
// update isCorrect state if guess is correct
// add one to turn state
// clear out current guess to ''
  const addNewGuess = (formattedGuess) =>{
    if(currentGuess === solution){
      setIsCorrect(true)
    }
    setGuesses((prevGuesses)=>{
      let newGuesses =[...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses;
    })
    setHistory((prevHistory)=>{
      return [...prevHistory, currentGuess]  
    })
    setTurn((prevTurn)=>{
      return prevTurn +1
    })
    setUsedKeys((prevUsedKeys)=>{
      let newKeys = {...prevUsedKeys}
      
      formattedGuess.forEach((l)=>{
        const currentColor = newKeys[l.key]

        if (l.color === 'green'){
          newKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor !== 'green'){
          newKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey'&& currentColor !== 'green' && currentColor !== 'yellow'){
          newKeys[l.key] = 'grey'
          return
        }
      })
      return newKeys;
    })
    setCurrentGuess('');
  }

   // handle keyup event & track current guess
   // if user keys in Enter, add the new guess
  const handleKeyup = ({key}) =>{
    if(key==='Enter'){
      // turns >5
      if(turn>5){
        return
      }
      // no duplicate word
      if(history.includes(currentGuess)){
        return
      }
      // word length is 5 chars
      if(currentGuess.length !== 5){
        return
      }
      const formatted = formatGuess();
        addNewGuess(formatted);
    }
    if (key==='Backspace'){
      setCurrentGuess(prev=>prev.slice(0,-1))
        return
    } 
    if(/^[A-Za-z]$/.test(key)) {
      if(currentGuess.length <5){
        setCurrentGuess(prev=> prev + key)
          return 
        }
      }
    }
  
    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup};
}
 
export default useWordle;