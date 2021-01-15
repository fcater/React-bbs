import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import NavBar from "./component/navbar";
import Message from './component/message';
import PersonalInformation from './component/personalInformation';
import Setting from './component/setting';
import Introduction from './component/introduction';
import Activities from './component/activities';
import MyConcern from './component/myConcern';
import FindFriends from './component/findFriends';
import auth from './services/authServices'
import UserList from './component/userlist';
import Content from "./component/content";
import Toggle from "./component/toggle";
import Register from './component/register';
import Login from './component/login';
import Logout from './component/logout';
import ProtectedRoute from './component/common/protectedRoute';
import AdminProtectedRoute from './component/common/adminProtectedRoute';
import "./App.css";

import Test from './component/test';


class App extends Component {
  state = {
    deviceType: "computer",
    theme: 'daytime',
    query: { option: "userName", word: "" }
  };


  handleSiwtch = (theme) => {
    theme === 'daytime' ? theme = 'nighttime' : theme = 'daytime'
    //   light:'daytime',black:'nighttime'
    this.setState({ theme })
  }

  handleQueryOption = (e) => {
    const { query } = this.state
    query.option = e.currentTarget.value
    this.setState({ query })
  }

  handleQuery = (e) => {
    const { query } = this.state
    query.word = e.currentTarget.value
    this.setState({ query })
  }

  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt
  }
  //转换日期格式

  async componentDidMount() {
    try {
      const user = await auth.getCurrentUser()
      const date = this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(user.registrationrDate))
      user.registrationrDate = date
      //坑爹的mongdb,utc时间转中国标准时间
      this.setState({ user })
    }
    catch (ex) { }
  }

  handleDeviceType = (deviceType) => {
    return document.documentElement.clientWidth < 500 ? deviceType = "mobile" : deviceType = "computer"
  }
  render() {
    const { theme, user, query, deviceType } = this.state
    const device = this.handleDeviceType(deviceType)
    return (
      <React.Fragment>
        <NavBar theme={theme} user={user} onQuery={this.handleQuery} onQueryOption={this.handleQueryOption} />
        <Toggle theme={theme} device={device} onSwitch={this.handleSiwtch} />
        <Switch>
          <Route path="/test" component={Test} />
          <ProtectedRoute path="/message" component={Message} />
          <ProtectedRoute path="/personal-information" component={() => <PersonalInformation theme={theme} device={device} user={user} />} />
          <AdminProtectedRoute path="/userlist" component={() => <UserList theme={theme} device={device} user={user} />} />
          <ProtectedRoute path="/setting" component={() => <Setting theme={theme} device={device} user={user} />} />
          <ProtectedRoute path="/introduction" component={Introduction} />
          <ProtectedRoute path="/activities" component={Activities} />
          <ProtectedRoute path="/my-concern" component={MyConcern} />
          <ProtectedRoute path="/find-friends" component={FindFriends} />
          <Route path="/register" component={() => <Register theme={theme} device={device} />} />
          <Route path="/login" component={() => <Login theme={theme} device={device} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={() => <Content theme={theme} device={device} user={user} query={query} dateRevise={this.dateFormat} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
