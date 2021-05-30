import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';
import moment from 'moment';
import { Doughnut, Pie } from 'react-chartjs-2';

//COMPONENTS
import CustomSnackBar from '../COMPONENTS/SnackBar';
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';

const Data_Visualization = (props) => {

    let date = moment().format('DD-MM-YYYY');
    const [authorized, setAuthorized] = useState();

    let userRole = '';
    let parsedUserInfo = '';
    const getUserInfoFromLocalStorage = async () => {
        try {
            let userInfo = await localStorage.getItem('userInfo');
            parsedUserInfo = JSON.parse(userInfo);
            userRole = await JSON.parse(localStorage.getItem('userRole'));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getUserInfoFromLocalStorage();
        if (parsedUserInfo && userRole === 'researcher') {
            setAuthorized(true)
        } else {
            setAuthorized(false);
            setTimeout(() => {
                props.history.push('/');
            }, 2000)
        }
    })
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
                                <Banner formName="Data Visualization" bannerHeight={150} />

                                {/* <div
                                    style={{
                                        visibility: snackBar.showSnackBar ? 'visible' : 'hidden',
                                        margin: 15,
                                    }}
                                >
                                    <CustomSnackBar onClick={handleSnackBar} message={snackBar.snackBarMessage} isError={snackBar.isError} />
                                </div> */}
                            </div>
                        </div>

                        <div
                            style={{
                                paddingLeft: '4%',
                                paddingRight: '4%',
                            }}
                        >
                            <Doughnut
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false
                                }}
                                data={{
                                    labels: ['Multan', 'Attock', 'Bahawalpur', 'Lahore', 'Faisalabad', 'Rahim Yar Khan', 'Qasoor'],
                                    datasets: [{
                                        // label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3, 9],
                                        backgroundColor: [
                                            'rgba(255, 99, 132)',
                                            'rgba(54, 162, 235)',
                                            'rgba(255, 206, 86)',
                                            'rgba(75, 192, 192)',
                                            'rgba(153, 102, 255)',
                                            'rgba(255, 159, 64)',
                                            'rgba(255, 159, 92)'
                                        ],
                                        borderColor: [
                                            '#ffffff',
                                            '#ffffff',
                                            '#ffffff',
                                            '#ffffff',
                                            '#ffffff',
                                            '#ffffff',
                                            '#ffffff'
                                        ],
                                        borderWidth: 4,
                                        hoverOffset: 2
                                    },
                                    ]
                                }}
                            />
                        </div>
                    </div>
                </div>
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    );
}

export default withRouter(Data_Visualization);

let styles = {
    filedsDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsDivStyling: {
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