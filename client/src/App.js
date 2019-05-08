import React from "react"
import Sample from "./contracts/Sample"
import web3  from './web3/provider'
import VoteForm from "./components/VoteForm"
// import ResultView from "./components/ResultView"
import AddressViewer from "./components/AddressViewer";
import { Segment, Header } from "semantic-ui-react"
import "./App.css"
import AddressForm from "./components/AddressForm";

class App extends React.Component{

  state = {
    contract : null,
    accounts:null,
    storageValue:null,
    vote:"",
    voterAddress:"",
    inspectorAddress:"",
    end:false
  }

  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Sample.networks[networkId];
    const instance = new web3.eth.Contract(
      Sample.abi,
      deployedNetwork.address,
      { from: web3.eth.defaultAccount }
    );
    console.log("Your account:",accounts)

    this.setState({contract:instance, accounts:accounts})
    console.log("Contract Instance :",this.state.contract)
  };

  runExample = async () => {
    const { accounts, contract } = await this.state;
    await contract.methods.setValue(100).send({from:accounts[0]})
    const response = await contract.methods.getValue().call();
    this.setState({ storageValue: response });

    console.log("Response : ",this.state.storageValue)
  };

  // 投票者アドレスでないといけない
  setVote = async(vote) => {
    //TODO: 下2行
    const { accounts, contract } = await this.state;
    await contract.methods.setVote(vote).send({from:accounts[0]})
    this.setState({vote:vote})
    // console.log(this.state.vote)
    this.setState({end: true})
  }

  // 運営者アドレスで実行
  setVoterAddress = async(voterAddress) =>  {
    const { accounts, contract } = await this.state;
    await contract.methods.setVoterAddress(voterAddress).send({from:accounts[0]})
  }

  // 運営者アドレスで実行
  setInspectorAddress = async(inspectorAddress) => {
    const { accounts, contract } = await this.state;
    await contract.methods.setInspectorAddress(inspectorAddress).send({from:accounts[0]})
  }



  render() {
    const {accounts, contract, vote, end} = this.state
    return (
      <div className="container">
      <Header>
        Voter Page
      </Header>
        <Segment.Group>
          {/* <Segment className="item">
            <button onClick={() => this.runExample()}>SET</button>
            <p>test : {this.state.storageValue}</p>
          </Segment> */}
          <Segment className="item">
            <AddressViewer contract={contract} address={accounts} role="Your"/>
          </Segment>
          <Segment className="item">
            <VoteForm contract={contract} address={accounts} setVote={this.setVote}/>
          </Segment>
          <Segment>
            <p>
              Your Vote : {vote}
            </p>
          </Segment>
          {/* <Segment className="item">
            <ResultView contract={contract} address={accounts} />
          </Segment> */}
          <Segment>
            {/* {end} ? <p></p> : <p>Submitted ! </p> */}
          </Segment>
        </Segment.Group>

      </div>
    )
  }
}

export default App;