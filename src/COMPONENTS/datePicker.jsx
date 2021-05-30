import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePicker
} from '@material-ui/pickers';


export default function CustomDatePicker(props) {
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    id="date-picker-dialog"
                    label={props.label}
                    format="dd MMM yyyy"
                    type="String"
                    value={props.value}
                    required
                    style={{
                        width: '100%',
                        color: props.dobError ? 'red' : '#4169e1',
                    }}
                    InputLabelProps={{
                        style: {
                            color: props.isError ? 'red' : '#4169e1',
                            fontSize: 20,
                            textTransform: 'uppercase',
                            fontWeight: 'bold'
                        }
                    }}
                    onChange={props.onChange}
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change date',
                    // }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
