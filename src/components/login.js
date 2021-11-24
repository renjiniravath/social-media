import React from "react";
import { Form, Input, FormGroup, Label, Button } from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
    };
  }

  changeInput = (usernameInput) => {
    this.setState({
      usernameInput,
    });
  };

  render() {
    const { usernameInput } = this.state;
    return (
      <div className="app-body">
        <Form onSubmit={() => this.props.setUsername(usernameInput)}>
          <FormGroup>
            <Label for="username">Enter a Username</Label>
            <Input
              id="username"
              onChange={(event) => this.changeInput(event.target.value)}
              value={usernameInput}
            />
            <Button color="primary" type="submit">
              Proceed
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
