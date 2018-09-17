import React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/AccountCircle';
import ContentWrap from '../../components/common/ContentWrap';
import userWrapStyle from './styles/userWrapStyle';

const UserWrap = ({ user, children, classes }) => (
  <ContentWrap>
    <div className={classes.avatar}>
      <div className={classes.bg} />
      {
        user.isLogin
          ? <Avatar className={classes.avatarImg} src={user.info.avatar_url} />
          : (
            <Avatar className={classes.avatarImg}>
              <UserIcon />
            </Avatar>
          )
      }
      <span className={classes.userName}>
        {
          user.info.loginName || '未登录'
        }
      </span>
    </div>
    { children }
  </ContentWrap>
);

UserWrap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  user: propTypes.observableObject,
  classes: PropTypes.object,
};

export default withStyles(userWrapStyle)(UserWrap);
