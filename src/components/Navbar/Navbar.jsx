/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions*/
import React from "react";
import {MenuItems} from "./MenuItems";
import {Link} from "react-router-dom";
import "./Navbar.css";

const linkStyle = {
  textDecoration: "none",
};

function Navbar() {
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavBarItems">
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-window-close" : "fas fa-bars"} />
      </div>
      {/* Dashboard to make it responsive */}
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item) => (
          <li key={item.title}>
            <Link style={linkStyle} to={item.url}>
              <div className={item.cName}>{item.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
