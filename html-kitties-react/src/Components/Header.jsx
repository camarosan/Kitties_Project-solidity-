import React, {Component} from 'react'
import '../css/frontend.css'
import '../css/mystyle.css'
import '../bootstrap/css/bootstrap.min.css'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return(
            <div className="light-b-shadow"  align = "center">
            <p className="bg-white pt-0">Academy-kitties
            <button className ='red-btn'>Catalogue</button>
            <button className ='red-btn'>Kitties Factory</button>
            <button className ='red-btn'>Marketplace  </button>
            </p>
        </div>
        );
    }

}