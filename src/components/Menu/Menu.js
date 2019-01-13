import React from "react";
import styled, { css } from "react-emotion";

const MenuItem = styled("span")`
  transition: all 0.2s;
  display: block;
  width: 30px;
  border-radius: 30px;
  height: 4px;
  margin: 0 0 3px;
  background: #962d22;
`;
const Container = styled("div")`
  width: 30px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.toggle &&
    css`
      & span:first-child {
        transform: rotate(45deg);
        transform-origin: 7px 50%;
      }
      & span:nth-child(2) {
        transform: translateX(40px);
        background: #962d22;
        opacity: 0;
      }
      & span:nth-child(3) {
        transform: rotate(-45deg);
        transform-origin: 4px 50%;
      }
    `};
`;

const Menu = props => {
  return (
    <Container toggle={props.toggle} onClick={props.clicked}>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </Container>
  );
};

export default Menu;
