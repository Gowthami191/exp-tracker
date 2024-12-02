import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// Import components
import HomePage from "./modules/HomeComponent/Home"; // HomePage component
import AboutPage from "./modules/HomeComponent/About"; // AboutPage component
import GetData from "./modules/HomeComponent/index"; // Expense Tracker component
import Navbar from "./navbar/nav"; // Move Navbar to its own component if needed
import BackgroundImage from "./expp1.jpg"; // Ensure correct path to your image

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Container>
          <Navbar /> {/* Persistent navigation bar */}
          <Content>
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Home page */}
              <Route path="/about" element={<AboutPage />} /> {/* About page */}
              <Route path="/tracker" element={<GetData />} /> {/* Expense Tracker */}
            </Routes>
          </Content>
        </Container>
      </Router>
    </>
  );
};

// Global styles for consistent styling
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background-image: url(${BackgroundImage}); /* Add background image */
    background-size: cover; /* Ensure the image covers the entire viewport */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Prevent tiling */
    background-attachment: fixed; /* Keep the background fixed while scrolling */
    min-height: 100vh; /* Full screen height */
  }
`;

// Styled container for app layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Content area excluding the Navbar
const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export default App;
