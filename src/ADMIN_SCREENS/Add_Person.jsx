import React, { useState, Fragment, Component } from 'react';


import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';


//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Person_RegistrationForm from "../COMPONENTS/Person_RegistrationForm";

class Add_Person extends Component {

    state = {
        authorized: '',
        selectedOption: 'healthWorker'
    };

    componentDidMount() {
        try {
            if (localStorage.getItem('userInfo')) {
                this.setState({ authorized: true })
            }
            else {
                this.setState({ authorized: false })
                setTimeout(() => {
                    this.props.history.push('/')
                }, 2000)

            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        return (
            <>
                {this.state.authorized ?
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
                                    style={{ paddingLeft: '4%', paddingRight: '4%' }}
                                >
                                    <Banner
                                        bannerTitle={this.state.selectedOption}
                                        formName="Registeration Form"
                                        bannerHeight={150}
                                    />
                                </div>

                                <div style={{
                                    padding: '6%'
                                }}>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel
                                            style={{
                                                fontSize: 20,
                                                color: '#4169e1',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                            }}
                                            htmlFor="outlined-age-native-simple">Select What To Register</InputLabel>
                                        <NativeSelect
                                            variant="outlined"
                                            onChange={(e) => this.setState({ selectedOption: e.target.value })}
                                            label="select"
                                            style={{
                                                width: '100%',
                                                marginBottom: 15
                                            }}
                                            inputProps={{
                                                name: 'select',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            {/* <option aria-label="None" value="" /> */}
                                            <option selected value="healthWorker">Health-Worker</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="researcher">Researcher</option>
                                        </NativeSelect>
                                    </FormControl>

                                    {this.state.selectedOption === 'healthWorker' ?
                                        <Person_RegistrationForm institute="Dispensary" actor="HealthWorker" />
                                        :
                                        this.state.selectedOption === 'doctor' ?
                                            <Person_RegistrationForm institute="Hospital" actor="Doctor" />
                                            :
                                            this.state.selectedOption === 'researcher' ?
                                                <Person_RegistrationForm actor="Researcher" />
                                                :
                                                null
                                    }
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
}
export default Add_Person;