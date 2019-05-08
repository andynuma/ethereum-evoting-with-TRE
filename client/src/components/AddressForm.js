import React,{ useState } from "react"
import { Form, Button } from "semantic-ui-react"

const AddressForm = ({contract, address,role}) => {

  const [inputAddress, setAddress ] =  useState("")

  const handleSubmit = (e) =>  {
    e.preventDefault()
    // setVote(vote) // contract.methods
    // setVote(vote)
    console.log("submit")
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Set  {role}  Address Form</label>
        <input placeholder="address" value={inputAddress} onChange={handleChange}/>
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default AddressForm;