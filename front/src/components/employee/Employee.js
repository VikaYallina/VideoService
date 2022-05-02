import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import EmployeeService from "../../services/employee.service";
import {deleteEmployee, updateEmployee} from "../../actions/employee.action";

const Employee = (props) => {
    const initialEmployeeState = {
        id: null,
        firstname: "",
        middlename: "",
        lastname: "",
        birthdate: Date.now()
    }

    const [currEmployee, setCurrentEmployee] = useState(initialEmployeeState)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const getEmployee = id =>{
        EmployeeService.get(id)
            .then(resp => {
                setCurrentEmployee(resp.data)
                console.log(resp.data)
            })
            .catch(
                e => {
                    console.log(e)
                }
            )
    }

    useEffect(() =>  getEmployee(props.match.params.id)
        , [props.match.params.id])

    const handleInputChange = (event) =>{
        const {name, value} = event.target
        setCurrentEmployee({...currEmployee, [name]:value})
    }

    const updateEmpl = () =>{
        dispatch(updateEmployee(currEmployee.id, currEmployee))
            .then(resp => {
                console.log(resp);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e)
            })
    }

    const removeEmpl = () =>{
        dispatch(deleteEmployee(currEmployee.id))
            .then(() => {
                props.history.push("/employees")
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            {currEmployee ? (
                <div className="edit-form">
                    <h4>Employee</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                value={currEmployee.firstname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middlename">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="middlename"
                                name="middlename"
                                value={currEmployee.middlename}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                name="lastname"
                                value={currEmployee.lastname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="birthdate"
                                name="birthdate"
                                value={currEmployee.birthdate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={removeEmpl}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateEmpl}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Employee...</p>
                </div>
            )}
        </div>
    );
}

export default Employee;