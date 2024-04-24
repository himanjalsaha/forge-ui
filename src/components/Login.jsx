import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {
  const navigate = useNavigate()
  const handlelogin = async (e) => {
      e.preventDefault()
      const email = e.target[0].value
      const password = e.target[1].value
      
      try{
          
           signInWithEmailAndPassword(auth , email , password)
          navigate("/")


      }
      catch(error) { 
          console.log(error);
      }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800 -50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md bg-blue-200 rounded p-10 w-full space-y-8 gap-3">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form onSubmit={handlelogin} className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px gap-5 flex flex-col ">
            <div >
              <label htmlFor="username" className="sr-only">Email</label>
              <input id="username" name="username" type="email" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
        
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M4 8V6a4 4 0 118 0v2h.585l.707-.707a1 1 0 011.414 1.414l-2.5 2.5a1 1 0 01-1.414 0l-2.5-2.5A1 1 0 014.415 8H5z" clipRule="evenodd" />
                </svg>
              </span>
              Login
            </button>
            <div>do not have am account? <Link to="/signup" className='text-blue-500'>sign up</Link></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
