import React, { useState } from 'react';

import { TextField, InputLabel, NativeSelect } from '@material-ui/core';
import logo from '../images/comunication.png';



const Display_Patient_Record = (props) => {

    return (
        <>
            <div
                className="row"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingLeft: '3%',
                    marginTop: '3%'
                }}
            >

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Case ID"
                        value={props.caseID}
                        // defaultValue="2604202103"
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Name"
                        value={props.name}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="gender"
                        value={props.gender}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Age"
                        value={props.age}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="District"
                        value={props.district}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Home Town"
                        value={props.homeTown}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Dengue Status"
                        value={props.dengueStatus}
                        contentEditable={false}
                        // disabled
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Dispensary"
                        value={props.dispensary}
                        contentEditable={false}
                        // disabled
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>
                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="Date"
                        value={props.date}
                        contentEditable={false}
                        // disabled
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>
                <div className="row mt-5 my-5">

                    <TextField
                        required
                        variant="standard"
                        label="Symptoms"
                        multiline
                        value={props.symptoms}
                        contentEditable={false}
                        rows={10}
                        rowsMax={Infinity}
                        style={{ width: '60%' }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                    <div
                        style={{ width: '30%', height: '25vh', visibility: props.symptomsImage ? 'visible' : 'hidden' }}>
                        <img
                            src={"data:image/png;base64," + props.symptomsImage}
                            style={{
                                marginLeft: '40%',
                                height: 200,
                                width: 270
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Display_Patient_Record;

const styles = {
    textFieldDivStyling: {
        marginBottom: '2.5%',
    }
}