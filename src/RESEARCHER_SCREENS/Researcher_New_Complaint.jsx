import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';
import moment from 'moment';

//COMPONENTS

import CustomSnackBar from '../COMPONENTS/SnackBar';
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';

const Researcher_New_Complaint = (props) => {

    let date = moment().format('DD-MM-YYYY');
    const [authorized, setAuthorized] = useState();

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const [data, setData] = useState({
        subject: "",
        reportMessage: "",
        reporterName: '',
        reporterID: '',
        reporterRole: 'researcher',
        reportDate: date,
        reportStatus: 'pending',
        subjectError: false,
        reportMessageError: false,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setData({
            ...data,
            [name]: event.target.value,
        });
    };

    let userRole = '';
    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            userRole = await JSON.parse(localStorage.getItem('userRole'));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo  && userRole === 'researcher') {
            setAuthorized(true)
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getUserInfoFromLocalStorage()
        await fetch(`http://localhost:3000/addReport?role=researcher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + parsedUserInfo.authToken,
            },
            body: JSON.stringify({
                subject: data.subject,
                reportMessage: data.reportMessage,
                reporterName: parsedUserInfo.name,
                reporterID: parsedUserInfo._id,
                reporterRole: data.reporterRole,
                reportDate: data.reportDate,
                reportStatus: data.reportStatus
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    setSnackBar({
                        isError: true,
                        showSnackBar: true,
                        snackBarMessage: data.error
                    });
                    setTimeout(() => { setSnackBar({ showSnackBar: false }) }, 4000)
                } else {
                    setSnackBar({
                        isError: false,
                        showSnackBar: true,
                        snackBarMessage: data.message
                    });
                    setData((prevState) => {
                        return {
                            ...prevState,
                            subject: "",
                            reportMessage: "",
                            subjectError: false,
                            reportMessageError: false,
                        }
                    });
                    setTimeout(() => { setSnackBar({ showSnackBar: false }) }, 4000)
                }
            })

    }

    const handleSnackBar = () => {
        setSnackBar({ showSnackBar: false });
    }
    return (
        <>
            {authorized ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Navbar />
                        </div>

                        <div id="foreground" className="col-md-10"
                            style={{
                                marginTop: '5%',
                                padding: 0,
                            }}>
                            <div
                                className="col-12"
                                style={{
                                    paddingLeft: '4%',
                                    paddingRight: '4%',
                                }}
                            >
                                <Banner formName="New Complaint" bannerHeight={150} />

                                <div
                                    style={{
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                        margin: 15,
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="d-flex flex-column mx-5 " >
                                    <div className="col-md-12 mx-5" >
                                        <div style={styles.filedsDivStyling}>
                                            <TextField
                                                variant="standard"
                                                label="subject"
                                                style={{ width: '50%' }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: data.subjectError ? 'red' : '#4169e1',
                                                        fontSize: 20,
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                                required={true}
                                                value={data.subject}
                                                name="subject"
                                                onChange={handleChange}
                                                error={data.subjectError}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mx-5" >
                                        <div style={styles.filedsDivStyling}>
                                            <TextField
                                                required={true}
                                                variant="standard"
                                                label="Message"
                                                multiline
                                                value={data.reportMessage}
                                                rows={7}
                                                rowsMax={Infinity}
                                                style={{ width: '50%', marginBottom: 15 }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: data.reportMessageError ? 'red' : '#4169e1',
                                                        fontSize: 22,
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold'
                                                    }
                                                }}
                                                name="reportMessage"
                                                inputProps={{ maxLength: 250 }}
                                                onChange={handleChange}
                                                error={data.reportMessageError}
                                                helperText={`${data.reportMessage.length} / 250`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: '4%'
                                    }}
                                >
                                    <div style={styles.buttonsDivStyling}>
                                        <Button
                                            variant="outline-primary"
                                            style={styles.buttonStyling}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="outline-primary"
                                            type="submit"
                                            style={styles.buttonStyling}
                                        >
                                            Register
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    );
}

export default withRouter(Researcher_New_Complaint);

let styles = {
    filedsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'
    },
    buttonStyling: {
        width: '40%',
        marginTop: '7%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold'
    }
}