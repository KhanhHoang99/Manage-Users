
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { putUpdateUser } from '../services/userService';
import { toast } from 'react-toastify';

function ModalEditUser({show, handleClose, user, handleEditUserFromEditModal}) {

    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    
    useEffect(() => {
      if(show) {
        setName(user.first_name);
      }
    }, [user])
    
    const handleEditUser = async (name, job) => {
      let res = await putUpdateUser(name, job);
      if(res && res.updatedAt) {
        handleEditUserFromEditModal({first_name: res.name, id: user.id})
        toast.success("Update user successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      })
      }
    }



  return (
    <>
      <Modal 
          show={show} 
          onHide={handleClose} 
          backdrop="static"
          keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Job</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter user job"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleEditUser(name, job)}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;