import React from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom';


function Main_Subs() {

  return (
    <div style={{margin:'auto' , width :'70%', border:'solid 2px green'}}>
      <h2>Subscriptions</h2>

      <nav>
        <Link to="/subscriptions">All Members</Link>&nbsp;&nbsp;
        <Link to="add">Add Member</Link>
      </nav><br/>

      <Outlet />

    </div>
  )
}

export default Main_Subs