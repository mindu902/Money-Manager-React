import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Dashboard from "./components/dashboard.component";
import ListView from "./components/listview.component";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Navbar>
        {currentUser ? (
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">Money Manager</Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {currentUser ? (
              <Nav className="mr-auto">
                <Nav.Link href="/list">List View</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    {currentUser.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="mr-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<ListView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
