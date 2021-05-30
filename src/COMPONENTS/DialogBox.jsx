import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from 'react-bootstrap/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: 18, color: '#000000' }} >{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant="outline-primary"
                        style={styles.dialogBoxbuttonStyling}
                        onClick={props.handleClose}
                    >
                        {props.leftButtonName}
                    </Button>
                    <Button variant="outline-primary"
                        style={styles.dialogBoxbuttonStyling}
                        onClick={props.handleDelete}>
                        {props.rightButtonName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const styles = {
    dialogBoxbuttonStyling: {
        width: '30%',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
}
