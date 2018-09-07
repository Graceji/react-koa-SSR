import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Loadable from 'react-loadable';

// const Loading = () => (
//   <div>
//     加载中。。。
//   </div>
// );

// code-spliting
// const TopicDetail = Loadable({
//   loader: () => import('../containers/topic-detail'),
//   loading: Loading,
// });
// const TopicList = Loadable({
//   loader: () => import('../containers/topic-list'),
//   loading: Loading,
// });

import TopicList from '../containers/topic-list';
import TopicDetail from '../containers/topic-detail';

export default () => (
  <React.Fragment>
    <Route path="/" exact render={() => <Redirect to="/list" />} />
    <Route path="/list" component={TopicList} />
    <Route path="/detail/:id" component={TopicDetail} />
  </React.Fragment>
);
