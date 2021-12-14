import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Workspace } from "../../features/workspaces/Workspace";

interface WorkSpaceCardProps {
  workspaceData: Workspace;
}

export default function WorkspaceCard({ workspaceData }: WorkSpaceCardProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{workspaceData.name}</Card.Title>
        <Card.Text>Number of open tasks:</Card.Text>
        <Link to={`/workspaces/${workspaceData.id}`}>Visit workspace</Link>
      </Card.Body>
    </Card>
  );
}
