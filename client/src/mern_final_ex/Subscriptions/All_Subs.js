import React from 'react'
import {useSelector} from 'react-redux'
import SubComp from './SubComp'

function All_Subs() {

  const storeData = useSelector(state => state)
  
  return (
    <div>
      {
          storeData.members.map(sub =>
            {
              return <span key={sub._id}><SubComp sub={sub}/><br/></span>
            })
        }
    </div>
  )
}

export default All_Subs