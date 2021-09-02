import './App.css';
import React, {Component} from 'react'
import Header from './Components/Header'
import './css/cats.css'
import './css/factory.css'
import './css/colors.css'
import './bootstrap/css/bootstrap.min.css'
import {allColors} from './js/colors.js';
import { motion } from "framer-motion";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      earsStyle : {},
      headBodyStyle : {},
      tailStyle: {},
      eyestyle: {},
      frontStyle: {},
      pattern: {},
      isAnimated: [] , 
      hideColors: true,
      hideAttributtes: false,
      DNA: {}
    }
    this.changeColorPattern = this.changeColorPattern.bind(this)
    this.changeAnimation = this.changeAnimation.bind(this)
    this.showHideColorsAttributes = this.showHideColorsAttributes.bind(this)
    this.showDefaultKitty = this.showDefaultKitty.bind(this)
    this.randomKitty = this.randomKitty.bind(this)
  }

  componentDidMount() {
    this.defaultKitty()
  }
  
  colors= Object.values(allColors())

  changeColorPattern = (e) => {
    this.colorPattern(e.target.value, e.target.id)
  }

  colorPattern = (value, id) => {
    console.log(typeof(value))
    if(id=== 'tailColor'){
      this.setState({
        tailStyle: {...this.state.tailStyle, backgroundColor: this.colors[value]},
        DNA: {...this.state.DNA, 'tailColor': value}
      })
    }
    else if(id=== 'earColor') {
      this.setState({
        earsStyle: {...this.state.earsStyle, backgroundColor: this.colors[value]},
        DNA: {...this.state.DNA, 'earColor': value}
      })
    }
    else if(id=== 'headBodyColor') {
      this.setState({
        headBodyStyle: {...this.state.headBodyStyle, backgroundColor: this.colors[value]},
        DNA: {...this.state.DNA, 'headColor': value}
      })
    }
    else if(id=== 'eyeColor') {
      this.setState({
        eyestyle : {...this.state.eyestyle, backgroundColor: this.colors[value]},
        DNA: {...this.state.DNA, 'eyeColor': value}
      })
    }
    else if (id=== 'eyeshape') {
      let translate; 
      if(value==='1'){translate= 'translate(9%, 9%)'}
      else if(value === '2'){translate= 'translate(7%, 18%)'}
      else if(value==='3'){translate= 'translate(7%, 0%)'}
      else if(value==='4'){translate= 'translate(17%, 9%)'}
      else if(value==='5'){translate= 'translate(0%, 9%)'}
     this.setState({
      eyestyle : {...this.state.eyestyle, transform: translate},
      DNA: {...this.state.DNA, 'eyeDirection': value}
     })
    }
    else if(id=== 'decorativepattern') {
      let decorative;
      if(value==='1'){decorative= {transform: 'translate(90%, 0%)',
      height: "50px",width: "80px",borderRadius: "0 0 18px 46px"}
      }
      else if(value === '2'){decorative = {height: "100px", 
      width: "104px", borderRadius: "70px 150px 150px 250px"}
      }
      else if(value==='3'){decorative= {height: "156px", 
      "width": "78px", "borderRadius": "6px 34px 18px 46px"}
      }
      else if(value==='4'){decorative= {transform: "translate(26%, 113%)",
      height: "73px",width: "146px",borderRadius: "100px 100px 58px 58px"}
      }
      this.setState({
        frontStyle : {...this.state.frontStyle,height : decorative['height'], 
        width: decorative['width'], borderRadius:  decorative['borderRadius'], transform: decorative['transform'] },
        DNA: {...this.state.DNA, 'patternDecorative': value}
      })
    }
    else if (id=== 'patterncolor') {
      this.setState({
        frontStyle: {...this.state.frontStyle, backgroundColor: this.colors[value]},
        DNA: {...this.state.DNA, 'patternDecorativeColor': value}
      })
    }
    else if (id=== 'pattern2color') {
      this.setState({
        pattern: {...this.state.pattern, backgroundColor: this.colors[value] },
        DNA: {...this.state.DNA, 'patterncolor': value}
      })
    }
  }

  changeAnimation =  (e) =>{
    let value = e.target.value
    this.animation(value)
  }

  animation = (value) => {
    let animationValue;
    let temp_isAnimated = this.state.isAnimated.map((boolean)=>{
      return boolean = false
    })
    let temp_element= { ...temp_isAnimated[value]};
    temp_element = true
    temp_isAnimated[value] = temp_element

    if (temp_isAnimated[0]) {animationValue = 0}
    else if  (temp_isAnimated[1]) {animationValue = 1}
    else if  (temp_isAnimated[2]) {animationValue = 2}
    else {animationValue=3}

    this.setState({
      isAnimated:  temp_isAnimated,
      DNA : {...this.state.DNA, 'animation': animationValue}
     })
  }
   
  showHideColorsAttributes(e)  {
     e.preventDefault() 
     e.target.id=== 'hideAttributtes' ? 
      this.setState({
        hideAttributtes: !this.state.hideAttributtes,
        hideColors: false
        }) : 
        this.setState({
          hideAttributtes: false,
          hideColors: !this.state.hideColors
        })
  }

  showDefaultKitty(e) {
    e.preventDefault()
    this.defaultKitty();
  } 

  defaultKitty=()=> { 
    this.setState({
      earsStyle : {backgroundColor: '#4c858b'},
      headBodyStyle : {backgroundColor: '#4c858b'},
      tailStyle: {backgroundColor: '#4c858b'},
      eyestyle: {backgroundColor: '#4a3c95'},
      frontStyle: {'transform': 'translate(90%, 0%)',
      "height": "50px",
      "width": "80px",
      "borderRadius": "0 0 18px 46px",
      "backgroundColor": '#344867'},
      pattern: {backgroundColor: '#482916'},
      isAnimated: [true,false,false,false] , 
      hideColors: true,
      hideAttributtes: false,
      DNA: {
        'headColor' : 14,
        'tailColor' : 14,
        'eyeColor'  : 20,
        'earColor'  : 14,
        'eyeDirection' : 1,
        'patternDecorative' : 1,
        'patterncolor' : 21,
        'patternDecorativeColor' :98,
        'animation' : 0
      }
    })     
  }
  
  randomKitty = async (e) => { 
    e.preventDefault()
    let randomValue;
    let colors = ['headBodyColor','tailColor','eyeColor','earColor', 'patterncolor', 'pattern2color']
    for await (let color of  colors ) {
      randomValue =this.randomNumber()
      this.colorPattern(String(randomValue), color)
    }
    randomValue =  Math.floor(Math.random()*10)%5+1 // 5 options to choose 1-5
    await this.colorPattern(String(randomValue), 'eyeshape')
    randomValue = Math.floor(Math.random()*10)%4+1 // 4 options to choose 1-4
    await this.colorPattern(String(randomValue), 'decorativepattern')
    randomValue = Math.floor(Math.random()*10)%4 // 3 options including 0  -3
    await this.animation(randomValue)
  }

   randomNumber =()=>{ //from 10 to 98
    let random = Math.floor(Math.random()*100)
      if (random === 0) {random = 10}
      else if (random < 10){random = random*10}
      else if (random > 98) {random = random -2}
      return random 
  }


  render(){   
    let headAnimation = this.state.isAnimated[0] ? [10,0,-10,0,10] : [0,0]
    let earsAnimation = this.state.isAnimated[1] ? [-6,0,-6,0,6,0,-6] : [0,0]
    let tailAnimation = this.state.isAnimated[2] ? [45, 0, -45] : [0,0]
    let legsAnimation = this.state.isAnimated[3] ? [10,0,-10,0,10] : [0,0]

    return (
      <div className="App">
       <Header></Header> 
        <div className="container p-5"   id= 'Kitties-Factory'>
                  <h1>Kitties-Factory</h1>
                  <p>Create your custom Kitty</p>
                    <div className="col-lg-4 catBox light-b-shadow " >
                      <div className='cat' id='cat00'>
                        <motion.div className= 'ears'  id= 'ears00'
                         animate={{ skewX: [...earsAnimation]}}
                         transition={{delay:0, duration: 5, repeat: Infinity }}
                        >
                            <div className= 'rightear' id= 'rightear00' style={this.state.earsStyle}>
                                <div className = 'innerear' id='innerear00' ></div>
                            </div>
                            <div className= 'leftear' id= 'leftear00' style={this.state.earsStyle}>
                                <div className= 'innerear' id ='innerear00'></div>
                            </div>
                        </motion.div>
                        <motion.div className= 'head' id='head00' style= {this.state.headBodyStyle}
                          animate={{rotate : [...headAnimation] }}
                          transition={{delay:0, duration: 5, repeat:Infinity}}
                        >   
                          <div className= 'front' id='front00' style = {this.state.frontStyle}></div>
                            <div className= 'nouse' id='nouse00'></div>
                            <div className= 'eyes' id='eyes00' >
                              <div className = 'eye' id='eye00'>
                              <div className = 'pupil' id='pupil00' style={this.state.eyestyle} ></div>
                              <div className= 'intoeye' id='intoeye00' ></div>
                            </div>
                              <div className = 'eye2' id= 'eye200'>
                              <div className = 'pupil' id='pupil00' style={this.state.eyestyle}></div>
                              <div className= 'intoeye' id='intoeye00'></div>
                            </div>
                          </div>
                          <div className= 'mouth' id='mouth00'>
                            <div className= 'tongue' id='tongue00'></div>
                          </div>  
                          <div className ='whiskergroup1' id='whiskergroup100'>
                            <div className= 'whisker' id='whisker00'></div>
                            <div className= 'whisker2' id='whisker200' ></div>
                            <div className= 'whisker3' id='whisker300'></div>
                          </div>
                          <div className ='whiskergroup2' id='whiskergroup200'>
                            <div className= 'whisker4' id='whisker400'></div>
                            <div className= 'whisker5' id='whisker500'></div>
                            <div className= 'whisker6' id='whisker600' ></div>
                          </div>
                        </motion.div>
                        <motion.div className='tail' id='tail00' style={this.state.tailStyle}
                          animate={{rotateX: [...tailAnimation ]}}
                          transition={{delay:0, duration: 5, repeat:Infinity}}
                        >
                          <div className= 'intotail' id='intotail00' ></div>
                        </motion.div>
                        <div className = 'neck' id='neck00' style= {this.state.pattern}></div>
                        <div className= 'body' id='body00' style= {this.state.headBodyStyle}>                           
                            <div className = 'belly' id='belly00'> </div>
                              <motion.div 
                                className="legs" id='legs00'
                                animate={{rotate : [...legsAnimation] }}
                                transition={{delay:0, duration: 5, repeat:Infinity}}
                                >
                                <div className = 'rightleg' id='rightleg00' style= {this.state.pattern}></div>
                                <div className = 'leftleg' id='leftleg00'style= {this.state.pattern}></div>
                              </motion.div>
                        </div> 
                        <div className="dnaDiv" id="catDNA">
                          DNA:
                          <b>
                            {/*Colors*/}
                            <span id="dnahead00">{this.state.DNA['headColor']}</span>
                            <span id="dnatail00">{this.state.DNA['tailColor']}</span>
                            <span id="dnaeyes00">{this.state.DNA['eyeColor']}</span>
                            <span id="dnaears00">{this.state.DNA['earColor']}</span>
                            {/*Attributtes*/}
                            <span id="dnaeyeorientation00">{this.state.DNA['eyeDirection']}</span>
                            <span id="dnadecoration00">{this.state.DNA['patternDecorative']}</span>
                            <span id="dnadecorationMid00">{this.state.DNA['patternDecorativeColor']}</span>
                            <span id="dnadecorationSides00">{this.state.DNA['patterncolor']}</span>
                            <span id="dnaanimation00">{this.state.DNA['animation']}</span>
                            <span id="dnaspecial00"></span>
                          </b>
                        </div>   
                        
                      </div>
                    </div>
                    <div className="col-lg-7 cattributes m-2 light-b-shadow">
                          <div>
                            <button className="white-btn" id= "hideColors" onClick={this.showHideColorsAttributes}>Colors</button>
                            <button className="white-btn" id= "hideAttributtes"onClick={this.showHideColorsAttributes}>Attributes</button>
                            <button className = 'white-btn' >Create your Kitty</button>
                            <button className="white-btn" id='defaultCat' onClick= {this.showDefaultKitty}>Default Kitty </button>
                            <button className="white-btn" id='randomCat' onClick= {this.randomKitty}>Random Kitty</button>
                          </div> 
                      {this.state.hideColors ?
                      <div id="catColors" >
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Head and body</b><span className="badge badge-dark ml-2" id="headcode" >{this.state.DNA['headColor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="headBodyColor"  onChange ={this.changeColorPattern} value= {this.state.DNA['headColor']}></input>
                        </div> 
                        <div className="form-group">  
                          <label htmlFor="formControlRange"><b>Tail</b><span className="badge badge-dark ml-2" id="tailcode">{this.state.DNA['tailColor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="tailColor" onChange ={this.changeColorPattern} value={this.state.DNA['tailColor']} />
                        </div>  
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Eye</b><span className="badge badge-dark ml-2" id="eyecode">{this.state.DNA['eyeColor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="eyeColor" onChange ={this.changeColorPattern} value= {this.state.DNA['eyeColor']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Ear</b><span className="badge badge-dark ml-2" id="earcode">{this.state.DNA['earColor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="earColor"  onChange ={this.changeColorPattern} value= {this.state.DNA['earColor']}/>
                        </div>
                      </div>: null
                      }
                      {this.state.hideAttributtes ?
                      <div id="catAttributes" >
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Eye Orientation</b><span className="badge badge-dark ml-2" id="eyeshapecode">{this.state.DNA['eyeDirection']}</span></label>
                          <input type="range" min="1" max="5" className="form-control-range" id="eyeshape" onChange= {this.changeColorPattern} value= {this.state.DNA['eyeDirection']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Decorative Pattern</b><span className="badge badge-dark ml-2" id="decorativecode">{this.state.DNA['patternDecorative']}</span></label>
                          <input type="range" min="1" max="4" className="form-control-range" id="decorativepattern" onChange= {this.changeColorPattern} value={this.state.DNA['patternDecorative']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Pattern Color</b><span className="badge badge-dark ml-2" id="patterncolorcode">{this.state.DNA['patternDecorativeColor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="patterncolor" onChange = {this.changeColorPattern} value={this.state.DNA['patternDecorativeColor']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Pattern2 Color</b><span className="badge badge-dark ml-2" id="pattern2colorcode">{this.state.DNA['patterncolor']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="pattern2color" onChange = {this.changeColorPattern} value={this.state.DNA['patterncolor']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Animation</b><span className="badge badge-dark ml-2" id="animationcode">{this.state.DNA['animation']}</span></label>
                          <input type="range" min="0" max="3" className="form-control-range" id="animation" onChange={this.changeAnimation} 
                            value={this.state.DNA['animation']}/>
                        </div>
                      </div>: null
                      }
                    </div>
                    
                  
        </div>

        
      </div>
    );
  }
}

export default App;
