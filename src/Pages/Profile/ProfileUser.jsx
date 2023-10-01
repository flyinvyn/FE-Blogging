import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import noimage from '../../Assets/img/noimage.png'
import NavbarProfile from '../../Components/Navbar/NavbarProfile'
import axios from 'axios'
import Swal from 'sweetalert2'

const ProfileUser = () => {
  const id = localStorage.getItem("id");
  const [data, setData] = useState({
    users_name: "",
    users_phone: ""
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
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [preview, setPreview] = useState("");
  const [photo, setPhoto] = useState(null)
  const handleUpload = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('users_name', data.users_name)
    formData.append('users_phone', data.users_phone)
    formData.append('users_photo', photo)
    await axios
      .put(`${process.env.REACT_APP_BASEURL}/api/users/${id}`, formData)
      .then((response) => {
        setData(response);
        Toast.fire({
          title: "Profile Changed",
          icon: "success",
        });
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${id}`)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id])

  return (
    <>
      <Sidebar>
        <NavbarProfile />
        <div
          className="col-md-8 col-12"
          style={{ backgroundColor: "#F5F5F5", width: "100%" }}
        >
          <div
            className="col-md-12 border container-fluid"
            style={{
              backgroundColor: "#FFF",
              borderRadius: 4,
              border: "1px solid #9B9B9B",

            }}
          >
            <div className=" col-md-12 border-bottom mt-3 p-0">
              <h4 className="font-weight-bold pt-2">My Profile</h4>
              <p>Manage your profile information</p>
            </div>
            <div className="col-md-12">
              {/* {data.map((item, index) => ( */}
                <form onSubmit={handleUpdate}>
                  <div className="row">
                    <div className="col-md-8 ">
                      <div className="col-md-12 mt-5">
                        <div className="row">
                          <div
                            className="col-md-3 col-3 my-auto mb-3"
                          >
                            Username
                          </div>
                          <div className="col-md-8 col-9">
                            <input
                              type="text"
                              className="form-control"
                              style={{ height: 48 }}
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                              name="users_name"
                              value={data.users_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div
                            className="col-md-3 col-3 my-auto mb-3"
                          >
                            Email
                          </div>
                          <div className="col-md-8 col-9">
                            <input
                              type="text"
                              className="form-control"
                              style={{ height: 48 }}
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                              name="users_email"
                              value={data.users_email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div
                            className="col-md-3 col-3 my-auto mb-3"
                          >
                            Phone number
                          </div>
                          <div className="col-md-8 col-9">
                            <input
                              type="text"
                              className="form-control"
                              style={{ height: 48 }}
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-lg"
                              name="users_phone"
                              value={data.users_phone === "undefined" ? "" : data.users_phone}
                              placeholder='Enter phone number'
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div
                            className="col-md-3 text-right my-auto mb-3"
                            style={{ color: "#9B9B9B" }}
                          ></div>
                          <div className="col-md-3" style={{ color: "#9B9B9B" }}>
                            <button
                              type="submit"
                              className="btn btn-danger rounded-pill mb-3"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="col-md-12">
                        <div className="mt-3 mx-5">
                          <img
                            className='mx-4'
                            src={data.users_photo === "undefined" || undefined ? noimage : data.users_photo}
                            style={{ width: 160, height:160, borderRadius: "50%" }}
                            alt=""
                          />
                          {preview ? (
                            <figure className="">
                              <img src={preview} width={160} height={160} className='mx-4' alt="product" />
                            </figure>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="row">
                          <div className=" container text-center pt-3 ">
                            <button
                              type="button"
                              className="btn border rounded-pill mb-3"
                              style={{ width: 226, color: "#9B9B9B" }}
                              data-toggle="modal"
                              data-target="#addressModal"
                            >
                              <input type="file" name='users_photo' onChange={handleUpload} style={{ width: 200, color: "#9B9B9B" }} />
                              {/* Select image */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              {/* ))} */}
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}

export default ProfileUser