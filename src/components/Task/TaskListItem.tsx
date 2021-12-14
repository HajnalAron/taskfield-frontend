import { Task } from "../../features/tasks/Task";
import { useDrag } from "react-dnd";
import { Col, ListGroupItem, Row } from "react-bootstrap";

interface TaskListItemProps {
  taskData: Task;
}

export default function TaskListItem({ taskData }: TaskListItemProps) {
  // const [collected, drag, dragPreview] = useDrag(() => ({
  //   type: "TaskListItem",
  //   item: { id: taskData.id }
  // }));
  return (
    <ListGroupItem>
      <Row>
        <Col>{taskData.name}</Col>
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
