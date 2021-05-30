import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

const Forgot_Password_Screen = (props) => {

    const [userName, setUserName] = useState();
    const [userNameError, setUserNameError] = useState(false);
    const [actor, setActor] = useState(props.location.actor);

    const [message, setMessage] = useState({
        message: 'adasdsad',
        showMessage: false,
        isError: false,
        disableButton: false,
    });

    useEffect(async () => {
        try {
            if (await localStorage.getItem('userRole')) {
                setActor(await JSON.parse(localStorage.getItem('userRole')));
            } else {
                props.history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    })

    const handleSubmit = async (e) => {
        let userRole = await JSON.parse(localStorage.getItem('userRole'));
        e.preventDefault()
        fetch('http://localhost:3000/resetPassword', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                actor: userRole,
                userName: userName
            })
        })
            .then(result => result.json())
            .then(res => {
                if (res.message) {
                    setMessage((prevState) => {
                        return {
                            message: res.message,
                            showMessage: true,
                            isError: false,
                            disableButton: true
                        }
                    });
                } else if (res.error) {
                    setMessage((prevState) => {
                        return {
                            message: res.error,
                            showMessage: true,
                            isError: true,
                            disableButton: false
                        }
                    });
                }
            })
    }

    const handleResetPasswordButton = () => {
        if (!userName) {
            setUserNameError(true);
        } else {
            setUserNameError(false);
        }
    }

    return (
        <>
            {/* {alert(actor)} */}
            <div id="main_header"
                className="container-fluid">
                <div
                    id="header"
                    className="col-md-10"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                >
                    <h2 style={styles.headingStyling}>Enter Your User Name to reset password</h2>

                    <p
                        style={{
                            visibility: message.showMessage ? 'visible' : 'hidden',
                            fontWeight: 'bold',
                            color: message.isError ? '#B72C1C' : '#4BB543',
                            textTransform: 'capitalize',
                            fontFamily: 'sans-serif',
                            fontSize: 20
                        }}
                    >
                        {message.message}
                    </p>

                    <form method="POST" onSubmit={handleSubmit}

                        style={
                            {
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }
                        }>
                        <TextField
                            variant="outlined"
                            label='userName'
                            style={{ width: '40%' }}
                            InputLabelProps={{ style: styles.textFieldStyling }}
                            required
                            value={userName}
                            name="userName"
                            onChange={(e) => setUserName(e.target.value)}
                            error={userNameError}
                        />

                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={() => handleResetPasswordButton()}
                            style={styles.buttonStyling}
                            disabled={message.disableButton}
                        >
                            Reset Password
                         </Button>
                    </form>

                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Forgot_Password_Screen);


const styles = {
    headingStyling: {
        fontWeight: 'bold',
        color: '#4169e1',
        textTransform: 'capitalize',
        fontFamily: 'sans-serif'
    },
    buttonStyling: {
        width: '25%',
        marginTop: '2%',
        textTransform: 'capitalize',
        fontFamily: 'sans-serif',
        fontSize: 22,
    },
    textFieldStyling: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        paddingInline: 5
    }
}