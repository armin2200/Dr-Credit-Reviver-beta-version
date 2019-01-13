import React from "react";
import styled, { css } from "react-emotion";
import { Link } from "react-router-dom";
const Container = styled("div")`
  display: flex;
  justify-self: center;
  align-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #eee;
  background: #222;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  /* height: 400px; */
  padding: 0 10px;
  /* width: 400px; */
  /* max-width: 500px; */
  box-sizing: border-box;
  box-shadow: 2px -2px 21px 1px rgba(0, 0, 0, 0.993);
  border-radius: 10px;
`;
const ErrorsText = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  p {
    margin: 10px 0 20px 0;
  }
  @media only screen and (max-width: 640px) {
    p {
      font-size: 80%;
    }
  }
`;

const Status = styled("div")`
  position: relative;
  box-sizing: border-box;
  text-justify: center;
  margin-top: 20px;
  background: #ef4824;
  color: #fff;
  font-size: 200%;
  padding: 0 20px;
  border-radius: 5px;
  font-weight: bolder;
  transition: all 0.5s;
  cursor: pointer;
  animation: jelly 0.5s;
  &:hover {
    background: #d7401f;
    color: #fff;
  }
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #ef4824;
    border-width: 7px;
    margin-left: -7px;
  }
  @media only screen and (max-width: 640px) {
    .Status {
      font-size: 100%;
    }
  }
`;

const Btn = styled("div")`
  margin-bottom: 30px;
  margin-top: 10px;
  a {
    color: white;
    background: #4c4c4c;
    padding: 10px;
    border-radius: 7px;
    text-decoration: none;
  }
`;
const ErrorPage = ({ status = "ERROR", message = "Network Error" }) => {
  return (
    <div
      className={css`
        display: grid;
        height: calc(100vh - 180px);
      `}
    >
      <Container>
        <ErrorsText>
          <Status>{status}</Status>
          <p>{message}</p>
        </ErrorsText>
        <Btn>
          <Link to="/Home">Back To Home</Link>
        </Btn>
      </Container>
    </div>
  );
};

export default ErrorPage;
