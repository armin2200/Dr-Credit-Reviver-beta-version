import React from "react";
import share from "../../assets/share.png";
import styled, { css, keyframes } from "react-emotion";

const fadeInDown = keyframes`
from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }`;

const fadeOutDown = keyframes`
from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }

`;
const Icon = styled("div")`
  background-image: url(${share});
  background-repeat: no-repeat;
  background-size: contain;
  width: 25px;
  height: 25px;
`;

const Container = styled("div")`
  cursor: pointer;
  position: relative;
  /* margin-top: 7px; */
  a,
  li {
    text-decoration: none;
  }
  & > li {
    padding: 1em 18px;
  }
`;
const DropDown = styled("ul")`
  position: absolute;
  right: 0;
  top: 3em;
  border-radius: 5px;
  overflow: hidden;
  transform-origin: 100% 0;
  transform: scale(0);
  animation-duration: 0.3s;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  li {
    display: block;
    width: 100%;
  }

  li a {
    width: 100%;
    padding: 1em 18px;
    display: inline-block;
    white-space: pre;
    box-sizing: border-box;
    color: white;
  }
  ${props =>
    !props.appear &&
    (props.isMounted
      ? css`
          animation-name: ${fadeInDown};
          transform: scale(1);
        `
      : css`
          animation-name: ${fadeOutDown};
        `)};
`;

const ShareIcon = props => {
  return (
    <Container onClick={props.clicked}>
      <Icon />
      <DropDown appear={props.appear} isMounted={props.isMounted}>
        <li style={{ background: "#3b5998" }}>
          <a href="http://www.g.com">share on Facebook</a>
        </li>
        <li style={{ background: "#00aced" }}>
          <a href="http://www.g.com">share on Linkedin</a>
        </li>
        <li style={{ background: "#0077b5" }}>
          <a href="http://www.g.com">share on Twitter</a>
        </li>
      </DropDown>
    </Container>
  );
};

export default ShareIcon;
