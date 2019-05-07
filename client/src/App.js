import React from "react"
import Sample from "./contracts/Sample"
import web3  from './web3/provider'

export default class App extends React.Component{

  state = {contract : null,accounts:null,storageValue:null}

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



  render() {
    return (
      <div>
        <button onClick={() => this.runExample()}>SET</button>
        {this.state.storageValue}
      </div>
    )
  }
}