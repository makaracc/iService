import React, {Component} from "react";
import {Form, Radio, TextArea} from "semantic-ui-react";
import Title from "./Title";

export default class Price extends Component {
    // state = {}
    handleChange = (e, {value, price}) => {
        this.setState({type:value});
        this.setState({price:price});
        console.log(value);
    }
    onFieldChange = (event) =>{
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
        
    }
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            estimated_price: ''
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    render (){
        return(
            <Form>
                <Title value = 'Suggest how much'/>
                <Form.Field>
                    What is your budget? (Estimate <b>{this.state.type})</b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label = 'Total'
                        name='radioGroup'
                        value='total'
                        checked={this.state.type === 'total'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio 
                        label = 'Hourly rate'
                        name='radioGroup'
                        value='hourly rate'
                        checked={this.state.type === 'hourly rate'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <TextArea  rows={1} placeholder="$" name='estimated_price' onChange={this.onFieldChange.bind(this)} ></TextArea>
                </Form.Field>
            </Form>
        )
    }
}