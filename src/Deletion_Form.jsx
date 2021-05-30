import React, { useState } from 'react';
import Buttons from './Buttons';
const Deletion_Form = () =>{
    const [Deletion , setDeletion] = useState({
        id:"",
    });
    const handleInput =() => {
    
      };
 const formSubmit = (e) => {
    e.preventDefault();
    alert('Yayyyy Login :)');
  };
      return(
        <>        
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-10 mx-auto gy-5">
                        <form >
                            <label 
                                className="form-label">
                                    Select the person you want to delete
                            </label>
                            <select className="form-select" aria-label="" type="submit" style={{color:"GrayText"}} required >                     
                                <option selected disabled="disabled" value="1" hidden="hidden">-- Select the person --</option>
                                <option value="2">Doctor</option>
                                <option value="3">Health-Worker</option>
                                <option value="4">Researcher</option>  
                            </select>                           
                        </form>
                        <form onSubmit={formSubmit}>
                            <div className="d-flex flex-md-row flex-column my-md-4 gy-lg-5">
                                <div className="col-md-12 me-5">
                                    <label for="Fname" 
                                    className="form-label">
                                        ID
                                    </label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Enter ID"
                                    name="id"
                                    id ="id"
                                    value={Deletion.id}
                                    onChange={handleInput}
                                    required/>
                                </div>              
                            </div>                                
                            <div className="d-flex flex-md-row flex-column" style={{marginLeft:"70%", marginRight:"10%", padding:"15px"}}>
                                <Buttons name="Delete" id="Delete" type="submit"navigate="/Delete_Member/"/>
                                <Buttons name="Cancel" id="Cancel" type="submit"navigate="/Delete_Member/"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export const HDeletion_Form = () =>{
    const [Deletion , setDeletion] = useState({
        id:"",
    });
    const handleInput =() => {
    }
      return(
        <>        
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-10 mx-auto gy-5">
                        <form >
                            <label 
                                className="form-label">
                                    Select what you want to delete
                            </label>
                            <select className="form-select" aria-label="" type="submit" style={{color:"GrayText"}} required >                     
                                <option selected disabled="disabled" value="1" hidden="hidden">-- Select --</option>
                                <option value="2">Hospital</option>
                                <option value="3">Dispensary</option> 
                            </select>                           
                        </form>
                        <form >
                            <div className="d-flex flex-md-row flex-column my-md-4 gy-lg-5">
                                <div className="col-md-12 me-5">
                                    <label for="Fname" 
                                    className="form-label">
                                        ID
                                    </label>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Enter ID"
                                    name="id"
                                    id ="id"
                                    value={Deletion.id}
                                    onChange={handleInput}
                                    required/>
                                </div>              
                            </div>                                
                            <div className="d-flex flex-md-row flex-column" style={{marginLeft:"70%", marginRight:"10%", padding:"15px"}}>
                                <Buttons name="Delete" id="Delete" type="submit" navigate="/Delete_Member/"/>
                                <Buttons name="Cancel" id="Cancel" type="submit" navigate="/Delete_Member/"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Deletion_Form;   