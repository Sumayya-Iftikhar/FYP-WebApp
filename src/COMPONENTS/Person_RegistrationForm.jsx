import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { TextField, InputLabel, NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

//COMPONENTS
import CustomSnackBar from './SnackBar';
import CustomDatePicker from './datePicker';

//DATA
import { cities } from '../DATA/Cities';
import { villages } from '../DATA/Villages';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Person_RegistrationForm = (props) => {

    const classes = useStyles();

    let url = `http://localhost:3000/add${props.actor}/`;

    let route = '';
    if (props.actor === 'doctor') {
        route = 'addDoctor'
    } else if (props.actor === 'addDoctor') {
        route = 'addHealthWorker'
    } else if (props.actor === 'Researcher') {
        route = 'addResearcher'
    }

    let date = moment().format('DD-MM-YYYY');
    const [hospitalNames, sethospitalNames] = useState([]);
    const [dispensariesNames, setDispensariesNames] = useState([]);

    const [data, setData] = useState({
        name: "",
        userName: "",
        gender: '',
        dob: '01/01/2001',
        email: "",
        city: "",
        cnic: "",
        contactNo: "",
        password: '',
        instituteName: "",
        status: 'active',
        joiningDate: date,
        nameError: false,
        genderError: false,
        dobError: false,
        emailError: false,
        cityError: false,
        cnicError: false,
        contactNoError: false,
        instituteNameError: false,
        showSnackBar: false,
        snackBarMessage: '',
        isError: false
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setData({
            ...data,
            [name]: event.target.value,
        });
    };

    let userInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            console.log('parsed user info: ', parsedUserInfo);
        } catch (error) {
            console.log(error);
        }
    }

    let parsedUserInfo = '';
    useEffect(async () => {
        if (props.actor !== 'Researcher') {
            await getUserInfoFromLocalStorage();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getUserInfoFromLocalStorage();
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + parsedUserInfo.authToken
            },
            body: JSON.stringify({
                name: data.name,
                userName: data.userName,
                email: data.email,
                password: data.password,
                gender: data.gender,
                dob: data.dob,
                cnic: data.cnic,
                contactNo: data.contactNo,
                city: data.city,
                instituteName: data.instituteName,
                joiningDate: data.joiningDate,
                status: data.status
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    setData((prevState) => {
                        return {
                            ...prevState,
                            isError: true,
                            showSnackBar: true,
                            snackBarMessage: data.error
                        }
                    });
                } else {
                    setData((prevState) => {
                        return {
                            ...prevState,
                            isError: false,
                            showSnackBar: true,
                            snackBarMessage: data.message,
                            name: "",
                            userName: "",
                            gender: '',
                            dob: '01/01/2001',
                            contactNo: "",
                            email: "",
                            cnic: "",
                            city: "",
                            address: '',
                            instituteName: "",
                            status: 'active',
                            joiningDate: date,
                            password: '',
                            nameError: false,
                            userNameError: false,
                            genderError: false,
                            dobError: false,
                            contactNoError: false,
                            emailError: false,
                            cnicError: false,
                            cityError: false,
                            addressError: false,
                            instituteNameError: false,
                        }
                    });
                }
            });
    }

    const handleRegisterButton = () => {
        if (!data.name) {
            setData((prevState) => { return { ...prevState, nameError: true } });
        }
        if (!data.userName) {
            setData((prevState) => { return { ...prevState, userNameError: true } });
        }
        if (!data.gender) {
            setData((prevState) => { return { ...prevState, genderError: true } });
        }
        if (!data.contactNo) {
            setData((prevState) => { return { ...prevState, contactNoError: true } });
        }
        if (!data.email) {
            setData((prevState) => { return { ...prevState, emailError: true } });
        }
        if (!data.cnic) {
            setData((prevState) => { return { ...prevState, cnicError: true } });
        }
        if (!data.city) {
            setData((prevState) => { return { ...prevState, cityError: true } });
        }
        if (!data.address) {
            setData((prevState) => { return { ...prevState, addressError: true } });
        }
        if (!data.instituteName) {
            setData((prevState) => { return { ...prevState, instituteNameError: true } });
        }
    }

    const handleSnackBar = () => {
        setData((prevState) => { return { ...prevState, showSnackBar: false } });
    }

    const handleNameFieldOnBlur = () => {
        let getUserName = '';
        let getPassword = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        //USERNAME GENERATION
        if (data.name) {
            if (data.name.includes(' ')) {
                getUserName = data.name.substr(0, data.name.indexOf(' '));
            } else {
                getUserName = data.name.substr(data.name.indexOf(' ') + 1);
            }
            getUserName = getUserName + '_' + Math.floor(1000 + Math.random() * 9000);
            setData((prevState) => { return { ...prevState, userName: getUserName } });
        } else {
            setData((prevState) => { return { ...prevState, userName: '' } });
        }


        //password generation
        for (let i = 1; i <= 8; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            getPassword += str.charAt(char)
        }
        setData((prevState) => { return { ...prevState, password: getPassword } });
    }

    const handleDateChange = (date) => {
        let newDob = date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        setData((prevState) => { return { ...prevState, dob: newDob } });
    };

    return (
        <>
            <div >
                <div style={{ visibility: data.showSnackBar ? 'visible' : 'hidden' }} >
                    <CustomSnackBar onClick={handleSnackBar} message={data.snackBarMessage} isError={data.isError} />
                </div>

                <form onSubmit={handleSubmit} method="POST">
                    <div className="d-flex flex-column">
                        <div className="col-md-12 my-3" >
                            <div style={styles.fieldsDivStyling}>
                                <TextField
                                    variant="standard"
                                    label="Full Name"
                                    inputProps={{ pattern: '[a-z A-z -]{3,}' }}
                                    style={{ width: '47%', marginBottom: 10 }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.nameError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    required={true}
                                    value={data.name}
                                    name="name"
                                    onChange={handleChange}
                                    error={data.nameError}
                                    onBlur={() => handleNameFieldOnBlur()}
                                />

                                <TextField
                                    variant="standard"
                                    label="user name"
                                    contentEditable={false}
                                    style={{ width: '47%', marginBottom: 10 }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.userNameError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    value={data.userName}
                                    name="userName"
                                    onChange={handleChange}
                                    error={data.userNameError}
                                    required
                                />
                            </div>
                        </div>


                        <div className="col-md-12 my-3" >
                            <div style={styles.fieldsDivStyling}>
                                <FormControl style={{ width: '47%' }}>
                                    <InputLabel
                                        required
                                        style={{
                                            fontSize: 20,
                                            color: data.genderError ? 'red' : '#4169e1',
                                            textTransform: 'uppercase',
                                            marginBottom: 0,
                                            fontWeight: 'bold',
                                        }}
                                        htmlFor="gender-dropdown">
                                        Gender
                                    </InputLabel>
                                    <NativeSelect
                                        // variant="standard"
                                        label="user name"
                                        value={data.gender}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'gender',
                                            id: 'gender-dropdown',
                                        }}
                                        style={{ width: '100%' }}
                                        required
                                        error={data.genderError}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </NativeSelect>
                                </FormControl>

                                <div style={{ width: '47%' }}>
                                    <CustomDatePicker
                                        label="DOB"
                                        onChange={handleDateChange}
                                        value={data.dob}
                                        isError={data.dobError}
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
                                    placeholder="03001234767"
                                    style={{ width: '47%' }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.contactNoError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    required={true}
                                    value={data.contactNo}
                                    name="contactNo"
                                    onChange={handleChange}
                                    error={data.contactNoError}
                                />

                                <TextField
                                    variant="standard"
                                    label="email"
                                    type="email"
                                    // inputProps={{ pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}" }}
                                    style={{ width: '47%', marginBottom: 10 }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.emailError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={data.emailError}
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
                                    style={{ width: '47%', marginBottom: 10 }}
                                    InputLabelProps={{
                                        style: {
                                            color: data.cnicError ? 'red' : '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    value={data.cnic}
                                    name="cnic"
                                    onChange={handleChange}
                                    error={data.cnicError}
                                    required
                                />


                                <FormControl style={{ width: '47%' }}>
                                    <InputLabel
                                        required
                                        style={{
                                            fontSize: 20,
                                            color: data.cityError ? 'red' : '#4169e1',
                                            marginBottom: 0,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }}
                                        htmlFor="city-dropdown">
                                        City
                                    </InputLabel>
                                    <NativeSelect
                                        value={data.city}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'city',
                                            id: 'city-dropdown',
                                        }}
                                        style={{ width: '100%' }}
                                        required
                                        error={data.cityError}
                                    >
                                        <option aria-label="None" value="" />
                                        {props.actor === 'HealthWorker' ?
                                            villages.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                            :
                                            cities.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>


                            </div>


                        </div>
                        <div className="col-md-12 my-3">
                            <div style={styles.fieldsDivStyling}>
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
                                    {props.actor === 'Researcher' ?
                                        <>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                }}
                                                htmlFor="status-dropdown">
                                                Status
                                            </InputLabel>
                                            <NativeSelect
                                                value={data.status}
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
                                        </>
                                        :
                                        <>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: data.instituteNameError ? 'red' : '#4169e1',
                                                    marginBottom: 0,
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                }}
                                                htmlFor="institute-dropdown">
                                                Assocaited {props.institute}
                                            </InputLabel>
                                            <NativeSelect
                                                value={data.instituteName}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'instituteName',
                                                    id: 'institute-dropdown',
                                                }}
                                                style={{ width: '100%' }}
                                                required
                                                error={data.instituteNameError}
                                            >
                                                <option aria-label="None" value="" />
                                                {props.actor === 'Doctor' ?
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
                                </FormControl>

                            </div>


                        </div>

                        <div className="col-md-12 my-3">
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: props.actor === 'Researcher' ? 'center' : 'space-between'
                            }}>
                                {props.actor === 'Researcher' ?
                                    null
                                    :
                                    <>
                                        <FormControl style={{ width: '47%' }}>
                                            <InputLabel
                                                required
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    marginBottom: 0,
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                }}
                                                htmlFor="status-dropdown">
                                                Status
                                            </InputLabel>
                                            <NativeSelect
                                                value={data.status}
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
                                        </FormControl>
                                    </>
                                }

                                <TextField
                                    variant="standard"
                                    label="joining Date"
                                    style={{ width: '47%', marginTop: 5 }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#4169e1',
                                            fontSize: 20,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    contentEditable={false}
                                    value={data.joiningDate}
                                    name="joiningDate"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={styles.buttonsDivStyling}>
                            <Button
                                variant="outline-primary"
                                // onClick={() => handleDialogBox()}
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
            </div >
        </>
    );
}

export default Person_RegistrationForm;


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








