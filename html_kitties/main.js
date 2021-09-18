var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, "0xEB4fD5C653dB98DF4830065F7b61557994a5EF47", {from: accounts[0]});
    });  
});


function createCat() {
  var configDeposit = {value: web3.utils.toWei('0.01', "ether")}// not used it
  var DNA = getDna();
  contractInstance.methods.createKittyGen0(DNA).send(function(error, txHash) {
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

