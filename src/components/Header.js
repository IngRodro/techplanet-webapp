import React from 'react'
import Logo from './Logo'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-16 shadow-sm border'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <section className=''>
          <Link to={'/'}><Logo width={120}/></Link>
        </section>

        <section className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-r-full focus-within:shadow-sm pl-1'>
          <input type="text" placeholder='Ingrese su búsqueda ...' className='w-full outline-none pl-2'/>
          <div className='text-lg min-w-[50px] h-8 bg-blue-700 flex items-center justify-center rounded-r-full'>
            <GrSearch color='white'/>
          </div>

        </section>

        <section className='flex items-center gap-7'>
          <div className='text-3xl'>
            <FaRegCircleUser />
          </div>
          <div className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-blue-700 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                <p className='text-sm'>0</p>
              </div>
          </div>

          <div>
            <Link to={'/login'} className="px-3 py-1 rounded-full bg-blue-700 text-white hover:bg-blue-900">Login</Link>
          </div>
        </section>

      </div>
    </header>
  )
}

export default Header