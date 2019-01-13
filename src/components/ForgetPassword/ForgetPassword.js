import React, { Component } from "react";
import { css } from "react-emotion";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Warp,
  Headings,
  Label,
  Input,
  infoMessage,
  errorMessage
} from "../AuthForm/AuthForm";
import { api } from "../../services/api";
class ForgetPassword extends Component {
  state = {
    email: "",
    emailValid: true,
    emailError: ""
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validateField = () => {
    let emailValid = true;
    let email = this.state.email;
    let fieldValidationErrors = "";

    if (email.length === 0) {
      emailValid = false;
      fieldValidationErrors = "Email is required";
    }
    if (emailValid && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      emailValid = false;
      fieldValidationErrors = "Email is invalid";
    }
    this.setState({
      emailError: fieldValidationErrors,
      emailValid
    });
    return emailValid;
  };
  submitHandler = async e => {
    e.preventDefault();
    if (this.validateField()) {
      const obj = { email: this.state.email };
      try {
        const { data } = await axios.post(`${api}/api/users/reset`, obj);
        toast.info(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          className: `${infoMessage}`
        });
      } catch (error) {
        toast.error(error.response.data.error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          className: `${errorMessage}`
        });
      }
    }
  };
  render() {
    return (
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto 0;
          height: 100%;
        `}
      >
        <Container>
          <ToastContainer
            transition={Zoom}
            className={css`
              z-index: 1;
              width: 525px;
              margin: 0 auto;
              left: auto;
              top: 70px;
              padding: 0;
              @media (max-width: 524px) {
                width: 100vw;
                padding: 0;
                left: 0;
                margin: 0;
              }
            `}
            toastClassName={css`
              margin-left: auto;
            `}
          />
          <Warp>
            <Headings>
              <a href="">
                <span>Forgot Password</span>
              </a>
            </Headings>
            <div>
              <form onSubmit={this.submitHandler}>
                <Label htmlFor="email">Email</Label>
                <Input type="text" name="email" onChange={this.changeHandler} />
                <Label
                  className={css`
                    color: #962d22;
                  `}
                >
                  {this.state.emailError}
                </Label>
                <Input
                  type="submit"
                  name="submit"
                  value="Reset Password"
                  className={css`
                    margin-top: 20px;
                  `}
                />
              </form>
            </div>
          </Warp>
        </Container>
      </div>
    );
  }
}

export default ForgetPassword;
