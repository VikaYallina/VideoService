import React, {useEffect, useState} from "react";
import {Box, Divider, Paper, TextField, Typography} from "@mui/material";
import draftToHtml from 'draftjs-to-html';
import {connect} from "react-redux";
import parse from 'html-react-parser'
import LectureService from "../../services/lecture.service";
import createDOMPurify from 'dompurify'

// import { JSDOM } from 'jsdom'
//
// const window = (new JSDOM('')).window
// const DOMPurify = createDOMPurify(window)

const Lecture = (props) => {
    const [lecture, setLecture] = useState({title:"1",l_data:{}})
    const [propValue, setPropValue] = useState(props)

    useEffect(()=>{
        fetchData(propValue)
    },[])

    useEffect(() => {
        fetchData(props)
        setPropValue(props)
    },[props])

    const fetchData = (prop) => {
        if (prop.lecture){
            setLecture(prop.lecture)
            console.log(prop.lecture.l_data)
        }else{
            LectureService.get(prop.id)
                .then(res => {
                    setLecture(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return(
        <Box>
                <Paper elevation={3}>
                    <Box sx={{ padding:2}}>
                        <Typography variant="h4">{lecture.title}</Typography>
                        <Divider></Divider>
                        <Box sx ={{ marginTop:2}}>
                            {lecture.l_data ?
                                (<div dangerouslySetInnerHTML={{ __html: draftToHtml(lecture.l_data) }}/>)
                                // parse()
                                : (<Typography>Данные отсутствуют</Typography>)}
                        </Box>
                    </Box>
                </Paper>
        </Box>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.id ? ownProps.id : ownProps.match.params.id

    id = parseInt(id)
    const lecture = state.lecture.find(l => l.id === id)
    return {
        lecture: lecture,
        id:id
    }
}

export default connect(mapStateToProps)(Lecture)