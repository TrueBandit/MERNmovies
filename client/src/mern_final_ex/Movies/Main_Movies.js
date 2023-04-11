import React from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom';


function Main_Movies() {

  return (
    <div style={{margin:'auto' , width :'70%', border:'solid 2px green'}}>
      <h2>Movies</h2>

      
        <Link to="/movies">All Movies</Link>&nbsp;&nbsp;
        <Link to="add">Add Movie</Link><br/><br/>
        
      

      <Outlet />
      
    </div>
  )
}

export default Main_Movies