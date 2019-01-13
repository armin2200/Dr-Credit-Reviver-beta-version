import React from "react";
import styled, { css } from "react-emotion";
import Date from "../Date/Date";
import { Link, withRouter } from "react-router-dom";

const H2 = styled("h2")`
  margin-left: 32px;
  font-family: "Fjalla One", sans-serif;
  padding-bottom: 6px;
  color: #1a1b23;
  font-size: 160%;
  &::after {
    display: block;
    content: "";
    margin-top: 12px;
    transform: translateX(-30px);
    width: 100px;
    height: 3px;
    background: #d16666;
    transition: transform linear 0.3s;
  }
`;
const Container = styled("div")`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 40px;
  max-width: 900px;
  height: 100%;
  overflow: hidden;
  background: white;
  border-radius: 4px;
  &:hover h2::after {
    transform: translateX(0px);
  }
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }
`;

const MetaData = styled("div")`
  margin: 15px 32px 0px;
  small {
    font-family: "Lora", serif;
    margin: 0;
    padding: 0;
    color: #656a73;
    font-style: italic;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Info = styled("div")`
  max-width: 100%;
  overflow: visible;
  margin: 15px 32px 32px;
  p {
    font-family: "Rubik", sans-serif;
    color: #1a1b23;
    font-size: 90%;
    line-height: 1.3;
  }
`;
const PreviewBtn = css`
  font-family: "Fjalla One", sans-serif;
  display: block;
  padding: 12px;
  margin-left: 32px;
  text-decoration: none;
  text-align: center;
  color: #656a73;
  font-size: 14px;
  width: 150px;
  font-weight: 300px;
  letter-spacing: 1px;
  line-height: 1.4;
  text-transform: uppercase;
  border: 1px solid #d16666;
  transition: all linear 0.3s;
  border-radius: 35px;
  margin-bottom: 40px;
  &:hover {
    background: #d16666;
    color: black;
    cursor: pointer;
  }
`;
const ArticleCard = ({ article, ...props }) => {
  return (
    <Container>
      <H2>{article.title}</H2>
      <MetaData>
        <small>
          Posted <Date format={"MMM Do YYYY"} date={article.createdAt} /> by{" "}
          {article.author}
        </small>{" "}
      </MetaData>
      <Info>
        <p>{article.subTitle}</p>
      </Info>
      <Link to={`${props.match.path}/${article._id}`} className={PreviewBtn}>
        Full article
      </Link>{" "}
      <hr />
    </Container>
  );
};

export default withRouter(ArticleCard);
