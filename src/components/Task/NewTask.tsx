import { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { Workspace } from "../../features/workspaces/Workspace";
import axios from "axios";
import { store } from "../../app/store";
import { getActiveWorkspaceTasks } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";

interface NewTaskModalProps {
  workspacedata: Workspace;
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean>>;
}

function NewTaskModal(props: NewTaskModalProps) {
  const activeWorkspace = useAppSelector(
    (state) => state.userSlice.activeWorkspace
  );

  const [newTask, setNewTask] = useState({
    name: "",
    summary: "",
    estimate: "",
    due: ""
  });

  const makeNewTask = async () => {
    try {
      const request = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/tasks/" + activeWorkspace,
        {
          ...newTask,
          due: newTask.due.toString()
        }
      );
      if (request.status === 201) {
        store.dispatch(getActiveWorkspaceTasks(activeWorkspace));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      size="lg"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Task for {props.workspacedata.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              value={newTask.name}
              onChange={(e) => {
                setNewTask({ ...newTask, name: e.target.value });
              }}
              type="text"
              placeholder="Enter task name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Summary</Form.Label>
            <Form.Control
              value={newTask.summary}
              onChange={(e) => {
                setNewTask({ ...newTask, summary: e.target.value });
              }}
              type="text"
              placeholder="Enter task summary"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Estimate</Form.Label>
            <Form.Control
              value={newTask.estimate}
              onChange={(e) => {
                setNewTask({ ...newTask, estimate: e.target.value });
              }}
              type="text"
              placeholder="Enter estimate time to complete task"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Due</Form.Label>
            <Form.Control
              value={newTask.due}
              onChange={(e) => {
                setNewTask({ ...newTask, due: e.target.value });
              }}
              type="datetime-local"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={() => {
              makeNewTask();
            }}
          >
            Submit new task
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface NewTaskProps {
  workspaceData: Workspace;
}

export default function NewTask({ workspaceData }: NewTaskProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New Task
      </Button>

      <NewTaskModal
        workspacedata={workspaceData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
