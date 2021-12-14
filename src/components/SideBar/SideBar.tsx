import React, { Dispatch, SetStateAction, useState } from "react";
import "./Sidebar.css";
import leaf from "../../../assets/leaf-logo.svg";
import taskfieldLogo from "../../../assets/taskfield-logo.svg";

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
          SideBar
        </div>
      ) : (
        <div id="sideBarContainer" className="sideBarClosed">
          <img
            src={leaf}
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          />
          SideBar
        </div>
      )}
    </>
  );
}
