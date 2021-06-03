var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, "0xcd6fb49aad4d8a65781486e0c2f813cadea3f27b16aa468d56d17d3c0c818fb8", {from: accounts[0]});
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

/*function getCats() {
  contractInstance.methods.getKitty(1).call().then(function(res){
    console.log(res);
   /*for (const [key, value] of Object.entries(res)) {
      console.log(`${key}: ${value}`);
    }
})

}*/