import React from "react"

const TestFormList = ({words}) => {
  return(
    <div>
      <ul>
        {words.map((res, index) =>  (
          <li key={index}>
            {res}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TestFormList;