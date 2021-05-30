import React, { useState } from 'react';
import Buttons from './Buttons';
import Datatables ,{HDatatables} from "./Datatables";
import View_Edit from './View_Edit';
const Details = () =>{
      return(
        <>        
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-12 mx-auto gy-5">
                        <div className=" table-responsive my-5">
                        <Datatables/>
                        </div>
                            <div className="d-flex flex-md-row flex-column" style={{marginLeft:"85%", marginRight:"10%", padding:"15px"}}>
                                {/* <Buttons name="Delete" id="Delete" type="submit"/> */}
                                <Buttons name="Cancel" id="Cancel" type="submit"/>
                            </div>
                      
                    </div>
                </div>
            </div>
        </>
    );
}
  export class Hospital_Details extends React.Component{
        state={
            users:[],
            SelectedOption: ''
        }

        componentDidMount(){
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({users:users}))
        }
        render(){  
        return(
      <>        
          <div className="container">
              <div className="row">
                  <div className="col-md-12 col-12 mx-auto gy-5">
                      <form >
                          
        <section className="">
                                          {this.renderSelector()}
                                          <div className="">
                                              {this.renderSelected(this.state.SelectedOption)}
                                          </div>
                                      </section>
             </form>
                    <div className="d-flex flex-md-row flex-column" style={{marginLeft:"85%", marginRight:"10%", padding:"15px"}}>
                              {/* <Buttons name="Delete" id="Delete" type="submit"/> */}
                              <Buttons name="Cancel" id="Cancel" type="submit"/>
                    </div>
                </div>
            </div>
          </div>
      </>
      );
  
}

renderSelector() {
    return (
      <div className="form-group mt-5">
        <label 
            className="form-label">
                Select what you want to view
        </label>
        <select className="form-control"
          onChange={(e) => this.setState({ SelectedOption: e.target.value })}
          style={{color:"GrayText"}}>
            <option selected disabled="disabled" value="1" hidden="hidden">-- Select --</option>
            <option value="2">Hospital</option>
            <option value="3">Dispensary</option>
            
        </select>
      </div>
    );
}
  renderSelected(SelectedOption) {
    if (!SelectedOption)
    return <h1 text="Select an option" />;
    else if(SelectedOption==="2")
        return <HDatatables />;
        
    else if(SelectedOption==="3")
    return <HDatatables/>;
  }



};

export default Details;