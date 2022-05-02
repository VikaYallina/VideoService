import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Box, Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {removeVideo} from "../../actions/video.action";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {history} from "../../helpers/history";
import {removeLecture} from "../../actions/lecture.action";
import AddIcon from "@mui/icons-material/Add";

const VideoCard = (props) => {
    const [propValue, setPropValue] = useState(props)

    useEffect(() => {
        setPropValue(props)
    },[props])

    const dispatch = useDispatch()

    return(
        <Card key={propValue.video.id} sx={{ display: 'flex' }}>
            <CardActionArea onClick={(e) => {
                window.open(`/video/${propValue.video.id}`, "_blank");
            }}>
                <Box sx={{ display:'flex', flexDirection: 'row'}}>
                    <CardMedia
                        component="img"
                        src={`http://localhost:8080/api/video/${propValue.video.id}/thumb`}
                        height={'144'}
                        sx={{ width: '50%'}}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardHeader title={propValue.video.title ? propValue.video.title : "Без названия"}
                                    titleTypographyProps={propValue.video.title ? {} : {color: "lightgray"}}/>
                        <CardContent>
                            <Typography variant={"subtitle1"}>{propValue.video.desc ? propValue.video.desc : "Описание отсутсвует"}</Typography>
                        </CardContent>
                    </Box>
                </Box>
            </CardActionArea>
            {propValue.showActions ? (
                <CardActions>
                    <IconButton onClick={(e) => {
                        history.push(`/video/edit/${propValue.video.id}`)
                    }}><EditIcon/></IconButton>
                    <IconButton onClick={(e) => {
                        dispatch(removeVideo(propValue.video.id))
                            .catch(err => console.log(err))
                    }}><DeleteIcon/></IconButton>
                </CardActions>
            ) : (
                <CardActions>
                    <IconButton onClick={() => {
                        const data = {
                            id:propValue.video.id,
                            type:"video",
                            title: propValue.video.title,
                            desc: propValue.video.desc
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


VideoCard.propTypes ={
    video: PropTypes.object.isRequired,
    showActions: PropTypes.bool.isRequired,
    getChildData: PropTypes.func
}
export default VideoCard