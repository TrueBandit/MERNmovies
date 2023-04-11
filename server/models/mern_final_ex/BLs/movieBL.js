const Movie = require('../data_models/movieModel');
const Subscription = require('../data_models/subscriptionModel');
const Member = require('../data_models/memberModel');

  const getAllMovies = async () => {
    let movies = await Movie.find({})
    return movies;
    //return generateObj(movies)
  };

  const getMovieById = async (id) => { 
    let movie = await Movie.findById(id)
    return movie;
    //return generateObj(movie)
  };
  
  const addMovie = async (obj) => {
    movie = new Movie(obj);
    await movie.save();
    return movie._id;
  };
  
  const updateMovie = async (id, obj) => {
    await Movie.findByIdAndUpdate(id, obj);
    return 'Updated!';
  };
  
  const deleteMovie = async (id) => {
    await Movie.findByIdAndDelete(id);
    await Subscription.deleteMany({movieid: id});
    return 'Deleted!';
  };


module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
  };

/*
const generateObj = async (movies) => {

    let movies_with_members = []
    
    for await (const movie of movies) {

      let movie_with_members = {}
      movie_with_members._id = movie._id
      movie_with_members.name = movie.name
      movie_with_members.year = movie.year
      movie_with_members.genres = movie.genres
      movie_with_members.image = movie.image
      movie_with_members.members= []

      let movie_subscribers = await Subscription.find({movieid: movie._id});

      if(movie_subscribers)
       {
        for await (const subscriber of movie_subscribers) {
          let subscription_member = await Member.find({_id: subscriber.memberid});
          let movie_member = {}
          movie_member._id = subscription_member[0]._id
          movie_member.name = subscription_member[0].name
          movie_member.email = subscription_member[0].email
          movie_member.city = subscription_member[0].city
          movie_with_members.members.push(movie_member)
        }
       }
      movies_with_members.push(movie_with_members)
    };
    return movies_with_members;
  };
  */