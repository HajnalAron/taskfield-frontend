import React from "react";
import { useAppSelector } from "../../app/hooks";

export default function ClientWorkspaces() {
  const clientWorkspaces = useAppSelector((state) => state.workspacesSlice);
  return <div></div>;
}
