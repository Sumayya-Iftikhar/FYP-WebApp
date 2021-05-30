import React, { Component } from 'react';


import { InputLabel, NativeSelect, FormControl } from '@material-ui/core';

//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import Institiute_RegistrationForm from '../COMPONENTS/Institiute_RegistrationForm';

class Add_Institute extends Component {
    state = {
        authorized: '',
        selectedOption: 'Dispensary',
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
            <>  {this.state.authorized ?
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
                                padding: '6%',
                            }}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel
                                        style={{
                                            fontSize: 20,
                                            color: '#4169e1',
                                            fontWeight: 'bold',

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
                                        <option selected value="Dispensary">Dispensary</option>
                                        <option value="Hospital">Hospital</option>

                                    </NativeSelect>
                                </FormControl>

                                {this.state.selectedOption === 'Hospital' ?
                                    <Institiute_RegistrationForm
                                        selectedOption={this.state.selectedOption}
                                        institute="Hospital"
                                        actor="doctor"
                                    />
                                    :
                                    this.state.selectedOption === 'Dispensary' ?
                                        <Institiute_RegistrationForm
                                            selectedOption={this.state.selectedOption}
                                            institute="Dispensary"
                                            actor="healthWorker"
                                        />
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
};
export default Add_Institute;