import React, {Component} from "react";
import { Menu } from 'semantic-ui-react'
import './NavBar.css'

export default class NavBarItem extends Component {
    state = {}
    handleOnMouseOver = () => this.setState(
        {isMouseOver: true}
    )
    handleOnMouseOut = () => this.setState(
        {isMouseOver: false}
    )
    handleClick = (e, {name}) => {
        this.setState({activeItem:name})
    }
    render() {
        const {isMouseOver} = this.state
      return (
        
            <Menu.Item
            className='NavItm'
            onMouseOver={this.handleOnMouseOver}
            onMouseOut={this.handleOnMouseOut}
            isMouseOver={this.isMouseOver}
            style={
                {backgroundColor: isMouseOver? 'pink' : 'white' }
            }
          >
            {this.props.name}
          </Menu.Item>
        
      )
    }
  }