import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent, CardHeader, Checkbox,
    Container,
    Divider, IconButton,
    Input,
    List,
    ListItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {connect, useDispatch} from "react-redux";
import {millis2time, time2millis} from "../../helpers/utils";
import {retrieveAllQuiz, updateQuiz} from "../../actions/quiz.action";
import QuizService from "../../services/quiz.service";

const EditQuiz = (props) => {
    const [quizTitle, setQuizTitle] = useState("Hello")
    const [description, setDescription] = useState("")
    const [timeLimit, setTimeLimit] = useState()

    const [questionList, setQuestionList] = useState([])
    const [inputToggle, setInputToggle] = useState([])
    const [currentInput, setCurrentInput] = useState({text: "", qi: 0, oi: 0})
    const [completeInput, setCompleteInput] = useState(false)

    const dispatch = useDispatch()


    useEffect(()=>{
        let q = null
        if (props.quiz){
            q = props.quiz
        }else {
            if (props.id){
                dispatch(retrieveAllQuiz())
                    .then(res => q = res.find(val => val.id === props.id))
                    .catch(err => props.history.push("/quiz"))
            }else {
                props.history.push("/quiz")
            }
        }
        setQuizTitle(q.title)
        setDescription(q.desc)

        if (q.time_limit){
            setTimeLimit(millis2time(q.time_limit))
        }

        if (q.questions){
            const qList = []
            q.questions.forEach((q_, i) => {
                const options = []
                q_.correct.forEach(val => options.push({
                    option:val,
                    correct:true
                }))
                q_.wrong.forEach(val => options.push({
                    option:val,
                    correct: false
                }))
                const val = {
                    id: (q_.id ? q_.id : null),
                    Qtext: q_.Qtext,
                    options:options,
                    weight: q_.weight
                }
                qList.push(val)
            })
            setQuestionList(qList)
        }
    },[])


    useEffect(() => {
        console.log(questionList)
        console.log(timeLimit)
    }, [questionList])

    useEffect(() => {
        if (completeInput) {
            setQuestionList(list => {
                const copy = [...list]
                copy[currentInput.qi].options[currentInput.oi].option = currentInput.text
                return copy
            })
        }
        setCompleteInput(false)
    }, [completeInput, currentInput])

    const onChangeTitle = (event) => {
        const _quizTitle = event.target.value
        setQuizTitle(_quizTitle)
    }

    const onChangeTimeLimit = (event) => {
        const _timeLimit = event.target.value
        setTimeLimit(_timeLimit)
    }

    const onChangeDescription = (event) => {
        const _description = event.target.value
        setDescription(_description)
    }

    const handleSaveChanges = (event) => {
        // TODO: add validation
        const val = {
            title: quizTitle,
            desc: description,
            time_limit: time2millis(timeLimit),
            questions: questionList ?
                questionList.map(q => {
                    let corr = []
                    let wr = []
                    q.options.forEach(op => {
                        op.correct ? corr.push(op.option) : wr.push(op.option)
                    })
                    const type = corr.length > 1 ? "single" : "multi"
                    return {
                        id: q.id,
                        Qtext: q.Qtext,
                        type,
                        correct: corr,
                        wrong: wr,
                        weight: q.weight
                    }
                })
                : []
        }
        console.log(val)
        dispatch(updateQuiz(props.quiz.id, val))
            .then(() => props.history.push("/quiz"))
            .catch(err => alert(err))
    }

    const renderCards = () => {
        const questionItems = []
        questionList.forEach((q, index) => {
            questionItems.push(
                <Card key={index}>
                    <CardHeader action={
                        <IconButton onClick={(e)=>{
                            setQuestionList(arr=> {return arr.filter((val,i) => i!==index)})
                        }}>
                            <RemoveIcon/>
                        </IconButton>}
                                title={
                                    <Stack
                                        direction={"row"}
                                        alignItems={"baseline"}
                                        spacing={2}>
                                        <Typography>{index + 1}.</Typography>
                                        <TextField label="Вопрос"
                                                   variant={"standard"}
                                                   size={"medium"}
                                                   value={questionList[index].Qtext ||''}
                                                   onChange={(e) => {
                                                       const val = e.target.value
                                                       setQuestionList(list => {
                                                           const copy = [...list]
                                                           copy[index].Qtext = val
                                                           return copy
                                                       })
                                                   }}
                                        />
                                        <TextField label="Вес"
                                                   variant={"standard"}
                                                   size={"medium"}
                                                   value={questionList[index].weight || ''}
                                                   InputProps={{
                                                       inputProps: {
                                                           type: "number", step:1, min:1, max:100, pattern: '[0-9]*'
                                                       }
                                                   }}
                                                   onChange={(e) => {
                                                       let val = parseInt(e.target.value)
                                                       if (val > 100) val = 100
                                                       if (val < 0) val = 0

                                                       setQuestionList(list => {
                                                           const copy = [...list]
                                                           copy[index].weight = val
                                                           return copy
                                                       })
                                                   }}
                                        />

                                    </Stack>}/>
                    <CardContent>

                        <List>
                            {renderOptionsList(q.options, index)}
                            <Button
                                fullWidth
                                onClick={(e) => {
                                    setQuestionList(list => {
                                        const copy = [...list]
                                        copy[index].options.push({option: "", correct: false})
                                        return copy
                                    })
                                }}>
                                <AddIcon/>
                            </Button>
                        </List>
                    </CardContent>
                </Card>)
        })

        return questionItems
    }

    const renderOptionsList = (options, index) => {
        const items = []

        for (let i = 0; i < options.length; i++) {
            items.push(<ListItem alignItems="center" key={i}>
                <Checkbox
                    checked={questionList[index].options[i].correct}
                    onChange={(e) => {
                        setQuestionList(list => {
                            const copy = [...list]
                            copy[index].options[i].correct = !copy[index].options[i].correct
                            return copy
                        })
                    }}
                    inputProps={{"aria-label": "primary checkbox"}}
                />
                <TextField
                    size="small"
                    fullWidth
                    label="disable when checkbox checked"
                    value={questionList[index].options[i].option || ''}
                    onChange={(e) => {
                        setQuestionList(list => {
                            const copy = [...list]
                            copy[index].options[i].option = e.target.value
                            return copy
                        })
                    }}
                />
            </ListItem>)
        }
        return items;
    }


    const handleAddQuestion = () => {
        setQuestionList(list => {
            const val = {Qtext: "", options: []}
            return [...list, val]
        })
        setInputToggle(arr => {
            return [...arr, false]
        })
    }


    return (
        <Stack
            spacing={2}
            direction="column"
            divider={<Divider orientation="horizontal" flexItem/>}
        >
            <Stack direction="row" spacing={2} justifyContent="space-around">
                <TextField
                    required
                    id="quizTitle"
                    label="quiz title"
                    value={quizTitle || ''}
                    onChange={onChangeTitle}
                />
                <TextField
                    label="time limit"
                    value={timeLimit || ''}
                    onChange={onChangeTimeLimit}
                    name="timeformat"
                    id="formatted-timeformat-input"
                    InputProps={{
                        inputComponent: TimeFormatCustom,
                    }}
                />
                <Button onClick={handleSaveChanges}>Save</Button>
            </Stack>
            <TextField
                id="description"
                label="description"
                value={description || ''}
                onChange={onChangeDescription}
            />
            <Stack direction="column" spacing={1}>
                {renderCards()}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddQuestion}>
                    <AddIcon/>
                </Button>
            </Stack>
        </Stack>
    )
}

const TimeFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format="##:##"
            placeholder="мм:сс"
            mask='_'
            isNumericString
        />
    );
});

TimeFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) =>{
    let {id} = ownProps.match.params
    id = parseInt(id)
    const quiz = state.quiz.find(q => q.id === id)
    return {quiz: quiz,
            id: id}
}

export default connect(mapStateToProps)(EditQuiz)