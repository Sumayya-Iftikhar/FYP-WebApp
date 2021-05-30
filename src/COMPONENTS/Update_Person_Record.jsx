import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { TextField, InputLabel, NativeSelect } from '@material-ui/core';

//COMPONENTS
import DialogBox from './DialogBox';
import CustomSnackBar from './SnackBar';
import CustomDatePicker from './datePicker';


//DATA
import { cities } from '../DATA/Cities';
import { villages } from '../DATA/Villages';

const Update_Person_Record = (props) => {
    let updateUrl = `http://localhost:3000/updateOne${props.selectedOption}Record`;
    // alert(updateUrl);

    const [open, setOpen] = useState(false);
    const [hospitalNames, sethospitalNames] = useState([]);
    const [dispensariesNames, setDispensariesNames] = useState([]);

    var date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const [error, setError] = useState({
        nameError: false,
        genderError: false,
        dobError: false,
        emailError: false,
        cityError: false,
        cnicError: false,
        contactNoError: false,
        instituteNameError: false,
    });

    const [userInfo, setUserInfo] = useState({
        name: props.name,
        userName: props.userName,
        gender: props.gender,
        dob: props.dob,
        email: props.email,
        city: props.city,
        cnic: props.cnic,
        contactNo: props.contactNo,
        instituteName: props.instituteName,
        status: props.status,
        joiningDate: props.joiningDate,
        dp: props.dp
    });

    let parsedUserInfo = '';
    useEffect(async () => {
        if (props.actor !== 'Researcher') {
            try {
                let userInfo = await localStorage.getItem('userInfo');
                parsedUserInfo = JSON.parse(userInfo);
                console.log('parsed user info: ', parsedUserInfo);
            } catch (error) {
                console.log(error);
            }

            await fetch(`http://localhost:3000/fetchAllDispensariesNames`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        console.log(data.message);
                    } else {
                        console.log('fetch dispensaries names: ', data);
                        setDispensariesNames(data);
                    }
                }).catch(error => {
                    console.log('catch error: ', error);
                });


            await fetch(`http://localhost:3000/fetchAllhospitalsNames`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        console.log(data.message);
                    } else {
                        console.log('fetch hospital names: ', data);
                        sethospitalNames(data);
                    }
                }).catch(error => {
                    console.log('catch error: ', error);
                });
        }
    }, []);

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
                userName: props.userName,
                gender: props.gender,
                dob: props.dob,
                email: props.email,
                city: props.city,
                cnic: props.cnic,
                contactNo: props.contactNo,
                password: props.password,
                instituteName: props.instituteName,
                status: props.status,
                joiningDate: props.joiningDate,
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            userInfo.name === props.name && userInfo.gender === props.gender
            && userInfo.dob === props.dob && userInfo.contactNo === props.contactNo
            && userInfo.email === props.email && userInfo.cnic === props.cnic
            && userInfo.city === props.city && userInfo.instituteName === props.instituteName
            && userInfo.status === props.status
        ) {
            alert('same Data');
        } else {
            alert('update else')
            let parsedUserInfo = '';
            try {
                let userInfo = await localStorage.getItem('userInfo');
                parsedUserInfo = JSON.parse(userInfo);
            } catch (error) {
                console.log(error);
            }
            await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + parsedUserInfo.authToken
                },
                body: JSON.stringify({
                    id: props.userID,
                    name: userInfo.name === props.name ? props.name : userInfo.name,
                    userName: props.userName,
                    gender: userInfo.gender === props.gender ? props.gender : userInfo.gender,
                    dob: userInfo.dob === props.dob ? props.dob : userInfo.dob,
                    contactNo: userInfo.contactNo === props.contactNo ? props.contactNo : userInfo.contactNo,
                    email: userInfo.email === props.email ? props.email : userInfo.email,
                    cnic: userInfo.cnic === props.cnic ? props.cnic : userInfo.cnic,
                    city: userInfo.city === props.city ? props.city : userInfo.city,
                    instituteName: userInfo.instituteName === props.instituteName ? props.instituteName : userInfo.instituteName,
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
            setUserInfo((prevState) => { return { ...prevState, nameError: true } });
        }
        if (!userInfo.userName) {
            setUserInfo((prevState) => { return { ...prevState, userNameError: true } });
        }
        if (!userInfo.gender) {
            setUserInfo((prevState) => { return { ...prevState, genderError: true } });
        }
        if (!userInfo.contactNo) {
            setUserInfo((prevState) => { return { ...prevState, contactNoError: true } });
        }
        if (!userInfo.email) {
            setUserInfo((prevState) => { return { ...prevState, emailError: true } });
        }
        if (!userInfo.cnic) {
            setUserInfo((prevState) => { return { ...prevState, cnicError: true } });
        }
        if (!userInfo.city) {
            setUserInfo((prevState) => { return { ...prevState, cityError: true } });
        }
        if (!userInfo.address) {
            setUserInfo((prevState) => { return { ...prevState, addressError: true } });
        }
        if (!userInfo.instituteName) {
            setUserInfo((prevState) => { return { ...prevState, instituteNameError: true } });
        }
    }

    const handleSnackBar = () => {
        setSnackBar((prevState) => { return { ...prevState, showSnackBar: false } });
    }


    const handleDateChange = (date) => {
        let newDob = date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        setUserInfo((prevState) => { return { ...prevState, dob: newDob } });
    };

    return (
        <>
            <div >
                <div style={{ visibility: snackBar.showSnackBar ? 'visible' : 'hidden' }} >
                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                </div>
                <div className="col-md-12 col-sm-12"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}
                >
                    <img
                        src={"data:image/png;base64," + props.dp}
                        style={{
                            marginRight: 20,
                            height: 250,
                            width: 250
                        }}
                    />
                </div>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="d-flex flex-column">
                        <div className="col-md-12" >
                            <div style={styles.fieldsDivStyling}>
                                <TextField
                                    variant="standard"
                                    label="Full Name"
                                    inputProps={{ pattern: '[a-z A-z -]{3,}' }}
                                    style={{ width: '45%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: error.nameError ? 'red' : '#4169e1',
                                            fontSize: 22,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    required={true}
                                    value={userInfo.name}
                                    name="name"
                                    onChange={handleChange}
                                    error={error.nameError}
                                />

                                <TextField
                                    variant="standard"
                                    label="user name"
                                    contentEditable={false}
                                    style={{ width: '45%' }}
                                    InputLabelProps={{ style: { fontWeight: 'bold', color: error.userNameError ? 'red' : '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                                    value={userInfo.userName}
                                    name="userName"
                                    error={error.userNameError}
                                    required
                                />
                            </div>
                        </div>


                        <div className="col-md-12 my-3" >
                            <div style={styles.fieldsDivStyling}>
                                <div style={{ width: '45%' }}>
                                    <InputLabel
                                        required
                                        style={{
                                            fontSize: 20,
                                            color: error.genderError ? 'red' : '#4169e1',
                                            fontWeight: 'bold'
                                        }}
                                        htmlFor="gender-dropdown">
                                        Gender
                                    </InputLabel>
                                    <NativeSelect
                                        value={userInfo.gender}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'gender',
                                            id: 'gender-dropdown',
                                        }}
                                        style={{ width: '100%' }}
                                        required
                                        error={error.genderError}
                                    >
                                        {/* <option aria-label="None" value="" /> */}
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </NativeSelect>
                                </div>

                                <div style={{ width: '45%', marginTop: '1%' }}>
                                    <CustomDatePicker
                                        label="DOB"
                                        onChange={handleDateChange}
                                        value={userInfo.dob}
                                        isError={error.dobError}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 my-3">
                            <div style={styles.fieldsDivStyling}>


                                <TextField
                                    variant="standard"
                                    label="contactNo"
                                    inputProps={{ pattern: "03[0-9]{9}", maxLength: 11 }}
                                    placeholder="03001234567"
                                    style={{ width: '45%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: error.contactNoError ? 'red' : '#4169e1',
                                            fontSize: 22,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    required={true}
                                    value={userInfo.contactNo}
                                    name="contactNo"
                                    onChange={handleChange}
                                    error={error.contactNoError}
                                />

                                <TextField
                                    variant="standard"
                                    label="email"
                                    type="email"
                                    // inputProps={{ pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}" }}
                                    style={{ width: '45%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: error.emailError ? 'red' : '#4169e1',
                                            fontSize: 22,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    value={userInfo.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={error.emailError}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12 my-3">

                            <div style={styles.fieldsDivStyling}>

                                <TextField
                                    variant="standard"
                                    label="cnic"
                                    inputProps={{ pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}" }}
                                    style={{ width: '45%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: error.cnicError ? 'red' : '#4169e1',
                                            fontSize: 22,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    value={userInfo.cnic}
                                    name="cnic"
                                    onChange={handleChange}
                                    error={error.cnicError}
                                    required
                                />


                                <div style={{ width: '45%' }}>
                                    <InputLabel
                                        required
                                        style={{
                                            fontSize: 20,
                                            color: error.cityError ? 'red' : '#4169e1',
                                            marginBottom: 0,
                                            fontWeight: 'bold'
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
                                        style={{ width: '100%' }}
                                        required
                                        error={error.cityError}
                                    >
                                        <option label={userInfo.city} value={userInfo.city}></option>
                                        {props.selectedOption === 'HealthWorkers' ?
                                            villages.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                            :
                                            cities.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </div>


                            </div>


                        </div>
                        {/* {alert(props.selectedOption)} */}
                        <div className="col-md-12 my-3">
                            <div style={styles.fieldsDivStyling}>
                                <div style={{ width: '45%' }}>
                                    {props.selectedOption === 'Researchers' ?
                                        <>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    fontWeight: 'bold'
                                                }}
                                                htmlFor="status-dropdown">
                                                Status
                                            </InputLabel>
                                            <NativeSelect
                                                value={userInfo.status}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'status',
                                                    id: 'status-dropdown',
                                                }}
                                                style={{ width: '100%' }}
                                                required
                                            >
                                                <option value="ACTIVE">Active</option>
                                                <option value="NOT ACTIVE">Not Active</option>
                                            </NativeSelect>
                                        </>
                                        :
                                        <>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: error.instituteNameError ? 'red' : '#4169e1',
                                                    fontWeight: 'bold'
                                                }}
                                                htmlFor="institute-dropdown">
                                                Associated {props.selectedOption === 'Doctors' ? 'Hospital' : "Dispensary"}
                                            </InputLabel>
                                            <NativeSelect
                                                value={userInfo.instituteName}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'instituteName',
                                                    id: 'institute-dropdown',
                                                }}
                                                style={{ width: '100%' }}
                                                required
                                                error={error.instituteNameError}
                                            >
                                                <option label={userInfo.instituteName} value={userInfo.instituteName}></option>
                                                {props.selectedOption === 'Doctors' ?
                                                    hospitalNames.map((item, index) => {
                                                        return <option key={index} value={item.name}>{item.name}</option>
                                                    })
                                                    :
                                                    dispensariesNames.map((item, index) => {
                                                        return <option key={index} value={item.name}>{item.name}</option>
                                                    })
                                                }
                                            </NativeSelect>
                                        </>
                                    }
                                </div>

                                {props.selectedOption === 'Researchers' ?
                                    <TextField
                                        variant="standard"
                                        label="joining Date"
                                        style={{ width: '45%', marginTop: 5 }}
                                        InputLabelProps={{ style: { fontWeight: 'bold', color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                                        contentEditable={false}
                                        value={userInfo.joiningDate}
                                        name="joiningDate"
                                    />
                                    :
                                    <>
                                        <div style={{ width: '45%' }}>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    fontWeight: 'bold'
                                                }}
                                                htmlFor="status-dropdown">
                                                Status
                                    </InputLabel>
                                            <NativeSelect
                                                value={userInfo.status}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'status',
                                                    id: 'status-dropdown',
                                                }}
                                                style={{ width: '100%' }}
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="not active">Not Active</option>
                                            </NativeSelect>
                                        </div>
                                    </>
                                }

                            </div>


                        </div>
                        {props.selectedOption === 'Researchers' ?
                            null
                            :
                            <div className="col-md-12 my-3">
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <TextField
                                        variant="standard"
                                        label="joining Date"
                                        style={{ width: '45%', marginTop: 5 }}
                                        InputLabelProps={{ style: { fontWeight: 'bold', color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                                        contentEditable={false}
                                        value={userInfo.joiningDate}
                                        name="joiningDate"
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    <div className="col-md-12" style={styles.buttonsDivStyling}>
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
                            onClick={() => handleRegisterButton()}
                            style={styles.buttonStyling}
                        >
                            Update
                            </Button>
                    </div>
                </form>
            </div>

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

export default Update_Person_Record;


let styles = {
    fieldsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25
    },
    buttonStyling: {
        width: '35%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold'
    }
}