const Sample = artifacts.require("Sample.sol");

contract("Sample", accounts => {

  beforeEach(async () => {
    instance = await Sample.deployed()
    // organizer = await accounts[0]
    // user =  await accounts[1]
})


  it("set value and get value", async () => {
    // Set value of 100
    await instance.set(100, { from: accounts[0] });

    // Get stored value
    const storedData = await instance.getValue.call();

    assert.equal(storedData, 100, "The value 100 was not stored.");
  });
});
