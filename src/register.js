import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



function Register(props) {
    let history = useHistory();
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    let [name, setName] = useState('');
    let [age, setAge] = useState('');
    let [profession, setProfession] = useState('');
    let [locality, setLocality] = useState('');
    let [numGuests, setGuests] = useState()
    let [address, setAddress] = useState('');

    const [dob, setDOB] = React.useState(new Date());

    const handleDateChange = (date) => {
        setDOB(date);
    };

    const handelProfessionChange = (event) => {
        setProfession(event.target.value);
    };

    let handelRegister = async () => {
        let data = {
            name,
            age,
            dob,
            profession,
            locality,
            numGuests,
            address

        }
        await axios.post('https://pyt-node.herokuapp.com/register', data)
            .then((response) => {
                if (response.data.message == 'Registered') {
                    window.localStorage.setItem('status',true)
                    history.push('/');
                }
            });

    }

    return (
        <>
            {window.localStorage.getItem('status')==true ?
                <h2>You have already registered</h2>
            :
            <Container component="main" maxWidth="xs">

                <form className={classes.form} onSubmit={(e) => {
                    e.preventDefault();
                    handelRegister();
                }}>
                    <h1>Register</h1>
                    <TextField variant="outlined" margin="normal" required
                        fullWidth
                        id="email"
                        label="Name"
                        name="Name"
                        autoComplete="Name"
                        autoFocus
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="Age"
                        label="Age"
                        id="age"
                        autoComplete="current-password"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value)
                        }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={dob}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Profession</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={profession}
                            onChange={handelProfessionChange}
                            label="Profession"
                        >
                           
                            <MenuItem value={"Student"}>Student</MenuItem>
                            <MenuItem value={"Professional"}>Professional</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" className={classes.formControl} fullWidth style={{marginTop:"10px"}}>
                        <InputLabel id="demo-simple-select-outlined-label">No. of Guest</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={numGuests}
                            onChange={(e)=>{
                                setGuests(e.target.value)
                            }}
                            label="Profession"
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>3</MenuItem>
                            <MenuItem value={2}>2</MenuItem>

                        </Select>
                    </FormControl>

                    <TextField variant="outlined" margin="normal" required
                        fullWidth
                        id="email"
                        label="Locality"
                        name="Locality"
                        autoFocus
                        value={locality}
                        onChange={(e) => {
                            setLocality(e.target.value)
                        }}
                    />

                    <TextField variant="outlined" margin="normal" required
                        fullWidth
                        id="email"
                        label="Address"
                        name="Address"
                        autoComplete="Address"
                        autoFocus
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                </form>
            </Container>    
        }
        </>
    )
}

export default Register