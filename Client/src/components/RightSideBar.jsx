import React from 'react'
import assets from '../assets/assets'

const RightSideBar = ({SelectedUser}) => {

  return SelectedUser && (
    <div className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-scroll ${SelectedUser ? "max-md:hidden" : ""}`}>
      <div className="pt-16  flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img src={SelectedUser ?.profilePic  || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {SelectedUser.fullName}</h1>





          <p className='px-10 mx-auto'>{SelectedUser.bio}</p>
      </div>
    </div>
  )
}

export default RightSideBar