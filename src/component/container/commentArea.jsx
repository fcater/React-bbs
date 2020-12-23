import React from "react";

const CommentArea = (props) => {
  const { a, talk, commentTip, onFocus, onBlur, onChange, onComment } = props;
  return (
    <div
      className="d-flex justify-content-start mt-2 "
      onFocus={() => onFocus(a)}
      onBlur={() => onBlur(a)}
    >
      <textarea
        id={a.id}
        name="text"
        value={talk[a.id]}
        cols="40"
        rows={a.focusHeight}
        className="form-control"
        aria-label="Text input with radio button"
        placeholder={commentTip[a.id] || "组织语言中..."}
        maxLength="100"
        onChange={onChange.bind(this, a)}
        style={{ resize: "none", width: "90%" }}
      />
      <input
        type="button"
        className="btn border-0 shadow-none text-light bg-primary ml-4 "
        value="发送"
        onClick={() => onComment(a)}
      />
    </div>
  );
};

export default CommentArea;
