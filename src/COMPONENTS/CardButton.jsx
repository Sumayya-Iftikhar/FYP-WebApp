import React from 'react';
import { NavLink } from 'react-router-dom';

const CardButton = (props) => {
    return (
        <>
            <div style={styles.cardDivStyling}
            >
                <div style={styles.iconDivStyling}
                >
                    {props.icon}
                </div>

                <div style={styles.textDivStyling}>
                    <p
                        style={styles.textStyling}
                        onClick={props.onClickButton}
                    >
                        {props.buttonName}
                    </p>
                </div>
            </div>
        </>
    );
};
export default CardButton;

const styles = {
    cardDivStyling: {
        width: '90%',
        height: 320,
        marginBottom: 30,
    },
    iconDivStyling: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4169e1',
        borderStyle: 'solid',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textDivStyling: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4169e1',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    textStyling: {
        flexShrink: 1,
        fontSize: '110%',
        color: '#ffffff',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    }
}