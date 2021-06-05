var colors = Object.values(allColors())
var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var tokenCount; 
var arrayDNA = [];
var j= 0; 
var catBoxFull = '';
var breedIds =0; 
var catsIds = []; 

$(document).ready(function() {
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(window.abi, "0xc7E8420a2715fB2474963279AD91e57fcE2998e3", {from: accounts[0]});
    catCatalogue() 
  })
});

function catCatalogue() {
    contractInstance.methods.totalSupply().call().then((res)=>{
      tokenCount = parseInt(res);
      for(var i=0; i<tokenCount; i++){
        kittiesDNA(i);
      } 
    })
}

function kittiesDNA(i) { //i is ID from blokchain 
        contractInstance.methods.getKitty(i).call().then(function(res){
          var DNA = {
            headcolor: res[0].slice(0,2),
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
            createCatBox(i)
        })  
}

function createCatBox(id){
j++
    if (j<= tokenCount){
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
            Gen: <span id= "generation`+id+`"></span><br>
            <!--Birth Time: <span id= "birthTime"></span>-->
            <label for="breedCheck" > Breeding</label>
            <input type="checkbox" id="breedCheck`+id+`" onclick="breeding(`+id+`)">
            <p id="breedText`+id+`" style="display:none">CHECKED! `+id+`</p>
        </div>
    </div>`;
    //document.getElementById("1").append(catBox);
    //document.body.innerHTML = `<h1>${catBoxFull} </h1>`
    }
catBoxFull = catBoxFull.concat(catBox);
document.getElementById('1').innerHTML = catBoxFull;
}

 //function renderALL(tokenCount) {
    $('#renderKitties').click(()=>{
    for(var l=0; l<tokenCount; l++){ 
        headColor(colors[arrayDNA[l].headcolor],arrayDNA[l].headcolor, l)
        tailColor(colors[arrayDNA[l].mouthcolor],arrayDNA[l].mouthcolor,l)
        eyeColor(colors[arrayDNA[l].eyescolor],arrayDNA[l].eyescolor, l)
        earColor(colors[arrayDNA[l].earscolor],arrayDNA[l].earscolor, l)
        eyeVariation(arrayDNA[l].eyesShape,l)  
        decorationVariation(arrayDNA[l].decorationPattern, l)
        pattern(colors[arrayDNA[l].decorationMidcolor],arrayDNA[l].decorationMidcolor, l)
        pattern2(colors[arrayDNA[l].decorationSidescolor],arrayDNA[l].decorationSidescolor, l)
        animationVariation(arrayDNA[l].animation, l) 
        $(`#momId${l}`).html(arrayDNA[l].motherId)
        $(`#dadId${l}`).html(arrayDNA[l].fatherId)
        $(`#birthTime${l}`).html(arrayDNA[l].birthDate)
        $(`#generation${l}`).html(arrayDNA[l].catGeneration) 
        $(`#dnaspecial${l}`).html(arrayDNA[l].lastNum)
     }
    })

function breeding(id) {
    var checkBox = document.getElementById(`breedCheck${id}`);
    var text = document.getElementById(`breedText${id}`);
    if (checkBox.checked == true){
        text.style.display = "block";
        breedIds++;
        catsIds.push(id);
    } else {
        text.style.display = "none";
        breedIds--;
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
                breedIds =0;
                array.splice(0, array.length) 
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
        alert("incorrect")
    }
}
