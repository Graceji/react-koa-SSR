export const topicSchema = {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  create_at: '',
  is_collect: '',
  author: {
    loginname: '',
    avatar_url: '',
  },
  replies: [],
};

export const tabs = {
  all: '全部',
  share: '分享',
  job: '工作',
  ask: '问答',
  good: '精品',
  dev: '测试',
};
