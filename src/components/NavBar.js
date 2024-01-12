import React from "react";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../Contexts/UserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { useToggleMenu } from "../hooks/useToggleMenu";

const NavBar = () => {
  const user = useUser();
  const setUser = useSetUser();
  const { isExpanded, setIsExpanded, ref } = useToggleMenu(); 

  const handleLogOut = async () => {
    try {
    await axios.post("dj-rest-auth/logout/");
    setUser(null);
    } catch (error) {
    console.log(error);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>
      Add post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
        <i className="fas fa-sign-out-alt"></i>
        Log out
      </NavLink>
      <NavLink className={styles.NavLink} to={`/profiles/${user?.profile_id}`}>
        <Avatar src={user?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  
  return (
    <Navbar expanded={isExpanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {user && addPostIcon}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              exact
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {user ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
