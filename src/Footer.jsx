import React from "react";
import Newletter from "./Newletter";
import Connect from "./Connect";
import './Footer.css'

const Footer = ()=>{
    return(
        <div className="Footer">
            <Newletter />
            <Connect />
        </div>
    )
}

export default Footer