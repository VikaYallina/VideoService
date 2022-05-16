import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from "react-redux";
import {loginAction, logoutAction} from "../../actions/authentication.action";
import {Box, Button, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";

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

export default connect(mapStateToProps)(LoginComponent)