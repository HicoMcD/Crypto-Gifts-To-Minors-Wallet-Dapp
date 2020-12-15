# Avoiding Common Attacks
A summary of steps taken to mitigate attacks commonly found on open blockchain platforms.

## Re-entrancy (SWC-107) Attacks
Re-entrancy attacks happen when an external call gets recalled in a recursive manner in an attempt to drain the funds of the contract.

To prevent these types of attacks, all internal conditions are run before the .transfer() is executed thus preventing the attack.

## Extensive Use of Function Modifications
Function modifiers are used to check if certain requirements are met before the rest of the code is executed.

Modifiers are use extensively on all state changing (transactional) functions. Modifiers such as onlyOwner, onlyBeneficiary, onlyApprover. This is to avoid any other EOA (person) or contract which was not initialised in the constructor when the contract was deployed. 

By leveraging on function modifiers there should not be any problems with 'integer overflow and underflow' because only the selected addresses are allowed to interact with the contract.

## Timestamp Dependence (SWC-116)
The miner can manipulate the timestamp of the block

Fortunately the block timestamp doesn't make a significant difference to the transfers requested or the selfdestruct function.

