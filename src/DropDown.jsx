import React,{Component} from 'react';

class DropDown extends React.Component{
    state={
        users:[]
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({users:users}))
    }
    render(){
        return <div className="drop-down">
            <select className="form-select" style={{color:"GrayText"}}>
                <option selected disabled="disabled" value="1" hidden="hidden">-- Select the City --</option> 
                {this.state.users.map(user => <option value ="user.value">{user.address.city}</option>)} 
            </select>
        </div>    
    }
}
export default DropDown;