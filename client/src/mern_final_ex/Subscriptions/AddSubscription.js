import React from 'react'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import ServerUtils from '../Utils/ServerUtils';
import { useDispatch } from 'react-redux'

function AddSubscription(props) {

  const dispatch = useDispatch();
  const storeData = useSelector(state => state)
  const [unsubscribedMovies, SetUnsubscribedMovies] = useState([])
  const [newSubscription, SetNewSubscription] = useState({memberid : props.memberID, movieid : "", date : ""})

  const movieList = () =>
  {
    let member_subscribed_movies = storeData.subscriptions.filter(x => x.memberid == props.memberID).map(x => x.movieid)
    return storeData.movies.filter(movie => {
      return !member_subscribed_movies.some(x => movie._id === x); 
    });
  }

  useEffect(() => {
    SetUnsubscribedMovies(movieList())
  }, [storeData.subscriptions])

  const addSub = async () =>
    {
      if (newSubscription.movieid != "---" && newSubscription.movieid != "" && newSubscription.date != "") {
        let subObj = {...newSubscription}
        let resp = await ServerUtils.add("subscription", subObj);
        subObj._id = resp.data
        dispatch({type : "ADD", payload : {dataObj : subObj, entity : "subscription"}})
        SetNewSubscription({ memberid: props.memberID, movieid: "", date: "" });
        document.getElementById("movie-select").selectedIndex = 0;
        document.getElementById("date-input").value = "";
      }
    }

  return (
    <div style={{width :'90%', border:'solid 1px red'}}>
        <br/><b>Add a new movie</b><br/>
        <select id="movie-select" onChange={e => {SetNewSubscription({...newSubscription, movieid : e.target.value})}}>
        <option value='---'>-Select Movie-</option>
        {
          unsubscribedMovies.map(movie =>
          {
            return <option key={movie._id} value={movie._id}>{movie.name}</option>
          })
        }
        </select>
        <input id="date-input" type='date'  onChange={e => {SetNewSubscription({...newSubscription, date : e.target.value})}}/>
        <br/>
        <button onClick={addSub}>Subscribe</button>
        <br/><br/>
    </div>
  )
}

export default AddSubscription