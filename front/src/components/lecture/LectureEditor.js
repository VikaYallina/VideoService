import React, {useEffect, useState} from "react";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Box, Button, Grid, Paper, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import {editLecture} from "../../actions/lecture.action";

const LectureEditor = (props) => {
    const [lectureTitle, setLectureTitle] = useState("")
    const [lectureDescription, setLectureDescription] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const dispatch = useDispatch()

    useEffect(() => {
        const {lecture} = props
        if (lecture) {
            setLectureTitle(lecture.title)
            setLectureDescription(lecture.desc)
            if (lecture.l_data
                && Object.keys(lecture.l_data).length !== 0
                && Object.getPrototypeOf(lecture.l_data) === Object.prototype) {
                console.log("here", lecture.l_data)
                setEditorState(EditorState.createWithContent(
                    convertFromRaw(lecture.l_data)))
            }
        }
    }, [])

    const onEditorStateChange = (state) => {
        setEditorState(state)
    }

    const onChangeTitle = (event) => {
        const title = event.target.value
        setLectureTitle(title)
    }

    const onChangeDescription = (event) => {
        const desc = event.target.value
        setLectureDescription(desc)
    }

    const handleSave = (e) => {
        const contentState = editorState.getCurrentContent();
        const lecture = {
            title: lectureTitle,
            desc: lectureDescription,
            l_data: convertToRaw(contentState)
        }
        const _id = props.lecture.id
        console.log(props.lecture, _id)
        dispatch(editLecture(_id, lecture))
            .then(() => props.history.push("/kb"))
            .catch((err) => {
                alert(err)
                console.log(err)
            })
    }

    return (
        <Box component={Paper} padding={2}>
            <Box>
                <Grid container spacing={2} paddingRight={2}>
                    <Grid item md={5} xs={6}>
                        <TextField
                            id="lecture-title"
                            fullWidth
                            label="Название"
                            value={lectureTitle || ''}
                            onChange={onChangeTitle}
                        />
                    </Grid>
                    <Grid item md={5} xs={6}>
                        <TextField
                            id="lecture-description"
                            fullWidth
                            label="Описание"
                            value={lectureDescription || ''}
                            onChange={onChangeDescription}
                        />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Button onClick={handleSave} variant={"contained"}>Сохранить</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box marginTop={2} borderRadius={1} border={2} borderColor={"#009be5"} padding={2}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                />
            </Box>
        </Box>)
}

const mapStateToProps = (state, ownProps) => {
    console.log("In map state props")
    let {id} = ownProps.match.params
    id = parseInt(id)
    const lecture = state.lecture.find(l => l.id === id)
    return {lecture: lecture}
}

export default connect(mapStateToProps)(LectureEditor)