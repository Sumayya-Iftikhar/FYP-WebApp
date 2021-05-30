import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

//COMPONENTS
import Navbar from "../Navbar";
import Card from "../COMPONENTS/CardButton";

//ICONS
import InboxIcon from '@material-ui/icons/Inbox';
import DialpadIcon from '@material-ui/icons/Dialpad';
import PageviewIcon from '@material-ui/icons/Pageview';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Doctor_Dashboard = (props) => {

    const [authorized, setAuthorized] = useState();

    useEffect(async () => {
        try {
            let getUserInfo = await localStorage.getItem('userInfo');
            let userRole = await localStorage.getItem('userRole');
            console.log(userRole)
            console.log(getUserInfo)
            if (!getUserInfo && userRole !== 'doctor') {
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
    }, [])

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
                                    buttonName="Current cases"
                                    icon={<VisibilityIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Display_Current_Cases/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="All cases"
                                    icon={<PageviewIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Display_All_Cases/')}
                                />

                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="Communication"
                                    icon={<DialpadIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Communication/')}
                                />

                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="Complaint"
                                    icon={<AddCircleIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Doctor_New_Complaint/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="All Complaints"
                                    icon={<InboxIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/View_All_Camplaints/')}
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
export default withRouter(Doctor_Dashboard);

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