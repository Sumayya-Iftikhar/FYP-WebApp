import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { TextField } from '@material-ui/core';



//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import DialogBox from '../COMPONENTS/DialogBox';
import Reply_Form from '../COMPONENTS/Reply_Form';
import CustomSnackBar from '../COMPONENTS/SnackBar';

const Report_Details_Screen = (props) => {

    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState();
    const [openForm, setOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDeleted, setHasDeleted] = useState(false);

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });


    const [report, setReport] = useState({
        subject: '',
        reporterName: '',
        reporterRole: '',
        reportMessage: '',
        reportDate: '',
    });

    let parsedInfo = '';
    let parsedUserInfo = '';

    const getUserInfoFromLocalStorage = async () => {
        try {
            let info = await localStorage.getItem('recordsPassToNextScreen');
            let userInfo = await localStorage.getItem('userInfo');
            parsedInfo = await JSON.parse(info);
            parsedUserInfo = await JSON.parse(userInfo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedInfo && parsedUserInfo) {
            setAuthorized(true);
            await fetch(`http://localhost:3000/findOneReport?id=${parsedInfo.reportID}&role=admin`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    if (data.error) {
                        setSnackBar(prevState => {
                            setHasDeleted(true);
                            return {
                                ...prevState,
                                snackBarMessage: data.error,
                                isError: true,
                                showSnackBar: true
                            }
                        });
                    } else {
                        setReport(prevState => {
                            return {
                                ...prevState,
                                subject: data.subject,
                                reporterName: data.reporterName,
                                reporterRole: data.reporterRole,
                                reportMessage: data.reportMessage,
                                reportDate: data.date,
                            }
                        })
                    }
                });
            setIsLoading(false);
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, []);

    const handleSnackBar = () => {
        setSnackBar(prevState => {
            return {
                ...prevState,
                snackBarMessage: '',
                showSnackBar: false,
                isError: false
            }
        });
    }

    const handleDialogBoxYesButton = async () => {
        await getUserInfoFromLocalStorage();
        setOpen(false);
        await fetch(`http://localhost:3000/deleteOneReport?id=${parsedInfo.reportID}&role=admin`, {
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
                    setHasDeleted(true);
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

    const handleFormCloseButton = (close, replySent) => {
        if (close) {
            setOpenForm(!close);
            if (replySent) {
                setSnackBar(prevState => {
                    return {
                        ...prevState,
                        snackBarMessage: 'Reply Sent Successfully!!',
                        showSnackBar: true,
                        isError: false
                    }
                });
            }
            else {
                setSnackBar(prevState => {
                    return {
                        ...prevState,
                        snackBarMessage: 'Reply Could not be sent!!',
                        showSnackBar: true,
                        isError: true
                    }
                });
            }
        }
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
                                    <Banner formName="Report Details" bannerHeight={150} />
                                </div>

                                <div
                                    className="row"
                                    style={styles.rowStyling}
                                >
                                    <div
                                        className="col-md-12 col-sm-12"
                                        style={{
                                            paddingRight: '2%',
                                            marginBottom: '5%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div
                                            style={{
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                marginBlock: 10,
                                                visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                            }}
                                        >
                                            <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                        </div>

                                        {hasDeleted ?
                                            null
                                            :
                                            <div style={{ paddingInline: '1.5%', marginBottom: 5 }}>
                                                <TextField
                                                    variant="standard"
                                                    label="Subject"
                                                    value={report.subject}
                                                    contentEditable={false}
                                                    style={{ width: '100%', marginBottom: 15 }}
                                                    InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                                />

                                                <TextField
                                                    variant="standard"
                                                    label="From"
                                                    value={report.reporterName}
                                                    contentEditable={false}
                                                    style={{ width: '100%', marginBottom: 15 }}
                                                    InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                                />

                                                <TextField
                                                    variant="standard"
                                                    label="Date"
                                                    value={report.reportDate}
                                                    contentEditable={false}
                                                    style={{ width: '100%', marginBottom: 15 }}
                                                    InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                                />
                                                <TextField
                                                    variant="standard"
                                                    label="Message"
                                                    multiline
                                                    value={report.reportMessage}
                                                    contentEditable={false}
                                                    rowsMax={Infinity}
                                                    style={{ width: '100%', marginBottom: 15 }}
                                                    InputLabelProps={{ style: { color: '#4169e1', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                                />
                                            </div>
                                        }

                                        {hasDeleted ?
                                            null
                                            :
                                            <div
                                                className="col-12"
                                                style={styles.buttonDivStyling}
                                            >
                                                <Button
                                                    variant="outline-primary"
                                                    style={styles.deleteButtonStyling}
                                                    disabled={hasDeleted}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    DELETE
                                        </Button>

                                                <Button
                                                    variant="outline-primary"
                                                    style={styles.deleteButtonStyling}
                                                    onClick={() => setOpenForm(true)}
                                                >
                                                    Reply
                                           </Button>
                                            </div>
                                        }
                                    </div>

                                    <DialogBox
                                        open={open}
                                        title="Are You Sure You Want To Delete This Report?"
                                        content="By Cliking on 'YES' this report will be deleted permanently"
                                        leftButtonName="No"
                                        rightButtonName="Yes"
                                        handleClose={() => handleDialogBoxNoButton()}
                                        handleDelete={() => handleDialogBoxYesButton()}
                                    />

                                    < Reply_Form
                                        open={openForm}
                                        type="report"
                                        to={report.reporterName}
                                        reporterRole={report.reporterRole}
                                        messageMaxLength={250}
                                        leftButtonName="Cancel"
                                        rightButtonName="Send"
                                        handleClose={handleFormCloseButton}
                                    />

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

export default Report_Details_Screen;

const styles = {
    rowStyling: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    tableHeaderStyling: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        textTransform: 'uppercase', fontWeight: 'bold',
        fontWeight: 'bold',
        backgroundColor: '#4169e1',
    },
    tableRowStyling: {
        textTransform: 'capitalize',
        fontSize: 17,
        fontFamily: 'sans-serif',
    },
    buttonDivStyling: {
        alignSelf: 'center',
        width: '70%',
        marginBlock: '2.5%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    deleteButtonStyling: {
        width: '50%',
        textTransform: 'uppercase', fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'sans-serif',
        marginLeft: '2%'
    },
    dialogBoxbuttonStyling: {
        width: '22%',
        textTransform: 'uppercase', fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
}
