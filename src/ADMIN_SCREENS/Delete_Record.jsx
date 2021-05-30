import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';



//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import CustomSnackBar from '../COMPONENTS/SnackBar';
import Display_Person_Record from '../COMPONENTS/Display_Person_Record';
import Display_Institute_Record from '../COMPONENTS/Display_Institute_Record';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Delete_Member = (props) => {



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [authorized, setAuthorized] = useState();
    const [displayRecord, setDisplayRecord] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Dispensaries');

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

    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
        } catch (error) {
            console.log(error);
        }
    }
    let fetchUrl = `http://localhost:3000/fetchAll${selectedOption}`;

    useEffect(async () => {
        await getUserInfoFromLocalStorage()
        if (parsedUserInfo) {
            setAuthorized(true);
            fetch(`http://localhost:3000/fetchAll${selectedOption}`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    setData(data);
                }).catch(error => {
                    console.log(error);
                })
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    }, [selectedOption]);

    useEffect(async () => {
        if (value) {
            await getUserInfoFromLocalStorage();
            fetch(`http://localhost:3000/findOne${selectedOption}Record?id=${value}`, {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + parsedUserInfo.authToken }
            })
                .then(result => result.json())
                .then(data => {
                    console.log(data)
                    setDisplayRecord(true);
                    if (selectedOption === 'Dispensaries' || selectedOption === "Hospitals") {
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
                                instituteName: selectedOption === 'Doctors' ? data.hospital : data.dispensary,
                                status: data.status,
                                joiningDate: data.joiningDate,
                                dp: data.dp
                            }
                        });
                    }


                });
        }
        else {
            console.log('not value ')
        }
    }, [value]);

    const handleWhatToDeleteChange = (e) => {
        setSelectedOption(e.target.value);
        setDisplayRecord(false);
        setSnackBar((prevState) => { return { ...prevState, showSnackBar: false, } });
        resetStates();
    }

    const handleSearchBar = (v) => {
        if (v) {
            setValue(v._id);
            setSnackBar((prevState) => { return { ...prevState, showSnackBar: false, } });
            // setSearchBarClear(false);
        }
        else if (v === '') {
            setValue('')
        }

    }

    const handleDeleteButton = async () => {
        await getUserInfoFromLocalStorage();
        setOpen(false);
        fetch(`http://localhost:3000/DeleteOne${selectedOption}Record?id=${value}`, {
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
                    setDisplayRecord(false);
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

    const handleSnackBar = () => {
        setSnackBar(prevState => {
            return {
                ...prevState,
                showSnackBar: false,
                isError: false
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
                                    paddingBottom: '4%'
                                }}
                            >
                                <Banner formName="Record deletion Form" bannerHeight={150} />
                            </div>

                            <div
                                className="row"
                                style={styles.rowStyling}
                            >

                                <FormControl
                                    className="col-md-6 col-sm-12"
                                    style={{
                                        paddingRight: '2%',
                                        marginBottom: '1%',
                                    }}
                                >
                                    <InputLabel
                                        style={{
                                            fontSize: 20,
                                            color: '#4169e1',
                                            fontWeight: 'bold'
                                        }}
                                        htmlFor="outlined-age-native-simple">Select What To Delete</InputLabel>
                                    <NativeSelect
                                        variant="outlined"
                                        onChange={(e) => handleWhatToDeleteChange(e)}
                                        label="select"
                                        style={{ width: '100%' }}
                                        inputProps={{
                                            name: 'select',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        {/* <option aria-label="None" value="" /> */}
                                        <option selected value="Dispensaries">Dispensary</option>
                                        <option value="Doctors">Doctor</option>
                                        <option value="HealthWorkers">Health Worker</option>
                                        <option value="Hospitals">Hospital</option>
                                        <option value="Researchers">Researcher</option>
                                    </NativeSelect>
                                </FormControl>


                                <div
                                    className="col-md-6 col-sm-12"
                                    style={{
                                        paddingLeft: '2%',
                                        marginBottom: '1%',
                                    }}>
                                    <Autocomplete
                                        id="country-select-demo"
                                        options={data}
                                        autoHighlight
                                        fullWidth={true}
                                        style={{ width: '100%' }}
                                        // getOptionLabel={(option) => option._id}
                                        getOptionLabel={(option) => selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ? option.name : option.userName}
                                        onChange={(event, value) => handleSearchBar(value)}
                                        renderOption={(option) => (
                                            <React.Fragment>
                                                {selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ? option.name : option.userName}
                                            </React.Fragment>
                                        )}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ? 'Name' : 'user-Name'}
                                                variant="standard"
                                                InputLabelProps={{
                                                    style:
                                                    {
                                                        fontSize: 20,
                                                        color: '#4169e1',
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold'
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                <div
                                    style={{
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        marginTop: 10,
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div>
                            </div>



                            {displayRecord ?
                                <div
                                    className="row"
                                    style={styles.rowStyling}
                                >
                                    <div
                                        className="col-12"
                                        style={{ marginBottom: '2%' }}
                                    >
                                        <Banner bannerTitle={userInfo.name} />
                                    </div>

                                    <div
                                        className="col-12"
                                        style={{ marginBottom: '1%' }}
                                    >
                                        {selectedOption === 'Dispensaries' || selectedOption === 'Hospitals' ?

                                            <Display_Institute_Record
                                                name={userInfo.name}
                                                email={userInfo.email}
                                                contactNo={userInfo.contactNo}
                                                city={userInfo.city}
                                                status={userInfo.status}
                                                address={userInfo.address}
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

                                    <div
                                        className="col-12"
                                        style={{ marginBottom: '5%', display: 'flex', justifyContent: 'center' }}
                                    >
                                        <Button
                                            variant="outline-primary"
                                            style={styles.deleteButtonStyling}
                                            onClick={() => setOpen(true)}
                                        >
                                            DELETE
                                </Button>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                :
                <p>You Must Be Logged In!!</p>
            }
            {authorized ?
                <div>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                    >
                        <DialogTitle>{'Are You Sure You Want To Delete This Record?'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{ fontSize: 18, color: '#000000' }}>
                                By clicking on 'Yes' this record will be permanently deleted.
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="outline-primary"
                                style={styles.dialogBoxbuttonStyling}
                                onClick={() => handleClose()}
                            >
                                No
                        </Button>
                            <Button variant="outline-primary"
                                style={styles.dialogBoxbuttonStyling}
                                onClick={() => handleDeleteButton()}>
                                Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                :
                null
            }
        </>
    );
}
export default Delete_Member;

const styles = {
    rowStyling: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    deleteButtonStyling: {
        width: '35%',
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