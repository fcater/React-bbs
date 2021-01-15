import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import userService from "../services/userService";
import auth from "../services/authServices";
import Joi from "joi";

class Register extends Component {
  state = {
    data: { sex: false },
    errors: {},
  };

  schemaObj = {
    userName: Joi.string().min(3).max(10).required().label("用户名"),
    sex: Joi.boolean().required(),
    email: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("邮箱")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(15).required().label("密码"),
  };
  schema = Joi.object(this.schemaObj);

  translate = (errors) => {
    //手动汉化...
    //用户名
    errors &&
      errors.userName === `"用户名" is not allowed to be empty` &&
      (errors.userName = "用户名不能为空");
    errors &&
      errors.userName ===
        `"用户名" length must be at least 3 characters long` &&
      (errors.userName = "用户名至少大于3字符");
    errors &&
      errors.userName ===
        `"用户名" length must be less than or equal to 10 characters long` &&
      (errors.userName = "用户名必须小于或等于10字符");
    //邮箱
    errors.email === `"邮箱" is not allowed to be empty` &&
      (errors.email = "邮箱不能为空");
    errors.email === `"邮箱" length must be at least 5 characters long` &&
      (errors.email = "邮箱至少大于5个字符");
    errors.email === `"邮箱" must be a valid email` &&
      (errors.email = "请输入正确的邮箱");
    errors.email ===
      `"邮箱" length must be less than or equal to 30 characters long` &&
      (errors.email = "邮箱必须小于或等于30个字符");
    //密码
    errors.password === `"密码" is not allowed to be empty` &&
      (errors.password = "密码不能为空");
    errors.password === `"密码" length must be at least 6 characters long` &&
      (errors.password = "密码至少大于6个字符");
    errors.password ===
      `"密码" length must be less than or equal to 15 characters long` &&
      (errors.password = "密码必须小于等于15个字符");
    return errors;
  };

  handleChange = (e) => {
    let { data, errors } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    errors[e.currentTarget.id] = this.validateProperty(
      e.currentTarget.id,
      e.currentTarget.value
    );

    this.translate(errors);
    //手动汉化...
    this.setState({ data, errors });
  };

  handleSex = (sex) => {
    const { data } = this.state;
    sex === "male" ? (data.sex = false) : (data.sex = true);
    this.setState({ data });
  };

  handleSubmit = () => {
    let { data } = this.state;
    const errors = this.validata();
    this.doSubmit();
    this.setState({ data, errors: errors || {} });
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors: errors });
      }
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

  render() {
    if (auth.getCurrentUserOffLine()) return <Redirect to="/" />;

    const { errors } = this.state;
    const { theme, device } = this.props;

    return theme === "daytime" ? (
      <React.Fragment>
        <div
          className={
            device === "mobile"
              ? "container bg-white  mb-5 p-0 rounded"
              : "container bg-white w-50 mb-5 p-0 rounded"
          }
        >
          <h5 className="text-center pt-3">注册</h5>
          <form className="p-3">
            <div className="form-group">
              <label htmlFor="userName">用户名</label>
              <input
                type="string"
                className="form-control"
                id="userName"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.userName && (
                <div className="alert alert-danger">{errors.userName}</div>
              )}
              <small className="form-text text-muted">
                用户名字符大于3而小于10。
              </small>
              <div className="d-flex justify-content-start mt-2">
                <div className="form-check">
                  <img
                    src="http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcRhYzOh7blj8b4vyz73NEfEvmuDUogSvTSLg*hXX4KIRfH2L9eQZZt47ftNzFljRVkWcZAONJa7YDfKgWrxwfVk!/r"
                    alt=""
                    className="pl-0 pr-0 rounded-circle"
                    style={{
                      width: "2em",
                      height: "2em",
                      objectFit: "cover",
                    }}
                    htmlFor="boy"
                  />
                  <input
                    className="m-0 mt-2 form-check-input"
                    type="radio"
                    id="boy"
                    name="sex"
                    value="male"
                    defaultChecked
                    onClick={() => this.handleSex("male")}
                  />
                  <label className="form-check-label pl-3 pr-3" htmlFor="boy">
                    我是男生
                  </label>
                </div>

                <div className="form-check">
                  <img
                    src="http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcSUoyRTjJXjplCxOd6PubtCMnoA7X5TRImnr3nUzAOTZLZ8zKV5WZ51t5lhpeKEHhSWnSB5cbAh7HbqFSjr5Iew!/r"
                    alt=""
                    className="pl-0 pr-0 rounded-circle "
                    style={{
                      width: "2em",
                      height: "2em",
                      objectFit: "cover",
                    }}
                  />
                  <input
                    className=" m-0 mt-2 form-check-input"
                    type="radio"
                    id="girl"
                    name="sex"
                    value="female"
                    onClick={() => this.handleSex("female")}
                  />
                  <label className="form-check-label pl-3" htmlFor="girl">
                    我是女生
                  </label>
                </div>
                <small className="form-text ml-5 text-muted">
                  暂不支持其他性别
                </small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱地址</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
              <small className="form-text text-muted">
                这只是一个demo，我并不会验证你的邮箱，但至少让它看起来像个邮箱。
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
              <small className="form-text text-muted">
                密码大于6而小于15。
              </small>
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                只是好看
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-white">彩蛋</div>
              <Link to="/login" className="">
                已有账号？点击登陆
              </Link>
              <button
                disabled={this.validata()}
                type="button"
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                提交
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    ) : (
      //夜间模式
      <React.Fragment>
        <div
          className={
            device === "mobile"
              ? "container bg-dark text-light mb-5 p-0 rounded"
              : "container bg-dark text-light w-50 mb-5 p-0 rounded"
          }
        >
          <h5 className="text-center pt-3">注册</h5>
          <form className="p-3">
            <div className="form-group">
              <label htmlFor="userName">用户名</label>
              <input
                type="string"
                className="form-control"
                id="userName"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.userName && (
                <div className="alert alert-danger">{errors.userName}</div>
              )}
              <small className="form-text text-muted">
                用户名字符大于3而小于10。
              </small>
              <div className="d-flex justify-content-start mt-2">
                <div className="form-check">
                  <img
                    src="http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcRhYzOh7blj8b4vyz73NEfEvmuDUogSvTSLg*hXX4KIRfH2L9eQZZt47ftNzFljRVkWcZAONJa7YDfKgWrxwfVk!/r"
                    alt=""
                    className="pl-0 pr-0 rounded-circle"
                    style={{
                      width: "2em",
                      height: "2em",
                      objectFit: "cover",
                    }}
                    htmlFor="boy"
                  />
                  <input
                    className="m-0 mt-2 form-check-input"
                    type="radio"
                    id="boy"
                    name="sex"
                    value="male"
                    defaultChecked
                    onClick={() => this.handleSex("male")}
                  />
                  <label className="form-check-label pl-3 pr-3" htmlFor="boy">
                    我是男生
                  </label>
                </div>

                <div className="form-check">
                  <img
                    src="http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcSUoyRTjJXjplCxOd6PubtCMnoA7X5TRImnr3nUzAOTZLZ8zKV5WZ51t5lhpeKEHhSWnSB5cbAh7HbqFSjr5Iew!/r"
                    alt=""
                    className="pl-0 pr-0 rounded-circle "
                    style={{
                      width: "2em",
                      height: "2em",
                      objectFit: "cover",
                    }}
                  />
                  <input
                    className=" m-0 mt-2 form-check-input"
                    type="radio"
                    id="girl"
                    name="sex"
                    value="female"
                    onClick={() => this.handleSex("female")}
                  />
                  <label className="form-check-label pl-3" htmlFor="girl">
                    我是女生
                  </label>
                </div>
                <small className="form-text ml-5 text-muted">
                  暂不支持其他性别
                </small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱地址</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
              <small className="form-text text-muted">
                这只是一个demo，我并不会验证你的邮箱，但至少让它看起来像个邮箱。
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
              <small className="form-text text-muted">
                密码大于6而小于15。
              </small>
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                只是好看
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-white">彩蛋</div>
              <Link to="/login" className="text-light">
                已有账号？点击登陆
              </Link>
              <button
                disabled={this.validata()}
                type="button"
                onClick={this.handleSubmit}
                className="btn btn-secondary"
              >
                提交
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
