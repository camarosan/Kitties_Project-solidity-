const kittyContract = artifacts.require("kittyContract");

module.exports = function (deployer) {
  deployer.deploy(kittyContract);
};