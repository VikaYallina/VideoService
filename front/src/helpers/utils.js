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
