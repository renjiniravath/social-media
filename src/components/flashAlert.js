import React from "react";
import { Alert } from "reactstrap";

class FlashAlert extends React.Component {
  render() {
    return (
      <div className="alert-parent">
        <Alert color={this.props.alertColor} isOpen={this.props.alertOpen}>
          {this.props.alertMessage}
        </Alert>
      </div>
    );
  }
}

export default FlashAlert;
