
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor(color,code, id) { // Rewrite all  to work with HTML Ids ant not classes
    $(`#head${id}, #body${id}`).css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnabody${id}`).html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function tailColor(color,code, id) {
    $(`#tail${id}`).css('background', '#' + color)  
    $('#tailcode').html('code: '+code) 
    $(`#dnamouth${id}`).html(code) 
}

function eyeColor(color,code, id) {
    $(`#pupil${id}, #pupil${id} `).css('background', '#' + color)  
    $('#eyecode').html('code: '+code) 
    $(`#dnaeyes${id}`).html(code) 
}

function earColor(color,code, id) {
    $(`#rightear${id},#leftear${id}`).css('background', '#' + color) 
    $('#earcode').html('code: '+code) 
    $(`#dnaears${id}`).html(code) 
}

function pattern(color,code, id) {
    $(`#front${id}`).css('background', '#' + color)  
    $('#patterncolorcode').html('code: '+code) 
    $(`#dnadecorationMid${id}`).html(code) 
}

function pattern2(color,code, id) {
    $(`#rightleg${id}, #leftleg${id}, #neck${id}`).css('background', '#' + color)  
    $('#pattern2colorcode').html('code: '+code) 
    $(`#dnadecorationSides${id}`).html(code) 
}

function eyeVariation(num, id) { // rewrite to if from switch
    $(`#dnashape${id}`).html(num)
    if (num === 1) {
        $('#eyeshapecode').html('center')
        eyesType(id)
    }
    else if(num=== 2) {
        eyesType(id)
        $('#eyeshapecode').html('below')
        eyesType1(id)
    }
    else if(num=== 3) {
        eyesType(id)
        $('#eyeshapecode').html('under')
        eyesType2(id)
    }
    else if(num=== 4) {
        eyesType(id)
        $('#eyeshapecode').html('right')
        eyesType3(id)
    }
    else if(num=== 5) {
        eyesType(id)
        $('#eyeshapecode').html('left')
        eyesType4(id)
    }
}

function decorationVariation (num, id){
    $(`#dnadecoration${id}`).html(num)
    if(num === 1) {
        $('#decorativecode').html('Basic')
        normalDecoration(id)
    }
    else if(num === 2){
        normalDecoration(id)
        $('#decorativecode').html('Variation1')
        decoration(id)
    }
    else if(num === 3){
        normalDecoration(id)
        $('#decorativecode').html('Variation2')
        decoration2(id)
    }
    else if(num === 4){
        normalDecoration(id)
        $('#decorativecode').html('Variation3')
        decoration3(id)
    }
}

function animationVariation(num, id){
    $(`#dnaanimation${id}`).html(num)
    if(num === 1){
        $('#animationcode').html('Legs Animation')
        animation1(id)
    }
    if(num === 2){
        $('#animationcode').html('Tail Animation')
        animation2(id)
    }
    if(num === 3){
        $('#animationcode').html('Head Animation')
        animation3(id)
    }
    if(num === 4){
        $('#animationcode').html('ears Animation')
        animation4(id)
    }

}
 
function eyesType(id) {
     $(`#pupil${id}, #pupil${id}`).css('transform', 'translate(9%, 9%)')
}

function eyesType1(id) {
    $(`#pupil${id}, #pupil${id}`).css('transform', 'translate(7%, 18%)')
}

function eyesType2(id) {
    $(`#pupil${id}, #pupil${id}`).css('transform', 'translate(7%, 0%)')
}

function eyesType3(id) {
    $(`#pupil${id}, #pupil${id}`).css('transform', 'translate(17%, 9%)')
}

function eyesType4(id) {
    $(`#pupil${id}, #pupil${id}`).css('transform', 'translate(0%, 9%)')
}

function normalDecoration(id){
$(`#front${id}`).css({'transform': 'translate(90%, 0%)',
    "height": "50px",
    "width": "80px",
    "border-radius": "0 0 18px 46px"})
}

function decoration(id) {
    $(`#front${id}`).css({ "height": "100px", "width": "104px", "border-radius": "70px 150px 150px 250px"})
}

function decoration2(id) {
    $(`#front${id}`).css({"height": "156px", "width": "78px", "border-radius": "6px 34px 18px 46px"})
}

function decoration3(id){
    $(`#front${id}`).css({"transform": "translate(26%, 113%)",
        "height": "73px",
        "width": "146px",
        "border-radius": "100px 100px 58px 58px"})
}

function noanimation(id){
    $(`#legs${id}`).removeClass("movingLegs")
    $(`#tail${id}`).removeClass('movingTail')
    $(`#head${id}`).removeClass("movingLegs")
    $(`#ears${id}`).removeClass("movingTail")
}

function animation1(id){
    noanimation(id)
    $(`#legs${id}`).addClass("movingLegs")
}

function animation2(id){
    noanimation(id)
    $(`#tail${id}`).addClass('movingTail')
}

function animation3(id){
    noanimation(id)
    $(`#head${id}`).addClass("movingLegs")
}

function animation4(id){
    noanimation(id)
    $(`#ears${id}`).addClass("movingTail")
}