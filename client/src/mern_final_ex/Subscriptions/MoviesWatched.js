import React from 'react'
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import AddSubscription from './AddSubscription'

function MoviesWatched(props) {

    const storeData = useSelector(state => state)
    const [movies, setMovies] = useState([])
    const [subsDisplay, setSubsDisplay] = useState(false)
  
    useEffect(() => {
        let member_subscriptions = storeData.subscriptions.filter(x => x.memberid == props.memberID)
        let subscribed_movies = []
        member_subscriptions.forEach(sub => {
            let movie_data = storeData.movies.filter(x => x._id == sub.movieid)[0]
            let sub_date = sub.date
            let obj = {"movie_data" : movie_data, "sub_date" : sub_date}
            subscribed_movies.push(obj)
        });
        setMovies(subscribed_movies)
    }, [props.memberID, storeData.subscriptions]);

  return (
    <div style={{margin: '0 auto', width: '70%', border:'solid 1px blue', textAlign:'left'}}>
        <b>Movies Watched</b><br/>
        <button onClick={()=>setSubsDisplay(!subsDisplay)}>Subscribe to new movie</button>
        {subsDisplay && <AddSubscription memberID={props.memberID}/>}
        <ul>
        {
          movies.map(movie =>
            {
              return <li key={movie.movie_data._id}><Link to="../movies" onClick={()=>{sessionStorage["movieRef"] = movie.movie_data._id;}}>{movie.movie_data.name}</Link>, {movie.sub_date}</li>
            })
        }
        </ul>
    </div>
  )
}

export default MoviesWatched