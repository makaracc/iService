import React, { Component } from "react";
import { Form, Radio } from "semantic-ui-react";
import Title from "./Title";

export default class TaskType extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type: 'in person'
    };
  }
//   onFieldChange = (event) =>{
//     const fieldName = event.target.name;
//     const fieldValue = event.target.value;
//     this.setState({ type:fieldValue });
//     console.log(fieldName)
//     console.log(this.state.type)
//     this.props.onChange(fieldName, fieldValue);
// }

handleChange = (e, {value}) => {
  this.setState({type:value});
  // this.onFieldChange()
  
}
onFieldChange = (e, {value}) =>{
  this.setState({type:value});
  this.props.onChange('type', value);
}
  render() {
    return (
      
        <Form>
          <Title value="New Task" />
          <Form.Field>
            Select Task Type: <b>{this.state.type}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label="In person"
              name="type"
              value="in person"
              checked={this.state.type === "in person"}
              onChange={this.onFieldChange.bind(this)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Online"
              name="type"
              value="online"
              checked={this.state.type==="online"}
              onChange={this.onFieldChange.bind(this)}
            />
          </Form.Field>
          </Form>
    );
  }
}
