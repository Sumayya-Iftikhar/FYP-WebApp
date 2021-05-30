import React from 'react';
import Navbar from './Navbar';
import {HDeletion_Form} from './Deletion_Form';

const Delete_Hospital = () =>{
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
                                Deletion Form
                                </h1>
                            </div>
                            <HDeletion_Form/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Delete_Hospital;