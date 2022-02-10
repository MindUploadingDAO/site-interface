import React from "react";
import { useEffect, useState } from 'react';
import Container from '../components/Container'
import Slogan from '../components/Slogan'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button2 from '../components/Button2'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Token from '../contracts/TestERC20.json';
import MerkleDistributor from '../contracts/MerkleDistributor.json';
import { ethers } from 'ethers';
import axios from 'axios'

function Airdrop() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [index, setIndex] = useState(0)
  const [proof, setProof] = useState([])
  const [claimType, setClaimType] = useState(0)
  const [amountChecked, setAmountChecked] = useState(false)
  const ipfs = 'http://bafybeidahfszm7wqzg4uboe5mch3xocin7m4737vykj6qgcgsfocpsukoq.ipfs.localhost:8080/'

  const checkClaimAmount = () => {
    axios.get(ipfs + currentAccount.substring(0, 5).toUpperCase() + '.json').then((res) => {
      const info = res.data[ethers.utils.getAddress(currentAccount)]
      if(info){
        const mdContract=getProvider().mdContract
        mdContract.isClaimed(index).then((isclaimed)=>{
          console.log(info,isclaimed)
          if(!isclaimed){
            setAmount(parseInt(info.amount, 16))
            setProof(info.proof)
            setIndex(info.index)
            setClaimType(1)
          }
          setAmountChecked(true);
        });
      }
    }).catch(function (error) {
      const mdContract=getProvider().mdContract
      mdContract.claimed(currentAccount).then((isclaimed)=>{
        if(!isclaimed){
          setAmount(200)
          setClaimType(2)
          setAmountChecked(true);
        }
      });
    });
  }

  const getProvider = () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mdContract = new ethers.Contract("0x25c9697151f3fb2a265028af3a9301d8b8d531e8", MerkleDistributor.abi, signer);
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

      if (ethereum && claimType > 0) {
        const mdContract=getProvider().mdContract
        let txn ;
        if(claimType==1){
           console.log(index,currentAccount,amount,proof)
           txn = await mdContract.claim(index, currentAccount, amount, proof);
        }else if (claimType==2){
           txn = await mdContract.claim2();
        }
        console.log("Mining... please wait");
        await txn.wait();
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
       
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
        <h1>You will receive {amountChecked?amount:"?"} $Mind</h1>
        <br/><br/><br/><br/>
        {currentAccount ? (amountChecked ? claimButton():checkButton() ): connectWalletButton()}

        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
      </div>
    </Container>
  );
};

export default Airdrop