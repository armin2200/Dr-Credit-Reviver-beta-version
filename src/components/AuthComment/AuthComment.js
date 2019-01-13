import React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";
const Container = styled("div")`
  border: solid 1px rgba(232, 230, 230, 0.75);
  margin: 20px auto;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 100px;
  background: white;
`;
const Description = styled("div")`
  margin: auto;
  color: rgba(65, 65, 65, 1);
  font-size: 80%;
  a {
    text-decoration: none;
    color: rgba(65, 65, 65, 1);
  }
  span {
    color: rgba(245, 49, 46, 1);
  }
`;
const AuthComment = () => {
  return (
    <Container>
      <Description>
        <Link to="/Login">
          <span>Log in</span> to leave a comment!
        </Link>
      </Description>
    </Container>
  );
};

export default AuthComment;
