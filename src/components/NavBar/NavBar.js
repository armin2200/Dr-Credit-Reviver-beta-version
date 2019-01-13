import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import styled from "react-emotion";
import logo from "../../assets/logo.png";
import Menu from "../Menu/Menu";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import Avatar from "../Avatar/Avatar";
import UserBox from "../UserBox/UserBox";

const Nav = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  height: 70px;
  width: 100%;
  background-color: rgba(34, 34, 34, 1);
  position: relative;
  .Current {
    color: #ffffff;
  }
  .Current:before,
  .Current:after {
    width: 100%;
  }
  z-index: 100;
  @media (max-width: 600px) {
    /* justify-content: flex-start; */
    justify-content: space-between;
    /* padding-left: 0; */
  }
`;

const Logo = styled("div")`
  background-image: url(${logo});
  width: 50px;
  height: 50px;
  background-size: cover;
  @media (max-width: 600px) {
    /* margin-left: 7px; */
  }
`;

const Btn = styled("div")`
  display: none;
  @media (max-width: 600px) {
    display: block;
    /* position: absolute;
    right: 20px;
    top: 27px; */
  }
`;

const NavBarLink = styled("div")`
  display: flex;
  align-items: center;
  margin: 0 auto 0 30px;
  font-size: 16px;
  font-family: "Raleway", Arial, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  a {
    padding: 5px 0;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
    margin-left: 20px;
  }
  a:before,
  a:after {
    height: 3px;
    position: absolute;
    content: "";
    transition: all 0.35s ease;
    background-color: #3232af;
    width: 0;
  }
  a:before {
    top: 0;
    right: 0;
  }
  a:after {
    bottom: 0;
    left: 0;
  }
  a:focus {
    color: #ffffff;
  }

  a:focus:before,
  a:focus:after {
    width: 100%;
  }

  a:hover {
  }

  .ActiveLink {
    color: #ffffff;
    a::before,
    a::after {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    background-color: #333;
    height: ${props => (props.toggleStatus ? "calc(100vh - 70px)" : "0px")};
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    margin: 0;
    top: 70px;
    left: 0px;
    a {
      margin: 15px 0 0 4%;
    }
  }
  @media (pointer: fine) {
    a:hover {
      color: #ffffff;
      cursor: pointer;
    }
    a:hover:before,
    a:hover:after {
      width: 100%;
    }
  }
`;
const NavBarAuth = styled("div")`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  /* margin-left: auto; */
  /* width: 70%; */
  font-size: 16px;
  font-family: "Raleway", Arial, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
  }

  a:focus {
    color: #ffffff;
  }

  a:hover {
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 600px) {
  }
`;
const UserSection = styled("div")`
  outline-style: none;
`;
const UserContainer = styled("div")`
  position: absolute;
  top: 70px;
  right: 4px;
`;
class NavBar extends Component {
  state = {
    toggle: false,
    toggleDashboard: false,
    list: [
      { id: 1, title: "Home", path: "Home" },
      { id: 2, title: "About", path: "About" },
      { id: 3, title: "Submit Form", path: "SubmitForm" }
    ]
  };
  toggleHandler = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle, toggleDashboard: false };
    });
  };
  closeMenuHandler = () => {
    this.setState({ toggle: false });
  };

  toggleDashboardHandler = () => {
    this.setState(prevState => {
      return { toggleDashboard: !prevState.toggleDashboard, toggle: false };
    });
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Nav>
        <Btn>
          <Menu toggle={this.state.toggle} clicked={this.toggleHandler} />
        </Btn>
        <Link to="/Home">
          <Logo />
        </Link>

        <NavBarLink toggleStatus={this.state.toggle}>
          <NavLink
            exact
            to="/Home"
            activeClassName="Current"
            onClick={this.closeMenuHandler}
          >
            Home
          </NavLink>
          <NavLink
            exact
            to="/About"
            activeClassName="Current"
            onClick={this.closeMenuHandler}
          >
            About
          </NavLink>
          {currentUser.user.isAdmin && (
            <NavLink
              exact
              to="/SubmitForm"
              activeClassName="Current"
              onClick={this.closeMenuHandler}
            >
              Submit Form
            </NavLink>
          )}
        </NavBarLink>
        <NavBarAuth>
          {!currentUser.isAuthenticated ? (
            <Link
              exact="true"
              to={`/login`}
              key="4"
              onClick={this.closeMenuHandler}
            >
              <svg
                width="30"
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="gray"
                  d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                />
              </svg>
            </Link>
          ) : (
            <UserSection
              onBlur={this.toggleDashboardHandler}
              onClick={this.toggleDashboardHandler}
              // tabIndex="2"
            >
              <Avatar user={currentUser.user} />

              {this.state.toggleDashboard && (
                <UserContainer>
                  <UserBox
                    logout={this.logout}
                    fullName={currentUser.user.fullname}
                  />
                </UserContainer>
              )}
            </UserSection>
          )}
        </NavBarAuth>
      </Nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(NavBar)
);
