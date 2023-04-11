import React from 'react'
import { useEffect, useState } from 'react';
import Movie_Subs from './Movie_Subs'
import {useSelector,useDispatch} from 'react-redux'
import ServerUtils from '../Utils/ServerUtils';
import { Link } from "react-router-dom";

function MovieComp(props) {

  const dispatch = useDispatch();
  const storeData = useSelector(state => state)
  const [genres, setGenres] = useState("")

  useEffect(() => {
    let newGenresString = '';
    props.movie.genres.forEach((genre, index) => {
      if (index !== props.movie.genres.length - 1) {
        newGenresString += `"${genre}", `;
      } else {
        newGenresString += `"${genre}"`;
      }
    });
    setGenres(newGenresString);
  }, [props.genres]);

  const del = async () =>
  {
    if (window.confirm(`Are you sure you want to delete "${props.movie.name}"?`) == true) {
      dispatch({ type : "REMOVE", payload : {_id : props.movie._id, entity : "movie"} })
      await ServerUtils.del("movie", props.movie._id);
    }
  }
  
  return (
    <div style={{margin:'auto' , width :'50%', border:'solid 1px blue'}}>
      <b>{props.movie.name}, {props.movie.year}</b><br/>
      Genres: {genres}<br/>

      { storeData.subscriptions.filter(x => x.movieid == props.movie._id).length>0 &&
      (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <div style={{ width: '39%', padding: '10px'}}><img  src={props.movie.image} style={{ maxWidth: '100%', height: 'auto' }}/></div>
      <div style={{ width: '59%', padding: '10px'}}><Movie_Subs movieID={props.movie._id}/></div>
      </div>)
      }
      { storeData.subscriptions.filter(x => x.movieid == props.movie._id).length==0 &&
      (<div><img  src={props.movie.image} style={{ width: '40%', height: 'auto', alignContent:'center', padding: '10px'}}/></div>)
      }


      <Link to={"./edit/" + props.movie._id}><button>Edit</button></Link>&nbsp;&nbsp;<button onClick={del}>Delete</button><br/><br/>
    </div>
  )
}

export default MovieComp
