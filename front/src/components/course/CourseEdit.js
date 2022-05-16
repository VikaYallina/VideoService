import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader, FormControl, IconButton, InputLabel, MenuItem,
    Paper, Select,
    Step,
    StepLabel,
    Stepper,
    Tab, TextField,
    Typography
} from "@mui/material";
import getUuidByString from "uuid-by-string";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useDispatch, useSelector} from "react-redux";
import {retrieveAllQuiz} from "../../actions/quiz.action";
import {retrieveAllLecture} from "../../actions/lecture.action";
import {retrieveVideos} from "../../actions/video.action";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import QuizCard from "../quiz/component/QuizCard";
import LectureCard from "../lecture/component/LectureCard";
import VideoCard from "../video/VideoCard";
import httpCommon from "../../http-common";

const steps = ['Select campaign settings', 'Create an ad'];

const CourseEdit = (props) => {
    const [lastEmployeeData, setLastEmployeeData] = useState([])

    useEffect(() => {
        const id = props.match.params.id
        console.log(id)
        httpCommon.get(`/api/course/${id}`)
            .then(res => {
                const course = res.data
                setLastCourseData(course)
                setCourseData({
                    title: course.title ? course.title : "",
                    desc: course.desc ? course.desc : ""
                })
                setCourseSteps(course.steps ? course.steps : [])
            })
            .catch(err => {
                console.log(err)
            })
        httpCommon.get(`/api/courseprog/?course=${id}`)
            .then(res  => {
                setLastEmployeeData(res.data)
            })
            .catch(err => {console.log(err)})
    },[])

    const [lastCourseData, setLastCourseData] = useState({})

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [courseSteps, setCourseSteps] = useState([])
    const [courseData, setCourseData] = useState({})

    const saveCourseStepsChange = (data) => {
        setCourseSteps(data)
    }


    const saveCourseData = (data) => {
        setCourseData(data)
    }

    const saveChanges = () => {
        const course = {
            title: courseData.title,
            desc:courseData.desc,
            steps: courseSteps.map(val => {
                let newData = {
                    id: val.id,
                    type: val.type,
                    title: val.title ? val.title : ""
                }
                if (val.type === "quiz"){
                    newData["totalTries"] = val.totalTries
                }

                return newData
            })
        }
        httpCommon.put(`/api/course/${lastCourseData.id}`, course)
            .then(res => {
                props.history.push("/course")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderComponent = () => {
        switch (activeStep){
            case 0:
                return (<DndList props={props} savedData={courseSteps} saveCourseSteps={saveCourseStepsChange}/>)
            case 1:
                return (<CourseDataComponent props={props} courseData={courseData} saveCourseData={saveCourseData}/>)
            default:
                return (<Typography>Not yet impl</Typography>)
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? saveChanges()
             : (
                <React.Fragment>
                    {renderComponent()}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Save changes' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}


const CourseDataComponent = (props) => {
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDesc, setCourseDesc] = useState("")

    useEffect(() => {
        const {title, desc} = props.courseData ? props.courseData : null
        title && setCourseTitle(title)
        desc && setCourseDesc(desc)
    },[])

    useEffect(() => {
        if (props.courseData){
            setCourseTitle(props.courseData.title)
            setCourseDesc(props.courseData.desc)
        }
    },[props])

    return(
        <Box component="form"
             sx={{
                 '& > :not(style)': { m: 1, width: '25ch' },
             }}
             noValidate
             autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={courseTitle}
                    onChange={(e) => {
                        setCourseTitle(e.target.value)
                        props.saveCourseData({
                            title: e.target.value,
                            desc: courseDesc
                        })
                    }}
                />
                <TextField
                    id="desc"
                    label="Desc"
                    variant="outlined"
                    value={courseDesc}
                    onChange={(e) => {
                        setCourseDesc(e.target.value)
                        props.saveCourseData({
                            title: courseTitle,
                            desc: e.target.value
                        })
                    }}
                />
        </Box>
    )
}


const DndList = (props) => {
    const [data, setData] = useState([])
    const quizList = useSelector(state => state.quiz)
    const lectureList = useSelector(state => state.lecture)
    const videoList = useSelector(state => state.video)
    const [tabVal, setTabVal] = useState("quiz")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveAllQuiz())
        dispatch(retrieveAllLecture())
        dispatch(retrieveVideos())
        props.savedData && setData(prepareData(props.savedData))
    },[])

    useEffect(() => {
        props.savedData && setData(prepareData(props.savedData))
    }, [props])

    useEffect(() => {
        console.log(data)
    }, [data])


    const prepareData = (data) => {
        return data.map(val => {
            const uuid = getUuidByString(JSON.stringify({id:val.id, type:val.type}))
            return {
                ...val,
                uuid:uuid
            }
        })
    }

    const onDragEnd = (result) => {
        const {destination, source} = result
        if (!destination){
            return
        }

        if (
            destination.draggableId === source.draggableId &&
            destination.index === source.index
        ){
            return
        }

        let copyState = []
        setData(state => {
            const sourceData = state[source.index]
            copyState = Array.from(state)
            copyState.splice(source.index, 1)
            copyState.splice(destination.index, 0, sourceData)

            return copyState
        })
        props.saveCourseSteps(copyState)
    }

    // useEffect(()=> {
    //     props.saveCourseSteps(data)
    // },[data])

    const handleTabChange = (event, newVal) => {
        setTabVal(newVal)
    }

    const getChildData = (childData) => {
        console.log("CHILS", childData)
        const uuid = getUuidByString(JSON.stringify({id: childData.id, type:childData.type}))
        let f = data.find(val => val.uuid === uuid)
        console.log(f)
        if (!f){
            let copyArray = []
            setData(state => {
                copyArray = Array.from(state)
                let newData = {
                    ...childData,
                    uuid
                }
                if (childData.type === "quiz"){
                    newData["totalTries"] = 1
                }
                copyArray.push(newData)
                return copyArray
            })
            props.saveCourseSteps(copyArray)
        }
    }

    // const handleChange = (event) => {
    //     const {name, value} = event.target
    //     setData(state => {
    //         let copy = [...state]
    //     })
    // }

    return (
        <Box sx={{ display:'flex', flexDirection:'row'}}>
            <Box sx={{ flexGrow:3, marginInlineEnd:10}}>
                <TabContext value={tabVal}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList variant={"fullWidth"} centered onChange={handleTabChange}>
                            <Tab value="quiz" label={"Quiz"}/>
                            <Tab value="lecture" label={"Lecture"}/>
                            <Tab value="video" label={"Video"}/>
                        </TabList>
                    </Box>
                    <TabPanel value="quiz">
                        <Box sx={{padding:3}}>
                            {(quizList && quizList.length > 0) ? quizList.map(q => (
                                    <QuizCard key={q.id} quiz={q} showActions={false} getChildData={getChildData}/>))
                                :(<Typography>No data</Typography>)}
                        </Box>
                    </TabPanel>
                    <TabPanel value="lecture">
                        <Box>
                            {(lectureList && lectureList.length > 0) ? lectureList.map(l => (
                                    <LectureCard key={l.id} lecture={l} showActions={false} getChildData={getChildData} />))
                                :(<Typography>No data</Typography>)}
                        </Box>
                    </TabPanel>
                    <TabPanel value="video">
                        <Box>
                            {(videoList && videoList.length > 0) ? videoList.map(v => (
                                    <VideoCard key={v.id} video={v} showActions={false} getChildData={getChildData}/>))
                                :(<Typography>No data</Typography>)}
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ mt: 2, mb: 1, flexGrow:1 }}>
                    {/*<Paper elevation={3}>*/}
                    <Droppable droppableId={"droppable"}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <Paper sx={{ padding:3}}
                                       elevation={3}
                                >
                                    {data.map((val,index) => (
                                        <Draggable
                                            key={val.uuid}
                                            draggableId={val.uuid}
                                            index={index}
                                        >
                                            {(provided1) => (
                                                <div
                                                    ref={provided1.innerRef}
                                                    {...provided1.draggableProps}
                                                    {...provided1.dragHandleProps}
                                                >
                                                    <Card
                                                        sx={{marginTop:2}}
                                                        // ContainerProps={{ ref: provided.innerRef }}
                                                        // {...provided1.draggableProps}
                                                        // {...provided1.dragHandleProps}
                                                    >
                                                        <CardHeader
                                                            title={`${index+1}. ${val.type} - ${val.title}`}
                                                            subheader={
                                                                (val.type === "quiz") && (
                                                                    <Box>
                                                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                                            <InputLabel id="demo-select-small">Кол-во попыток</InputLabel>
                                                                            <Select
                                                                                labelId="select-try"
                                                                                id="select-try-id"
                                                                                value={val.totalTries || 1}
                                                                                label="Попытка"
                                                                                name={"totalTries"}
                                                                                onChange={(event) => {
                                                                                    const newVal = event.target.value
                                                                                    setData(state => {
                                                                                        let copy = [...state]
                                                                                        copy[index].totalTries = newVal
                                                                                        return copy
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <MenuItem value={1}>1</MenuItem>
                                                                                <MenuItem value={2}>2</MenuItem>
                                                                                <MenuItem value={3}>3</MenuItem>
                                                                                <MenuItem value={4}>4</MenuItem>
                                                                                <MenuItem value={5}>5</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                        <TextField
                                                                            id="outlined-number"
                                                                            label="Number"
                                                                            type="number"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                )
                                                            }
                                                            action={
                                                                <IconButton onClick={() => {
                                                                    let copy = []
                                                                    setData(state => {
                                                                        copy = state.filter((val, i) => i !== index)
                                                                        return copy
                                                                    })
                                                                    props.saveCourseSteps(copy)
                                                                }}>
                                                                    <RemoveCircleIcon sx={{color:"#c92222"}}/>
                                                                </IconButton>}
                                                        />
                                                        <CardActions>

                                                        </CardActions>
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Paper>
                            </div>
                        )}
                    </Droppable>
                    {/*</Paper>*/}
                </Box>
            </DragDropContext>
        </Box>)
}

export default CourseEdit