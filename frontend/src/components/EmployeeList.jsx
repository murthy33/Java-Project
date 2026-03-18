import { useState,useEffect } from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'; 
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function EmployeeList()
{

    const [employees,setEmployees] = useState([]);

    const [value] = useTypewriter({
    words : ["Details","Information","List"],
    loop: true,
    typeSpeed : 80,
    deleteSpeed : 120
    })

    useEffect(()=>{
        EmployeeService.getAllEmployees().then(res=>{
            setEmployees(res.data)
        })
    },[])

    const deleteEmployee =(id) =>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    }

    return(
        <div className="mt-5">
            <h3 className=" pt-5 text-center"> Employee {value} <Cursor/> </h3>
            <div className="container mt-3">
                <Link to="/add-emp" className="btn btn-warning">Add Employee</Link>
                <table className="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>DOJ</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee=>{
                                return <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.doj}</td>
                                    <td>{employee.dept.deptName}</td>
                                    <td>{employee.dept.designation}</td>
                                    <td>
                        <Link to={`/update-emp/${employee.id}`} className="btn btn-primary me-5">update</Link>
                        <button className="btn btn-danger" onClick={(e)=>deleteEmployee(employee.id)}>Delete</button>
                                    </td>
                                    
                                </tr>
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default EmployeeList;