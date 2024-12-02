import React from "react";
import styled, { keyframes } from "styled-components";
import BackgroundImage from "./expp1.jpg"; // Ensure the path to your image is correct

const HomePage = () => {
  return (
    <HomePageContainer>
      <TextContainer>
        <Heading>
          Welcome to Expense Tracker
        </Heading>
        <Description>
          Track your expenses, manage your finances, and achieve your financial
          goals effortlessly. Get started today!
        </Description>
        <Button href="#tracker">Get Started</Button>
      </TextContainer>
    </HomePageContainer>
  );
};

// Animation for the fade-in effect
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components for HomePage
const HomePageContainer = styled.div`
  text-align: center;
  font-family: "Georgia", serif; /* Change font-family to serif */
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 1.5s ease-out;
  width: 80%;
  max-width: 600px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: "Times new roman", serif; /* Change font-family to serif */
  color: #000; /* Black text color */
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #000; /* Black text color */
  font-family: "Georgia", serif; /* Change font-family to serif */
`;

const Button = styled.a`
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  background-color: #00bcd4;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: #0288d1;
    transform: scale(1.1);
  }
`;

export default HomePage;
