import React, { Component } from "react";
import styled, { css } from "react-emotion";
import axios from "axios";

import TextEditor2 from "../TextEditor/TextEditor2";
import { api } from "../../services/api";
const Container = styled("div")`
  background: #eee;
  color: darkslategray;
  h1 {
    text-align: center;
    font-weight: 100;
    font-size: 3em;
    padding-top: 1em;
  }
  form {
    margin: 0 auto;
    padding: 1em;
    /* max-width: 640px; */
    background: white;
    border-radius: 0.25em;
  }
`;

const Label = styled("label")`
  display: inline-block;
  margin: 0.5em 0;
`;

const Input = styled("input")`
  transition: border, 100ms;
  font-size: 1em;
  line-height: 1.5em;
  box-sizing: border-box;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.3em;
  background: #eee;
  display: block;
  margin: 0.5em 0;
  width: 100%;
  &:focus {
    border-left: 0.5em solid #3232af;
  }
  &:focus {
    color: darkslategray;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 10px 1px inset;
    box-sizing: border-box;
    outline: none;
    background: #f3f3f3;
  }
`;
const NumberInput = styled("input")`
  transition: border, 100ms;
  font-size: 1em;
  line-height: 1.5em;
  box-sizing: border-box;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.3em;
  background: #eee;
  display: block;
  margin: 0.5em 0;
  width: 100px;
  &:focus {
    border-left: 0.5em solid #3232af;
  }
  &:focus {
    color: darkslategray;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 10px 1px inset;
    box-sizing: border-box;
    outline: none;
    background: #f3f3f3;
  }
`;
const Textarea = styled("textarea")`
  transition: border, 100ms;
  font-size: 1em;
  line-height: 1.5em;
  box-sizing: border-box;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.3em;
  background: #eee;
  display: block;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  &:focus {
    border-left: 0.5em solid #3232af;
  }
  &:focus {
    color: darkslategray;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 10px 1px inset;
    box-sizing: border-box;
    outline: none;
    background: #f3f3f3;
  }
`;
const SubmitBtn = styled("button")`
  transition-property: background-color, color;
  transition-duration: 200ms;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0.5em 2em;
  width: 50%;
  border: none;
  border-radius: 0.3em;
  background-color: darkslategray;
  color: white;
  font-size: 1em;
  &:hover,
  &:active,
  &:focus {
    background-color: #3232af;
  }
`;

const ErrorMsg = styled("div")`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  width: fit-content;
  color: #d8000c;
  background-color: #ffbaba;
`;
class ArticleSubmitForm extends Component {
  state = {
    title: null,
    readTime: null,
    subtitle: null,
    articleBody: null,
    errors: []
  };
  blurHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  textEditorHandler = editorState => {
    this.setState({ articleBody: editorState });
  };
  submitHandler = async event => {
    try {
      event.preventDefault();
      const obj = {
        title: this.state.title,
        subTitle: this.state.subtitle,
        body: this.state.articleBody,
        readTime: this.state.readTime,
        isAdmin: this.props.user.isAdmin
      };
      const data = await axios.post(
        `${api}/api/articles/${this.props.user._id}`,
        obj
      );
      console.log(data);
      this.props.history.push("/home");
      // event.target.reset();
    } catch (error) {
      console.log(error.response);
      this.setState({ errors: error.response.data.error.message });
    }
  };
  render() {
    const errMsg = this.state.errors.map((err, i) => (
      <ErrorMsg key={err + i}>{err.replace("Path", "")}</ErrorMsg>
    ));
    return (
      <Container>
        <h1>Article Submit From</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onBlur={this.blurHandler}
            />
          </div>
          <div>
            <Label>Read time</Label>
            <NumberInput
              type="number"
              name="readTime"
              onBlur={this.blurHandler}
            />
          </div>
          <div>
            <Label>Abstract</Label>
            <Textarea
              type="textarea"
              cols="40"
              rows="8"
              name="subtitle"
              placeholder="Abstract"
              onBlur={this.blurHandler}
            />
          </div>
          <div
            className={css`
              min-height: 500px;
            `}
          >
            <Label>Full Article</Label>
            <TextEditor2 blurred={this.textEditorHandler} />
          </div>
          {this.state.errors && errMsg}
          <div>
            <SubmitBtn>Submit</SubmitBtn>
          </div>
        </form>
      </Container>
    );
  }
}

export default ArticleSubmitForm;
