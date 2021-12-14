import "./Layout.css";
import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { getClientUserData } from "../../features/user/userSlice";
import { store } from "../../app/store";
import { getClientWorkspaces } from "../../features/workspaces/workspaceSlice";
import { getClientOrganizations } from "../../features/organizations/organizationsSlice";

interface LayoutProps {
  render: React.ReactNode;
}

export default function Layout({ render }: LayoutProps) {
  const [isSideBarExtended, setSideBarExtended] = useState(false);

  useEffect(() => {
    store.dispatch(getClientWorkspaces());
    store.dispatch(getClientOrganizations());
    store.dispatch(getClientUserData());
  }, []);

  return (
    <div className="px-0 d-flex">
      <SideBar
        isSideBarExtended={isSideBarExtended}
        setExtended={() => {
          setSideBarExtended(!isSideBarExtended);
        }}
      />
      {isSideBarExtended ? (
        <div className="sideBarOpenMainContainer">
          <Navbar />
          <div>test</div>
          {render}
        </div>
      ) : (
        <div className="sideBarClosedMainContainer">
          <Navbar />
          <div>test</div>
          {render}
        </div>
      )}
    </div>
  );
}
