import React, { Component } from "react";
import PropTypes from "prop-types";
import { BlockPicker } from "react-color";
import icon from "../../assets/eye.png";
import { css } from "react-emotion";
import "./test.css";
class ColorPic extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  onChange = color => {
    const { onChange } = this.props;
    onChange("color", color.hex);
  };

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
        onClick={this.stopPropagation}
        className={css`
          position: absolute;
          top: 24px;
          right: -77px;
        `}
      >
        <BlockPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className={css`
          position: relative;
        `}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <div onClick={onExpandEvent}>
          <img height="14" src={icon} alt="" />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}
export default ColorPic;
