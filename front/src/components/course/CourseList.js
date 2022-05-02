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
import CourseCard from "./CourseCard";

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
        // if (chosenCourses.length === 0){
        //     setChosenCourses(props.parentData)
        // }
    },[props])

    return (
        <Box sx={{ display:'flex' }}>
            {(courseList && courseList.length > 0) ?
                courseList.map((val, index) => (
                    <CourseCard course={val} isInChooser={false} />
                    // <Card key={val.id} sx={{ display: 'flex' }}>
                    //     <CardActionArea onClick={() => props.history.push(`/course/${val.id}`)}>
                    //         <CardHeader
                    //             title={val.title ? val.title : "Без названия"}
                    //             titleTypographyProps={val.title ? {} : {color: "lightgray"}}
                    //         />
                    //         <CardContent>
                    //             <Typography variant={"subtitle1"}>{val.desc ? val.desc : "Описание отсутсвует"}</Typography>
                    //         </CardContent>
                    //     </CardActionArea>
                    //
                    //     {props.showChooserAction ?
                    //         (<CardActions>
                    //             <Checkbox
                    //                 checked={chosenCourses[index] ? chosenCourses[index].checked : false}
                    //                 onChange={() => {
                    //                     setChosenCourses(arr => {
                    //                         let copy = [...arr]
                    //                         copy[index].checked = !arr[index].checked
                    //                         return copy
                    //                     })
                    //                 }}
                    //                 color="success"
                    //             />
                    //         </CardActions>)
                    //         :
                    //         (<CardActions>
                    //             <IconButton onClick={(e) => {
                    //                 props.history.push(`/course/edit/${val.id}`)
                    //             }}><EditIcon/></IconButton>
                    //             <IconButton onClick={(e) => {
                    //                 // dispatch(removeLecture(course.id))
                    //             }}><DeleteIcon/></IconButton>
                    //         </CardActions>)
                    //         }
                    // </Card>
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