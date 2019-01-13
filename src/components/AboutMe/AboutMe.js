import React from "react";
import styled, { css } from "react-emotion";
import shawn from "../../assets/shawn.png";
// import ScrollToPosition from "../ScrollToPostion/ScrollToPostion";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  background-color: #2a2a28;
  color: white;
  box-shadow: 6px 6px 7px #888888;
  border-radius: 10px;
  p {
    font-family: "Rubik", sans-serif;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 100%;
    margin-left: 5%;
    margin-right: 5%;
    text-align: justify;
    /* hyphens: auto; */
  }
`;

const Circle = styled("div")`
  shape-outside: circle(50%);
  float: left;
  max-width: 40%;
  margin-left: 2px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const AboutMe = props => {
  return (
    <div
      className={css`
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      `}
    >
      <Container>
        <div>
          <Circle>
            <img src={shawn} alt="shawn" />
          </Circle>
          <p>
            Dr. Credit Reviver is currently comprised of a team of experts
            acutely skilled in finance and technology. Our mission is to assist
            consumers and businesses in dealing with their finances, including
            credit, debt and capital management, financial planning, mortgage,
            insurance, and housing. We envision creating a financial system
            separated from a zero-sum philosophy, instead, we want to create a
            model that serves everyone in helping to create financial
            opportunities for those seeking to invest in themselves. Our team’s
            collective acquired knowledge in the financial and technology
            sectors allow for impeccable data analysis, which combined with our
            natural desire to educate and assist others with their finances,
            inspired us to create DRCR.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutMe;
