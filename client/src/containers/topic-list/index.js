import React, { Component } from 'react';
import { observer, inject, propTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentWrap from '../../components/common/ContentWrap';
import TopicListItem from './ListItem';
import { tabs } from '../../utils/variable-define';

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabValue: 'all',
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount () {
    // 获取数据
    this.props.topicStore.fetchTopics('all');
  }

  bootstrap () {
    // 做数据的初始化
    return new Promise((resolve) => {
      this.props.appState.count = 4;
      resolve(true);
    });
  }

  handleTabChange (e, value) {
    const { history } = this.props;
    this.setState({
      tabValue: value,
    });

    history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
    this.props.topicStore.fetchTopics(value);
  }

  listItemClick () {

  }

  render () {
    return (
      <ContentWrap>
        <Helmet>
          <title>
            This is Topic List
          </title>
          <meta name="decription" content="This is Description" />
        </Helmet>
        <Tabs onChange={this.handleTabChange} value={this.state.tabValue}>
          {
            Object.keys(tabs).map(key => (
              <Tab
                key={key}
                label={tabs[key]}
                value={key}
              />
            ))
          }
        </Tabs>
        {
          this.props.topicStore.syncing
            ? <CircularProgress color="secondary" size={100} />
            : (
              <List>
                {
                  this.props.topicStore.topics.map(topic => (
                    <TopicListItem
                      key={topic.id}
                      onClick={this.listItemClick}
                      topic={topic}
                    />
                  ))
                }
              </List>
            )
        }
      </ContentWrap>
    );
  }
}

TopicList.propTypes = {
  appState: propTypes.objectOrObservableObject,
  topicStore: propTypes.objectOrObservableObject,
  // history: P
};
