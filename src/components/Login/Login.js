import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "./communityBank.svg";
import "./Login.css";
import Axios from "axios";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    loggedIn: false
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    Axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/private" />;
    }
    return (
      <div className="App">
        <img src={logo} alt="" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />
          <br />
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            type="password"
          />
          <br />
          <button>Login</button>
          <br />
          <Link to="/signup">Don't have an account? Sign up here.</Link>
          {this.state.error && <p>Error. Please try again.</p>}
        </form>
      </div>
    );
  }
}
