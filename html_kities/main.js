var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, "0xc7E8420a2715fB2474963279AD91e57fcE2998e3", {from: accounts[0]});
      console.log(contractInstance);
    });  
});


function createCat() {
  var configDeposit = {value: web3.utils.toWei('0.1', "ether")}
  var DNA = getDna();
  contractInstance.methods.createKittyGen0(DNA).send(configDeposit, function(error, txHash) {
        if(error)
            console.log(error)
        else 
            console.log(txHash)        
  }); 
  contractInstance.once('Birth', function(error, event){ //listener
        if(event) {
            console.log(event)
          alert(`Owner: ${event.returnValues.owner} \nBlockHash: ${event.blockHash} 
          \nblocknumber: ${event.blockNumber} \nContract: ${event.address}
          \nGenes: ${event.returnValues.genes} \nDadID ${event.returnValues.dadId}
          \nMumID ${event.returnValues.mumId} \nKittenID ${event.returnValues.kittenId}`)
        }
        else
            console.log(error)
  });
}
