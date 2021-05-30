import React ,{Component} from 'react';
import Navbar from './Navbar';
import Datatables ,{HDatatables}from "./Datatables";
import Details from "./Details";


class View_Details extends Component {
    state = {
      SelectedOption: ''
    };
    render(){
      return (
          <>             
              <div className="container-fluid" 
                  style={{backgroundColor:""}}> 
                  <div className="row">
                      <div className="col-12">
                          <Navbar/>
                      </div>
                      <div id="background"className="">
                          <div id = "foreground" 
                          className="col-md-10">
                              <div className="col-12 mb-lg-3" 
                              style={{ height:'15%',backgroundColor:"skyblue" }}>
                                  <h1 className="text-center"
                                  style={{padding:"50px", color:"white"}}>
                                      Details
                                  </h1>
                              </div>
                                  <form className="col-12 mx-auto ">
                                      <section className="">
                                          {this.renderSelector()}
                                          <div className="">
                                              {this.renderSelected(this.state.SelectedOption)}
                                          </div>
                                      </section>
                                  </form>
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
                  <option value="2">Doctor</option>
                  <option value="3">Health-Worker</option>
                  <option value="4">Researcher</option> 
                  <option value="5">Hospital</option>
                  <option value="6">Dispensary</option> 
              </select>
            </div>
          );
      }
        renderSelected(SelectedOption) {
          if (!SelectedOption)
          return <h1 text= "Select an option" />;
          else if(SelectedOption==="2")
              return <Datatables />;
              
          else if(SelectedOption==="3")
          return <Datatables/>;
          else if(SelectedOption==="4")
              return <Datatables />;
              else if(SelectedOption==="5")
                  return <HDatatables />;
                  else if(SelectedOption==="6")
                      return <HDatatables />
        }
  };
export default View_Details;
