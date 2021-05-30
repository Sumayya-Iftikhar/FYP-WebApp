import React, {Component, useState} from 'react'
import { NavLink } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import View_Edit from './View_Edit'; 
class Datatables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
      addModalShow: false,
      View_Edit :false      
    };
  }
  checked(){
      return <Redirect to ='/View_Edit/'/>
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }
  render(){
    const { users, isLoading, isError } = this.state
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (isError) {
      return <div>Error</div>
    }
    return users.length > 0
      ? (
        <table className="table table-hover table-bordered-primary mt-5">
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }
  
  selected(){
    return<Redirect to ="/View_Edit"/>
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th className="my-5" key={attr}>{attr.toUpperCase()}</th>
    )
  }
  renderTableRows = () => {   
    return this.state.users.map(user => {
      return (
        <>
          <tr>
          <NavLink to="/View_Edit/" type="checkbox" className="btn btn-primary btn-lg text-light btn-hover hover-text-light me-md-5 mt-1" />
          </tr>  
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{`${user.address.street}, ${user.address.city}`}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name}</td>
          </tr>
        </>
      )
    })
  }
}

export class HDatatables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }
  render() {
    const { users, isLoading, isError } = this.state
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (isError) {
      return <div>Error</div>
    }
    return users.length > 0
      ? (
        <table className="table table-hover table-bordered-primary mt-5">
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th className="my-5" key={attr}>{attr.toUpperCase()}</th>)
  }
  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.address.street}, ${user.address.city}`}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>
        </tr>
      )
    })
  }
}

export default Datatables;