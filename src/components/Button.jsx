import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="inline-block group p-0.5 font-heading text-base text-gray-900 font-bold 
      bg-white bg-gradient-cyan overflow-hidden rounded-md"
      onClick={onClick}
    >
      <div className="relative py-4 px-9 bg-white rounded">
        <div
          className="
        h-full w-full bg-gradient-cyan transition ease-in-out duration-500"
        ></div>
        <span className="relative z-10">{text}</span>
      </div>
    </button>
  );
};

export default Button;
