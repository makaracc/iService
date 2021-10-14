import React from "react";
import { Form, TextArea } from "semantic-ui-react";
import Title from "./Title";

const Descripton = (props) =>{
    var onFieldChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        props.onChange(fieldName, fieldValue);
    }
    return(
        <Form>
            <Title value='Describe your task to Experts' />
            <br></br>Task Title: &nbsp;
            <TextArea rows={1} placeholder = 'Enter Task title' name='title' onChange={onFieldChange}></TextArea>
            <br></br>
            <br></br>
            
            Description: &nbsp;
            <TextArea rows={2} placeholder = 'Enter task description' name='description' onChange={onFieldChange}></TextArea>
        </Form>
    )
}

export default Descripton;