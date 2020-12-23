import React from "react";

const User = (props) => {
  const { a, onDelete } = props;
  return (
    <div
      className="d-flex justify-content-between"
      style={{ height: "100%", width: "100%" }}
    >
      <a
        className="d-flex justify-content-start p-2"
        href="https://user.qzone.qq.com/1303140304"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={a.portrait}
          alt=""
          className="pl-0 pr-0 rounded-circle  "
          style={{ width: "4em", height: "4em" }}
        />

        <div className="col" width={"20%"}>
          <h6
            className="card-title mt-1"
            style={{ fontSize: "1em", fontWeight: "bold" }}
          >
            {a.userId}
          </h6>
          <h6 className="mt-3" style={{ fontSize: "1em" }}>
            {a.datelabel}
          </h6>
        </div>
      </a>
      {a.focus && (
        <div
          className="pointer"
          onClick={() => onDelete(a)}
          style={{
            color: "red",
            height: "30px",
            width: "30px",
            textAlign: "center",
          }}
        >
          x
        </div>
      )}
    </div>
  );
};

export default User;
