import React,{ useState,useEffect } from "react"
import { Form, Button,Message } from "semantic-ui-react"

const VoteForm = ({address,contract,setVote}) => {

  const [vote, setBallot] = useState("")

  useEffect(() => {
    console.log(address,contract)
    console.log(contract.methods)
  },[address,contract])

  const handleSubmit = (e) =>  {
    e.preventDefault()
    setVote(vote)
    console.log("submit : ", vote)
  }

  const handleChange = (e) => {
    setBallot(e.target.value)
  }

  return(
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>VoteForm</label>
            <input placeholder="candicate name" value={vote} onChange={handleChange}/>
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
    </div>
  )
}

export default VoteForm;