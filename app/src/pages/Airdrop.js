import React from "react"
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Button2 from '../components/Button2'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MerkleDistributor from '../contracts/MerkleDistributor.json'
import { ethers } from 'ethers'
import axios from 'axios'

function Airdrop() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [index, setIndex] = useState(0)
  const [proof, setProof] = useState([])
  const [amountChecked, setAmountChecked] = useState(false)
  const ipfs = 'https://gateway.pinata.cloud/ipfs/QmV9sesn3tJNeLKmiLVvm8Qb9SU4ARc2qKdoc57M5w76yi/'
  const mdAddress = '0xefdfffd7895af42224056da7058b17a4d9c6d4cf' 
  
  const checkClaimAmount = async() => {
    try {
      let keyName = currentAccount.substring(0, 5).toUpperCase()
      const res = await axios.get(ipfs + keyName + ".json").then((res) => {return res});

      const info = res.data[ethers.utils.getAddress(currentAccount)]
      setAmount(0)
      if(info){
        const mdContract=getProvider().mdContract
        const isclaimed = await mdContract.isClaimed(info.index);
        if(!isclaimed){
          setAmount(ethers.BigNumber.from(info.amount))
          setProof(info.proof)
          setIndex(info.index)
        }
      }
      setAmountChecked(true);
    } catch (err) {
      console.log(err)
    }
  }
  

  const getProvider = () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mdContract = new ethers.Contract(mdAddress, MerkleDistributor.abi, signer);
    return { provider, signer, mdContract }
  }

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
     
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const claimHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const mdContract=getProvider().mdContract
        let txn = await mdContract.claim(index, currentAccount, amount, proof);
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined, see transaction: https://etherscan.io/tx/${txn.hash}`);
        checkClaimAmount();
       
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();
        // const nftContract = new ethers.Contract(contractAddress, abi, signer);

        // console.log("Initialize payment");
        // let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

        // console.log("Mining... please wait");
        // await nftTxn.wait();

        // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }


  const connectWalletButton = () => {
    return (
      <Button2 onClick={connectWalletHandler} >
        Connect Wallet
      </Button2>
    )
  }

  const claimButton = () => {
    return (
      <Button2 onClick={claimHandler} >
        Claim
      </Button2>
    )
  }

  const checkButton = () => {
    return (
      <Button2 onClick={checkClaimAmount} >
        Check Amount
      </Button2>
    )
  }

  
  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    
    <Container >
      <div>
        <Navbar/>
        <br/><br/><br/><br/>
        <h1>$MIND TOKEN CLAIM</h1>
        <h3>Your address {currentAccount}</h3>
        <h1>You will receive {amountChecked ? ethers.utils.formatUnits(amount, 18):"?"} $Mind</h1>
        <br/><br/><br/>
        {currentAccount ? (amountChecked ? claimButton():checkButton() ): connectWalletButton()}
        <br/><br/>
        <br/><br/><br/><br/><br/><br/><br/>

        <br/><br/><br/><br/><br/><br/><br/><br/>
        <p>According to the snapshot at the end of block 14182045, all addresses that have created contracts will accept this airdrop.</p>
        <a href="https://gateway.pinata.cloud/ipfs/QmV9sesn3tJNeLKmiLVvm8Qb9SU4ARc2qKdoc57M5w76yi/total.json">Final Aidrop List including Merkle Proofs</a>
      <Footer/>
      </div>
    </Container>
  );
};

export default Airdrop