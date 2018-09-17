import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { topicPrimaryStyle, topicSecondaryStyle } from './style';
import { tabs } from '../../utils/variable-define';

const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classNames(classes.tab, { [classes.topTab]: topic.top })}>
      {topic.top ? '置顶' : tabs[topic.tab]}
    </span>
    <span className={classes.title}>
      {topic.title}
    </span>
  </div>
);

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>
      {topic.author.loginname}
    </span>
    <span>
      <span className={classes.accentColor}>
        {topic.reply_count}
      </span>
      <span>
        /
      </span>
      <span className={classes.count}>
        {topic.visit_count}
      </span>
    </span>
    <span>
      创建时间:
      {topic.create_at}
    </span>
  </span>
);

Primary.propTypes = {
  topic: PropTypes.object,
  classes: PropTypes.object,
};

Secondary.propTypes = {
  topic: PropTypes.object,
  classes: PropTypes.object,
};

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary);

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
);

TopicListItem.propTypes = {
  onClick: PropTypes.func,
  topic: PropTypes.object,
};

export default TopicListItem;
