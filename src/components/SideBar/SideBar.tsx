import React, { Dispatch, SetStateAction, useState } from "react";
import "./Sidebar.css";
import leaf from "../../../assets/leaf-logo.svg";
import taskfieldLogo from "../../../assets/taskfield-logo.svg";
import userLogo from "../../../assets/user_logo.svg";
import settingsLogo from "../../../assets/settings_logo.svg";
import projectTasksLogo from "../../../assets/project_tasks_logo.svg";
import { useAppSelector } from "../../app/hooks";

interface SideBarProps {
  isSideBarExtended: boolean;
  setExtended: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({
  isSideBarExtended,
  setExtended
}: SideBarProps) {
  const activeWorkSpace = useAppSelector(
    (state) => state.userSlice.activeWorkSpace
  );
  return activeWorkSpace === 0 ? (
    <></>
  ) : (
    <div>
      {isSideBarExtended ? (
        <div id="sideBarContainer" className="sideBarOpen">
          <img
            src={taskfieldLogo}
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          />
          <div className="sideBarMiddleContainer">
            <div>
              <img className="sideBarLogo" src={projectTasksLogo} />
              <div>Tasks</div>
            </div>
            <div>
              <img className="sideBarLogo" src={userLogo} />
              <div>People</div>
            </div>
            <div>
              <img className="sideBarLogo" src={settingsLogo} />
              <div>Project Settings</div>
            </div>
          </div>
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
    </div>
  );
}
