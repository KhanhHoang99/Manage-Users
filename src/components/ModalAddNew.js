
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { postCreateUser } from '../services/userService';
import { toast } from 'react-toastify';

function ModalAddNew({show, handleClose, handleUpdateTable}) {

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async (name, job) => {
        let res = await postCreateUser(name, job);

        if(name && job) {
          if(res && res.id){
              handleClose();
              const user = {first_name: name, id: res.id}
              handleUpdateTable(user)
              setName('');
              setJob('');
              toast.success("Add user successfully!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              })
          }else {
              toast.error("Add user error!", {
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

    }

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        animation={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
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
          <Button variant="primary" onClick={() => {handleSaveUser(name, job)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;