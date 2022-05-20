import React, {useEffect, useState} from 'react'
import httpCommon from "../../http-common";
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem, ListItemText,
    styled,
    Typography
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemIcon from "@mui/material/ListItemIcon";
import {connect, useDispatch} from "react-redux";
import {retrieveCourseProg} from "../../actions/courseprog.action";
import Results from "../quiz/Results";

const EmployeeResult = (props) => {
    const {user, resultData} = props

    // const [resultData, setResultData] = useState([])
    const [openDialog, setOpenDialog] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveCourseProg(user.employeeId))
        // httpCommon.get(`/api/courseprog?employee=${user.employeeId}`)
        //     .then(res => {
        //         let course_prog = res.data
        //         setResultData(course_prog)
        //         let open = {}
        //         course_prog.quiz.forEach(val => {
        //             (val.results && val.results.length !== 0) &&
        //                 val.results.forEach(r => open[r.id]=false)
        //         })
        //
        //         setOpenDialog(open)
        //     })
        //     .catch(err => console.log(err))
    },[])

    useEffect(() => {
        let open = {}
        resultData.forEach(result => {
            result.quiz.forEach(val => {
                (val.results && val.results.length !== 0) &&
                val.results.forEach(r => open[r.id]=false)
            })
        })

        setOpenDialog(open)
    },[resultData])

    useEffect(() => {
        console.log(openDialog)
    }, [openDialog])



    const handleClose = (resId) => {
        console.log(resId)
        setOpenDialog(state => {
            let copy = {...state}
            copy[resId] = false
            console.log("COPY",copy)
            return copy
        })
    }

    const renderData = () => {
        let data = resultData
        return ((data && data.length !==0) ?
            resultData.map((val, index) => (
                <Card key={index}>
                    <CardHeader
                        title={`${index+1}. ${val.courseData.title}`}
                        subheader={`Пройдено: ${val.completionRate}%`}
                    />
                    <CardContent>
                        <Divider>
                            <Typography variant={"h5"}>Quiz</Typography>
                        </Divider>
                        {(val.quiz && val.quiz.length !== 0) ?
                            (<List>
                                {val.quiz.map((quiz, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {quiz.completed ?
                                                (<CheckIcon sx={{color:"#09a804"}}/>) :
                                                (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Этап №${quiz.stepIndex+1} - ${val.courseData.steps[quiz.stepIndex].title ? val.courseData.steps[quiz.stepIndex].title : "Без названия"}`}
                                        />
                                        <List>
                                            {(quiz.results && quiz.results.length !== 0) ?
                                                quiz.results.map(res => (
                                                    <ListItem key={res.id}>
                                                        <ListItemButton onClick={() => {
                                                            setOpenDialog(state => {
                                                                let copy = {...state}
                                                                copy[res.id] = true
                                                                return copy
                                                            })
                                                        }}>
                                                            <ListItemText primary={"RESULT"}/>
                                                        </ListItemButton>
                                                        <ResultDialog open={openDialog[res.id]} handleClose={handleClose} resultId={res.id}/>
                                                    </ListItem>
                                                )) :
                                                (<Typography>No data</Typography>)
                                            }
                                        </List>
                                    </ListItem>

                                ))}
                            </List>) :
                            (<Typography>No data</Typography>)
                        }
                        <Divider>
                            <Typography variant={"h5"}>Lecture</Typography>
                        </Divider>
                        {(val.lecture && val.lecture.length !== 0) ?
                            (<List>
                                {val.lecture.map(lect => (
                                        <ListItem key={lect.id}>
                                            <ListItemIcon>
                                                {lect.completed ?
                                                    (<CheckIcon sx={{color:"#09a804"}}/>) :
                                                    (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Этап №${lect.stepIndex+1} - ${val.courseData.steps[lect.stepIndex].title ? val.courseData.steps[lect.stepIndex].title : "Без названия"}`}
                                                secondary={`Статус - ${lect.completed ? "ЗАВЕРШЕНО" : "НЕ ЗАВЕРШЕНО"}`}
                                            />
                                        </ListItem>
                                    ))}
                            </List>) :
                            (<Typography>No data</Typography>)}
                        <Divider>
                            <Typography variant={"h5"}>Video</Typography>
                        </Divider>
                        {(val.video && val.video.length !== 0) ?
                            (<List>
                                {val.video.map(video => (
                                    <ListItem key={video.id}>
                                        <ListItemIcon>
                                            {video.completed ?
                                                (<CheckIcon sx={{color:"#09a804"}}/>) :
                                                (<ClearIcon sx={{color:"#9c2626"}}/>)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Этап №${video.stepIndex+1} - ${val.courseData.steps[video.stepIndex].title ? val.courseData.steps[video.stepIndex].title : "Без названия"}`}
                                            secondary={`Статус - ${video.completed ? "ЗАВЕРШЕНО" : "НЕ ЗАВЕРШЕНО"}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>) :
                            (<Typography>No data</Typography>)}
                    </CardContent>
                </Card>
            )) :
            (<Typography variant={"h5"}>No data</Typography>))
    }


    return(
        <Box sx={{display:'flex', flexDirection:'column'}}>
            {renderData()}
        </Box>
    )
}

const ResultDialog = (props) => {
    const {open, handleClose, resultId} = props

    return(
        <Dialog open={open}
                onClose={() => handleClose(resultId)}
                maxWidth={"sx"}
                fullWidth={true}
        >
            <DialogTitle>Why {resultId}</DialogTitle>
            <DialogContent>
                <Results id={resultId}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(resultId)}>Close</Button>
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

const mapStateToProps = (state) => {
    const { user } = state.currentUser
    const resultData = state.courseProg
    return { user, resultData }
}

export default connect(mapStateToProps)(EmployeeResult)