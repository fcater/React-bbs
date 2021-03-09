import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ theme, user, onQuery, onQueryOption }) => {
  return theme === "daytime" ? (
    <nav id="top" className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mr-3">
            <Link className="nav-link" to="/">
              主页 <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item mr-5">
            <Link className="nav-link" to="/message">
              留言
            </Link>
          </li>

          <li className="nav-item ml-5">
            <a className="nav-link" href="/#">
              {user ? (
                <img
                  src={user.portrait}
                  alt=""
                  className="pl-0 pr-0 rounded-circle  "
                  style={{
                    width: "2em",
                    height: "2em",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <i className="fa fa-user-circle-o fa-2x"></i>
              )}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/#" aria-disabled="true">
              {user && user.userName} —— (欢迎来到我的论坛)
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={onQueryOption.bind(this)}
          >
            <option value="userName">用户名</option>
            <option value="title">标题</option>
          </select>

          <div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="输入..."
              aria-label="Search"
              onChange={onQuery.bind(this)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={null}
            >
              搜索
            </button>
          </div>
        </form>
        <ul className="navbar-nav d-flex justify-content-between">
          {user && (
            <li className="nav-item dropdown" style={{ width: "50%" }}>
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-person-lines-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                </svg>
                {/* 我还挺喜欢这个图标的fontawesome没找到一样的 */}
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
                style={{ zIndex: 99999 }}
              >
                <Link className="dropdown-item" to="/personal-information">
                  个人资料
                </Link>
                <Link className="dropdown-item" to="/logout">
                  注销
                </Link>
                <div className="dropdown-divider"></div>
                {user.isAdmin && (
                  <Link className="dropdown-item" to="/userlist">
                    用户列表
                  </Link>
                )}
                <Link className="dropdown-item" to="/setting">
                  设置
                </Link>
              </div>
            </li>
          )}
          <li className="nav-item" style={{ width: "40%" }}>
            {!user && (
              <Link className="nav-link" to="/login">
                <i className="fa fa-arrow-circle-right fa-2x"></i>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    //夜间模式
    <nav id="top" className="navbar navbar-expand-lg navbar-light bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mr-3 ">
            <Link className="nav-link text-light" to="/">
              主页 <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item mr-5">
            <Link className="nav-link text-light" to="/message">
              留言
            </Link>
          </li>

          <li className="nav-item ml-5">
            <a className="nav-link" href="/#">
              {user ? (
                <img
                  src={user.portrait}
                  alt=""
                  className="pl-0 pr-0 rounded-circle"
                  style={{
                    width: "2em",
                    height: "2em",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <i className="fa fa-user-circle-o fa-2x text-light"></i>
              )}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light disabled"
              href="/#"
              aria-disabled="true"
            >
              {user && user.userName} —— (欢迎来到我的论坛)
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={onQueryOption.bind(this)}
          >
            <option value="userName">用户名</option>
            <option value="title">标题</option>
          </select>
          <div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="输入..."
              aria-label="Search"
              onChange={onQuery.bind(this)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={null}
            >
              搜索
            </button>
          </div>
        </form>
        <ul className="navbar-nav d-flex justify-content-between">
          {user && (
            <li className="nav-item dropdown" style={{ width: "50%" }}>
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-person-lines-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                </svg>
                {/* 我还挺喜欢这个图标的fontawesome没找到一样的 */}
              </a>
              <div
                className="dropdown-menu dropdown-menu-right bg-dark"
                aria-labelledby="navbarDropdown"
                style={{ zIndex: 99999 }}
              >
                <Link
                  className="dropdown-item text-light"
                  to="/personal-information"
                >
                  个人资料
                </Link>
                <Link className="dropdown-item text-light" to="/logout">
                  注销
                </Link>
                <div className="dropdown-divider"></div>
                {user.isAdmin && (
                  <Link className="dropdown-item text-light" to="/userlist">
                    用户列表
                  </Link>
                )}
                <Link className="dropdown-item text-light" to="/setting">
                  设置
                </Link>
              </div>
            </li>
          )}
          <li className="nav-item" style={{ width: "40%" }}>
            {!user && (
              <Link className="nav-link" to="/login">
                <i className="fa fa-arrow-circle-right fa-2x text-light"></i>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
