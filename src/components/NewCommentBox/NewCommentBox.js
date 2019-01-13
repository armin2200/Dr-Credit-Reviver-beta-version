import React, { Component } from "react";
import styled from "react-emotion";
import Avatar from "../Avatar/Avatar";

const EditMetaInfo = styled("div")`
  display: flex;
  align-items: center;
`;
const CommentEditor = styled("div")`
  color: rgba(0, 0, 0, 0.84);
  font-size: 90%;
  line-height: 1.4;

  overflow: hidden;
  padding: 15px 5%;
  margin: 20px auto;
  max-width: 1000px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
`;
const CommentTitle = styled("div")`
  color: rgba(0, 0, 0, 0.54);
  font-size: 80%;
`;
const ProfileImg = styled("div")`
  img {
    border-radius: 100%;
    width: 40px;
    height: 40px;
  }
`;

const Info = styled("div")`
  font-size: 100%;
  line-height: 1.4;
  padding-left: 10px;
  text-rendering: auto;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  transform-origin:top;
  /* transform: ${props =>
    props.toggleStatus ? "scaleY(1) " : "scaleY(0)"}; */
  height: ${props => (props.toggleStatus ? "200px" : "0px")};
  transition: all 0.3s ease-in;
  overflow-y: hidden;
`;
const TextArea = styled("textarea")`
  outline: none;
  /* background: #efebea; */
  font-size: 90%;
  /* padding: 10px; */
  border: none;

  /* border-bottom: 1px solid black; */

  resize: none;
`;
const CommentBtn = styled("input")`
  width: 100px;
  height: 50px;
  margin-top: 5px;
  background: transparent;
  border-radius: 10px;
  /* transition: all 0.2s ease; */
  border: 2px solid #02b875;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  color: #1c9963;
  outline: none;
  text-align: center;
`;
const Author = styled("div")`
  color: #3232af;
  text-transform: capitalize;
`;
class NewCommentBox extends Component {
  state = {
    toggle: false
  };
  textareaRef = React.createRef();

  onClickHandler = () => {};
  onFocusHandler = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle };
    });
    this.textareaRef.current.focus();
  };
  closeFromHandler = () => {
    this.setState({ toggle: false });
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.commentPosted(this.textareaRef.current.value);
    e.target.reset();
  };
  render() {
    return (
      <CommentEditor>
        <EditMetaInfo>
          <ProfileImg>
            <Avatar user={this.props.user} />
          </ProfileImg>
          <Info>
            <CommentTitle onFocus={this.onFocusHandler} tabIndex="0">
              {!this.state.toggle ? (
                <p> Write a comment...</p>
              ) : (
                <Author>{this.props.user.fullname}</Author>
              )}
            </CommentTitle>
          </Info>
        </EditMetaInfo>
        <Form
          toggleStatus={this.state.toggle}
          onSubmit={this.submitHandler}
          onBlur={this.closeFromHandler}
        >
          <TextArea
            cols="30"
            rows="10"
            innerRef={this.textareaRef}
            placeholder="Write a comment..."
          />
          <CommentBtn type="submit" name="submit" value="Submit" />
        </Form>
      </CommentEditor>
    );
  }
}
export default NewCommentBox;
