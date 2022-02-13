const TestToken = artifacts.require("TestERC20");
const MerkleDistributor = artifacts.require("MerkleDistributor");

module.exports = function(deployer) {
  let token;
  let md;
  deployer.deploy(TestToken,"Test mind", "MIND", "10000000000000000000000000").then(function(instance) {
    token = instance
    return deployer.deploy(MerkleDistributor,token.address,"0x170f71090c005b29242a8428d3d63a207760f08eceb2356bb0f866078e852054");
  }).then(function(instance) {
    md = instance
    return token.setBalance(md.address, "4500000000000000000000000");
  });
 
};
