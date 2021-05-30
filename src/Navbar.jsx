import React from 'react';
import { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Icon from "./images/Icon.png";

class Navbar extends Component {

  handleLogoutButton = async () => {
    try {
      await localStorage.removeItem('userInfo');
      await localStorage.removeItem('userRole');
      await localStorage.removeItem('dataPassToNextScreen');
      await localStorage.removeItem('recordsPassToNextScreen');
      this.props.history.push('/');
    } catch (error) {
      console.log('error: ', error)
    }
  }
  render() {
    return (
      <>
        <div className="">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <NavLink className="navbar-brand"
                to="">
                <img src={Icon}
                  alt=""
                  width="50"
                  height="50" />
              </NavLink>

              <form className="d-flex col-md-3 col-5 me-2"
                style={{ marginLeft: "15%" }}>
                <input className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search" />
                <button className="btn btn-outline-info"
                  type="submit">
                  Search
                  </button>
              </form>
              <button className="navbar-toggler navbar-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{ marginLeft: "20%" }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link active"
                      aria-current="page"
                      to="/Admin_Dashboard/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link active"
                      aria-current="page"
                      to="/UserProfile/">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link active"
                      aria-current="page"
                      to="">
                      Setting
                    </NavLink>
                  </li>
                </ul>

                <button id="logout"
                  className="btn btn-outline-primary"
                  onClick={this.handleLogoutButton}
                  type="Button" >
                  logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}

export default withRouter(Navbar)