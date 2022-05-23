import React, { useEffect, useState } from 'react';
import axios from "axios";


const Dictionary = ({solution}) => {
  const [post, setPost] = useState(null);

  const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${solution}`;
  console.log(baseURL);

  useEffect (()=>{
    axios
      .get(baseURL)
      .then((res)=>{
        setPost(res["data"][0]["meanings"][0]["definitions"][0]["definition"]);
      });
  },[baseURL]);
  
  if (!post) return null;

  return (  
    <div>
      <p>Clue: {post}</p>
    </div>
  );
}
 
export default Dictionary;