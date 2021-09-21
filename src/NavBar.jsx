import React from "react";
import { Menu } from "semantic-ui-react";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  return (
    <Menu 
   className='NavBar'
    >
      <NavBarItem name="Iservice" />
      <NavBarItem name="Post a task" />
      <NavBarItem name="Become an expert" />
      <NavBarItem name="Find tasks" />
      <NavBarItem name="How it works" />
      <NavBarItem name="Sign in" />
    </Menu>
  );
};
export default NavBar;
