import React from 'react';
import {Link} from 'react-router-dom';


const Header = () =>{

    return(
        <div>
            <h2 className="text-center">Welcome to Todo List</h2>

            {/* Menu */}
            <div className="navbar">
                
                <Link to="/new">New Task</Link>
                <a href="#about">About</a>

            </div>
        </div>
    )
}
export default Header;