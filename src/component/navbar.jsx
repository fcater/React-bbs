import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { theme } = props;

  return theme === "daytime" ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="navbarSupportedContent"
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
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-person-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                <path d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/#" aria-disabled="true">
              FcatQone(论坛名称)
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="输入..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            搜索
          </button>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
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
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/directory">
                通讯录
              </Link>
              <Link className="dropdown-item" to="/personal-information">
                个人资料
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/setting">
                设置
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/#">
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-square-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 8.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    //夜间模式
    <nav className="navbar navbar-expand-lg  text-light bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mr-3">
            <a className="nav-link" href="/#">
              主页 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item mr-5">
            <a className="nav-link" href="/#">
              留言
            </a>
          </li>

          <li className="nav-item ml-5">
            <a className="nav-link" href="/#">
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-person-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                <path d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/#" aria-disabled="true">
              FcatQone(论坛名称)
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="输入..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            搜索
          </button>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
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
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/#">
                通讯录
              </a>
              <a className="dropdown-item" href="/#">
                个人资料
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/#">
                设置
              </a>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/#">
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-square-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 8.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
