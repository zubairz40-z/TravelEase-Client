import React from "react";
import { NavLink } from "react-router";
const ErrorPage=()=>{
    return(
        <div className="border border-2 border-slate-100">
        <div className="min-h-screen flex flex-col items-center justify-center w-11/12 mx-auto bg-gray-50 text-center space-y-2 bg-slate-50">
            <h1 className="text-5xl text-center mx-auto justify-center font-bold text-red-800">Error 404</h1>
          
          <img src="/error404page.png" alt=""  className="w-full max-w-md mx-auto"/>

           <NavLink  to="/"  className="btn bg-red-800 rounded-lg p-5 text-xl text-slate-50">Back to Home</NavLink>
        
           


        </div>
        </div>
    )
}

export default  ErrorPage;