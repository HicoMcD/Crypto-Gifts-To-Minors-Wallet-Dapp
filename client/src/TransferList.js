import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function TransferList({transfers, approveTransfer, approvers, quorum}) {
  return (
    <div class="container">
    <div>
      <h2><dt>Transfers</dt></h2>
      <h6>Only selected Family Approvers<br></br> {approvers.join(', ')}<br></br> are allowed to approve transfers.</h6>
      <h6>{quorum} Family Approvers required to send transfer.</h6>
      <table class="table table-dark">
      <caption>List of transfer requests</caption>
        <thead>
          <tr>
            <th>Transfer<br></br> ID</th>
            <th>Amount to<br></br> Transfer</th>
            <th>Transfer to<br></br> Address</th>
            <th> {quorum} Approvals<br></br> Needed </th>
            <th>Sent <br></br>Status</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td>{transfer.id}</td>
              <td>{(transfer.amount)/1000000000000000000}</td>
              <td>{transfer.to}</td>
              <td>
                <button type="button" class="btn btn-secondary" button onClick={() => approveTransfer(transfer.id)}>Approved <span class="badge badge-dark">{transfer.approvals}</span></button>
              </td>
              <td>{transfer.sent ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default TransferList;