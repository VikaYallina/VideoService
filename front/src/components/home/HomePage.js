import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, TextField,
    Typography,
    Rating
} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import {userIsAdmin, userIsBoss, userIsEmployee} from "../../helpers/utils";
import httpCommon from "../../http-common";
import PropTypes from "prop-types";
import {history} from "../../helpers/history";
import {retrieveCourseProg} from "../../actions/courseprog.action";


const adminData = [
    {
        title: "База Знаний",
        description: "Просмотреть Базу Знаний",
        img: "/homepage/books2.jpg",
        routerLink: "/kb"
    },
    {
        title: "Курсы",
        description: "Просмотреть курсы",
        img: "/homepage/table_computer.jpg",
        routerLink: "/course"
    },
    {
        title: "Пользователи",
        description: "Просмотреть и изменить список пользователей",
        img: "/homepage/employees2.jpg",
        routerLink: "/employees"
    }
]

const bossData = [
    {
        title: "База Знаний",
        description: "Просмотреть Базу Знаний",
        img: "/homepage/books3.jpg",
        routerLink: "/kb"
    },
    {
        title: "Курсы",
        description: "Назначить курсы сотрудникам отделов",
        img: "/homepage/study1.jpg",
        routerLink: "/course/choose"
    },
    {
        title: "Результат",
        description: "Просмотреть результаты сотрудников",
        img: "/homepage/result.jpg",
        routerLink: "/course/result"
    }
]

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color='black'>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

const HomePage = (props) => {
    const {user, courseList} = props
    // const [courseList, setCourseList] = useState([])
    const [openRatingDialog, setOpenRatingDialog] = useState({})

    const dispatch = useDispatch()
    // TODO: Employee id needs to be present
    useEffect(() => {
        if (userIsEmployee(user)) {
            dispatch(retrieveCourseProg(user.employeeId, null))
                .then(data => {
                    let openData = {}
                    data.forEach(val => {
                        openData[val.c_id] = false
                    })
                    setOpenRatingDialog(openData)
                })
                .catch(err => console.log(err.message))
            // httpCommon.get(`/api/courseprog?employee=${user.employeeId}`)
            //     .then(res => {
            //         const results = res.data
            //         setCourseList(results)
            //
            //         let openData = {}
            //         results.forEach(val => {
            //             openData[val.id] = false
            //         })
            //         setOpenRatingDialog(openData)
            //     })
            //     .catch(err => console.log(err))
        }

        console.log(userIsAdmin(user))
        console.log(userIsBoss(user))
        console.log(userIsEmployee(user))
    }, [])

    const handleDialog = (resId) => {
        setOpenRatingDialog(state => {
            let copy = {...state}
            copy[resId] = false
            return copy
        })
    }

    return (
        <Box>
            <Typography variant={"h3"}>Добро пожаловать</Typography>

            {userIsEmployee(user) && (<Box>
                <Typography>Im employee</Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {courseList ? courseList.map((val, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => {
                                            history.push(`/course/${val.courseData.id}`)
                                        }}
                                    >
                                        <CardHeader
                                            avatar={<CircularProgressWithLabel value={val.completionRate}/>}
                                            title={val.courseData ? val.courseData.title : "Без названия"}
                                            subheader={val.courseData.desc ? val.courseData.desc : "Описание отсутвует"}
                                        />
                                        {/*<CardContent>*/}
                                        {/*    <Typography variant="body2" color="text.secondary">*/}
                                        {/*        {val.courseData.desc ? val.courseData.desc : "Описание отсутвует"}*/}
                                        {/*    </Typography>*/}
                                        {/*</CardContent>*/}
                                    </CardActionArea>
                                    <CardActions>
                                        <Button onClick={() => {
                                            setOpenRatingDialog(state => {
                                                let copy = {...state}
                                                copy[val.c_id] = true
                                                return copy
                                            })
                                        }}>Оставить отзыв</Button>
                                        <RatingDialog
                                            open={openRatingDialog[val.c_id]}
                                            handleDialog={handleDialog}
                                            data={{
                                                resId: val.c_id,
                                                employeeId: user.employeeId,
                                                courseId: val.courseData.id
                                            }
                                            }/>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )) :
                        (<Typography>No data</Typography>)
                    }
                </Grid>
            </Box>)}

            {userIsBoss(user) && (<Box>
                <Typography>Im boss</Typography>
                <Grid container justifyContent={"center"} spacing={2}>
                    {bossData.map((value, index) => (
                        <Grid key={index} item xs={"auto"}>
                            <Card
                                sx={{
                                    height: 300,
                                    width: 230,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                            >
                                <CardActionArea onClick={() => {
                                    props.history.push(value.routerLink)
                                }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="200"
                                        image={value.img}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>)}

            {userIsAdmin(user) && (<Box>
                <Typography>Im admin</Typography>
                <Grid container justifyContent={"center"} spacing={3} alignItems="stretch">
                    {adminData.map((value, index) => (
                        <Grid key={index} item xs={"auto"}>
                            <Card
                                sx={{
                                    height: 300,
                                    width: 230,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                            >
                                <CardActionArea onClick={() => {
                                    props.history.push(value.routerLink)
                                }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="200"
                                        image={value.img}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>)}
        </Box>
    )
}

const RatingDialog = (props) => {
    const {open, handleDialog, data} = props
    const [review, setReview] = useState({})
    const [newReview, setNewReview] = useState(false)

    useEffect(() => {
        httpCommon.get(`/api/review?employee=${data.employeeId}&course=${data.courseId}`)
            .then(res => {
                const reviewData = res.data
                if (reviewData.length === 0) {
                    setNewReview(true)
                    setReview({
                        message: "",
                        rating: 0
                    })
                } else {
                    setNewReview(false)
                    setReview(reviewData[0])
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (open) {
            console.log("WE")
            httpCommon.get(`/api/review?employee=${data.employeeId}&course=${data.courseId}`)
                .then(res => {
                    const reviewData = res.data
                    if (reviewData.length === 0) {
                        setNewReview(true)
                        setReview({
                            message: "",
                            rating: 0
                        })
                    } else {
                        setNewReview(false)
                        setReview(reviewData[0])
                    }
                })
                .catch(err => console.log(err))
        }
    }, [open])

    const handleCloseSuccess = () => {
        console.log(newReview)
        newReview ?
            httpCommon.post("/api/review", {
                employeeId: data.employeeId,
                courseId: data.courseId,
                message: review.message,
                rating: review.rating
            })
                .then(() => handleDialog(data.resId))
                .catch(err => console.log(err))
            :
            httpCommon.put(`/api/review/${data.employeeId}/${data.courseId}`, {
                employeeId: data.employeeId,
                courseId: data.courseId,
                message: review.message,
                rating: review.rating
            })
                .then(() => handleDialog(data.resId))
                .catch(err => console.log(err))

    }

    const handleCloseCancel = () => {
        handleDialog(data.resId)
    }

    const handleChange = (event) => {
        let {name, value} = event.target
        if (name === "rating") {
            value = parseInt(value)
        }
        setReview(state => {
            let copy = {...state}
            copy[name] = value
            return copy
        })
    }


    return (
        <Dialog
            open={open || false}
            onClose={handleCloseCancel}
        >
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <Rating
                    name="rating"
                    value={review.rating || 0}
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    name="message"
                    label="Отзыв"
                    type="text"
                    value={review.message}
                    onChange={handleChange}
                    multiline
                    maxRows={4}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCancel}>Cancel</Button>
                <Button onClick={handleCloseSuccess}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    const courseList = state.courseProg
    const {user} = state.currentUser
    return {user, courseList}
}

export default connect(mapStateToProps)(HomePage)