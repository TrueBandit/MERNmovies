import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate , useParams  } from "react-router-dom";
import ServerUtils from '../Utils/ServerUtils';

function Edit_Sub() {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeData = useSelector(state => state)

    
    const [newMember, setNewMember] = useState({_id : "", name : "", email : "", city : ""})
    const [validationList, setValidation] = useState({name : true, email : true, city : true, submitted : false})
    const [MemberName, setMemberName] = useState("")
    
    useEffect(() =>
    {
        let storeMember = {...storeData.members.find(mem => mem._id == params._id)}
        setMemberName(storeMember.name)
        setNewMember(storeMember)
    },[])

    useEffect(() => {
      setValidation({
        ...validationList,
        name: newMember.name !== "",
        email: newMember.email !== "",
        city: newMember.city !== ""
      });
  }, [newMember]);
    
    const customSubmit = async () =>
    {
        if (validationList.name && validationList.email && validationList.city) {
        let resp = await ServerUtils.update("member", newMember);
        dispatch({type : "UPDATE", payload : {dataObj : newMember, entity : "member"}})
        navigate('/subscriptions')
        }
        setValidation({...validationList, submitted : true})
  }
  
  return (
    <div>
    <h3>Edit Member : {MemberName}</h3>
    <table align='center'><tbody>
      <tr align='left'><td>Name:</td><td><input type='text' value={newMember.name} onChange={e => {setNewMember({...newMember, name : e.target.value})}}/></td></tr>
      {
        !validationList.name && validationList.submitted && <tr><td colSpan="2"><b>Member name is mandatory</b></td></tr>
      }
      <tr align='left'><td>Email:</td><td><input type='text' value={newMember.email} onChange={e => {setNewMember({...newMember, email : e.target.value})}}/></td></tr>
      {
        !validationList.email && validationList.submitted && <tr><td colSpan="2"><b>Email is mandatory</b></td></tr>
      }
      <tr align='left'><td>City:</td><td><input type='text' value={newMember.city} onChange={e => {setNewMember({...newMember, city : e.target.value})}}/></td></tr>
      {
        !validationList.city && validationList.submitted && <tr><td colSpan="2"><b>City is mandatory</b></td></tr>
      }

    </tbody></table><br/>
    <button onClick={customSubmit}>Save</button>&nbsp;&nbsp;<button onClick={() => navigate('/subscriptions')}>Cancel</button><br/><br/>
    </div>
  )
}

export default Edit_Sub

