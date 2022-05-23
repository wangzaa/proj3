import React, { useEffect, useState } from 'react';
import axios from "axios";

const Keypad = ({usedKeys}) => {
  const [letters, setletters] = useState(null)
  
  
  useEffect(()=>{
    fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/wordle-app-ymhpy/endpoint/get_letters')
    .then(res => res.json())
    .then (json=>{
      setletters(json)
  })
},[])

  return ( 
    <div className="keypad">
      {letters && letters.map((l)=>{
        const color = usedKeys[l.key]
        return(
          <div key = {l.key} className={color}>{l.key}</div>
        )
      })}
    </div>
   );
}
 
export default Keypad;