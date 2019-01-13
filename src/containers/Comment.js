import React, { PureComponent } from "react";
import styled, { css } from "react-emotion";
import axios from "axios";
import NewCommentBox from "../components/NewCommentBox/NewCommentBox";
import CommentBox from "../components/CommentBox/CommentBox";
import { connect } from "react-redux";
import { api } from "../services/api";
import AuthComment from "../components/AuthComment/AuthComment";
const Container = styled("div")`
  background-color: #fafafa;
  color: rgba(0, 0, 0, 0.84);
  padding: 5px;
`;
const Hr = styled("hr")`
  margin-bottom: 20px;
  height: 3px;
  border: 0;
  box-shadow: 0 10px 10px -10px black inset;
  width: 75px;
  margin-left: 10px;
`;

class Comment extends PureComponent {
  state = {
    comments: []
  };
  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }
  postCommentHandler = async comment => {
    const { articleId, currentUser } = this.props;
    const obj = {
      body: comment,
      articleId
    };
    try {
      await axios.post(`${api}/api/comments/${currentUser.user._id}`, obj);
      const { data } = await axios.get(`${api}/api/articles/${articleId}`);
      this.setState({ comments: data.comments });
    } catch (error) {
      console.log(error.response);
    }
  };
  render() {
    const { currentUser } = this.props;
    return (
      <Container>
        {currentUser.isAuthenticated ? (
          <NewCommentBox
            user={currentUser.user}
            commentPosted={comment => this.postCommentHandler(comment)}
          />
        ) : (
          <AuthComment />
        )}

        <div
          className={css`
            margin: 0 auto;
            max-width: 1000px;
          `}
        >
          <Hr />
        </div>
        <CommentBox comments={this.state.comments} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Comment);
