import React, { useState } from 'react';

import { TextField } from '@material-ui/core';



const Display_Person_Record = (props) => {
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

                <div className="col-md-12 col-sm-12"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                        marginTop: 10
                    }}
                >
                    <img
                        src={"data:image/png;base64," + props.dp}
                        style={{
                            marginRight: 20,
                            height: 270,
                            width: 270
                        }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="name"
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
                        label="user name"
                        value={props.userName}
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
                        label="dob"
                        value={props.dob}
                        contentEditable={false}
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
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
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
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
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="cnic"
                        value={props.cnic}
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
                        label="city"
                        value={props.city}
                        contentEditable={false}
                        // disabled
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>
                {props.actor !== 'Researchers' && props.actor !== 'admin' ?
                    < div className="col-md-6 col-sm-12"
                        style={styles.textFieldDivStyling}>
                        <TextField
                            variant="standard"
                            label="institute name"
                            value={props.instituteName}
                            contentEditable={false}
                            // disabled
                            style={{ width: '92%', marginBottom: 10 }}
                            InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                        />
                    </div>
                    :
                    null
                }


                <div className="col-md-6 col-sm-12"
                    style={styles.textFieldDivStyling}>
                    <TextField
                        variant="standard"
                        label="status"
                        value={props.status}
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
                        label="joining date"
                        value={props.joiningDate}
                        contentEditable={false}
                        // disabled
                        style={{ width: '92%', marginBottom: 10 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', } }}
                    />
                </div>
            </div>



        </>
    );
}
export default Display_Person_Record;

const styles = {
    textFieldDivStyling: {
        marginBottom: '2.5%',
    }
}