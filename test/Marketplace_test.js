const KittyContract = artifacts.require("KittyContract");
const Marketplace = artifacts.require("Marketplace");
const assert = require('assert');
const truffleAssert = require('truffle-assertions');

contract(Marketplace, accounts => {
    it(" set and offer and finishing buying a kitty id 0 with account[1]", async () => {
        let marketplace = await Marketplace.deployed();
        let kittyContract = await KittyContract.deployed(); 
        
        await truffleAssert.passes(
            marketplace.setKittyContract('0x8cB77eA82E9aE94f6d965b9fCd827B1a5AE71269')
        )
        
        await truffleAssert.passes(
            await kittyContract.createKittyGen0(1020304050607080, {from: accounts[0]}),
            marketplace.setOffer(10000000,0, {from: accounts[0]}),
            marketplace.buyKitty(0, {from: accounts[1]})
        )
        
    }) 
})
