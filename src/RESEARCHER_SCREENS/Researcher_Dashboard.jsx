import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

//COMPONENTS
import Navbar from "../Navbar";
import Card from "../COMPONENTS/CardButton";

//ICONS
import InboxIcon from '@material-ui/icons/Inbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';


const Researcher_Dashboard = (props) => {

    const [authorized, setAuthorized] = useState();

    useEffect(async () => {
        try {
            let getUserInfo = await localStorage.getItem('userInfo');
            let userRole = await JSON.parse(localStorage.getItem('userRole'));
            if (!getUserInfo || userRole !== 'researcher') {
                setAuthorized(false)
                setTimeout(() => {
                    props.history.push('/')
                }, 2000);
            }
            else {
                setAuthorized(true)
            }
        } catch (error) {
            console.log(error)
        }
    })

    const handleCardButton = (buttonName) => {
        props.history.push(buttonName);
    }
    return (
        <>
            {authorized ?
                <div className="container-fluid"
                    style={{
                        backgroundColor: "white",
                    }}
                >
                    <div className="row">
                        <div className="col-12">
                            <Navbar />
                        </div>
                        <div
                            className="row"
                            style={styles.dashBoardRowStyling}>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="Data Visualization"
                                    icon={<AssessmentIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Data_Visualization/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="New Complaint"
                                    icon={<AddCircleIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/New_Researcher_Complaint/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="All Complaints"
                                    icon={<InboxIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Researcher_All_Camplaints/')}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
        </>
    );
};
export default withRouter(Researcher_Dashboard);

const styles = {
    dashBoardRowStyling: {
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '12%',
        paddingRight: '12%',
        marginBottom: 20
        // borderColor: 'blue',
        // borderWidth: 5,
        // borderStyle: 'dashed'
    },
    buttonDivStyling: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconStyling: {
        width: '60%',
        height: '60%',
        color: '#4169e1',
    }
}