import React, { useState } from 'react';


import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';




//COMPONENTS
import Button from 'react-bootstrap/Button';
import { TextField, InputLabel, NativeSelect } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update_Profile_Form(props) {

    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [updateImage, setUpdateImage] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // alert(props.id);
    // alert(props.password);
    // alert(props.contactNo);
    // alert(props.email);
    const [userInfo, setUserInfo] = useState({
        contactNo: '',
        email: '',
        password: '',
        confirmPassword: '',
        dp: ''
    });

    const handleSubmitForm = async (e) => {
        alert('?')
        e.preventDefault();
        if (userInfo.password !== userInfo.confirmPassword) {
            setPasswordError(true);
            setErrorMessage('Password does not match!!');
        }
        else {
            if (!userInfo.contactNo && !userInfo.email && !userInfo.password && !userInfo.dp) {
                props.handleClose();
            }
            else if (
                userInfo.contactNo === props.contactNo &&
                userInfo.email === props.email &&
                userInfo.password === props.contactNo
            ) { setErrorMessage('You\'ve entered same data!!'); }
            else {
                if (updateImage) {
                    const formData = new FormData();
                    formData.append("id", props.id);
                    formData.append("contactNo", userInfo.contactNo !== '' ? userInfo.contactNo : props.contactNo);
                    formData.append("email", userInfo.email !== '' ? userInfo.email : props.email);
                    if (userInfo.password) {
                        formData.append("password", userInfo.password)
                    }
                    formData.append("dp", userInfo.dp);
                    await fetch(`http://localhost:3000/update${props.userRole}Profile`, {
                        method: 'PUT',
                        headers: { 'Authorization': 'Bearer ' + props.authToken },
                        body: formData
                    }).then(result => result.json())
                        .then(data => {
                            console.log('data: ', data)
                            if (data.error) {
                                console.log(data.error)
                                props.handleClose(false, data.error);
                            } else {
                                console.log('data message: ', data.message)
                                handleProfileUpdateSuccess(data);
                            }
                        }).catch(error => {
                            console.log('catch error: ', error)
                        })
                }
                else {
                    fetch(`http://localhost:3000/update${props.userRole}Profile`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + props.authToken
                        },
                        body: JSON.stringify({
                            id: props.id,
                            contactNo: userInfo.contactNo !== '' ? userInfo.contactNo : props.contactNo,
                            email: userInfo.email !== '' ? userInfo.email : props.email,
                            password: userInfo.password !== '' ? userInfo.password : undefined,
                        })
                    }).then(result => result.json())
                        .then(data => {
                            if (data.error) {
                                console.log(data.error)
                                props.handleClose(false, data.error);
                            } else {
                                console.log(data.message)
                                handleProfileUpdateSuccess(data);
                            };
                        }).catch(error => {
                            console.log('catch error: ', error)
                        })
                }
            }
        }
    }

    const handleProfileUpdateSuccess = async (receivedDataFromServer) => {
        console.log('receivedDataFromServer: ', receivedDataFromServer)
        try {
            let userInfo = await localStorage.getItem('userInfo');
            let parsedUserInfo = JSON.parse(userInfo);
            receivedDataFromServer.userInfo.authToken = parsedUserInfo.authToken
            await localStorage.setItem('userInfo', JSON.stringify(receivedDataFromServer.userInfo))
            props.handleClose(true, receivedDataFromServer.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelButton = () => {
        // setImageUrl('');
        setErrorMessage('')
        setPasswordError(false);
        setUserInfo(prevState => {
            return {
                ...prevState,
                contactNo: '',
                email: '',
                password: '',
                confirmPassword: '',
                dp: null
            }
        });
        props.handleClose()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        setUserInfo({
            ...userInfo,
            [name]: event.target.value,
        });
    };

    const handleImageUpload = (e) => {
        setUpdateImage(true);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setUserInfo(prevState => { return { ...prevState, dp: e.target.files[0] } });
    }

    return (
        <>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Update Profile"}</DialogTitle>
                <text style={styles.errorMessageStyling}>{errorMessage}</text>
                <DialogContent>
                    <form method="PUT" onSubmit={handleSubmitForm}>
                        <div className='row'>
                            <div className="col-md-5 col-lg-5 col-sm-12"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    marginBottom: 20,
                                }}
                            >
                                <img src={imageUrl} width={150} heigh={100} style={{ alignSelf: 'center' }} />
                                <input
                                    type="file"
                                    onChange={e => handleImageUpload(e)}
                                    accept="image/jpeg"
                                    style={{ marginLeft: '15%' }}
                                />
                            </div>

                            <div
                                className="col-md-7 col-lg-7 col-sm-12"
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <TextField
                                    variant="standard"
                                    label="contactNo"
                                    value={userInfo.contactNo}
                                    inputProps={{ pattern: "03[0-9]{9}", maxLength: 11 }}
                                    placeholder="03001234567"
                                    style={{ width: '100%', marginBottom: 15 }}
                                    InputLabelProps={{
                                        style: {
                                            // color: data.contactNoError ? 'red' : '#d82fff',
                                            fontSize: 22,
                                            textTransform: 'uppercase'
                                        }
                                    }}
                                    name="contactNo"
                                    onChange={handleChange}
                                // error={data.contactNoError}
                                />

                                <TextField
                                    variant="standard"
                                    label="email"
                                    type="email"
                                    value={userInfo.email}
                                    style={{ width: '100%', marginBottom: 15 }}
                                    InputLabelProps={{
                                        style: {
                                            // color: data.emailError ? 'red' : '#d82fff',
                                            fontSize: 22,
                                            textTransform: 'uppercase'
                                        }
                                    }}
                                    // value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                // error={data.emailError}
                                />

                                <TextField
                                    variant="standard"
                                    label="password"
                                    value={userInfo.password}

                                    inputProps={{ minLength: 8 }}
                                    style={{ width: '100%', marginBottom: 15 }}
                                    InputLabelProps={{
                                        style: {
                                            // color: data.emailError ? 'red' : '#d82fff',
                                            fontSize: 22,
                                            textTransform: 'uppercase'
                                        }
                                    }}
                                    // value={data.email}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                // error={data.emailError}
                                />

                                <TextField
                                    variant="standard"
                                    label="confirm password"
                                    value={userInfo.confirmPassword}
                                    inputProps={{ minLength: 8 }}
                                    style={{ width: '100%', marginBottom: 15 }}
                                    InputLabelProps={{
                                        style: {
                                            // color: data.emailError ? 'red' : '#d82fff',
                                            fontSize: 22,
                                            textTransform: 'uppercase'
                                        }
                                    }}
                                    // value={data.email}
                                    name="confirmPassword"
                                    type="password"
                                    onChange={handleChange}
                                // error={data.emailError}
                                />


                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    marginBlock: 10,
                                    paddingInline: 20
                                }}
                            >
                                <Button
                                    variant="outline-primary"
                                    style={styles.dialogBoxbuttonStyling}
                                    onClick={handleCancelButton}
                                >
                                    cancel
                                    </Button>
                                <Button
                                    variant="outline-primary"
                                    style={styles.dialogBoxbuttonStyling}
                                    type="submit"
                                >
                                    update
                                </Button>
                            </div>
                        </div>
                    </form>

                </DialogContent>
            </Dialog >
        </>
    );
}


const styles = {
    rowStyling: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    deleteButtonStyling: {
        width: 220,
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
    dialogBoxbuttonStyling: {
        width: '47%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
    errorMessageStyling: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: 'red'
    }
}