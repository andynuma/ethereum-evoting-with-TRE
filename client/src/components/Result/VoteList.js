import React, { useEffect } from "react"
import { Segment } from "semantic-ui-react"

const VoteList = ({result}) =>  {

  useEffect(() => {
    console.log(result)
  },[result])

  return(
    <div>
      <ul>
        {result.map((res, index) =>  (
          <Segment key={index}>
            {res}
          </Segment>
        ))}
      </ul>
    </div>
  )
}

export default VoteList;