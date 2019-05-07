import React from "react"
import Sample from "./contracts/Sample"
import web3  from './web3/provider'
import VoteForm from "./components/VoteForm"
// import ResultView from "./components/ResultView"
import AddressViewer from "./components/AddressViewer";
import { Segment } from "semantic-ui-react"
import "./App.css"

class App extends React.Component{

  state = {
    contract : null,
    accounts:null,
    storageValue:null,
    vote:""
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

  setVote = async(vote) => {
    //TODO: 下2行
    // const { accounts, contract } = await this.state;
    // await contract.methods.setVote(vote).send({from:accounts[0]})
    this.setState({vote:vote})
    
  }

  render() {
    const {accounts, contract} = this.state
    return (
      <div className="container">
        <Segment.Group>
          <Segment className="item">
            <button onClick={() => this.runExample()}>SET</button>
            <p>test : {this.state.storageValue}</p>
          </Segment>
          <Segment className="item">
            <AddressViewer contract={contract} address={accounts} role="Your"/>
          </Segment>
          {/* <Segment className="item">
            <AddressViewer contract={contract} address={accounts} role="Organizer"/>
          </Segment> */}
          <Segment className="item">
            <VoteForm contract={contract} address={accounts} setVote={this.setVote}/>
          </Segment>
          {/* <Segment className="item">
            <ResultView contract={contract} address={accounts} />
          </Segment> */}
        </Segment.Group>

      </div>
    )
  }
}

export default App;