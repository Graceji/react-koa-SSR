import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { observer, inject, propTypes } from 'mobx-react';
import marked from 'marked';
import PropTypes from 'prop-types';
import ContentWrap from '../../components/common/ContentWrap';

@inject(stores => ({
  fetchTopicDetail: stores.topicStore.fetchTopicDetail,
  detailMap: stores.topicStore.detailMap,
})) @observer
export default class TopicDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.fetchDetailData();
  }

  // 获取topic id
  getTopicId () {
    return this.props.match.params.id;
  }

  // 获取详情数据
  fetchDetailData () {
    const id = this.getTopicId();
    this.props.fetchTopicDetail(id);
  }

  render () {
    const id = this.getTopicId();
    const detail = this.props.detailMap[id];
    if (!detail) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <ContentWrap>
        <Helmet>
          <title>
            详情页
          </title>
          <meta name="decription" content="This is Detail" />
        </Helmet>
        <header>
          <h3>
            {detail.title}
          </h3>
        </header>
        <section>
          <p dangerouslySetInnerHTML={{ __html: marked(detail.content) }} />
        </section>
      </ContentWrap>
    );
  }
}

TopicDetail.propTypes = {
  detailMap: propTypes.observableObject,
  fetchTopicDetail: PropTypes.func,
  match: PropTypes.object,
};
