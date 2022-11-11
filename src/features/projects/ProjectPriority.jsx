import React from "react";
const ProjectPriority = ({ priority }) => {
  const handleColor = {
    low: "bg-blue-50 text-blue-500",
    medium: "bg-yellow-50 text-yellow-500",
    high: "bg-red-50 text-red-500",
  };
  return (
    <span
      className={`inline-block py-1 px-2 text-xs  rounded-full ${handleColor[priority]}`}
    >
      Priority: <span className="capitalize">{priority}</span>
    </span>
  );
};

export default ProjectPriority;
