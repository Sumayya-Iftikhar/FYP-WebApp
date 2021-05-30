import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';

//COMPONENTS
import CustomSnackBar from './SnackBar';
import DialogBox from './Update_User_Profile';

//DATA
import { cities } from '../DATA/Cities';
import { villages } from '../DATA/Villages';

const Institiute_RegistrationForm = (props) => {

    let date = moment().format('DD-MM-YYYY');
    let addUrl = `http://localhost:3000/add${props.selectedOption}`;

    const [data, setData] = useState({
        name: "",
        email: "",
        contactNo: '',
        city: "",
        address: "",
        status: 'active',
        date: date,
        nameError: false,
        emailError: false,
        cityError: false,
        contactNoError: false,
        addressError: false,
        showSnackBar: false,
        snackBarMessage: '',
        isError: false
    });

    let parsedUserInfo = '';
    useEffect(async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
        } catch (error) {
            console.log(error);
        }
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setData({
            ...data,
            [name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(addUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + parsedUserInfo.authToken
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                city: data.city,
                address: data.address,
                contactNo: data.contactNo,
                status: data.status,
                joiningDate: data.date
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    setData((prevState) => { return { ...prevState, isError: true } });
                    setData((prevState) => { return { ...prevState, showSnackBar: true } });
                    setData((prevState) => { return { ...prevState, snackBarMessage: data.error } });
                } else {
                    setData((prevState) => { return { ...prevState, isError: false } });
                    setData((prevState) => { return { ...prevState, showSnackBar: true } });
                    setData((prevState) => { return { ...prevState, snackBarMessage: data.message } });
                    setData((prevState) => {
                        return {
                            ...prevState,
                            name: "",
                            email: "",
                            contactNo: '',
                            city: "",
                            address: "",
                            status: 'active',
                            date: date,
                            nameError: false,
                            emailError: false,
                            cityError: false,
                            contactNoError: false,
                            addressError: false
                        }
                    });
                }
            });
    }

    const handleRegisterButton = () => {
        if (!data.name) {
            setData((prevState) => { return { ...prevState, nameError: true } });
        }
        if (!data.contactNo) {
            setData((prevState) => { return { ...prevState, contactNoError: true } });
        }
        if (data.city.length === 0) {
            setData((prevState) => { return { ...prevState, cityError: true } });
        }
        if (!data.address) {
            setData((prevState) => { return { ...prevState, addressError: true } });
        }
    }

    const handleSnackBar = () => {
        setData((prevState) => { return { ...prevState, showSnackBar: false } });
    }

    const handleDialogBox = () => {
        return (
            <DialogBox />
        );
    };

    return (
        <>
            <div>

                <div style={{ visibility: data.showSnackBar ? 'visible' : 'hidden' }} >
                    <CustomSnackBar onClick={handleSnackBar} message={data.snackBarMessage} isError={data.isError} />
                </div>

                <form onSubmit={handleSubmit} method="POST">
                    <div className="d-flex flex-column" >
                        <div className="col-md-12 my-3" >
                            <div style={styles.filedsDivStyling}>
                                <TextField
                                    variant="standard"
                                    label={props.institute}
                                    inputProps={{ pattern: '[a-z A-z -]{3,}' }}
                                    style={{ width: '47%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.nameError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    required={true}
                                    value={data.name}
                                    name="name"
                                    onChange={handleChange}
                                    error={data.nameError}
                                />

                                <TextField
                                    variant="standard"
                                    label="email"
                                    inputProps={{ pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" }}
                                    style={{
                                        width: '47%',
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#4169e1',
                                            fontSize: 22,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={data.emailError}
                                />
                            </div>
                        </div>

                        <div className="col-md-12 my-3">
                            <div style={styles.filedsDivStyling}>
                                <TextField
                                    variant="standard"
                                    label="contactNo"
                                    inputProps={{ pattern: "([0-9]{4}[0-9]{7})|([0-9]{3}[0-9]{7})", maxLength: 11 }}
                                    placeholder="e.g 0611234567 OR 03001234567"
                                    style={{ width: '47%', marginTop: '0.1%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.contactNoError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    required={true}
                                    value={data.contactNo}
                                    name="contactNo"
                                    onChange={handleChange}
                                    error={data.contactNoError}
                                />

                                <FormControl style={{ width: '47%' }}>
                                    <InputLabel
                                        required
                                        style={{
                                            fontSize: 20,
                                            color: data.cityError ? 'red' : '#4169e1',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            marginBottom: 0
                                        }}
                                        htmlFor="city-dropdown">
                                        {props.actor === 'doctor' ? 'city' : 'area'}
                                    </InputLabel>
                                    <NativeSelect
                                        value={data.city}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "city",
                                            id: 'city-dropdown',
                                        }}
                                        style={{ width: '100%' }}
                                        required
                                        error={data.cityError}
                                    >
                                        <option arial-label="none" value=""></option>
                                        {props.actor === 'doctor' ?
                                            cities.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                            :
                                            villages.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>

                            </div>

                        </div>


                        <div className="col-md-12 my-3">

                            <div style={styles.filedsDivStyling}>
                                <TextField
                                    variant="standard"
                                    label="address"
                                    inputProps={{ pattern: "[a-zA-Z 0-9 . , - #]{5,40}" }}
                                    style={{ width: '47%', marginBottom: 20 }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.addressError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    required={true}
                                    value={data.address}
                                    name="address"
                                    onChange={handleChange}
                                    error={data.addressError}
                                // onBlur={() => handleLoginbutton()}
                                />

                                <FormControl style={{ width: '47%' }}>
                                    <InputLabel
                                        style={{
                                            fontSize: 20,
                                            color: '#4169e1',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            marginBottom: 0
                                        }}
                                        htmlFor="status-dropdown">Status</InputLabel>
                                    <NativeSelect
                                        value={data.status}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'status',
                                            id: 'status-dropdown',
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value="active">active</option>
                                        <option value="not active">Not Active</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>

                        <div className="col-md-12 my-3">

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <TextField
                                    variant="standard"
                                    label="date"
                                    style={{ width: '47%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    contentEditable={false}
                                    value={data.date}
                                    name="date"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={styles.buttonsDivStyling}>
                            <Button
                                variant="outline-primary"
                                onClick={() => handleDialogBox()}
                                style={styles.buttonStyling}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="outline-primary"
                                type="submit"
                                onClick={() => handleRegisterButton()}
                                style={styles.buttonStyling}
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Institiute_RegistrationForm;

let styles = {
    filedsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        marginTop: 20
    },
    buttonStyling: {
        width: '45%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold'
    }
}