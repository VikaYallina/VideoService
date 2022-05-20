import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteAllEmployees, deleteEmployee, retrieveEmployees} from "../../actions/employee.action";
import {Link} from "react-router-dom";
import Quiz from "../quiz/Quiz";
import {Box, Button, Paper} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmployeeEdit from "./EmployeeEdit";
import httpCommon from "../../http-common";

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

    const setDepartmentName = (params) => {
        return params.value ? params.value.name : "-"
    }

    const formatValue = (params) => {
        if (params.value == null) {
            return '';
        }
        let date = new Date(params.value)
        return date.toLocaleDateString()
    }

    const handleEdit = (props) => {
        console.log(props)
    }

    const columns = [
        {field: 'id', headerName: 'Id'},
        {field: 'firstname', headerName:'Name'},
        {field: 'lastname', headerName: 'Surname'},
        {field: 'birthdate', headerName: 'Birthdate', type:'date', valueFormatter:formatValue},
        {field: 'gender', headerName: 'Gender'},
        {field: 'hire_date', headerName: 'Hire date', type:'date', valueFormatter: formatValue},
        {field: 'department', headerName: 'Department', valueGetter: setDepartmentName},
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (props) => [
                <GridActionsCellItem onClick={() => {
                    setDialogData({
                        employee:props.row,
                        isNewEntry: false,
                        open:true
                    })
                }} icon={<EditIcon />} label="Edit" />,
                <GridActionsCellItem onClick={() => {
                    dispatch(deleteEmployee(props.row.id))
                }}
                    icon={<DeleteIcon />} label="Delete" />,
            ],
        },
    ]

    const [dialogData, setDialogData] = useState({
        open: false,
        isNewEntry: false,
        employee: null
    })

    const handleClose = () => {
        setDialogData(state => {
            let copy = {...state}
            copy["open"] = false
            return copy
        })
    }

    const handleCreate = () => {
        setDialogData({
            open: true,
            isNewEntry: true,
            employee: null
        })
    }

    return (
        <Box>
            <Paper elevation={3}>
                <Button onClick={handleCreate}>Создать</Button>
            <div style={{ height: 400, width: '100%', padding:2 }}>
                <div style={{ display: 'flex', height: '100%' }}>

                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                columns={columns}
                                rows={employees}
                            />
                        </div>

                </div>
            </div>
            </Paper>
            <EmployeeEdit
                open={dialogData.open}
                handleClose={handleClose}
                isNewEntry={dialogData.isNewEntry}
                employee={dialogData.employee}
            />
        </Box>
        // <div className="list row">
        //     <div className="col-md-8">
        //         <div className="input-group mb-3">
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 placeholder="Search by title"
        //                 value={searchTerm}
        //                 onChange={onChangeTerm}
        //             />
        //             <div className="input-group-append">
        //                 <button
        //                     className="btn btn-outline-secondary"
        //                     type="button"
        //                     onClick={findByTerm}
        //                 >
        //                     Search
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-md-6">
        //         <h4>Employee list</h4>
        //         <ul className="list-group">
        //             {employees &&
        //                 employees.map((empl, index) => (
        //                     <li
        //                         className={
        //                             "list-group-item " + (index === currIndex ? "active" : "")
        //                         }
        //                         onClick={() => setActiveEmployee(empl, index)}
        //                         key={index}
        //                     >
        //                         {empl.lastname}
        //                     </li>
        //                 ))}
        //         </ul>
        //     </div>
        //     <button
        //         className="m-3 btn btn-sm btn-danger"
        //         onClick={removeAll}
        //     >
        //         Remove All
        //     </button>
        //     <div className="col-md-6">
        //         {currEmployee ? (
        //             <div>
        //                 <h4>Employee</h4>
        //                 <div>
        //                     <label>
        //                         <strong>First name:</strong>
        //                     </label>{" "}
        //                     {currEmployee.firstname}
        //                 </div>
        //                 <div>
        //                     <label>
        //                         <strong>Middle name:</strong>
        //                     </label>{" "}
        //                     {currEmployee.middlename}
        //                 </div>
        //                 <div>
        //                     <label>
        //                         <strong>Last name:</strong>
        //                     </label>{" "}
        //                     {currEmployee.lastname}
        //                 </div>
        //                 <div>
        //                     <label>
        //                         <strong>Birthdate:</strong>
        //                     </label>{" "}
        //                     {currEmployee.birthdate}
        //                 </div>
        //                 <Link
        //                     to={"/employees/" + currEmployee.id}
        //                     className="badge badge-warning"
        //                 >
        //                     Edit
        //                 </Link>
        //             </div>
        //         ) : (
        //             <div>
        //                 <br />
        //                 <p>Please click on Employee...</p>
        //             </div>
        //         )}
        //
        //     </div>
        // </div>
    )

}

export default EmployeeList