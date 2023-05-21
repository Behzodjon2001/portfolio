import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      <nav className="header_stu_login ">
        <NavLink to="/">
          <Button type="" className="home_color">
            Home
          </Button>
        </NavLink>

        <NavLink to="/login">
          <Button type="" className="home_color">
            Login
          </Button>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
