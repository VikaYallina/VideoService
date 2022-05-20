import React, {useEffect, useState} from "react";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    MenuItem,
    TextField
} from "@mui/material";
import httpCommon from "../../http-common";
import PropTypes from "prop-types";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Role} from "../../helpers/Role";
import ruLocale from 'date-fns/locale/ru';
import {useDispatch} from "react-redux";
import {createEmployee, updateEmployee} from "../../actions/employee.action";
import {getFormattedDate} from "../../helpers/utils";


const EmployeeEdit = (props) => {
    const [departments, setDepartments] = useState([])
    const [employeeData, setEmployeeData] = useState(props.employee || {
        email: "",
        firstname: "",
        middlename: "",
        lastname: "",
        birthdate: new Date(),
        hire_date: new Date(),
        gender: "m",
        depId: null,
        roles: Role.Empl
    })
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [isNewEntry, setIsNewEntry] = useState(props.isNewEntry)
    const {open, handleClose} = props

    const dispatch = useDispatch()

    useEffect(() => {
        props.employee && setEmployeeData(props.employee)
        setIsNewEntry(props.isNewEntry)
    }, [props])

    useEffect(() => {
        httpCommon.get("/api/dep")
            .then(res => {
                setDepartments(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target
        setEmployeeData(state => {
            let copy = {...state}
            copy[name] = value
            return copy
        })
    }

    const handleDialogClose = () => {
        handleClose()
        resetData()
    }

    const resetData = () => {
        setEmployeeData({
            email: "",
            firstname: "",
            middlename: "",
            lastname: "",
            birthdate: new Date(),
            hire_date: new Date(),
            gender: "m",
            depId: null,
            roles: Role.Empl
        })
    }


    const handleSaveData = () => {
        setLoading(true)
        let data = {
            ...employeeData,
            birthdate: getFormattedDate(new Date(employeeData.birthdate)),
            hire_date: getFormattedDate(new Date(employeeData.hire_date)),
            depId: employeeData.depId ? employeeData.depId : null
        }
        if (isNewEntry) {
            data = {...data, roles: [employeeData.roles.toLowerCase()]}
            console.log(data)
            dispatch(createEmployee(data))
                .then(() => {
                    setLoading(false)
                    handleClose()
                    resetData()
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err.message)
                })
        } else {
            dispatch(updateEmployee(employeeData.id, data))
                .then(() => {
                    setLoading(false)
                    handleClose()
                    resetData()
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err.message)
                })
        }
    }

    return (
        <Dialog open={open} onClose={handleDialogClose}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DialogContent>
                {errorMessage && (<Alert
                    severity="error"
                    onClose={() => setErrorMessage("")}
                >{errorMessage}
                </Alert>)}
                <Box component={"form"} sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}>
                    {isNewEntry && (<Box>
                        <TextField
                            label={"email"}
                            name={"email"}
                            type={"email"}
                            required
                            value={employeeData.email || ""}
                            onChange={handleChange}
                        />
                        <TextField
                            id="roles"
                            select
                            label="role"
                            value={employeeData.roles || Role.Empl}
                            onChange={(event) => {

                                setEmployeeData(state => {
                                    let copy = {...state}
                                    copy["roles"] = event.target.value
                                    return copy
                                })
                            }}
                            helperText="Please select your currency"
                        >
                            <MenuItem key={Role.Empl} value={Role.Empl}>
                                {Role.Empl}
                            </MenuItem>
                            <MenuItem key={Role.Boss} value={Role.Boss}>
                                {Role.Boss}
                            </MenuItem>
                            <MenuItem key={Role.Admin} value={Role.Admin}>
                                {Role.Admin}
                            </MenuItem>
                        </TextField>
                    </Box>)}
                    <TextField
                        label={"firstname"}
                        name={"firstname"}
                        value={employeeData.firstname || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        label={"lastname"}
                        name={"lastname"}
                        value={employeeData.lastname || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        label={"middlename"}
                        name={"middlename"}
                        value={employeeData.middlename || ""}
                        onChange={handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <DesktopDatePicker
                            mask={"__.__.____"}
                            label="Birthdate"
                            value={employeeData.birthdate || new Date()}
                            minDate={new Date("01.01.1900")}
                            onChange={(newValue) => {
                                setEmployeeData(state => {
                                    let copy = {...state}
                                    copy["birthdate"] = newValue
                                    return copy
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            id="gender"
                            select
                            label="gender"
                            value={employeeData.gender || "m"}
                            onChange={(event) => {
                                setEmployeeData(state => {
                                    let copy = {...state}
                                    copy["gender"] = event.target.value
                                    return copy
                                })
                            }}
                            helperText="Please select your currency"
                        >
                            <MenuItem key={"m"} value={"m"}>
                                Male
                            </MenuItem>
                            <MenuItem key={"f"} value={"f"}>
                                Female
                            </MenuItem>
                        </TextField>
                        <DesktopDatePicker
                            mask={"__.__.____"}
                            label="Hire date"
                            value={employeeData.hire_date || new Date()}
                            minDate={new Date("01.01.1900")}
                            onChange={(newValue) => {
                                setEmployeeData(state => {
                                    let copy = {...state}
                                    copy["hire_date"] = newValue
                                    return copy
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        id="department"
                        select
                        label="Department"
                        value={employeeData.depId || ""}
                        onChange={(e, newValue) => {
                            console.log(newValue)
                            setEmployeeData(state => {
                                let copy = {...state}
                                copy["depId"] = e.target.value
                                return copy
                            })
                        }}
                        helperText="Please select your currency"
                    >
                        {departments.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                        <MenuItem key={-1} value={""}>
                            No dep
                        </MenuItem>
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleSaveData}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

EmployeeEdit.propTypes = {
    employee: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    isNewEntry: PropTypes.bool.isRequired
}

export default EmployeeEdit