import React from "react";
import {AppBar, Avatar, Button, Grid, IconButton, Tab, Tabs, Toolbar, Tooltip, Typography} from "@mui/material";
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from "prop-types";
import {history} from "../../helpers/history";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const tabValues = [
    "/quiz",
    "/add",
    "/course",
    "/course/1/edit",
    "/course/choose"
]

function Header(props) {
    const {onDrawerToggle} = props;

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
                            <IconButton color="inherit" sx={{p: 0.5}}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{zIndex: 0}}
            >
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
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
                <Tabs value={ tabValues.includes(history.location.pathname) ? history.location.pathname : false} textColor="inherit"
                      onChange={(e, val) => {
                          history.push(val)
                      }}>
                    <Tab label="Knowledge base" value={tabValues[0]}/>
                    <Tab label="Add user" value={tabValues[1]}/>
                    <Tab label="Courses" value={tabValues[2]}/>
                    <Tab label="Course Edit" value={tabValues[3]}/>
                    <Tab label="Course Choose" value={tabValues[4]}/>
                </Tabs>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;