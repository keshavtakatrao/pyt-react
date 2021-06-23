import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


function Adminlogin(props) {
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

    let [password, setPassword] = useState('');
    let [error, setError] = useState(false);

    let handelLogin = async () => {
        let data = {
            password
        }
        await axios.post('https://pyt-node.herokuapp.com/adminlogin', data)
            .then((response) => {
                if (response.data.message == 'allow') {
                    window.localStorage.setItem('admin', true);
                    history.push('/');
                }
                
                if(response.data.message =='message":"Email or password incorrect'){
                    setError(true);
                }
            });

    }

    return (
        <>
            <Container component="main" maxWidth="xs">
            {error ? <div class="alert alert-warning" role="alert">
                        Email or Password incorrect
                    </div> : null}
                <form className={classes.form} onSubmit={(e) => {
                    e.preventDefault();
                    handelLogin();
                }}>
                    {error ? <div class="alert alert-warning" role="alert">
                        Email or Password incorrect
                    </div> : null}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Enter Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default Adminlogin