import React,{ useContext,useEffect,useState } from "react"
import { Segment, Header, Message, Button } from "semantic-ui-react"
import AddressForm from "../AddressForm"
import { Link } from "react-router-dom"
import "../../App.css"
import {Store} from "../../reducers/store"
import web3 from "../../web3/provider"


const Organizer = () =>  {
  const [account, setAccount] = useState("")
  const [errors, setErrors] =  useState([])

  const {state, dispatch} = useContext(Store)

  useEffect(() => {
    console.log(state)
    setInitialAccount()
  },[])

  const setInitialAccount = async() => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    console.log("Your Account : ", account)
  }

  // 運営者アドレスで実行
  const setVoterAddress = async(voterAddress) =>  {
    try{
      await state.currentContract.methods.setVoterAddress(voterAddress).send({from:account})
    } catch(err){
      setErrors(errors.concat(err))
      console.log(err)
    }
  }

  // 運営者アドレスで実行
  const setInspectorAddress = async(inspectorAddress) => {
    try{
      await state.currentContract.methods.setInspectorAddress(inspectorAddress).send({from:account})
    } catch(err){
      setErrors(errors.concat(err))
      console.log(err)
    }
  }

  const endVoting = async() => {
    try{
      //TODO: コントラクトのendをtrueにする処理を書く
      await state.currentContract.methods.endVoting().send({from:account})
      const result = await state.currentContract.methods.getEndSign.call().call()
      console.log(result)
      console.log("end")
    } catch (err) {
      setErrors(errors.concat(err))

      console.log(err)
    }
  }

  // const displayErrors = (_errors) => _errors.map((text,i) => <p key={i}>{text}</p>)

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
        <AddressForm role="Voter" setAddress={setVoterAddress}/>
      </Segment>
      <Segment>
        <AddressForm role="Inspector" setAddress={setInspectorAddress}/>
      </Segment>
      <Segment>
        <p>If you want to end Voting click this button.</p>
        <Button onClick={endVoting}>END VOTE</Button>
      </Segment>
      {/* <Message>
        {errors.length > 0 && (
          <Message>
            {displayErrors(errors)}
          </Message>
        )}
      </Message> */}
    </Segment.Group>
  )
}

export default Organizer;