
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

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.head, .body').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function tailColor(color,code) {
    $(' .body, .tail').css('background', '#' + color)  
    $('#tailcode').html('code: '+code) 
    $('#dnamouth').html(code) 
}

function eyeColor(color,code) {
    $('.pupil').css('background', '#' + color)  
    $('#eyecode').html('code: '+code) 
    $('#dnaeyes').html(code) 
}

function earColor(color,code) {
    $('.rightear,.leftear').css('background', '#' + color)  
    $('#earcode').html('code: '+code) 
    $('#dnaears').html(code) 
}

function pattern(color,code) {
    $('.front').css('background', '#' + color)  
    $('#patterncolorcode').html('code: '+code) 
    $('#dnadecorationMid').html(code) 
}

function pattern2(color,code) {
    $('.rightleg, .leftleg, .neck').css('background', '#' + color)  
    $('#pattern2colorcode').html('code: '+code) 
    $('#dnadecorationSides').html(code) 
}
//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)

    switch (num) {
        case 1:
            $('#eyeshapecode').html('center')
            return eyesType()
        case 2: 
            //normalEyes()
            $('#eyeshapecode').html('below')
            return eyesType1()
        case 3: 
            //normalEyes()
            $('#eyeshapecode').html('under')
            return eyesType2()
        case 4: 
            //normalEyes()
            $('#eyeshapecode').html('right')
            return eyesType3()
        case 5: 
            //normalEyes()
            $('#eyeshapecode').html('left')
            return eyesType4()

    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normalDecoration()
            $('#decorativecode').html('Basic')
            return normalDecoration()
        case 2: 
            normalDecoration()
            $('#decorativecode').html('Variation1')
            return decoration()
        case 3: 
            normalDecoration()
            $('#decorativecode').html('Variation2')
            return decoration2()
        case 4: 
            normalDecoration()
            $('#decorativecode').html('Variation3')
            return decoration3()
    }
}

function animationVariation(num){
    $('#dnaanimation').html(num)
    switch(num) {
        case 1:
        $('#animationcode').html('Legs Animation')
        return animation1()
        case 2:
        $('#animationcode').html('Tail Animation')
        return animation2()
        case 3:
        $('#animationcode').html('Head Animation')
        return animation3()
        case 4:
        $('#animationcode').html('ears Animation')
        return animation4()
    }
}

/*async function normalEyes() {//prototype
    await $('.eye').find('span').css('border', 'none')
}*/
 

 function eyesType() {
     $('.pupil').css('transform', 'translate(9%, 9%)')
 }
 function eyesType1() {
    $('.pupil').css('transform', 'translate(7%, 18%)')
}

function eyesType2() {
    $('.pupil').css('transform', 'translate(7%, 0%)')
}

function eyesType3() {
    $('.pupil').css('transform', 'translate(17%, 9%)')
}

function eyesType4() {
    $('.pupil').css('transform', 'translate(0%, 9%)')
}


/*async function normaldecoration() {//prototype
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}*/

function normalDecoration(){
$('.front').css({'transform': 'translate(90%, 0%)',
    "height": "50px",
    "width": "80px",
    "border-radius": "0 0 18px 46px"})
}

function decoration() {
    $('.front').css({ "height": "100px", "width": "104px", "border-radius": "70px 150px 150px 250px"})
}

function decoration2() {
    $('.front').css({"height": "156px", "width": "78px", "border-radius": "6px 34px 18px 46px"})
}

function decoration3(){
    $('.front').css({"transform": "translate(26%, 113%)",
        "height": "73px",
        "width": "146px",
        "border-radius": "100px 100px 58px 58px"})
}

function noanimation(){
    $('.legs').removeClass("movingLegs")
    $('.tail').removeClass('movingTail')
    $('.head').removeClass("movingLegs")
    $('.ears').removeClass("movingTail")
}

function animation1(){
    noanimation()
    $('.legs').addClass("movingLegs")
}

function animation2(){
    noanimation()
    $('.tail').addClass('movingTail')
}

function animation3(){
    noanimation()
    $('.head').addClass("movingLegs")
}

function animation4(){
    noanimation()
    $('.ears').addClass("movingTail")
}