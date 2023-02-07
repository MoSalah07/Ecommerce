import React from 'react';
import TitleHeader from '../middle/TitleHeader';
import SearchHeader from '../middle/SearchHeader';
import IconsHeader from './IconsHeader';

function HeaderMiddle() {
  return (
      <div className='flex justify-between items-center h-2/6'>
          <TitleHeader />
          <SearchHeader />
          <IconsHeader />
    </div>
  )
}

export default HeaderMiddle