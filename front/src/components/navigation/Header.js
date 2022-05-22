import React, {useEffect, useState} from "react";
import {
    Alert,
    AppBar,
    Avatar,
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider,
    Grid,
    IconButton,
    Menu, MenuItem, Stack,
    Tab,
    Tabs, TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Link} from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import LockResetIcon from '@mui/icons-material/LockReset';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from "prop-types";
import {history} from "../../helpers/history";
import {connect, useDispatch} from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import {logoutAction} from "../../actions/authentication.action";
import EmployeeService from "../../services/employee.service";
import {authHeader} from "../../helpers/auth-header";
import {authenticationService} from "../../services/auth.service";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const tabValues = [
    "/quiz",
    "/add",
    "/course",
    "/course/1/edit",
    "/course/choose",
    "/course/result"
]


function Header(props) {
    const {onDrawerToggle, user} = props;
    const [employeeData, setEmployeeData] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("HEADER:", authHeader())
        if (user) {
            EmployeeService.get(user.employeeId)
                .then(res => setEmployeeData(res.data))
                .catch(err => alert(err.message))
        }
    }, [user])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutAction())
    }

    const handleDialog = () => {
        setOpenDialog(false)
    }

    const handlePasswordDialog = () => {
        setOpenPasswordDialog(false)
    }

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => setOpenDialog(true)}>
                                <Avatar/> Профиль
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={() => setOpenPasswordDialog(true)}>
                                <ListItemIcon>
                                    <LockIcon fontSize="small"/>
                                </ListItemIcon>
                                Сменить пароль
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                        <Grid item xs/>
                        {/*<Grid item>*/}
                        {/*    <Link*/}
                        {/*        href="/"*/}
                        {/*        variant="body2"*/}
                        {/*        sx={{*/}
                        {/*            textDecoration: 'none',*/}
                        {/*            color: lightColor,*/}
                        {/*            '&:hover': {*/}
                        {/*                color: 'common.white',*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*        rel="noopener noreferrer"*/}
                        {/*        target="_blank"*/}
                        {/*    >*/}
                        {/*        Go to docs*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ml: 2}}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{
                                    width: 32,
                                    height: 32
                                }}>{employeeData ? employeeData.lastname.charAt(0) : "?"}</Avatar>
                            </IconButton>
                            <UserInfoDialog open={openDialog} handleDialog={handleDialog} employeeData={employeeData}/>
                            <ChangePasswordDialog open={openPasswordDialog} handleDialog={handlePasswordDialog}
                                                  userId={user.id}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

const UserInfoDialog = (props) => {
    const {open, handleDialog, employeeData} = props

    useEffect(() => {
        console.log(employeeData)
    }, [employeeData])
    return (
        <Dialog
            open={open}
            onClose={() => handleDialog()}
            maxWidth={"sm"}
        >
            <DialogTitle>Данные о сотруднике</DialogTitle>
            <DialogContent>
                {employeeData ? (
                    <Stack direction={"column"}>
                        <Typography>{`ФИО: ${employeeData.lastname} ${employeeData.firstname} ${employeeData.middlename}`}</Typography>
                        <Typography>{`Дата рождения: ${new Date(employeeData.birthdate).toLocaleDateString()}`}</Typography>
                        <Typography>{`Пол: ${employeeData.gender === "m" ? "Мужской" : "Женский"}`}</Typography>
                        <Typography>{`Отдел: ${employeeData.department ? employeeData.department.name : "-"}`}</Typography>
                        <Typography>{`Дата начала работы: ${new Date(employeeData.hire_date).toLocaleDateString()}`}</Typography>
                    </Stack>
                ) : (<Typography>Данные отсутствуют</Typography>)}

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDialog()}>Закрыть</Button>
            </DialogActions>
        </Dialog>)
}

const ChangePasswordDialog = (props) => {
    const {open, handleDialog, userId} = props
    const [data, setData] = useState({
        old_password: "",
        new_password: ""
    })

    const [error, setError] = useState("")

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleChange = (e) => {
        const {name, value} = e.target
        setData(state => {
            return {...state, [name]: value}
        })
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        authenticationService.changePassword(userId, data)
            .then(() => {
                dispatch(logoutAction())
            })
            .catch(err => {
                console.log(err.response)
                setError(err.response.data.message)
            })
    }

    const handleClose = () => {
        handleDialog()
        setData({
            old_password: "",
            new_password: ""
        })
        setError("")
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}>
            <DialogTitle>Смена пароля</DialogTitle>
            {error && (<Alert severity={"error"} onClick={() => setError("")}>{error}</Alert>)}
            <Box component={"form"} onSubmit={handleSubmit}>

                <DialogContent>

                    <Stack direction={"row"} spacing={2}>
                        <TextField
                            name={"old_password"}
                            label={"Старый пароль"}
                            value={data.old_password || ""}
                            onChange={handleChange}
                        />
                        <TextField
                            name={"new_password"}
                            label={"Новый пароль"}
                            value={data.new_password || ""}
                            onChange={handleChange}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Сохранить</Button>
                    <Button onClick={() => handleClose()}>Закрыть</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const {user} = state.currentUser
    console.log(user)
    return {user}
}

export default connect(mapStateToProps)(Header);