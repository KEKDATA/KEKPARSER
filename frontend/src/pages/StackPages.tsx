import * as React from 'react';
import { hot } from 'react-hot-loader';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import { TwitterParser } from './twitter_parser/page';

class StackPages extends React.Component<RouteComponentProps> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const {
      history: { push },
    } = this.props;
    push('/404');
    console.log(error, errorInfo);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/twitter" component={TwitterParser} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default hot(module)(withRouter(StackPages));
