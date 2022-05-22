import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card, CardActions,
    CardContent, CardHeader, Checkbox,
    Divider, Grid, IconButton,
    List,
    ListItem, Paper,
    Stack, styled,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {connect, useDispatch} from "react-redux";
import {millis2time, time2millis} from "../../helpers/utils";
import {retrieveAllQuiz, updateQuiz} from "../../actions/quiz.action";
import QuizService from "../../services/quiz.service";

const EditQuiz = (props) => {
    const [quizTitle, setQuizTitle] = useState("")
    const [description, setDescription] = useState("")
    const [pointsBorder, setPointsBorder] = useState(0)

    const [questionList, setQuestionList] = useState([])
    const [inputToggle, setInputToggle] = useState([])
    const [currentInput, setCurrentInput] = useState({text: "", qi: 0, oi: 0})
    const [completeInput, setCompleteInput] = useState(false)

    const dispatch = useDispatch()


    useEffect(() => {
        let q = null
        if (props.quiz) {
            q = props.quiz
        } else {
            if (props.id) {
                dispatch(retrieveAllQuiz())
                    .then(res => q = res.find(val => val.id === props.id))
                    .catch(err => props.history.push("/kb"))
            } else {
                props.history.push("/kb")
            }
        }
        (q && q.title) && setQuizTitle(q.title);
        (q && q.desc) && setDescription(q.desc)

        if (q && q.points_borderline) {
            setPointsBorder(q.points_borderline)
        }

        if (q && q.questions) {
            const qList = []
            q.questions.forEach((q_, i) => {
                const options = []
                q_.correct.forEach(val => options.push({
                    option: val,
                    correct: true
                }))
                q_.wrong.forEach(val => options.push({
                    option: val,
                    correct: false
                }))
                const val = {
                    id: (q_.id ? q_.id : null),
                    Qtext: q_.Qtext,
                    options: options,
                    weight: q_.weight
                }
                qList.push(val)
            })
            setQuestionList(qList)
        }
    }, [])


    useEffect(() => {
        console.log(questionList)
        console.log(pointsBorder)
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

    const onChangePointsBorder = (event) => {
        const pb = event.target.value
        setPointsBorder(pb)
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
            points_borderline: pointsBorder,
            questions: questionList ?
                questionList.map(q => {
                    let corr = []
                    let wr = []
                    q.options.forEach(op => {
                        op.correct ? corr.push(op.option) : wr.push(op.option)
                    })
                    const type = corr.length > 1 ? "multi" : "single"
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
            .then(() => props.history.push("/kb"))
            .catch(err => alert(err))
    }

    const renderCards = () => {
        const questionItems = []
        questionList.forEach((q, index) => {
            questionItems.push(
                <Box key={index} borderRadius={1} border={2} borderColor={"#009be5"}>
                    <Card elevation={0}>
                        <CardHeader action={
                            <IconButton onClick={(e) => {
                                setQuestionList(arr => {
                                    return arr.filter((val, i) => i !== index)
                                })
                            }}>
                                <ClearIcon/>
                            </IconButton>}
                                    title={
                                        <Grid container
                                            direction={"row"}
                                            alignItems={"center"}
                                              spacing={1}
                                            >
                                            <Grid item xs={1}>
                                                <Typography>{index + 1}.</Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <TextField label="Вопрос"
                                                           variant={"standard"}
                                                           fullWidth
                                                           size={"medium"}
                                                           value={questionList[index].Qtext || ''}
                                                           onChange={(e) => {
                                                               const val = e.target.value
                                                               setQuestionList(list => {
                                                                   const copy = [...list]
                                                                   copy[index].Qtext = val
                                                                   return copy
                                                               })
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField label="Вес"
                                                           variant={"standard"}
                                                           size={"medium"}
                                                           value={questionList[index].weight || ''}
                                                           InputProps={{
                                                               inputProps: {
                                                                   type: "number",
                                                                   step: 1,
                                                                   min: 1,
                                                                   max: 100,
                                                                   pattern: '[0-9]*'
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
                                            </Grid>

                                        </Grid>}/>
                        <CardContentNoPadding>
                            {renderOptionsList(q.options, index)}
                        </CardContentNoPadding>
                        <CardActions>
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
                        </CardActions>
                    </Card>
                </Box>)
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
                    label="Вариант ответа"
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
        return(<List>{items}</List>);
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
            padding={2}
            spacing={2}
            direction="column"
            divider={<Divider orientation="horizontal" flexItem/>}
            component={Paper}
        >
            <Stack direction="row" spacing={2} >
                <TextField
                    required
                    id="quizTitle"
                    label="Название"
                    value={quizTitle || ''}
                    onChange={onChangeTitle}
                />
                <Tooltip title={"Минимальное кол-во баллов необходимых для прохождения теста"}>
                    <TextField
                        label="Кол-во пограничных баллов"
                        value={pointsBorder || ''}
                        onChange={onChangePointsBorder}
                        name="points_border"
                        type={"number"}
                        id="formatted-timeformat-input"
                    />
                </Tooltip>
                <Button onClick={handleSaveChanges} variant={"contained"}>Сохранить</Button>
            </Stack>
            <TextField
                id="description"
                label="Описание"
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


const CardContentNoPadding = styled(CardContent)(`
  padding: 1;
  &:last-child {
    padding-bottom: 0;
  }
`);

const mapStateToProps = (state, ownProps) => {
    let {id} = ownProps.match.params
    id = parseInt(id)
    const quiz = state.quiz.find(q => q.id === id)
    return {quiz, id}
}

export default connect(mapStateToProps)(EditQuiz)