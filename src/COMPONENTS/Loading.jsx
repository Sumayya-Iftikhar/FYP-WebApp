import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CircleLoader from "react-spinners/CircleLoader";


const Loading = () => {
    const screenHeight = window.innerHeight;
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: screenHeight
        }}
        >
            {/* <Spinner animation="grow" style={styles.SpinnerStyling} />
            <Spinner animation="grow" style={styles.SpinnerStyling} />
            <Spinner animation="grow" style={styles.SpinnerStyling} />
            <Spinner animation="grow" style={styles.SpinnerStyling} /> */}
            <ClimbingBoxLoader size={40} color="#4169e1"/>
        </div>
    );
}



export default Loading;

const styles = {
    SpinnerStyling: {
        color: '#4169e1',
        marginRight: 20,
        marginLeft: 20,
    }
}