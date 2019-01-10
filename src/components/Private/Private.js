import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserData } from "../../ducks/user";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

class Private extends Component {
  async componentDidMount() {
    try {
      const res = await axios.get("/api/user-data");
      this.props.getUserData(res.data);
    } catch (e) {
      console.log("Error: not logged in", e);
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    }
  }

  balance = () => {
    return Math.floor((Math.random() + 1) * 100000);
  };

  render() {
    console.log(this.props);
    const { id, email } = this.props.user;
    return (
      <div className="Private">
        <h1>Acount Summary</h1>
        <hr /> <hr /> <hr />
        {id ? (
          <div>
            <p>Account Name: James</p>
            <p>Account Email: {email}</p>
            <p>Account ID: {id}</p>
            <p>Balance: ${this.balance()}.00</p>
            <a href="http://localhost:3000/auth/logout">
              <button>Logout</button>
            </a>
          </div>
        ) : (
          <p>
            Please log in.<Link to="/">Home Page</Link>
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;
//reduxState gets put onto this.props

export default connect(
  mapStateToProps,
  { getUserData }
)(Private);
