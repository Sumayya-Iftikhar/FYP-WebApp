import React, { useState,useEffect } from "react";
import { withRouter } from 'react-router-dom';

//COMPONENTS
import Navbar from "../Navbar";
import Card from "../COMPONENTS/CardButton";

//ICONS
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import PageviewIcon from '@material-ui/icons/Pageview';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';




const Admin_Dashboard = (props) => {

    const [authorized, setAuthorized] = useState();

    useEffect(async () => {
        try {
            let getUserInfo = await localStorage.getItem('userInfo');
            if (!getUserInfo) {
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
                                    buttonName="Add Person"
                                    icon={<PersonAddIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Add_Person/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="Add institute"
                                    icon={<AddIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Add_institute/')}
                                />

                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="view records"
                                    icon={<VisibilityIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/Display_All_Records/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="delete record"
                                    icon={<DeleteSweepIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/delete_record/')}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="view reports"
                                    icon={<PageviewIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/View_All_Reports/')}
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12"
                                style={styles.buttonDivStyling}
                            >
                                <Card
                                    buttonName="campaign requests"
                                    icon={<MailIcon style={styles.iconStyling} />}
                                    onClickButton={() => handleCardButton('/View_All_Campaign_Requests/')}
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
};
export default withRouter(Admin_Dashboard);

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