import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'


function NewTransfer({createTransfer, beneficiary, creationTime}) {
  const [transfer, setTransfer] = useState(undefined);

  const submit = e => {
    e.preventDefault();
    createTransfer(transfer);
  }

  const updateTransfer = (e, field) => {
    const value = e.target.value;
    setTransfer({...transfer, [field]: value});
  }

  return (
    <Container>
    <div>

      <h2><dt>Create transfer</dt></h2>
      <h6>Only the Beneficiary ({beneficiary}) can create a transfer.
      <br></br> Only allowed 16 years after creation time ({creationTime})</h6>

      <form onSubmit={e => submit(e)}>
        <center>
        <label htmlFor="amount">Eth Amount To Send</label><br></br>
        <input 
          id="amount"
          type="text" 
          onChange={e => updateTransfer(e, 'amount')} 
        />
        <br></br>
        <label htmlFor="to">Send Eth To Address</label><br></br>
        <input 
          id="to"
          type="text" 
          onChange={e => updateTransfer(e, 'to')} 
          />
          </center>
        <button class="btn btn-success">Request</button>
      </form>

    </div>
    </Container>
  );
}

export default NewTransfer;