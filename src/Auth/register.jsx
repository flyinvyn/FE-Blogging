import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const Register = () => {
    const [data, setData] = useState({
        users_name: "",
        users_email: "",
        users_password: "",
        users_confirmpassword: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        console.log(data);
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_BASEURL}/api/users/register`, data)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    Toast.fire({
                        title:"Register Succesfuly!",
                        icon: "success",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/login";
                    });
                } else {
                    Toast.fire({
                        title: "Sorry, this email is already registered.",
                        icon: "error",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/register";
                    });
                }
            })
            .catch((err) => {
                console.log(err.response);
                alert("gagal register");
            });
    };
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name='users_name'
                        onChange={handleChange}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username"><span style={{color:"red"}}>*</span>Email:</label>
                    <input
                        type="email"
                        name='users_email'
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><span style={{color:"red"}}>*</span>Password:</label>
                    <input
                        type="password"
                        name='users_password'
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><span style={{color:"red"}}>*</span>Confirm password:</label>
                    <input
                        type="password"
                        name='users_confirmpassword'
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button className='button' type="button" onClick={handleRegister}>Register</button>
                <p className='mt-3'>Already have an account? <Link to={'/login'} className='link'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register