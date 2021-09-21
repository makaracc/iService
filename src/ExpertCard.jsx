import React from "react";

const ExpertCard = (props)=>{
    return(
        <div>
            <div className="col">
            <img src={props.avatar} alt="Avatar"></img>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p>{props.stars}</p>
        </div>
        </div>
    )
};

export default ExpertCard;