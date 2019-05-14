const Sample = artifacts.require("Sample.sol");

contract("Sample", async(accounts) => {

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
    // console.log(tx)
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
    // const tx =  await instance.endVoting({from:organizer})
    // assert.isOk(tx)
    const EndSign = await instance.getEndSign.call()
    console.log(EndSign)
    // assert.equal(EndSign, true, "Voting is Ended.")
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

  it("view result" , async() => {
    // await instance.setVoterAddress(voter2,{from:organizer})
    // const tx = await instance.setVote("test ballot 2",{from:voter2});
    // console.log(tx)
    const result = await instance.viewResult.call()
    const res = result.length
    console.log(res)
    // assert.equal(res, 2, "Voting is not correct.")
    assert.isOk(result)
    console.log(result)
  });


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

  it("(EndVotingTest)view result" , async() => {
    const result = await instance.viewResult.call()
    assert.isOk(result)
  });
});
