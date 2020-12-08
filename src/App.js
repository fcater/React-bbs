import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import NavBar from "./component/navbar";
import Message from './component/message';
import Directory from './component/directory';
import PersonalInformation from './component/personalInformation';
import Setting from './component/setting';
import Introduction from './component/introduction';
import Activities from './component/activities';
import MyConcern from './component/myConcern';
import FindFriends from './component/findFriends';

import Content from "./component/content";
import Toggle from "./component/toggle";
import "./App.css";


class App extends Component {

  //   light:'daytime',black:'nighttime'

  handleSiwtch = (theme) => {
    theme === 'daytime' ? theme = 'nighttime' : theme = 'daytime'

    this.setState({ theme })
  }
  state = {
    theme: 'daytime',
  };
  render() {
    return (

      <React.Fragment>
        <NavBar theme={this.state.theme} />
        <Toggle theme={this.state.theme} onSwitch={this.handleSiwtch} />
        <Switch>
          <Route path="/message" component={Message} />
          <Route path="/directory" component={Directory} />
          <Route path="/personal-information" component={PersonalInformation} />
          <Route path="/setting" component={Setting} />
          <Route path="/introduction" component={Introduction} />
          <Route path="/activities" component={Activities} />
          <Route path="/my-concern" component={MyConcern} />
          <Route path="/find-friends" component={FindFriends} />
          <Route path="/" component={() => <Content theme={this.state.theme} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
