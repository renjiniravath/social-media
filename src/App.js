import "./App.css";
import React from "react";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    this.setState({
      username: sessionStorage.getItem("username"),
    });
  }

  setUsername = (username) => {
    sessionStorage.setItem("username", username);
    this.setState({
      username,
    });
  };

  render() {
    const { username } = this.state;
    return (
      <div className="app">
        {username ? (
          <Home setUsername={this.setUsername} />
        ) : (
          <Login setUsername={this.setUsername} />
        )}
      </div>
    );
  }
}

export default App;
