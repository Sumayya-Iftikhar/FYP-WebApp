import React, { useState, useEffect } from "react";

//BOOTSTRAP
import Button from 'react-bootstrap/Button';

//COMPONENTS
import Navbar from "../Navbar";
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import CustomSnackBar from '../COMPONENTS/SnackBar';
import Update_Profile_Form from '../COMPONENTS/Update_User_Profile';
import Display_Person_Record from '../COMPONENTS/Display_Person_Record';



const UserProfile = (props) => {

    const [userInfo, setUserInfo] = useState();
    const [userRole, setUserRole] = useState();
    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [infoUpdated, setInfoUpdated] = useState(false);
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    const handleDialogBoxClose = (status, serverResponse) => {
        if (status) {
            setInfoUpdated(infoUpdated ? false : true)
            setSnackBar({
                snackBarMessage: serverResponse,
                showSnackBar: true,
                isError: false
            })
            setDialogBoxOpen(false)
            window.scrollTo(0, 200)
            setTimeout(() => {
                setSnackBar({ showSnackBar: false });
            }, 4000)

        }
        else {
            setSnackBar({
                snackBarMessage: serverResponse,
                showSnackBar: true,
                isError: true
            })
            setDialogBoxOpen(false)
            window.scrollTo(0, 200)
            setTimeout(() => {
                setSnackBar({ showSnackBar: false });
            }, 4000)
        }

    }

    let parsedUserRole = '';
    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            let userRole = await localStorage.getItem('userRole');
            parsedUserRole = JSON.parse(userRole);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo) {
            setUserRole(parsedUserRole);
            setUserInfo(parsedUserInfo);
            setAuthorized(true);
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, [infoUpdated]);

    const handleSnackBar = () => {
        setSnackBar(false)
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
                                <div className="col-12"
                                    style={{
                                        paddingLeft: '4%',
                                        paddingRight: '4%',
                                        marginBottom: 10
                                    }}
                                >
                                    <Banner
                                        formName="User Profile"
                                        bannerHeight={150}
                                    />
                                </div>

                                <div
                                    style={{
                                        paddingInline: '5%',
                                        marginTop: 10,
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div>


                            </div>

                            <div className="col-12">
                                <div
                                    style={{
                                        paddingLeft: '9%',
                                        paddingRight: '9%',
                                        marginBottom: 20
                                    }}
                                >
                                    <Display_Person_Record
                                        actor={userRole === 'researcher' ? 'Researchers' : userRole}
                                        name={userInfo.name}
                                        userName={userInfo.userName}
                                        gender={userInfo.gender}
                                        dob={userInfo.dob}
                                        email={userInfo.email}
                                        contactNo={userInfo.contactNo}
                                        cnic={userInfo.cnic}
                                        city={userInfo.city}
                                        address={userInfo.address}
                                        instituteName={userInfo.hospital}
                                        status={userInfo.status}
                                        joiningDate={userInfo.joiningDate}
                                        dp={userInfo.dp}
                                    />
                                </div>
                            </div>

                            <div
                                className="col-12"
                                style={{ marginBottom: '5%', display: 'flex', justifyContent: 'center' }}
                            >
                                <Button
                                    variant="outline-primary"
                                    style={styles.deleteButtonStyling}
                                    onClick={() => setDialogBoxOpen(true)}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                        <Update_Profile_Form
                            userRole={userRole}
                            authToken={userInfo.authToken}
                            id={userInfo._id}
                            contactNo={userInfo.contactNo}
                            email={userInfo.email}
                            password={userInfo.password}
                            open={dialogBoxOpen}
                            handleClose={handleDialogBoxClose}
                        />
                    </div>
                :
                <p>You Must Be Logged In!!</p>
            }
        </>
    )
};

export default UserProfile;

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
    },
}