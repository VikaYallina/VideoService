import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createEmployee} from "../../actions/employee.action";

const AddEmployee = () => {
    const initEmpl = {
        firstname: "",
        middlename: "",
        lastname: "",
        birthdate: Date.now()
    }
    const [employee, setEmployee] = useState(initEmpl)
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()

    const handleInputChange = event => {
        const {name, value} = event.target
        setEmployee({...employee, [name]: value })
    }

    const save = () => {
        dispatch(createEmployee(employee))
            .then(data => {
                setEmployee({
                    firstname: data.firstname,
                    middlename: data.middlename,
                    lastname: data.lastname,
                    birthdate: data.birthdate
                })
                setSubmitted(true)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const newEmployee = () => {
        setEmployee(initEmpl)
        setSubmitted(false)
    }

    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newEmployee}>Add</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            required
                            value={employee.lastname}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            required
                            value={employee.firstname}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="middlename">Middlename</label>
                        <input
                            type="text"
                            className="form-control"
                            id="middlename"
                            name="middlename"
                            value={employee.middlename}
                            onChange={handleInputChange}
                        />
                    </div>



                    <div className="form-group">
                        <label htmlFor="birtdate">Birthdate</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="birthdate"
                            name="birthdate"
                            required
                            value={employee.birthdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={save} className="btn btn-success">Submit</button>
                </div>
            )}
        </div>
    )
}

export default AddEmployee;
// TODO: add lib for form validation