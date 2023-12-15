export const Profile = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl front-semibold text-center my-5">Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src="pfp" alt="pfp" />
        <label>Username: </label>
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username'/>
        <label>Email: </label>
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email'/>
        <label>Password: </label>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password'/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-70">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
