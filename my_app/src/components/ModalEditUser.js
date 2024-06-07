import { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap' ; 
import { putUpdateUser } from "../services/userServices";
import { toast} from 'react-toastify';

const ModalEditUser = (props) => {

      const {show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
      const [name, setName] = useState("");
      const [job, setjob] = useState("");

      const handleEditUser = async () => {
       let res = await putUpdateUser(name, job);
       if(res && res.updatedAt){
        //success
        handleEditUserFromModal({
          first_name: name,
          id: dataUserEdit.id
        })
        handleClose();
        toast.success("Update user succeed ! ")
       }
      }

      // useEffect(() => {
      //       if (show) {
      //           setName(dataUserEdit.first_name)
      //       }
      // }, [dataUserEdit])

      useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [show, dataUserEdit]);

    return (
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
  
  <div classname="mb-3">
    <label className="form-label">Name</label>
    <input 
      type="text" 
      className="form-control"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  </div>
  <div className="mb-3">
    <label className="form-label">Job</label>
    <input 
      type="text"
      className="form-control" 
      value={job}
      onChange={(event) => setjob(event.target.value)}
      />
  </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=> handleEditUser()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
      );
}

export default ModalEditUser;