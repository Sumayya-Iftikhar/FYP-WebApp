import React from 'react';
import Navbar from './Navbar';
import Buttons from './Buttons';

const Report_Issue = () =>{
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
                                Report Your Issue
                                </h1>
                            </div>
                        <form className="col-8 mx-auto pt-3 my-5">
                        <label for="subject" 
                        className="form-label">
                            Subject
                        </label>
                        <input type="text" 
                        className="form-control" 
                        name="subject"
                        id ="subject"
                        required/>
                        <label for="report" 
                        className="form-label">
                            Subject
                        </label>
                        <textarea type="textarea" 
                        className="form-control" 
                        name="report"
                        id ="report"
                        required/>
                        </form>
                        {/* <div className="d-flex flex-lg-row flex-md-column ml-5">
                         */}
                         <div className="col-10 d-grid gap-5 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-secondary ">Cancel</button>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Report_Issue;
