import { Task } from "../../features/tasks/Task";
import { useDrag } from "react-dnd";
import { Col, ListGroupItem, Row } from "react-bootstrap";
import TaskDetails from "./TaskDetails";

interface TaskListItemProps {
  taskData: Task;
}

export default function TaskListItem({ taskData }: TaskListItemProps) {
  return (
    <ListGroupItem className="mb-1">
      <Row>
        <Col>{taskData.name}</Col>
        <TaskDetails taskData={taskData} />
        <Col className="taskListItemData">{taskData.active}</Col>
        <Col className="taskListItemData">{taskData.status}</Col>
        <Col className="taskListItemData">{taskData.priority}</Col>
        <Col className="taskListItemData">
          {new Date(taskData.due).toLocaleString()}
        </Col>
        <Col className="taskListItemData">{taskData.estimate}</Col>
      </Row>
    </ListGroupItem>
  );
}
