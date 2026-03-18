import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function CreateEmployee() 
{
    const navigate = useNavigate();
    const [employees, setEmployees] = useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })

    const [errors, setErrors] = useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleCancel = (e) =>{
        e.preventDefault();
        navigate("/");
    }

    const handleChange = (e)=>
    {
        e.preventDefault();
        const {name,value} = e.target;
        if(name=="name" || name=="doj")
        {
            setEmployees({...employees,[name]:value});
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept, [name]:value}});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData = 
            {
                ...employees, doj:formattedDate
            }
            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })

        }
    }

    const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }


    const validate = (e)=>
    {
        const formErrors = {};
        let isValid=true;

        if(!employees.name)
        {
            formErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            formErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            formErrors.deptName="Department name is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            formErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(formErrors);
        return isValid;
    }

  return (
    <div className='mt-5'>
      <div className='container pt-5'>
        <div className='card w-50 offset-3 p-3'>
            <h5 className='text-center'>Add Employee</h5>
            <form>
                <label>Name:</label>
                <input type="text" name="name" className='form-control'
                autoComplete='off'
                value={employees.name}
                onChange={handleChange}/>

                <label>DOJ:</label>
                <input type="date" name="doj" className='form-control'
                autoComplete='off'
                value={employees.doj}
                onChange={handleChange}/>

                <label>Department:</label>
                <input type="text" name="deptName" className='form-control'
                autoComplete='off'
                value={employees.dept.deptName}
                onChange={handleChange}/>

                <label>Designation:</label>
                <input type="text" name="designation" className='form-control'
                autoComplete='off'
                value={employees.dept.designation}
                onChange={handleChange}/>

                <button className='btn btn-danger mt-3' onClick={handleCancel}>
                    cancel
                </button>
                <button className='btn btn-success mt-3 float-end' onClick={handleSubmit}>
                    submit
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEmployee
