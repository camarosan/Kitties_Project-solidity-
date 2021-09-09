import React, {Component} from 'react'
import { motion, AnimatePresence } from "framer-motion";

export function Marketplace() {

    return (
      <div className="col-lg-4 catBox light-b-shadow " >
                      <div className='cat' id='cat00'>
                        <motion.div className= 'ears'  id= 'ears00'
                         animate={{ skewX: [...this.state.isAnimated[1] ? [-6,0,-6,0,6,0,-6] : [0,0]]}}
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
                          animate={{rotate : [...this.state.isAnimated[0] ? [10,0,-10,0,10] : [0,0]] }}
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
                          animate={{rotateX: [...this.state.isAnimated[2] ? [45, 0, -45] : [0,0] ]}}
                          transition={{delay:0, duration: 5, repeat:Infinity}}
                        >
                          <div className= 'intotail' id='intotail00' ></div>
                        </motion.div>
                        <div className = 'neck' id='neck00' style= {this.state.pattern}></div>
                        <div className= 'body' id='body00' style= {this.state.headBodyStyle}>                           
                            <div className = 'belly' id='belly00'> </div>
                              <motion.div 
                                className="legs" id='legs00'
                                animate={{rotate : [...this.state.isAnimated[3] ? [10,0,-10,0,10] : [0,0]] }}
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
    );
  }