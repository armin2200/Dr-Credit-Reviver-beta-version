import React from "react";
import styled from "react-emotion";
import homeBackground from "../../assets/homeBackground.jpg";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${homeBackground});
  background-position: right top;
  background-attachment: fixed;
  background-size: cover;
  height: 500px;
  width: 100%;
  @media only screen and (max-device-width: 1024px) {
    & {
      background-attachment: scroll;
    }
  }
`;

const TitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 4%;
  margin-right: 4%;
  font-family: "Fjalla One", sans-serif;
`;

const MainTitle = styled("p")`
  color: white;
  font-size: 190%;
  &::after {
    margin-top: 15px;
    display: block;
    content: "";
    background: #3232af;
    transform: translateX(-40px);
    width: 150px;
    height: 3px;
  }
`;

const SubTitle = styled("p")`
  margin-top: 15px;
  color: rgba(255, 255, 255, 0.925);
  font-size: 140%;
`;

const HomeTitle = () => {
  return (
    <div style={{ position: "relative" }}>
      <Container>
        <TitleContainer>
          <MainTitle>Credit is at the heart of healthy finance.</MainTitle>
          <SubTitle>Let us assist you in reviving yours.</SubTitle>
        </TitleContainer>
      </Container>
    </div>
  );
};

export default HomeTitle;
