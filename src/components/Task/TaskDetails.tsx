import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Task } from "../../features/tasks/Task";
import axios from "axios";
import { TaskComment, TaskAttachment } from "../../features/tasks/Task";
import TaskComments from "./TaskComments";

interface NewTaskModalProps {
  taskdata: Task;
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean>>;
}

function TaskDetailsModal(props: NewTaskModalProps) {
  const [taskAttachments, setTaskAttachments] = useState<TaskAttachment[]>([]);

  const getTaskAttachments = async (id: number) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "/attachments/" + id
      );
      setTaskAttachments(response.data as TaskAttachment[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskAttachments(props.taskdata.id);
  }, []);

  return (
    <Modal
      size="lg"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.taskdata.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskComments taskData={props.taskdata} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(!props.show);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface TaskDetailsProps {
  taskData: Task;
}

export default function TaskDetails(props: TaskDetailsProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        style={{ maxWidth: "72px" }}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Details
      </Button>

      <TaskDetailsModal
        taskdata={props.taskData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
