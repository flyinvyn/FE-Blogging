import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import NavbarProfile from '../../Components/Navbar/NavbarProfile'
import axios from 'axios'
import Swal from 'sweetalert2'

const Articles = () => {
  const id = localStorage.getItem("id")
  const [preview, setPreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState({
    articles_title: "",
    articles_writer: "",
    articles_content: "",
    users_id: id,
  });

  let handleUpload = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
    setPreview(URL.createObjectURL(image));
  };

  let handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("articles_title", data.articles_title);
    formData.append("articles_writer", data.articles_writer);
    formData.append("articles_content", data.articles_content);
    formData.append("users_id", data.users_id);
    formData.append("articles_photo", photo);
    axios.post(`${process.env.REACT_APP_BASEURL}/api/articles`, formData)
      .then((res) => {
        if (res.data.statusCode === 201) {
          Toast.fire({
            title: "Profile Changed",
            icon: "success",
          })
            .then(function () {
              // Redirect the user
              window.location.reload()
            });
        } else {
          alert("gagal")
            .then(function () {
              // Redirect the user
              window.location.href = "/profile/article/create";
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <>
      <Sidebar>
        <NavbarProfile />
        <div
          className="col-md-8 col-12"
          style={{
            backgroundColor: "#F5F5F5",
            width: "100%"
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="col-md-12 border container-fluid"
              style={{
                backgroundColor: "#FFF",
                borderRadius: 4,
                border: "1px solid #9B9B9B",
              }}
            >
              <div className=" col-md-12 border-bottom mt-3 p-0">
                <h4 className="font-weight-bold pt-2">Add article content</h4>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-5 mt-3 p-0 mb-4">
                    <p>Title</p>
                    <input
                      type="text"
                      className="form-control"
                      style={{ height: 48 }}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      name="articles_title"
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-2 mt-3 p-0 mb-4">
                  </div>
                  <div className="col-md-5 mt-3 p-0 mb-4">
                    <p>Writer</p>
                    <input
                      type="text"
                      className="form-control"
                      style={{ height: 48 }}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      name="articles_writer"
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className=" col-md-12 col-lg-5 p-0 mb-4">
                    <p>Content</p>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: 135 }}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      name="articles_content"
                      onChange={handleChange}
                      placeholder=""
                    />
                    <input type="hidden" name='users_id' value={id} />
                  </div>
                  <div className="col-md-2">
                  </div>
                  <div className='col-md-12 col-lg-5 p-0 mb-4'>
                    <p>Select image</p>
                    {preview ? (
                      <figure className="">
                        <img src={preview} width={160} height={105} alt="product" />
                      </figure>
                    ) : (
                      ""
                    )}
                    <input type="file" onChange={handleUpload} />
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-12 mb-4 text-right" style={{ marginTop: 30 }}>
              <button
                type="submit"
                className="btn btn-danger btn-cm"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-md-1"
          style={{ backgroundColor: "#F5F5F5" }}
        ></div>
      </Sidebar>
    </>
  )
}

export default Articles