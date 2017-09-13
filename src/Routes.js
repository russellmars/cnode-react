import React from 'react'
import { Route, Switch } from 'react-router-dom'
/* Import the components */
import Home from './views/Home';
import Topic from './views/Topic';
import NotFound from './views/NotFound';

/* Use components to define routes */
export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/topic/:id" exact component={Topic} />
    <Route component={NotFound} />
  </Switch>;
