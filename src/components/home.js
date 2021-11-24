import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  NavLink,
  Container,
} from "reactstrap";
import { getPosts } from "../api/posts";
import FlashAlert from "./flashAlert";
import NewPost from "./newPost";
import Post from "./post";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      username: "",
      alertMessage: "",
      alertColor: "",
      alertOpen: false,
    };
  }

  componentDidMount() {
    this.loadPosts();
    this.setState({
      username: sessionStorage.getItem("username"),
    });
  }

  loadPosts = async () => {
    try {
      const posts = await getPosts();
      this.setState({
        posts,
      });
    } catch (exception) {
      const errorMessage =
        exception && exception.status
          ? `An error has occured while loading posts - ${exception.error}`
          : "An unexpected error occured while loading posts";
      this.setAlert(errorMessage, "danger");
    }
  };

  setAlert = (alertMessage, alertColor) => {
    this.setState(
      {
        alertColor,
        alertMessage,
        alertOpen: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            alertColor: "",
            alertMessage: "",
            alertOpen: false,
          });
        }, 2000);
      }
    );
  };

  render() {
    const { posts, username, alertColor, alertMessage, alertOpen } = this.state;
    return (
      <>
        <Navbar color="primary" dark fixed="top">
          <NavbarBrand href="/">Social Media</NavbarBrand>
          <div className="d-flex">
            <NavbarText>
              <NavLink active href="#">
                {username}
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink active href="#" onClick={() => this.props.setUsername()}>
                Logout
              </NavLink>
            </NavbarText>
          </div>
        </Navbar>
        <div className="home">
          <FlashAlert
            alertColor={alertColor}
            alertMessage={alertMessage}
            alertOpen={alertOpen}
          />
          <Container>
            <NewPost loadPosts={this.loadPosts} setAlert={this.setAlert} />
            {posts.length > 0 &&
              posts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    loadPosts={this.loadPosts}
                    setAlert={this.setAlert}
                  />
                );
              })}
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
