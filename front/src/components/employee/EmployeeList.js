import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteAllEmployees, retrieveEmployees} from "../../actions/employee.action";
import {Link} from "react-router-dom";
import Quiz from "../quiz/Quiz";

const EmployeeList = () => {
    const [currEmployee, setCurrEmployee] = useState(null);
    const [currIndex, setCurrIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");

    const employees = useSelector(state => state.employees)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveEmployees())
    }, [])

    const onChangeTerm = event => {
        const searchTerm = event.target.value
        setSearchTerm(searchTerm)
    }

    const refreshData = () => {
        setCurrEmployee(null)
        setCurrIndex(-1)
    }

    const setActiveEmployee = (empl, index) => {
        setCurrEmployee(empl);
        setCurrIndex(index);
    }

    const removeAll = () => {
        dispatch(deleteAllEmployees())
            .then(resp => {
                console.log(resp)
                refreshData()
            })
            .catch(e => {
                console.log(e)
        })
    }

    const findByTerm = () => {
        refreshData()
        // dispatch(find) TODO
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={onChangeTerm}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTerm}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Employee list</h4>
                <ul className="list-group">
                    {employees &&
                        employees.map((empl, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currIndex ? "active" : "")
                                }
                                onClick={() => setActiveEmployee(empl, index)}
                                key={index}
                            >
                                {empl.lastname}
                            </li>
                        ))}
                </ul>
            </div>
            <button
                className="m-3 btn btn-sm btn-danger"
                onClick={removeAll}
            >
                Remove All
            </button>
            <div className="col-md-6">
                {currEmployee ? (
                    <div>
                        <h4>Employee</h4>
                        <div>
                            <label>
                                <strong>First name:</strong>
                            </label>{" "}
                            {currEmployee.firstname}
                        </div>
                        <div>
                            <label>
                                <strong>Middle name:</strong>
                            </label>{" "}
                            {currEmployee.middlename}
                        </div>
                        <div>
                            <label>
                                <strong>Last name:</strong>
                            </label>{" "}
                            {currEmployee.lastname}
                        </div>
                        <div>
                            <label>
                                <strong>Birthdate:</strong>
                            </label>{" "}
                            {currEmployee.birthdate}
                        </div>
                        <Link
                            to={"/employees/" + currEmployee.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on Employee...</p>
                    </div>
                )}

            </div>
        </div>
    )

}

export default EmployeeList