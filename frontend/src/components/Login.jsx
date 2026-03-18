import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
function Login()
{
    const [user,setUser] = useState({username:"",password:""});
    const [error,setError] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit= (e) =>{
        e.preventDefault();
        AuthService.login(user).then(res=>{
            if(res.data === true)
            {
                localStorage.setItem("logged","true");
                navigate("/");
            }
            else 
            {
                setError("Invalid Username or Password");
            }
        })
    }

    return(
        <div className="mt-5 pt-5">
            <div className="card w-50 p-5 offset-3">
                <h4 className="text-center">Login</h4>
                <form>
                    <label>UserName</label>
                    <input type="text" name="username" className="form-control"
                    autoComplete="off" 
                    value={user.username} 
                    onChange={(e)=>setUser({...user,username:e.target.value})}/>
                    
                    <label>Password</label>
                    <input type="password" name="password" className="form-control"
                    autoComplete="off" 
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}/>

                    {error && <small className="text-danger">{error}</small>}
                    <button className="btn btn-primary w-100 mt-4"
                    onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;