import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

//COMPONENTS

import CustomSnackBar from '../COMPONENTS/SnackBar';
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import DialogBox from '../COMPONENTS/DialogBox';

const Researcher_Complaint_Details = (props) => {

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState(true);

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    let userRole = '';
    let parsedInfo = '';
    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            let info = await localStorage.getItem('recordsPassToNextScreen');
            parsedInfo = JSON.parse(info);
            parsedInfo = parsedInfo.complaint
            userRole = await JSON.parse(localStorage.getItem('userRole'));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo && userRole === 'researcher') {
            setAuthorized(true)
            if (parsedInfo) {
                setData(parsedInfo)
            } else {
                setSnackBar({
                    snackBarMessage: 'Complaint Not Found !!',
                    isError: true,
                    showSnackBar: true
                });
                setTimeout(() => {
                    setSnackBar({
                        showSnackBar: false
                    })
                }, 3000)
            }

        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, [])

    const handleSnackBar = () => {
        setSnackBar({ showSnackBar: false });
    }

    const handleDialogBoxYesButton = async () => {
        await getUserInfoFromLocalStorage();
        setOpen(false);
        await fetch(`http://localhost:3000/deleteOneReport?id=${parsedInfo._id}&role=researcher`, {
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
        })
            .then(result => result.json())
            .then(async data => {
                if (data.error) {
                    setSnackBar((prevState) => {
                        return {
                            ...prevState,
                            snackBarMessage: data.error,
                            showSnackBar: true,
                            isError: true
                        }
                    });
                    setTimeout(() => { setSnackBar({ showSnackBar: false }) }, 2000)
                } else {
                    await localStorage.removeItem('recordsPassToNextScreen')
                    setData('');
                    setSnackBar((prevState) => {
                        return {
                            ...prevState,
                            snackBarMessage: data.message,
                            showSnackBar: true,
                            isError: false
                        }
                    });
                    setTimeout(() => { setSnackBar({ showSnackBar: false }) }, 2000)
                }
            });
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
                            {data ?
                                <div className="d-flex flex-column mx-5 " >
                                    <div style={styles.filedsDivStyling}>
                                        <TextField
                                            variant="standard"
                                            label="subject"
                                            style={{ width: '50%', marginBottom: '2%' }}
                                            InputLabelProps={{
                                                style: {
                                                    color: '#4169e1',
                                                    fontSize: 20,
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                            contentEditable={false}
                                            value={data.subject}
                                        />

                                        <TextField
                                            variant="standard"
                                            label="status"
                                            style={{ width: '50%', marginBottom: '2%' }}
                                            InputLabelProps={{
                                                style: {
                                                    color: '#4169e1',
                                                    fontSize: 20,
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                            contentEditable={false}
                                            value={data.reportStatus}
                                        />
                                        <TextField
                                            variant="standard"
                                            label="date"
                                            style={{ width: '50%', marginBottom: '2%' }}
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
                                        />

                                        <TextField
                                            variant="standard"
                                            label="complaint"
                                            multiline
                                            rows={8}
                                            rowsMax={Infinity}
                                            style={{ width: '50%', marginBottom: '2%' }}
                                            InputLabelProps={{
                                                style: {
                                                    color: '#4169e1',
                                                    fontSize: 20,
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                            contentEditable={false}
                                            value={data.reportMessage}
                                        />

                                        <Button
                                            variant="outline-primary"
                                            style={styles.buttonStyling}
                                            onClick={() => setOpen(true)}
                                        >
                                            Delete
                                            </Button>
                                    </div>

                                    <DialogBox
                                        open={open}
                                        title="Are You Sure You Want To Delete This Complaint?"
                                        content="By Cliking on 'YES' this Complaint will be deleted permanently."
                                        leftButtonName="No"
                                        rightButtonName="Yes"
                                        handleClose={() => setOpen(false)}
                                        handleDelete={handleDialogBoxYesButton}
                                    />
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    );
}

export default withRouter(Researcher_Complaint_Details);

let styles = {
    filedsDivStyling: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginBottom: '2.5%'
    },
    buttonsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'
    },
    buttonStyling: {
        width: '30%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    }
}