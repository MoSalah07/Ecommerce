import React from 'react'
import HeadLinks from './HeadLinks'
import HeadList from './HeadList'


function HeaderTop() {
  return (
      <div className='flex justify-between items-center h-2/6'>
          <HeadList />
          <HeadLinks />
    </div>
  )
}

export default HeaderTop