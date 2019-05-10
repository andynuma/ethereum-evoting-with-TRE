import React,{ useContext, useEffect, useState } from "react"
import web3  from '../../../src/web3/provider'
import {Store} from "../../reducers/store"
import VoteList from "./VoteList";
import { Segment, Button } from "../../../node_modules/semantic-ui-react";

const Result = () => {

  const {state} =  useContext(Store)

  const [account,setAccount] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    console.log("mounted")
    setInitialAccount()
    // viewResult()
  },[viewResult])

  const setInitialAccount = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      console.log(accounts[0])
      setAccount(accounts[0])
      // const tx = await accounts[0]
      // await setAccount(tx)
      console.log("Your Account : ", account)
    } catch(err){
      console.log(err)
    }
  }

  const viewResult = async() => {
    try{
      //TODO:contractのコメントアウトを外す
      const result = await state.currentContract.methods.viewResult().send({from:account})
      setResult(result)
      console.log("Result button clicked")
      // setResult(["TEST1","TEST2","TEST3"])
      console.log(result)
    } catch(err){
      console.log(err)
    }
  }


  return(
    <Segment.Group>
      <Segment>
        <VoteList address={account} result={result}/>
      </Segment>
      <Segment>
        <Button onClick={viewResult}>View Result</Button>
      </Segment>
    </Segment.Group>
  )
}

export default Result;