import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function PrivateRoute({children})
{
  return localStorage.getItem("logged") ? children : <Navigate to="/login" />
}

function App() 
{
  return (
    <div className='bg-color'>
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            {/* protected pages */ }
            <Route path="/" element={<PrivateRoute><EmployeeList/></PrivateRoute>}></Route>
            <Route path="/add-emp" element={<PrivateRoute><CreateEmployee/></PrivateRoute>}></Route>
            <Route path="/update-emp/:id" element={<PrivateRoute><UpdateEmployee/></PrivateRoute>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
