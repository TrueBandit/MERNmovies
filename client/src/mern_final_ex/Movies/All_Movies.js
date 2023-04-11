import React from 'react'
import {useSelector} from 'react-redux'
import MovieComp from './MovieComp'
import { useState,useEffect } from 'react'

function All_Movies() {

  const storeData = useSelector(state => state)
  
  const [movieList, setMovieList] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  
  useEffect(() => {
    setMovieList(storeData.movies)
  }, [storeData.movies])

  useEffect(() => {
    if(sessionStorage.getItem("movieRef"))
    {
      setMovieList(storeData.movies.filter(x => x._id === (sessionStorage.getItem("movieRef"))))
      sessionStorage.removeItem("movieRef")
    }
  }, [sessionStorage.getItem("movieRef")])

  return (
    <div>
      Find Movie: <input type='text' value={searchKeyword} onChange={e => {setSearchKeyword(e.target.value)}}/>&nbsp;
      <button onClick={() => setMovieList(storeData.movies.filter(x => x.name.toLowerCase().includes(searchKeyword.toLowerCase())))}>Find</button>&nbsp;
      <button onClick={() => {setMovieList(storeData.movies); setSearchKeyword("")}}>Clear</button><br/><br/>
        {
          movieList.map(movie =>
            {
              return <span key={movie._id}><MovieComp movie={movie}/><br/></span>
            })
        }
    </div>
  )
}

export default All_Movies