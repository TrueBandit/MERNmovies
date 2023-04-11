const DataReducer = (state = { movies : [] , members : [], subscriptions : []}, action) =>
{
  switch(action.type)
  {
    case "INIT":
        return {...state, movies : action.payload.movies, members : action.payload.members, subscriptions : action.payload.subscriptions }

    case "ADD":
        switch(action.payload.entity)
        {
            case "movie":
                return {...state, movies : [...state.movies, action.payload.dataObj] }

            case "member":
                return {...state, members : [...state.members, action.payload.dataObj] }

            case "subscription":
                return {...state, subscriptions : [...state.subscriptions, action.payload.dataObj] }
            
            default:
                return state; 
        }    

        case "REMOVE":
            switch(action.payload.entity) {
                case "movie":
                    let arrMovies = [...state.movies];
                    let indexMovies = arrMovies.findIndex(x => x._id == action.payload._id);
                    if (indexMovies >= 0) {
                        arrMovies.splice(indexMovies, 1);
                    }
        
                    // Remove all subscriptions associated with the deleted movie
                    let arrSubscriptions = [...state.subscriptions];
                    arrSubscriptions = arrSubscriptions.filter(x => x.movieid !== action.payload._id);
        
                    return {...state, movies: arrMovies, subscriptions: arrSubscriptions}
        
                case "member":
                    let arrMembers = [...state.members];
                    let indexMembers = arrMembers.findIndex(x => x._id == action.payload._id);
                    if (indexMembers >= 0) {
                        arrMembers.splice(indexMembers, 1);
                    }
        
                    // Remove all subscriptions associated with the deleted member
                    let arrSubscriptions2 = [...state.subscriptions];
                    arrSubscriptions2 = arrSubscriptions2.filter(x => x.memberid !== action.payload._id);
        
                    return {...state, members: arrMembers, subscriptions: arrSubscriptions2}
                
                default:
                    return state;
            }        
        
        case "UPDATE":
            switch(action.payload.entity)
            {
                case "movie":
                    let arr = [...state.movies];
                    let index = arr.findIndex(x => x._id == action.payload.dataObj._id);
                    if(index >=0)
                        {
                            arr[index] = action.payload.dataObj;
                        }
                    return {...state, movies : arr }
                
                default:
                    return state;

                case "member":
                    let arr2 = [...state.members];
                    let index2 = arr2.findIndex(x => x._id == action.payload.dataObj._id);
                    if(index2 >=0)
                        {
                            arr2[index2] = action.payload.dataObj;
                        }
                    return {...state, members : arr2 }
            }




    default:
        return state;
  }
}

export default DataReducer