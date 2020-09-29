
import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Header, Navigation } from '/core/components';
import { IndexView, IssueCertificateView, TesterApprovalView, CheckImmunityView } from '/views';
import { Message } from '/core/messages';


const App = () => {
  return (
    <Router>
      <div className="container container-app">
        <Header title="Immuno Block" />
        <Fragment>
          <Navigation />
          <Switch>
            <Route path="/tester-approval/">
              <TesterApprovalView />
            </Route>
            <Route path="/issue-certificate/">
              <IssueCertificateView />
            </Route>
            <Route path="/check-immunity/">
              <CheckImmunityView />
            </Route>
            <Route path="/">
              <IndexView />
            </Route>
          </Switch>
        </Fragment>
      </div>
    </Router>
  );
}


export default App;
