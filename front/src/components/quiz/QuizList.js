import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {addQuiz, removeQuiz, retrieveAllQuiz} from "../../actions/quiz.action";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, CardMedia, Grid,
    IconButton,
    Stack, Tab, Tabs, TextField,
    Typography
} from "@mui/material";
import {addLecture, removeLecture, retrieveAllLecture} from "../../actions/lecture.action";
import {TabPane} from "react-bootstrap";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {addVideo, removeVideo, retrieveVideos} from "../../actions/video.action";
import VideoCard from "../video/VideoCard";
import LectureCard from "../lecture/component/LectureCard";
import QuizCard from "./component/QuizCard";
import {userIsAdmin} from "../../helpers/utils";

const QuizList = (props) => {
    // const [qList, setQlist] = useState([])
    const qList = useSelector(state => state.quiz)
    const lList = useSelector(state => state.lecture)
    const vList = useSelector(state => state.video)
    const auth = useSelector(state => state.currentUser)

    const [showActions, setShowActions] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveAllQuiz())
        dispatch(retrieveAllLecture())
        dispatch(retrieveVideos())
    }, [])

    useEffect(() => {
        const isAdmin = userIsAdmin(auth.user)
        setShowActions(isAdmin)
    },[auth])

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



    const [quizAutoValue, setQuizAutoValue] = useState(null)
    const [quizAutoInput, setQuizAutoInput] = useState("")

    const [lectureAutoValue, setLectureAutoValue] = useState(null)
    const [lectureAutoInput, setLectureAutoInput] = useState("")

    const [videoAutoValue, setVideoAutoValue] = useState(null)
    const [videoAutoInput, setVideoAutoInput] = useState("")

    useEffect(() => {console.log(quizAutoValue)}, [quizAutoValue])

    return (
        <Box >
            <TabContext value={tabVal}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList variant={"fullWidth"} centered onChange={handleTabChange}>
                        <Tab value="quiz" label={"Тесты"}/>
                        <Tab value="lect" label={"Лекции"}/>
                        <Tab value="video" label={"Видео"}/>
                    </TabList>
                </Box>
                <TabPanel value="quiz">
                    <Stack spacing={2}>

                        {qList && qList.length !== 0 ? (<Autocomplete
                            fullWidth
                            value={quizAutoValue}
                            onChange={(e, newVal) => {
                                setQuizAutoValue(newVal)
                            }}
                            inputValue={quizAutoInput}
                            onInputChange={(e, newVal) => {
                                setQuizAutoInput(newVal)
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={qList}
                            getOptionLabel={(option) => option.title}
                            blurOnSelect
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Поиск теста" />}
                        />) : null}
                        {showActions && <Button variant={"contained"} onClick={handleCreateQuiz}>Создать</Button>}
                        {qList && qList.length !== 0 && quizAutoValue ? (<QuizCard isAdmin={showActions} quiz={quizAutoValue} showActions={showActions}/>) :
                            (qList && qList.length > 0) ? qList.map(q => (
                            <QuizCard isAdmin={showActions} key={q.id} quiz={q} showActions={showActions} />
                        )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)
                        }
                    </Stack>
                </TabPanel>
                <TabPanel value="lect">
                    <Stack spacing={2}>

                        {lList && lList.length >0 ? (<Autocomplete
                            fullWidth
                            value={lectureAutoValue}
                            onChange={(e, newVal) => {
                                setLectureAutoValue(newVal)
                            }}
                            inputValue={lectureAutoInput}
                            onInputChange={(e, newVal) => {
                                setLectureAutoInput(newVal)
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={lList}
                            getOptionLabel={(option) => option.title}
                            blurOnSelect
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Поиск лекции" />}
                        />) : null}
                        {showActions && <Button variant={"contained"} onClick={handleCreateLect}>Создать</Button>}
                        {lList && lList.length>0 && lectureAutoValue ? (<LectureCard isAdmin={showActions} lecture={lectureAutoValue} showActions={showActions} />) :
                            (lList && lList.length > 0) ? lList.map(l => (
                            <LectureCard isAdmin={showActions} key={l.id} lecture={l} showActions={showActions}/>
                        )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)}

                    </Stack>
                </TabPanel>
                <TabPanel value={"video"}>
                    <Stack spacing={2}>
                        {vList && vList.length>0 ? (<Autocomplete
                            fullWidth
                            value={videoAutoValue}
                            onChange={(e, newVal) => {
                                setVideoAutoValue(newVal)
                            }}
                            inputValue={videoAutoInput}
                            onInputChange={(e, newVal) => {
                                setVideoAutoInput(newVal)
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={vList}
                            getOptionLabel={(option) => option.title}
                            blurOnSelect
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Поиск видео" />}
                        />) : null}
                        {showActions && <Button variant={"contained"} onClick={handleCreateVideo}>Создать</Button>}
                        {vList && vList.length>0 && videoAutoValue ? (<VideoCard isAdmin={showActions} video={videoAutoValue} showActions={showActions}/>) :
                            (vList && vList.length > 0) ? vList.map(v => (
                                <VideoCard isAdmin={showActions} video={v} key={v.id} showActions={showActions}/>
                            )) : (<Typography variant="h6">Записи отсутсвуют</Typography>)
                        }

                    </Stack>
                </TabPanel>
                {/*</Stack>*/}
            </TabContext>
        </Box>
    )
}

export default QuizList