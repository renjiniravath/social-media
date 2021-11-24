import React from "react";
import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      invalidInput: false,
    };
  }

  changeInput = (usernameInput) => {
    this.setState({
      usernameInput,
    });
  };

  submitUsername = () => {
    const username = this.state.usernameInput;
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      this.setState({
        usernameInput: "",
        invalidInput: true,
      });
      return;
    }
    this.props.setUsername(username);
  };

  render() {
    const { usernameInput, invalidInput } = this.state;
    return (
      <div className="app-body">
        <Form>
          <FormGroup className="position-relative">
            <Label for="username">Enter a Username</Label>
            <Input
              id="username"
              onChange={(event) => this.changeInput(event.target.value)}
              value={usernameInput}
              invalid={invalidInput}
            />
            <FormFeedback tooltip>
              Only alphanumeric strings are accepted as username
            </FormFeedback>
            <Button
              color="primary"
              type="button"
              onClick={() => this.submitUsername()}
            >
              Proceed
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
