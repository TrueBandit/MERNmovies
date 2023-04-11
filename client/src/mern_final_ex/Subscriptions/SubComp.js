import React from 'react'
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import ServerUtils from '../Utils/ServerUtils';
import MoviesWatched from './MoviesWatched';

function SubComp(props) {

  const dispatch = useDispatch();

  const del = async () =>
  {
    if (window.confirm(`Are you sure you want to delete "${props.sub.name}"?`) == true) {
      dispatch({ type : "REMOVE", payload : {_id : props.sub._id, entity : "member"} })
      await ServerUtils.del("member", props.sub._id);
    }
  }
  return (
    <div style={{margin:'auto' , width :'40%', border:'solid 1px blue'}}>
      <b>{props.sub.name}</b><br/>
      Email: {props.sub.email}<br/>
      City: {props.sub.city}<br/>
      <Link to={"./edit/" + props.sub._id}><button>Edit</button></Link>&nbsp;&nbsp;<button onClick={del}>Delete</button><br/><br/>
      <MoviesWatched memberID={props.sub._id}/>
      <br/>
    </div>
  )
}

export default SubComp