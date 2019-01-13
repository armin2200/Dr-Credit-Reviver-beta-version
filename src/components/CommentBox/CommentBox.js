import React, { Component } from "react";
import styled from "react-emotion";
import Date from "../Date/Date";
import Avatar from "../Avatar/Avatar";

const CommentItem = styled("div")`
  color: rgba(0, 0, 0, 0.84);
  font-size: 90%;
  line-height: 1.4;
  display: flex;

  flex-direction: column;
  padding: 15px 5%;
  margin: 20px auto;
  max-width: 1000px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
`;
const PostMetaInfo = styled("div")`
  display: flex;
  align-items: center;
`;

const ImgProfile = styled("div")``;

const Info = styled("div")`
  font-size: 100%;
  line-height: 1.4;
  padding-left: 10px;
  text-rendering: auto;
`;
const Author = styled("div")`
  color: #3232af;
`;

const DateComment = styled("p")`
  color: rgba(0, 0, 0, 0.54);
  font-size: 80%;
`;

class CommentBox extends Component {
  render() {
    const listOfComments = this.props.comments.map((comment, i) => {
      return (
        <CommentItem key={comment._id}>
          <PostMetaInfo>
            <ImgProfile>
              <Avatar user={comment.user} />
            </ImgProfile>
            <Info>
              <Author>{comment.user.fullname}</Author>
              <DateComment>
                <Date format={"MMM D YYYY"} date={comment.createdAt} />
              </DateComment>
            </Info>
          </PostMetaInfo>
          <div>{comment.body}</div>
        </CommentItem>
      );
    });

    return listOfComments;
  }
}

export default CommentBox;
