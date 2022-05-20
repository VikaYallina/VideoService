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

    const setDepartmentName = (params) => {
        return params.value.name
    }

    const formatValue = (params) => {
        if (params.value == null) {
            return '';
        }
        let date = new Date(params.value)
        return date.toLocaleDateString()
    }

    const setGenderValue = (params) =>{
        return (params.value === "m") ? "муж." : "жен."
    }

    const columns = [
        {field: 'id', headerName: 'Id'},
        {field: 'firstname', headerName:'Имя'},
        {field: 'lastname', headerName: 'Фамилия'},
        {field: 'birthdate', headerName: 'Дата рождения', type:'date', valueFormatter:formatValue},
        {field: 'gender', headerName: 'Пол', valueFormatter:setGenderValue},
        {field: 'hire_date', headerName: 'Дата начала работы', type:'date', valueFormatter: formatValue},
        {field: 'department', headerName: 'Отдел', valueGetter: setDepartmentName}
    ]
    return(<Box>
        {/*<div style={{ height: 250, width: '100%' }}>*/}
        {/*    <DataGrid*/}
        {/*        columns={columns}*/}
        {/*        rows={emplList}*/}
        {/*        checkboxSelection={true}*/}
        {/*        selectionModel={chosenEmpl}*/}
        {/*        onSelectionModelChange={(newSelectModel) => {*/}
        {/*            setChosenEmpl(newSelectModel)*/}
        {/*        }}*/}
        {/*    />*/}
        {/*</div>*/}
        {/*<div style={{ display: 'flex', height: '100%' }}>*/}
        {/*    <div style={{ flexGrow: 1 }}>*/}
        {/*        <DataGrid*/}
        {/*            columns={columns}*/}
        {/*            rows={emplList}*/}
        {/*            checkboxSelection={true}*/}
        {/*            selectionModel={chosenEmpl}*/}
        {/*            onSelectionModelChange={(newSelectModel) => {*/}
        {/*                setChosenEmpl(newSelectModel)*/}
        {/*            }}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}

        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
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
            </div>
        </div>
    </Box>)
}

CourseChooseEmployee.propTypes = {
    employeeData: PropTypes.array,
    saveEmployeeData: PropTypes.func,
    chosenEmpl: PropTypes.array
}

export default CourseChooseEmployee