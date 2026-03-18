import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';

function UpdateEmployee() 
{
  const navigate = useNavigate();
  const {id} = useParams();

  const [name,setName] = useState("");
  const [doj,setDoj] = useState("");
  const [department,setDepartment] = useState({deptName:"",designation:""});

  const handleCancel = (e) =>{
    e.preventDefault();
    navigate("/");
  }

  useEffect(()=>{
    EmployeeService.getEmployeeById(id).then(res=>{
      setName(res.data.name);
      setDoj(res.data.doj);
      setDepartment({
        deptName: res.data.dept.deptName,
        designation: res.data.dept.designation
      })
    })
  },[])

  const handleSave = (e) =>{
    e.preventDefault();
    const updatedEmployee={
      name,
      doj,
      dept:{
        deptName:department.deptName,
        designation:department.designation
      }
    }
    EmployeeService.updateEmployee(id, updatedEmployee).then(res=>{
      navigate("/");
    })
  }

  return (
    <div className='pt-5'>
        <div className='container mt-5'>
          <div className='card w-50 offset-3 p-3'>
            <h5 className='text-center'>Update Employee</h5>
            <form>
              <label>Name</label>
              <input type="text" name="name" className='form-control'
              value={name}
              onChange={(e)=>setName(e.target.value)}/>
              
              <label>DOJ</label>
              <input type="text" name="doj" className='form-control'
              value={doj}
              onChange={(e)=>setDoj(e.target.value)}/>
              
              <label>Department</label>
              <input type="text" name="department" className='form-control'
              value={department.deptName}
              onChange={(e)=>setDepartment({...department,deptName:e.target.value})}/>
              
              <label>Designation</label>
              <input type="text" name="designation" className='form-control'
              value={department.designation}
              onChange={(e)=>setDepartment({...department,designation:e.target.value})}/>
              
              <button className='btn btn-danger mt-3' onClick={handleCancel}>cancel</button>
              <button className='btn btn-success mt-3 float-end' onClick={handleSave}>save</button>
            </form>
          </div>
        </div>
      
    </div>
  )
}

export default UpdateEmployee
