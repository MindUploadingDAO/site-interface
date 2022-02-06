import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import Container from '../components/Container'
import Slogan from '../components/Slogan'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {

  
  // destructure drizzle and drizzleState from props
  return (
    <Container >
      <div>
        <Navbar/>
        <br/>
        <Slogan>THE DAO FOR DIGITAL IMMORTALITY<br/><br/>
            <div><Button>CLAIM $MIND TOKEN 🗿</Button></div>
        </Slogan><br/><br/><br/><br/>
        <h1>INTRODUCTION</h1>
        <h2>Mind uploading, also known as whole brain emulation (WBE), is the theoretical futuristic process of scanning a physical structure of the brain accurately enough to create an emulation of the mental state (including long-term memory and 'self') and transferring or copying it to a computer in a digital form. The computer would then run a simulation of the brain's information processing, such that it would respond in essentially the same way as the original brain and experience having a sentient conscious mind.Scientists predict that the technology is expected to achieve digital immortality.We hope to use the wisdom of crowds to accelerate research in related fields through MindUploadingDAO and benefit the public.</h2>
        <br/><br/><br/><br/>
        <h1>$MIND TOKEN DISTRIBUTION</h1>
        <h3>The contract address for $MIND is <br/>
            <a href="https://etherscan.io/address/0x6396cAd9f2fC1e3e52aD838200f623Ab2048fdd6">(0x6396cAd9f2fC1e3e52aD838200f623Ab2048fdd6).</a><br/><br/>
        </h3>
        <h3>
            There will be 100 billion total $MIND tokens,<br/>
            and the distribution is as follows:<br/><br/>
         </h3>
        <h2>
            1. 20% Airdrop to each Ethereum address (20 per address, first come first served)<br/><br/>

            2. 25% Airdrop to every Ethereum address that has created a contract <br/><br/>

            3. 50% to the DAO community treasury (to future contributors)<br/><br/>

            4. 5% to early contributor <br/><br/>

         </h2>

        
        <br/><br/><br/><br/><br/>

        <h2>"We'll be uploading our entire MINDS to computers by 2045 and our bodies will be replaced by machines within 90 years."</h2>
        <h4>- Ray Kurzweil （Futurist @www.dailymail.co.uk）</h4>
        <br/><br/>
        <h2>"Consciousness is part of the natural world. It depends, we believe,
only on mathematics and logic and on the imperfectly
known laws of physics, chemistry, and biology;
it does not arise from some magical or otherworldly quality"</h2>
<h4>- Christof Koch & Giulio Tononi （@IEEE_Spectrum）</h4>
    <br/><br/><br/><br/><br/>

       <h1>Contracts Code</h1>
       <h3>Token:<a href="https://etherscan.io/address/0x6396cAd9f2fC1e3e52aD838200f623Ab2048fdd6#code">(0x6396cAd9f2fC1e3e52aD838200f623Ab2048fdd6)</a></h3>
       <h3>Governance:<a href="https://etherscan.io/address/0xe99234A83dF887e8c3b8152f260721164dA04284#code">(0xe99234A83dF887e8c3b8152f260721164dA04284)</a></h3>
       <h3>Timelock:<a href="https://etherscan.io/address/0x172c4cD583cd69C6E6E8B559eBC0f8D56916e2D6#code">(0x172c4cD583cd69C6E6E8B559eBC0f8D56916e2D6)</a></h3>
       <h3>Airdrop:<a href="">(0xe4e90ce27447fc34fb571e3daccfadee6af13736)</a></h3>
      <Footer/>
      </div>
    </Container>
  );
};
