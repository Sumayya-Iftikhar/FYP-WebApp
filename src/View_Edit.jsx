import React from "react";
import DropDown from './DropDown';
import Navbar from './Navbar';
import profile from "./images/profile.png";
import { NavLink, Redirect } from "react-router-dom";

class View_Edit extends React.Component{
    constructor(props){
      super(props)
          this.state={      
        id: "1",
        name: "Sumayya  ",        
        email:"sumayya@gmail.com",
          Cnic:"1234512345671",
          address:"rawalpindi",
          dob:"18/11/1987",
          username:"sumayya12344",
          Cno:"0300-1234567",
          type:"button",
          btnname:"Edit",
        editModeEnabled: false,        
        img:profile,
      }
    }
    handleEditClick(){
      this.setState({
        editModeEnabled: !this.state.editModeEnabled,
        enable:!this.state.enable,
        disable: !this.state.disable,
        type:"submit",
        btnname:"Update"
      })}
    // }    
    // selected(){
    //   return<Redirect to ="/View_Edit"/>
    // }
    InputEvent= (event) =>{
        const { name , value} = event.target;
        this.setState((preVal)=>{            
        return{
            ...preVal,
            [name] : value,
        };
        });
    };
    formSubmit = (e) => {
        e.preventDefault();
        alert('Ho gya Update :)');
    };
    render(){
      return(
          <>           
          
            <div className="container-fluid" 
            style={{backgroundColor:"white"}}> 
                <div className="row">
                    <div className="col-12">
                        <Navbar/>
                    </div>
                    <div className="col-10 mx-auto mb-lg-2 mt-5" 
                    style={{ height:'15%',backgroundColor:"skyblue" }}>
                        <h1 className="text-center"
                        style={{padding:"10px", color:"white"}}>
                        Details
                        </h1>
                    </div>
                    <section className="d-flex align-items-center pt-4 mt-5 mb-1">
                        <div className="container-fluid nav_bg">
                            <div className="row">
                                <div className="col-12 mx-auto">
                                    <div className="row">
                                        <div className="col-lg-5 pt-5 pt-lg-0 order-1 order-lg-2 d-flex justify-content-center">
                                            <img className="img-flud" src={this.state.img} alt="" style={{height:"80%", width:"80%", borderRadius:"50%"}}/>
                                        </div>
                                        <div className="col-md-7 pt-5 pt-lg-0 order-1 order-lg-2" >
                                          <form onSubmit={this.formSubmit} className="col-10 mx-auto">
                                            <label className="col-3 mt-3">Name</label>
                                            <input className="col-4"
                                            type="text" 
                                            id="Fname" 
                                            name="Fname"   
                                            placeholder={this.state.name} 
                                            onChange={InputEvent}
                                            disabled={!this.state.editModeEnabled}/>
                                            <br/>                    
                                              <label className="col-3 mt-3"> Username</label>
                                              <input className="col-4"
                                              type="username" 
                                              id="username" 
                                              name="username"  
                                              placeholder={this.state.username}
                                              onChange={InputEvent} 
                                              disabled={!this.state.editModeEnabled}/>
                                              <br/>  
                                            <label className="col-3 mt-3"> Date of Birth</label>
                                              <input className="col-4"
                                              type="text" 
                                              id="dob" 
                                              name="dob"
                                              placeholder={this.state.dob} 
                                              disabled={!this.state.editModeEnabled}
                                              onChange={InputEvent}/>
                                              <br/>                      
                                              <label className="col-3 mt-3"> Email</label>
                                              <input className="col-4" 
                                              type="email"
                                              id="email" 
                                              name="email"    
                                              placeholder={this.state.email}
                                              onChange={InputEvent} 
                                              disabled={!this.state.editModeEnabled} 
                                              pattern="[a-zA-Z0-9.!# $ % &'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
                                              <br/>
                                              
                                              <label className="col-3 mt-3"> CNIC</label>
                                              <input className="col-4"
                                              type="text" 
                                              id="cnic" 
                                              name="cnic"  
                                              placeholder={this.state.Cnic} 
                                              onChange={InputEvent} 
                                              disabled={!this.state.editModeEnabled} />
                                              <br/>
                                              <label className="col-3 mt-3"> Contact No</label>
                                              <input className="col-4" type="text" id="Cno" name="Cno"  placeholder={this.state.Cno} disabled={!this.state.editModeEnabled}  patterrn="^(0)((3[0-6][0-9]))(\d{7})$"/>
                                              <br/>
                                              <label className="col-3 mt-3"> Address</label>
                                              <input className="col-4" 
                                              type="address"
                                              id="address" 
                                              name="address"    
                                              placeholder={this.state.address}
                                              onChange={InputEvent} 
                                              disabled={!this.state.editModeEnabled} 
                                              pattern="[a-zA-Z0-9.!# $ % &'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
                                              <br/>
                                              <label className="col-3 mt-3"> City</label>                                               
                                              <div className="col-md-4 col-lg-4" style={{marginLeft:"25%"}}> 
                                              <DropDown 
                                              disabled={!this.state.editModeEnabled} style={{width:"50px"}}/>
                                                               </div>
                                                               <br/>
                                        <div className="modal-footer">
                                          <NavLink type="button" className="btn btn-secondary" to='/View_Details/'>Cancel</NavLink>
                                          <NavLink type={this.state.type} id="btn" className="btn btn-primary" to=""  
                                          onClick={() => this.handleEditClick()}> 
                                          {this.state.btnname}</NavLink> 
                        </div></form>
                        </div>
                        </div>
                      </div></div></div></section>
                    </div>
                </div>
          </>
      );
  }
  }
  export default View_Edit;