import React,{ useState } from "react"
import { Form, Button } from "semantic-ui-react"

const AddressForm = ({role,setAddress}) => {

  const [inputAddress, setInputAddress ] =  useState("")

  const handleSubmit = (e) =>  {
    e.preventDefault()
    // setVote(vote) // contract.methods
    // setVote(vote)
    setAddress(inputAddress)
    console.log("submit")
  }

  const handleChange = (e) => {
    setInputAddress(e.target.value)
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Set  {role}'s  Address Form</label>
        <input placeholder="address" value={inputAddress} onChange={handleChange}/>
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default AddressForm;