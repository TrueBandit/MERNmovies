import React from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import ServerUtils from './Utils/ServerUtils';

function Main() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("")

  useEffect(() =>
  {
    setUserName(sessionStorage.getItem("userFullName"))
    async function getData()
    {
        let movies_resp = await ServerUtils.getAll("movie");
        let members_resp = await ServerUtils.getAll("member");
        let subscriptions_resp = await ServerUtils.getAll("subscription");
        let data = {movies: movies_resp.data , members: members_resp.data , subscriptions : subscriptions_resp.data}
        dispatch({type : "INIT", payload : data})
    }
    getData();
  },[])

  return (
    <div>
        Welcome Back, {userName}! <Link to="login" onClick={()=>{sessionStorage.removeItem("token")}}>(Logout)</Link><br/>
        <Link to="movies">Movies</Link> &nbsp;
        <Link to="subscriptions">Subscriptions</Link>
        <br/><br/>
        <Outlet/>
    </div>
  )
}

export default Main