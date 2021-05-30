import React from 'react';

const Banner = (props) => {
    return (
        <>
            <div
                style={{
                    // width: props.bannerWidth,
                    height: props.bannerHeight,
                    backgroundColor: '#4169e1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15
                }}

            >
                <text style={styles.bannerTextStyling}>
                    {props.bannerTitle} {props.formName}
                </text>
            </div>
        </>
    );
};
export default Banner;

const styles = {
    bannerDivStyling: {
        width: '100%',
        height: 150,
        backgroundColor: '#4169e1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    bannerTextStyling: {
        color: "#ffffff",
        textTransform: 'capitalize',
        fontSize: 36,
        fontFamily: 'sans-serif'
    }
}