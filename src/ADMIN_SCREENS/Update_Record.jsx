import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import CustomSnackBar from '../COMPONENTS/SnackBar';
import Display_Person_Record from '../COMPONENTS/Display_Person_Record';
import Update_Person_Record from '../COMPONENTS/Update_Person_Record';
import Update_Institute_Record from '../COMPONENTS/Update_Institute_Record';


const Update_Record = (props) => {

    let parsedInfo = '';
    let parsedUserInfo = '';
    const [authorized, setAuthorized] = useState();
    const [isUpdated, setIsUpdated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [userID, setUserID] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

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
            setUserID(parsedInfo.userID);
            setSelectedOption(parsedInfo.selectedOption);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo) {
            setAuthorized(true);
            await fetch(`http://localhost:3000/findOne${parsedInfo.selectedOption}Record?id=${parsedInfo.userID}`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    console.log(data)
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
                    console.log(error)
                })
            setIsLoading(false);
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, [isUpdated]);

    const handleSnackBar = () => {
        setSnackBar(prevState => {
            return {
                ...prevState,
                showSnackBar: false,
                isError: false
            }
        });
    }

    const handleIsUpdated = (boolean) => {
        setIsUpdated(boolean);
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
                                    }}
                                >
                                    <Banner formName={userInfo.name} bannerHeight={150} />
                                </div>

                                <div
                                    style={{
                                        paddingInline: '5%',
                                        marginTop: 10,
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden'
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div>

                                <div
                                    className="col-12"
                                    style={{ paddingInline: '5%' }}
                                >
                                    {selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ?

                                        <Update_Institute_Record
                                            userID={userID}
                                            selectedOption={selectedOption}
                                            name={userInfo.name}
                                            email={userInfo.email}
                                            contactNo={userInfo.contactNo}
                                            city={userInfo.city}
                                            status={userInfo.status}
                                            address={userInfo.address}
                                            joiningDate={userInfo.joiningDate}
                                            handleIsUpdated={handleIsUpdated}
                                        />
                                        :
                                        <Update_Person_Record
                                            userID={userID}
                                            selectedOption={selectedOption}
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
                                            handleIsUpdated={handleIsUpdated}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <p>You Must Be Logged In!!</p>
            }
        </>
    );
}

export default Update_Record;

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