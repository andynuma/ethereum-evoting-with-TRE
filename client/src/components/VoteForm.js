import React,{ useState,useEffect } from "react"
import { Form, Button } from "semantic-ui-react"

const VoteForm = ({address,contract,setVote}) => {

  const [vote, setBallot] = useState("")

  useEffect(() => {
    console.log(address,contract)
  },[address,contract])

  const handleSubmit = (e) =>  {
    e.preventDefault()
    // setVote(vote) // contract.methods
    console.log("submit")
  }

  const handleChange = (e) => {
    setBallot(e.target.value)
  }

  return(
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>VoteForm</label>
          <input placeholder="name" value={vote} onChange={handleChange}/>
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
  )
}

export default VoteForm;