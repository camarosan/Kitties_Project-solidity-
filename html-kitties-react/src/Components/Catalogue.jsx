import React, {Component} from 'react'
import '../css/frontend.css'
import '../css/mystyle.css'
import '../bootstrap/css/bootstrap.min.css'
import { motion } from "framer-motion";

export class Catalogue extends Component {
    constructor(props){
      super(props)
      this.state = {
        
       count: ''
      }
    }
    componentDidMount() {
      this.loadKitties()
    }
    kitties = []
    
    loadKitties = async () =>{
      let allKitties = await this.props.contractInstance.methods.totalSupply().call()
      this.setState({count: allKitties})

      for (let i=0; i<allKitties; i++){
        let kitty = await this.props.contractInstance.methods.getKitty(i).call()
        this.kitties.push(kitty)
        await this.renderKitties(i)
      }
    }

    renderKitties = async (kittyID) =>{
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(0,2)), 'headColor', kittyID)
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(2,4)), 'tailColor', kittyID)
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(4,6)), 'eyeColor', kittyID)
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(6,8)), 'earColor', kittyID)
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(10,12)), 'patternDecorativeColor', kittyID) 
      await this.props.colorPatternCatalogue(String(this.kitties[kittyID][0].slice(12,14)), 'patterncolor', kittyID)
      await this.props.eyeDecorativeCatalogue(String(this.kitties[kittyID][0].slice(8,9)), 'eyeDirection', kittyID)
      await this.props.eyeDecorativeCatalogue(String(this.kitties[kittyID][0].slice(9,10)), 'patternDecorative', kittyID)
      await this.props.animationCatalogue(this.kitties[kittyID][0].slice(14,15), 'animation', kittyID)
      

       /*this.setState({
        [kittyID]: {...this.state.DNA, 
                'headColor':  this.kitties[n][0].slice(0,2), 
                'tailColor': this.kitties[n][0].slice(2,4),
                'eyeColor': this.kitties[n][0].slice(4,6),
                'earColor': this.kitties[n][0].slice(6,8),
                'eyeDirection': this.kitties[n][0].slice(8,9),
                'patternDecorative': this.kitties[n][0].slice(9,10),
                'patternDecorativeColor': this.kitties[n][0].slice(10,12),
                'patterncolor': this.kitties[n][0].slice(12,14),
                'animation': this.kitties[n][0].slice(14,15)}      
      })*/
      /*
      await this.props.colorPattern(String(this.state.n.DNA['headColor']), 'headBodyColor')
      await this.props.colorPattern(String(this.state.n.DNA['tailColor']), 'tailColor')
      await this.props.colorPattern(String(this.state.n.DNA['eyeColor']), 'eyeColor')
      await this.props.colorPattern(String(this.state.n.DNA['earColor']), 'earColor')
      await this.props.colorPattern(String(this.state.n.DNA['patternDecorativeColor']), 'patterncolor')
      await this.props.colorPattern(String(this.state.n.DNA['patterncolor']), 'pattern2color')
      await this.props.colorPattern(String(this.state.n.DNA['eyeDirection']), 'eyeshape')
      await this.props.colorPattern(String(this.state.n.DNA['patternDecorative']), 'decorativepattern')
      await this.props.animation(this.state.DNA['animation'])*/
      
      
    }
    
    render(){ 
      
      let kittyID= '0'

      return (
        
        <div className="col-lg-4 catBox light-b-shadow " >
        <div className='cat' id={`cat${kittyID}`}>
          <motion.div className= 'ears'  id= {`ears${kittyID}`}
             animate={{ skewX: [...this.props[`isAnimated${kittyID}`][1] ? [-6,0,-6,0,6,0,-6] : [0,0]]}}
             transition={{delay:0, duration: 5, repeat: Infinity }}
            >   
                <div className= 'rightear' id= {`rightear${kittyID}`} style={this.props[`earsStyle${kittyID}`]}>
                <div className = 'innerear' id={`innerear${kittyID}`} ></div>
                </div>
                <div className= 'leftear' id= {`leftear${kittyID}`} style={this.props[`earsStyle${kittyID}`]}>
                <div className = 'innerear' id={`innerear${kittyID}`} ></div>
                </div>
            </motion.div>
            <motion.div className= 'head' id={`head${kittyID}`} style= {this.props[`headBodyStyle${kittyID}`]}
              animate={{rotate : [...this.props[`isAnimated${kittyID}`][0] ? [10,0,-10,0,10] : [0,0]] }}
              transition={{delay:0, duration: 5, repeat:Infinity}}
            >   
              <div className= 'front' id={`front${kittyID}`} style = {this.props[`frontStyle${kittyID}`]}></div>
                <div className= 'nouse' id={`nouse${kittyID}`}></div>
                <div className= 'eyes' id={`eyes${kittyID}`} >
                <div className = 'eye' id={`eye${kittyID}`}>
                  <div className = 'pupil' id={`pupil${kittyID}`}  style={this.props[`eyestyle${kittyID}`]} ></div>
                  <div className= 'intoeye' id={`intoeye${kittyID}`}></div>
                </div>
                  <div className = 'eye2' id= {`eye2${kittyID}`}>
                    <div className = 'pupil' id={`pupil${kittyID}`} style={this.props[`eyestyle${kittyID}`]}></div>
                    <div className= 'intoeye' id={`intoeye${kittyID}`} ></div>
                  </div>
              </div>
              <div className= 'mouth' id={`mouth${kittyID}`}>
                <div className= 'tongue' id={`tongue${kittyID}`}></div>
              </div>  
              <div className ='whiskergroup-1-' id= {`whiskergroup-1-${kittyID}`}>
                <div className= 'whisker-1-' id={`whisker-1-${kittyID}`}></div>
                <div className= 'whisker-2-' id={`whisker-2-${kittyID}`}></div>
                <div className= 'whisker-3-' id={`whisker-3-${kittyID}`}></div>
              </div>
              <div className ='whiskergroup-2-' id={`whiskergroup-2${kittyID}`}>
                <div className= 'whisker-4-' id={`whisker-4-${kittyID}`}></div>
                <div className= 'whisker-5-' id={`whisker-5-${kittyID}`}></div>
                <div className= 'whisker-6-' id={`whisker-6-${kittyID}`} ></div>
              </div>
            </motion.div>
            <motion.div className='tail' id={`tail${kittyID}`} style={this.props[`tailStyle${kittyID}`]}
              animate={{rotateX: [...this.props[`isAnimated${kittyID}`][2] ? [45, 0, -45] : [0,0] ]}}
              transition={{delay:0, duration: 5, repeat:Infinity}}
            >
              <div className= 'intotail' id={`intotail${kittyID}`} ></div>
            </motion.div>
            <div className = 'neck' id={`neck${kittyID}`} style= {this.props[`pattern${kittyID}`]}></div>
            <div className= 'body' id={`body${kittyID}`} style= {this.props[`headBodyStyle${kittyID}`]}>                           
              <div className = 'belly' id={`belly${kittyID}`}> </div>
                  <motion.div 
                    className="legs" id={`legs${kittyID}`}
                    animate={{rotate : [...this.props[`isAnimated${kittyID}`][3] ? [10,0,-10,0,10] : [0,0]] }}
                    transition={{delay:0, duration: 5, repeat:Infinity}}
                    >
                    <div className = 'rightleg' id={`rightleg${kittyID}`} style= {this.props[`pattern${kittyID}`]}></div>
                    <div className = 'leftleg' id={`leftleg${kittyID}`} style= {this.props[`pattern${kittyID}`]}></div>
                  </motion.div>
            </div> 
            <div className="dnaDiv" id="catDNA">
              DNA:
              <b>
                {/*Colors*/}
                <span id={`dnahead${kittyID}`}>{this.props[`DNA${kittyID}`]['headColor']}</span>
                <span id={`dnatail${kittyID}`}>{this.props[`DNA${kittyID}`]['tailColor']}</span>
                <span id={`dnaeyes${kittyID}`}>{this.props[`DNA${kittyID}`]['eyeColor']}</span>
                <span id={`dnaears${kittyID}`}>{this.props[`DNA${kittyID}`]['earColor']}</span>
                {/*Attributtes*/}
                <span id={`dnaeyeorientation${kittyID}`}>{this.props[`DNA${kittyID}`]['eyeDirection']}</span>
                <span id={`dnadecoration${kittyID}`}>{this.props[`DNA${kittyID}`]['patternDecorative']}</span>
                <span id={`dnadecorationMid${kittyID}`}>{this.props[`DNA${kittyID}`]['patternDecorativeColor']}</span>
                <span id={`dnadecorationSides${kittyID}`}>{this.props[`DNA${kittyID}`]['patterncolor']}</span>
                <span id={`dnaanimation${kittyID}`}>{this.props[`DNA${kittyID}`]['animation']}</span>
                <span id="dnaspecial00"></span>
              </b>
            </div>   
            
          </div>
        </div>
        
        

    );
  }
}
