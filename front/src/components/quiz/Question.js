import React, {useEffect, useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";

const Question = (props) =>{
    const [answerSelected, setAnswerSelected] = useState(false)
    const [question, setQuestion] = useState(props.question)
    const [options, setOptions] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        let wrong_answers = [...question.wrong]
        let correct_answers = [...question.correct]
        let answers = wrong_answers.concat(correct_answers)
        shuffle(answers)
        setOptions(answers)
    }, [question])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const handleOptionChoose = (event) =>{

    }
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{question.Qtext}</Card.Title>
                    <ListGroup>
                        {options.map(((value, index) => (
                            <ListGroup.Item action onClick={handleOptionChoose}>{value}</ListGroup.Item>
                        )))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Question