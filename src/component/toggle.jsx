import React from "react";

const Toggle = (props) => {
  const { theme, onSwitch } = props;

  return theme === "daytime" ? (
    <svg
      onClick={() => onSwitch(theme)}
      width="2em"
      viewBox="0 0 16 16"
      className="sticky-top mt-2 ml-2 pointer bi bi-toggle-off"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
    </svg>
  ) : (
    <svg
      onClick={() => onSwitch(theme)}
      width="2em"
      viewBox="0 0 16 16"
      className="sticky-top mt-2 ml-2 pointer bi bi-toggle-on"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      />
    </svg>
  );
};

export default Toggle;
