import React, {useEffect, useState} from "react";
import {Box, Button, Pagination, Typography} from "@mui/material";
import httpCommon from "../../http-common";
import Lecture from "../lecture/Lecture";
import VideoView from "../video/VideoView";
import Quiz from "../quiz/Quiz";
import {useLocation} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import Results from "../quiz/Results";

const CourseView = (props) => {
    const [stepIndex, setStepIndex] = useState(0)
    const [courseData, setCourseData] = useState(null)
    const [courseProgression, setCourseProgression] = useState( null)

    const [showQuiz, setShowQuiz] = useState([])
    const [currentResultId, setCurrentResultId] = useState({})


    const query = useQuery()
    const { user } = props
    const {id} = props.match.params

    useEffect(() => {
        console.log("QUERY")
    }, [query])

    useEffect(() => {
        const step = query.get("step")
        console.log("INIT RENDER step:", step)

        step ? setStepIndex(parseInt(step)) : setStepIndex(0)
        console.log(id)
        httpCommon.get(`/api/course/${id}`)
            .then(res => {
                console.log(res.data)
                setCourseData(res.data)
            })
            .catch(err => console.log(err))
        httpCommon.get(`/api/courseprog/?employee=${user.employeeId}&course=${id}`)
            .then(res => setCourseProgression(res.data[0]))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(showQuiz)
    }, [showQuiz])

    const handleChildComp = (data) =>{

        let quiz = courseProgression.quiz.map(val => {
            if (data.id === val.id){
                return {
                    ...val,
                    bestResult: Math.max(data.result.correct, val.bestResult) ,
                    bestResultId: (!val.bestResultId || (data.result.correct > val.bestResult)) ? data.result.id : val.bestResultId,
                    results:[
                        ...val.results,
                        {id: data.result.id}
                    ]
                }
            }else {
                return val
            }
        })
        console.log(quiz,"!!!!!")
        httpCommon.put(`/api/courseprog/${courseProgression.id}`, {quiz})
            .then(() => httpCommon.get(`/api/courseprog/${courseProgression.id}`)
                .then(res => setCourseProgression(res.data)))
            .catch(err => console.log(err))

        setCurrentResultId(state => {
            return {
                ...state,
                [data.id]:data.result.id
            }
        })

        setShowQuiz(state => state.map(val => {
            if (val.id === data.id)
                return data
            else return val
        }))
    }

    const handleStepChange = (event, value) => {
        let index = parseInt(value) - 1
        if (Number.isNaN(index)) {
            index = parseInt(stepIndex) + 1
            if (index >= courseData.steps.length) {
                index = 0
            }
        }
        setStepIndex(index)
    }

    useEffect(() => {
        console.log(currentResultId,"RESULT")
    },[currentResultId])


    const renderData = () => {
        console.log("RENDER"
        )
        const {id, type} = courseData.steps[stepIndex]
        switch (type) {
            case "quiz":
                let qShow = showQuiz ? showQuiz.find(val => val.id === id) : null
                console.log(qShow,"QSHOW")
                if (!qShow){
                    console.log("HERERERERRERRER")
                    let quizRes = courseProgression.quiz.find(val => val.id === id)
                    let resId = quizRes.bestResultId  ? quizRes.bestResultId : null
                    if (resId){
                        console.log("RES",resId)
                        setCurrentResultId(state => {
                            return {
                                ...state,
                                [id]:resId
                            }
                        })
                    }
                    setShowQuiz(state => [...state, {
                        id: id,
                        show: (!resId)
                    }])
                }
                if (qShow && qShow.show){
                    return (<Quiz id={id} showQuiz={handleChildComp}/>)
                }

                if (currentResultId[id] ){
                    console.log(currentResultId[id])
                    return (<Box>
                        <Results id={currentResultId[id]} />
                        <Button
                            disabled={!hasMoreTries(id)}
                            onClick={(e) => {
                            const q = showQuiz ? showQuiz.find(val => val.id === id) : null
                            if (q){
                                setShowQuiz(state =>
                                    state.map(val => {
                                        if (val.id === id)
                                            return {...val, show:true}
                                        else return val
                                    })
                                )
                            }else{
                                setShowQuiz(state => [...state, {
                                    id: id,
                                    show:true
                                }])
                            }
                        }}>{hasMoreTries(id) ? "Again" : "More?"}</Button>
                    </Box>)
                }
                return (<Quiz id={id} showQuiz={handleChildComp}/>)
            case "lecture":
                return (<Lecture id={id}/>)
            case "video":
                return (<VideoView id={id}/>)
            default:
                return (<Typography>Default</Typography>)
        }
    }

    const hasMoreTries = (id) => {
        const quiz = courseProgression.quiz.find(val => val.id===id)
        return (quiz && (quiz.results.length < quiz.totalTriesNo))
    }

    return (
        <div>
            {courseProgression && courseData ? (<Box>
                <Pagination
                    count={courseData.steps.length}
                    variant={"outlined"}
                    shape={"rounded"}
                    page={stepIndex + 1}
                    showFirstButton
                    showLastButton
                    onChange={handleStepChange}
                />
                <Box>
                    {courseData.steps[stepIndex] ? renderData()
                        : (<Typography>No data</Typography>)}
                    <Button onClick={handleStepChange}>Next step</Button>
                </Box>
            </Box>) : (<Typography>No data </Typography>)}
        </div>)
}

const mapStateToProps = (state) => {
    const { user } = state.currentUser
    return { user }
}

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default connect(mapStateToProps)(CourseView)