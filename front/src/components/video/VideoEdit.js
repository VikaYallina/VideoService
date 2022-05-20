import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Paper, Stack, TextField} from "@mui/material";
import {VideoService} from "../../services/video.service";
import {Alert} from "@mui/lab";
import {connect, useDispatch} from "react-redux";
import {updateVideo} from "../../actions/video.action";

const VideoEdit = (props) => {
    const {id} = props.match.params
    const [file, setFile] = useState(null)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState("")

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        if (props.video){
            setTitle(props.video.title)
            setDesc(props.video.desc)
        }else {
            if(props.id){
                VideoService.getData(props.id).then(res => {
                    setTitle(res.data.title)
                    setDesc(res.data.desc)
                })
                    .catch(err => {
                        console.log(err)
                        props.history.push("/kb")
                    })
            }else{
                props.history.push("/kb")
            }
        }
    }, [])

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const err = isValid()
        if (!err){
            const formData = new FormData()
            formData.append("video",file)
            formData.append("title",title)
            formData.append("desc",desc)
            formData.append("filename", file.name)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            dispatch(updateVideo(id,formData,config))
                .then(() => {
                    props.history.push(`/kb`)
                })
                .catch(err => {
                    console.log(err)
                    setError(true)
                    setErrorText(err.message)
                })
        }else{
            setError(true)
            setErrorText(err)
        }
    }

    // TODO
    const isValid = () => {
        return ""
    }

    return (
        <Box component={Paper} padding={2}>
            {error ? (<Alert severity="error">{errorText}</Alert>) : (<div></div>)}
            <Box component={"form"} onSubmit={handleSubmit}>
                <Stack direction={"column"} spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <TextField
                                id={"title"}
                                name={"title"}
                                label={"Название"}
                                fullWidth
                                value={title || ""}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setTitle(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField
                                fullWidth
                                id={"desc"}
                                name={"desc"}
                                label={"Описание"}
                                value={desc || ""}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setDesc(value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Загрузить видео
                        <input
                            type="file"
                            name={"video"}
                            hidden
                            required
                            onChange={(e) => {
                                console.log(e.target.files[0])
                                setFile(e.target.files[0])
                            }}
                        />
                    </Button>
                    <Button type={"submit"}>Сохранить</Button>
                </Stack>
            </Box>
        </Box>
    )
}

const matchStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params
    const video = state.video.find(val => val.id === id)
    return {
        video: video,
        id: id
    }
}

export default connect(matchStateToProps)(VideoEdit)