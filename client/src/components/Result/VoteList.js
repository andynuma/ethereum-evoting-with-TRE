import React, { useEffect } from "react"

const VoteList = ({result}) =>  {

  useEffect(() => {
    console.log(result)
  },[result])

  return(
    <div>
      <h1>Result</h1>
      <ul>
        {result.map((res, index) =>  (
          <li key={index}>
            {res}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VoteList;