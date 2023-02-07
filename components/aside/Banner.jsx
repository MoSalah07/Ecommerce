import React from 'react'
import Image from 'next/image'

function Banner() {
  return (
      <div className='mt-8'>
          <Image src='/img/s-banner2.jpg' alt='no found' width={100} height={100} layout='responsive' priority/>
    </div>
  )
}

export default Banner