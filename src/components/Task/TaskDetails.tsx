import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useState } from "react";
import { Task } from "../../features/tasks/Task";
import axios from "axios";
import { TaskComment, TaskAttachment } from "../../features/tasks/Task";
import TaskComments from "./TaskComments";
import { store } from "../../app/store";
import { getActiveWorkspaceTasks } from "../../features/user/userSlice";
import { getClientTasks } from "../../features/tasks/tasksSlice";
import { useAppSelector } from "../../app/hooks";
import TaskBadge from "./TaskBadge";

interface NewTaskModalProps {
  taskid: number;
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean>>;
}

function TaskDetailsModal(props: NewTaskModalProps) {
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const activeWorkspace = useAppSelector(
    (state) => state.userSlice.activeWorkspace
  );
  const { onHide, show, taskid } = props;
  const [taskdata, setTaskData] = useState<Task>();
  const getTaskById = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "/tasks/" + props.taskid
      );
      if (response.status === 200) {
        setTaskData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      const request = await axios.delete(
        import.meta.env.VITE_APP_BACKEND_URL + `/tasks/${taskdata!.id}`
      );
      if (request.status === 204) {
        store.dispatch(getActiveWorkspaceTasks(activeWorkspace));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async () => {
    try {
      const request = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/categories/" + props.taskid,
        {
          text: categoryText,
          color: categoryColor
        }
      );
      if (request.statusText == "Created") {
        store.dispatch(getClientTasks());
        if (activeWorkspace !== 0) {
          store.dispatch(getActiveWorkspaceTasks(activeWorkspace));
          getTaskById();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskById();
  }, [taskid]);

  return (
    <Modal
      size="lg"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {taskdata ? (
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {taskdata.name}
            </Modal.Title>
            <div className="d-flex" style={{ gap: "4px" }}>
              {taskdata.categories ? (
                taskdata.categories.map((c) => (
                  <TaskBadge key={c.id} color={c.color} text={c.text} />
                ))
              ) : (
                <div></div>
              )}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="my-3">Task Summary: {taskdata.summary}</div>
            <hr></hr>
            <TaskComments taskData={taskdata} />
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <div className="d-flex" style={{ gap: "4px" }}>
              <Button variant="info">Edit Task</Button>
              <Button
                onClick={() => {
                  deleteTask();
                }}
                variant="danger"
              >
                Delete Task
              </Button>
            </div>
            <InputGroup className="my-4 w-50">
              <FormControl
                style={{ maxWidth: "40px" }}
                type={"color"}
                onChange={(e) => {
                  setCategoryColor(e.target.value);
                }}
                placeholder="Type your comment here"
                aria-label="New comment"
                aria-describedby="basic-addon2"
              />
              <FormControl
                type="text"
                onChange={(e) => {
                  setCategoryText(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  createCategory();
                }}
                variant="outline-secondary"
                id="button-addon2"
              >
                Add Category
              </Button>
            </InputGroup>
            <Button
              onClick={() => {
                props.onHide(!show);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      ) : (
        <div>No task data</div>
      )}
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
        taskid={props.taskData.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
