import {Role} from "./Role";

export default function shuffle(array) {
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

// Time represented in "mm:ss" format
export const time2millis = (time) => {
    let min = parseInt(time.slice(0,2))
    let sec = parseInt(time.slice(2,4))

    return min*60000+sec*1000
}

export const millis2time = (millis) => {
    let min = Math.floor(millis/60000)
    let sec = Math.floor((millis - min*60000) /1000)
    console.log(sec)

    let min_str = ""
    let sec_str = ""

    if (min<10 && min>=0){
        min_str = "0"+min
    }else{
        if (min>=60 || min<0){
            throw new RangeError("time to die")
        }else{
            min_str = min
        }
    }
    if (sec < 10 && sec>=0){
        sec_str = "0"+sec
    }else{
        if (sec>=60 || sec<0){
            throw new RangeError("what a chore")
        }else {
            sec_str = sec
        }
    }

    console.log(min_str, sec_str)

    return [min_str,sec_str].join("")
}

export const generateCourseResult = (courseData) => {
    const video = []
    const lecture = []
    const quiz = []

    courseData.steps && courseData.steps.forEach((val, i) => {
        switch (val.type) {
            case "quiz":
                quiz.push({
                    id: val.id,
                    stepIndex: i,
                    completed: false,
                    bestResult:0,
                    bestResultId:null,
                    total:null,
                    totalTriesNo:null,
                    results:[]
                })
                break
            case "lecture":
                lecture.push({
                    id:val.id,
                    stepIndex: i,
                    completed: false
                })
                break
            case "video":
                video.push({
                    id:val.id,
                    stepIndex: i,
                    completed: false
                })
                break
            default:
                break;
        }
    })

    return {
        employeeId: null,
        courseId: courseData.id,
        courseDatumId: courseData.id,
        completionRate: 0.0,
        completed: new Array(courseData.steps.length).fill(false),
        quiz: quiz,
        video: video,
        lecture: lecture
    }
}

export const getRole = (role) => {
    switch (role) {
        case "ROLE_ADMIN":
            return Role.Admin
        case "ROLE_EMPLOYEE":
            return Role.Empl
        case "ROLE_BOSS":
            return Role.Boss
        default:
            return Role.Empl
    }
}

export const userIsAdmin = (user) =>{
    return(user && user.roles.includes(Role.Admin))
}

export const userIsBoss = (user) =>{
    return(user && user.roles.includes(Role.Boss))
}

export const userIsEmployee = (user) =>{
    console.log(user)
    return(user && user.roles.includes(Role.Empl))
}

export function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '.' + day + '.' + year;
}