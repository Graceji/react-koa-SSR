import bg from './bg.jpg';

export default () => ({
  root: {},
  avatar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  avatarImg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
  },
  userName: {
    color: '#fff',
    zIndex: 1,
  },
});
