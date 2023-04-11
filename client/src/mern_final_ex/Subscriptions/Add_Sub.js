import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import ServerUtils from '../Utils/ServerUtils';

function Add_Sub() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newMember, setNewMember] = useState({name : "", email : "", city : ""})
  const [validationList, setValidation] = useState({name : false, email : false, city : false, submitted : false})

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
      let memberObj = {...newMember}
      let resp = await ServerUtils.add("member", memberObj);
      memberObj._id = resp.data
      dispatch({type : "ADD", payload : {dataObj : memberObj, entity : "member"}})
      navigate('/subscriptions')
    }
    setValidation({...validationList, submitted : true})
  }
  
  return (
    <div>
    <h3>Add New Member</h3>
    <table align='center'><tbody>
      <tr align='left'><td>Name:</td><td><input type='text' onChange={e => {setNewMember({...newMember, name : e.target.value})}}/></td></tr>
      {
        !validationList.name && validationList.submitted && <tr><td colSpan="2"><b>Member name is mandatory</b></td></tr>
      }
      <tr align='left'><td>Email:</td><td><input type='text' onChange={e => {setNewMember({...newMember, email : e.target.value})}}/></td></tr>
      {
        !validationList.email && validationList.submitted && <tr><td colSpan="2"><b>Email is mandatory</b></td></tr>
      }
      <tr align='left'><td>City:</td><td><input type='text' onChange={e => {setNewMember({...newMember, city : e.target.value})}}/></td></tr>
      {
        !validationList.city && validationList.submitted && <tr><td colSpan="2"><b>City is mandatory</b></td></tr>
      }

    </tbody></table><br/>
    <button onClick={customSubmit}>Save</button>&nbsp;&nbsp;<button onClick={() => navigate('/subscriptions')}>Cancel</button><br/><br/>
    </div>
  )
}

export default Add_Sub

