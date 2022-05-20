import React, {useEffect, useState} from "react";
import { Card, ListGroup} from "react-bootstrap";
import {Button, Divider, Pagination, PaginationItem} from "@mui/material";
import Question from "./Question";
import {connect, useDispatch, useSelector} from "react-redux";
import shuffle from "../../helpers/utils";
import {Link} from "react-router-dom";
import {addResult} from "../../actions/result.action";
import QuizService from "../../services/quiz.service";


const Quiz = (props) => {
    // TODO: change
    // const quiz = initState[0]

    // TODO: check if questionList is undefined

    // TODO: add question complete(green colored) in pagination when q is answered

    // TODO: save state on refresh

    // TODO: check if all answers were given
    const user = useSelector(state => state.currentUser)

    // const questionsList = useSelector(state => state.quiz).find(q => q.id === id).questions
    const [questionsList, setQuestionsList] = useState(
        props.quiz ? props.quiz.questions : [{
        id: 1,
        Qtext: "",
        type: "single",
        correct: [],
        wrong: [],
        weight: 1
    }])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questionsList[currentIndex])
    const [points_borderline, setPointsBorderline] = useState(0)


    const [options, setOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [optionActive, setOptionActive] = useState([]);

    const [results, setResults] = useState([])

    const [onInit, setOnInit] = useState(true)
    const [propsValue, setPropsValue] = useState(props)
    // console.log(optionActive)

    const dispatch = useDispatch()
    // const qPagination = () => {
    //     let items = []
    //     for (let i = 0; i < questionsList.length; i++) {
    //         items.push(
    //             <PaginationItem key={i} id={i} active={i === currentIndex} onClick={handleNextQ}>
    //                 {i + 1}
    //             </PaginationItem>)
    //     }
    //     return items
    // }

    useEffect(() => {
        fetchData(propsValue)
    }, [])

    const fetchData = (p) => {
        console.log("START EFFECT 1")
        if (p.quiz) {
            setQuestionsList(p.quiz.questions)
            setCurrentQuestion(p.quiz.questions[0])
            setOnInit(false)
            setPointsBorderline(p.quiz.points_borderline)
        } else {
            if (p.id) {
                QuizService.get(p.id).then(res => {
                    console.log("AXIOS")
                    setPointsBorderline(res.data.points_borderline)
                    setQuestionsList(res.data.questions)
                    setCurrentQuestion(res.data.questions[0])
                    setOnInit(false)
                })
                    .catch(err => {
                        console.log(err)
                        // props.history.push("/quiz")
                    })
            } else {
                // props.history.push("/quiz")
            }
        }
        setCurrentIndex(0)
        console.log("EFFECT STOP 1")
    }
    useEffect(() => {
        setPropsValue(props)
        fetchData(props)
    },[props])

    useEffect(() => {
        console.log("RANDOM START")
        if (!results[currentIndex] || onInit) {
            randomizeOptions()
        }
    }, [currentQuestion])

    const randomizeOptions = () => {
        let wrong_answers = [...currentQuestion.wrong]
        let correct_answers = [...currentQuestion.correct]
        let answers = wrong_answers.concat(correct_answers)
        console.log(currentQuestion)
        console.log(answers)
        shuffle(answers)
        setOptions(answers)
        setOptionActive(new Array(answers.length).fill(false))
    }

    useEffect(() => {
            console.log("SAVE RES")
            saveRes()
        },
        [options, optionActive, selectedOptions])

    useEffect(() => {
        console.log("INDEX CHANGE")
        setCurrentQuestion(questionsList[currentIndex])
        if (results[currentIndex]) {
            setOptions(results[currentIndex].options)
            setOptionActive(results[currentIndex].selected)
        } else {
            setSelectedOptions([])
        }
    }, [currentIndex])



    const handleOptionChoose = event => {
        const index = parseInt(event.target.id)

        switch (currentQuestion.type) {
            case "single":
                setSelectedOptions([event.target.value])
                setOptionActive(arr => {
                    arr.fill(false)
                    arr[index] = true
                    return arr
                })
                break;
            case "multi":
                setSelectedOptions(arr => {
                    if (!arr.includes(event.target.value)) {
                        let copy = [...arr]
                        copy.push(event.target.value)
                        return copy
                    } else return arr
                })
                setOptionActive(arr => {
                    let copy = [...arr]
                    copy[index] = !copy[index]
                    return copy
                })
                break;
            default:
                setSelectedOptions([event.target.value])
                break;
        }

        // saveRes()
    }

    const saveRes = () => {
        let answers = []
        optionActive.forEach((val, i) => {
            if (val){
                answers.push(options[i])
            }
        })
        const res = {
            qId: currentQuestion.id,
            options: options,
            selected: optionActive,
            answers
        }
        console.log(res)
        setResults(arr => {
            let copy = [...arr]
            copy[currentIndex] = res
            return copy
        })
    }


    const handleNextQ = (event, value) => {
        let index = parseInt(value) - 1

        // saveRes()

        if (!Number.isNaN(index)) {
            // setCurrentQuestion(questionsList[index])
            setCurrentIndex(index)
        } else {
            let index_ = parseInt(currentIndex) + 1
            if (index_ >= questionsList.length)
                index_ = 0
            setCurrentIndex(index_)
            // setCurrentQuestion(questionsList[index])
        }


    }

    const calculateRes = () => {
        let total = 0;
        let correct = 0;
        let res_list = []
        for (let i = 0; i < questionsList.length; i++) {
            const q = questionsList[i]
            total += q.weight
            let result = results.find(({qId}) => qId === q.id)
            if (results[i]) {
                let curr_correct = 0
                switch (q.type) {
                    case "single":
                        curr_correct = areEqual(result.answers, q.correct) ? q.weight : 0
                        break
                    case "multi":
                        result.answers.forEach(ans => {
                            console.log(ans)
                            console.log(q.correct.length)
                            console.log(q.weight / q.correct.length)
                            curr_correct += q.correct.includes(ans) ? q.weight / q.correct.length : 0
                        })
                        break
                    default:
                        break
                }
                res_list.push({
                    question: q,
                    selected: result,
                    correct: curr_correct
                })
                correct += curr_correct
            }
        }
        return {total, correct, res: res_list}
    }

    const  areEqual = (array1, array2) => {
        if (array1.length === array2.length) {
            return array1.every(element => {
                if (array2.includes(element)) {
                    return true;
                }

                return false;
            });
        }

        return false;
    }


    const handleResult = (event) => {
        saveRes()
        const {total, correct, res} = calculateRes()
        const payload = {
            quizId: propsValue.id,
            userId: user.id,
            total,
            correct,
            result: res
        }
        console.log("RESULTS", payload)
        dispatch(addResult(payload))
            .then(response => {
                if (typeof propsValue.showQuiz === "function" ) {propsValue.showQuiz({
                    id: propsValue.id,
                    result: response,
                    show:false,
                    points_borderline
                })}
                else {
                    propsValue.history.push(`/kb`)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            {questionsList ? (<Card>
                <Card.Header>
                    <Pagination count={questionsList.length} page={currentIndex + 1} onChange={handleNextQ}>
                        {/*{qPagination()}*/}
                    </Pagination>
                </Card.Header>
                <Card.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>{currentQuestion.Qtext ? currentQuestion.Qtext : "No data"}</Card.Title>
                            <ListGroup>
                                {options.map(((value, index) => (
                                    <ListGroup.Item id={index}
                                                    action variant={optionActive[index] ? "success" : ""}
                                                    key={index} onClick={handleOptionChoose}
                                                    value={value}>{value}</ListGroup.Item>
                                )))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Card.Body>
                <Divider/>
                <Card.Body>
                    <Button onClick={handleNextQ}>Следующий</Button>
                    <Button onClick={handleResult}>Завершить тест</Button>
                </Card.Body>
            </Card>) : (<h3>Loading</h3>)}
        </div>
    )
}

// TODO: add loading

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.id ? ownProps.id : ownProps.match.params.id
    id = parseInt(id)
    const quiz = state.quiz.find(q => q.id === id)
    console.log(quiz, id)
    return {
        quiz: quiz,
        id: id
    }
}

export default connect(mapStateToProps)(Quiz)