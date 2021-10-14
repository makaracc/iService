import axios from "axios";
import React from "react";
import DetailPortal from "./DetailPortal";

// const handleCardClick = (event) => { event.target.name.style = {backgroundColor: 'rgba(0, 0, 0, .5)' }; };

const CardComponent = (props) => {
    const handleCardDelete = (id) => {
        let url = 'http://localhost:1337/tasks/id/';
        axios.delete(`${url}${id}`)
        .then(res => {
            if(res.status === 200){
                props.onChange();
            }
        })
        .catch((e) => {
            console.log(e);
          });
    };
    const onChange = (value) =>{
        handleCardDelete(value)
      }
  return (
    <div  key={props.data._id}>
      <DetailPortal
        element={props.data}
        handleCardDelete={handleCardDelete}
        onChange={onChange}
      ></DetailPortal>
    </div>
  );
}

export default CardComponent;
