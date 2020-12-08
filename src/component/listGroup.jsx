import React from "react";
import { Link } from "react-router-dom";

const ListGroup = (props) => {
  const { theme } = props;
  const options = [
    { label: "简介", path: "/introduction" },
    { label: "活动", path: "/activities" },
    { label: "我的关注", path: "/my-concern" },
    { label: "查找好友", path: "/find-friends" },
  ];

  return theme === "daytime" ? (
    <div className="list-group col-3 mt-3 ">
      {options.map((o) => (
        <Link
          key={o.label}
          className="list-group-item list-group-item-action bg-light"
          to={o.path}
        >
          {o.label}
        </Link>
      ))}

      <div className="mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">内容标题</h5>
            <h6 className="card-subtitle mb-2 text-muted">内容描述</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              href="https://user.qzone.qq.com/1303140304/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              qq空间
            </a>
            <a
              href="https://github.com/fcater/Fcater-s-code"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              代码仓库
            </a>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-muted">论坛名称</h5>
            <h6 className="card-subtitle mt-2 text-muted">版权声明</h6>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    //夜间模式
    <div className="list-group col-3 mt-3 ">
      {options.map((o) => (
        <Link
          key={o.label}
          className="list-group-item list-group-item-action text-light bg-dark"
          to={o.path}
        >
          {o.label}
        </Link>
      ))}

      <div className="mt-3">
        <div className="card">
          <div className="card-body text-light bg-dark">
            <h5 className="card-title ">内容标题</h5>
            <h6 className="card-subtitle mb-2 text-muted">内容描述</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              href="https://user.qzone.qq.com/1303140304/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              qq空间
            </a>
            <a
              href="https://github.com/fcater/Fcater-s-code"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              代码仓库
            </a>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="card">
          <div className="card-body text-light bg-dark">
            <h5 className="card-title text-muted">论坛名称</h5>
            <h6 className="card-subtitle mt-2 text-muted">版权声明</h6>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListGroup;
