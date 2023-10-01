import React from 'react'
import '../Navbar/navbar.css'
import { useNavigate } from 'react-router-dom'
const NavbarLogin = () => {
    const navigate = useNavigate()
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
                            <button className='login' onClick={()=> navigate('/login')}>Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavbarLogin