import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import DialogBox from '../COMPONENTS/DialogBox';
import CustomSnackBar from '../COMPONENTS/SnackBar';
import Display_Person_Record from '../COMPONENTS/Display_Person_Record';
import Display_Institute_Record from '../COMPONENTS/Display_Institute_Record';


const Display_Record_Details = (props) => {
    let parsedInfo = '';
    let parsedUserInfo = '';
    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [displayButtons, setDisplayButtons] = useState('');

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const [userInfo, setUserInfo] = useState({
        name: '',
        userName: '',
        gender: '',
        dob: '',
        email: '',
        city: '',
        cnic: '',
        contactNo: '',
        address: '',
        instituteName: '',
        status: '',
        joiningDate: '',
        dp: ''
    });

    function resetStates() {
        setUserInfo((prevState) => {
            return {
                ...prevState,
                name: '',
                userName: '',
                gender: '',
                dob: '',
                email: '',
                city: '',
                cnic: '',
                contactNo: '',
                address: '',
                instituteName: '',
                status: '',
                joiningDate: '',
                dp: ''
            }
        });
    }

    const getUserInfoFromLocalStorage = async () => {
        try {
            let info = await localStorage.getItem('recordsPassToNextScreen');
            let userInfo = await localStorage.getItem('userInfo');
            parsedInfo = JSON.parse(info);
            parsedUserInfo = JSON.parse(userInfo);
            setDisplayButtons(parsedInfo.displayButtons);
            setSelectedOption(parsedInfo.selectedOption);
        } catch (error) {
            console.log(error);
        }
    }

    //parsedInfo.userID
    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo) {
            setAuthorized(true);
            await fetch(`http://localhost:3000/findOne${parsedInfo.selectedOption}Record?id=${parsedInfo.userID}`,
                {
                    method: "GET",
                    headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
                })
                .then(result => result.json())
                .then(data => {
                    if (parsedInfo.selectedOption === 'Dispensaries' || parsedInfo.selectedOption === "Hospitals") {
                        setUserInfo((prevState) => {
                            return {
                                name: data.name,
                                email: data.email,
                                contactNo: data.contactNo,
                                city: data.city,
                                address: data.address,
                                status: data.status,
                                joiningDate: data.joiningDate
                            }
                        });
                    } else {
                        setUserInfo((prevState) => {
                            return {
                                name: data.name,
                                userName: data.userName,
                                gender: data.gender,
                                dob: data.dob,
                                email: data.email,
                                contactNo: data.contactNo,
                                cnic: data.cnic,
                                city: data.city,
                                address: data.address,
                                instituteName: parsedInfo.selectedOption === 'Doctors' ? data.hospital : data.dispensary,
                                status: data.status,
                                joiningDate: data.joiningDate,
                                dp: data.dp
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                })
            setIsLoading(false);
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, []);

    const handleDialogBoxYesButton = async () => {
        setOpen(false);
        await getUserInfoFromLocalStorage();
        let deleteRecord = `http://localhost:3000/DeleteOne${parsedInfo.selectedOption}Record?id=${parsedInfo.userID}`;
        await fetch(deleteRecord, {
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
        })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    setSnackBar((prevState) => {
                        return {
                            ...prevState,
                            snackBarMessage: data.error,
                            showSnackBar: true,
                            isError: true
                        }
                    });

                } else {
                    setDisableButton(true);
                    resetStates();
                    setSnackBar((prevState) => {
                        return {
                            ...prevState,
                            snackBarMessage: data.message,
                            showSnackBar: true,
                            isError: false
                        }
                    });
                }
            });
    }

    const handleDialogBoxNoButton = () => {
        setOpen(false);
    }

    const handleSnackBar = () => {
        setSnackBar(prevState => {
            return {
                ...prevState,
                showSnackBar: false,
                isError: false
            }
        });
    }


    const handleUpdateRecordButton = async () => {
        await getUserInfoFromLocalStorage();
        try {
            await localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ userID: parsedInfo.userID, selectedOption, displayButtons: true })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Update_Record/');
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
                                    marginTop: '5%',
                                    padding: 0,
                                }}>
                                <div
                                    className="col-12"
                                    style={{
                                        paddingLeft: '4%',
                                        paddingRight: '4%',
                                        paddingBottom: '1%'
                                    }}
                                >
                                    <Banner formName={userInfo.name} bannerHeight={150} />
                                </div>

                                <div
                                    style={{
                                        paddingInline: '5%',
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden'
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div>

                                <div
                                    className="col-12"
                                    style={{ paddingInline: '5%', marginTop: 15 }}
                                >
                                    {selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ?

                                        <Display_Institute_Record
                                            name={userInfo.name}
                                            email={userInfo.email}
                                            contactNo={userInfo.contactNo}
                                            city={userInfo.city}
                                            address={userInfo.address}
                                            status={userInfo.status}
                                            joiningDate={userInfo.joiningDate}
                                        />
                                        :
                                        <Display_Person_Record
                                            actor={selectedOption}
                                            name={userInfo.name}
                                            userName={userInfo.userName}
                                            gender={userInfo.gender}
                                            dob={userInfo.dob}
                                            email={userInfo.email}
                                            contactNo={userInfo.contactNo}
                                            cnic={userInfo.cnic}
                                            city={userInfo.city}
                                            address={userInfo.address}
                                            instituteName={userInfo.instituteName}
                                            status={userInfo.status}
                                            joiningDate={userInfo.joiningDate}
                                            dp={userInfo.dp}
                                        />
                                    }
                                </div>
                                {!displayButtons ?
                                    null
                                    :
                                    <div
                                        className="col-12"
                                        style={styles.buttonDivStyling}
                                    >
                                        <Button
                                            variant="outline-primary"
                                            style={styles.deleteButtonStyling}
                                            onClick={handleUpdateRecordButton}
                                            disabled={disableButton}
                                        >
                                            Update
                                </Button>

                                        <Button
                                            variant="outline-primary"
                                            style={styles.deleteButtonStyling}
                                            onClick={() => setOpen(true)}
                                            disabled={disableButton}
                                        >
                                            Delete
                                </Button>
                                    </div>
                                }

                                <DialogBox
                                    open={open}
                                    title="Are You Sure You Want To Delete This Record?"
                                    content="By Cliking on 'YES' this record will be permanently deleted."
                                    leftButtonName="No"
                                    rightButtonName="Yes"
                                    handleClose={() => handleDialogBoxNoButton()}
                                    handleDelete={() => handleDialogBoxYesButton()}
                                />
                            </div>
                        </div>
                    </div>
                :
                <p>You Must Be Logged In!!</p>
            }
        </>
    );
}

export default Display_Record_Details;

const styles = {
    rowStyling: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    buttonDivStyling: {
        // borderColor: 'blue',
        // borderWidth: 5,
        // borderStyle: 'dashed',
        paddingInline: '20%',
        marginBottom: '5%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    deleteButtonStyling: {
        width: '42%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
    dialogBoxbuttonStyling: {
        width: '22%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
}