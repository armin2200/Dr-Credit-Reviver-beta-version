import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import "./test.css";
import { api } from "../../services/api";
import { connect } from "react-redux";

// function uploadImageCallBack(file) {
//   return new Promise(async (resolve, reject) => {
//     const img = new FormData();
//     img.append("image", file);

//     console.log(this.props.currentUser.user._id);
//     try {
//       const { data } = await axios.post(
//         `${api}/api/articles/${this.props.currentUser.user._id}/photos`,
//         img
//       );

//       resolve({ data: { link: data.image } });
//     } catch (error) {
//       console.log(error.response);
//       reject(error.response);
//     }
//   });
// }

class TextEditor2 extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  uploadImageCallBack = file => {
    return new Promise(async (resolve, reject) => {
      try {
        const img = new FormData();
        img.append("image", file);

        const userId = this.props.currentUser.user._id;

        const { data } = await axios.post(
          `${api}/api/articles/${userId}/photos`,
          img
        );
        resolve({ data: { link: data.image } });
      } catch (error) {
        reject(error.response);
      }
    });
  };
  pushHandler = () => {
    const contentState = this.state.editorState.getCurrentContent();
    this.props.blurred(JSON.stringify(convertToRaw(contentState)));
  };
  render() {
    const { editorState } = this.state;
    console.log(this.props);

    return (
      <div>
        <Editor
          onBlur={this.pushHandler}
          toolbar={{
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: false, mandatory: false },
              previewImage: true
            }
            // colorPicker: { component: ColorPic },
          }}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />

        {/* <button onClick={this.pushHandler}>push</button> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}
export default connect(
  mapStateToProps,
  null
)(TextEditor2);
