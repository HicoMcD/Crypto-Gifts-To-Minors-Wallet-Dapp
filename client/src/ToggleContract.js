import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'


function ToggleContract({ toggleContractActive, owner, stopped }) {
  
  return (
    <div class="container">
    <div>
      <h2><dt>Circuit Breaker State</dt></h2>
      <h6>Only the Owner ({owner}) can toggle the Circuit Breaker State</h6>
      <p>If state toggled 'ON' a transfer <u>cannot</u> be created or approved</p>
          <body >
          <center></center>
            <center>
                <p>
                  <Button variant="warning" onClick={() => toggleContractActive(stopped)}>Change</Button>
                      <br></br>
                      {stopped ? 'ON' : 'OFF'}
                </p>
            </center>
        </body>
        </div>
    </div>
  );
}

export default ToggleContract;