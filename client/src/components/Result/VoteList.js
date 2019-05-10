import React, { useEffect, useState } from "react"
import { List, Item } from "semantic-ui-react";

const VoteList = ({address,result}) =>  {

  // const [results, setResults] = useState()

  useEffect(() => {
    console.log(result)
    // createList()
  },[result])

  return(
    // <Item.Group>
    //   {result.map(c => (
    //     <Item>
    //       <Item.Content>
    //         <Item.Meta>
    //           c
    //         </Item.Meta>
    //       </Item.Content>
    //     </Item>

    //   ))}
    // </Item.Group>
    // <List>
    <ul>
      {result.map( (res, index) =>  (
        <li key={index}>
          {res}
        </li>
      ))}
    </ul>
  )
}

export default VoteList;