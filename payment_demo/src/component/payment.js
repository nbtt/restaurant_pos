import React, { Component } from 'react'
import ButtonAppBar from './app-bar';
import FullWidthGrid from './payment-box';
import '../assets/css/payment.css'

export default class Payment extends Component {
    render(){
        return (
            <div className="container">
                <div className = "header">
                    <ButtonAppBar/>
                </div>

                <div className = "payment-field" >
                    <div className="payment-box">
                        <FullWidthGrid/>
                    </div>
                </div>
                
                
            </div>
            
        );
    }
    
}
