import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';

import Table from 'react-bootstrap/Table';

//ICONS
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import VisibilityIcon from '@material-ui/icons/Visibility';


//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Loading from '../COMPONENTS/Loading';

const Display_All_Cases = (props) => {

    const [data, setData] = useState([]);
    const [authorized, setAuthorized] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [specificData, setSpecificData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('all');

    const [snackBar, setSnackBar] = useState({
        snackBarMessage: '',
        showSnackBar: false,
        isError: false
    });


    let parsedUserInfo = '';
    let userRole = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            userRole = await JSON.parse(localStorage.getItem('userRole'));
            parsedUserInfo = JSON.parse(userInfo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo && userRole === 'doctor') {
            setAuthorized(true)
            await fetch(`http://localhost:3000/fetchSpecificHospitalPatients?recommendedHospital=${parsedUserInfo.hospital}`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    console.log(data);
                    setSpecificData(data);
                    setData(data);
                    setIsLoading(false);
                });
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, []);

    useEffect(() => {
        if (selectedOption === 'all') {
            setSpecificData(data);
        } else {
            setSpecificData(data.filter(item => {
                return item.dengueStatus === selectedOption
            }))
        }
    }, [selectedOption]);

    const handleNameClick = async (patientID) => {
        try {
            await localStorage.setItem('recordsPassToNextScreen',
                JSON.stringify({ patientID })
            );
        } catch (error) {
            console.log(error);
        }
        props.history.push('/Patient_Details/');
    }


    const renderTableHeader = () => {
        return (
            <thead >
                <tr style={{ borderStyle: 'none' }}>
                    <th style={styles.tableHeaderStyling}>Sr. No</th>
                    <th style={styles.tableHeaderStyling}>Patient Name</th>
                    <th style={styles.tableHeaderStyling}>Case ID</th>
                    <th style={styles.tableHeaderStyling}>Age</th>
                    <th style={styles.tableHeaderStyling}>Gender</th>
                    <th style={styles.tableHeaderStyling}>Dengue Status</th>
                    <th style={styles.tableHeaderStyling}>Date</th>
                </tr>
            </thead>
        );
    }



    const renderTableData = () => {
        return specificData.map((item, index) => {
            return (
                <tr style={{ borderRightStyle: 'none' }}>
                    <td style={styles.tableRowStyling}>{index + 1}</td>
                    <td><a onClick={() => handleNameClick(item._id)} style={{ cursor: 'pointer', fontFamily: 'sans-serif' }}>{item.name}</a></td>
                    <td style={styles.tableRowStyling}>{item.caseID}</td>
                    <td style={styles.tableRowStyling}>{item.age}</td>
                    <td style={styles.tableRowStyling}>{item.gender}</td>
                    <td style={styles.tableRowStyling}>{item.dengueStatus}</td>
                    <td style={styles.tableRowStyling}>{item.date}</td>
                </tr>
            );
        })
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
                                        paddingBottom: '2%'
                                    }}
                                >
                                    <Banner formName="All Cases" bannerHeight={150} />
                                </div>

                                <div
                                    className="row"
                                    style={styles.rowStyling}
                                >

                                    <FormControl style={{ width: '97%' }}>
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
                                            style={{ width: '100%', marginBottom: 25 }}
                                            inputProps={{
                                                name: 'select',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option selected value="all">All</option>
                                            <option value="negative">Negative</option>
                                            <option value="positive">Positive</option>
                                            <option value="suspected">Suspected</option>
                                        </NativeSelect>
                                    </FormControl>

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
                                                No Case to display
                                    </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    );
}

export default withRouter(Display_All_Cases);

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
