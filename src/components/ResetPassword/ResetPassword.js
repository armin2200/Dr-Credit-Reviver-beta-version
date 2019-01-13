import React, { Component } from "react";
import { css } from "react-emotion";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";
import {
  Container,
  Warp,
  Headings,
  Label,
  Input,
  infoMessage,
  errorMessage,
  successMessage
} from "../AuthForm/AuthForm";

class ResetPassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    error: "",
    passwordError: "",
    passwordValid: true
  };
  async componentDidMount() {
    try {
      const token = this.props.match.params.token;
      const { data } = await axios.get(`${api}/api/users/reset/${token}`);
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
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validateField = () => {
    let passwordValid = true;
    let password = this.state.password;
    let fieldValidationErrors = "";
    if (password.length === 0) {
      passwordValid = false;
      fieldValidationErrors = "Password is required";
    }
    if (passwordValid && password.length < 7) {
      passwordValid = false;
      fieldValidationErrors = "Password must be at least 7 characters";
    }
    this.setState({
      passwordError: fieldValidationErrors,
      passwordValid,
      error: ""
    });
    return passwordValid;
  };
  submitHandler = async e => {
    e.preventDefault();
    if (this.validateField()) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ error: "Passwords do not match" });
      } else {
        const token = this.props.match.params.token;
        const obj = { password: this.state.password };
        try {
          const { data } = await axios.put(
            `${api}/api/users/reset/${token}`,
            obj
          );
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            className: `${successMessage}`
          });
        } catch (error) {
          toast.error(error.response.data.error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            className: `${errorMessage}`
          });
        }
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
                <span>Reset Password</span>
              </a>
            </Headings>
            <div>
              <form onSubmit={this.submitHandler}>
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={this.changeHandler}
                  id="password"
                  type="password"
                  name="password"
                />
                <Label
                  className={css`
                    color: #962d22;
                  `}
                >
                  {this.state.passwordError}
                </Label>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  onChange={this.changeHandler}
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                />
                <Label
                  className={css`
                    color: #962d22;
                  `}
                >
                  {this.state.error}
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

export default ResetPassword;
