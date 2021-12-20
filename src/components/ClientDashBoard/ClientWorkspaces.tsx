import React from "react";
import { useAppSelector } from "../../app/hooks";
import WorkspaceCard from "../Workspace/WorkspaceCard";

export default function ClientWorkspaces() {
  const clientWorkspaces = useAppSelector((state) => state.workspacesSlice);
  return (
    <div>
      {clientWorkspaces.workspaces ? (
        clientWorkspaces.workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspaceData={workspace} />
        ))
      ) : (
        <div> You have no active workspaces.</div>
      )}
    </div>
  );
}
