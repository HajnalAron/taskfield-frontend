import { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

interface NewTaskModalProps {
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean>>;
}

function NewTaskModal(props: NewTaskModalProps) {
  return (
    <Modal
      size="lg"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide;
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function NewTask() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <NewTaskModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
