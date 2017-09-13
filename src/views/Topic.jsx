import React, { Component } from 'react';
import './Topic.css'
import { cnodeapi } from '../apis'
class Topic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topic: null
    }
  }

  async fetchTopic () {
    const result = await cnodeapi.get(`/topic/${this.props.match.params.id}`)
    if (result.success) {
      this.setState({
        topic: result.data
      })
    }
    console.log(this.state)
  }

  componentDidMount () {
    this.fetchTopic()
  }

  renderTopic () {
    const topic = this.state.topic
    if (!topic) return ''
    return (
      <div className="topic">
        <div className="topic__top">
          <div className="topic__title">{topic.title}</div>
          <div className="topic__content markdown-html" dangerouslySetInnerHTML={{__html: topic.content}}></div>
        </div>
        <div className="topic__comment">
          <div className="topic__comment-num">{topic.reply_count}</div>
          <div className="topic__comment-list">
            {topic.replies.map(reply => (
              <div className="markdown-html" dangerouslySetInnerHTML={{__html: reply.content}}></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTopic()}
      </div>
    );
  }
}

export default Topic;
