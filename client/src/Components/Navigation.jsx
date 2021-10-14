import {Button} from "semantic-ui-react";
import React, {useState} from "react";
const Navigation = (props) => {
  
  const [, setState] = useState({
    clickOn: ''
  })
  
  var handleOnclick = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setState({clickOn:event.target.value})
    props.onChange(fieldName, fieldValue);
  };
  return (
    <div className='navi'>
      <ul>
        {props.pages.map((element) => (
          <Button name='page' key={element} value={element} onClick={handleOnclick} onChange={handleOnclick}>
            {element}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
