const { assert } = require("console");

const { expectRevert, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');

const Wallet = artifacts.require('Wallet.sol');

contract('Wallet', (accounts) => {

    it('Should be deployed', async () => {
        const wallet = await Wallet.deployed();
        assert(wallet.address !== '');
    });

    contract('Contract has an Owner', async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
        });

        it('Accounts[0] is contract Owner', async () => {
            const owner = await wallet.owner();
            assert(owner === accounts[0]);
        });
    });

    contract('Only Owner can change contract pausation', async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
            wallet.toggleContractActive({from: accounts[0]});
        });
    
        it('Only Owner can toggle pausation', async () => {
            await expectRevert(
                wallet.toggleContractActive({from: accounts[3]}), 
                "Ownable: caller is not the owner"
            );
        });
    });

    contract("Before 16 years have passed", async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
        });

        it('Caller is not the Beneficiary.', async () => {
            await expectRevert(
                wallet.createTransfer(888, accounts[3], {from: accounts[0]}), 
                'You are not the Beneficiary of this contract!'
            );
        });

        it('Beneficiary is not 16 years old.', async () => {
            await expectRevert(
                wallet.createTransfer(888, accounts[3], {from: accounts[3]}), 'Beneficiary is not 16 years old.'
            );
        });

        it('Contract is paused.', async () => {
            wallet.toggleContractActive({from: accounts[0]});
            await expectRevert(
                wallet.createTransfer(888, accounts[3], {from: accounts[3]}), 'This contract is currently stopped'
            );
        });

        it('Cannot selfdestruct yet, not 18 years old', async () => {
            await expectRevert(
                wallet.closeWallet({from: accounts[3]}), 'Beneficiary is not 18 years old.'
            );
        });
        
        it('Cannot selfdestruct, Caller is not Beneficiary', async () => {
            await expectRevert(
                wallet.closeWallet({from: accounts[0]}), 'You are not the Beneficiary of this contract!'
            );
        });

    });

    contract("16 Years later", async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
            await time.increase(time.duration.weeks(836));
        });
        it('Beneficiary can create transfer', async () => {
           await wallet.createTransfer(999, accounts[3], {from: accounts[3]});
           const transfer = await wallet.transfers(0);
           assert(transfer.id.toNumber() === 0);
        });

        it('Beneficiary transfer request approved and sent', async () => {
           const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[3]));
           await wallet.createTransfer(888, accounts[3], {from: accounts[3]});
           await wallet.approveTransfer(0, {from: accounts[0]});
           await wallet.approveTransfer(0, {from: accounts[1]});
           const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[3]));
           assert(balanceAfter.sub(balanceBefore).toNumber() ===  888);
        });
    });

    contract("After 17 years have passed", async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
            await time.increase(time.duration.weeks(887));
        });

        it('Beneficiary transfer did not send, not enough approvals', async () => { 
            const toBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[3]));
            await wallet.createTransfer(999, accounts[3], {from: accounts[3]});
            await wallet.approveTransfer(0, {from: accounts[0]});
            const toBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[3]));
            assert(toBalanceAfter.sub(toBalanceBefore).toNumber() === 999); 
        });
    });  

    contract("After 18 years have passed", async () => {
        beforeEach(async () => {
            wallet = await Wallet.deployed();
            await time.increase(time.duration.weeks(940));
        });

        it('Not the Beneficiary.', async () => {
            await expectRevert(
                wallet.closeWallet({from: accounts[1]}), "You are not the Beneficiary of this contract!"
            );
        });

        it('Selfdestruct wallet', async () => {
            const beneficiaryBalanceBefore = web3.utils.fromWei(await web3.eth.getBalance(accounts[3]));
            const walletBalanceBefore = web3.utils.fromWei(await web3.eth.getBalance(wallet.address));
            await wallet.closeWallet({from: accounts[3]});
            const beneficiaryBalanceAfter = web3.utils.fromWei(await web3.eth.getBalance(accounts[3]));
            assert(beneficiaryBalanceAfter.sub(beneficiaryBalanceBefore) === walletBalanceBefore);
        })
    });
    
});


