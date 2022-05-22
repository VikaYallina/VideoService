import React, {useEffect, useState} from "react";
import {VideoService} from "../../services/video.service";
import {Box, Paper, Typography} from "@mui/material";

const VideoView = (props) => {
    const [videoData, setVideoData] = useState({title:"Без названия", desc: "Описание отсутсвует"})
    const [propValue, setPropValue] = useState(props)

    useEffect(() => {
        fetchData(propValue)
    }, [])

    useEffect(() => {
        fetchData(props)
        setPropValue(props)
    },[props])

    const fetchData = (prop) => {
        const id = prop.id ? prop.id : prop.match.params.id
        VideoService.getData(id).then(res => {
            console.log(res.data)
            setVideoData(res.data)
        })
            .catch(err => {
                console.log(err)
                // props.history.push("/quiz")
            })
    }

    return(
        <div>
            <Box component={Paper} padding={2}>
                <Typography marginBottom={2} variant={"h3"}>{videoData.title}</Typography>
                {videoData.id ? (<video id="videoPlayer" width="650" controls muted="muted" autoPlay>
                    <source src={`http://localhost:8080/api/video/${videoData.id}`} type="video/mp4"/>
                </video>) : <Typography>LOADING</Typography>}
            </Box>
        </div>
    )
}

export default VideoView