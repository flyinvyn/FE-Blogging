import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({articles_id}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/articles/${articles_id}`)
    .then(()=>{
        alert('deleted')
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <h4>Are you sure wanna delete this product?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">Delete</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalDelete;