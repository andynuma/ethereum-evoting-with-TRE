import React,{ useContext, useEffect, useState } from "react"
import web3  from '../../web3/provider'
import VoteForm from "./VoteForm"
// import ResultView from "./components/ResultView"
import AddressViewer from "../AddressViewer"
import { Segment, Header, Button, Message } from "semantic-ui-react"
import {Store} from "../../reducers/store"
import GetEndSign from "../GetEndSign";
import TestForm from "./TestForm"

const Voter = (props) => {
  const [vote, showVote] = useState("")
  const [account, setAccount] = useState("")
  const [votingEnd, setVotingEnd] = useState()
  const [word,setWord] = useState("")

  const { state } = useContext(Store)

  useEffect(() =>  {
    console.log("Contract info :",state.currentContract)
    setInitialAccount()
  },[setVote])

  // 投票者アドレスでないといけない
  const setVote = async(vote) => {
    try{
      await state.currentContract.methods.setVote(vote).send({from:account})
      showVote(vote)
    } catch(err) {
      console.log(err)
    }
  }

  const testSetWord = async(word) => {
    try{
      await state.currentContract.methods.testSetWord(word).send({from:account})

    } catch(err){
      console.log(err)
    }
  }

  const setInitialAccount = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0])
      console.log("Your Account : ", account)
    } catch(err){
      console.log(err)
    }
  }

  const toResultPage = () => {
    props.history.push("/result")
  }

  return (
    <div className="container">
    <Header>
      Voter Page
      <GetEndSign votingEnd={votingEnd}/>
    </Header>
      <Segment.Group>
        {/* <Segment classNsame="item">
          <button onClick={() => this.runExample()}>SET</button>
          <p>test : {this.state.storageValue}</p>
        </Segment> */}
        <Segment className="item">
          <AddressViewer contract={state.currentContract} address={account} role="Your"/>
        </Segment>

        <Segment className="item">
          <VoteForm contract={state.currentContract} address={account} setVote={setVote}/>
        </Segment>

        <Segment>
          <p>
            Your Vote : {vote}
          </p>
        </Segment>

        <Segment className="item">
        <Message negative className="end" >
          <p className="endMessage">
            You should vote before go to the result page.
          </p>
          <Button  color="red" onClick={toResultPage}> Go to Result Page </Button>
        </Message>

      </Segment>
      </Segment.Group>
    </div>
  )
}


export default Voter;