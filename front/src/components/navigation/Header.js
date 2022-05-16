import React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button, Divider,
    Grid,
    IconButton,
    Menu, MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from "prop-types";
import {history} from "../../helpers/history";
import {connect, useDispatch} from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import {logoutAction} from "../../actions/authentication.action";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const tabValues = [
    "/quiz",
    "/add",
    "/course",
    "/course/1/edit",
    "/course/choose",
    "/course/result"
]

function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

        </React.Fragment>
    );
}

function Header(props) {
    const {onDrawerToggle, user} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutAction())
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
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
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
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title={JSON.stringify(user) || "No data"}>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/*<AppBar*/}
            {/*    component="div"*/}
            {/*    color="primary"*/}
            {/*    position="static"*/}
            {/*    elevation={0}*/}
            {/*    sx={{zIndex: 0}}*/}
            {/*>*/}
                {/*<Toolbar>*/}
                {/*    <Grid container alignItems="center" spacing={1}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Typography color="inherit" variant="h5" component="h1">*/}
                {/*                Authentication*/}
                {/*            </Typography>*/}
                {/*        </Grid>*/}
                {/*        <Grid item>*/}
                {/*            <Button*/}
                {/*                sx={{borderColor: lightColor}}*/}
                {/*                variant="outlined"*/}
                {/*                color="inherit"*/}
                {/*                size="small"*/}
                {/*            >*/}
                {/*                Web setup*/}
                {/*            </Button>*/}
                {/*        </Grid>*/}
                {/*        <Grid item>*/}
                {/*            <Tooltip title="Help">*/}
                {/*                <IconButton color="inherit">*/}
                {/*                    <HelpIcon/>*/}
                {/*                </IconButton>*/}
                {/*            </Tooltip>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Toolbar>*/}
            {/*</AppBar>*/}
            {/*<AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>*/}
            {/*    <Tabs value={ tabValues.includes(history.location.pathname) ? history.location.pathname : false} textColor="inherit"*/}
            {/*          onChange={(e, val) => {*/}
            {/*              history.push(val)*/}
            {/*          }}>*/}
            {/*        <Tab label="Knowledge base" value={tabValues[0]}/>*/}
            {/*        <Tab label="Add user" value={tabValues[1]}/>*/}
            {/*        <Tab label="Courses" value={tabValues[2]}/>*/}
            {/*        <Tab label="Course Edit" value={tabValues[3]}/>*/}
            {/*        <Tab label="Course Choose" value={tabValues[4]}/>*/}
            {/*        <Tab label="C Result" value={tabValues[5]} />*/}
            {/*    </Tabs>*/}
            {/*</AppBar>*/}
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { user } = state.currentUser
    console.log(user)
    return {user}
}

export default connect(mapStateToProps)(Header);