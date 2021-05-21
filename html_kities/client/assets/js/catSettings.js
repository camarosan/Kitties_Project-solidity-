
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthcolor" : 10,
    "eyescolor" : 96,
    "earscolor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 46,
    "decorationSidescolor" : 21,
    "animation" :  1,
    "lastNum" :  1
    };

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
   $('#dnashape').html(defaultDNA.eyesShape)
   $('#dnadecoration').html(defaultDNA.decorationPattern)
   $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
   $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
   $('#dnaanimation').html(defaultDNA.animation)
   $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    console.log(dna.headcolor)
    tailColor(colors[dna.mouthcolor],dna.mouthcolor)
    $('#bodycolor2').val(dna.mouthcolor)
    eyeColor(colors[dna.eyescolor],dna.eyescolor)
    $('#bodycolor3').val(dna.eyescolor)
    earColor(colors[dna.earscolor],dna.earscolor)
    $('#bodycolor4').val(dna.earscolor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decorativepattern').val(dna.decorationPattern)
    pattern(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    $('#patterncolor').val(dna.decorationMidcolor)
    pattern2(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#patterncolor2').val(dna.decorationSidescolor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#bodycolor2').change(()=>{
  var colorVal = $('#bodycolor2').val()
  tailColor(colors[colorVal],colorVal)
})

$('#bodycolor3').change(()=>{
  var colorVal = $('#bodycolor3').val()
  eyeColor(colors[colorVal],colorVal)
})

$('#bodycolor4').change(()=>{
  var colorVal = $('#bodycolor4').val()
  earColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape =  parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

$('#decorativepattern').change(()=>{
  var decorative =  parseInt($('#decorativepattern').val())
  decorationVariation(decorative)
})

$('#patterncolor').change(()=>{
  var colorVal = $('#patterncolor').val()
  pattern(colors[colorVal],colorVal)
})

$('#pattern2color').change(()=>{
  var colorVal = $('#pattern2color').val()
  pattern2(colors[colorVal],colorVal)
})

$('#animation').change(()=>{
  var animation =  parseInt($('#animation').val())
  animationVariation(animation)
})

// to reload default cat 
$('#defaultCat').click(()=>{
  renderCat(defaultDNA)
})

// for random cats
function randomNumber() {
  let random = Math.floor(Math.random()*100)
    if (random == 0) {
    random = 10
    }
    else if (random < 10){
      random = random*10
    }
    else if (random > 98) {
      random = random -2
    }
    return random 
}

$('#randomCat').click(()=>{
    let random = randomNumber()
    headColor(colors[random],random)
    $('#bodycolor').val(random)
    random = randomNumber()
    tailColor(colors[random],random)
    $('#bodycolor2').val(random)
    random = randomNumber()
    eyeColor(colors[random],random)
    $('#bodycolor3').val(random)
    random = randomNumber()
    earColor(colors[random],random)
    $('#bodycolor4').val(random)
    random = Math.floor(Math.random()*10)%5+1 // 5 options to choose
    parseInt($('#eyeshape').val(random))
    eyeVariation(random)
    random = Math.floor(Math.random()*10)%4+1 // 4 options to choose
    parseInt($('#decorativepattern').val(random))
    decorationVariation(random)
    random = randomNumber()
    pattern(colors[random],random)
    $('#patterncolor').val(random)
    random = randomNumber()
    pattern2(colors[random],random)
    $('#pattern2color').val(random)
    random = Math.floor(Math.random()*10)%4+1
    parseInt($('#animation').val(random))
    animationVariation(random)
})


// for tabs to change from color or attributes
function openTab(colorAttribute) {
  var i;
  var x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(colorAttribute).style.display = "block";  
}