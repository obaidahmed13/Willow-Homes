import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess,  signInFailure} from '../redux/user/userSlice'

export const Signin = () => {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispath(signInStart());
      const res = await fetch ('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispath(signInFailure(data.message));
        return;
      }
      dispath(signInSuccess(data));
      navigate('/');
      } catch (error) {
        dispath(signInFailure(error.message));
      }
    };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold m-7 text-3xl">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
          <label>Email: </label>
          <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email' onChange={handleChange}/>
          <label>Password: </label>
          <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password' onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-600'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
