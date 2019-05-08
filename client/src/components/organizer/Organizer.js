import React from "react"
import { Segment, Header, Message } from "semantic-ui-react"
import AddressForm from "../AddressForm"
import { Link } from "react-router-dom"
import "../../App.css"


const Organizer = () =>  {
  return(
    <Segment.Group className="container">
      <Header>
        Organizer Page
      </Header>
      <Message>
        <Message.Header>
          Are you Organizer ?
        </Message.Header>
        <p>
          If you aren't Organizer, Go to <Link to={"/"}>Voter Page</Link>.
          <br/>
          You cannot do anything in this page because your address is not Organizer Address.
        </p>
      </Message>
      <Segment>
        <AddressForm role="Voter"/>
      </Segment>
      <Segment>
        <AddressForm role="Inspector"/>
      </Segment>
    </Segment.Group>
  )
}

export default Organizer;