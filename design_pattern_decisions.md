# Design Pattern Decisions
A summary of design pattern decisions and smart contract best practices taken into account for the CGTMWallet contract.

### Multi-Signature wallet 
Multi-Sig wallets are used when more than one person or entity is needed to make transactional decisions from the a wallet. It can also be used as a fail-safe in the case of lost EOA's. The creator of the multisig would decide how many addresses will be used as approvers and the amount of approvers needed for the transasction to be executed.

The Multi-Sig design pattern was used because the beneficiary does not own the wallet and needs approvals from specified family members if the beneficiary would like to withdraw Ether.

### Time-Lock Mods
Time-lock modifiers are implemented, when a certain amount of time has to passed the function can be used, before that time the function is unavailable.

Time-locks are implemented on the createTransfer, approveTransfer which is 16 years and closeWallet function which is 18 years.

The CGTMWallet is designed as a long term saving/ investment wallet and Ether should not be withdraw before the beneficiary has come of age (18), but in emergency circumstances, after 16 years, the beneficiary can request a createTransfer. If the transfer is approved by the family members, the amount requested will be sent. 

### Restricting access
Function modifiers are used check the requirements of the function before it is executed. This way it reduces unecessary code execution when requirements are not met.

Modifiers are used extensively on all state changing (transactional) functions, such as onlyOwner, onlyBeneficiary, onlyApprover. This is to avoid any other EOA (person) or contract which was not initialised in the constructor when the contract was deployed. 

CGTMWallet leverages on OpenZeppelin's contract libraries which gives access to the Ownable.sol contract. The Ownable contract assigns the creator of the contract as the Owner of the newly created contract. It also enables the CGTMWallet to use the onlyOwner modification. Ownable also has other functions such as renounceOwnership and transferOwnership but these functions are not needed for this use case. Ownable inherits from another OpenZeppelin contract which is abstract, Context.sol improves gas efficiency when using msg.sender and msg.data.

### Circuit breaker
The circuit breaker pattern is used to pause toggle access to certain functions if the Owner deems it necessary.

The Owner (creator) of the contract has an 'onlyOwner' 'toggleContractActive' function  which they can toggle 'on or off' (paused or not paused). The createTransfer and approveTransfer functions both have the modifier 'stopInEmergency' which if the Owner toggles it 'ON', both functions are unavailable until toggled off again.


### Selfdestruct
Selfdestruct is used when there is no use for the smart contract on the blockchain anymore. It's also used if Ether has mistakenly been locked in a contract with no way of retrieving it but normal means, the selfdestruct function is then called and all the funds are sent to the wallet of the beneficiary chosen before the contract was deployed. When selfdestruct is called, the contract will not be able to be access on the blockchain however all the history of the contract remains. 

In the CGTMWallet the closeWallet (selfdestruct) function can be used after the beneficiary comes of age (18 years old). This will transfer all the Ether which is still inside the contract to the beneficiary. After this function is called the CGTMWallet will not be accessible anymore. The lifecycle of the CGTMWallet has run its course.


