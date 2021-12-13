import React, { Dispatch, SetStateAction, useState } from "react";
import "./Sidebar.css";

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
          <button
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          >
            Zar/Nyit
          </button>
          SideBar
        </div>
      ) : (
        <div id="sideBarContainer" className="sideBarClosed">
          <button
            onClick={() => {
              setExtended(!isSideBarExtended);
            }}
          >
            Zar/Nyit
          </button>
          SideBar
        </div>
      )}
    </>
  );
}
