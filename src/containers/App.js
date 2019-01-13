import React, { Component } from "react";
import styled, { css } from "react-emotion";
import Home from "./Home";
import NavBar from "../components/NavBar/NavBar";
import FootBar from "../components/Footer/Footer";
import ScrollIn from "./ScrollIn";
import ScrollButton from "../components/ScrollButton/ScrollButton";
import ArticlePage from "../components/ArticlePage/ArticlePage";
import AboutMe from "../components/AboutMe/AboutMe";
import ErrorPage from "../components/Error/Error";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import { authUser } from "../store/actions/auth";
import { connect } from "react-redux";
import { removeError } from "../store/actions/error";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import PrivateRoute from "../hoc/PrivateRoute";
import ArticleSubmitForm from "../components/ArticleSubmitFrom/ArticleSubmitFrom";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ConfirmationEmail from "../components/ConfirmationEmail/ConfirmationEmail";

const Container = styled("div")`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 70px 1fr 90px;
  grid-template-areas:
    "header"
    "body"
    "footer";
`;

class App extends Component {
  render() {
    const { authUser, removeError, errors, currentUser } = this.props;
    return (
      <Container>
        <div
          className={css`
            grid-area: header;
          `}
        >
          <NavBar />
        </div>

        <div
          className={css`
            grid-area: body;
          `}
        >
          <Switch>
            <Route
              path="/Home/:id"
              exact
              render={props => (
                <ArticlePage currentUser={currentUser} {...props} />
              )}
            />
            <Route path="/Home" exact component={Home} />
            <Route
              path="/login"
              exact
              render={props =>
                !currentUser.isAuthenticated ? (
                  <AuthForm
                    errors={errors}
                    removeError={removeError}
                    onAuth={authUser}
                    {...props}
                    logIn
                  />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />

            <Route
              path="/signup"
              exact
              render={props =>
                !currentUser.isAuthenticated ? (
                  <AuthForm
                    errors={errors}
                    removeError={removeError}
                    onAuth={authUser}
                    {...props}
                    signUp
                  />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />
            <Route
              path="/confirmation/:token"
              exact
              render={props => (
                <AuthForm
                  errors={errors}
                  removeError={removeError}
                  onAuth={authUser}
                  {...props}
                  logIn
                />
              )}
            />
            {!currentUser.isAuthenticated && (
              <Route
                path="/confirmation"
                exact
                render={props => (
                  <ConfirmationEmail
                    errors={errors}
                    removeError={removeError}
                    currentUser={currentUser}
                    onAuth={authUser}
                    {...props}
                  />
                )}
              />
            )}
            {!currentUser.isAuthenticated && (
              <Route
                path="/forgot"
                exact
                render={props => (
                  <ForgetPassword
                    errors={errors}
                    removeError={removeError}
                    onAuth={authUser}
                    {...props}
                  />
                )}
              />
            )}
            <Route
              path="/reset/:token"
              exact
              render={props => (
                <ResetPassword
                  errors={errors}
                  removeError={removeError}
                  onAuth={authUser}
                  {...props}
                />
              )}
            />
            <PrivateRoute
              exact
              path="/profile"
              user={currentUser.user}
              isAuthenticated={currentUser.isAuthenticated}
              component={ProfilePage}
              redirectPath="/login"
            />

            <Route exact path="/About" component={AboutMe} />
            {currentUser.user.isAdmin && (
              <Route
                exact
                path="/SubmitForm"
                render={props => (
                  <ArticleSubmitForm {...props} user={currentUser.user} />
                )}
              />
            )}

            <Redirect exact from="/" to="/Home" />
            <Route
              path="*"
              render={() => (
                <ErrorPage status="404" message="The page Doesn't exist." />
              )}
            />
          </Switch>
        </div>
        <ScrollIn scrollInHeight={600}>
          <ScrollButton scrollStepInPx="70" delayInMs="12" />
        </ScrollIn>
        <div
          className={css`
            grid-area: footer;
          `}
        >
          <FootBar />
        </div>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { authUser, removeError }
  )(App)
);
