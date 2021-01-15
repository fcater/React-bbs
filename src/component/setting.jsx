import React, { Component } from "react";
import userService from "../services/userService";
import auth from "../services/authServices";
import Joi from "joi";

class Setting extends Component {
  state = {
    data: {},
    imgUrl: "",
    errors: {},
  };

  componentDidMount() {
    const { user } = this.props;
    const data = {
      userName: user.userName,
      sex: user.sex,
      portrait: user.portrait,
      _id: user._id,
      email: user.email,
    };
    this.setState({ data, imgUrl: user.portrait });
  }

  schemaObj = {
    _id: Joi.string().max(50).required(),
    userName: Joi.string().min(3).max(10).required().label("用户名"),
    sex: Joi.boolean().required(),
    email: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("邮箱")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(15).required().label("密码"),
    portrait: Joi.string(),
  };
  schema = Joi.object(this.schemaObj);

  handleChange = (e) => {
    let { data, errors } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    errors[e.currentTarget.id] = this.validateProperty(
      e.currentTarget.id,
      e.currentTarget.value
    );
    this.setState({ data, errors });
  };

  handleSex = (sex) => {
    const { data } = this.state;
    sex === "male" ? (data.sex = false) : (data.sex = true);
    this.setState({ data });
  };

  handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("上传图片不能超过1mb");
    }
    if (file) {
      const { data } = this.state;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgcode = e.target.result;
        data.portrait = imgcode;
      };
      //将图片文件转换成bs64码
      const imgUrl = window.webkitURL.createObjectURL(file);
      this.setState({ imgUrl, data });
      //生成即时预览
    }
  };

  validata = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schemaObj[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handlePut = async () => {
    try {
      const user = await userService.update(this.state.data);
      auth.loginWithJwt(user.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {}
  };

  render() {
    const { user } = this.props;
    const { data, errors } = this.state;
    //如果在此页面刷新会丢失app传来的user
    if (!user) window.location = "/";
    return this.props.theme === "daytime" ? (
      <div
        className={
          document.documentElement.clientWidth < 500
            ? "card container w-100 mb-5"
            : "card container w-50 mb-5"
        }
        style={{ width: "18rem" }}
      >
        <div className="row">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body w-50 col">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1">
                {user.isAdmin ? "(管理员)" : "(用户)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <button
            disabled={this.validata()}
            className="btn btn-primary col-1 h-25 p-0 mt-5 mr-5 text-white"
            onClick={this.handlePut}
          >
            保存
          </button>
        </div>
        <h5>Id：{user._id}</h5>
        <div className="border rounded">
          <div className="p-3">
            <label htmlFor="userName">用户名</label>
            <input
              type="userName"
              className="form-control"
              id="userName"
              onChange={this.handleChange}
              defaultValue={data.userName}
            />
            {errors.userName && (
              <div className="alert alert-danger">{errors.userName}</div>
            )}
            <label htmlFor="password">密码</label>
            <input
              type="password"
              className="form-control "
              id="password"
              onChange={this.handleChange}
            />
            {errors.password && (
              <div className="alert alert-danger">{errors.password}</div>
            )}
            <label htmlFor="sex">性别</label>
            <div className="form-check m-2">
              <input
                className="m-0 mt-2 form-check-input"
                type="radio"
                id="boy"
                name="sex"
                value="male"
                defaultChecked={!data.sex}
                onClick={() => this.handleSex("male")}
              />
              <label className="form-check-label pl-3 pr-3" htmlFor="boy">
                男
              </label>
              <input
                className=" m-0 mt-2 form-check-input"
                type="radio"
                id="girl"
                name="sex"
                value="female"
                defaultChecked={data.sex}
                onClick={() => this.handleSex("female")}
              />
              <label className="form-check-label pl-3" htmlFor="girl">
                女
              </label>
            </div>

            <h6>头像：</h6>
            <div className="row justify-content-md-center">
              <img className="mb-3 w-25" src={this.state.imgUrl} alt="" />
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={this.handleImgChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                选择图像 (不超过1mb)
              </label>
            </div>
          </div>
        </div>
        <small className="text-muted text-center">
          注册时间：
          {user.registrationrDate &&
            user.registrationrDate.slice(0, 10) +
              " | " +
              user.registrationrDate.slice(11, 19)}
        </small>
      </div>
    ) : (
      //夜间模式
      <div
        className={
          document.documentElement.clientWidth < 500
            ? "card container w-100 mb-5 bg-dark text-light"
            : "card container w-50 mb-5 bg-dark text-light"
        }
        style={{ width: "18rem" }}
      >
        <div className="row">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body w-50 col">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1">
                {user.isAdmin ? "(管理员)" : "(用户)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <button
            disabled={this.validata()}
            className="btn btn-primary col-1 h-25 p-0 mt-5 mr-5 text-white"
            onClick={this.handlePut}
          >
            保存
          </button>
        </div>
        <h5>Id：{user._id}</h5>
        <div className="border rounded">
          <div className="p-3">
            <label htmlFor="userName">用户名</label>
            <input
              type="userName"
              className="form-control"
              id="userName"
              onChange={this.handleChange}
              defaultValue={data.userName}
            />
            {errors.userName && (
              <div className="alert alert-danger">{errors.userName}</div>
            )}
            <label htmlFor="password">密码</label>
            <input
              type="password"
              className="form-control "
              id="password"
              onChange={this.handleChange}
            />
            {errors.password && (
              <div className="alert alert-danger">{errors.password}</div>
            )}
            <label htmlFor="sex">性别</label>
            <div className="form-check m-2">
              <input
                className="m-0 mt-2 form-check-input"
                type="radio"
                id="boy"
                name="sex"
                value="male"
                defaultChecked={!data.sex}
                onClick={() => this.handleSex("male")}
              />
              <label className="form-check-label pl-3 pr-3" htmlFor="boy">
                男
              </label>
              <input
                className=" m-0 mt-2 form-check-input"
                type="radio"
                id="girl"
                name="sex"
                value="female"
                defaultChecked={data.sex}
                onClick={() => this.handleSex("female")}
              />
              <label className="form-check-label pl-3" htmlFor="girl">
                女
              </label>
            </div>

            <h6>头像：</h6>
            <div className="row justify-content-md-center">
              <img className="mb-3 w-25" src={this.state.imgUrl} alt="" />
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={this.handleImgChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                选择图像 (不超过1mb)
              </label>
            </div>
          </div>
        </div>
        <small className="text-muted text-center">
          注册时间：
          {user.registrationrDate &&
            user.registrationrDate.slice(0, 10) +
              " | " +
              user.registrationrDate.slice(11, 19)}
        </small>
      </div>
    );
  }
}

export default Setting;
