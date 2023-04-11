import React from 'react'
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

function Movie_Subs(props) {

    const storeData = useSelector(state => state)

    const [members, setMembers] = useState([])
  
    useEffect(() => {
        let movie_subscriptions = storeData.subscriptions.filter(x => x.movieid == props.movieID)
        let subscribed_members = []
        movie_subscriptions.forEach(sub => {
            let member_data = storeData.members.filter(x => x._id == sub.memberid)[0]
            let sub_date = sub.date
            let obj = {"member_data" : member_data, "sub_date" : sub_date}
            subscribed_members.push(obj)
        });

        setMembers(subscribed_members)
    }, [props.movieID]);


  return (
    <div style={{border:'solid 1px blue', textAlign:'left'}}>
        Subscriptions Watched
        <ul>
        {
          members.map(member =>
            {
              return <li key={member.member_data._id}><Link to={"../subscriptions/edit/" + member.member_data._id}>{member.member_data.name}</Link>, {member.sub_date}</li>
              
            })
        }
        </ul>
    </div>
  )
}

export default Movie_Subs