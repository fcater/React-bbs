import React from "react";

const Sharer = (props) => {
  const { a } = props;
  return (
    <React.Fragment>
      {a.sharer && (
        <a
          className="ml-2 mb-0 mt-2"
          href="https://user.qzone.qq.com/1303140304"
          target="_blank"
          rel="noopener noreferrer"
        >
          {a.sharer}
        </a>
      )}
    </React.Fragment>
  );
};
export default Sharer;
