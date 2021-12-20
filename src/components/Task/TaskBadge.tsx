import React from "react";

interface TaskBadgeProps {
  text: string;
  color: string;
}

export default function TaskBadge({ text, color }: TaskBadgeProps) {
  return (
    <div>
      <div className="badge" style={{ backgroundColor: color }}>
        {text}
      </div>
    </div>
  );
}
