import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Workspace } from "../../features/workspaces/Workspace";

interface WorkSpaceCardProps {
  workspaceData: Workspace;
}

export default function WorkspaceCard({ workspaceData }: WorkSpaceCardProps) {
  return (
    <Card className="m-3" key={workspaceData.id} style={{ maxWidth: "256px" }}>
      <Card.Body>
        <Card.Title>{workspaceData.name}</Card.Title>
        <img src={workspaceData.logo} />
        {/* <Card.Text>Number of open tasks:</Card.Text> */}
        <Link to={`/workspaces/${workspaceData.id}/dashboard`}>
          Visit workspace
        </Link>
      </Card.Body>
    </Card>
  );
}
