import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { addCommentToPost, votePost } from "../api/posts";

const replaceURLs = (message) => {
  if (!message) return;
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, (url) => {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer">' +
      url +
      "</a>"
    );
  });
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsShow: false,
      commentInput: "",
    };
  }

  toggleCommentsShow = () => {
    this.setState((prevState) => ({
      commentsShow: !prevState.commentsShow,
    }));
  };

  changeCommentInput = (commentInput) => {
    this.setState({
      commentInput,
    });
  };

  castVote = async (vote) => {
    try {
      const body = {
        vote,
      };
      await votePost(this.props.post.id, body);
      this.props.loadPosts();
    } catch (exception) {
      const errorMessage =
        exception && exception.status
          ? `An error has occured while voting - ${exception.error}`
          : "An unexpected error occured while posting";
      this.props.setAlert(errorMessage, "danger");
    }
  };

  addComment = async () => {
    try {
      const body = {
        comment: this.state.commentInput,
      };
      await addCommentToPost(this.props.post.id, body);
      this.props.loadPosts();
      this.setState({
        commentInput: "",
      });
    } catch (exception) {
      const errorMessage =
        exception && exception.status
          ? `An error has occured while commenting - ${exception.error}`
          : "An unexpected error occured while posting";
      this.props.setAlert(errorMessage, "danger");
    }
  };

  render() {
    const { username, title, content, votes, comments, media } =
      this.props.post;
    const { commentsShow, commentInput } = this.state;
    const currentUser = sessionStorage.getItem("username");
    const currentUserVote = votes.map[currentUser];
    return (
      <Card color="warning" className="post-card">
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {username}
          </CardSubtitle>
          <CardText
            dangerouslySetInnerHTML={{ __html: replaceURLs(content) }}
          ></CardText>
          {media && media.type && <img src={media.file} alt="Post" />}
        </CardBody>
        <CardFooter>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <span
                className={
                  currentUserVote === 1 ? "upvote voted px-2" : "upvote px-2"
                }
                onClick={() => this.castVote(currentUserVote === 1 ? 0 : 1)}
              >
                <svg width="36" height="36">
                  <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
                </svg>
              </span>
              <p className="pt-1">{votes.count}</p>
              <span
                className={
                  currentUserVote === -1
                    ? "downvote voted px-2"
                    : "downvote px-2"
                }
                onClick={() => this.castVote(currentUserVote === -1 ? 0 : -1)}
              >
                <svg width="36" height="36">
                  <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
                </svg>
              </span>
            </div>
            <Button color="info" size="sm" onClick={this.toggleCommentsShow}>
              {commentsShow ? "Hide" : "Show"} Comments
            </Button>
          </div>
          <div
            className={
              commentsShow ? "comments-container" : "comments-container d-none"
            }
          >
            <Form className="mt-3">
              <FormGroup>
                <Input
                  id="content"
                  type="textarea"
                  placeholder="Write your comment"
                  value={commentInput}
                  onChange={(e) => this.changeCommentInput(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" size="sm" onClick={this.addComment}>
                Send
              </Button>
            </Form>
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <div className="comment px-3 mt-2" key={comment.id}>
                    <b>{comment.username}</b>
                    <p>{comment.text}</p>
                  </div>
                );
              })}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default Post;
