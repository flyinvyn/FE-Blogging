import React, { useState } from 'react';
import {
    FaBookOpen,
    FaBars,
    FaUserAlt,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../Sidebar/sidebar.css'


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/profile/article/create",
            name:"Article",
            icon:<FaBookOpen/>
        },
        {
            path:"/profile/article/list",
            name:"List Articles",
            icon:<FaThList/>
        },
    ]
    return (
        <div className="d-flex">
           <div style={{width: isOpen ? "330px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="dash-logo">My Profile</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars className='toggle' onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="links" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <div className='content'>{children}</div>
        </div>
    );
};

export default Sidebar;