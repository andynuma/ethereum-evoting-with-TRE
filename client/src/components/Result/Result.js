import React,{ useContext, useEffect, useState } from "react"
import web3  from '../../../src/web3/provider'
import {Store} from "../../reducers/store"
import VoteList from "./VoteList";
import { Segment, Button } from "semantic-ui-react";

const Result = () => {

  const {state} =  useContext(Store)

  const [result, setResult] = useState([])

  useEffect(() => {
    // console.log("mounted")
    console.log(state)
    setInitialAccount()
  },[viewResult])

  const setInitialAccount = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
    } catch(err){
      console.log(err)
    }
  }

  const viewResult = async() => {
    try{
      const result = await state.currentContract.methods.viewResult.call().call()
      // const result = await state.currentContract.methods.viewResult.call()
      setResult(result)
      console.log("Voting result",result)
      console.log("Result button clicked")
    } catch(err){
      console.log(err)
    }
  }


  return(
    <Segment.Group>
      <Segment>
        <VoteList result={result}/>
      </Segment>
      <Segment>
        <Button onClick={viewResult}>View Result</Button>
      </Segment>
    </Segment.Group>
  )
}

export default Result;