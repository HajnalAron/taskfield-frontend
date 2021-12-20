import { Task } from "../../features/tasks/Task";
import { useDrag } from "react-dnd";
import { Badge, Col, ListGroupItem, Row } from "react-bootstrap";
import TaskDetails from "./TaskDetails";
import TaskBadge from "./TaskBadge";

const returnPriority = (priority: string) => {
  switch (priority) {
    case "critical":
      return (
        <Badge bg="danger" text="white">
          Critical
        </Badge>
      );
    case "high":
      return (
        <Badge bg="warning" text="dark">
          High
        </Badge>
      );
    case "medium":
      return (
        <Badge bg="primary" text="white">
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge bg="success" text="white">
          Low
        </Badge>
      );
  }
};

const returnActive = (active: string) => {
  switch (active) {
    case "open":
      return (
        <Badge bg="info" text="white">
          Open
        </Badge>
      );
    case "closed":
      return (
        <Badge bg="dark" text="white">
          Closed
        </Badge>
      );
  }
};

const returnStatus = (status: string) => {
  switch (status) {
    case "TO DO":
      return (
        <Badge bg="danger" text="white">
          TO DO
        </Badge>
      );
    case "IN PROGRESS":
      return (
        <Badge bg="warning" text="dark">
          IN PROGRESS
        </Badge>
      );
    case "IN REVEIW":
      return (
        <Badge bg="primary" text="white">
          IN REVEIW
        </Badge>
      );
    case "DONE":
      return (
        <Badge bg="success" text="white">
          DONE
        </Badge>
      );
  }
};

interface TaskListItemProps {
  taskData: Task;
}

export default function TaskListItem({ taskData }: TaskListItemProps) {
  return (
    <ListGroupItem
      className="mb-1 text-center"
      style={{ borderRadius: "10px", backgroundColor: "#D9F8D7" }}
    >
      <Row>
        <Col className="fw-bold d-flex align-items-center">
          <div>{taskData.name}</div>
        </Col>
        <TaskDetails taskData={taskData} />
        <Col className="taskListItemData">{returnActive(taskData.active)}</Col>
        <Col className="taskListItemData">{returnStatus(taskData.status)}</Col>
        <Col className="taskListItemData">
          {returnPriority(taskData.priority)}
        </Col>

        <Col className="d-flex align-items-center" style={{ gap: "4px" }}>
          {taskData.categories ? (
            taskData.categories.map((c) => (
              <TaskBadge key={c.id} color={c.color} text={c.text} />
            ))
          ) : (
            <></>
          )}
        </Col>
        <Col className="taskListItemData">
          Due to: {new Date(taskData.due).toLocaleString()}
        </Col>
        <Col className="taskListItemData">Estimate: {taskData.estimate}</Col>
      </Row>
    </ListGroupItem>
  );
}
