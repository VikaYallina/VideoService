import {Link, Router, Route, Switch, withRouter} from "react-router-dom";
import {history} from "./helpers/history";
import AddEmployee from "./components/employee/EmployeeAdd";
import EmployeeList from "./components/employee/EmployeeList";
import Employee from "./components/employee/Employee";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/Results";
import {connect} from "react-redux";
import QuizList from "./components/quiz/QuizList";
import EditQuiz from "./components/quiz/NewQuiz";
import LectureEditor from "./components/lecture/LectureEditor";
import Lecture from "./components/lecture/Lecture";
import VideoView from "./components/video/VideoView";
import VideoEdit from "./components/video/VideoEdit";
import Header from "./components/navigation/Header";
import {useState} from "react";
import {Box, createTheme, CssBaseline, ThemeProvider, Typography, useMediaQuery} from "@mui/material";
import Navigator from "./components/navigation/Navigator";
import CourseList from "./components/course/CourseList";
import CourseView from "./components/course/CourseView";
import CourseEdit from "./components/course/CourseEdit";
import CourseChooser from "./components/course/CourseChooser";



function App() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        // TODO: seperate nav panel form App
        // <Router location={history.location} navigator={history}>
        // <div>
        //     <nav className="navbar navbar-expand navbar-dark bg-dark">
        //         <a href="/employees" className="navbar-brand">
        //             Start
        //         </a>
        //         <div className="navbar-nav mr-auto">
        //             <li className="nav-item">
        //                 <Link to="/employees" className="nav-link">
        //                     Employees
        //                 </Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/add" className="nav-link">
        //                     Add new empl
        //                 </Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/quiz" className="nav-link">
        //                     Quiz
        //                 </Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/lect/edit/1" className="nav-link">
        //                     Lecture
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link to="/video/1" className="nav-link">
        //                     Video
        //                 </Link>
        //             </li>
        //         </div>
        //     </nav>
        //     <div className="container mt-3">
        //         <Switch>
        //
        //             <Route exact path="/add" component={AddEmployee}/>
        //             <Route exact path="/employees" component={EmployeeList}/>
        //             <Route exact path="/employees/:id" component={Employee}/>
        //             <Route exact path="/quiz/edit/:id" component={EditQuiz}/>
        //             <Route exact path="/lect/edit/:id" component={LectureEditor}/>
        //             <Route exact path="/lect/:id" component={Lecture}/>
        //             <Route path="/quiz/:id" component={Quiz}/>
        //             <Route exact path="/quiz" component={QuizList} />
        //             <Route path={"/result/:quizId/:resultId"} component={QuizResult} />
        //             <Route path={"/video/edit/:id"} component={VideoEdit} />
        //             <Route path={"/video/:id"} component={VideoView}/>
        //             <Route exact path="/" component ={EmployeeList}/>
        //
        //         </Switch>
        //     </div>
        // </div>
        // </Router>
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}

                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header onDrawerToggle={handleDrawerToggle} />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                        <Switch>
                            <Route exact path="/add" component={AddEmployee}/>
                            <Route exact path="/employees" component={EmployeeList}/>
                            <Route exact path="/employees/:id" component={Employee}/>

                            <Route path={"/result/:quizId/:resultId"} component={QuizResult} />

                            <Route exact path="/quiz/edit/:id" component={EditQuiz}/>
                            <Route path="/quiz/:id" component={Quiz}/>
                            <Route exact path="/quiz" component={QuizList} />

                            <Route exact path="/lect/edit/:id" component={LectureEditor}/>
                            <Route exact path="/lect/:id" component={Lecture}/>


                            <Route path={"/video/edit/:id"} component={VideoEdit} />
                            <Route path={"/video/:id"} component={VideoView}/>

                            <Route path={"/course/:id/edit"} component={CourseEdit} />
                            <Route path={"/course/choose"} component={CourseChooser} />
                            <Route path={"/course/:id"} component={CourseView} />
                            <Route path={"/course"} component={CourseList}/>

                            <Route exact path="/" component ={EmployeeList}/>
                        </Switch>
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );

}
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'KPFU, '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 256;

const mapStateToProps = (state) =>{
    return state
}

export default withRouter(connect(mapStateToProps)(App));
