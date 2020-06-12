import React from 'react';


const Header = () =>{

    return(
        <div>
            <h2 className="text-center">Welcome to Todo List</h2>

            {/* Menu */}
            <div className="navbar">
                
                <a href="#new">New Task</a>
                <a href="#about">About</a>

            </div>
        </div>
    )
}
export default Header;