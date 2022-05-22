import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from "react-redux";
import {loginAction, logoutAction} from "../../actions/authentication.action";
import {
    Avatar,
    Box,
    Button, Checkbox,
    createTheme,
    CssBaseline, FormControlLabel,
    Grid,
    Link, Paper,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'КФУ '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignInSide = (props) => {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    const { isLoggingIn } = props

    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        submitted: false
    })

    useEffect(() => {
        dispatch(logoutAction())
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target
        setLoginData(state => {
            return {...state, [name]: value}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setLoginData(state => {return {...state, submitted: true}})

        const {email, password} = loginData
        if (email && password){
            dispatch(loginAction(email, password))
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вход в систему
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                value={loginData.email}
                                onChange={handleChange}
                                error={loginData.submitted && !loginData.email}
                                helperText={loginData.submitted && !loginData.email ? "Необходимо ввести email" : ""}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                error={loginData.submitted && !loginData.password}
                                value={loginData.password}
                                onChange={handleChange}
                                helperText={loginData.submitted && !loginData.password ? "Необходимо ввести пароль" : ""}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <LoadingButton
                                loading={isLoggingIn}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </LoadingButton>
                            {/*<Grid container>*/}
                            {/*    <Grid item xs>*/}
                            {/*        <Link href="#" variant="body2">*/}
                            {/*            Forgot password?*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item>*/}
                            {/*        <Link href="#" variant="body2">*/}
                            {/*            {"Don't have an account? Sign Up"}*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

const LoginComponent = (props) => {
    const { isLoggingIn } = props

    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        submitted: false
    })

    useEffect(() => {
        dispatch(logoutAction())
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target
        setLoginData(state => {
            return {...state, [name]: value}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setLoginData(state => {return {...state, submitted: true}})

        const {email, password} = loginData
        if (email && password){
            dispatch(loginAction(email, password))
        }
    }

    return(
        <Box>

            <Typography variant={"h5"}>Login</Typography>
            <Box component={"form"} name="form" onSubmit={handleSubmit}>
                <TextField
                    error={loginData.submitted && !loginData.email}
                    label={"Email"}
                    name={"email"}
                    value={loginData.email}
                    onChange={handleChange}
                    helperText={loginData.submitted && !loginData.email ? "Email is required" : ""}
                />
                <TextField
                    error={loginData.submitted && !loginData.password}
                    label={"Password"}
                    name={"password"}
                    value={loginData.password}
                    onChange={handleChange}
                    helperText={loginData.submitted && !loginData.password ? "Password is required" : ""}
                />
                <LoadingButton loading={isLoggingIn} variant="outlined" type="submit">
                    Submit
                </LoadingButton>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.currentUser;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(SignInSide)