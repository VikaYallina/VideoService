import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {addQuiz, removeQuiz, retrieveAllQuiz} from "../../actions/quiz.action";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, CardMedia,
    IconButton,
    Stack, Tab, Tabs,
    Typography
} from "@mui/material";
import {addLecture, removeLecture, retrieveAllLecture} from "../../actions/lecture.action";
import {TabPane} from "react-bootstrap";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {addVideo, removeVideo, retrieveVideos} from "../../actions/video.action";
import VideoCard from "../video/VideoCard";
import LectureCard from "../lecture/LectureCard";
import QuizCard from "./QuizCard";

const QuizList = (props) => {
    // const [qList, setQlist] = useState([])
    const qList = useSelector(state => state.quiz)
    const lList = useSelector(state => state.lecture)
    const vList = useSelector(state => state.video)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveAllQuiz())
        dispatch(retrieveAllLecture())
        dispatch(retrieveVideos())
    }, [])

    const handleCreateQuiz = () => {
        dispatch(addQuiz({}))
            .then(res => props.history.push(`/quiz/edit/${res.id}`))
            .catch(err => alert(err))
    }

    const handleCreateLect = () => {
        dispatch(addLecture({}))
            .then(res => props.history.push(`/lect/edit/${res.id}`))
            .catch(err => alert(err))
    }

    const [tabVal, setTabVal] = useState("quiz")
    const handleTabChange = (event, newVal) => {
        setTabVal(newVal)
    }

    const handleCreateVideo = () => {
        dispatch(addVideo({}))
            .then(res => props.history.push(`/video/edit/${res.id}`))
            .catch(err => console.log(err))
    }

    return (
        <Box >
            <TabContext value={tabVal}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList variant={"fullWidth"} centered onChange={handleTabChange}>
                        <Tab value="quiz" label={"Quiz"}/>
                        <Tab value="lect" label={"Lecture"}/>
                        <Tab value="video" label={"Video"}/>
                    </TabList>
                </Box>
                {/*<Stack direction="row" spacing={2} justifyContent="space-evenly">*/}
                <TabPanel value="quiz">
                    <Box>
                        {(qList && qList.length > 0) ? qList.map(q => (
                            <QuizCard key={q.id} quiz={q} showActions={true} />
                            // <Card key={q.id}>
                            //     <CardActionArea onClick={(e) => {
                            //         props.history.push(`/quiz/${q.id}`)
                            //     }}>
                            //         <CardHeader title={q.title ? q.title : "Без названия"}
                            //                     titleTypographyProps={q.title ? {} : {color: "lightgray"}}/>
                            //         <CardContent>
                            //             <Typography variant={"subtitle1"}>{q.desc ? q.desc : "Описание отсутсвует"}</Typography>
                            //         </CardContent>
                            //     </CardActionArea>
                            //     <CardActions>
                            //         <IconButton onClick={(e) => {
                            //             props.history.push(`/quiz/edit/${q.id}`)
                            //         }}><EditIcon/></IconButton>
                            //         <IconButton onClick={(e) => {
                            //             dispatch(removeQuiz(q.id))
                            //         }}><DeleteIcon/></IconButton>
                            //     </CardActions>
                            // </Card>
                        )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)
                        }
                        <Button onClick={handleCreateQuiz}>Создать</Button>
                    </Box>
                </TabPanel>
                <TabPanel value="lect">
                    <Box>
                        {(lList && lList.length > 0) ? lList.map(l => (
                            <LectureCard key={l.id} lecture={l} showActions={true}/>
                            // <Card key={l.id}>
                            //     <CardActionArea onClick={(e) => {
                            //         props.history.push(`/lect/${l.id}`)
                            //     }}>
                            //         <CardHeader
                            //             title={l.title ? l.title : "Без названия"}
                            //             titleTypographyProps={l.title ? {} : {color: "lightgray"}}
                            //         />
                            //         <CardContent>
                            //             <Typography variant={"subtitle1"}>{l.desc ? l.desc : "Описание отсутсвует"}</Typography>
                            //         </CardContent>
                            //     </CardActionArea>
                            //     <CardActions>
                            //         <IconButton onClick={(e) => {
                            //             props.history.push(`/lect/edit/${l.id}`)
                            //         }}><EditIcon/></IconButton>
                            //         <IconButton onClick={(e) => {
                            //             dispatch(removeLecture(l.id))
                            //         }}><DeleteIcon/></IconButton>
                            //     </CardActions>
                            // </Card>
                        )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)}
                        <Button onClick={handleCreateLect}>Создать</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={"video"}>
                    <Box>
                        {(vList && vList.length > 0) ? vList.map(v => (
                            <VideoCard video={v} key={v.id} showActions={true}/>
                            // <Card key={v.id} sx={{ display: 'flex' }}>
                            //     <CardActionArea onClick={(e) => {
                            //         props.history.push(`/video/${v.id}`)
                            //     }}>
                            //         <Box sx={{ display:'flex', flexDirection: 'row'}}>
                            //             <CardMedia
                            //                 component="img"
                            //                 src={`http://localhost:8080/api/video/${v.id}/thumb`}
                            //                 height={'144'}
                            //                 sx={{ width: '50%'}}
                            //             />
                            //             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            //                 <CardHeader title={v.title ? v.title : "Без названия"}
                            //                             titleTypographyProps={v.title ? {} : {color: "lightgray"}}/>
                            //                 <CardContent>
                            //                     <Typography variant={"subtitle1"}>{v.desc ? v.desc : "Описание отсутсвует"}</Typography>
                            //                 </CardContent>
                            //             </Box>
                            //         </Box>
                            //     </CardActionArea>
                            //     <CardActions>
                            //         <IconButton onClick={(e) => {
                            //             props.history.push(`/video/edit/${v.id}`)
                            //         }}><EditIcon/></IconButton>
                            //         <IconButton onClick={(e) => {
                            //             dispatch(removeVideo(v.id))
                            //                 .catch(err => console.log(err))
                            //         }}><DeleteIcon/></IconButton>
                            //     </CardActions>
                            // </Card>
                        )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)
                        }
                        <Button onClick={handleCreateVideo}>Создать</Button>
                    </Box>
                </TabPanel>
                {/*</Stack>*/}
            </TabContext>
        </Box>
    )
}

export default QuizList