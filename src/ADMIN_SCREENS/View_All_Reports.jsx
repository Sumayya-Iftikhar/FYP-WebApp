import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';

import Table from 'react-bootstrap/Table';

//ICONS
import DeleteIcon from '@material-ui/icons/Delete';


//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import DialogBox from '../COMPONENTS/DialogBox';
import CustomSnackBar from '../COMPONENTS/SnackBar';

const View_All_Reports = (props) => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasDeleted, setHasDeleted] = useState(false);
    const [specificData, setSpecificData] = useState([]);
    const [recordToDelete, SetRecordToDelete] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });

    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo) {
            setAuthorized(true);
            await fetch(`http://localhost:3000/fetchAllReports`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    console.log(data)
                    setData(data);
                    setSpecificData(data);
                });
            setIsLoading(false);
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, [hasDeleted]);

    useEffect(() => {
        if (selectedOption === 'all') {
            setSpecificData(data);
        } else {
            setSpecificData(data.filter(item => {
                return item.reportStatus === selectedOption
            }))
        }
    }, [selectedOption]);

    const handleDeleteIconClick = (reportID) => {
        SetRecordToDelete(reportID);
        setHasDeleted(false);
        setOpen(true);
    }

    const handleNameClick = (id, role) => {
        let path = '';
        if (role === 'doctor') {
            path = 'doctors';
        } else if (role === 'healthWorker') {
            path = 'healthWorkers'
        } else {
            path = 'researchers';
        }
        try {
            //Here Display Button is storing because on person details screen
            //We don't want to set the option to delete the person record
            localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ userID: id, selectedOption: path, displayButtons: false })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Display_Record_Details/');
    }

    const handleReportSubjectClick = async (reportID, reporterID) => {
        try {
            await localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ reportID, reporterID })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Report_Details_Screen/');
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


    const renderTableHeader = () => {
        return (
            <thead >
                <tr style={{ borderStyle: 'none' }}>
                    <th style={styles.tableHeaderStyling}>sr. no</th>
                    <th style={styles.tableHeaderStyling}>Subject</th>
                    <th style={styles.tableHeaderStyling}>Reported by</th>
                    <th style={styles.tableHeaderStyling}>Reporter Role</th>
                    <th style={styles.tableHeaderStyling}>Status</th>
                    <th style={styles.tableHeaderStyling}>Date</th>
                    <th style={styles.tableHeaderStyling}></th>
                </tr>
            </thead >
        );
    }



    const renderTableData = () => {
        return specificData.map((item, index) => {
            return (
                <tr style={{ borderRightStyle: 'none' }}>
                    <td>{index + 1}</td>
                    <td><a onClick={() => handleReportSubjectClick(item._id, item.reporterID)} style={{ cursor: 'pointer', fontFamily: 'sans-serif' }}>{item.subject}</a></td>
                    <td><a onClick={() => handleNameClick(item.reporterID, item.reporterRole)} style={{ cursor: 'pointer', fontFamily: 'sans-serif' }}>{item.reporterName}</a></td>
                    <td style={styles.tableRowStyling}>{item.reporterRole}</td>
                    <td style={styles.tableRowStyling}>{item.reportStatus}</td>
                    <td style={styles.tableRowStyling}>{item.date}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                        <DeleteIcon
                            style={{ color: '#4169e1', fontSize: 26, cursor: 'pointer' }}
                            onClick={() => handleDeleteIconClick(item._id)}
                        />
                    </td>
                </tr>
            );
        })
    }

    const handleDialogBoxYesButton = async () => {
        await getUserInfoFromLocalStorage();
        setOpen(false);
        await fetch(`http://localhost:3000/deleteOneReport?id=${recordToDelete}&role=admin`, {
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
                                    className="col-12 mb-lg-3"
                                    style={{
                                        paddingLeft: '4%',
                                        paddingRight: '4%',
                                        paddingBottom: '4%'
                                    }}
                                >
                                    <Banner formName="Reports" bannerHeight={150} />
                                </div>

                                <div
                                    className="row"
                                    style={styles.rowStyling}
                                >
                                    <div
                                        className="col-md-12 col-sm-12"
                                        style={{
                                            paddingRight: '2%',
                                            marginBottom: '1%',
                                        }}
                                    >
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    fontWeight: 'bold',
                                                    marginBottom: 0
                                                }}
                                                htmlFor="outlined-age-native-simple">Select Which Records To Display</InputLabel>
                                            <NativeSelect
                                                variant="outlined"
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                label="select"
                                                style={{ width: '100%' }}
                                                inputProps={{
                                                    name: 'select',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option selected value="all">All</option>
                                                <option value="pending">Pending</option>
                                                <option value="resolved">Resolved</option>
                                            </NativeSelect>
                                        </FormControl>

                                        <div
                                            style={{
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                marginTop: 20,
                                                visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                            }}
                                        >
                                            <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                        </div>
                                    </div>


                                    <div style={{ marginBottom: 20 }}>
                                        {data.length !== 0 ?
                                            <Table bordered style={{ borderStyle: 'none' }}>
                                                {renderTableHeader()}
                                                <tbody style={{ fontSize: 16 }}>
                                                    {renderTableData()}
                                                </tbody>

                                            </Table>
                                            :
                                            <p
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    fontFamily: 'sans-serif',
                                                    textTransform: 'capitalize'
                                                }}
                                            >No Records to display</p>
                                        }

                                        <DialogBox
                                            open={open}
                                            title="Are You Sure You Want To Delete This Report?"
                                            content="By Cliking on 'YES' this report will be deleted permanently"
                                            leftButtonName="No"
                                            rightButtonName="Yes"
                                            handleClose={() => handleDialogBoxNoButton()}
                                            handleDelete={() => handleDialogBoxYesButton()}
                                        />
                                    </div>
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

export default withRouter(View_All_Reports);

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
        textTransform: 'uppercase',
        fontWeight: 'bold',
        backgroundColor: '#4169e1',
    },
    tableRowStyling: {
        textTransform: 'capitalize',
        fontSize: 17,
        fontFamily: 'sans-serif',
    },
}
