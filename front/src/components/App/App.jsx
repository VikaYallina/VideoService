import React from "react";
import {authenticationService} from '../../service/authentication.service'
import { Role } from '../../helpers/Role'
import { history } from '../../helpers/history'
import { Route, Router } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { PrivateRoute } from "../PrivateRoute";
import { Link } from "@mui/material";
import { Admin } from "../admin/Admin";
import { Home } from "../Home";
import { Login } from "../Login";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button"
import Helmet from 'react-helmet';
import { CssBaseline } from '@mui/material';
import Container from "@mui/material/Container"


class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        }
    }

    componentDidMount(){
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x & x.role === Role.Admin
        }))
    }

    logout(){
        authenticationService.logout();
        history.push('/login');
    }

    render(){
        const {currentUser, isAdmin } = this.state;
        return(
            <Router location={history.location} navigator={history}>
                <Helmet>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Helmet>
                <CssBaseline/>
                <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link href='/'>Home</Link>
          {isAdmin && <Link href='/admin'></Link>}
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
            <Route path="/login" component={Login} />
    </Container>
            </Router>
        );
    }
}

export {App}