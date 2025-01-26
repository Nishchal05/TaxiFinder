import React from 'react'
import logo from '../../public/logo.jpg'
import { UserButton } from '@clerk/nextjs'
const Header = () => {
    const content=[{
        name:'Book Ride',
        path:'/BookRide'
    },
{
    name:'Package Delivery',
    path:'/PackageDelivery'
}]
  return (
    <div className=' flex justify-between p-4 shadow-xl'>
    <div className=' flex items-center gap-3'><img src={logo.src} alt='logo' width={40}/>
    <h2 className=' text-black font-bold text-3xl'>TaxiHub</h2></div>
    <div className='flex gap-3 items-center'>
        {content.map((item,index)=>(
            <div key={index} className='hidden md:flex text-black cursor-pointer hover:opacity-20'>
                {item.name}
            </div>
        ))}
        <UserButton/>
    </div>
    </div>
  )
}

export default Header