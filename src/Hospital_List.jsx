import React from 'react';
import Navbar from './Navbar';
import {Hospital_Details} from './Details';

const Member_List = () =>{
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
                                Details
                                </h1>
                            </div>
                            <Hospital_Details/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Member_List;