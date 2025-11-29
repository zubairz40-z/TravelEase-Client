import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Login =()=>{

    const [error,setError]=useState("");
    const {loginUser,googleLogin}=useAuth();

    const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    loginUser(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(from, { replace: true }); 
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

    return(

        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 m-10">

        

        <div className="w-full max-w-md p-8 space-y-3 rounded-2xl bg-white dark:text-gray-800 shadow-md border-slate-100">

	<h1 className="text-2xl font-bold text-center">Login</h1>

      {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

	<form onSubmit={handleSubmit} className="space-y-6">
		<div className="space-y-1 text-sm">
			<label htmlFor="email" className="block dark:text-gray-600">Email</label>
			<input type="email" name="email" id="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label htmlFor="password" className="block dark:text-gray-600">Password</label>
			<input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
			<div className="flex justify-end text-xs dark:text-gray-600">
				<a rel="noopener noreferrer" href="#">Forgot Password?(disabled)</a>
			</div>
		</div>
		<button className="block w-full p-3 text-center rounded-md dark:text-gray-50 bg-red-700 text-sm font-semibold hover:bg-red-900 transition-colors">Login</button>
        
	</form>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
		<p className="px-3 text-sm dark:text-gray-600">Login with Google</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
	</div>
	<div className="flex justify-center space-x-4">
		<button onClick={handleGoogleLogin} aria-label="Log in with Google" className="p-3 rounded-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
		</button>
		
	</div>
	<p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
	<NavLink to="/Register" className="underline dark:text-gray-800">Sign up</NavLink>	
	</p>
</div>

</div>
    )
}

export default Login;