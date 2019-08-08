const Sample = artifacts.require("Sample.sol");

contract("Max Number Test", (accounts) => {

  it("create Vote" , async() => {
    // voter2 = await accounts[3]
    for (i = 3; i < 10; i++) {
      console.log(accounts[i])
      await instance.setVoterAddress(accounts[i],{from:accounts[0]})
      const tx = await instance.setVote(`Test Ballot from ${accounts[i]}`,{from:accounts[i]});
      // console.log(tx)
      assert.isOk(tx)
    }
  });
})