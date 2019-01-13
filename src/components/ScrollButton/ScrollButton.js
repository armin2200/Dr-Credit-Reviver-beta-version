import styled from "react-emotion";
import React, { PureComponent } from "react";

const FixedButton = styled("div")`
  width: 60px;
  height: 60px;
  outline: none;
  background-color: rgba(1, 110, 193, 0.7);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(75, 115, 170, 1);
  }
`;

class ScrollButton extends PureComponent {
  state = {
    intervalId: 0
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  };

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  };
  render() {
    return (
      <FixedButton onClick={this.scrollToTop}>
        <svg
          fill="#ffffff"
          height="48"
          viewBox="0 0 24 24"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </FixedButton>
    );
  }
}

export default ScrollButton;
