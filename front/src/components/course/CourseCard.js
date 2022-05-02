import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    IconButton,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {history} from "../../helpers/history";

const CourseCard = (props) => {
    const [propValue, setPropValue] = useState(props)

    useEffect(()=>{
        setPropValue(props)
    },[props])

    return (
        <Card key={propValue.course.id} sx={{ display: 'flex' }}>
            <CardActionArea
                onClick={() => history.push(`/course/${propValue.course.id}`)}
            >
                <CardHeader
                    title={propValue.course.title ? propValue.course.title : "Без названия"}
                    titleTypographyProps={propValue.course.title ? {} : {color: "lightgray"}}
                />
                <CardContent>
                    <Typography variant={"subtitle1"}>
                        {propValue.course.desc ? propValue.course.desc : "Описание отсутсвует"}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {propValue.isInChooser ?
                (<CardActions>
                    <Checkbox
                        checked={propValue.isChecked || false}
                        onChange={() => {
                            props.sendDataToParent({
                                index: propValue.index,
                                checked: !propValue.isChecked
                            })
                        }}
                        color="success"
                    />
                </CardActions>)
                :
                (<CardActions>
                    <IconButton onClick={(e) => {
                        history.push(`/course/${propValue.course.id}/edit`)
                    }}><EditIcon/></IconButton>
                    <IconButton onClick={(e) => {
                        // dispatch(removeLecture(course.id))
                    }}><DeleteIcon/></IconButton>
                </CardActions>)
            }
        </Card>
    )
}

CourseCard.propTypes = {
    course: PropTypes.object.isRequired,
    sendDataToParent: PropTypes.func,
    isInChooser: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool,
    index: PropTypes.number
}

export default CourseCard