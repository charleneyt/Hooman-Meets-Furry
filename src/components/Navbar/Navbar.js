import { MenuItems } from "./MenuItems";
import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
};

class Navbar extends Component {
  // state
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavBarItems">
        <h1 className="navbar-logo">
          {/* TODO: Add icon */}
          Pet Web App <i className="fas fa-paw"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={
              this.state.clicked ? "fas fa-window-close" : "fas fa-bars"
            }
          ></i>
        </div>
        {/* Dashboard to make it responsive */}
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item) => {
            return (
              <li key={item.title}>
                <Link style={linkStyle} to={item.url}>
                  <div className={item.cName}>{item.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
