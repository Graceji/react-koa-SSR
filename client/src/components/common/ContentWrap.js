import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 24,
    marginTop: 64,
  },
};

const ContentWrap = ({ children, classes }) => (
  <Paper className={classes.root} elevation={1}>
    { children }
  </Paper>
);

ContentWrap.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default withStyles(styles)(ContentWrap);
