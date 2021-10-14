import React from "react";
import { Card } from "semantic-ui-react";
import CardComponent from "./CardComponent";

const AllTasks = (props) => {
  return (
    <div className="alltasks">
      <br />
      <Card.Group 
      >
        {props.data.map( d => {
          return(
          <CardComponent 
            key={d._id}
            data={d}
            onChange={props.onChange}
          />
        )})
        }
      </Card.Group>
    </div>
  );
};

export default AllTasks;
