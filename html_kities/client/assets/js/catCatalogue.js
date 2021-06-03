var colors = Object.values(allColors())
var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var tokenCount; 
var arrayDNA = [];
var j= 0; 
var catBoxFull = '';

$(document).ready(function() {
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(window.abi, "0xcd6fb49aad4d8a65781486e0c2f813cadea3f27b16aa468d56d17d3c0c818fb8", {from: accounts[0]});
    catCatalogue() 
  })
});

 function catCatalogue() {
    contractInstance.methods.totalSupply().call().then(function(res){
      tokenCount = parseInt(res);
      for(var i=0; i<tokenCount; i++){
        kittiesDNA(i);
      }
      setTimeout(renderALL, 3000);
    }) 
    
}

function kittiesDNA(i) {
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
            "birthDate": res[1]
            };
            arrayDNA.push(DNA); 
            console.log(res) 
            createCatBox(DNA.birthDate, DNA)
        })  
}

function createCatBox(id, DNA){
j++
if (j<= tokenCount){
var catBox = `<div class="col-lg-4 catBox m-2 light-b-shadow" id= "catBox`+id+`">
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
        Gen: <span id= "generation`+id+`"></span><br>
        <!--Birth Time: <span id= "birthTime"></span>-->
    </div>
</div>`;
 
 //catBoxFull = catBoxFull.concat(catBox);
 //document.getElementById('1').innerHTML = catBoxFull
 //document.getElementById("1").append(catBox);
 //document.body.innerHTML = `<h1>${catBoxFull} </h1>`
}
catBoxFull = catBoxFull.concat(catBox);
document.getElementById('1').innerHTML = catBoxFull;

}

 function renderALL() {
    for(var i=0; i<tokenCount; i++){ 
        headColor(colors[arrayDNA[i].headcolor],arrayDNA[i].headcolor, arrayDNA[i].birthDate);
        tailColor(colors[arrayDNA[i].mouthcolor],arrayDNA[i].mouthcolor, arrayDNA[i].birthDate)
        eyeColor(colors[arrayDNA[i].eyescolor],arrayDNA[i].eyescolor, arrayDNA[i].birthDate)
        earColor(colors[arrayDNA[i].earscolor],arrayDNA[i].earscolor, arrayDNA[i].birthDate)
        eyeVariation(arrayDNA[i].eyesShape, arrayDNA[i].birthDate)  
        decorationVariation(arrayDNA[i].decorationPattern, arrayDNA[i].birthDate)
        pattern(colors[arrayDNA[i].decorationMidcolor],arrayDNA[i].decorationMidcolor, arrayDNA[i].birthDate)
        pattern2(colors[arrayDNA[i].decorationSidescolor],arrayDNA[i].decorationSidescolor, arrayDNA[i].birthDate)
        animationVariation(arrayDNA[i].animation, arrayDNA[i].birthDate) 
        $(`#momId${arrayDNA[i].birthDate}`).html(arrayDNA[i].motherId)
        $(`#dadId${arrayDNA[i].birthDate}`).html(arrayDNA[i].fatherId)
        $(`#birthTime${arrayDNA[i].birthDate}`).html(arrayDNA[i].birthDate)
        $(`#generation${arrayDNA[i].birthDate}`).html(arrayDNA[i].catGeneration) 
        $(`#dnaspecial${arrayDNA[i].birthDate}`).html(arrayDNA[i].lastNum)
    }
}

