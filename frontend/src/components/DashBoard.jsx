import PieChart  from './PieChart'
import React from 'react'

const DashBoard = () => {
  return (
    <div className='py-15 w-full h-screen '>
        <div className='flex justify-center items-center '>
            <PieChart />
        </div>
        <div></div>
        
    </div>
  )
}

export default DashBoard