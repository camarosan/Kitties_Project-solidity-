const KittyContract = artifacts.require("KittyContract")
const AssertionError = require('assertion-error');
const truffleAssert = require('truffle-assertions');
const assert = require('assert');

contract(KittyContract, accounts => {
    it(" transferFrom is not possible there is no token 0 ", async () => {
        let kittyContract = await KittyContract.deployed(); 
        await truffleAssert.reverts(
            kittyContract.transferFrom(accounts[0], accounts[1], 0)
        )
    })
    it("transferFrom msg.sender is the current owner", async () => {
        let kittyContract = await KittyContract.deployed();
        await truffleAssert.passes(
            kittyContract.createKittyGen0(1010961011462111)
        )
        await truffleAssert.passes(
            kittyContract.transferFrom(accounts[0], accounts[1], 0)
        )
    })
    it("transferFrom msg.sender is the approved address for token1", async () => {
        let kittyContract = await KittyContract.deployed();
        await truffleAssert.passes(
            kittyContract.createKittyGen0(1186338013672241)
        )
        await truffleAssert.passes(
            kittyContract.approve(accounts[1], 1, {from: accounts[0]} )
        )
        await truffleAssert.passes(
            kittyContract.transferFrom(accounts[0], accounts[2], 1, {from: accounts[1]})
        )
    })
    it("transferFrom msg.sender is an authorized operator address for token2", async() =>{
        let kittyContract = await KittyContract.deployed();
        await truffleAssert.passes(
            kittyContract.createKittyGen0(4622401822749011)
        )
        await truffleAssert.passes(
            kittyContract.setApprovalForAll(accounts[3], true, {from: accounts[0]})
        )
        await truffleAssert.passes(
            kittyContract.transferFrom(accounts[0], accounts[4], 2, {from: accounts[3]})
        )
    })
})