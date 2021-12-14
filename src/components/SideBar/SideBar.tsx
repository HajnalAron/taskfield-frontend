import React, { Dispatch, SetStateAction, useState } from "react";
import "./Sidebar.css";
import leaf from "../../../assets/leaf-logo.svg";
import taskfieldLogo from "../../../assets/taskfield-logo.svg";
import userLogo from "../../../assets/user_logo.svg";
import settingsLogo from "../../../assets/settings_logo.svg";
import projectTasksLogo from "../../../assets/project_tasks_logo.svg";

interface SideBarProps {
  isSideBarExtended: boolean;
  setExtended: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({
  isSideBarExtended,
  setExtended
}: SideBarProps) {
  return (
    <>
      {isSideBarExtended ? (
        <div id="sideBarContainer" className="sideBarOpen">
          <img
            src={taskfieldLogo}
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          />
        </div>
      ) : (
        <div id="sideBarContainer" className="sideBarClosed">
          <img
            className="sideBarLogo mt-3"
            src={leaf}
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          />
          <div className="sideBarMiddleContainer">
            <img className="sideBarLogo" src={projectTasksLogo} />
            <img className="sideBarLogo" src={userLogo} />
            <img className="sideBarLogo" src={settingsLogo} />
          </div>
        </div>
      )}
    </>
  );
}
