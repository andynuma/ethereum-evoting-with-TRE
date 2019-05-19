import React,{ useContext, useEffect, useState } from "react"
import web3  from './web3/provider'
import VoteForm from "./components/VoteForm"
// import ResultView from "./components/ResultView"
import AddressViewer from "./components/AddressViewer";
import { Segment, Header, Button } from "semantic-ui-react"
import "./App.css"
import {Store} from "./reducers/store"
import GetEndSign from "./components/GetEndSign";


const App = (props) => {
  const [vote, showVote] = useState("")
  const [account, setAccount] = useState("")
  const [votingEnd, setVotingEnd] = useState()

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
        <Segment>
          <Button onClick={toResultPage}>Go to Result Page</Button>
        </Segment>
      </Segment.Group>
    </div>
  )
}


export default App;