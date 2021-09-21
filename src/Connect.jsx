import React from "react";
import facebookLogo from './Images/facebook.png'
import twitterLogo from './Images/twitter.png'
import instagramLogo from './Images/instagram.png'
import './Connect.css'

const Connect = ()=>{
    return(
        <div className='Connect OneLine'>
            <h2 className="OneLine">CONNECT US</h2>
            <img src={facebookLogo} alt='facebooklogo' className='Logo'/>
            <img src={twitterLogo} alt='twitterlogo' className='Logo'/>
            <img src={instagramLogo} alt='instagramlogo' className='Logo'/>
        </div>
    )
}

export default Connect