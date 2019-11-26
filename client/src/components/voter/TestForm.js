import React, { useState, useEffect } from "react"
import TestFormList from "./TestFormList"

const TestForm = ({testSetWord}) => {
  const [word,setWord] = useState([])

  useEffect(() => {
    console.log(testSetWord)
  },[])

  const handleChange = (e) => {
    setWord(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    testSetWord(word.concat(word))
    console.log("submit test word:", word)
  }

  return (
    <div>
      TestForm
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} name={word} onChange={handleChange}/>
      </form>
      <button onClick={handleSubmit}>
        submit
      </button>
      <TestFormList words={word}/>
    </div>
  )
}

export default TestForm;