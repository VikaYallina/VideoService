import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LectureCard from "../../lecture/component/LectureCard";
import {Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {removeQuiz} from "../../../actions/quiz.action";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {history} from "../../../helpers/history";
import AddIcon from '@mui/icons-material/Add';

const QuizCard = (props) => {

    const [propValue, setPropValue] = useState(props)

    useEffect(() => {
        setPropValue(props)
    },[props])

    const dispatch = useDispatch()


    return(
        <Card key={propValue.quiz.id} >
            <CardActionArea onClick={(e) => {
                // history.push(`/quiz/${propValue.quiz.id}`)
                window.open(`/quiz/${propValue.quiz.id}`, "_blank");
            }}>
                <CardHeader title={propValue.quiz.title ? propValue.quiz.title : "Без названия"}
                            titleTypographyProps={propValue.quiz.title ? {} : {color: "lightgray"}}/>
                <CardContent>
                    <Typography variant={"subtitle1"}>{propValue.quiz.desc ? propValue.quiz.desc : "Описание отсутсвует"}</Typography>
                </CardContent>
            </CardActionArea>
            {propValue.showActions ? (
                <CardActions>
                    <IconButton onClick={(e) => {
                        history.push(`/quiz/edit/${propValue.quiz.id}`)
                    }}><EditIcon/></IconButton>
                    <IconButton onClick={(e) => {
                        dispatch(removeQuiz(propValue.quiz.id))
                    }}><DeleteIcon/></IconButton>
                </CardActions>
            ) : (
                <CardActions>
                    <IconButton onClick={() => {
                        const data = {
                            id:propValue.quiz.id,
                            type:"quiz",
                            title: propValue.quiz.title,
                            desc: propValue.quiz.desc
                        }
                        props.getChildData(data)
                    }}>
                        <AddIcon/>
                    </IconButton>
                </CardActions>
            )}
        </Card>
    )
}

QuizCard.propTypes ={
    quiz: PropTypes.object.isRequired,
    showActions: PropTypes.bool.isRequired,
    getChildData:PropTypes.func
}

export default QuizCard