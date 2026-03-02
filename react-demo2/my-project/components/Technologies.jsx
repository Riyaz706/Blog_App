import React from 'react'
import { NavLink, Outlet } from 'react-router'

function Technologies() {
  return (
    <div className='py-8'>
      <ul className='flex gap-8 border-b border-gray-200 mb-8 pb-2'>
        <li>
          <NavLink to="/technologies/nodejs" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700 pb-2'}>Node JS</NavLink>
        </li>
        <li>
          <NavLink to="/technologies/java" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700 pb-2'}>Java</NavLink>
        </li>
        <li>
          <NavLink to="/technologies/vue" className={({ isActive }) => isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700 pb-2'}>Vue</NavLink>
        </li>
      </ul>
      <div className='p-4 bg-gray-50 rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default Technologies