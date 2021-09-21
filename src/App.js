import React from "react";
import NavBar from "./NavBar";
import harold from './Images/harold.jpeg'
import './App.css'
import ExpertCardList from "./ExpertCardList";
import Footer from "./Footer";

function App(){
    return(
    <div className="App">
        <NavBar/>
        <img src={harold} alt="Avatar" width='800px'></img>
        <ExpertCardList/>
        <Footer />
    </div>
    )
}

export default App;