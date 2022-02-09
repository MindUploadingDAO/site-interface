const TestToken = artifacts.require("TestERC20");
const MerkleDistributor = artifacts.require("MerkleDistributor");

module.exports = function(deployer) {
  deployer.deploy(TestToken,"Test mind", "MIND", "10000000000000000000000000").then(function(instance) {
    console.log(instance.address);
    return deployer.deploy(MerkleDistributor,instance.address,"0xd328149f73ca3f6d62ba8a1a1cf043f484e7a439494a51f93b5f59de8496a057");
  });
 
};
