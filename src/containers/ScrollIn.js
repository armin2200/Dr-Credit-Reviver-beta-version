import raf from "raf";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class ScrollIn extends PureComponent {
  static propTypes = {
    scrollInHeight: PropTypes.number
  };

  static defaultProps = {
    scrollInHeight: 50
  };

  fixedStyle = {
    position: "fixed",
    bottom: "70px",
    right: " 10px",
    zIndex: "10",
    transition: "transform .2s ease-in-out"
  };

  hiddenStyle = {
    transform: "Scale(0)"
  };

  scrolledInStyle = {
    transform: "Scale(1)"
  };

  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    };

    this.handlingScrollUpdate = false;
  }

  getScrollY = () => {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    } else if (window.scrollTop !== undefined) {
      return window.scrollTop;
    } else {
      return (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;
    }
  };

  handleScroll = () => {
    if (!this.handlingScrollUpdate) {
      this.handlingScrollUpdate = true;
      raf(this.update);
    }
  };

  update = () => {
    let currentScrollY = this.getScrollY();
    // console.log(currentScrollY);
    // console.log(this.props.scrollInHeight);

    this.setState({
      hidden: currentScrollY < this.props.scrollInHeight
    });

    this.handlingScrollUpdate = false;
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    let renderStyle = this.fixedStyle;
    renderStyle = this.state.hidden
      ? { ...renderStyle, ...this.hiddenStyle }
      : { ...renderStyle, ...this.scrolledInStyle };

    return (
      <div ref="scrollnav" style={renderStyle}>
        {this.props.children}
      </div>
    );
  }
}
