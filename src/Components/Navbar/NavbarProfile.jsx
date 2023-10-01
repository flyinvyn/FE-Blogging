import React, { useEffect, useState } from 'react'
import profile from '../../Assets/img/noimage.png'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const NavbarProfile = () => {
    const id = localStorage.getItem("id")
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${id}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const Logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <header>
            <nav className="navbar navbar-light my-4">
                <div className="container">
                    <a href='/' className="navbar-brand">
                        <p className='brand'>Home</p>
                    </a>
                    <div className="d-flex align-items-center bar">
                        {data.map((item, index) => (
                            <div key={index} className="dropdown">
                                <a href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className='avatar' src={item.users_photo === "undefined" || undefined ? profile : item.users_photo} alt="profile" />
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={'/profile'}>Profile</Link>
                                    <Link className="dropdown-item" onClick={Logout} to={'/'}>Logout</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavbarProfile