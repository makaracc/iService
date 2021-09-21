import React from "react";
import ExpertList from './ExpertList'
import ExpertCard from "./ExpertCard";
import './ExpertCardList.css'

function ExpertCardComponents(expert, idx){
    return(
        <ExpertCard 
            avatar={expert.avatar} 
            name={expert.name} 
            position={expert.position}
            description={expert.description}
            stars={expert.stars}
        />
    )
}

const ExpertCardList = ()=> {
    return(
        <div>
            <h1>Featured Experts</h1>
            <div className="grid">
                {ExpertList.map(ExpertCardComponents)}
            </div>
            
        </div>
    )
}

export default ExpertCardList;