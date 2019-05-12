const Sample = artifacts.require("Sample.sol");

contract("Sample", accounts => {

  beforeEach(async () => {
    instance = await Sample.deployed()
    organizer = await accounts[0]
    voter = await accounts[1]
    inspector =  await accounts[2]
    voter2 = await accounts[3]
    // console.log(organizer,voter,inspector)
})

  it("set voter Address" , async() => {
    const tx = await instance.setVoterAddress(voter);
    assert.isOk(tx)
  });

  it("create Vote" , async() => {
    await instance.setVoterAddress(voter,{from:organizer})
    const tx = await instance.setVote("test ballot",{from:voter});
    // console.log(tx)
    assert.isOk(tx)
  });

  it("set inspector Address" , async() => {
    const tx = await instance.setInspectorAddress(inspector,{from: organizer});
    assert.isOk(tx)
  });

  it("Can end the Voting" , async() => {
    const tx =  await instance.endVoting({from:organizer})
    assert.isOk(tx)
    const EndSign = await instance.getEndSign.call()
    assert.equal(EndSign, true, "Voting is Ended.")
  });

  it("view result" , async() => {
    await instance.setVoterAddress(voter2,{from:organizer})
    const tx = await instance.setVote("test ballot 2",{from:voter2});
    // console.log(tx)
    const result = await instance.viewResult.call()
    const res = result.length
    assert.equal(res, 2, "Voting is not correct.")
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


});
