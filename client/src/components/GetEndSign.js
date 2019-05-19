import React,{ useContext, useEffect, useState } from "react"
import {Store} from "../reducers/store"
import { Message, Button } from "semantic-ui-react";


const GetEndSign = () => {
  const { state,dispatch } = useContext(Store)

  useEffect(() => {
    console.log({state})
    getEndSign()
  },[])

  const getEndSign = async() => {
    const res = await state.currentContract.methods.getEndSign.call().call()
    console.log(res)
    console.log(state.isEnd)
    if(res === true) {
      dispatch({type:"SET_ISEND"})
      console.log(state.isEnd)
    }
  }

  // const handleClick = async() => {
  //   const res = await state.currentContract.methods.getEndSign.call().call()
  //   console.log(res)
  //   setEnd(res)
  //   console.log(end)
  // }


  // const result = () => (
    //   <div>
    //     result
    //   </div>
    // )

    return(
      (state.isEnd) ?
      (<Message negative>
        Voting is End. You can't send any transactions.
      </Message>)
      :
      (<></>)
  )
}

export default GetEndSign;