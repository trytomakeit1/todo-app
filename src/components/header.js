import React from 'react';
import {Link} from 'react-router-dom';


const Header = () =>{

    return(
        <div>
            <h2 className="text-center">Welcome to Todo List</h2>

            {/* Menu */}
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/new">New Task</Link>
                <Link to="/about">About</Link>

            </div>
        </div>
    )
}
export default Header;