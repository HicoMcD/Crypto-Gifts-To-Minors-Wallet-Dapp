import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button} from 'react-bootstrap'

function Selfdestruct({beneficiary, closeWallet, creationTime}) {
    return (
        <Container>
            <h2><dt>Close Wallet</dt></h2>
            <h6>Only the Beneficiary ({beneficiary}) can close this wallet and receive the balance of this wallet.<br>
            </br>Only allowed 18 years after creation time ({creationTime})</h6>
            <body>
                {closeWallet}
            <center><Button variant="outline-danger" button onClick={() => closeWallet()}>SELFDESTRUCT</Button>{' '}</center>
            </body>
        </Container>
    );
}

export default Selfdestruct;