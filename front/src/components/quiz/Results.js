import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {Card, ListGroup} from "react-bootstrap";
import httpCommon from "../../http-common";
import {Dialog} from "@mui/material";

const QuizResult = (props) => {

    // TODO: instead of this do useEffect
    const {quizId, resultId} = props.match ? props.match.params : {
        quizId: null,
        resultId: null
    }
    const user = useSelector(state => state.currentUser)
    const resStore = useSelector(state => state.quizResult)
    const [res, setRes] = useState((resStore && quizId && resultId) ? resStore[user.id][quizId][resultId] : null)
    const [propValue, setPropValue] = useState(props)

    useEffect(() => {
        fetchData(propValue)
    },[])

    useEffect(() => {
        setPropValue(props)
        fetchData(props)
    },[props])

    const fetchData = (prop) => {
        const id = prop.id ? prop.id : null
        httpCommon.get(`/api/quizres/${id}`)
            .then(r => {
                setRes(r.data)
                console.log(r.data)
            })
            .catch(err => console.log(err))
    }

    const generateBody = (res) => {
        let items = []
        for (let i = 0; i < res.selected.options.length; i++) {
            const correctIndex = []
            res.question.correct.forEach(c => correctIndex.push(res.selected.options.indexOf(c)))
            items.push(<ListGroup.Item key={i}
                                       variant={(res.selected.selected[i]) ? (correctIndex.includes(i) ? "success" : "danger") : ""}>
                {res.selected.options[i]}
            </ListGroup.Item>)
        }
        return items
    }

    return (
        <div className="container-fluid" key={props.id }>
            {res ? (<div>
                <h1>Score: {res.correct}/{res.total}</h1>
                {res.result.map(r => (
                    <Card key={r.question.id}>
                        <Card.Header>
                            <Card.Title>{r.question.Qtext}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {generateBody(r)}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                ))}

            </div>) : (<h1>Loading...</h1>)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {quizId, resultId} = ownProps
    const quiz = state.result[state.currentUser.id]
    let result = null
    if (quiz) {
        const q = quiz[quizId]
        if (q) {
            result = q[resultId]
        }
    }
    return {result}
}



// export default connect(mapStateToProps)(QuizResult)
export default QuizResult