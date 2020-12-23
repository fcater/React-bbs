import React from "react";

const Comment = (props) => {
  const {
    a,
    onMouseEnterComment,
    onMouseLeaveComment,
    onCommentDelete,
  } = props;
  return (
    <React.Fragment>
      {a.comment.map((c) => (
        <div
          className="d-flex justify-content-start m-1 ml-4 border border-primary rounded-pill"
          key={c.id}
          style={{
            width: "80%",
            backgroundColor: "rgb(245,245,245)",
          }}
          onMouseEnter={() => {
            onMouseEnterComment(a, c);
          }}
          onMouseLeave={() => {
            onMouseLeaveComment(a, c);
          }}
        >
          <img
            src={c.portrait}
            alt=""
            className="ml-2 mt-auto mb-auto pl-0 pr-0 rounded-circle"
            style={{ width: "3em", height: "3em" }}
          />
          <div style={{ width: "60%" }}>
            <h6 className="card-title pt-2 mb-1" style={{ fontSize: "1em" }}>
              {c.userId}：{c.content}
            </h6>
            <p className="mb-1">{a.datelabel}</p>
          </div>
          {c.mouseEnterComment && (
            <div
              className="mt-auto mb-auto pointer text-danger"
              onClick={() => onCommentDelete(a, c)}
            >
              x
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Comment;
