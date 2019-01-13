import React, { Component } from "react";
import styled, { css } from "react-emotion";
import axios from "axios";
import { updateProfile } from "../../store/actions/auth";
import { connect } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, errorMessage } from "../AuthForm/AuthForm";
import { api } from "../../services/api";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f7f7f7;
  font-family: "Open Sans", sans-serif;
  @media (max-width: 600px) {
    display: block;
  }
`;
const Wrapper = styled("div")`
  min-width: 550px;
  border-radius: 20px;
  background: white;
  color: #7b7b7b;
  @media (max-width: 600px) {
    margin: 20px auto;
    min-width: auto;

    max-width: 550px;
    width: 100%;
  }
`;
const H1 = styled("h1")`
  margin: 15px;
  font-size: 20px;
  color: #fff;
`;
const H2 = styled("p")`
  font-size: 75%;
  font-weight: 400;
  word-break: break-all;
  margin-top: 50px;
  color: #fff;
  @media (max-width: 600px) {
    margin-top: 10px;
    padding-bottom: 50px;
  }
`;

const Form = styled("form")`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const PicSide = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  text-align: center;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  border-radius: 20px 0 0 20px;
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 20px 20px 0 0;
  }
`;
const PicContainer = styled("div")`
  overflow: hidden;
  position: relative;
  border: 3px solid #fff;
  border-radius: 100%;
  width: 150px;
  color: #fff;

  height: 150px;
  flex-basis: 150px;
  background-size: cover;
  background-position: center;
  line-height: 150px;
  text-align: center;
  font-size: 14px;
`;

const PicForeground = styled("div")`
  position: absolute;
  top: 0;
  right: -3px;
  width: 150px;
  height: 150px;
  text-align: center;
  color: transparent;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  &:hover {
    color: #fff;
    text-align: center;
    background-color: rgba(20, 20, 20, 0.75);
  }
`;

const InputContainer = styled("div")`
  flex-basis: calc(100% - 240px);
  padding: 30px;
  & div {
    margin-bottom: 15px;
  }
`;
const Label = styled("label")`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;
const ErrorMsg = styled("p")`
  display: block;
  font-size: 12px;
  color: #962d22;
  margin-bottom: 8px;
  margin-top: 2px;
`;
const Input = styled("input")`
  outline: none;
  &[type="file"] {
    display: none;
  }
  &[type="text"],
  &[type="email"],
  &[type="password"] {
    width: 100%;
    padding: 10px 15px;
    border-width: 0;
    background: #e6e6e6;
    outline: none;
    margin: 0;
    border-radius: 20px;
  }
  &[type="text"]:focus,
  &[type="email"]:focus,
  &[type="password"]:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
  }

  &[type="submit"] {
    appearance: none;
    cursor: pointer;
    padding: 10px 0;
    border-width: 0;
    display: block;
    border-radius: 20px;

    width: 100%;
    margin: 25px auto 0;
    background: #60e6c5;
    color: white;
    font-size: 14px;
    outline: none;
    text-transform: uppercase;
  }
  &[type="submit"]:disabled {
    cursor: not-allowed;
    background: #beeadf;
  }
`;
const Svg = styled("svg")`
  fill: #60e6c5;
  height: 20px;
  font-size: 25px;
  float: right;
  position: relative;
  top: -26px;
  right: 14px;
  cursor: pointer;
  transition: transform 0.2s linear;
  &:hover {
    /* fill: rgba(255, 255, 255, 1); */
  }
`;
const DeleteIcon = styled("svg")`
  fill: #60e6c5;
  height: 20px;
  font-size: 25px;
  margin-top: 20px;
  cursor: pointer;
  transition: opacity 0.2s linear;

  &:hover {
    /* fill: rgba(255, 255, 255, 1); */
  }
`;
class ProfilePage extends Component {
  state = {
    fullname: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    imageURL: "",
    value: "Upload Profile Pic",
    selectedFile: null,
    disableFullname: true,
    disablePassword: true,
    hasPicChange: false,
    formErrors: {
      fullname: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    fullnameValid: true,
    oldPasswordValid: true
  };
  fileInput = React.createRef();
  textInput = React.createRef();
  passwordInput = React.createRef();
  profileBackground = React.createRef();

  componentDidMount() {
    if (this.props.user.profileImageUrl) {
      this.setState({ value: "" });
    }
    this.setState({
      fullname: this.props.user.fullname,
      imageURL: this.props.user.profileImageUrl
    });
  }
  changeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  editTextHandler = () => {
    if (!this.state.disableFullname) {
      const formErrors = this.state.formErrors;
      formErrors.fullname = "";
      this.setState({
        fullname: this.props.user.fullname,
        formErrors
      });
    }
    this.setState(state => ({ disableFullname: !state.disableFullname }));
    setTimeout(() => {
      this.textInput.current.focus();
    }, 100);
  };
  editPasswordHandler = () => {
    if (!this.state.disablePassword) {
      const passwordsError = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        fullname: this.state.formErrors.fullname
      };
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        formErrors: { ...passwordsError }
      });
    }
    this.setState(state => ({ disablePassword: !state.disablePassword }));
    setTimeout(() => {
      this.passwordInput.current.focus();
    }, 100);
  };
  deletePicHandler = () => {
    if (this.state.imageURL) {
      this.setState({
        value: "Upload Profile Pic",
        imageURL: "",
        hasPicChange: true,
        selectedFile: ""
      });
    }
  };
  fileToggleHandler = () => {
    this.fileInput.current.click();
  };
  changePicHandler = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({
          imageURL: e.target.result,
          value: ""
        });
      };

      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        selectedFile: event.target.files[0],
        hasPicChange: true
      });
      event.target.value = null;
    }
  };

  validateField = () => {
    let fieldValidationErrors = {};
    let oldPasswordValid = true;
    let fullnameValid = true;
    let newPasswordValid = true;
    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let fullname = this.state.fullname;
    if (!this.state.disablePassword) {
      if (oldPassword.length === 0) {
        oldPasswordValid = false;
        fieldValidationErrors.oldPassword = "Password is required";
      }
      if (oldPasswordValid && oldPassword.length < 7) {
        oldPasswordValid = false;
        fieldValidationErrors.oldPassword =
          "Password must be at least 7 characters";
      }
      if (this.state.newPassword === this.state.confirmPassword) {
        if (newPassword.length === 0) {
          newPasswordValid = false;
          fieldValidationErrors.newPassword = "Password is required";
        }
        if (newPasswordValid && newPassword.length < 7) {
          newPasswordValid = false;
          fieldValidationErrors.newPassword =
            "Password must be at least 7 characters";
        }
      } else {
        fieldValidationErrors.confirmPassword =
          "New Password and confirm Password do not match";
        newPasswordValid = false;
      }
    }
    if (!this.state.disableFullname) {
      if (fullname.length === 0) {
        fullnameValid = false;
        fieldValidationErrors.fullname = "Fullname is required";
      }
      if (fullnameValid && !fullname.match(/^[a-zA-Z ]+$/)) {
        fullnameValid = false;
        fieldValidationErrors.fullname = "letters only";
      }
      if (fullnameValid && fullname.length < 2) {
        fullnameValid = false;
        fieldValidationErrors.fullname =
          "fullname must be at least 2 characters";
      }
    }
    this.setState({
      formErrors: fieldValidationErrors,
      oldPasswordValid,
      fullnameValid,
      newPasswordValid
    });
    return fullnameValid && oldPasswordValid && newPasswordValid;
  };
  submitHandler = async e => {
    e.preventDefault();
    let formData = new FormData();
    if (this.state.selectedFile || this.state.selectedFile === "") {
      formData.append("profileImageUrl", this.state.selectedFile);
    }
    formData.append("hasPicChange", this.state.hasPicChange);
    if (this.validateField()) {
      if (!this.state.disableFullname) {
        formData.append("fullname", this.state.fullname);
      }
      if (!this.state.disablePassword) {
        formData.append("newPassword", this.state.newPassword);
        formData.append("password", this.state.oldPassword);
      }
      try {
        const { data } = await axios.patch(
          `${api}/api/users/${this.props.user._id}/profile`,
          formData
        );
        this.props.updateProfile(data);
        this.setState({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });

        toast.success("Your profile has been updated successfully", {
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
  };
  render() {
    return (
      <Container>
        <Wrapper>
          <ToastContainer
            transition={Zoom}
            className={css`
              top: 70px;
            `}
          />
          <Form onSubmit={this.submitHandler}>
            <PicSide>
              <H1>Profile</H1>

              <Input
                innerRef={this.fileInput}
                name="profilePicture"
                type="file"
                accept="image/png, image/jpeg"
                onChange={this.changePicHandler}
              />

              <PicContainer
                style={{
                  backgroundImage:
                    this.state.imageURL && `url(${this.state.imageURL})`
                }}
              >
                {this.state.value}
                <PicForeground onClick={this.fileToggleHandler}>
                  Upload Profile Pic
                </PicForeground>
              </PicContainer>
              <div onClick={this.deletePicHandler}>
                <DeleteIcon
                  className={css`
                    opacity: ${this.state.imageURL ? `1` : `0`};
                    cursor: ${this.state.imageURL ? `pointer` : `auto`};
                  `}
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z" />
                </DeleteIcon>
              </div>

              <H2>{this.props.user.email}</H2>
            </PicSide>
            <InputContainer>
              <div>
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={this.state.fullname}
                  id="fullname"
                  onChange={this.changeHandler}
                  disabled={this.state.disableFullname}
                  innerRef={this.textInput}
                />
                <span onClick={this.editTextHandler}>
                  <Svg
                    aria-hidden="true"
                    role="img"
                    className={css`
                      transform: ${!this.state.disableFullname &&
                        `rotate(45deg)`};
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
                  </Svg>
                </span>
                <ErrorMsg> {this.state.formErrors.fullname}</ErrorMsg>
              </div>
              <div>
                <Label htmlFor="old-password">Old Password</Label>
                <Input
                  type="password"
                  id="old-password"
                  name="oldPassword"
                  value={this.state.oldPassword}
                  disabled={this.state.disablePassword}
                  onChange={this.changeHandler}
                  innerRef={this.passwordInput}
                />
                <span onClick={this.editPasswordHandler}>
                  <Svg
                    aria-hidden="true"
                    role="img"
                    className={css`
                      transform: ${!this.state.disablePassword &&
                        `rotate(45deg)`};
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
                  </Svg>
                </span>
                <ErrorMsg> {this.state.formErrors.oldPassword}</ErrorMsg>
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  type="password"
                  id="new-password"
                  name="newPassword"
                  value={this.state.newPassword}
                  disabled={this.state.disablePassword}
                  onChange={this.changeHandler}
                />
                <ErrorMsg> {this.state.formErrors.newPassword}</ErrorMsg>
              </div>
              <Label>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  disabled={this.state.disablePassword}
                  onChange={this.changeHandler}
                />
              </Label>
              <ErrorMsg> {this.state.formErrors.confirmPassword}</ErrorMsg>
              <Input
                type="submit"
                disabled={
                  !this.state.hasPicChange &&
                  this.state.disableFullname &&
                  this.state.disablePassword
                }
                value="Save Profile"
              />
            </InputContainer>
          </Form>
        </Wrapper>
      </Container>
    );
  }
}

export default connect(
  null,
  { updateProfile }
)(ProfilePage);
