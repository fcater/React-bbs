import React, { forwardRef } from "react";

const CreatBox = forwardRef((props, ref) => {
  const {
    newArticleTitle,
    imgUrl,
    onUpload,
    onUrlChange,
    onTitle,
    onNewArticle,
  } = props;
  return (
    <div className="creat-box bg-white rounded-lg shadow">
      <p className="p-2 pl-3 pr-3 rounded-top text-dark d-flex justify-content-between drag">
        新的动态
      </p>
      <div className="d-flex flex-column m-3 ">
        <img src={imgUrl} alt="" className="pb-2" width="50%" />
        <textarea
          name="text"
          cols="50"
          rows="2"
          className="form-control "
          aria-label="Text input with radio button "
          placeholder="说点什么把..."
          maxLength="30"
          value={newArticleTitle}
          onChange={onTitle}
        />
        <div className="d-flex justify-content-between">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 17 16"
            className="bi bi-image text-primary mt-2 pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onUpload}
          >
            <path
              fillRule="evenodd"
              d="M14.002 2h-12a1 1 0 0 0-1 1v9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm4 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
          <input
            accept="image/png, image/jpeg,image/jpeg/gif"
            type="file"
            className="file-input d-none"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            ref={ref}
            onChange={onUrlChange}
          />
          <input
            type="button"
            className="btn border-0  shadow-none text-light bg-primary mt-2 mb-2"
            value="发表"
            onClick={onNewArticle}
          />
        </div>
      </div>
    </div>
  );
});

export default CreatBox;
