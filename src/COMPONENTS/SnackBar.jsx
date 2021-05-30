import React, { useState } from 'react';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error';

const CustomSnackBar = (props) => {
    return (
        <>
            <div style={{
                justifySelf: 'center',
                width: '100%',
                backgroundColor: props.isError ? '#880808' : '#4BB543',
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}
            >
                {!props.isError ?
                    <ThumbUpIcon style={{ color: '#ffffff', marginRight: 20 }} />
                    :
                    <ErrorIcon style={{ color: '#ffffff', marginRight: 20 }} />
                }
                <text style={{ color: '#ffffff', fontSize: 20, textTransform: 'uppercase' }}>{props.message}</text>
                <CancelIcon
                    style={{ color: '#ffffff', position: 'absolute', marginLeft: '82%' }}
                    onClick={props.onClick}
                />
            </div>
        </>
    )
};

export default CustomSnackBar;