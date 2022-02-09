// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "./interfaces/IMerkleDistributor.sol";

contract MerkleDistributor is IMerkleDistributor {
    address public immutable override token;
    bytes32 public immutable override merkleRoot;
    
    uint public forCreatorBalance = 250000000e18;//Rewarded to Ethereum contract creators,100000 per address.
    uint public forUserBalance = 200000000e18;//Rewards to Ethereum users,first come first served.
    uint public forUserPerAddress = 200e18;
 
    mapping(uint256 => uint256) private claimedBitMap;
    mapping(address => bool) public claimed;
    constructor(address token_, bytes32 merkleRoot_) public {
        token = token_;
        merkleRoot = merkleRoot_;
    }

    function isClaimed(uint256 index) public view override returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
    }
    
    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof) external override {
        require(!isClaimed(index), 'MerkleDistributor: Drop already claimed.');

        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), 'MerkleDistributor: Invalid proof.');

        // Mark it claimed and send the token.
        _setClaimed(index);
        claimed[msg.sender]=true;
        require(IERC20(token).transfer(account, amount), 'MerkleDistributor: Transfer failed.');

        emit Claimed(index, account, amount);
    }
    
    function claim2() external override {
        require(!claimed[msg.sender], 'MerkleDistributor: Drop already claimed.');
        require(forUserBalance > 0, 'MerkleDistributor: Distribution closed.');
        
        claimed[msg.sender]=true;
        forUserBalance = forUserBalance - forUserPerAddress;
        require(IERC20(token).transfer(msg.sender, forUserPerAddress), 'MerkleDistributor: Transfer failed.');
        emit Claimed(0, msg.sender, forUserPerAddress);
    }
    
}
