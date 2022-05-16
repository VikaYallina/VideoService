import React, {useEffect, useState} from 'react'
import {Box, Card, CardActionArea, CardHeader, Typography} from "@mui/material";
import httpCommon from "../../http-common";

const CourseStepView = (props) => {
    const [course, setCourse] = useState({})
    const { id } = props.match.params

    useEffect(() => {
        httpCommon.get(`/api/course/${id}`)
            .then(res => {
                setCourse(res.data)
            })
            .catch(err => console.log(err))

    })

    const getSubheader = (step) => {
        let str = `Type: ${step.type}`
        return str
    }

    return(
        <Box>
            <Typography variant={"h5"}>{course.title ? course.title : "Без названия"}</Typography>
            <Typography variant={"subtitle1"}>{course.desc ? course.desc : "Описание отсутствует"}</Typography>
            <Box>
                {course.steps ? course.steps.map((step, index) => (
                        <Card key={index}>
                            <CardActionArea onClick={() => {
                                switch (step.type) {
                                    case "quiz":
                                        props.history.push(`/quiz/${step.id}`)
                                        return
                                    case "lecture":
                                        props.history.push(`/lect/${step.id}`)
                                        return
                                    case "video":
                                        props.history.push(`/video/${step.id}`)
                                        return
                                    default:
                                        return
                                }
                            }}>
                                <CardHeader
                                    title={`${index+1}. ${step.title}`}
                                    subheader={getSubheader(step)}
                                />
                            </CardActionArea>
                        </Card>
                    )) :
                    (<Typography variant={"h6"}>Без данных</Typography>)
                }
            </Box>
        </Box>
    )
}

export default CourseStepView