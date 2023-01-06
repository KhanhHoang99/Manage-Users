import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/userService';

function ModalConfirm({show, handleClose, handleDeleteUserFromModal, user}) {

    const confirmDelete = async (user) => {
        let res = await deleteUser(user.id);
        if(res.statusCode === 204){
            handleDeleteUserFromModal(user.id)
            handleClose();
            toast.success("Delete user successfully!", {
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
          <Modal.Title>Delelte User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Do you want delete this user</p>
            <strong>Email user: {user.email}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete(user)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;