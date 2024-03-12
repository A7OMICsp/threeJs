import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to='/' className="w-12 h-12 rounded-lg items-center justify-center flex shadow-md font-bold bg-white">
            <p className='purple-gradient_text text-base'>AMV</p>
        </NavLink>

        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to='/about' className={({isActive}) => isActive ? 'text-purple-500' : 'text-black'}>About</NavLink>
            <NavLink to='/projects' className={({isActive}) => isActive ? 'text-purple-500' : 'text-black'}>Projects</NavLink>
            <NavLink to='/game' className={({isActive}) => isActive ? 'text-purple-500' : 'text-black'}>Game</NavLink>
            <NavLink to='/contact' className={({isActive}) => isActive ? 'text-purple-500' : 'text-black'}>Contact</NavLink>
        </nav>
    </header>
  )
}

export default Navbar