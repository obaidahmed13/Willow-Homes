import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state=>state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm')
    if (searchTermFromURL) {
        setSearchTerm(searchTermFromURL)

    }
    // useEffect is triggered when search term is changed
  }, [location.search])


  return (
    <header className="shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-700">Willow</span>
                    <span>Homes</span>
                </h1>
            </Link>
            
            <form onClick={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="Search..."  
                className="bg-transparent focus:outline-none w-24 sm:w-64 h-3"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch/>
                </button>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <ul className='hidden sm:inline text-slate-700 hover:underline'>Home</ul>
                </Link>
                <Link to='/about'>
                    <ul href="/home" className='hidden sm:inline text-slate-700 hover:underline'>About</ul>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="pfp" />
                ) : (
                    <ul href="/home" className='hidden sm:inline text-slate-700 hover:underline'>Sign in</ul>
                )}
                </Link>
                
            </ul>
        </div>
    </header>
  )
}
