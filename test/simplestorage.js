const Sample = artifacts.require("Sample.sol");

contract("Sample", accounts => {

  beforeEach(async () => {
    instance = await Sample.deployed()
    organizer = await accounts[0]
    voter = await accounts[1]
    inspector =  await accounts[2]
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
    const tx =  await instance.endVoting()
    assert.isOk(tx)
    const EndSign = await instance.end.call()
    assert.equal(EndSign, true, "Voting is Ended.")
  });

  it("view result" , async() => {
    const tx = await instance.viewResult()
    assert.isOk(tx)
    const result = await instance.viewResult().call()
    console.log(result)

    // Set Vote
    await instance.setVoterAddress(voter,{from:organizer})
    await instance.setVote("test ballot",{from:voter});
    // const array = await instance.ballots.call()
    console.log(array)
  });

  it("value set" , async() => {
    const tx = await instance.setValue(100)
    assert.isOk(tx)
  });

  it("value get" , async() => {
    const tx = await instance.setValue(100, { from: accounts[0] })
    const tx2 = await instance.getValue().call();
    console.log(tx)
    assert.isOk(tx)
    assert.equal(tx2, 100," set is not valid")

  });


});
