import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate , useParams  } from "react-router-dom";
import ServerUtils from '../Utils/ServerUtils';

function Edit_Movie() {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeData = useSelector(state => state)

    const [newMovie, setNewMovie] = useState({name : "", genres : "", image : "", year : 0})
    const [movieName, setMovieName] = useState("")
    const [validationList, setValidation] = useState({name : true, genres : true, image : true, year : true, submitted : false})
    
    useEffect(() =>
    {
        let storeMovie = {...storeData.movies.find(mov => mov._id == params._id)}
        setMovieName(storeMovie.name)
        let genres_string = String(storeMovie.genres)
        storeMovie.genres = genres_string
        setNewMovie(storeMovie)
    },[])

    useEffect(() => {
      setValidation({
        ...validationList,
        name: newMovie.name !== "",
        genres: newMovie.genres !== "",
        image: newMovie.image !== "",
        year: newMovie.year !== 0 && newMovie.year !== "",
      });
  }, [newMovie]);
    
    const customSubmit = async () =>
    {
        if (validationList.name && validationList.genres && validationList.image && validationList.year) {
        let genres_arr1 = newMovie.genres.split(',')
        let genres_arr2 = genres_arr1.map(element => {return element.trim();});
        let movie_obj = {_id : newMovie._id, name : newMovie.name, genres : genres_arr2, image : newMovie.image, year : newMovie.year}
        let resp = await ServerUtils.update("movie", movie_obj);
        dispatch({type : "UPDATE", payload : {dataObj : movie_obj, entity : "movie"}})
        navigate('/movies')
        }
        setValidation({...validationList, submitted : true})
  }
  
  return (
    <div>
    <h3>Edit Movie : {movieName}</h3>
    <table align='center'><tbody>
      <tr align='left'><td>Name:</td><td><input type='text' value={newMovie.name} onChange={e => {setNewMovie({...newMovie, name : e.target.value})}}/></td></tr>
      {
        !validationList.name && validationList.submitted && <tr><td colSpan="2"><b>Movie name is mandatory</b></td></tr>
      }
      <tr align='left'><td>Genres:</td><td><input type='text' value={newMovie.genres} onChange={e => {setNewMovie({...newMovie, genres : e.target.value})}}/></td></tr>
      <tr align='left'><td colSpan="2"><b>&nbsp;&nbsp;*</b>seperate each genre by comma</td></tr>
      {
        !validationList.genres && validationList.submitted && <tr><td colSpan="2"><b>Genre/s is mandatory</b></td></tr>
      }
      <tr align='left'><td>Image URL:</td><td><input type='text' value={newMovie.image} onChange={e => {setNewMovie({...newMovie, image : e.target.value})}}/></td></tr>
      {
        !validationList.image && validationList.submitted && <tr><td colSpan="2"><b>Image URL is mandatory</b></td></tr>
      }
      <tr align='left'><td>Premired:</td><td><input type='number' value={newMovie.year} min='1895' max='2024' onChange={e => {setNewMovie({...newMovie, year : e.target.value})}}/></td></tr>
      {
        !validationList.year && validationList.submitted && <tr><td colSpan="2"><b>Premired year is mandatory</b></td></tr>
      }
    </tbody></table><br/>
    <button onClick={customSubmit}>Save</button>&nbsp;&nbsp;<button onClick={() => navigate('/movies')}>Cancel</button><br/><br/>
    </div>
  )
}

export default Edit_Movie

