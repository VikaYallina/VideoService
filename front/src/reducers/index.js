import EmployeeReducer from "./employee.reducer";
import {combineReducers} from "redux"
import QuestionReducer from "./question.reducer";
import QuizReducer from "./quiz.reducer";
import ResultReducer from "./result.reducer";
import UserReducer from "./user.reducer";
import LectureReducer from "./lecture.reducer";
import VideoReducer from "./video.reducer";

export default combineReducers({
    employees: EmployeeReducer,
    questions: QuestionReducer,
    quiz: QuizReducer,
    quizResult: ResultReducer,
    currentUser: UserReducer,
    lecture: LectureReducer,
    video: VideoReducer
})