import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-700">Willow</span>
                    <span>Homes</span>
                </h1>
            </Link>
            
            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="Search..."  
                className="bg-transparent focus:outline-none w-24 sm:w-64 h-3"
                />
                <FaSearch/>
            </form>
            <ul className='flex gap-4'>
                <Link to='/Home'>
                    <ul href="/" className='hidden sm:inline text-slate-700 hover:underline'>Home</ul>
                </Link>
                <Link to='/about'>
                    <ul href="/home" className='hidden sm:inline text-slate-700 hover:underline'>About</ul>
                </Link>
                <Link to='/sign-in'>
                    <ul href="/home" className='hidden sm:inline text-slate-700 hover:underline'>Sign in</ul>
                </Link>
                
            </ul>
        </div>
    </header>
  )
}
