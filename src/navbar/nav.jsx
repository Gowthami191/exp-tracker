import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "./logo.png"; // Add your logo file in the appropriate folder

const Navbar = () => {
  return (
    <Nav>
      <LogoContainer>
        <img src={LogoImage} alt="Logo" />
      </LogoContainer>
      <Heading> Expense Tracker</Heading>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/tracker">Expense Tracker</NavLink>
      </NavLinks>
    </Nav>
  );
};

// Styled Components
const Nav = styled.nav`

color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  & img {
    height: 40px; /* Adjust size based on your logo */
    width: auto;
  }
`;

const Heading = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-family:"Montserrat",sanserif;
  color: black;
  text-align: Center;
  flex-grow: 1;
  display: flex;
  justify-content: center; /* Horizontally center the text */
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: black; /* White for text */
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #999; /* Neutral light gray hover color */
  }
`;

export default Navbar;
