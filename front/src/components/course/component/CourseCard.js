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
                        httpCommon.delete(`/api/course/${propValue.course.id}`)
                            .then(() => document.location.reload(true))
                            .catch((err) => console.log(err.response.data))
                    }}><DeleteIcon/></IconButton>
                    <Button onClick={() => {setOpenDialog(true)}}>Отзывы</Button>
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
                <Grid container direction={"column"} spacing={2}>
                    {reviewData.length !== 0 ?
                        reviewData.map((value, index) => (
                            <Grid item key={index} xs={12}>
                                <Card >
                                    <CardHeader
                                        title={getName(value.employee)}
                                        avatar={<Avatar aria-label="recipe">
                                            {value.employee.lastname.charAt(0)}
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
                            </Grid>
                        )) :
                        (<Typography>Данные отсутствуют</Typography>)
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
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