import React, { Component } from "react";
import logo from "./communityBank.svg";
import "./Login.css";
import axios from 'axios'

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  register = async () => {
    const {email, password} = this.state
    const res = await axios.post('/auth/register', {email, password})
    if(res.data.loggedIn) {
      this.props.history.push('/private')
    }
  }

  login = async () => {
    const {email, password} = this.state
    const res = await axios.post('/auth/login', {email, password})
    if(res.data.loggedIn) {
      this.props.history.push('/private')
    }
  }

  render() {
    return (
      <div className="Login">
        <img src={logo} alt="" />
        <p>
          <span>Email: </span>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
          />
        </p>
        <p>
          <span>Password: </span>
          <input
            onChange={e => this.setState({ password: e.target.value })}
            type="text"
          />
        </p>
        <button onClick={ () => this.register()}>Register</button>
        <button onClick={ () => this.login()}>Login</button>
      </div>
    );
  }
}

export default Login;
