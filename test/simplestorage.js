// import web3 from "../client/src/web3/provider";

const Sample = artifacts.require("Sample.sol");

contract("Sample", (accounts) => {

  beforeEach(async () => {
    instance = await Sample.deployed()
    organizer = await accounts[0]
    voter = await accounts[1]
    inspector =  await accounts[2]
    voter2 = await accounts[3]
    // console.log(organizer,voter,inspector)
  })

  it("only organizer set voterAddress" , async() => {
    let err = null;
    try{
      await instance.setVoterAddress(voter,{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });


  it("set voter Address" , async() => {
    const tx = await instance.setVoterAddress(voter);
    assert.isOk(tx)
  });

  it("only selected voter can send vote" , async() => {
    let err = null;
    try{
      await instance.setVote("invalid ballots",{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("create Vote" , async() => {
    await instance.setVoterAddress(voter,{from:organizer})
    const tx = await instance.setVote("test ballot 1",{from:voter});
    console.log(tx)
    assert.isOk(tx)
  });

  it("Only once voting" , async() => {
    let err = null;
    try{
      await instance.setVote("double voting",{from:voter})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });


  it("set inspector Address" , async() => {
    const tx = await instance.setInspectorAddress(inspector,{from: organizer});
    assert.isOk(tx)
  });

  it("only organizer set inspectorAddress" , async() => {
    let err = null;
    try{
      await instance.setInspectorAddress(voter,{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("Can end the Voting" , async() => {
    const sign = await instance.getEndSign.call()
    assert.equal(sign, false, "Initializing is fail.")
    console.log(sign)
    const tx =  await instance.endVoting({from:organizer})
    assert.isOk(tx)
  });

  it("only organizer can end voting" , async() => {
    let err = null;
    try{
      await instance.endVoting({from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("toBytes" , async() => {
    const res = await instance.toBytes(voter)
    console.log("res:",res)
  });

  it("view result" , async() => {
    // await instance.setVoterAddress(voter2,{from:organizer})
    // const tx = await instance.setVote("test ballot 2",{from:voter2});
    // console.log(tx)
    const result = await instance.viewResult.call({from:voter})
    const res = result.length
    console.log(res)
    // assert.equal(res, 2, "Voting is not correct.")
    assert.isOk(result)
    console.log(result)
    // // console.log(typeof(result))
    // // console.log(typeof(result[1]))
    // console.log(typeof(result[2]))
    // const val = await result[2]
    // //TODO:ここの表示を直せば良い
    // const temp = await web3.utils.toAscii(voter)
    // console.log(voter)
    // console.log(temp)
    
  });

  // it("toString",async() => {
  //   const addr = await organizer
  //   const res = await instance.toString(addr).call()
  //   console.log("res:",res)
  //   const converted = await web3.utils.toAscii(res)
  //   console.log(converted)
  // })

  // it("connect 2 string",async() => {
  //   const addr = await "organizer"
  //   // const addr = await organizer
  //   const vote = await "TEST"
  //   const res = await instance.strConnect(vote,addr)
  //   console.log(res)
  // })


  it("value set" , async() => {
    const tx = await instance.setValue(100)
    assert.isOk(tx)
  });

  it("value get" , async() => {
    await instance.setValue(100, { from: accounts[0] })
    const res = await instance.getValue.call()
    assert.isOk(res)
  });

  // Ended voting test

  it("(EndVotingTest)only organizer set voterAddress" , async() => {
    let err = null;
    try{
      await instance.setVoterAddress(voter,{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });


  it("(EndVotingTest)set voter Address" , async() => {
    let err = null;
    try{
      await instance.setVoterAddress(voter,{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("(EndVotingTest)only selected voter can send vote" , async() => {
    let err = null;
    try{
      await instance.setVote("invalid ballots",{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("(EndVotingTest)create Vote" , async() => {
    let err = null;
    try{
      await instance.setVoterAddress(voter,{from:organizer})
      await instance.setVote("test ballot 1",{from:voter});
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("(EndVotingTest)Only once voting" , async() => {
    let err = null;
    try{
      await instance.setVote("double voting",{from:voter})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("(EndVotingTest)only organizer set inspectorAddress" , async() => {
    let err = null;
    try{
      await instance.setInspectorAddress(voter,{from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("(EndVotingTest)only organizer can end voting" , async() => {
    let err = null;
    try{
      await instance.endVoting({from:voter2})
    } catch(error) {
      err =  error
    }
    assert.ok(err instanceof Error)
  });

  it("hex check" , async() => {
    // const res = web3.utils.hexToU(voter)
    // console.log(web3.utils)
  });
});
