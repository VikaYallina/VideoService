import React, {useEffect, useState} from "react";

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import {CircularProgress, Collapse, ListItemText, Typography} from "@mui/material";
import {history} from "../../helpers/history";
import {connect} from "react-redux";
import {userIsAdmin, userIsBoss, userIsEmployee} from "../../helpers/utils";
import httpCommon from "../../http-common";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import PropTypes from "prop-types";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuizIcon from '@mui/icons-material/Quiz';




const Navigator = (props) => {
    const {auth, courseList, ...other} = props;
    // const [courseList, setCourseList] = useState([]);
    const [open, setOpen] = useState({})

    useEffect(() => {
        if (auth.loggedIn && userIsEmployee(auth.user)) {
            let openData = {}
            courseList.forEach(val => {
                openData[val.c_id] = false
            })
            setOpen(openData)
        }
    }, [courseList])

    useEffect(() => {


        // httpCommon.get(`/api/courseprog?employee=${auth.user.employeeId}`)
        //     .then(res => {
        //         const courses = res.data
        //         setCourseList(courses)
        //         console.log(courses)
        //
        //         let openData = {}
        //         courses.forEach(val => {
        //             openData[val.id] = false
        //         })
        //         setOpen(openData)
        //     })
        //     .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        console.log(open)
    }, [open])

    const getIcon = (step) => {
        switch (step.type) {
            case "quiz":
                return (<QuizIcon sx={{color: '#fff'}}/>)
            case "lecture":
                return (<TextSnippetIcon sx={{color: '#fff'}}/>)
            case "video":
                return (<QuizIcon sx={{color: '#fff'}}/>)
            default:
                return
        }
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                    <ListItemButton onClick={() => {
                        history.push("/dashboard")
                    }}>
                        Need2Learn
                    </ListItemButton>
                </ListItem>
                {auth.loggedIn && userIsEmployee(auth.user) && (
                    <Box>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/course/result/employee")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>Результаты</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        {courseList && courseList.map(val => (
                            <Box key={val.c_id}>
                                <ListItem sx={{...item, ...itemCategory}}>
                                    <ListItemButton onClick={(e) => setOpen(state => {
                                        let copy = {...state}
                                        copy[val.c_id] = !state[val.c_id]
                                        return copy
                                    })}>
                                        <ListItemIcon>
                                            <CircularProgressWithLabel value={val.completionRate}/>
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{color: '#fff'}}
                                            primary={val.courseData.title}/>
                                                {open[val.c_id] ?
                                                    <ExpandLess sx={{color: '#fff'}}/> :
                                                    <ExpandMore sx={{color: '#fff'}}/>}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={open[val.c_id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding sx={{bgcolor: '#101F33'}}>
                                        {val.courseData.steps.map((step, index) => (
                                            <ListItem disablePadding key={index}>
                                                <ListItemButton sx={item} selected={val.completed[index]}
                                                                onClick={() => {
                                                                    history.push(`/course/${val.courseData.id}?step=${index}`)
                                                                }}>
                                                    <ListItemIcon>
                                                        {getIcon(step)}
                                                    </ListItemIcon>
                                                    <ListItemText primary={step.title}/>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        ))}
                    </Box>

                )}
                {auth.loggedIn && userIsBoss(auth.user) && (
                    <Box>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/kb")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>База знаний</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/course/choose")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>Курсы</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/course/result")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>Результаты</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                )}
                {auth.loggedIn && userIsAdmin(auth.user) && (
                    <Box>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/kb")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>База знаний</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/course")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>Курсы</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{...item, ...itemCategory}} disablePadding>
                            <ListItemButton onClick={() => {
                                history.push("/employees")
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText>Список пользователей</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                )}

                {/*<ListItem sx={{...item, ...itemCategory}}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <HomeIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText>Результаты</ListItemText>*/}
                {/*</ListItem>*/}
                {/*{categories.map(({id, children}) => (*/}
                {/*    <Box key={id} sx={{bgcolor: '#101F33'}}>*/}
                {/*        <ListItem sx={{py: 2, px: 3}}>*/}
                {/*            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>*/}
                {/*        </ListItem>*/}
                {/*        {children.map(({id: childId, icon, active}) => (*/}
                {/*            <ListItem disablePadding key={childId}>*/}
                {/*                <ListItemButton selected={active} sx={item}>*/}
                {/*                    <ListItemIcon>{icon}</ListItemIcon>*/}
                {/*                    <ListItemText>{childId}</ListItemText>*/}
                {/*                </ListItemButton>*/}
                {/*            </ListItem>*/}
                {/*        ))}*/}

                {/*        <Divider sx={{mt: 2}}/>*/}
                {/*    </Box>*/}
                {/*))}*/}
            </List>
        </Drawer>
    );
}

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color='#fff'>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 0.5,
};

const mapStateToProps = (state) => {
    const auth = state.currentUser
    const courseList = state.courseProg
    return {auth, courseList}
}

export default connect(mapStateToProps)(Navigator)