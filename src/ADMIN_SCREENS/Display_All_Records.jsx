import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { InputLabel, NativeSelect, FormControl } from '@material-ui/core';

import Table from 'react-bootstrap/Table';

//ICONS
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';


//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';
import DialogBox from '../COMPONENTS/DialogBox';
import CustomSnackBar from '../COMPONENTS/SnackBar';

const Display_All_Records = (props) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasDeleted, setHasDeleted] = useState(false);
    const [recordToDelete, SetRecordToDelete] = useState('');
    const [selectedOption, setSelectedOption] = useState('Dispensaries');

    const [fetchedData, setFetchedData] = useState({
        dispensaries: [],
        hospitals: [],
        healthWorkers: [],
        doctors: [],
        researchers: [],
    })

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
        await getUserInfoFromLocalStorage()
        if (parsedUserInfo) {
            setAuthorized(true);
            let headers = { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            Promise.all([
                fetch(`http://localhost:3000/fetchAllDispensaries`, { headers })
                    .then(value => value.json()),
                fetch(`http://localhost:3000/fetchAllHospitals`, { headers })
                    .then(value => value.json()),
                fetch(`http://localhost:3000/fetchAllHealthWorkers`, { headers })
                    .then(value => value.json()),
                fetch(`http://localhost:3000/fetchAllDoctors`, { headers })
                    .then(value => value.json()),
                fetch(`http://localhost:3000/fetchAllResearchers`, { headers })
                    .then(value => value.json()),
            ])
                .then(data => {
                    console.log('value: ', data);
                    setData(data[0]);
                    setFetchedData({
                        dispensaries: data[0],
                        hospitals: data[1],
                        healthWorkers: data[2],
                        doctors: data[3],
                        researchers: data[4],
                    })
                })
                .catch((errro) => {
                    console.log(errro);
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
        switch (selectedOption) {
            case 'Dispensaries': setData(fetchedData.dispensaries); break;
            case 'Hospitals': setData(fetchedData.hospitals); break;
            case 'HealthWorkers': setData(fetchedData.healthWorkers); break;
            case 'Doctors': setData(fetchedData.doctors); break;
            case 'Researchers': setData(fetchedData.researchers); break;
        }
    }, [selectedOption])

    const handleWhichRecordsToDisplayChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleDeleteIconClick = (id) => {
        SetRecordToDelete(id);
        setHasDeleted(false);
        setOpen(true);
    }

    const handleNameClick = async (id) => {
        try {
            await localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ userID: id, selectedOption, displayButtons: true })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Display_Record_Details/');
    }

    const handleUpdateIconClick = async (id) => {
        try {
            await localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ userID: id, selectedOption, displayButtons: true })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Update_Record/');
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
                    <th style={styles.tableHeaderStyling}>Sr. No</th>
                    <th style={styles.tableHeaderStyling}>Name</th>
                    <th
                        style={styles.tableHeaderStyling}
                        hidden={selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ? true : false}
                    >
                        User Name
                    </th>
                    <th style={styles.tableHeaderStyling}>Contact No</th>
                    <th
                        style={styles.tableHeaderStyling}
                        hidden=
                        {
                            selectedOption === 'Dispensaries'
                                || selectedOption === 'Hospitals'
                                || selectedOption === 'Researchers' ? true : false
                        }
                    >
                        Institute
                    </th>
                    <th style={styles.tableHeaderStyling}>status</th>
                    <th style={styles.tableHeaderStyling}>joining date</th>
                    <th style={styles.tableHeaderStyling}></th>
                </tr>
            </thead>
        );
    }



    const renderTableData = () => {
        return data.map((item, index) => {
            return (
                <tr style={{ borderRightStyle: 'none' }} key={index}>
                    <td style={styles.tableRowStyling}>{index + 1}</td>
                    <td><a onClick={() => handleNameClick(item._id)} style={{ cursor: 'pointer', fontFamily: 'sans-serif' }}>{item.name}</a></td>
                    <td
                        style={styles.tableRowStyling}
                        hidden={selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ? true : false}
                    >
                        {item.userName}
                    </td>
                    <td style={styles.tableRowStyling}>{item.contactNo}</td>
                    <td
                        style={styles.tableRowStyling}
                        hidden=
                        {
                            selectedOption === 'Dispensaries'
                                || selectedOption === 'Hospitals'
                                || selectedOption === 'Researchers' ? true : false
                        }
                    >
                        {selectedOption === 'Doctors' ? item.hospital : item.dispensary}
                    </td>
                    <td style={styles.tableRowStyling}>{item.status}</td>
                    <td style={styles.tableRowStyling}>{item.joiningDate}</td>
                    <td style={styles.tableRowStyling}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <DeleteIcon
                                style={styles.tableIconStyling}
                                onClick={() => handleDeleteIconClick(item._id)}
                            />
                            <UpdateIcon
                                style={styles.tableIconStyling}
                                onClick={() => handleUpdateIconClick(item._id)}
                            />
                        </div>
                    </td>
                </tr>
            );
        })
    }

    const handleDialogBoxYesButton = async () => {
        setOpen(false);
        await getUserInfoFromLocalStorage();
        let deleteRecord = `http://localhost:3000/DeleteOne${selectedOption}Record?id=${recordToDelete}`;
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
                                    <Banner formName="Display records" bannerHeight={150} />
                                </div>

                                <div
                                    className="row"
                                    style={styles.rowStyling}
                                >
                                    <div
                                        className="col-md-12 col-sm-12"
                                        style={{
                                            paddingRight: '2%',
                                            marginBottom: '2%',
                                        }}
                                    >
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel
                                                style={{
                                                    fontSize: 20,
                                                    color: '#4169e1',
                                                    fontWeight: 'bold'
                                                }}
                                                htmlFor="outlined-age-native-simple">Select Which Record To Display</InputLabel>
                                            <NativeSelect
                                                variant="outlined"
                                                onChange={(e) => handleWhichRecordsToDisplayChange(e)}
                                                label="select"
                                                style={{ width: '100%' }}
                                                inputProps={{
                                                    name: 'select',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option value="Dispensaries">Dispensary</option>
                                                <option value="Doctors">Doctor</option>
                                                <option value="HealthWorkers">Health Worker</option>
                                                <option value="Hospitals">Hospital</option>
                                                <option value="Researchers">Researcher</option>
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
                                            <p style={styles.noRecordTextStyling}>
                                                No Records to display
                                    </p>
                                        }
                                        <DialogBox
                                            open={open}
                                            title="Are You Sure You Want To Delete This Record?"
                                            content="By Cliking on 'YES' this record will be deleted permanently"
                                            leftButtonName="No"
                                            rightButtonName="Yes"
                                            handleClose={() => handleDialogBoxNoButton()}
                                            handleDelete={() => handleDialogBoxYesButton()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                :
                <p>You Must Be Logged In!!</p>
            }
        </>
    );
}

export default withRouter(Display_All_Records);

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
    tableIconStyling: {
        color: '#4169e1',
        fontSize: 26,
        cursor: 'pointer'
    },
    noRecordTextStyling: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textTransform: 'capitalize'

    }
}
