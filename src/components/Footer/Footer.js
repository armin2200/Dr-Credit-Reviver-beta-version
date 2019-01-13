import React from "react";
import styled from "react-emotion";
import email from "../../assets/mail.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";

const Container = styled("div")`
  background-color: rgb(34, 34, 34);
  width: 100%;
  padding: 10px 0;
  height: 90px;
  display: flex;
  font-size: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & p {
    color: #878a91;
  }
`;

const Social = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & svg {
    margin: 15px 15px;
    cursor: pointer;
  }

  & div {
    margin: 15px 15px;
    cursor: pointer;
  }
`;

const Instagram = styled("div")`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 18.5%;
  box-shadow: 0 0 3.9px rgba(0, 0, 0, 0.5);
  background: radial-gradient(
    circle at 33% 100%,
    #fed373 4%,
    #f15245 30%,
    #d92e7f 62%,
    #9b36b7 85%,
    #515ecf
  );

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18.2px;
    height: 18.2px;
    border: solid 1.3px #fff;
    transform: translate(-50%, -50%);
    content: "";
  }
  &:before {
    border-radius: 18.5%;
  }
  &:after {
    width: 8.125px;
    height: 8.125px;
    border-radius: 50%;
    box-shadow: 5.28125px -5.28125px 0 -4.225px #fff;
  }
`;
const Email = styled("div")`
  background-image: url(${email});
  background-repeat: no-repeat;
  background-size: contain;
  height: 24px;
  width: 24px;
`;

const Facebook = styled("div")`
  background-image: url(${facebook});
  background-repeat: no-repeat;
  border-radius: 2px;
  background-size: contain;
  height: 24px;
  width: 24px;
`;
const LinkedIn = styled("div")`
  background-image: url(${linkedin});
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 2px;
  height: 24px;
  width: 24px;
`;

const Twitter = styled("div")`
  background-image: url(${twitter});
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 2px;
  height: 24px;
  width: 24px;
`;
const FootBar = () => {
  return (
    <Container>
      <Social>
        <a HREF="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%73%68%61%77%6E@%64%72%63%72%6F%6E%6C%69%6E%65.%63%6F%6D">
          <Email />
        </a>

        <a href="https://www.facebook.com/drcronline/" target="_blank">
          <Facebook />
        </a>
        {/* <Instagram /> */}
        <LinkedIn />
        <a href="https://twitter.com/drcronline" target="_blank">
          <Twitter />
        </a>
      </Social>
      <p>©2018 by Dr Credit Reviver</p>
    </Container>
  );
};

export default FootBar;
