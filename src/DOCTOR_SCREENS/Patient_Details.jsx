import React, { useState, useEffect } from "react";

import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';
//BOOTSTRAP
import Button from 'react-bootstrap/Button';

//COMPONENTS
import Navbar from "../Navbar";
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import Display_Patient_Record from './Display_Patient_Record';
import CustomSnackBar from '../COMPONENTS/SnackBar';

const Patient_Details = (props) => {

    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showSection, setshowSection] = useState(false);
    const [buttonText, setbuttonText] = useState("WRITE RESPONSE");
    const [newDengueStatus, setNewDengueStatus] = useState('negative');
    const ShowHideSection = () => {
        if (buttonText === "WRITE RESPONSE") {
            setshowSection(true)
            setbuttonText("HIDE RESPONSE")

        }

        else {
            setbuttonText("WRITE RESPONSE")
            setshowSection(false)
        }
    }

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const [patientInfo, setPatientInfo] = useState({
        cassID: '',
        name: '',
        gender: '',
        age: '',
        district: '',
        homeTown: '',
        dengueStatus: '',
        dispensary: '',
        date: '',
        symptoms: '',
        symptomsImage: '',
        message: '',
        messageError: false,
    });
    
    let userRole = '';
    let parsedInfo = '';
    let parsedUserInfo = '';
    const getpatientInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            let info = await localStorage.getItem('recordsPassToNextScreen');
            parsedInfo = JSON.parse(info);
            userRole = await JSON.parse(localStorage.getItem('userRole'));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getpatientInfoFromLocalStorage();
        if (parsedUserInfo && userRole === 'doctor') {
            setAuthorized(true)
            await fetch(`http://localhost:3000/findOnePatientsRecord?id=${parsedInfo.patientID}&role=doctor`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    if (data.error) {
                        console.log(data);
                    } else {
                        console.log(data);
                        setPatientInfo({
                            caseID: data.caseID,
                            name: data.name,
                            gender: data.gender,
                            age: data.age,
                            district: data.district,
                            homeTown: data.homeTown,
                            dengueStatus: data.dengueStatus,
                            dispensary: data.dispensary,
                            date: data.date,
                            symptoms: data.symptoms,
                            symptomsImage: data.symptomsImage
                        });
                        setIsLoading(false);
                    }
                });
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getpatientInfoFromLocalStorage();
        await fetch(`http://localhost:3000/updateOnePatientRecord?role=doctor`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + parsedUserInfo.authToken
            },
            body: JSON.stringify({
                patientID: parsedInfo.patientID,
                dengueStatus: newDengueStatus,
                doctorResponse: patientInfo.message,
                respondedBy: parsedUserInfo._id,
                caseStatus: 'newForHealthWorker'
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setSnackBar({
                        isError: true,
                        showSnackBar: true,
                        snackBarMessage: data.error
                    });
                } else {
                    setPatientInfo({ ...patientInfo, message: '' })
                    setSnackBar({
                        isError: false,
                        showSnackBar: true,
                        snackBarMessage: data.message
                    });
                }
                setTimeout(() => {
                    setSnackBar({ showSnackBar: false })
                    setbuttonText("WRITE RESPONSE")
                    setshowSection(false)
                }, 4000)
            }).catch(error => {
                console.log('catch error: ', error);
            })
    }

    const handleSnackBar = () => {
        setSnackBar({ showSnackBar: false });
    }
    return (
        <>
            {authorized ?
                isLoading ?
                    <Loading />
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Navbar />
                            </div>

                            <div id="foreground" className="col-md-10"
                                style={{
                                    marginTop: '8%',
                                    padding: 0,
                                }}>
                                <div id="banner"
                                    className="col-12 mb-lg-3"
                                    style={{ paddingLeft: '4%', paddingRight: '4%', marginBottom: 20 }}
                                >
                                    <Banner
                                        formName="Patient Details"
                                        bannerHeight={150}
                                    />
                                </div>
                            </div>

                            <div className="col-12" id="patientInfo">
                                <div
                                    style={{
                                        paddingLeft: '9%',
                                        paddingRight: '9%',
                                        marginBottom: 20
                                    }}
                                >

                                    {patientInfo ?
                                        <Display_Patient_Record
                                            caseID={patientInfo.caseID}
                                            name={patientInfo.name}
                                            gender={patientInfo.gender}
                                            age={patientInfo.age}
                                            district={patientInfo.district}
                                            homeTown={patientInfo.homeTown}
                                            dengueStatus={patientInfo.dengueStatus}
                                            dispensary={patientInfo.dispensary}
                                            date={patientInfo.date}
                                            symptoms={patientInfo.symptoms}
                                            symptomsImage={patientInfo.symptomsImage}
                                        />
                                        :
                                        null
                                    }
                                </div>
                            </div>

                            <div
                                className="col-12"
                                style={{ marginBottom: '1%', display: 'flex', justifyContent: 'center' }}
                            >
                                <Button
                                    href={showSection ? '#form' : '#banner'}
                                    variant="outline-primary"
                                    style={styles.deleteButtonStyling}
                                    onClick={() => ShowHideSection()}
                                >
                                    {buttonText}
                                </Button>
                            </div>
                        </div>
                        {
                            showSection ?
                                <>
                                    <div className="row col-6 mx-auto">
                                        <div>
                                            <div
                                                style={{
                                                    visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                                    marginBottom: 10
                                                }}
                                            >
                                                <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                            </div>
                                            <form id="form"
                                                onSubmit={handleSubmit}
                                                method="POST"
                                                style={{ marginBottom: '5%' }}
                                            >
                                                <InputLabel
                                                    style={{
                                                        fontSize: 24,
                                                        color: '#4169e1',
                                                        fontWeight: 'bold',
                                                    }}
                                                    htmlFor="outlined-age-native-simple">Select status</InputLabel>
                                                <NativeSelect
                                                    variant="outlined"
                                                    onChange={(e) => setNewDengueStatus(e.target.value)}
                                                    label="select"
                                                    style={{ width: '100%' }}
                                                    inputProps={{
                                                        name: 'select',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option value="negative">Negative</option>
                                                    <option value="positive">Positive</option>
                                                    <option value="suspected">Suspected</option>
                                                </NativeSelect>
                                                <TextField
                                                    required
                                                    variant="standard"
                                                    label="Message"
                                                    multiline
                                                    value={patientInfo.message}
                                                    contentEditable={false}
                                                    rows={7}
                                                    rowsMax={Infinity}
                                                    style={{ width: '100%', marginBottom: 15 }}
                                                    InputLabelProps={{
                                                        style:
                                                        {
                                                            color: patientInfo.messageError ? 'red' : '#4169e1',

                                                            fontSize: 22, textTransform: 'uppercase'
                                                        }
                                                    }}
                                                    name="Message"
                                                    inputProps={{ maxLength: 250 }}
                                                    onChange={e => setPatientInfo({ ...patientInfo, message: e.target.value })}
                                                    error={patientInfo.messageError}
                                                    helperText={patientInfo.message ? `${patientInfo.message.length} / 250` : 0 / 250}

                                                />

                                                <div className="col-md-12"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <div style={styles.buttonsDivStyling}>
                                                        <Button
                                                            variant="outline-primary"
                                                            style={styles.buttonStyling}
                                                        >
                                                            Discard
                                                    </Button>

                                                        <Button
                                                            variant="outline-primary"
                                                            type="submit"
                                                            style={styles.buttonStyling}
                                                        >
                                                            send
                                                    </Button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }

                    </div>
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    )
};

export default Patient_Details;
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
        width: '22%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    }, buttonsDivStyling: {
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