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
    const tx = await instance.setVote("test ballot");
    // console.log(tx)
    assert.isOk(tx)
  });

  it("set inspector Address" , async() => {
    const tx = await instance.setInspectorAddress(inspector,{from: organizer});
    assert.isOk(tx)
  });

  it("view result" , async() => {
    const tx = await instance.viewResult()
    // console.log(tx)
    assert.isOk(tx)
  });

  it("" , async() => {

  });

  it("" , async() => {

  });


});
