import { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserStart, updateUserSucess, updateUserFailure } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
export const Profile = () => {
  const [formData, setFormData] = useState({});
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch= useDispatch();
  const handleChange = (e) => {
    // updating form data, create new object using spread operator, 
    // Updating property with id to the new value entered
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl front-semibold text-center my-5">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src="pfp" alt="pfp" />
        <label>Username: </label>
        <input 
          type="text" 
          placeholder="username" 
          className="border p-3 rounded-lg" 
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}/>
        <label>Email: </label>
        <input 
          type="email" 
          placeholder="email" 
          className="border p-3 rounded-lg" 
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}/>
        <label>Password: </label>
        <input 
          type="password" 
          placeholder="password" 
          className="border p-3 rounded-lg" 
          id='password'
          onChange={handleChange}/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-70">
        {loading? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-600 mt-5">{error? error: ''}</p>
    </div>
  )
}
