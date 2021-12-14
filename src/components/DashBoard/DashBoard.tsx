import React from "react";
import { useAppSelector } from "../../app/hooks";
import ClientTaskList from "./ClientTaskList";

export default function DashBoard() {
  const clientOrganizations = useAppSelector(
    (state) => state.organizationsSlice
  );

  return (
    <div>
      <ClientTaskList />
    </div>
  );
}
