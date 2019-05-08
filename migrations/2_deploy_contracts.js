const Sample = artifacts.require("Sample.sol");
const Owned = artifacts.require("Owned.sol")

module.exports = function(deployer) {
  deployer.deploy(Sample);
  deployer.deploy(Owned);
};
