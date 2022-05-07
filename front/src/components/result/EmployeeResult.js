import React, {useEffect, useState} from 'react'
import httpCommon from "../../http-common";
import {
    Box,
    Card,
    CardContent,
    CardHeader, Dialog, DialogTitle,
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

const EmployeeResult = (props) => {
    const emplId = 1

    const [resultData, setResultData] = useState([])
    const [openDialog, setOpenDialog] = useState({})

    useEffect(() => {
        httpCommon.get(`/api/courseprog?employee=${emplId}`)
            .then(res => {
                let course_prog = res.data
                setResultData(course_prog)
                let open = {}
                course_prog.quiz.forEach(val => {
                    (val.results && val.results.length !== 0) &&
                        val.results.forEach(r => open[r.id]=false)
                })

                setOpenDialog(open)
            })
            .catch(err => console.log(err))
    },[])


    const handleClose = (resId) => {
        setOpenDialog(state => {
            let copy = {...state}
            copy[resId] = false
            return copy
        })
    }

    const renderData = () => {
        let data = resultData
        return ((data && data.length !==0) ?
            resultData.map((val, index) => (
                <Card key={index}>
                    <CardHeader
                        title={`${index}. ${val.courseData.title}`}
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
                                                                copy[val.id] = true
                                                                return copy
                                                            })
                                                        }}>
                                                            <ListItemText primary={"RESULT"}/>
                                                            <ResultDialog open={openDialog[val.id]} handleClose={handleClose} resultId={res.id}/>
                                                        </ListItemButton>
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
        <Box sx={{display:'flex'}}>
            {renderData()}
        </Box>
    )
}

const ResultDialog = (props) => {
    const {open, handleClose, resultId} = props

    return(
        <Dialog open={open}
                onClose={() => handleClose(resultId)}
        >
            <DialogTitle>Why</DialogTitle>

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

export default EmployeeResult