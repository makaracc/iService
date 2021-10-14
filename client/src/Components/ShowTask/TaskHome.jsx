import React, { Component } from "react";
import AllTasks from "./AllTasks";
import axios from "axios";
import Filter from "./Filter";

export default class TaskHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    show: false,
    search: '',
    filter: ''
    }
  }
  onChange = (field, value) => {
    this.setState({ [field]: value });
  }

  onLoad = () => {
    let taskurl = 'http://localhost:1337/tasks/';
    let surfix = this.state.filter && this.state.search ? `${this.state.filter}/${this.state.search}` : '';
    axios
      .get(`${taskurl}${surfix}`)
      .then((response) => {
        if (response.data !== null) {
          this.setState({
            data: response.data,
            show:true
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render(){
  return (
    <div className='taskhome'>
      <Filter
        search={this.state.search}
        filter={this.state.filter}
        onClick={this.onLoad.bind(this)}
        onChange={this.onChange.bind(this)}
      ></Filter>
      {this.state.show? <AllTasks data={this.state.data} onChange={this.onLoad.bind(this)}/> : ''}
    </div>
  );
}
}
