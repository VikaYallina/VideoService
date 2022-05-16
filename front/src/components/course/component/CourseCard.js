import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid,
    IconButton, Rating,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {history} from "../../../helpers/history";
import httpCommon from "../../../http-common";

const CourseCard = (props) => {
    const [propValue, setPropValue] = useState(props)
    const [openDialog, setOpenDialog] = useState(false)
    const [reviewData, setReviewData] = useState([])

    useEffect(()=>{
        httpCommon.get(`/api/review?course=${props.course.id}`)
            .then(res => {
                const reviewData = res.data
                setReviewData(reviewData)
            })
            .catch(err => console.log(err))
        setPropValue(props)
    },[props])

    const handleDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Card >
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
                    <Button onClick={() => {setOpenDialog(true)}}>Show reviews</Button>
                </CardActions>)
            }

            <ReviewDialog open={openDialog} handleDialog={handleDialog} reviewData={reviewData} />
        </Card>
    )
}

const ReviewDialog = (props) => {
    const {open, handleDialog, reviewData} = props
    // const [reviewData, setReviewData] = useState([])

    // useEffect(() => {
    //     if (open){
    //         httpCommon.get(`/api/review?course=${courseId}`)
    //             .then(res => {
    //                 const reviewData = res.data
    //                 setReviewData(reviewData)
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }, [open])

    const getName = (empl) => {
        return `${empl.lastname} ${empl.firstname} ${empl.middlename}`
    }

    const handleClose = () => {
        handleDialog()
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"paper"}
            maxWidth={"sm"}
            fullWidth
        >
            <DialogTitle>Отзывы</DialogTitle>
            <DialogContent dividers={true} sx={{backgroundColor:"#eaeff1"}}>
                <Grid container>
                    {reviewData.length !== 0 ?
                        reviewData.map((value, index) => (
                            <Card key={index} >
                                <CardHeader
                                    title={getName(value.employee)}
                                    avatar={<Avatar aria-label="recipe">
                                        R
                                    </Avatar>}
                                    subheader={<Rating
                                        size={"small"}
                                        value={value.rating || 0}
                                        readOnly
                                    />}
                                />
                                <Divider/>
                                <CardContent>
                                    <Typography variant="body1" color="text.primary">
                                        {value.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )) :
                        (<Typography>No data</Typography>)
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
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