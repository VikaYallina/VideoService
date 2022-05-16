import React, {useEffect, useState} from 'react'
import {Box, Button, Step, StepButton, Stepper, Typography} from "@mui/material";
import CourseList from "./CourseList";
import CourseChooseEmployee from "./CourseChooseEmployee";
import httpCommon from "../../http-common";
import CourseCard from "./component/CourseCard";
import {connect} from "react-redux";

const steps = ['Select campaign settings', 'Create an ad group'];

const CourseChooser = (props) => {

    const { auth } = props

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [employeeList, setEmployeeList] = useState([])
    const [chosenEmpl, setChosenEmpl] = useState([])
    const [courseList, setCourseList] = useState([])

    useEffect( () => {
        httpCommon.get(`/api/employee/dept/${auth.user.employeeId}`)
            .then((res) => {
                let data = res.data ? res.data : null
                data && data.forEach(val => {
                    httpCommon.get(`/api/employee?department=${val.id}`)
                        .then(r => {
                            r.data && setEmployeeList(list => list.concat(r.data))
                        })
                })
            })
            .catch(err => console.log(err.message))

        httpCommon.get("/api/course")
            .then(res => {
                setCourseList(res.data)
                setChosenCourses(() => {
                    let arr = new Array(res.data.length)
                    res.data.forEach((val, i) => {
                        arr[i] = {
                            course: val,
                            checked: false
                        }
                    })
                    console.log("ARR",arr)
                    return arr
                })
            })
            .catch(err => console.log(err))
    },[])

    const handleSaveChosenEmpl = (data) => {
        setChosenEmpl(data)
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const [chosenCourses, setChosenCourses] = useState([])

    const handleChosenCourses = (data) => {
        setChosenCourses(arr => {
            const copy = [...arr]
            copy[data.index].checked = data.checked
            return copy
        })
        console.log("GOT ID")
    }

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                // return <CourseList showChooserAction={true} courseList={courseList} parentData={chosenCourses} sendDataToParent={handleChosenCourses} />
                return <Box>
                    {
                        chosenCourses ?
                            (chosenCourses.map((data, index) => (
                                <CourseCard
                                    key={index}
                                    course={data.course}
                                    isInChooser={true}
                                    index={index}
                                    isChecked={data.checked}
                                    sendDataToParent={handleChosenCourses}
                                />
                            )))
                            :
                            (<Typography>No</Typography>)
                    }
                </Box>
            case 1:
                return <CourseChooseEmployee chosenEmpl={chosenEmpl} employeeData={employeeList} saveEmployeeData={handleSaveChosenEmpl}/>
            default:
                return <Typography>No data</Typography>
        }
    }

    const formIsValid = () => {
        return true
    }

    const generateResult = (courseData) => {
        const video = []
        const lecture = []
        const quiz = []

        courseData.course.steps && courseData.course.steps.forEach((val, i) => {
            switch (val.type) {
                case "quiz":
                    quiz.push({
                        id: val.id,
                        stepIndex: i,
                        completed: false,
                        bestResult:0,
                        bestResultId:null,
                        total:null,
                        totalTriesNo:val.totalTries ? val.totalTries : 1,
                        results:[]
                    })
                    break
                case "lecture":
                    lecture.push({
                        id:val.id,
                        stepIndex: i,
                        completed: false
                    })
                    break
                case "video":
                    video.push({
                        id:val.id,
                        stepIndex: i,
                        completed: false
                    })
                    break
                default:
                    break;
            }
        })

        let result = {
            employeeId: null,
            courseId: courseData.course.id,
            completionRate:0.0,
            completed: new Array(courseData.course.steps.length).fill(false),
            status:"NOT_STARTED",
            quiz: quiz,
            video: video,
            lecture: lecture
        }

        return result
    }

    useEffect(() => {
        console.log("CHOSEN ONE",chosenCourses)
    }, [chosenCourses])

    const saveChanges = () => {
        if (formIsValid()){
            const resultSend = []
            let chosen = chosenCourses.filter(val => val.checked)

            chosen.forEach((course) => {
                let res = generateResult(course)
                for (let i=0; i<chosenEmpl.length; i++){
                    resultSend.push({...res, employeeId: chosenEmpl[i]})
                }
            })
            console.log(resultSend)

            httpCommon.post(`/api/courseprog/`,resultSend)
                .then(() => {
                    props.history.push("/course")
                })
                .catch(err => {
                    console.log(err)
                })
        }else {

        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ?
                    saveChanges()
                    // <React.Fragment>
                    //     <Typography sx={{ mt: 2, mb: 1 }}>
                    //         All steps completed - you&apos;re finished
                    //     </Typography>
                    //     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    //         <Box sx={{ flex: '1 1 auto' }} />
                    //         <Button onClick={handleReset}>Reset</Button>
                    //     </Box>
                    // </React.Fragment>
                 : (
                    <React.Fragment>
                        <Box>
                            {renderStep()}
                        </Box>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const auth = state.currentUser
    return {auth}
}

export default connect(mapStateToProps)(CourseChooser)