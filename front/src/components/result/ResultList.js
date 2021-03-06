import React, {useEffect, useState} from "react";
import httpCommon from "../../http-common";
import {
    Autocomplete,
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Chip, CircularProgress,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    IconButton, List, ListItem, ListItemText, ListSubheader, Paper, Stack,
    styled, TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import RemoveIcon from '@mui/icons-material/Remove';
import * as PropTypes from "prop-types";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {generateCourseResult} from "../../helpers/utils";
import CourseCard from "../course/component/CourseCard";
import {connect} from "react-redux";
import AddIcon from '@mui/icons-material/Add';



const ResultList = (props) => {
    const {user} = props

    const [emplList, setEmplList] = useState([])
    const [departments, setDepartments] = useState([])
    const [openDialog, setOpenDialog] = useState({})
    const [openCourseDialog, setOpenCourseDialog] = useState({})


    const [courseChooseValue, setCourseChooseValue] = useState(null)
    const [courseChooseInput, setCourseChooseInput] = useState("")

    const [emplChooseValue, setEmplChooseValue] = useState(null)
    const [emplChooseInput, setEmplChooseInput] = useState("")


    useEffect(() => {
        httpCommon.get(`/api/employee/dept/${user.employeeId}`)
            .then(res => {
                const depts = res.data
                if (depts){
                    setDepartments(depts)
                    depts.forEach(val => {
                        httpCommon.get(`/api/employee?department=${val.id}&progress=true`)
                            .then(r => {
                                r.data && setEmplList(state => state.concat(r.data))
                                if (r.data){
                                    let eEx = {}
                                    let dOpen = {}
                                    r.data.forEach(val => {
                                        eEx[val.id] = false
                                        val.course_progresses.forEach(v =>{
                                            dOpen[v.c_id] = false
                                        })
                                    })
                                    setExpanded(eEx)
                                    setOpenDialog(dOpen)
                                    setOpenCourseDialog(eEx)
                                }
                            })
                            .catch(e => {console.log(e.message)})
                    })
                }
            })
            .catch(err => console.log(err.message))
        httpCommon.get(`/api/course`).then(res => setCourseList(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(emplList)
    },[emplList])

    const [courseList, setCourseList] = useState([])
    const [expanded, setExpanded] = useState({})

    // Render cards by department
    const renderCards = (depId) => {
        let e = emplList.filter(e => e.department.id === depId)

        if (emplChooseValue){
            e = e.filter(val => val.id === emplChooseValue.id)
        }

        return(<Box>
            {(e && e.length!==0) ? e.map(val => (
                <ListItem key={val.id} >
                    <Card key={val.id} sx={{width:"100%"}}>
                        <CardHeader
                            title={`${val.lastname} ${val.firstname}`}
                            action={
                                <ExpandMore
                                    expand={expanded[val.id]}
                                    onClick={() => {
                                        setExpanded(state => {
                                            let copy = {...state}
                                            copy[val.id] = !state[val.id]
                                            return copy
                                        })
                                    }}
                                    aria-expanded={expanded[val.id]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            }
                        />
                        <Divider></Divider>
                        <Collapse in={expanded[val.id]} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography>???????????????????? ?????????????????????? ????????????</Typography>
                                {renderEmployeeResults(val)}
                            </CardContent>
                        </Collapse>
                    </Card>
                </ListItem>
            )) : (<ListItem><Typography>???????????? ??????????????????????</Typography></ListItem>)}
        </Box>)
    }

    const renderEmployeeResults = (employee) => {
        let course_prog = employee.course_progresses
        if (courseChooseValue){
            course_prog = employee.course_progresses.filter(val => val.courseData.id === courseChooseValue.id)
        }
        if (course_prog && course_prog.length !== 0){
            let items = course_prog.map((val, index) => (
                    <ListItem
                        divider={true}
                        disablePadding
                        key={index}
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton onClick={() => {
                                httpCommon.delete(`/api/courseprog/${val.c_id}`)
                                    .then(() => {
                                        setEmplList(state => {
                                            let copy = [...state]
                                            return copy.map(e => {
                                                if (employee.id === e.id){
                                                    return {
                                                        ...e,
                                                        course_progresses:e.course_progresses.filter(k => k.id !== val.c_id)
                                                    }
                                                }else{
                                                    return e
                                                }
                                            })
                                        })
                                    })
                            }}>
                                <RemoveIcon/>
                            </IconButton>}
                    >
                        <ListItemButton onClick={() => {
                            setOpenDialog(state => {
                                let copy = {...state}
                                copy[val.c_id] = true
                                return copy
                            })
                        }}>
                            <ListItemIcon>
                                <CircularProgressWithLabel value={parseInt(val.completionRate) || 2} />
                            </ListItemIcon>
                            <ListItemText
                                primary={val.courseData && val.courseData.title ? val.courseData.title : "?????? ????????????????"}
                                secondary={val.courseData && val.courseData.desc ? val.courseData.desc : "???????????????? ????????????????????"}
                            />
                        </ListItemButton>
                        <DialogComponent
                            isOpen={openDialog[val.c_id]}
                            resData={val}
                            handleClose={handleClose}
                        />
                    </ListItem>
            ))
            return (
                <Box sx={{ width: '100%' }}>
                        <List  dense={true} component="nav">
                            {items}
                        </List>
                        <CourseChooseDialog
                            open={openCourseDialog[employee.id]}
                            handleCourseDialog={handleCourseDialog}
                            courseList={courseList}
                            emplId={employee.id}
                        />
                        <Button
                            variant={"contained"}
                            variant={"contained"}
                            fullWidth
                            onClick={() => {
                            setOpenCourseDialog(state => {
                                let copy = {...state}
                                copy[employee.id] = true
                                return copy
                            })
                        }}><AddIcon/></Button>
                </Box>)
        }else {
            return (<Typography>???????????? ??????????????????????</Typography>)
        }
    }

    const handleClose = (data) => {
        setOpenDialog(state => {
            let copy = {...state}
            copy[data] = false
            return copy
        })
    }

    const handleCourseDialog = (courseData) => {

        const {emplId, courses} = courseData

        setOpenCourseDialog(state => {
            let copy = {...state}
            copy[emplId] = false
            return copy
        })

        let res = []
        console.log(courses)
        courses.forEach(val => {
            let r = generateCourseResult(val)
            r = {...r, employeeId:emplId}
            res.push(r)
        })
        console.log(res)

        if (res && res.length!==0){
            httpCommon.post(`/api/courseprog`,res)
                .catch(err => console.log(err))
        }
    }



    return (<Box>
        <Box component={Paper} padding={2}>
            <Autocomplete
                value={courseChooseValue}
                onChange={(e, newVal) => {
                    setCourseChooseValue(newVal)
                }}
                inputValue={courseChooseInput}
                onInputChange={(e, newVal) => {
                    setCourseChooseInput(newVal)
                }}
                options={courseList}
                getOptionLabel={(option) => option.title}
                id="blur-on-select"
                blurOnSelect
                renderInput={(params) => (
                    <TextField {...params} label="???????????????? ????????" variant="standard"  />
                )}
            />
            <Autocomplete
                value={emplChooseValue}
                onChange={(e, newVal) => {
                    setEmplChooseValue(newVal)
                }}
                inputValue={emplChooseInput}
                onInputChange={(e, newVal) => {
                    setEmplChooseInput(newVal)
                }}
                options={emplList}
                getOptionLabel={(option) => `${option.lastname} ${option.firstname}`}
                id="empl-select"
                blurOnSelect
                renderInput={(params) => (
                    <TextField {...params} label="???????????????? ????????????????????" variant="standard" />
                )}
            />
        </Box>
        <Box marginTop={2} >
            <Stack spacing={2}>
                {
                    (departments && departments.length!==0) ?
                        departments.map(val => (
                            <div key={val.id}>
                                <List
                                    component={Card}
                                    sx={{ width: '100%',  bgcolor: 'background.paper' }}
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            {val.name}
                                        </ListSubheader>}>
                                    {renderCards(val.id)}
                                </List>
                                {/*<Typography>{val.name}</Typography>*/}
                                <Divider orientation="horizontal"/>

                            </div>
                        ))
                        :
                        (<Typography>???????????? ????????????????????</Typography>)
                }
            </Stack>
        </Box>
    </Box>)
}

const DialogComponent = (props) => {
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState(props ? props.resData : {c_id:0})

    useEffect(() => {
        setOpen(props.isOpen)
        props.resData && setResult(props.resData)
    },[])

    useEffect(() => {
        setOpen(props.isOpen)
        props.resData && setResult(props.resData)
    }, [props])

    const handleClose = () => {
        props.handleClose(result.c_id)
    }

    return (
        <Dialog
            open={open}
            scroll={"body"}
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth={false}
        >
            <DialogTitle id="scroll-dialog-title">???????????????? ???? ??????????</DialogTitle>
            <Divider />
            <DialogContent>
                <Divider variant="middle" >
                    <Chip label={"????????"}/>
                </Divider>
                <List>
                    {result && result.quiz.length !== 0 ?
                        result.quiz.map(val => (
                            <ListItem
                                key={val.id}
                                divider={true}
                            >
                                <ListItemButton
                                    onClick={() => {
                                        window.open(`/quiz/${val.id}`, "_blank");
                                    }}
                                >
                                    <ListItemIcon>
                                        {val.completed ?
                                            (<CheckIcon sx={{color:"#09a804"}}/>) :
                                            (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`????????: ${val.stepIndex+1} ${result.courseData.steps[val.stepIndex].title}- ??????????????????: ${val.bestResult ? val.bestResult : 0}`}
                                        secondary={`??????-???? ??????????????: ${val.totalTriesNo ? val.totalTriesNo : "-"}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                        :
                        (<ListItem>
                            <ListItemText primary={"???????????? ??????????????????????"}/>
                        </ListItem>)
                    }
                </List>
                <Divider variant="middle" >
                    <Chip label={"????????????"}/>
                </Divider>
                <List>
                    {result.lecture && result.lecture.length !==0 ?
                        result.lecture.map(val => (
                            <ListItem
                                divider={true}
                                key={val.id}
                            >
                                <ListItemButton
                                    onClick={() => {
                                        window.open(`/lect/${val.id}`, "_blank");
                                    }}
                                >
                                    <ListItemIcon>
                                        {val.completed ?
                                            (<CheckIcon sx={{color:"#09a804"}}/>) :
                                            (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`????????: ${val.stepIndex+1} ${result.courseData.steps[val.stepIndex].title} - ${val.completed ? "??????????????????" : "???? ??????????????????"}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                        :
                        (<ListItem>
                            <ListItemText primary={"???????????? ??????????????????????"}/>
                        </ListItem>)
                    }
                </List>
                <Divider variant="middle" >
                    <Chip label={"??????????"}/>
                </Divider>
                <List>
                    {result.video && result.video.length !==0 ?
                        result.video.map(val => (
                            <ListItem
                                divider={true}
                                key={val.id}
                            >
                                <ListItemButton
                                    onClick={() => {
                                        window.open(`/video/${val.id}`, "_blank");
                                    }}
                                >
                                    <ListItemIcon>
                                        {val.completed ?
                                            (<CheckIcon sx={{color:"#09a804"}}/>) :
                                            (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`????????: ${val.stepIndex+1} ${result.courseData.steps[val.stepIndex].title} - ${val.completed ? "??????????????????" : "???? ??????????????????"}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                        :
                        (<ListItem>
                            <ListItemText primary={"???????????? ??????????????????????"}/>
                        </ListItem>)
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>??????????????</Button>
            </DialogActions>
        </Dialog>
    )
}

const CourseChooseDialog = (props) => {
    const {open, handleCourseDialog, courseList, emplId} = props
    const [checkedCourses, setCheckedCourses] = useState([])

    useEffect(() => {
        setCheckedCourses(new Array(courseList.length).fill(false))
    },[courseList])

    const handleSuccessCloseDialog = () => {
        const selectedCourses = []
        checkedCourses.forEach((val, i) => {
            if(checkedCourses[i]){
                selectedCourses.push(courseList[i])
            }
        })

        const data = {
            emplId: emplId,
            courses: selectedCourses
        }
        handleCourseDialog(data)
        setCheckedCourses(state => state.map(() => false))
    }

    const handleCloseDialog = () => {
        const data = {
            emplId: emplId,
            courses: []
        }
        handleCourseDialog(data)
        setCheckedCourses(state => state.map(() => false))
    }

    const receiveData = (data) => {
        setCheckedCourses(state => state.map((val,i) => {
            if (i === data.index){
                return data.checked
            }else{
                return val
            }
        }))
    }

    return(
        <Dialog
            open={open}
            scroll={"body"}
            onClose={handleCloseDialog}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle >???????????????? ????????</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    {courseList ?
                        courseList.map((course, i) => (
                            <CourseCard
                                key={i}
                                course={course}
                                isInChooser={true}
                                sendDataToParent={receiveData}
                                index={i}
                                isChecked={checkedCourses[i]}
                            />
                        )) :
                        (<Typography variant={"h5"}>???????????? ??????????????????????</Typography>)}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSuccessCloseDialog}>??????????????????</Button>
                <Button onClick={handleCloseDialog}>????????????</Button>
            </DialogActions>
        </Dialog>
    )
}


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
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
                <Typography variant="caption" component="div" color="text.secondary">
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

const mapStateToProps = (state) => {
    const { user } = state.currentUser
    return {user}
}

export default connect(mapStateToProps)(ResultList)