import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css"


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const Handlelogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (error) {
      console.log("Login failed: " + error.message);
    }
  };

  
  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={Handlelogin}>
        <input 
          type="email"
          placeholder="email"
          onChange={e => setemail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setpassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form> */}

      <div className="absolute inset-0 bg-black/40 m-30">
    
      </div>

      {/* Glassy Auth Form */}
      <div className="relative z-10 w-full max-w-sm p-8 bg-white/40  border-white/20 rounded-xl shadow-lg text-white m-auto mt-40">
      
        <h2 className="text-2xl font-semibold text-center mb-6">
        </h2>
        
        <form onSubmit={Handlelogin} className="space-y-5">
          
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="you@example.com"
              value={email}
              onChange={e=>setemail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="••••••••"
              value={password}
              onChange={e=>setpassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Create Account
          </button>
        </form>
        {/* <p className="text-center text-sm mt-4 text-white/80">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={handleToggle}
            className="ml-1 text-white font-semibold underline hover:text-gray-200"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p> */}
      </div>
    </div>
  );
};
export default Login;
