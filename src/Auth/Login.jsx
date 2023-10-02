import React, { useState } from 'react'
import '../Auth/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        users_email: "",
        users_confirmpassword: ""
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    const onClick = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASEURL}/api/users/login`, data)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    Toast.fire({
                        title:
                            "Login Succesfuly!",
                        icon: "success",
                    })
                    localStorage.setItem("token", res.data.data.token_user)
                    localStorage.setItem("id", res.data.data.users_id)
                    navigate('/')
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Login failed',
                        text: 'Email or password wrong!',
                      })
                }
            })
            .catch((err) => {

                console.log(err);
            })
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username"><span style={{ color: "red" }}>*</span>Email:</label>
                    <input
                        type="email"
                        name='users_email'
                        onChange={onChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><span style={{ color: "red" }}>*</span>Password:</label>
                    <input
                        type="password"
                        name='users_confirmpassword'
                        onChange={onChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button className='button' type="button" onClick={onClick}>Login</button>
                <p className='mt-3'>Don't have an account? <Link to={'/register'} className='link'>Register</Link></p>
            </form>
        </div>
    )
}

export default Login