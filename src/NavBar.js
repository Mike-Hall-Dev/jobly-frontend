import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import CurrUserContext from "./CurrUserContext";
import "./NavBar.css";

const NavBar = ({ logout }) => {
  const { currUser } = useContext(CurrUserContext);

  return (
    <div>
      <Navbar>
        <NavLink exact to="/">
          Jobly
          </NavLink>

        <Nav>
          {(currUser !== null) ?
            <>
              <NavItem >
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem >
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem >
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <Link to="" onClick={logout}>Log Out {currUser.username}</Link>
              </NavItem>
            </>
            :
            <>
              <NavItem >
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem >
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          }

        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;