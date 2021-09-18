import './App.css';
import React, {Component} from 'react'
import './css/cats.css'
import './css/factory.css'
import './css/colors.css'
import './css/frontend.css'
import './css/mystyle.css'
import './bootstrap/css/bootstrap.min.css'
import {allColors} from './js/colors.js';
import { motion } from "framer-motion";
import {KITTYCONTRACT_ADDRESS, MARKETPLACE_ADDRESS,TODO_LIST_ABI} from './config'
import Web3 from 'web3'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import {Catalogue} from './Components/Catalogue.jsx'
//import {Marketplace} from './Components/Marketplace.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        account: {},
        contractInstance:{},
        count: '0',
        momID: '',
        dadID: '',
        generation: '',
        ownerKittyAddress: '0',
        sale: [],
        kitties: [],
        breedKitties: [],
        web3: {}
    }
    this.showHideColorsAttributes = this.showHideColorsAttributes.bind(this)
    this.showDefaultKitty = this.showDefaultKitty.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
  }

    async componentDidMount() {
      this.defaultKitty()
      await this.loadBlockchainData()
      await this.loadKitties()
  }

  colors= Object.values(allColors()) // from 10 to 98 
  kittyGen00= '00'
  
  loadKitties = async () =>{ // all the neccesary to load from the start to use on catalogue and factory pages
    let allKitties = await this.state.contractInstance.methods.totalSupply().call()
    this.state.sale = await this.state.MarketplaceInstance.methods.getAllTokenOnSale().call()
    this.setState({count: allKitties})
    this.state.kitties.splice(0, this.state.kitties.length)
    for (let i=0; i<allKitties; i++){ // call every kitty from the blockchain and push the data on kitties array 
      let kitty = await this.state.contractInstance.methods.getKitty(i).call()
      this.setState({[`blockchainOffer${i}`]: '' }) 
      this.state.kitties.push(kitty)
      this.renderKitties(i)
    }
  }

  renderKitties =  (kittyID) =>{// call every function to change characteristics on every kitty from kitties array 
     this.colorPattern(String(this.state.kitties[kittyID][0].slice(0,2)), 'headColor', kittyID)
     this.colorPattern(String(this.state.kitties[kittyID][0].slice(2,4)), 'tailColor', kittyID)
     this.colorPattern(String(this.state.kitties[kittyID][0].slice(4,6)), 'eyeColor', kittyID)
     this.colorPattern(String(this.state.kitties[kittyID][0].slice(6,8)), 'earColor', kittyID)
     this.colorPattern(String(this.state.kitties[kittyID][0].slice(10,12)), 'patternDecorativeColor', kittyID) 
    this.colorPattern(String(this.state.kitties[kittyID][0].slice(12,14)), 'patterncolor', kittyID)
    this.eyeDecorative(String(this.state.kitties[kittyID][0].slice(8,9)), 'eyeDirection', kittyID)
    this.eyeDecorative(String(this.state.kitties[kittyID][0].slice(9,10)), 'patternDecorative', kittyID)
    this.animation(String(this.state.kitties[kittyID][0].slice(14,15)), 'animation', (kittyID))
    this.statistics(this.state.kitties[kittyID][1], 'birthTime', kittyID)
    this.statistics(this.state.kitties[kittyID][2], 'mumId', kittyID)
    this.statistics(this.state.kitties[kittyID][3], 'dadId', kittyID)
    this.statistics(this.state.kitties[kittyID][4], 'generation', kittyID)
  }

  async loadBlockchainData() {// accounts, web3, contract instances and connection with metamask
    
    await window.ethereum.enable()
    let web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/0336850f331a4fbe85621083466d7c93")
    this.setState({web3: web3})
  
    const accounts = await this.state.web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const contractInstance = new this.state.web3.eth.Contract(TODO_LIST_ABI.kittyContract_ABI, KITTYCONTRACT_ADDRESS );// Kitty Contract instance 
    const MarketplaceInstance =   new this.state.web3.eth.Contract(TODO_LIST_ABI.Marketplace_ABI, MARKETPLACE_ADDRESS)// Marketplace Contact instance 
    this.setState({contractInstance, MarketplaceInstance})
  }

   
  
  createKitty= async (e) =>{// every kitty is USED HERE  with  id 00, later the blockchain will include the real ID
    e.preventDefault()
     let DNA = this.state['headColor00']+this.state['tailColor00']+this.state['eyeColor00']
     +this.state['earColor00']+this.state['eyeDirection00']+this.state['patternDecorative00']
     +this.state['patternDecorativeColor00']+this.state['patterncolor00']+this.state['animation00']
     await this.state.contractInstance.methods.createKittyGen0(Number(DNA)).send({from: this.state.account})
     await this.loadKitties()
  }

  // FUNCTIONS TO CHANGE CHARACTERISTICS ON THE KITTIES 
  changeColorPattern = (kittyID, e) => {
     this.colorPattern(e.target.value, e.target.id, kittyID)
  }

  colorPattern = (value, id, kittyID) => {
      let style = this.kittyColor(id)+kittyID
      id= String(id)+kittyID
       this.setState({
        [style]: {...this.state[style], backgroundColor: this.colors[value]},
        [id] : value
      })
  }

  kittyColor = (id) => {
    let style
    if (id=== 'tailColor') {style = 'tailStyle'}
    else if(id=== 'earColor') {style='earsStyle'}
    else if(id=== 'headColor'){style='headBodyStyle'}
    else if(id=== 'eyeColor') {style='eyestyle'}
    else if(id === 'patternDecorativeColor' ) {style = 'frontStyle'}
    else if(id === 'patterncolor' ) {style = 'pattern'}
    else if(id === 'eyeDirection' ) {style = 'eyestyle'}
    else if(id === 'patternDecorative' ) {style = 'frontStyle'}
    return style
  }

  eyeDecorativePattern =  (kittyID, e) => {
     this.eyeDecorative(e.target.value, e.target.id, kittyID)
  }

  eyeDecorative =   (value, id, kittyID) => {
    if (id=== 'eyeDirection') {
      let translate; 
      let style = this.kittyColor(id)+kittyID
      id= String(id)+kittyID
      if(value==='1'){translate= 'translate(9%, 9%)'}
      else if(value === '2'){translate= 'translate(7%, 18%)'}
      else if(value==='3'){translate= 'translate(7%, 0%)'}
      else if(value==='4'){translate= 'translate(17%, 9%)'}
      else if(value==='5'){translate= 'translate(0%, 9%)'}
      this.setState({
      [style] : {...this.state[style], transform: translate},
      [id] : value
     })
    }
    else if(id=== 'patternDecorative') {
      let decorative;
      let style = this.kittyColor(id)+kittyID
      id= String(id)+kittyID
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
        [style] : {...this.state.frontStyle, height : decorative['height'], 
        width: decorative['width'], borderRadius:  decorative['borderRadius'], transform: decorative['transform'] },
        [id]: value
      })
    }
  }

  changeAnimation =  (kittyID, e) =>{
     this.animation(e.target.value, e.target.id, kittyID)
  }

  animation =  (value,id, kittyID) => {
    id= String(id)+kittyID
    let style = 'isAnimated'+ kittyID
     this.setState({
      [style]:  value,
      [id]: value
     })
  }

 //OTHER FUNCTIONS USED ON FACTORY PAGE 
  statistics = (value,id, kittyID) => {// birthtime, momid , dadid, generation 
    id= String(id)+kittyID
      this.setState({
        [id]: value
      })
  }
   
  showHideColorsAttributes(e)  { // to hide Attributtes or colors
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

  defaultKitty=  ()=> { //kitty generation 00 from the factory page or when is realoaded the  page 
     this.setState({
      earsStyle00 : {backgroundColor: '#4c858b'},
      headBodyStyle00 : {backgroundColor: '#4c858b'},
      tailStyle00: {backgroundColor: '#4c858b'},
      eyestyle00: {backgroundColor: '#4a3c95'},
      frontStyle00: {'transform': 'translate(90%, 0%)',
      "height": "50px",
      "width": "80px",
      "borderRadius": "0 0 18px 46px",
      "backgroundColor": '#344867'},
      pattern00: {backgroundColor: '#482916'},
      isAnimated00: '1',
      hideColors: true,
      hideAttributtes: false,
        'headColor00' : 14,
        'tailColor00' : 14,
        'eyeColor00'  : 20,
        'earColor00'  : 14,
        'eyeDirection00' : 1,
        'patternDecorative00' : 1,
        'patternDecorativeColor00' :98,
        'patterncolor00' : 21,
        'animation00' : 1
    })     
  }
  
  randomKitty = async (e) => { 
    e.preventDefault()
    let randomValue;
    let colors = ['headColor','tailColor','eyeColor','earColor', 'patterncolor', 'patternDecorativeColor']
    for await (let color of  colors ) {
      randomValue =this.randomNumber()
      this.colorPattern(String(randomValue), color, this.kittyGen00) //00 the default kitty
    }
    randomValue =  Math.floor(Math.random()*10)%5+1 // 5 options to choose 1-5
    this.eyeDecorative(String(randomValue), 'eyeDirection',this.kittyGen00)
    randomValue = Math.floor(Math.random()*10)%4+1 // 4 options to choose 1-4
    this.eyeDecorative(String(randomValue), 'patternDecorative', this.kittyGen00)
    randomValue = Math.floor(Math.random()*10)%4+1 // 3 options including 1  -4
    this.animation(String(randomValue), "animation",this.kittyGen00)
  }

   randomNumber =()=>{ //from 10 to 98
    let random = Math.floor(Math.random()*100)
      if (random === 0) {random = 10}
      else if (random < 10){random = random*10}
      else if (random > 98) {random = random -2}
      return random 
  }

  // FUNCTIONS TO USE ON MARKETPLACE AND CATALOGUE PAGES 
  breed = (e) => {// control all the logic on the breed checkbox () on catalogue page
    let id = e.target.id
    if (this.state.breedKitties.includes(id)){
      this.state.breedKitties.splice(this.state.breedKitties.indexOf(id),1)
    }
    else {
    this.state.breedKitties.push(id)
    }
  }
  
  breedblokchain = async () =>{// control the logic to breed only two kitties 
    if(this.state.breedKitties.length === 2) {
      let kitty1 = this.state.breedKitties[0].slice(10)
      let kitty2 = this.state.breedKitties[1].slice(10)
    
      await this.state.contractInstance.methods.breed(kitty1, kitty2).send({from: this.state.account})
      .then(( event)=>{
          console.log(event)   
      }); 
       
      this.state.breedKitties.splice(0, this.state.breedKitties.length) // empty the array for next breed
      let allKitties = await this.state.contractInstance.methods.totalSupply().call()
      this.setState({count: allKitties})
    }
    else {alert('you are not selecting two Kitties')}
    await this.loadKitties() 
  }
    
  handleOffer = async  (e, kittyID) => { // uses ether only for test, it is neccesary an api to swapt bewteen cripto and fiat 
   e.preventDefault()
   let value = `offer${kittyID}`
   this.state.MarketplaceInstance.methods.setOffer(Number(this.state[value]), kittyID).send({from: this.state.account})
  }

 changeOffer = (e) => { // only follow the offer internally(from the input) it is not the blockchainOffer from the blockchain 
 const {value, id} = e.target
 this.setState({[id]: [value]})
 }

 offer= async (e, kittyID) => { // get the offer from the blokchain blockcahinOffer
  e.preventDefault()
   await this.state.MarketplaceInstance.methods.getOffer(kittyID).call()
  .then((value,error)=>{
     if(value){
      this.setState({[`blockchainOffer${kittyID}`]: value['1']})
    }
  })
 }
 
 removeOffer = async (e, kittyID) => {// on the blockchain(blockchainOffer) not internally(offer)
  e.preventDefault()
  await this.state.MarketplaceInstance.methods.removeOffer(kittyID).send({from: this.state.account})
  .then((value)=>{
    if(value){
     this.setState({[`blockchainOffer${kittyID}`]: value['0']})
    }
  })
 }

 buyKitty = async (e, kittyID) => {// on ether only for test purposes 
  e.preventDefault()
  //const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545")
  let price = String(this.state[`blockchainOffer${kittyID}`])
  var configETH = {value: this.state.web3.utils.toWei(price, "ether"), from: this.state.account}
  this.state.MarketplaceInstance.methods.buyKitty(kittyID).send(configETH)
 }

 owner = async (e) => {// from the blockchain
   if(e.target.value!=='') {
   let ownerKitty = await this.state.contractInstance.methods.ownerOf(e.target.value).call()
   this.setState({ownerKittyAddress: ownerKitty})
   }
 }

  

  render(){   

  let kittyBreedSetoffer = (kittyID)=>{
      return(
      <div>
        <label htmlFor={`checkBreed${kittyID}`} className= "float-right" onChange = {this.breed}> 
          Breed
        <input type="checkbox"  id={`checkBreed${kittyID}`} />
        </label>
        <br></br>
        <form className= "offer" onSubmit={(e)=>{this.handleOffer(e,kittyID)}}> 
          <input type= "number" min="1" max= "10000"  id= {`offer${kittyID}`} 
          onChange = {this.changeOffer}></input>
          <br></br>
          <input className="nav-link b" type="submit" value="set Ether Offer" />
        </form>
      </div>) 
  }

  let removeOfferBuy = (kittyID)=>{
      return (
    <div className= "buy">
    <span> Eth: {this.state[`blockchainOffer${kittyID}`]}</span>
    <button className="nav-link b " onClick= {(e)=>{this.offer(e, kittyID)}}> Offer</button>
    <button className="nav-link b" onClick= {(e)=> {this.removeOffer(e, kittyID)}}>Remove</button>
    <button className="nav-link b" onClick={(e)=> {this.buyKitty(e, kittyID)}} >Buy</button>
    </div>) 
  }
    
  let kittyStatisctics = (kittyID) =>{
    return(
    <div key= {kittyID.toString()}>
    <span> KittyID: {kittyID}</span>
    <span> Birthtime(block): {this.state[`birthTime${kittyID}`]}</span>
    <span> MomID:  {this.state[`mumId${kittyID}`]}</span>
    <span> DadID:  {this.state[`dadId${kittyID}`]} </span>
    <span> Generation:  {this.state[`generation${kittyID}`]}</span>
    </div>)
  }
    
  
  let catBoxFactory = (kittyID) => {// only use on Factory page
    return(
  <div key= {kittyID.toString()}className="col-lg-4 catBox light-b-shadow " >
      {kitty (kittyID) }
  </div>)
  }

  let catBoxCatalogue = (kittyID) => {// only use on Catalogue page
    return(
  <div key= {kittyID.toString()} className="col-lg-4 catBox light-b-shadow " >
      {kittyBreedSetoffer(kittyID)}
      {kitty (kittyID) }
  </div>)
  }

  let catBoxMarketplace =  (kittyID) => {// only use on Marketplace page
    return(
  <div key= {kittyID.toString()}className="col-lg-4 catBox light-b-shadow " >
      {removeOfferBuy(kittyID)}  
      {kitty (kittyID) }
  </div>)
  }


  let kitty= (kittyID) =>  { // every kitty included animations
    return(
    <div key= {kittyID.toString()} className='cat' id={`cat${kittyID}`}>
      <motion.div className= 'ears'  id= {`ears${kittyID}`}
          animate={{ skewX: [...this.state[`isAnimated${kittyID}`]=== '2' ? [-6,0,-6,0,6,0,-6] : [0,0]]}}
         transition={{delay:0, duration: 5, repeat: Infinity }}
        >   
            <div className= 'rightear' id= {`rightear${kittyID}`} style={this.state[`earsStyle${kittyID}`]}>
            <div className = 'innerear' id={`innerear${kittyID}`} ></div>
            </div>
            <div className= 'leftear' id= {`leftear${kittyID}`} style={this.state[`earsStyle${kittyID}`]}>
            <div className = 'innerear' id={`innerear${kittyID}`} ></div>
            </div>
        </motion.div>
        <motion.div className= 'head' id={`head${kittyID}`} style= {this.state[`headBodyStyle${kittyID}`]}
          animate={{rotate : [...this.state[`isAnimated${kittyID}`]=== '1' ? [10,0,-10,0,10] : [0,0]] }}
          transition={{delay:0, duration: 5, repeat:Infinity}}
        >   
          <div className= 'front' id={`front${kittyID}`} style = {this.state[`frontStyle${kittyID}`]}></div>
            <div className= 'nouse' id={`nouse${kittyID}`}></div>
            <div className= 'eyes' id={`eyes${kittyID}`} >
            <div className = 'eye' id={`eye${kittyID}`}>
              <div className = 'pupil' id={`pupil${kittyID}`}  style={this.state[`eyestyle${kittyID}`]} ></div>
              <div className= 'intoeye' id={`intoeye${kittyID}`}></div>
            </div>
              <div className = 'eye2' id= {`eye2${kittyID}`}>
                <div className = 'pupil' id={`pupil${kittyID}`} style={this.state[`eyestyle${kittyID}`]}></div>
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
        <motion.div className='tail' id={`tail${kittyID}`} style={this.state[`tailStyle${kittyID}`]}
          animate={{rotateX: [...this.state[`isAnimated${kittyID}`]=== '3' ? [45, 0, -45] : [0,0] ]}}
          transition={{delay:0, duration: 5, repeat:Infinity}}
        >
          <div className= 'intotail' id={`intotail${kittyID}`} ></div>
        </motion.div>
        <div className = 'neck' id={`neck${kittyID}`} style= {this.state[`pattern${kittyID}`]}></div>
        <div className= 'body' id={`body${kittyID}`} style= {this.state[`headBodyStyle${kittyID}`]}>                           
          <div className = 'belly' id={`belly${kittyID}`}> </div>
              <motion.div 
                className="legs" id={`legs${kittyID}`}
                animate={{rotate : [...this.state[`isAnimated${kittyID}`]=== '4' ? [10,0,-10,0,10] : [0,0]] }}
                transition={{delay:0, duration: 5, repeat:Infinity}}
                >
                <div className = 'rightleg' id={`rightleg${kittyID}`} style= {this.state[`pattern${kittyID}`]}></div>
                <div className = 'leftleg' id={`leftleg${kittyID}`} style= {this.state[`pattern${kittyID}`]}></div>
              </motion.div>
        </div> 
        <div className="dnaDiv" id="catDNA">
          DNA:
          <b>
            <span id={`dnahead${kittyID}`}>{this.state[`headColor${kittyID}`]}</span>
            <span id={`dnatail${kittyID}`}>{this.state[`tailColor${kittyID}`]}</span>
            <span id={`dnaeyes${kittyID}`}>{this.state[`eyeColor${kittyID}`]}</span>
            <span id={`dnaears${kittyID}`}>{this.state[`earColor${kittyID}`]}</span>
            <span id={`dnaeyeorientation${kittyID}`}>{this.state[`eyeDirection${kittyID}`]}</span>
            <span id={`dnadecoration${kittyID}`}>{this.state[`patternDecorative${kittyID}`]}</span>
            <span id={`dnadecorationMid${kittyID}`}>{this.state[`patternDecorativeColor${kittyID}`]}</span>
            <span id={`dnadecorationSides${kittyID}`}>{this.state[`patterncolor${kittyID}`]}</span>
            <span id={`dnaanimation${kittyID}`}>{this.state[`animation${kittyID}`]}</span>
            <span id="dnaspecial00"></span>
            {kittyStatisctics(kittyID)}
          </b>
        </div>  
      </div>
    
     )}

    const renderCatalogue = () => { 
      let render = []
     for(let i=0; i<this.state.count; i++) {
      render.push( 
      <div key= {i.toString()}>
        {catBoxCatalogue(String(i))}
      </div>)
      } 
      return render
    }

    return ( 
      <div className="App">
        <Router>
          <div className="light-b-shadow"  align = "center">
            <p className="bg-white pt-0">Academy-kitties
            <Link to="/" ><button className ='red-btn'>Factory</button></Link>
            <Link to="/catalogue"><button className ='red-btn'>Catalogue</button></Link>
            <Link to= "/marketplace"><button className ='red-btn'>Marketplace</button>  </Link>
            <button className ='red-btn' > Connect Wallet</button>
            </p>
          </div>
          <Switch>
            <Route exact path="/">
                <div className="container p-1"   id= 'Kitties-Factory'>
                  <h1>Kitties-Factory</h1>  
                  <p>Create your custom Kitty - Number of Kitties {this.state.count}</p>
                    {catBoxFactory('00')}
                    <div className="col-lg-7 cattributes m-2 light-b-shadow">
                          <div>
                            <button className="white-btn" id= "hideColors" onClick={this.showHideColorsAttributes}>Colors</button>
                            <button className="white-btn" id= "hideAttributtes"onClick={this.showHideColorsAttributes}>Attributes</button>
                            <button className = 'white-btn' onClick= {this.createKitty} >Create your Kitty</button>
                            <button className="white-btn" id='defaultCat' onClick= {this.showDefaultKitty}>Default Kitty </button>
                            <button className="white-btn" id='randomCat' onClick= {this.randomKitty}>Random Kitty</button>
                          </div> 
                      {this.state.hideColors ? // to hide colors
                      <div id="catColors" >
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Head and body</b><span className="badge badge-dark ml-2" id="headcode" >{this.state['headColor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="headColor"  onChange ={(e)=> this.changeColorPattern(this.kittyGen00,e)} value= {this.state['headColor00']}></input>
                        </div> 
                        <div className="form-group">  
                          <label htmlFor="formControlRange"><b>Tail</b><span className="badge badge-dark ml-2" id="tailcode">{this.state['tailColor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="tailColor" onChange ={(e)=> this.changeColorPattern(this.kittyGen00,e)} value={this.state['tailColor00']} />
                        </div>  
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Eye</b><span className="badge badge-dark ml-2" id="eyecode">{this.state['eyeColor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="eyeColor" onChange ={(e)=> this.changeColorPattern(this.kittyGen00,e)} value= {this.state['eyeColor00']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Ear</b><span className="badge badge-dark ml-2" id="earcode">{this.state['earColor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="earColor"  onChange ={(e)=> this.changeColorPattern(this.kittyGen00,e)} value= {this.state['earColor00']}/>
                        </div>
                      </div>: null
                      }
                      {this.state.hideAttributtes ? // to hide Attributtes
                      <div id="catAttributes" >
                        <div className="form-group float-left" >
                          <label htmlFor="formControlRange"><b>Eye Orientation</b><span className="badge badge-dark ml-2" id="eyeshapecode">{this.state['eyeDirection00']}</span></label>
                          <input type="range" min="1" max="5" className="form-control-range" id="eyeDirection" onChange= {(e)=>this.eyeDecorativePattern(this.kittyGen00,e)} value= {this.state['eyeDirection00']}/>
                        </div>
                        <div className="form-group float-left">
                          <label htmlFor="formControlRange"><b>Decorative Pattern</b><span className="badge badge-dark ml-2" id="decorativecode">{this.state['patternDecorative00']}</span></label>
                          <input type="range" min="1" max="4" className="form-control-range" id="patternDecorative" onChange= {(e)=>this.eyeDecorativePattern(this.kittyGen00,e)} value={this.state['patternDecorative00']}/>
                        </div>
                        <div className="form-group float-left">
                          <label htmlFor="formControlRange"><b>Animation</b><span className="badge badge-dark ml-2" id="animationcode">{this.state['animation00']}</span></label>
                          <input type="range" min="1" max="4" className="form-control-range" id="animation" onChange={(e)=>this.changeAnimation(this.kittyGen00,e)} 
                            value={this.state['animation00']}/>
                        </div>
                        <div className="form-group float-left">
                          <label htmlFor="formControlRange"><b>Sex</b><span className="badge badge-dark ml-2" id="sexcode"></span></label>
                          <input type="range" min="0" max="1" className="form-control-range" id="sex"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Pattern Color</b><span className="badge badge-dark ml-2" id="patterncolorcode">{this.state['patternDecorativeColor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="patternDecorativeColor" onChange = {(e)=>this.changeColorPattern(this.kittyGen00,e)} value={this.state['patternDecorativeColor00']}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="formControlRange"><b>Pattern2 Color</b><span className="badge badge-dark ml-2" id="pattern2colorcode">{this.state['patterncolor00']}</span></label>
                          <input type="range" min="10" max="98" className="form-control-range" id="patterncolor" onChange = {(e)=>this.changeColorPattern(this.kittyGen00,e)} value={this.state['patterncolor00']}/>
                        </div>
                      </div>: null
                      }
                    </div>       
                </div>
            </Route>
            <Route path="/catalogue">   
                  
                <button className="white-btn" onClick= {this.breedblokchain}>Breed two Kitties</button>
                {renderCatalogue()}
            </Route>
            <Route path="/marketplace">Select KittyID to see the Owner
                    <input type="number"  onChange={this.owner} ></input>
                    <span>{this.state.ownerKittyAddress}</span>
                    <br></br>
                    {this.state.sale.map( (value)=>{
                      return catBoxMarketplace(String(value))
                    })
                    }
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
