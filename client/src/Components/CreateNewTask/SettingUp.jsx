import React from "react";
import { Form, TextArea } from "semantic-ui-react";
import Title from "./Title";

const SettingUpTask = (props) =>{
    var onFieldChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        props.onChange(fieldName, fieldValue);
    }
    return(
        <Form>
            <Title value='Setting up your task' />
            {props.type === 'in person'? 
            <div>
            Suburb: &nbsp;
            <TextArea rows={1} placeholder = 'Enter a suburb' name='suburb' onChange={onFieldChange}></TextArea>
                 
        </div>
       
            : ''}

            <div>
                Date: &nbsp;
                <TextArea rows={1} placeholder = 'DD/MM/YYYY' name='date' onChange={onFieldChange}></TextArea>
            </div>
        </Form>
    )
}

export default SettingUpTask;