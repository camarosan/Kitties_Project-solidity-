
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthcolor" : 10,
    "eyescolor" : 96,
    "earscolor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 21,
    "decorationSidescolor" : 21,
    "animation" :  1,
    "lastNum" :  1
    };

// when page load the default id cat is now "00"
$( document ).ready(function() {
  $('#dnabody00').html(defaultDNA.headColor);
  $('#dnamouth00').html(defaultDNA.mouthColor);
  $('#dnaeyes00').html(defaultDNA.eyesColor);
  $('#dnaears00').html(defaultDNA.earsColor);
   $('#dnashape00').html(defaultDNA.eyesShape)
   $('#dnadecoration00').html(defaultDNA.decorationPattern)
   $('#dnadecorationMid00').html(defaultDNA.decorationMidcolor)
   $('#dnadecorationSides00').html(defaultDNA.decorationSidescolor)
   $('#dnaanimation00').html(defaultDNA.animation)
   $('#dnaspecial00').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody00').html()
    dna += $('#dnamouth00').html()
    dna += $('#dnaeyes00').html()
    dna += $('#dnaears00').html()
    dna += $('#dnashape00').html()
    dna += $('#dnadecoration00').html()
    dna += $('#dnadecorationMid00').html()
    dna += $('#dnadecorationSides00').html()
    dna += $('#dnaanimation00').html()
    dna += $('#dnaspecial00').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor,'00')
    $('#bodycolor').val(dna.headcolor)
    tailColor(colors[dna.mouthcolor],dna.mouthcolor,'00')
    $('#bodycolor2').val(dna.mouthcolor)
    eyeColor(colors[dna.eyescolor],dna.eyescolor,'00')
    $('#bodycolor3').val(dna.eyescolor)
    earColor(colors[dna.earscolor],dna.earscolor,'00')
    $('#bodycolor4').val(dna.earscolor)
    eyeVariation(dna.eyesShape,'00')
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern,'00')
    $('#decorativepattern').val(dna.decorationPattern)
    pattern(colors[dna.decorationMidcolor],dna.decorationMidcolor,'00')
    $('#patterncolor').val(dna.decorationMidcolor)
    pattern2(colors[dna.decorationSidescolor],dna.decorationSidescolor,'00')
    $('#patterncolor2').val(dna.decorationSidescolor)
    animationVariation(dna.animation,'00')
    $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal, '00')
})

$('#bodycolor2').change(()=>{
  var colorVal = $('#bodycolor2').val()
  tailColor(colors[colorVal],colorVal, '00')
})

$('#bodycolor3').change(()=>{
  var colorVal = $('#bodycolor3').val()
  eyeColor(colors[colorVal],colorVal, '00')
})

$('#bodycolor4').change(()=>{
  var colorVal = $('#bodycolor4').val()
  earColor(colors[colorVal],colorVal,'00')
})

$('#eyeshape').change(()=>{
  var shape =  parseInt($('#eyeshape').val())
  eyeVariation(shape, '00')
})

$('#decorativepattern').change(()=>{
  var decorative =  parseInt($('#decorativepattern').val())
  decorationVariation(decorative, '00')
})

$('#patterncolor').change(()=>{
  var colorVal = $('#patterncolor').val()
  pattern(colors[colorVal],colorVal, '00')
})

$('#pattern2color').change(()=>{
  var colorVal = $('#pattern2color').val()
  pattern2(colors[colorVal],colorVal, '00')
})

$('#animation').change(()=>{
  var animation =  parseInt($('#animation').val())
  animationVariation(animation, '00')
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
    headColor(colors[random],random, '00')
    $('#bodycolor').val(random)
    random = randomNumber()
    tailColor(colors[random],random,'00')
    $('#bodycolor2').val(random)
    random = randomNumber()
    eyeColor(colors[random],random, '00')
    $('#bodycolor3').val(random)
    random = randomNumber()
    earColor(colors[random],random, '00')
    $('#bodycolor4').val(random)
    random = Math.floor(Math.random()*10)%5+1 // 5 options to choose
    parseInt($('#eyeshape').val(random))
    eyeVariation(random, '00')
    random = Math.floor(Math.random()*10)%4+1 // 4 options to choose
    parseInt($('#decorativepattern').val(random))
    decorationVariation(random, '00')
    random = randomNumber()
    pattern(colors[random],random, '00')
    $('#patterncolor').val(random)
    random = randomNumber()
    pattern2(colors[random],random, '00')
    $('#pattern2color').val(random)
    random = Math.floor(Math.random()*10)%4+1
    parseInt($('#animation').val(random))
    animationVariation(random, '00')
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