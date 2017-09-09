import React from 'react'
import { Route, Switch } from 'react-router-dom'
/* Import the components */
import Home from './views/Home';
import Posts from './views/Posts';
import NotFound from './views/NotFound';

/* Use components to define routes */
export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts" exact component={Posts} />
    <Route component={NotFound} />
  </Switch>;