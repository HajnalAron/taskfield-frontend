import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./SideBar.css";
import leaf from "../../../assets/leaf-logo.svg";
import taskfieldLogo from "../../../assets/taskfield-logo.svg";
import userLogo from "../../../assets/user_logo.svg";
import settingsLogo from "../../../assets/settings_logo.svg";
import projectTasksLogo from "../../../assets/project_tasks_logo.svg";
import { useAppSelector } from "../../app/hooks";
import { Workspace } from "../../features/workspaces/Workspace";
import axios from "axios";

interface SideBarProps {
  isSideBarExtended: boolean;
  setExtended: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({
  isSideBarExtended,
  setExtended
}: SideBarProps) {
  const activeWorkspace = useAppSelector(
    (state) => state.userSlice.activeWorkspace
  );

  const [activeWorkspaceData, setActiveWorkspaceData] = useState<Workspace>();

  useEffect(() => {
    if (activeWorkspace !== 0) {
      const getWorkspaceData = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_APP_BACKEND_URL +
              "/workspaces/" +
              activeWorkspace
          );
          setActiveWorkspaceData(response.data as Workspace);
        } catch (error) {
          console.log(error);
        }
      };
      getWorkspaceData();
    }
  }, [activeWorkspace]);

  return activeWorkspace === 0 ? (
    <></>
  ) : (
    <div>
      {isSideBarExtended ? (
        <div id="sideBarContainer" className="sideBarOpen">
          <img
            className="mt-3"
            src={taskfieldLogo}
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          />
          <h3 className="sideBarProjectName">{activeWorkspaceData!.name}</h3>
          <div className="sideBarMiddleContainer text-center">
            <div>
              <img className="sideBarLogo " src={projectTasksLogo} />
              <div>Dashboard</div>
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
