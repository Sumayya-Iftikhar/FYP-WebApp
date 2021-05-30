import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from 'react-bootstrap/Button';


const Login = (props) => {

    const [actor, setActor] = useState('');


    const [data, setData] = useState({
        userName: "",
        password: "",
        userNameError: false,
        passwordError: false
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


    const InputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
        console.log(value);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: data.userName,
                password: data.password,
                actor: actor
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.error) {
                    alert('Invalid User Name or Password!!');
                } else {
                    storeUserInfoToLocalStorage(data)
                    if (actor === 'admin') {
                        props.history.push('/Admin_Dashboard')
                    } else if (actor === 'doctor') {
                        props.history.push('/Doctor_Dashboard')
                    } else if (actor === 'researcher') {
                        props.history.push('/Researcher_Dashboard')
                    }
                }
            }).catch(error => {
                console.log('catch error: ', error)
            })

    };

    const storeUserInfoToLocalStorage = async userInfo => {
        try {
            userInfo.data.authToken = userInfo.token;
            await localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoginbutton = () => {
        if (!data.userName) {
            setData((prevState) => { return { ...prevState, userNameError: true } });
        } else {
            setData((prevState) => { return { ...prevState, userNameError: false } });
        }

        if (!data.password) {
            setData((prevState) => { return { ...prevState, passwordError: true } });
        } else {
            setData((prevState) => { return { ...prevState, passwordError: false } });
        }

    };

    const handleForgotPassword = async () => {
        props.history.push('/Forgot_Password_Screen/');
    }

    return (
        <>
            {/* {alert(actor)} */}
            <div className="parent ">
                <div className="child order-2 order-lg-1 text-center">
                    <h1 style={{ marginTop: "25%" }}>FrameWork For Dengue Surveillence and Data Collection In Pakistan</h1>
                </div>
                <div className="child order-1 order-lg-2">
                    <form method="POST" onSubmit={formSubmit} style={{ height: '100%', paddingInline: '5%' }}>
                        <div style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }
                        }
                        >
                            <TextField
                                label='user name'
                                style={{ width: '80%', marginBottom: 10 }}
                                InputLabelProps={{ style: { fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                required={true}
                                value={data.userName}
                                name="userName"
                                onChange={InputEvent}
                                error={data.userNameError}
                                onBlur={() => handleLoginbutton()}
                            />

                            <TextField
                                variant="standard"
                                label="password"
                                style={{ width: '80%', marginBottom: 20 }}
                                InputLabelProps={{ style: { fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' } }}
                                required={true}
                                value={data.password}
                                name="password"
                                type="password"
                                onChange={InputEvent}
                                error={data.passwordError}
                                onBlur={() => handleLoginbutton()}
                            />

                            <label style={
                                {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    color: '#4169e1',
                                    fontFamily: 'sans-serif'
                                }
                            }
                                onClick={() => handleForgotPassword()}
                            >
                                Forgot Password?
                            </label>
                            <Button
                                variant="outline-primary"
                                type="submit"
                                onClick={() => handleLoginbutton()}
                                style={{
                                    width: '50%',
                                    marginTop: 10,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'sans-serif'
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;