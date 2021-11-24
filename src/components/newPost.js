import React from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";
import { addPost } from "../api/posts";

const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error while parsing file - ", error);
      reject("Error while parsing file");
    };
  });
};

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: "",
      contentInput: "",
      fileInput: null,
      fileInputResetKey: "",
    };
  }

  changeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  submitPost = async () => {
    if (
      this.state.fileInput &&
      !acceptedImageTypes.includes(this.state.fileInput.type)
    ) {
      this.props.setAlert("File has to be either an image or gif", "danger");
      return;
    }
    const body = {
      title: this.state.titleInput,
      content: this.state.contentInput,
    };

    if (this.state.fileInput) {
      const base64value = await getBase64(this.state.fileInput);
      body.media = {
        file: base64value,
        type: this.state.fileInput.type,
      };
    }
    try {
      await addPost(body);
      this.setState({
        titleInput: "",
        contentInput: "",
        fileInputResetKey: Math.random().toString(36),
      });
      this.props.loadPosts();
      this.props.setAlert("Post successfully created", "success");
    } catch (exception) {
      const errorMessage =
        exception && exception.status
          ? `An error has occured while posting - ${exception.error}`
          : "An unexpected error occured while posting";
      this.props.setAlert(errorMessage, "danger");
    }
  };

  render() {
    const { titleInput, contentInput, fileInputResetKey } = this.state;
    return (
      <div className="new-post">
        <h2>New Post</h2>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              placeholder="Give an interesting title"
              value={titleInput}
              onChange={(e) => this.changeInput("titleInput", e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">Description</Label>
            <Input
              id="content"
              type="textarea"
              placeholder="Write your story"
              value={contentInput}
              onChange={(e) => this.changeInput("contentInput", e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="media">Media</Label>
            <Input
              id="media"
              name="file"
              type="file"
              onChange={(e) => this.changeInput("fileInput", e.target.files[0])}
              key={fileInputResetKey || ""}
            />
            <FormText>Attach an image or gif</FormText>
          </FormGroup>
          <Button onClick={this.submitPost} color="primary">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewPost;
