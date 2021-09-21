import React from "react";
import './NewLetter.css'

const Newletter = () => {
  return (
    <div className="Newletter OneLine">
      <h2 className="OneLine" >NEWLETTER SIGN</h2>
      <form className="OneLine">
        <label className="OneLine" >
          Name:
          <input type="text" name="email" className="OneLine" />
        </label>
        <input type="submit" value="Submit" className="OneLine"/>
      </form>
      
    </div>
  );
};

export default Newletter;
