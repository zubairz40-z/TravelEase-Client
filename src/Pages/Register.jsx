import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

const Register =()=>{
    const [error, setError] = useState("");
  const { createUser, googleLogin, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.username.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const currentUser = result.user;

      
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          // update context user
          setUser({
            ...currentUser,
            displayName: name,
            photoURL: photoURL,
          });
        });
      })
      .then(() => {
        toast.success("Registration successful");
        navigate("/"); // go to Home
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        toast.error("Registration failed");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

    return(
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 m-10">

        

        <div className="w-full max-w-md p-8 space-y-3 rounded-2xl bg-white dark:text-gray-800 shadow-md border-slate-100">

	<h1 className="text-2xl font-bold text-center">Register</h1>

    {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

	<form onSubmit={handleSubmit} action="" className="space-y-6">
		<div className="space-y-1 text-sm">
			<label htmlFor="username" className="block dark:text-gray-600">Username</label>
			<input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
        
              <div className="text-sm space-y-1">
            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="text-sm space-y-1">
            <label htmlFor="photo" className="block dark:text-gray-600">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

		<div className="space-y-1 text-sm">
			<label htmlFor="password" className="block dark:text-gray-600">Password</label>
			<input type="password" name="password" id="password" placeholder="........." className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
			
             <p className="text-[11px] text-slate-500">
              Must be at least 6 characters, include 1 uppercase and 1 lowercase
              letter.
            </p>
		</div>

     
          
		<button className="block w-full p-3 text-center rounded-md dark:text-gray-50 bg-red-700 text-sm font-semibold hover:bg-red-900 transition-colors">Register</button>
	</form>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
		<p className="px-3 text-sm dark:text-gray-600">Login with Google</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
	</div>
	<div className="flex justify-center space-x-4">
		<button aria-label="Log in with Google" className="p-3 rounded-sm"   onClick={handleGoogleLogin}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
		</button>
		
	</div>
	<p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
	<NavLink to="/Login"className="underline dark:text-gray-800">Log In</NavLink>	
	</p>
</div>

</div>
    )
}

export default Register;