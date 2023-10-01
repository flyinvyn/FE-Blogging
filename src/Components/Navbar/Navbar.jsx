import React, { useEffect, useState } from 'react'
import profile from '../../Assets/img/noimage.png'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {
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
            <nav className="navbar navbar-expand-lg navbar-light my-4">
                <div className="container">
                    <a href='/' className="navbar-brand">
                        <p className='brand'>Blogging Platform Gallery</p>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse ' id="navbarNavDropdown">
                        <div className="d-flex align-items-center bar">
                            <a className='me-4 home' href="/">Home</a>
                            
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
                </div>
            </nav>
        </header>
    )
}

export default Navbar