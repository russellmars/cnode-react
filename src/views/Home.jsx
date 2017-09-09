import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios'
import fecha from 'fecha'
import './Home.css'

const tabs = [
  {
    name: '全部',
    code: ''
  }, {
    name: '精华',
    code: 'good'
  }, {
    name: '分享',
    code: 'share'
  }, {
    name: '回答',
    code: 'ask'
  }, {
    name: '招聘',
    code: 'job'
  }
]

function getTabName (code) {
  const tab = tabs.find(item => {
    return code === item.code
  })
  return tab ? tab.name : ''
}

function formatCreateTime (time) {
  return fecha.format(new Date(time), 'YYYY-MM-DD');
}

function formatLastVisitTime (time) {
  return fecha.format(new Date(time), 'YYYY-MM-DD');
}

function TabsNav (props) {
  const currentTab = props.tab
  return (
    <div className="tabs-nav">
      {tabs.map(tab => (
        <div key={tab.code} className={`tabs-nav__item ${currentTab === tab.code ? 'active' : ''}`}>
          <Link to={`/?tab=${tab.code}`}>{tab.name}</Link>
        </div>
      ))}
    </div>
  );
}

function Avatar (props) {
  return (
    <div className="avatar">
      <img src={props.src} alt=""/>
    </div>
  )
}

function TopicsItem (props) {
  const topic = props.topic
  return (
    <div className="topic-item">
      <div className="topic-item__top">
        <Avatar src={topic.author.avatar_url}></Avatar>
        <div className="topic-item__right">
          <div className="topic-item__poster">{topic.author.loginname}</div>
          <div>
            <span className="topic-item__createtime">{formatCreateTime(topic.create_at)}</span>
            <span className="topic-item__tab">#{getTabName(topic.tab)}#</span>
          </div>
        </div>
      </div>
      <div className="topic-item__title">{topic.title}</div>
      <div className="topic-item__bottom">
        <div>
          <i className="icon iconfont icon-browse"></i>
          <span>{topic.visit_count}</span>
        </div>
        <div>
          <i className="icon iconfont icon-message"></i>
          <span>{topic.reply_count}</span>
        </div>
        <div>{formatLastVisitTime(topic.last_reply_at)}</div>
      </div>
    </div>
  )
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topicList: []
    }
  }
  
  componentDidMount () {
    this.fetchTopics()
  }
  async fetchTopics () {
    const result = await axios.get('https://cnodejs.org/api/v1/topics')
    if (result.status === 200 && result.data.success) {
      this.setState({
        topicList: result.data.data
      })
    }
  }
  render() {
    const tab = queryString.parse(this.props.location.search).tab
    const topicList = this.state.topicList
    return (
      <div>
        <TabsNav tab={tab}></TabsNav>
        <div className="topic-list">
          {
            topicList.map(topic => {
              return <TopicsItem topic={topic} key={topic.id}></TopicsItem>
            })
          }
        </div>
      </div>
    );
  }
}

export default Home;
