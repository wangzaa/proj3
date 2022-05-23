import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import Dictionary from './Dictionary';

const Wordle = ({solution}) => {
  const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  // handleKeyup as dependency
  useEffect(()=>{
    window.addEventListener('keyup', handleKeyup);

  // end game condition 1 and show Modal
    if(isCorrect){
      setTimeout(()=> setShowModal(true),2000);
      window.removeEventListener('keyup', handleKeyup);
    }

   // end game condition 2 and show Modal
    if(turn>5){
      setTimeout(()=> setShowModal(true),2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    //clean-up function
    return () => window.removeEventListener('keyup', handleKeyup);
  },[handleKeyup, isCorrect, turn])

  return ( 
    <>
    {solution}
    <Dictionary solution = {solution}/>
    <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn}/>
    <Keypad usedKeys = {usedKeys}/>
    {showModal && <Modal isCorrect={isCorrect} turn = {turn} solution = {solution}/>}
    </>
   );
}
 
export default Wordle;