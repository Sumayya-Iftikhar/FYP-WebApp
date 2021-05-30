import React, { useEffect, useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import Button from 'react-bootstrap/Button';
import { TextField, InputLabel, NativeSelect, FormControl } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reply_Form(props) {

    let parsedInfo = '';
    let parsedUserInfo = '';
    const [reportReply, setReportReply] = useState({
        subject: '',
        reportMessage: '',
        reportStatus: 'resolved'
    });

    useEffect(async () => {
        try {
            let info = await localStorage.getItem('recordsPassToNextScreen');
            let userInfo = await localStorage.getItem('userInfo');
            parsedInfo = JSON.parse(info);
            parsedUserInfo = JSON.parse(userInfo);
        } catch (error) {
            console.log('catch error: ', error);
        }
    });

    let replyUrl = '';
    if (props.type === 'report') {
        replyUrl = 'http://localhost:3000/reportReply';
    } else {
        replyUrl = 'http://localhost:3000/requestReply';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(replyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + parsedUserInfo.authToken
            },
            body: JSON.stringify({
                reportID: parsedInfo.reportID,
                reporterID: parsedInfo.reporterID,
                reporterRole: props.type === 'report' ? props.reporterRole : null,
                subject: reportReply.subject,
                reportStatus: reportReply.reportStatus,
                message: reportReply.reportMessage,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    props.handleClose(true, false);
                }
                else {
                    props.handleClose(true, true);
                }
            });

    }

    const handleChange = (event) => {
        const name = event.target.name;
        setReportReply({
            ...reportReply,
            [name]: event.target.value,
        });
    };
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.handleClose(true)}
        >
            <DialogTitle>REPORT REPLY</DialogTitle>
            <DialogContent>
                <form method="POST" onSubmit={handleSubmit}
                    style={{ padding: 20 }}
                >
                    <TextField
                        required
                        variant="standard"
                        label="Subject"
                        value={reportReply.subject}
                        style={{ width: '100%', marginBottom: 15 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                        name="subject"
                        inputProps={{ maxLength: 100 }}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        variant="standard"
                        label="To"
                        value={props.to}
                        contentEditable={false}
                        style={{ width: '100%', marginBottom: 15 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                    />

                    <FormControl style={{ width: '100%' }}>
                        <InputLabel
                            required
                            style={{
                                fontSize: 20,
                                color: '#4169e1',
                                textTransform: 'uppercase',
                                marginBottom: 0,
                                fontWeight: 'bold',
                            }}
                            htmlFor="reportStatus-dropdown">
                            {props.type === 'report' ? "Report Status" : "Request Status"}
                        </InputLabel>
                        <NativeSelect
                            // variant="standard"
                            // label={props.type === 'report' ? "Report Status" : "Request Status"}
                            value={reportReply.reportStatus}
                            onChange={e => setReportReply({ ...reportReply, reportStatus: e.target.value })}
                            inputProps={{
                                name: 'reportStatus',
                                id: 'reportStatus-dropdown',
                            }}
                            style={{ width: '100%' }}
                            required
                        >
                            <option value="resolved">Resolved</option>
                            <option value="Pending">Pending</option>
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        required
                        variant="standard"
                        label="Message"
                        multiline
                        value={reportReply.reportMessage}
                        contentEditable={false}
                        rows={7}
                        rowsMax={Infinity}
                        style={{ width: '100%', marginBottom: 15 }}
                        InputLabelProps={{ style: { color: '#4169e1', fontSize: 22, textTransform: 'uppercase' } }}
                        name="reportMessage"
                        inputProps={{ maxLength: 250 }}
                        onChange={handleChange}
                        helperText={`${reportReply.reportMessage.length} / ${props.messageMaxLength}`}
                    />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outline-primary"
                            style={styles.dialogBoxbuttonStyling}
                            onClick={() => props.handleClose(true)}
                        >
                            {props.leftButtonName}
                        </Button>
                        <Button
                            variant="outline-primary"
                            style={styles.dialogBoxbuttonStyling}
                            type="submit"
                        >
                            {props.rightButtonName}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
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
