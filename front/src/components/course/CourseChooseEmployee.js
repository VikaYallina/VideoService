import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {retrieveEmployees} from "../../actions/employee.action";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import PropTypes from "prop-types";

const CourseChooseEmployee = (props) => {
    // const emplList = useSelector(state => state.employees)
    const [emplList, setEmplList] = useState([])
    const [chosenEmpl, setChosenEmpl] = useState([])

    const dispatch = useDispatch()

    useEffect(()=>{
        // dispatch(retrieveEmployees())
        props.employeeData && setEmplList(props.employeeData)
        props.chosenEmpl && setChosenEmpl(props.chosenEmpl)
    },[])

    useEffect(() => {
        console.log(chosenEmpl)
        props.saveEmployeeData(chosenEmpl)
    },[chosenEmpl])

    useEffect(()=> {
        setEmplList(props.employeeData)
    }, [props])

    const columns = [
        {field: 'id', headerName: 'Id'},
        {field: 'firstname', headerName:'Name'},
        {field: 'lastname', headerName: 'Surname'},
        {field: 'birthdate', headerName: 'Birthdate'}
    ]
    return(<Box>
        <div style={{ height: 250, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={emplList}
                checkboxSelection={true}
                selectionModel={chosenEmpl}
                onSelectionModelChange={(newSelectModel) => {
                    setChosenEmpl(newSelectModel)
                }}
            />
        </div>
    </Box>)
}

CourseChooseEmployee.propTypes = {
    employeeData: PropTypes.array,
    saveEmployeeData: PropTypes.func,
    chosenEmpl: PropTypes.array
}

export default CourseChooseEmployee