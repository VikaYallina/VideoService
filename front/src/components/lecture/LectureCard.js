import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {removeLecture} from "../../actions/lecture.action";
import DeleteIcon from "@mui/icons-material/Delete";
import {history} from "../../helpers/history";
import {removeQuiz} from "../../actions/quiz.action";
import AddIcon from "@mui/icons-material/Add";

const LectureCard = (props) => {
    const [propValue, setPropValue] = useState(props)

    useEffect(() => {
        setPropValue(props)
    },[props])

    const dispatch = useDispatch()

    return(
        <Card key={propValue.lecture.id}>
            <CardActionArea onClick={(e) => {
                window.open(`/lect/${propValue.lecture.id}`, "_blank");
            }}>
                <CardHeader
                    title={propValue.lecture.title ? propValue.lecture.title : "Без названия"}
                    titleTypographyProps={propValue.lecture.title ? {} : {color: "lightgray"}}
                />
                <CardContent>
                    <Typography variant={"subtitle1"}>{propValue.lecture.desc ? propValue.lecture.desc : "Описание отсутсвует"}</Typography>
                </CardContent>
            </CardActionArea>
            {propValue.showActions ? (
                <CardActions>
                    <IconButton onClick={(e) => {
                        history.push(`/lect/edit/${propValue.lecture.id}`)
                    }}><EditIcon/></IconButton>
                    <IconButton onClick={(e) => {
                        dispatch(removeLecture(propValue.lecture.id))
                    }}><DeleteIcon/></IconButton>
                </CardActions>
            ) : (
                <CardActions>
                    <IconButton onClick={() => {
                        const data = {
                            id:propValue.lecture.id,
                            type:"lecture",
                            title: propValue.lecture.title,
                            desc: propValue.lecture.desc
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

LectureCard.propTypes ={
    lecture: PropTypes.object.isRequired,
    showActions: PropTypes.bool.isRequired,
    getChildData: PropTypes.func
}

export default LectureCard