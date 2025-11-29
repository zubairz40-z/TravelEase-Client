import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const MainLayout =()=>{
    return(
    <div className="bg-slate-50">
        <header>
            <Navbar></Navbar>
        </header>

        <main>
            <Outlet></Outlet>
        </main>

        <footer>
            <Footer></Footer>
        </footer>
    </div>

    )
}

export default MainLayout;