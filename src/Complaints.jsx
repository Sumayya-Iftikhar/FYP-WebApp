import React from 'react';
import Navbar from './Navbar';
const Complaints = () =>{
    return(
        <>
            <div className="container-fluid"> 
                <div className="row" >
                    <div className="col-12">
                        <Navbar/>
                    </div>
                    <div id="background"className=""style={{height:"90vh"}} >
                        <div id = "foreground" 
                        className="col-md-10">
                            <div className="col-12 mb-lg-2" 
                            style={{ height:'15%',backgroundColor:"skyblue" }}>
                                <h1 className="text-center"
                                style={{padding:"10px", color:"white"}}>
                                Complaints
                                </h1>
                            </div>
                            <ComplaintsTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Complaints;








export class ComplaintsTable extends React.Component {
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