import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Descripton from "./Description";
import SettingUpTask from "./SettingUp";
import Price from "./Price";
import TaskType from "./TaskType";
import UploadImage from "./UplaodImage";

export default class CreateNewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "in person",
      description: "",
      suburb: "",
      date: "",
      estimated_price: "",
      succeed: false,
      file: null
    };
  }

  onChange(field, value) {
    this.setState({ [field]: value });
    // console.log('hi'+value)
  }
  handleClick = () => {
    fetch("http://localhost:1337/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        type: this.state.type,
        description: this.state.description,
        suburb: this.state.suburb,
        date: this.state.date,
        price: this.state.estimated_price,
        img: JSON.stringify(this.state.file)
      }),
    })
      .then((respond) => respond.text())
      .then((data) => {
        this.setState({ succeed: true });
        console.log(data);
      })
      .catch((err) => {
        this.setState({ succeed: false });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <TaskType type={this.state.type} onChange={this.onChange.bind(this)} />
        <Descripton
          title={this.state.title}
          description={this.state.description}
          onChange={this.onChange.bind(this)}
        />
        <UploadImage
          // filename={this.state.filename}
          // file={this.state.file}
          img={this.state.file}
          onChange={this.onChange.bind(this)}
        />
        <SettingUpTask
          type={this.state.type}
          // suburb={this.state.suburb}
          // date={this.state.date}
          onChange={this.onChange.bind(this)}
        />
        <Price
          estimated_price={this.state.estimated_price}
          onChange={this.onChange.bind(this)}
        />
        <p>{this.state.succeed ? "Successfully added a new Task" : ""}</p>
        <Button onClick={this.handleClick}>Post Task</Button>
      </div>
    );
  }
}
