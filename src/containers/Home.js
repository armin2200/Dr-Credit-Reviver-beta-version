import React, { Component } from "react";
import HomeTitle from "../components/HomeTitle/HomeTitle";
import styled from "react-emotion";
import ListOfArticle from "./ListOfArticle";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
class Home extends Component {
  render() {
    return (
      <Container>
        <HomeTitle />
        <ListOfArticle />
      </Container>
    );
  }
}

export default Home;
