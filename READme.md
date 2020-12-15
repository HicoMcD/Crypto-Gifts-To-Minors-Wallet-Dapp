# ConsenSys Final Project : Crypto Gifts To Minors Wallet (CGTMWallet)
*MultiSig-Ownable-TimeLock Wallet*  

## Stakeholders
**Owner (Family Member or friend)** : 
- Family member or friend, also an approver.

**Beneficiary (Minor)** : 
- Minor which is chosen by the Owner. 
- Can request a withdrawal to be approved at age 16. 
- Can withdraw all funds and close the wallet at age 18 without any approval.

**Approvers (Family Members or Friends. 10 or less)** : 
- Amount of family members are chosen by the owner.
- Amount of approvals by family members are also chosen by the owner.

## Description:
Designed to imitate the 'Uniform Gifts to Minors Act' by using a non-custodial Ethereum smart contract. [(https://www.investopedia.com/terms/u/ugma.asp)]

This smart contract will act as an non-custodial wallet in which Ether can be deposited just by sending Eth to the constract address. The beneficiary of the wallet will only be able to request withdrawals 16 years after this wallet was created and at 18 years the beneficiary can withdraw all the Ether and close the wallet.

## Contract life cycle:
An Owner (family member/ friend) creates the CGTMWallet by inserting the approvers addresses, the amount of approvers needed and the address of the beneficiary

- Once the CGTMWallet is created, anyone can contribute Ether into the wallet by sending Eth to the contract wallet address. 
- The balance is always displayed. 
- At age 16, the Beneficiary can request an Ether withdrawal and withdraw it to an address of their choosing.
    - Once a transfer is created by the Beneficiary, the Family Approvers can choose to approved the created transfer. If teh specified amount of approvals are reached, the transfer will be sent.
    - If approval amount was not reached, the withdrawal will not be sent.
- The Owner also has the option to toggle stop and continue (toggle contract active function) the 'create transfer and approve transfer' function if the Owner deems it necessary. 
- At age 18, the Beneficiary is eligible to withdraw the full Eth balance in one transaction which will be sent to the initial address of the beneficiary which the Owner inserted when the CGTMWallet was created. Approval of family members are not needed. This will also close (selfdestruct) the CGTMWallet.
- When the 'close wallet' function is called the life cycle of the contract ends.  

# Development (dependemcies and technology):
Prerequisites:
- Truffle and Ganache-CLI and/or Ganache GUI have been installed
- NodeJS has been installed
  - web3
- Using VSCode as primary code editor
  - Extensions used:
      - Solidity (by Juan Blanco)
      - Prettier - Code formatter
      - Markdown All in One
      - Draw.io Integration
- Git has also been installed and integrated with VSCode
- OpenZeppelin Library v3.3
- Metamask
- React
- Bootstrap


### Initial setup
1) Create Root folder directory for new project. (```$ git init``` if not using VSCode as editor)
2) Inside new project root folder directory ```$ truffle init``` then ```$ npm init -y```
3) Still inside project root directory ```$ npm install @openzeppelin/contracts``` (For contract libraries and extensions)
### Coding and Compiling smart contracts
4)  Use [Remix IDE](remix.ethereum.org) - For a smart contract testing playground 
5) Use VSCode with all it's features and extensions to design your smart contract
- 5.1) Inside project root directory, run ```$ truffle compile``` to ensure your code compiles before migrating. 
  - Check that your:
    -  smart contract 'pragma version', 
    -  truffle-config.js 'pragma version',
    -  VSCode compilers' 'pragma version' 
  
  are all matching to avoid errors.
      
### Migration files for smart contracts (for later use)
6) -  Inside the 'Migrations' folder, Add a new filed called '2_deploy_contract.js' (an additional new migration file is required for each smart contract) 
   - Insert the below code into 2_deploy_contract.js
```js
const /*SmartContractName*/ = artifacts.require(/* "SmartContractName.sol" */);

module.exports = function(deployer) {
 deployer.deploy(/*SmartContractName*/);
};
```
)
### Running on local test network
(see prerequisite, Ganache-CLI and Ganache GUI)
1) Using Ganache-cli
- In project root, Run ```$ ganache-cli``` to run your own development blockchain. In the consle, if you scroll up, you will see the Addresses, Private keys, Mnemonic and current blockchain settings that the development blockchain has created.
2) Using Ganache GUI, Open Ganache
- In truffle-config.js, uncomment or change the code to the following
(Should be lines 45-49):
```
development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
```
- Ensure that the RPC SERVER is HTTP://127.0.0.1:8545 in the Ganache GUI
- Once that is setup, Run ```$ truffle console``` which changes the console to ```$ truffle(development)``` (Ganache GUI must be open)

Both ways work well but are use for different purposes. (only use one instance at a time otherwise you will get errors)
- Ganache-cli for quick setup 
- Ganache GUI for more in-depth details about the blockchain

### Migrating your contracts (see migration files)
1) Ganache-cli instance:
- In a different console, Run ```$ truffle migrate```.

2) Ganache GUI instance:
-  Run ```$ truffle migrate```.

Now you can start interacting with your smart contract.

### Testing your smart contracts
1) In the test folder, Create a new file smartContractName.js (use camelCase Notation)
2) Write your tests inside. (Same as Mochajs with slight differences)
3) ```npm install --save-dev @openzeppelin/test-helpers```
4) Once you are ready to test, Run ```$ truffle test``` (ensure that you have a local blockchain running as setup before)

## Frontent Server
- In the 'client' folder, run ```npm start``` to start the server.


## Future Development
- Intergrate with DeFi platforms to increase yield over 18 years while the contract is active
- Chnage from web3 to ethersjs
- Add ENS capabilityfor human-readable names to Ethereum addresses.




























































































































 



















