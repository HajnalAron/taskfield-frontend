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
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const { onHide, show, taskdata } = props;
  const [taskAttachments, setTaskAttachments] = useState<TaskAttachment[]>([]);

  const createCategory = async (id: string, text: string, color: string) => {
    try {
      const request = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/categories/" + id,
        {
          text,
          color
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getTaskAttachments(taskdata.id);
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
          {taskdata.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type={"color"}
          onChange={(e) => {
            setCategoryColor(e.target.value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setCategoryText(e.target.value);
          }}
        />
        <div>{taskdata.summary}</div>
        <TaskComments taskData={taskdata} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(!show);
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
