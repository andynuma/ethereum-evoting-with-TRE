import React from "react"
import { Link } from "react-router-dom"
import { Segment, Header } from "semantic-ui-react"

const Home = () => {
  return(
    <Segment.Group>
      <Header>
      Home
      </Header>
      <Segment>
        <Link to={"/"}>Go to Vote Page</Link>
      </Segment>
      <Segment>
        <Link to={"/organizer"}>Go to Organizer Page</Link>
      </Segment>
    </Segment.Group>
  )
}

export default Home;