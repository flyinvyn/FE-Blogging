// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const ModalUpdate = ({
    articles_id,
    articles_title,
    articles_writer,
    articles_content,
    articles_photo,
}) => {
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [file, setFile] = useState("");
    const handleShow = () => setShow(true);
    const [preview, setPreview] = useState("");
    //   let [products, setProducts] = useState([]);
    const [data, setData] = useState({
        articles_title,
        articles_writer,
        articles_content,
    });

    let handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("articles_title", data.articles_title);
        formData.append("articles_writer", data.articles_writer);
        formData.append("articles_content", data.articles_content);
        formData.append("articles_photo", file);
        axios.put(`${process.env.REACT_APP_BASEURL}/api/articles/${articles_id}`, formData)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    Toast.fire({
                        title: "Update article successfully.",
                        icon: "success",
                    }).then(function () {
                        // Redirect the user
                          window.location.reload()
                    });
                } else {
                    alert("gagal")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Update
            </Button>
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="form-group">
                            <label for="name">Title</label>
                            <input
                                type="text"
                                name="articles_title"
                                class="form-control"
                                value={data.articles_title}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label for="name">Writer</label>
                            <input
                                type="text"
                                name="articles_writer"
                                class="form-control"
                                value={data.articles_writer}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label for="price">Content</label>
                            <textarea
                                type="text"
                                name="articles_content"
                                class="form-control"
                                value={data.articles_content}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label for="name">Image Article</label>
                            {preview ? (
                                <figure className="">
                                    <img src={preview} width={100} height={100} alt="product" />
                                </figure>
                            ) : (
                                ""
                            )}
                            <input
                                type="file"
                                name="articles_photo"
                                class="form-control"
                                value={data.articles_photo}
                                onChange={loadImage}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" className="btn-success">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default ModalUpdate;