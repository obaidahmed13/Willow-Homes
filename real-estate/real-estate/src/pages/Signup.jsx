import {Link} from 'react-router-dom'
export const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold mt-7 text-3xl">Welcome to WillowHomes</h1>
      <p className='text-center mb-4 mt-4 opacity-60'>New Account</p>
      <form className="flex flex-col gap-4" >
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username' />
        <input type="text" placeholder="email" className="border p-3 rounded-lg" id='email' />
        <input type="text" placeholder="password" className="border p-3 rounded-lg" id='password' />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Submit</button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
