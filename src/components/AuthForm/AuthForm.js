import React, { PureComponent } from "react";
import styled, { css } from "react-emotion";
import { NavLink, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";

export const Container = styled("div")`
  width: 525px;
  /* height: 675px; */
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  box-shadow: 0px 0px 50px -20px #000;
  & a {
    text-decoration: none;
  }
  @media (max-width: 524px) {
    width: 400px;
  }
  @media (max-width: 399px) {
    width: 100%;
  }
`;
export const Warp = styled("div")`
  width: 400px;
  margin: 0 auto;
  @media (max-width: 524px) {
    width: 300px;
  }
  @media (max-width: 399px) {
    width: 80%;
  }
  @media (max-width: 330px) {
    width: 90%;
  }
`;
export const Headings = styled("div")`
  display: flex;
  margin: 50px auto 20px;
  & > a:first-child {
    margin-left: 20px;
    margin-right: 45px;
  }

  & > a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    padding-bottom: 10px;
    border-bottom: solid 2px rgba(17, 97, 237, 0);
    display: inline-block;
  }

  & > a:hover {
    color: rgba(255, 255, 255, 1);
  }

  & > a.active {
    color: rgba(255, 255, 255, 1);
    border-bottom: solid 2px rgba(17, 97, 237, 1);
  }

  & > a span {
    font-size: 22px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;
export const Label = styled("label")`
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  padding: 13px 20px;
  position: relative;
  display: block;
  font-size: 14px;
`;

export const Input = styled("input")`
  width: 100%;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(255, 255, 255, 0);
  margin-bottom: 10px;

  &:active,
  &:focus {
    border: 2px solid rgba(255, 255, 255, 0.7);
  }
  &[type="checkbox"] {
    width: inherit;
    padding: 0;
    margin: 20px 5px 30px 20px;
  }

  &[type="checkbox"] + span {
    color: #fff;
  }
  &[type="submit"] {
    appearance: none;
    width: 100%;
    background: #4082f5;

    text-transform: uppercase;
    padding: 12px;
    cursor: pointer;
    box-shadow: 0px 10px 40px 0px rgba(17, 97, 237, 0.4);
  }

  &[type="submit"]:hover {
    background: #5a96ff;
  }
`;

const Svg = styled("svg")`
  fill: rgba(255, 255, 255, 0.7);
  height: 24px;
  font-size: 25px;
  float: right;
  position: relative;
  top: -43px;
  right: 15px;
  cursor: pointer;
  &:hover {
    fill: rgba(255, 255, 255, 1);
  }
`;
const SingUpForm = styled("div")`
  &[type="submit"] {
  }
`;
const Hr = styled("div")`
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  margin: 60px 0px 40px auto;
  @media (max-width: 524px) {
    margin-top: 20px;
  }
`;
const Fp = styled("div")`
  text-align: center;
  padding-bottom: 40px;

  a {
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
const SingInForm = styled("div")`
  display: block;
`;

export const errorMessage = css`
  color: #a94442;
  border: 1px solid transparent;
  background-color: #f2dede;
  border-color: #ebccd1;
  padding: 15px;
  border-radius: 4px;
  font-size: 14px;
`;
export const successMessage = css`
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  padding: 15px;
  border-radius: 4px;
  font-size: 14px;
`;
export const infoMessage = css`
  color: #31708f;
  border: 1px solid transparent;
  background-color: #d9edf7;
  border-color: #bce8f1;
  padding: 15px;
  border-radius: 4px;
  font-size: 14px;
`;

const Msg = () => (
  <div>
    Your account has not been verified. Check your email or resend
    <Link to="/confirmation"> Confirmation Email</Link> .
  </div>
);

class AuthForm extends PureComponent {
  state = {
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    formErrors: { email: "", fullname: "", password: "" },
    emailValid: true,
    passwordValid: true,
    fullnameValid: true,
    formValid: false,
    errors: [],
    hide: true,
    signedIn: true,
    redirectToReferrer: false
  };
  async componentDidMount() {
    if (this.props.match.params.token) {
      try {
        const token = this.props.match.params.token;
        const { data } = await axios.post(`${api}/api/users/confirmation`, {
          token
        });
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
  passwordToggleHandler = () => {
    this.setState(prevState => {
      return { hide: !prevState.hide };
    });
  };
  restState = () => {
    this.setState({
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      formErrors: { email: "", fullname: "", password: "" },
      emailValid: true,
      passwordValid: true,
      fullnameValid: true,
      formValid: false,
      errors: [],
      hide: true,
      signedIn: true,
      redirectToReferrer: false
    });
    this.props.removeError();
  };
  changeHandler = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  validateField = () => {
    let fieldValidationErrors = {};
    let emailValid = true;
    let passwordValid = true;
    let fullnameValid = true;
    let email = this.state.email;
    let password = this.state.password;
    let fullname = this.state.fullname;

    if (email.length === 0) {
      emailValid = false;
      fieldValidationErrors.email = "Email is required";
    }
    if (emailValid && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      emailValid = false;
      fieldValidationErrors.email = "Email is invalid";
    }
    if (password.length === 0) {
      passwordValid = false;
      fieldValidationErrors.password = "Password is required";
    }
    if (passwordValid && password.length < 7) {
      passwordValid = false;
      fieldValidationErrors.password = "Password must be at least 7 characters";
    }
    if (fullname.length === 0) {
      fullnameValid = false;
      fieldValidationErrors.fullname = "Fullname is required";
    }
    if (fullnameValid && !fullname.match(/^[a-zA-Z ]+$/)) {
      fullnameValid = false;
      fieldValidationErrors.fullname = "letters only";
    }
    if (fullnameValid && fullname.length <= 2) {
      fullnameValid = false;
      fieldValidationErrors.fullname = "fullName must be at least 3 characters";
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      fullnameValid
    });
    if (this.props.signUp) {
      return emailValid && passwordValid && fullnameValid;
    } else {
      return emailValid && passwordValid;
    }
  };
  submitHandler = async e => {
    e.preventDefault();
    this.setState({ errors: "" });
    toast.dismiss();
    if (this.validateField()) {
      const authType = this.props.signUp ? "signup" : "signin";
      if (authType === "signup") {
        if (this.state.password !== this.state.confirmPassword) {
          const errors = [];
          errors.push("Passwords do not match");
          this.setState({
            errors
          });
        } else {
          try {
            const obj = {
              email: this.state.email,
              fullname: this.state.fullname,
              password: this.state.password
            };
            const { data } = await axios.post(`${api}/api/users/signup`, obj);
            toast.info(data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
              className: `${infoMessage}`
            });
          } catch (error) {
            this.setState({ errors: error.response.data.error.message });
            return;
          }
        }
      } else {
        this.props
          .onAuth(authType, this.state)
          .then(() => {
            this.props.removeError();
            this.setState({ redirectToReferrer: true });
          })
          .catch(() => {
            this.props.errors.message === "Your account has not been verified."
              ? toast.info(<Msg />, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: false,
                  className: `${infoMessage}`
                })
              : this.setState({ errors: this.props.errors.message });
            return;
          });
      }
    }
  };
  render() {
    let errMsg = [];
    if (Array.isArray(this.state.errors)) {
      errMsg = this.state.errors.map((err, i) => (
        <Label
          className={css`
            color: #962d22;
            padding: 3px 5px;
          `}
          key={err + i}
        >
          {err.replace("Path", "")}
        </Label>
      ));
    }
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

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
              <NavLink
                to="/login"
                activeClassName="active"
                exact
                id="sign-in"
                onClick={this.restState}
              >
                <span>Log In</span>
              </NavLink>
              <NavLink
                to="/signup"
                exact
                id="sign-up"
                activeClassName="active"
                onClick={this.restState}
              >
                <span>Sign Up</span>
              </NavLink>
            </Headings>
            {this.props.logIn && (
              <SingInForm>
                <form onSubmit={this.submitHandler}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    onChange={this.changeHandler}
                  />
                  <Label
                    className={css`
                      color: #962d22;
                    `}
                  >
                    {this.state.formErrors.email}
                  </Label>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type={this.state.hide ? "password" : "text"}
                    name="password"
                    onChange={this.changeHandler}
                  />
                  <span onClick={this.passwordToggleHandler}>
                    {!this.state.hide ? (
                      <Svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z" />
                      </Svg>
                    ) : (
                      <Svg
                        aria-hidden="true"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M272.702 359.139c-80.483-9.011-136.212-86.886-116.93-167.042l116.93 167.042zM288 392c-102.556 0-192.092-54.701-240-136 21.755-36.917 52.1-68.342 88.344-91.658l-27.541-39.343C67.001 152.234 31.921 188.741 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.004 376.006 168.14 440 288 440a332.89 332.89 0 0 0 39.648-2.367l-32.021-45.744A284.16 284.16 0 0 1 288 392zm281.354-111.631c-33.232 56.394-83.421 101.742-143.554 129.492l48.116 68.74c3.801 5.429 2.48 12.912-2.949 16.712L450.23 509.83c-5.429 3.801-12.912 2.48-16.712-2.949L102.084 33.399c-3.801-5.429-2.48-12.912 2.949-16.712L125.77 2.17c5.429-3.801 12.912-2.48 16.712 2.949l55.526 79.325C226.612 76.343 256.808 72 288 72c119.86 0 224.996 63.994 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM528 256c-44.157-74.933-123.677-127.27-216.162-135.007C302.042 131.078 296 144.83 296 160c0 30.928 25.072 56 56 56s56-25.072 56-56l-.001-.042c30.632 57.277 16.739 130.26-36.928 171.719l26.695 38.135C452.626 346.551 498.308 306.386 528 256z" />
                      </Svg>
                    )}
                  </span>
                  <Label
                    className={css`
                      color: #962d22;
                    `}
                  >
                    {this.state.formErrors.password}
                  </Label>
                  <div
                    className={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <Input
                      name="signedIn"
                      id="remember"
                      className={css`
                        cursor: pointer;
                      `}
                      type="checkbox"
                      checked={this.state.signedIn}
                      onChange={this.changeHandler}
                    />
                    <Label
                      htmlFor="remember"
                      className={css`
                        padding: 0;
                        margin: 20px 5px 30px 0px;
                        cursor: pointer;
                      `}
                    >
                      Keep me Signed in
                    </Label>
                  </div>
                  <Label
                    className={css`
                      color: #962d22;
                    `}
                  >
                    {this.state.errors}
                  </Label>
                  <Input type="submit" name="submit" value="Log in" />
                </form>

                <footer>
                  <Hr />
                  <Fp>
                    <Link to="/forgot">Forgot Password?</Link>
                  </Fp>
                </footer>
              </SingInForm>
            )}
            {this.props.signUp && (
              <SingUpForm>
                <form onSubmit={this.submitHandler}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={this.changeHandler}
                    type="text"
                    name="email"
                  />
                  <Label
                    className={css`
                      color: #962d22;
                    `}
                  >
                    {this.state.formErrors.email}
                  </Label>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    onChange={this.changeHandler}
                    type="text"
                    name="fullname"
                  />
                  <Label
                    className={css`
                      color: #962d22;
                    `}
                  >
                    {this.state.formErrors.fullname}
                  </Label>
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
                    {this.state.formErrors.password}
                  </Label>
                  <Label htmlFor="confirmPassword">Password Confirmation</Label>
                  <Input
                    onChange={this.changeHandler}
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                  />
                  {errMsg}
                  <Input
                    type="submit"
                    name="submit"
                    value="Create Account"
                    className={css`
                      margin-top: 20px;
                    `}
                  />
                </form>
              </SingUpForm>
            )}
          </Warp>
        </Container>
      </div>
    );
  }
}
export default AuthForm;
