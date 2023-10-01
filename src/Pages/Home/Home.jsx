import React, { useEffect, useState } from 'react'
import profile from '../../Assets/img/noimage.png'
import '../Home/home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EllipsisText from '../../Components/slice'
import NavbarAuth from '../../Auth/NavbarAuth'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/articles`)
            .then((res) => {
                console.log(res.data.data[0]);
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = data.filter((item) =>
        item.articles_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className='container'>
            <NavbarAuth />
            <section>
                <div className='d-flex flex-column align-items-center justify-content-center my-5'>
                    <h1 className='mx-auto'>Blogging Platform</h1>
                    <p>Selamat membaca !</p>
                    <input className="form-control w-25" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                </div>
                <div className="row">
                    {currentItems.map((item, index) => (
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                            <div key={index} className="card">
                                <img src={item.articles_photo === "null" || null ? profile : item.articles_photo} className="card-img-top h-75" alt="..." />
                                <div className="card-body">
                                    <Link className='link' to={`/article/${item.articles_id}`}>
                                        <h5 className="card-title">{item.articles_title === "null" || null ? "Masukan title" : item.articles_title}</h5>
                                    </Link>
                                    <p className="card-text">
                                        <EllipsisText text={item.articles_content} maxChar={160} />
                                    </p>
                                    <span className='d-flex align-items-center'>
                                        <img src={item.users_photo} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="avatar" />
                                        <p className="card-text mx-3">{item.articles_writer}</p></span>
                                    <p style={{ color: "blue" }} className='my-3'>{item.articles_created}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
            <div className='d-flex justify-content-center my-3'>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                    <button className='btn btn-info mx-1' key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <section>
                <footer>
                    <p className='d-flex justify-content-center'>&copy; Copyright 2023</p>
                </footer>
            </section>
        </div >
    )
}

export default Home