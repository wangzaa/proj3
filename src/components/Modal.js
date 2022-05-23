import React from 'react';

const Modal = ({isCorrect, turn, solution}) => {

  const refreshPage = ()=>{
     window.location.reload();
  }

  return ( 
    <div className="modal">
      {isCorrect && (
        <div>
          <h2>You Win!</h2>
          <p>You found the solution in {turn} turn(s)</p>
          <button onClick={refreshPage}>Play Again</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2>You ran out of turns!</h2>
          <p>The solution is:</p>
          <p className="solution">{solution}</p>
          <button onClick={refreshPage}>Play Again</button>
        </div>
      )}
    </div>
   );
}
 
export default Modal;