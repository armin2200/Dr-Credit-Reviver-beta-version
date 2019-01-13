import React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #d6dadc;
  border-bottom-color: #c4c9cc;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 304px;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  text-transform: capitalize;

  /* padding: 0 12px 12px; */
`;
const Header = styled("div")`
  height: 40px;
  margin-bottom: 8px;
  text-align: center;
  span {
    box-sizing: border-box;
    color: #8c8c8c;
    display: block;
    line-height: 40px;
    border-bottom: 1px solid #d6dadc;
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }
`;
const Content = styled("div")`
  /* overflow-x: hidden;
  overflow-y: auto; */
  padding: 0 12px 12px;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
`;
const UserBox = props => {
  return (
    <Container>
      <Header>
        <span>{props.fullName}</span>
      </Header>

      <Link to="/profile">
        <Content>edit Profile </Content>
      </Link>

      <Content onClick={props.logout}>log out</Content>
    </Container>
  );
};

export default UserBox;
