import React, { Component } from 'react';
import './Topic.css'
import { cnodeapi } from '../apis'

function Reply (props) {
  const { reply } = props
    return (
      <div className="reply">
        <div className="reply__top">
          <div>作者名字</div>
          <div>2018-02-25</div>
        </div>
        <div className="markdown-html markdown-body" dangerouslySetInnerHTML={{__html: reply.content}}></div>
      </div>
    )
}
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
          <div className="topic__content markdown-html markdown-body" dangerouslySetInnerHTML={{__html: topic.content}}></div>
        </div>
        <div className="topic__comment">
          <div className="topic__comment-num">{topic.reply_count} 条回复</div>
          <div className="topic__comment-list">
            {topic.replies.map(reply => (
              <Reply reply={reply} key={reply.id}/>
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
