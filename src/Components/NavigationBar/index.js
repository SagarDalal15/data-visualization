import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Navbar
        style={{ justifyContent: "center" }}
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand style={{ fontSize: "26px" }} href="#home">
          Data Visualization Dashboard
        </Navbar.Brand>
        \
      </Navbar>
    </div>
  );
};
export default NavigationBar;
