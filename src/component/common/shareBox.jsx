import React from "react";

const ShareBox = (props) => {
  const {
    share,
    shareBox,
    shareArticle,
    placeholder,
    onClose,
    onChange,
    onShare,
    onDrag,
  } = props;

  return (
    shareBox && (
      <div className="share-box  bg-white rounded-lg shadow" onDrag={onDrag}>
        <p className="p-2 pl-3 pr-3 rounded-top text-dark d-flex justify-content-between drag">
          转发
          <span className="align-text-bottom pointer" onClick={onClose}>
            X
          </span>
        </p>

        <div className="ml-3 mr-3 p-2 row bg-light rounded-lg pointer">
          <img width="50px" height="50px" src={shareArticle.img} alt="" />
          <p className="ml-3">{shareArticle.title}</p>
        </div>
        <div className="d-flex flex-column m-3 ">
          <textarea
            name="text"
            value={share}
            cols="50"
            rows="1"
            className="form-control "
            aria-label="Text input with radio button "
            placeholder={placeholder}
            maxLength="100"
            onChange={onChange}
          />
          <input
            type="button"
            className="btn  border-0  shadow-none ml-auto text-light bg-primary mt-2 mb-2"
            value="发送"
            onClick={onShare}
          />
        </div>
      </div>
    )
  );
};

export default ShareBox;
