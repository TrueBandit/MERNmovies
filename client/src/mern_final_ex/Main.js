import React from 'react'
import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './Login'
import Home from './Home'
import Welcome from './Welcome'
import Main_Movies from './Movies/Main_Movies'
import All_Movies from './Movies/All_Movies'
import Add_Movie from './Movies/Add_Movie'
import Edit_Movie from './Movies/Edit_Movie'
import Main_Subs from './Subscriptions/Main_Subs'
import All_Subs from './Subscriptions/All_Subs'
import Add_Sub from './Subscriptions/Add_Sub'
import Edit_Sub from './Subscriptions/Edit_Sub'

function Main() {

  const navigate = useNavigate();

  useEffect(() =>
  {
    if(!sessionStorage.getItem("token"))
    {
      navigate("login")
    }
  },[])

  return (
    <div>
      <h1>Movies - Subscriptions Web Site</h1>
        <Routes>
          <Route path="login" element={<Login/>} />
          <Route path="" element={<Home/>}>
          <Route path="" element={<Welcome/>} />
          <Route path="movies" element={<Main_Movies/>}>
              <Route path="" element={<All_Movies/>} />
              <Route path="add" element={<Add_Movie/>} />
              <Route path="edit/:_id" element={<Edit_Movie/>} />
          </Route>
          <Route path="subscriptions" element={<Main_Subs/>} >
              <Route path="" element={<All_Subs/>} />
              <Route path="add" element={<Add_Sub/>} />
              <Route path="edit/:_id" element={<Edit_Sub/>} />
          </Route>
          </Route>
        </Routes>

    </div>
  )
}

export default Main