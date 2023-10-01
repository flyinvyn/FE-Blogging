import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
// import profile from '../../Assets/img/noimage.png'
import '../DetailArticle/article.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const DetailArticle = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/articles/${id}`)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id])
  return (
    <>
      <div className="container">
        <Navbar />
        <section>
          <div className='d-flex flex-column align-items-center justify-content-center my-5'>
            <h1 className='mx-auto'>Website Blog</h1>
            <p>Selamat membaca !</p>
          </div>
          {data.map((item, index) => (
            <div key={index} className="card">
              <img src={item.articles_photo} className="card-img-top image" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.articles_title}</h5> <br />
                <p className="card-text">{item.articles_content}</p> <br />
                <span className='d-flex align-items-center'>
                  <img src={item.users_photo} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="avatar" />
                  <p className="card-text mx-3">{item.articles_writer}</p></span>
                <p style={{ color: "blue" }} className='my-3'>{item.articles_created}</p>
              </div>
            </div>
          ))}
        </section >
        <a href='/' className='btn btn-primary d-flex justify-content-center mt-5'>More article</a>
        <footer>
          <p className='d-flex justify-content-center mt-5'>&copy; Copyright 2023</p>
        </footer>
      </div>
    </>
  )
}

export default DetailArticle