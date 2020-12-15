import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils.js'; 
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';
import ToggleContract from './ToggleContract.js';
import Selfdestruct from './Selfdestruct.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

import "./App.css";


function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  const [owner, setOwner] = useState();
  const [beneficiary, setBeneficiary] = useState();
  const [creationTime, setCreationTime] = useState();
  const [seeBalance, getBalance] = useState();
  const [stopped, setStopped] = useState();

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      const owner = await wallet.methods.owner().call()
      const beneficiary = await wallet.methods.beneficiary().call()
      const creationTime = await wallet.methods.creationTime().call();
      const seeBalance = web3.utils.fromWei(await wallet.methods.getBalance().call());
      const stopped = await wallet.methods.stopped().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setOwner(owner);
      setBeneficiary(beneficiary);
      setCreationTime(creationTime);
      getBalance(seeBalance);
      setStopped(stopped);
    };
    init();
  }, []);

  const createTransfer = transfer => {
    wallet.methods
      .createTransfer(web3.utils.toWei(transfer.amount), transfer.to)
      .send({from: accounts[0]});
  }

  const approveTransfer = transferId => {
    wallet.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]});
  }

  const toggleContractActive = () => {
    wallet.methods
      .toggleContractActive()
      .send({from: accounts[0]});
  }

  const closeWallet = () => {
    wallet.methods
      .closeWallet()
      .send({from: accounts[0]});
  }

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
    || typeof beneficiary === '0'
  ) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
    <div>
      <h1><center>Crypto Gifts To Minors Wallet Dapp </center></h1>
      <center><Header /><h4>Wallet Balance : {seeBalance} Eth</h4></center>
      <center><ToggleContract toggleContractActive={toggleContractActive} owner={owner} stopped={stopped} setStopped={setStopped}/></center>
      <center><NewTransfer createTransfer={createTransfer} beneficiary={beneficiary} creationTime={creationTime} /></center>
      <center><TransferList transfers={transfers} approveTransfer={approveTransfer} approvers={approvers} quorum={quorum} /></center>
      <center><Selfdestruct closeWallet={closeWallet} beneficiary={beneficiary} creationTime={creationTime} /></center>
    </div>
    </Container>
  );
}

export default App;