import React from "react";

const ArticleInfo = (props) => {
  const { a } = props;
  return (
    <React.Fragment>
      <h6 className="card-subtitle mt-2 mb-2 text-muted font-weight-bold">
        {a.title}
      </h6>
      {a.content && <p className="card-text font-weight-bolder">{a.content}</p>}
      {a.img && (
        <img width="60%" src={a.img} alt="" className="card-img-botton" />
      )}
    </React.Fragment>
  );
};

export default ArticleInfo;
