import React from "react";
import { withRouter } from "react-router-dom";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    const auth = localStorage.getItem("token");

    this.state = {
      token: auth,
    };
  }

  signOut = e => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      this.props.history.push("/signIn");
      this.setState({ signIn: true });
      window.location.reload();
    } else {
      this.props.history.push("/signIn");
      this.setState({ signIn: false });
    }
  };
  signIn = e => {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/signIn");
    }
  };

  render() {

    let text;
    if (localStorage.getItem("token")) {
      text="signOut"
    } else {
      text= "signIn"
    }

    return (
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className="f3 link dim black underline pa3 pointer"
          style={{ background: "none", border: "none" }}
          onClick={this.signOut}
        >
          {text}
        </button>
      </nav>
    );
  }
}

export default withRouter(Navigation);
