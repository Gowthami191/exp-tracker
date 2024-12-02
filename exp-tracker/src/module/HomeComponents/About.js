import React from "react";
import styled from "styled-components";
import BackgroundImage from "./expp1.jpg"; // Ensure correct path to your background image
import Image1 from "./track.jpg"; // Replace with your actual image path
import Image2 from "./track1.jpg"; // Replace with your actual image path

const AboutContainer = styled.div`
  text-align: center;
  padding: 50px;
  font-family: "Montserrat", sans-serif;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black; /* Text color */
`;

const Heading = styled.h1`
  font-size: 2rem; /* Decreased font size */
  color: black;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const Paragraph = styled.p`
  font-size: 1rem; /* Decreased font size */
  color: black;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0;

  li {
    font-size: 1rem; /* Decreased font size */
    color: black;
    margin-bottom: 8px;
  }
`;

const StrongText = styled.strong`
  font-weight: bold;
  color: black;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px; /* Reduced gap between images */
  margin-top: 30px;
`;

const Image = styled.img`
  width: 35%; /* Decreased image width */
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <div>
        <Heading>About Expense Tracker</Heading>
        <Paragraph>
          The <StrongText>Expense Tracker App</StrongText> helps you manage your
          finances by tracking your income and expenses. It’s easy to use, and
          you can view your balance, add transactions, and filter them by type.
        </Paragraph>
        <Paragraph>
          <StrongText>Features include:</StrongText>
        </Paragraph>
        <FeatureList>
          <li>Real-time balance calculation</li>
          <li>Expense vs. income tracking</li>
          <li>Searchable transaction history</li>
        </FeatureList>

        {/* Image Container for side-by-side images */}
        <ImageContainer>
          <Image src={Image1} alt="Image 1" />
          <Image src={Image2} alt="Image 2" />
        </ImageContainer>
      </div>
    </AboutContainer>
  );
};

export default AboutPage;
