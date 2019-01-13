import React, { Component } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import Loading from "../components/Loading/Loading";
import ErrorPage from "../components/Error/Error";
import { api } from "../services/api";

class ListOfArticle extends Component {
  state = {
    articles: [],
    error: null
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(`${api}/api/articles/`);
      this.setState({ articles: data });
    } catch (error) {
      let err = {};
      if (!error.response) {
        // network error
        err = {
          status: 503,
          data: {},
          statusText: "Network Error"
        };
      } else {
        err = {
          status: error.response.status,
          data: error.response.data,
          statusText: error.response.statusText
        };
      }
      this.setState({ error: err });
    }
  }

  render() {
    const { articles, error } = this.state;
    const listOfCards = articles.map((article, i) => {
      return <ArticleCard key={article._id + i} article={article} />;
    });
    if (!error && articles.length > 0) return listOfCards;
    else if (error)
      return <ErrorPage status={error.status} message={error.statusText} />;
    return <Loading />;
  }
}

export default ListOfArticle;
