import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export const Signup = () => {
  const [formData, setFormData] = useState({})
  const[error, setError] = useState(null)
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    const res = await fetch ('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null)
    navigate('/sign-in');
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold mt-7 text-3xl">Welcome to WillowHomes</h1>
      <p className='text-center mb-4 mt-4 opacity-60'>New Account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username' onChange={handleChange}/>
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password' onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
