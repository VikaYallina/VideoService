import React, {useEffect, useState} from "react";
import httpCommon from "../../http-common";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    IconButton,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {removeLecture} from "../../actions/lecture.action";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CourseCard from "./component/CourseCard";
import {Masonry} from "@mui/lab";

const CourseList = (props) => {
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        httpCommon.get("/api/course")
            .then(res => {
                setCourseList(res.data)
            })
            .catch(err => console.log(err))

    }, [])


    useEffect(()=>{
        props.courseList && setCourseList(props.courseList)
    },[props])

    return (
        <Box >
            {(courseList && courseList.length > 0) ?
                courseList.map((val, index) => (
                    <CourseCard course={val} isInChooser={false} key={val.id} />
                ))
                : (<Typography variant={"h4"}>Записи отсутсвуют</Typography>)}
            { !props.showChooserAction && (
                <Button onClick={(e) => {
                    httpCommon.post("/api/course",{})
                        .then(res => {
                            props.history.push(`/course/${res.data.id}/edit`)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }}>New course</Button>
            )}
        </Box>
    )
}

CourseList.propTypes = {
    showChooserAction: PropTypes.bool,
    sendDataToParent: PropTypes.func,
    parentData: PropTypes.array,
    courseList: PropTypes.array
}



export default CourseList