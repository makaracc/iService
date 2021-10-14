import React from "react";

const Title = (props) =>{

    return (
        <div
        style={
            {
                display: 'inline-block',
                // padding: '3px 400px 3px 2px',
                width: '100%',
                padding: 'auto',
                marginBottom: '5px',
                backgroundColor: '#dae3dc'
            }
        }
        >
            {props.value}
        </div>
    )
}

export default Title;