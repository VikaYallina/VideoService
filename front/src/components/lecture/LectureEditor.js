import React, {useEffect, useState} from "react";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Box, Button, Paper, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import {editLecture} from "../../actions/lecture.action";

const LectureEditor = (props) => {
    const [lectureTitle, setLectureTitle] = useState("")
    const [lectureDescription, setLectureDescription] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const dispatch = useDispatch()

    useEffect(()=>{
        const {lecture} = props
        if (lecture){
            setLectureTitle(lecture.title)
            setLectureDescription(lecture.desc)
            if (lecture.l_data
                && Object.keys(lecture.l_data).length !== 0
                && Object.getPrototypeOf(lecture.l_data) === Object.prototype){
                console.log("here", lecture.l_data)
                setEditorState(EditorState.createWithContent(
                    convertFromRaw(lecture.l_data)))
            }
        }
    },[])

    const onEditorStateChange = (state) => {
        setEditorState(state)
    }

    const onChangeTitle = (event) =>{
        const title = event.target.value
        setLectureTitle(title)
    }

    const onChangeDescription = (event) =>{
        const desc = event.target.value
        setLectureDescription(desc)
    }

    const handleSave = (e) => {
        const contentState = editorState.getCurrentContent();
        const lecture ={
            title: lectureTitle,
            desc: lectureDescription,
            l_data: convertToRaw(contentState)
        }
        const _id = props.lecture.id
        console.log(props.lecture, _id)
        dispatch(editLecture(_id, lecture))
            .then(() => props.history.push("/quiz"))
            .catch((err) => {alert(err)
            console.log(err)})
    }

    return (<div>
        <Box component="form">
            <TextField
                id="lecture-title"
                label="Title"
                value={lectureTitle || ''}
                onChange={onChangeTitle}
            />
            <TextField
                id="lecture-description"
                label="Description"
                value={lectureDescription || ''}
                onChange={onChangeDescription}
            />
            <Button onClick={handleSave}>Save</Button>
        </Box>
        <Paper elevation={3}>
            <Box margin={3}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                />
            </Box>
        </Paper>
    </div>)
}

const mapStateToProps = (state, ownProps) => {
    console.log("In map state props")
    let {id} = ownProps.match.params
    id = parseInt(id)
    const lecture = state.lecture.find(l => l.id === id)
    return {lecture: lecture}
}

export default connect(mapStateToProps)(LectureEditor)