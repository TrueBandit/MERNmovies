  const Movie = require('../data_models/movieModel');
  const Subscription = require('../data_models/subscriptionModel');
  const Member = require('../data_models/memberModel');

    const getAllMembers = async () => {
      let members = await Member.find({})
      return members
      //return generateObj(members)
    };
  
    const getMemberById = async (id) => {
      let member = Member.findById(id)
      return member
      //return generateObj(member)
    };
    
    const addMember = async (obj) => {
      member = new Member(obj);
      await member.save();
      return member._id;
    };
    
    const updateMember = async (id, obj) => {
      await Member.findByIdAndUpdate(id, obj);
      return 'Updated!';
    };
    
    const deleteMember = async (id) => {
      await Member.findByIdAndDelete(id);
      await Subscription.deleteMany({memberid: id});
      return 'Deleted!';
    };
  
  
  module.exports = {
      getAllMembers,
      getMemberById,
      addMember,
      updateMember,
      deleteMember
    };

    /*
    const generateObj = async (members) => {
  
      let members_with_movies = []
  
      for await (const member of members) {
  
        let member_with_movies = {}
        member_with_movies._id = member._id
        member_with_movies.name = member.name
        member_with_movies.email = member.email
        member_with_movies.city = member.city
        member_with_movies.movies= []
  
        let member_subscriptions = await Subscription.find({memberid: member._id});
  
        if(member_subscriptions)
         {
          for await (const subscriber of member_subscriptions) {
            let subscription_movie = await Movie.find({_id: subscriber.movieid});
            let member_movie = {}
            member_movie._id = subscription_movie[0]._id
            member_movie.name = subscription_movie[0].name
            member_movie.year = subscription_movie[0].year
            member_movie.genres = subscription_movie[0].genres
            member_movie.image = subscription_movie[0].image
            member_with_movies.movies.push(member_movie)
          }
         }
        members_with_movies.push(member_with_movies)
      };
      return members_with_movies;
    };
    */