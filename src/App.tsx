import { useEffect, useState } from 'react';

import { getRandomWord } from './Services/Words';
import './App.css'

function App() {

  const [randomWord, setRandomWord] : any[] = useState([]);

  useEffect(() => {
    Promise.all([getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord()]).then((values) => {
      console.log(values);
      setRandomWord(values);
    })
  }, [])

  const randomlyIterate = () => {
    let result = [];
    let temp = [...randomWord];
    while (temp.length>0) {
      const randIndex = Math.floor(Math.random()*temp.length);
      result.push(temp[randIndex].word);
      temp.splice(randIndex, 1);
    }
    return result;
  }

  return (
    <div className="App">
      <div>{randomlyIterate().map((item : any) => <div key={item.word}><button key={item.word+"button"}>{item}</button></div>)}</div>
      <div>{randomWord.map((item : any) => <div key={item.word+"def"}>{item.definition}</div>)}</div>
    </div>
  )
}

export default App
