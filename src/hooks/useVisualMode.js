import {useState} from 'react';

const useVisualMode = (initial) => {
  // console.log('inside useVisualMode')
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  function transition(newMode, replace = false) {
    const newHistory = [...history]
    if(replace) {
      newHistory.pop();
    }
    newHistory.push(newMode)
    setMode(newMode);
    setHistory(newHistory);
  };
  function back() {
    const newHistory = [...history]
    if(newHistory.length > 1) {
      newHistory.pop()
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
    // console.log('history: ', history); 
  };
  return { 
    mode: mode,
    transition: transition,
    back: back
   };
}

export default useVisualMode;