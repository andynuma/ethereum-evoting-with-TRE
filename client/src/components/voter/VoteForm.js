import React,{ useState,useEffect } from "react"
import { Form, Button,Message } from "semantic-ui-react"
import axios from "axios"
import ipfs from "../../ipfs/ipfs"


const VoteForm = ({address,contract,setVote}) => {

  const [vote, setBallot] = useState("")
  const [EncryptedVote,setEncryptedVote] = useState("")

  useEffect(() => {
    console.log(address,contract)
    console.log(contract.methods)
  },[address,contract])

  const handleSubmit = async(e) =>  {
    e.preventDefault()
    console.log(process.env.REACT_APP_DECRYPTION_TIME)
    // //TODO:Enc(m)
    const res = await axios.post("http://localhost:5000/encrypt",{
      "m":vote,
      "time":process.env.REACT_APP_DECRYPTION_TIME
    })
    console.log(res.data.Enc)
    console.log(res.data.rP)
    // resからEnc(m)とrPを取り出す
    const Enc = "Enc" + res.data.Enc  // ipfsでは数値のみの文字列がintとして認識されるのでprefixをつけている
    const rP = res.data.rP
    console.log("(Enc)",Enc)
    // ipfsに送信するためのcontent作成
    const content_Enc = ipfs.Buffer.from(Enc)
    const content_rP = ipfs.Buffer.from(rP)
    console.log("contents:",content_Enc,content_rP)
    // add
    const results_Enc = await ipfs.add(content_Enc)
    const results_rP = await ipfs.add(content_rP)
    console.log("add",results_Enc,results_rP)
    // hashを取得
    const Enc_hash = await results_Enc[0].hash
    const rP_hash = await results_rP[0].hash
    console.log("Enc_hash",Enc_hash)
    console.log("rP_hash",rP_hash)
    // ipfsのハッシュ値をチェーンに記録
    await setVote(Enc_hash,rP_hash)
    console.log("submitted vote is  ", vote)

    // await setEncryptedVote(res.data.Enc)
  }

  const handleChange = (e) => {
    setBallot(e.target.value)
  }

  return(
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>VoteForm</label>
            <input placeholder="candicate name" value={vote} onChange={handleChange}/>
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        {/* {EncryptedVote} */}
    </div>
  )
}

export default VoteForm;