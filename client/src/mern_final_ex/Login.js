import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ServerUtils from './Utils/ServerUtils';

function Login() {

  const [User, setUser] = useState({username : "" , password : ""})
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (User.username !== "" && User.password !== "") {
      try {
        let login_resp = await ServerUtils.login(User);
        sessionStorage["token"] = login_resp.data.token;
        sessionStorage["userFullName"] = login_resp.data.fullname;
        navigate("/")
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
    <h3>Login Page</h3>
    User Name:&nbsp;<input type='text' onChange={e => {setUser({...User, username : e.target.value})}}/><br/>
    Password:&nbsp;<input type='text' onChange={e => {setUser({...User, password : e.target.value})}}/><br/>
    <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login