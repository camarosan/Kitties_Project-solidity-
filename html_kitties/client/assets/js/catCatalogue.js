var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractInstance2;
var tokenCount; 
var tokens  = []; 
var arrayDNA = [];
var j= 0; 
var catBoxFull = '';
var breedIds =0; 
var catsIds = []; 

$(document).ready(function() {
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(window.abi, "0xc7E8420a2715fB2474963279AD91e57fcE2998e3", {from: accounts[0]});
    contractInstance2 = new web3.eth.Contract(window.abi, "0xEa77666bCe97289f19F79215811f97A16b9dC4DE", {from: accounts[0]});
  })
});


$('#allKitties').click(()=>{
    contractInstance.methods.totalSupply().call().then((res)=>{
        tokenCount = parseInt(res);
        for(var i=0; i<tokenCount; i++){
          kittiesDNA(i)
          createCatBox(i, tokenCount,1); 
        }  
      })
      setTimeout(renderKitties,2000);
       
     
})

$('#offerKitties').click(()=>{
    contractInstance2.methods.getAllTokenOnSale().call().then((res)=>{
        tokens = [...res]    
            tokens.map((value)=>{
                 kittiesDNA(value);
                 createCatBox(value,tokens.length);
           })   
           setTimeout(renderKittiesMarket,2000)
       })
})

 function kittiesDNA(i) { // from blokchain 
        contractInstance.methods.getKitty(i).call().then(function(res){
          var DNA = {
            "headcolor": res[0].slice(0,2),
            "mouthcolor": res[0].slice(2,4),
            "eyescolor": res[0].slice(4,6),
            "earscolor": res[0].slice(6,8),
            "eyesShape": parseInt(res[0].slice(8,9)),
            "decorationPattern": parseInt(res[0].slice(9,10)),
            "decorationMidcolor": res[0].slice(10,12),
            "decorationSidescolor": res[0].slice(12,14),
            "animation":  parseInt(res[0].slice(14,15)),
            "lastNum":  res[0].slice(15,16),
            "motherId": res[2],
            "fatherId": res[3],
            "catGeneration": res[4],
            "birthDate": res[1],
            "id": i
            };
            arrayDNA.push(DNA);   
        })  
        
}

function createCatBox(id, count, htmlId){
    j++
    if (htmlId=== 1){
    var catalogue = 
    `<div class="offerDiv">
        <label for="offerInput`+id+`" >Offer for cat ID: ${id}  (1-100 in ETH):</label><br>
        <input type="number" id="offerInput`+id+`"  name="offerInput`+id+`" min="1" max="100">
        <button onclick="catOffer(`+id+`)">Offer</button>
        <label for="breedCheck" > Breeding</label>
        <input type="checkbox" id="breedCheck`+id+`" onclick="breeding(`+id+`)"></input>
        <p id="breedText`+id+`" style="display:none">CHECKED! CAT ID:  `+id+`</p>
    </div>`
    }
    else {
        var catalogue = `<div class="marketDiv">
        <button class ='white-btn'  onclick= "buyCat(`+id+`)">Buy</button>
        <button class ='white-btn'  onclick= "removeOffer(`+id+`)">Remove </button>
        <button class="white-btn" onclick="priceCat(`+id+`)">Price</button>
        <span id="idPrice`+id+`"></span>
        </div>`
    }
    if (j<= count){
    var catBox = 
    `<div class="col-lg-4 catBoxCatalog m-2 light-b-shadow" id= "catBox`+id+`">
        <div class='cat' id= "cat`+id+`">
            <div class= 'ears' id= "ears`+id+`">
                <div class= 'rightear' id="rightear`+id+`">
                    <div class = 'innerear' id="innerear`+id+`"></div>
                </div>
                <div class= 'leftear' id="leftear`+id+`">
                    <div class= 'innerear id=`+id+`'></div>
                </div>
            </div>
            <div class= 'head' id= "head`+id+`">
                <div class= 'front' id= "front`+id+`"></div>
                <div class= 'nouse' id="nouse`+id+`"></div>
                <div class= 'eyes' id= "eyes`+id+`">
                    <div class = 'eye' id="eye`+id+`">
                        <div class = 'pupil'  id="pupil`+id+`"></div>
                        <div class= 'intoeye' id= "intoeye`+id+`"></div>
                    </div>
                    <div class = 'eye2' id="eye2`+id+`">
                        <div class = 'pupil' id= "pupil`+id+`"></div>
                        <div class= 'intoeye' id= "intoeye`+id+`"></div>
                    </div>
                </div>
                <div class= 'mouth' id="mouth`+id+`">
                    <div class= 'tongue' id= "tongue`+id+`"></div>
                </div>  
                <div class ='whiskergroup1' id= "whiskergroup1`+id+`">
                    <div class= 'whisker' id= "whisker`+id+`"></div>
                    <div class= 'whisker2' id= "whisker2`+id+`"></div>
                    <div class= 'whisker3' id= "whisker3`+id+`"></div>
                </div>
                <div class ='whiskergroup2' id="whiskergroup2`+id+`">
                    <div class= 'whisker4' id="whisker4`+id+`"></div>
                    <div class= 'whisker5' id= "whisker5`+id+`"></div>
                    <div class= 'whisker6' id= "whisker6`+id+`"></div>
                </div>
            </div>
            <div class = 'tail' id="tail`+id+`">
                <div class= 'intotail' id="intotail`+id+`"></div>
            </div>
            <div class = 'neck' id="neck`+id+`"></div>
            <div class= 'body' id="body`+id+`">                           
                <div class = 'belly' id="belly`+id+`"> </div>
                <div class = 'legs' id="legs`+id+`">
                    <div class = 'rightleg' id="rightleg`+id+`"></div>
                    <div class = 'leftleg' id="leftleg`+id+`"></div>
                </div>
            </div>      
        </div>
        <br>
        <div class="dnaDiv" id="catDNA">
            DNA:
            <!-- Colors -->
            <span id="dnabody`+id+`"></span>
            <span id="dnamouth`+id+`"></span>   
            <span id="dnaeyes`+id+`"></span>
            <span id="dnaears`+id+`"></span>
            <!-- Cattributes -->
            <span id="dnashape`+id+`"></span>
            <span id="dnadecoration`+id+`"></span>
            <span id="dnadecorationMid`+id+`"></span>
            <span id="dnadecorationSides`+id+`"></span>
            <span id="dnaanimation`+id+`"></span>
            <span id="dnaspecial`+id+`"></span>
        </div>   
        <div class="dnaDiv" id="catStatistics">
        <br>    
            Mom ID: <span id= "momId`+id+`"></span>
            Dad ID: <span id= "dadId`+id+`"></span>
            Cat ID: `+id+`
            Gen: <span id= "generation`+id+`"></span><br>
            <!--Birth Time: <span id= "birthTime"></span>-->
        </div>
        `+catalogue+`
    </div>`;
    //document.getElementById("1").append(catBox);
    //document.body.innerHTML = `<h1>${catBoxFull} </h1>`
    }
catBoxFull = catBoxFull.concat(catBox);
//document.getElementById(htmlId).innerHTML = catBoxFull;
}

  function render(l){
    headColor(colors[arrayDNA[l].headcolor],arrayDNA[l].headcolor, arrayDNA[l].id)
    tailColor(colors[arrayDNA[l].mouthcolor],arrayDNA[l].mouthcolor,arrayDNA[l].id)
    eyeColor(colors[arrayDNA[l].eyescolor],arrayDNA[l].eyescolor, arrayDNA[l].id)
    earColor(colors[arrayDNA[l].earscolor],arrayDNA[l].earscolor, arrayDNA[l].id)
    eyeVariation(arrayDNA[l].eyesShape,arrayDNA[l].id)  
    decorationVariation(arrayDNA[l].decorationPattern, arrayDNA[l].id)
    pattern(colors[arrayDNA[l].decorationMidcolor],arrayDNA[l].decorationMidcolor, arrayDNA[l].id)
    pattern2(colors[arrayDNA[l].decorationSidescolor],arrayDNA[l].decorationSidescolor, arrayDNA[l].id)
    animationVariation(arrayDNA[l].animation, arrayDNA[l].id) 
    $(`#momId${arrayDNA[l].id}`).html(arrayDNA[l].motherId)
    $(`#dadId${arrayDNA[l].id}`).html(arrayDNA[l].fatherId)
    $(`#birthTime${arrayDNA[l].id}`).html(arrayDNA[l].birthDate)
    $(`#generation${arrayDNA[l].id}`).html(arrayDNA[l].catGeneration) 
    $(`#dnaspecial${arrayDNA[l].id}`).html(arrayDNA[l].lastNum)
  }

    async function renderKitties() {
    document.getElementById('1').innerHTML = catBoxFull; //  1 htmlId 
    for(var l=0; l<tokenCount; l++){ 
        render(l);
     } 
  }

    function renderKittiesMarket() {
        document.getElementById('2').innerHTML = catBoxFull; //  2 htmlId 
        for(var l=0; l<= tokens.length; l++){
            render(l);
        }
    }
    
// breeding  functions 
function breeding(id) { 
    var checkBox = document.getElementById(`breedCheck${id}`);
    var text = document.getElementById(`breedText${id}`);
    if (checkBox.checked == true){
        text.style.display = "block";
        breedIds++;
        catsIds.push(id);
    } 
    else {
        text.style.display = "none";
        breedIds--;
        for( var i = 0; i < catsIds.length; i++){ 
            if ( catsIds[i] === id) { 
                catsIds.splice(i); 
            }
        }
    }
}

function breedingKitties () {
    if (breedIds=== 2){ 
        contractInstance.methods.breed(catsIds[0], catsIds[1]).send(function(error, txHash) {
            if(error){
                console.log(error)
                breedIds =0;
                array.splice(0, array.length)
            }
            else {
                console.log(txHash)   
            }    
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
    else {
        alert("incorrect you must select two cats")
    }
}

// Market functions 
function catOffer(id) {
    var offer = String(document.getElementById(`offerInput${id}`).value);
    offer = web3.utils.toWei(offer);
    console.log(offer); 
    contractInstance2.methods.setOffer(offer,id).send((error,txHash)=>{
        if(error){
            console.log(error)
            alert("You cannot offer you are not the cat owner or there is an offer now")
        }
        else {
            console.log(txHash)   
        }    
    });   
}

function buyCat(catId) {
    contractInstance2.methods.getOffer(catId).call().then((res)=>{
        console.log(res.price);
        var configETH = {value: web3.utils.toWei(res.price, "wei")}
        contractInstance2.methods.buyKitty(catId).send(configETH);            
    })
}

function priceCat(catId){
    contractInstance2.methods.getOffer(catId).call().then((res)=>{
        console.log(typeof(res.price));
        var valueETH= res.price.slice(0,-18);
        $(`#idPrice${catId}`).html(valueETH+" ether");
    })
}

function removeOffer(catId) {
    contractInstance2.methods.removeOffer(catId).send(function(error, txHash) {
        if(error){
            console.log(error)
            alert("Error to remove you are not the owner")
        }
        else {
            console.log(txHash)   
        }    
    }); 

}