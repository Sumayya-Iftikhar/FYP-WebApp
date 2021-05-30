import React from 'react';
import Navbar from './Navbar';

const Compaign_Request = () =>{
    return(
        <>
            <div className="container-fluid"> 
                <div className="row" >
                    <div className="col-12">
                        <Navbar/>
                    </div>
                    <div id="background"className="" style={{height:"90vh"}} >
                        <div id = "foreground" 
                        className="col-md-10">
                            <div className="col-12 mb-lg-3" 
                            style={{ height:'15%',backgroundColor:"skyblue" }}>
                                <h1 className="text-center"
                                style={{padding:"10px", color:"white"}}>
                                Compaigns
                                </h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Compaign_Request;