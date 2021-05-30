import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { TextField, InputLabel, NativeSelect } from '@material-ui/core';


//COMPONENTS
import DialogBox from './DialogBox';
import CustomSnackBar from './SnackBar';


const Update_Institute_Record = (props) => {

    let updateUrl = `http://localhost:3000/updateOne${props.selectedOption}Record`;
    // alert(updateUrl);

    const [open, setOpen] = useState(false);
    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const [error, setError] = useState({
        nameError: false,
        emailError: false,
        cityError: false,
        contactNoError: false,
        addressError: false,
    });

    const [userInfo, setUserInfo] = useState({
        name: props.name,
        email: props.email,
        contactNo: props.contactNo,
        city: props.city,
        address: props.address,
        status: props.status,
        joiningDate: props.joiningDate,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setUserInfo({
            ...userInfo,
            [name]: event.target.value,
        });
    };

    const handleDialogBoxYesButton = () => {
        setOpen(false);
        setUserInfo(prevState => {
            return {
                ...prevState,
                name: props.name,
                email: props.email,
                contactNo: props.contactNo,
                city: props.city,
                address: props.address,
                status: props.status,
                joiningDate: props.joiningDate,
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            userInfo.name === props.name && userInfo.email === props.email
            && userInfo.contactNo === props.contactNo && userInfo.city === props.city
            && userInfo.address === props.address && userInfo.status === props.status
        ) {
            alert('same Data');
        } else {
            let parsedUserInfo = '';
            try {
                let userInfo = await localStorage.getItem('userInfo');
                parsedUserInfo = JSON.parse(userInfo);
            } catch (error) {
                console.log(error);
            }
            alert('update else')
            await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + parsedUserInfo.authToken
                },
                body: JSON.stringify({
                    id: props.userID,
                    name: userInfo.name === props.name ? props.name : userInfo.name,
                    email: userInfo.email === props.email ? props.email : userInfo.email,
                    city: userInfo.city === props.city ? props.city : userInfo.city,
                    address: userInfo.address === props.address ? props.address : userInfo.address,
                    contactNo: userInfo.contactNo === props.contactNo ? props.contactNo : userInfo.contactNo,
                    status: userInfo.status === props.status ? props.status : userInfo.status,
                    joiningDate: props.joiningDate
                })
            })
                .then(res => res.json())
                .then(userInfo => {
                    console.log(userInfo);
                    if (userInfo.error) {
                        setSnackBar((prevState) => {
                            return {
                                ...prevState,
                                snackBarMessage: userInfo.error,
                                isError: true,
                                showSnackBar: true
                            }
                        });
                    } else {
                        props.handleIsUpdated(true);
                        setSnackBar((prevState) => {
                            return {
                                ...prevState,
                                snackBarMessage: userInfo.message,
                                isError: false,
                                showSnackBar: true
                            }
                        });
                    }
                });
        }

    }

    const handleRegisterButton = () => {
        if (!userInfo.name) {
            setError((prevState) => { return { ...prevState, nameError: true } });
        }
        if (!userInfo.contactNo) {
            setError((prevState) => { return { ...prevState, contactNoError: true } });
        }
        if (userInfo.city.length === 0) {
            setError((prevState) => { return { ...prevState, cityError: true } });
        }
        if (!userInfo.address) {
            setError((prevState) => { return { ...prevState, addressError: true } });
        }
    }

    const handleSnackBar = () => {
        setSnackBar((prevState) => { return { ...prevState, showSnackBar: false } });
    }

    const handleUpdateButton = () => {
        // props.updateStatus(true);
    }

    return (
        <>
            <div style={{ visibility: snackBar.showSnackBar ? 'visible' : 'hidden', marginBottom: 8 }}>
                <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
            </div>

            <form
                className="row"
                onSubmit={handleSubmit}
                method="PUT"
                style={{

                    display: 'flex',
                    justifyContent: 'center',
                    paddingInline: '3%',
                    marginBottom: '10%'
                }}
            >
                <div className="col-md-6 col-lg-6 col-sm-12" >
                    <TextField
                        variant="standard"
                        label={props.selectedOption === 'Dispensaries' ? 'Dispensary' : "Hospital"}
                        inputProps={{ pattern: '[a-z A-z -]{3,}' }}
                        style={{ width: '92%' }}
                        InputLabelProps={{
                            style: {
                                color: setError.nameError ? 'red' : '#4169e1',
                                fontSize: 22,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }
                        }}
                        required={true}
                        value={userInfo.name}
                        name="name"
                        onChange={handleChange}
                        error={setError.nameError}
                    />
                </div>

                <div
                    className="col-md-6 col-sm-12"
                >
                    <TextField
                        variant="standard"
                        label="email"
                        inputProps={{ pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" }}
                        style={{ width: '92%' }}
                        InputLabelProps={{
                            style: {
                                color: setError.nameError ? 'red' : '#4169e1',
                                fontSize: 22,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }
                        }}
                        value={userInfo.email}
                        name="email"
                        onChange={handleChange}
                        error={setError.emailError}
                    />
                </div>

                <div
                    className="col-md-6 col-sm-12"
                >
                    <TextField
                        variant="standard"
                        label="contactNo"
                        inputProps={{ pattern: "([0-9]{4}[0-9]{7})|([0-9]{3}[0-9]{7})" }}
                        placeholder="e.g 0611234567 OR 03001234567"
                        style={{ width: '92%', marginTop: '3.2%' }}
                        InputLabelProps={{
                            style: {
                                color: setError.contactNoError ? 'red' : '#4169e1',
                                fontSize: 22,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }
                        }}
                        required={true}
                        value={userInfo.contactNo}
                        name="contactNo"
                        onChange={handleChange}
                        error={setError.contactNoError}
                    />

                </div>

                <div className="col-md-6 col-sm-12"
                    style={{ marginTop: '1.3%' }}
                >
                    <InputLabel
                        required
                        style={{
                            fontSize: 20,
                            marginBottom: 0,
                            color: setError.cityError ? 'red' : '#4169e1',
                            fontWeight: 'bold',
                        }}
                        htmlFor="city-dropdown">
                        City
                    </InputLabel>
                    <NativeSelect
                        value={userInfo.city}
                        onChange={handleChange}
                        inputProps={{
                            name: 'city',
                            id: 'city-dropdown',
                        }}
                        style={{ width: '92%' }}
                        required
                        error={setError.cityError}
                    >
                        {/* <option arial-label="none" value=""></option> */}
                        <option value="multan">Multan</option>
                        <option value="islamabad">Islamabad</option>
                        <option value="lahore">Lahore</option>
                        <option value="karachi">Karachi</option>
                        <option value="rawalpindi">Rawalpindi</option>
                    </NativeSelect>
                </div>

                <div
                    className="col-md-6 col-sm-12"
                >
                    <TextField
                        variant="standard"
                        label="address"
                        inputProps={{ pattern: "[a-zA-Z 0-9 . , - #]{5,40}" }}
                        style={{ width: '92%', marginTop: '3.2%' }}
                        InputLabelProps={{
                            style: {
                                color: setError.addressError ? 'red' : '#4169e1',
                                fontSize: 22,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }
                        }}
                        required={true}
                        value={userInfo.address}
                        name="address"
                        onChange={handleChange}
                        error={setError.addressError}
                    />
                </div>

                <div
                    className="col-md-6 col-sm-12"
                    style={{ marginTop: '1.3%' }}
                >
                    <InputLabel style={{ fontWeight: 'bold', marginBottom: 0, fontSize: 20, color: '#4169e1' }} htmlFor="status-dropdown">Status</InputLabel>
                    <NativeSelect
                        value={userInfo.status}
                        onChange={handleChange}
                        inputProps={{
                            name: 'status',
                            id: 'status-dropdown',
                        }}
                        style={{ width: '92%' }}
                    >
                        {/* <option aria-label="None" value="" /> */}
                        <option value="active">active</option>
                        <option value="not active">Not Active</option>
                    </NativeSelect>
                </div>

                <div
                    className="col-md-6 col-sm-12"
                    style={{ marginTop: '2.5%' }}
                >
                    <TextField
                        variant="standard"
                        label="joining Date"
                        style={{ width: '92%' }}
                        InputLabelProps={{ style: { fontWeight: 'bold', color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                        contentEditable={false}
                        value={userInfo.joiningDate}
                        name="date"
                    />
                </div>

                <div className="col-md-6 col-sm-12"
                    style={{
                        position: 'absolute',
                        marginTop: '23%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginRight: '4%',

                    }}
                >
                    <Button
                        variant="outline-primary"
                        onClick={() => setOpen(true)}
                        style={styles.buttonStyling}
                    >
                        Cancel
                         </Button>

                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={() => handleUpdateButton()}
                        style={styles.buttonStyling}
                    >
                        Update
                         </Button>
                </div>
            </form>

            <DialogBox
                open={open}
                title="Are You Sure You Want To Discard Changes?"
                content="By Cliking on 'YES' All changes will be discarded."
                leftButtonName="No"
                rightButtonName="Yes"
                handleClose={() => setOpen(false)}
                handleDelete={() => handleDialogBoxYesButton()}
            />
        </>
    );
}
export default Update_Institute_Record;

let styles = {
    fieldsDivStyling: {
        marginBottom: '2%'
    },
    buttonsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonStyling: {
        width: '45%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
    }
}