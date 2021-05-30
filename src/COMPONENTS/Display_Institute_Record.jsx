import React, { useState } from 'react';

import { TextField, InputLabel, NativeSelect } from '@material-ui/core';



const Display_Institute_Record = (props) => {
    return (
        <>
            <div
                className="row"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingLeft: '3%'
                }}
            >
                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="name"
                        value={props.name}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="email"
                        value={props.email}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="contact No"
                        value={props.contactNo}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="city"
                        value={props.city}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="address"
                        value={props.address}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="status"
                        value={props.status}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="joining date"
                        value={props.joiningDate}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase' , fontWeight: 'bold' , } }}
                    />
                </div>
            </div>
        </>
    );
}
export default Display_Institute_Record;

const styles = {
    textFieldDivStyling: {
        marginBottom: '2.5%',
    }
}