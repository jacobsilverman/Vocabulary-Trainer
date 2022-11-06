import { useEffect, useState } from 'react';
import { getRandomWord } from './Services/Words';
import './App.css'

function App() {
  const [wordMap, setWordMap]: any = useState({});
  const [answers, setAnswers]: any = useState({});

  const [randomizedWords, setRandomizedWords]: any = useState([]);
  const [randomizedDefinitions, setRandomizedDefinitions]: any = useState([]);

  const [selectedWord, setSelectedWord]: any = useState('');
  const [selectedDefinition, setSelectedDefinition]: any = useState('');

  useEffect(() => {
    if (JSON.stringify(wordMap) === '{}') {
      Promise.all([getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord()]).then((values) => {
        const parsedWords = values.reduce((acc, item) => {
          acc[item.word] = item.definition;
          return acc;
        }, {})
        setWordMap(parsedWords);
        randomize(Object.keys(parsedWords), Object.values(parsedWords));
      })
    } else {
      getRandomWord().then((value: any) => {
        setWordMap({...wordMap, [value.word]: value.definition});
        randomize([...randomizedWords, value.word], [...randomizedDefinitions, value.definition]);
      })
    }
  }, [answers]);

  const randomize = (words: string[], defs: string[]): void => {
    const randomlyIterate = (values: String[]): String[] => {
      let result = [];
      while (values.length>0) {
        const randIndex = Math.floor(Math.random()*values.length);
        result.push(values[randIndex]);
        values.splice(randIndex, 1);
      }
      return result;
    }
    setRandomizedWords(randomlyIterate(words));
    setRandomizedDefinitions(randomlyIterate(defs));
  }

  const removeSelected = (word: string, def: string) => {
    const newWords = [...randomizedWords];
    const newDefs = [...randomizedDefinitions];
    newWords.splice(randomizedWords.indexOf(word), 1);
    newDefs.splice(randomizedDefinitions.indexOf(def), 1);
    setRandomizedWords(newWords);
    setRandomizedDefinitions(newDefs);
    setSelectedWord('');
    setSelectedDefinition('');
  }

  const handleWordClick = (event: any): void => {
    const word = event.target.innerHTML;
    setSelectedWord(word);
    if (wordMap[word] === selectedDefinition) {
      removeSelected(word, selectedDefinition);
      setAnswers({...answers, [word]: selectedDefinition});
    }
  }

  const handleDefinitionClick = (event: any): void => {
    const definition = event.target.innerHTML;
    setSelectedDefinition(definition);
    if (wordMap[selectedWord] === definition) {
      removeSelected(selectedWord, definition);
      setAnswers({...answers, [selectedWord]: definition});
    }
  }

  const determineClass = (cur: string, selectedValue: string): string => {
    // if correct matches want to be highlighted green but currently they are being removed
    // if (wordMap[selectedWord] === selectedDefinition && (cur === selectedWord || cur === selectedDefinition)) {
    //   return 'green';
    // }
    return (cur === selectedValue) ? 'pink' : '';
  }

  return (
    <div className="App">
      <div className="Guessing-Section">
        <div>
          {randomizedWords && randomizedWords.map((word: any) => {
            return (
              <div className={determineClass(word, selectedWord)} key={word} onClick={handleWordClick}>{word}</div>
            )
          })}
        </div>
        <div>
          {randomizedDefinitions && randomizedDefinitions.map((definition: any) => {
            return (
            <div className={determineClass(definition, selectedDefinition)} key={definition} onClick={handleDefinitionClick}>{definition}</div>
            )
          })}
        </div>
      </div>

      <div className="Answer-Section">
        {Object.entries(answers).map((item: any) => {
          return (
            <>
              <div className="item">{item[0]}</div>
              <div className="item">{item[1]}</div>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default App
